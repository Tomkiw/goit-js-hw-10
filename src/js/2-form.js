const formData = {
  email: '',
  message: '',
};
const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const emailEl = form.querySelector('[name="email"]');
const messageEl = form.querySelector('[name="message"]');
// Значення з local Storage
let dataLocalStorage = null;
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  dataLocalStorage = saved ? JSON.parse(saved) : null;
} catch (err) {
  console.warn('Cannot parse saved form data:', err);
  dataLocalStorage = null;
}
if (dataLocalStorage !== null) {
  emailEl.value = dataLocalStorage.email;
  messageEl.value = dataLocalStorage.message;
  formData.email = dataLocalStorage.email;
  formData.message = dataLocalStorage.message;
}
form.addEventListener('input', onForInput);
form.addEventListener('submit', onForSubmit);
// Прибираємо пробіли на початку і вкінці за допомогою trim();
function onForInput() {
  formData.email = emailEl.value.trim();
  formData.message = messageEl.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
function onForSubmit(event) {
  event.preventDefault();
  //перевіряємо поля на заповнення
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return; //якщо буде не заповнена вся форма, тоді поверне для продовження введення
  }
  console.log('FORM_DATA:', formData);
  //Видаляємо дані з локального сховища
  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  form.reset();
}
