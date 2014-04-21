var cartSidePanelDiv = document.getElementById('cart-pop-out');

var showCartBtn = document.getElementById('AddToCart');
var hideCartBtn = document.getElementById('HideCartSidePanel');

showCartBtn.onclick = function() {
	cartSidePanelDiv.setAttribute('class', 'js-cart-side-panel-visible');
};

hideCartBtn.onclick = function() {
	cartSidePanelDiv.setAttribute('class', 'js-cart-side-panel-hidden');
};