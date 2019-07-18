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

import AsyncStorage from '@react-native-community/async-storage';


class IconTextInput extends Component {
  render() {

    // destructuring pattern
    const{icon,hint,ispassword,onchange} = this.props;

    return (
    <View style={{ flexDirection: "row" }}>
    {/* <Icon name={icon} size={25} /> */}
    <TextInput
      onChangeText={onchange}
      secureTextEntry={ispassword}
      autoCapitalize="none"
      placeholder={hint}
      style={{ flex: 1, color: "white", marginLeft: 16 }}
    />
    </View>
    );
  }
}


export default class Registerscreen extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       username:"",
       password:""
    }
  }
  
  onClickRegister= async ()=>{
    if(this.state.username!= "" && this.state.password !=""){
    await AsyncStorage.setItem("username_password",JSON.stringify(this.state));
    // alert(AsyncStorage.getItem("username_password"))
    }
    // AsyncStorage.setItem("username",this.state.username);
    // AsyncStorage.setItem("pasword",this.state.password);
    this.props.navigation.goBack();
  }

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
          <IconTextInput icon="user" hint="Username" onchange={text=>this.setState({username:text})}/>

          {/* Password section */}
          <IconTextInput  icon="lock" hint="Password" ispassword onchange={text=>this.setState({password:text})}/>

          {/* Button register section */}
          <Text>{JSON.stringify(this.state)}</Text>
          <View style={{ marginTop: 40 }}>
            <Button title="Register" onPress={this.onClickRegister}/> 
          </View>

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

Registerscreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Register",
    headerStyle: {
      backgroundColor: '#119CED'
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: { color: "#fff" },
    headerBackTitle: " ",
  };
};