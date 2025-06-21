// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBI7TzQgDzpgKGCTHQP8SG82sdeubYErs",
  authDomain: "oc-messenger-bef67.firebaseapp.com",
  databaseURL: "https://oc-messenger-bef67-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "oc-messenger-bef67",
  storageBucket: "oc-messenger-bef67.firebasestorage.app",
  messagingSenderId: "506194016668",
  appId: "1:506194016668:web:9a41641f50b99dab2cb059",
  measurementId: "G-0X6BR9YDN0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };