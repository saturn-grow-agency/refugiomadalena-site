// Refúgio Madalena
// Scripts principais do site

console.log("Refúgio Madalena — site carregado.");





const track = document.querySelector(".accommodation-track");
const cards = document.querySelectorAll(".accommodation-card");

const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");

const dotsContainer = document.querySelector(".carousel-dots");

let currentIndex = 0;


/* ================================
   QUANTIDADE DE CARDS POR VEZ
================================ */

function getCardsPerView() {

    if (window.innerWidth <= 768) {
        return 1;
    }

    return 2;
}


/* ================================
   CRIAR INDICADORES
================================ */

function createDots() {

    dotsContainer.innerHTML = "";

    const cardsPerView = getCardsPerView();

    const totalSlides = Math.ceil(
        cards.length / cardsPerView
    );

    for (let i = 0; i < totalSlides; i++) {

        const dot = document.createElement("button");

        dot.classList.add("carousel-dot");

        dot.setAttribute(
            "aria-label",
            `Ir para slide ${i + 1}`
        );

        dot.addEventListener("click", () => {

            currentIndex = i;

            updateCarousel();

        });

        dotsContainer.appendChild(dot);
    }

}


/* ================================
   ATUALIZAR CARROSSEL
================================ */

function updateCarousel() {

    const cardsPerView = getCardsPerView();

    const cardWidth =
        cards[0].offsetWidth + 24;

    const translateX =
        currentIndex * cardWidth * cardsPerView;

    track.style.transform =
        `translateX(-${translateX}px)`;


    /* Atualizar indicadores */

    const dots =
        document.querySelectorAll(".carousel-dot");

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentIndex
        );

    });

}


/* ================================
   PRÓXIMO
================================ */

nextButton.addEventListener("click", () => {

    const cardsPerView = getCardsPerView();

    const totalSlides =
        Math.ceil(cards.length / cardsPerView);

    currentIndex++;

    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    updateCarousel();

});


/* ================================
   ANTERIOR
================================ */

prevButton.addEventListener("click", () => {

    const cardsPerView = getCardsPerView();

    const totalSlides =
        Math.ceil(cards.length / cardsPerView);

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }

    updateCarousel();

});


/* ================================
   RESPONSIVIDADE
================================ */

window.addEventListener("resize", () => {

    currentIndex = 0;

    createDots();

    updateCarousel();

});


/* ================================
   INICIALIZAÇÃO
================================ */

createDots();

updateCarousel();
