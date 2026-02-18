// ===============================
// GLOBAL VARIABLES
// ===============================

const modeToggle = document.getElementById("mode-toggle");
const deliverTitle = document.getElementById("deliver-title");
const durationGroup = document.getElementById("duration-group");
const dateGroup = document.getElementById("date-group");
const sendBtn = document.getElementById("send-btn");
const textArea = document.querySelector(".text-area");
const emailInput = document.querySelector(".email-box input");
const inspireBtn = document.querySelector(".inspire-btn");
const fullscreenBtn = document.querySelector(".fullscreen");

let mode = "duration"; // default mode

// ===============================
// TOGGLE BETWEEN DURATION & DATE
// ===============================

modeToggle.addEventListener("click", () => {
    if (mode === "duration") {
        mode = "date";
        deliverTitle.textContent = "Deliver on";
        modeToggle.textContent = "duration";
        durationGroup.style.display = "none";
        dateGroup.style.display = "flex";
        sendBtn.classList.remove("duration-mode");
        sendBtn.classList.add("date-mode");
    } else {
        mode = "duration";
        deliverTitle.textContent = "Deliver in";
        modeToggle.textContent = "date";
        durationGroup.style.display = "flex";
        dateGroup.style.display = "none";
        sendBtn.classList.remove("date-mode");
        sendBtn.classList.add("duration-mode");
    }
});

// ===============================
// ACTIVE BUTTON HIGHLIGHT
// ===============================

document.querySelectorAll(".btn-group").forEach(group => {
    group.addEventListener("click", (e) => {
        if (e.target.classList.contains("option-btn")) {
            group.querySelectorAll(".option-btn")
                .forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
        }
    });
});

// ===============================
// INSPIRE ME BUTTON
// ===============================

const inspirationQuotes = [
    "Dear Future Me, I hope you are proud of how far you’ve come.",
    "Remember this moment and how strong you were.",
    "Did you achieve your goals?",
    "Are you happier than today?",
    "Keep believing in yourself."
];

inspireBtn.addEventListener("click", () => {
    const random = inspirationQuotes[Math.floor(Math.random() * inspirationQuotes.length)];
    textArea.value = random;
});

// ===============================
// FULLSCREEN TEXTAREA
// ===============================

fullscreenBtn.addEventListener("click", () => {
    textArea.style.height = "90vh";
    textArea.focus();
});

// ===============================
// BLOG SLIDER
// ===============================

const cards = document.getElementById("blogCards");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

if (rightBtn && leftBtn) {
    const scrollAmount = 500;

    rightBtn.addEventListener("click", () => {
        cards.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    leftBtn.addEventListener("click", () => {
        cards.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
}

// ===============================
// EMAIL VALIDATION FUNCTION
// ===============================

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===============================
// SEND LETTER FUNCTION
// ===============================

sendBtn.addEventListener("click", () => {

    const message = textArea.value.trim();
    const email = emailInput.value.trim();
    const audience = document.querySelector("#audience-group .active").innerText;

    if (message === "") {
        alert("✍️ Please write your letter.");
        return;
    }

    if (!isValidEmail(email)) {
        alert("📧 Please enter a valid email.");
        return;
    }

    let deliveryDate;

    if (mode === "duration") {

        const selected = document.querySelector("#duration-group .active").innerText;
        const today = new Date();

        if (selected.includes("6")) {
            today.setMonth(today.getMonth() + 6);
        } else if (selected.includes("1 year")) {
            today.setFullYear(today.getFullYear() + 1);
        } else if (selected.includes("3")) {
            today.setFullYear(today.getFullYear() + 3);
        } else if (selected.includes("5")) {
            today.setFullYear(today.getFullYear() + 5);
        } else if (selected.includes("10")) {
            today.setFullYear(today.getFullYear() + 10);
        }

        deliveryDate = today;

    } else {

        const selects = document.querySelectorAll("#date-group select");
        const month = selects[0].value;
        const day = selects[1].value;
        const year = selects[2].value;

        deliveryDate = new Date(`${month} ${day}, ${year}`);
    }

    const letter = {
        message,
        email,
        audience,
        deliveryDate,
        createdAt: new Date(),
        likes: 0,
        comments: []
    };

    let letters = JSON.parse(localStorage.getItem("futureLetters")) || [];
    letters.push(letter);
    localStorage.setItem("futureLetters", JSON.stringify(letters));

    alert("🎉 Your letter has been sent to the future!");

    textArea.value = "";
    emailInput.value = "";
});
