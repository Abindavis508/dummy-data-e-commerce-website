function getProduct() {
    console.log("get products");
    const urlParams = new URLSearchParams(window.location.search)
    let id = Number( urlParams.get('id'));
    let products = JSON.parse(localStorage.getItem('products'))
    let product =products.find((prod)=> prod.id ==id)
    document.getElementById('product').innerHTML =`
           <img src="${product.thumbnail}" alt="">
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <div id="images"></div>
        `
        product.images.forEach((image)=>{
            console.log(image);
            
document.getElementById("images").innerHTML+=`<img src="${image}" alt="">`
        })
}
getProduct()