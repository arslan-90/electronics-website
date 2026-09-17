/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {

    revealElements.forEach(element => {

        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.classList.add("active");
        }

    });

};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

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


/* =====================================================
   DETAIL PAGE - ADD TO CART
===================================================== */

const detailButtons = document.querySelectorAll(".product-info button");


detailButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productSection = button.closest(".product-section");

        const productName =
            productSection.querySelector(".product-info h2").innerText
                .replace(/\s+/g, " ")
                .trim();

        const priceText =
            productSection.querySelector(".price span").innerText;

        const productPrice =
            Number(priceText.replace(/[^0-9]/g, ""));


        /* Get existing cart */

        let cart = JSON.parse(
            localStorage.getItem("zaCart")
        ) || [];


        /* Check if product already exists */

        const existingProduct = cart.find(
            item => item.name === productName
        );


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });

        }


        /* Save cart */

        localStorage.setItem(
            "zaCart",
            JSON.stringify(cart)
        );


        /* Show custom alert */

        showCartAlert(productName);

    });

});


/* =====================================================
   CUSTOM CART ALERT
===================================================== */

function showCartAlert(productName) {

    const alertBox = document.createElement("div");

    alertBox.className = "cart-alert";

    alertBox.innerHTML = `

        <div class="cart-alert-box">

            <div class="cart-alert-icon">
                ✓
            </div>

            <h2>
                Added Successfully!
            </h2>

            <p>
                <strong>${productName}</strong>
                has been added to your cart.
            </p>

            <button id="cartAlertOk">
                OK
            </button>

        </div>

    `;


    document.body.appendChild(alertBox);


    document
        .getElementById("cartAlertOk")
        .addEventListener("click", () => {

            window.location.href = "products.html";

        });

}