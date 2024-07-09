export let cart = JSON.parse(localStorage.getItem('cart')) ||
  [
      {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
      },
      {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
      }
  ];
  // console.log(cart);

// if (!cart){
//     cart = [
//         {
//             productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//             quantity: 2,
//             deliveryOptionId: '1'
//         },
//         {
//             productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//             quantity: 1,
//             deliveryOptionId: '2'
//         }
//     ];
//     console.log(cart);
// }

// export let cart = [];

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity){

    let matchingItem;
  
    cart.forEach(cartItem => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
  
    if(matchingItem){
      matchingItem.quantity += quantity;
    } else {        
        cart.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }

    saveToStorage();

  }

export function removeFromCart(productId){
    
    // let newCart = [];
    // cart.forEach(cartItem => {
    //     if(productId !== cartItem.productId){
    //         newCart.push(cartItem);
    //     }
    // })
    
    let newCart = cart.filter(cartItem => {
        if(cartItem.productId !== productId){
            return true;
        }
    });

    cart = newCart;

    // console.log(cart.length);

    saveToStorage();

}

let timeoutId;

export function addedToCartConfirmation(productId){
  const addedToCartMsg = document.querySelector(`.added-to-cart-${productId}`);
    addedToCartMsg.classList.add('added');
    clearInterval(timeoutId);
    timeoutId = setTimeout(() => {
      addedToCartMsg.classList.remove('added');
    }, 2000);
}

export let cartQuantity;
export function calculateCartQuantity(){
    cartQuantity = 0;
    cart.forEach(cartItem => {
      cartQuantity += cartItem.quantity;  
    //   console.log(cartQuantity);
    });
}

export function updateQuantity(productId, newQuantity){
    
  let matchingItem;
  
  cart.forEach(cartItem => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;
  // console.log(matchingItem.quantity);
  saveToStorage();
}