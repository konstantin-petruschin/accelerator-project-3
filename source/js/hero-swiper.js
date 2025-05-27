import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';

export const initPromoSlider = () => {
  const swiper = new Swiper('.hero-swiper', {
    modules: [Pagination],
    slidesPerView: 1,
    spaceBetween: 40,
    loop: true,
    pagination: false,

    on: {
      init: function() {
        initCustomPagination(this);
        updatePagination(this);
      },
      slideChange: function() {
        updatePagination(this);
        updateLinksAccessibility(this);
      }
    },
    breakpoints: {
      1440: {
        allowTouchMove: false,
      },
    },
  });

  function initCustomPagination(swiperInstance) {
    // Получаем количество реальных слайдов (без дубликатов)
    const realSlides = Array.from(swiperInstance.slides).filter(
      slide => !slide.classList.contains('swiper-slide-duplicate')
    );
    const slidesCount = realSlides.length;

    // Для каждого слайда создаем полный набор буллетов
    realSlides.forEach((slide, slideIndex) => {
      const paginationContainer = slide.querySelector('.swiper-pagination');
      if (!paginationContainer) return;

      // Очищаем контейнер перед созданием буллетов
      paginationContainer.innerHTML = '';

      // Создаем буллеты для всех слайдов
      for (let i = 0; i < slidesCount; i++) {
        const bullet = document.createElement('button');
        bullet.className = 'swiper-pagination-bullet';
        bullet.type = 'button';
        bullet.setAttribute('aria-label', `Перейти к слайду ${i + 1}`);
        bullet.setAttribute('data-index', i);
        bullet.setAttribute('tabindex', '0');

        bullet.addEventListener('click', (e) => {
          e.preventDefault();
          swiperInstance.slideToLoop(i);
        });

        bullet.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            swiperInstance.slideToLoop(i);
          }
        });

        paginationContainer.appendChild(bullet);
      }
    });
  }

  function updatePagination(swiperInstance) {
    const realIndex = swiperInstance.realIndex;
    const allBullets = document.querySelectorAll('.swiper-pagination-bullet');

    // Обновляем все буллеты на всех слайдах
    allBullets.forEach((bullet) => {
      const bulletIndex = parseInt(bullet.getAttribute('data-index'));
      const isActive = bulletIndex === realIndex;

      bullet.classList.toggle('swiper-pagination-bullet-active', isActive);
      bullet.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  function updateLinksAccessibility(swiperInstance) {
    const realIndex = swiperInstance.realIndex;
    const promoLinks = document.querySelectorAll('.hero__link');

    promoLinks.forEach((btn, index) => {
      const isActive = index === realIndex;
      btn.setAttribute('tabindex', isActive ? '0' : '-1');
      btn.setAttribute('aria-hidden', !isActive ? 'true' : 'false');
    });
  }
};
