const mobileMenu = document.querySelector('.header__nav');
const menuToggleButton = document.querySelector('.header__menu-toggle');

const toggleMenu = () => {
  menuToggleButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('header__nav--active');
    menuToggleButton.classList.toggle('header__menu-toggle--active');
  });
};

export { toggleMenu };
