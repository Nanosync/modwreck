import React, { useState } from "react";

const QuestionBox = ({question, options, selected}) => {
    const [disable, setDisable] = useState(0);
    const [answer, setAnswer] = useState(options);
    return (
        <div className= "questionBox">
            <div className="question">{question}</div>
            {answer.map((text) => (
                <button
                    className="answerBtn"
                    onClick={() => {
                        setDisable(!disable);
                        setAnswer([text]);
                        selected(text);
                    }}
                    disabled={disable}
                >
                    {text}
                </button>
            ))}
        </div>
    );
};

export default QuestionBox;
