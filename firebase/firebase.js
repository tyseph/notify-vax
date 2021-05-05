import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyCnVQVNcMWNb3Hm2GfSqpNdpWMflnio5lc",
	authDomain: "covidapp-d60f5.firebaseapp.com",
	projectId: "covidapp-d60f5",
	storageBucket: "covidapp-d60f5.appspot.com",
	messagingSenderId: "364514760791",
	appId: "1:364514760791:web:c652ca486fa91fa865eb12",
	measurementId: "G-ZXNNYCHGTT",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const DB = firebase.database();
export default DB;
