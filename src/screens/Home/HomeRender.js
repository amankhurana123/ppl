import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Home from "./Home";
import { styles } from "../../Styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { tabBarLabel } from "react-navigation";
export default class HomeRender extends Home {
  render() {
    let { screenProps } = this.props;
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between"
          }}
        >
          <Icon
            style={{ width: 42, height: 42 }}
            name="menu"
            color="white"
            size={42}
            onPress={() => this.props.navigation.toggleDrawer()}
          />

          <Text style={styles.text}>Home Screen</Text>
          <Icon
            style={{ width: 42, height: 42 }}
            name="logout"
            color="white"
            size={42}
            onPress={screenProps}
          />
        </View>
        <View
          style={[styles.viewInput, { backgroundColor: "white", flex: 4 / 5 }]}
        >
          <View />
        </View>
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
          <TouchableOpacity style={style.buttonView}>
            <View>
              {/* <Icon name="like" color="white" size={42} /> */}

              <Text style={style.textButton}>Like</Text>
            </View>
          </TouchableOpacity>
          <View style={style.buttonView}>
            {/* <Icon name="comments" color="white" size={42} /> */}
            <Text style={style.textButton}>Comment</Text>
          </View>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  buttonView: {
    backgroundColor: "blue",
    flex: 5 / 11,
    justifyContent: "space-between",
    alignContent: "space-around",
    borderRadius: 4,
    height: 36
  },
  textButton: {
    color: "white",
    alignSelf: "center",
    fontSize: 18
  }
});
