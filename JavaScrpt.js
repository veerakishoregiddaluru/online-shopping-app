const divProductsContainer = document.getElementById("divproductscontainer");
const cartsContainer = document.getElementById("cartscontainer");
const feedBack = document.getElementById("feedback");

const cart = [];
const products = [
  {
    id: 1,
    name: "Buds",
    price: 1500,
  },
  {
    id: 2,
    name: "Mobile",
    price: 15000,
  },
  {
    id: 3,
    name: "Charger",
    price: 500,
  },
  {
    id: 4,
    name: "Power Bank",
    price: 2000,
  },
  {
    id: 5,
    name: "HeadPhones",
    price: 3000,
  },
];

products.forEach(function (product) {
  const productRow = `<div class="productscontainer"><p>${product.name} - ${product.price}</p>

        <button id="productscontainerbtn" onclick="addToCart(${product.id} 
        )">Add to Cart</button></div>
      `;

  divProductsContainer.insertAdjacentHTML("beforeend", productRow);
});

function addToCart(id) {
  const isProductAvailable = cart.some(function (product) {
    return product.id === id;
  });
  if (isProductAvailable) {
    updatedUserFeedback(`Item Already Added to the Cart`, "error");
    return;
  }
  const productToAdd = products.find(function (product) {
    return product.id === id;
  });
  cart.push(productToAdd);
  console.log(productToAdd);
  const { id: myId, name, price } = productToAdd;
  const cartRow = `<div class="cartscontainer" ><p>${name} - ${price}</p>

        <button>Remove</button></div>`;

  cartsContainer.insertAdjacentHTML("beforeend", cartRow);
  console.log((feedBack.textContent = `${name} Added to the Cart`));
  updatedUserFeedback(`${name} Added to the Cart`, "success");
}
let timerId;
function updatedUserFeedback(msg, type) {
  clearTimeout(timerId);
  feedBack.style.display = "block";
  if (type === "success") {
    feedBack.style.backgroundColor = "green";
    feedBack.style.color = "white";
  }
  if (type === "error") {
    feedBack.style.backgroundColor = "red";
    feedBack.style.color = "white";
  }
  feedBack.textContent = msg;
  timerId = setTimeout(() => {
    feedBack.style.display = "none";
  }, 3000);
}
