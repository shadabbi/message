import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8B4bxgKJan5z2wCRoLpwLB5SFwTwH9rY",
  authDomain: "message-6bb09.firebaseapp.com",
  projectId: "message-6bb09",
  storageBucket: "message-6bb09.appspot.com",
  messagingSenderId: "256520022249",
  appId: "1:256520022249:web:0715a867fa6f5770ffe878",
  measurementId: "G-77F55KG6N2",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export default db;
