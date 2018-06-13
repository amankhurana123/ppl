import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { styles } from "../../Styles";
import Register from "./Register";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class RegisterRender extends Register {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView>
            <Icon
              name="keyboard-arrow-left"
              color="white"
              size={42}
              onPress={() => {
                this.props.navigation.navigate("Login");
              }}
              style={{ width: 42, height: 42 }}
            />
            <Text style={styles.text}>Create an account</Text>

            <View style={[styles.viewInput, { flex: 3 / 4 }]}>
              <TouchableOpacity onPress={this.show}>
                <Text style={[styles.text, { fontSize: 18 }]}>
                  Upload your profile picture
                </Text>
                {this.state.flag ? (
                  <Image
                    source={this.state.user.avatarSource}
                    style={{ height: 150, width: 300, alignSelf: "center" }}
                  />
                ) : null}
              </TouchableOpacity>

              <TextInput
                autoCapitalize="none"
                underlineColorAndroid="white"
                autoCorrect={false}
                style={styles.textInput}
                placeholder="Enter the username"
                placeholderTextColor="white"
                onChangeText={text => this.onChangeState(text, "username")}
              />
              {this.state.error.username ? (
                <Text style={styles.errorStyle}>
                  {this.state.error.username}
                </Text>
              ) : null}
              <TextInput
                autoCapitalize="none"
                underlineColorAndroid="white"
                autoCorrect={false}
                style={styles.textInput}
                secureTextEntry={true}
                placeholder="Enter the password"
                placeholderTextColor="white"
                onChangeText={text => this.onChangeState(text, "password")}
              />
              {this.state.error.password ? (
                <Text style={styles.errorStyle}>
                  {this.state.error.password}
                </Text>
              ) : null}
              <TextInput
                autoCapitalize="none"
                underlineColorAndroid="white"
                autoCorrect={false}
                placeholderTextColor="white"
                placeholder="Enter the email address"
                style={styles.textInput}
                onChangeText={text => this.onChangeState(text, "email")}
              />
              {this.state.error.email ? (
                <Text style={styles.errorStyle}>{this.state.error.email}</Text>
              ) : null}
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="white"
                placeholder="Enter the first name"
                placeholderTextColor="white"
                style={styles.textInput}
                onChangeText={text => this.onChangeState(text, "firstName")}
              />
              {this.state.error.firstName ? (
                <Text style={styles.errorStyle}>
                  {this.state.error.firstName}
                </Text>
              ) : null}
              <TextInput
                autoCapitalize="none"
                underlineColorAndroid="white"
                autoCorrect={false}
                placeholder="Enter the last name"
                placeholderTextColor="white"
                style={styles.textInput}
                onChangeText={text => this.onChangeState(text, "lastName")}
              />
              {this.state.error.lastName ? (
                <Text style={styles.errorStyle}>
                  {this.state.error.lastName}
                </Text>
              ) : null}
              <View style={styles.button}>
                <Button title="Sign up" onPress={this.isValid} />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
