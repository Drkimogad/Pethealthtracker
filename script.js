const mainContent = document.getElementById("mainContent");

// Function to load dashboard sections
const loadSection = (sectionId) => {
    // Clear the main content area
    mainContent.innerHTML = "";

    // Dynamically load content based on the section ID
    if (sectionId === "dashboard") {
        mainContent.innerHTML = `
            <h2 class="font-bold text-xl mb-4">Welcome, <span id="userName">${loggedInUser.username}</span>!</h2>
            <img src="${loggedInUser.photo || 'https://via.placeholder.com/150'}" alt="User Photo" class="w-24 h-24 rounded-full mb-4" />
            <p id="userDescription">${loggedInUser.description || "Please update your description."}</p>
            <button id="editPhoto" class="bg-blue-600 text-white p-2 rounded">Change Photo</button>
            <button id="editDescription" class="bg-blue-600 text-white p-2 rounded mt-2">Edit Description</button>
        `;

        // Add event listeners for photo and description buttons
        document.getElementById("editPhoto").addEventListener("click", changePhoto);
        document.getElementById("editDescription").addEventListener("click", changeDescription);
    } else if (sectionId === "profiles") {
        mainContent.innerHTML = `
            <h3 class="text-xl font-bold mb-4">Manage Your Pet Profiles</h3>
            <p class="mb-4">Create and manage profiles for all your pets. Keep track of their health records, vaccinations, and more.</p>
            <button class="bg-green-600 text-white p-2 rounded" onclick="alert('Feature Coming Soon!')">Add New Profile</button>
        `;
    } else if (sectionId === "reminders") {
        mainContent.innerHTML = `
            <h3 class="text-xl font-bold mb-4">Set Pet Care Reminders</h3>
            <p class="mb-4">Schedule reminders for vaccinations, grooming, vet appointments, and more to keep your pet healthy and happy.</p>
            <button class="bg-green-600 text-white p-2 rounded" onclick="alert('Feature Coming Soon!')">Add New Reminder</button>
        `;
    } else if (sectionId === "health-tips") {
        mainContent.innerHTML = `
            <h3 class="text-xl font-bold mb-4">Health Tips</h3>
            <ul class="list-disc ml-5">
                <li><strong>Diabetes:</strong> Regular monitoring of glucose levels is crucial. Follow the vet's dietary recommendations.</li>
                <li><strong>Arthritis:</strong> Pain management and joint supplements can greatly improve mobility.</li>
                <li><strong>Chronic Kidney Disease:</strong> Consistent hydration and a kidney-friendly diet are key to managing this condition.</li>
            </ul>
        `;
    }
};

// Add event listeners for navigation links
document.getElementById("dashboardLink").addEventListener("click", () => loadSection("dashboard"));
document.getElementById("profilesLink").addEventListener("click", () => loadSection("profiles"));
document.getElementById("remindersLink").addEventListener("click", () => loadSection("reminders"));
document.getElementById("healthTipsLink").addEventListener("click", () => loadSection("health-tips"));

// Initial call to display the dashboard section on login
if (loggedInUser) {
    loadSection("dashboard");
}
