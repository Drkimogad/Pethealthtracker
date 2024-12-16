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
