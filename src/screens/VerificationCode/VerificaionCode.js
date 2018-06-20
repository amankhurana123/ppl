import React, { Component } from "react";
import { apiInstance } from "../../utilies/api";
export default class VerificationCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "amankhurana258@gmail.com",
        verificationCode: ""
      },
      error: {
        email: "",
        verificationCode: ""
      }
    };
  }
  onChangeState = (value, key) => {
    this.state.user[key] = value;
    this.setState({});
  };
  resendOTP = () => {
    const header = {
      "content-type": "application/json",
      Accept: "application/json"
    };
    const options = {
      method: "post",
      url: "/user1/resendCode",
      data: this.state.user,
      header
    };
    apiInstance(options)
      .then(response => {
        alert("Mail is resend successfully.");
      })
      .catch(error => {
        alert("error", error);
      });
  };
  checkVerificationCode = () => {
    if (
      this.state.user.verificationCode.length == 0 ||
      !this.state.user.verificationCode.trim()
    ) {
      this.state.error.verificationCode = "Please enter the OTP.";
      this.setState({});
      return;
    } else if (this.state.user.verificationCode.length < 6) {
      this.state.error.verificationCode = "Please check your OTP.";
      this.setState({});
      return;
    } else {
    }
    const header = {
      "content-type": "application/json",
      Accept: "application/json"
    };
    const options = {
      method: "post",
      url: "/user1/verifyCode",
      data: this.state.user,
      header
    };
    apiInstance(options)
      .then(res => {
        alert(res);
        console.warn("response", res);
        this.props.navigation.navigate("Login");
      })
      .catch(error => {
        console.log("error", error);
      });
  };
}
