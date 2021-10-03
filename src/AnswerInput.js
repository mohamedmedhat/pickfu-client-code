import React, { useState } from "react";
import "./AnswerInput.css";

const NewAnswer = ({ socket }) => {
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState([]);
  const notAllowedWords = ["yes", "no"];
  const notAllowedSentence = ["I don't know", "that's fine"];

  const submitForm = (e) => {
    e.preventDefault();
    const strSplit = value.split(" ");
    const notAllowed = notAllowedWords
      .map((a) => {
        const word = value.includes(a) ? a : null;
        const dblCheck = strSplit.includes(word) ? word : null;
        return dblCheck;
      })
      .filter((a) => a != null);
    const notAllowedPhrase = notAllowedSentence
      .map((a) => (value.includes(a) ? a : null))
      .filter((a) => a != null);
    let allNotAllowed = [];
    if (notAllowed.length > 0) allNotAllowed.push(notAllowed);
    if (notAllowedPhrase.length > 0) allNotAllowed.push(notAllowedPhrase);
    setErrors([]);
    setErrors(allNotAllowed);
    if (allNotAllowed.length === 0 && value.trim() !== "") {
      socket.emit("answer", value);
      setValue("");
    }
    debugger;
    if (value.trim() === "") {
        const empty =["Cannot submit empty value"];
      setErrors(empty);
    }
  };

  return (
    <form onSubmit={submitForm}>
      {errors.length > 0 && <em style={{color: "red"}}>not allowed words: {errors.join(", ")}</em>}
      <div className="row">
        <input
          autoFocus
          value={value}
          placeholder="Type your answer"
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
        <button className="btn btn-primary">Submit Answer</button>
      </div>
    </form>
  );
};

export default NewAnswer;
