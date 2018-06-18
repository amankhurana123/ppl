import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { apiInstance } from "../../utilies/api";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyUser: {
        email: "",
        password: ""
      },
      error: {
        email: "",
        password: ""
      },
      navigatePage: false
    };
  }
  componentWillMount = () => {
    AsyncStorage.getItem("user")
      .then(response => {
        if (response != null) {
          this.props.navigation.navigate("Drawer");
        }
      })
      .catch(error => {
        console.warn("error are", error);
      });
  };

  isChangeState = (value, name) => {
    this.state.verifyUser[name] = value;
    this.state.error[name] = "";
    this.setState({});
  };
  isValid = () => {
    let { email, password } = this.state.verifyUser;
    email = email.trim();

    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!email.length) {
      this.state.error.email = "You must enter an email address";
      this.setState({});

      return;
    } else if (!password.length) {
      this.state.error.password = "You must enter a password";
      this.setState({});
      return;
    } else if (!filter.test(email)) {
      this.state.error.email = "Please enter a valid email address";
      this.setState({});
      return;
    } else if (password.length < 6 || password.length > 10) {
      this.state.error.password = "Password length should in between 6 to 10 ";
      this.setState({});

      return;
    } else {
      this.isLogin();
    }
  };
  isLogin = () => {
    let { verifyUser } = this.state;
    const headers = {
      "content-type": "application/json",
      Accept: "application/json"
    };
    const options = {
      method: "post",
      url: "/user/verify",
      data: verifyUser,
      headers
    };
    apiInstance(options)
      .then(response => {
        if (
          response.data == "Please enter the correct email" ||
          response.data == "You are not authoried user."
        ) {
          if (response.data == "You are not authoried user.") {
            this.state.error.email = "You are not authoried user.";
          } else {
            this.state.error.email = "Please enter the correct email";
          }
          this.setState({});
        } else if (response.data == "Please enter the correct password") {
          this.state.error.password = "Please enter the correct password";
          this.setState({});
        } else {
          AsyncStorage.setItem("user", JSON.stringify(response.data[0]));
          this.props.navigation.navigate("Drawer");
        }
      })
      .catch(err => {
        console.warn("error", err);
      });
  };
}
