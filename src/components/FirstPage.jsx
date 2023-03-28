import React from "react"

function FirstPage(props) {
    return (
        <div className="first-screen d-flex flex-column justify-content-center align-items-center">
            <h1 className="mb-2">Quizzical</h1>
            <p className="mb-5">Test your knowledge</p>
            <button className="btn btn-outline-primary btn-lg" onClick={props.playBtn}>
                Start Quizz
            </button>
        </div> 
    )
}

export default FirstPage