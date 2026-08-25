/* =========================================================
   VOLTFiX E-BIKE SERVICES
   Main Website JavaScript
   ========================================================= */


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

      navLinks.classList.toggle("mobile-open");

      const icon = menuBtn.querySelector("i");

      if (navLinks.classList.contains("mobile-open")) {

        if (icon) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        }

      } else {

        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }

      }

    });


    /* Close menu after clicking a link */

    const mobileLinks =
      navLinks.querySelectorAll("a");

    mobileLinks.forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove(
          "mobile-open"
        );

        const icon =
          menuBtn.querySelector("i");

        if (icon) {

          icon.classList.remove(
            "fa-xmark"
          );

          icon.classList.add(
            "fa-bars"
          );

        }

      });

    });

  }



  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  const yearElement =
    document.getElementById("year");

  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }



  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "show"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.15
        }
      );


    revealElements.forEach(element => {

      observer.observe(element);

    });

  } else {

    revealElements.forEach(element => {

      element.classList.add("show");

    });

  }



  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  const sections =
    document.querySelectorAll(
      "section[id], footer[id]"
    );

  const navItems =
    document.querySelectorAll(
      ".nav-links a"
    );


  function updateActiveNav() {

    let currentSection = "";

    const scrollPosition =
      window.scrollY + 150;


    sections.forEach(section => {

      const sectionTop =
        section.offsetTop;

      const sectionHeight =
        section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition <
          sectionTop + sectionHeight
      ) {

        currentSection =
          section.getAttribute("id");

      }

    });


    navItems.forEach(link => {

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
    updateActiveNav,
    {
      passive: true
    }
  );


  updateActiveNav();



  /* =======================================================
     SMOOTH SCROLL
     ======================================================= */

  const smoothLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  smoothLinks.forEach(link => {

    link.addEventListener(
      "click",
      event => {

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


        if (target) {

          event.preventDefault();


          const header =
            document.querySelector(
              ".header"
            );


          const headerHeight =
            header
              ? header.offsetHeight
              : 0;


          const targetPosition =
            target.getBoundingClientRect()
              .top +
            window.scrollY -
            headerHeight;


          window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

          });

        }

      }
    );

  });



  /* =======================================================
     SERVICE CARD EFFECT
     ======================================================= */

  const serviceCards =
    document.querySelectorAll(
      ".service-card"
    );


  serviceCards.forEach(card => {

    card.addEventListener(
      "mouseenter",
      () => {

        card.style.transform =
          "translateY(-4px)";

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform =
          "";

      }
    );

  });



  /* =======================================================
     TEAM CARD EFFECT
     ======================================================= */

  const teamCards =
    document.querySelectorAll(
      ".team-card"
    );


  teamCards.forEach(card => {

    card.addEventListener(
      "mouseenter",
      () => {

        card.style.transform =
          "translateY(-4px)";

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform =
          "";

      }
    );

  });



  /* =======================================================
     WHATSAPP BUTTON TRACKING
     ======================================================= */

  const whatsappButtons =
    document.querySelectorAll(
      'a[href*="wa.me"]'
    );


  whatsappButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        console.log(
          "VOLTFiX WhatsApp button clicked."
        );

      }
    );

  });



  /* =======================================================
     IMAGE FALLBACK
     ======================================================= */

  const images =
    document.querySelectorAll(
      "img"
    );


  images.forEach(image => {

    image.addEventListener(
      "error",
      () => {

        image.classList.add(
          "image-error"
        );

        /*
         * Don't completely break the layout
         * if an image hasn't been uploaded yet.
         */

        image.style.opacity = "0";

      }
    );

  });



  /* =======================================================
     PREVENT EMPTY # LINKS
     ======================================================= */

  const emptyLinks =
    document.querySelectorAll(
      'a[href="#"]'
    );


  emptyLinks.forEach(link => {

    link.addEventListener(
      "click",
      event => {

        event.preventDefault();

      }
    );

  });



  /* =======================================================
     ESC KEY — CLOSE MOBILE MENU
     ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        navLinks &&
        navLinks.classList.contains(
          "mobile-open"
        )
      ) {

        navLinks.classList.remove(
          "mobile-open"
        );


        const icon =
          menuBtn
            ? menuBtn.querySelector("i")
            : null;


        if (icon) {

          icon.classList.remove(
            "fa-xmark"
          );

          icon.classList.add(
            "fa-bars"
          );

        }

      }

    }
  );


});
