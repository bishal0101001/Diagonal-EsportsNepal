import React from "react";
import { connect } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import Joi from "joi-browser";

import Form from "./../components/common/Form";

import AccountCircle from "@mui/icons-material/AccountCircle";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HttpsIcon from "@mui/icons-material/Https";

import { Backdrop, CircularProgress, Typography } from "@mui/material";

import { register } from "./../actions/userActions";

class Registers extends Form {
  state = {
    data: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    showPassword: false,
    errors: {},
  };

  schema = {
    username: Joi.string().min(3).max(30).required().label("Username"),
    email: Joi.string().email().required(),
    password: Joi.string()
      .max(50)
      .min(8)
      .regex(
        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      ),
    confirmPassword: Joi.any()
      .required()
      .valid(Joi.ref("password"))
      .options({ language: { any: { allowOnly: "must match password" } } })
      .label("Confirm Password"),
  };

  doSubmit = () => {
    const data = { ...this.state.data };
    delete data.confirmPassword;

    const { username, email, password } = data;

    this.props.dispatch(register(username, email, password));
  };

  showPassword = (e) => {
    let showPassword = { ...this.state.showPassword };
    showPassword = e.target.checked;
    this.setState({ showPassword });
  };

  render() {
    if (this.props.userLogin.userInfo) return <Navigate to="/" />;
    const sx = { color: "action.active", mr: 1.5, mt: 2.5, fontSize: 30 };
    const { error, loading } = this.props.userRegister;
    const { showPassword } = this.state;

    const title = (
      <React.Fragment>
        <Typography color="inherit">Suggestions</Typography>
        <ul>
          <li>{"- At least 1 UPPERCASE (A-Z)"}</li>
          <li>{"- At least 1 lowercase (a-z)"}</li>
          <li>
            {"- At least 1 number or special character (eg.1,2,@,#,$,%.....)"}
          </li>
          <li>{"- Minimum 8 characters"}</li>
        </ul>
      </React.Fragment>
    );

    return (
      <div className="__register">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading ? loading : false}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", () => (
            <AccountCircle sx={sx} />
          ))}
          {this.renderInput("email", "Email", () => (
            <ContactMailIcon sx={sx} />
          ))}
          {this.renderInput(
            "password",
            "Password",
            () => (
              <HttpsIcon sx={sx} />
            ),
            () => this.renderPasswordTooltip(title),
            "",
            showPassword ? "text" : "password"
          )}
          {this.renderInput(
            "confirmPassword",
            "Confirm Password",
            () => (
              <HttpsIcon sx={sx} />
            ),
            () => {},
            error,
            showPassword ? "text" : "password"
          )}
          <div className="show-password">
            <input type="checkbox" onChange={(e) => this.showPassword(e)} />
            <span>Show Password</span>
          </div>
          {this.renderButton("Sign up", "register")}
        </form>
        <div className="redirect-login">
          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userRegister: state.userRegister,
  userLogin: state.userLogin,
});

export default connect(mapStateToProps)(Registers);
