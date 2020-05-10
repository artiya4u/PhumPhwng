import firebase from './firebase'
import {updateUser} from "../services/User";

async function updateUserProfile() {
  const accessToken = await firebase.auth().currentUser.getIdToken(true);
  await updateUser({
    'fullname': firebase.auth().currentUser.displayName,
    'notification': true,
  }, accessToken);
}

export async function signUpWithEmail(name, email, password) {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  const accessToken = await firebase.auth().currentUser.getIdToken(true);
  await updateUser({
    'fullname': name,
    'notification': true,
  }, accessToken);
}

export async function signInWithEmail(email, password) {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  await firebase.auth().signInWithEmailAndPassword(email, password);
}

export async function signOut() {
  await firebase.auth().signOut();
}
