import React from "react";
import AddPost from "./AddPost";
import { styles } from "../../Styles";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Picker
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import config from "../../config/config";

export default class AddPostRender extends AddPost {
  render() {
    let { screenProps } = this.props;
    let { category } = this.state;
    let image = () => {
      {
        category.map((value, index) => {
          return (
            <Image
              source={{
                uri: `${config.serverUrl}/${value.avatarSource}`
              }}
              key={index}
              style={{
                width: 50,
                height: 50,
                borderColor: "#fff",
                borderWidth: 1
              }}
            />
          );
        });
      }
    };
    let options = () => {
      let option = [
        <Picker.Item key={"default"} label="Select the category" value="none" />
      ];
      category.map((item, index) => {
        option.push(
          <Picker.Item key={index} label={item.category} value={item._id} />
        );
      });
      return option;
    };

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

          <Text style={styles.text}>Add a new Post</Text>
          <Icon
            style={{ width: 42, height: 42 }}
            name="logout"
            color="white"
            size={42}
            onPress={screenProps}
          />
        </View>
        <View style={[styles.viewInput, { flex: 3 / 4 }]}>
          <ScrollView>
            <TouchableOpacity onPress={this.show}>
              {this.state.flag ? (
                <Image
                  source={this.state.post.avatarSource}
                  style={{ height: 150, width: 300, alignSelf: "center" }}
                />
              ) : (
                <Text style={[styles.text, { fontSize: 18 }]}>
                  Upload the new Picture
                </Text>
              )}
            </TouchableOpacity>
            <Picker
              mode="dropdown"
              selectedValue={this.state.post.categoryId}
              style={styles.textInput}
              onValueChange={itemValue =>
                this.onChangeState(itemValue, "categoryId")
              }
            >
              {options()}
            </Picker>
            {this.state.error.categoryId ? (
              <Text style={styles.errorStyle}>
                {this.state.error.categoryId}
              </Text>
            ) : null}
            <KeyboardAvoidingView behavior="padding" enabled>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Title of post"
                placeholderTextColor="white"
                underlineColorAndroid="white"
                style={styles.textInput}
                onChangeText={text => {
                  this.onChangeState(text, "postTitle");
                }}
              />
              {this.state.error.postTitle ? (
                <Text style={styles.errorStyle}>
                  {this.state.error.postTitle}
                </Text>
              ) : null}

              <View style={styles.button}>
                <Button title="Create post" onPress={this.isValid} />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    );
  }
}
