import React from "react";
import Question from "./Question";

function QuizPage(props) {
  const [questionsData, setQuestionsData] = React.useState([]);

  const [quizEnd, setQuizEnd] = React.useState({
    isEnd: false,
    score: 0,
  });

  // save the api data in questionsData
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((data) => setQuestionsData(data.results));

    return () => {
      setQuestionsData([]);
    };
  }, []);

  function increaseScore() {
    setQuizEnd((prevQuizEnd) => ({
      ...prevQuizEnd,
      score: prevQuizEnd.score + 1,
    }));
  }

  function endQuiz() {
    setQuizEnd((prevQuizEnd) => ({ ...prevQuizEnd, isEnd: true }));
  }

  function resetGame() {
    setQuizEnd({
      isFinish: false,
      score: 0,
    });
    props.stopQuiz();
  }

  const questionsElements = questionsData.map((data) => {
    return (
      <>
        <Question
          key={data.question}
          question={data.question}
          correctAnswer={data.correct_answer}
          incorrectAnswers={data.incorrect_answers}
          quizEnd={quizEnd.isEnd}
          increaseScore={increaseScore}
        />
        <hr />
      </>
    );
  });

  return (
    <div className="quiz">
      {questionsElements}
      <div className="quiz--footer">
        <p className="quiz--score">
          {quizEnd.isEnd && `you scored ${quizEnd.score}/10 correct answers`}
        </p>
        <button
          className="quiz--btn"
          onClick={quizEnd.isEnd ? resetGame : endQuiz}
        >
          {quizEnd.isEnd ? "Play again" : "Check answers"}
        </button>
      </div>
    </div>
  );
}

export default QuizPage;
