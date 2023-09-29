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

  // Create a new cart item element
  const cartItemDiv = document.createElement('div');
  cartItemDiv.classList.add('cart-item');

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

  cartItemDiv.appendChild(itemContent);

  // Append the new cart item to the cart items container
  cartItemsContainer.querySelector('.cart-items').appendChild(cartItemDiv);

  // Update the notification badge
  updateNotificationBadgeCount();
}

function updateNotificationBadgeCount() {
  const cartItemCount = cartItemsContainer.querySelectorAll('.cart-item').length;
  notificationBadge.textContent = cartItemCount;
  notificationBadge.style.display = 'block';
}

updateQuantityButtons(); // You might need to implement quantity buttons if required
