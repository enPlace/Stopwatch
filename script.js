/* We want to have two primary functions, 
1. uses the setInterval() function to manually count the ms, seconds, mins, hours 
2. uses Date() to provide the data that will be shown in each number column of the stopwatch
*/

let counterMs = document.getElementById("counter-ms")
let counterSec = document.getElementById("counter-sec")
let counterMin = document.getElementById("counter-min")
let counterHour = document.getElementById("counter-hour")

let dateMs = document.getElementById("date-ms")
let dateSec = document.getElementById("date-sec")
let dateMin = document.getElementById("date-min")
let dateHour = document.getElementById("date-hour")

let disp = [counterMs, counterSec, counterMin, counterHour, dateMs, dateSec, dateMin, dateHour]

let msValue = parseInt(dateMs.textContent)
let secValue = parseInt(dateSec.textContent)
let minValue = parseInt(dateMin.textContent)
let hourValue = parseInt(dateHour.textContent)

const dateButton = document.getElementById("date-start-button")
const counterButton = document.getElementById("counter-start-button")
const bothButton = document.getElementById("start-both-button")
let counterStatus = counterButton.dataset.status
let dateStatus = dateButton.dataset.status
let bothStatus= bothButton.dataset.status
let counterInterval 
let dateInterval 

let flashBothInterval
let flashDateInterval
let flashCounterInterval






/*_______________Script for the stopwatch that simply pushes numbers using setInterval (the "counter clock") _________________*/

