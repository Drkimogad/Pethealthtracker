document.addEventListener("DOMContentLoaded", function () {
    const showSignup = document.getElementById("showSignup");
    const showLogin = document.getElementById("showLogin");
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const logoutButton = document.getElementById("logoutButton");
    const dashboardLink = document.getElementById("dashboardLink");

    let currentUser = null;

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
        
        // Save user info to localStorage (simulated)
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        
        // After signup, show login
        alert("Sign Up Successful! Please Login.");
        showLogin.click();
    });

    // Handle Login
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        const savedUsername = localStorage.getItem("username");
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
        resetUI();
    });

    function updateUIForUser() {
        // Show user-specific info
        document.getElementById("showSignup").classList.add("hidden");
        document.getElementById("showLogin").classList.add("hidden");
        document.getElementById("signupForm").classList.add("hidden");
        document.getElementById("loginForm").classList.add("hidden");
        logoutButton.classList.remove("hidden");

        const userContent = `
            <h2>Welcome back, ${currentUser}!</h2>
            <div id="userInfo">
                <img src="https://via.placeholder.com/150" alt="User Photo" class="rounded-full">
                <textarea id="userDescription" placeholder="Add your description..." class="p-2 mb-2 border rounded w-full"></textarea>
            </div>
        `;
        document.getElementById("mainContent").innerHTML = userContent;
    }

    function resetUI() {
        // Reset UI to initial state
        document.getElementById("showSignup").classList.remove("hidden");
        showSignup.click(); // Show signup form by default
    }

    // Navigation links (ensure they're clickable)
    dashboardLink.addEventListener("click", function (e) {
        e.preventDefault();
        // Load the dashboard content dynamically
        document.getElementById("mainContent").innerHTML = "<h2>Dashboard Content</h2><p>Welcome to your Pet Health Tracker dashboard.</p>";
    });
});
