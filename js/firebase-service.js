// firebase-service.js
import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js';

export async function submitData(data) {
  if (!db) throw new Error('Ha ocurrido un error. Intenta de nuevo más tarde.');
  const payload = Object.assign({}, data, { createdAt: serverTimestamp() });
  return addDoc(collection(db, 'inscripciones'), payload);
}
