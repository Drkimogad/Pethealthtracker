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

    const contentSection = document.getElementById('contentSection');
    const profilesSection = document.getElementById('profiles');
    const remindersSection = document.getElementById('reminders');
    const healthTipsSection = document.getElementById('healthTips');
    const settingsSection = document.getElementById('settings');

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
        showContent('profiles');
    });

    remindersBtn.addEventListener('click', () => {
        showContent('reminders');
    });

    healthTipsBtn.addEventListener('click', () => {
        showContent('healthTips');
    });

    settingsBtn.addEventListener('click', () => {
        showContent('settings');
    });

    // Load profiles from local storage
    const loadProfiles = () => {
        let profiles = JSON.parse(localStorage.getItem(localStorageProfilesKey)) || [];
        // Display profiles dynamically
        let profilesHTML = '';
        profiles.forEach((profile, index) => {
            profilesHTML += `<div>${profile.name} (${profile.breed}) <button onclick="editProfile(${index})">Edit</button> <button onclick="deleteProfile(${index})">Delete</button></div>`;
        });
        profilesSection.innerHTML = profilesHTML;
    };

    // Load reminders from local storage
    const loadReminders = () => {
        let reminders = JSON.parse(localStorage.getItem(localStorageRemindersKey)) || [];
        let remindersHTML = '';
        reminders.forEach((reminder) => {
            remindersHTML += `<div>${reminder.text} (Due: ${reminder.dueDate})</div>`;
        });
        remindersSection.innerHTML = remindersHTML;
    };

    // Show specific content
    const showContent = (contentType) => {
        switch(contentType) {
            case 'profiles':
                loadProfiles();
                break;
            case 'reminders':
                loadReminders();
                break;
            case 'healthTips':
                loadHealthTips();
                break;
            case 'settings':
                toggleDarkMode();
                break;
        }
    };

    // Handle Health Tips
    const loadHealthTips = () => {
        let tips = JSON.parse(localStorage.getItem(localStorageHealthTipsKey)) || [];
        let tipsHTML = '<ul>';
        tips.forEach(tip => {
            tipsHTML += `<li>${tip}</li>`;
        });
        tipsHTML += '</ul>';
        healthTipsSection.innerHTML = tipsHTML;
    };

    // Handle Dark Mode
    const toggleDarkMode = () => {
        const isDarkMode = localStorage.getItem(localStorageDarkModeKey) === 'true';
        document.body.classList.toggle('dark', isDarkMode);
    };

    checkLoginStatus();  // Check login status on page load
});
