const products = [
  {
    name: "Glow Serum",
    price: 899,
    rating: 4.6,
    category: "skincare",
    img: "images/WhatsApp Image .jpg"
  },
  {
    name: "Matte Lipstick",
    price: 499,
    rating: 4.2,
    category: "makeup",
    img: "images/WhatsApp Image 2.jpg"
  },
  {
    name: "Face Moisturizer",
    price: 699,
    rating: 4.5,
    category: "skincare",
    img: "images/WhatsApp Image 3.jpg"
  },
  {
    name: "Silk Scrunchie Set",
    price: 299,
    rating: 4.7,
    category: "accessory",
    img: "images/WhatsApp Image 7.jpg"
  },
  {
    name: "Eyeliner Pen",
    price: 399,
    rating: 4.3,
    category: "makeup",
    img: "images/WhatsApp Image 8.jpg"
  },
  {
    name: "Gold Hoops",
    price: 599,
    rating: 4.8,
    category: "accessory",
    img: "images/WhatsApp Image 4.jpg"
  },
  {
    name: "Gold Hoops",
    price: 599,
    rating: 4.8,
    category: "accessory",
    img: "images/WhatsApp Image 6.jpg"
  },
  {
    name: "Gold Hoops",
    price: 599,
    rating: 4.8,
    category: "accessory",
    img: "images/WhatsApp Image 6.jpg"
  },
  {
    name: "Gold Hoops",
    price: 599,
    rating: 4.8,
    category: "accessory",
    img: "images/WhatsApp Image 5.jpg"
  },
  {
    name: "Gold Hoops",
    price: 599,
    rating: 4.8,
    category: "accessory",
    img: "images/WhatsApp Image 4.jpg"
  }
];

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");
const cartCount = document.getElementById("cart-count");

let cart = 0;

function displayProducts(items) {
  productList.innerHTML = "";
  items.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <p>⭐ ${p.rating}</p>
      <button onclick="addToCart()">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart() {
  cart++;
  cartCount.textContent = cart;
}

function applyFilters() {
  let filtered = [...products];
  const searchVal = searchInput.value.toLowerCase();
  const filterVal = filterSelect.value;
  const sortVal = sortSelect.value;

  if (filterVal !== "all") {
    filtered = filtered.filter((p) => p.category === filterVal);
  }

  if (searchVal) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(searchVal)
    );
  }

  if (sortVal === "price") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortVal === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(filtered);
}

searchInput.addEventListener("input", applyFilters);
filterSelect.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);

displayProducts(products);
