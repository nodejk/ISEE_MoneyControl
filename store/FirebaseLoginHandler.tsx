import { auth, db } from "./config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection } from "firebase/firestore";

export async function FirebaseLoginHandler(
  email: string,
  password: string,
  newUser: boolean
) {
  try {
    let response;

    if (newUser) {
      response = await createUserWithEmailAndPassword(auth, email, password);
    } else {
      response = await signInWithEmailAndPassword(auth, email, password);
    }

    const userId = response.user.uid;

    const document = await collection(db, "users");

    console.log(document);
  } catch (err) {
    console.log("error-->", err);
  }
}
