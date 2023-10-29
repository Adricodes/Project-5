console.log("kanap-backend")

fetch('http://localhost:3000/api/products')
    .then(data => {
        return data.json();
    })
    .then(products => {
        displayProducts(products);
    });

function displayProducts(products) {
    console.log(products);
    const items = document.getElementById('items');
    // TODO use javascript loop to display all parts
    const product = products[0];
    items.innerHTML += `
          <a href="./product.html?id=42">
            <article>
              <img src="${product.imageUrl}" alt="Photo of a blue sofa, two seats">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </article>
          </a>
    `
}


// TODO get the existing element on  the page where I can insert cards (section tag?)
const itemHolder = document.getElementById('items');
console.log(itemHolder);

function insertItems(items) {
    console.log(items);
}


//TODO iterate over stuff that came from the backend API(array of articles from the demo)

for (let i = 0; i < item.length; i++) {


    // TODO AND get the current element in the array (an article for this demo)
    const item = item[i];
    console.log(item);




    // TODO AND create new card DOM element which will be inserted into the homepage 
    const itemElement = document.createElement('item');
    itemElement.setAttribute('id', item.id);
    itemElement.classList.add('item');


    // TODO AND insert current elemnents info into new cards DOM element 

    itemElement.innerHTML = `
<a href="./product.html?id=42">
  <article>
    <img src="${product.imageUrl}" alt="Photo of a blue sofa, two seats">
    <h3 class="productName">${product.name}</h3>
    <p class="productDescription">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </article>
</a>
`;

    // TODO AND append (child ) this new card DOM element to existing element on page (section tag?)

    itemHolder.appendChild('itemElement');
}
