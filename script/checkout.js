import {cart, removeFromCart, calculateCartQuantity} from '../data/cart.js';

import {products} from '../data/products.js';

import {formatCurrency} from './utils/money.js';

import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

import {deliveryOptions} from '../data/deliveryOption.js'  

hello();
console.log(dayjs());
const todayDate  = dayjs();
const deliveryDate = todayDate.add(7, 'days');
deliveryDate.format('dddd, MMMM d');
console.log(deliveryDate);


let cartSummaryHTML = '';
cart.forEach((cartItem) => {

  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });


  const today = dayjs();

  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

  const dateString = deliveryDate.format('dddd, MMMM D');




 


  cartSummaryHTML += `
     <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
     <div class="delivery-date">
       Delivery date: ${dateString}
     </div>
  
     <div class="cart-item-details-grid">
       <img class="product-image"
         src="${matchingProduct.image}">
  
       <div class="cart-item-details">
         <div class="product-name">
          ${matchingProduct.name}
         </div>
         <div class="product-price">
           $${formatCurrency(matchingProduct.priceCents)}
         </div>
         <div class="product-quantity">
           <span>
             Quantity: <span class="quantity-label js-quantity-label-$
             {matchingProduct.id}">${cartItem.quantity}</span>
           </span>
           <span class="update-quantity-link is-editing-quantity link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
             Update
           </span>
           <input class="quantity-input js-quantity-input">
           <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
           <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">
             Delete
           </span>
         </div>
       </div>
       <div class="delivery-options">
         <div class="delivery-options-title">
           Choose a delivery option:
         </div>
         ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
     </div>
    </div>
  `
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

function deliveryOptionsHTML (matchingProduct, cartItem) {
  let html = '';


  deliveryOptions.forEach((deliveryOption) => {

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0 
    ? 'FREE' 
    : `$${formatCurrency(deliveryOption.priceCents)}`;

    const isChecked = deliveryOption.id  === cartItem.deliveryOptionId;

    html +=  `
            <div class="delivery-option">
            <input type="radio"
            ${isChecked ? 'Checked' : ''}
            
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
            </div>
        `
  });
   return html;
}





function updateCartquantity() {
  const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
  }
  updateCartquantity();

