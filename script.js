// Ensure the page has content and user data available when logged in
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
        profiles: `<h3 class="font-bold">Profiles</h3><p>Manage your pet profiles here.</p>`,
        reminders: `<h3 class="font-bold">Reminders</h3><p>Set and track reminders for vaccinations, vet visits, etc.</p>`,
        healthTips: `<h3 class="font-bold">Health Tips</h3><p>Here you'll find important health tips for your pets.</p>`,
        community: `<h3 class="font-bold">Community</h3><p>Join the community to share updates and tips with other pet owners.</p>`,
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
