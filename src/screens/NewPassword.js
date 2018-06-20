import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { styles } from "../Styles";
import Icon from "react-native-vector-icons/MaterialIcons";
export default class NewPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      verificationCode: null,
      password: "",
      error: ""
    };
  }
  isValid = () => {
    let { password, confirmPassword } = this.state;
    if (!password.length) {
      this.setState({ error: "Please enter the password" });
    }
  };
  componentDidMount() {
    const { email } = this.props.navigation.state.params;
    const userEmail = JSON.parse(decodeURI(email));
    this.state.email = userEmail.email;
    this.setState({});
  }
  render() {
    return (
      <View style={styles.container}>
        <Icon
          name="keyboard-arrow-left"
          color="white"
          size={42}
          onPress={() => {
            this.props.navigation.navigate("Login");
          }}
          style={{ width: 42, height: 42 }}
        />

        <Text style={styles.text}>New Password</Text>
        <View style={[styles.viewInput, { flex: 3 / 4 }]}>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            autoCorrect={null}
            secureTextEntry={true}
            placeholder="Enter the new Password"
            placeholderTextColor="white"
            underlineColorAndroid="white"
            onChangeText={text => {
              this.setState({ password: text, error: "" });
            }}
            value={this.state.password}
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
