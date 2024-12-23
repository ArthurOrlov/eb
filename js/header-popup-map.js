// zoom

function zoomin() {
  var myImg = document.getElementById("map");
  var currWidth = myImg.clientWidth;
  if (currWidth == 1000) return false;
  else {
    myImg.style.width = (currWidth + 100) + "px";
  }
}
function zoomout() {
  var myImg = document.getElementById("map");
  var currWidth = myImg.clientWidth;
  if (currWidth == 100) return false;
  else {
    myImg.style.width = (currWidth - 100) + "px";
  }
}


/*// map touch

var movableElement = document.getElementsByClassName('dragscroll-map');

movableElement.addEventListener('touchstart', function (event) {
  event.preventDefault();

  var touch = event.touches[0];
  var startX = touch.clientX - movableElement.offsetLeft;
  var startY = touch.clientY - movableElement.offsetTop;

  document.addEventListener('touchmove', moveElement);

  document.addEventListener('touchend', function () {
    document.removeEventListener('touchmove', moveElement);
    document.removeEventListener('touchend', arguments.callee);
  });

  function moveElement(event) {
    var touch = event.touches[0];

    var newX = touch.clientX - startX;
    var newY = touch.clientY - startY;

    movableElement.style.left = newX + 'px';
    movableElement.style.top = newY + 'px';
  }
});*/


// Yellow buttons

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.modal__map-floor--number').forEach(function (tabsClick) {
    tabsClick.addEventListener('click', function (event) {
      let path = event.currentTarget.dataset.path

      document.querySelectorAll('.modal__map-floor--number').forEach(function (tabContentClick) {
        tabContentClick.classList.remove('modal__map-floor--number-active')
      })
      document.querySelector(`[data-path="${path}"]`).classList.add('modal__map-floor--number-active');
    })
  })
});



// modal map

let popupMapBg = document.querySelector('.header-popup-map'); // Фон попап окна
let popupMap = document.querySelector('.popup-map'); // Само окно
let openPopupHeaderButton = document.querySelectorAll('.open-header-popup-map'); // Кнопки для показа окна
let closePopupHeaderButtons = document.querySelector('.close-popup-map'); // Кнопка для скрытия окна

openPopupHeaderButton.forEach((button) => { // Перебираем все кнопки
  button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
    e.preventDefault(); // Предотвращаем дефолтное поведение браузера
    popupMapBg.classList.add('active'); // Добавляем класс 'active' для фона
    popupMap.classList.add('active'); // И для самого окна
  })
});

closePopupHeaderButtons.addEventListener('click', () => { // Вешаем обработчик на крестик
  popupMapBg.classList.remove('active'); // Убираем активный класс с фона
  popupMap.classList.remove('active'); // И с окна
});

document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
  if (e.target === popupMapBg) { // Если цель клика - фот, то:
    popupMapBg.classList.remove('active'); // Убираем активный класс с фона
    popupMap.classList.remove('active'); // И с окна
  }
});
