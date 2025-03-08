document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;

    // Store credentials in Local Storage (Not Secure!)
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    alert("Signup successful! Redirecting to login...");
    window.location.href = "login.html";
});