function counterClock(){
    /*  Function for pushing the counter information to the first stopwatch. 
        Increments ms by 1 on stopwatch1 and will increment secs, mins, and hour if limit of prev value is reached*/
    let ms = parseInt(counterMs.textContent)
    let sec = parseInt(counterSec.textContent)
    let min = parseInt(counterMin.textContent)
    let hour = parseInt(counterHour.textContent)

    if(ms==99&&sec==59&&min==59){
        counterMs.textContent = "00"
        counterSec.textContent = "00"
        counterMin.textContent = "00"
        if(hour<9)counterHour.textContent = `0${hour + 1}`
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
    /*Uses a setInterval() or clearInterval() function to start and stop "stopwatch1" */
    if(counterStatus=="off"||counterStatus=="paused"){
        clearInterval(flashCounterInterval)
        flashCounterInterval=false
        counterInterval = setInterval(counterClock, 10)
        counterStatus= "on"
        counterButton.style.backgroundColor = "rgb(58, 160, 255)"
        counterButton.textContent = "Pause"


        return counterInterval
    }
    if (counterStatus =="on"){
        clearInterval(counterInterval)
        counterInterval = false
        flashCounterInterval = setInterval(flashCounterPauseButton, 500)
        counterStatus = "paused"
        counterButton.textContent = "Start"
        
    }
}

counterButton.addEventListener("click", startCounterClock)


/*_________________Script for the stopwatch that uses a Date() object to get the elapsed time____________________/

/* 
--to get total centiseconds: we need to get up to and including the hundredths place, so milliseconds%1000 will give us that. 
    then Math.floor(centiseconds/10) to cut off the ones place. 

--to get total seconds: Math.floor(milliseconds/1000)
--to get the seconds after minutes: Math.floor(milliseconds/1000)%60 (gives us the remainder after dividing by 60. 
    if we had 78500 milliseconds, for instance, that would be 78 seconds. In a stopwatch, this should be 1 minute (60 seconds) 
    and 18 seconds (78-60)) Using modulo on 78 gives us 18 (78%60 = 18)

--to get total minutes, we take milliseconds and divide by 1000 to get total seconds again. Then, if we divide that by 60, 
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

let pausedMilliseconds =0 //this is to keep track of milliseconds passed during a pause. 
let pauseStart  //keeps track of when pause was initiated




function dateClock(){
    milliseconds = Date.now() - start.getTime() - pausedMilliseconds
    centiseconds= Math.floor((milliseconds%1000)/10)
    seconds= Math.floor((milliseconds/1000)%60)
    minutes= Math.floor((milliseconds/1000)/60)%60
    hours= Math.floor(((milliseconds/1000)/60)/60)

    /*____Need onditionals to add 0 to front of number if less than 10__________ */
    if(centiseconds<10)dateMs.textContent = `0${centiseconds}` 
    else dateMs.textContent= centiseconds

    if(seconds<10) dateSec.textContent = `0${seconds}` 
    else dateSec.textContent = seconds

    if(minutes<10) dateMin.textContent =`0${minutes}`
    else dateMin.textContent =minutes

    if (hours<10) dateHour.textContent = `0${hours}`
    else dateHour.textContent = hours
    
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

function startDateClock(){
    start = new Date
    dateInterval = setInterval(dateClock, 0)
    dateStatus = "on"
    dateButton.textContent = "Pause"
    dateButton.style.backgroundColor="rgb(58, 160, 255)"

}
function pauseDateClock(){
    if (dateStatus== "on"){
        flashDateInterval =setInterval(flashDatePauseButton, 500)
        dateStatus = "paused"
        pauseStart = new Date()
        clearInterval(dateInterval)
        dateInterval = false
        dateButton.textContent = "Start"
        
    }else if(dateStatus == "paused"){
        clearInterval(flashDateInterval)
        dateStatus = "on"
        pausedMilliseconds += Date.now() - pauseStart.getTime()
        dateInterval = setInterval(dateClock, 0)
        dateButton.style.backgroundColor="rgb(58, 160, 255)"
        dateButton.textContent = "Pause"
        
       
    
    }
}


function dateClockController(){
    /* ______Will chose whether to start or pause the clock____________ */
    if (dateStatus=="off"){
        startDateClock()
        
    }
    else if (dateStatus=="on" || dateStatus=="paused"){
        pauseDateClock()
    }
}

dateButton.addEventListener("click", dateClockController)


function startBoth(){
    dateClockController()
    startCounterClock()
    if(bothStatus=="off"|| bothStatus=="paused"){
        bothButton.style.backgroundColor = "rgb(58, 160, 255)"
        bothButton.textContent= "Pause"
        bothStatus="on"
        clearInterval(flashBothInterval)
        flashAllInterval=false
    }else if(bothStatus=="on"){
        //bothButton.style.backgroundColor = "rgb(74, 243, 116)"
        bothButton.textContent="Start"
        bothStatus="paused"
        flashBothInterval = setInterval(flashBothPauseButton, 500)
    }

}

bothButton.addEventListener("click", startBoth)


/*______________function for flashing pause button colors________________-*/

function flashDatePauseButton(){
    if(dateButton.style.backgroundColor=="rgb(58, 160, 255)"){
        dateButton.style.backgroundColor="rgb(74, 243, 116)"
    }else if (dateButton.style.backgroundColor=="rgb(74, 243, 116)"){
        dateButton.style.backgroundColor="rgb(58, 160, 255)"
    }
}

function flashCounterPauseButton(){
    if(counterButton.style.backgroundColor=="rgb(58, 160, 255)"){
        counterButton.style.backgroundColor="rgb(74, 243, 116)"
    }else if (counterButton.style.backgroundColor=="rgb(74, 243, 116)"){
        counterButton.style.backgroundColor="rgb(58, 160, 255)"
    }
}

function flashBothPauseButton(){
    if(bothButton.style.backgroundColor=="rgb(58, 160, 255)"){
        bothButton.style.backgroundColor="rgb(74, 243, 116)"
    }else if (bothButton.style.backgroundColor=="rgb(74, 243, 116)"){
        bothButton.style.backgroundColor="rgb(58, 160, 255)"
    }
}


/*_______________________Reset buttons___________________________________ */

const counterResetButton = document.getElementById("counter-reset")
const dateResetButton = document.getElementById("date-reset")
const bothResetButton = document.getElementById("reset-both-button")

counterResetButton.addEventListener("click", resetCounter)
dateResetButton.addEventListener("click", resetDate)
bothResetButton.addEventListener("click", resetBoth)

function resetCounter(){
    disp.forEach(square=>{square.style.color="white"})
    counterMs.textContent= "00"
    counterSec.textContent= "00"
    counterMin.textContent= "00"
    counterHour.textContent= "00"
    clearInterval(counterInterval)
    counterInterval = false
    counterStatus = "off"
    clearInterval(flashCounterInterval)
    flashCounterInterval=false
    counterButton.style.backgroundColor = "rgb(74, 243, 116)"
    counterButton.textContent ="Start"
  }

function resetDate(){
    disp.forEach(square=>{square.style.color="white"})
    dateMs.textContent = "00"
    dateSec.textContent = "00"
    dateMin.textContent = "00"
    dateHour.textContent = "00"
    start = false
    clearInterval(dateInterval)
    clearInterval(flashDateInterval)
    dateInterval= false
    pausedMilliseconds = 0
    dateStatus = "off"
    dateButton.style.backgroundColor= "rgb(74, 243, 116)"
    dateButton.textContent="Start"
}

function resetBoth(){
    resetCounter()
    resetDate()
    bothButton.textContent="Start"
    bothButton.style.backgroundColor ="rgb(74, 243, 116)"
    bothStatus = "off"
    clearInterval(flashBothInterval)

}

/* _________Test script for throwing off counter clock__________________ */
let counter = 0
function throwOff(){
    
    for(let i=0; i<5000000; i++){
        counter+=i
    }
}

document.getElementById("test-button").addEventListener("click", throwOff)