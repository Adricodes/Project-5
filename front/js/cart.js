const cartElement = document.getElementById('cart__items');
const totalQuantityElement = document.getElementById('totalQuantity');
const currentTotalPrice = document.getElementById('totalPrice');
const cart = JSON.parse(localStorage.getItem('cart') || "[]");

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

  const currentTotalQuantity = parseInt(totalQuantityElement.innerText || 0);
  totalQuantityElement.innerText = cartItem.quantity + currentTotalQuantity;

  const totalPrice = parseInt(currentTotalPrice.innerText || 0);
  currentTotalPrice.innerText = product.price * cartItem.quantity + totalPrice;

  const deleteItemLink = articleElement.querySelector('.deleteItem');
  const inputElement = articleElement.querySelector('.itemQuantity')

  deleteItemLink.addEventListener('click', function ($event) {
    const clickedElement = $event.target;
    const articleElementClicked = clickedElement.closest("article")
    const idProductDeleted = articleElementClicked.dataset.id
    const colorProductDeleted = articleElementClicked.dataset.color
    let cart = JSON.parse(localStorage.getItem('cart') || "[]");

    function isItemToNotDelete(cartItem) {
      return !(cartItem.productId === idProductDeleted && cartItem.color === colorProductDeleted);
    }
    cart = cart.filter(isItemToNotDelete)
    localStorage.setItem("cart", JSON.stringify(cart));
    articleElementClicked.remove();
  })

  inputElement.addEventListener('change', function ($event) {
    const clickedItemToChange = $event.target;
    const quantity = parseInt(clickedItemToChange.value);
    const articleClickedToChange = clickedItemToChange.closest('article')
    const idProductToChange = articleClickedToChange.dataset.id
    const colorProductToChange = articleClickedToChange.dataset.color
    const cart = JSON.parse(localStorage.getItem('cart') || "[]");
    const cartItemToChange = cart.find(item => item.productId === idProductToChange && item.color === colorProductToChange)
    if (cartItemToChange) {
      cartItemToChange.quantity = quantity;
    }
    else {
      cart.push(selectedProduct);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  });
}