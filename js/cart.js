let cart =
    JSON.parse(localStorage.getItem("urbanCafeCart")) || [];


const cartItems =
    document.getElementById("cart-items");

const cartTotal =
    document.getElementById("cart-total");

const cartCount =
    document.getElementById("cart-count");

const clearCart =
    document.getElementById("clear-cart");


/* =========================
   ADD TO CART
========================= */

const addButtons =
    document.querySelectorAll(".add-cart");


addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name =
            button.dataset.name;

        const price =
            Number(button.dataset.price);


        const existingItem =
            cart.find(item => item.name === name);


        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({

                name: name,

                price: price,

                quantity: 1

            });

        }


        saveCart();

        displayCart();

    });

});


/* =========================
   DISPLAY CART
========================= */

function displayCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        cartTotal.textContent = "₹0";

        cartCount.textContent = "0";

        return;

    }


    let total = 0;

    let totalItems = 0;


    cart.forEach((item, index) => {

        total +=
            item.price * item.quantity;

        totalItems +=
            item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ₹${item.price} × ${item.quantity}
                </p>

            </div>


            <div class="cart-controls">

                <button
                    onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${index})">
                    +
                </button>

                <button
                    class="remove-item"
                    onclick="removeItem(${index})">
                    ✕
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent =
        `₹${total}`;

    cartCount.textContent =
        totalItems;

}


/* =========================
   INCREASE
========================= */

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

    displayCart();

}


/* =========================
   DECREASE
========================= */

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    saveCart();

    displayCart();

}


/* =========================
   REMOVE
========================= */

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

}


/* =========================
   CLEAR CART
========================= */

clearCart.addEventListener("click", () => {

    cart = [];

    saveCart();

    displayCart();

});


/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "urbanCafeCart",
        JSON.stringify(cart)
    );

}


/* INITIAL LOAD */

displayCart();