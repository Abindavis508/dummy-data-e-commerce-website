// Fetch products
async function getAllProducts() {
  const response = await fetch('https://dummyjson.com/products');
  const { products } = await response.json();
  localStorage.setItem('products', JSON.stringify(products) ?? []);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let str = '';
  products.forEach((product) => {
    // check if product is already in cart
    const inCart = cart.some(item => item.id === product.id);

    str += `
      <div class="shadow-2xl p-4 rounded-xl m-4 w-[220px] bg-gray-100 rounded-2xl">
      
        <a href="./products.html?id=${product.id}">
          <img src="${product.thumbnail}" class="w-[200px] h-[150px] object-contain mx-auto cursor-pointer">
        </a>

        <a href="./products.html?id=${product.id}">
          <h1 class="text-sm font-semibold font-serif text-center mt-2 hover:underline cursor-pointer">${product.title}</h1>
        </a>

        <h2 class="text-md font-bold text-black text-center">₹${product.price}</h2>
        
        <button id="btn-${product.id}"
          onclick="${inCart ? `goToCart()` : `addToCart(${product.id}, '${product.title}', ${product.price}, '${product.thumbnail}')`}" 
          class="text-white ${inCart ? 'bg-green-600' : 'bg-black'} rounded-xl px-3 py-1 block mx-auto mt-2 cursor-pointer">
          ${inCart ? 'Go to cart' : 'Add to cart'}
        </button>
      </div>
    `;
  });

  document.getElementById('products').innerHTML = str;
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

  // change button text and behavior
  const btn = document.getElementById(`btn-${id}`);
  btn.innerText = "Go to cart";
  btn.classList.remove("bg-black");
  btn.classList.add("bg-green-600");
  btn.setAttribute("onclick", "goToCart()");
}

function goToCart() {
  window.location.href = "./cart.html";
}

getAllProducts();
