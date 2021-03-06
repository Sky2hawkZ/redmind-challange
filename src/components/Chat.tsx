//NPM Imports
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Bubble,
  BubbleProps,
  GiftedChat,
  Time,
  TimeProps,
} from "react-native-gifted-chat";

//Local Imports
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import Presence from "./Presence";

interface IMessage {
  _id: string | null;
  text: string;
  createdAt: Date | number;
  user: {
    _id: string | undefined;
    name: string | null | undefined;
  };
}
const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const onValueChange = database()
      .ref(`/messages`)
      .on("value", (snapshot) => {
        const messages: Array<IMessage> = [];
        snapshot.forEach((childNodes) => {
          const message = childNodes.val();
          messages.push(message);
          return message;
        });
        setMessages(messages.reverse());
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/messages`).off("value", onValueChange);
  }, []);

  const SendMessage = (messages: IMessage[]) => {
    const message: IMessage = messages[0];
    const newMessageReference = database().ref("/messages").push();
    newMessageReference.set({
      ...message,
      createdAt: database.ServerValue.TIMESTAMP,
    });
  };

  const renderBubble = (props: BubbleProps) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#2196f3",
          },
        }}
        textStyle={{
          left: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const renderTime = (props: TimeProps) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: "#fff",
          },
        }}
      />
    );
  };

  return (
    <>
      <Presence />
      <GiftedChat
        messages={messages}
        onSend={SendMessage}
        user={{
          _id: auth().currentUser.uid,
          name: auth().currentUser.displayName,
        }}
        renderBubble={renderBubble}
        renderTime={renderTime}
        placeholder="Type your message here..."
        alwaysShowSend
        showUserAvatar
        inverted
        scrollToBottom
      />
    </>
  );
};

export default Chat;
