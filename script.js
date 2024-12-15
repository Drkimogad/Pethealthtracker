document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const logoutButton = document.getElementById("logoutButton");
    const mainContent = document.getElementById("mainContent");

    // Simulated user credentials storage
    let users = JSON.parse(localStorage.getItem("users")) || {};

    // Debugging: Check localStorage when the page loads
    console.log("Initial localStorage:", localStorage);

    // Check login status on page load (ensure localStorage is being checked correctly)
    if (localStorage.getItem("isLoggedIn") === "true") {
        console.log("User is already logged in."); // Debugging
        showDashboard();
    } else {
        console.log("User is not logged in."); // Debugging
        showLoginForm();
    }

    // Handle signup
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form from submitting normally
        const username = document.getElementById("signupUsername").value.trim().toLowerCase();
        const password = document.getElementById("signupPassword").value;

        // Debugging: Log the username and password for troubleshooting
        console.log("Signup attempt with username:", username);
        console.log("Signup password entered:", password);

        if (users[username]) {
            alert("Username already exists. Please try another.");
        } else {
            // Save new user to localStorage
            users[username] = password;
            localStorage.setItem("users", JSON.stringify(users));
            alert("Signup successful! Please log in.");
            signupForm.classList.add("hidden");
            loginForm.classList.remove("hidden");
        }
    });

    // Handle login
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form from submitting normally
        const username = document.getElementById("loginUsername").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        // Debugging: Log the username and password for troubleshooting
        console.log("Login attempt with username:", username);
        console.log("Password entered:", password);

        // Check if the fields are not empty
        if (!username || !password) {
            alert("Please fill in both fields.");
            console.log("Empty fields detected."); // Debugging
            return; // Exit early if fields are empty
        }

        // Check user credentials from localStorage
        if (users[username] === password) {
            alert(`Welcome, ${username}!`);
            localStorage.setItem("isLoggedIn", "true"); // Save login state in localStorage
            console.log("Login successful. Redirecting to dashboard."); // Debugging
            showDashboard();
        } else {
            alert("Invalid login credentials. Please try again.");
            console.log("Login failed."); // Debugging
        }
    });

    // Handle logout
    logoutButton.addEventListener("click", function () {
        alert("You have logged out.");
        localStorage.removeItem("isLoggedIn"); // Clear login state
        console.log("User logged out. Redirecting to login."); // Debugging
        showLoginForm(); // Show login form after logout
    });

    // Show the dashboard content after login
    function showDashboard() {
        console.log("Showing dashboard..."); // Debugging
        mainContent.innerHTML = `<h2 class="text-xl font-bold mb-4">Welcome to your dashboard!</h2>
            <p>This is your personalized space.</p>`;
        loginForm.classList.add("hidden");
        signupForm.classList.add("hidden");
        logoutButton.classList.remove("hidden"); // Show logout button
    }

    // Show the login form
    function showLoginForm() {
        console.log("Showing login form..."); // Debugging
        mainContent.innerHTML = `<section class="mb-8" id="dashboard">
            <h2 class="text-xl font-bold mb-4">Dashboard</h2>
            <p>Please login or sign up to view your personalized dashboard.</p>
        </section>`;
        loginForm.classList.remove("hidden");
        signupForm.classList.add("hidden");
        logoutButton.classList.add("hidden"); // Hide logout button when logged out
    }

    // Debugging: Check localStorage every time the page loads
    window.addEventListener("load", function () {
        console.log("localStorage after load:", localStorage);
    });
});
