import { auth, db } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const authSection = document.getElementById('auth-section');
const appSection = document.getElementById('app-section');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const logoutBtn = document.getElementById('logout-btn');
const postJobSection = document.getElementById('post-job');

// Toggle between login and signup
document.getElementById('show-signup').addEventListener('click', () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', () => {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
});

// Signup
document.getElementById('signup-btn').addEventListener('click', async () => {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const name = document.getElementById('signup-name').value;
    const role = document.getElementById('signup-role').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), {
            name,
            role,
            email
        });
        showApp(role);
    } catch (error) {
        alert(error.message);
    }
});

// Login
document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await db.collection('users').doc(userCredential.user.uid).get();
        showApp(userDoc.data().role);
    } catch (error) {
        alert(error.message);
    }
});

// Logout
logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
    authSection.style.display = 'block';
    appSection.style.display = 'none';
    logoutBtn.style.display = 'none';
});

function showApp(role) {
    authSection.style.display = 'none';
    appSection.style.display = 'block';
    logoutBtn.style.display = 'block';
    if (role === 'client') {
        postJobSection.style.display = 'block';
    }
}