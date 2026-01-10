import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
 
const form = document.querySelector('.form'); //знаходимо форму

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Зупиняємо перезавантаження

  const delay = Number(form.elements.delay.value); //значення в інпуті
  const state = form.elements.state.value; 

  console.log(delay, state); // Перевіряємо, чи отримали ми дані

  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`, 
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: "topRight",
      });
    });
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
}
