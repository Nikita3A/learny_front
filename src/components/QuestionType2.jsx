import React, { useState } from 'react';

const QuestionType2 = ({ question, options, correctAnswers }) => {
  const [selected, setSelected] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (option) => {
    if (!isAnswered) {
      // Toggle selection
      if (selected.includes(option)) {
        setSelected(selected.filter((item) => item !== option));
      } else {
        setSelected([...selected, option]);
      }
    }
  };

  const checkAnswers = () => {
    setIsAnswered(true);
  };

  return (
    <div className="p-4 bg-dark text-white rounded-lg">
      <h3 className="text-xl mb-4">{question}</h3>
      <div>
        {options.map((option, index) => (
          <div key={index} className="mb-2">
            <button
              className={`p-2 rounded-lg w-full text-left ${
                isAnswered && correctAnswers.includes(option)
                  ? 'bg-green'
                  : selected.includes(option)
                  ? 'bg-mediumGray'
                  : 'bg-darkGray hover:bg-mediumGray'
              }`}
              onClick={() => handleSelect(option)}
              disabled={isAnswered} // Disable interaction after answer is checked
            >
              {option}
            </button>
          </div>
        ))}
      </div>
      <button
        className="mt-4 bg-green text-white p-2 rounded-lg"
        onClick={checkAnswers}
        disabled={isAnswered} // Disable after checking the answer
      >
        {isAnswered ? 'Checked' : 'Check Answer'}
      </button>
    </div>
  );
};

export default QuestionType2;
