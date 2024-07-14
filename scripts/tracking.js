import { getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { renderAmazonHeader } from "./amazonHeader.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


async function renderTrackingPage(){

    await loadProductsFetch();

    renderAmazonHeader();

    trackingHTML();

    function trackingHTML(){

        const url = new URL(window.location.href);

        const orderId = url.searchParams.get('orderId');
        const productId = url.searchParams.get('productId');

        const orderDetails = getOrder(orderId);
        const productDetails = getProduct(productId);

        let html;
        
        orderDetails.products.forEach(product => {

            const arrivalDate = dayjs(product.estimatedDeliveryTime).format('dddd, MMMM D');
            // console.log(orderDetails); 

            if (product.productId === productId) {

                html = `
                    <a class="back-to-orders-link link-primary" href="orders.html">
                        View all orders
                    </a>

                    <div class="delivery-date">
                        Arriving on ${arrivalDate}
                    </div>

                    <div class="product-info">
                        ${productDetails.name}
                    </div>

                    <div class="product-info">
                        Quantity: ${product.quantity}
                    </div>

                    <img class="product-image" src="${productDetails.image}">

                    <div class="progress-labels-container">
                        <div class="progress-label">
                            Preparing
                        </div>
                        <div class="progress-label current-status">
                            Shipped
                        </div>
                        <div class="progress-label">
                            Delivered
                        </div>
                    </div>

                    <div class="progress-bar-container">
                        <div class="progress-bar"></div>
                    </div>
                `;
                // console.log(product.productId);
            }
        });

        document.querySelector('.order-tracking').innerHTML = html;
    }


}

renderTrackingPage();