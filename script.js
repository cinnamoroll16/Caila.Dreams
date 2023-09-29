let navbar = document.querySelector('.navbar');
let searchForm = document.querySelector('.search-form');
let cartItemsContainer = document.querySelector('.cart-items-container');
let shopButtons = document.querySelectorAll('.addToCart');
let checkoutButton = document.querySelector('.checkout');
let cartIcon = document.querySelector('#cart-btn');
let notificationBadge = document.querySelector('#cart-btn .notification-badge');

document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  searchForm.classList.remove('active');
  cartItemsContainer.classList.remove('active');
};

document.querySelector('#search-btn').onclick = () => {
  searchForm.classList.toggle('active');
  navbar.classList.remove('active');
  cartItemsContainer.classList.remove('active');
};

document.querySelector('#cart-btn').onclick = () => {
  cartItemsContainer.classList.toggle('active');
  navbar.classList.remove('active');
  searchForm.classList.remove('active');
};

window.onscroll = () => {
  navbar.classList.remove('active');
  searchForm.classList.remove('active');
  cartItemsContainer.classList.remove('active');
};

shopButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

function addToCart(e) {
  e.preventDefault();
  const parentBox = e.target.closest('.box');
  const imgSrc = parentBox.querySelector('img').src;
  const itemName = parentBox.querySelector('h3').textContent;
  const itemPrice = parentBox.querySelector('.price').textContent;

  // Check if the item is already in the cart
  const existingCartItem = Array.from(cartItemsContainer.querySelectorAll('.cart-item')).find(item => {
    return item.querySelector('.content h3').textContent === itemName;
  });

  if (existingCartItem) {
    // If the item is already in the cart, increment its quantity
    const quantityInput = existingCartItem.querySelector('.quantity-input');
    const newQuantity = parseInt(quantityInput.value) + 1;
    quantityInput.value = newQuantity;
  } else {
    // If the item is not in the cart, create a new cart item element
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');

    const removeIcon = document.createElement('span');
    removeIcon.classList.add('fas', 'fa-times');
    removeIcon.addEventListener('click', removeCartItem);
    cartItemDiv.appendChild(removeIcon);

    const itemImage = document.createElement('img');
    itemImage.src = imgSrc;
    itemImage.width = 100;
    itemImage.height = 100;
    cartItemDiv.appendChild(itemImage);

    const itemContent = document.createElement('div');
    itemContent.classList.add('content');

    const itemNameHeading = document.createElement('h3');
    itemNameHeading.textContent = itemName;
    itemContent.appendChild(itemNameHeading);

    const itemPriceDiv = document.createElement('div');
    itemPriceDiv.classList.add('price');
    itemPriceDiv.textContent = itemPrice;
    itemContent.appendChild(itemPriceDiv);

    const itemQuantity = document.createElement('div');
    itemQuantity.classList.add('quantity');
    itemQuantity.innerHTML = `
      <button class="minus-btn">-</button>
      <input type="text" class="quantity-input" value="1">
      <button class="plus-btn">+</button>
    `;
    itemContent.appendChild(itemQuantity);

    cartItemDiv.appendChild(itemContent);

    // Append the new cart item to the cart items container
    cartItemsContainer.querySelector('.cart-items').appendChild(cartItemDiv);
  }

  // Update the notification badge and total price
  updateNotificationBadgeCount();
}

function removeCartItem(e) {
  const cartItemDiv = e.target.closest('.cart-item');
  cartItemDiv.remove();

  // Update the notification badge and total price
  updateNotificationBadgeCount();
}

function updateNotificationBadgeCount() {
  const cartItemCount = Array.from(cartItemsContainer.querySelectorAll('.cart-item')).reduce((total, cartItem) => {
    const quantity = parseInt(cartItem.querySelector('.quantity-input').value);
    return total + quantity;
  }, 0);

  notificationBadge.textContent = cartItemCount;
  notificationBadge.style.display = cartItemCount > 0 ? 'block' : 'none';
}

updateQuantityButtons(); // You might need to implement quantity buttons if required
