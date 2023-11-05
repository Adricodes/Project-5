// TODO Milestone 5
// const queryString = window.location.search;

// const urlParams = new URLSearchParams(queryString);

// const productId = urlParams.get('id')

// console.log(productId);

fetch('http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926')
    .then(data => {
        return data.json();
    })
    .then(product_id => {
        displayProduct(product_id);
    });

// /**
//  * display the product cards on the page
//  * 
//  * @param {[Object]} product_id array of products
//  */
function displayProduct(product_id) {
    console.log(product_id);
    const productElement = document.getElementsByClassName("item_img");

    //TODO iterate over stuff that came from the backend API(array of articles from the demo)

    // for (let i = 0; i < products.length; i++) {
    //     const product = products[i];

    productElement.innerHTML += `
        <img src="../images/logo.png" alt="Photo of a sofa"> 
        `;
}

