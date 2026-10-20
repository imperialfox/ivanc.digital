/* CUBES (Home only): a little fidget toy by the closing line.
   Drag them anywhere on the page, flick them, tap them to hop, and stack them.
   Mouse and touch both work. Purely for fun: hidden from screen readers and the keyboard.

   Change how many there are with data-cubes="3" on .cube-field in index.html.
   Change how they feel with the numbers just below. */
(function () {
  'use strict';

  var field = document.querySelector('.cube-field');
  if (!field) return;

  var COUNT = parseInt(field.getAttribute('data-cubes'), 10) || 3;
  var GRAVITY = 0.6;          // how hard they fall
  var AIR = 0.992;            // sideways drag in the air (1 = none)
  var FLOOR_FRICTION = 0.82;  // sideways slow-down when sliding along a surface
  var BOUNCE = 0.38;          // how bouncy landings are (0 = dead, 1 = rubber)
  var WALL_BOUNCE = 0.45;     // bounce off the sides of the screen
  var MAX_THROW = 28;         // speed limit for flicks

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var CUBE_SVG =
    '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
    '<polygon class="cube-top" points="32,2 60,17 32,32 4,17"/>' +
    '<polygon class="cube-left" points="4,17 32,32 32,62 4,47"/>' +
    '<polygon class="cube-right" points="60,17 32,32 32,62 60,47"/>' +
    '</svg>';

  var cubes = [];
  var size = 0, floor = 0, minX = 0, maxX = 0, minY = 0;   // measured by measure()
  var running = false;
  var pointer = { x: 0, y: 0 };

  /* Positions are measured from the top-left of the invisible field that sits on the
     bottom edge of the closing section. Up is negative, so the floor is -size. */
  function measure() {
    var rect = field.getBoundingClientRect();
    size = cubes[0].el.offsetWidth;
    floor = -size;
    minX = -rect.left;
    maxX = document.documentElement.clientWidth - rect.left - size;
    minY = -(rect.top + window.pageYOffset);
    return rect;
  }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function render() {
    for (var i = 0; i < cubes.length; i++) {
      var c = cubes[i];
      c.el.style.transform = 'translate(' + c.x.toFixed(1) + 'px,' + c.y.toFixed(1) + 'px) rotate(' + c.rot.toFixed(1) + 'deg)';
    }
  }

  /* One tick of physics. Returns true while anything is still moving. */
  function step() {
    var rect = measure();
    var moving = false;

    // A cube being held follows the pointer.
    cubes.forEach(function (c) {
      if (!c.held) return;
      c.x = clamp(pointer.x - rect.left - c.grabX, minX, maxX);
      c.y = clamp(pointer.y - rect.top - c.grabY, minY, floor);
      moving = true;
    });

    // Lowest cubes first, so the ones above can land on them.
    var loose = cubes.filter(function (c) { return !c.held; }).sort(function (a, b) { return b.y - a.y; });

    loose.forEach(function (c) {
      var bottomBefore = c.y + size;

      c.vy += GRAVITY;
      c.vx *= AIR;
      c.x += c.vx;
      c.y += c.vy;

      if (c.x < minX) { c.x = minX; c.vx = -c.vx * WALL_BOUNCE; }
      if (c.x > maxX) { c.x = maxX; c.vx = -c.vx * WALL_BOUNCE; }
      if (c.y < minY) { c.y = minY; c.vy = Math.abs(c.vy) * WALL_BOUNCE; }

      // What is underneath: the floor, or the top of another cube.
      var ground = floor;
      cubes.forEach(function (o) {
        if (o === c) return;
        if (Math.abs(o.x - c.x) < size * 0.8 && bottomBefore <= o.y + 6) {
          ground = Math.min(ground, o.y - size);
        }
      });

      var onGround = false;
      if (c.y >= ground) {
        c.y = ground;
        onGround = true;
        c.vy = c.vy > 2.5 ? -c.vy * BOUNCE : 0;
        c.vx *= FLOOR_FRICTION;
      }

      if (onGround && Math.abs(c.vy) < 0.1 && Math.abs(c.vx) < 0.1) {
        c.vx = 0; c.vy = 0;
      } else {
        moving = true;
      }
    });

    // Lean into the movement, then ease back to a small resting tilt.
    cubes.forEach(function (c) {
      var target = (c.held || c.vx !== 0 || c.vy !== 0) ? clamp(c.vx * 2.2, -24, 24) : c.tilt;
      c.rot += (target - c.rot) * 0.2;
      if (Math.abs(target - c.rot) > 0.2) moving = true; else c.rot = target;
    });

    return moving;
  }

  function loop() {
    if (!running) return;
    // Near the top or bottom edge of the screen, a held cube scrolls the page along.
    if (cubes.some(function (c) { return c.held; })) {
      if (pointer.y < 70) window.scrollBy(0, -14);
      else if (pointer.y > window.innerHeight - 70) window.scrollBy(0, 14);
    }
    var moving = step();
    render();
    if (moving) requestAnimationFrame(loop); else running = false;
  }

  function start() {
    if (reduced) { settleNow(); return; }
    if (!running) { running = true; requestAnimationFrame(loop); }
  }

  /* Reduced motion: no flying around. A released cube just drops into place. */
  function settleNow() {
    var held = cubes.some(function (c) { return c.held; });
    var i = 0;
    while (i < 800 && step()) {
      if (held) break;
      i++;
    }
    cubes.forEach(function (c) { if (!c.held) c.rot = c.tilt; });
    render();
  }

  function makeCube(index) {
    var el = document.createElement('div');
    el.className = 'cube';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = CUBE_SVG;
    field.appendChild(el);

    var c = { el: el, x: 0, y: 0, vx: 0, vy: 0, rot: 0, tilt: (Math.random() - 0.5) * 8, held: false, grabX: 0, grabY: 0, samples: [], startedAt: 0, moved: 0 };

    el.addEventListener('pointerdown', function (event) {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      event.preventDefault();
      var rect = measure();
      pointer.x = event.clientX; pointer.y = event.clientY;
      c.grabX = event.clientX - rect.left - c.x;
      c.grabY = event.clientY - rect.top - c.y;
      c.held = true; c.vx = 0; c.vy = 0;
      c.samples = [{ t: performance.now(), x: event.clientX, y: event.clientY }];
      c.startedAt = performance.now(); c.moved = 0;
      el.classList.add('is-held');
      try { el.setPointerCapture(event.pointerId); } catch (e) {}
      start();
    });

    el.addEventListener('pointermove', function (event) {
      if (!c.held) return;
      var last = c.samples[c.samples.length - 1];
      c.moved += Math.abs(event.clientX - last.x) + Math.abs(event.clientY - last.y);
      pointer.x = event.clientX; pointer.y = event.clientY;
      var now = performance.now();
      c.samples.push({ t: now, x: event.clientX, y: event.clientY });
      while (c.samples.length > 2 && now - c.samples[0].t > 100) c.samples.shift();
      if (reduced) { step(); render(); }
    });

    function release(event) {
      if (!c.held) return;
      c.held = false;
      el.classList.remove('is-held');
      try { el.releasePointerCapture(event.pointerId); } catch (e) {}

      var now = performance.now();
      if (c.moved < 5 && now - c.startedAt < 300) {
        // A tap: hop up and a little sideways.
        c.vy = -9; c.vx = (Math.random() - 0.5) * 5;
      } else {
        // A flick: carry on in the direction you were moving.
        // Only movement in the last 100ms counts, so pausing before letting go means no throw.
        var recent = c.samples.filter(function (s) { return now - s.t <= 100; });
        if (recent.length > 1) {
          var first = recent[0], last = recent[recent.length - 1];
          var dt = Math.max(last.t - first.t, 16);
          c.vx = clamp((last.x - first.x) / dt * 16, -MAX_THROW, MAX_THROW);
          c.vy = clamp((last.y - first.y) / dt * 16, -MAX_THROW, MAX_THROW);
        } else {
          c.vx = 0; c.vy = 0;
        }
      }
      if (reduced) { c.vx = 0; c.vy = 0; }
      start();
    }
    el.addEventListener('pointerup', release);
    el.addEventListener('pointercancel', release);

    cubes.push(c);
    return c;
  }

  function place() {
    for (var i = 0; i < COUNT; i++) makeCube(i);
    measure();
    var width = maxX - minX + size;
    cubes.forEach(function (c, i) {
      c.x = clamp(minX + width * 0.42 + i * size * 1.3, minX, maxX);
      c.y = floor;
      c.rot = c.tilt;
    });
    render();
  }

  window.addEventListener('resize', function () { measure(); start(); });

  place();
})();
