import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

interface IUser {
  email: string;
  password: string;
}

const Signup = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
  });

  const onPressCreate = async () => {
    try {
      await auth().createUserWithEmailAndPassword(user.email, user.password);
      navigation.navigate("ChatName");
    } catch (e) {
      if (e === "auth/email-already-in-use") {
        alert("Email is already in use!");
      } else if (e === "auth/invalid-email") {
        alert("Invalid Email.");
      } else if (e === "auth/weak-password") {
        alert("Password needs to be 6 characters long at least");
      }
    }
  };

  return (
    <View>
      <Text style={styles.title}>Sign in or Register below</Text>
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
      <TouchableOpacity style={styles.button} onPress={onPressCreate}>
        <Text style={styles.buttonText}>Signup</Text>
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
    padding: 0,
    paddingHorizontal: offset / 2,
    borderBottomColor: "#111111",
    borderBottomWidth: 1,
    fontSize: offset,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2196f3",
    borderRadius: 25,
    padding: 10,
    margin: 5,
    fontSize: 42,
  },
  buttonText: {
    color: "#FFFFFF",
  },
});
