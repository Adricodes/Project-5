// TODO Milestone 5

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id')

fetch(`http://localhost:3000/api/products/${productId}`)
  .then(data => {
    return data.json();
  })
  .then(product => {
    displayProducts(product);
  });

function displayProducts(product) {
  console.log(product);
  const itemElement = document.querySelector('.item__img');
  itemElement.innerHTML= `<img src="${product.imageUrl}" alt="${product.altTxt}">`;


  //         itemElement.innerHTML += `

  //       <div class="item__img">
  //       <!-- <img src="../images/logo.png" alt="Photo of a sofa"> -->
  //        <img src="${product.imageUrl}" alt="${product.altTxt}"> 
  //       </div>
  //       <div class="item__content">

  //         <div class="item__content__titlePrice">
  //           <h1 id="title">><!--"${product.name}" --></h1>
  //           <p>Prix : <span id="price"><!--"${product.price}"--></span>€</p>
  //         </div>

  //         <div class="item__content__description">
  //           <p class="item__content__description__title">Description:</p>
  //           <p id="description"><!--"${product.description}" --></p>
  //         </div>

  //         <div class="item__content__settings">
  //           <div class="item__content__settings__color">
  //             <label for="color-select">Chose your color:</label>
  //             <select name="color-select" id="colors">
  //             <!-- <option value="vert">"${product.colors}"</option>
  //                      option value="blanc">"-->${product.colors}"</option>
  // </option>  -->
  //             </select>
  //           </div>

  //      </div>
  //         `;
}
