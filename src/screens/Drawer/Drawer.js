import React, { Component } from "react";
import { DrawerNavigator } from "react-navigation";
import AddCategory from "../AddCategory/AddCategoryRender";
import Home from "../Home/HomeRender";
import AddPost from "../AddPost/AddPostRender";
import { AsyncStorage } from "react-native";
// import Logout from "./Logout";

let RootDrawer = DrawerNavigator(
  {
    Home: {
      screen: Home
    },
    AddCategory: { screen: AddCategory },
    AddPost: { screen: AddPost }
  },
  {
    initialRouteName: "Home",
    drawerPosition: "left",
    drawerWidth: 200
  }
);
export default class Drawer extends Component {
  constructor(props) {
    super(props);
  }
  logout = () => {
    let { RootStackNavigator } = this.props;
    AsyncStorage.removeItem("user")
      .then(user => {
        RootStackNavigator("Login");
      })
      .catch(error => {
        console.warn("error are", error);
      });
  };
  render() {
    return <RootDrawer screenProps={this.logout} />;
  }
}
