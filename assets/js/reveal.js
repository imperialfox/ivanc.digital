/* REVEAL: things below the first screen fade up softly as they scroll into view.
   Add more by putting their CSS selector in the list below. */
(function () {
  'use strict';

  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var SELECTORS = [
    '.work-grid .card',
    '.index-row:not(.index-head)',
    '.closing',
    '.page-head',
    '.about-grid > *',
    '.about-section',
    '.contact-motto',
    '.contact-link',
    '.contact-extras'
  ];

  var items = document.querySelectorAll(SELECTORS.join(','));
  if (!items.length) return;

  var screenHeight = window.innerHeight;
  var hidden = [];

  // Anything already on the first screen stays put, so there is no flash on load.
  for (var i = 0; i < items.length; i++) {
    if (items[i].getBoundingClientRect().top < screenHeight * 0.92) continue;
    items[i].setAttribute('data-reveal', '');
    hidden.push(items[i]);
  }
  if (!hidden.length) return;

  document.documentElement.classList.add('reveal-on');

  var observer = new IntersectionObserver(function (entries) {
    var step = 0;
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      // A tiny stagger when several arrive together (a row of cards).
      entry.target.style.setProperty('--reveal-delay', Math.min(step * 90, 360) + 'ms');
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
      step++;
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  hidden.forEach(function (el) { observer.observe(el); });
})();
