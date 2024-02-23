import {abrirReproductor} from "./util.js";

//VARIABLES

//FUNCION MODAL BOX

'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const squareItems = document.querySelectorAll('.square-item');
const modalText = document.getElementById('modal-text');

function openModal(text) {
  modalText.textContent = text;
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

squareItems.forEach(item => {
  console.log(item);
  item.addEventListener('click', function () {
      const itemId = item.id;
      openModal(`Información para ${itemId}`);
  });
});

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
  }
});
   


//FUNCION CARRUSEL
document.addEventListener('DOMContentLoaded', function() {

  const carrousels = document.querySelectorAll('.carrousel');
  
  carrousels.forEach((container) => {
    const BUTTON_NEXT = container.querySelector(".slider__btn--right");
    const BUTTON_PREV = container.querySelector(".slider__btn--left");
    const SLIDER_CONTAINER = container.querySelector(".list");
    const SLIDE_ELEMENTS = container.querySelectorAll(".item");         

    if (BUTTON_NEXT && BUTTON_PREV && SLIDER_CONTAINER && SLIDE_ELEMENTS.length > 0) {
      SLIDER_CONTAINER.style.overflow = "hidden";

      let TIMES_CLICKED = 0;
      let MAX_SLIDES = SLIDE_ELEMENTS.length - 1;

      BUTTON_NEXT.addEventListener("click", handleNextSlider);
      BUTTON_PREV.addEventListener("click", handlePrevSlider);

      function handleNextSlider() {
        if (TIMES_CLICKED === MAX_SLIDES) {
          TIMES_CLICKED = 0;
        } else {
          TIMES_CLICKED++;
        }
        goToSlide(TIMES_CLICKED);
      }

      function handlePrevSlider() {
        if (TIMES_CLICKED === 0) {
          TIMES_CLICKED = MAX_SLIDES;
        } else {
          TIMES_CLICKED--;
        }
        goToSlide(TIMES_CLICKED);
      }

      function goToSlide(pos) {
        const slideWidth = SLIDE_ELEMENTS[0].offsetWidth; // Ancho de un elemento del slider
        const newPosition = -pos * slideWidth; // Nueva posición basada en el ancho del elemento

        SLIDE_ELEMENTS.forEach((item) => {
          item.style.transform = `translateX(${newPosition}px)`;
          });
        }
    } else {
      console.error("No se encontraron elementos en el DOM dentro del contenedor:", container.id);
    }
  });
});

// efecto smoothy 

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      // Obtiene el destino del enlace (el elemento con el ID especificado en el atributo href)
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      // Realiza el smooth scroll al elemento de destino
      if (targetElement) {
          window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
          });
      }
  });
});

function redirectToIndex() {
  window.location.href = "index.html";
}

///////////////////////////////////////////////////////////////

function clickCancion(e){
  const elemento = e.target.closest('div');

  if (elemento.classList.contains('reproducir')) {
    const numCancion = elemento.getAttribute('num-cancion');

    abrirReproductor(numCancion);
  }
}

document.addEventListener('click', clickCancion);