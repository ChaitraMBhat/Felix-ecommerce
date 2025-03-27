function displaycart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  document.getElementById("count").innerHTML = cart.length;

  if (cart.length === 0) {
    document.getElementById("cartItem").innerHTML ="Your cart is empty";
    document.getElementById("total").innerHTML = "₹ 0.00";
    document.getElementById("checkoutBtn").style.display = "none";
  } else {
    document.getElementById("cartItem").innerHTML = cart.map((item, index) => {
      total += item.price * item.quantity;
      return `
        <div class='cart-item'>
          <div class='row-img'>
            <img class='rowimg' src=${item.image}>
          </div>
          <p>${item.title}</p>
          <h2>₹ ${item.price}.00</h2>
          <p>Quantity: ${item.quantity}</p>
          <i class='bx bxs-trash-alt' onclick='removeFromCart(${index})'></i>
        </div>
      `;
    }).join('');

    document.getElementById("total").innerHTML = "₹ " + total + ".00";
    document.getElementById("checkoutBtn").style.display = "block";
  }
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displaycart();
  document.getElementById("count").innerHTML = cart.length; 
}

function checkout() {
  localStorage.removeItem("cart"); 
  displaycart(); 
  document.getElementById("count").innerHTML = 0; 
}

window.onload = displaycart;
