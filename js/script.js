document.addEventListener('DOMContentLoaded', function () {
  // Solo en desktop
  if (window.matchMedia('(max-width: 767px)').matches) return;

  // Iniciar test → paso 2 inline
  const startBtn = document.querySelector('.btn-start-test');
  if (startBtn) {
    startBtn.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('step-1').classList.add('d-none');
      document.getElementById('step-2').classList.remove('d-none');
    });
  }

  // Botones “Continuar” → siguiente paso inline
  document.querySelectorAll('.btn-option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const nextId = this.getAttribute('data-next');
      this.closest('[id^="step-"]').classList.add('d-none');
      document.getElementById(nextId).classList.remove('d-none');
    });
  });
});
