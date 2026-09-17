 /* =====================================================
           SCROLL REVEAL
        ===================================================== */

        const revealElements =
            document.querySelectorAll(".reveal");


        function revealOnScroll() {

            revealElements.forEach(element => {

                const windowHeight =
                    window.innerHeight;

                const elementTop =
                    element.getBoundingClientRect().top;


                if (
                    elementTop <
                    windowHeight - 100
                ) {

                    element.classList.add("active");

                }

            });

        }


        window.addEventListener(
            "scroll",
            revealOnScroll
        );


        revealOnScroll();



        /* =====================================================
           DARK / LIGHT MODE
        ===================================================== */

        const darkModeBtn =
            document.getElementById(
                "darkModeBtn"
            );


        darkModeBtn.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "light"
                );


                if (
                    document.body.classList.contains(
                        "light"
                    )
                ) {

                    darkModeBtn.textContent =
                        "🌙 Dark Mode";

                }

                else {

                    darkModeBtn.textContent =
                        "☀ Light Mode";

                }

            }
        );



        /* =====================================================
           PRODUCT SEARCH + CATEGORY FILTER
        ===================================================== */

        const searchInput =
            document.getElementById(
                "searchInput"
            );


        const categoryFilter =
            document.getElementById(
                "categoryFilter"
            );


        const productCards =
            document.querySelectorAll(
                ".product-card"
            );


        const noResults =
            document.getElementById(
                "noResults"
            );


        function filterProducts() {

            const searchText =
                searchInput.value
                    .toLowerCase()
                    .trim();


            const selectedCategory =
                categoryFilter.value;


            let visibleProducts = 0;


            productCards.forEach(card => {

                const productName =
                    card.dataset.name
                        .toLowerCase();


                const productCategory =
                    card.dataset.category;


                const matchesSearch =
                    productName.includes(
                        searchText
                    );


                const matchesCategory =
                    selectedCategory === "all" ||
                    productCategory ===
                    selectedCategory;


                if (
                    matchesSearch &&
                    matchesCategory
                ) {

                    card.style.display =
                        "block";

                    visibleProducts++;

                }

                else {

                    card.style.display =
                        "none";

                }

            });


            if (visibleProducts === 0) {

                noResults.style.display =
                    "block";

            }

            else {

                noResults.style.display =
                    "none";

            }

        }


        searchInput.addEventListener(
            "input",
            filterProducts
        );


        categoryFilter.addEventListener(
            "change",
            filterProducts
        );



        /* =====================================================
           SHOPPING CART
        ===================================================== */

        let cart = JSON.parse(
    localStorage.getItem("zaCart")
) || [];



        /* ADD TO CART */

        const addCartButtons =
            document.querySelectorAll(
                ".add-cart"
            );


        addCartButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const card =
                        button.closest(
                            ".product-card"
                        );


                    const productName =
                        card.dataset.name;


                    const productPrice =
                        Number(
                            card.dataset.price
                        );


                    const existingProduct =
                        cart.find(
                            item =>
                                item.name ===
                                productName
                        );


                    if (existingProduct) {

                        existingProduct.quantity++;

                    }

                    else {

                        cart.push({

                            name:
                                productName,

                            price:
                                productPrice,

                            quantity: 1

                        });

                    }


                    updateCart();


                    button.textContent =
                        "Added ✓";


                    setTimeout(() => {

                        button.textContent =
                            "Add to Cart";

                    }, 1000);

                }
            );

        });



        /* =====================================================
           UPDATE CART
        ===================================================== */

        function updateCart() {

           localStorage.setItem("zaCart", JSON.stringify(cart));


            const cartItems =
                document.getElementById(
                    "cartItems"
                );


            const cartCount =
                document.getElementById(
                    "cartCount"
                );


            const cartTotal =
                document.getElementById(
                    "cartTotal"
                );


            cartItems.innerHTML = "";


            if (cart.length === 0) {

                cartItems.innerHTML = `
                    <p id="emptyCart">
                        Your cart is empty.
                    </p>
                `;

                cartCount.textContent = "0";

                cartTotal.textContent = "0";

                return;

            }


            let total = 0;

            let totalItems = 0;


            cart.forEach((item, index) => {


                /*
                    MEANINGFUL CALCULATION

                    PRICE × QUANTITY = SUBTOTAL
                */

                const subtotal =
                    item.price *
                    item.quantity;


                total += subtotal;

                totalItems +=
                    item.quantity;


                const cartItem =
                    document.createElement(
                        "div"
                    );


                cartItem.className =
                    "cart-item";


                cartItem.innerHTML = `

                    <span class="cart-name">
                        ${item.name}
                    </span>


                    <span>
                        Rs ${item.price.toLocaleString()}
                    </span>


                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(${index}, -1)"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            onclick="changeQuantity(${index}, 1)"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>

                    </div>


                    <strong>
                        Rs ${subtotal.toLocaleString()}
                    </strong>


                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${index})"
                    >
                        Remove
                    </button>

                `;


                cartItems.appendChild(
                    cartItem
                );

            });


            cartCount.textContent =
                totalItems;


            cartTotal.textContent =
                total.toLocaleString();

        }



        /* =====================================================
           CHANGE QUANTITY
        ===================================================== */

        function changeQuantity(
            index,
            amount
        ) {

            cart[index].quantity +=
                amount;


            if (
                cart[index].quantity <= 0
            ) {

                cart.splice(index, 1);

            }


            updateCart();

        }



        /* =====================================================
           REMOVE PRODUCT
        ===================================================== */

        function removeFromCart(index) {

            cart.splice(index, 1);

            updateCart();

        }



        /* =====================================================
           SCROLL TO CART
        ===================================================== */

        function scrollToCart() {

            document
                .getElementById("cartSection")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }



        /* =====================================================
           BUY NOW BUTTONS
        ===================================================== */

        const buyButtons =
            document.querySelectorAll(
                ".buy-now"
            );


        buyButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const card =
                        button.closest(
                            ".product-card"
                        );


                    const productName =
                        card.dataset.name;


                    const productPrice =
                        Number(
                            card.dataset.price
                        );


                    const existingProduct =
                        cart.find(
                            item =>
                                item.name ===
                                productName
                        );


                    if (existingProduct) {

                        existingProduct.quantity++;

                    }

                    else {

                        cart.push({

                            name:
                                productName,

                            price:
                                productPrice,

                            quantity: 1

                        });

                    }


                    updateCart();


                    scrollToCart();

                }
            );

        });


        
const menuBtn = document.getElementById("menuBtn");
const navigation = document.querySelector("header nav");

menuBtn.addEventListener("click", () => {

    navigation.classList.toggle("show");

    const isOpen = navigation.classList.contains("show");

    menuBtn.setAttribute("aria-expanded", isOpen);

    menuBtn.textContent = isOpen ? "✕" : "☰";
});

const navLinks = document.querySelectorAll("header nav a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {

        navigation.classList.remove("show");

        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.textContent = "☰";
    });
});

updateCart();
const checkoutButton = document.getElementById("checkoutButton");

if (checkoutButton) {
    checkoutButton.addEventListener("click", function () {

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        window.location.href = "checkout.html";
    });
}