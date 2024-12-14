
document.addEventListener("DOMContentLoaded", () => {
    const signupButton = document.getElementById("signupButton");
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const logoutButton = document.getElementById("logoutButton");
    const mainContent = document.getElementById("mainContent");
    const signupSection = document.getElementById("signupSection");

    // Temporary in-memory user storage
    const users = {};

    // Show signup form
    signupButton.addEventListener("click", () => {
        signupSection.style.display = "block";
        loginForm.style.display = "none";
    });

    // Handle signup
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("signupUsername").value;
        const password = document.getElementById("signupPassword").value;

        if (users[username]) {
            alert("Username already exists. Please choose another.");
        } else {
            users[username] = password;
            alert("Signup successful! You can now log in.");
            signupSection.style.display = "none";
            loginForm.style.display = "flex";
        }
    });

    // Handle login
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        if (users[username] === password) {
            document.body.classList.add("logged-in");
            mainContent.innerHTML = `<h2>Welcome, ${username}!</h2>
                <p>Access your dashboard features below:</p>`;
            loginForm.style.display = "none";
            signupSection.style.display = "none";
            logoutButton.style.display = "inline-block";
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });

    // Handle logout
    logoutButton.addEventListener("click", () => {
        document.body.classList.remove("logged-in");
        mainContent.innerHTML = `<h2>Welcome to the Pet Health Tracker</h2>
            <p>Please sign up or log in to access your personalized dashboard.</p>`;
        loginForm.style.display = "flex";
        logoutButton.style.display = "none";
    });
});
