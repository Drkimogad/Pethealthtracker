document.addEventListener("DOMContentLoaded", function () {
    const mainContent = document.getElementById("mainContent");
    const logoutButton = document.getElementById("logoutButton");

    let users = JSON.parse(localStorage.getItem("users")) || {};
    let profilePicture = localStorage.getItem("profilePicture") || "https://randomuser.me/api/portraits/men/45.jpg";

    // Check if user is logged in
    if (localStorage.getItem("isLoggedIn") === "true" && localStorage.getItem("loggedInUser")) {
        showDashboard(localStorage.getItem("loggedInUser"));
    } else {
        showLoginForm();
    }

    // Sign up functionality
    document.getElementById("signupForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("signupUsername").value.trim().toLowerCase();
        const password = document.getElementById("signupPassword").value;

        if (users[username]) {
            alert("Username already exists. Please try another.");
        } else {
            users[username] = password;
            localStorage.setItem("users", JSON.stringify(users));
            alert("Signup successful! Please log in.");
            document.getElementById("signupForm").classList.add("hidden");
            document.getElementById("loginForm").classList.remove("hidden");
        }
    });

    // Login functionality
    document.getElementById("loginForm").addEventListener("submit", function (e) {
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

    // Logout functionality
    logoutButton.addEventListener("click", function () {
        alert("You have logged out.");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedInUser");
        showLoginForm();
    });

    // Show personalized dashboard with user's name and picture
    function showDashboard(username) {
        mainContent.innerHTML = `
            <div class="dashboard">
                <div class="user-info">
                    <img src="${profilePicture}" alt="User Profile Picture">
                    <h3>${username}'s Dashboard</h3>
                </div>
                <h2>Welcome, ${username}!</h2>
                <div class="feedback-section">
                    <textarea id="userMessage" class="w-full p-2 border rounded mb-2" rows="4" placeholder="Share your thoughts about your pets..."></textarea>
                    <button id="feedbackButton">Send Feedback</button>
                </div>
                <div class="profile-picture-section">
                    <h3>Update Profile Picture:</h3>
                    <input type="file" id="profilePictureInput">
                </div>
            </div>
        `;

        const feedbackButton = document.getElementById("feedbackButton");
        feedbackButton.addEventListener("click", function () {
            const userMessage = document.getElementById("userMessage").value;
            if (userMessage.trim() === "") {
                alert("Please write something before sending feedback.");
            } else {
                let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
                feedbacks.push({
                    user: username,
                    message: userMessage,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

                alert("Thank you for your feedback!");
                document.getElementById("userMessage").value = "";
            }
        });

        // Profile Picture Upload
        document.getElementById("profilePictureInput").addEventListener("change", function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = function () {
                    profilePicture = reader.result;
                    localStorage.setItem("profilePicture", profilePicture);
                    alert("Profile picture updated!");
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Show login form when not logged in
    function showLoginForm() {
        mainContent.innerHTML = `
            <h2>Please log in or sign up</h2>
            <p>Enter your username and password to access your dashboard.</p>
        `;
    }

    // Admin Section
    document.getElementById("adminLink").addEventListener("click", function () {
        mainContent.innerHTML = `
            <div class="admin-section">
                <h2>Admin Dashboard</h2>
                <button onclick="manageTracker()">Manage Tracker</button>
                <button onclick="manageCommunity()">Manage Community</button>
                <button onclick="manageHealthTips()">Manage Health Tips</button>
                <button onclick="manageFeedback()">Manage Feedback</button>
            </div>
        `;
    });

    // Admin Section Functions
    function manageTracker() {
        alert("Managing Pet Health Tracker Data...");
    }

    function manageCommunity() {
        alert("Managing Community Feedback...");
    }

    function manageHealthTips() {
        alert("Managing Health Tips...");
    }

    function manageFeedback() {
        alert("Managing User Feedback...");
    }
});
