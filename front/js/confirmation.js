const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get('confirmation')

const orderElement = document.getElementById('orderId');
orderElement.innerHTML = orderId;

