/* VIDEO LOADER (project pages): the full video only loads when someone presses play.
   Until then there is just a poster and a Play button, so the host's player script never loads up front.
   If the video can't load, a calm "unavailable" panel appears with Try again. */
(function () {
  'use strict';

  var SLOW_MS = 10000;
  var button = document.querySelector('.player-button[data-embed]');
  if (!button) return;

  var media = button.closest('.media');
  var embedUrl = button.getAttribute('data-embed');
  var watchUrl = button.getAttribute('data-watch');
  var title = button.getAttribute('aria-label') || 'Video';

  function start() {
    var join = embedUrl.indexOf('?') === -1 ? '?' : '&';
    var frame = document.createElement('iframe');
    frame.src = embedUrl + join + 'autoplay=1';
    frame.title = title;
    frame.allow = 'autoplay; fullscreen; picture-in-picture';
    frame.setAttribute('allowfullscreen', '');

    var timer = setTimeout(function () {
      if (frame.parentNode) frame.parentNode.removeChild(frame);
      showUnavailable();
    }, SLOW_MS);

    frame.addEventListener('load', function () { clearTimeout(timer); });
    frame.addEventListener('error', function () {
      clearTimeout(timer);
      if (frame.parentNode) frame.parentNode.removeChild(frame);
      showUnavailable();
    });

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
      link.textContent = 'Watch on the host';
      link.rel = 'noopener';
      actions.push(link);
    }

    window.mediaFallback.show(media, 'This video is unavailable right now', actions);
  }

  button.addEventListener('click', start);
})();
