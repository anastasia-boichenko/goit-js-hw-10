import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElem = document.querySelector('.form');
let delayMs = 0;
let radioValue = '';

formElem.addEventListener('input', () => {
  delayMs = parseInt(formElem.elements.delay.value);
});

formElem.addEventListener('change', () => {
  radioValue = formElem.elements.state.value;
});

formElem.addEventListener('submit', ev => {
  ev.preventDefault();

  const promiseMessage = value => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value === 'fulfilled') {
          iziToast.show({
            title: '✅ OK',
            messageColor: '#fff',
            titleColor: '#fff',
            backgroundColor: '#59a10d',
            message: `Fulfilled promise in ${delayMs}ms`,
          });
          resolve(`Fulfilled promise in ${delayMs}ms`);
        } else {
          iziToast.show({
            title: '❌ ERROR',
            messageColor: '#fff',
            titleColor: '#fff',
            backgroundColor: '#ef4040',
            message: `Rejected promise in ${delayMs}ms`,
          });
          reject(`Rejected promise in ${delayMs}ms`);
        }
      }, delayMs);
    });
  };

  promiseMessage(radioValue)
    .then(value => console.log(value))
    .catch(error => console.log(error));
});
