import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebaseSDK from "../config/firebaseSDK";

const Login = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    photoUrl: "",
  });

  const loginSuccess = () => {
    navigation.navigate("Chat", {
      username: user.username,
      email: user.email,
      photoUrl: user.photoUrl,
    });
  };

  const loginFailed = () => {
    alert("Login failure, please try again.");
  };
  const onPressLogin = async () => {
    const response = firebaseSDK.login(user, loginSuccess, loginFailed);
  };

  return (
    <View>
      <Text style={styles.title}>Email:</Text>
      <TextInput
        style={styles.nameInput}
        onChangeText={(email) => setUser({ ...user, email: email })}
        defaultValue={user.email}
        placeholder="Email"
      />
      <Text style={styles.title}>Password:</Text>
      <TextInput
        secureTextEntry
        style={styles.nameInput}
        onChangeText={(password) => setUser({ ...user, password: password })}
        defaultValue={user.password}
        placeholder="password"
      />
      <TouchableOpacity style={styles.buttonText} onPress={onPressLogin}>
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonText}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    marginLeft: 16,
    fontSize: 16,
  },
  nameInput: {
    height: 16 * 2,
    margin: 16,
    paddingHorizontal: 16,
    borderColor: "#111111",
    borderWidth: 1,
    fontSize: 16,
  },
  buttonText: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 5,
    fontSize: 42,
  },
});
