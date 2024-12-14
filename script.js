
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const logoutButton = document.getElementById("logoutButton");
    const mainContent = document.getElementById("mainContent");

    // Temporary in-memory storage for user credentials
    const users = {};

    // Handle signup
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("signupUsername").value;
        const password = document.getElementById("signupPassword").value;

        if (users[username]) {
            alert("Username already exists. Please try another.");
        } else {
            users[username] = password;
            alert("Signup successful! Please log in.");
            signupForm.classList.add("hidden");
            loginForm.classList.remove("hidden");
        }
    });

    // Handle login
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        if (users[username] === password) {
            alert(`Welcome, ${username}!`);
            mainContent.innerHTML = `<h2 class="text-xl font-bold mb-4">Welcome, ${username}!</h2>
                <p>Here is your personalized dashboard.</p>`;
            loginForm.classList.add("hidden");
            logoutButton.classList.remove("hidden");
        } else {
            alert("Invalid login credentials. Please try again.");
        }
    });

    // Handle logout
    logoutButton.addEventListener("click", () => {
        alert("You have logged out.");
        mainContent.innerHTML = `<section class="mb-8" id="dashboard">
            <h2 class="text-xl font-bold mb-4">Dashboard</h2>
            <p>Please login or sign up to view your personalized dashboard.</p>
        </section>`;
        logoutButton.classList.add("hidden");
        loginForm.classList.remove("hidden");
    });
});
document.addEventListener("DOMContentLoaded", function() {
    // Check login status when the page loads
    if (localStorage.getItem("isLoggedIn")) {
        showDashboard();
    } else {
        showLoginForm();
    }

    // Login form submit handler
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;
        
        // Simulate login validation (replace with actual logic if needed)
        if (username === "user" && password === "password") {
            localStorage.setItem("isLoggedIn", true);
            showDashboard();
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });

    // Logout button functionality
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", function() {
        localStorage.removeItem("isLoggedIn");
        showLoginForm();
    });

    // Show the dashboard if logged in
    function showDashboard() {
        document.getElementById("mainContent").innerHTML = `
            <section class="mb-8" id="dashboard">
                <h2 class="text-xl font-bold mb-4">Dashboard</h2>
                <p>Welcome to your personalized dashboard!</p>
            </section>
        `;
        document.getElementById("loginForm").classList.add("hidden");
        document.getElementById("signupForm").classList.add("hidden");
        document.getElementById("logoutButton").classList.remove("hidden");
    }

    // Show the login form
    function showLoginForm() {
        document.getElementById("mainContent").innerHTML = `
            <section class="mb-8" id="dashboard">
                <h2 class="text-xl font-bold mb-4">Dashboard</h2>
                <p>Please login or sign up to view your personalized dashboard.</p>
            </section>
        `;
        document.getElementById("loginForm").classList.remove("hidden");
        document.getElementById("signupForm").classList.add("hidden");
        document.getElementById("logoutButton").classList.add("hidden");
    }
});
