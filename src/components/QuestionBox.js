import React, { useState } from "react";

const QuestionBox = ({ question, options, selected }) => {
    //setAnswer: function to update answer variable
    const [answer, setAnswer] = useState(options);
    //index from answer array
    return (
        <div className="questionBox">
            <div className="question">{question}</div>
            {answer.map((text, index) => (
                <button
                    key={index}
                    className="answerBtn"
                    onClick={() => {
                        //rewrite array with chosen answer
                        setAnswer([text]);
                        selected(text);
                    }}
                >
                    {text}
                </button>
            ))}
        </div>
    );
};

export default QuestionBox;
