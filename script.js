// Elements
const modeToggle = document.getElementById("mode-toggle");
const deliverTitle = document.getElementById("deliver-title");
const durationGroup = document.getElementById("duration-group");
const dateGroup = document.getElementById("date-group");
const sendBtn = document.getElementById("send-btn");

// state: "duration" or "date"
let mode = "duration";

// click on the word "date" or "duration"
modeToggle.addEventListener("click", () => {
    if (mode === "duration") {
        // switch to DATE MODE
        mode = "date";
        deliverTitle.textContent = "Deliver on";
        modeToggle.textContent = "duration";

        durationGroup.style.display = "none";
        dateGroup.style.display = "flex";

        sendBtn.classList.remove("duration-mode");
        sendBtn.classList.add("date-mode");
    } else {
        // switch to DURATION MODE
        mode = "duration";
        deliverTitle.textContent = "Deliver in";
        modeToggle.textContent = "date";

        dateGroup.style.display = "none";
        durationGroup.style.display = "flex";

        sendBtn.classList.remove("date-mode");
        sendBtn.classList.add("duration-mode");
    }
});

// duration buttons active highlight
document.querySelectorAll("#duration-group .option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("#duration-group .option-btn")
            .forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    });
});

// audience buttons active highlight
document.querySelectorAll("#audience-group .option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("#audience-group .option-btn")
            .forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    });
});

  const cards = document.getElementById("blogCards");
  const leftBtn = document.getElementById("leftBtn");
  const rightBtn = document.getElementById("rightBtn");

  // one card width (~520) + gap (~40)
  const scrollAmount = 560;

  rightBtn.addEventListener("click", () => {
    cards.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  leftBtn.addEventListener("click", () => {
    cards.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

 
  function goToSignup() {
    window.location.href = "signup.html";
  }





