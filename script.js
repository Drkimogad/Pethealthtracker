document.getElementById('loginBtn').addEventListener('click', function() {
    // Simulate login and toggle elements visibility
    document.getElementById('signupBtn').classList.add('hidden');
    document.getElementById('loginBtn').classList.add('hidden');
    document.getElementById('logoutBtn').classList.remove('hidden');
    document.getElementById('welcomeMessage').innerText = 'Welcome, [Username]';
    document.querySelector('.image-container').innerHTML = '<img src="path_to_user_image.jpg" alt="User Image">';
    document.querySelector('.hero-banner').innerHTML += '<p id="userDescription">This is a short description or quote.</p>';

    // Resize and reposition blocks in the left container
    let blocks = document.querySelectorAll('.block');
    blocks.forEach(block => {
        block.classList.add('small-block');
        block.classList.remove('inactive');
        block.addEventListener('click', function() {
            showContent(block.id);
        });
    });
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    // Simulate logout and reset elements visibility
    document.getElementById('signupBtn').classList.remove('hidden');
    document.getElementById('loginBtn').classList.remove('hidden');
    document.getElementById('logoutBtn').classList.add('hidden');
    document.getElementById('welcomeMessage').innerText = 'Welcome to Your Dashboard';
    document.querySelector('.image-container').innerHTML = '<img src="https://raw.githubusercontent.com/Drkimogad/Pethealthtracker/main/Cat.jpg" alt="Hero Image">';
    document.getElementById('userDescription').remove();

    // Reset blocks in the left container
    let blocks = document.querySelectorAll('.block');
    blocks.forEach(block => {
        block.classList.remove('small-block');
        block.classList.add('inactive');
        block.removeEventListener('click', function() {
            showContent(block.id);
        });
    });
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
