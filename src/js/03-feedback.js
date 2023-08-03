import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');

const LOCALSTORAGE_KEY = 'feedback-form-state';

let currentState = {};

form.addEventListener(
  'input',
  throttle(e => {
    const objectToSave = (currentState[e.target.name] = e.target.value.trim());
    localStorage.setItem(
      LOCALSTORAGE_KEY,
      JSON.stringify({ [e.target.name]: objectToSave })
    );
  }, 500)
);

form.addEventListener('submit', e => {
  e.preventDefault();
  console.log(currentState);
  e.target.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
});

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const storageData = load(LOCALSTORAGE_KEY);
if (storageData) {
  Object.entries(currentState).forEach(([key, val]) => {
    form.elements[key].value = val;
  });
}
