import Swal from 'sweetalert2';

// notifications.js - user-friendly alerts using SweetAlert2
export function showError(message) {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    confirmButtonText: 'Aceptar'
  });
}

export function showSuccess(message) {
  Swal.fire({
    icon: 'success',
    title: 'Listo',
    text: message,
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: 'top-end'
  });
}

export function setSubmitting(button, isSubmitting) {
  if (!button) return;
  button.disabled = !!isSubmitting;
  if (isSubmitting) {
    // Save original content to restore later
    if (!button.dataset.origHtml) button.dataset.origHtml = button.innerHTML;
    button.innerHTML = 'Enviando...';
  } else {
    if (button.dataset.origHtml) {
      button.innerHTML = button.dataset.origHtml;
      delete button.dataset.origHtml;
    }
  }
}
