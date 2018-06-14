import React, { Component } from "react";
import { apiInstance } from "../../utilies/api";
import { AsyncStorage } from "react-native";

export default class Home extends Component {
  static navigationOptions = {
    drawerLabel: "Home"
  };
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      posts: [],
      showPost: {
        like: "",
        comment: "",
        postId: ""
      }
    };
  }
  componentWillMount = async () => {
    const response = await AsyncStorage.getItem("user");
    const user = JSON.parse(response);
    this.setState({ userId: user._id });
    const params = { userId: this.state.userId };
    console.warn(params);

    const options = {
      method: "get",
      url: "/post/show",
      params
    };
    apiInstance(options)
      .then(response => {
        this.state.posts = response.data;
        this.setState({});
      })
      .catch(error => console.warn(error, error));
  };
}
