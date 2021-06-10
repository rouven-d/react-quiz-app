import React, { useState } from "react";
import { Link } from "react-router-dom";

//Defining the Form that gets displayed after a user is done with the quiz
//Aks for signup if the user wants to save his/her highscore
export default function SaveScoreForm({ score }) {
  const [username, setUsername] = useState("");

  //handles the username from the input field below and updates it with the users value
  const onUsernameChange = (event) => {
    const updatedUsername = event.target.value;
    setUsername(updatedUsername);
  };

  //handles the form submission, the record object will be saved to the database later on!
  const saveHighScore = (event) => {
    event.preventDefault();
    const record = {
      name: username,
      score,
    };
    console.log(record);
  };

  return (
    <div className="container">
      <h1>{score}</h1>
      <form onSubmit={saveHighScore}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="your username"
          value={username}
          onChange={onUsernameChange}
        />
        <button type="submit" className="btn" disabled={!username}>
          Save
        </button>
      </form>
      <Link to="/" className="btn">
        Go Home
      </Link>
    </div>
  );
}
