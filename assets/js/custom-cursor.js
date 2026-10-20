/* CUSTOM CURSOR: a round red dot that follows the mouse. Desktop only.
   On touch screens and phones this does nothing at all. */
(function () {
  'use strict';

  if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');
  document.body.appendChild(dot);
  document.documentElement.classList.add('has-custom-cursor');

  var x = 0, y = 0, queued = false;

  function paint() {
    dot.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
    queued = false;
  }

  document.addEventListener('mousemove', function (event) {
    x = event.clientX;
    y = event.clientY;
    dot.classList.add('is-visible');
    if (!queued) { queued = true; requestAnimationFrame(paint); }
    var overLink = event.target.closest && event.target.closest('a, button');
    dot.classList.toggle('is-big', !!overLink);
  });

  document.addEventListener('mouseleave', function () { dot.classList.remove('is-visible'); });
})();
