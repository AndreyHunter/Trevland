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