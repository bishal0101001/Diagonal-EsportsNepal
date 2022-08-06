import React, { useState } from "react";
import Joi from "joi";

import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = validate({ username, email, password });

    console.log(data);

    if (data.error) return setMessage(data.error.message);

    if (password !== confirmPassword) {
      setMessage("Password not matched");
      clearMsg();
    } else {
      return (function () {
        console.log(username, email, password, confirmPassword, message);
      })();
    }
  };

  const clearMsg = () => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const validate = (data) => {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().pattern(
        new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ),
      password: Joi.string()
        .max(50)
        .pattern(
          new RegExp(
            /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
          )
        ),
    });

    // Passwords will contain at least 1 upper case letter
    // Passwords will contain at least 1 lower case letter
    // Passwords will contain at least 1 number or special character
    // Passwords will contain at least 8 characters in length
    // Password maximum length should not be arbitrarily limited

    return schema.validate(data, { abortEarly: false });
  };

  return (
    <div className="__register-form">
      <h1>Register</h1>
      <form className="form" onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            aria-describedby="my-helper-text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input
            id="email"
            aria-describedby="my-helper-text"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText> */}
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            aria-describedby="my-helper-text"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <Input
            id="confirmPassword"
            aria-describedby="my-helper-text"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {message && (
            <FormHelperText id="my-helper-text" error={true}>
              {message}
            </FormHelperText>
          )}
        </FormControl>
        <button type="submit" className="register">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
