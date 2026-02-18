const form = document.getElementById("signupForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Basic Validation
    if (email === "" || password === "") {
        showMessage("Please fill all fields", "error");
        return;
    }

    if (!validateEmail(email)) {
        showMessage("Invalid email format", "error");
        return;
    }

    if (password.length < 6) {
        showMessage("Password must be at least 6 characters", "error");
        return;
    }

    // Check if user already exists
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(user => user.email === email);

    if (userExists) {
        showMessage("Account already exists. Please sign in.", "error");
        return;
    }

    // Save user
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    showMessage("Account created successfully! Redirecting...", "success");

    setTimeout(() => {
        window.location.href = "letter.html";
    }, 1500);
});

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(text, type) {
    message.innerText = text;
    message.className = "message " + type;
}
