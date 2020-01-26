import React, { Component } from "react";
import { QuizData } from "./gkdata";
export default class generalknowledge extends Component {
  state = {
    userAnswer: null,
    currentQuetion: 0,
    options: [],
    quizend: false,
    score: 0,
    disabled: true
  };
  loadgk = () => {
    const { currentQuetion } = this.state;
    this.setState(() => {
      return {
        quetions: QuizData[currentQuetion].question,
        options: QuizData[currentQuetion].options,
        answers: QuizData[currentQuetion].answer
      };
    });
  };
  componentDidMount() {
    this.loadgk();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuetion !== prevState.currentQuetion) {
      const { currentQuetion } = this.state;
      this.setState(() => {
        return {
          disabled: true,
          quetions: QuizData[currentQuetion].question,
          options: QuizData[currentQuetion].options,
          answers: QuizData[currentQuetion].answer
        };
      });
    }
  }

  nextquestion = () => {
    const { userAnswer, answers, score } = this.state;
    this.setState({
      currentQuetion: this.state.currentQuetion + 1
    });
    console.log(this.state.currentQuetion);
    if (userAnswer === answers) {
      this.setState({
        score: score + 1
      })
    }
  };
  checkAnswer = answer => {
    this.setState({
      userAnswer: answer,
      disabled: false
    });
  };

  finishquestion = () => {
    if (this.state.currentQuetion === QuizData.length - 1) {
      this.setState({
        quizend: true
      });
    }
  };
  render() {
    const {
      quetions,
      options,
      currentQuetion,
      userAnswer,
      quizend
    } = this.state;

    if (quizend) {
      return (
        <div className="box">
          <div>
            <h1>Whoooohoooo!</h1>
            <h2>Game over final score is {this.state.score} points</h2>
            <p>The correct answer was:</p>
            <ul>{QuizData.map((item, index) => (
              <li key={index}>{item.answer}</li>
            ))}</ul>
          </div>
        </div>
      );
    }
    return (
      <div className="box">


        <div>
          <h1>Quizbox</h1>
          <h2>Let's have Fun!!!!!!!!</h2>
          <h1>{quetions}</h1>
          <span>{`Questions ${currentQuetion + 1} out of ${QuizData.length
            } `}</span>
          {options.map(option => (
            <p
              key={option.id}
              className={`ui floating message ${userAnswer === option ? "selected" : null}`}
              onClick={() => this.checkAnswer(option)}
            >
              {option}
            </p>
          ))}
          <p />
          {currentQuetion < QuizData.length - 1 && (
            <button disabled={this.state.disabled} onClick={this.nextquestion} className="btn-next">
              Next
          </button>
          )}
          {currentQuetion === QuizData.length - 1 && (
            <button onClick={this.finishquestion} className="btn-next">Finish</button>
          )}
        </div>
      </div>
    );
  }
}
