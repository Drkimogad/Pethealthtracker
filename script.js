// Get all button elements
const profilesBtn = document.getElementById('profilesBtn');
const remindersBtn = document.getElementById('remindersBtn');
const healthTipsBtn = document.getElementById('healthTipsBtn');
const settingsBtn = document.getElementById('settingsBtn');

// Get all content sections
const profileSection = document.getElementById('profilesSection');
const remindersSection = document.getElementById('remindersSection');
const healthTipsSection = document.getElementById('healthTipsSection');
const settingsSection = document.getElementById('settingsSection');

// Hide all sections initially
const hideAllSections = () => {
    profileSection.classList.remove('active');
    remindersSection.classList.remove('active');
    healthTipsSection.classList.remove('active');
    settingsSection.classList.remove('active');
};

// Add event listeners for buttons
profilesBtn.addEventListener('click', () => {
    hideAllSections();
    profileSection.classList.add('active');
});

remindersBtn.addEventListener('click', () => {
    hideAllSections();
    remindersSection.classList.add('active');
});

healthTipsBtn.addEventListener('click', () => {
    hideAllSections();
    healthTipsSection.classList.add('active');
});

settingsBtn.addEventListener('click', () => {
    hideAllSections();
    settingsSection.classList.add('active');
});
