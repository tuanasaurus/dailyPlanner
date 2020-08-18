$(document).ready(function() {
// Creating the current date and Time with the string and format from moment.js codumenation
let dateTime = moment();
dateTime = moment().format('MMMM Do YYYY | h:mm a');
$("#currentDay").text(dateTime);

// Creating the daily planner array for the first hours
let dailyPlanner = [
    {
        id: "0",
        hour: "08",
        time: "08",
        meridiem: "AM",
        task: ""
    },
    {
        id: "1",
        hour: "09",
        time: "09",
        meridiem: "AM",
        task: ""
    },
    {
        id: "2",
        hour: "10",
        time: "10",
        meridiem: "AM",
        task: ""
    },
    {
        id: "3",
        hour: "11",
        time: "11",
        meridiem: "AM",
        task: ""
    },
    {
        id: "4",
        hour: "12",
        time: "12",
        meridiem: "PM",
        task: ""
    },
    {
        id: "5",
        hour: "01",
        time: "13",
        meridiem: "PM",
        task: ""
    },
    {
        id: "6",
        hour: "02",
        time: "14",
        meridiem: "PM",
        task: ""
    },
    {
        id: "7",
        hour: "03",
        time: "15",
        meridiem: "PM",
        task: ""
    },
    {
        id: "8",
        hour: "04",
        time: "16",
        meridiem: "PM",
        task: ""
    },
    {
        id: "9",
        hour: "05",
        time: "17",
        meridiem: "PM",
        task: ""
    },
]

//Getting data from the header date
function headerDate(){
    const currentHD = moment().format("dddd, MMMM Do")
    $("#currentDay").text(currentHD);
}


//creating the local storage to save the daily tasks
function saveTask(){
    localStorage.setItem("dailyPlanner", JSON.stringify(dailyPlanner));
}

//Displaying the task in local storage to the page
function displayTask (){
    dailyPlanner = JSON.parse(localStorage.getItem("dailyPlanner"));
    dailyPlanner.forEach(function(thisHour){
        $(`#${thisHour.id}`).val(thisHour.task);
    })
}

//Creating a clone of the dailyPlanner for the reset button 
//Init the diaplay of the planner by grabbing the content in local storage
function init(){
    localStorage.setItem("blankDailyPlanner", JSON.stringify(dailyPlanner));
    let storedDayTask = localStorage.getItem('dailyPlanner');
    storedDayTask = storedDayTask ? JSON.parse(storedDayTask) : dailyPlanner;
    dailyPlanner = storedDayTask;
    saveTask();
    displayTask();
}

//creating the the daily planner 
dailyPlanner.forEach(function(thisHour){
    const hourBlock = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourBlock);

    const hour = $("<div>")
    .text(`${thisHour.hour}${thisHour.meridiem}`)
    .attr({
        "class": "col hour col-sm-2",
    });
    
    const hourTask = $("<div>")
    .attr({
        "class": "description",
    });

    const taskData = $("<textarea>")
    .attr({
        "class": "col col-sm-8",
    });

    hourTask.append(taskData);
    taskData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")){
        taskData.attr({
            "class": "past col col-sm-8",
        })
    } else if (thisHour.time === moment().format("HH")){
        taskData.attr({
            "class": "future col col-sm-8",
        })
    }

    // Making the save button 
    const saveButton = $("<button type='button' class='saveBtn col col-sm-2'><i class='far fa-save fa-lg'></i></button>");
    hourBlock.append(hour, hourTask, taskData, saveButton,);
});

init();
headerDate();

$(".saveBtn").click(function(event) {
    event.preventDefault();
    const saveIndex = $(this).siblings("textarea").attr("id");
    dailyPlanner[saveIndex].task = $(this).siblings("textarea").val();
    saveTask();
    displayTask();
});

// Local storage event after click 
$(".clearBtn").click(function(event) {
    event.preventDefault();
    const blankDailyPlanner = localStorage.getItem("blankDailyPlanner");
    localStorage.setItem("dailyPlanner", blankDailyPlanner);
    displayTask();
});

});