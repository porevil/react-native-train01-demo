import React, { Component } from "react";
import { Text, View } from "react-native";
import Homescreen from "./src/Homescreen";
import Registerscreen from "./src/Registerscreen";
import AppNavigator from "./src/AppNavigator";


export default class App extends Component {
  render() {
    return <AppNavigator/>
  }
}
