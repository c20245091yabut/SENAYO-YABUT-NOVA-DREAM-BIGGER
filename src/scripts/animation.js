const initializeReveals = () => {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
    }
    document.documentElement.classList.add("js");
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
};

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializeReveals, { once:true });
else initializeReveals();
