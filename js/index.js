/* =========================
   SCROLL REVEAL
========================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealOnScroll = () => {

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

};


window.addEventListener(
    "scroll",
    revealOnScroll
);


/* Run when page loads */

revealOnScroll();



/* =========================
   DARK / LIGHT MODE
========================== */

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



/* =========================
   MOBILE NAVIGATION
========================== */

const menuBtn =
    document.getElementById(
        "menuBtn"
    );


const navigation =
    document.querySelector(
        "header nav"
    );


menuBtn.addEventListener(
    "click",
    () => {

        navigation.classList.toggle(
            "show"
        );


        const isOpen =
            navigation.classList.contains(
                "show"
            );


        menuBtn.setAttribute(
            "aria-expanded",
            isOpen
        );


        menuBtn.textContent =
            isOpen
                ? "✕"
                : "☰";

    }
);



/* =========================
   CLOSE MOBILE MENU
========================== */

const navLinks =
    document.querySelectorAll(
        "header nav a"
    );


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navigation.classList.remove(
                "show"
            );


            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );


            menuBtn.textContent =
                "☰";

        }
    );

});