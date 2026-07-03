/* ==========================================
   MAKITA DCM501
   script.js
========================================== */

/* ==========================
   NAVBAR - SMOOTH SCROLL DETECTION
========================== */

const navbar = document.querySelector(".navbar");
let navbarActivated = false;

window.addEventListener("scroll", () => {
  if (!navbarActivated && window.scrollY > 50) {
    navbar.classList.add("visible");
    navbarActivated = true;
  }
  
  if (navbarActivated && window.scrollY < 50) {
    navbar.classList.remove("visible");
    navbarActivated = false;
  }
});

/* ==========================
   MENÚ HAMBURGUESA - MOBILE MENU
========================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll("nav a");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });

  // Cerrar menú al hacer click en un link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active");
    });
  });
}

/* ==========================
   REVEAL AL HACER SCROLL - INTERSECTION OBSERVER
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
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px"
  }
);

reveals.forEach(item => observer.observe(item));

/* ==========================
   CARRUSEL - CAROUSEL FUNCTIONALITY
========================== */

const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".indicator");
const nextBtn = document.querySelector(".carousel-arrow.next");
const prevBtn = document.querySelector(".carousel-arrow.prev");

let currentSlide = 0;

function showSlide(index) {
  // Validar índice
  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }

  // Actualizar slides
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
  });

  // Actualizar indicadores
  if (indicators.length > 0) {
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === currentSlide);
    });
  }
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });

  prevBtn.addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") showSlide(currentSlide + 1);
    if (e.key === "ArrowLeft") showSlide(currentSlide - 1);
  });
}

// Click en indicadores
if (indicators.length > 0) {
  indicators.forEach(indicator => {
    indicator.addEventListener("click", () => {
      const slideIndex = parseInt(indicator.dataset.slide);
      showSlide(slideIndex);
    });
  });
}

/* ==========================
   PARTES INTERACTIVAS - INTERACTIVE PARTS
========================== */

const hotspots = document.querySelectorAll(".hotspot");
const specBoxes = document.querySelectorAll(".spec-box");

hotspots.forEach(button => {
  button.addEventListener("click", () => {
    // Remover active de todos los botones
    hotspots.forEach(btn => btn.classList.remove("active"));
    
    // Agregar active al botón clickeado
    button.classList.add("active");

    // Obtener target
    const target = button.dataset.target;

    // Remover active de todas las spec-boxes
    specBoxes.forEach(box => {
      box.classList.remove("active");
    });

    // Agregar active a la spec-box correspondiente
    const targetBox = document.getElementById(target);
    if (targetBox) {
      targetBox.classList.add("active");
    }
  });

  // Agregar efecto hover con teclado
  button.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      button.click();
    }
  });
});

/* ==========================
   SELECTOR DE COLORES - COLOR SELECTOR
========================== */

const colorButtons = document.querySelectorAll(".color-option");
const machineImage = document.getElementById("coffeeMachine");

colorButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remover active de todos los botones
    colorButtons.forEach(btn => btn.classList.remove("active"));

    // Agregar active al botón clickeado
    button.classList.add("active");

    // Cambiar imagen
    const newImage = button.dataset.image;
    if (machineImage && newImage) {
      // Agregar animación de fade
      machineImage.style.opacity = "0.7";
      setTimeout(() => {
        machineImage.src = newImage;
        machineImage.style.opacity = "1";
      }, 150);
    }
  });
});

/* ==========================
   MOBILE RESPONSIVE - IMAGEN OPTIMIZADA PARA MÓVIL
========================== */

window.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 768) {
    const images = document.querySelectorAll(".slide img");
    if (images.length >= 4) {
      images[0].src = "paso1-mobile.png";
      images[1].src = "paso2-mobile.png";
      images[2].src = "paso3-mobile.png";
      images[3].src = "paso4-mobile.png";
    }
  }
});

// Escuchar cambios de tamaño de ventana
window.addEventListener('resize', () => {
  if (window.innerWidth <= 768) {
    const images = document.querySelectorAll(".slide img");
    if (images.length >= 4) {
      if (!images[0].src.includes("mobile")) {
        images[0].src = "paso1-mobile.png";
        images[1].src = "paso2-mobile.png";
        images[2].src = "paso3-mobile.png";
        images[3].src = "paso4-mobile.png";
      }
    }
  }
});

/* ==========================
   SCROLL TO TOP BUTTON
========================== */

// Crear botón scroll to top
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.className = "scroll-to-top";
scrollToTopBtn.innerHTML = "↑";
scrollToTopBtn.setAttribute("aria-label", "Volver al inicio");
document.body.appendChild(scrollToTopBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});