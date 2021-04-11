import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useNavigation, useRoute } from "@react-navigation/native";
import firebaseSDK from "../config/firebaseSDK";

const Chat = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  console.log(route);
  console.log(navigation);

  useEffect(() => {
    firebaseSDK.refOn();
    return () => {
      firebaseSDK.refOff();
    };
  }, []);

  return <GiftedChat messages={messages} onSend={firebaseSDK.send} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Chat;
