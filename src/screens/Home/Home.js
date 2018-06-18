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
      posts: [],
      showPost: {
        like: 0,
        comment: "none",
        postId: "",
        userId: {}
      },
      flagLike: null,
      flag: null
    };
  }
  componentDidMount = async () => {
    const response = await AsyncStorage.getItem("user");
    const user = JSON.parse(response);

    this.state.showPost.userId = user._id;
    this.setState({});

    const params = encodeURI(
      JSON.stringify({ userId: this.state.showPost.userId })
    );

    const options = {
      method: "get",
      url: "/post/show?params=" + params
    };
    apiInstance(options)
      .then(response => {
        this.state.posts = response.data;
        this.setState({});
        this.getPostData();
      })
      .catch(error => console.warn("error", error));
  };
  onChangeValue = index => {
    this.state.showPost.like = this.state.showPost.like + 1;
    this.state.flagLike = index;
    this.setState({});
    this.likeAndCommnetSubmit();
  };
  addComment = () => {
    this.setState({ flag: null });
    this.likeAndCommnetSubmit();
  };
  likeAndCommnetSubmit = () => {
    const headers = {
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
        console.log("response", response);

        console.warn("response", response);
      })
      .catch(error => {
        console.log("response", response);

        console.warn("error are", error);
      });
  };
  getPostData = () => {
    const params = encodeURI(
      JSON.stringify({ userId: this.state.showPost.userId })
    );
    const options = {
      method: "get",
      url: "/showPost/show?params=" + params,
      timeout: 1000
    };
    apiInstance(options)
      .then(response => {
        // console.warn(response);
        console.log("<><<><><><><>><><><response.data", response);
      })
      .catch(error => console.warn("error get", error));
  };
}
