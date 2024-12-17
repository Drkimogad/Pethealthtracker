// Initial Setup
let currentUser = null;

// DOM Elements
const userDetails = document.getElementById('userDetails');
const userPhoto = document.getElementById('profilePic');
const userName = document.getElementById('userName');
const userDescription = document.getElementById('userDescription');
const dashboardLink = document.getElementById('dashboardLink');
const profilesLink = document.getElementById('profilesLink');
const remindersLink = document.getElementById('remindersLink');
const healthProgressLink = document.getElementById('petHealthProgressLink');
const vaccinationLink = document.getElementById('vaccinationTrackerLink');
const settingsLink = document.getElementById('settingsLink');

// Initialize User Data (LocalStorage)
function loadUserData() {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
        currentUser = storedUserData;
        updateUserUI();
    } else {
        showLoginForm();
    }
}

// Update User UI
function updateUserUI() {
    userName.textContent = currentUser.username;
    userDescription.textContent = currentUser.description || "Add a description about yourself.";
    userPhoto.src = currentUser.photo || "https://via.placeholder.com/150"; // Default image if no photo is set
}

// Handle Login Form
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    // For simplicity, we're directly using the entered credentials. You can add more security measures in the future.
    const userData = {
        username: username,
        password: password,
        photo: null,
        description: "",
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    currentUser = userData;
    updateUserUI();
    showDashboard();
});

// Handle SignUp Form
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const userData = {
        username: username,
        password: password,
        photo: null,
        description: "",
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    currentUser = userData;
    updateUserUI();
    showDashboard();
});

// Show Dashboard after Login
function showDashboard() {
    document.getElementById('userSection').style.display = "none";
    document.getElementById('mainContent').style.display = "block";
}

// Logout User
document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('userData');
    currentUser = null;
    showLoginForm();
});

// Show Login Form
function showLoginForm() {
    document.getElementById('userSection').style.display = "block";
    document.getElementById('mainContent').style.display = "none";
}

// Upload Profile Photo
document.getElementById('uploadPhoto').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            currentUser.photo = reader.result;
            localStorage.setItem('userData', JSON.stringify(currentUser));
            userPhoto.src = currentUser.photo;
        };
        reader.readAsDataURL(file);
    }
});

// Update Description
document.getElementById('updateDescription').addEventListener('click', () => {
    const newDescription = prompt("Update your description:", currentUser.description || "");
    if (newDescription !== null) {
        currentUser.description = newDescription;
        localStorage.setItem('userData', JSON.stringify(currentUser));
        userDescription.textContent = currentUser.description;
    }
});

// Handle Click on Dashboard Sections
document.getElementById('profilesLink').addEventListener('click', () => {
    displayContent('profilesContent');
});

document.getElementById('remindersLink').addEventListener('click', () => {
    displayContent('remindersContent');
});

document.getElementById('petHealthProgressLink').addEventListener('click', () => {
    displayContent('healthProgressContent');
});

document.getElementById('vaccinationTrackerLink').addEventListener('click', () => {
    displayContent('vaccinationTrackerContent');
});

document.getElementById('settingsLink').addEventListener('click', () => {
    displayContent('settingsContent');
});

// Show content dynamically
function displayContent(contentId) {
    const contentElements = document.querySelectorAll('.content-block');
    contentElements.forEach(element => {
        element.style.display = 'none'; // Hide all sections
    });

    const activeContent = document.getElementById(contentId);
    if (activeContent) {
        activeContent.style.display = 'block'; // Show the clicked section
    }
}

// Load Default Content (Dashboard)
function loadDefaultContent() {
    const defaultContent = document.createElement('div');
    defaultContent.classList.add('content-block');
    defaultContent.id = 'dashboardContent';
    defaultContent.innerHTML = '<h2>Welcome to your Pet Health Dashboard!</h2><p>Click any section above to view your data.</p>';
    document.getElementById('mainContent').appendChild(defaultContent);
}

// Initialize
loadUserData();
loadDefaultContent();
