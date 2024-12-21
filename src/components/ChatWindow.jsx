import React from 'react';
import InputWithButton from './InputWithButton';

const ChatWindow = ({ chat, messages, addUser, onSubmitMessage, currentUserId, currentUser }) => { // Add currentUser prop

  return (
    <div className="flex-grow w-full bg-dark py-2 overflow-hidden flex flex-col">
      {/* ... (Header remains the same) */}

      {/* Messages container */}
      <div className="flex-grow overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((message, index) => {
          const isCurrentUser = message.user && message.user.id === currentUserId;

          return (
            <div key={index} className="w-full">
              <div
                className={'p-2 rounded-lg max-w-2/3 break-words bg-mediumGray text-white mr-auto'
                }
              >
                <span className="font-bold mr-1">{message.user.username}:</span>
                {message.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input with button */}
      <div className="mt-2">
        <InputWithButton onSubmit={onSubmitMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;