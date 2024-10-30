import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Importar Auth

const firebaseConfig = {
  apiKey: "AIzaSyBgugspLfac5YietW85omA_4X9WbmmOsW0",
  authDomain: "rankingcli.firebaseapp.com",
  projectId: "rankingcli",
  storageBucket: "rankingcli.appspot.com",
  messagingSenderId: "645056970671",
  appId: "1:645056970671:web:3eb555990572eb5aa5395a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Inicializar Auth

export { db, auth };
