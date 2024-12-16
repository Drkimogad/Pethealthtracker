document.addEventListener('DOMContentLoaded', () => {
    const user = {
        name: 'John Doe',
        photo: 'https://example.com/default-avatar.jpg', // Replace with the user's photo URL
        description: localStorage.getItem('userDescription') || 'Describe your pet here.',
    };

    // Set the user details on the dashboard
    document.getElementById('userName').innerText = `Welcome, ${user.name}`;
    document.getElementById('userPhoto').src = user.photo;
    document.getElementById('userDescription').value = user.description;

    // Listen for changes to user description
    document.getElementById('userDescription').addEventListener('input', (event) => {
        localStorage.setItem('userDescription', event.target.value);
    });

    // Handle the navigation to different sections
    const mainContent = document.getElementById('mainContent');

    const sections = {
        dashboard: `<h3 class="font-bold">Welcome to your Dashboard</h3><p>Here you can track your pets' health.</p>`,
        profiles: getProfilesSection(),
        reminders: getRemindersSection(),
        healthTips: getHealthTipsSection(),
        community: getCommunitySection(),
    };

    // Add event listeners to the navigation links
    document.getElementById('dashboardLink').addEventListener('click', () => {
        mainContent.innerHTML = sections.dashboard;
    });
    document.getElementById('profilesLink').addEventListener('click', () => {
        mainContent.innerHTML = sections.profiles;
    });
    document.getElementById('remindersLink').addEventListener('click', () => {
        mainContent.innerHTML = sections.reminders;
    });
    document.getElementById('healthTipsLink').addEventListener('click', () => {
        mainContent.innerHTML = sections.healthTips;
    });
    document.getElementById('communityLink').addEventListener('click', () => {
        mainContent.innerHTML = sections.community;
    });

    // Initially load the dashboard view
    mainContent.innerHTML = sections.dashboard;
});

// Function to load Profiles Section
function getProfilesSection() {
    const profiles = JSON.parse(localStorage.getItem('petProfiles')) || [];
    return `
        <h3 class="font-bold">Pet Profiles</h3>
        <div id="profilesList">
            ${profiles.length > 0 ? profiles.map(profile => `<div class="border p-2 mb-2">
                <p><strong>Name:</strong> ${profile.name}</p>
                <p><strong>Age:</strong> ${profile.age}</p>
                <button class="bg-red-600 text-white p-2 rounded" onclick="deleteProfile('${profile.name}')">Delete Profile</button>
            </div>`).join('') : '<p>No profiles yet.</p>'}
        </div>
        <button class="bg-blue-600 text-white p-2 rounded mt-4" onclick="addProfile()">Add Profile</button>
    `;
}

// Function to add a profile
function addProfile() {
    const name = prompt('Enter pet name:');
    const age = prompt('Enter pet age:');
    const profiles = JSON.parse(localStorage.getItem('petProfiles')) || [];
    profiles.push({ name, age });
    localStorage.setItem('petProfiles', JSON.stringify(profiles));
    document.getElementById('profilesLink').click(); // Refresh profiles section
}

// Function to delete a profile
function deleteProfile(profileName) {
    let profiles = JSON.parse(localStorage.getItem('petProfiles')) || [];
    profiles = profiles.filter(profile => profile.name !== profileName);
    localStorage.setItem('petProfiles', JSON.stringify(profiles));
    document.getElementById('profilesLink').click(); // Refresh profiles section
}

// Function to load Reminders Section
function getRemindersSection() {
    const reminders = JSON.parse(localStorage.getItem('petReminders')) || [];
    return `
        <h3 class="font-bold">Reminders</h3>
        <div id="remindersList">
            ${reminders.length > 0 ? reminders.map(reminder => `<div class="border p-2 mb-2">
                <p><strong>Task:</strong> ${reminder.task}</p>
                <p><strong>Date:</strong> ${reminder.date}</p>
                <button class="bg-red-600 text-white p-2 rounded" onclick="deleteReminder('${reminder.task}')">Delete Reminder</button>
            </div>`).join('') : '<p>No reminders set.</p>'}
        </div>
        <button class="bg-blue-600 text-white p-2 rounded mt-4" onclick="addReminder()">Add Reminder</button>
    `;
}

