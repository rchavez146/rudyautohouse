import { inventory } from "./inventory.js";

const yearEl = document.querySelector("#year");
const gridEl = document.querySelector("#inventory-grid");
const makeFilterEl = document.querySelector("#make-filter");
const priceFilterEl = document.querySelector("#price-filter");
const statusFilterEl = document.querySelector("#status-filter");

const featuredCount = 3;
const isHomePage = window.location.pathname.endsWith("/") || window.location.pathname.endsWith("index.html");

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});
const fallbackImage =
  "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 900 520%22%3E%3Crect width=%22900%22 height=%22520%22 fill=%22%23edf2f6%22/%3E%3Ctext x=%2250%25%22 y=%2246%25%22 text-anchor=%22middle%22 font-size=%2246%22 font-family=%22Arial,sans-serif%22 fill=%22%2353636f%22%3EVehicle Image%3C/text%3E%3Ctext x=%2250%25%22 y=%2256%25%22 text-anchor=%22middle%22 font-size=%2224%22 font-family=%22Arial,sans-serif%22 fill=%22%2353636f%22%3EUnavailable%3C/text%3E%3C/svg%3E";

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (!gridEl || !makeFilterEl || !priceFilterEl || !statusFilterEl) {
  throw new Error("Inventory UI elements are missing from the page.");
}

function setupMakeFilter() {
  const makes = [...new Set(inventory.map((car) => car.make))].sort();
  makes.forEach((make) => {
    const option = document.createElement("option");
    option.value = make;
    option.textContent = make;
    makeFilterEl.append(option);
  });
}

function renderCars(cars) {
  if (!cars.length) {
    gridEl.innerHTML = '<p class="no-results">No vehicles match these filters. Adjust filters or add inventory in js/inventory.js.</p>';
    return;
  }

  gridEl.innerHTML = cars
    .map(
      (car) => `
      <article class="vehicle-card">
        <img src="${car.image}" alt="${car.year} ${car.make} ${car.model}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage}'" />
        <div class="vehicle-content">
          <div class="vehicle-head">
            <h3 class="vehicle-title">${car.year} ${car.make} ${car.model}</h3>
            <span class="price">${currency.format(car.price)}</span>
          </div>
          <p class="meta">
            <span>${car.mileage.toLocaleString()} mi</span>
            <span>${car.drivetrain}</span>
            <span>${car.fuel}</span>
          </p>
          <span class="status ${car.status === "sold" ? "sold" : ""}">${car.status}</span>
        </div>
      </article>
    `
    )
    .join("");
}

function applyFilters() {
  const makeValue = makeFilterEl.value;
  const priceValue = priceFilterEl.value;
  const statusValue = statusFilterEl.value;

  const filtered = inventory.filter((car) => {
    const makeMatch = makeValue === "all" || car.make === makeValue;
    const priceMatch = priceValue === "all" || car.price <= Number(priceValue);
    const statusMatch = statusValue === "all" || car.status === "available";
    return makeMatch && priceMatch && statusMatch;
  });

  if (isHomePage) {
    renderCars(filtered.slice(0, featuredCount));
    return;
  }

  renderCars(filtered);
}

setupMakeFilter();
applyFilters();

[makeFilterEl, priceFilterEl, statusFilterEl].forEach((filterEl) => {
  filterEl.addEventListener("change", applyFilters);
});
