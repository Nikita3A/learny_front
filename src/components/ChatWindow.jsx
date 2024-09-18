import React from 'react';
import InputWithButton from './InputWithButton';

const ChatWindow = ({ chat, messages, onBackClick, onSubmitMessage }) => {
  return (
    <div className="flex-grow w-full bg-dark py-2 overflow-hidden flex flex-col">
      {/* Chat header */}
      <div className="flex items-center justify-between bg-darkGray rounded-lg p-2 text-white">
        <div className="text-xl font-bold">{chat.name}</div>
        <button onClick={onBackClick} className="text-white w-5 h-5">
          <img className='rotate-180' src="./arrowInCircle.png" alt="" />
        </button>
      </div>

      {/* Messages container */}
      <div className="flex-grow overflow-y-auto px-4 py-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              message.type === 'received' ? 'bg-mediumGray' : 'bg-green text-white'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Input with button */}
      <div className="mt-2">
        <InputWithButton onSubmit={onSubmitMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;
