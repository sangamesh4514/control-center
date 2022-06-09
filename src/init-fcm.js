import firebase from "firebase";
import "firebase/messaging";

const initializedFirebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDFX9z-9EKHzd1ZPy-vz1pmZq7quV-MAfU",
  authDomain: "aido-f8658.firebaseapp.com",
  projectId: "aido-f8658",
  storageBucket: "aido-f8658.appspot.com",
  messagingSenderId: "940305599907",
  appId: "1:940305599907:web:e13d3ab307f4727e8e5e16",
  measurementId: "G-3014YYRBRQ",
});
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
  "BPrimE4hYlk-tkToSWZrrAkXUL-Ps7txa5TYRaCW4MUjvpP-YbWLlUxRtcwHizEvRoWecdz1SgPkZq6OT31D384"
);
export { messaging };