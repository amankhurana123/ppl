import React from "react";
import VerificaionCode from "./VerificaionCode";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button
} from "react-native";
import { styles } from "../../Styles";

export default class VerificaionCodeRender extends VerificaionCode {
  render() {
    const { email } = this.props.navigation.state.params;
    const userEmail = JSON.parse(decodeURI(email));
    // this.setState({ user: { email: userEmail } });
    console.warn("email", JSON.parse(decodeURI(email)));
    console.warn("this.props.navigation.state.params", userEmail.email);
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={styles.text}>Verificaion Status</Text>
        </View>
        <View style={[styles.viewInput, { flex: 4 / 5 }]}>
          <ScrollView>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="white"
              style={styles.textInput}
              onChangeText={() => {
                this.state.user.email = userEmail.email;
                this.setState({});
              }}
              defaultValue={this.state.user.email}
            />

            <TextInput
              autoCapitalize="sentences"
              autoCorrect={false}
              placeholder="Enter OTP"
              placeholderTextColor="white"
              underlineColorAndroid="white"
              style={styles.textInput}
              multiline={true}
              onChangeText={text => {
                this.onChangeState(text, "verificationCode");
              }}
              maxLength={6}
            />
            {this.state.error.verificationCode ? (
              <Text style={styles.errorStyle}>
                {this.state.error.verificationCode}
              </Text>
            ) : null}
            <TouchableOpacity onPress={this.resendOTP} activeOpacity={0.5}>
              <Text style={style.text}>Resend OTP</Text>
            </TouchableOpacity>
            <View style={styles.button}>
              <Button title="Submit OTP" onPress={this.checkVerificationCode} />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const style = {
  text: {
    color: "white",
    alignSelf: "center",
    fontSize: 16,
    textDecorationLine: "underline"
  }
};
