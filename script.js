document.addEventListener("DOMContentLoaded", function() {
    console.log("localStorage:", localStorage);  // Add this line to inspect localStorage
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const logoutButton = document.getElementById("logoutButton");
    const mainContent = document.getElementById("mainContent");

    // Temporary in-memory storage for user credentials
    const users = {
        user: "password", // Predefined user for testing
    };

    // Check login status on page load
    if (localStorage.getItem("isLoggedIn")) {
        console.log("User is already logged in.");  // Debugging
        showDashboard();
    } else {
        console.log("User is not logged in.");  // Debugging
        showLoginForm();
    }

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
        e.preventDefault(); // Prevent default form submission
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        // Check if the fields are not empty
        if (!username || !password) {
            alert("Please fill in both fields.");
            return; // Exit early if fields are empty
        }

        // Simulate login validation
        if (users[username] === password) {
            alert(`Welcome, ${username}!`);
            localStorage.setItem("isLoggedIn", true); // Save login state
            console.log("Login successful. Redirecting to dashboard.");  // Debugging
            showDashboard();
        } else {
            alert("Invalid login credentials. Please try again.");
            console.log("Login failed.");  // Debugging
        }
    });

    // Handle logout
    logoutButton.addEventListener("click", () => {
        alert("You have logged out.");
        localStorage.removeItem("isLoggedIn");
        console.log("User logged out. Redirecting to login.");  // Debugging
        showLoginForm();
    });

    // Show the dashboard
    function showDashboard() {
        mainContent.innerHTML = `<h2 class="text-xl font-bold mb-4">Welcome to your dashboard!</h2>
                <p>This is your personalized space.</p>`;
        loginForm.classList.add("hidden");
        signupForm.classList.add("hidden");
        logoutButton.classList.remove("hidden");
    }

    // Show the login form
    function showLoginForm() {
        mainContent.innerHTML = `<section class="mb-8" id="dashboard">
            <h2 class="text-xl font-bold mb-4">Dashboard</h2>
            <p>Please login or sign up to view your personalized dashboard.</p>
        </section>`;
        loginForm.classList.remove("hidden");
        signupForm.classList.add("hidden");
        logoutButton.classList.add("hidden");
    }
});
