import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { styles } from "../../Styles";
import Login from "./Login";
export default class LoginRender extends Login {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Login User</Text>

        <View style={[styles.viewInput, { flex: 3 / 4 }]}>
          <TextInput
            placeholder="Enter your email address"
            placeholderTextColor="white"
            underlineColorAndroid="white"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={text => {
              this.isChangeState(text, "email");
            }}
            style={styles.textInput}
          />
          {this.state.error.email ? (
            <Text style={styles.errorStyle}>{this.state.error.email}</Text>
          ) : null}

          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="white"
            underlineColorAndroid="white"
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={text => this.isChangeState(text, "password")}
            style={styles.textInput}
          />
          {this.state.error.password ? (
            <Text style={styles.errorStyle}>{this.state.error.password}</Text>
          ) : null}

          <Text
            style={styles.forgotPasswordText}
            onPress={() => {
              this.props.navigation.navigate("ForgotPassword");
            }}
          >
            forgot password
          </Text>
          <View style={styles.button}>
            <Button title="Login" onPress={this.isValid} />
          </View>
          <View style={styles.button}>
            <Button
              title="Create an account"
              onPress={() => {
                this.props.navigation.navigate("Register");
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
