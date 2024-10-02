//Menu responsive
function toggleMenu() {
  let menu = document.querySelector('.menu-icon');
  let navbar = document.querySelector('.navbar');

  menu.onclick = () => {
    navbar.classList.toggle("open-menu");
    menu.classList.toggle("move");
  }
}

//Cambio de idiomas
async function changeLanguage(language) {
  const requestJson = await fetch(`./languages/${language}.json`);
  const texts = await requestJson.json();

  const textsToChange = document.querySelectorAll("[data-section]");

  for(const textToChange of textsToChange) {
    const section = textToChange.dataset.section;
    const value = textToChange.dataset.value;

    textToChange.innerHTML = texts[section][value];
  }
}

function setupLanguageSwitch() {
  const flagsElement = document.getElementById("flags");

  flagsElement.addEventListener("click", (e) => {
      changeLanguage(e.target.parentElement.dataset.language);
  });
}

//Botón de Scroll
function btnScroll() {
  let scrollTop = document.querySelector(".scroll-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY >= window.innerHeight / 2) {
      scrollTop.style.bottom = "1rem";
    } else {
      scrollTop.style.bottom = "-4.5rem";
    }
  });
}

//Velocidad de desplazamiento de Scroll
function speedScroll() {
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
}

function updateActiveLink() {
  const navLinks = document.querySelectorAll(".navbar li a");

  // Obtiene la posición vertical actual de desplazamiento.
  const scrollPosition = window.scrollY;
  
  // Itera sobre cada enlace de navegación.
  navLinks.forEach(function (link) {
    // Obtiene el valor del atributo "href" del enlace actual.
    const sectionId = link.getAttribute('href').substring(1); // Elimina el símbolo '#' del href
    // Encuentra la sección objetivo en el HTML basándose en el ID de la sección.
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
      // Obtiene la posición y dimensiones de la sección objetivo.
      const rect = targetSection.getBoundingClientRect();
      // Calcula el desplazamiento para la sección objetivo actual, considerando la altura del encabezado.
      const offset = rect.top + scrollPosition - document.querySelector('.container-header').offsetHeight;

      // Verifica si la sección actual está en la vista.
      if (offset <= scrollPosition && offset + rect.height > scrollPosition) {
        // Agrega la clase 'active' al enlace si está en la vista.
        link.classList.add('active');
      } else {
        // Elimina la clase 'active' si la sección no está en la vista.
        link.classList.remove('active');
      }
    }
  });
}

function darkMode() {
  const darkMode = document.getElementById("logo");

  darkMode.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
  });
}

function handleScroll() {
  const fadeElements = document.querySelectorAll('.fade-in');

  fadeElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const viewHeight = window.innerHeight;

    if (rect.top < viewHeight && rect.bottom >= 0) {
      element.classList.add('visible');
    } else {
      element.classList.remove('visible');
    }
  });
}

// Función para ocultar el loader
function hideLoader() {
  const loader = document.getElementById('loader');
  const mainContent = document.querySelector('.main-content');

  if (mainContent) {
    mainContent.classList.add('show-content');
  }

  // if (loader) {
  //   loader.classList.add('fade-out');
  //   setTimeout(() => {
  //     loader.remove();
  //     // Mostrar el contenido principal con el efecto de entrada
  //     if (mainContent) {
  //       mainContent.classList.add('show-content');
  //     }
  //   }, 1000);
  // }
}

// Máquina de escribir
function typeEffect() {
  const element = document.getElementById('dynamic-text');
  const staticPart = 'Téc. Analista '; // Parte fija del texto
  const texts = [
    'en Sistemas de Computación', // Primer texto variable con salto de línea
    'Programador' // Segundo texto variable
  ];
  const typingSpeed = 200; // Velocidad de escritura en milisegundos
  const erasingSpeed = 200; // Velocidad de borrado en milisegundos
  const delayBetweenTexts = 1000; // Tiempo entre textos en milisegundos

  let currentTextIndex = 0; // Índice para el texto actual que se está mostrando
  let currentCharIndex = 0; // Índice del carácter actual que se está escribiendo o borrando
  let isDeleting = false; // Booleano para saber si estamos borrando el texto

  function type() {
    const dynamicPart = texts[currentTextIndex]; // Obtiene el texto variable actual
    let text = staticPart; // Comienza con la parte fija del texto

    // Añade la parte variable al texto actual, según si estamos escribiendo o borrando
    if (isDeleting) {
      text += dynamicPart.substring(0, currentCharIndex--);
    } else {
      text += dynamicPart.substring(0, currentCharIndex++);
    }

    element.innerHTML = text; // Usa innerHTML para permitir etiquetas HTML como <span>

    // Controla el flujo del efecto
    if (!isDeleting && currentCharIndex === dynamicPart.length) {
      // Si hemos terminado de escribir el texto, comienza a borrar
      isDeleting = true;
      setTimeout(type, delayBetweenTexts); // Espera antes de comenzar a borrar
    } else if (isDeleting && currentCharIndex === 0) {
      // Si hemos terminado de borrar el texto, pasa al siguiente
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % texts.length; // Mueve al siguiente texto
      setTimeout(type, delayBetweenTexts); // Espera antes de comenzar con el nuevo texto
    } else {
      // Continúa escribiendo o borrando
      const speed = isDeleting ? erasingSpeed : typingSpeed; // Velocidad según si estamos borrando o escribiendo
      setTimeout(type, speed); // Llama a la función de nuevo después de un tiempo
    }
  }

  type(); // Inicia el efecto
}

// Drag & Drop functionality
function initDragAndDrop() {
  const boxes = document.querySelectorAll('.technology-box');
  const container = document.querySelector('.technologies-content');
  let draggedItem = null;

  boxes.forEach(box => {
    box.addEventListener('dragstart', function(e) {
      draggedItem = box;
      setTimeout(() => {
        box.style.display = 'none'; 
      }, 0);
    });

    box.addEventListener('dragend', function(e) {
      setTimeout(() => {
        draggedItem.style.display = 'block';  
        draggedItem = null;
      }, 0);
    });

    box.addEventListener('dragover', function(e) {
      e.preventDefault();
    });

    box.addEventListener('drop', function(e) {
      e.preventDefault();
      if (draggedItem) {
        container.insertBefore(draggedItem, this);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  // Llamar a la función para ocultar el loader después de 2 segundos
  setTimeout(hideLoader, 2000);

  toggleMenu();
  setupLanguageSwitch();
  btnScroll();
  speedScroll();
  updateActiveLink();
  darkMode();
  handleScroll();
  typeEffect();
  initDragAndDrop();

  window.addEventListener("scroll", updateActiveLink);
  window.addEventListener('scroll', handleScroll);
});