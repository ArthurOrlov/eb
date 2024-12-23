//бургер меню

document.querySelector('.hamburger').addEventListener('click', function () {
  document.querySelector('#menu').classList.toggle('is-active')
});


// валидность телефона и почты

function ValidPhone() {
  var re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
  var myPhone = document.getElementById('phone').value;
  var valid = re.test(myPhone);
  if (valid) output = 'Номер телефона введен правильно!';
  else output = 'Номер телефона введен неправильно!';
  document.getElementById('message').innerHTML = document.getElementById('message').innerHTML + '<br />' + output;
  return valid;
}


// ассортимент

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.nav__link').forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (event) {
      let path = event.currentTarget.dataset.path

      document.querySelectorAll('.tab-content').forEach(function (tabContentBtn) {
        tabContentBtn.classList.remove('tab-content-active')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active');
    })
  })
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.modal__map-floor--number').forEach(function (tabsMap) {
    tabsMap.addEventListener('click', function (eventt) {
      const path = eventt.currentTarget.dataset.path

      document.querySelectorAll('.modal__map-container-img').forEach(function (tabContentMap) {
        tabContentMap.classList.remove('modal__map-container-img-active')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('modal__map-container-img-active');
    })
  })
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.assortment__menu-item').forEach(function (tabsClick) {
    tabsClick.addEventListener('click', function (event) {
      let path = event.currentTarget.dataset.path

      document.querySelectorAll('.assortment__menu-item').forEach(function (tabContentClick) {
        tabContentClick.classList.remove('assortment__menu-item-active')
      })
      document.querySelector(`[data-path="${path}"]`).classList.add('assortment__menu-item-active');
    })
  })
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.filter').forEach(function (tabs) {
    tabs.addEventListener('click', function (evnt) {
      const filter = evnt.currentTarget.dataset.filter

      document.querySelectorAll('.filter').forEach(function (tabList) {
        tabList.classList.remove('filter-active')
      })
      document.querySelector(`[data-filter="${filter}"]`).classList.add('filter-active');
    })
  })
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.filterShop').forEach(function (tabs1) {
    tabs1.addEventListener('click', function (evnt1) {
      const filter = evnt1.currentTarget.dataset.filter

      document.querySelectorAll('.filterShop').forEach(function (tabList1) {
        tabList1.classList.remove('filterShop-active')
      })
      document.querySelector(`[data-tab="${filter}"]`).classList.add('filterShop-active');
    })
  })
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.rent-contacts__menu-item').forEach(function (tabsClickRent) {
    tabsClickRent.addEventListener('click', function (event) {
      const path = event.currentTarget.dataset.path

      document.querySelectorAll('.rent-contacts__content-item').forEach(function (tabContentrent) {
        tabContentrent.classList.remove('rent-contacts__content-item-active')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('rent-contacts__content-item-active');
    })
  })
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.rent-contacts__menu-item').forEach(function (tabsClick) {
    tabsClick.addEventListener('click', function (event) {
      let path = event.currentTarget.dataset.path

      document.querySelectorAll('.rent-contacts__menu-item').forEach(function (tabContentClick) {
        tabContentClick.classList.remove('rent-contacts__menu-item-active')
      })
      document.querySelector(`[data-path="${path}"]`).classList.add('rent-contacts__menu-item-active');
    })
  })
});

let fakeinput = document.querySelectorAll('.fakeinput');
let hold = document.querySelectorAll('.holder');

for (let i = 0; i < fakeinput.length; i++) {
  fakeinput[i].addEventListener('input', function () {
    hold[i].style.display = (this.value == "") ? 'inline' : 'none';
  });
}


const btsFilter = Array.from(document.querySelectorAll('[data-filter]'))

const colors = ['beef', 'delicacies', 'fish', 'vegetables', 'fruits', 'berries', 'birds', /*, .... */]
const map = colors.reduce((a, e) => {
  const bt = btsFilter.find((btel) => btel.dataset.filter === e)
  const els = Array.from(document.querySelectorAll(`.item.${e}`))
  let hide = false
  a.set(e, (fl, reset) => {
    if (fl) {
      reset || bt.classList.add('selected')
      if (!hide) return
      hide = false
      els.forEach((e) => e.classList.remove('hide'))
    } else {
      bt.classList.remove('selected')
      if (hide) return
      hide = true
      els.forEach((e) => e.classList.add('hide'))
    }
  })
  return a
}, new Map())
map.set('reset', (fl) => fl && colors.forEach((e) => map.get(e)(fl, true)))

