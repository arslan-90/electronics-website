/* =========================
       FAQ OPEN / CLOSE
    ========================== */

    const questions =
        document.querySelectorAll(".question");


    questions.forEach(question => {

        question.addEventListener(
            "click",
            () => {

                const faq =
                    question.parentElement;


                faq.classList.toggle("active");

            }
        );

    });



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


    revealOnScroll();


    
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

