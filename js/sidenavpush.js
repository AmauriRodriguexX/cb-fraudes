document.addEventListener('DOMContentLoaded', () => {
  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  // Avanzar
  document.querySelectorAll('.btn-start-test, .btn-option').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const curr = btn.closest('.step-content');
      const next = document.getElementById(btn.dataset.next);
      if (!next) return;

      curr.classList.remove('active');
      next.classList.add('active');

      if (isMobile) {
        // empuja content y oculta nav/footer
        document.body.classList.add('side-open');
      }
    });
  });

  // Retroceder (cerrar sidenav o ir al paso previo)
  document.querySelectorAll('.btn-back').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const curr = btn.closest('.step-content');
      const prev = document.getElementById(btn.dataset.prev);
      curr.classList.remove('active');
      if (prev) {
        prev.classList.add('active');
      }
      if (isMobile) {
        // si volvemos al STEP 1, quita la clase side-open
        if (btn.dataset.prev === 'step-1') {
          document.body.classList.remove('side-open');
        }
      }
    });
  });
});
