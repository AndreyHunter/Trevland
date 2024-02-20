const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: 6,
    spaceBetween: 50,
    speed: 400,
    allowTouchMove: true,
    freeMode: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,

    breakpoints: {
        0: {
            slidesPerView: 1
        },
        500: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        968: {
            slidesPerView: 4,
            spaceBetween: 30
        },
        1280: {
            slidesPerView: 5,
            spaceBetween: 30
        },
        1440: {
            slidesPerView: 6,
            spaceBetween: 30
        }
      },

    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
});