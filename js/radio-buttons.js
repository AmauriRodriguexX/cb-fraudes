document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', handler, true);

  function handler(e) {
    // 1) Selección de opción
    const opt = e.target.closest('.option-btn');
    if (opt && !opt.disabled && opt.closest('.step-content')) {
      const step   = opt.closest('.step-content');
      const opts   = step.querySelectorAll('.option-btn');
      const btn    = step.querySelector('.btn-continue');
      const okMsg  = step.querySelector('.feedback-success');
      const errMsg = step.querySelector('.feedback-error');

      // Reset de estados
      opts.forEach(o => {
        o.classList.remove('selected','validated','error');
        o.disabled = false;
        o.querySelector('.radio-indicator').innerHTML = '<span class="radio-circle"></span>';
      });
      okMsg.style.display  = 'none';
      errMsg.style.display = 'none';

      // Marcar seleccionado y habilitar Continuar
      opt.classList.add('selected');
      btn.classList.remove('disabled');
      btn.removeAttribute('aria-disabled');
      e.stopImmediatePropagation();
      return;
    }

    // 2) Pulsar “Siguiente” ya validado
    const nextBtn = e.target.closest('.btn-continue.ready-next');
    if (nextBtn && nextBtn.closest('.step-content')) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const curr = nextBtn.closest('.step-content');
      curr.classList.remove('active');
      document.getElementById(nextBtn.dataset.next).classList.add('active');
      return;
    }

    // 3) Validación al pulsar “Continuar”
    const btn = e.target.closest('.btn-continue:not(.ready-next)');
    if (btn && btn.closest('.step-content')) {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (btn.classList.contains('disabled')) return;

      const step   = btn.closest('.step-content');
      const opts   = step.querySelectorAll('.option-btn');
      const okMsg  = step.querySelector('.feedback-success');
      const errMsg = step.querySelector('.feedback-error');

      // Mostrar icono de check/x y bloquear todas las opciones
      opts.forEach(o => {
        const indicator = o.querySelector('.radio-indicator');
        if (o.dataset.correct === 'true') {
          o.classList.add('validated');
          indicator.innerHTML =
            '<img src="assets/resources/correcto.png" alt="Correcto" width="20" height="20">';
        } else {
          o.classList.add('error');
          indicator.innerHTML =
            '<img src="assets/resources/falso.png" alt="Incorrecto" width="20" height="20">';
        }
        o.disabled = true;
      });

      // Mostrar feedback correspondiente
      const selected = step.querySelector('.option-btn.selected');
      if (selected.dataset.correct === 'true') {
        errMsg.style.display = 'none';
        okMsg.style.display  = 'block';
      } else {
        okMsg.style.display  = 'none';
        errMsg.style.display = 'block';
      }

      // Convertir botón a “Siguiente”
      btn.textContent      = 'Siguiente';
      btn.classList.add('ready-next');

      // Clonar para limpiar :hover
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      return;
    }
  }
});