// Function to add a reminder
function addReminder() {
    const task = prompt('Enter reminder task (e.g., Vet Visit):');
    const date = prompt('Enter reminder date (e.g., 2024-10-10):');
    const reminders = JSON.parse(localStorage.getItem('petReminders')) || [];
    reminders.push({ task, date });
    localStorage.setItem('petReminders', JSON.stringify(reminders));
    document.getElementById('remindersLink').click(); // Refresh reminders section
}

// Function to delete a reminder
function deleteReminder(reminderTask) {
    let reminders = JSON.parse(localStorage.getItem('petReminders')) || [];
    reminders = reminders.filter(reminder => reminder.task !== reminderTask);
    localStorage.setItem('petReminders', JSON.stringify(reminders));
    document.getElementById('remindersLink').click(); // Refresh reminders section
}

// Function to load Health Tips Section
function getHealthTipsSection() {
    const healthTips = JSON.parse(localStorage.getItem('healthTips')) || [];
    return `
        <h3 class="font-bold">Health Tips</h3>
        <div id="healthTipsList">
            ${healthTips.length > 0 ? healthTips.map(tip => `<div class="border p-2 mb-2">
                <p>${tip}</p>
                <button class="bg-red-600 text-white p-2 rounded" onclick="deleteHealthTip('${tip}')">Delete Tip</button>
            </div>`).join('') : '<p>No health tips yet.</p>'}
        </div>
        <button class="bg-blue-600 text-white p-2 rounded mt-4" onclick="addHealthTip()">Add Health Tip</button>
    `;
}

// Function to add a health tip
function addHealthTip() {
    const tip = prompt('Enter a health tip for your pet:');
    const healthTips = JSON.parse(localStorage.getItem('healthTips')) || [];
    healthTips.push(tip);
    localStorage.setItem('healthTips', JSON.stringify(healthTips));
    document.getElementById('healthTipsLink').click(); // Refresh health tips section
}

// Function to delete a health tip
function deleteHealthTip(healthTip) {
    let healthTips = JSON.parse(localStorage.getItem('healthTips')) || [];
    healthTips = healthTips.filter(tip => tip !== healthTip);
    localStorage.setItem('healthTips', JSON.stringify(healthTips));
    document.getElementById('healthTipsLink').click(); // Refresh health tips section
}

// Function to load Community Section
function getCommunitySection() {
    const communityPosts = JSON.parse(localStorage.getItem('communityPosts')) || [];
    return `
        <h3 class="font-bold">Community</h3>
        <div id="communityPostsList">
            ${communityPosts.length > 0 ? communityPosts.map(post => `<div class="border p-2 mb-2">
                <p>${post}</p>
                <button class="bg-red-600 text-white p-2 rounded" onclick="deleteCommunityPost('${post}')">Delete Post</button>
            </div>`).join('') : '<p>No posts yet.</p>'}
        </div>
        <button class="bg-blue-600 text-white p-2 rounded mt-4" onclick="addCommunityPost()">Add Post</button>
    `;
}

// Function to add a community post
function addCommunityPost() {
    const post = prompt('Enter a community post:');
    const communityPosts = JSON.parse(localStorage.getItem('communityPosts')) || [];
    communityPosts.push(post);
    localStorage.setItem('communityPosts', JSON.stringify(communityPosts));
    document.getElementById('communityLink').click(); // Refresh community section
}

// Function to delete a community post
function deleteCommunityPost(postContent) {
    let communityPosts = JSON.parse(localStorage.getItem('communityPosts')) || [];
    communityPosts = communityPosts.filter(post => post !== postContent);
    localStorage.setItem('communityPosts', JSON.stringify(communityPosts));
    document.getElementById('communityLink').click();
