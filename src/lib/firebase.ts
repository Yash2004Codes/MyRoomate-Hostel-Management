
import { initializeApp, getApps, getApp, type FirebaseOptions, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore'; // Example if you need Firestore
// import { getStorage } from 'firebase/storage'; // Example if you need Storage

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Singleton instances
let app: FirebaseApp | null = null;
let auth: Auth | null = null;

/**
 * Gets the Firebase Auth instance.
 * Initializes Firebase if it's not already initialized.
 * This is a "lazy" getter to avoid initialization errors during build/SSR.
 */
function getFirebaseAuth(): Auth | null {
  if (auth) {
    return auth;
  }

  if (!getApps().length) {
    if (!firebaseConfig.apiKey) {
      console.error("Firebase API key is missing. Firebase could not be initialized.");
      return null;
    }
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  
  auth = getAuth(app);
  return auth;
}

// We are not exporting app and auth directly anymore.
// This ensures consumers use the lazy getter.
export { getFirebaseAuth };
