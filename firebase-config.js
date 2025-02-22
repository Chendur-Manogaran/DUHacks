// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js';
// Optional: Include Analytics if you want to use it
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATK9hbL93XPfazDU5jc-wvVU8AfYpUdAU",
  authDomain: "freelancer-marketplace-f81fd.firebaseapp.com",
  projectId: "freelancer-marketplace-f81fd",
  storageBucket: "freelancer-marketplace-f81fd.firebasestorage.app",
  messagingSenderId: "482849118809",
  appId: "1:482849118809:web:1934f58c0c88e6aa6a6f48",
  measurementId: "G-JWWF94EBWQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// Optional: Initialize Analytics if you want to track usage
const analytics = getAnalytics(app);

// Export the initialized services for use in other files
export { auth, db, analytics };