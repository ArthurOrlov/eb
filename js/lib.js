document.querySelector('.player-chunk-prev').addEventListener('click', prev);
document.querySelector('.player-chunk-next').addEventListener('click', switchToNextChunk);

function prev() {
  moveClass('player-chunk-active', 'previousElementSibling')
  moveClass('timeline-chunk-active', 'previousElementSibling', (el) => {
    const
      inner = el.querySelector('.timeline-chunk-inner'),
      w = parseFloat(inner.style.width) || 0;

    el.querySelector('.timeline-chunk-inner').style.width = '';
    return w <= 100;
  });
}

function switchToNextChunk() {
  moveClass('player-chunk-active', 'nextElementSibling');

  const
    el = moveClass('timeline-chunk-active', 'nextElementSibling');
  if (el) {
    el.querySelector('.timeline-chunk-inner').style.width = '';
  }
};


function moveClass(className, method, pred) {
  const
    active = document.querySelector('.' + className);
  next = active[method];

  if (pred && !pred(active)) {
    return null;
  }

  if (next) {
    active.classList.remove(className);
    next.classList.add(className);

    return active;
  }

  return null;
};


let timer;

function runChunkSwitching(time, step) {
  clearInterval(timer);

  timer = setInterval(() => {
    const
      active = document.querySelector('.timeline-chunk-active').querySelector('.timeline-chunk-inner');

    const
      w = parseFloat(active.style.width) || 0;

    if (w === 100) {
      switchToNextChunk();
      return;
    }

    active.style.width = String(w + step) + '%';

  }, time * 1000 * step / 100);
}

runChunkSwitching(3, 1);
runChunkSwitching(3, 1);
runChunkSwitching(3, 1);
runChunkSwitching(3, 1);