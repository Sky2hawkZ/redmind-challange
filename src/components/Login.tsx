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
import database from "@react-native-firebase/database";

interface IUser {
  email: string;
  password: string;
}

const Login = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
  });
  const [online, setOnline] = useState(false);

  useEffect(() => {}, [online]);

  const onPressLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(user.email, user.password);

      //TODO: CHECK IF USER IS ALREADY ONLINE

      database().ref(`/users/${auth().currentUser?.uid}`).update({
        online: true,
      });
      navigation.navigate("Chat");
    } catch (e) {
      alert(`Could not log in! ${e}`);
    }
  };

  const onPressSignup = () => {
    navigation.navigate("Signup");
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
        <Text style={styles.subtitle}>Sign in or Register below</Text>
      ) : (
        <Text style={styles.subtitle}>Click on the button below to chat!</Text>
      )}

      {online != true ? (
        <>
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
            onChangeText={(password) =>
              setUser({ ...user, password: password })
            }
            defaultValue={user.password}
            placeholder="Password"
          />
          <TouchableOpacity style={styles.button} onPress={onPressLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPressSignup}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={onPressChat}>
          <Text style={styles.buttonText}>Chat</Text>
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
    padding: 0,
    paddingHorizontal: 8,
    borderBottomColor: "#111111",
    borderBottomWidth: 1,
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
