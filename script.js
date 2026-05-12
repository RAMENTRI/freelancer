const services = [
  {
    title: "Business website with booking, enquiry forms, and payments",
    provider: "Verified web development team",
    location: "Remote across India",
    category: "Development",
    rating: 4.9,
    price: 18000,
    tags: ["React", "Landing page", "Payment setup"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Short-form video editing for reels, ads, and YouTube Shorts",
    provider: "Verified video editor",
    location: "Mumbai / Remote",
    category: "Video",
    rating: 4.8,
    price: 3500,
    tags: ["Reels", "Captions", "Color grading"],
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "SEO blogs, website copy, and scripts in English or Hindi",
    provider: "Verified content writer",
    location: "Delhi NCR / Remote",
    category: "Writing",
    rating: 5.0,
    price: 2500,
    tags: ["SEO", "Blogs", "Hindi content"],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Logo, brand identity, and social media design kit",
    provider: "Verified brand designer",
    location: "Bengaluru / Remote",
    category: "Design",
    rating: 4.9,
    price: 9500,
    tags: ["Logo", "Brand kit", "Social posts"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Google Ads, Meta Ads, and landing page lead setup",
    provider: "Verified growth marketer",
    location: "Hyderabad / Remote",
    category: "Marketing",
    rating: 4.7,
    price: 12500,
    tags: ["Ads", "Funnels", "Analytics"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Business automation, CRM setup, and reporting dashboards",
    provider: "Verified automation specialist",
    location: "Pune / Remote",
    category: "Development",
    rating: 4.8,
    price: 8000,
    tags: ["Automation", "CRM", "Dashboards"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "YouTube thumbnails, channel graphics, and creator design",
    provider: "Verified creator designer",
    location: "Chennai / Remote",
    category: "Design",
    rating: 4.6,
    price: 1800,
    tags: ["YouTube", "Thumbnails", "Banners"],
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Monthly social media calendar and post management",
    provider: "Verified social media manager",
    location: "Kochi / Remote",
    category: "Marketing",
    rating: 4.9,
    price: 22000,
    tags: ["Instagram", "LinkedIn", "Planning"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=900&q=80",
  },
];

const state = {
  category: "All",
  sort: "recommended",
  query: "",
};

const gigGrid = document.querySelector("#gigGrid");
const searchInput = document.querySelector("#serviceSearch");

function normalized(value) {
  return value.toLowerCase().trim();
}

function formatINR(value) {
  return `INR ${value.toLocaleString("en-IN")}`;
}

function getFilteredServices() {
  const query = normalized(state.query);
  const filtered = services.filter((service) => {
    const categoryMatch = state.category === "All" || service.category === state.category;
    const queryText = normalized(
      `${service.title} ${service.provider} ${service.location} ${service.category} ${service.tags.join(" ")}`
    );
    return categoryMatch && (!query || queryText.includes(query));
  });

  return filtered.sort((a, b) => {
    if (state.sort === "price") return a.price - b.price;
    if (state.sort === "rating") return b.rating - a.rating;
    return b.rating * 100 - b.price / 1000 - (a.rating * 100 - a.price / 1000);
  });
}

function renderServices() {
  const visibleServices = getFilteredServices();

  if (!visibleServices.length) {
    gigGrid.innerHTML = `
      <div class="empty-state">
        <strong>No exact matches yet.</strong>
        <p>Try a broader keyword like developer, editor, writer, design, marketing, Hindi, or remote.</p>
      </div>
    `;
    return;
  }

  gigGrid.innerHTML = visibleServices
    .map(
      (service) => `
        <article class="gig-card">
          <img src="${service.image}" alt="${service.category} service workspace" loading="lazy" />
          <div class="gig-body">
            <div class="seller-row">
              <div class="service-provider">
                <strong>${service.provider}</strong>
                <span>${service.location}</span>
              </div>
              <span class="rating">Star ${service.rating.toFixed(1)}</span>
            </div>
            <h3 class="gig-title">${service.title}</h3>
            <div class="gig-tags">
              ${service.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
            <div class="gig-footer">
              <div>
                <span>Starts from</span>
                <strong>${formatINR(service.price)}</strong>
              </div>
              <button class="mini-btn" data-open-modal="employerLoginModal">Hire</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

document.querySelectorAll("[data-category]").forEach((button) => {
  button.addEventListener("click", () => {
    state.category = button.dataset.category;
    document.querySelectorAll("[data-category]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderServices();
  });
});

document.querySelectorAll("[data-sort]").forEach((button) => {
  button.addEventListener("click", () => {
    state.sort = button.dataset.sort;
    document.querySelectorAll("[data-sort]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderServices();
  });
});

document.querySelector("#searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.query = searchInput.value;
  renderServices();
  document.querySelector("#talent").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelectorAll("[data-search]").forEach((button) => {
  button.addEventListener("click", () => {
    searchInput.value = button.dataset.search;
    state.query = button.dataset.search;
    renderServices();
    document.querySelector("#talent").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.addEventListener("click", (event) => {
  const switchTrigger = event.target.closest("[data-switch-modal]");
  if (switchTrigger) {
    const currentModal = switchTrigger.closest("dialog");
    const nextModal = document.getElementById(switchTrigger.dataset.switchModal);
    if (currentModal) currentModal.close();
    if (nextModal && typeof nextModal.showModal === "function") nextModal.showModal();
    return;
  }

  const trigger = event.target.closest("[data-open-modal]");
  if (!trigger) return;
  const modal = document.getElementById(trigger.dataset.openModal);
  if (modal && typeof modal.showModal === "function") {
    modal.showModal();
  }
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });
});

renderServices();
