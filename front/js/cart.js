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
    updateTotals(-quantityChange, cartItemPrice)

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


const firstNameRegex = /^[a-zA-Z]+$/;
const firstNameInputElement = document.getElementById('firstName');
const firstNameMessageElement = document.getElementById('firstNameErrorMsg');
firstNameInputElement.addEventListener('change', function ($event) {
  const firstName = $event.target.value;
  // if (firstNameRegex.test(firstName)) {
  validateFirstName(firstName);
})

function validateFirstName(firstName) {
  const isValid = firstNameRegex.test(firstName);

  if (isValid) {
    firstNameMessageElement.innerText = ''
  } else {
    firstNameMessageElement.innerText = 'First Name entered is not valid'
  }
  return isValid
}

const lastNameRegex = /^[a-zA-Z]+$/;
const lastNameInputElement = document.getElementById('lastName');
const lastNameMessageElement = document.getElementById('lastNameErrorMsg');
lastNameInputElement.addEventListener('change', function ($event) {
  const lastName = $event.target.value;
  validateLastName(lastName);
})

function validateLastName(lastName) {
  const isValid = lastNameRegex.test(lastName);

  if (isValid) {
    lastNameMessageElement.innerText = ''
  } else {
    lastNameMessageElement.innerText = 'Last Name entered is not valid'
  }
  return isValid
}

// TODO add change event listener for address using regex using [A-Za-z0-9'\.\-\s\,]
const addressRegex = /^[0-9a-zA-Z\s.,#-]+$/;
const addressInputElement = document.getElementById('address');
const addressMessageElement = document.getElementById('addressErrorMsg');
addressInputElement.addEventListener('change', function ($event) {
  const address = $event.target.value;
  if (addressRegex.test(address)) {
    addressMessageElement.innerText = ''
  } else {
    addressMessageElement.innerText = 'Address entered is not valid'
  }
  return isValid
})

const cityRegex = /^[a-zA-Z]+(?:[ -][a-zA-Z]+)*$/;
const cityInputElement = document.getElementById('city');
const cityMessageElement = document.getElementById('cityErrorMsg');
cityInputElement.addEventListener('change', function ($event) {
  const city = $event.target.value;
  if (cityRegex.test(city)) {
    cityMessageElement.innerText = ''
  } else {
    cityMessageElement.innerText = 'City entered is not valid'
  }
  return isValid
})

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const emailInputElement = document.getElementById('email');
const emailMessageElement = document.getElementById('emailErrorMsg');
emailInputElement.addEventListener('change', function ($event) {
  const email = $event.target.value;
  if (emailRegex.test(email)) {
    emailMessageElement.innerText = ''
  } else {
    emailMessageElement.innerText = 'Email entered is not valid'
  }
  return isValid
})

// TODO add click event listener for order button
// TODO inside click event listener disable default behavior of the button 
const orderButtonElement = document.getElementById('order');
orderButtonElement.addEventListener('click', function ($event) {
  $event.preventDefault();
})

// TODO icel validate user contact information one last time maybe use reusable function

function validateForm() {
  const isValid = validateFirstName(firstNameInputElement.value)
  // TODO isValid = && validateFirstName(...);etc
  console.log(isValid)
}

// TODO icel create the request body with the contact object and the products array(NOTE look at using the array map method to creates the products array from thecart in local strage
// TODO icel submit the order using fetch API (POST request)
// TODO icel get the order confirmation ID from the response
// TODO icel redirect the user to the confirmatin page with the confirmation ID in the URL NOTE use location.assign method to redirect the user to the comnfirmation page withthe confirmation ID in the URL