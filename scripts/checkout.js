import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadProducts} from '../data/products.js';
import {loadCart} from "../data/cart.js";
// import '../data/backend-practice.js';
// import '../data/cart-class.js';

//Loads Multiple promises at the same time
Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve();
            // resolve('value1');
        });
    }),
    new Promise(resolve => {
        loadCart(() => {
            resolve();
        });
    })
]).then((values) => {
    // console.log(values);

    renderOrderSummary();
    renderPaymentSummary();
});

// // Using 'Promise'
// // This is preferred over using 'callback' because this flattens our code
// // whereas, on the other hand using callbacks would lead to continuous nesting of the code if we have multiple components to load from the backend
// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve();
//     });

// }).then(() => {
//     return new Promise(resolve => {
//         loadCart(() => {
//             resolve();
//         });
//     });

// }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });

// Using Callback
// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     });

// });
