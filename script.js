/* ==========================================
   MAKITA DCM501
   script.js
========================================== */

/* ==========================
   NAVBAR
========================== */

const navbar = document.querySelector(".navbar");
let navbarActivated = false;

window.addEventListener("scroll", () => {
  if (!navbarActivated && window.scrollY > 50) {
    navbar.classList.add("visible");
    navbarActivated = true;
  }
});


/* ==========================
   MENÚ HAMBURGUESA
========================== */

const menuToggle = document.querySelector(".menu-toggle");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}


/* ==========================
   REVEAL AL HACER SCROLL
========================== */

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15
  }
);

reveals.forEach(item => observer.observe(item));


/* ==========================
   CARRUSEL
========================== */

const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentSlide = 0;

function showSlide(index) {

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

}

if (nextBtn && prevBtn) {

  nextBtn.addEventListener("click", () => {

    currentSlide++;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    showSlide(currentSlide);

  });

  prevBtn.addEventListener("click", () => {

    currentSlide--;

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);

  });

}


/* ==========================
   PARTES INTERACTIVAS
========================== */

const hotspots = document.querySelectorAll(".hotspot");

hotspots.forEach(button=>{

button.addEventListener("click",()=>{

hotspots.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

        const target = button.dataset.target;

        document.querySelectorAll(".spec-box").forEach(box => {

            box.classList.remove("active");

        });

        document.getElementById(target).classList.add("active");

    });

});

/* ==========================
   SELECTOR DE COLORES
========================== */

const colorButtons = document.querySelectorAll(".color-option");
const machineImage = document.getElementById("coffeeMachine");

colorButtons.forEach(button => {

  button.addEventListener("click", () => {

    colorButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    machineImage.src = button.dataset.image;

  });

});
window.addEventListener('DOMContentLoaded', () => {
    if(window.innerWidth <= 768){
        const images = document.querySelectorAll(".slide img");
        if (images.length >= 4) {
            images[0].src="paso1-mobile.png";
            images[1].src="paso2-mobile.png";
            images[2].src="paso3-mobile.png";
            images[3].src="paso4-mobile.png";
        }
    }
});

