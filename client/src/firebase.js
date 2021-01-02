import * as firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB42CsDi1gfG5wHAEx-vo1b1Sr5D-MPxgw",
  authDomain: "ecommerce-22b94.firebaseapp.com",
  projectId: "ecommerce-22b94",
  storageBucket: "ecommerce-22b94.appspot.com",
  messagingSenderId: "911442167387",
  appId: "1:911442167387:web:063b497f32f66f23c6a17e",
  measurementId: "G-YTXLDZBPMT",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
