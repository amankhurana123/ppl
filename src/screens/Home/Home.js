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
        like: null,
        comment: "",
        postId: ""
      },
      flag: null,
      error: ""
    };
  }
  componentWillMount = async () => {
    const response = await AsyncStorage.getItem("user");
    const user = JSON.parse(response);
    const params = encodeURI(JSON.stringify({ userId: user._id }));

    const options = {
      method: "get",
      url: "/post/show?params=" + params
    };
    apiInstance(options)
      .then(response => {
        this.state.posts = response.data;
        this.setState({});
      })
      .catch(error => console.warn(error, error));
  };
  onChangeValue = () => {
    this.state.showPost.like = this.state.showPost.like + 1;

    this.setState({});
  };
  addComment = () => {
    let { comment } = this.state.showPost;
    if (!comment.trim()) {
      this.state.error = "Enter the comment";
      this.setState({});
    } else {
      this.setState({ flag: null, error: "" });
      this.commentSubmit();
    }
  };
  commentSubmit = () => {
    const header = {
      "content-type": "application/json",
      Accept: "application/json"
    };
    let { showPost } = this.state;
    const options = {
      method: "post",
      url: "/showPost/post",
      data: showPost,
      headers
    };
    apiInstance(options)
      .then(response => {
        console.warn("response");
      })
      .catch(error => console.warn("error are", error));
  };
}
