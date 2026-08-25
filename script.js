/* =========================================================
   VOLTFIX E-BIKE SERVICES
   Main JavaScript
   ========================================================= */


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PRELOADER
       ===================================================== */

    const body = document.body;

    window.addEventListener("load", function () {

        setTimeout(function () {

            body.classList.add("loaded");

        }, 700);

    });


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    const header =
        document.querySelector(".site-header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 60) {

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


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const mobileMenuButton =
        document.querySelector(
            ".mobile-menu-button"
        );

    const mobileMenu =
        document.querySelector(
            ".mobile-menu"
        );

    const mobileMenuClose =
        document.querySelector(
            ".mobile-menu-close"
        );

    const mobileLinks =
        document.querySelectorAll(
            ".mobile-navigation a"
        );


    function openMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.add("open");

        body.classList.add("menu-open");

    }


    function closeMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("open");

        body.classList.remove("menu-open");

    }


    if (mobileMenuButton) {

        mobileMenuButton.addEventListener(
            "click",
            openMobileMenu
        );

    }


    if (mobileMenuClose) {

        mobileMenuClose.addEventListener(
            "click",
            closeMobileMenu
        );

    }


    mobileLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       HERO SLIDER
       ===================================================== */

    const heroSlides =
        document.querySelectorAll(
            ".hero-slide"
        );

    const heroDots =
        document.querySelectorAll(
            ".hero-dot"
        );

    const heroNext =
        document.querySelector(
            ".hero-next"
        );

    const heroPrev =
        document.querySelector(
            ".hero-prev"
        );


    let heroIndex = 0;

    let heroTimer;


    function showHeroSlide(index) {

        if (!heroSlides.length) return;


        if (index >= heroSlides.length) {

            index = 0;

        }


        if (index < 0) {

            index =
                heroSlides.length - 1;

        }


        heroSlides.forEach(
            function (slide, i) {

                slide.classList.toggle(
                    "active",
                    i === index
                );

            }
        );


        heroDots.forEach(
            function (dot, i) {

                dot.classList.toggle(
                    "active",
                    i === index
                );

            }
        );


        heroIndex = index;

    }


    function nextHeroSlide() {

        showHeroSlide(
            heroIndex + 1
        );

        restartHeroTimer();

    }


    function previousHeroSlide() {

        showHeroSlide(
            heroIndex - 1
        );

        restartHeroTimer();

    }


    function startHeroTimer() {

        clearInterval(heroTimer);

        heroTimer =
            setInterval(
                function () {

                    showHeroSlide(
                        heroIndex + 1
                    );

                },
                6000
            );

    }


    function restartHeroTimer() {

        clearInterval(heroTimer);

        startHeroTimer();

    }


    if (heroNext) {

        heroNext.addEventListener(
            "click",
            nextHeroSlide
        );

    }


    if (heroPrev) {

        heroPrev.addEventListener(
            "click",
            previousHeroSlide
        );

    }


    heroDots.forEach(
        function (dot, index) {

            dot.addEventListener(
                "click",
                function () {

                    showHeroSlide(index);

                    restartHeroTimer();

                }
            );

        }
    );


    if (heroSlides.length) {

        showHeroSlide(0);

        startHeroTimer();

    }


    /* =====================================================
       HERO TOUCH / SWIPE
       ===================================================== */

    const heroSection =
        document.querySelector(
            ".hero-section"
        );

    let heroTouchStart = 0;

    let heroTouchEnd = 0;


    if (heroSection) {

        heroSection.addEventListener(
            "touchstart",
            function (event) {

                heroTouchStart =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );


        heroSection.addEventListener(
            "touchend",
            function (event) {

                heroTouchEnd =
                    event.changedTouches[0].screenX;

                handleHeroSwipe();

            },
            { passive: true }
        );

    }


    function handleHeroSwipe() {

        const distance =
            heroTouchStart -
            heroTouchEnd;


        if (Math.abs(distance) < 50) {

            return;

        }


        if (distance > 0) {

            nextHeroSlide();

        } else {

            previousHeroSlide();

        }

    }


    /* =====================================================
       WORK SLIDER
       ===================================================== */

    const workSlides =
        document.querySelectorAll(
            ".work-slide"
        );

    const workNext =
        document.querySelector(
            ".work-next"
        );

    const workPrev =
        document.querySelector(
            ".work-prev"
        );

    const workCounter =
        document.querySelector(
            "#workCounter"
        );


    let workIndex = 0;


    function updateWorkCounter() {

        if (!workCounter) return;

        const current =
            String(workIndex + 1)
                .padStart(2, "0");

        const total =
            String(workSlides.length)
                .padStart(2, "0");

        workCounter.textContent =
            current + " / " + total;

    }


    function showWorkSlide(index) {

        if (!workSlides.length) return;


        if (index >= workSlides.length) {

            index = 0;

        }


        if (index < 0) {

            index =
                workSlides.length - 1;

        }


        workSlides.forEach(
            function (slide, i) {

                slide.classList.toggle(
                    "active",
                    i === index
                );

            }
        );


        workIndex = index;

        updateWorkCounter();

    }


    if (workNext) {

        workNext.addEventListener(
            "click",
            function () {

                showWorkSlide(
                    workIndex + 1
                );

            }
        );

    }


    if (workPrev) {

        workPrev.addEventListener(
            "click",
            function () {

                showWorkSlide(
                    workIndex - 1
                );

            }
        );

    }


    if (workSlides.length) {

        showWorkSlide(0);

    }


    /* =====================================================
       REVIEWS SLIDER
       ===================================================== */

    const reviews =
        document.querySelectorAll(
            ".review"
        );

    const reviewNext =
        document.querySelector(
            ".review-next"
        );

    const reviewPrev =
        document.querySelector(
            ".review-prev"
        );


    let reviewIndex = 0;


    function showReview(index) {

        if (!reviews.length) return;


        if (index >= reviews.length) {

            index = 0;

        }


        if (index < 0) {

            index =
                reviews.length - 1;

        }


        reviews.forEach(
            function (review, i) {

                review.classList.toggle(
                    "active",
                    i === index
                );

            }
        );


        reviewIndex = index;

    }


    if (reviewNext) {

        reviewNext.addEventListener(
            "click",
            function () {

                showReview(
                    reviewIndex + 1
                );

            }
        );

    }


    if (reviewPrev) {

        reviewPrev.addEventListener(
            "click",
            function () {

                showReview(
                    reviewIndex - 1
                );

            }
        );

    }


    if (reviews.length) {

        showReview(0);

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add("visible");

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const navigationLinks =
        document.querySelectorAll(
            ".main-navigation a"
        );

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    function updateActiveNavigation() {

        let currentSection = "";


        sections.forEach(
            function (section) {

                const sectionTop =
                    section.offsetTop - 150;

                const sectionHeight =
                    section.offsetHeight;

                if (
                    window.scrollY >=
                        sectionTop &&
                    window.scrollY <
                        sectionTop +
                        sectionHeight
                ) {

                    currentSection =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navigationLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );


                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    href ===
                    "#" + currentSection
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    updateActiveNavigation();


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


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


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.offsetTop -
                        headerHeight;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });


                    closeMobileMenu();

                }
            );

        }
    );


    /* =====================================================
       PARALLAX
       ===================================================== */

    const parallaxSections =
        document.querySelectorAll(
            ".parallax-section"
        );


    function updateParallax() {

        if (
            window.innerWidth <= 650
        ) {

            return;

        }


        parallaxSections.forEach(
            function (section) {

                const rect =
                    section.getBoundingClientRect();


                const windowHeight =
                    window.innerHeight;


                if (
                    rect.bottom < 0 ||
                    rect.top > windowHeight
                ) {

                    return;

                }


                const progress =
                    (
                        windowHeight -
                        rect.top
                    ) /
                    (
                        windowHeight +
                        rect.height
                    );


                const movement =
                    (
                        progress -
                        0.5
                    ) * 80;


                section.style
                    .backgroundPosition =
                    "center " +
                    movement +
                    "px";

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateParallax,
        { passive: true }
    );


    /* =====================================================
       COUNTER ANIMATION
       ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    function animateCounter(element) {

        const target =
            parseInt(
                element.dataset.counter,
                10
            );


        if (
            Number.isNaN(target)
        ) {

            return;

        }


        const duration = 1600;

        const startTime =
            performance.now();


        function updateCounter(
            currentTime
        ) {

            const elapsed =
                currentTime -
                startTime;

            const progress =
                Math.min(
                    elapsed /
                    duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            element.textContent =
                Math.floor(
                    target * eased
                );


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                element.textContent =
                    target.toLocaleString();

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    }


    if (
        counters.length &&
        "IntersectionObserver"
        in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                function (
                    entries,
                    observer
                ) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                animateCounter(
                                    entry.target
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: .6
                }
            );


        counters.forEach(
            function (counter) {

                counterObserver.observe(
                    counter
                );

            }
        );

    }


    /* =====================================================
       BOOKING FORM
       ===================================================== */

    const bookingForm =
        document.querySelector(
            "#bookingForm"
        );


    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    bookingForm
                        .querySelector(
                            '[name="name"]'
                        )?.value
                        .trim() || "";


                const phone =
                    bookingForm
                        .querySelector(
                            '[name="phone"]'
                        )?.value
                        .trim() || "";


                const service =
                    bookingForm
                        .querySelector(
                            '[name="service"]'
                        )?.value
                        .trim() || "";


                const bike =
                    bookingForm
                        .querySelector(
                            '[name="bike"]'
                        )?.value
                        .trim() || "";


                const message =
                    bookingForm
                        .querySelector(
                            '[name="message"]'
                        )?.value
                        .trim() || "";


                if (!name || !phone) {

                    alert(
                        "Please enter your name and phone number."
                    );

                    return;

                }


                /*
                    IMPORTANT:

                    Replace this number with the
                    official VOLTFiX WhatsApp number.

                    Use international format
                    WITHOUT + or spaces.

                    Example:
                    923001234567
                */

                const whatsappNumber =
                    "923XXXXXXXXX";


                const whatsappMessage =
                    "VOLTFiX E-Bike Services - Service Booking\n\n" +

                    "Name: " +
                    name +
                    "\n" +

                    "Phone: " +
                    phone +
                    "\n" +

                    "Service: " +
                    service +
                    "\n" +

                    "Bike: " +
                    bike +
                    "\n" +

                    "Message: " +
                    message;


                const whatsappURL =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    encodeURIComponent(
                        whatsappMessage
                    );


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


    /* =====================================================
       PHONE NUMBER LINKS
       ===================================================== */

    document
        .querySelectorAll(
            "[data-phone]"
        )
        .forEach(
            function (element) {

                const phone =
                    element.dataset.phone;


                if (!phone) return;


                element.addEventListener(
                    "click",
                    function () {

                        window.location.href =
                            "tel:" +
                            phone;

                    }
                );

            }
        );


    /* =====================================================
       COPY PHONE / EMAIL
       ===================================================== */

    document
        .querySelectorAll(
            "[data-copy]"
        )
        .forEach(
            function (element) {

                element.addEventListener(
                    "click",
                    async function () {

                        const text =
                            element.dataset.copy;


                        if (!text) return;


                        try {

                            await navigator
                                .clipboard
                                .writeText(text);


                            const oldText =
                                element.textContent;


                            element.textContent =
                                "COPIED";


                            setTimeout(
                                function () {

                                    element.textContent =
                                        oldText;

                                },
                                1200
                            );

                        } catch (error) {

                            console.log(
                                "Copy failed:",
                                error
                            );

                        }

                    }
                );

            }
        );


    /* =====================================================
       IMAGE LAZY LOADING
       ===================================================== */

    document
        .querySelectorAll(
            "img[data-src]"
        )
        .forEach(
            function (image) {

                image.src =
                    image.dataset.src;

                image.removeAttribute(
                    "data-src"
                );

            }
        );


    /* =====================================================
       IMAGE ERROR FALLBACK
       ===================================================== */

    document
        .querySelectorAll(
            "img"
        )
        .forEach(
            function (image) {

                image.addEventListener(
                    "error",
                    function () {

                        image.style.display =
                            "none";

                    }
                );

            }
        );


    /* =====================================================
       KEYBOARD HERO CONTROLS
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "ArrowRight"
            ) {

                nextHeroSlide();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                previousHeroSlide();

            }

        }
    );


    /* =====================================================
       PAUSE HERO ON HOVER
       ===================================================== */

    if (heroSection) {

        heroSection.addEventListener(
            "mouseenter",
            function () {

                clearInterval(
                    heroTimer
                );

            }
        );


        heroSection.addEventListener(
            "mouseleave",
            function () {

                startHeroTimer();

            }
        );

    }


    /* =====================================================
       PREVENT EMPTY LINKS
       ===================================================== */

    document
        .querySelectorAll(
            'a[href="#"]'
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                    }
                );

            }
        );


    /* =====================================================
       YEAR
       ===================================================== */

    document
        .querySelectorAll(
            "[data-year]"
        )
        .forEach(
            function (element) {

                element.textContent =
                    new Date()
                        .getFullYear();

            }
        );


    /* =====================================================
       CONSOLE
       ===================================================== */

    console.log(
        "%cVOLTFiX E-Bike Services",
        "font-size:18px;font-weight:bold;"
    );

    console.log(
        "Website initialized successfully."
    );

});