btsFilter.forEach((i) => i.addEventListener('click', ({ target: { dataset: { filter } } }) => {
  for (let [key, show] of map.entries()) {
    show(filter === key)
  }
}));


var button = document.getElementById("show-more");
var list = document.getElementById("list");
var items = list.querySelectorAll(".item");
var visibleItemCount = 7; // количество элементов, которые отображаются изначально
var hiddenItemCount = items.length - visibleItemCount; // количество скрытых элементов

// Скрыть все элементы, кроме первых visibleItemCount
for (var i = visibleItemCount; i < items.length; i++) {
  items[i].style.display = "none";
}

button.onclick = function () {
  // Отобразить следующие hiddenItemCount элементов
  for (var i = visibleItemCount; i < visibleItemCount + hiddenItemCount; i++) {
    if (items[i]) {
      items[i].style.display = "flex";
    }
  }

  // Если все элементы отображены, скрыть кнопку
  if (visibleItemCount + hiddenItemCount >= items.length) {
    button.style.display = "none";
  }

  visibleItemCount += hiddenItemCount;
};



function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



document.addEventListener('DOMContentLoaded', function () {

  var modalButtons = document.querySelectorAll('.header__top-list--item-link--modal'),
    overlay = document.querySelector('.js-overlay-modal'),
    closeButtons = document.querySelectorAll('.js-modal-close');

  modalButtons.forEach(function (item) {

    item.addEventListener('click', function (e) {

      e.preventDefault();

      var modalId = this.getAttribute('data-modal'),
        modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
      modalElem.classList.add('active');
      overlay.classList.add('active');
    });

  });


  closeButtons.forEach(function (item) {

    item.addEventListener('click', function (e) {
      var parentModal = this.closest('.modal');

      parentModal.classList.remove('active');
      overlay.classList.remove('active');
    });

  });


  document.body.addEventListener('keyup', function (e) {
    var key = e.keyCode;

    if (key == 27) {

      document.querySelector('.modal.active').classList.remove('active');
      document.querySelector('.overlay').classList.remove('active');
    };
  }, false);


  overlay.addEventListener('click', function () {
    document.querySelector('.modal.active').classList.remove('active');
    this.classList.remove('active');
  });
});

document.addEventListener('DOMContentLoaded', function () {

  var modalButtons = document.querySelectorAll('.contacts__block-address--link-item'),
    overlay = document.querySelector('.js-overlay-modal'),
    closeButtons = document.querySelectorAll('.js-modal-close');

  modalButtons.forEach(function (item) {

    item.addEventListener('click', function (e) {

      e.preventDefault();

      var modalId = this.getAttribute('data-modal'),
        modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
      modalElem.classList.add('active');
      overlay.classList.add('active');
    });

  });


  closeButtons.forEach(function (item) {

    item.addEventListener('click', function (e) {
      var parentModal = this.closest('.modal');

      parentModal.classList.remove('active');
      overlay.classList.remove('active');
    });

  });


  document.body.addEventListener('keyup', function (e) {
    var key = e.keyCode;

    if (key == 27) {

      document.querySelector('.modal.active').classList.remove('active');
      document.querySelector('.overlay').classList.remove('active');
    };
  }, false);


  overlay.addEventListener('click', function () {
    document.querySelector('.modal.active').classList.remove('active');
    this.classList.remove('active');
  });
});

$(document).ready(function () {


  // Копируем ссылку
  $('.share-item_link').click(function () {
    // Показываем сообщение
    $('.share-item_link-copied').show();
    console.log('123');

    // Скрываем сообщение через 3 секунды
    setTimeout(function () {
      $('.share-item_link-copied').hide();
    }, 1000);
  });



});

$(`.information__link,
  .rent__block-contacts__link,
  .rent__block-down--link,
  .footer__link,
  .lib__link`).click(function (e) {

  var posX = $(this).offset().left,
    posY = $(this).offset().top,
    buttonWidth = $(this).width(),
    buttonHeight = $(this).height();

  $(this).prepend("<span class='ripple'></span>");

  if (buttonWidth >= buttonHeight) {
    buttonHeight = buttonWidth;
  } else {
    buttonWidth = buttonHeight;
  }
  var x = e.pageX - posX - buttonWidth / 2;
  var y = e.pageY - posY - buttonHeight / 2;

  $(".ripple").css({
    width: buttonWidth,
    height: buttonHeight,
    top: y + 'px',
    left: x + 'px'
  }).addClass("rippleEffect");
});