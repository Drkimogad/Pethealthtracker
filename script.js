document.addEventListener('DOMContentLoaded', () => {
    const userSection = document.querySelector('.user-section');
    const dashboardContent = document.querySelector('#dashboardContent');
    const logoutButton = document.querySelector('#logoutButton');
    const loginForm = document.querySelector('#loginForm');
    const signupForm = document.querySelector('#signupForm');
    const showSignupBtn = document.querySelector('#showSignup');
    const showLoginBtn = document.querySelector('#showLogin');
    const photoInput = document.querySelector('#photoInput');
    const userPhoto = document.querySelector('#userPhoto');
    const userName = document.querySelector('#userName');
    const userDescription = document.querySelector('#userDescription');
    const editPhotoButton = document.querySelector('#editPhoto');
    const saveDescriptionButton = document.querySelector('#saveDescription');
    const descriptionInput = document.querySelector('#descriptionInput');
    const editDescriptionButton = document.querySelector('#editDescription');
    const profilesLinkBtn = document.querySelector('#profilesLinkBtn');
    const remindersLinkBtn = document.querySelector('#remindersLinkBtn');
    const healthTipsLinkBtn = document.querySelector('#healthTipsLinkBtn');

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Function to display user data on the dashboard
    const updateUserDashboard = () => {
        if (currentUser) {
            userName.textContent = currentUser.username;
            userDescription.textContent = currentUser.description || 'No description added.';
            userPhoto.src = currentUser.photo || 'https://via.placeholder.com/150';
            userSection.classList.add('hidden');
            dashboardContent.classList.remove('hidden');
        }
    };

    // Show sign up form
    showSignupBtn.addEventListener('click', () => {
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        showSignupBtn.classList.add('hidden');
        showLoginBtn.classList.remove('hidden');
    });

    // Show login form
    showLoginBtn.addEventListener('click', () => {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        showSignupBtn.classList.remove('hidden');
        showLoginBtn.classList.add('hidden');
    });

    // Handle signup form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.querySelector('#signupUsername').value;
        const password = document.querySelector('#signupPassword').value;

        // Save user data to localStorage
        const newUser = {
            username,
            password,
            description: '',
            photo: ''
        };
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        currentUser = newUser;

        // Switch to login form
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        showSignupBtn.classList.remove('hidden');
        showLoginBtn.classList.add('hidden');
        updateUserDashboard();
    });

    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.querySelector('#loginUsername').value;
        const password = document.querySelector('#loginPassword').value;

        // Check if user exists
        const savedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (savedUser && savedUser.username === username && savedUser.password === password) {
            currentUser = savedUser;
            updateUserDashboard();
        } else {
            alert('Invalid login credentials');
        }
    });

    // Handle logout
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        currentUser = null;
        userSection.classList.remove('hidden');
        dashboardContent.classList.add('hidden');
    });

    // Allow the user to upload a photo
    editPhotoButton.addEventListener('click', () => {
        photoInput.click();
    });

    photoInput.addEventListener('change', () => {
        const file = photoInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                userPhoto.src = reader.result;
                currentUser.photo = reader.result;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle description editing
    editDescriptionButton.addEventListener('click', () => {
        descriptionInput.classList.remove('hidden');
        saveDescriptionButton.classList.remove('hidden');
    });

    saveDescriptionButton.addEventListener('click', () => {
        currentUser.description = descriptionInput.value;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        userDescription.textContent = currentUser.description;
        descriptionInput.classList.add('hidden');
        saveDescriptionButton.classList.add('hidden');
    });

    // Handle profile, reminders, and health tips content (stub content)
    profilesLinkBtn.addEventListener('click', () => {
        alert('Manage Pet Profiles clicked');
    });

    remindersLinkBtn.addEventListener('click', () => {
        alert('Set Reminders clicked');
    });

    healthTipsLinkBtn.addEventListener('click', () => {
        alert('Health Tips clicked');
    });

    // Initialize the page
    if (currentUser) {
        updateUserDashboard();
    } else {
        userSection.classList.remove('hidden');
        dashboardContent.classList.add('hidden');
    }
});
