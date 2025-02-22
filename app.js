import { auth } from './firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

const authSection = document.getElementById('auth-section');
const appSection = document.getElementById('app-section');
const logoutBtn = document.getElementById('logout-btn');
const postJobSection = document.getElementById('post-job');

// Monitor auth state
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = await db.collection('users').doc(user.uid).get();
        authSection.style.display = 'none';
        appSection.style.display = 'block';
        logoutBtn.style.display = 'block';
        if (userDoc.data().role === 'client') {
            postJobSection.style.display = 'block';
        }
    } else {
        authSection.style.display = 'block';
        appSection.style.display = 'none';
        logoutBtn.style.display = 'none';
        postJobSection.style.display = 'none';
    }
});