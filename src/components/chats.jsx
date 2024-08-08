// src/components/chats.jsx

import React from 'react';

const ChatList = ({ chats, onChatSelect, onAddChat }) => {
  return (
    <div className="lex-grow overflow-y-auto px-4 py-2 space-y-2">
      {chats.map((chat, index) => (
        <div
          key={index}
          className="flex items-center bg-darkGray rounded-lg p-2 text-white"
          onClick={() => onChatSelect(chat)}
        >
          <div className="rounded-full bg-white w-10 h-10 flex items-center justify-center">
            <i className="fas fa-user text-blue-500"></i>
          </div>
          <div className="ml-2">
            <div className="text-lg font-semibold">{chat.name}</div>
          </div>
        </div>
      ))}
        <button className="w-full flex items-center justify-center bg-green text-white text-lg font-semibold rounded-lg py-2"
        onClick={onAddChat}
        >
            Add Chat
        </button>
    </div>
  );
};

export default ChatList;
