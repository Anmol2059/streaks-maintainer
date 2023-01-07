// This is the JavaScript code for the calendar

// Get a reference to the calendar container
const calendar = document.getElementById("calendar");

// Get a reference to the calendar heading
const calendarHeading = document.getElementById("calendar-heading");

// Get a reference to the calendar dates container
const calendarDates = document.getElementById("calendar-dates");

// Get a reference to the Previous button
const previousButton = document.getElementById("previous-button");

// Get a reference to the Next button
const nextButton = document.getElementById("next-button");

// Set the initial month and year to the current month and year
let month = new Date().getMonth();
let year = new Date().getFullYear();

// Function to render the calendar for the current month and year
function renderCalendar() {
    // Clear the calendar dates container
    calendarDates.innerHTML = "";

    // Set the calendar heading to show the current month and year
    calendarHeading.innerText = `${month + 1}/${year}`;

    // Get the number of days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create an array of dates for the current month
    const dates = [];
    for (let i = 1; i <= daysInMonth; i++) {
        dates.push(new Date(year, month, i));
    }

    // Create an HTML element for each calendar date
    dates.forEach(date => {
        const calendarDate = document.createElement("div");
        calendarDate.classList.add("calendar-date");
        calendarDate.innerText = date.getDate();
        calendarDates.appendChild(calendarDate);

        // Check if the current date has been clicked and should be highlighted with a fire emoji background
        const clickedDates = JSON.parse(localStorage.getItem("clickedDates")) || {};
        if (clickedDates[`${month}/${date.getDate()}/${year}`]) {
            calendarDate.classList.add("fire");
        }
    });
}

// Add an event listener to the calendar container to handle clicks on calendar dates
calendar.addEventListener("click", event => {
    // Check if the clicked element is a calendar date
    if (event.target.classList.contains("calendar-date")) {
        // If it is, toggle the "fire" class to add or remove the fire emoji background
        event.target.classList.toggle("fire");

        // Get the object of clicked dates from local storage
        let clickedDates = JSON.parse(localStorage.getItem("clickedDates")) || {};

        // Check if the clicked date is currently highlighted
        if (event.target.classList.contains("fire")) {
            // If it is, add the clicked date to the object of clicked dates
            clickedDates[`${month}/${event.target.innerText}/${year}`] = true;
        } else {
            // If it is not, remove the clicked date from the object of clicked dates
            // If it is not, remove the clicked date from the object of clicked dates
            delete clickedDates[`${month}/${event.target.innerText}/${year}`];
        }

        // Save the object of clicked dates to local storage
        localStorage.setItem("clickedDates", JSON.stringify(clickedDates));
    }
});

// Add an event listener to the Previous button to handle clicks
previousButton.addEventListener("click", event => {
    // Decrement the month by 1
    month--;

    // If the month is negative, set it to 11 (December) and decrement the year by 1
    if (month < 0) {
        month = 11;
        year--;
    }

    // Render the calendar for the new month and year
    renderCalendar();
});

// Add an event listener to the Next button to handle clicks
nextButton.addEventListener("click", event => {
    // Increment the month by 1
    month++;

    // If the month is 12 (December), set it to 0 (January) and increment the year by 1
    if (month > 11) {
        month = 0;
        year++;
    }

    // Render the calendar for the new month and year
    renderCalendar();
});

// Render the calendar for the initial month and year
renderCalendar();
