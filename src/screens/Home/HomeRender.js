import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import Home from "./Home";
import { styles } from "../../Styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/EvilIcons";
import config from "../../config/config";

export default class HomeRender extends Home {
  render() {
    const win = Dimensions.get("window");
    let { screenProps } = this.props;
    const { posts } = this.state;
    let postData = posts.map((value, index) => {
      return (
        <View key={index}>
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontFamily: "Roboto",
              justifyContent: "space-between",
              marginHorizontal: 25
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
              justifyContent: "space-between"
            }}
          />
          <View
            style={[
              styles.button,
              {
                flexWrap: "wrap",
                justifyContent: "space-around",
                flexDirection: "row"
              }
            ]}
          >
            <TouchableOpacity style={style.buttonView} activeOpacity={0.9}>
              <View>
                <Icons name="like" color="#f1680e" size={36}>
                  <Text />
                  <Text style={style.textButton}>Like</Text>
                </Icons>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={style.buttonView} activeOpacity={0.9}>
              <View>
                <Icons name="comment" color="#f1680e" size={36}>
                  <Text style={style.textButton}>Comment</Text>
                </Icons>
              </View>
            </TouchableOpacity>
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
const style = StyleSheet.create({
  buttonView: {
    backgroundColor: "white",
    flex: 5 / 11,
    justifyContent: "space-between",
    alignContent: "space-around",
    borderRadius: 4,
    height: 36,
    borderColor: "#f1680e"
  },
  textButton: {
    color: "#f1680e",
    alignSelf: "center",
    fontSize: 18
  }
});
