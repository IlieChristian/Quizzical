import React from "react"

function FirstPage(props) {
    return (
        <div className="first-screen d-flex flex-column justify-content-center align-items-center">
            <h1 className="mb-2">Quizzical</h1>
            <p className="mb-5">Test your knowledge</p>
            <div className="select-section">
                <label htmlFor="selectCategory">Select Category:</label>
                <select 
                    className="form-select" 
                    aria-label="Default select example" 
                    id="selectCategory"
                    onChange={(e) => props.handleChange(e)}
                    value={props.setup.category}
                    name="category"
                >
                    <option value="">Any Category</option>
                    <option value="9">General Knolage</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals & Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="31">Entertainment: Japanese Anime & Manga</option>
                    <option value="32">Entertainment: Cartoon & Animations</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="17">Science & Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                </select>
                <label htmlFor="selectCategory">Select Difficulty:</label>
                <select 
                    className="form-select" 
                    aria-label="Default select example" 
                    id="selectDifficulty"
                    onChange={(e) => props.handleChange(e)}
                    value={props.setup.difficulty}
                    name="difficulty"
                >
                    <option value="">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <label htmlFor="selectCategory">Select Type:</label>
                <select 
                    className="form-select" 
                    aria-label="Default select example" 
                    id="selectType"
                    onChange={(e) => props.handleChange(e)}
                    value={props.setup.type}
                    name="type"
                >
                    <option value="">Any Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                </select>
            </div>
            <button className="btn btn-outline-primary btn-lg" onClick={props.playBtn}>
                Start Quizz
            </button>
        </div> 
    )
}

export default FirstPage