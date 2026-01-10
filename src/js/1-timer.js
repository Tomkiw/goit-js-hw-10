import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

startBtn.disabled = true;// Деактивація кнопки
let userSelectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    if (selectedDate < now) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight'
      });
      startBtn.disabled = true;
    } else {
      //якщо дата валідна
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
};

flatpickr(input, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0'); //додаємо 0 на початок якщо в нас менше двох символів
}

//Додаємо слухача подій на кнопку Старт
startBtn.addEventListener('click', () => {
  //block imput aand button
  startBtn.disabled = true;
  input.disabled = true;

  const updateTimer = () => {
    const now = new Date();
    const deltaTime = userSelectedDate - now; // Рірзниця в мілісекундах

    // Якщо час вийшов - зупиняємо таймер
    if (deltaTime <= 0) {
      clearInterval(timerId);
      updateTimerInterface({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      input.disabled = false; // Повертаємо доступ до вибору дати
      return;
    }

    const timerComponents = convertMs(deltaTime); // Перетворюємо мілісекунди в об'єкт (дні години ітд) за допомогою  function convertMs
    updateTimerInterface(timerComponents); // оновлюємо інтерфейс
  };

  updateTimer(); // Запускаємо функцію один раз одразу, щоб не чекати 1 секунду
  timerId = setInterval(updateTimer, 1000);
});

function updateTimerInterface({days, hours, minutes, seconds}) {
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent =addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}