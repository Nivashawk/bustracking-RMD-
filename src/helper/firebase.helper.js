// import { initializeApp } from "firebase/app";
// import firebase from "firebase";

const config = require("../config/server.config");
var firebase = require('firebase/app');
const db = firebase.initializeApp(config.firebaseConfig);

module.exports = db;
