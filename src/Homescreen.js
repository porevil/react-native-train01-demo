import React, { Component } from "react";
import {
  View,
  Alert,
  StyleSheet,
  Image,
  ImageBackground,
  Button,
  Text,
  TextInput,
  Keyboard,
  Platform,
  TouchableOpacity
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-community/async-storage";

export default class Homescreen extends Component {
  usernamePassword = {
    username: "",
    password: ""
  };

  async componentDidMount(){
    
    let passedLogin = await AsyncStorage.getItem("passedLogin") 
    if (passedLogin != null && passedLogin == "true"){
      let registedAccountString = await AsyncStorage.getItem("username_password");
      let regAccount = JSON.parse(registedAccountString);

      this.usernamePassword.username = regAccount.username;
      this.usernamePassword.password = regAccount.password;
      this.forceUpdate()
    }
  }

  onClickLogin = async () => {
    let registedAccountString = await AsyncStorage.getItem("username_password");

    if (registedAccountString != null) {
      let regAccount = JSON.parse(registedAccountString);
      // alert(regAccount.password)

      if (
        regAccount.username == this.usernamePassword.username &&
        regAccount.password == this.usernamePassword.password
      ) {
        // alert("Login successfully");
        await AsyncStorage.setItem("passedLogin", "true")
        this.props.navigation.navigate("AppStack")
      } else {
        alert("Login failed");
      }
    }
  };

  render() {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require("./assets/img/bg.png")}
      >
        {/* authentication section */}
        <View
          style={{
            flexDirection: "column",
            alignItems: "stretch",
            backgroundColor: "#FFF3",
            marginTop: 20,
            marginLeft: 30,
            marginRight: 30,
            borderRadius: 10,
            padding: 16
          }}
        >
          {/* Username section */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ ...styles.icon, backgroundColor: "orange" }} />
            <TextInput
            value={this.usernamePassword.username}
              onChangeText={text => {
                this.usernamePassword.username = text;
                this.forceUpdate();
              }}
              autoCapitalize="none"
              placeholder="Username"
              style={{ flex: 1, marginLeft: 16, color: "white" }}
            />
          </View>

          {/* Password section */}
          <View style={{ flexDirection: "row", marginTop: Platform.OS == 'android' ? 0 : 10 }}>
            <View style={{ ...styles.icon, backgroundColor: "green" }} />
            <TextInput
              value={this.usernamePassword.password}
              onChangeText={text => {
                this.usernamePassword.password = text;
                this.forceUpdate();
              }}
              autoCapitalize="none"
              placeholder="Password"
              secureTextEntry
              style={{ flex: 1, marginLeft: 16, color: "white" }}
            />
          </View>

          <View style={{ marginTop: 40 }}>
            <Button title="Login" onPress={this.onClickLogin} />
          </View>
          <TouchableOpacity
            style={{ marginTop: 16 }}
            onPress={() => this.props.navigation.navigate("register")}
          >
            <Text style={{ textAlign: "center" }}>Register</Text>
          </TouchableOpacity>
        </View>

        <Image
          style={{ width: "100%", height: "30%", marginTop: 20 }}
          source={require("./assets/img/pikachu.png")}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  icon: { width: 30, height: 30, backgroundColor: "yellow", borderRadius: 15 }
});

Homescreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Home",
    headerStyle: {
      backgroundColor: "#119CED"
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: { color: "#fff" },
    headerBackTitle: " ",
    headerRight: (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => alert("www.codemobiles.com")}
        style={{ padding: 10 }}
      >
        <Icon
          name="address-card"
          size={20}
          color="#fff"
          style={{
            height: 24,
            width: 24
          }}
        />
      </TouchableOpacity>
    )
  };
};
