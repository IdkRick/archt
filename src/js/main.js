function innerNavbar() {
  const navbar = document.querySelector("nav");
  const navLinks = document.querySelector(".nav-links");
  const burger = document.querySelector(".burger");

  if (window.outerWidth > 768) {
    window.addEventListener("scroll", function() {
      if (window.pageYOffset > 70) {
        navbar.classList.add("active");
      } else {
        navbar.classList.remove("active");
      }
    });
  }

  burger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    burger.classList.toggle("toggle");
  });
}
innerNavbar();

function innerLightbox() {
  const image = document.querySelectorAll(".img");
  const closeBtn = document.querySelectorAll(".close-btn");
  const lightbox = document.querySelectorAll(".lightbox");

  image.forEach((img, imgIndex) => {
    img.addEventListener("click", () => {
      lightbox.forEach((lb, lbIndex) => {
        if (imgIndex === lbIndex) {
          lb.classList.add("active");
          document.body.style.overflowY = "hidden";
        }
      });
    });
  });

  closeBtn.forEach((btn, btnIndex) => {
    btn.addEventListener("click", () => {
      lightbox.forEach((lb, lbIndex) => {
        if (btnIndex === lbIndex) {
          lb.classList.remove("active");
          document.body.style.overflowY = "auto";
        }
      });
    });
  });
}
innerLightbox();
