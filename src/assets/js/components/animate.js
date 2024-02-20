document.addEventListener('DOMContentLoaded', function () {
    const animatedElements = document.querySelectorAll('.animated');
  
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const targetElement = entry.target;
          const width = window.innerWidth;

          if (width >= 1280) {
            if (targetElement.classList.contains('fadeInUp')) {
                targetElement.classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-0.8s', 'visibility');
              } else if (targetElement.classList.contains('fadeInLeft')) {
                targetElement.classList.add('animate__animated', 'animate__fadeInLeft', 'animate__delay-0.8s', 'visibility');
              } else if (targetElement.classList.contains('fadeInRight')) {
                targetElement.classList.add('animate__animated', 'animate__fadeInRight','animate__delay-0.8s','visibility');
              } else if (targetElement.classList.contains('zoomIn')) {
                targetElement.classList.add('animate__animated', 'animate__zoomIn','animate__delay-0.8s','visibility');
              }
          } 

          if (width <= 1280) {
            if (targetElement.classList.contains('fadeInUp')) {
                targetElement.classList.add('animate__animated', 'animate__fadeIn', 'animate__delay-0.9s', 'visibility');
              } else if (targetElement.classList.contains('fadeInLeft')) {
                targetElement.classList.add('animate__animated', 'animate__fadeIn', 'animate__delay-0.9s', 'visibility');
              } else if (targetElement.classList.contains('fadeInRight')) {
                targetElement.classList.add('animate__animated', 'animate__fadeIn','animate__delay-0.9s','visibility');
              } else if (targetElement.classList.contains('zoomIn')) {
                targetElement.classList.add('animate__animated', 'animate__zoomIn','animate__delay-0.8s','visibility');
              }
          }
  
          observer.unobserve(targetElement);
        }
      });
    }, { threshold: 0.3 });
  
    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  });
