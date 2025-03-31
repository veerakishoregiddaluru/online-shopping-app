const divProductsContainer = document.getElementById("divproductscontainer");
const cartsContainer = document.getElementById("cartscontainer");
const clearAll = document.getElementById("clearall");
const sortBy = document.getElementById("sortBy");
const feedBack = document.getElementById("feedback");
const tSum = document.getElementById("totalprice");

const canNotAddSound = new Audio("notadd.wav");
const clearAllSound = new Audio("clearall.wav");
const removeSound = new Audio("remove.wav");

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
renderingProducts();
sortByPrice();
clearAllItem();

function renderingProducts() {
  products.forEach(function (product) {
    const productRow = `<div class="productscontainer"><p>${product.name} - Rs. ${product.price}</p>
  
          <button id="productscontainerbtn" onclick="addToCart(${product.id} 
          )">Add to Cart</button></div>
        `;

    divProductsContainer.insertAdjacentHTML("beforeend", productRow);
  });
}

function addToCart(id) {
  const isProductAvailable = cart.some(function (product) {
    return product.id === id;
  });
  if (isProductAvailable) {
    updatedUserFeedback(`Item Already Added to the Cart`, "error");
    canNotAddSound.pause;
    canNotAddSound.currentTime = 0;
    canNotAddSound.play();
    return;
  }
  const productToAdd = products.find(function (product) {
    return product.id === id;
  });

  cart.push(productToAdd);
  console.log(productToAdd);
  renderDetails();
  // console.log((feedBack.textContent = `${name} Added to the Cart`));
  updatedUserFeedback(`${productToAdd.name} Added to the Cart`, "success");
}

function removeFromCart(id) {
  // const updatedCart = cart.filter(function (products) {
  //   return products.id !== id;
  // });
  removeSound.pause;
  removeSound.currentTime = 0;
  removeSound.play();
  const productToAdd = products.find(function (product) {
    return product.id === id;
  });
  const findIndex = cart.findIndex((product) => {
    return product.id === id;
  });

  const spliceResult = cart.splice(findIndex, 1);

  updatedUserFeedback(`${productToAdd.name} Removed from th cart`, "error");
  renderDetails();
}

function renderDetails() {
  cartsContainer.innerHTML = "";
  cart.forEach((product) => {
    const { id, name, price } = product;
    const cartRow = `<div class="cartscontainer" ><p>${name} - ${price}</p>

        <button onclick="removeFromCart(${id})">Remove</button></div>`;

    cartsContainer.insertAdjacentHTML("beforeend", cartRow);
  });
  // let totalSum = 0;
  // for (let i = 0; i < cart.length; i++) {
  //   totalSum = totalSum + cart[i].price;
  // }

  const totalSum = cart.reduce(function (acc, curProduct) {
    return acc + curProduct.price;
  }, 0);

  tSum.textContent = `Total Amount Rs.${totalSum}`;
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

function clearAllItem() {
  clearAll.addEventListener("click", function () {
    console.log("Clear all", cart);
    cart.length = 0;
    renderDetails();
    updatedUserFeedback("Cart Cleared!", "success");
    clearAllSound.pause;
    clearAllSound.currentTime = 0;
    clearAllSound.play();
  });
}

function sortByPrice() {
  sortBy.addEventListener("click", function () {
    cart.sort(function (item1, item2) {
      return item1.price - item2.price;
    });
    renderDetails();
  });
}
