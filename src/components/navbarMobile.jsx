import React from 'react';

const Navbar = ({ onHomeClick, onMessagesClick, onUserClick }) => {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-darkGray">
      <div className="flex items-center space-x-4">
        <button className="text-white text-xl" onClick={onHomeClick}>
          <img src="/house.png" alt="Home" className="w-6 h-6 invert" />
        </button>
        <button className="text-white text-xl" onClick={onMessagesClick}>
          <img src="/message.png" alt="Messages" className="w-6 h-6" />
        </button>
      </div>
      <button className="text-white text-xl" onClick={onUserClick}>
        <img src="/user.png" alt="User" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Navbar;
