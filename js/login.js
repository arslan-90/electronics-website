 function loginUser() {

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;


        if (
            email === "" ||
            password === ""
        ) {

            alert(
                "Please enter your email and password."
            );

            return;
        }


        alert(
            "Login successful!"
        );

    }

    
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

