import React, { useState } from "react";

export default function Question({ question, changeQuestion }) {
  //Setting states to track user's interaction with the answer options
  const [classToApply, setClassToApply] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [answering, setAnswering] = useState(false);

  const checkAnswer = (selectedAnswer) => {
    if (answering) return;

    //Check if the selected answer is the right answer (question.answer)
    setAnswering(true);
    setSelectedAnswer(selectedAnswer);
    //Applies a class depending on if the selectedAnswer is equal to the correct answer
    const classToApply =
      selectedAnswer === question.answer ? "correct" : "incorrect";
    setClassToApply(classToApply);
    //Applies a bonus score if the correct answer was chosen
    const bonus = selectedAnswer === question.answer ? 10 : 0;
    setSelectedAnswer(selectedAnswer);
    setAnswering(true);

    setTimeout(() => {
      setSelectedAnswer(-1);
      setAnswering(false);
      changeQuestion(bonus);
    }, 1000);
  };

  return (
    <div>
      <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
      {question.answerChoices.map((choice, index) => (
        <div
          key={index}
          className={`choice-container ${
            selectedAnswer === index && classToApply
          }`}
          onClick={() => checkAnswer(index)}
        >
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
//Dangerously setting html passes in a value that might be effected by
//encoding issues and gets rid of these issues!
