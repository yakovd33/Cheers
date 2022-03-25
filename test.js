const functions = require("firebase-functions");
const request = require('request');
const convert = require('xml-js');
// Required for side-effects
const admin = require('firebase-admin');
const thekeys = require("./cheersron-cb77b-5d0f0c7941f9.json")

admin.initializeApp({credential:admin.credential.cert({
    clientEmail:thekeys.client_email,
    privateKey:thekeys.private_key,
    projectId:thekeys.project_id
}),storageBucket:"cheersron-cb77b.appspot.com"});
const auth = admin.auth();

const db = admin.firestore()
console.log(db)