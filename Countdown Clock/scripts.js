let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]')

function timer(seconds){
  //Clear Existing timer
  clearInterval(countdown);

  const now = Date.now();
  //Now is in milliseconds while seconds is in seconnds. Reason for multiplying
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown =  setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if(secondsLeft < 0){
      clearInterval(countdown);
    }
    displayTimeLeft(secondsLeft)
  }, 1000)
}

function displayTimeLeft(seconds){
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const displayTime = `${minutes}: ${remainderSeconds < 10 ? '0' : ''}${remainderSeconds} `;
  timerDisplay.textContent = displayTime;
  document.title = displayTime
  console.log({minutes, remainderSeconds});
}

function displayEndTime(timestamp){
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? 0 : ''}${minutes}`;
}

function startTime(){
  console.log(this.dataset.time);
  const seconds = parseInt(this.dataset.time);
  timer(seconds)
  console.log(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTime));
document.customForm.addEventListener('submit', function(e){
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins)
  timer(mins * 60);
  this.reset();
})
