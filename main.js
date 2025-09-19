/* =========================================================
   CompLab - Registro: Toggle de contraseña + Validación match
   IDs esperados por el HTML actual:
   - form:            #registro-form
   - password:        #password
   - confirm:         #confirmPassword
   - mensaje hint:    #msg-pass
   ========================================================= */

   document.addEventListener("DOMContentLoaded", () => {
    /* ========== TOGGLE PASSWORD (múltiples campos) ========== */
    const toggleButtons = document.querySelectorAll(".toggle-pass");
  
    function resolveInput(btn) {
      // Si el botón trae data-target, lo respeta
      const id = btn.dataset.target?.trim();
      let input = id ? document.getElementById(id) : null;
      // Si no, busca el input dentro del mismo .input_wrap
      if (!input) {
        input = btn.closest(".input_wrap")?.querySelector('input[type="password"], input[type="text"]');
      }
      return input || null;
    }
  
    function setIcons(btn, show) {
      // show=true => contraseña visible => icono ojo abierto visible
      const eye = btn.querySelector(".icon-eye");
      const slash = btn.querySelector(".icon-eye-slash");
      btn.classList.toggle("active", show);
      if (eye) { eye.style.opacity = show ? 1 : 0; eye.style.transform = show ? "scale(1)" : "scale(0.9)"; }
      if (slash) { slash.style.opacity = show ? 0 : 1; slash.style.transform = show ? "scale(0.9)" : "scale(1)"; }
      btn.setAttribute("aria-pressed", String(show));
      btn.setAttribute("aria-label", show ? "Ocultar contraseña" : "Mostrar contraseña");
    }
  
    toggleButtons.forEach((btn) => {
      const input = resolveInput(btn);
      if (!input) return;
      // Estado inicial
      setIcons(btn, input.type === "text");
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const showing = input.type === "password";
        input.type = showing ? "text" : "password";
        setIcons(btn, showing);
      });
    });
  
    /* ========== VALIDACIÓN DE COINCIDENCIA ========== */
    const form    = document.getElementById("registro-form");
    const pass    = document.getElementById("password");
    const confirm = document.getElementById("confirmPassword");
    const hint    = document.getElementById("msg-pass");
  
    if (!form || !pass || !confirm || !hint) return;
  
    // Accesibilidad del mensaje
    hint.setAttribute("role", "status");
    hint.setAttribute("aria-live", "polite");
  
    const clearState = () => {
      hint.textContent = "";
      hint.removeAttribute("data-state");
      pass.classList.remove("is-valid", "is-invalid");
      confirm.classList.remove("is-valid", "is-invalid");
    };
  
    const setState = (ok) => {
      // Aplica estilos a los inputs
      pass.classList.toggle("is-valid", ok);
      confirm.classList.toggle("is-valid", ok);
      pass.classList.toggle("is-invalid", !ok && confirm.value.length > 0);
      confirm.classList.toggle("is-invalid", !ok && confirm.value.length > 0);
  
      if (!confirm.value) { clearState(); return; }
  
      if (ok) {
        hint.textContent = "✔ Las contraseñas coinciden";
        hint.dataset.state = "ok";    // para CSS (verde)
      } else {
        hint.textContent = "✖ Las contraseñas no coinciden";
        hint.dataset.state = "error"; // para CSS (rojo)
      }
    };
  
    const check = () => {
      if (!pass.value && !confirm.value) return clearState();
      setState(pass.value === confirm.value);
    };
  
    pass.addEventListener("input", check);
    confirm.addEventListener("input", check);
    pass.addEventListener("blur", check);
    confirm.addEventListener("blur", check);
  
    // Bloquea envío si no coinciden
    form.addEventListener("submit", (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        return;
      }
      if (pass.value !== confirm.value) {
        e.preventDefault();
        confirm.setCustomValidity("Las contraseñas no coinciden");
        form.reportValidity();
        confirm.setCustomValidity("");
        setState(false);
        confirm.focus();
        return;
      }
      // TODO: Aquí tu submit real (fetch/axios/Firebase)
      // e.g., form.submit() o lógica asíncrona
    });
  });
  