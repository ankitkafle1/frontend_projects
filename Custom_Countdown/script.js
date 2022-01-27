const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timElemetns = document.querySelectorAll('span')

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('comeplete-button')


let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today)


const updateDOM = () => {
    countdownActive = setInterval(()=>{
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day)
        const hours =  Math.floor((distance % day) / hour)
        const minutes = Math.floor((distance % hour) / minute)
        const seconds = Math.floor((distance % minute) / second)
    
        
        // Hide Input
        inputContainer.hidden = true;

        if(distance < 0){
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        }
        else{
            // Populate Countdown
            countdownElTitle.textContent = `${countdownTitle}`
            timElemetns[0].textContent = `${days}`;
            timElemetns[1].textContent = `${hours}`;
            timElemetns[2].textContent = `${minutes}`;
            timElemetns[3].textContent = `${seconds}`;
            completeEl.hidden = true
            countdownEl.hidden = false;
        }
       
    }, second);
}

// Take Values from Form Input
const updateCountDown = (e) => {
    e.preventDefault()
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title:countdownTitle,
        date:countdownDate,
    }

    localStorage.setItem('countdown', JSON.stringify(savedCountdown))
    // Get Number version of Current Date
    countdownValue = new Date(countdownDate).getTime();
    
    // Check valid date
    if(countdownDate === ''){
        alert('Please Select a date for countdown')
    }
    else{
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    } 
}

// Reset All Values
const reset = () => {
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countdownActive)
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown')
}

const restore = () => {
    // Get the countdown from local storage
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listeners
countdownForm.addEventListener('submit',updateCountDown)
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset)

// On Load check local storage 
restore()
