document.addEventListener("DOMContentLoaded", function () {

    // =============================
    // PAGE PROTECTION
    // =============================
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
        alert("Please login first!");
        window.location.href = "signin.html";
        return;
    }

    // =============================
    // AUTO DATE TITLE
    // =============================
    const dateTitle = document.getElementById("date-title");
    const now = new Date();
    dateTitle.innerText =
        "A letter from " +
        now.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    // =============================
    // WORD COUNT
    // =============================
    const textArea = document.querySelector(".letter-box");
    const wordCount = document.getElementById("word-count");

    function updateWordCount() {
        const words = textArea.value.trim().split(/\s+/).filter(Boolean);
        wordCount.innerText = words.length + " word(s)";
    }

    textArea.addEventListener("input", updateWordCount);
    updateWordCount();

    // =============================
    // TOGGLE MODE
    // =============================
    const toggleMode = document.getElementById("toggle-mode");
    const durationGroup = document.getElementById("duration-group");
    const dateGroup = document.getElementById("date-group");

    let mode = "duration";

    toggleMode.addEventListener("click", function () {
        durationGroup.classList.toggle("hidden");
        dateGroup.classList.toggle("hidden");

        if (mode === "duration") {
            mode = "date";
            toggleMode.innerText = "duration";
            document.querySelector(".deliver-title").innerText = "Deliver on";
        } else {
            mode = "duration";
            toggleMode.innerText = "date";
            document.querySelector(".deliver-title").innerText = "Deliver in";
        }
    });

    // =============================
    // ACTIVE BUTTON FIX
    // =============================
    document.querySelectorAll(".btn-group").forEach(group => {
        const buttons = group.querySelectorAll(".option-btn");

        buttons.forEach(button => {
            button.addEventListener("click", function () {
                buttons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
            });
        });
    });

    // =============================
    // POPULATE DATE SELECTS
    // =============================
    const monthSel = document.getElementById("month-select");
    const daySel = document.getElementById("day-select");
    const yearSel = document.getElementById("year-select");

    const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    months.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m;
        opt.textContent = m;
        monthSel.appendChild(opt);
    });

    for (let i = 1; i <= 31; i++) {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = i;
        daySel.appendChild(opt);
    }

    for (let y = now.getFullYear(); y <= now.getFullYear() + 30; y++) {
        const opt = document.createElement("option");
        opt.value = y;
        opt.textContent = y;
        yearSel.appendChild(opt);
    }

    // =============================
    // EMAIL VALIDATION
    // =============================
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // =============================
    // SEND LETTER
    // =============================
    const sendBtn = document.querySelector(".send-btn");
    const emailInput = document.querySelector(".email-box input");

    sendBtn.addEventListener("click", function () {

        const message = textArea.value.trim();
        const email = emailInput.value.trim();

        if (message === "") {
            alert("Please write your letter.");
            return;
        }

        if (!isValidEmail(email)) {
            alert("Enter valid email.");
            return;
        }

        let deliveryDate;

        if (mode === "duration") {
            const selected = document.querySelector("#duration-group .active").innerText;
            const futureDate = new Date();

            if (selected.includes("6")) futureDate.setMonth(futureDate.getMonth() + 6);
            else if (selected.includes("1 year")) futureDate.setFullYear(futureDate.getFullYear() + 1);
            else if (selected.includes("3")) futureDate.setFullYear(futureDate.getFullYear() + 3);
            else if (selected.includes("5")) futureDate.setFullYear(futureDate.getFullYear() + 5);
            else if (selected.includes("10")) futureDate.setFullYear(futureDate.getFullYear() + 10);

            deliveryDate = futureDate;
        } else {
            deliveryDate = new Date(
                `${monthSel.value} ${daySel.value}, ${yearSel.value}`
            );
        }

        if (deliveryDate <= new Date()) {
            alert("Delivery date must be in the future.");
            return;
        }

        const newLetter = {
            id: Date.now(),
            user: currentUser,
            text: message,
            email: email,
            createdAt: new Date(),
            deliverAt: deliveryDate,
            isPublic: document.getElementById("public-btn").classList.contains("active")
        };

        let letters = JSON.parse(localStorage.getItem("letters")) || [];
        letters.push(newLetter);
        localStorage.setItem("letters", JSON.stringify(letters));

        alert("Letter successfully saved!");

        window.location.href = "project.html";
    });

});

// =============================
// NAVIGATION
// =============================
function goToSignup() {
    window.location.href = "signup.html";
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "signin.html";
}
