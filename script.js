/* =========================================================
   VOLTFIX E-BIKE SERVICES
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   01. SAFE SELECTOR
========================================================= */

function $(selector) {
    return document.querySelector(selector);
}


function $$(selector) {
    return document.querySelectorAll(selector);
}


/* =========================================================
   02. PAGE LOADER
   Always removes the loader even if another script/element
   is missing.
========================================================= */

function hideLoader() {

    const loader = $(".page-loader");

    if (!loader) return;

    loader.classList.add("loaded");

    document.body.classList.remove("no-scroll");

}


/* Hide after page finishes loading */
window.addEventListener("load", function () {

    setTimeout(hideLoader, 500);

});


/* Emergency fallback:
   If something prevents window.load from completing,
   the page will still become usable. */

setTimeout(hideLoader, 4000);


/* =========================================================
   03. HEADER SCROLL EFFECT
========================================================= */

const header = $(".header");


function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);


updateHeader();


/* =========================================================
   04. MOBILE MENU
========================================================= */

const mobileMenuButton = $(".mobile-menu-button");
const mobileNav = $(".mobile-nav");


function closeMobileMenu() {

    if (!mobileMenuButton || !mobileNav) return;

    mobileMenuButton.classList.remove("open");

    mobileNav.classList.remove("open");

}


function openMobileMenu() {

    if (!mobileMenuButton || !mobileNav) return;

    mobileMenuButton.classList.add("open");

    mobileNav.classList.add("open");

}


if (mobileMenuButton && mobileNav) {

    mobileMenuButton.addEventListener("click", function () {

        const isOpen =
            mobileNav.classList.contains("open");

        if (isOpen) {

            closeMobileMenu();

        } else {

            openMobileMenu();

        }

    });


    /* Close when clicking navigation link */

    mobileNav
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener("click", function () {

                closeMobileMenu();

            });

        });


    /* Close when clicking outside */

    document.addEventListener("click", function (event) {

        if (
            !mobileNav.contains(event.target) &&
            !mobileMenuButton.contains(event.target)
        ) {

            closeMobileMenu();

        }

    });

}


/* =========================================================
   05. CLOSE MOBILE MENU ON RESIZE
========================================================= */

window.addEventListener("resize", function () {

    if (window.innerWidth > 900) {

        closeMobileMenu();

    }

});


/* =========================================================
   06. SMOOTH SCROLL
========================================================= */

$$('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        if (
            !targetId ||
            targetId === "#" ||
            targetId.length < 2
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const headerHeight =
            header ? header.offsetHeight : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* =========================================================
   07. SCROLL REVEAL ANIMATION
========================================================= */

const revealElements = $$(".reveal");


if (revealElements.length > 0) {

    const revealObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12,

                rootMargin: "0px 0px -50px 0px"

            }

        );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });

}


/* =========================================================
   08. FALLBACK FOR REVEAL ELEMENTS
========================================================= */

setTimeout(function () {

    revealElements.forEach(function (element) {

        element.classList.add("visible");

    });

}, 3500);


/* =========================================================
   09. ACTIVE NAVIGATION
========================================================= */

const sections =
    $$("section[id]");

const navLinks =
    $$(".desktop-nav a");


function updateActiveNavigation() {

    if (
        sections.length === 0 ||
        navLinks.length === 0
    ) {
        return;
    }

    let currentSection = "";

    const scrollPosition =
        window.scrollY +
        (header ? header.offsetHeight : 100) +
        150;


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop;

        const sectionBottom =
            sectionTop +
            section.offsetHeight;


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (
            href === "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


updateActiveNavigation();


/* =========================================================
   10. HERO VIDEO SUPPORT
========================================================= */

const heroVideo =
    $(".hero-video");


if (heroVideo) {

    heroVideo.muted = true;

    heroVideo.playsInline = true;

    const playVideo = function () {

        const promise =
            heroVideo.play();

        if (
            promise &&
            typeof promise.catch === "function"
        ) {

            promise.catch(function () {

                /* Browser blocked autoplay.
                   This is normal and not an error. */

            });

        }

    };


    if (heroVideo.readyState >= 2) {

        playVideo();

    } else {

        heroVideo.addEventListener(
            "canplay",
            playVideo,
            { once: true }
        );

    }

}


/* =========================================================
   11. VIDEO VISIBILITY
========================================================= */

if (heroVideo) {

    const videoObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        heroVideo.play()
                            .catch(function () {});

                    } else {

                        heroVideo.pause();

                    }

                });

            },

            {
                threshold: 0.1

            }

        );


    videoObserver.observe(heroVideo);

}


