import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import Home from "./Home";
import { styles } from "../../Styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/EvilIcons";
import config from "../../config/config";

export default class HomeRender extends Home {
  render() {
    let { screenProps } = this.props;

    const win = Dimensions.get("window");

    if (!this.state.showPost.userId) {
      return (
        <View style={styles.container}>
          <ActivityIndicator color="lightgreen" size="large" />
        </View>
      );
    } else {
      const { posts } = this.state;
      let postData = posts.map((value, index) => {
        this.state.showPost.postId = value._id;
        return (
          <View key={index}>
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontFamily: "Roboto",
                justifyContent: "space-between",
                marginHorizontal: 25,
                marginVertical: 10
              }}
            >
              {value.postTitle}
            </Text>
            <Image
              source={{
                uri: `${config.serverUrl}/${value.avatarSource}`
              }}
              style={{
                width: win.width,
                height: (win.height * 3) / 4,
                borderWidth: 0.5,
                justifyContent: "space-between",
                marginVertical: 10
              }}
            />
            <View
              style={[
                styles.button,
                {
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  flexDirection: "row",
                  marginVertical: 10
                }
              ]}
            >
              <TouchableOpacity
                style={style.buttonView}
                activeOpacity={0.8}
                onPress={() => this.onChangeValue(index)}
              >
                <Icons name="like" color="#f1680e" size={36}>
                  <Text style={style.textButton}>
                    {this.state.flagLike == index && this.state.showPost.like}
                  </Text>
                  <Text style={style.textButton}>Like</Text>
                </Icons>
              </TouchableOpacity>
              <TouchableOpacity
                style={style.buttonView}
                activeOpacity={0.7}
                onPress={() => {
                  this.state.flag = index;
                  this.setState({});
                }}
              >
                <Icons name="comment" color="#f1680e" size={36}>
                  <Text style={style.textButton}>Comment</Text>
                </Icons>
              </TouchableOpacity>
            </View>
            <View>
              {this.state.flag == index ? (
                <View>
                  <TouchableHighlight>
                    <TextInput
                      multiline={true}
                      underlineColorAndroid="white"
                      placeholder="Your comments..."
                      placeholderTextColor="white"
                      autoCorrect={false}
                      autoCapitalize="sentences"
                      dataDetectorTypes="all"
                      editable={true}
                      style={{ color: "white" }}
                      onChangeText={text => {
                        this.state.showPost.comment = "text";
                        this.setState({});
                      }}
                    />
                  </TouchableHighlight>
                  <TouchableOpacity
                    style={[
                      style.buttonView,
                      {
                        alignSelf: "center",
                        width: 100,
                        marginVertical: 10
                      }
                    ]}
                    key={index}
                    activeOpacity={0.8}
                    onPress={this.addComment}
                  >
                    <Text style={style.textButton}>Submit</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
        );
      });
      return (
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              flex: 2 / 10,
              alignItems: "center"
            }}
          >
            <Icon
              name="menu"
              color="white"
              size={36}
              onPress={() => this.props.navigation.toggleDrawer()}
            />

            <Text style={styles.text}>Home Screen</Text>
            <Icon name="logout" color="white" size={36} onPress={screenProps} />
          </View>
          <ScrollView overScrollMode="always" scrollEnabled={true}>
            <View style={[styles.viewInput, { backgroundColor: "#ffa33c" }]}>
              {postData}
            </View>
          </ScrollView>
          <View>
            <Text />
          </View>
        </View>
      );
    }
  }
}
const style = StyleSheet.create({
  buttonView: {
    backgroundColor: "white",
    flex: 5 / 11,

    alignContent: "space-around",
    borderRadius: 5,
    height: 36,
    borderColor: "#c25b2c"
  },
  textButton: {
    color: "#c25b2c",
    alignSelf: "center",
    fontSize: 18
  }
});
