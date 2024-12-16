document.addEventListener("DOMContentLoaded", function () {
    // Get DOM elements
    const dashboardLink = document.getElementById("dashboardLink");
    const profilesLink = document.getElementById("profilesLink");
    const remindersLink = document.getElementById("remindersLink");
    const healthTipsLink = document.getElementById("healthTipsLink");
    const communityLink = document.getElementById("communityLink");
    const settingsLink = document.getElementById("settingsLink");

    const mainContent = document.getElementById("mainContent");

    // Function to display Dashboard content
    function displayDashboard() {
        mainContent.innerHTML = "<h2>Dashboard</h2><p>Welcome to your Pet Health Tracker dashboard! Here you can manage your pet's health and more.</p>";
    }

    // Function to display Profiles content
    function displayProfiles() {
        const profiles = JSON.parse(localStorage.getItem("petProfiles")) || [];
        let profileHTML = "<h3>Your Pet Profiles:</h3>";

        if (profiles.length > 0) {
            profiles.forEach((profile, index) => {
                profileHTML += `
                    <div class="profile-card">
                        <h4>${profile.name}</h4>
                        <p>${profile.species}</p>
                        <button class="edit-profile" data-index="${index}">Edit Profile</button>
                        <button class="delete-profile" data-index="${index}">Delete Profile</button>
                    </div>
                `;
            });
        } else {
            profileHTML += "<p>You have no profiles yet. Create one below.</p>";
        }

        profileHTML += `
            <button id="addProfileButton" class="bg-blue-600 text-white p-2 rounded mt-4">Create New Profile</button>
        `;

        mainContent.innerHTML = profileHTML;

        // Add event listeners to the profile buttons
        document.querySelectorAll(".edit-profile").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                editProfile(index);
            });
        });

        document.querySelectorAll(".delete-profile").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                deleteProfile(index);
            });
        });

        // Handle adding a new profile
        document.getElementById("addProfileButton").addEventListener("click", createProfile);
    }

    // Function to create a new profile
    function createProfile() {
        const name = prompt("Enter your pet's name:");
        const species = prompt("Enter your pet's species (e.g., Dog, Cat):");

        if (name && species) {
            const profiles = JSON.parse(localStorage.getItem("petProfiles")) || [];
            profiles.push({ name, species });
            localStorage.setItem("petProfiles", JSON.stringify(profiles));
            displayProfiles(); // Refresh profiles
        } else {
            alert("Please provide both name and species.");
        }
    }

    // Function to edit an existing profile
    function editProfile(index) {
        const profiles = JSON.parse(localStorage.getItem("petProfiles"));
        const profile = profiles[index];

        const newName = prompt("Edit pet's name:", profile.name);
        const newSpecies = prompt("Edit pet's species:", profile.species);

        if (newName && newSpecies) {
            profile.name = newName;
            profile.species = newSpecies;
            localStorage.setItem("petProfiles", JSON.stringify(profiles));
            displayProfiles(); // Refresh profiles
        } else {
            alert("Please provide both name and species.");
        }
    }

    // Function to delete a profile
    function deleteProfile(index) {
        const profiles = JSON.parse(localStorage.getItem("petProfiles"));
        profiles.splice(index, 1);
        localStorage.setItem("petProfiles", JSON.stringify(profiles));
        displayProfiles(); // Refresh profiles
    }

    // Function to display Reminders content
    function displayReminders() {
        mainContent.innerHTML = "<h2>Reminders</h2><p>Set reminders for your pet's health tasks like vaccinations and vet visits.</p>";
    }

    // Function to display Health Tips content
    function displayHealthTips() {
        mainContent.innerHTML = "<h2>Health Tips</h2><p>Stay informed with useful pet health tips and advice.</p>";
    }

    // Function to display Community content
    function displayCommunity() {
        mainContent.innerHTML = "<h2>Community</h2><p>Join our community and share tips with fellow pet owners.</p>";
    }

    // Function to display Settings content
    function displaySettings() {
        mainContent.innerHTML = "<h2>Settings</h2><p>Update your preferences and settings here.</p>";
    }

    // Setup navigation links
    dashboardLink.addEventListener("click", function (e) {
        e.preventDefault();
        displayDashboard();
    });

    profilesLink.addEventListener("click", function (e) {
        e.preventDefault();
        displayProfiles();
    });

    remindersLink.addEventListener("click", function (e) {
        e.preventDefault();
        displayReminders();
    });

    healthTipsLink.addEventListener("click", function (e) {
        e.preventDefault();
        displayHealthTips();
    });

    communityLink.addEventListener("click", function (e) {
        e.preventDefault();
        displayCommunity();
    });

    settingsLink.addEventListener("click", function (e) {
        e.preventDefault();
        displaySettings();
    });

    // Initial call to display the dashboard
    displayDashboard();
});
