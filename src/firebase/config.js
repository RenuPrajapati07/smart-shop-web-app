import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage} from "firebase/storage"

export const firebaseConfig = {
  apiKey: "AIzaSyC11J8lzWEXHO7MWZPfH0jZ53JsKLzkREU",
  authDomain: "ecom-web-app-2d543.firebaseapp.com",
  projectId: "ecom-web-app-2d543",
  storageBucket: "ecom-web-app-2d543.appspot.com",
  messagingSenderId: "125158945092",
  appId: "1:125158945092:web:a9d8e6f1fcaa25b9ef2711"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
