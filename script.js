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
const photoUpload = document.getElementById("photoUpload");
const changePhotoButton = document.getElementById("changePhoto");

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
                <button id="editDescription" class="bg-blue-600 text-white p-2 rounded mt-2">Edit Description</button>
                <input type="file" id="photoUpload" class="hidden" accept="image/*" />
                <button id="changePhoto" class="bg-blue-600 text-white p-2 rounded mt-4">Upload Photo</button>
            `;

            // Event listeners for photo upload and description editing
            document.getElementById("changePhoto").addEventListener("click", triggerFileUpload);
            document.getElementById("editDescription").addEventListener("click", changeDescription);

            // Handle file input change
            photoUpload.addEventListener("change", handleFileUpload);
        }
    } else if (sectionId === "profiles") {
        mainContent.innerHTML = `
            <h3 class="font-bold text-xl mb-4">Pet Profiles</h3>
            <p>Manage your pet profiles here. Add, update, or remove profiles.</p>
        `;
    } else if (sectionId === "reminders") {
        mainContent.innerHTML = `
            <h3 class="font-bold text-xl mb-4">Reminders</h3>
            <p>Set reminders for vaccinations, vet visits, etc.</p>
        `;
    } else if (sectionId === "health-tips") {
        mainContent.innerHTML = `
            <h3 class="font-bold text-xl mb-4">Health Tips</h3>
            <p>Here are some useful health tips for your pet:</p>
            <ul>
                <li>Keep up with vaccinations.</li>
                <li>Regular vet visits are important.</li>
                <li>Maintain a healthy diet and exercise routine.</li>
            </ul>
        `;
    }
};

// Function to handle file upload for user photo
const handleFileUpload = () => {
    const file = photoUpload.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        loggedInUser.photo = reader.result;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        loadSection("dashboard");  // Refresh dashboard with new photo
    };

    if (file) {
        reader.readAsDataURL(file); // Convert image to data URL
    }
};

// Trigger file upload dialog
const triggerFileUpload = () => {
    photoUpload.click();  // Open file picker
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
