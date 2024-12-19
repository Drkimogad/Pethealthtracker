document.getElementById("signupBtn").addEventListener("click", function() {
    alert("Sign Up Clicked");
    document.getElementById("signupBtn").style.display = "none";
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";
});

document.getElementById("loginBtn").addEventListener("click", function() {
    alert("Login Clicked");
    document.getElementById("signupBtn").style.display = "none";
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";
});

document.getElementById("logoutBtn").addEventListener("click", function() {
    alert("Logout Clicked");
    document.getElementById("signupBtn").style.display = "block";
    document.getElementById("loginBtn").style.display = "block";
    document.getElementById("logoutBtn").style.display = "none";
});
