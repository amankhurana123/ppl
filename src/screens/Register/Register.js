import React, { Component } from "react";
import { apiInstance } from "../../utilies/api";
import * as ImagePicker from "react-native-image-picker";
let options = {
  title: "Select Avatar",
  customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        avatarSource: {},
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: ""
      },
      error: {
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: ""
      },
      flag: false
    };
  }

  onChangeState = (value, name) => {
    this.state.user[name] = value;
    this.state.error[name] = "";
    this.setState({});
  };
  isValid = () => {
    let { username, password, email, firstName, lastName } = this.state.user;
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    username = username.trim();
    email = email.trim();
    firstName = firstName.trim();

    lastName = lastName.trim();
    if (username.length === 0) {
      this.state.error.username = "Please enter the username.";
      this.setState({});

      return;
    } else if (password.length === 0) {
      this.state.error.password = "Please enter the password.";
      this.setState({});

      return;
    } else if (email.length === 0) {
      this.state.error.email = "Please enter the email address.";
      this.setState({});

      return;
    } else if (firstName.length === 0) {
      this.state.error.firstName = "Please enter the first name.";
      this.setState({});

      return;
    } else if (lastName.length === 0) {
      this.state.error.password = "Please enter the last name";
      this.setState({});

      return;
    } else if (password.length < 6 && password.length > 10) {
      this.state.error.password = "Password length between 6 to 10 letters.";
      this.setState({});

      return;
    } else if (!filter.test(email)) {
      this.state.error.email = "Please enter valid the email address.";
      this.setState({});

      return;
    } else {
      this.isRegister();
    }
  };
  isRegister = () => {
    let data = new FormData();
    let {
      firstName,
      lastName,
      email,
      password,
      username,
      avatarSource
    } = this.state.user;
    data.append("avatarSource", avatarSource);
    data.append("username", username);
    data.append("password", password);
    data.append("email", email);
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    const headers = {
      "content-type": "multipart/form-data",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*"
    };
    // console.log("===> ", data);
    const options = {
      method: "post",
      url: "/user1/create",
      data: data,
      headers
    };

    apiInstance(options)
      .then(response => {
        if (response.data == "UserName or email will already exists") {
          this.state.error.email = "Email is already exists.";
          this.setState({});
        } else {
          this.props.navigation.navigate("Login");
          alert("Verification code is send your email.");
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  show = () => {
    ImagePicker.showImagePicker(response => {
      if (response.didCancel) {
        console.warn("User cancelled image picker");
      } else if (response.error) {
        console.warn("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.warn(
          "User tapped custom button please: ",
          response.customButton
        );
      } else {
        console.log("image res.....", response);
        // let source = {
        //   uri: response.uri,
        //   type: "image/jpeg",
        //   name: response.fileName,
        //   size: response.fileSize
        // };

        this.state.user.avatarSource.uri = response.uri;
        this.state.user.avatarSource.size = response.fileSize;
        this.state.user.avatarSource.name = response.fileName;
        this.state.user.avatarSource.type = "image/jpeg";
        this.state.flag = true;
        this.setState({});
      }
    });
  };
}
