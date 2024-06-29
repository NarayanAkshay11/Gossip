// admin.js

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

const loginForm = document.getElementById('loginForm');
const messageForm = document.getElementById('messageForm');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const messageInput = document.getElementById('messageInput');
const submitButton = document.getElementById('submitButton');

loginButton.addEventListener('click', (e) => {
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Logged in successfully');
        })
        .catch((error) => {
            console.error('Login error:', error);
            alert('Login failed. Please check your credentials.');
        });
});

logoutButton.addEventListener('click', (e) => {
    auth.signOut().then(() => {
        console.log('Logged out successfully');
    }).catch((error) => {
        console.error('Logout error:', error);
    });
});

submitButton.addEventListener('click', (e) => {
    const message = messageInput.value.trim();
    if (message && message.split(' ').length <= 100) {
        const newMessageRef = database.ref('messages').push();
        newMessageRef.set({
            content: message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        })
        .then(() => {
            console.log('Message sent successfully');
            messageInput.value = '';
            alert('Message broadcasted successfully!');
        })
        .catch((error) => {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        });
    } else {
        alert('Please enter a valid message (max 100 words)');
    }
});

auth.onAuthStateChanged((user) => {
    if (user) {
        loginForm.style.display = 'none';
        messageForm.style.display = 'block';
    } else {
        loginForm.style.display = 'block';
        messageForm.style.display = 'none';
    }
});
