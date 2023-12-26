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

  const articleElement = document.createElement('article');

  articleElement.dataset.id = cartItem.productId;
  articleElement.dataset.color = cartItem.color;
  articleElement.className = "cart__item";
  // articleElement.input.value = cartItem.quantity;


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
`
    ;

  cartElement.appendChild(articleElement);

  const currentTotalQuantity = parseInt(totalQuantityElement.innerText || 0);
  totalQuantityElement.innerText = cartItem.quantity + currentTotalQuantity;

  const totalPrice = parseInt(currentTotalPrice.innerText || 0);
  currentTotalPrice.innerText = product.price * cartItem.quantity + totalPrice;

  const deleteItemLink = articleElement.querySelector('.deleteItem');


  // TODO remove selected item from cart in LocalStorage

  deleteItemLink.addEventListener('click', function ($event) {
    const clickedElement = $event.target;

    const articleElementClicked = clickedElement.closest("article")
    const idProductDeleted = articleElementClicked.dataset.id
    const colorProductDeleted = articleElementClicked.dataset.color
    console.log(idProductDeleted)

    let cart = JSON.parse(localStorage.getItem('cart') || "[]");

    function isItemToNotDelete(cartItem) {
      return !(cartItem.productId === idProductDeleted && cartItem.color === colorProductDeleted);
    }
    cart = cart.filter(isItemToNotDelete)
    localStorage.setItem("cart", JSON.stringify(cart));

    // TODO remove articleElementClicked from web page

    const itemToDelete = articleElementClicked.remove();
    console.log(itemToDelete);

    // const inputElement = document.querySelector('value');

    const inputElement = document.querySelector('.itemQuantity')

    // This function will be called when the quantity input changes
    inputElement.addEventListener('change', function ($event) {
      const clickedItemToChange = $event.target;

      const articleClickedToChange = clickedItemToChange.closest('article')
      const idProductToChange = articleClickedToChange.dataset.id
      const colorProductToChange = articleClickedToChange.dataset.color
      console.log(colorProductToChange)

      // TODO get a fresh cart from local storage 
      // const car=
      const cart = JSON.parse(localStorage.getItem('cart') || "[]");


      // FIXME create a new function for cart.find(...) which checks for the product id 
      // and color in the cart
      // const cartItemToChange = cart.find(...)
      const cartItemToChange = cart.find(item => item.productId === selectedProduct.productId && item.color === selectedProduct.color)
      if (findIteminCart) {
        findIteminCart.quantity += number;
      }
      else {
        cart.push(selectedProduct);
        console.log(selectedProduct);
      }
      console.log(cart);

      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(cart);
    });
    // let cart = cart.filter(isItemToNotDelete)
    // localStorage.setItem("cart", JSON.stringify(cart)

    // This function will be called when the quantity input changes
    

    // change quantity from input field



    // inputElement.addEventListener("change", (event) => {
    //   inputElement.textContent = ${event.target.value};
    // }
  })
  // const itemToDelete = cart(articleElementClicked.remove())
  // console.log(itemToDelete); 
  // })

}
// TODO add an EventListener for changing the quantity of cart items 
// NOTE use change addEventListener
// NOTE update the LocalStorage with the new cart

