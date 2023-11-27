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
  itemElement.innerHTML = `
  <img src="${product.imageUrl}" alt="${product.altTxt}">
    `
    ;

  const titleElement = document.getElementById('title');
  titleElement.innerText = `
    ${product.name}
    `
    ;

  const priceElement = document.getElementById('price');
  priceElement.innerText = `
    ${product.price}
    `
    ;

  const descriptionElement = document.getElementById('description');
  descriptionElement.innerText = `
      ${product.description}
      `
    ;

  const colorElement = document.getElementById('colors');

  for (let i = 0; i < product.colors.length; i++) {
    colorElement.innerHTML += `
  <option value="${product.colors[i]}">${product.colors[i]}</option>
      `
      ;
  }

  //cart array
  const cartItems = [product._id, product.colors];

  const productQuantity = (product, 'itemQuantity');
  const productQuantityPushed = cartItems.push(product.itemQuantity);
  console.log(cartItems);

  function addToCart(cartItems) {
    itemPurchased = product.find((product) => cartItems === cartItems);
    cartItems.push(itemPurchased);

    console.log(cartItems);
  }
}
const addToCartButton = document.getElementById('addToCart');
addToCartButton.addEventListener('click', () => {
  console.log(productId);
  const colorSelectElement = document.getElementById('colors');
  const selectedColor = colorSelectElement.value;
  console.log(colorSelectElement.value);
  const quantityElement = document.getElementById('quantity');
  const selectedQuantity = quantityElement.value
  console.log(quantityElement.value);

  const stringNumber = selectedProduct.quantity;
  const number = parseInt(stringNumber); 
  console.log(number); 

  const selectedProduct = {
    productId: productId,
    color: selectedColor,
    quantity: number,
  }

  const cart = JSON.parse(localStorage.getItem('cart') || "[]");

  //  Find item in cart

  const findIteminCart = cart.find(item => item.productId === selectedProduct.productId && item.color === selectedProduct.color);

  // went to line 74-76
  // const stringNumber = selectedProduct.quantity;
  // const number = parseInt(stringNumber);
  // console.log(number); 

  if (findIteminCart) {
    findIteminCart.quantity += number;
  }
  else {
    // If the item is not found, add the entire product to the cart
    cart.push(selectedProduct);
    console.log(selectedProduct);

  }
  console.log(cart);

  //NOTE If there is not a product with the id in the cart simply ad it
  // but if we do find a product with the same color then we need to add to the quantity
  //NOTE if you find a product with the sam eid but a different color just add it

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
});