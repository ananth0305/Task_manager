// 👁 Toggle Password Visibility
function togglePassword() {
    let passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

// 🔑 Login Form Validation
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page refresh

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Retrieve stored user credentials
    let storedEmail = localStorage.getItem("userEmail");
    let storedPassword = localStorage.getItem("userPassword");

    // Check if credentials match
    if (email === storedEmail && password === storedPassword) {
        alert("Login successful! Redirecting...");
        window.location.href = "dashboard.html"; // Redirect after login
    } else {
        alert("Invalid email or password!");
    }
});