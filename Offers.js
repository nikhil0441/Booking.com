document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".offers-slider");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let scrollAmount = 0;
  const scrollStep = 300; // Width of one card

  nextBtn.addEventListener("click", () => {
    if (scrollAmount < slider.scrollWidth - slider.clientWidth) {
      scrollAmount += scrollStep;
      slider.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  });

  prevBtn.addEventListener("click", () => {
    if (scrollAmount > 0) {
      scrollAmount -= scrollStep;
      slider.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  });
});
