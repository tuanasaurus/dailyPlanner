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
    dailyPlanner.forEach(function(thisHour){
        $(`#${thisHour.id}`).val(thisHour.reminder);
})
}

function init(){
    console.log("testing Begining");
    const storedDayTask = JSON.parse(localStorage.getItem("dailyPlanner"));

    if(storedDayTask){
        dailyPlanner = storedDayTask;
    }
    saveTask();
    displayTask();
    console.log("testing Ending");
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
        "class": "col-md-2 hour"
    });
    
    const hourTask = $('<div>')
    .attr({
        "class": "col-md-9 description p-0"
    });
    const taskData = $("<textarea>");
    hourTask.append(taskData);
    taskData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")){
        taskData.attr({
            "class": "past",
        })
    } else if (thisHour.time === moment().format("HH")){
        taskData.attr({
            "class": "future"
        })
    }

    // Making the save button 
    const saveButton = $("<button type='button' class='saveBtn'><i class='far fa-save fa-lg'></i></button>");
    hourBlock.append(hour, hourTask, taskData, saveButton);
});

init();
headerDate();

// Local storage event after click 
$(".saveBtn").click(function(event) {
    console.log("saveBtn", event)
    event.preventDefault();
    // const saveIndex = $(this).siblings(".description").children(".future").attr("id");
    // dailyPlanner[saveIndex].task = $(this).siblings(".description").children(".future").val();
    // console.log(saveIndex);
    // saveTask();
    // displayTask();
});

});