
import { initializeApp, getApps, getApp, type FirebaseOptions, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

// Singleton instances to ensure Firebase is initialized only once
let app: FirebaseApp | null = null;
let auth: Auth | null = null;

// The config is now built inside a getter function.
// This prevents it from being created with undefined env vars during the build process.
const getFirebaseConfig = (): FirebaseOptions | null => {
    const firebaseConfig: FirebaseOptions = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    // Ensure all necessary keys are present before returning the config.
    if (firebaseConfig.apiKey && firebaseConfig.projectId) {
        return firebaseConfig;
    }

    return null;
}

/**
 * Gets the Firebase Auth instance lazily and safely.
 * Initializes Firebase if it's not already initialized.
 * This is safe to call on both server and client. It will only initialize 
 * when credentials are available, which is on the client side at runtime.
 */
function getFirebaseAuth(): Auth | null {
  // If we already have a valid auth instance, return it immediately.
  if (auth) {
    return auth;
  }

  const config = getFirebaseConfig();

  // If config is not valid (missing keys), we cannot initialize.
  if (!config) {
    // This is an expected state during build or if env vars are not set.
    // We don't log an error here to avoid cluttering build logs.
    return null;
  }
  
  // Initialize the app if it hasn't been already.
  // getApps() is a reliable way to check if an app instance exists.
  if (!getApps().length) {
    app = initializeApp(config);
  } else {
    app = getApp();
  }
  
  // Get the auth instance and cache it in our module-level variable.
  auth = getAuth(app);
  return auth;
}

export { getFirebaseAuth };
