import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputEl = document.getElementById('datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const daysTimerEl = document.querySelector('[data-days]');
const hoursTimerEl = document.querySelector('[data-hours]');
const minutesTimerEl = document.querySelector('[data-minutes]');
const secondsTimerEl = document.querySelector('[data-seconds]');

startBtnEl.disabled = true;
let userSelectedDate = null;
let countdownInterval = null;

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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startBtnEl.disabled = true;
      startBtnEl.classList.remove('active-btn');
      inputEl.classList.remove('active-input');
    } else {
      userSelectedDate = selectedDate;
      startBtnEl.disabled = false;
      startBtnEl.classList.add('active-btn');
      inputEl.classList.add('active-input');
    }
  },
};

flatpickr(inputEl, options);
startBtnEl.addEventListener('click', startTimer);

function startTimer() {
  const endTime = userSelectedDate.getTime();

  startBtnEl.disabled = true;
  inputEl.disabled = true;

  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const differenceTime = endTime - currentTime;
    inputEl.classList.add('active-clock');

    if (differenceTime <= 0) {
      clearInterval(countdownInterval);
      updateTimer(0, 0, 0, 0);
      inputEl.disabled = false;
      iziToast.success({
        title: 'Success',
        message: 'Time is up!',
      });
    } else {
      const timeRemaining = convertMs(differenceTime);
      updateTimer(
        timeRemaining.days,
        timeRemaining.hours,
        timeRemaining.minutes,
        timeRemaining.seconds
      );
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer(days, hours, minutes, seconds) {
  daysTimerEl.textContent = addLeadingZero(days);
  hoursTimerEl.textContent = addLeadingZero(hours);
  minutesTimerEl.textContent = addLeadingZero(minutes);
  secondsTimerEl.textContent = addLeadingZero(seconds);
}
