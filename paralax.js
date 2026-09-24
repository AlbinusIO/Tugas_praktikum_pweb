// Efek parallax hero: scroll + gerakan mouse.
// data-speed = kecepatan mengikuti scroll (0 = diam, makin besar makin "tertinggal").
// data-mouse = jarak geser maksimum (px) mengikuti kursor.
(function () {
  const hero = document.getElementById('home');
  if (!hero) return;

  // Kalau OS mematikan animasi (reduced motion): scroll tetap jalan setengah kekuatan, mouse dimatikan.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SCROLL_POWER = reduced ? 0.5 : 1;
  const MOUSE_POWER  = reduced ? 0 : 1;

  const layers = Array.from(hero.querySelectorAll('[data-speed]')).map(function (el) {
    return {
      el: el,
      speed: parseFloat(el.dataset.speed) || 0,
      mouse: parseFloat(el.dataset.mouse) || 0
    };
  });

  let mx = 0, my = 0;   // posisi kursor sekarang (-0.5 .. 0.5)
  let tx = 0, ty = 0;   // target
  let ticking = false;

  function render() {
    ticking = false;
    const y = Math.min(window.scrollY, hero.offsetHeight) * SCROLL_POWER;

    mx += (tx - mx) * 0.08;   // easing biar halus
    my += (ty - my) * 0.08;

    layers.forEach(function (l) {
      l.el.style.setProperty('--px', (mx * l.mouse * MOUSE_POWER).toFixed(1) + 'px');
      l.el.style.setProperty('--py', (y * l.speed + my * l.mouse * MOUSE_POWER).toFixed(1) + 'px');
    });

    if (Math.abs(tx - mx) > 0.001 || Math.abs(ty - my) > 0.001) request();
  }

  function request() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(render);
    }
  }

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);

  // gerakan mouse hanya di perangkat yang punya kursor
  if (MOUSE_POWER && window.matchMedia('(hover: hover)').matches) {
    hero.addEventListener('mousemove', function (e) {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      request();
    });
    hero.addEventListener('mouseleave', function () {
      tx = 0; ty = 0;
      request();
    });
  }

  request();
})();