// document.querySelectorAll(".category").forEach(cat => {
//         cat.addEventListener("click", () => {
//           document.querySelectorAll(".category").forEach(c => c.classList.remove("bg-green-600","text-white"));
//           cat.classList.add("bg-green-600","text-white");
//         });
//       });

// -------------------------------
// Load Categories
// -------------------------------
const loadCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories"
  );
  const data = await res.json();

  const categoriesList = document.getElementById("categories");
  categoriesList.innerHTML = "";

  data.categories.forEach((cat) => {
    const li = document.createElement("li");
    li.className =
      "category px-3 py-2 rounded hover:bg-green-200 cursor-pointer";

    li.innerHTML = `
      <strong>${cat.category_name}</strong>
    `;

    // Click → Filter plants
    li.addEventListener("click", () => {
      document
        .querySelectorAll(".category")
        .forEach((item) => item.classList.remove("bg-green-600", "text-white"));

      li.classList.add("bg-green-600", "text-white");

      loadTreesByCategory(cat.category_name);
    });

    categoriesList.appendChild(li);
  });
};

loadCategories();

// -------------------------------
// Load All Plants Initially
// -------------------------------
let allPlants = [];

const loadPlants = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();

  allPlants = data.plants; // store all plants for later filtering
  displayPlants(allPlants);
};

loadPlants();

// -------------------------------
// Display Plants
// -------------------------------
const displayPlants = (plants) => {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded-lg shadow-sm";

    card.innerHTML = `
      <div class="h-40 md:h-48 rounded mb-3">
        <img src="${plant.image}" alt="${
      plant.name
    }" class="h-full w-full object-cover rounded">
      </div>

   <h2 class="font-semibold cursor-pointer" onclick="openModal(${plant.id})">
    ${plant.name}
</h2>

      <p class="text-xs md:text-sm text-gray-600 mb-2">
        ${plant.description.slice(0, 85)}...
      </p>

      <div class="flex justify-between items-center mb-3">
        <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
          ${plant.category}
        </span>
        <span class="font-medium">${plant.price} Tk</span>
      </div>

      <button 
        class="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 text-sm md:text-base">
        Add to Cart
      </button>
    `;

    container.appendChild(card);
  });
};

// -------------------------------
// Filter Plants by Category
// -------------------------------
function loadTreesByCategory(categoryName) {
  const filtered = allPlants.filter((plant) => plant.category === categoryName);
  displayPlants(filtered);
}

// open modal

function openModal(id) {
  const plant = allPlants.find((p) => p.id === id);

  document.getElementById("modalImage").src = plant.image;
  document.getElementById("modalName").innerText = plant.name;
  document.getElementById("modalDescription").innerText = plant.description;
  document.getElementById("modalCategory").innerText = plant.category;
  document.getElementById("modalPrice").innerText = plant.price;

  document.getElementById("plantModal").classList.remove("hidden");
  document.getElementById("plantModal").classList.add("flex");
}

function closeModal() {
  document.getElementById("plantModal").classList.add("hidden");
  document.getElementById("plantModal").classList.remove("flex");
}

// Cart functionality
// let cart = {};

// function addToCart(name, price) {
//   if (cart[name]) {
//     cart[name].qty++;
//   } else {
//     cart[name] = { price: price, qty: 1 };
//   }
//   renderCart();
// }

// function removeFromCart(name) {
//   if (cart[name]) {
//     cart[name].qty--;
//     if (cart[name].qty <= 0) {
//       delete cart[name];
//     }
//   }
//   renderCart();
// }

// function renderCart() {
//   const cartItems = document.getElementById("cartItems");
//   const totalPriceEl = document.getElementById("totalPrice");
//   cartItems.innerHTML = "";
//   let total = 0;

//   for (let item in cart) {
//     let div = document.createElement("div");
//     div.className = "flex justify-between items-center bg-green-50 mb-8 p-2 rounded";
//     div.innerHTML = `
//       <span>${item}  <br/> ৳ ${cart[item].price} × ${cart[item].qty}</span>
//       <button onclick="removeFromCart('${item}')" class=" font-bold">×</button>
//     `;
//     cartItems.appendChild(div);
//     total += cart[item].price * cart[item].qty;
//   }

//   totalPriceEl.textContent = "৳" + total;
// }
