import React, { useContext } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../context/Context";
import Button from "@material-ui/core/Button";

export default function Login() {
  const queryStrings = new URLSearchParams(window.location.search);
  const isRegistered = queryStrings.has("registered");
  const {
    setUserData,
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(Context);
  const history = useHistory();

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await axios.post(
        `/users/login`,
        loginUser
      );
      setUserData({ user: {...loginRes.data.user, auth: loginRes.data.token} });
      localStorage.setItem("x-auth-token", loginRes.data.token);
      localStorage.setItem("userId", loginRes.data.user.id);
      localStorage.setItem("displayName", loginRes.data.user.displayName);
      history.push("/user/characters");
    } catch (err) {
      alert("User credentials does not match. Please check that you have entered the correct email and password." , err)
      console.error(err);
    }
  };

  return (
    <div className="auth-form-container">
      <h3>Account Login</h3>
      {isRegistered && (
        <p className="account-created-message">Your account has been created</p>
      )}
      <form className="login-form" onSubmit={handleUserLogin}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <Button variant="contained" type="submit" color="secondary">
          Login
        </Button>
        <Link to="/register">
          {" "}
          Don't have an account? <br /> Sign up for one here!
        </Link>
      </form>
    </div>
  );
}
