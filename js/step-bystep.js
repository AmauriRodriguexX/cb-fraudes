document.addEventListener('DOMContentLoaded', () => {
  // Cambia aquí al paso que quieras ver de entrada
  const initialStepId = 'step-2';

  // 1) Reinicia todos los pasos: quita .active
  document.querySelectorAll('.step-content').forEach(step => {
    step.classList.remove('active');
  });

  // 2) Activa sólo el paso deseado
  const initialStep = document.getElementById(initialStepId);
  if (initialStep) {
    initialStep.classList.add('active');
  }

  // 3) En móvil (<768px), si NO es el step-1, abre el sidenav (push)
  if (window.matchMedia('(max-width: 767px)').matches) {
    if (initialStepId !== 'step-1') {
      document.body.classList.add('side-open');
    } else {
      document.body.classList.remove('side-open');
    }
  }
});