/* SCROLL BUTTON: the logo spins as you scroll, then turns into a back-to-top arrow.
   Tweak the three numbers below to change how it feels. */
(function () {
  'use strict';

  var button = document.querySelector('.scroll-button');
  if (!button) return;

  var SHOW_AFTER = 120;            // px scrolled before the logo appears
  var ARROW_AFTER = 1.2;           // screens scrolled before it becomes an arrow
  var DEGREES_PER_PX = 0.35;       // spin speed

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var queued = false;

  function update() {
    queued = false;
    var y = window.pageYOffset;
    // Arrow after 1.2 screens, or 60% of the way down on short pages.
    var room = document.documentElement.scrollHeight - window.innerHeight;
    var isArrow = y > Math.min(window.innerHeight * ARROW_AFTER, room * 0.6);

    button.classList.toggle('is-shown', y > SHOW_AFTER);
    button.classList.toggle('is-arrow', isArrow);

    // Only reachable (and announced) once it is an arrow.
    button.setAttribute('aria-hidden', isArrow ? 'false' : 'true');
    button.tabIndex = isArrow ? 0 : -1;

    if (!reduced) button.style.setProperty('--spin', (y * DEGREES_PER_PX) + 'deg');
  }

  window.addEventListener('scroll', function () {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);

  button.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });

  update();
})();
