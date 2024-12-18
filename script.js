document.addEventListener("DOMContentLoaded", () => {
    const profilesBtn = document.getElementById('profilesBtn');
    const remindersBtn = document.getElementById('remindersBtn');
    const healthTipsBtn = document.getElementById('healthTipsBtn');
    const settingsBtn = document.getElementById('settingsBtn');

    const welcomeMessage = document.getElementById('welcomeMessage');
    const authSection = document.getElementById('authSection');
    const signupBtn = document.getElementById('signupBtn');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    const localStorageProfilesKey = 'petProfiles';
    const localStorageRemindersKey = 'petReminders';
    const localStorageHealthTipsKey = 'healthTips';
    const localStorageDarkModeKey = 'darkMode';

    let isLoggedIn = false;

    const checkLoginStatus = () => {
        const user = localStorage.getItem('user');
        isLoggedIn = user !== null;
        if (isLoggedIn) {
            welcomeMessage.innerText = `Welcome, ${user}`;
            authSection.classList.add('hidden');
            logoutBtn.classList.remove('hidden');
        } else {
            welcomeMessage.innerText = `Welcome to Your Dashboard`;
            authSection.classList.remove('hidden');
            logoutBtn.classList.add('hidden');
        }
    };

    // Handle Auth
    signupBtn.addEventListener('click', () => {
        const username = prompt("Enter a username to sign up:");
        if (username) {
            localStorage.setItem('user', username);
            checkLoginStatus();
        }
    });

    loginBtn.addEventListener('click', () => {
        const username = prompt("Enter your username to login:");
        const storedUser = localStorage.getItem('user');
        if (username === storedUser) {
            checkLoginStatus();
        } else {
            alert("Incorrect username!");
        }
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('user');
        checkLoginStatus();
    });

    profilesBtn.addEventListener('click', () => {
        alert("Pet Profiles section clicked.");
        // Add functionality for profiles section
    });

    remindersBtn.addEventListener('click', () => {
        alert("Pet Care Reminders section clicked.");
        // Add functionality for reminders section
    });

    healthTipsBtn.addEventListener('click', () => {
        alert("Health Tips section clicked.");
        // Add functionality for health tips section
    });

    settingsBtn.addEventListener('click', () => {
        alert("Settings section clicked.");
        // Add functionality for settings section
    });

    checkLoginStatus();  // Check login status on page load
});
