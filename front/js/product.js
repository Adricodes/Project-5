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

/**
 * Display products on page
 * 
 * @param {object} product - product to display
 */
function displayProducts(product) {
  console.log(product);
  const itemElement = document.querySelector('.item__img');
  itemElement.innerHTML = `
  <img src="${product.imageUrl}" alt="${product.altTxt}">
    `
    ;
    

  const priceElement = document.getElementById('price');
  priceElement.innerText = product.price;

  const descriptionElement = document.getElementById('description');
  descriptionElement.innerText = product.description;


  const colorElement = document.getElementById('colors');

  for (let i = 0; i < product.colors.length; i++) {
    colorElement.innerHTML += `
  <option value="${product.colors[i]}">${product.colors[i]}</option>
      `
      ;
  }

  const cartItems = [product._id, product.colors];

  const productQuantity = (product, 'itemQuantity');
  const productQuantityPushed = cartItems.push(product.itemQuantity);
  console.log(cartItems);

  /**
   * display cartItems on page
   * @param {object} cartItems items to be purchased
   */
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

  const stringNumber = selectedQuantity;
  const number = parseInt(stringNumber);
  console.log(number);

  const selectedProduct = {
    productId: productId,
    color: selectedColor,
    quantity: number,
  }

  const cart = JSON.parse(localStorage.getItem('cart') || "[]");

  const findIteminCart = cart.find(item => item.productId === selectedProduct.productId && item.color === selectedProduct.color);

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
  alert('Product added to cart')
});