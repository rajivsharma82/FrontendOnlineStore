if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

function ready(){
   
// console.log(removeCartItemButtons);

// Add event Listeners 
var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for(var i=0; i<removeCartItemButtons.length;i++){
        var button = removeCartItemButtons[i];
        button.addEventListener('click',removeCartItem) 
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for(var i =0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButton = document.getElementsByClassName('shop-item-button');
    for(var i =0; i < addToCartButton.length; i++){
        var button = addToCartButton[i];
        button.addEventListener('click', addToCartClicked);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}

function purchaseClicked(){
    alert('Thank you for your purchase');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function addToCartClicked(event){
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    console.log(title,price,imageSrc);

    addItemToCart(title,price,imageSrc);
    updateCartTotal();
}

function addItemToCart(title,price,imageSrc){
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    //console.log(cartItems);
    var cartItemsNames = cartItems.getElementsByClassName('cart-item-title');
    for(var i=0; i < cartItemsNames.length;i++){
        if(cartItemsNames[i].innerText== title){
            alert('This item is alrady added to the cart');
            return;
        }

    }

    var cartRowContents = `
    <div class="cart-item cart-column">
      <img class="cart-item-image" src="${imageSrc}" width="20" height="20"/>
      <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="text" value="1" />
      <button class="btn btn-danger " type="button">REMOVE</button>
    </div> `
    cartRow.innerHTML = cartRowContents;

    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged);
    
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <=0){
        input.value = 1;
    }
    updateCartTotal();
}

//console.log("here in sports.js");
// This document object is everything in html, it has inbuilt methods. 


function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    console.log(cartRows.length);
    var total = 0;

    for(var i=0; i<cartRows.length;i++){ 
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        //console.log(priceElement,quantityElement);
        var price = parseFloat(priceElement.innerText.replace('$',''));
        //console.log(price);

        var quantity = quantityElement.value ;
        total = total + (price * quantity);
       // console.log(total);

    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}