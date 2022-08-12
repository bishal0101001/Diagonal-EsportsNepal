import React from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Joi from "joi-browser";

import Form from "../components/common/Form";

import AccountCircle from "@mui/icons-material/AccountCircle";
import HttpsIcon from "@mui/icons-material/Https";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { login } from "../actions/userActions";

class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
    showPassword: false,
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    const { email, password } = { ...this.state.data };
    this.props.dispatch(login(email, password));
  };

  handleClickShowPassword = () => {
    let showPassword = this.state.showPassword;
    this.setState({ showPassword: !showPassword });
  };

  render() {
    const { userInfo, loading, error } = this.props.userLogin;
    const { showPassword } = this.state;
    const sx = { color: "action.active", mr: 1, mt: 1.8, fontSize: 30 };
    return (
      <div className="__login">
        {loading && this.renderBackdrop(loading)}
        {userInfo && <Navigate to="/" replace={true} />}
        <div className="container">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email", () => (
              <AccountCircle sx={sx} />
            ))}
            {this.renderInput(
              "password",
              "Password",
              () => (
                <HttpsIcon sx={sx} />
              ),
              () => (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              error,
              showPassword ? "text" : "password"
            )}
            {this.renderButton("Login", "login-btn")}
          </form>
          <Link to="/reset-password">Forgot your password?</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ userLogin: state.userLogin });

export default connect(mapStateToProps)(Login);
