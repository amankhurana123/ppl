import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "../Styles";
import { apiInstance } from "../utilies/api";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: ""
    };
  }
  isValid = () => {
    let { email } = this.state;
    email = email.trim();

    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!email.length) {
      this.setState({ error: "Enter the email address" });
      return;
    } else if (!filter.test(email)) {
      this.setState({ error: "Please enter valid email address" });
      return;
    } else {
      this.sendForgotPasswordLink();
      return;
    }
  };
  sendForgotPasswordLink = () => {
    const header = {
      "content-type": "application/json",
      Accept: "application/json"
    };
    const data = { email: this.state.email };
    const options = {
      method: "post",
      url: "/user1/forgotPassword",
      data,
      header
    };
    apiInstance(options)
      .then(response => {
        alert("Mail is send on your account");
        this.props.navigation.navigate("Login");
        console.warn("response", response);
      })
      .catch(error => {
        console.warn("error", error);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <Icon
          onPress={() => {
            this.props.navigation.navigate("Login");
          }}
          style={{ width: 42, height: 42 }}
          name="keyboard-arrow-left"
          color="white"
          size={42}
        />
        <Text style={styles.text}>Forgot Password</Text>
        <View style={[styles.viewInput, { flex: 3 / 4 }]}>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter the email address"
            placeholderTextColor="white"
            underlineColorAndroid="white"
            value={this.state.email}
            onChangeText={text => {
              this.setState({ email: text, error: "" });
            }}
          />
          {this.state.error ? (
            <Text style={styles.errorStyle}>{this.state.error}</Text>
          ) : null}
          <View style={styles.button}>
            <Button title="Submit" onPress={this.isValid} />
          </View>
        </View>
      </View>
    );
  }
}
