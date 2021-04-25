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

const dateButton = document.getElementById("date-button")
const counterButton = document.getElementById("counter-button")
const bothButton = document.getElementById("start-both-button")
let counterStatus = counterButton.dataset.status
let dateStatus = dateButton.dataset.status
let counterInterval 
let dateInterval




/********** Script for the stopwatch that simply pushes numbers using setInterval (the "counter clock") ********************+*/

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
    if(counterStatus=="off"){
        counterInterval = setInterval(counterClock, 10)
        counterStatus= "on"
        return counterInterval
    }
    if (counterStatus =="on"){
        clearInterval(counterInterval)
        counterInterval = false
        counterStatus = "off"
    }
}

counterButton.addEventListener("click", startCounterClock)


/*******************Script for the stopwatch that uses a Date() object to get the elapsed time***********************+*/

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

function dateClock(){
    milliseconds = Date.now() - start.getTime()
    centiseconds= Math.floor((milliseconds%1000)/10)
    seconds= Math.floor((milliseconds/1000)%60)
    minutes= Math.floor((milliseconds/1000)/60)%60
    hours= Math.floor(((milliseconds/1000)/60)/60)
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

}
function stopDateClock(){
    clearInterval(dateInterval)
}
dateButton.addEventListener("click", startDateClock)


function startBoth(){
    startDateClock()
    startCounterClock()
}

bothButton.addEventListener("click", startBoth)



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
    
    


}

function resetDate(){
    disp.forEach(square=>{square.style.color="white"})
    dateMs.textContent = "00"
    dateSec.textContent = "00"
    dateMin.textContent = "00"
    dateHour.textContent = "00"
    start = false
    clearInterval(dateInterval)
    dateInterval= false
    

}

function resetBoth(){
    resetCounter()
    resetDate()
}