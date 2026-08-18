// ============================================================
// RESUME WEBSITE - SCRIPT
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // SMOOTH SCROLLING
    // ========================================================

    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');

    navLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            const targetId = this.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // ========================================================
    // ACTIVE NAVIGATION LINK
    // ========================================================

    const sections = document.querySelectorAll("main section[id]");

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.getAttribute("id");

                    navLinks.forEach(link => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${currentId}`
                        ) {
                            link.classList.add("active");
                        }

                    });

                }

            });

        },
        {
            rootMargin: "-25% 0px -65% 0px",
            threshold: 0
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });


    // ========================================================
    // BACK TO TOP
    // ========================================================

    const backToTop = document.querySelector('footer a[href="#summary"]');

    if (backToTop) {

        backToTop.addEventListener("click", function (event) {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    // ========================================================
    // CURRENT YEAR
    // ========================================================

    const footerText = document.querySelector("footer p");

    if (footerText) {

        const currentYear = new Date().getFullYear();

        footerText.innerHTML =
            `© ${currentYear} Himanshu Singh`;

    }


    // ========================================================
    // SCROLL EFFECT FOR NAVBAR
    // ========================================================

    const navbar = document.querySelector(".navbar");

    if (navbar) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 50) {

                navbar.classList.add("scrolled");

            } else {

                navbar.classList.remove("scrolled");

            }

        });

    }


    // ========================================================
    // EXTERNAL LINKS
    // ========================================================

    const externalLinks =
        document.querySelectorAll('a[target="_blank"]');

    externalLinks.forEach(link => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    // ========================================================
    // SIMPLE FADE-IN ANIMATION
    // ========================================================

    const animatedElements =
        document.querySelectorAll(
            ".card, .skill-card, .experience-card, .project-card, .education-card"
        );

    const animationObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.1
        }
    );

    animatedElements.forEach(element => {

        element.classList.add("fade-in");

        animationObserver.observe(element);

    });


    // ========================================================
    // CONSOLE MESSAGE
    // ========================================================

    console.log(
        "Himanshu Singh Resume Website Loaded Successfully."
    );

});