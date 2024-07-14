import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {renderAmazonHeader} from './amazonHeader.js';
import {orders, saveToStorage} from "../data/orders.js";
import {formatCurrency} from './utils/money.js';
import {getProduct, loadProductsFetch} from '../data/products.js';


async function renderOrder(){

	await loadProductsFetch();
	
	renderAmazonHeader();

    let ordersHTML = '';

	orders.forEach(order => {

	// console.log(order);

		let orderProductsHTML = '';

		const orderDate = dayjs(order.orderTime).format('MMMM D');
		// console.log(orderDate);

		order.products.forEach(product => {

			const {productId} = product;

			const orderProduct = getProduct(productId);
			// console.log(orderProduct);

			const deliveryDate = dayjs(product.estimatedDeliveryTime).format('MMMM D');

			orderProductsHTML += `
					<div class="product-image-container">
							<img src="${orderProduct.image}">
					</div>
					<div class="product-details">
							<div class="product-name">${orderProduct.name}</div>
							<div class="product-delivery-date"> Arriving on: ${deliveryDate}</div>
							<div class="product-quantity"> Quantity: ${product.quantity}</div>
							<button class="buy-again-button button-primary">
									<img class="buy-again-icon" src="images/icons/buy-again.png">
									<span class="buy-again-message">Buy it again</span>
							</button>
					</div>
					<div class="product-actions">
							<a href="tracking.html">
									<button class="track-package-button button-secondary"> Track package </button>
							</a>
					</div>
				`;
		});

		ordersHTML += `
				<div class="order-container">
					<div class="order-header">
							<div class="order-header-left-section">
									<div class="order-date">
											<div class="order-header-label">Order Placed:</div>
											<div>${orderDate}</div>
									</div>
									<div class="order-total">
											<div class="order-header-label">Total:</div>
											<div>$${formatCurrency(order.totalCostCents)}</div>
									</div>
							</div>
							<div class="order-header-right-section">
									<div class="order-header-label">Order ID:</div>
									<div>${order.id}</div>
							</div>
					</div>
					<div class="order-details-grid">
							${orderProductsHTML}
					</div>
			</div>
		`;
    });

		// console.log(orders);

		document.querySelector('.orders-grid').innerHTML = ordersHTML;
		saveToStorage();
}

renderOrder();