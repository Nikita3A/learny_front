import React from 'react';

const Profile = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-dark">
      <div className="bg-darkGray border-0 sm:border-mediumGray sm:border-2 p-4 sm:p-8 sm:rounded-2xl shadow-md w-full h-full sm:h-auto sm:max-w-md flex flex-col justify-start sm:mt-6 sm:mb-6">
        <h2 className="text-white text-2xl font-bold mt-16 mb-8 text-center sm:mt-6 sm:mb-8">Profile</h2>
        <div className="flex flex-col items-center mb-8">
          <img
            src="/user.png"
            alt="User Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
        </div>
        <form className="flex flex-col">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 bg-dark text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-green"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-dark text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-green"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-dark text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-green"
            />
          </div>
          <div className="mb-6">
            <button className="w-full p-3 bg-green text-white rounded-2xl hover:bg-green-dark focus:outline-none">
              Save
            </button>
          </div>
          <div>
            <button className="w-full p-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 focus:outline-none">
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
