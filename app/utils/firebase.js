// In /utils/firebase.js
// We should import firebase from this module instead of the default package.
import * as firebase from 'firebase'  // Should not be used elsewhere in the project
import Constants from 'expo-constants';

firebase.initializeApp(Constants.manifest.extra.firebase);

export default firebase;
