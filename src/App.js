import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Answers from "./Answers";
import AnswerInput from "./AnswerInput";
import logo from "./pickfulogo.png";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Header from "./Header";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      <header className="row">
        <div className="col-md-5">
          <img src={logo} className="logo" alt="logo" />
        </div>
        <div className="col-md-7 mt-5 subtitle">Answer This question</div>
      </header>

      {socket ? (
        <div className="chat-container">
          <Router>
            <div className="container">
              <div className="row">
                <Header />
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h2>Is a hot dog a sandwich? Why?</h2>

                  <hr />
                </div>
              </div>
            </div>
            <Switch>
              <Route exact path="/">
                <AnswerInput socket={socket} />
              </Route>
              <Route path="/answers">
                <Answers socket={socket} />
              </Route>
            </Switch>
          </Router>
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

export default App;
