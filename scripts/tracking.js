import { getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { renderAmazonHeader } from "./amazonHeader.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


async function renderTrackingPage(){

    await loadProductsFetch();

    renderAmazonHeader();

    let percentProgress;

    trackingHTML();

    function trackingHTML() {
        const url = new URL(window.location.href);
        const orderId = url.searchParams.get('orderId');
        const productId = url.searchParams.get('productId');
    
        const orderDetails = getOrder(orderId);
        const productDetails = getProduct(productId);
    
        let html;
    
        // Loop through order products once to find the matching product
        const matchingProduct = orderDetails.products.find(product => product.productId === productId);
    
        if (matchingProduct) {
            const orderTime = dayjs(orderDetails.orderTime);
            const deliveryTime = dayjs(matchingProduct.estimatedDeliveryTime);
    
            // Calculate progress once
            percentProgress = calculateProgress(orderTime, deliveryTime);
            console.log(percentProgress);
    
            const arrivalDate = deliveryTime.format('dddd, MMMM D');
    
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
                    Quantity: ${matchingProduct.quantity}
                </div>
    
                <img class="product-image" src="${productDetails.image}">
    
                <div class="progress-labels-container">
                    <div class="progress-label preparing-label">
                        Preparing
                    </div>
                    <div class="progress-label shipped-label current-status">
                        Shipped
                    </div>
                    <div class="progress-label delivered-label">
                        Delivered
                    </div>
                </div>
    
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${percentProgress}%;"></div>
                </div>
            `;

        } else {
            html = '<p>Product not found in the order.</p>';
        }
    
        document.querySelector('.order-tracking').innerHTML = html;
        
        if (matchingProduct){  
            setTrackingStatus(percentProgress);
        }

    }
    
    function calculateProgress(orderTime, deliveryTime) {
        const currentTime = dayjs();
    
        // Calculate the difference in milliseconds
        const timeSinceOrder = currentTime.diff(orderTime);
        const totalDeliveryTime = deliveryTime.diff(orderTime);
    
        // Calculate the percentage progress
        const percentProgress = ((timeSinceOrder / totalDeliveryTime) * 100).toFixed(2);
    
        return percentProgress;
    }

    function setTrackingStatus(percentProgress) {
        // Use unique classes to select the elements
        const preparingLabel = document.querySelector('.preparing-label');
        const shippedLabel = document.querySelector('.shipped-label');
        const deliveredLabel = document.querySelector('.delivered-label');
    
        // Log elements to debug
        // console.log('Preparing Label:', preparingLabel);
        // console.log('Shipped Label:', shippedLabel);
        // console.log('Delivered Label:', deliveredLabel);
    
        if (preparingLabel && shippedLabel && deliveredLabel) {
            preparingLabel.classList.remove('current-status');
            shippedLabel.classList.remove('current-status');
            deliveredLabel.classList.remove('current-status');
    
            if (percentProgress >= 0 && percentProgress < 50) {
                preparingLabel.classList.add('current-status');
            } else if (percentProgress >= 50 && percentProgress < 99) {
                shippedLabel.classList.add('current-status');
            } else {
                deliveredLabel.classList.add('current-status');
            }
        } else {
            console.error('One or more progress labels are not found.');
        }
    }


}

renderTrackingPage();