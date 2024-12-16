document.addEventListener("DOMContentLoaded", function () {
    const showSignup = document.getElementById("showSignup");
    const showLogin = document.getElementById("showLogin");
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const logoutButton = document.getElementById("logoutButton");
    const dashboardLink = document.getElementById("dashboardLink");
    const profilesLink = document.getElementById("profilesLink");
    const remindersLink = document.getElementById("remindersLink");
    const healthTipsLink = document.getElementById("healthTipsLink");
    const communityLink = document.getElementById("communityLink");
    const settingsLink = document.getElementById("settingsLink");

    let currentUser = null;
    let userPhoto = null;
    let userDescription = null;

    // Check if user is logged in
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
        currentUser = savedUsername;
        updateUIForUser();
    }

    // Toggle between login and signup forms
    showSignup.addEventListener("click", function () {
        signupForm.classList.remove("hidden");
        loginForm.classList.add("hidden");
        showSignup.classList.add("hidden");
        showLogin.classList.remove("hidden");
    });

    showLogin.addEventListener("click", function () {
        loginForm.classList.remove("hidden");
        signupForm.classList.add("hidden");
        showLogin.classList.add("hidden");
        showSignup.classList.remove("hidden");
    });

    // Handle Sign Up
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("signupUsername").value;
        const password = document.getElementById("signupPassword").value;

        // Save user info to localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        alert("Sign Up Successful! Please Login.");
        showLogin.click();
    });

    // Handle Login
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        const savedPassword = localStorage.getItem("password");

        if (username === savedUsername && password === savedPassword) {
            currentUser = username;
            updateUIForUser();
        } else {
            alert("Invalid username or password");
        }
    });

    // Handle Logout
    logoutButton.addEventListener("click", function () {
        currentUser = null;
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        localStorage.removeItem("userPhoto");
        localStorage.removeItem("userDescription");
        resetUI();
    });

    function updateUIForUser() {
        // Show user-specific info
        document.getElementById("showSignup").classList.add("hidden");
        document.getElementById("showLogin").classList.add("hidden");
        document.getElementById("signupForm").classList.add("hidden");
        document.getElementById("loginForm").classList.add("hidden");
        logoutButton.classList.remove("hidden");

        // Get saved photo and description from localStorage
        userPhoto = localStorage.getItem("userPhoto") || 'https://via.placeholder.com/150';
        userDescription = localStorage.getItem("userDescription") || '';

        const userContent = `
            <h2>Welcome back, ${currentUser}!</h2>
            <div id="userInfo">
                <img src="${userPhoto}" alt="User Photo" class="rounded-full" id="userPhoto">
                <textarea id="userDescription" placeholder="Add your description..." class="p-2 mb-2 border rounded w-full">${userDescription}</textarea>
                <input type="file" id="uploadPhoto" class="p-2 mb-2 border rounded">
                <button id="removePhotoButton" class="bg-red-600 text-white p-2 rounded mt-2">Remove Photo</button>
            </div>
        `;
        document.getElementById("mainContent").innerHTML = userContent;

        // Event listener for uploading a photo
        document.getElementById("uploadPhoto").addEventListener("change", function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    userPhoto = event.target.result;
                    localStorage.setItem("userPhoto", userPhoto); // Save to localStorage
                    document.getElementById("userPhoto").src = userPhoto;
                };
                reader.readAsDataURL(file);
            }
        });

        // Event listener for removing the photo
        document.getElementById("removePhotoButton").addEventListener("click", function () {
            userPhoto = 'https://via.placeholder.com/150'; // Reset to default image
            localStorage.setItem("userPhoto", userPhoto); // Save to localStorage
            document.getElementById("userPhoto").src = userPhoto;
        });

        // Event listener for updating the user description
        document.getElementById("userDescription").addEventListener("input", function (e) {
            userDescription = e.target.value;
            localStorage.setItem("userDescription", userDescription); // Save to localStorage
        });
        
        // Ensure navigation links are clickable and load content dynamically
        setupNavigation();
    }

    function resetUI() {
        // Reset UI to initial state
        document.getElementById("showSignup").classList.remove("hidden");
        showSignup.click(); // Show signup form by default
    }

    // Dashboard, Profiles, Reminders, Health Tips, etc. Links
    function setupNavigation() {
        // Dashboard link
        dashboardLink.addEventListener("click", function (e) {
            e.preventDefault();
            document.getElementById("mainContent").innerHTML = "<h2>Dashboard Content</h2><p>Welcome to your Pet Health Tracker dashboard.</p>";
        });

        // Profiles link
        profilesLink.addEventListener("click", function (e) {
            e.preventDefault();
            document.getElementById("mainContent").innerHTML = "<h2>Profiles</h2><p>Manage your pet profiles here.</p>";
        });

        // Reminders link
        remindersLink.addEventListener("click", function (e) {
            e.preventDefault();
            document.getElementById("mainContent").innerHTML = "<h2>Reminders</h2><p>Set reminders for your pet's health tasks like vaccinations and vet visits.</p>";
        });

        // Health Tips link
        healthTipsLink.addEventListener("click", function (e) {
            e.preventDefault();
            document.getElementById("mainContent").innerHTML = "<h2>Health Tips</h2><p>Stay informed with useful pet health tips and advice.</p>";
        });

        // Community link
        communityLink.addEventListener("click", function (e) {
            e.preventDefault();
            document.getElementById("mainContent").innerHTML = "<h2>Community</h2><p>Join our community and share tips with fellow pet owners.</p>";
        });

        // Settings link
        settingsLink.addEventListener("click", function (e) {
            e.preventDefault();
            document.getElementById("mainContent").innerHTML = "<h2>Settings</h2><p>Update your preferences and settings here.</p>";
        });
    }
});
