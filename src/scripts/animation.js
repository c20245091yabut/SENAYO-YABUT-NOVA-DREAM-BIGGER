const initializeAnimations = () => {
    const gsap = window.gsap;

    if (!gsap) {
        console.error("GSAP failed to load; page animations are unavailable.");
        return;
    }

    if (window.ScrollTrigger) {
        gsap.registerPlugin(window.ScrollTrigger);
    }

    document.querySelectorAll(".projects .card").forEach((card) => {
        const image = card.querySelector(".card-image");
        let movement = null;

        card.addEventListener("mouseenter", () => {
            gsap.to(card, {
                y: -10,
                scale: 1.02,
                borderColor: "#ff3b30",
                boxShadow: "0 18px 36px rgba(0, 0, 0, 0.35)",
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto"
            });

            if (image) {
                gsap.to(image, {
                    scale: 1.06,
                    duration: 0.4,
                    ease: "power2.out",
                    overwrite: "auto"
                });

                movement = gsap.to(image, {
                    y: -7,
                    rotation: 1.5,
                    duration: 0.75,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                    overwrite: "auto"
                });
            }
        });

        card.addEventListener("mouseleave", () => {
            if (movement) {
                movement.kill();
                movement = null;
            }

            gsap.to(card, {
                y: 0,
                scale: 1,
                borderColor: "#333",
                boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto"
            });

            if (image) {
                gsap.to(image, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }
        });
    });

    gsap.from(".hero-content", {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".hero-image", {
        opacity: 0,
        x: 60,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
    });

    gsap.utils.toArray(
        ".service-card, .step, .card, .about"
    ).forEach((element) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    gsap.to("#progressBar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeAnimations, { once: true });
} else {
    initializeAnimations();
}
