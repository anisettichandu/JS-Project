// ---- Update Title Date Automatically ----
const dateTitle = document.getElementById("date-title");
const now = new Date();

const options = { year: "numeric", month: "short", day: "numeric" };
dateTitle.innerText = "A letter from " + now.toLocaleDateString("en-US", options);

// ---- Toggle Duration ↔ Date mode ----
const toggleMode = document.getElementById("toggle-mode");
const durationGroup = document.getElementById("duration-group");
const dateGroup = document.getElementById("date-group");

toggleMode.addEventListener("click", () => {
    durationGroup.classList.toggle("hidden");
    dateGroup.classList.toggle("hidden");

    toggleMode.innerText = toggleMode.innerText === "date" ? "duration" : "date";
});

// ---- Activate buttons ----
document.querySelectorAll(".option-btn").forEach(btn => {
    btn.onclick = () => {
        let group = btn.parentElement.querySelectorAll(".option-btn");
        group.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    };
});

// ---- Populate Date Dropdowns ----
const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
];

let monthSel = document.getElementById("month-select");
let daySel = document.getElementById("day-select");
let yearSel = document.getElementById("year-select");

// months
monthNames.forEach(m => {
    let opt = document.createElement("option");
    opt.text = m;
    monthSel.add(opt);
});

// days
for (let i = 1; i <= 31; i++) {
    let opt = document.createElement("option");
    opt.text = i;
    daySel.add(opt);
}

// years
for (let y = now.getFullYear(); y <= now.getFullYear() + 30; y++) {
    let opt = document.createElement("option");
    opt.text = y;
    yearSel.add(opt);
}
 function goToSignup() {
    window.location.href = "signup.html";
  }


