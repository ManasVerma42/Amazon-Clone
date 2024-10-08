import {cart, addToCart, addedToCartConfirmation, calculateCartQuantity} from '../data/cart.js';
import {products,loadProducts} from '../data/products.js';
import { renderAmazonHeader } from './amazonHeader.js';
import {formatCurrency} from './utils/money.js';

loadProducts(renderProductsGrid);

function renderProductsGrid(){

      const url = new URL(window.location.href);
      const searchQuery = url.searchParams.get('search');
      // console.log(searchQuery);

      renderAmazonHeader();

      let productsHTML = '';

      let filteredProducts = products;

      if (searchQuery) {
        filteredProducts = products.filter(product => {
          // console.log(product);
          const lowerCaseSearchQuery = searchQuery.toLowerCase();
          const nameMatches = product.name.toLowerCase().includes(lowerCaseSearchQuery);
          const keywordMatches = product.keywords.some(keyword => {
            return keyword.toLowerCase().includes(lowerCaseSearchQuery);
          });

          return nameMatches || keywordMatches;

        });
      }

      filteredProducts.forEach(product => {
          productsHTML += `
              <div class="product-container">
                <div class="product-image-container">
                  <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                ${product.name}
                </div>

                <div class="product-rating-container">
                  <img class="product-rating-stars"
                    src="${product.getStarsUrl()}">
                  <div class="product-rating-count link-primary">
                    ${product.rating.count}
                  </div>
                </div>

                <div class="product-price">
                ${product.getPrice()}
                </div>

                <div class="product-quantity-container">
                  <select class="quantity-selector-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                ${product.extraInfoHTML()}

                <div class="product-spacer"></div>

                <div class="added-to-cart added-to-cart-${product.id}">
                  <img src="images/icons/checkmark.png">
                  Added
                </div>

                <button class="add-to-cart-button button-primary"
                data-product-id="${product.id}">
                  Add to Cart
                </button>
              </div>
          `;

      });

      // console.log(productsHTML);

      document.querySelector('.products-grid').innerHTML = productsHTML;

      function updateCartQuantity(){
        const cartQuantity = calculateCartQuantity();
        document.querySelector('.cart-quantity').innerHTML = cartQuantity;
      }

      document.querySelectorAll('.add-to-cart-button').forEach(button =>{
        button.addEventListener('click', () => {
          // console.log('Added');
          const {productId} = button.dataset;

          const quantitySelector = document.querySelector(`.quantity-selector-${productId}`);
          const quantity = Number(quantitySelector.value);
          // console.log(quantity);

          addedToCartConfirmation(productId);
          addToCart(productId, quantity);
          updateCartQuantity();    
          quantitySelector.value = '1';
        });
      });
    const productsGrid = document.querySelector('.products-grid');
}
