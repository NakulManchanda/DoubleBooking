const { describe, it } = require("mocha");
const chai = require("chai"),
  expect = chai.expect,
  should = chai.should();

const chaiExclude = require("chai-exclude");
chai.use(chaiExclude);

const Event = require("../src/event");
const Calendar = require("../src/calendar");

const { loadCalendarEvents } = require("./utility");
const testCases = require("./testCases");
const { calendarEvents1, calendarEvents2 } = testCases;

const calEventsArr1 = loadCalendarEvents(calendarEvents1);

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
    expect(cal.events[0])
      .excluding("uuid")
      .to.be.deep.equal(calEventsArr1[0]);
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
    expect(cal.events[0])
      .excluding("uuid")
      .to.be.deep.equal(calEventsArr1[0]);
    cal.addEvents(calEventsArr1);

    let allEvents = [cal.events[0]];
    allEvents = [...allEvents, ...calEventsArr1];
    expect(cal.events.length).to.be.equal(allEvents.length);
    expect(cal.events)
      .excludingEvery("uuid")
      .to.be.deep.equal(allEvents);
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
      expect(overlappingPairs.length).to.be.equal(3);
    });

    it("cal events - no overlap 2", function() {
      let cal = new Calendar();
      const calEventsArr2 = loadCalendarEvents(calendarEvents2);
      cal.addEvents(calEventsArr2);
      let overlappingPairs = cal.allOverlapping();
      expect(overlappingPairs.length).to.be.equal(0);
    });

    it("cal events - no overlap 3", function() {
      let cal = new Calendar();
      const calEventsArr3 = loadCalendarEvents(testCases.calendarEvents3);
      cal.addEvents(calEventsArr3);
      let overlappingPairs = cal.allOverlapping();
      expect(overlappingPairs.length).to.be.equal(9);
    });
  });
});
