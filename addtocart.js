const product = [
  {
    id: 0,
    image: '1.jpeg',
    title: 'Zenith Air Max',
    price: 3999,
  },
  {
    id: 1,
    image: '2.jpg',
    title: 'Aurora TuneX',
    price: 2999,
  },
  {
    id: 2,
    image: '3.jpg',
    title: 'Sandstone Serenity',
    price: 3999,
  },
  {
    id: 3,
    image: '4.jpg',
    title: 'Midnight Echo',
    price: 2499,
  },
  {
    id: 4,
    image: '5.jpeg',
    title: 'Midnight Aer',
    price: 2499,
  },
  {
    id: 5,
    image: '6.jpeg',
    title: 'Sandstone Solicis',
    price: 2499,
  },
  {
    id: 6,
    image: '7.jpeg',
    title: 'Aurora TuneY',
    price: 2499,
  },
  {
    id: 7,
    image: '8.jpeg',
    title: 'Midweek Blacks',
    price: 2499,
  },
];
const categories = [...new Set(product.map((item) => item))];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const productsPerPage = 5;
let currentPage = 1; 

function renderProducts(filteredProducts = categories) {
  let productsToShow = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  document.getElementById('root').innerHTML = productsToShow.map((item) => {
    let originalIndex = categories.indexOf(item); 
    let cartItem = cart.find(cartItem => cartItem.id === item.id);
    let quantity = cartItem ? cartItem.quantity : 0;

    return `
      <div class='box'>
        <div class='img-box'>
          <img class='images' src=${item.image}></img>
        </div>
        <div class='bottom'>
          <p>${item.title}</p>
          <h2><span>&#8377;</span> ${item.price}.00</h2>
          <div class="ctrls" id="cart-controls-${item.id}">
            ${quantity > 0 ? `
              <button class="dec" onclick="decrement(${originalIndex})"> - </button>
              <span class="quant">${quantity}</span>
              <button class="inc" onclick="increment(${originalIndex})"> + </button>
            ` : `<button onclick="addtocart(${originalIndex})">Add to cart</button>`}
          </div>
        </div>
      </div>`;
  }).join('');

  updatePaginationButtons(filteredProducts);
}

function addtocart(originalIndex) {
  let item = categories[originalIndex];
  let cartItem = cart.find(cartItem => cartItem.id === item.id);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function increment(index) {
  let item = categories[index];
  let cartItem = cart.find(cartItem => cartItem.id === item.id);
  if (cartItem) {
    cartItem.quantity += 1;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
  document.getElementById("count").innerHTML = cart.length;
}

function decrement(index) {
  let item = categories[index];
  let cartItem = cart.find(cartItem => cartItem.id === item.id);
  if (cartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      cart = cart.filter(cartItem => cartItem.id !== item.id);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  renderProducts();
  displaycart(); 
}

function filterProducts() {
  let input = document.getElementById("searchBox").value.toLowerCase().trim();
  let filteredProducts = categories.filter(item => item.title.toLowerCase().includes(input));
  currentPage = 1; 
  renderProducts(filteredProducts); 
}

document.getElementById("next").addEventListener("click", function() {
  if (currentPage < Math.ceil(categories.length / productsPerPage)) {
    currentPage++;
    renderProducts();
  }
});

document.getElementById("prev").addEventListener("click", function() {
  if (currentPage > 1) {
    currentPage--;
    renderProducts();
  }
});

function updatePaginationButtons(filteredProducts = categories) {
  document.getElementById("prev").style.display = (currentPage === 1) ? "none" : "inline-block";
  document.getElementById("next").style.display = (currentPage === Math.ceil(filteredProducts.length / productsPerPage)) ? "none" : "inline-block";
}
renderProducts();


