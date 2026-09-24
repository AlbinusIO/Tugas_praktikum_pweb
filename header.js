const menuBtn = document.getElementById('menuBtn');
const navbar = document.getElementById('navbar');
const overlay = document.getElementById('overlay');
const links = document.querySelectorAll('.nav_link');

function setMenu(open) {
  navbar.classList.toggle('open', open);
  menuBtn.classList.toggle('open', open);
  overlay.classList.toggle('open', open);
  document.body.classList.toggle('no-scroll', open);
  menuBtn.setAttribute('aria-expanded', open);
}

menuBtn.addEventListener('click', function () {
  setMenu(!navbar.classList.contains('open'));
});

overlay.addEventListener('click', function () {
  setMenu(false);
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') setMenu(false);
});

links.forEach(function (link) {
  link.addEventListener('click', function () {
    links.forEach(function (l) { l.classList.remove('active'); });
    link.classList.add('active');
    setMenu(false);
  });
});