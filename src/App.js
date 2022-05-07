import React from "react";
import "./style.css";
import StartPage from "./components/StartPage";
import QuizPage from "./components/QuizPage";

function App() {
  const [showQuiz, setShowQuiz] = React.useState(false);

  return (
    <div className="App">
      {showQuiz ? (
        <QuizPage stopQuiz={() => setShowQuiz(false)} />
      ) : (
        <StartPage startQuiz={() => setShowQuiz(true)} />
      )}
    </div>
  );
}

export default App;
