import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDz5KsAaUkQYhkOust4LiJGP7QPTJuxekw",
	authDomain: "cruck-85d70.firebaseapp.com",
	projectId: "cruck-85d70",
	storageBucket: "cruck-85d70.appspot.com",
	messagingSenderId: "773909252505",
	appId: "1:773909252505:web:54f3a87ab6b19cca352b08"
};

// init firebase
initializeApp(firebaseConfig);

// init firestore service
const db = getFirestore();

export {db};