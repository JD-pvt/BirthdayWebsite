let highestZ = 1;

class Paper {
  holdingPaper = false;

  prevX = 0;
  prevY = 0;

  currentPaperX = 0;
  currentPaperY = 0;

  // No random rotation
  rotation = 0;

  init(paper) {

    // =========================
    // START DRAGGING
    // =========================

    paper.addEventListener("pointerdown", (e) => {
      e.preventDefault();

      this.holdingPaper = true;

      // Bring paper to front
      paper.style.zIndex = highestZ;
      highestZ++;

      // Remember starting position
      this.prevX = e.clientX;
      this.prevY = e.clientY;

      // Keep receiving pointer events
      paper.setPointerCapture(e.pointerId);
    });


    // =========================
    // DRAGGING
    // =========================

    paper.addEventListener("pointermove", (e) => {

      if (!this.holdingPaper) return;

      e.preventDefault();

      const moveX = e.clientX - this.prevX;
      const moveY = e.clientY - this.prevY;

      this.currentPaperX += moveX;
      this.currentPaperY += moveY;

      this.prevX = e.clientX;
      this.prevY = e.clientY;

      paper.style.transform =
        `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    });


    // =========================
    // STOP DRAGGING
    // =========================

    paper.addEventListener("pointerup", (e) => {

      this.holdingPaper = false;

      if (paper.hasPointerCapture(e.pointerId)) {
        paper.releasePointerCapture(e.pointerId);
      }
    });


    // =========================
    // POINTER CANCEL
    // =========================

    paper.addEventListener("pointercancel", () => {
      this.holdingPaper = false;
    });
  }
}


// =========================
// INITIALIZE PAPERS
// =========================

const papers = document.querySelectorAll(".paper");

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});


// =====================================================
// OPENING EXPERIENCE
// =====================================================

const intro = document.getElementById("intro");
const openBtn = document.getElementById("openBtn");
const bgMusic = document.getElementById("bgMusic");
const effects = document.getElementById("effects");


// Make sure the opening elements exist
if (intro && openBtn && bgMusic && effects) {

  openBtn.addEventListener("click", () => {

    // =========================
    // START MUSIC
    // =========================

    bgMusic.volume = 0.4;

    bgMusic.play().catch(() => {});


    // =========================
    // CONFETTI
    // =========================

    for (let i = 0; i < 100; i++) {

      const confetti = document.createElement("div");

      confetti.className = "confetti";

      confetti.style.left =
        Math.random() * 100 + "vw";

      confetti.style.animationDelay =
        Math.random() * 0.8 + "s";

      confetti.style.transform =
        `rotate(${Math.random() * 360}deg)`;

      effects.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 4000);
    }


    // =========================
    // FLOATING HEARTS
    // =========================

    for (let i = 0; i < 20; i++) {

      setTimeout(() => {

        const heart = document.createElement("div");

        heart.className = "floating-heart";

        heart.innerHTML = "❤️";

        heart.style.left =
          Math.random() * 100 + "vw";

        heart.style.fontSize =
          (18 + Math.random() * 20) + "px";

        heart.style.animationDuration =
          (3 + Math.random() * 2) + "s";

        effects.appendChild(heart);

        setTimeout(() => {
          heart.remove();
        }, 5000);

      }, i * 120);
    }


    // =========================
    // HIDE INTRO
    // =========================

    setTimeout(() => {
      intro.classList.add("hidden");
    }, 700);

  });

}