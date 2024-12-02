import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmJRkOR2wuvD5oMDuXrXxNVjWaNE7DK5Y",
  authDomain: "betta-ia.firebaseapp.com",
  projectId: "betta-ia",
  storageBucket: "betta-ia.firebasestorage.app",
  messagingSenderId: "889320678352",
  appId: "1:889320678352:web:d68931263ae855681d4fd5",
  measurementId: "G-CBM85N4CD5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };