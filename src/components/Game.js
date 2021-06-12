import React, { useEffect, useState, useCallback } from "react";
import Question from "./Question";
import { loadQuestions } from "../helpers/QuestionsHelper";
import HUD from "./HUD";
import SaveScoreForm from "./SaveScoreForm";

export default function Game({ history }) {
  //Defining the state for the questions

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    loadQuestions()
      .then((questions) => setQuestions(questions))
      .catch((err) => console.error(err));
  }, []);

  //This function handles the push back to the home page once a user has saved his/her score
  const scoreSaved = () => {
    history.push("/");
  };

  const changeQuestion = useCallback(
    (bonus = 0) => {
      //Defining the state of done to true when no questions are left in the question array!
      //Makes sure the bonus is added for the last question in the array!
      if (questions.length === 0) {
        setDone(true);
        return setScore(score + bonus);
      }

      //get a random index of a question
      const randomQuestionIndex = Math.floor(Math.random() * questions.length);
      //set the current question to the question at that random index
      const currentQuestion = questions[randomQuestionIndex];
      //remove that question from the questions going forward
      const remainingQuestions = [...questions];
      remainingQuestions.splice(randomQuestionIndex, 1);
      //Update the state to reflect these changes
      //Added score to the state to keep track of the user's score for correct answers

      setQuestions(remainingQuestions);
      setCurrentQuestion(currentQuestion);
      setLoading(false);
      setScore(score + bonus);
      setQuestionNumber(questionNumber + 1);
    },
    [
      score,
      questionNumber,
      questions,
      setQuestions,
      setLoading,
      setCurrentQuestion,
      setQuestionNumber,
    ]
  );

  useEffect(() => {
    if (!currentQuestion && questions.length) {
      changeQuestion();
    }
  }, [currentQuestion, questions, changeQuestion]);

  //Here we use the && operator to only render the Question component with
  //the state of currentQuestion when React actually has a state with the
  //current question
  //Meaning only if the Fetch API was successfull and
  //updated the state!
  // const { loading, done, score, currentQuestion, questionNumber } = this.state;
  return (
    <>
      {loading && !done && <div id="loader" />}

      {!done && !loading && currentQuestion && (
        <div>
          <HUD score={score} questionNumber={questionNumber} />
          <Question
            question={currentQuestion}
            changeQuestion={changeQuestion}
          />
        </div>
      )}
      {done && <SaveScoreForm score={score} scoreSaved={scoreSaved} />}
    </>
  );
}
//Displays the loading icon div only while loading=true, else, if false, renders the question! And only while we are not done
