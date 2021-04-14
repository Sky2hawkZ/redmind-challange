import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import database from "@react-native-firebase/database";
import { useList } from "react-firebase-hooks/database";

interface uProps {
  displayName: string;
  online: false;
}

const Presence = () => {
  const [snapshots, loadingSnapshots, error] = useList(database().ref("users"));

  return (
    <SafeAreaView style={styles.online}>
      {snapshots &&
        snapshots.map((snapshot) => {
          let user: uProps = snapshot.val();
          return (
            <View style={styles.userIcon} key={snapshot.key}>
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
