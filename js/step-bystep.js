document.addEventListener("DOMContentLoaded", () => {
     const initialStepId = 'step-13-final'; // ← cámbialo al ID que quieras mostrar
     document.querySelectorAll(".step-content").forEach(step => step.classList.add("d-none"));
     const initialStep = document.getElementById(initialStepId);
     if (initialStep) initialStep.classList.remove("d-none");
   });