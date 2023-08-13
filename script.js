let navbar = document.querySelector('.navbar');
let searchForm = document.querySelector('.search-form');
let cartItemsContainer = document.querySelector('.cart-items-container');
let shopButtons = document.querySelectorAll('.addToCart');
let checkoutButton = document.querySelector('.checkout');
let notificationToggle = document.querySelector('#notification-toggle');
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
  const quantity = parseInt(parentBox.querySelector('.quantity-input').value);

  const existingCartItem = Array.from(cartItemsContainer.querySelectorAll('.cart-item')).find(item => {
    return item.querySelector('.content h3').textContent === itemName;
  });

  if (existingCartItem) {
    const existingQuantityInput = existingCartItem.querySelector('.quantity-input');
    const newQuantity = parseInt(existingQuantityInput.value) + quantity;

    if (newQuantity <= 3) {
      existingQuantityInput.value = newQuantity;
      updateNotificationBadgeCount();
    }
  } else if (cartItemsContainer.querySelectorAll('.cart-item').length < 3) {
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
      <input type="text" class="quantity-input" value="${quantity}">
      <button class="plus-btn">+</button>
    `;
    itemContent.appendChild(itemQuantity);

    cartItemDiv.appendChild(itemContent);

    cartItemsContainer.querySelector('.cart-items').appendChild(cartItemDiv);
    cartItemsContainer.appendChild(checkoutButton);
    updateNotificationBadgeCount();
  }

  updateQuantityButtons();
}

function updateNotificationBadgeCount() {
  const cartItemCount = cartItemsContainer.querySelectorAll('.cart-item').length;
  notificationBadge.textContent = cartItemCount;
  notificationBadge.style.display = 'block';
}

function removeCartItem(e) {
  const cartItemDiv = e.target.closest('.cart-item');
  cartItemDiv.remove();
  updateQuantityButtons();
  decrementNotificationBadge();
}

checkoutButton.addEventListener('click', checkout);

function checkout(e) {
  e.preventDefault();
  // Perform the checkout process here
}

notificationToggle.addEventListener('click', toggleNotification);

function toggleNotification() {
  const notificationIcon = notificationToggle.querySelector('.fas');
  notificationIcon.classList.toggle('fa-bell');
  notificationIcon.classList.toggle('fa-bell-slash');
  // Toggle your notification logic here
}

function updateQuantityButtons() {
  const minusButtons = document.querySelectorAll('.minus-btn');
  const plusButtons = document.querySelectorAll('.plus-btn');

  minusButtons.forEach(button => {
    button.addEventListener('click', () => {
      decreaseQuantity(button);
    });
  });

  plusButtons.forEach(button => {
    button.addEventListener('click', () => {
      increaseQuantity(button);
    });
  });
}

function decreaseQuantity(button) {
  const quantityInput = button.nextElementSibling;
  let quantity = parseInt(quantityInput.value);
  if (quantity > 1) {
    quantity--;
    quantityInput.value = quantity;
  }
}

function increaseQuantity(button) {
  const quantityInput = button.previousElementSibling;
  let quantity = parseInt(quantityInput.value);
  quantity++;
  quantityInput.value = quantity;
}

function decrementNotificationBadge() {
  const currentCount = parseInt(notificationBadge.textContent);
  if (currentCount > 0) {
    const newCount = currentCount - 1;
    notificationBadge.textContent = newCount;
    if (newCount === 0) {
      notificationBadge.style.display = 'none';
    }
  }
}

updateQuantityButtons();
