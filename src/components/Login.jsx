import React, { useState } from "react";
import "./login.css";
import { login } from "../Redux/features/authSlice/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthentication } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { email, password }, { Credential: true });
  };

  {
    isAuthentication && navigate("/");
  }

  return (
    <div className="container">
      <div className="login_container">
        <div className="auth_heading">
          <h1>Log in</h1>
          <p>Welcome back! Please enter your details</p>
        </div>

        <form className="login_inputContainer" onSubmit={handleSubmit}>
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="auth_btns">
            <button className="btn1" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
