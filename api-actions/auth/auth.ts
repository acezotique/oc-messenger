import { app } from "@/libs/hooks/firebase";
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
} from "firebase/auth";

type LoginPayload = {
  email: string;
  password: string;
};

export const onUserLogin = async (payload: LoginPayload) => {
  const auth = getAuth(app);
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, payload.email, payload.password);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};
