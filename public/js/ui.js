const recipes = document.querySelector('.card-container');
const cart_list = document.querySelector('.cart-list');
const confirmationMsg = document.getElementById('confirmationMsg');
const resetBtn = document.getElementById('resetBtn');
const sideForm = document.getElementById('sideForm');

document.addEventListener('DOMContentLoaded', function() {
  // Initialize side menu
  const sideMenus = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sideMenus, {edge: 'right'});
});

document.addEventListener('DOMContentLoaded', function() {
  // Add event listener to the cart icon
  const cartIcon = document.querySelector('.right i.material-icons');
  cartIcon.addEventListener('click', function() {
    window.location.href = '/pages/cart.html';
  });

  // Add event listener to the MK Bakery logo
  const logo = document.querySelector('.brand-logo');
  logo.addEventListener('click', function() {
    window.location.href = '/';
  });
});

// Render recipe data
const renderRecipe = (data, id) => {
  let imageUrl = (data.url !== null && data.url !== undefined) ? data.url : '/img/icon.png';
  const html = `
    <div class="card" data-id="${id}">
    <span class="favorite-icon" onclick="checkCart('${id}')">&hearts;</span>
      <img src="${imageUrl}" alt="Product Image" class="product-image">
      <div class="product-details">
        <h2 class="product-title orange-text text-lighten-3">${data.name}</h2>
        <p class="toggle-description"><u>Details</u></p>
        <div class="description hidden">
          <p class="product-description orange-text text-lighten-3">${data.ingredients}</p>
        </div>
        <span class="product-price orange-text text-lighten-4">PLN ${data.price}</span>
      </div>
    </div>
  `;
  recipes.innerHTML += html;

  // Check if the item is already in the cart and update the icon
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const favoriteIcon = document.querySelector(`.card[data-id="${id}"] .favorite-icon`);
  updateHeartIcon(favoriteIcon, cart, id);
};

// Add event listener for toggle description
document.addEventListener('click', function(event) {
  const productDetails = event.target.closest('.product-details');
  if (productDetails) {
    const description = productDetails.querySelector('.description');
    description.classList.toggle('visible');
  }
});

// Function to add or remove item from cart
function checkCart(id) {
  const recipe = findRecipeById(id);
  if (recipe) {
    const isAdded = addToCart(recipe);
    const favoriteIcon = document.querySelector(`.card[data-id="${id}"] .favorite-icon`);
    updateHeartIcon(favoriteIcon, null, id);
    if (isAdded) {
      console.log('Cake added to cart!');
    } else {
      console.log('Cake removed from cart!');
    }
  }
}

// Function to find recipe by ID
const findRecipeById = (id) => {
  const recipeCards = document.querySelectorAll('.card');
  for (const card of recipeCards) {
      if (card.dataset.id === id) {
          return {
              id: card.dataset.id,
              name: card.querySelector('.product-title').textContent,
              ingredients: card.querySelector('.product-description').textContent,
              price: card.querySelector('.product-price').textContent.split(' ')[1],
              url: card.querySelector('.product-image').src // Added line to get the image URL
          };
      }
  }
  return null;
};

document.addEventListener('DOMContentLoaded', function() {
  // Render items in cart
  renderCartItems();
});

// Function to render items in cart
const renderCartItems = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart_list) {
    cart_list.innerHTML = '';
    cart.forEach((item) => {
      let imageUrl = (item.url !== null && item.url !== undefined) ? item.url : '/img/icon.png';
      const html = `
        <div class="recipe row" data-id="${item.id}">
          <img src="${imageUrl}" alt="recipe thumb" class="product-image">
          <div class="recipe-details">
            <div class="recipe-title">${item.name}</div>
            <div class="recipe-ingredients">${item.ingredients}</div>
          </div>
          <div class="recipe-price">PLN ${item.price}</div>
          <div class="recipe-delete">
            <i class="material-icons" data-id="${item.id}">delete_outline</i>
          </div>
        </div>
      `;
      cart_list.innerHTML += html;
    });

    // Add event listener for delete icons
    document.querySelectorAll('.recipe-delete').forEach(deleteIcon => {
      deleteIcon.addEventListener('click', function() {
        const card = deleteIcon.closest('.recipe');
        const id = card.getAttribute('data-id');
        removeFromCart(id);
        card.remove();
      });
    });
  } 
};

// Function to add item to cart and store in local storage
const addToCart = (item) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex(cartItem => cartItem.id === item.id);
  if (index === -1) {
    cart.push({ ...item, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    return true; // Item successfully added
  } else {
    removeFromCart(item.id);
    return false; // Item already in the cart
  }
};

// Function to remove item from cart
const removeFromCart = (id) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  // Find the index of the item with the given ID
  const index = cart.findIndex(item => item.id === id);
  if (index !== -1) {
    // If the item exists, remove it from the cart array
    cart.splice(index, 1);
    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Update the cart display
    renderCartItems();
  }
};

// Function to update the heart icon based on the cart status
function updateHeartIcon(favoriteIcon, cart, id) {
  if (!cart) {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
  }
  const isInCart = cart.some(cartItem => cartItem.id === id);
  if (isInCart) {
    favoriteIcon.classList.add('clicked');
  } else {
    favoriteIcon.classList.remove('clicked');
  }
}

// Function to open the side form
function openSideForm() {
  sideForm.classList.add('active');
}

// Function to toggle the side form
function toggleSideForm() {
  sideForm.classList.toggle('active');
}

// Function to close the side form
function closeSideForm() {
  sideForm.classList.remove('active');
}

// Outside click event to close the side form
window.addEventListener('click', function(event) {
  if (event.target === sideForm) {
    closeSideForm();
  }
});
  // Adding event listener to the exit button
document.getElementById('exit-app').addEventListener('click', function() {
  // Attempt to close the window
  window.close();
});


