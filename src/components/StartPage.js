function StartPage(props) {
  return (
    <div className="start-page">
      <h1 className="start-page--title">Quizzical</h1>
      <h2 className="start-page--description">Some description if needed</h2>
      <button className="start-page--btn" onClick={props.startQuiz}>
        Start quiz
      </button>
    </div>
  );
}

export default StartPage;
