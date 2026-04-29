const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const cursorGlow = document.querySelector(".cursor-glow");
const revealItems = document.querySelectorAll(".reveal");
const filterButtons = document.querySelectorAll(".filter-btn");
const workCards = document.querySelectorAll(".work-card");
const slider = document.querySelector(".beauty-slider input");
const sliderOverlay = document.querySelector(".slider-overlay");
const faqItems = document.querySelectorAll(".faq-item");

const testimonials = [
  {
    text: "A make ficou impecável a noite inteira. Me senti elegante, confiante e totalmente eu.",
    author: "Camila R."
  },
  {
    text: "O atendimento foi cuidadoso desde o primeiro contato. A pele ficou perfeita nas fotos.",
    author: "Bruna A."
  },
  {
    text: "Ela entendeu exatamente o que eu queria: sofisticado, marcante e confortável.",
    author: "Letícia M."
  }
];

let testimonialIndex = 0;

function handleScroll() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

function renderTestimonial() {
  const current = testimonials[testimonialIndex];
  document.querySelector("#testimonialText").textContent = `“${current.text}”`;
  document.querySelector("#testimonialAuthor").textContent = current.author;
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();
renderTestimonial();

document.addEventListener("pointermove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    workCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

slider.addEventListener("input", (event) => {
  sliderOverlay.style.width = `${event.target.value}%`;
});

document.querySelectorAll(".testimonial-control").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.direction === "next" ? 1 : -1;
    testimonialIndex = (testimonialIndex + direction + testimonials.length) % testimonials.length;
    renderTestimonial();
  });
});

faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    faqItems.forEach((other) => {
      if (other !== item) other.classList.remove("open");
    });
    item.classList.toggle("open");
  });
});
