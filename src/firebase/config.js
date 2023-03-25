import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage} from "firebase/storage"

export const firebaseConfig = {
  apiKey: "AIzaSyAfVeO_HkKpdnwn4dbfN2-eFgK-JDiVAsA",
  authDomain: "smartshop-67693.firebaseapp.com",
  projectId: "smartshop-67693",
  storageBucket: "smartshop-67693.appspot.com",
  messagingSenderId: "198198503263",
  appId: "1:198198503263:web:4f11aab94d801836d978ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
