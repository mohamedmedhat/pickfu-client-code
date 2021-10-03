import React, { useEffect, useState } from 'react';
import './Answers.css';

function Answers({ socket }) {
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const answerListener = (answer) => {
      setAnswers((prevAnswers) => {
        const newAnswers = { ...prevAnswers };
        newAnswers[answer.id] = answer;
        return newAnswers;
      });
    };


    socket.on('answer', answerListener);
    socket.emit('getAnswers');

    return () => {
      socket.off('answer', answerListener);
    };
  }, [socket]);

  return (
    <div className="answer-list">
      {[...Object.values(answers)]
        .sort((a, b) => a.time - b.time)
        .map((answer) => (
          <div
            key={answer.id}
            className="answer-container"
            title={`Sent at ${new Date(answer.time).toLocaleTimeString()}`}
          >
            {/* <span className="user">{answer.user.name}:</span> */}
            <span className="answer">{answer.value}</span>
            <span className="date">
              {new Date(answer.time).toLocaleTimeString()}
            </span>
          </div>
        ))}
    </div>
  );
}

export default Answers;
