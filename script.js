document.addEventListener("DOMContentLoaded", () => {
    const profileForm = document.getElementById("profileForm");
    const profileList = document.getElementById("profileList");

    const contentSection = document.getElementById('contentSection');
    const viewProfilesBtn = document.getElementById('viewProfilesBtn');
    const viewRemindersBtn = document.getElementById('viewRemindersBtn');
    const viewHealthTipsBtn = document.getElementById('viewHealthTipsBtn');
    const viewSettingsBtn = document.getElementById('viewSettingsBtn');

    // Load profiles from local storage
    const loadProfiles = () => {
        const profiles = JSON.parse(localStorage.getItem("profiles")) || [];
        profileList.innerHTML = profiles
            .map(
                (profile, index) => `
                <div class="profile-item">
                    <h3>${profile.name} (${profile.age} years old)</h3>
                    <p>Breed: ${profile.breed}</p>
                    <button onclick="deleteProfile(${index})">Delete</button>
                </div>
            `
            )
            .join("");
    };

    // Add a new profile
    profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("petName").value;
        const age = document.getElementById("petAge").value;
        const breed = document.getElementById("petBreed").value;

        const profiles = JSON.parse(localStorage.getItem("profiles")) || [];
        profiles.push({ name, age, breed });
        localStorage.setItem("profiles", JSON.stringify(profiles));

        profileForm.reset();
        loadProfiles();
    });

    // Delete a profile
    window.deleteProfile = (index) => {
        const profiles = JSON.parse(localStorage.getItem("profiles")) || [];
        profiles.splice(index, 1);
        localStorage.setItem("profiles", JSON.stringify(profiles));
        loadProfiles();
    };

    const showContent = (contentType) => {
        let contentHTML = '';

        switch(contentType) {
            case 'profiles':
                contentHTML = `
                    <h3 class="font-bold text-lg">Pet Profiles</h3>
                    <p>Here are your pet profiles. You can edit and manage them.</p>
                    <form id="profileForm">
                        <input type="text" id="petName" placeholder="Pet Name" required>
                        <input type="number" id="petAge" placeholder="Age" required>
                        <input type="text" id="petBreed" placeholder="Breed" required>
                        <button type="submit">Add Profile</button>
                    </form>
                    <div id="profileList"></div>
                `;
                loadProfiles(); // Initial load
                break;
            case 'reminders':
                contentHTML = `
                    <h3 class="font-bold text-lg">Pet Care Reminders</h3>
                    <ul>
                        <li>Buddy - Rabies Vaccine - Due: 2024-01-15</li>
                        <li>Whiskers - Feline Leukemia - Due: 2024-02-01</li>
                    </ul>
                `;
                break;
            case 'healthTips':
                contentHTML = `
                    <h3 class="font-bold text-lg">Health Tips</h3>
                    <ul>
                        <li>Ensure a balanced diet for your pets.</li>
                        <li>Regular exercise is essential for a healthy life.</li>
                    </ul>
                `;
                break;
            case 'settings':
                contentHTML = `
                    <h3 class="font-bold text-lg">Settings</h3>
                    <button id="darkModeToggle">Toggle Dark Mode</button>
                `;
                break;
            default:
                contentHTML = `<p>Select a section to view details.</p>`;
        }

        contentSection.innerHTML = contentHTML;
    };

    // Event listeners for the buttons to show content
    viewProfilesBtn.addEventListener('click', () => showContent('profiles'));
    viewRemindersBtn.addEventListener('click', () => showContent('reminders'));
    viewHealthTipsBtn.addEventListener('click', () => showContent('healthTips'));
    viewSettingsBtn.addEventListener('click', () => showContent('settings'));
});
