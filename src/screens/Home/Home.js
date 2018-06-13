import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { DrawerNavigatorConfig, drawerLabel } from "react-navigation";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    drawerLabel: "Home"
  };
}
