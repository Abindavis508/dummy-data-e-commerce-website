function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='text-center text-gray-500'>Your cart is empty.</p>";
        return;
    }

    let str = '';
    let grandTotal = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.qty;
        grandTotal += itemTotal;

        str += `
        <div class="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
            <img src="${item.thumbnail}" class="w-20 h-20 object-contain">
            <div class="flex-1 px-4">
                <h2 class="font-bold">${item.title}</h2>
                <p>₹${item.price} × ${item.qty} = <b>₹${itemTotal}</b></p>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="changeQty(${item.id}, -1)" class="bg-gray-300 px-2 rounded">-</button>
                <span>${item.qty}</span>
                <button onclick="changeQty(${item.id}, 1)" class="bg-gray-300 px-2 rounded">+</button>
            </div>
            <button onclick="removeFromCart(${item.id})" class="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
        </div>
        `;
    });

    // Grand total
    str += `
        <div class="text-right font-bold text-xl mt-6">
            Grand Total: ₹${grandTotal}
        </div>
    `;

    cartContainer.innerHTML = str;
}

function changeQty(id, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(p => p.id === id);

    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            // remove if quantity goes 0
            cart = cart.filter(p => p.id !== id);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); // refresh cart
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Initial load
loadCart();
