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
    const product = products[0];
    items.innerHTML += `
          <a href="./product.html?id=42">
            <article>
              <img src="${product.imageUrl}" alt="Photo of a blue sofa, two seats">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </article>
          </a>
    `
}

const imageList= [
"http://localhost:3000/images/kanap01.jpeg", "http://localhost:3000/images/kanap02.jpeg",
"http://localhost:3000/images/kanap03.jpeg", "http://localhost:3000/images/kanap04.jpeg"];

for (let i = 0; i < imageList.length; i++) {
        console.log('items');
};
// }
// const images= [image];
// const imageSource= "${product.imageUrl}";
// const homepageImages= document.getElementById('items');

// for (let i=0; i<images.length;i++){
//     const img=document.createElement('img');
//     img.src="${product.imageUrl}";
//     homepageImages.appendChild(img);
// }