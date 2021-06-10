import React, { Component } from "react";
import Question from "./Question";
import { loadQuestions } from "../helpers/QuestionsHelper";
import HUD from "./HUD";
import SaveScoreForm from "./SaveScoreForm";

export default class Game extends Component {
  //Defining the state for the questions
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      currentQuestion: null,
      loading: true,
      score: 0,
      questionNumber: 0,
      done: false,
    };
  }

  //componentDidMount is a function that gets triggered when the application is loaded i.e. ready to go
  async componentDidMount() {
    //Here we know await the function defined in the QuestionsHelper file that we imported above!
    try {
      const questions = await loadQuestions();
      //Updating the state with the questions and the currentQuestion set to the index [0] of the questions array
      this.setState(
        {
          questions,
        },
        () => {
          this.changeQuestion();
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  changeQuestion = (bonus = 0) => {
    //Defining the state of done to true when no questions are left in the question array!
    if (this.state.questions.length === 0) {
      return this.setState({ done: true });
    }

    //get a random index of a question
    const randomQuestionIndex = Math.floor(
      Math.random() * this.state.questions.length
    );
    //set the current question to the question at that random index
    const currentQuestion = this.state.questions[randomQuestionIndex];
    //remove that question from the questions going forward
    const remainingQuestions = [...this.state.questions];
    remainingQuestions.splice(randomQuestionIndex, 1);
    //Update the state to reflect these changes
    //Added score to the state to keep track of the user's score for correct answers
    this.setState((prevState) => ({
      questions: remainingQuestions,
      currentQuestion,
      loading: false,
      score: (prevState.score += bonus),
      questionNumber: prevState.questionNumber + 1,
    }));
  };

  //Here we use the && operator to only render the Question component with
  //the state of currentQuestion when React actually has a state with the
  //current question
  //Meaning only if the Fetch API was successfull and
  //updated the state!
  render() {
    return (
      <>
        {this.state.loading && !this.state.done && <div id="loader" />}

        {!this.state.done && !this.state.loading && this.state.currentQuestion && (
          <div>
            <HUD
              score={this.state.score}
              questionNumber={this.state.questionNumber}
            />
            <Question
              question={this.state.currentQuestion}
              changeQuestion={this.changeQuestion}
            />
          </div>
        )}
        {this.state.done && <SaveScoreForm score={this.state.score} />}
      </>
    );
  }
}
//Displays the loading icon div only while loading=true, else, if false, renders the question! And only while we are not done!
