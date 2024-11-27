// Menú móvil
document.addEventListener("DOMContentLoaded", () => {
    const mobileToggle = document.querySelector(".header__mobile-toggle");
    const nav = document.querySelector(".header__nav");

    // Inicialización del atributo aria-expanded
    mobileToggle.setAttribute("aria-expanded", "false");

    // Abrir y cerrar el menú móvil
    mobileToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("header__nav--open");
        // Actualizar el aria-expanded dinámicamente
        mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
});  