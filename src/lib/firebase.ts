
import { initializeApp, getApps, getApp, type FirebaseOptions, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

// Singleton instances to ensure Firebase is initialized only once
let app: FirebaseApp | null = null;
let auth: Auth | null = null;

/**
 * Gets the Firebase Auth instance lazily and safely.
 * Initializes Firebase if it's not already initialized.
 * This is safe to call on both server and client.
 */
function getFirebaseAuth(): Auth | null {
  // If we already have a valid auth instance, return it immediately.
  if (auth) {
    return auth;
  }

  // Build the config object at the moment it's needed.
  const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  // Crucially, if the essential keys aren't present (e.g., during the build process),
  // we do not try to initialize the app, preventing the build error.
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    // This is expected during the server build on Netlify.
    // It is not an error.
    return null;
  }

  // Initialize the app if it hasn't been already.
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  
  // Get the auth instance, cache it in our module-level variable, and return it.
  auth = getAuth(app);
  return auth;
}

export { getFirebaseAuth };
