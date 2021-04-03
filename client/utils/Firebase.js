import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBVxnUGMBG7doiB91q-zxSpi-iqZZPDrq4",
    authDomain: "next-note-e3325.firebaseapp.com",
    databaseURL: "https://next-note-e3325-default-rtdb.firebaseio.com",
    projectId: "next-note-e3325",
    storageBucket: "next-note-e3325.appspot.com",
    messagingSenderId: "414224524317",
    appId: "1:414224524317:web:516dec1a3a1a6ccfab92f4",
    measurementId: "G-2QW1FLHEPS",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}
export default firebase;
