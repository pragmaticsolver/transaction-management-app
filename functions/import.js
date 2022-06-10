// Imports
const firestoreService = require('firestore-export-import');
const firebaseConfig = require('./config.js');
const serviceAccount = require('./serviceAccount.json');

// JSON To Firestore
const jsonToFirestore = async () => {
  try {
    console.log('Initialzing Firebase');
    await firestoreService.initializeApp(serviceAccount, firebaseConfig);

    await firestoreService.restore('./data.json');
    console.log('Upload Success');
  }
  catch (error) {
    console.log(error);
  }
};

jsonToFirestore();