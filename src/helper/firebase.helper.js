import { initializeApp } from "firebase/app";
const config = require("../config/server.config");

const db = initializeApp(config.firebaseConfig);

module.exports = db;
