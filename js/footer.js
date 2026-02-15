document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML =
    '<div class="footer-content">' +
      '<div>' +
        'Кафедра твердотільної електроніки та інформаційної безпеки (ТЕІБ)<br>' +
        'Ужгородський національний університет<br>' +
        '<a href="https://teib.info" target="_blank" rel="noopener">teib.info</a>' +
      '</div>' +
      '<div class="footer-right">' +
        '&copy; ' + new Date().getFullYear() + ' Основи етичного хакінгу' +
      '</div>' +
    '</div>';
});
