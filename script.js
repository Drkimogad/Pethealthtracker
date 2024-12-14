document.addEventListener("DOMContentLoaded", function() {
    // Check login status when the page loads
    if (localStorage.getItem("isLoggedIn")) {
        showDashboard();
    } else {
        showLoginForm();
    }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Simulated credentials check
    if (username === "user" && password === "password") {
        localStorage.setItem("isLoggedIn", true); // Save login state
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        alert("Invalid login credentials. Please try again.");
    }
});


    // Logout button functionality
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", function() {
        localStorage.removeItem("isLoggedIn");
        showLoginForm();
    });

    // Show the dashboard if logged in
    function showDashboard() {
        document.getElementById("mainContent").innerHTML = `
            <section class="mb-8" id="dashboard">
                <h2 class="text-xl font-bold mb-4">Dashboard</h2>
                <p>Welcome to your personalized dashboard!</p>
            </section>
        `;
        document.getElementById("loginForm").classList.add("hidden");
        document.getElementById("signupForm").classList.add("hidden");
        document.getElementById("logoutButton").classList.remove("hidden");
    }

    // Show the login form
    function showLoginForm() {
        document.getElementById("mainContent").innerHTML = `
            <section class="mb-8" id="dashboard">
                <h2 class="text-xl font-bold mb-4">Dashboard</h2>
                <p>Please login or sign up to view your personalized dashboard.</p>
            </section>
        `;
        document.getElementById("loginForm").classList.remove("hidden");
        document.getElementById("signupForm").classList.add("hidden");
        document.getElementById("logoutButton").classList.add("hidden");
    }
});
