//  TODO get order id from url parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const getProductId = urlParams.get(orderId);


fetch('http://localhost:3000/api/products/order',
    {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    })
    .then(response => response.json())
    .then(data => {
        const orderId = data.orderId;
        console.log(orderId)
    })
    .catch(error => console.error(error));

const orderElement = document.getElementById('#order');
console.log(orderElement)
