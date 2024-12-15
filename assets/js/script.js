document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const logoutButton = document.getElementById("logoutButton");
    const mainContent = document.getElementById("mainContent");

    let users = JSON.parse(localStorage.getItem("users")) || {};

    console.log("Initial localStorage:", localStorage);

    // Check if user is logged in
    if (localStorage.getItem("isLoggedIn") === "true") {
        showDashboard(); // Show dashboard if logged in
    } else {
        showLoginForm(); // Show login form if not logged in
    }

    // Signup handler
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("signupUsername").value.trim().toLowerCase();
        const password = document.getElementById("signupPassword").value;

        console.log("Signup attempt with username:", username);

        // If user exists, show error
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
        e.preventDefault();
        const username = document.getElementById("loginUsername").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        console.log("Login attempt with username:", username);

        // Check if the fields are not empty
        if (!username || !password) {
            alert("Please fill in both fields.");
            return;
        }

        // Validate login
        if (users[username] === password) {
            alert("Login successful!");
            localStorage.setItem("isLoggedIn", "true");
            showDashboard();
        } else {
            alert("Invalid login credentials.");
        }
    });

    // Logout handler
    logoutButton.addEventListener("click", function () {
        alert("You have logged out.");
        localStorage.removeItem("isLoggedIn"); // Clear login state
        showLoginForm();
    });

    // Show the dashboard
    function showDashboard() {
        console.log("Showing dashboard...");
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
        console.log("Showing login form...");
        mainContent.innerHTML = `
            <h2 class="text-xl font-bold mb-4">Please log in or sign up</h2>
            <p>Enter your username and password to access your dashboard.</p>
        `;
        loginForm.classList.remove("hidden");
        signupForm.classList.add("hidden");
        logoutButton.classList.add("hidden");
    }

    // Debugging: Check localStorage every time the page loads
    window.addEventListener("load", function () {
        console.log("localStorage after load:", localStorage);
    });
});
