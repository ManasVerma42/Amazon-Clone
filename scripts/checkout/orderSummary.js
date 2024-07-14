import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {deliveryOptions,getDeliveryOption,formatDeliveryDate} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {renderCheckoutHeader} from './checkoutHeader.js';

export function renderOrderSummary(){    

    renderCheckoutHeader();

    if(cart.length === 0){
        document.querySelector('.order-summary').innerHTML = `
            <div class="order-summary-message">
                Your cart is empty. Please add some items to your cart.
            </div>
        `; 
    } else {

        let cartSummaryHTML = '';

        cart.forEach(cartItem => {
            const {productId}  = cartItem;

            const matchingProduct = getProduct(productId);

            // console.log(matchingProduct);

            const {deliveryOptionId} = cartItem;

            const deliveryOption = getDeliveryOption(deliveryOptionId);

            const dateString = formatDeliveryDate(deliveryOption);
            
            cartSummaryHTML +=
            `<div class="cart-item-container cart-item-container-${matchingProduct.id}">
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
                        ${matchingProduct.getPrice()}
                    </div>
                    <div class="product-quantity product-quantity-${matchingProduct.id}">
                        <span>
                        Quantity: <span class="quantity-label quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                        Update
                        </span>
                        <input class="quantity-input quantity-input-${matchingProduct.id}">
                        <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
                        <span class="delete-quantity-link 
                        delete-quantity-link-${matchingProduct.id}
                        link-primary" data-product-id="${matchingProduct.id}">
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
            </div>`;

        });

        function deliveryOptionsHTML(matchingProduct, cartItem){

            let html = '';

            deliveryOptions.forEach(deliveryOption => {
                
                const dateString = formatDeliveryDate(deliveryOption);

                const priceString = deliveryOption.priceCents === 0
                ? 'FREE'
                : `$${formatCurrency(deliveryOption.priceCents)} -`;

                const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
                // console.log(deliveryOption.id);
                // console.log(cartItem.deliveryOptionId);
                // console.log(isChecked);

                html += `
                    <div class="delivery-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${deliveryOption.id}">
                        <input type="radio" 
                        ${isChecked ? 'checked' : ''}
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

        document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

        // console.log(cartSummaryHTML);

        document.querySelectorAll('.delivery-option').forEach(element => {
            element.addEventListener('click', () => {
                const {productId,deliveryOptionId} = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();
            });
        });

        document.querySelectorAll('.delete-quantity-link').forEach(link => {
            link.addEventListener('click', () => {
                // console.log('delete');
                const {productId} = link.dataset;
                removeFromCart(productId);
                // updateCartQuantity();
                renderCheckoutHeader();
                // console.log(cart);

                // const container = document.querySelector(`.cart-item-container-${productId}`);
                // container.remove();
                renderOrderSummary();

                renderPaymentSummary();

                if(cart.length === 0){
                    localStorage.removeItem('cart');
                }
            });
        });

        document.querySelectorAll('.update-quantity-link').forEach(link => {
            link.addEventListener('click', () => {
                const {productId} = link.dataset;
                // console.log(productId);
                const container = document.querySelector(`.cart-item-container-${productId}`);
                container.classList.add("is-editing-quantity");
                document.querySelector(`.quantity-input-${productId}`).addEventListener('keydown', event => {
                    if (event.key === 'Enter') { saveQuantity(productId); }
                });
            });
        });

        document.querySelectorAll('.save-quantity-link').forEach(link => {
            link.addEventListener('click', () => {
            const {productId} = link.dataset;
                saveQuantity(productId);
                });
        });

        function saveQuantity(productId){
            const container = document.querySelector(`.cart-item-container-${productId}`);
            container.classList.remove("is-editing-quantity");

            const inputValue = document.querySelector(`.quantity-input-${productId}`);
            const newQuantity = Number(inputValue.value);
            // console.log(newQuantity);

            if (newQuantity >= 0) {
                
                let matchingItem;
            
                cart.forEach(cartItem => {
                if(productId === cartItem.productId){
                    matchingItem = cartItem;
                }
                });
            
                updateQuantity(productId, newQuantity);
                document.querySelector(`.quantity-label-${productId}`).innerHTML = `${matchingItem.quantity}`;
                // updateCartQuantity();
                renderCheckoutHeader();
                renderPaymentSummary();
            } else {
                alert('Enter a valid Quantity');
            }
        }
        
        renderCheckoutHeader();
    }
}

// export function updateCartQuantity(){
//     const cartQuantity = calculateCartQuantity();
//     document.querySelector('.return-to-home-link').innerHTML = `${cartQuantity} items`;
// }
// updateCartQuantity();
