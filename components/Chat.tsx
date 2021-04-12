import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useNavigation, useRoute } from "@react-navigation/native";
import chatUtils from "../config/chatUtils";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  //console.log("route data", route);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <View style={styles.online}>
        <Text>Hello</Text>
      </View>
      <GiftedChat messages={messages} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  online: {
    height: 75,
    backgroundColor: "#ff00ff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Chat;
