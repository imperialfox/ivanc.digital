/* PREVIEW LOADER: the muted looping preview clips only download and play while they are on screen.
   With reduced motion or Data Saver on, they stay as still posters. */
(function () {
  'use strict';

  var clips = document.querySelectorAll('video[data-src]');
  if (!clips.length || !('IntersectionObserver' in window)) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  if (reduceMotion || saveData) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var clip = entry.target;
      if (entry.isIntersecting) {
        if (!clip.getAttribute('src')) clip.setAttribute('src', clip.getAttribute('data-src'));
        var attempt = clip.play();
        if (attempt && attempt.catch) attempt.catch(function () { /* autoplay blocked: poster stays */ });
      } else {
        clip.pause();
      }
    });
  }, { rootMargin: '200px 0px' });

  for (var i = 0; i < clips.length; i++) observer.observe(clips[i]);
})();
