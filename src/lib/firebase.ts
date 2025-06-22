
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
    apiKey: "AIzaSyDnACaN7l02yzCvrQ5KA2oAeV5Cufhn9Cg",
    authDomain: "myroomate-83928.firebaseapp.com",
    projectId: "myroomate-83928",
    storageBucket: "myroomate-83928.firebasestorage.app",
    messagingSenderId: "1012441772273",
    appId: "1:1012441772273:web:1101686655f9cafb317950",
    measurementId: "G-Z88RYBQ6JW"
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
