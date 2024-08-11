import React from 'react';
import '../../src/scrollbar.css'; // Adjust the path according to your project structure

const ChatList = ({ chats, onChatSelect, onAddChat }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Scrollable chat list */}
      <div className="flex-grow overflow-y-auto px-4 py-2 space-y-2 scrollbar-hidden">
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
      </div>

      {/* Sticky Add Chat button */}
      <div className="px-4 py-2 bg-dark">
        <button
          className="w-full flex items-center justify-center bg-green text-white text-lg font-semibold rounded-lg py-2"
          onClick={onAddChat}
        >
          Add Chat
        </button>
      </div>
    </div>
  );
};

export default ChatList;
