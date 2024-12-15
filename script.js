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

    function showDashboard(username) {
        mainContent.innerHTML = `
            <h2 class="text-xl font-bold mb-4">Welcome, ${username}!</h2>
            <p>This is your personalized space.</p>
        `;
        loginForm.classList.add("hidden");
        signupForm.classList.add("hidden");
        logoutButton.classList.remove("hidden");
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
