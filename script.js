// Handle toggle for authentication buttons (Sign Up, Login, Logout)
const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Track user authentication status
let isAuthenticated = false;

// Toggle between Sign Up/Login and Logout buttons
function toggleAuthButtons() {
    if (isAuthenticated) {
        loginBtn.classList.add('hidden');
        signupBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
    } else {
        loginBtn.classList.remove('hidden');
        signupBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
    }
}

// Authentication button event listeners
signupBtn.addEventListener('click', () => {
    isAuthenticated = true; // Simulate sign up
    toggleAuthButtons();
    alert("Signed up successfully!");
});

loginBtn.addEventListener('click', () => {
    isAuthenticated = true; // Simulate login
    toggleAuthButtons();
    alert("Logged in successfully!");
});

logoutBtn.addEventListener('click', () => {
    isAuthenticated = false; // Simulate logout
    toggleAuthButtons();
    alert("Logged out successfully!");
});

// Editable blocks functionality
const editableBlocks = document.querySelectorAll('.editable-block');

// Make each block editable when clicked
editableBlocks.forEach(block => {
    block.addEventListener('click', () => {
        let currentContent = block.innerHTML;
        let newContent = prompt("Edit this block:", currentContent);
        
        // If the content is changed, update the block
        if (newContent !== null && newContent !== currentContent) {
            block.innerHTML = newContent;
        }
    });
});
