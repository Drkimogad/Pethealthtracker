document.getElementById('logoutBtn').addEventListener('click', function() {
    // Simulate logout and redirect to the main page
    window.location.href = 'index.html';
});

function showContent(blockId) {
    // Display content based on the clicked block
    let content = '';
    switch (blockId) {
        case 'profiles':
            content = '<h3>Pet Profiles</h3><p>Here are your pet profiles...</p><button onclick="goBack()">Go Back</button>';
            break;
        case 'reminders':
            content = '<h3>Pet Care Reminders</h3><p>Here are your pet care reminders...</p><button onclick="goBack()">Go Back</button>';
            break;
        case 'tips':
            content = '<h3>Health Tips</h3><p>Here are some health tips...</p><button onclick="goBack()">Go Back</button>';
            break;
        case 'settings':
            content = '<h3>Settings</h3><p>Here are your settings...</p><button onclick="goBack()">Go Back</button>';
            break;
    }
    document.querySelector('.left-container').innerHTML = content;
}

function goBack() {
    // Reload the page to go back to the main dashboard
    window.location.reload();
}

document.querySelector('.customize-btn').addEventListener('click', function() {
    alert('User image customization feature coming soon!');
});
