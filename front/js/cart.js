const cartElement = document.getElementById('cart__items');
const totalQuantityElement = document.getElementById('totalQuantity');
const currentTotalPrice = document.getElementById('totalPrice');
// const deleteCartItem = document.getElementsByClassName('deleteItem');
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

  const articleElement = document.createElement('article');
  // TODO add "class", "data-id", and "data-color" attributes to articleElement using Javascript
  // for "class" see https://developer.mozilla.org/en-US/docs/Web/API/Element/classname

  // for data attributes see https://developer.mozilla.org/en-US/docs/learn/html/howto/use_data_attributes
  articleElement.innerHTML = `
<article class="cart__item" data-id=${cartItem.productId} data-color="${product.color}"
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
</article> 
`
    ;

  // TODO append the articleElement to the createElement
  // see https://developer.mozilla.org/en-US/docs/web/api/document/append


  // TODO add event listeners to the articleElement.querySelector('.deleteItem')for now let the event listener
  // see https://developer.mozilla.org/en-US/docs/web/api/eventtarget/addeventlistener

  cartElement.innerHTML += `
<article class="cart__item" data-id=${cartItem.productId} data-color=${cartItem.color}>
`
    ;

  const currentTotalQuantity = parseInt(totalQuantityElement.innerText || 0);
  totalQuantityElement.innerText = cartItem.quantity + currentTotalQuantity;

  const totalPrice = parseInt(currentTotalPrice.innerText || 0);
  currentTotalPrice.innerText = product.price * cartItem.quantity + totalPrice;

// const removeItems = document.getElementsByClassName('deleteItem');
// for (let cartItem of cart) {
//   cartElement.addEventListener("click", function () {
//     console.log(removeItems)};