import React from "react";
import AddCategory from "./AddCategory";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button
} from "react-native";
import { styles } from "../../Styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { tabBarLabel } from "react-navigation";
export default class AddCategoryRender extends AddCategory {
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

          <Text style={styles.text}>Add a new Category</Text>
          <Icon
            style={{ width: 42, height: 42 }}
            name="logout"
            color="white"
            size={42}
            onPress={screenProps}
          />
        </View>
        <View style={[styles.viewInput, { flex: 3 / 4 }]}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="white"
            underlineColorAndroid="white"
            placeholder="Enter the new category"
            onChangeText={text => {
              this.onChangeState(text);
            }}
            style={styles.textInput}
          />
          {this.state.error ? (
            <Text style={styles.errorStyle}>{this.state.error}</Text>
          ) : null}
          <TouchableOpacity onPress={this.show}>
            <Text style={[styles.text, { fontSize: 18 }]}>
              Upload new category Image
            </Text>
            {this.state.flag ? (
              <Image
                source={this.state.avatarSource}
                style={{ height: 150, width: 300, alignSelf: "center" }}
              />
            ) : null}
          </TouchableOpacity>
          <View style={styles.button}>
            <Button title="Upload Category" onPress={this.isValid} />
          </View>
        </View>
      </View>
    );
  }
}
