const cartElement = document.getElementById('cart__items');
const totalQuantityElement = document.getElementById('totalQuantity');
const currentTotalPrice = document.getElementById('totalPrice');
const cart = JSON.parse(localStorage.getItem('cart') || "[]");
console.log(cart);

for (let i = 0; i < cart.length; i++) {
  const cartItem = cart[i];
  console.log(cartItem.productId)

  fetch(`http://localhost:3000/api/products/${cartItem.productId}`)
    .then(data => {
      return data.json();
    })
    .then(product => {
      displayProducts(product, cartItem);
    });
}

function displayProducts(product, cartItem) {
  console.log(cart);
  // FIXME change curly brace productID to cartProductId
  // FIXME change curly brace other color to cartItem color
  cartElement.innerHTML += `
<article class="cart__item" data-id=${cartItem.productId} data-color=${cartItem.color}>
<div class="cart__item__img">
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
</article>
`
  // TODO update total quantity on webpage
  const currentTotalQuantity = parseInt(totalQuantityElement.innerText || 0);
  totalQuantityElement.innerText = cartItem.quantity + currentTotalQuantity;

  const totalPrice = parseInt(currentTotalPrice.innerText || 0);
  currentTotalPrice.innerText = product.price * totalPrice;

  // price for cart items


  // Get the total and display it


  // You can then display the total in your HTML or use it as needed



  // first thing: where is the current price coming from on the page? 
  // And if it is an empty string, what should the value be instead so 
  // that we can add the first cart item price to it?




}
