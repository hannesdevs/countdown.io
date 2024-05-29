// script.js
const greetingElement = document.getElementById('greeting');
const nameInput = document.getElementById('nameInput');
const countdownSetupElement = document.getElementById('countdown-setup');
const userNameElement = document.getElementById('userName');
const countdownTitleInput = document.getElementById('countdownTitle');
const countdownDateInput = document.getElementById('countdownDate');
const countdownTimeInput = document.getElementById('countdownTime');
const startCountdownButton = document.getElementById('startCountdown');
const countdownElement = document.getElementById('countdown');
const countdownHeadingElement = document.getElementById('countdownHeading');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const resetCountdownButton = document.getElementById('resetCountdown');
const daysCountdownElement = document.getElementById('days-countdown');
const hoursCountdownElement = document.getElementById('hours-countdown');
const minutesCountdownElement = document.getElementById('minutes-countdown');
const secondsCountdownElement = document.getElementById('seconds-countdown');
let countdownInterval;

nameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const userName = nameInput.value.trim();
        if (userName) {
            greetingElement.classList.add('hidden');
            countdownSetupElement.classList.remove('hidden');
            userNameElement.textContent = userName;
        } else {
            nameInput.value = '';
        }
    }
});

logo.addEventListener('click', resetToGreeting);

function resetToGreeting() {
  clearInterval(countdownInterval);
  greetingElement.classList.remove('hidden');
  countdownSetupElement.classList.add('hidden');
  countdownElement.classList.add('hidden');
  nameInput.value = '';
  countdownTitleInput.value = '';
  countdownDateInput.value = '';
  countdownTimeInput.value = '';
}

startCountdownButton.addEventListener('click', () => {
    const countdownTitle = countdownTitleInput.value.trim();
    const countdownDate = new Date(`${countdownDateInput.value}T${countdownTimeInput.value}`);

    if (countdownTitle && countdownDate) {
        countdownSetupElement.classList.add('hidden');
        countdownElement.classList.remove('hidden');
        countdownHeadingElement.textContent = countdownTitle;
        clearInterval(countdownInterval);

        const countdownTime = new Date(countdownDate.getTime()); // Create a new Date object with the same time
        countdownInterval = setInterval(() => updateCountdown(countdownTime), 1000);
        updateCountdown(countdownTime);
    }
});

resetCountdownButton.addEventListener('click', () => {
    clearInterval(countdownInterval);
    countdownElement.classList.add('hidden');
    countdownSetupElement.classList.remove('hidden');
    countdownTitleInput.value = '';
    countdownDateInput.value = '';
    countdownTimeInput.value = '';
});

function updateCountdown(countdownTime) {
    const currentTime = new Date();
    const timeDifference = countdownTime.getTime() - currentTime.getTime();

    if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        // Add logic for when countdown ends
        return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    if (daysElement) daysElement.textContent = days;
    if (hoursElement) hoursElement.textContent = hours;
    if (minutesElement) minutesElement.textContent = minutes;
    if (secondsElement) secondsElement.textContent = seconds;

    daysCountdownElement.style.setProperty('--value', String(days));
    hoursCountdownElement.style.setProperty('--value', String(hours));
    minutesCountdownElement.style.setProperty('--value', String(minutes));
    secondsCountdownElement.style.setProperty('--value', String(seconds));
}

const themeController = document.querySelector('.theme-controller');

themeController.addEventListener('change', (event) => {
    const theme = event.target.checked ? 'dark' : 'light';
    document.body.setAttribute('data-theme', theme);
  });

// Load the previously saved theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeController.checked = savedTheme === 'dark';
}
