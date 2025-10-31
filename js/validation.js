
export function validate(values) {

  const errors = {};

  if (!values.nombre || values.nombre.length < 3) {
    errors.nombre = 'Escribe un nombre válido (mín 3 caracteres).';
  }

  const edadNum = Number(values.edad);
  if (!Number.isInteger(edadNum) || edadNum < 6 || edadNum > 120) {
    errors.edad = 'Ingresa una edad válida (6-120).';
  }

  if (!values.genero) {
    errors.genero = 'Selecciona un género.';
  }

  if (!values.iglesia || values.iglesia.length < 2) {
    errors.iglesia = 'Escribe el nombre de tu iglesia.';
  }

  if (!values.ciudad || values.ciudad.length < 2) {
    errors.ciudad = 'Escribe tu ciudad.';
  }

  const phone = (values.telefono || '').replace(/\s+/g, '');
  const phoneRegex = /^\+?\d{7,15}$/;
  if (!phoneRegex.test(phone)) {
    errors.telefono = 'Ingresa un número de teléfono válido (solo dígitos, opcional +).';
  }

  if (!values.acepto) {
    errors.acepto = 'Debes aceptar participar y cumplir con las normas del campamento.';
  }

  return errors;
}
