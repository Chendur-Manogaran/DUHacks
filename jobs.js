import { db } from './firebase-config.js';
import { 
    collection, 
    addDoc, 
    onSnapshot,
    query 
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const jobsContainer = document.getElementById('jobs-container');
const submitJobBtn = document.getElementById('submit-job');

// Post new job
submitJobBtn?.addEventListener('click', async () => {
    const title = document.getElementById('job-title').value;
    const description = document.getElementById('job-description').value;
    const budget = document.getElementById('job-budget').value;

    try {
        await addDoc(collection(db, "jobs"), {
            title,
            description,
            budget: Number(budget),
            postedBy: auth.currentUser.uid,
            createdAt: new Date().toISOString()
        });
        document.getElementById('job-title').value = '';
        document.getElementById('job-description').value = '';
        document.getElementById('job-budget').value = '';
    } catch (error) {
        alert(error.message);
    }
});

// Display jobs in real-time
const q = query(collection(db, "jobs"));
onSnapshot(q, (snapshot) => {
    jobsContainer.innerHTML = '';
    snapshot.forEach((doc) => {
        const job = doc.data();
        const jobElement = document.createElement('div');
        jobElement.className = 'job-card';
        jobElement.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.description}</p>
            <p>Budget: $${job.budget}</p>
            <p>Posted: ${new Date(job.createdAt).toLocaleDateString()}</p>
        `;
        jobsContainer.appendChild(jobElement);
    });
});