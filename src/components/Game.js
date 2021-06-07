import React, { Component } from "react";
import Question from "./Question";
import { loadQuestions } from "../helpers/QuestionsHelper";

export default class Game extends Component {
  //Defining the state for the questions
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      currentQuestion: null,
    };
  }

  //componentDidMount is a function that gets triggered when the application is loaded i.e. ready to go
  async componentDidMount() {
    //Here we know await the function defined in the QuestionsHelper file that we imported above!
    try {
      const questions = await loadQuestions();
      //Updating the state with the questions and the currentQuestion set to the index [0] of the questions array
      this.setState({ questions: questions, currentQuestion: questions[0] });
      console.log(questions);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <>
        //Here we use the && operator to only render the Question component with
        the state of currentQuestion when React actually has a state with the
        current question //Meaning only if the Fetch API was successfull and
        updated the state!
        {this.state.currentQuestion && (
          <Question question={this.state.currentQuestion} />
        )}
      </>
    );
  }
}
