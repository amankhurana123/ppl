import React, { Component } from "react";
import { apiInstance } from "../../utilies/api";
import * as ImagePicker from "react-native-image-picker";
import { AsyncStorage } from "react-native";
let options = {
  title: "Select Avatar",
  customButton: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};
export default class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        postTitle: "",
        avatarSource: {},
        categoryId: "",
        userId: "",
        postDiscription: ""
      },
      category: [],
      error: {
        postTitle: "",
        categoryId: ""
      },
      flag: ""
    };
  }
  componentWillMount = () => {
    AsyncStorage.getItem("user")
      .then(response => {
        const user = JSON.parse(response);
        this.state.post.userId = user._id;

        this.setState({});
      })
      .catch(error => {
        console.warn("Error", error);
      });

    const options = {
      method: "get",
      url: "/category/view"
    };
    apiInstance(options)
      .then(response => {
        this.setState({ category: response.data });
      })
      .catch(error => {
        console.log("error is<><><<><><><><><", error);
      });
  };
  onChangeState = (value, name) => {
    this.state.post[name] = value;
    this.state.error[name] = "";
    this.setState({});
  };
  show = () => {
    ImagePicker.showImagePicker(response => {
      if (response.didCancel) {
        console.warn("user cancel picker image");
      } else if (response.error) {
        consoel.warn("Error is", response.error);
      } else if (response.customButton) {
        console.warn(
          "User tapped the custom button please:",
          response.customButton
        );
      } else {
        this.state.post.avatarSource.uri = response.uri;
        this.state.post.avatarSource.size = response.fileSize;
        this.state.post.avatarSource.name = response.fileName;
        this.state.post.avatarSource.type = "image/jpeg";
        this.state.flag = true;
        this.setState({});
      }
    });
  };
  isValid = () => {
    let { postTitle, categoryId } = this.state.post;
    postTitle = postTitle.trim();
    if (categoryId.length === 0) {
      this.state.error.categoryId = "Please enter the category";
      this.setState({});
      return;
    } else if (postTitle.length === 0) {
      this.state.error.postTitle = "Please enter the title of the post";
      this.setState({});
      return;
    } else {
      this.addNewPost();
    }
  };
  addNewPost = () => {
    let { postTitle, avatarSource, categoryId, userId } = this.state.post;
    let data = new FormData();
    data.append("postTitle", postTitle);
    data.append("avatarSource", avatarSource);
    data.append("categoryId", categoryId);
    data.append("userId", userId);
    const headers = {
      "content-type": "multipart/form-data",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*"
    };
    const options = {
      method: "post",
      url: "/post/create",
      data,
      headers
    };
    apiInstance(options)
      .then(response => {
        alert("Post is created");
      })
      .catch(error => {
        alert("Error", error);
      });
  };
}
