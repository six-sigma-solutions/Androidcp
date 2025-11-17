// Minimal Firebase initialization (no auth/session logic)
import { initializeApp, getApps } from "firebase/app";
import firebaseConfigFromFile from '../firebaseConfig';

// Singleton Firebase initialization
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfigFromFile);

// Export app if needed elsewhere
export default app;