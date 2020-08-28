import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../context/Context";
import Button from "@material-ui/core/Button";

export default function Register() {
  const { email, setEmail, password, setPassword } = useContext(Context);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const history = useHistory();

  const handleUserRegistration = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        alert("passwords do not match");
        return;
      }
      const registerUser = {
        email,
        password,
        passwordCheck: confirmPassword,
        displayName,
      };
      await axios.post(
        "/users/register",
        registerUser
      );
      history.push("/login?registered");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-form-container">
      <h3>Account Registration</h3>
      <form className="registration form" onSubmit={handleUserRegistration}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Type Password Again"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          placeholder="Display Name *Optional* "
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <Button variant="contained" type="submit" color="secondary">
          Register New Account
        </Button>
        <Link to="/login">
          {" "}
          Already have an account? <br /> Click here to Login
        </Link>
      </form>
    </div>
  );
}
