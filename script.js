document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const logoutButton = document.getElementById("logoutButton");
    const showSignupButton = document.getElementById("showSignup");
    const showLoginButton = document.getElementById("showLogin");
    const mainContent = document.getElementById("mainContent");

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (localStorage.getItem("isLoggedIn") === "true" && localStorage.getItem("loggedInUser")) {
        showDashboard(localStorage.getItem("loggedInUser"));
    } else {
        showLoginForm();
    }

    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("signupUsername").value.trim().toLowerCase();
        const password = document.getElementById("signupPassword").value;

        if (users[username]) {
            alert("Username already exists. Please try another.");
        } else {
            users[username] = password;
            localStorage.setItem("users", JSON.stringify(users));
            alert("Signup successful! Please log in.");
            signupForm.classList.add("hidden");
            loginForm.classList.remove("hidden");
        }
    });

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("loginUsername").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        if (users[username] === password) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("loggedInUser", username);
            showDashboard(username);
        } else {
            alert("Invalid login credentials.");
        }
    });

    logoutButton.addEventListener("click", function () {
        alert("You have logged out.");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedInUser");
        showLoginForm();
    });

    // Toggle to Signup Form
    showSignupButton.addEventListener("click", function () {
        signupForm.classList.remove("hidden");
        loginForm.classList.add("hidden");
        showSignupButton.classList.add("hidden");
        showLoginButton.classList.remove("hidden");
    });

    // Toggle to Login Form
    showLoginButton.addEventListener("click", function () {
        signupForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
        showSignupButton.classList.remove("hidden");
        showLoginButton.classList.add("hidden");
    });

    // Display the dashboard and section links
    function showDashboard(username) {
        mainContent.innerHTML = `
            <h2 class="text-xl font-bold mb-4">Welcome, ${username}!</h2>
            <div id="dashboardContent">
                <p>This is your personalized space. Select a section below:</p>
                <ul>
                    <li><a href="#profiles" class="text-green-600" onclick="showProfiles()">Profiles</a></li>
                    <li><a href="#reminders" class="text-green-600" onclick="showReminders()">Reminders</a></li>
                    <li><a href="#health-tips" class="text-green-600" onclick="showHealthTips()">Health Tips</a></li>
                    <li><a href="#community" class="text-green-600" onclick="showCommunity()">Community</a></li>
                    <li><a href="#settings" class="text-green-600" onclick="showSettings()">Settings</a></li>
                </ul>
            </div>
        `;
        loginForm.classList.add("hidden");
        signupForm.classList.add("hidden");
        logoutButton.classList.remove("hidden");
    }

    // Placeholder functions for each section (Profiles, Reminders, etc.)
    function showProfiles() {
        mainContent.innerHTML = `<h2>Profiles</h2><p>Manage your pet profiles here.</p>`;
    }

    function showReminders() {
        mainContent.innerHTML = `<h2>Reminders</h2><p>View your preventive care reminders.</p>`;
    }

    function showHealthTips() {
        mainContent.innerHTML = `<h2>Health Tips</h2><p>Learn how to take care of your pets.</p>`;
    }

    function showCommunity() {
        mainContent.innerHTML = `<h2>Community</h2><p>Join the pet owners' community.</p>`;
    }

    function showSettings() {
        mainContent.innerHTML = `<h2>Settings</h2><p>Adjust your preferences.</p>`;
    }

    function showLoginForm() {
        mainContent.innerHTML = `
            <h2 class="text-xl font-bold mb-4">Please log in or sign up</h2>
            <p>Enter your username and password to access your dashboard.</p>
        `;
        loginForm.classList.remove("hidden");
        signupForm.classList.add("hidden");
        logoutButton.classList.add("hidden");
    }
});
