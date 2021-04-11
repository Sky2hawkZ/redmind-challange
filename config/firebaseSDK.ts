import firebase from "firebase";

interface IUser {
  username: string;
  email: string;
  password: string;
  photoUrl: string;
}
class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: "AIzaSyAxMpkRAyJ2TrxKaQT-Yac66R5jASGX2dY",
        authDomain: "rnf-realtime.firebaseapp.com",
        databaseURL:
          "https://rnf-realtime-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "rnf-realtime",
        storageBucket: "rnf-realtime.appspot.com",
        messagingSenderId: "594324939161",
        appId: "1:594324939161:web:c030bdd1fe3e3a9c83f308",
      });
    }
  }
  login = async (user: IUser, success_callback: any, failed_callback: any) => {
    console.log("Calling firebase");
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  };
  createAccount = async (user: IUser) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(
        function () {
          console.log(
            "created user successfully. User email:" +
              user.email +
              " name:" +
              user.username
          );
          var userf = firebase.auth().currentUser;
          userf?.updateProfile({ displayName: user.username }).then(
            function () {
              console.log(
                "Updated displayName successfully. name:" + user.username
              );
              alert(
                "User " +
                  user.username +
                  " was created successfully. Please login."
              );
            },
            function (error) {
              console.warn("Error update displayName.");
            }
          );
        },
        function (error) {
          console.error(
            "got error:" + typeof error + " string:" + error.message
          );
          alert("Create account failed. Error: " + error.message);
        }
      );
  };

  uploadImage = async (uri: any) => {
    console.log("got image to upload. uri:" + uri);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase.storage().ref("avatar").child(uuid.v4());
      const task = ref.put(blob);

      return new Promise((resolve, reject) => {
        task.on(
          "state_changed",
          () => {},
          reject,
          () => resolve(task.snapshot.downloadURL)
        );
      });
    } catch (err) {
      console.log("uploadImage try/catch error: " + err.message);
    }
  };

  updateAvatar = (url: any) => {
    var userf = firebase.auth().currentUser;
    if (userf != null) {
      userf.updateProfile({ photoURL: url }).then(
        function () {
          console.log("Updated avatar successfully. url:" + url);
          alert("Avatar image is saved successfully.");
        },
        function (error) {
          console.warn("Error update avatar.");
          alert("Error update avatar. Error:" + error.message);
        }
      );
    } else {
      console.log("can't update avatar, user is not login.");
      alert("Unable to update avatar. You must login first.");
    }
  };

  refOn = () => {};

  refOff = () => {};

  send = () => {};
}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;
