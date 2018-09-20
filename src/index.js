const Calendar = require("./calendar");
const testCases = require("../tests/testCases");
const { calendarEvents3 } = testCases;
const { loadCalendarEvents } = require("../tests/utility");

const calEventsArr = loadCalendarEvents(calendarEvents3)
let cal = new Calendar();
cal.addEvents(calEventsArr);
let overlappingPairs = cal.allOverlapping();
console.log(overlappingPairs);