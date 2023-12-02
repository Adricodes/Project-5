const cartElement = document.getElementById('cart__items');

const cart = JSON.parse(localStorage.getItem('cart') || "[]");
console.log(cart);
// TODO iterate over the cart and look at each item inside of it
for (let i = 0; i < cart.length; i++) {
  const cartItem = cart[i];
  console.log(cartItem.productId)

// TODO inside the for loop grab product id for the current cart item and fetch its product from the backend using fetch API
//     and use the information for this cart item along with its product information to insert a card in the page

fetch(`http://localhost:3000/api/products/${cartItem.productId}`)
  .then(data => {
    return data.json();
  })
  .then(product => {
    displayProducts(product);
  });

function displayProducts(product) {
  console.log(cart);
  const cartElement = document.getElementById('cart__items');
  cartElement.innerHTML += `
  <article class="cart__item" data-id="{productId}" data-color="{product-color}">
  <div class="cart__item__img">
    <img src="${product.imageUrl}" alt="${product.altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>"${product.name}"</h2>
      <p>"${product.colors}"</p>
      <p>"${product.price}"</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Quantity : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItem.quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Delete</p>
      </div>
    </div>
  </div>
</article>
`
;
}
}
  