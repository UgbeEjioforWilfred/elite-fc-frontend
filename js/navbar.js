document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");

    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
  });
});

const hamburger = document.querySelector(".hamburger");

const navLinks = document.querySelector(".nav-links");

const menuIcon = document.querySelector(".hamburger i");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
      menuIcon.classList.remove("fa-bars");

      menuIcon.classList.add("fa-xmark");
    } else {
      menuIcon.classList.remove("fa-xmark");

      menuIcon.classList.add("fa-bars");
    }
  });
}

// Close menu when clicking a link

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");

    if (menuIcon) {
      menuIcon.classList.remove("fa-xmark");

      menuIcon.classList.add("fa-bars");
    }
  });
});
