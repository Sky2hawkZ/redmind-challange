import "react-native-gesture-handler";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./components/NavigationRef";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text } from "react-native";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

import Chat from "./components/Chat";
import Login from "./components/Login";
import ChatName from "./components/ChatName";
import * as RootNavigation from "./components/NavigationRef";

const Stack = createStackNavigator();

function App() {
  const { button, buttonText } = styles;

  const logOut = async () => {
    try {
      database().ref(`/users/${auth().currentUser?.uid}`).remove();
      await auth().currentUser?.delete();
      RootNavigation.navigate("Login");
    } catch (e) {}
  };

  const goBack = () => {
    RootNavigation.navigate("Login");
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="ChatName"
          component={ChatName}
          options={{
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            headerTitleStyle: { alignSelf: "center" },
            headerLeft: () => (
              <TouchableOpacity style={button} onPress={goBack}>
                <Text style={buttonText}>Return</Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity style={button} onPress={logOut}>
                <Text style={buttonText}>Logout</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#2196f3",
    color: "#FFFFFF",
    borderRadius: 25,
    padding: 10,
    margin: 5,
    fontSize: 42,
  },
  buttonText: {
    color: "#FFFFFF",
  },
});
export default App;
