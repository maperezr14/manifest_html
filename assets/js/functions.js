$(document).ready(function () {
    // Selecciona los enlaces del menú que navegan con anclas
    $(document).ready(function () {
        const menuLinks = $('.header__menu-link'); // Selecciona los enlaces del menú
        const offsetMargin = 80; // Margen superior para ajustar la visibilidad
    
        // Evento al hacer clic en un enlace del menú
        menuLinks.on('click', function (e) {
            e.preventDefault(); // Evita el comportamiento predeterminado del enlace
    
            // Obtén el id de la sección a la que apunta el ancla
            const targetId = $(this).attr('href');
            const targetElement = $(targetId);
    
            if (targetElement.length) {
                // Calcula la posición con un offset
                const offset = targetElement.offset().top - offsetMargin;
    
                // Realiza el scroll animado
                $('html, body').animate({
                    scrollTop: offset - offsetMargin
                }, 500); // Duración de la animación (en ms)
            }
    
            // Manejo de la clase 'active'
            menuLinks.removeClass('active');
            $(this).addClass('active');
        });
    
        // Evento para detectar el scroll
        $(window).on('scroll', function () {
            const scrollPosition = $(window).scrollTop();
    
            // Itera sobre las secciones para detectar cuál está visible
            menuLinks.each(function () {
                const targetId = $(this).attr('href');
                const targetElement = $(targetId);
    
                if (targetElement.length) {
                    // Calcula la posición superior e inferior de la sección
                    const sectionTop = targetElement.offset().top - offsetMargin;
                    const sectionBottom = sectionTop + targetElement.outerHeight();
    
                    // Si el scroll está dentro de los límites de la sección, activa el enlace
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        menuLinks.removeClass('active');
                        $(this).addClass('active');
                    }
                }
            });
        });
    });
    

    // Menú móvil
    const $mobileToggle = $(".header__mobile-toggle");
    const $nav = $(".header__nav");
    
    // Detectar Scroll Fixed
    const $navbar = $(".header");

    // Función para manejar el scroll
    const handleScroll = () => {
        if ($(window).scrollTop() > 0) {
            $navbar.addClass('scrolled');
        } else {
            $navbar.removeClass('scrolled');
        }
    };

    // Escucha el evento de scroll
    $(window).on('scroll', handleScroll);

    // Inicialización del atributo aria-expanded
    $mobileToggle.attr("aria-expanded", "false");

    // Abrir y cerrar el menú móvil
    $mobileToggle.on("click", function () {
        const isOpen = $nav.toggleClass("header__nav--open").hasClass("header__nav--open");
        $navbar.toggleClass("headerOpen").hasClass("headerOpen");
        // Actualizar el aria-expanded dinámicamente
        $mobileToggle.attr("aria-expanded", isOpen ? "true" : "false");
    });

    $('.header__menu-link').on("click", function () {
        $(".header__nav.header__nav--open").removeClass("header__nav--open");
        $(".header").removeClass("headerOpen");
        $(".header__mobile-toggle").attr("aria-expanded", "false");
    });

    // Validación de Formulario
    const $form = $("#contactForm");

    $form.on("submit", function (event) {
        event.preventDefault(); // Evitar el envío del formulario si hay errores
        const isValid = validateForm($form);

        if (isValid) {
            alert("Formulario enviado correctamente");
            $form[0].reset(); // Opcional: reinicia el formulario
        }
    });

    // Validación dinámica al escribir en los campos
    const $inputs = $form.find("input, textarea");
    $inputs.on("input", function () {
        validateField($(this));
    });
});

// Validar todo el formulario
function validateForm($form) {
    let isValid = true;
    const $inputs = $form.find("input, textarea");

    $inputs.each(function () {
        const validField = validateField($(this));
        if (!validField) isValid = false;
    });

    return isValid;
}

// Validar un campo individual
function validateField($input) {
    const $error = $input.parent().find(".error-message");
    let isValid = true;

    if ($input.is("[required]") && $input.val().trim() === "") {
        isValid = false;
        showError($input, $error, "Este campo es obligatorio.");
    } else if ($input.attr("type") === "email" && !validateEmail($input.val())) {
        isValid = false;
        showError($input, $error, "Por favor, ingresa un email válido.");
    } else if ($input.attr("type") === "checkbox" && !$input.is(":checked")) {
        isValid = false;
        showError($input, $error, "Debes aceptar los términos y condiciones.");
    } else {
        hideError($input, $error);
    }

    return isValid;
}

// Mostrar error
function showError($input, $error, message) {
    if ($error.length) {
        $error.text(message).show();
    }
    $input.addClass("invalid");
}

// Ocultar error
function hideError($input, $error) {
    if ($error.length) {
        $error.text("").hide();
    }
    $input.removeClass("invalid");
}

// Validar email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
