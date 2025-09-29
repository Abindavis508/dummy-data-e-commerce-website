async function getAllProducts() {
    const response = await fetch('https://dummyjson.com/products')
    const { products } = await response.json();
    localStorage.setItem('products',JSON.stringify(products)??[])
    console.log(products);

    let str = '';
    products.forEach((product) => {
        str += `
         <a href="./products.html?id=${product.id}" id="product"  class=" shadow-2xl p-4 rounded-xl m-4 w-[220px] bg-gray-100 rounded-2xl">
            <img src="${product.thumbnail}" class="w-[200px] h-[150px] object-contain mx-auto">
            <h1 class="text-sm font-semibold font-serif text-center mt-2">${product.title}</h1>
            <h2 class="text-md font-bold text-black text-center">₹${product.price}</h2>
            <button  onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.thumbnail}')" class="text-white bg-black rounded-xl px-3 py-1 block mx-auto mt-2 cursor-pointer">Add to cart</button>
        </a>
        `;
    });

    document.getElementById('products').innerHTML = str;
}

getAllProducts();