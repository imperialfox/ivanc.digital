/* PREFERENCES: the hidden display panel (opened from the quiet dot in the footer).
   Lets a visitor override the system light/dark setting. Their choice is remembered. */
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
    } catch (e) { /* storage blocked: the choice just lasts for this visit */ }
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
