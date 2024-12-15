document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const logoutButton = document.getElementById("logoutButton");
    const showSignupButton = document.getElementById("showSignup");
    const showLoginButton = document.getElementById("showLogin");
    const mainContent = document.getElementById("mainContent");

    let users = JSON.parse(localStorage.getItem("users")) || {};
    let profilePicture = localStorage.getItem("profilePicture") || "https://randomuser.me/api/portraits/men/45.jpg";

    // Admin Dashboard: View feedback
    const adminDashboard = document.getElementById("adminDashboard");

    if (localStorage.getItem("isLoggedIn") === "true" && localStorage.getItem("loggedInUser")) {
        const username = localStorage.getItem("loggedInUser");
        showDashboard(username);
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

    // Admin Dashboard to view feedback
    function showAdminDashboard() {
        const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
        adminDashboard.innerHTML = `
            <h2>Admin Dashboard</h2>
            <h3>Feedback Submissions:</h3>
            ${feedbacks.length > 0 ? feedbacks.map(feedback => `
                <div class="bg-gray-200 p-4 rounded mt-4">
                    <p><strong>User:</strong> ${feedback.user}</p>
                    <p><strong>Message:</strong> ${feedback.message}</p>
                    <p><strong>Submitted at:</strong> ${new Date(feedback.timestamp).toLocaleString()}</p>
                </div>
            `).join('') : '<p>No feedback yet.</p>'}
        `;
    }
});
