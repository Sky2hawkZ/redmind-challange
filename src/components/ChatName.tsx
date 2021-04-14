import { useNavigation, useRoute } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import database from "@react-native-firebase/database";

const ChatName = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [user, setUser] = useState({
    userName: "",
  });

  const onNameRegistration = async () => {
    if (user.userName == "") {
      alert("Please Provide a username!");
      return;
    }

    try {
      await auth().currentUser?.updateProfile({
        displayName: user.userName,
      });

      database().ref(`users/${auth().currentUser?.uid}`).set({
        displayName: auth().currentUser?.displayName,
        online: true,
      });
    } catch (e) {
      alert("Could not push user to firebase, Try again!");
    }

    navigation.navigate("Chat");
  };

  return (
    <>
      <TextInput
        style={styles.nameInput}
        onChangeText={(username) => setUser({ userName: username })}
        placeholder="ChatName"
      />
      <TouchableOpacity style={styles.button} onPress={onNameRegistration}>
        <Text style={styles.buttonText}>Confirm Username</Text>
      </TouchableOpacity>
    </>
  );
};

export default ChatName;

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    marginLeft: 16,
    fontSize: 16,
  },
  nameInput: {
    height: 16 * 2,
    margin: 8,
    paddingLeft: 5,
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#111111",
    fontSize: 16,
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
