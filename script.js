//Elements containing number values in setInterval() Timer
let counterMs = document.getElementById("counter-ms")
let counterSec = document.getElementById("counter-sec")
let counterMin = document.getElementById("counter-min")
let counterHour = document.getElementById("counter-hour")


//Elements containing number values in Date() Timer 
let dateMs = document.getElementById("date-ms")
let dateSec = document.getElementById("date-sec")
let dateMin = document.getElementById("date-min")
let dateHour = document.getElementById("date-hour")

let disp = [counterMs, counterSec, counterMin, counterHour, dateMs, dateSec, dateMin, dateHour]

//number values for date() timer
let msValue = parseInt(dateMs.textContent)
let secValue = parseInt(dateSec.textContent)
let minValue = parseInt(dateMin.textContent)
let hourValue = parseInt(dateHour.textContent)


//variables to hold setInterval() functions for each timer. 
let counterInterval 
let dateInterval 
let flashInterval

//Start button variables
const startButton = document.getElementById("start-both-button")
let buttonStatus = startButton.dataset.status //used to determine if timers are stopped, started, or paused. 







/*________Code for the simple timer that pushes numbers using setInterval() ________*/

function counterClock(){
    /*  Function for pushing the counter information to the first stopwatch. 
        Increments ms by 1 on timer and will increment secs, mins, 
        and hour if limit of prev value is reached*/
    let ms = parseInt(counterMs.textContent)
    let sec = parseInt(counterSec.textContent)
    let min = parseInt(counterMin.textContent)
    let hour = parseInt(counterHour.textContent)

    if(ms==99&&sec==59&&min==59){
        counterMs.textContent = "00"
        counterSec.textContent = "00"
        counterMin.textContent = "00"
        if(hour<9)counterHour.textContent = `0${hour + 1}`  //adds 0 to front of numbers <10
        else{ counterHour.textContent = hour+1}
        
    }else if(ms==99&&sec==59){
        counterMs.textContent = "00"
        counterSec.textContent = "00"
        if(min<9)counterMin.textContent = `0${min + 1}` 
        else{counterMin.textContent=min+1}
    }else if (ms==99){
        counterMs.textContent = "00"
        if (sec<9)counterSec.textContent = `0${sec + 1}`
        else{counterSec.textContent = sec+1}
    }else{
        if (ms<9)counterMs.textContent = `0${ms + 1}`
        else{counterMs.textContent =ms+1}
    }
}

function startCounterClock(){
    /*Uses a setInterval() or clearInterval() function to start and stop setInterval() timer */
    if(buttonStatus=="off"||buttonStatus=="paused"){
        counterInterval = setInterval(counterClock, 10) //every ten ms
        return counterInterval
    }
    if (buttonStatus =="on"){
        clearInterval(counterInterval)
        counterInterval = false   
    }
}



/*_________This section contains code for the that uses a Date() object to get the elapsed time_____________*/

/* 
-to get total centiseconds: we need to get up to and including the hundredths place, so milliseconds%1000 will give us that. 
    then Math.floor(centiseconds/10) to cut off the ones place. 

-to get total seconds: Math.floor(milliseconds/1000)
-to get the seconds after minutes: Math.floor(milliseconds/1000)%60 (gives us the remainder after dividing by 60. 
    if we had 78500 milliseconds, for instance, that would be 78 seconds. In a stopwatch, this should be 1 minute (60 seconds) 
    and 18 seconds (78-60)) Using modulo on 78 gives us 18 (78%60 = 18)

-to get total minutes, we take milliseconds and divide by 1000 to get total seconds again. Then, if we divide that by 60, 
    the front number after the decimal will be the total minutes. We isolate this number by using Math.floor: 
    Math.floor((milliseconds/1000)/60)
    Then, we need to make sure that the maximum number is 59, so we use modulo again: 
    Math.floor((milliseconds/1000)/60)%60

*/


let start 
let milliseconds 
let centiseconds
let seconds 
let minutes 
let hours 

let pausedMilliseconds = 0 //this is to keep track of milliseconds passed during a pause. 
let pauseStart  //keeps track of when pause was initiated


function checkAccuracy(){
    /*_____Changing colors of the counter clock to illustrate inaccuracies______ */
    if(dateSec.textContent != counterSec.textContent){
        counterSec.style.color = "red"
    }
    if (dateSec.textContent == counterSec.textContent){
        counterSec.style.color = "white"
    }
    if (dateMs.textContent!= counterMs.textContent){
        counterMs.style.color= "red"
    }
    if (dateMs.textContent==counterMs.textContent){
        counterMs.style.color="white"
    }
}

