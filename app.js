// Constants
const ticketPrices = {
    singleTicket: 26,         // Price of a single ticket
    twentyFourHourTicket: 110, // 24-hour ticket price
    thirtyDayTicket: 650,      // 30-day ticket price
    ninetyDayTicket: 1880,     // 90-day ticket price
    oneYearTicket: 6830        // 1-year ticket price
};

const roundTripPrice = 2 * ticketPrices.singleTicket;
const daysPerYear = 365;
const daysPerNinetyDayTicket = 90;
const daysPerThirtyDayTicket = 30;

// Display elements
let display = document.querySelector(".display");
let longTermTicketCost = document.querySelector("#ticket-select");
let userChose = document.querySelector(".user-chose");

// Utility function to calculate round trips per period
const calculateRoundTrips = (ticketPrice, periodInDays) => {
    const totalRoundTrips = ticketPrice / roundTripPrice;
    return totalRoundTrips * (daysPerThirtyDayTicket / periodInDays);
};

// Function to show the user's selection
const showSelect = () => {
    if (!longTermTicketCost.value) {
        return display.innerHTML = "Please choose an option";
    } else {
        userChose.innerHTML = `You chose the ${longTermTicketCost.value}kr ticket`;
        calc();
    }
};

// Calculation and display logic based on user input
const calc = () => {
    const selectedValue = parseInt(longTermTicketCost.value);

    if (!selectedValue) {
        return display.innerHTML = "Please choose an option";
    }

    let result;

    switch (selectedValue) {
        case ticketPrices.twentyFourHourTicket:
            const totalRoundTrips24H = ticketPrices.twentyFourHourTicket / ticketPrices.singleTicket;
            result = ` 
                Calculation for 24-hour ticket: </br>
                - Single ticket price: ${ticketPrices.singleTicket}kr </br>
                - 24-hour ticket price: ${ticketPrices.twentyFourHourTicket}kr </br>
                Formula: 24-hour ticket / single ticket = ${ticketPrices.twentyFourHourTicket} / ${ticketPrices.singleTicket} </br>
                Result: You need ${totalRoundTrips24H.toFixed(2)} trips in 24 hours for the 24-hour ticket to be worth it. 
            `;
            break;
        case ticketPrices.thirtyDayTicket:
            const roundTripsPer30Days = calculateRoundTrips(ticketPrices.thirtyDayTicket, daysPerThirtyDayTicket);
            result = `
                Calculation for 30-day ticket: </br>
                - Single ticket price: ${ticketPrices.singleTicket}kr </br>
                - Single round trip price: ${roundTripPrice}kr </br>
                - 30-day ticket price: ${ticketPrices.thirtyDayTicket}kr </br>
                Formula: 30-day ticket / round trip = ${ticketPrices.thirtyDayTicket} / ${roundTripPrice} </br>
                Result: You need ${roundTripsPer30Days.toFixed(2)} trips per 30 days for the 30-day ticket to be worth it. 
            `;
            break;
        case ticketPrices.ninetyDayTicket:
            const roundTripsPer90Days = calculateRoundTrips(ticketPrices.ninetyDayTicket, daysPerNinetyDayTicket);
            result = `
                Calculation for 90-day ticket: </br>
                - Single ticket price: ${ticketPrices.singleTicket}kr </br>
                - Single round trip price: ${roundTripPrice}kr </br>
                - 90-day ticket price: ${ticketPrices.ninetyDayTicket}kr </br>
                Formula: 90-day ticket / round trip, adjusted for 30 days = (${ticketPrices.ninetyDayTicket} / ${roundTripPrice}) * (30 / 90) </br>
                Result: You need ${roundTripsPer90Days.toFixed(2)} trips per 30 days for the 90-day ticket to be worth it. 
            `;
            break;
        case ticketPrices.oneYearTicket:
            const roundTripsPerYear = calculateRoundTrips(ticketPrices.oneYearTicket, daysPerYear);
            result = `
                Calculation for 1-year ticket: </br>
                - Single ticket price: ${ticketPrices.singleTicket}kr </br>
                - Single round trip price: ${roundTripPrice}kr </br>
                - 1-year ticket price: ${ticketPrices.oneYearTicket}kr </br>
                Formula: 1-year ticket / round trip, adjusted for 30 days = (${ticketPrices.oneYearTicket} / ${roundTripPrice}) * (30 / 365) </br>
                Result: You need ${roundTripsPerYear.toFixed(2)} trips per 30 days for the 1-year ticket to be worth it.
            `;
            break;
        default:
            result = "Please choose a valid option.";
            break;
    }

    display.innerHTML = result;
};

// Event listener for when the DOM content is loaded and ticket selection changes
function listen() {
    window.addEventListener("DOMContentLoaded", () => {
        longTermTicketCost.addEventListener("change", showSelect);
        document.querySelector("#calculate-btn").addEventListener("click", calc);
    });
}

listen();