import React, { Component } from "react";
import Joi from "joi-browser";

import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Box,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import InputAdornment from "@mui/material/InputAdornment";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });

    if (!error) return null;
    const errors = {};
    error.details.forEach((item) => {
      errors[item.path[0]] = item.message;
    });

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderInput(
    name,
    label,
    icon,
    adornment = () => {},
    error = null,
    type = "text"
  ) {
    const { data, errors } = this.state;

    return (
      <Box sx={{ display: "flex" }}>
        {icon()}
        <FormControl>
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Input
            id={name}
            name={name}
            aria-describedby="my-helper-text"
            type={type}
            value={data[name]}
            onChange={this.handleChange}
            endAdornment={adornment()}
          />
          {errors && (
            <FormHelperText id="my-helper-text" error={true}>
              {errors[name]}
            </FormHelperText>
          )}
          {error && (
            <FormHelperText id="my-helper-text" error={true}>
              {error}
            </FormHelperText>
          )}
        </FormControl>
      </Box>
    );
  }

  renderBackdrop(loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading ? loading : false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  renderPasswordTooltip(title) {
    const HtmlTooltip = styled(({ className, ...props }) => (
      <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: "1px solid #dadde9",
      },
    }));
    return (
      <InputAdornment position="end">
        <HtmlTooltip title={title}>
          <InfoOutlinedIcon color="info" />
        </HtmlTooltip>
      </InputAdornment>
    );
  }

  renderButton(label, className) {
    return (
      <button className={className} disabled={this.validate()}>
        {label}
      </button>
    );
  }
}
