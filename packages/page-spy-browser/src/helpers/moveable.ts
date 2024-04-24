export type UElement = HTMLElement & {
  isMoveEvent: boolean;
  isHidden: boolean;
  disableHidden: boolean;
};

function getPosition(evt: TouchEvent | MouseEvent): Touch | MouseEvent {
  /* c8 ignore next 3 */
  if (window.TouchEvent && evt instanceof TouchEvent) {
    return evt.touches[0];
  }
  return evt as MouseEvent;
}

/* eslint-disable no-param-reassign */
export function moveable(el: UElement) {
  let hiddenTimer: ReturnType<typeof setTimeout> | null;
  let rect: DOMRect;
  const critical = {
    xAxis: 0,
    yAxis: 0,
  };
  const touch = { x: 0, y: 0 };
  function handleHidden() {
    const { left, width } = el.getBoundingClientRect();
    const criticalX = window.innerWidth - width;
    if (left >= 0 && left <= criticalX) {
      el.isHidden = false;
    }

    if (hiddenTimer) {
      clearTimeout(hiddenTimer);
    }
    hiddenTimer = setTimeout(() => {
      hiddenTimer = null;
      if (el.disableHidden) return;

      if (left <= 0) {
        el.classList.add('hidden-in-left');
      } else if (left >= criticalX) {
        el.classList.add('hidden-in-right');
      }
      el.isHidden = true;
    }, 1000);
  }
  function move(evt: TouchEvent | MouseEvent) {
    evt.preventDefault();
    (el as UElement).isMoveEvent = true;
    const { clientX, clientY } = getPosition(evt);
    const diffX = clientX - touch.x;
    const diffY = clientY - touch.y;
    let resultX = rect.x + diffX;
    /* c8 ignore start */
    if (resultX < 0) {
      resultX = 0;
    } else if (resultX > critical.xAxis) {
      resultX = critical.xAxis;
    }
    let resultY = rect.y + diffY;
    if (resultY < 0) {
      resultY = 0;
    } else if (resultY > critical.yAxis) {
      resultY = critical.yAxis;
    }
    /* c8 ignore stop */

    el.style.left = `${resultX}px`;
    el.style.top = `${resultY}px`;
  }
  function end() {
    touch.x = 0;
    touch.y = 0;
    handleHidden();
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', end);

    document.removeEventListener('touchmove', move);
    document.removeEventListener('touchend', end);
  }
  function start(evt: TouchEvent | MouseEvent) {
    evt.preventDefault();
    if (hiddenTimer) {
      clearTimeout(hiddenTimer);
    }
    if (el.isHidden) {
      el.classList.remove('hidden-in-left', 'hidden-in-right');
    }
    el.isMoveEvent = false;
    rect = el.getBoundingClientRect();
    critical.xAxis = window.innerWidth - rect.width;
    critical.yAxis = window.innerHeight - rect.height;

    const { clientX, clientY } = getPosition(evt);
    touch.x = clientX;
    touch.y = clientY;
    document.addEventListener('mousemove', move, false);
    document.addEventListener('mouseup', end, false);

    document.addEventListener('touchmove', move, {
      capture: false,
      passive: false,
    });
    document.addEventListener('touchend', end, false);
  }

  el.addEventListener('mousedown', start, false);
  el.addEventListener('touchstart', start, { capture: false, passive: false });
  el.addEventListener(
    'mouseover',
    () => {
      el.disableHidden = true;
      if (el.isHidden) {
        el.classList.remove('hidden-in-left', 'hidden-in-right');
      }
    },
    false,
  );
  el.addEventListener(
    'mouseleave',
    () => {
      el.disableHidden = false;
      handleHidden();
    },
    false,
  );
}
