        /* =========================================================
   OYEDIGI SOLUTIONS
   JAVASCRIPT
========================================================= */


/* ================= HEADER ================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("open");
    document.body.classList.toggle("menu-open");

    const icon = menuBtn.querySelector("i");

    if (navbar.classList.contains("open")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* Close mobile menu after clicking link */

document.querySelectorAll(".nav-link, .nav-cta").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("open");
        document.body.classList.remove("menu-open");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

});


/* ================= REVEAL ANIMATION ================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================= COUNTERS ================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let current = 0;

            const increment = Math.max(
                1,
                Math.ceil(target / 60)
            );

            const updateCounter = () => {

                current += increment;

                if (current >= target) {
                    current = target;
                }

                counter.textContent = current;

                if (current < target) {
                    requestAnimationFrame(updateCounter);
                }

            };

            updateCounter();

            observer.unobserve(counter);

        });

    },

    {
        threshold: 0.5
    }

);


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !email) {

        formStatus.textContent =
            "Please fill in your name and email.";

        return;

    }


    formStatus.textContent =
        "Thanks! Your message is ready to be sent.";

    contactForm.reset();

});


/* ================= BACK TO TOP ================= */

const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ================= MOUSE PARALLAX HERO ================= */

const heroVisual = document.querySelector(".hero-visual");

if (heroVisual && window.innerWidth > 900) {

    heroVisual.addEventListener("mousemove", (event) => {

        const rect = heroVisual.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width - 0.5;

        const y =
            (event.clientY - rect.top) / rect.height - 0.5;


        const center = heroVisual.querySelector(".visual-center");

        const cards =
            heroVisual.querySelectorAll(".floating-card");


        center.style.transform =
            `translate(${x * 15}px, ${y * 15}px)`;


        cards.forEach((card, index) => {

            const multiplier = (index + 1) * 8;

            card.style.marginLeft =
                `${x * multiplier}px`;

            card.style.marginTop =
                `${y * multiplier}px`;

        });

    });


    heroVisual.addEventListener("mouseleave", () => {

        const center =
            heroVisual.querySelector(".visual-center");

        const cards =
            heroVisual.querySelectorAll(".floating-card");


        center.style.transform = "";

        cards.forEach(card => {

            card.style.marginLeft = "";
            card.style.marginTop = "";

        });

    });

}


/* ================= SERVICE CARD TILT ================= */

const serviceCards =
    document.querySelectorAll(".service-card");


if (window.innerWidth > 900) {

    serviceCards.forEach(card => {

        card.addEventListener("mousemove", (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const rotateX =
                ((y - rect.height / 2) / rect.height) * -3;

            const rotateY =
                ((x - rect.width / 2) / rect.width) * 3;


            card.style.transform =
                `perspective(700px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

}


/* ================= CURRENT YEAR ================= */

const yearElement =
    document.querySelector(".footer-bottom span");

if (yearElement) {

    yearElement.innerHTML =
        `© ${new Date().getFullYear()} OyeDigi Solutions. All rights reserved.`;

}
