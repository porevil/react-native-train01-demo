import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import { httpClient } from "./HttpClient";
import { Card } from "react-native-elements";

export default class Jsonscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      youtubes: []
    };
  }

  feedData = async () => {
    this.setState({isFetching: true})
    let url = "/youtubes/index_new.php";
    let account = await AsyncStorage.getItem("username_password");
    const { username, password } = JSON.parse(account);
    let params = `username=${username}&password=${password}&type=foods`;

    let result = await httpClient.post(url, params);
    // alert(JSON.stringify(result.data))
    this.setState({ youtubes: result.data.youtubes, isFetching:false });
  };

  componentDidMount() {
    this.feedData();
  }

  renderHeader() {
    return (
      <Image
        source={require("./assets/img/header_react_native.png")}
        style={styles.list_header}
        resizeMode="contain"
      />
    );
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("youtube", { item });
        }}
      >
        <Card containerStyle={styles.listCard}>
          {/* Avatar, Title */}
          <View style={styles.listCardView}>
            <Image
              style={styles.listAvatar}
              source={{ uri: item.avatar_image }}
            />
            {/* Title and subtitle */}
            <View style={styles.listTitleSubtitleContainer}>
              <Text style={styles.listTitle}>{item.title}</Text>
              <Text style={styles.listSubTitle}>{item.subtitle}</Text>
            </View>
          </View>

          {/* Youtube Image */}
          <Image
            style={styles.listYoutbeImage}
            source={{ uri: item.youtube_image }}
          />
        </Card>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ImageBackground
        source={require("./assets/img/bg.png")}
        style={{ flex: 1, flexDirection: "column" }}
      >
        <FlatList
          onRefresh={() => this.feedData()}
          refreshing={this.state.isFetching}
          data={this.state.youtubes}
          ListHeaderComponent={this.renderHeader()}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list_header: {
    width: "100%",
    height: 100
  },
  listCard: {
    overflow: "hidden",
    flexDirection: "column",
    marginBottom: 20,
    borderRadius: 20,
    padding: 0
  },
  listCardView: {
    flexDirection: "row",
    marginBottom: 16,
    height: 45,
    alignItems: "center"
  },
  listAvatar: {
    width: 45,
    height: "100%",
    marginRight: 16
  },
  listTitleSubtitleContainer: {
    flexDirection: "column",
    marginRight: 16,
    flex: 1
  },
  listTitle: {
    fontWeight: "700"
  },
  listSubTitle: {
    fontWeight: "100"
  },
  listYoutbeImage: {
    width: "100%",
    height: 190
  }
});
