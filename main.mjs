const $navButton = document.querySelector(".nav-button");
const $modeButton = document.querySelector(".button-mode");
const $navItems = document.querySelector(".nav-links");
const $navLinks = document.querySelectorAll(".nav__link");
const $animatedElement = document.querySelector(".section-title");

$navLinks.forEach((li) => {
  li.addEventListener("click", () => {
    $navItems.classList.toggle("show");
  });
});
$navButton.addEventListener("click", () => {
  $navItems.classList.toggle("show");
});

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("typewriter-effect");
      observer.unobserve(entry.target);
    } else {
      entry.target.classList.remove("typewriter-effect");
    }
  });
});

observer.observe($animatedElement);

window.addEventListener("unload", () => {
  observer.disconnect();
});

$modeButton.addEventListener("click", () => {
  const body = document.body;
  const nav = document.querySelector("nav");
  const aside = document.querySelector(".aside-perfil");
  const icon = document.querySelector(".icon-m");
  const footer = document.querySelector("footer");

  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
  body.classList.toggle("dark-mode");
  nav.classList.toggle("dark-mode-nav");
  aside.classList.toggle("dark-mode-aside-perfil");
  footer.classList.toggle("dark-color");
});
