import React from 'react'
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';

function Question(props) {
    
    const question = props.allAnswer.map((el) => 
        <div
            onClick={() => props.setAnswer(props.id, el)}
            key={nanoid()}
            className={`answer-box ${
                props.selectedAnswer === el ? "selected" : ""
            }
            ${props.showResults && el === props.correctAnswer ? "correct" : ""}
            ${
                props.showResults &&
                el === props.selectedAnswer &&
                el !== props.correctAnswer
                    ? "incorrect"
                    : ""
            }
            ${props.showResults && el !== props.correctAnswer ? "dimmed" : ""}
            `}
        >
            {decode(el)}
        </div>
    )
    
    return(
        <div className="">
            <h3 className="question-title">{decode(props.question)}</h3>
            <div className="d-flex flex-wrap">
                {question}
            </div>
            <hr />
        </div>
    )
}

export default Question
