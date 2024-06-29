// index.js

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const messageList = document.getElementById('messageList');

database.ref('messages').orderByChild('timestamp').on('child_added', (snapshot) => {
    const message = snapshot.val();
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    
    const contentElement = document.createElement('div');
    contentElement.className = 'message-content';
    contentElement.textContent = message.content;
    
    const dateElement = document.createElement('div');
    dateElement.className = 'message-date';
    dateElement.textContent = new Date(message.timestamp).toLocaleString();
    
    messageElement.appendChild(contentElement);
    messageElement.appendChild(dateElement);
    
    messageList.insertBefore(messageElement, messageList.firstChild);
});

document.getElementById('adminButton').addEventListener('click', () => {
    window.location.href = 'admin.html';
});

// Add this to check if messages are being retrieved
database.ref('messages').once('value', (snapshot) => {
    console.log('All messages:', snapshot.val());
});
