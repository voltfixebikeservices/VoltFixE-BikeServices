/* =========================================================
   VOLTFIX E-BIKE SERVICES
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initHeader();
    initMobileMenu();
    initRevealAnimations();
    initPaymentTabs();
    initSmoothScroll();
    initVideoHandling();
    initCounterAnimation();
    initWhatsAppLinks();

});


/* =========================================================
   PAGE LOADER
   ========================================================= */

function initLoader() {
    const loader = document.querySelector(".page-loader");

    if (!loader) return;

    // Hide loader when page is fully loaded
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("loaded");

            // Completely remove it after animation
            setTimeout(() => {
                loader.style.display = "none";
            }, 700);

        }, 300);
    });

    // Safety fallback - loader can never stay forever
    setTimeout(() => {
        loader.classList.add("loaded");

        setTimeout(() => {
            loader.style.display = "none";
        }, 700);

    }, 4000);
}


/* =========================================================
   HEADER SCROLL EFFECT
   ========================================================= */

function initHeader() {

    const header = document.querySelector(".header");

    if (!header) return;

    function updateHeader() {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const menuButton =
        document.querySelector(".mobile-menu-button");

    const mobileNav =
        document.querySelector(".mobile-nav");

    if (!menuButton || !mobileNav) return;


    function closeMenu() {

        menuButton.classList.remove("active");

        mobileNav.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    function openMenu() {

        menuButton.classList.add("active");

        mobileNav.classList.add("active");

        document.body.classList.add("menu-open");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    menuButton.addEventListener("click", () => {

        const isOpen =
            mobileNav.classList.contains("active");

        if (isOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    });


    /* Close when clicking a navigation link */

    const mobileLinks =
        mobileNav.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    /* Close with Escape */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            mobileNav.classList.contains("active")
        ) {

            closeMenu();

        }

    });


    /* Close if screen becomes desktop */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            closeMenu();

        }

    });

}


/* =========================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================= */

function initRevealAnimations() {

    const elements =
        document.querySelectorAll(".reveal");

    if (!elements.length) return;


    /* Fallback for older browsers */

    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {

            element.classList.add("visible");

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   PAYMENT TABS
   ========================================================= */

function initPaymentTabs() {

    const tabs =
        document.querySelectorAll(".payment-tab");

    const panels =
        document.querySelectorAll(".payment-panel");

    if (!tabs.length || !panels.length) return;


    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const target =
                tab.getAttribute("data-payment");


            /* Remove active state */

            tabs.forEach(item => {

                item.classList.remove("active");

            });


            panels.forEach(panel => {

                panel.classList.remove("active");

            });


            /* Activate selected tab */

            tab.classList.add("active");


            const targetPanel =
                document.querySelector(
                    `.payment-panel[data-payment="${target}"]`
                );


            if (targetPanel) {

                targetPanel.classList.add("active");

            }

        });

    });

}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) return;


            event.preventDefault();


            const header =
                document.querySelector(".header");


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });

}


/* =========================================================
   HERO VIDEO HANDLING
   ========================================================= */

function initVideoHandling() {

    const video =
        document.querySelector(".hero-video");

    if (!video) return;


    /* Try autoplay */

    const playVideo = () => {

        const promise =
            video.play();


        if (
            promise !== undefined
        ) {

            promise.catch(() => {

                /*
                 Video autoplay may be blocked
                 by the browser.

                 The fallback background will
                 remain visible.
                */

            });

        }

    };


    playVideo();


    video.addEventListener(
        "canplay",
        playVideo
    );


    /* Pause video when page is hidden */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                video.pause();

            } else {

                playVideo();

            }

        }
    );

}


/* =========================================================
   NUMBER COUNTER ANIMATION
   ========================================================= */

function initCounterAnimation() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    if (!counters.length) return;


    if (!("IntersectionObserver" in window)) {

        counters.forEach(counter => {

            counter.textContent =
                counter.dataset.counter;

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    const counter =
                        entry.target;


                    animateCounter(counter);


                    observer.unobserve(counter);

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(counter => {

        observer.observe(counter);

    });

}


/* =========================================================
   COUNTER FUNCTION
   ========================================================= */

function animateCounter(counter) {

    const target =
        parseFloat(
            counter.dataset.counter
        );


    if (Number.isNaN(target)) return;


    const duration = 1500;

    const startTime =
        performance.now();


    function update(currentTime) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /* Ease out */

        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            target * eased;


        if (
            Number.isInteger(target)
        ) {

            counter.textContent =
                Math.floor(value);

        } else {

            counter.textContent =
                value.toFixed(1);

        }


        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            counter.textContent =
                target;

        }

    }


    requestAnimationFrame(update);

}


/* =========================================================
   WHATSAPP LINKS
   ========================================================= */

function initWhatsAppLinks() {

    const phoneNumber =
        "923021275983";


    const defaultMessage =
        "Hello VoltFix E-Bike Services, I would like to know more about your services.";


    const whatsappLinks =
        document.querySelectorAll(
            "[data-whatsapp]"
        );


    whatsappLinks.forEach(link => {

        const customMessage =
            link.dataset.whatsapp ||
            defaultMessage;


        const whatsappURL =
            `https://wa.me/${phoneNumber}?text=${encodeURIComponent(customMessage)}`;


        link.setAttribute(
            "href",
            whatsappURL
        );


        link.setAttribute(
            "target",
            "_blank"
        );


        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            '.desktop-nav a[href^="#"]'
        );


    if (
        !sections.length ||
        !navLinks.length
    ) {

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    const id =
                        entry.target.id;


                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute(
                                "href"
                            ) === `#${id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


/* =========================================================
   COPY PAYMENT NUMBER
   ========================================================= */

function initCopyPaymentNumber() {

    const copyButtons =
        document.querySelectorAll(
            "[data-copy]"
        );


    copyButtons.forEach(button => {

        button.addEventListener(
            "click",
            async () => {

                const value =
                    button.dataset.copy;


                if (!value) return;


                try {

                    await navigator.clipboard.writeText(
                        value
                    );


                    const originalText =
                        button.textContent;


                    button.textContent =
                        "COPIED";


                    setTimeout(() => {

                        button.textContent =
                            originalText;

                    }, 1500);


                } catch (error) {

                    console.log(
                        "Copy failed:",
                        error
                    );

                }

            }
        );

    });

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function createBackToTop() {

    const button =
        document.querySelector(
            ".back-to-top"
        );


    if (!button) return;


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 600) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );

            }

        },
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   LAZY LOAD IMAGES
   ========================================================= */

function initLazyImages() {

    const images =
        document.querySelectorAll(
            "img[data-src]"
        );


    if (!images.length) return;


    if (
        !("IntersectionObserver" in window)
    ) {

        images.forEach(img => {

            img.src =
                img.dataset.src;

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    const img =
                        entry.target;


                    img.src =
                        img.dataset.src;


                    img.removeAttribute(
                        "data-src"
                    );


                    observer.unobserve(img);

                });

            },
            {
                rootMargin:
                    "200px"
            }
        );


    images.forEach(image => {

        observer.observe(image);

    });

}


/* =========================================================
   INITIALIZE OPTIONAL FEATURES
   ========================================================= */

initActiveNavigation();
initCopyPaymentNumber();
createBackToTop();
initLazyImages();


/* =========================================================
   CONSOLE MESSAGE
   ========================================================= */

console.log(
    "%cVoltFix E-Bike Services",
    "font-size:18px;font-weight:bold;color:#9A2727;"
);


console.log(
    "%cWebsite initialized successfully.",
    "color:#CCBA45;"
);
