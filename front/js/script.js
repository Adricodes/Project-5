console.log("kanap-backend")

fetch('http://localhost:3000/api/products')
    .then(data => {
        return data.json();
    })
    .then(products => {
        displayProducts(products);
    });

function displayProducts(products) {
    console.log(products);
    const items = document.getElementById('items');
    // TODO use javascript loop to display all parts
    const product= products[0];
    items.innerHTML += `
          <a href="./product.html?id=42">
            <article>
              <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a>
    `
}

