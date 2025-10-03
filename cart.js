function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total"); 
  const buyBtnDiv = document.getElementById("buy-btn"); 

  let total = 0;
  let html = "";

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    html += `
      <div class="flex items-center bg-white shadow-md p-4 rounded-xl justify-between mb-3">
        <img src="${item.thumbnail}" class="w-20 h-16 object-contain">
        <div class="flex-1 px-4">
          <h2 class="font-bold">${item.title}</h2>
          <p class="text-gray-700">₹${item.price}</p>
        </div>
        <div class="flex items-center space-x-3">
          <button onclick="updateQuantity(${index}, -1)" class="px-3 py-1 bg-gray-300 rounded">-</button>
          <span class="font-bold">${item.quantity}</span>
          <button onclick="updateQuantity(${index}, 1)" class="px-3 py-1 bg-gray-300 rounded">+</button>
        </div>
      </div>
    `;
  });

  cartItemsDiv.innerHTML = html || "<p class='text-center text-gray-600'>Your cart is empty</p>";
  cartTotal.textContent = "₹" + total;

  // Show Buy button only cart has items
  if (cart.length > 0) {
    buyBtnDiv.innerHTML = `
      <button onclick="buyNow()" 
        class="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
        Buy Now
      </button>
    `;
  } else {
    buyBtnDiv.innerHTML = "";
  }
}

function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart[index]) return;

  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function addToCart(id, title, price, thumbnail) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, title, price, thumbnail, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

function buyNow() {
  localStorage.removeItem("cart"); // clear the cart items totally
  alert("Purchase completed successfuly");
  loadCart(); // reload cart as a fresh page previous items will be removed
}

loadCart();
