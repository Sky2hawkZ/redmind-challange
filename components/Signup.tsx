import React, { useState } from "react";
import { ImagePicker, Permissions } from "expo";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ImageEditor,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import firebaseSDK from "../config/firebaseSDK";

const Signup = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    photoUrl: "",
  });

  /* const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
 */

  const onPressCreate = async () => {
    console.log(user);
    try {
      await firebaseSDK.createAccount(user);
      /* navigation.navigate("Chat", {
        name: user.username,
        email: user.email,
        avatar: user.photoUrl,
      }); */
    } catch ({ message }) {
      console.log("create account failed. catch error:" + message);
    }
  };

  const onImageUpload = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    try {
      // only if user allows permission to camera roll
      if (cameraRollPerm === "granted") {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        console.log(
          "ready to upload... pickerResult json:" + JSON.stringify(pickerResult)
        );

        var wantedMaxSize = 150;
        var rawheight = pickerResult.height;
        var rawwidth = pickerResult.width;
        var ratio = rawwidth / rawheight;
        var wantedwidth = wantedMaxSize;
        var wantedheight = wantedMaxSize / ratio;
        // check vertical or horizontal
        if (rawheight > rawwidth) {
          wantedwidth = wantedMaxSize * ratio;
          wantedheight = wantedMaxSize;
        }
        let resizedUri = await new Promise((resolve, reject) => {
          ImageEditor.cropImage(
            pickerResult.uri,
            {
              offset: { x: 0, y: 0 },
              size: { width: pickerResult.width, height: pickerResult.height },
              displaySize: { width: wantedwidth, height: wantedheight },
              resizeMode: "contain",
            },
            (uri) => resolve(uri),
            () => reject()
          );
        });
        let uploadUrl: any = await firebaseSDK.uploadImage(resizedUri);
        setUser({ ...user, photoUrl: uploadUrl });
        await firebaseSDK.updateAvatar(uploadUrl);
      }
    } catch (err) {
      console.log("onImageUpload error:" + err.message);
      alert("Upload image error:" + err.message);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Email</Text>
      <TextInput
        style={styles.nameInput}
        onChangeText={(email) => setUser({ ...user, email: email })}
        defaultValue={user.email}
        placeholder="Email"
      />
      <Text style={styles.title}>Password</Text>
      <TextInput
        secureTextEntry
        style={styles.nameInput}
        onChangeText={(password) => setUser({ ...user, password: password })}
        defaultValue={user.password}
        placeholder="Password"
      />
      <Text style={styles.title}>Username</Text>
      <TextInput
        style={styles.nameInput}
        onChangeText={(username) => setUser({ ...user, username: username })}
        defaultValue={user.username}
        placeholder="Username"
      />
      <TouchableOpacity style={styles.buttonText} onPress={onPressCreate}>
        <Text>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonText} onPress={onImageUpload}>
        <Text>Upload Avatar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const offset = 16;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: "#111111",
    borderWidth: 1,
    fontSize: offset,
  },
  buttonText: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 5,
    fontSize: 42,
  },
});
