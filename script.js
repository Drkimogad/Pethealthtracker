document.addEventListener("DOMContentLoaded", function() {
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
        e.preventDefault(); // Prevent form from submitting normally
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        // Check if the fields are not empty
        if (!username || !password) {
            alert("Please fill in both fields.");
            return; // Exit early if fields are empty
        }

        // Simulate login validation (replace with actual logic if needed)
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
