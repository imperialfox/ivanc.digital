/* PROPOSAL: small interactions for the private client proposal pages.
   Add-on cards and the live total, the day timeline, the progress bar, the looping clip, the optional
   message from Ivan, and the light/dark switch. */
(function () {
  'use strict';

/* ---- Money ---- */
  /* Each page can set its own base total and balance wording on <main> (data-base, data-balance-due).
     Without them it falls back to the Beth & Kyle numbers. */
  var cfg = (document.getElementById('main') || {}).dataset || {};
  var BASE = Number(cfg.base) || 1520, DEPOSIT_RATE = 0.25, VAT_RATE = 1.2;
  function money(n, force2) {
    var whole = Math.abs(n - Math.round(n)) < 0.005;
    return '£' + n.toLocaleString('en-GB', { minimumFractionDigits: (whole && !force2) ? 0 : 2, maximumFractionDigits: 2 });
  }
  
  /* ---- Add-ons and live total ---- */
  var picked = {};
  function refresh() {
    var total = BASE;
    document.querySelectorAll('.addon').forEach(function (a) {
      var on = !!picked[a.dataset.id];
      if (on) total += Number(a.dataset.price);
      a.classList.toggle('on', on);
      var b = a.querySelector('.toggle');
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.textContent = on ? 'Added' : 'Add to my package';
      var row = document.querySelector('[data-extra="' + a.dataset.id + '"]');
      if (row) row.hidden = !on;
    });
    var net = total / VAT_RATE, vat = total - net, dep = total * DEPOSIT_RATE;
    document.getElementById('sum').textContent = money(total);
    document.getElementById('vat').textContent = 'Includes VAT of ' + money(vat, true) + ' (' + money(net, true) + ' before VAT).';
    document.getElementById('deposit').textContent = money(dep);
    document.getElementById('balance').textContent = money(total - dep);
    writeSummary(total, dep);
  }
  /* The "copy my choices" message. Wording and amounts follow the page, so it never drifts. */
  function writeSummary(total, dep) {
    var box = document.getElementById('summary');
    if (!box) return;
    var extras = [];
    document.querySelectorAll('.addon').forEach(function (a) {
      if (picked[a.dataset.id]) extras.push(a.dataset.name + ' (' + money(Number(a.dataset.price)) + ')');
    });
    var songEl = document.getElementById('song'), song = songEl ? songEl.value.trim() : '';
    var dateEl = document.getElementById('weddingDate');
    var wedding = dateEl ? (dateEl.value.trim() || 'Date to confirm') : 'Thursday 21 October 2027';
    var due = cfg.balanceDue || 'by 7 October 2027';
    var lines = [
      'Wedding: ' + wedding,
      'Package: Full Day Video Coverage, Feature Film and Highlights Reel',
      'Extras: ' + (extras.length ? extras.join(', ') : 'None'),
      'Total: ' + money(total) + ' including VAT',
      'Deposit: ' + money(dep) + '. Balance: ' + money(total - dep) + ' ' + due
    ];
    if (song) lines.push('Our song: ' + song);
    box.value = lines.join('\n');
    box.style.height = 'auto'; box.style.height = (box.scrollHeight + 2) + 'px';
  }
  document.querySelectorAll('.addon .toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.closest('.addon').dataset.id;
      picked[id] = !picked[id];
      refresh();
    });
  });
  window.addEventListener('resize', function () { var b = document.getElementById('summary'); if (b) { b.style.height = 'auto'; b.style.height = (b.scrollHeight + 2) + 'px'; } });
  var songField = document.getElementById('song');
  if (songField) songField.addEventListener('input', refresh);
  var dateField = document.getElementById('weddingDate');
  if (dateField) dateField.addEventListener('input', refresh);
  refresh();

  /* ---- Choices box: one tap selects everything, so the phone's own Copy button appears ---- */
  (function () {
    var box = document.getElementById('summary');
    if (!box) return;
    function all() { try { box.select(); box.setSelectionRange(0, box.value.length); } catch (e) {} }
    box.addEventListener('click', all);
    box.addEventListener('focus', all);
  })();
  
  /* ---- The day: one stop open at a time ---- */
  var stops = document.querySelectorAll('.stop');
  stops.forEach(function (stop) {
    var btn = stop.querySelector('.stop-btn');
    btn.addEventListener('click', function () {
      var open = stop.classList.contains('on');
      stops.forEach(function (s) { s.classList.remove('on'); s.querySelector('.stop-btn').setAttribute('aria-expanded', 'false'); });
      if (!open) { stop.classList.add('on'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });
  
  /* ---- Top bar: progress and chapter name ---- */
  var prog = document.getElementById('progress'), where = document.getElementById('where');
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      prog.style.transform = 'scaleX(' + p + ')';
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  
  if ('IntersectionObserver' in window) {
    var chapters = document.querySelectorAll('[data-chapter]');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) where.textContent = e.target.dataset.chapter; });
    }, { rootMargin: '-45% 0px -50% 0px' });
    chapters.forEach(function (c) { io.observe(c); });
  
    var rise = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rise.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.rise').forEach(function (r) { rise.observe(r); });
  } else {
    document.querySelectorAll('.rise').forEach(function (r) { r.classList.add('in'); });
  }
  
  /* ---- Message from Ivan: only shown if the video loads ---- */
  (function () {
    var sec = document.getElementById('helloSection'), v = document.getElementById('helloVideo');
    if (!sec || !v) return;
    v.addEventListener('loadedmetadata', function () {
      if (v.videoWidth && v.videoHeight) {
        var box = document.getElementById('helloBox');
        box.style.aspectRatio = v.videoWidth + ' / ' + v.videoHeight;
        if (v.videoHeight > v.videoWidth) box.style.maxWidth = '22rem';
      }
      sec.hidden = false;
    });
  })();
  
  /* ---- Looping clip: plays while on screen; tap to play if the phone blocks autoplay (Low Power Mode) ---- */
  (function () {
    var clip = document.getElementById('clip'), v = document.getElementById('clipVideo');
    if (!clip || !v) return;
    var tap = document.createElement('button');
    tap.type = 'button'; tap.className = 'clip-play'; tap.hidden = true;
    tap.setAttribute('aria-label', 'Play the clip');
    tap.innerHTML = '<span aria-hidden="true"></span>';
    clip.appendChild(tap);
    function fail() { clip.classList.add('failed'); }
    function tryPlay() {
      var p = v.play();
      if (p && p.then) p.then(function () { tap.hidden = true; }, function () { tap.hidden = false; });
    }
    v.addEventListener('error', fail, true);
    var sources = v.querySelectorAll('source');
    if (sources.length) sources[sources.length - 1].addEventListener('error', fail);
    v.addEventListener('loadeddata', function () { clip.classList.remove('failed'); });
    v.addEventListener('playing', function () { tap.hidden = true; clip.classList.remove('failed'); });
    tap.addEventListener('click', tryPlay);
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (calm) { v.controls = true; return; }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) tryPlay(); else v.pause();
        });
      }, { threshold: 0.25 }).observe(clip);
    } else { tryPlay(); }
  })();
  
  /* ---- Appearance: same switch rules as the rest of the site (light by default, dark on request) ---- */
  var root = document.documentElement;
  var themeColour = document.querySelector('meta[name="theme-color"]');
  var button = document.getElementById('appearance');
  if (button) {
    button.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      if (themeColour) themeColour.setAttribute('content', next === 'dark' ? '#0A0A0A' : '#F4F0E6');
      try { if (next === 'dark') { localStorage.setItem('theme', 'dark'); } else { localStorage.removeItem('theme'); } } catch (e) {}
    });
  }
})();
