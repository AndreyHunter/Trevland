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
const topBtn = document.querySelector('.topButton');

window.addEventListener('scroll', () => {
    const scrollWidth = window.innerWidth;
    const scroll = window.scrollY;

    if (scrollWidth < 1280) {
        hideBtn();
        return;
    } else { 
        showBtn();
    }

    if (scroll > 1000) {
        showBtn();
        
    } else {
        hideBtn();
    }
});

function hideBtn() {
    topBtn.style.opacity = '0';
    topBtn.style.visibility = 'hidden';
}

function showBtn() {
    topBtn.style.opacity = '1';
    topBtn.style.visibility = 'visible';
}

const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const blockID = anchor.getAttribute('href');
        document.querySelector(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    
    if (scroll > 50) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.860)';
        header.style.padding = '20px 0';
    }

    if (scroll < 50) {
        header.style.backgroundColor = 'transparent';
        header.style.paddingTop = '35px';
    }
});

const mobaileBtn = document.querySelector('#nav-icon1');
mobaileBtn.addEventListener('click', () => {
    mobaileBtn.classList.toggle('open');
    const mobaileNav = document.querySelector('.mobaile__nav');
    mobaileNav.classList.toggle('active');
});

const subscribeForm = document.querySelector('.subscribe-form');
subscribeForm.addEventListener('submit', e => {
    e.preventDefault();
    validateEmail();
});

function validateEmail() {
    const error = document.querySelectorAll('span.error'),
          invalidInput = document.querySelectorAll('input.invalidInput');
    error.forEach(item => item.remove());
    invalidInput.forEach(item => item.classList.remove('invalidInput'));

    const emailInput = document.querySelector('#emailInput');
    const inputValue = emailInput.value;
    const inputRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (inputValue.trim() === '') {
        addError(emailInput, 'Email is required', 'invalidInput');
        return;
    }

    if (!inputValue.trim().includes('@')) {
        addError(emailInput, 'Email must have a @ symboll', 'invalidInput');
        return;
    }

    if (!inputRegex.test(inputValue)) {
        addError(emailInput, 'Write a valid Email', 'invalidInput');
        return;
    }
}

function addError(input, textError, inValid) {
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('error');
    errorSpan.textContent = textError;
    input.classList.add(inValid);
    input.parentNode.appendChild(errorSpan);
}