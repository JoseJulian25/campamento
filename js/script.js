import { validate } from './validation.js';
import { submitData } from './firebase-service.js';
import { showError, showSuccess, setSubmitting } from './notifications.js';


const form = document.getElementById('inscripcion-form');

  const submitBtn = form.querySelector('button[type="submit"]');
  // Manejador principal: envío del formulario (lógica de mayor importancia)
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const values = {
      nombre: (formData.get('nombre') || '').toString().trim(),
      edad: (formData.get('edad') || '').toString().trim(),
      genero: (formData.get('genero') || '').toString().trim(),
      iglesia: (formData.get('iglesia') || '').toString().trim(),
      ciudad: (formData.get('ciudad') || '').toString().trim(),
      telefono: (formData.get('telefono') || '').toString().trim(),
      comentarios: (formData.get('comentarios') || '').toString().trim(),
      acepto: !!formData.get('acepto')
    };

    // Limpiar errores de campos previos
    clearFieldErrors(form);

    const errors = validate(values);
    if (errors && Object.keys(errors).length > 0) {
      // Mostrar errores inline en los campos
      showFieldErrors(form, errors);
      return;
    }

    // Desactivar botón de enviar mientras se procesa la solicitud
    setSubmitting(submitBtn, true);

    try {
      const payload = Object.assign({}, values);
      delete payload.acepto;
      await submitData(payload);
      showSuccess('Inscripción enviada correctamente. ¡Gracias!');
      form.reset();
    } catch (err) {
      console.error('Error sending data:', err);
      showError('Ocurrió un error al enviar la inscripción. Intenta de nuevo más tarde.');
    } finally {
      setSubmitting(submitBtn, false);
    }
  });


  // Función auxiliar: eliminar mensajes de error existentes y clases inválidas
  function clearFieldErrors(formEl) {
    const prev = formEl.querySelectorAll('.field-error');
    prev.forEach(p => p.remove());
    const invalids = formEl.querySelectorAll('.invalid-field');
    invalids.forEach(i => i.classList.remove('invalid-field'));
  }

  // Función auxiliar: mostrar errores de campo debajo de los inputs
  function showFieldErrors(formEl, errors) {
    Object.keys(errors).forEach(field => {
      const input = formEl.querySelector(`[name="${field}"]`);
      const message = errors[field];
      if (input) {
        input.classList.add('invalid-field');
        // crear elemento de error
        const err = document.createElement('div');
        err.className = 'field-error';
        err.textContent = message;
        // colocar después del .form-group para que quede debajo de la fila
        const formGroup = input.closest('.form-group');
        if (formGroup) {
          formGroup.appendChild(err);
        } else {
          // alternativa: colocar después del contenedor del input (.input-btn) si existe
          const container = input.closest('.input-btn') || input.parentElement;
          if (container) container.appendChild(err);
          else input.parentElement.appendChild(err);
        }
      } else if (field === 'acepto') {
        // error en checkbox: colocar después del contenedor del checkbox
        const checkbox = formEl.querySelector('#acepto');
        if (checkbox) {
          checkbox.classList.add('invalid-field');
          const container = checkbox.closest('.checkbox') || checkbox.parentElement;
          const err = document.createElement('div');
          err.className = 'field-error';
          err.textContent = message;
          if (container) container.appendChild(err);
        }
      }
    });
  }

