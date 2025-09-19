// ===== Slideshow simple =====
(function () {
    const wrap = document.querySelector('.slideshow');
    if (!wrap) return;
    const slides = Array.from(wrap.querySelectorAll('img'));
    if (!slides.length) return;
    let i = 0;
    slides.forEach(s => s.classList.remove('is-active'));
    slides[0].classList.add('is-active');
    setInterval(() => {
      slides[i].classList.remove('is-active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-active');
    }, 4000);
  })();
  
  // ===== Medidor de fuerza de contraseña =====
  (function(){
    const pass = document.getElementById('password');
    const bar  = document.querySelector('.pass-meter__bar');
    if (!pass || !bar) return;
  
    function strength(pwd){
      let score = 0;
      if (pwd.length >= 8) score++;
      if (/[A-Z]/.test(pwd)) score++;
      if (/[0-9]/.test(pwd)) score++;
      if (/[^A-Za-z0-9]/.test(pwd)) score++;
      return score; // 0..4
    }
    function paint(score){
      const widths = ['0%','25%','50%','75%','100%'];
      const colors = ['#ef4444','#f59e0b','#f59e0b','#22c55e','#22c55e'];
      bar.style.width = widths[score];
      bar.style.background = colors[score];
    }
    pass.addEventListener('input', e => paint(strength(e.target.value)));
    paint(0);
  })();
  