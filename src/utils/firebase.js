import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAeupB6zQ2XjgfoEXe0my7AXd9KE6Gd5sM",
  authDomain: "food-delivery-app-4dd51.firebaseapp.com",
  databaseURL:
    "https://food-delivery-app-4dd51-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "food-delivery-app-4dd51",
  storageBucket: "food-delivery-app-4dd51.appspot.com",
  messagingSenderId: "42861316646",
  appId: "1:42861316646:web:268ae0f260ce8de07874e7",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

