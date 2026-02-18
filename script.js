let player = null;
let ready = false;

/* ---------- MUSIC PER TAB (MP3) ---------- */
const tracks = {
    profile: "RACE1.mp3",
    gallery: "CIRCUIT1.mp3",
    telemetry: "CIRCUIT3.mp3",
    lore: "DARKLINE.mp3",
    network: "CIRCUIT2.mp3"
};

/* ---------- INITIALIZE AUDIO & TELEMETRY ---------- */
document.addEventListener("DOMContentLoaded", () => {
    // Set up audio
    player = new Audio(tracks.profile);
    player.loop = true;
    player.volume = 0.4; // default 40%
    ready = true;

    // Animate telemetry circles and off-field bars
    animateTelemetry();
    animateOffFieldBars();
});

/* ---------- UNLOCK AUDIO FOR MOBILE AUTOPLAY ---------- */
document.addEventListener("click", unlock, { once: true });
document.addEventListener("touchstart", unlock, { once: true });

function unlock() {
    if (!player) return;
    player.play().then(() => player.pause()).catch(() => {});
}

/* ---------- TAB SYSTEM ---------- */
function openTab(evt, name) {
    // Hide all tabcontent and remove active from all tabs
    document.querySelectorAll(".tabcontent").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

    // Show selected tab
    const tab = document.getElementById(name);
    if (tab) tab.classList.add("active");
    evt.currentTarget.classList.add("active");

    // Switch music
    changeMusic(name);
}

/* ---------- MUSIC SYSTEM ---------- */
function changeMusic(name) {
    if (!player || !ready || !tracks[name]) return;

    fadeTo(0, () => {
        player.src = tracks[name];
        player.play().catch(() => {});
        setTimeout(() => fadeTo(0.4 * 100), 200); // fade back to 40% volume
    });
}

function fadeTo(target, callback) {
    if (!player) return;

    let v = Math.round(player.volume * 100);
    let step = target > v ? 2 : -2;

    const i = setInterval(() => {
        v += step;
        player.volume = Math.max(0, Math.min(1, v / 100));

        if ((step > 0 && v >= target) || (step < 0 && v <= target)) {
            clearInterval(i);
            if (callback) callback();
        }
    }, 40);
}

/* ---------- RELATIONSHIP LOG TOGGLE ---------- */
function toggleLog(button) {
    const log = button.nextElementSibling;
    log.style.display = log.style.display === "block" ? "none" : "block";
}

/* ---------- TELEMETRY / CIRCLE METRICS ---------- */
function animateTelemetry() {
    document.querySelectorAll('.statCard').forEach(card => {
        const value = card.getAttribute('data-value');
        const circle = card.querySelector('.circle');

        if (!circle) return;

        const main = "#D8B389";      // primary bronze
        const bg = "#111";            // background fill

        // Bronze conic gradient
        circle.style.background = `conic-gradient(${main} ${value}%, ${bg} ${value}%)`;

        // White percentage text
        circle.textContent = value + "%";
        circle.style.color = "#ffffff";

        // Subtle bronze glow
        circle.style.boxShadow = `0 0 12px rgba(216,179,137,0.6)`;
        circle.style.fontWeight = "600";
        circle.style.letterSpacing = "1px";
        circle.style.textShadow = "0 0 6px rgba(255,255,255,0.25)";
    });
}

/* ---------- OFF-FIELD METRICS (HORIZONTAL BARS) ---------- */
function animateOffFieldBars() {
    document.querySelectorAll('.hBar div').forEach(bar => {
        // Apply bronze gradient
        const main = "#D8B389";
        const secondary = "#9F7F60";

        // Keep width from inline style
        const width = bar.style.width || "0%";
        bar.style.background = `linear-gradient(90deg, ${secondary}, ${main})`;
        bar.style.boxShadow = `0 0 8px ${main}`;
        bar.style.transition = "width 1.2s ease";
    });
}