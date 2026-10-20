/* MEDIA FALLBACK: if a photo or video can't load, show a calm "unavailable" panel
   in the same reserved space, so the layout never jumps.
   Also fades each picture in over its palette block once it has loaded.

   Other scripts can use it too: window.mediaFallback.show(mediaElement, "Message", [buttons]) */
(function () {
  'use strict';

  var SLOW_MS = 10000; // a video that has started loading but not finished after this long counts as unavailable

  function buildPanel(text, actions) {
    var box = document.createElement('div');
    box.className = 'unavailable';
    box.setAttribute('role', 'status');

    var title = document.createElement('p');
    title.className = 'unavailable-title';
    title.textContent = text;
    box.appendChild(title);

    if (actions && actions.length) {
      var row = document.createElement('div');
      row.className = 'unavailable-actions';
      for (var i = 0; i < actions.length; i++) row.appendChild(actions[i]);
      box.appendChild(row);
    }
    return box;
  }

  function show(media, text, actions) {
    clear(media);
    media.classList.remove('is-loaded');
    media.classList.add('is-unavailable');
    media.appendChild(buildPanel(text, actions));
  }

  function clear(media) {
    media.classList.remove('is-unavailable');
    var old = media.querySelector(':scope > .unavailable');
    if (old) old.parentNode.removeChild(old);
  }

  function watch(media) {
    var item = media.querySelector('.media-item');
    if (!item) return; // plain placeholder block: nothing to watch
    if (item.hasAttribute('data-quiet')) { // e.g. a poster behind a Play button: never block the button
      item.addEventListener('load', function () { media.classList.add('is-loaded'); });
      return;
    }

    var isVideo = item.tagName === 'VIDEO';
    var message = media.getAttribute('data-unavailable') || (isVideo ? 'Preview unavailable' : 'Image unavailable');
    var timer = null;

    function loaded() {
      clearTimeout(timer);
      media.classList.add('is-loaded');
    }
    function failed() {
      clearTimeout(timer);
      show(media, message);
    }

    if (isVideo) {
      item.addEventListener('loadstart', function () {
        clearTimeout(timer);
        timer = setTimeout(failed, SLOW_MS);
      });
      item.addEventListener('loadeddata', loaded);
      // Capture phase, so errors from the <source> inside are caught too.
      item.addEventListener('error', failed, true);
    } else {
      if (item.complete) {
        if (item.naturalWidth > 0) { loaded(); } else { failed(); }
      } else {
        item.addEventListener('load', loaded);
        item.addEventListener('error', failed);
      }
    }
  }

  window.mediaFallback = { show: show, clear: clear };

  var blocks = document.querySelectorAll('.media');
  for (var i = 0; i < blocks.length; i++) watch(blocks[i]);
})();
