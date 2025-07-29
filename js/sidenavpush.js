document.addEventListener('DOMContentLoaded', function () {
  // Solo en mobile
  if (!window.matchMedia('(max-width: 767px)').matches) return;

  const sidenav = document.getElementById('mobileSidenav');
  const mainContent = document.getElementById('main-content');
  const startBtn = document.querySelector('.btn-start-test');

  // Comenzar test → abre step-2-mobile
  if (startBtn) {
    startBtn.addEventListener('click', function (e) {
      e.preventDefault();
      openMobileStep('step-2-mobile');
    });
  }

  // Botones “Continuar” → siguiente paso móvil
  document.querySelectorAll('.btn-option').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openMobileStep(this.getAttribute('data-next'));
    });
  });

  function openMobileStep(stepId) {
    sidenav.classList.add('open');
    document.body.classList.add('side-open');
    mainContent.classList.add('mobile-pushed');

    // Oculta el intro y todos los pasos
    document.getElementById('step-1').classList.add('d-none');
    document.querySelectorAll('.sidenav-inner').forEach(el => {
      el.classList.add('d-none');
      el.classList.remove('active');
    });

    // Muestra solo el paso solicitado
    const target = document.getElementById(stepId);
    if (target) {
      target.classList.remove('d-none');
      target.classList.add('active');
    }
  }
});
