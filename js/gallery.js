 /* =========================
       SCROLL REVEAL
    ========================== */

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



    /* =========================
       OPEN IMAGE
    ========================== */

    function openImage(imageSource) {

        const lightbox =
            document.getElementById(
                "lightbox"
            );

        const lightboxImage =
            document.getElementById(
                "lightboxImage"
            );


        lightboxImage.src =
            imageSource;


        lightbox.classList.add(
            "active"
        );

    }



    /* =========================
       CLOSE IMAGE
    ========================== */

    function closeImage() {

        const lightbox =
            document.getElementById(
                "lightbox"
            );


        lightbox.classList.remove(
            "active"
        );

    }



    /* =========================
       CLOSE WITH ESCAPE
    ========================== */

    document.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Escape"
            ) {

                closeImage();

            }

        }
    );


    // navigation phone bar
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

