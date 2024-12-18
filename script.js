document.addEventListener("DOMContentLoaded", () => {
    // Get the links and content area
    const viewProfilesBtn = document.getElementById('viewProfilesBtn');
    const viewRemindersBtn = document.getElementById('viewRemindersBtn');
    const viewHealthTipsBtn = document.getElementById('viewHealthTipsBtn');
    const viewSettingsBtn = document.getElementById('viewSettingsBtn');
    const contentSection = document.getElementById('contentSection');

    // Function to show the corresponding content
    const showContent = (contentType) => {
        let contentHTML = '';

        switch(contentType) {
            case 'profiles':
                contentHTML = `
                    <h3 class="font-bold text-lg">Pet Profiles</h3>
                    <p>Here are your pet profiles. You can edit and manage them.</p>
                    <!-- List of profiles goes here -->
                `;
                break;
            case 'reminders':
                contentHTML = `
                    <h3 class="font-bold text-lg">Pet Care Reminders</h3>
                    <ul>
                        <li>Buddy - Rabies Vaccine - Due: 2023-11-15</li>
                        <li>Whiskers - Feline Leukemia - Due: 2023-12-01</li>
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
                    <button id="darkModeToggle" class="bg-gray-800 text-white p-2 rounded">Toggle Dark Mode</button>
                `;
                break;
            default:
                contentHTML = `<p>Select a section to view details.</p>`;
        }

        contentSection.innerHTML = contentHTML;
    };

    // Event listeners for the buttons to show content
    viewProfilesBtn.addEventListener('click', () => {
        showContent('profiles');
    });
    viewRemindersBtn.addEventListener('click', () => {
        showContent('reminders');
    });
    viewHealthTipsBtn.addEventListener('click', () => {
        showContent('healthTips');
    });
    viewSettingsBtn.addEventListener('click', () => {
        showContent('settings');
    });
});
