const gigs = [
  {
    title: "I will build a fast business website with booking and payments",
    seller: "Aarav Mehta",
    role: "Full-stack developer",
    category: "Development",
    rating: 4.9,
    price: 220,
    tags: ["React", "Booking", "Stripe"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "I will edit engaging reels, shorts, and product videos",
    seller: "Nina Costa",
    role: "Video editor",
    category: "Video",
    rating: 4.8,
    price: 65,
    tags: ["Reels", "Captions", "Color"],
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "I will write SEO blogs, website copy, and creator scripts",
    seller: "Maya Rao",
    role: "Content creator",
    category: "Writing",
    rating: 5.0,
    price: 45,
    tags: ["SEO", "Blogs", "Scripts"],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "I will design a clean brand identity and social media kit",
    seller: "Leo Martins",
    role: "Brand designer",
    category: "Design",
    rating: 4.9,
    price: 140,
    tags: ["Logo", "Brand", "Social"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "I will set up ad campaigns and landing pages for leads",
    seller: "Samira Khan",
    role: "Growth marketer",
    category: "Marketing",
    rating: 4.7,
    price: 180,
    tags: ["Ads", "Funnels", "Analytics"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "I will create automations and dashboards for your business",
    seller: "Jon Bell",
    role: "No-code specialist",
    category: "Development",
    rating: 4.8,
    price: 120,
    tags: ["Automation", "CRM", "Sheets"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "I will produce YouTube thumbnails and channel graphics",
    seller: "Priya Shah",
    role: "Creator designer",
    category: "Design",
    rating: 4.6,
    price: 38,
    tags: ["YouTube", "Thumbnails", "Banners"],
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "I will manage your social content calendar for 30 days",
    seller: "Owen Reed",
    role: "Social strategist",
    category: "Marketing",
    rating: 4.9,
    price: 260,
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

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

function normalized(value) {
  return value.toLowerCase().trim();
}

function getFilteredGigs() {
  const query = normalized(state.query);
  const filtered = gigs.filter((gig) => {
    const categoryMatch = state.category === "All" || gig.category === state.category;
    const queryText = normalized(`${gig.title} ${gig.seller} ${gig.role} ${gig.category} ${gig.tags.join(" ")}`);
    return categoryMatch && (!query || queryText.includes(query));
  });

  return filtered.sort((a, b) => {
    if (state.sort === "price") return a.price - b.price;
    if (state.sort === "rating") return b.rating - a.rating;
    return b.rating * 100 - b.price / 10 - (a.rating * 100 - a.price / 10);
  });
}

function renderGigs() {
  const visibleGigs = getFilteredGigs();

  if (!visibleGigs.length) {
    gigGrid.innerHTML = `
      <div class="empty-state">
        <strong>No exact matches yet.</strong>
        <p>Try a broader keyword like developer, editor, writer, design, or marketing.</p>
      </div>
    `;
    return;
  }

  gigGrid.innerHTML = visibleGigs
    .map(
      (gig) => `
        <article class="gig-card">
          <img src="${gig.image}" alt="${gig.role} workspace" loading="lazy" />
          <div class="gig-body">
            <div class="seller-row">
              <div class="seller">
                <span class="avatar">${initials(gig.seller)}</span>
                <div>
                  <strong>${gig.seller}</strong>
                  <span>${gig.role}</span>
                </div>
              </div>
              <span class="rating">★ ${gig.rating.toFixed(1)}</span>
            </div>
            <h3 class="gig-title">${gig.title}</h3>
            <div class="gig-tags">
              ${gig.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
            <div class="gig-footer">
              <div>
                <span>Starting at</span>
                <strong>$${gig.price}</strong>
              </div>
              <button class="mini-btn" data-open-modal="postJobModal">Contact</button>
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
    renderGigs();
  });
});

document.querySelectorAll("[data-sort]").forEach((button) => {
  button.addEventListener("click", () => {
    state.sort = button.dataset.sort;
    document.querySelectorAll("[data-sort]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderGigs();
  });
});

document.querySelector("#searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.query = searchInput.value;
  renderGigs();
  document.querySelector("#talent").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelectorAll("[data-search]").forEach((button) => {
  button.addEventListener("click", () => {
    searchInput.value = button.dataset.search;
    state.query = button.dataset.search;
    renderGigs();
    document.querySelector("#talent").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.addEventListener("click", (event) => {
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

renderGigs();
