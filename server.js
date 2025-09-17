async function getAllProducts() {
    const response = await fetch('https://dummyjson.com/products')
    const { products } = await response.json();
    console.log(products);
    let str = ''
    products.forEach((product) => {
        str += `
         <div id="product" class="pt-19">
            <img src=${product.thumbnail} class="w-[200px] h-50 object-contain">
           <h1 class="text-xs font-semibold font-serif flex gap-6 p-6 text-center">${product.title}</h1>
           <button class="text-white bg-black rounded-xl p-1 ml-14 cursor-pointer">Add to cart</button>
        </div>
        `
    })

     document.getElementById('products').innerHTML =str
}
getAllProducts()
