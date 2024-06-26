require("dotenv").config();
const firebase = require("firebase/app");

const firebaseConfig = {
    //   apiKey: process.env.FIREBASE_API_KEY,
    //   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    //   projectId: process.env.FIREBASE_PROJECT_ID,
    //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    //   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    //   appId: process.env.FIREBASE_APP_ID
    
    apiKey: "AIzaSyAeX6OtejEFe8BJJK7p9GZ5Jfya00-IanI",
    authDomain: "nao4you-1b067.firebaseapp.com",
    projectId: "nao4you-1b067",
    storageBucket: "nao4you-1b067.appspot.com",
    messagingSenderId: "20232680959",
    appId: "1:20232680959:web:8007cac28658d4bef863ca",
    measurementId: "G-DX9WDPPFTV"
};

firebase.initializeApp(firebaseConfig);