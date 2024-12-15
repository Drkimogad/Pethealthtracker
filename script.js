document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const logoutButton = document.getElementById("logoutButton");
    const mainContent = document.getElementById("mainContent");

    // Simulated user credentials storage (stores in localStorage)
    let users = JSON.parse(localStorage.getItem("users")) || {};

    // Check login status on page load
    if (localStorage.getItem("isLoggedIn") === "true") {
        showDashboard();  // Show dashboard if logged in
    } else {
        showLoginForm();  // Show login form if not logged in
    }

    // Signup handler
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();  // Prevent form from submitting normally
        const username = document.getElementById("signupUsername").value.trim().toLowerCase();
        const password = document.getElementById("signupPassword").value;

        // Check if user already exists
        if (users[username]) {
            alert("Username already exists. Please try another.");
        } else {
            // Add new user to localStorage
            users[username] = password;
            localStorage.setItem("users", JSON.stringify(users));
            alert("Signup successful! Please log in.");
            signupForm.classList.add("hidden");
            loginForm.classList.remove("hidden");
        }
    });

    // Login handler
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();  // Prevent form from submitting normally
        const username = document.getElementById("loginUsername").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        // Check if the fields are not empty
        if (!username || !password) {
            alert("Please fill in both fields.");
            return;
        }

        // Check login credentials
        if (users[username] === password) {
            localStorage.setItem("isLoggedIn", "true");  // Save login state
            alert("Login successful!");
            showDashboard();
        } else {
            alert("Invalid login credentials. Please try again.");
        }
    });

    // Logout handler
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("isLoggedIn");  // Clear login state
        showLoginForm();
    });

    // Show the dashboard
    function showDashboard() {
        mainContent.innerHTML = `
            <h2 class="text-xl font-bold mb-4">Welcome to your dashboard!</h2>
            <p>This is your personalized space.</p>
        `;
        loginForm.classList.add("hidden");
        signupForm.classList.add("hidden");
        logoutButton.classList.remove("hidden");
    }

    // Show the login form
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
