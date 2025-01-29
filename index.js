document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("hamburger-icon");
  const navbar = document.getElementById("navbar");

  menuIcon.addEventListener("click", function () {
    navbar.style.display = navbar.style.display === "flex" ? "none" : "flex";
  });
});
