import React, { Component } from "react";
import { apiInstance } from "../../utilies/api";
import * as ImagePicker from "react-native-image-picker";
let options = {
  title: "Select Avatar",
  customButton: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};
export default class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      error: "",
      avatarSource: {},
      flag: false
    };
  }
  onChangeState = value => {
    this.state.category = value;
    this.state.error = "";
    this.setState({});
  };
  isValid = () => {
    let { category } = this.state;
    category = category.trim();
    if (!category.length) {
      this.state.error = "Please enter the category.";
      this.setState({});
      return;
    } else {
      this.addCategory();
    }
  };
  addCategory = () => {
    let { category, avatarSource } = this.state;
    let data = new FormData();
    data.append("category", category);
    data.append("avatarSource", avatarSource);
    const headers = {
      "content-type": "multipart/form-data",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*"
    };
    const options = {
      method: "post",
      url: "/category/add",
      data,
      headers
    };
    apiInstance(options)
      .then(response => {
        if (response.data == "Category is already exists") {
          this.state.error = "Category is already exists.";
          this.setState({});
        } else {
          alert("Category is created successfully.");
        }
      })
      .catch(err => {
        console.log("Error", err);
      });
  };
  show = () => {
    ImagePicker.showImagePicker(response => {
      if (response.didCancel) {
        console.warn("User cancel image picker ");
      } else if (response.error) {
        console.warn("Image Picker Error:", response.error);
      } else if (response.customButton) {
        console.warn(
          "User tapped the custom button please:",
          response.customButton
        );
      } else {
        this.state.avatarSource.uri = response.uri;
        this.state.avatarSource.size = response.fileSize;
        this.state.avatarSource.name = response.fileName;
        this.state.avatarSource.type = "image/jpeg";
        this.state.flag = true;
        this.setState({});
      }
    });
  };
}
