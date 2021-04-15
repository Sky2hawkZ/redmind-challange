import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
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
    <View style={styles.online}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {users &&
          users.map((user) => {
            return (
              <View style={styles.userIcon} key={user.uid}>
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
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  online: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    backgroundColor: "#E3E3E3",
    justifyContent: "flex-start",
  },
  userIcon: {
    height: 40,
    width: 80,
    marginHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 25,
    backgroundColor: "#a8afa2",
    shadowColor: "#000000",
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
