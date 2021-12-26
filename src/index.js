import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Meme from './Meme';
import firebase from 'firebase/compat/app';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlJcHi0h5-MpuvbWzZ5As7x76yN5TmbZ0",
  authDomain: "meme-bbeb4.firebaseapp.com",
  projectId: "meme-bbeb4",
  storageBucket: "meme-bbeb4.appspot.com",
  messagingSenderId: "156769273058",
  appId: "1:156769273058:web:988075ddc58831b6910abb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Meme />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
