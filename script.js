/* =====================================================
   VOLTFIX WEBSITE SETTINGS
   =====================================================

   IMPORTANT:

   Yahan apna REAL WhatsApp number lagao.

   Pakistan example:

   923001234567

   + sign nahi lagana.
   Spaces nahi lagani.
   ===================================================== */

const WHATSAPP_NUMBER = "923001234567";


/* ================= WHATSAPP BUTTON ================= */

const whatsappButton =
    document.getElementById("whatsappButton");

if (whatsappButton) {

    whatsappButton.href =
        `https://wa.me/${WHATSAPP_NUMBER}?text=` +
        encodeURIComponent(
            "Assalam-o-Alaikum VOLTFiX, mujhe e-bike service chahiye."
        );

    whatsappButton.target = "_blank";
}


/* ================= BOOKING FORM ================= */

const bookingForm =
    document.getElementById("bookingForm");


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "customerName"
                ).value;


            const bike =
                document.getElementById(
                    "bikeModel"
                ).value;


            const area =
                document.getElementById(
                    "area"
                ).value;


            const service =
                document.getElementById(
                    "serviceType"
                ).value;


            const problem =
                document.getElementById(
                    "problem"
                ).value;


            const message =
`
Assalam-o-Alaikum VOLTFiX!

I want to book an E-Bike service.

Name:
${name}

Bike:
${bike}

Area:
${area}

Service:
${service}

Problem:
${problem}
`;


            const whatsappURL =
                `https://wa.me/${WHATSAPP_NUMBER}?text=` +
                encodeURIComponent(message);


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


/* ================= HEADER SCROLL ================= */

window.addEventListener(
    "scroll",
    function() {

        const header =
            document.querySelector(".header");

        if (window.scrollY > 50) {

            header.style.background =
                "rgba(5,6,7,.94)";

        } else {

            header.style.background =
                "rgba(5,6,7,.78)";

        }

    }
);
