/* GALLERY LOADER (Home): the Playbook gallery only loads when someone presses "View gallery".
   Until then there is just a plain block and a button, so nothing from Playbook loads up front.
   If the gallery can't load, a calm "unavailable" panel appears with Try again (and a link, if one is set). */
(function () {
  'use strict';

  var SLOW_MS = 10000;
  var button = document.querySelector('.gallery-button[data-embed]');
  if (!button) return;

  var media = button.closest('.media');
  var embedUrl = button.getAttribute('data-embed');
  var watchUrl = button.getAttribute('data-watch');
  var title = button.getAttribute('aria-label') || 'Gallery';

  function start() {
    var frame = document.createElement('iframe');
    frame.src = embedUrl;
    frame.title = title;
    frame.setAttribute('sandbox', 'allow-same-origin allow-scripts');

    var timer = setTimeout(function () {
      if (frame.parentNode) frame.parentNode.removeChild(frame);
      showUnavailable();
    }, SLOW_MS);

    function fail() {
      clearTimeout(timer);
      if (frame.parentNode) frame.parentNode.removeChild(frame);
      showUnavailable();
    }

    frame.addEventListener('load', function () { clearTimeout(timer); });
    frame.addEventListener('error', fail);

    button.hidden = true;
    media.appendChild(frame);
  }

  function showUnavailable() {
    var actions = [];

    var retry = document.createElement('button');
    retry.type = 'button';
    retry.textContent = 'Try again';
    retry.addEventListener('click', function () {
      window.mediaFallback.clear(media);
      start();
    });
    actions.push(retry);

    if (watchUrl) {
      var link = document.createElement('a');
      link.href = watchUrl;
      link.textContent = 'Open the gallery on Playbook';
      link.rel = 'noopener';
      actions.push(link);
    }

    window.mediaFallback.show(media, 'This gallery is unavailable right now', actions);
  }

  button.addEventListener('click', start);
})();
