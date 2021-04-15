import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import database from "@react-native-firebase/database";

interface uProps {
  displayName: string;
  online: false;
  uid: string | null;
}

const Presence = () => {
  const [users, setUsers] = useState<uProps[]>([]);
  useEffect(() => {
    const onValueChange = database()
      .ref(`/users`)
      .on("value", (snapshot) => {
        const users: Array<uProps> = [];
        snapshot.forEach((childNodes) => {
          const key = { uid: childNodes.key };
          const user = childNodes.val();
          const mergedUser = { ...user, ...key };
          users.push(mergedUser);
          return user;
        });
        setUsers(users);
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/users`).off("value", onValueChange);
  }, []);
  return (
    <SafeAreaView style={styles.online}>
      {users &&
        users.map((user) => {
          return (
            <ScrollView
              style={styles.userIcon}
              showsHorizontalScrollIndicator={false}
              key={user.uid}
            >
              <Text style={styles.userText}>{user.displayName}</Text>
              {user.online ? (
                <Image
                  style={styles.status}
                  source={require("../assets/online.png")}
                />
              ) : (
                <Image
                  style={styles.status}
                  source={require("../assets/offline.png")}
                />
              )}
            </ScrollView>
          );
        })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  online: {
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    backgroundColor: "#E3E3E3",
    justifyContent: "flex-start",
  },
  userIcon: {
    height: 45,
    width: 65,
    marginLeft: 5,
    paddingVertical: 5,
    borderRadius: 25,
    backgroundColor: "#a8afa2",
    shadowColor: "#000000",
    //ANDROID SHADOW SETTINGS START
    elevation: 20,
    //ANDROID SHADOW SETTINGS END
    //IOS SHADOW SETTINGS START
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    //IOS SHADOW SETTINGS END
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  userText: {
    color: "#FFFFFF",
  },
  status: {
    position: "absolute",
    bottom: 3,
    right: 3,
    zIndex: 10,
    width: 10,
    height: 10,
  },
});

export default Presence;
