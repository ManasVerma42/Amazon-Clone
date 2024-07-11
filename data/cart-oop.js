//usually the name of a function which creates objects is written in CamelCase
function Cart(localStorageKey) {
    
    const cart = {
    
        cartItems: undefined,
    
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
            // console.log(this.cartItems);
            if(!this.cartItems){
                this.cartItems = [
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
            }
          },
    
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
    
        addToCart(productId, quantity) {
    
            let matchingItem;
          
            this.cartItems.forEach(cartItem => {
              if(productId === cartItem.productId){
                matchingItem = cartItem;
              }
            });
          
            if(matchingItem){
              matchingItem.quantity += quantity;
            } else {        
                this.cartItems.push({
                productId,
                quantity,
                deliveryOptionId: '1'
              });
            }
        
            this.saveToStorage();
        
          },
          
        removeFromCart(productId) {
        
            let newCart = this.cartItems.filter(cartItem => {
                if(cartItem.productId !== productId){
                    return true;
                }
            });
        
            this.cartItems = newCart;
        
            // console.log(cart.length);
        
            this.saveToStorage();
        
        },
    
        timeoutId: undefined,
    
        addedToCartConfirmation(productId) {
        const addedToCartMsg = document.querySelector(`.added-to-cart-${productId}`);
            addedToCartMsg.classList.add('added');
            clearInterval(timeoutId);
            timeoutId = setTimeout(() => {
            addedToCartMsg.classList.remove('added');
            }, 2000);
        },
    
        calculateCartQuantity() {
            let cartQuantity = 0;
            this.cartItems.forEach(cartItem => {
              cartQuantity += cartItem.quantity;  
              // console.log(cartQuantity);
            });
            return cartQuantity;
        },
    
        updateQuantity(productId, newQuantity) {
        
            let matchingItem;
            
            this.cartItems.forEach(cartItem => {
              if(productId === cartItem.productId){
                matchingItem = cartItem;
              }
            });
          
            matchingItem.quantity = newQuantity;
            // console.log(matchingItem.quantity);
            this.saveToStorage();
          },
    
          updateDeliveryOption(productId, deliveryOptionId) {
      
            let matchingItem;
            
            this.cartItems.forEach(cartItem => {
              if(productId === cartItem.productId){
                matchingItem = cartItem;
              }
            });
          
            matchingItem.deliveryOptionId = deliveryOptionId;
            
            this.saveToStorage();
          
          }
          
    };

    return cart;

}

const cart = Cart('cart-oop');
const businessCart = Cart('businessCart-oop');

cart.loadFromStorage();
businessCart.loadFromStorage();

// cart.addToCart('3ebe75dc-64d2-4137-8860-1f5a963e534b', 2);

console.log(cart);
console.log(businessCart);