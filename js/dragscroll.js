/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.8
 * 
 * @license MIT, see http://github.com/asvd/dragscroll
 * @copyright 2015 asvd <heliosframework@gmail.com> 
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    factory((root.dragscroll = {}));
  }
}(this, function (exports) {
  var _window = window;
  var _document = document;
  var mousemove = 'mousemove';
  var mouseup = 'mouseup';
  var mousedown = 'mousedown';
  var EventListener = 'EventListener';
  var addEventListener = 'add' + EventListener;
  var removeEventListener = 'remove' + EventListener;
  var newScrollX, newScrollY;

  var dragged = [];
  var reset = function (i, el) {
    for (i = 0; i < dragged.length;) {
      el = dragged[i++];
      el = el.container || el;
      el[removeEventListener](mousedown, el.md, 0);
      _window[removeEventListener](mouseup, el.mu, 0);
      _window[removeEventListener](mousemove, el.mm, 0);
    }

    // cloning into array since HTMLCollection is updated dynamically
    dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
    for (i = 0; i < dragged.length;) {
      (function (el, lastClientX, lastClientY, pushed, scroller, cont) {
        (cont = el.container || el)[addEventListener](
          mousedown,
          cont.md = function (e) {
            if (!el.hasAttribute('nochilddrag') ||
              _document.elementFromPoint(
                e.pageX, e.pageY
              ) == cont
            ) {
              pushed = 1;
              lastClientX = e.clientX;
              lastClientY = e.clientY;

              e.preventDefault();
            }
          }, 0
        );

        _window[addEventListener](
          mouseup, cont.mu = function () { pushed = 0; }, 0
        );

        _window[addEventListener](
          mousemove,
          cont.mm = function (e) {
            if (pushed) {
              (scroller = el.scroller || el).scrollLeft -=
                newScrollX = (- lastClientX + (lastClientX = e.clientX));
              scroller.scrollTop -=
                newScrollY = (- lastClientY + (lastClientY = e.clientY));
              if (el == _document.body) {
                (scroller = _document.documentElement).scrollLeft -= newScrollX;
                scroller.scrollTop -= newScrollY;
              }
            }
          }, 0
        );
      })(dragged[i++]);
    }
  }


  if (_document.readyState == 'complete') {
    reset();
  } else {
    _window[addEventListener]('load', reset, 0);
  }

  exports.reset = reset;
}));

(this, function (exports) {
  var _window = window;
  var _document = document;
  var mousemove = "touchmove";
  var mouseup = "touchend";
  var mousedown = "touchstart";
  var EventListener = "EventListener";
  var addEventListener = "add" + EventListener;
  var removeEventListener = "remove" + EventListener;
  var newScrollX, newScrollY;
  var velocityQueue = new Array(5);
  var velocityMultiplier = 2.5;
  var anim = null;

  var dragged = [];
  var reset = function (i, el) {
    for (i = 0; i < dragged.length;) {
      el = dragged[i++];
      el = el.container || el;
      el[removeEventListener](mousedown, el.md, 0);
      _window[removeEventListener](mouseup, el.mu, 0);
      _window[removeEventListener](mousemove, el.mm, 0);
    }

    // cloning into array since HTMLCollection is updated dynamically
    dragged = [].slice.call(_document.getElementsByClassName("dragscroll-mob"));
    for (i = 0; i < dragged.length;) {
      (function (el, lastClientX, lastClientY, pushed, scroller, cont) {
        (cont = el.container || el)[addEventListener](
          mousedown,
          (cont.md = function (e) {

            if (anim) {
              anim.pause();
              anim = null;
            }

            var touch = getTouch(e);
            if (
              !el.hasAttribute("nochilddrag") ||
              _document.elementFromPoint(touch.pageX, touch.pageY) == cont
            ) {
              pushed = 1;
              lastClientX = touch.clientX;
              lastClientY = touch.clientY;

              e.preventDefault();
            }
          }),
          0
        );

        _window[addEventListener](
          mouseup,
          (cont.mu = function (e) {
            pushed = 0;
            var touch = e.changedTouches[0];

            //addToLIFO({ time: e.timeStamp, x: touch.pageX, y: touch.pageY });

            var v = velocity();

            (scroller = el.scroller || el).scrollLeft -=
              newScrollX = v.x;
            scroller.scrollTop -=
              newScrollY = v.y;
            if (el == _document.body) {
              (scroller = _document.documentElement).scrollLeft -= newScrollX;
              scroller.scrollTop -= newScrollY;
            }


            if (anim) {
              anim.pause();
              anim = null;
            }
            var distPerSec = v.y / v.dt;
            console.log(distPerSec)
            if (Math.abs(distPerSec) > .33) {
              anim = anime({
                targets: scroller,
                scrollTop: scroller.scrollTop - v.y,
                scrollLeft: scroller.scrollLeft - v.x,
                easing: "easeOutQuart",
                update: function () { }
              });
            }

            resetVelocityQueue();
          }),
          0
        );

        _window[addEventListener](
          mousemove,
          (cont.mm = function (e) {
            if (pushed) {
              var touch = getTouch(e);
              console.log(e);
              addToLIFO({ time: e.timeStamp, x: touch.pageX, y: touch.pageY });
              (scroller = el.scroller || el).scrollLeft -= newScrollX =
                -lastClientX + (lastClientX = touch.clientX);
              scroller.scrollTop -= newScrollY =
                -lastClientY + (lastClientY = touch.clientY);
              if (el == _document.body) {
                (scroller = _document.documentElement).scrollLeft -= newScrollX;
                scroller.scrollTop -= newScrollY;
              }
            }
          }),
          0
        );
      })(dragged[i++]);
    }
  };

  var addToLIFO = function (val) {
    // last in, first out
    var arr = velocityQueue;
    arr = arr.slice(1, arr.length);
    arr.push(val);
    velocityQueue = arr;
  };

  var resetVelocityQueue = function () {
    velocityQueue = new Array(5);
  };

  var velocity = function () {
    var sumX = 0;
    var sumY = 0;
    var dt = 0;

    for (var i = 0; i < velocityQueue.length - 1; i++) {
      if (velocityQueue[i]) {
        sumX += velocityQueue[i + 1].x - velocityQueue[i].x;
        sumY += velocityQueue[i + 1].y - velocityQueue[i].y;
        dt = velocityQueue[i + 1].time - velocityQueue[i].time;
      }
    }

    var x = sumX * velocityMultiplier;
    var y = sumY * velocityMultiplier;
    return {
      x: x,
      y: y,
      dist: Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
      dt: dt
    };
  };

  if (_document.readyState == "complete") {
    reset();
  } else {
    _window[addEventListener]("load", reset, 0);
  }

  exports.reset = reset;
});

function getTouch(evt) {
  return evt.touches[0];
}
