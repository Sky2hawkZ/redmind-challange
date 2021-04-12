import "react-native-gesture-handler";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./components/NavigationRef";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text } from "react-native";
import auth from "@react-native-firebase/auth";

import Chat from "./components/Chat";
import Login from "./components/Login";
import ChatName from "./components/ChatName";
import * as RootNavigation from "./components/NavigationRef";

const Stack = createStackNavigator();

function App() {
  const logOut = async () => {
    try {
      //TODO: Delete User from Realtime Database
      await auth().signOut();
      console.log("Logged out!");
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
        <Stack.Screen name="ChatName" component={ChatName} />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            headerLeft: () => (
              <TouchableOpacity style={styles.buttonText} onPress={goBack}>
                <Text>Return</Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity style={styles.buttonText} onPress={logOut}>
                <Text>Logout</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  buttonText: {
    alignItems: "center",
    backgroundColor: "#2196f3",
    padding: 10,
    margin: 5,
    fontSize: 42,
  },
});
export default App;
