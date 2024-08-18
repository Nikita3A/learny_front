import React from 'react';

const SelectedChat = ({ selectedChat, messages, onBackClick }) => {
  return (
    <div className="flex-grow w-full bg-dark px-4 py-2 overflow-hidden">
      <div className="flex items-center justify-between bg-darkGray rounded-lg p-2 text-white">
        <div className="text-xl font-bold">{selectedChat.name}</div>
        <button onClick={onBackClick} className="text-white">
          Back
        </button>
      </div>
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
    </div>
  );
};

export default SelectedChat;
