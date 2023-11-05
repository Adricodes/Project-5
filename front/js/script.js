fetch('http://localhost:3000/api/products')
    .then(data => {
        return data.json();
    })
    .then(product => {
        displayProducts(product);
    });

/**
 * display the product cards on the page
 * 
 * @param {[Object]} product array of products
 */
function displayProducts(product) {
    console.log(product);
    const itemsElement = document.getElementById('items');

    //TODO iterate over stuff that came from the backend API(array of articles from the demo)

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        itemsElement.innerHTML += `
        <a href="./product.html?id=${product._id}">
          <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
          </article>
        </a>
        `;
    }
}
