// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

//import { getMetrics } from "firebase/metrics";
import 'firebase/auth';

import Constants from 'expo-constants';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: Constants.manifest?.extra?.firebaseApiKey,
    authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
    projectId: Constants.manifest?.extra?.firebaseProjectId,
    storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
    messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
    appId: Constants.manifest?.extra?.firebaseAppId,
    measurementId: Constants.manifest?.extra?.firebaseMeasurementId,
    databaseURL: Constants.manifest?.extra?.firebaseDatabaseURL
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

//const metrics = getMetrics(app);