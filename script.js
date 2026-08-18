/* =========================================================
   RESUME WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);

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
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("main section[id]");


    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY +
            180;


        sections.forEach(function (section) {

            const sectionTop = section.offsetTop;

            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === "#" + currentSection) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    window.addEventListener(
        "resize",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       RECRUITER CONTACT FORM
       FORMSPREE
    ===================================================== */

    const form =
        document.getElementById("recruiterForm");

    const successMessage =
        document.getElementById("formSuccess");

    const errorMessage =
        document.getElementById("formError");

    const submitButton =
        document.getElementById("submitButton");


    if (form) {

        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                /* Hide old messages */

                successMessage.classList.remove("show");

                errorMessage.classList.remove("show");


                /* Disable button */

                submitButton.disabled = true;

                submitButton.textContent =
                    "Sending...";


                try {

                    const formData =
                        new FormData(form);


                    const response =
                        await fetch(
                            form.action,
                            {
                                method: "POST",

                                body: formData,

                                headers: {
                                    "Accept":
                                        "application/json"
                                }
                            }
                        );


                    if (response.ok) {

                        /* Show success */

                        successMessage.classList.add(
                            "show"
                        );


                        /* Clear form */

                        form.reset();


                        /* Scroll to message */

                        setTimeout(function () {

                            successMessage.scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            });

                        }, 100);


                    } else {

                        throw new Error(
                            "Form submission failed"
                        );

                    }

                } catch (error) {

                    console.error(
                        "Form submission error:",
                        error
                    );

                    errorMessage.classList.add(
                        "show"
                    );

                }


                /* Enable button */

                submitButton.disabled = false;

                submitButton.textContent =
                    "Send Message";

            }
        );

    }


    /* =====================================================
       CONTACT FORM VALIDATION
    ===================================================== */

    const emailInput =
        document.getElementById("email");


    if (emailInput) {

        emailInput.addEventListener(
            "input",
            function () {

                if (
                    this.value &&
                    !this.checkValidity()
                ) {

                    this.style.borderColor =
                        "#d33";

                } else {

                    this.style.borderColor =
                        "";

                }

            }
        );

    }


    /* =====================================================
       PHONE - SIMPLE CLEANING
    ===================================================== */

    const phoneInput =
        document.getElementById("phone");


    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            function () {

                /*
                 * Allows:
                 * +91
                 * numbers
                 * spaces
                 * hyphen
                 * brackets
                 */

                this.value =
                    this.value.replace(
                        /[^0-9+\-\s()]/g,
                        ""
                    );

            }
        );

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.querySelector(
            'footer a[href="#summary"]'
        );


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function (event) {

                const target =
                    document.getElementById(
                        "summary"
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }


    /* =====================================================
       PAGE LOAD
    ===================================================== */

    console.log(
        "Himanshu Singh Resume Website Loaded Successfully."
    );

});