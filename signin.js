const signinForm = document.getElementById("signinForm");
const loginMessage = document.getElementById("loginMessage");

signinForm.addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(user => 
        user.email === email && user.password === password
    );

    if (!validUser) {
        loginMessage.innerText = "Invalid email or password";
        loginMessage.className = "message error";
        return;
    }

    // Save current session
    localStorage.setItem("currentUser", email);

    loginMessage.innerText = "Login successful!";
    loginMessage.className = "message success";

    setTimeout(()=>{
        window.location.href = "letter.html";
    },1000);
});
