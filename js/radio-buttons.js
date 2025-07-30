document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', handler, true);

  function handler(e) {
    // 1) Selección de opción (solo si no está deshabilitada)
    const opt = e.target.closest('.option-btn');
    if (opt && !opt.disabled && opt.closest('.step-content')) {
      const step   = opt.closest('.step-content');
      const opts   = step.querySelectorAll('.option-btn');
      const btn    = step.querySelector('.btn-continue');
      const okMsg  = step.querySelector('.feedback-success');
      const errMsg = step.querySelector('.feedback-error');

      // Reset de indicadores y estados
      opts.forEach(o => {
        o.classList.remove('selected','validated','error');
        o.disabled = false;
        const ri = o.querySelector('.radio-indicator');
        ri.innerHTML = '<span class="radio-circle"></span>';
      });
      okMsg.style.display  = 'none';
      errMsg.style.display = 'none';

      // Marcar esta opción y habilitar botón
      opt.classList.add('selected');
      btn.classList.remove('disabled');
      btn.removeAttribute('aria-disabled');

      e.stopImmediatePropagation();
      return;
    }

    // 2) Pulsar “Siguiente”
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
    const btn = e.target.closest('.btn-continue:not(.ready-next):not(.retry)');
    if (btn && btn.closest('.step-content')) {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (btn.classList.contains('disabled')) return;

      const step   = btn.closest('.step-content');
      const opts   = step.querySelectorAll('.option-btn');
      const okMsg  = step.querySelector('.feedback-success');
      const errMsg = step.querySelector('.feedback-error');

      // Estilizar todas las opciones según correctness y deshabilitarlas
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

      // Mostrar feedback y preparar botón
      const selected = step.querySelector('.option-btn.selected');
      if (selected.dataset.correct === 'true') {
        errMsg.style.display = 'none';
        okMsg.style.display  = 'block';
        btn.textContent      = 'Siguiente';
        btn.classList.add('ready-next');
      } else {
        okMsg.style.display  = 'none';
        errMsg.style.display = 'block';
        btn.textContent      = 'Reintentar';
        btn.classList.add('retry');
      }
      return;
    }

    // 4) Pulsar “Reintentar”
    const retryBtn = e.target.closest('.btn-continue.retry');
    if (retryBtn && retryBtn.closest('.step-content')) {
      e.preventDefault();
      e.stopImmediatePropagation();

      const step  = retryBtn.closest('.step-content');
      const opts  = step.querySelectorAll('.option-btn');
      const okMsg = step.querySelector('.feedback-success');
      const errMsg= step.querySelector('.feedback-error');
      const btnEl = retryBtn;
      const group = step.querySelector('.options-group');

      // Reset total de opciones y reactivar
      opts.forEach(o => {
        o.classList.remove('selected','validated','error');
        o.disabled = false;
        const ri = o.querySelector('.radio-indicator');
        ri.innerHTML = '<span class="radio-circle"></span>';
      });
      okMsg.style.display  = 'none';
      errMsg.style.display = 'none';

      // Barajar wrappers para conservar col-12 col-md-6
      const wrappers = Array.from(
        step.querySelectorAll('.options-group > div[class^="col-"]')
      );
      shuffle(wrappers).forEach(w => group.appendChild(w));

      // Reset del botón
      btnEl.textContent     = 'Continuar';
      btnEl.classList.remove('retry','ready-next');
      btnEl.classList.add('disabled');
      btnEl.setAttribute('aria-disabled','true');
      return;
    }
  }

  // Función Fisher–Yates para barajar
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
});
