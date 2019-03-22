import firebase from 'firebase';

// api details

const config = {
    apiKey: "AIzaSyAb1GV1gPTbqxXuHRyIrdmcdYJPm1IeZvw",
    authDomain: "myptmtrial1.firebaseapp.com",
    databaseURL: "https://myptmtrial1.firebaseio.com",
    projectId: "myptmtrial1",
    storageBucket: "myptmtrial1.appspot.com",
    messagingSenderId: "1043579610161"
  };

firebase.initializeApp(config);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();