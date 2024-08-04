import React, { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import MyButton from "../../components/button";
import DarkModeButton from "../../components/darkMode"
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleSignup = async (e) => {
    e.preventDefault();
    // if (password !== confirmPassword) {
    //   alert("Passwords do not match");
    //   return;
    // }
    dispatch(loginStart());
    try {
      const res = await axios.post("/api/auth/signup", {
        email,
        username,
        password,
      });
      dispatch(loginSuccess(res.data));
      navigate("/signin");
    } catch (err) {
      dispatch(loginFailed());
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="bg-darkGray border-mediumGray border-2 p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">Learny</h2>
        <form>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 bg-dark text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-green"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="email@mail.com"
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
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 bg-dark text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-green"
            />
          </div>
          <div className="mb-4">
            <button className="w-full p-3 bg-green text-white rounded-2xl hover:bg-green-dark focus:outline-none">
              Sign up
            </button>
          </div>
          <div className="text-center">
            <button className="w-full p-3 bg-dark text-white flex items-center justify-center rounded-2xl focus:outline-none">
              <img src="/google.png" alt="Google" className="h-5 w-5 mr-2" />
              Signup with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );  
};

export default Signup;