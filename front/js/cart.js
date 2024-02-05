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

/** display items available to purchase 
 * 
 * @param {object} product items available to purchase
 * @param {object} cartItem item displayed in cart
 */
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

    const cartItemPrice = cartProducts.find(item => item._id === idProductToChange).price;
    console.log(quantityChange)
    updateTotals(-quantityChange, cartItemPrice)
  })
}

/**
 * Displays changes in quantity and price in cart
 * @param {object} quantityChange 
 * @param {object} cartItemPrice 
 */
function updateTotals(quantityChange, cartItemPrice) {
  const currentTotalQuantity = parseInt(totalQuantityElement.innerText || 0);
  totalQuantityElement.innerText = quantityChange + currentTotalQuantity;
  const totalPrice = parseInt(currentTotalPrice.innerText || 0);
  currentTotalPrice.innerText = cartItemPrice * quantityChange + totalPrice;
}

const firstNameRegex = /^[a-zA-Z]+$/;
const firstNameInputElement = document.getElementById('firstName');
const firstNameMessageElement = document.getElementById('firstNameErrorMsg');
firstNameInputElement.addEventListener('change', function ($event) {
  const firstName = $event.target.value;
  validateFirstName(firstName);
})

/**
 * Shows customer input information if it's valid
 * @param {pbject} firstName 
 * @returns 
 */
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

const addressRegex = /^[0-9]{1,5}[a-z-A-Z\s]{2,8}[a-z-A-Z -.,]{3,40}$/;
const addressInputElement = document.getElementById('address');
const addressMessageElement = document.getElementById('addressErrorMsg');
addressInputElement.addEventListener('change', function ($event) {
  const address = $event.target.value;
  validateAddress(address);
})

function validateAddress(address) {
  const isValid = addressRegex.test(address);

  if (isValid) {
    addressMessageElement.innerText = ''
  } else {
    addressMessageElement.innerText = 'Address entered is not valid'
  }
  return isValid
}

const cityRegex = /^[a-zA-Z]+(?:[ -][a-zA-Z]+)*$/;
const cityInputElement = document.getElementById('city');
const cityMessageElement = document.getElementById('cityErrorMsg');
cityInputElement.addEventListener('change', function ($event) {
  const city = $event.target.value;
  validateCity(city);
})
function validateCity(city) {
  const isValid = cityRegex.test(city);

  if (isValid) {
    cityMessageElement.innerText = ''
  } else {
    cityMessageElement.innerText = 'City entered is not valid'
  }
  return isValid
}

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const emailInputElement = document.getElementById('email');
const emailMessageElement = document.getElementById('emailErrorMsg');
emailInputElement.addEventListener('change', function ($event) {
  const email = $event.target.value;
  validateEmail(email);
})
function validateEmail(email) {
  const isValid = emailRegex.test(email);

  if (isValid) {
    emailMessageElement.innerText = ''
  } else {
    emailMessageElement.innerText = 'Email entered is not valid'
  }
  return isValid
}


const orderButtonElement = document.getElementById('order');
orderButtonElement.addEventListener('click', function ($event) {
  $event.preventDefault();
  const isValid = validateForm();

  if (isValid) {
    const products = cart.map(item => item.productId)
    const order = {
      "contact": {
        "firstName": firstNameInputElement.value,
        "lastName": lastNameInputElement.value,
        "address": addressInputElement.value,
        "city": cityInputElement.value,
        "email": emailInputElement.value
      },
      "products": products,
    }
    fetch('http://localhost:3000/api/products/order',
      {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      })
      .then(response => response.json())
      .then(data => {
        const orderId = data.orderId;
        console.log(orderId)
        // TODO icel redirect the user to the confirmatin page with the confirmation ID  
        //in the URL NOTE use location.assign method to redirect the user to the comnfirmation 
        //page withthe confirmation ID in the URL
      })
      .catch(error => console.error(error));
  }


  const confirmationDirect = 'http://127.0.0.1:5500/front/html/confirmation.html?confirmation=65431343444684674'
  location.assign(confirmationDirect)

})

function validateForm() {
  let isValid = validateFirstName(firstNameInputElement.value);
  isValid = validateLastName(lastNameInputElement.value) && isValid;
  isValid = validateAddress(addressInputElement.value) && isValid;
  isValid = validateEmail(emailInputElement.value) && isValid;
  isValid = validateCity(cityInputElement.value) && isValid;
  isValid = validateEmail(emailInputElement.value) && isValid;
  return isValid;
}