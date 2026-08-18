/* =========================================================
   RESUME WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       SMOOTH NAVIGATION
    ====================================================== */

    const navLinks = document.querySelectorAll(
        '.navbar a[href^="#"], .btn[href^="#"], footer a[href^="#"]'
    );


    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");


            if (!targetId || targetId === "#") {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });



    /* =====================================================
       COMPANY NAME UNLOCK FUNCTION
    ====================================================== */

    function unlockCompanyNames() {


        const companyElements =
            document.querySelectorAll(
                ".company-hidden"
            );


        companyElements.forEach(function (company) {


            const companyName =
                company.getAttribute(
                    "data-company"
                );


            if (!companyName) {
                return;
            }


            /* ---------------------------------------------
               Start animation
            --------------------------------------------- */

            company.classList.add(
                "unlocking"
            );


            /* ---------------------------------------------
               Change lock icon
            --------------------------------------------- */

            const lockIcon =
                company.querySelector(
                    ".lock-icon"
                );


            if (lockIcon) {

                lockIcon.textContent =
                    "🔓";

            }


            /* ---------------------------------------------
               Change hidden text
            --------------------------------------------- */

            const companyText =
                company.querySelector(
                    ".company-text"
                );


            if (companyText) {

                companyText.textContent =
                    companyName;

            }


            /* ---------------------------------------------
               Add unlocked class
            --------------------------------------------- */

            company.classList.add(
                "unlocked"
            );

        });

    }



    /* =====================================================
       CONTACT FORM
    ====================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    const submitBtn =
        document.getElementById(
            "submitBtn"
        );


    const formStatus =
        document.getElementById(
            "formStatus"
        );


    if (!contactForm) {
        return;
    }



    /* =====================================================
       FORM SUBMIT
    ====================================================== */

    contactForm.addEventListener(
        "submit",
        async function (event) {


            event.preventDefault();


            /* ---------------------------------------------
               Clear previous status
            --------------------------------------------- */

            formStatus.className =
                "form-status";


            formStatus.textContent =
                "";


            /* ---------------------------------------------
               Disable submit button
            --------------------------------------------- */

            submitBtn.disabled =
                true;


            submitBtn.textContent =
                "Sending...";


            /* ---------------------------------------------
               Get form data
            --------------------------------------------- */

            const formData =
                new FormData(
                    contactForm
                );


            try {


                /* -----------------------------------------
                   Send form to Formspree
                ----------------------------------------- */

                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );



                /* =================================================
                   SUCCESS
                ================================================== */

                if (response.ok) {


                    /* -----------------------------------------
                       Success message
                    ----------------------------------------- */

                    formStatus.className =
                        "form-status success";


                    formStatus.textContent =
                        "✓ Thank you! Your message has been sent successfully.";



                    /* -----------------------------------------
                       Reset form
                    ----------------------------------------- */

                    contactForm.reset();



                    /* -----------------------------------------
                       UNLOCK COMPANY NAMES
                    ----------------------------------------- */

                    unlockCompanyNames();



                    /* -----------------------------------------
                       Move recruiter toward experience
                    ----------------------------------------- */

                    setTimeout(
                        function () {


                            const experienceSection =
                                document.getElementById(
                                    "experience"
                                );


                            if (experienceSection) {


                                experienceSection.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                });


                            }

                        },
                        800
                    );


                } else {


                    /* =================================================
                       FORM ERROR
                    ================================================== */

                    let data = {};


                    try {

                        data =
                            await response.json();

                    } catch (error) {

                        data = {};

                    }


                    formStatus.className =
                        "form-status error";


                    if (
                        data &&
                        data.errors &&
                        data.errors.length > 0
                    ) {

                        formStatus.textContent =
                            "Something went wrong. Please check the form and try again.";

                    } else {

                        formStatus.textContent =
                            "Something went wrong. Please try again.";

                    }

                }


            } catch (error) {


                /* =================================================
                   NETWORK ERROR
                ================================================== */

                formStatus.className =
                    "form-status error";


                formStatus.textContent =
                    "Unable to send your message right now. Please try again later.";

            }



            /* =================================================
               RE-ENABLE BUTTON
            ================================================== */

            submitBtn.disabled =
                false;


            submitBtn.textContent =
                "Send Message";


        }
    );



    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navbarLinks =
        document.querySelectorAll(
            ".navbar a"
        );


    const observer =
        new IntersectionObserver(
            function (entries) {


                entries.forEach(
                    function (entry) {


                        if (!entry.isIntersecting) {
                            return;
                        }


                        const currentId =
                            entry.target.getAttribute(
                                "id"
                            );


                        navbarLinks.forEach(
                            function (link) {


                                link.classList.remove(
                                    "active"
                                );


                                if (
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    "#" + currentId
                                ) {


                                    link.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );


                    }
                );


            },
            {
                rootMargin:
                    "-30% 0px -60% 0px",

                threshold: 0
            }
        );


    sections.forEach(
        function (section) {

            observer.observe(
                section
            );

        }
    );



    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    const footerText =
        document.querySelector(
            "footer p"
        );


    if (footerText) {


        const currentYear =
            new Date().getFullYear();


        footerText.textContent =
            `© ${currentYear} Himanshu Singh`;

    }

});