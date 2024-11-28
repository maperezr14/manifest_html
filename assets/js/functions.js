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

// Validación de Formulario
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evitar el envío del formulario si hay errores
        const isValid = validateForm(form);

        if (isValid) {
            // Aquí puedes agregar lógica para enviar el formulario (AJAX, API, etc.)
            alert("Formulario enviado correctamente");
            form.reset(); // Opcional: reinicia el formulario
        }
    });

    // Validación dinámica al escribir en los campos
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
        input.addEventListener("input", () => validateField(input));
    });
});

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
        const validField = validateField(input);
        if (!validField) isValid = false;
    });

    return isValid;
}

function validateField(input) {
    const error = input.parentElement.querySelector(".error-message");
    let isValid = true;

    if (input.hasAttribute("required") && input.value.trim() === "") {
        isValid = false;
        showError(input, error, "Este campo es obligatorio.");
    } else if (input.type === "email" && !validateEmail(input.value)) {
        isValid = false;
        showError(input, error, "Por favor, ingresa un email válido.");
    } else if (input.type === "checkbox" && !input.checked) {
        isValid = false;
        showError(input, error, "Debes aceptar los términos y condiciones.");
    } else {
        hideError(input, error);
    }

    return isValid;
}

function showError(input, error, message) {
    if (error) {
        error.textContent = message;
        error.style.display = "block";
    }
    input.classList.add("invalid");
}

function hideError(input, error) {
    if (error) {
        error.textContent = "";
        error.style.display = "none";
    }
    input.classList.remove("invalid");
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
