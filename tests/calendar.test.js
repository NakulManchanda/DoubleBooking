const { describe, it } = require("mocha");
const chai = require("chai"),
  expect = chai.expect,
  should = chai.should();

const { randomEvent } = require("./utility");
const Event = require("../src/event");
const Calendar = require("../src/calendar");
const testCases = require("./testCases");
const { calendarEvents1 } = testCases;

const calEventsArr1 = (function() {
  let evtArr = [];
  for (let i = 0; i < calendarEvents1.length; i++) {
    let slot = calendarEvents1[i];
    evtArr.push(new Event(new Date(slot.startTime), new Date(slot.endTime)));
  }
  return evtArr;
})();

describe("test all calendar related operations", function() {
  it("calendar constructor", function() {
    let cal = new Calendar();
    cal.should.have.property("events");
    expect(cal.events.length).to.be.equal(0);
  });

  it("add single event", function() {
    let cal = new Calendar();
    cal.addEvent(calEventsArr1[0]);
    expect(cal.events.length).to.be.equal(1);
    expect(cal.events[0]).to.be.deep.equal(calEventsArr1[0]);
  });

  it("add multiple events at once", function() {
    let cal = new Calendar();
    cal.addEvents(calEventsArr1);
    let evts = cal.events;
    expect(evts.length).to.be.equal(calEventsArr1.length);
    expect(cal.events).to.be.deep.equal(calEventsArr1);
  });

  it("add multiple along with existing events", function() {
    let cal = new Calendar();
    cal.addEvent(calEventsArr1[0]);
    expect(cal.events.length).to.be.equal(1);
    expect(cal.events[0]).to.be.deep.equal(calEventsArr1[0]);
    cal.addEvents(calEventsArr1);

    let allEvents = [cal.events[0]];
    allEvents = [...allEvents, ...calEventsArr1];
    expect(cal.events.length).to.be.equal(allEvents.length);
    expect(cal.events).to.be.deep.equal(allEvents);
  });

  describe("overlapping events", function() {
    it("add single event and check overlap ", function() {
      let cal = new Calendar();
      cal.addEvent(calEventsArr1[0]);
      let overlapping = cal.allOverlapping();
      expect(overlapping.length).to.be.equal(0);
    });

    it("add same event twice ", function() {
      let cal = new Calendar();
      cal.addEvent(calEventsArr1[0]);
      cal.addEvent(calEventsArr1[0]);
      let overlappingPairs = cal.allOverlapping();
      expect(overlappingPairs.length).to.be.equal(1);
    });

    it("add multiple events at once", function() {
      let cal = new Calendar();
      cal.addEvents(calEventsArr1);
      let overlappingPairs = cal.allOverlapping();
    });
  });
});
