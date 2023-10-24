console.log("vogue")
// TODO Milestone 5

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const productId = urlParams.get('id')

console.log(productId);