/* --- Theme --- */
var MOON_SVG = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>';
var SUN_SVG = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';

function applyTheme() {
  var isDark = !document.body.classList.contains('light');
  var btn = document.getElementById('theme-btn');
  if (!btn) return;
  var svg = btn.querySelector('svg');
  var label = btn.querySelector('span');
  if (svg) svg.innerHTML = isDark ? MOON_SVG : SUN_SVG;
  if (label) label.textContent = isDark ? 'Світла тема' : 'Темна тема';
}

function toggleTheme() {
  document.body.classList.toggle('light');
  var isLight = document.body.classList.contains('light');
  localStorage.setItem('slides-theme', isLight ? 'light' : 'dark');
  applyTheme();
}

/* --- Navigation --- */
var slides = document.querySelectorAll('.slide');
var progressBar = document.getElementById('progress');
var counter = document.getElementById('counter');
var btnPrev = document.getElementById('btn-prev');
var btnNext = document.getElementById('btn-next');
var current = 0;

/* --- Inter-topic navigation --- */
var nextTopicUrl = null;
var prevTopicUrl = null;

function show(index) {
  if (index < 0 || index >= slides.length) return;
  slides[current].classList.remove('active');
  current = index;
  slides[current].classList.add('active');
  updateControls();
}

function next() {
  if (current < slides.length - 1) {
    show(current + 1);
  } else if (nextTopicUrl) {
    window.location.href = nextTopicUrl;
  }
}

function prev() {
  if (current > 0) {
    show(current - 1);
  } else if (prevTopicUrl) {
    window.location.href = prevTopicUrl;
  }
}

function getLectureId() {
  var params = new URLSearchParams(window.location.search);
  if (params.get('id')) return params.get('id');
  var match = window.location.pathname.match(/slides\/(\d+)\//);
  return match ? match[1] : '1';
}

function getLectureUrl() {
  var id = getLectureId();
  var path = window.location.pathname;
  var isInSubfolder = /slides\/\d+\//.test(path);
  return (isInSubfolder ? '../../' : '') + 'lectures/' + id + '.html';
}

function goHome() {
  window.location.href = getLectureUrl();
}

function updateControls() {
  var percent = ((current + 1) / slides.length) * 100;
  if (progressBar) progressBar.style.width = percent + '%';
  if (counter) counter.textContent = (current + 1) + ' / ' + slides.length;

  if (btnPrev) {
    btnPrev.disabled = current === 0 && !prevTopicUrl;
    btnPrev.title = (current === 0 && prevTopicUrl) ? 'Попередня тема' : '';
  }
  if (btnNext) {
    btnNext.disabled = current === slides.length - 1 && !nextTopicUrl;
    btnNext.title = (current === slides.length - 1 && nextTopicUrl) ? 'Наступна тема' : '';
  }

  fitSlide();
}

/* --- Scale slide content to fit viewport --- */
function fitSlide() {
  var active = slides[current];
  if (!active) return;
  active.style.transform = '';
  var overflow = active.scrollHeight - active.clientHeight;
  if (overflow > 0) {
    var scale = active.clientHeight / active.scrollHeight;
    if (scale < 0.55) scale = 0.55;
    active.style.transform = 'scale(' + scale + ')';
  }
}

/* --- Keyboard --- */
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    next();
  }
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prev();
  }
  if (e.key === 'Escape') {
    goHome();
  }
});

/* --- Detect neighbouring topic files --- */
function initTopicNavigation() {
  var path = window.location.pathname;
  var match = path.match(/\/(\d+)\.html$/);
  if (!match) return;

  var currentTopic = parseInt(match[1]);
  var basePath = path.replace(/\d+\.html$/, '');

  if (currentTopic > 1) {
    var prevPath = basePath + (currentTopic - 1) + '.html';
    fetch(prevPath, { method: 'HEAD' }).then(function (r) {
      if (r.ok) {
        prevTopicUrl = prevPath;
        updateControls();
      }
    }).catch(function () {});
  }

  var nextPath = basePath + (currentTopic + 1) + '.html';
  fetch(nextPath, { method: 'HEAD' }).then(function (r) {
    if (r.ok) {
      nextTopicUrl = nextPath;
      updateControls();
    }
  }).catch(function () {});
}

/* --- Inject top controls --- */
function initTopControls() {
  var url = getLectureUrl();
  var topDiv = document.createElement('div');
  topDiv.className = 'top-controls';
  topDiv.innerHTML =
    '<a href="' + url + '">' +
      '<svg viewBox="0 0 24 24"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>' +
      'До лекції' +
    '</a>' +
    '<button id="theme-btn" onclick="toggleTheme()">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + MOON_SVG + '</svg>' +
      '<span>Світла тема</span>' +
    '</button>';
  document.body.appendChild(topDiv);
}

/* --- Init --- */
(function () {
  if (localStorage.getItem('slides-theme') === 'light') {
    document.body.classList.add('light');
  }
  initTopControls();
  applyTheme();
  updateControls();
  initTopicNavigation();
  window.addEventListener('resize', fitSlide);
})();
