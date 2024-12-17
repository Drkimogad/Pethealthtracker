document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');
    const showSignupButton = document.getElementById('showSignup');
    const showLoginButton = document.getElementById('showLogin');
    const dashboardLink = document.getElementById('dashboardLink');
    const profilesLink = document.getElementById('profilesLink');
    const remindersLink = document.getElementById('remindersLink');
    const petHealthProgressLink = document.getElementById('petHealthProgressLink');
    const settingsLink = document.getElementById('settingsLink');
    const mainContent = document.getElementById('mainContent');

    const user = JSON.parse(localStorage.getItem('user'));

    function loadUserData() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            document.getElementById('mainContent').innerHTML = `
                <h2>Welcome back, ${user.username}!</h2>
                <p><strong>Description:</strong> ${user.description || 'No description provided.'}</p>
                <img src="${user.photo || 'https://via.placeholder.com/150'}" alt="User Photo" />
            `;
            showLoginButton.classList.add('hidden');
            showSignupButton.classList.add('hidden');
            logoutButton.classList.remove('hidden');
        }
    }

    function updateUserData() {
        const userData = {
            username: document.getElementById('signupUsername').value || document.getElementById('loginUsername').value,
            photo: document.getElementById('photoInput').files.length > 0 ? URL.createObjectURL(document.getElementById('photoInput').files[0]) : '',
            description: document.getElementById('userDescription').value
        };
        localStorage.setItem('user', JSON.stringify(userData));
        loadUserData();
    }

    // Handle SignUp
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('user', JSON.stringify({
            username: document.getElementById('signupUsername').value,
            photo: '',
            description: ''
        }));
        loadUserData();
    });

    // Handle Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData.username === document.getElementById('loginUsername').value) {
            loadUserData();
        } else {
            alert('Invalid login details');
        }
    });

    // Handle LogOut
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('user');
        location.reload();
    });

    // Dashboard functionality
    dashboardLink.addEventListener('click', () => {
        mainContent.innerHTML = `<h2>Dashboard</h2><p>Welcome to your pet health dashboard.</p>`;
    });

    profilesLink.addEventListener('click', () => {
        mainContent.innerHTML = `<h2>Profiles</h2><p>Manage your pet profiles here.</p>`;
    });

    remindersLink.addEventListener('click', () => {
        mainContent.innerHTML = `<h2>Reminders</h2><p>Set reminders for your pets here.</p>`;
    });

    petHealthProgressLink.addEventListener('click', () => {
        mainContent.innerHTML = `<h2>Pet Health Progress</h2><p>Track your pet's health progress.</p>`;
    });

    settingsLink.addEventListener('click', () => {
        mainContent.innerHTML = `<h2>Settings</h2><p>Manage your pet health tracker settings here.</p>`;
    });

    loadUserData();
});
