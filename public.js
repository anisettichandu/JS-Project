// ================================
// PUBLIC LETTERS PAGE
// ================================

// Container where letters will render
const container = document.querySelector(".featured-wrapper");

// Get letters from localStorage
let letters = JSON.parse(localStorage.getItem("letters")) || [];

const now = new Date();

// ================================
// TIME TRAVEL CALCULATION
// ================================
function calculateTimeTravel(startDate, endDate) {

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = end - start;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days < 30) return `${days} days`;
    if (days < 365) return `${Math.floor(days / 30)} months`;
    return `${Math.floor(days / 365)} years`;
}

// ================================
// RENDER PUBLIC LETTERS
// ================================
function renderLetters() {

    container.innerHTML = "";

    const publicLetters = letters.filter(letter =>
        letter.isPublic === true &&
        new Date(letter.deliverAt) <= now
    );

    if (publicLetters.length === 0) {
        container.innerHTML = "<p>No public letters delivered yet.</p>";
        return;
    }

    publicLetters.reverse().forEach(letter => {

        const wordCount = letter.text.trim().split(/\s+/).length;
        const timeTravel = calculateTimeTravel(letter.createdAt, letter.deliverAt);

        const card = document.createElement("div");
        card.className = "letter-card";

        card.innerHTML = `
            <div class="meta-line">
                🕒 Time Travelled — ${timeTravel}
            </div>

            <div class="letter-title">
                A letter from ${new Date(letter.createdAt).toDateString()}
            </div>

            <div class="letter-text">
                ${letter.text}
            </div>

            <div class="bottom-row">
                <div class="social-row">
                    ❤️ Like <span class="count">${letter.likes || 0}</span>
                    💬 Comments <span class="count">${letter.comments?.length || 0}</span>
                </div>

                <div class="date-row">
                    ${new Date(letter.createdAt).toDateString()} →
                    ${new Date(letter.deliverAt).toDateString()}
                    • ${wordCount} words
                </div>
            </div>
        `;

        // LIKE FUNCTIONALITY
        card.querySelector(".social-row").addEventListener("click", () => {

            letter.likes = (letter.likes || 0) + 1;

            localStorage.setItem("letters", JSON.stringify(letters));

            renderLetters();
        });

        container.appendChild(card);
    });
}

// Run
renderLetters();

// Navigation
function goToSignup() {
    window.location.href = "signup.html";
}
