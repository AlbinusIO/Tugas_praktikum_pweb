const menuBtn = document.getElementById('menuBtn');
const navbar  = document.getElementById('navbar');
const overlay = document.getElementById('overlay');
const links   = document.querySelectorAll('.nav_link');

function setMenu(open) {
  navbar.classList.toggle('open', open);
  menuBtn.classList.toggle('open', open);
  overlay.classList.toggle('open', open);
  document.body.classList.toggle('no-scroll', open);   // cegah halaman ikut scroll
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
}

menuBtn.addEventListener('click', function () {
  const sedangTerbuka = navbar.classList.contains('open');
  setMenu(!sedangTerbuka);
});

overlay.addEventListener('click', function () {
  setMenu(false);
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    setMenu(false);
  }
});

links.forEach(function (link) {
  link.addEventListener('click', function () {
    links.forEach(function (l) { l.classList.remove('active'); });
    link.classList.add('active');
    setMenu(false);
  });
});

const sections = [];
links.forEach(function (link) {
  const target = document.querySelector(link.getAttribute('href'));
  if (target) sections.push(target);
});


const pengawas = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;

    links.forEach(function (link) {
      const cocok = link.getAttribute('href') === '#' + entry.target.id;
      link.classList.toggle('active', cocok);
    });
  });
}, {
  rootMargin: '-40% 0px -55% 0px'   
});

sections.forEach(function (section) {
  pengawas.observe(section);
});

window.addEventListener('resize', function () {
  if (window.innerWidth >= 768) {
    setMenu(false);
  }
});