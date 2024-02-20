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

