/* =========================================================
   VOLTFIX E-BIKE SERVICES
   Main JavaScript
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    // Close mobile menu when a navigation link is clicked

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", (event) => {

    if (!menuToggle || !navLinks) return;

    const clickedInsideMenu =
        navLinks.contains(event.target);

    const clickedMenuButton =
        menuToggle.contains(event.target);


    if (
        navLinks.classList.contains("open") &&
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        navLinks.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


/* =========================================================
   HERO VIDEO
========================================================= */

const heroVideo = document.querySelector(".hero-video");


if (heroVideo) {

    // Try to start the video

    heroVideo.play().catch(() => {
        // Browser may block autoplay.
        // Video is muted, so normally autoplay will work.
    });


    // Pause video when the user leaves the browser tab
    // This saves battery and resources.

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                heroVideo.pause();

            } else {

                heroVideo.play().catch(() => {});

            }

        }
    );

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);


        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const header =
    document.querySelector(".site-header");


window.addEventListener(
    "scroll",
    () => {

        if (!header) return;


        if (window.scrollY > 40) {

            header.style.background =
                "rgba(7, 7, 7, 0.95)";

        } else {

            header.style.background =
                "rgba(11, 11, 11, 0.82)";

        }

    },
    { passive: true }
);


/* =========================================================
   ESC KEY CLOSES MOBILE MENU
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {
            return;
        }


        if (
            navLinks &&
            navLinks.classList.contains("open")
        ) {

            navLinks.classList.remove("open");

            menuToggle?.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* =========================================================
   WHATSAPP LINK HELPER
========================================================= */

const whatsappNumber =
    "923021275983";


function openWhatsApp(message) {

    const encodedMessage =
        encodeURIComponent(message);

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   PHONE NUMBER PROTECTION
========================================================= */

document.querySelectorAll(
    'a[href^="tel:"]'
).forEach(link => {

    link.addEventListener("click", () => {

        console.log(
            "Calling VoltFix: +92 302 1275983"
        );

    });

});


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);
