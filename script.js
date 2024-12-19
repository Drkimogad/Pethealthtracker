document.getElementById('loginBtn').addEventListener('click', function() {
    showAuthModal('Login');
});

document.getElementById('signupBtn').addEventListener('click', function() {
    showAuthModal('Sign Up');
});

document.querySelector('.close-btn').addEventListener('click', function() {
    closeAuthModal();
});

document.getElementById('authForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Simulate authentication process
    window.location.href = 'dashboard.html';
});

function showAuthModal(type) {
    document.getElementById('authFormTitle').textContent = type;
    document.getElementById('authModal').style.display = 'flex';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}
