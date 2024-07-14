import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {loadCart, loadCartFetch} from "../data/cart.js";
// import '../data/backend-practice.js';
// import '../data/cart-class.js';

// 'async' returns a 'promise'
async function loadPage(){

    // try/catch can also work with synchronous (normal) code
    try {

        // // 'throw' purposely creates an error
        // throw 'error1';

        // 'await' can only run inside 'async' and the closest function has to be 'async'
        await Promise.all([
            loadProductsFetch(),
            loadCartFetch()
        ]);

        // const value = await new Promise((resolve, reject) => {
        //     // throw 'error2';
        //     loadCart(() => {
        //         // // 'reject' creates an error in the future, this is the second way to create errors inside a promise
        //         // reject('error3');
        //         resolve('value1');
        //     });
        // });

    } catch(error) {
        console.log('Unexpected Error. Please try again later.');
    }

    renderOrderSummary();
    renderPaymentSummary();
    
}

loadPage();


// //Loads Multiple promises at the same time
// Promise.all([
//     // new Promise((resolve) => {
//     //     loadProducts(() => {
//     //         resolve();
//     //         // resolve('value1');
//     //     });
//     // }),
//     loadProductsFetch(),
//     new Promise(resolve => {
//         loadCart(() => {
//             resolve();
//         });
//     })
// ]).then((values) => {
//     // console.log(values);
//     renderOrderSummary();
//     renderPaymentSummary();
// });

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
