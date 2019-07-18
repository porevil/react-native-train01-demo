import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  NativeModules,
  Alert
} from "react-native";

import ImagePicker from "react-native-image-crop-picker";

export default class Camerascreen extends Component {


    constructor(props) {
      super(props)
    
      this.state = {
         image: null
      };
    };
    

  pickSingleWithCamera = async cropIt => {
    let image = await ImagePicker.openCamera({
      cropping: cropIt,
      width: 500,
      height: 500,
      includeExif: true
    });

    this.setState({
      image: { uri: image.path, width: image.width, height: image.height }
    });
  };

  pickSingle = async cropIt => {
    let image = await ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropIt,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
      compressVideoPreset: "MediumQuality",
      includeExif: true
    });

    this.setState({
      image: {
        uri: image.path,
        width: image.width,
        height: image.height,
        mime: image.mime
      }
    });
  };

  uploadWithAxios = async ()=>{
    const data = new FormData();
    data.append("username", "codemobiles"); // you can append anyone.
    data.append("password", "1234"); // you can append anyone.
    data.append("userfile", {
      uri: this.state.image.uri,
      type: "image/jpeg", // or photo.type
      name: "testPhotoName.jpg"
    });

    let result = await axios.post("http://192.168.0.104:5000/uploads",data);
    Alert.alert(result.data);


  }
  
  upload = ()=>{
    const data = new FormData();
    data.append("username", "codemobiles"); // you can append anyone.
    data.append("password", "1234"); // you can append anyone.
    data.append("userfile", {
      uri: this.state.image.uri,
      type: "image/jpeg", // or photo.type
      name: "testPhotoName.jpg"
    });
    fetch("http://192.168.0.104:5000/uploads", {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then(res => {
        Alert.alert(res.result);
      });

  }

  render() {
    return (
      <ImageBackground
        source={require("./assets/img/gradient_bg.png")}
        style={styles.container}
      >
        <Image
          resizeMode={"contain"}
          style={{ width: "100%", height: 70, marginTop: 10, padding: 0 }}
          source={require("./assets/img/banner_react_qr_camera.png")}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity
            onPress={() => this.pickSingleWithCamera(false)}
            style={styles.button}
          >
            <Text style={styles.text}>CAMERA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.pickSingleWithCamera(true)}
            style={styles.button}
          >
            <Text style={styles.text}>CAMERA + CROP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.pickSingle(false)}
            style={styles.button}
          >
            <Text style={styles.text}>GALLERY</Text>
          </TouchableOpacity>
        </View>

        {this.state.image != null ? (
          <TouchableOpacity onPress={this.upload} style={styles.upload_button}>
            <Text style={styles.text}>UPLOAD</Text>
          </TouchableOpacity>
        ) : null}


        {this.state.image && (
            <Image source={this.state.image} 
            style={{
                flex: 1,
                width: "100%",
                marginBottom: 8,
                borderRadius: 10,
                backgroundColor: "#fff2"
              }}
              resizeMode="center"
            />
        )}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },

  button: {
    marginBottom: 10,
    height: 40,
    padding: 8,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "transparent"
  },
  upload_button: {
    borderRadius: 15,
    marginBottom: 10,
    fontWeight: "bold",
    width: 300,
    height: 50,
    marginBottom: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fa4a4d"
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "normal"
  },
  text_upload: {
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  description: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 10,
    color: "#FFFFFF"
  }
});
