/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import Login from "./src/screens/Login/LoginRender";
import Register from "./src/screens/Register/RegisterRender";
import ForgotPassword from "./src/screens/ForgotPassword";
import NewPassword from "./src/screens/NewPassword";
import Drawer from "./src/screens/Drawer/Drawer";
import VerificationCode from "./src/screens/VerificationCode/VerificationCodeRender";
import SplashScreen from "react-native-splash-screen";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});
let nullHeader = ({ navigation }) => {
  return { header: null };
};

let RootStack = createStackNavigator(
  {
    Login: { screen: Login, navigationOptions: nullHeader },
    Register: { screen: Register, navigationOptions: nullHeader },
    Drawer: {
      screen: props => (
        <Drawer {...props} RootStackNavigator={props.navigation.navigate} />
      ),
      navigationOptions: nullHeader
    },
    ForgotPassword: { screen: ForgotPassword, navigationOptions: nullHeader },
    NewPassword: { screen: NewPassword, navigationOptions: nullHeader },
    VerificationCode: {
      screen: VerificationCode,
      navigationOptions: nullHeader
    }
  },
  {
    initialRouteName: "Login"
  }
);

export default class App extends Component {
  componentWillMount() {
    SplashScreen.hide();
  }
  render() {
    return <RootStack />;
  }
}
