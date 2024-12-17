// User data storage and retrieval
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

// DOM elements
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const logoutButton = document.getElementById("logoutButton");
const dashboardLink = document.getElementById("dashboardLink");
const mainContent = document.getElementById("mainContent");
const toggleForms = document.getElementById("toggleForms");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

// Function to update the UI based on the user's login state
const updateUI = () => {
    if (loggedInUser) {
        toggleForms.classList.add("hidden");
        logoutButton.classList.remove("hidden");
        loadSection("dashboard");
    } else {
        toggleForms.classList.remove("hidden");
        logoutButton.classList.add("hidden");
        mainContent.innerHTML = `<h2 class="text-center text-xl mt-10">Please log in or sign up to access the dashboard.</h2>`;
    }
};

// Function to load dashboard sections dynamically
const loadSection = (sectionId) => {
    mainContent.innerHTML = "";

    if (sectionId === "dashboard") {
        if (loggedInUser) {
            mainContent.innerHTML = `
                <h2 class="font-bold text-xl mb-4">Welcome, <span id="userName">${loggedInUser.username}</span>!</h2>
                <img src="${loggedInUser.photo || 'https://via.placeholder.com/150'}" alt="User Photo" class="w-24 h-24 rounded-full mb-4" />
                <p id="userDescription">${loggedInUser.description || "Please update your description."}</p>
                <button id="editPhoto" class="bg-blue-600 text-white p-2 rounded">Change Photo</button>
                <button id="editDescription" class="bg-blue-600 text-white p-2 rounded mt-2">Edit Description</button>
            `;

            // Event listeners for photo and description editing
            document.getElementById("editPhoto").addEventListener("click", changePhoto);
            document.getElementById("editDescription").addEventListener("click", changeDescription);
        }
    } else {
        // Placeholder sections for other links
        mainContent.innerHTML = `
            <h3 class="text-xl font-bold mb-4">${sectionId.toUpperCase()} Section</h3>
            <p>Content for the ${sectionId} section will appear here.</p>
        `;
    }
};

// Change photo functionality
const changePhoto = () => {
    const newPhoto = prompt("Enter the URL of your new profile photo:");
    if (newPhoto) {
        loggedInUser.photo = newPhoto;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        loadSection("dashboard");
    }
};

// Change description functionality
const changeDescription = () => {
    const newDescription = prompt("Enter a new description:");
    if (newDescription) {
        loggedInUser.description = newDescription;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        loadSection("dashboard");
    }
};

// Login functionality
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem(username));

    if (savedUser && savedUser.password === password) {
        loggedInUser = savedUser;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        updateUI();
    } else {
        alert("Invalid username or password.");
    }
});

// Signup functionality
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;

    if (!localStorage.getItem(username)) {
        const newUser = { username, password, photo: null, description: null };
        localStorage.setItem(username, JSON.stringify(newUser));
        alert("Signup successful! You can now log in.");
        showLoginForm();
    } else {
        alert("Username already exists. Please choose a different one.");
    }
});

// Logout functionality
logoutButton.addEventListener("click", () => {
    loggedInUser = null;
    localStorage.removeItem("loggedInUser");
    updateUI();
});

// Toggle between login and signup forms
showSignup.addEventListener("click", () => {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    showSignup.classList.add("hidden");
    showLogin.classList.remove("hidden");
});

showLogin.addEventListener("click", () => {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    showSignup.classList.remove("hidden");
    showLogin.classList.add("hidden");
});

// Initialize the UI
updateUI();
