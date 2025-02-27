// Swiper Carrosel

const swiper = new Swiper('.swiper', {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 1,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false, 
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Menu Mobile

document.getElementById('menuToggle').addEventListener('click', function() {
    var menu = document.getElementById('menuMobile');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
});

