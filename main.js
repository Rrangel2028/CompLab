/* ============ TOGGLE PASSWORD (login + registro, múltiples campos) ============ */
(function () {
  // Devuelve el input a controlar para un botón .toggle-pass
  function resolveInput(btn) {
    const id = btn.dataset.target?.trim();
    let input = id ? document.getElementById(id) : null;
    // Fallback: toma el primer input dentro del mismo .input_wrap
    if (!input) {
      input = btn.closest('.input_wrap')?.querySelector('input[type="password"], input[type="text"]');
    }
    return input || null;
  }

  function setIcons(btn, show) {
    // show=true => la contraseña se VE => icono ojo ABIERTO visible
    const eye = btn.querySelector('.icon-eye');
    const slash = btn.querySelector('.icon-eye-slash');
    btn.classList.toggle('active', show);

    if (eye) {
      eye.style.opacity = show ? 1 : 0;
      eye.style.transform = show ? 'scale(1)' : 'scale(0.8)';
    }
    if (slash) {
      slash.style.opacity = show ? 0 : 1;
      slash.style.transform = show ? 'scale(0.8)' : 'scale(1)';
    }
    btn.setAttribute('aria-pressed', String(show));
    btn.setAttribute('aria-label', show ? 'Ocultar contraseña' : 'Mostrar contraseña');
  }

  document.querySelectorAll('.toggle-pass').forEach((btn) => {
    const input = resolveInput(btn);
    if (!input) return;

    // Estado inicial según el tipo actual del input
    setIcons(btn, input.type === 'text');

    btn.addEventListener('click', (e) => {
      e.preventDefault(); // evita submit accidental
      const showing = input.type === 'password'; // si está oculto, la vamos a mostrar
      input.type = showing ? 'text' : 'password';
      setIcons(btn, showing);
    });
  });
})();

/* ============ VALIDACIÓN REGISTRO (si existe el formulario) ============ */
(function () {
  const form = document.getElementById('registerForm');
  if (!form) return;

  const pass = document.getElementById('password');
  const confirm = document.getElementById('confirm');
  const matchHint = document.getElementById('matchHint');

  function checkMatch() {
    if (!pass || !confirm || !matchHint) return;
    if (!confirm.value) { matchHint.textContent = ''; return; }
    if (pass.value === confirm.value) {
      matchHint.textContent = '✔ Las contraseñas coinciden';
      matchHint.style.color = 'var(--focus, #2563eb)';
    } else {
      matchHint.textContent = '✖ Las contraseñas no coinciden';
      matchHint.style.color = 'tomato';
    }
  }

  pass?.addEventListener('input', checkMatch);
  confirm?.addEventListener('input', checkMatch);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (pass && confirm && pass.value !== confirm.value) {
      confirm.setCustomValidity('Las contraseñas no coinciden');
      form.reportValidity();
      confirm.setCustomValidity('');
      return;
    }

    // Demo de éxito
    alert('¡Cuenta creada con éxito! (demo)');
    // window.location.href = 'index.html';
  });
})();
