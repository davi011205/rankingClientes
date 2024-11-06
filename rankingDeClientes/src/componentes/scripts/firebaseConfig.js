import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Importar Auth

const ENVapiKey = import.meta.env.VITE_APIKEY;
const ENVauthDomain = import.meta.env.VITE_AUTHDOMAIN;
const ENVprojectId = import.meta.env.VITE_PROJECTID;
const ENVstorageBucket = import.meta.env.VITE_STORAGEBUCKET;
const ENVmessagingSenderId = import.meta.env.VITE_MESSAGINSENDERID;
const ENVappId = import.meta.env.VITE_APPID;


const firebaseConfig = {
  apiKey: ENVapiKey,
  authDomain: ENVauthDomain,
  projectId: ENVprojectId,
  storageBucket: ENVstorageBucket,
  messagingSenderId: ENVmessagingSenderId,
  appId: ENVappId
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Inicializar Auth

export { db, auth };