function dateClock(){
    milliseconds = Date.now() - start.getTime() - pausedMilliseconds
    centiseconds= Math.floor((milliseconds%1000)/10)
    seconds= Math.floor((milliseconds/1000)%60)
    minutes= Math.floor((milliseconds/1000)/60)%60
    hours= Math.floor(((milliseconds/1000)/60)/60)

    /*____Conditionals to add 0 to front of number if less than 10__________ */
    if(centiseconds<10)dateMs.textContent = `0${centiseconds}` 
    else dateMs.textContent= centiseconds

    if(seconds<10) dateSec.textContent = `0${seconds}` 
    else dateSec.textContent = seconds

    if(minutes<10) dateMin.textContent =`0${minutes}`
    else dateMin.textContent =minutes

    if (hours<10) dateHour.textContent = `0${hours}`
    else dateHour.textContent = hours
    
    checkAccuracy()
}

function startDateClock(){
    start = new Date
    dateInterval = setInterval(dateClock, 0) //will update as often as possible 
}

function pauseDateClock(){
    if (buttonStatus== "on"){
        pauseStart = new Date()
        clearInterval(dateInterval)
        dateInterval = false
        
    }else if(buttonStatus == "paused"){
        dateStatus = "on"
        pausedMilliseconds += Date.now() - pauseStart.getTime()
        dateInterval = setInterval(dateClock, 0)
    }
}


function dateClockController(){
    /* ______Will chose whether to start or pause the clock____________ */
    if (buttonStatus=="off"){
        startDateClock()
    }
    else if (buttonStatus=="on" || buttonStatus=="paused"){
        pauseDateClock()
    }
}


/* _____Functions for start and reset buttons___________ */

function startBoth(){
    // starts or pauses both timer functions
    dateClockController()
    startCounterClock()
    checkAccuracy() 

    //changes the color and text content of button, changes button status, uses setInterval() for a
    // flash function when paused. 
    if(buttonStatus=="off"|| buttonStatus=="paused"){
        startButton.style.backgroundColor = "rgb(58, 160, 255)" //blue
        startButton.textContent= "Pause"
        buttonStatus="on"
        clearInterval(flashInterval)  //stops flashing colors
        flashInterval=false
    }else if(buttonStatus=="on"){
        startButton.style.backgroundColor = "rgb(20, 224, 82)" //green
        startButton.textContent="Start"
        buttonStatus="paused"
        flashInterval = setInterval(flashPauseButton, 500) //changes color every .5 secs when paused
    }

}

startButton.addEventListener("click", startBoth)


/*______________function for flashing pause button colors________________-*/


function flashPauseButton(){
    if(startButton.style.backgroundColor=="rgb(20, 224, 82)"){ //green
        startButton.style.backgroundColor="rgb(58, 160, 255)" //blue
    }else if (startButton.style.backgroundColor=="rgb(58, 160, 255)"){ //blue
        startButton.style.backgroundColor="rgb(20, 224, 82)"//green
    }
}


/*_______________________Reset ___________________________ */

const resetButton = document.getElementById("reset-both-button")


function resetCounter(){
    clearInterval(counterInterval)
    counterInterval = false
  }

function resetDate(){
    start = false
    clearInterval(dateInterval)
    dateInterval= false
    pausedMilliseconds = 0
}

function resetBoth(){
    resetCounter()
    resetDate()
    disp.forEach(element=>{
        element.style.color="white"
        element.textContent = "00"
    })
    startButton.textContent="Start"
    startButton.style.backgroundColor ="rgb(20, 224, 82)" //green
    buttonStatus = "off"
    clearInterval(flashInterval)
}

resetButton.addEventListener("click", resetBoth)

/* _________Test script for throwing off setInterval() timer________ */
let counter = 0
function throwOff(){
    for(let i=0; i<5000000; i++){
        counter+=i
    }
}
document.getElementById("test-button").addEventListener("click", throwOff)


/*_____Tabs______*/
let tabs = document.querySelectorAll("[data-tab-target]")

function deactivateTabs(){
    tabs.forEach(tab=>{
        let target = document.querySelector(tab.dataset.tabTarget)
        target.dataset.status = "inactive"
        tab.dataset.status= "inactive"
        tab.firstElementChild.dataset.status = "inactive"
    })

}

tabs.forEach(tab=>{
    
    tab.addEventListener("click", e=>{
        if(e.target.classList.contains("tabs")){
            deactivateTabs()
        e.target.dataset.status = "active"
        tab.firstElementChild.dataset.status = "active"
        document.querySelector(e.target.dataset.tabTarget).dataset.status = "active"
        }if(e.target.parentNode.classList.contains("tabs")){
            deactivateTabs()
            e.target.dataset.status="active"
            e.target.parentNode.dataset.status = "active"
            document.querySelector(e.target.parentNode.dataset.tabTarget).dataset.status = "active"
        }
    
    
    })
})