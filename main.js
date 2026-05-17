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
    if (entry.isIntersecting && window.innerWidth > 500) {
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
  revealObserver.disconnect();
});

function toggleDark(force) {
  document.body.classList.toggle("dark-mode", force);
  document.querySelector("nav").classList.toggle("dark-mode-nav", force);
  document.querySelector(".aside-perfil").classList.toggle("dark-mode-aside-perfil", force);
  document.querySelector("footer").classList.toggle("dark-color", force);
  const icon = document.querySelector(".icon-m");
  icon.classList.toggle("fa-moon", !force);
  icon.classList.toggle("fa-sun", force);
}

$modeButton.addEventListener("click", () => toggleDark());
if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) toggleDark(true);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".section").forEach((section) => {
  revealObserver.observe(section);
});
