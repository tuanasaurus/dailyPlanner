$(document).ready(function() {
// Creating the current date and Time with the string and format from moment.js codumenation
let dateTime = moment();
dateTime = moment().format('MMMM Do YYYY | h:mm a');
$("#currentDay").text(dateTime);

// Creating the daily planner array for the first hours
const dailyPlanner = [
    {
        id: "0",
        hour: "08",
        time: "08",
        task: ""
    },
    {
        id: "1",
        hour: "09",
        time: "09",
        task: ""
    },
    {
        id: "2",
        hour: "10",
        time: "10",
        task: ""
    },
    {
        id: "3",
        hour: "11",
        time: "11",
        task: ""
    },
    {
        id: "4",
        hour: "12",
        time: "12",
        task: ""
    },
    {
        id: "5",
        hour: "01",
        time: "13",
        task: ""
    },
    {
        id: "6",
        hour: "02",
        time: "14",
        task: ""
    },
    {
        id: "7",
        hour: "03",
        time: "15",
        task: ""
    },
    {
        id: "8",
        hour: "04",
        time: "16",
        task: ""
    },
    {
        id: "9",
        hour: "05",
        time: "17",
        task: ""
    },
]


// let hour24 = moment().format("MMMM Do YYYY");
// const time = parseInt(moment().format("HH"));


//Gettign data from the header date
function headerDate(){
    const currentHD = moment().format("MMMM Do YYYY")
    $("#currentDay").text(currentHD);
}


//creating the local storage to save the daily tasks
function saveTask(){
    localStorage.setItem("dailyPlanner", JSON.stringify(dailyPlanner));
}

//Displaying the task in local storage to the page
function displayTask (){
    dailyPlanner.forEach(function(thisHour){
        $(`#${thisHour.id}`).val(thisHour.reminder);
})
}

function init(){
    const storedDayTask = JSON.parse(localStorage.getItem(dailyPlanner));

    if(storedDayTask){
        dailyPlanner = storedDayTask;
    }
    saveTask();
    displayTask();
}

headerDate();
console.log(headerDate);

//

});