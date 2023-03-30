import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Background from "./components/Background";
import Question from "./components/Question";
import FirstPage from "./components/FirstPage";

function App() {
  const [play, setPlay] = useState(false);
  const [fetchData, setFetchData] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const [checkAllResponse, setCheckAllResponse] = useState(false);
  const [numCorrectAnswer, setNumCorrectAnswer] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [setup, setSetup] = useState({
    category: "",
    difficulty: "",
    type: "",
  });

  const [dataFetch, setDataFetch] = useState(false)

  useEffect(() => {
    if (fetchData.length === 0 && play) {
      fetch(
        `https://opentdb.com/api.php?amount=5${
          setup.category !== "" ? `&category=${setup.category}` : ""
        }${setup.difficulty !== "" ? `&difficulty=${setup.difficulty}` : ""}${
          setup.type !== "" ? `&type=${setup.type}` : ""
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          setFetchData(data.results);
          setQuestionData(
            data.results.map((el) => {
              return {
                id: nanoid(),
                correctAnswer: el.correct_answer,
                allAnswer: [el.correct_answer, ...el.incorrect_answers].sort(
                  (a, b) => 0.5 - Math.random()
                ),
                selectedAnswer: "",
                question: el.question,
                isHeld: false,
              };
            })
          );
        });
        setDataFetch(true)
    }
  }, [fetchData, play]);

  function playBtn() {
    setPlay((prevPlay) => !prevPlay);
  }

  function setAnswer(id, response) {
    setQuestionData((prevQuestionData) =>
      prevQuestionData.map((el) => {
        return el.id === id
          ? {
              ...el,
              selectedAnswer: el.selectedAnswer === response ? "" : response,
              isHeld: el.selectedAnswer === response ? false : true,
            }
          : el;
      })
    );
  }

  function verifyAnswers() {
    const notAllAnswers = !questionData.every(el => el.isHeld);
    setCheckAllResponse(notAllAnswers);

    if(!notAllAnswers) {
      questionData.forEach((el) => {
        if (el.selectedAnswer === el.correctAnswer) {
          setNumCorrectAnswer((prevState) => prevState + 1);
        }
        setShowResults(true)
      });
    }
  }

  function playAgain() {
    setPlay((prevPlay) => !prevPlay);
    setShowResults(false);
    setFetchData([]);
    setNumCorrectAnswer(0);
    setSetup((prevSetup) => {
      return {
        ...prevSetup,
        category: "",
        difficulty: "",
        type: "",
      };
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setSetup((prevSetup) => {
      return {
        ...prevSetup,
        [name]: value,
      };
    });
  }

  const item = questionData.map((el) => (
    <Question
      key={el.id}
      id={el.id}
      question={el.question}
      allAnswer={el.allAnswer}
      setAnswer={setAnswer}
      selectedAnswer={el.selectedAnswer}
      showResults={showResults}
      correctAnswer={el.correctAnswer}
    />
  ));

  return (
    <div>
      <Background />
      <section>
        <div className="container d-flex justify-content-center align-items-center">
          <div className="row py-5 d-flex justify-content-center align-items-center">
            {play === false ? (
              <FirstPage
                playBtn={playBtn}
                handleChange={handleChange}
                setup={setup}
              />
            ) : dataFetch === false ? (
              <div
                className="spinner-border text-primary loading"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div className="question-container">
                {item}
                {checkAllResponse && (
                  <p className="not-all text-center">
                    There are questions not answered yet!
                  </p>
                )}
                {!showResults && (
                  <button
                    className="btn btn-outline-primary btn-lg check-btn"
                    onClick={verifyAnswers}
                  >
                    Check answers
                  </button>
                )}
                {showResults && (
                  <div className="d-flex justify-content-center align-items-baseline score-container">
                    <p className="score-text">
                      You scored {numCorrectAnswer}/5 correct answers
                    </p>
                    <button
                      className="btn btn-outline-primary btn-lg play-btn"
                      onClick={playAgain}
                    >
                      Play again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
