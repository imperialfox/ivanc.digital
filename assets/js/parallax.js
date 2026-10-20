/* PARALLAX (Home only): gentle layered depth on scroll.
   Put data-parallax="0.1" on an element; bigger numbers drift more.
   Lighter on phones, and switched off with reduced motion. */
(function () {
  'use strict';

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var layers = document.querySelectorAll('[data-parallax]');
  if (!layers.length) return;

  var queued = false;

  function update() {
    var strength = window.innerWidth < 768 ? 0.5 : 1; // lighter on touch screens
    var y = window.pageYOffset;
    for (var i = 0; i < layers.length; i++) {
      var speed = parseFloat(layers[i].getAttribute('data-parallax')) || 0;
      layers[i].style.transform = 'translate3d(0,' + Math.round(y * speed * strength) + 'px,0)';
    }
    queued = false;
  }

  window.addEventListener('scroll', function () {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }, { passive: true });

  update();
})();
