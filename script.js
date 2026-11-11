const menu = [
  ["dishes", "Rice with Chicken Shawarma", "€12.50", "Served with salad and sauce of your choice."],
  ["dishes", "Rice with Lamb Shawarma", "€16.00", "Served with salad and sauce of your choice."],
  ["dishes", "Rice with Beef Shawarma", "€16.00", "Served with salad and sauce of your choice."],
  ["dishes", "Rice with Mixed Shawarma", "€14.50", "Served with salad and sauce of your choice."],
  ["dishes", "Rice with Chicken Liver", "€12.50", "Served with salad and sauce of your choice."],
  ["dishes", "Rice with Chicken Leg", "€12.50", "Served with salad and sauce of your choice."],
  ["wraps", "Shawarma Chicken Wrap", "€8.00", "Tender chicken, fresh salad and house sauce."],
  ["wraps", "Shawarma Lamb Wrap", "€9.90", "Seasoned lamb, fresh salad and house sauce."],
  ["wraps", "Shawarma Beef Wrap", "€9.90", "Beef shawarma, fresh salad and house sauce."],
  ["wraps", "Chicken Liver Wrap", "€7.50", "Chicken liver, fresh salad and house sauce."],
  ["wraps", "Fries Wrap", "€6.50", "Fries, fresh salad and sauce of your choice."],
  ["wraps", "Mixed Shawarma Wrap", "€9.00", "A tasty mix of chicken and beef shawarma."],
  ["wraps", "Mixed Meat Shawarma Wrap", "€9.90", "A hearty mix of lamb and beef shawarma."],
  ["falafel", "Falafel Wrap", "€6.00", "Falafel, salad and sauce of your choice."],
  ["falafel", "Falafel Dish (5 pcs)", "€9.90", "Fresh salad, hummus and tahini sauce."],
  ["falafel", "12 Pcs Falafel with Sauce", "€7.50", "Golden falafel with a side of sauce."],
  ["falafel", "3 Pcs Falafel with Sauce", "€2.00", "A little crispy bite with sauce."],
  ["falafel", "Hummus Plate", "€6.00", ""],
  ["falafel", "Small Fries", "€3.50", ""],
  ["falafel", "Large Fries", "€6.00", ""],
  ["fatayer", "Meat Fatayer", "", "Beef, yogurt, onion and tomato."],
  ["fatayer", "Spinach Fatayer", "", "Spinach, onion and pomegranate molasses."],
  ["fatayer", "Ricotta Fatayer", "€1.50 each · 4 for €5", ""],
  ["fatayer", "Chicken Fatayer", "€2 each · 4 for €5", ""],
  ["fatayer", "Pizza Mini", "", "Tomato, cheese, olive and oregano."],
  ["fatayer", "Mhammara Mini", "", "Tomato, chili, onion and sesame."],
  ["fatayer", "Sfeeha Mini", "", "Beef, onion, tomato and pomegranate."],
  ["fatayer", "Cheese Mini", "", "Cheese, nigella and sesame seeds."],
  ["fatayer", "Manakish Mini", "", "Thyme and olive oil."],
  ["fatayer", "Tuna Roll", "", "Tuna, olive, tomato and chili."],
  ["fatayer", "Sausage Roll", "", "Chicken sausage."],
  ["drinks", "Water", "€1.50", "", "COLD DRINKS"],
  ["drinks", "Fizzy Water", "€2.00", "", "COLD DRINKS"],
  ["drinks", "Ayran", "€2.00", "", "COLD DRINKS"],
  ["drinks", "Soft Drink", "€2.00", "", "COLD DRINKS"],
  ["drinks", "Slush Drink (330 ml)", "€2.00", "", "COLD DRINKS"],
  ["drinks", "Juice (500 ml)", "€2.50", "", "COLD DRINKS"],
  ["drinks", "Energy Drink", "€2.50", "", "COLD DRINKS"],
  ["drinks", "Espresso", "€1.50", "", "HOT DRINKS"],
  ["drinks", "Double Espresso", "€2.00", "", "HOT DRINKS"],
  ["drinks", "Americano", "€2.00", "", "HOT DRINKS"],
  ["drinks", "Cappuccino", "€2.20", "", "HOT DRINKS"],
  ["drinks", "Café Latte", "€2.20", "", "HOT DRINKS"],
  ["drinks", "Arabic Coffee", "€3.00", "", "HOT DRINKS"],
  ["drinks", "Herbal Tea", "€2.00", "", "HOT DRINKS"]
];

const menuGrid = document.querySelector("#menu-grid");
const menuTabs = document.querySelectorAll(".menu-tab");
const menuSearch = document.querySelector("#menu-search");
const resultCount = document.querySelector("#result-count");
const noResults = document.querySelector("#no-results");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector("#main-nav");
let activeFilter = "all";

function updateMenu() {
  const searchTerm = menuSearch.value.trim().toLowerCase();
  const visibleItems = menu.filter(([category, name, , description]) =>
    (activeFilter === "all" || category === activeFilter) &&
    `${name} ${description}`.toLowerCase().includes(searchTerm)
  );

  menuGrid.innerHTML = visibleItems.map(([category, name, price, description, label]) => `
    <article class="menu-item">
      <span class="item-category">${label || (category === "falafel" && (name.includes("Fries") || name.includes("Hummus") ? "SIDES" : "FALAFEL") || category.toUpperCase())}</span>
      <div class="item-main"><h3>${name}</h3>${price ? `<strong>${price}</strong>` : ""}</div>
      ${description ? `<p>${description}</p>` : ""}
    </article>
  `).join("");

  resultCount.textContent = `${visibleItems.length} ${visibleItems.length === 1 ? "item" : "items"}`;
  noResults.hidden = visibleItems.length > 0;
}

menuTabs.forEach((tab) => tab.addEventListener("click", () => {
  activeFilter = tab.dataset.filter;
  menuTabs.forEach((button) => {
    const selected = button === tab;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  updateMenu();
}));

menuSearch.addEventListener("input", updateMenu);
navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  navToggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
  mainNav.classList.toggle("open", !expanded);
});
mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
  mainNav.classList.remove("open");
}));

document.querySelector("#year").textContent = new Date().getFullYear();
updateMenu();
