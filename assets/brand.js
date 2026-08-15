/* Jottem merkgids — progressive enhancement: zonder JS werkt en toont de pagina alles. */
document.documentElement.classList.add('js');

/* kleur kopiëren */
document.querySelectorAll('.swatch').forEach(function (sw) {
    sw.addEventListener('click', function () {
        var hex = sw.dataset.hex;
        var label = sw.querySelector('.kopieer');
        function done() {
            sw.classList.add('gekopieerd');
            label.textContent = hex + ' gekopieerd ✓';
            setTimeout(function () {
                sw.classList.remove('gekopieerd');
                label.textContent = 'klik om te kopiëren';
            }, 1800);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(hex).then(done, done);
        } else { done(); }
    });
});

/* zachte reveal bij scrollen (één keer) */
var reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('zichtbaar'); io.unobserve(e.target); }
        });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
} else {
    reveals.forEach(function (el) { el.classList.add('zichtbaar'); });
}

/* actief hoofdstuk in de navigatie */
var links = document.querySelectorAll('.nav-links a');
var secties = [];
links.forEach(function (a) {
    var doel = document.querySelector(a.getAttribute('href'));
    if (doel) { secties.push({ a: a, el: doel }); }
});
if ('IntersectionObserver' in window && secties.length) {
    var actief = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                links.forEach(function (a) { a.classList.remove('actief'); });
                var s = secties.find(function (s) { return s.el === e.target; });
                if (s) { s.a.classList.add('actief'); }
            }
        });
    }, { rootMargin: '-30% 0px -60% 0px' });
    secties.forEach(function (s) { actief.observe(s.el); });
}
