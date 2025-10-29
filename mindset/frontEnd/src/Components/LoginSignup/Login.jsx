import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";

function Login() {

  const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  const {login} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = await login(email, password)
    console.log(user.role)
    if(user){
      if(user.role === "student") navigate("/rooms")
      if(user.role === "teacher") navigate("/my-rooms")
    }else {
      alert("Invalid credentials")
    }
  }
  return (
    <div className="container">
      <div className="page">
        <div className="header">
          <div className="login_title">Login</div>
          <div className="no_account">
            Don’t have an account? <Link to="/"><span>Sign up</span></Link>
          </div>
        </div>

        <div className="inputs">
          <div className="input">
            <input name="email" type="email" placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <input name="password" type="password" placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="options">
          <div className="remember">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <div className="forgot">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </div>

        <button type="submit" onClick={handleSubmit} className="loginButton">Login</button>
      </div>
    </div>
  );
}

export default Login;
