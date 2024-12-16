let loggedInUser = JSON.parse(localStorage.getItem('user')) || null;
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const logoutButton = document.getElementById('logoutButton');
const showSignupButton = document.getElementById('showSignup');
const showLoginButton = document.getElementById('showLogin');
const dashboard = document.getElementById('dashboard');
const userName = document.getElementById('userName');
const userPhoto = document.getElementById('userPhoto');
const userDescription = document.getElementById('userDescription');
const chronicIllnessBlog = document.getElementById('chronicIllnessBlog');

const saveUserData = (username, password, photo, description) => {
    const user = { username, password, photo, description };
    localStorage.setItem('user', JSON.stringify(user));
};

const updateDashboard = () => {
    if (loggedInUser) {
        userName.innerText = loggedInUser.username;
        userPhoto.src = loggedInUser.photo || "https://via.placeholder.com/150";
        userDescription.innerText = loggedInUser.description || "No description provided.";
        dashboard.classList.remove('hidden');
        logoutButton.classList.remove('hidden');
        showSignupButton.classList.add('hidden');
        showLoginButton.classList.add('hidden');
    } else {
        dashboard.classList.add('hidden');
        logoutButton.classList.add('hidden');
        showSignupButton.classList.remove('hidden');
        showLoginButton.classList.remove('hidden');
    }
};

const logout = () => {
    loggedInUser = null;
    localStorage.removeItem('user');
    updateDashboard();
};

const changePhoto = () => {
    const newPhotoURL = prompt("Enter a new photo URL");
    if (newPhotoURL) {
        loggedInUser.photo = newPhotoURL;
        saveUserData(loggedInUser.username, loggedInUser.password, newPhotoURL, loggedInUser.description);
        updateDashboard();
    }
};

const changeDescription = () => {
    const newDescription = prompt("Enter your description");
    if (newDescription) {
        loggedInUser.description = newDescription;
        saveUserData(loggedInUser.username, loggedInUser.password, loggedInUser.photo, newDescription);
        updateDashboard();
    }
};

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    loggedInUser = { username, password, photo: '', description: '' };
    saveUserData(username, password, '', '');
    updateDashboard();
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser && loggedInUser.username === username && loggedInUser.password === password) {
        updateDashboard();
    } else {
        alert("Invalid login credentials");
    }
});

logoutButton.addEventListener('click', logout);
document.getElementById('editPhoto').addEventListener('click', changePhoto);
document.getElementById('editDescription').addEventListener('click', changeDescription);

updateDashboard();
