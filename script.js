document.addEventListener("DOMContentLoaded", function() {
    // Initialize DOM elements
    const mainContent = document.getElementById('mainContent');
    const dashboardSection = document.getElementById('dashboard');
    const profilesSection = document.getElementById('profiles');
    const remindersSection = document.getElementById('reminders');
    const healthTipsSection = document.getElementById('health-tips');
    const settingsSection = document.getElementById('settings');

    // Fetch user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    function loadUserData() {
        if (user) {
            dashboardSection.classList.remove("hidden");
            profilesSection.classList.remove("hidden");
            remindersSection.classList.remove("hidden");
            healthTipsSection.classList.remove("hidden");
            settingsSection.classList.remove("hidden");

            document.getElementById('userName').textContent = user.username;
            document.getElementById('userDescription').textContent = user.description || 'Please update your description.';
            document.getElementById('profilePic').src = user.photo || 'https://via.placeholder.com/150';
        } else {
            showLoginForm();
        }
    }

    // Toggle between login and signup form
    document.getElementById('showSignup').addEventListener('click', () => {
        document.getElementById('signupForm').classList.remove('hidden');
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('showSignup').classList.add('hidden');
        document.getElementById('showLogin').classList.remove('hidden');
    });

    document.getElementById('showLogin').addEventListener('click', () => {
        document.getElementById('signupForm').classList.add('hidden');
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('showSignup').classList.remove('hidden');
        document.getElementById('showLogin').classList.add('hidden');
    });

    // Handle SignUp
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;
        const newUser = { username, password, photo: '', description: '' };
        localStorage.setItem('user', JSON.stringify(newUser));
        loadUserData();
    });

    // Handle Login
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser && savedUser.username === username && savedUser.password === password) {
            loadUserData();
        } else {
            alert("Invalid login credentials");
        }
    });

    // Logout User
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('user');
        location.reload();
    });

    // Handle Profile Update (Add Pet)
    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const petName = document.getElementById('petName').value;
        const petAge = document.getElementById('petAge').value;
        const petBreed = document.getElementById('petBreed').value;
        const profileList = document.getElementById('profileList');
        profileList.innerHTML += `
            <div class="bg-white rounded-lg shadow-md p-4 mb-4">
                <h3 class="text-lg font-bold">${petName}</h3>
                <p>Age: ${petAge} years</p>
                <p>Breed: ${petBreed}</p>
            </div>
        `;
    });

    // Dark Mode Toggle
    document.getElementById('darkModeToggle').addEventListener('click', function() {
        document.body.classList.toggle('bg-gray-900');
        document.body.classList.toggle('text-white');
    });

    // Initialize user data
    loadUserData();
});
