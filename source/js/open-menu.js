const mobileMenu = document.querySelector('.header__nav');
const menuToggleButton = document.querySelector('.header__menu-toggle');
const submenuButtons = document.querySelectorAll('.nav__submenu-button');

const toggleMenu = () => {
  // Функция переключения видимости подменю
  const toggleSubmenu = (button) => {
    const submenu = button.nextElementSibling;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute('aria-expanded', !isExpanded);
    button.classList.toggle('nav__submenu-button--active', !isExpanded); // Добавляем/удаляем активный класс
    submenu.hidden = isExpanded;
  };

  // Остальной код остается без изменений
  const handleSubmenuButtonClick = (event) => {
    event.preventDefault();
    toggleSubmenu(event.currentTarget);
  };

  const handleSubmenuButtonKeyDown = (event) => {
    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        toggleSubmenu(event.currentTarget);
        break;
      case 'Escape':
        event.currentTarget.setAttribute('aria-expanded', 'false');
        event.currentTarget.classList.remove('nav__submenu-button--active'); // Удаляем активный класс
        event.currentTarget.nextElementSibling.hidden = true;
        event.currentTarget.focus();
        break;
    }
  };

  const initSubmenus = () => {
    submenuButtons.forEach(button => {
      const submenu = button.nextElementSibling;

      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-haspopup', 'true');
      button.classList.remove('nav__submenu-button--active'); // Убедимся, что класс удален при инициализации
      submenu.hidden = true;

      button.addEventListener('click', handleSubmenuButtonClick);
      button.addEventListener('keydown', handleSubmenuButtonKeyDown);
    });
  };

  const handleMenuToggle = () => {
    const isMenuOpen = mobileMenu.classList.toggle('header__nav--active');
    menuToggleButton.classList.toggle('header__menu-toggle--active');
    menuToggleButton.setAttribute('aria-expanded', isMenuOpen);

    if (isMenuOpen) {
      document.body.classList.add('page__body--menu-open');
      document.documentElement.style.overflow = 'hidden';
      document.addEventListener('click', handleClickOutside);

      submenuButtons.forEach(button => {
        button.setAttribute('aria-expanded', 'false');
        button.classList.remove('nav__submenu-button--active'); // Удаляем активный класс при открытии меню
        button.nextElementSibling.hidden = true;
      });
    } else {
      closeMenu();
    }
  };

  const handleClickOutside = (event) => {
    if (
      !mobileMenu.contains(event.target) &&
      !menuToggleButton.contains(event.target) &&
      mobileMenu.classList.contains('header__nav--active')
    ) {
      closeMenu();
    }
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('header__nav--active');
    menuToggleButton.classList.remove('header__menu-toggle--active');
    menuToggleButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('page__body--menu-open');
    document.documentElement.style.overflow = '';
    document.removeEventListener('click', handleClickOutside);
  };

  initSubmenus();
  menuToggleButton.addEventListener('click', handleMenuToggle);
};

export { toggleMenu };
