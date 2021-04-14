//React
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
//Firebase
import auth from "@react-native-firebase/auth";

const Login = () => {
  const navigation = useNavigation();

  const [online, setOnline] = useState(false);

  useEffect(() => {}, [online]);

  const onPressLogin = async () => {
    try {
      await auth().signInAnonymously();
      navigation.navigate("ChatName");
    } catch (e) {
      if (e === "auth/wrong-password") {
        alert("Wrong password.");
      } else if (e === "auth/invalid-email") {
        alert("Invalid Email.");
      } else if (e === "auth/user-disabled") {
        alert("User has been disabled.");
      } else if (e === "auth/user-not-found") {
        alert("No user found, please sign up.");
      }
    }
  };

  const onPressChat = () => {
    if (online) {
      navigation.navigate("Chat");
    } else {
      alert("I don't know how you're here, but bad!");
      return;
    }
  };

  useFocusEffect(() => {
    if (auth().currentUser === null) {
      setOnline(false);
    } else {
      setOnline(true);
    }
  });

  return (
    <View>
      <Text style={styles.title}>Welcome to React Chat</Text>
      {online != true ? (
        <Text style={styles.subtitle}>Sign in anonymously below!</Text>
      ) : (
        <Text style={styles.subtitle}>Click on the button below to chat!</Text>
      )}

      {online != true ? (
        <TouchableOpacity style={styles.buttonText} onPress={onPressLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonText} onPress={onPressChat}>
          <Text>Chat</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    marginLeft: 16,
    fontSize: 16,
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 16,
    marginLeft: 16,
    fontSize: 12,
    textAlign: "center",
  },
  nameInput: {
    height: 16 * 2,
    margin: 8,
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
