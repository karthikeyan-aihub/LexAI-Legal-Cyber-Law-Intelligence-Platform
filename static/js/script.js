/*
==========================================================
LexAI - Global JavaScript
Author : Karthikeyan S
Version : 2.0
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* ======================================================
       DOM Elements
    ====================================================== */

    const body = document.body;

    const loader = document.getElementById("page-loader");

    const scrollBtn = document.getElementById("scrollTopBtn");

    const themeToggle = document.getElementById("themeToggle");

    const themeIcon = document.getElementById("themeIcon");

    const navbar = document.querySelector(".navbar");

    const toastElement = document.getElementById("liveToast");

    const toastBody = document.getElementById("toastMessage");



    /* ======================================================
       Loading Overlay
    ====================================================== */

    function hideLoader() {

        if (!loader) return;

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 300);

    }

    window.addEventListener("load", hideLoader);

    /* ======================================================
       Scroll To Top
    ====================================================== */

    if (scrollBtn) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 250) {

                scrollBtn.classList.add("show");

            }

            else {

                scrollBtn.classList.remove("show");

            }

        });

        scrollBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }



    /* ======================================================
       Navbar Shadow
    ====================================================== */

    if (navbar) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 10) {

                navbar.classList.add("shadow");

            }

            else {

                navbar.classList.remove("shadow");

            }

        });

    }



    /* ======================================================
       Active Navigation
    ====================================================== */

    const navLinks =

        document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        if (link.href === window.location.href) {

            link.classList.add("active");

        }

    });



    /* ======================================================
       Fade Page Animation
    ====================================================== */

    requestAnimationFrame(() => {

        body.classList.add("page-loaded");

    });



    /* ======================================================
       Smooth Anchor Links
    ====================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target =

                document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });



    /* ======================================================
       Global Toast Helper
    ====================================================== */

    window.showToast = function (

        message,

        type = "primary",

        delay = 3000

    ) {

        if (!toastElement || !toastBody) return;

        toastElement.className =

            `toast align-items-center text-bg-${type} border-0`;

        toastBody.innerHTML = message;

        const toast =

            bootstrap.Toast.getOrCreateInstance(

                toastElement,

                {

                    delay: delay

                }

            );

        toast.show();

    };
        /* ======================================================
       Loading Helper
    ====================================================== */

    window.showLoader = function () {

        if (!loader) return;

        loader.style.display = "flex";

        requestAnimationFrame(() => {

            loader.style.opacity = "1";

        });

    };

    window.hideLoader = hideLoader;



    /* ======================================================
       Button Loading State
    ====================================================== */

    window.setButtonLoading = function (

        button,

        loading = true,

        loadingText = "Please wait..."

    ) {

        if (!button) return;

        if (loading) {

            button.dataset.originalText = button.innerHTML;

            button.disabled = true;

            button.innerHTML = `
                <span class="spinner-border spinner-border-sm me-2"></span>
                ${loadingText}
            `;

        } else {

            button.disabled = false;

            if (button.dataset.originalText) {

                button.innerHTML = button.dataset.originalText;

            }

        }

    };



    /* ======================================================
       Bootstrap Confirmation Modal
    ====================================================== */

    window.showConfirmModal = function (

        message,

        onConfirm

    ) {

        const modalElement =

            document.getElementById("confirmModal");

        const messageElement =

            document.getElementById("confirmMessage");

        const yesButton =

            document.getElementById("confirmYesBtn");

        if (!modalElement ||

            !messageElement ||

            !yesButton) {

            if (confirm(message)) {

                onConfirm?.();

            }

            return;

        }

        messageElement.textContent = message;

        const modal =

            bootstrap.Modal.getOrCreateInstance(

                modalElement

            );

        const handler = () => {

            modal.hide();

            onConfirm?.();

            yesButton.removeEventListener(

                "click",

                handler

            );

        };

        yesButton.addEventListener(

            "click",

            handler

        );

        modal.show();

    };



    /* ======================================================
       Copy To Clipboard
    ====================================================== */

    window.copyText = async function (text) {

        try {

            await navigator.clipboard.writeText(text);

            showToast(

                "Copied to clipboard",

                "success"

            );

        }

        catch {

            showToast(

                "Copy failed",

                "danger"

            );

        }

    };



    /* ======================================================
       Keyboard Shortcut
       Ctrl + /
    ====================================================== */

    document.addEventListener(

        "keydown",

        function (event) {

            if (

                event.ctrlKey &&

                event.key === "/"

            ) {

                event.preventDefault();

                const input =

                    document.getElementById(

                        "user-input"

                    );

                if (input) {

                    input.focus();

                }

            }

        }

    );



    /* ======================================================
       Network Status
    ====================================================== */

    window.addEventListener(

        "offline",

        () => {

            showToast(

                "You are offline.",

                "warning",

                5000

            );

        }

    );

    window.addEventListener(

        "online",

        () => {

            showToast(

                "Connection restored.",

                "success"

            );

        }

    );



    /* ======================================================
       Prevent Double Form Submit
    ====================================================== */

    document.querySelectorAll("form").forEach(form => {

        form.addEventListener("submit", () => {

            const submitButton =

                form.querySelector(

                    'button[type="submit"]'

                );

            if (!submitButton) return;

            submitButton.disabled = true;

            setTimeout(() => {

                submitButton.disabled = false;

            }, 1500);

        });

    });



    /* ======================================================
       Bootstrap Tooltips
    ====================================================== */

    document

        .querySelectorAll(

            '[data-bs-toggle="tooltip"]'

        )

        .forEach(element => {

            new bootstrap.Tooltip(element);

        });



    /* ======================================================
       Bootstrap Popovers
    ====================================================== */

    document

        .querySelectorAll(

            '[data-bs-toggle="popover"]'

        )

        .forEach(element => {

            new bootstrap.Popover(element);

        });



    /* ======================================================
       Console Banner
    ====================================================== */

    console.log(

        "%cLexAI v2.0",

        "color:#2563EB;font-size:18px;font-weight:bold;"

    );

    console.log(

        "%cLegal & Cyber Law Intelligence Platform",

        "color:#64748B;font-size:12px;"

    );

    console.log(

        "%cDeveloped by Karthikeyan S",

        "color:#16A34A;font-size:12px;"

    );

});