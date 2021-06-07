import React from "react";

export default function Question({ question }) {
  return (
    <div>
      //Dangerously setting html passes in a value that might be effected by
      encoding issues and gets rid of these issues!
      <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
      {question.answerChoices.map((choice, index) => (
        <div key={index} className="choice-container">
          <p className="choice-prefix">{index + 1}</p>
          <p
            className="choice-text"
            dangerouslySetInnerHTML={{ __html: choice }}
          ></p>
        </div>
      ))}
    </div>
  );
}
