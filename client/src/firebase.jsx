// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmP1lhT0phqYRi43eVsYQ_H8OmQ-ylsIM",
  authDomain: "console-blog-78e8f.firebaseapp.com",
  projectId: "console-blog-78e8f",
  storageBucket: "console-blog-78e8f.appspot.com",
  messagingSenderId: "186841843919",
  appId: "1:186841843919:web:cca91f998ac4ce9b5a0fba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imageDB = getStorage(app);

export { app, imageDB };
