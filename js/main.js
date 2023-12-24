//Menu Icono
let menu = document.querySelector('.menu-icon');

let navbar = document.querySelector('.navbar');

menu.onclick = () => {
	navbar.classList.toggle("open-menu");
	menu.classList.toggle("move");
}

//Swiper Liberia
var swiper = new Swiper(".reviews-content", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
    	delay: 5000,
        disableOnInteraction: true,
    },
	pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },      
});

// Cambio de idiomas
const flagsElement = document.getElementById("flags");

const textsToChange = document.querySelectorAll("[data-section]");

const changeLanguage = async (language) => {
  const requestJson = await fetch(`./languages/${language}.json`);
  const texts = await requestJson.json();

  for(const textToChange of textsToChange) {
    const section = textToChange.dataset.section;
    const value = textToChange.dataset.value;

    textToChange.innerHTML = texts[section][value];
  }
}

flagsElement.addEventListener("click", (e) => {
  changeLanguage(e.target.parentElement.dataset.language);
});

//Scroll
let scrollTop = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
  if (window.scrollY >= window.innerHeight / 2) {
    scrollTop.style.bottom = "1rem";
  } else {
    scrollTop.style.bottom = "-3.5rem";
  }
});

// Velocidad de desplazamiento de Scroll

// Esta función se ejecuta cuando el contenido DOM está completamente cargado
document.addEventListener("DOMContentLoaded", function() {
  // Selecciona todos los enlaces con las clases '.nav-link' y '.scroll-top'
  const scrollLinks = document.querySelectorAll('.nav-link, .scroll-top');

  // Por cada enlace seleccionado
  scrollLinks.forEach(link => {
    // Agrega un evento 'click'
    link.addEventListener("click", function(event) {
      event.preventDefault(); // Evita el comportamiento predeterminado del enlace
      
      // Obtiene el atributo 'href' del enlace clicado (por ejemplo, '#home')
      const targetId = this.getAttribute("href");
      
      // Busca el elemento HTML correspondiente al 'targetId'
      const targetElement = document.querySelector(targetId);

      if (targetElement) { // Si el elemento objetivo existe
        // Obtiene la distancia desde la parte superior de la pantalla hasta el elemento objetivo
        const topOffset = targetElement.getBoundingClientRect().top;
        
        // Obtiene la posición actual de desplazamiento vertical de la ventana
        const startPosition = window.pageYOffset;
        
        // Calcula la distancia que se debe desplazar
        const distance = topOffset - 50; // Ajusta el valor para controlar el desplazamiento
        
        let startTime = null; // Variable para almacenar el tiempo de inicio
        
        // Función para realizar la animación de desplazamiento suave
        function scrollAnimation(currentTime) {
          if (startTime === null) startTime = currentTime; // Establece el tiempo de inicio si es nulo
          const timeElapsed = currentTime - startTime; // Calcula el tiempo transcurrido
          
          // Calcula el desplazamiento suave utilizando una función de aceleración
          const ease = Math.easeInOutQuad(timeElapsed, startPosition, distance, 800); // 800 es la duración en milisegundos
          
          // Realiza el desplazamiento suave
          window.scrollTo(0, ease);
          
          // Si el tiempo transcurrido es menor a 800ms, solicita una nueva animación
          if (timeElapsed < 800) requestAnimationFrame(scrollAnimation);
        }

        // Función de aceleración cuadrática
        Math.easeInOutQuad = function(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return (c / 2) * t * t + b;
          t--;
          return (-c / 2) * (t * (t - 2) - 1) + b;
        };

        // Inicia la primera animación de desplazamiento suave
        requestAnimationFrame(scrollAnimation);
      }
    });
  });
});

// Este event listener espera a que el contenido HTML esté completamente cargado antes de ejecutar el código.
document.addEventListener("DOMContentLoaded", function() {

  // Selecciona todos los elementos de ancla dentro de elementos de lista en la barra de navegación.
  const navLinks = document.querySelectorAll(".navbar li a");

  // Adjunta un event listener de desplazamiento a la ventana.
  window.addEventListener("scroll", function () {
  
    // Obtiene la posición vertical actual de desplazamiento.
    const scrollPosition = window.scrollY;

    // Itera sobre cada enlace de navegación.
    navLinks.forEach(function (link) {

      // Obtiene el valor del atributo "href" del enlace actual.
      var sectionId = link.getAttribute('href');

      // Encuentra la sección objetivo en el HTML basándose en el ID de la sección.
      var targetSection = document.querySelector(sectionId);

      // Calcula el desplazamiento para la sección objetivo actual, considerando la altura del encabezado.
      var rect = targetSection.getBoundingClientRect();
      var offset = rect.top + scrollPosition - document.querySelector('.container-header').offsetHeight;

      // Verifica si la sección actual está en la vista.
      if (offset <= scrollPosition && offset + rect.height > scrollPosition) {
        // Agrega la clase 'active' al enlace si está en la vista.
        link.classList.add('active');
      } else {
        // Elimina la clase 'active' si la sección no está en la vista.
        link.classList.remove('active');
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const darkMode = document.getElementById("logo");

  darkMode.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
  });
});