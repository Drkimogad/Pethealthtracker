document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const logoutButton = document.getElementById("logoutButton");
    const showSignupButton = document.getElementById("showSignup");
    const showLoginButton = document.getElementById("showLogin");
    const mainContent = document.getElementById("mainContent");

    let users = JSON.parse(localStorage.getItem("users")) || {};
    let profilePicture = localStorage.getItem("profilePicture") || "https://randomuser.me/api/portraits/men/45.jpg";

    // Check if user is logged in
    if (localStorage.getItem("isLoggedIn") === "true" && localStorage.getItem("loggedInUser")) {
        showDashboard(localStorage.getItem("loggedInUser"));
    } else {
        showLoginForm();
    }

    // Sign up functionality
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

    // Login functionality
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

    // Logout functionality
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

    // Show personalized dashboard with user's name and picture
    function showDashboard(username) {
        mainContent.innerHTML = `
            <div class="flex items-center justify-center mb-4">
                <img src="${profilePicture}" alt="User Profile Picture" class="rounded-full w-20 h-20 mr-4">
                <h3 class="text-lg font-semibold">${username}'s Dashboard</h3>
            </div>
            <h2 class="text-xl font-bold mb-4">Welcome, ${username}!</h2>
            <div class="bg-gray-300 p-4 rounded-lg">
                <h3 class="font-semibold mb-2">Write About Your Pets:</h3>
                <textarea id="userMessage" class="w-full p-2 border rounded mb-2" rows="4" placeholder="Share your thoughts or love message about your pets..."></textarea>
                <button id="feedbackButton" class="bg-blue-600 text-white p-2 rounded">Send Feedback</button>
            </div>
            <div class="mt-4">
                <h3 class="font-semibold mb-2">Update Profile Picture:</h3>
                <input type="file" id="profilePictureInput" class="mb-4">
            </div>
        `;
        logoutButton.classList.remove("hidden");

        // Feedback Submission
        const feedbackButton = document.getElementById("feedbackButton");
        feedbackButton.addEventListener("click", function () {
            const userMessage = document.getElementById("userMessage").value;
            if (userMessage.trim() === "") {
                alert("Please write something before sending feedback.");
            } else {
                // Save feedback to localStorage
                let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
                feedbacks.push({
                    user: username,
                    message: userMessage,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

                alert("Thank you for your feedback!");
                document.getElementById("userMessage").value = ""; // Clear the textarea after feedback
            }
        });

        // Profile Picture Upload
        const profilePictureInput = document.getElementById("profilePictureInput");
        profilePictureInput.addEventListener("change", function (e) {
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
