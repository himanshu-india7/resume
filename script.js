/* =========================================================
   RESUME WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const submitBtn =
        document.getElementById("submitBtn");

    const formStatus =
        document.getElementById("formStatus");


    /* =====================================================
       COMPANY LOCK CONFIGURATION
    ====================================================== */

    const COMPANY_UNLOCK_KEY =
        "himanshu_resume_company_unlocked";


    /* =====================================================
       COMPANY REVEAL FUNCTION
    ====================================================== */

    function revealCompanies() {

        const hiddenCompanies =
            document.querySelectorAll(".company-hidden");


        hiddenCompanies.forEach(function (company) {

            const companyName =
                company.getAttribute("data-company");

            const companyText =
                company.querySelector(".company-text");

            const lockIcon =
                company.querySelector(".lock-icon");


            if (!companyName) {
                return;
            }


            /* Change hidden text */

            if (companyText) {

                companyText.textContent =
                    companyName;

            }


            /* Change lock icon */

            if (lockIcon) {

                lockIcon.textContent = "🔓";

            }


            /* Add revealed class */

            company.classList.add(
                "company-revealed"
            );

        });

    }


    /* =====================================================
       CHECK IF COMPANIES WERE ALREADY UNLOCKED
    ====================================================== */

    try {

        const alreadyUnlocked =
            localStorage.getItem(
                COMPANY_UNLOCK_KEY
            );


        if (alreadyUnlocked === "true") {

            revealCompanies();

        }

    } catch (error) {

        console.log(
            "Local storage is not available."
        );

    }


    /* =====================================================
       SMOOTH NAVIGATION
    ====================================================== */

    const navLinks =
        document.querySelectorAll(
            '.navbar a[href^="#"], ' +
            '.btn[href^="#"], ' +
            'footer a[href^="#"]'
        );


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


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


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       CONTACT FORM
    ====================================================== */

    if (!contactForm) {
        return;
    }


    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* =============================================
               CLEAR PREVIOUS STATUS
            ============================================== */

            if (formStatus) {

                formStatus.className =
                    "form-status";

                formStatus.textContent =
                    "";

            }


            /* =============================================
               DISABLE SUBMIT BUTTON
            ============================================== */

            if (submitBtn) {

                submitBtn.disabled = true;

                submitBtn.textContent =
                    "Sending...";

            }


            /* =============================================
               GET FORM DATA
            ============================================== */

            const formData =
                new FormData(contactForm);


            /* =============================================
               SEND FORM TO FORMSPREE
            ============================================== */

            try {

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


                /* =========================================
                   SUCCESS
                ========================================== */

                if (response.ok) {


                    /* -------------------------------------
                       SHOW SUCCESS MESSAGE
                    -------------------------------------- */

                    if (formStatus) {

                        formStatus.className =
                            "form-status success";

                        formStatus.textContent =
                            "✓ Thank you! Your message has been sent successfully.";

                    }


                    /* -------------------------------------
                       RESET FORM
                    -------------------------------------- */

                    contactForm.reset();


                    /* -------------------------------------
                       UNLOCK COMPANY NAMES
                    -------------------------------------- */

                    revealCompanies();


                    /* -------------------------------------
                       SAVE UNLOCK STATUS
                    -------------------------------------- */

                    try {

                        localStorage.setItem(
                            COMPANY_UNLOCK_KEY,
                            "true"
                        );

                    } catch (storageError) {

                        console.log(
                            "Unable to save unlock status."
                        );

                    }

                }


                /* =========================================
                   ERROR RESPONSE
                ========================================== */

                else {

                    let data = {};


                    try {

                        data =
                            await response.json();

                    } catch (jsonError) {

                        data = {};

                    }


                    if (formStatus) {

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

                }

            }


            /* =============================================
               NETWORK ERROR
            ============================================== */

            catch (error) {

                console.error(
                    "Form submission error:",
                    error
                );


                if (formStatus) {

                    formStatus.className =
                        "form-status error";

                    formStatus.textContent =
                        "Unable to send your message right now. Please try again later.";

                }

            }


            /* =============================================
               RE-ENABLE BUTTON
            ============================================== */

            finally {

                if (submitBtn) {

                    submitBtn.disabled = false;

                    submitBtn.textContent =
                        "Send Message";

                }

            }

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


    if (
        sections.length > 0 &&
        navbarLinks.length > 0
    ) {


        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {
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

                observer.observe(section);

            }
        );

    }


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