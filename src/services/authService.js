import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";

export async function login(email, password) {
  const credential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const token = await credential.user.getIdToken();

  localStorage.setItem("adminToken", token);

  return credential.user;
}

export async function logout() {
  await signOut(auth);

  localStorage.removeItem("adminToken");
}

export function getToken() {
  return localStorage.getItem("adminToken");
}