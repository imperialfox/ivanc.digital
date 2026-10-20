/* PREFERENCES: the light / dark switch in the footer.
   The site always opens in light mode. The switch turns dark mode on and off, and the choice is
   remembered on that device. The device's own light/dark setting is not followed any more. */
(function () {
  'use strict';

  var root = document.documentElement;
  var toggle = document.querySelector('.theme-switch');
  if (!toggle) return;

  var themeColour = document.querySelector('meta[name="theme-color"]');
  var BAR_COLOURS = { light: '#F4F0E6', dark: '#0A0A0A' };   // browser bar colour, same as --paper in colours-and-type.css

  function savedChoice() {
    try { return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; } catch (e) { return 'light'; }
  }

  function apply(choice, remember) {
    root.setAttribute('data-theme', choice);
    toggle.setAttribute('aria-checked', choice === 'dark' ? 'true' : 'false');
    if (themeColour) themeColour.setAttribute('content', BAR_COLOURS[choice]);
    if (!remember) return;
    try {
      if (choice === 'dark') { localStorage.setItem('theme', 'dark'); } else { localStorage.removeItem('theme'); }
    } catch (e) { /* storage blocked: the choice just lasts for this visit */ }
  }

  toggle.addEventListener('click', function () {
    apply(toggle.getAttribute('aria-checked') === 'true' ? 'light' : 'dark', true);
  });

  apply(savedChoice(), false);
})();

/* SWITCHED OFF: the old System / Light / Dark panel version of this file. It opened from a dot in the
   footer and could follow the device setting. To bring it back, see _layouts/default.html and footer.html.

(function () {
  'use strict';

  var root = document.documentElement;
  var panel = document.getElementById('prefs-panel');
  var openButton = document.querySelector('.prefs-open');
  if (!panel || !openButton) return;

  var choices = panel.querySelectorAll('[data-theme-choice]');
  var closeButton = panel.querySelector('.prefs-close');

  function savedChoice() {
    try { return localStorage.getItem('theme') || 'system'; } catch (e) { return 'system'; }
  }

  function apply(choice) {
    if (choice === 'light' || choice === 'dark') {
      root.setAttribute('data-theme', choice);
    } else {
      root.removeAttribute('data-theme');
    }
    try {
      if (choice === 'system') { localStorage.removeItem('theme'); } else { localStorage.setItem('theme', choice); }
    } catch (e) { }
    for (var i = 0; i < choices.length; i++) {
      var on = choices[i].getAttribute('data-theme-choice') === choice;
      choices[i].setAttribute('aria-checked', on ? 'true' : 'false');
    }
  }

  function open() {
    panel.hidden = false;
    openButton.setAttribute('aria-expanded', 'true');
    var current = panel.querySelector('[aria-checked="true"]');
    if (current) current.focus();
  }

  function close() {
    panel.hidden = true;
    openButton.setAttribute('aria-expanded', 'false');
    openButton.focus();
  }

  for (var i = 0; i < choices.length; i++) {
    choices[i].addEventListener('click', function (event) {
      apply(event.currentTarget.getAttribute('data-theme-choice'));
    });
  }

  openButton.addEventListener('click', function () { if (panel.hidden) { open(); } else { close(); } });
  if (closeButton) closeButton.addEventListener('click', close);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !panel.hidden) close();
  });

  apply(savedChoice());
})();
*/
