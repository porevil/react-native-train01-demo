import React, { Component } from "react";
import { Image } from "react-native";

import Homescreen from "./Homescreen";
import Registerscreen from "./Registerscreen";
import Camerascreen from "./Camerascreen";
import Jsonscreen from "./Jsonscreen";
import Youtubescreen from "./Youtubescreen";

import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";


const AuthenStack = createStackNavigator({
    home: {screen: Homescreen},
    register: {screen: Registerscreen}
}, {
    initialRouteName: "home"
})

const TabStack = createBottomTabNavigator({
  json: {screen: Jsonscreen,   navigationOptions: {
    tabBarLabel: "Feed",
    tabBarIcon: ({ focused }) => (
      <Image
        style={{
          height: 28,
          width: 28
        }}
        resizeMode="contain"
        source={
          focused
            ? require("./assets/img/ic_profile_select.png")
            : require("./assets/img/ic_profile.png")
        }
      />
    )
  }},
  camera: {screen: Camerascreen, navigationOptions: {
    tabBarLabel: "Camera",
    tabBarIcon: ({ focused }) => (
      <Image
        style={{
          height: 28,
          width: 28
        }}
        resizeMode="contain"
        source={
          focused
            ? require("./assets/img/ic_card_select.png")
            : require("./assets/img/ic_card.png")
        }
      />
    )
  }}
},{
  initialRouteName: "json"
})


TabStack.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
 
  // You can do whatever you like here to pick the title based on the route name
  // Ternery condition
  const headerTitle = routeName == 'json' ? "JSON Screen" : "Camera Screen";
 
  return {
    headerTitle,
    headerStyle: { backgroundColor: '#339CED'},
    headerTitleStyle: { color: "#fff" },

  };
 };


const AppStack = createStackNavigator({
  tab: {screen: TabStack},
  youtube: {screen: Youtubescreen}
}, {
  initialRouteName: "tab"
})

export default createAppContainer(createSwitchNavigator({
  AuthenStack,
  AppStack
},{initialRouteName: "AuthenStack"}))