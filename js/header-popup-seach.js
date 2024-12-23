let popupSeachBg = document.querySelector('.header-popup-seach'); // Фон попап окна
let popupSeach = document.querySelector('.popup-seach'); // Само окно
let openPopupHeaderButtons = document.querySelectorAll('.open-header-popup-seach'); // Кнопки для показа окна
let closePopupHeaderButton = document.querySelector('.close-popup-seach'); // Кнопка для скрытия окна

openPopupHeaderButtons.forEach((button) => { // Перебираем все кнопки
  button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
    e.preventDefault(); // Предотвращаем дефолтное поведение браузера
    popupSeachBg.classList.add('active'); // Добавляем класс 'active' для фона
    popupSeach.classList.add('active'); // И для самого окна
  })
});

closePopupHeaderButton.addEventListener('click', () => { // Вешаем обработчик на крестик
  popupSeachBg.classList.remove('active'); // Убираем активный класс с фона
  popupSeach.classList.remove('active'); // И с окна
});

/*closePopupHeaderButton.addEventListener('click', (e) => { // Вешаем обработчик на крестик
  if (e.target === popupSeachBg) { // Если цель клика - фот, то:
    popupSeachBg.classList.remove('active'); // Убираем активный класс с фона
    popupSeach.classList.remove('active'); // И с окна
  }
});

document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
  if (e.target === popupSeachBg) { // Если цель клика - фот, то:
    popupSeachBg.classList.remove('active'); // Убираем активный класс с фона
    popupSeach.classList.remove('active'); // И с окна
  }
});*/


closePopupHeaderButton.addEventListener('click', (e) => { // Вешаем обработчик на крестик
  popupSeachBg.classList.remove('active'); // Убираем активный класс с фона
  popupSeach.classList.remove('active'); // И с окна
  // Добавляем код для закрытия результатов поиска, если они были показаны
  // Например:
  document.querySelector('.search-results').classList.remove('active');
});

document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
  if (e.target === closePopupHeaderButton) { // Если цель клика - кнопка closePopupHeaderButton, то:
    popupSeachBg.classList.remove('active'); // Убираем активный класс с фона
    popupSeach.classList.remove('active'); // И с окна
    // Добавляем код для закрытия результатов поиска, если они были показаны
    // Например:
    document.querySelector('.search-results').classList.remove('active');
  }
});