// Firebase modular configuration (ES module)
// This file initializes Firebase using the modular SDK and exports `db`.
// It also assigns `window.db` for backward compatibility with older scripts.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ''
};

if (!firebaseConfig.apiKey) {
  console.warn('Firebase config appears empty. Make sure you have a .env with VITE_FIREBASE_* variables or set them in your environment.');
}

// Initialize
const app = initializeApp(firebaseConfig);
try {
  // analytics can fail in some environments (e.g., local file protocol)
  try { getAnalytics(app); } catch (err) { /* ignore analytics errors */ }
} catch (e) {
  console.warn('Firebase app initialize warning:', e);
}

const db = getFirestore(app);

// Initialize anonymous auth so clients can write if rules require auth
let auth;
try {
  auth = getAuth(app);
  signInAnonymously(auth).then(() => {
    console.log('Signed in anonymously to Firebase Auth');
  }).catch((err) => {
    console.warn('Anonymous sign-in error:', err);
  });
} catch (e) {
  console.warn('Auth initialization warning:', e);
}

// expose for non-module scripts that may still expect window.db or window.auth
window.firebaseApp = app;
window.db = db;
window.auth = auth;

export { db, auth };
