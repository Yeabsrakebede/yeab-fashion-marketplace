// YEAB FASHION MARKETPLACE - SUPABASE CONNECTION

const SUPABASE_URL = sb_publishable_aFoUrzZdP68njuGhLgeosw_YgkwW8BN
const SUPABASE_KEY = https://hxmfoduaxzfjvbhzmrlb.supabase.co/rest/v1/

const db = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// PRODUCT MARKETPLACE

const grid = document.getElementById("productGrid");
const search = document.getElementById("searchInput");
const filter = document.getElementById("categoryFilter");

let products = [];

async function loadProducts() {
  grid.innerHTML = "<p>Loading designs...</p>";

  const { data, error } = await db
    .from("products")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Product loading error:", error);
    grid.innerHTML = "<p>Unable to load products. Please try again.</p>";
    return;
  }

  products = data || [];
  renderProducts();
}

function renderProducts() {
  const q = search.value.trim().toLowerCase();
  const cat = filter.value;

  const matches = products.filter(p => {
    const categoryMatch = cat === "all" || p.category === cat;

    const searchMatch =
      ${p.name} ${p.description || ""} ${p.category || ""}
        .toLowerCase()
        .includes(q);

    return categoryMatch && searchMatch;
  });

  grid.innerHTML = "";

  if (!matches.length) {
    grid.innerHTML =
      '<div class="empty-state">No approved designs available yet.</div>';
    return;
  }

  matches.forEach(p => {
    const card = document.createElement("article");
    card.className = "product-card";

    const art = document.createElement("div");
    art.className = "product-art";

    if (p.image_url) {
      const img = document.createElement("img");
      img.src = p.image_url;
      img.alt = p.name;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      art.appendChild(img);
    }

    const info = document.createElement("div");
    info.className = "product-info";

    const category = document.createElement("div");
    category.className = "product-category";
    category.textContent = p.category || "";

    const name = document.createElement("h3");
    name.textContent = p.name;

    const description = document.createElement("p");
    description.textContent = p.description || "";

    const price = document.createElement("div");
    price.className = "product-price";
    price.textContent =
      Number(p.price).toLocaleString("en-US") + " ETB";

    info.append(category, name, description, price);
    card.append(art, info);
    grid.appendChild(card);
  });
}

search.addEventListener("input", renderProducts);
filter.addEventListener("change", renderProducts);

// DESIGNER APPLICATION

document.getElementById("joinButton").addEventListener("click", () => {
  const name = document.getElementById("designerName").value.trim();
  const contact = document.getElementById("designerContact").value.trim();
  const type = document.getElementById("designerType").value;

  if (!name || !contact) {
    alert("Please enter your name and contact details.");
    return;
  }

  const body = Hello YEAB Fashion Marketplace!

I would like to apply as a designer.

Name/brand: ${name}
Contact: ${contact}
Category: ${type}

Please tell me how to join.;

  const blob = new Blob([body], {
    type: "text/plain;charset=utf-8"
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "yeab-designer-application.txt";
  a.click();

  URL.revokeObjectURL(url);

  alert("Your application message was downloaded.");
});

// MOBILE MENU

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("mainNav").classList.toggle("open");
});

document.querySelectorAll("#mainNav a").forEach(a => {
  a.addEventListener("click", () => {
    document.getElementById("mainNav").classList.remove("open");
  });
});

// FOOTER YEAR

document.getElementById("year").textContent =
  new Date().getFullYear();

// START MARKETPLACE

loadProducts();
