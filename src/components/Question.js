import React from "react";

function Question(props) {
  const [answers, setAnswers] = React.useState(getStartAnswers());

  // check if the correct answer choose when quiz end
  React.useEffect(() => {
    if (props.quizEnd && checkIfCorrect()) props.increaseScore();
  }, [props.quizEnd]);

  function getStartAnswers() {
    const array = [];
    props.incorrectAnswers.forEach((ans) => {
      array.push({
        answer: ans,
        correct: false,
        isChoose: false,
      });
    });

    const randomIndex = Math.floor(Math.random() * array.length);
    array.splice(randomIndex, 0, {
      answer: props.correctAnswer,
      correct: true,
      isChoose: false,
    });

    for (let i = 0; i < array.length; i++) array[i] = { ...array[i], id: i };

    return array;
  }

  function checkIfCorrect() {
    return answers.some((ans) => ans.correct && ans.isChoose);
  }

  function chooseAnswer(ansId) {
    if (props.quizEnd) return;

    setAnswers((prevAnswers) => {
      return prevAnswers.map((ans) => {
        if (ans.id === ansId) return { ...ans, isChoose: true };

        return { ...ans, isChoose: false };
      });
    });
  }

  function getStyle(item) {
    if (!props.quizEnd) return {};

    if (item.correct) return { background: "#94D7A2" };

    if (item.isChoose) return { background: "#F8BCBC" };

    return {};
  }

  const answersElements = answers.map((item) => {
    return (
      <button
        key={item.id}
        onClick={() => chooseAnswer(item.id)}
        className={`answer-btn  ${item.isChoose && "choose"}`}
        style={getStyle(item)}
      >
        {item.answer}
      </button>
    );
  });

  return (
    <div className="question">
      <h3>{props.question}</h3>
      <div className="answers">{answersElements}</div>
    </div>
  );
}

export default Question;
