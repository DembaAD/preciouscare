// ===========================
// Gestion du menu mobile
// ===========================
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelector('.nav-links');

mobileMenu?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// ===========================
// Gestion du Slider d'Impact
// ===========================
const impactStories = document.querySelector(".impact-stories");
document.addEventListener("DOMContentLoaded", () => {
  const impactStoriesData = [
    {
      image: "https://placehold.co/800x600",
      title: "Intervention d'Urgence dans les Communautés Rurales",
      description: "Fournir des soins médicaux essentiels aux villages isolés",
    },
    {
      image: "https://placehold.co/800x600",
      title: "Cliniques Mobiles de Santé",
      description: "Apporter des soins de santé directement à ceux qui en ont le plus besoin",
    },
    {
      image: "https://placehold.co/800x600",
      title: "Éducation à la Santé Communautaire",
      description: "Autonomiser les communautés grâce aux connaissances en santé",
    },
  ];

  const impactSlider = document.getElementById("impactSlider");
  let currentSlide = 0;

  if (!impactSlider) {
    console.error("Slider container not found!");
    return;
  }

  // Crée les slides du slider
  function createSlides() {
    impactStoriesData.forEach((story, index) => {
      const slide = document.createElement("div");
      slide.className = `impact-slide ${index === 0 ? "visible" : "hidden"}`;
      slide.innerHTML = `
        <img src="${story.image}" alt="${story.title}">
        <div class="impact-content">
          <h3>${story.title}</h3>
          <p>${story.description}</p>
        </div>
      `;
      impactSlider.appendChild(slide);
    });
  }

  // Passe au slide suivant
  function nextSlide() {
    const slides = document.querySelectorAll(".impact-slide");
    slides[currentSlide].classList.replace("visible", "hidden");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.replace("hidden", "visible");
  }

  // Initialisation du slider
  createSlides();
  setInterval(nextSlide, 5000); // Change de slide toutes les 5 secondes
});

// ===========================
// Gestion du formulaire de contact
// ===========================
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Affichage d'un message de succès
  const successMessage = document.createElement('p');
  successMessage.textContent = 'Merci pour votre message ! Nous vous recontacterons bientôt.';
  successMessage.style.color = 'green';
  contactForm.appendChild(successMessage);

  contactForm.reset();
});

// ===========================
// Filtrage des projets par catégorie
// ===========================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.dataset.category;
    projectCards.forEach(card => {
      card.style.display = category === 'all' || card.dataset.category === category
        ? 'block'
        : 'none';
    });
  });
});

// ===========================
// Initialisation de la carte interactive (Leaflet.js)
// ===========================
const map = L.map('map').setView([20.254038, -10.555344], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

const projectLocations = [
  { lat: 18.0783, lng: -15.9744, name: 'Nouakchott - Clinique Mobile' },
  { lat: 22.5666, lng: -12.0292, name: 'Zouerate - Éducation Communautaire' },
  { lat: 16.6191, lng: -11.4062, name: 'Kiffa - Sensibilisation' },
];

projectLocations.forEach(location => {
  L.marker([location.lat, location.lng])
    .addTo(map)
    .bindPopup(`<b>${location.name}</b>`);
});
