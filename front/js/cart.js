const cartElement = document.getElementById('cart__items');
const totalQuantityElement = document.getElementById('totalQuantity');
const currentTotalPrice = document.getElementById('totalPrice');
const cart = JSON.parse(localStorage.getItem('cart') || "[]");
const cartProducts = [];

for (let i = 0; i < cart.length; i++) {
  const cartItem = cart[i];

  fetch(`http://localhost:3000/api/products/${cartItem.productId}`)
    .then(data => {
      return data.json();
    })
    .then(product => {
      displayProducts(product, cartItem);
    });
}

function displayProducts(product, cartItem) {
  const articleElement = document.createElement('article');

  if (!cartProducts.find(p => p.__id === product.__id)) {
    cartProducts.push(product)
  }

  articleElement.dataset.id = cartItem.productId;
  articleElement.dataset.color = cartItem.color;
  articleElement.className = "cart__item";
  articleElement.innerHTML = `
  <div class='cart__item__img'>
  <img src=${product.imageUrl} alt="${product.altTxt}">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${product.name}</h2>
    <p>${cartItem.color}</p>
    <p>€${product.price}</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Quantity : </p>
      <input type="number" class="itemQuantity" 
          name="itemQuantity" min="1" max="100" 
          value="${cartItem.quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Delete</p>
    </div>
  </div>
</div>
`;

  cartElement.appendChild(articleElement);
  updateTotals(cartItem.quantity, product.price);

  const deleteItemLink = articleElement.querySelector('.deleteItem');
  const inputElement = articleElement.querySelector('.itemQuantity');

  deleteItemLink.addEventListener('click', function ($event) {
    const clickedElement = $event.target;
    const articleElementClicked = clickedElement.closest("article")
    const idProductDeleted = articleElementClicked.dataset.id
    const colorProductDeleted = articleElementClicked.dataset.color
    let cart = JSON.parse(localStorage.getItem('cart') || "[]");
    function isItemToNotDelete(cartItem) {
      return !(cartItem.productId === idProductDeleted && cartItem.color === colorProductDeleted);
    }

    const cartItemToDeleted = cart.find(item => item.productId === idProductDeleted && item.color === colorProductDeleted);
    const quantityChange = cartItemToDeleted.quantity;
    console.log(cartProducts)
    const cartItemPrice = cartProducts.find(item => item._id === idProductDeleted).price;

    updateTotals(-quantityChange, cartItemPrice)
    cart = cart.filter(item => isItemToNotDelete(item));
    localStorage.setItem("cart", JSON.stringify(cart));
    articleElementClicked.remove();
  });

  inputElement.addEventListener('change', function ($event) {
    const clickedElement = $event.target;
    let quantityChange = parseInt(clickedElement.value);
    const articleElementClicked = clickedElement.closest("article")
    const idProductToChange = articleElementClicked.dataset.id
    const colorProductToChange = articleElementClicked.dataset.color
    const cart = JSON.parse(localStorage.getItem('cart') || "[]");
    const cartItemToChange = cart.find(item => item.productId === idProductToChange && item.color === colorProductToChange)
    console.log(cartItemToChange)
    if (cartItemToChange) {
      const oldQuantity = cartItemToChange.quantity;
      cartItemToChange.quantity = quantityChange;
      quantityChange = oldQuantity - quantityChange;
    }


    localStorage.setItem("cart", JSON.stringify(cart));
    // TODO update totals using new function

    // FIXME need to calculate quantityChange by substracting old quantity from new quantity (this will make negative value if quantity decreased)
    // FIX ME total price is only showing after refreshing browser
    const cartItemPrice = cartProducts.find(item => item._id === idProductToChange).price;
    console.log(quantityChange)
    updateTotals(quantityChange, cartItemPrice)

  })
    ;
}

function updateTotals(quantityChange, cartItemPrice) {
  const currentTotalQuantity = parseInt(totalQuantityElement.innerText || 0);
  totalQuantityElement.innerText = quantityChange + currentTotalQuantity;
  const totalPrice = parseInt(currentTotalPrice.innerText || 0);
  currentTotalPrice.innerText = cartItemPrice * quantityChange + totalPrice;
}

// TODO validate customer information
const firstName = document.getElementById('firstName').value;
const lastName = document.getElementsById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');
const orderArea = document.getElementById('order');
const WhatIsYourName = 'Charles Chaplin';
console.log(firstName)

// function validateFirstName(firstName) {
//   const firstNameRegex =  /^[a-zA-Z]+([ \-']{0,1}[a-zA-Z]+){0,2}$/;
//   return firstNameRegex.test(firstName);


if (validateFirstName(WhatIsYourName)) {
  console.log("OK Name!");
} else {
  console.log("Try Again!");
}
  // if (!firstNameRegex.test(firstName).value) {
  //   invalidInput('First name invalid');
  // } else {
  //   alert('First name valid');
  //   return true;
  // }