/* =========================================================
   12. SERVICE CARD ANIMATION
========================================================= */

const serviceCards =
    $$(".service-card");


serviceCards.forEach(function (card, index) {

    card.style.transitionDelay =
        `${index * 40}ms`;

});


/* =========================================================
   13. CONTACT WHATSAPP BUTTONS
========================================================= */

const whatsappNumber =
    "923021275983";


const defaultWhatsAppMessage =
    "Hello VoltFix E-Bike Services, I would like to know more about your e-bike repair and service options.";


function openWhatsApp(message) {

    const text =
        encodeURIComponent(
            message || defaultWhatsAppMessage
        );


    const url =
        `https://wa.me/${whatsappNumber}?text=${text}`;


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* Automatically handle elements
   having data-whatsapp */

$$("[data-whatsapp]").forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        const message =
            this.getAttribute("data-whatsapp");

        openWhatsApp(message);

    });

});


/* =========================================================
   14. CONTACT FORM
   Safe even if form doesn't exist yet.
========================================================= */

const contactForm =
    $("#contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const nameInput =
                contactForm.querySelector(
                    '[name="name"]'
                );

            const serviceInput =
                contactForm.querySelector(
                    '[name="service"]'
                );

            const messageInput =
                contactForm.querySelector(
                    '[name="message"]'
                );


            const name =
                nameInput ?
                nameInput.value.trim() :
                "";


            const service =
                serviceInput ?
                serviceInput.value.trim() :
                "";


            const message =
                messageInput ?
                messageInput.value.trim() :
                "";


            let whatsappMessage =
                "Hello VoltFix E-Bike Services.";


            if (name) {

                whatsappMessage +=
                    `%0A%0AName: ${encodeURIComponent(name)}`;

            }


            if (service) {

                whatsappMessage +=
                    `%0AService: ${encodeURIComponent(service)}`;

            }


            if (message) {

                whatsappMessage +=
                    `%0AMessage: ${encodeURIComponent(message)}`;

            }


            window.open(
                `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}


/* =========================================================
   15. IMAGE PLACEHOLDER HELPER
========================================================= */

function replacePlaceholder(
    selector,
    imagePath,
    altText
) {

    const placeholder =
        document.querySelector(selector);

    if (!placeholder) return;


    const image =
        document.createElement("img");


    image.src = imagePath;

    image.alt =
        altText || "VoltFix E-Bike Services";


    image.loading = "lazy";


    image.addEventListener(
        "error",
        function () {

            image.remove();

        }
    );


    placeholder.replaceWith(image);

}


/* =========================================================
   16. CURRENT YEAR
========================================================= */

const currentYear =
    new Date().getFullYear();


$$("[data-current-year]")
    .forEach(function (element) {

        element.textContent =
            currentYear;

    });


/* =========================================================
   17. BUTTON RIPPLE EFFECT
========================================================= */

$$(".btn").forEach(function (button) {

    button.addEventListener(
        "click",
        function (event) {

            const ripple =
                document.createElement("span");


            ripple.classList.add(
                "button-ripple"
            );


            const rect =
                button.getBoundingClientRect();


            ripple.style.left =
                `${event.clientX - rect.left}px`;


            ripple.style.top =
                `${event.clientY - rect.top}px`;


            button.appendChild(ripple);


            setTimeout(function () {

                ripple.remove();

            }, 600);

        }
    );

});


/* =========================================================
   18. ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   19. PREVENT BROKEN EMPTY LINKS
========================================================= */

$$('a[href="#"]').forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

        }
    );

});


/* =========================================================
   20. PAGE READY
========================================================= */

document.documentElement.classList.add(
    "js-ready"
);


console.log(
    "VoltFix E-Bike Services website loaded successfully."
);
