/* =========================================================
   RESUME WEBSITE JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       NAVBAR ACTIVE SECTION
    ====================================================== */

    const sections = document.querySelectorAll("main section");

    const navLinks = document.querySelectorAll(".navbar a");


    const observerOptions = {
        root: null,
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0
    };


    const sectionObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const currentId = entry.target.getAttribute("id");


                    navLinks.forEach(function (link) {

                        link.classList.remove("active");

                        const href = link.getAttribute("href");

                        if (href === "#" + currentId) {

                            link.classList.add("active");

                        }

                    });

                }

            });

        },
        observerOptions
    );


    sections.forEach(function (section) {

        sectionObserver.observe(section);

    });



    /* =====================================================
       SMOOTH NAVIGATION
    ====================================================== */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {

                return;

            }


            const target = document.querySelector(targetId);


            if (!target) {

                return;

            }


            event.preventDefault();


            const navbar = document.querySelector(".navbar");

            const navbarHeight = navbar
                ? navbar.offsetHeight
                : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                navbarHeight -
                10;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });



    /* =====================================================
       RECRUITER FORM
    ====================================================== */

    const form =
        document.getElementById("recruiterForm");


    const status =
        document.getElementById("formStatus");


    const submitButton =
        document.getElementById("submitButton");


    if (form) {


        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                status.textContent = "";

                status.className = "form-status";


                submitButton.disabled = true;

                submitButton.textContent =
                    "Sending...";


                const formData =
                    new FormData(form);


                try {


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


                        status.textContent =
                            "Thank you! Your message has been sent successfully.";


                        status.classList.add(
                            "success"
                        );


                        form.reset();


                        submitButton.textContent =
                            "Message Sent ✓";


                        setTimeout(
                            function () {

                                submitButton.disabled =
                                    false;

                                submitButton.textContent =
                                    "Send Message";

                            },
                            4000
                        );


                    } else {


                        const data =
                            await response.json()
                                .catch(
                                    function () {
                                        return {};
                                    }
                                );


                        if (
                            data &&
                            data.errors
                        ) {

                            status.textContent =
                                data.errors
                                    .map(
                                        function (error) {
                                            return error.message;
                                        }
                                    )
                                    .join(", ");

                        } else {

                            status.textContent =
                                "Something went wrong. Please try again.";

                        }


                        status.classList.add(
                            "error"
                        );


                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            "Send Message";

                    }


                } catch (error) {


                    console.error(
                        "Form submission error:",
                        error
                    );


                    status.textContent =
                        "Unable to send the message. Please try again or contact me by email.";


                    status.classList.add(
                        "error"
                    );


                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "Send Message";

                }

            }
        );

    }



    /* =====================================================
       DOWNLOAD TRACKING / BUTTON FEEDBACK
    ====================================================== */

    const downloadButton =
        document.querySelector(
            'a[download]'
        );


    if (downloadButton) {

        downloadButton.addEventListener(
            "click",
            function () {

                console.log(
                    "Resume download requested."
                );

            }
        );

    }



    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    const footerYear =
        document.querySelector(
            "footer p"
        );


    if (footerYear) {

        footerYear.innerHTML =
            "© " +
            new Date().getFullYear() +
            " Himanshu Singh";

    }


});