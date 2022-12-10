// import { initializeApp } from "firebase/app";
// import firebase from "firebase";

const config = require("../config/server.config");
const { initializeApp } = require("firebase/app");

const db = initializeApp(config.firebaseConfig);

module.exports = { db };
