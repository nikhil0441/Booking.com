
    function toggleMenu() {
        const navbar = document.getElementById("navbar");
        navbar.classList.toggle("active");
    }

const links = document.querySelectorAll("#navbar ul li a");
links.forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("navbar").classList.remove("active");
  });
});
