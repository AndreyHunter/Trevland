const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: 5,
    spaceBetween: 50,
    speed: 400,
    allowTouchMove: true,
    freeMode: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
  

    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
});