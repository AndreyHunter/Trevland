const header = document.querySelector('.header');
let lastScrollTop = 0;
let isHeaderVisible = true;
let scrollTimeout;

window.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY;

    if (currentScrollTop > lastScrollTop && isHeaderVisible) {
        isHeaderVisible = false;
        header.style.visibility = 'hidden';
        header.style.opacity = '0';
    } else if (currentScrollTop < lastScrollTop && !isHeaderVisible) {
        isHeaderVisible = true;
        header.style.opacity = '1';
        header.style.visibility = 'visible';
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.863)';
        header.style.padding = '20px 0px';
    } else if (currentScrollTop < 400) {
        header.style.backgroundColor = 'transparent';
        header.style.paddingTop = '35px';
    }
        
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (!isHeaderVisible) {
            header.style.opacity = '0';
        }
    }, 200);
    
    lastScrollTop = currentScrollTop;
});
