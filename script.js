/* We want to have two primary functions, 
1. uses the setInterval() function to manually count the ms, seconds, mins, hours 
2. uses Date() to provide the data that will be shown in each number column of the stopwatch
3. */

let counterMs = document.getElementById("counter-ms")
let counterSec = document.getElementById("counter-sec")
let counterMin = document.getElementById("counter-min")
let counterHour = document.getElementById("counter-hour")

let dateMs = document.getElementById("date-ms")
let dateSec = document.getElementById("date-sec")
let dateMin = document.getElementById("date-min")
let dateHour = document.getElementById("date-hour")

const dateButton = document.getElementById("date-button")
const counterButton = document.getElementById("counter-button")
let counterStatus = counterButton.dataset.status
let dateStatus = dateButton.dataset.status
let counterOn 
let dateOn


/*Function for pushing the counter information to the first stopwatch*/



function counterClock(){
    let ms = parseInt(counterMs.textContent)
    let sec = parseInt(counterSec.textContent)
    let min = parseInt(counterMin.textContent)
    let hour = parseInt(counterHour.textContent)

    if(ms==9&&sec==59&&min==59){
        counterMs.textContent = 0
        counterSec.textContent = 0
        counterMin.textContent = 0
        counterHour.textContent = hour + 1
    }else if(ms==9&&sec==59){
        counterMs.textContent = 0
        counterSec.textContent = 0
        counterMin.textContent = min + 1
    }else if (ms==9){
        counterMs.textContent = 0
        counterSec.textContent = sec + 1
    }else{
        counterMs.textContent = ms + 1
    }

    
}

function startCounterClock(){
    if(counterStatus=="off"){
        counterOn = setInterval(counterClock, 100)
        counterStatus= "on"
        return counterOn
        
    }
    if (counterStatus =="on"){
        clearInterval(counterOn)
        counterStatus = "off"
        
        
    }
    
}