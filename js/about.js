  /* =========================
           SCROLL ANIMATION
        ========================== */

        const sections =
            document.querySelectorAll(
                ".reveal-section"
            );


        function updateSections() {

            const windowHeight =
                window.innerHeight;


            const screenCenter =
                windowHeight / 2;


            sections.forEach(section => {

                const rect =
                    section.getBoundingClientRect();


                const sectionCenter =
                    rect.top +
                    rect.height / 2;


                const distance =
                    Math.abs(
                        screenCenter -
                        sectionCenter
                    );


                /*
                    0 = far away
                    1 = exactly in center
                */

                let progress =
                    1 -
                    (
                        distance /
                        (windowHeight * 0.65)
                    );


                progress =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            progress
                        )
                    );


                section.style.setProperty(
                    "--progress",
                    progress
                );

            });

        }


        window.addEventListener(
            "scroll",
            updateSections,
            {
                passive: true
            }
        );


        window.addEventListener(
            "resize",
            updateSections
        );


        updateSections();


        
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

