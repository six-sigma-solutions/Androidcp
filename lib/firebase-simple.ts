// Simple Firebase initialization following the model
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfigFromFile from '../firebaseConfig';

// Simple singleton Firebase initialization
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfigFromFile);
export const auth = getAuth(app);

console.log('[Firebase] Firebase initialized with project:', firebaseConfigFromFile.projectId);