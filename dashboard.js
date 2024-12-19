document.getElementById('logoutBtn').addEventListener('click', function() {
    // Simulate logout and redirect to the main page
    window.location.href = 'index.html';
});

function showContent(blockId) {
    // Display content based on the clicked block
    let content = '';
    switch (blockId) {
        case 'profilesBlock':
            content = '<h3>Pet Profiles</h3><p>Here are your pet profiles...</p>';
            break;
        case 'remindersBlock':
            content = '<h3>Pet Care Reminders</h3><p>Here are your pet care reminders...</p>';
            break;
        case 'healthTipsBlock':
            content = '<h3>Health Tips</h3><p>Here are some health tips...</p>';
            break;
        case 'settingsBlock':
            content = '<h3>Settings</h3><p>Here are your settings...</p>';
            break;
    }
    document.querySelector('.left-container').innerHTML = content;
}
