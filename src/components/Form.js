import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Message from "./Message";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailValid: false,
      isNameValid: false,
      isPhoneValid: false,
      isUrlValid: false,
      message: "Form is Incomplete!",
    };
    this.user = {
      name: "",
      email: "",
      phone: "",
      url: "",
    };

    this.updateFormField = this.updateField.bind(this);
  }
  updateField(event) {
    const value = event.target.value;
    const field = event.target.name;

    this.user[field] = value;
  }

  registerUser = (user) => {
    return new Promise((resolve) => {
      let response = "Form is Complete!";

      const validEmail = /\S+@\S+\.\S+/.test(user.email);
      const validName = /^[A-Za-z]+$/.test(user.name);
      const validPhone = /^[2-9]/.test(user.phone);
      const validUrl= /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(user.url);
      if (!user.email || !validEmail) {
        response = "Form is Incomplete!";
      }

      if (!user.name || user.name.length < 3 || !validName) {
        response = "Form is Incomplete!";
      }

      if (!user.phone || !validPhone) {
        response = "Form is Incomplete!";
      }

      if (!user.url || !validUrl) {
        response = "Form is Incomplete!";
      }

      setTimeout(() => {
        return resolve(response);
      }, Math.random() * 1000 + 800);
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();

    this.registerUser(this.user).then((response) => {
      console.log(response);
      this.setState({ message: response });
    });
  };
  render() {
    return (
      <div className="row">
        <h1 className="text-center">Form Validation</h1>
        <form>
          <h3>Name:</h3>
          <input
            type="text"
            className="name"
            name="name"
            placeholder="Enter your name"
            minLength="3"
            maxLength="30"
            onChange={this.updateFormField}
            id="test-name"
          />
          <h3>Email:</h3>
          <input
            type="email"
            className="email"
            name="email"
            placeholder="Enter your email"
            onChange={this.updateFormField}
            id="test-email"
          />
          <h3>Phone:</h3>
          <input
            type="text"
            name="phone"
            className="phone"
            minLength="10"
            maxLength="10"
            placeholder="Enter your phone number"
            onChange={this.updateFormField}
            id="test-phone"
          />
          <h3>Blog URL:</h3>
          <input
            type="text"
            name="url"
            className="url"
            placeholder="Enter your blog URL"
            onChange={this.updateFormField}
            id="test-blogurl"
          />
          <div className="small-6 small-centered text-center columns">
            <a
              href="#"
              className="button success expand round text-center"
              onClick={this.handleSubmit}
            >
              Verify
            </a>
          </div>
          <Message message={this.state.message} />
        </form>
      
      </div>
    );
  }
}

export default Form;
