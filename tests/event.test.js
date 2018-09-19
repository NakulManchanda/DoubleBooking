const { describe, it } = require("mocha");
const chai = require("chai"),
  expect = chai.expect,
  should = chai.should();

const { randomEvent } = require("./utility");
const Event = require("../src/event");
const testCases = require("./testCases");
const { overlappingPairs, nonOverlappingPairs } = testCases;

describe("test all event related operations", function() {
  it("event constructor", function() {
    let rndEvt = randomEvent();
    let evt = new Event(rndEvt.startTime, rndEvt.endTime);
    evt.should.have.property("startTime");
    evt.should.have.property("endTime");
    let { startTime, endTime } = evt;
    startTime.should.equal(rndEvt.startTime);
    endTime.should.equal(rndEvt.endTime);
  });

  describe("event overlap", function() {
    it("events overlap 1 - using random", function() {
      let rndEvt = randomEvent();
      let rndOverlapEvent = randomEvent(rndEvt);

      let evt1 = new Event(rndEvt.startTime, rndEvt.endTime);
      let evt2 = new Event(rndOverlapEvent.startTime, rndOverlapEvent.endTime);

      expect(evt1.isOverlapping(evt2)).to.be.true;
    });

    it("events overlap 2 - manual", function() {
      let slot1 = {
        startTime: new Date("12/30/2017"),
        endTime: new Date("01/05/2018")
      };
      let slot2 = {
        startTime: new Date("01/02/2018"),
        endTime: new Date("02/05/2018")
      };

      let evt1 = new Event(slot1.startTime, slot1.endTime);
      let evt2 = new Event(slot2.startTime, slot2.endTime);

      expect(evt1.isOverlapping(evt2)).to.be.true;
    });

    it("events overlap 3 - from test cases", function() {
      for (let i = 0; i < overlappingPairs.length; i++) {
        let eventPair = [];
        for (let j = 0; j < 2; j++) {
          let slot = overlappingPairs[i][j];
          let evt = new Event(new Date(slot.startTime), new Date(slot.endTime));
          eventPair.push(evt);
        }
        if (!eventPair[0].isOverlapping(eventPair[1])) {
          console.log(eventPair);
        }
        expect(eventPair[0].isOverlapping(eventPair[1])).to.be.true;
      }
    });

    it("events dont overlap 1", function() {
      let rndEvt = randomEvent();
      while (rndEvt.sIndex === 0) {
        rndEvt = randomEvent();
      }
      let rndNonOverlapEvent = randomEvent(rndEvt, "before");

      let evt1 = new Event(rndEvt.startTime, rndEvt.endTime);
      let evt2 = new Event(
        rndNonOverlapEvent.startTime,
        rndNonOverlapEvent.endTime
      );

      expect(evt1.isOverlapping(evt2)).to.be.false;

      rndNonOverlapEvent = randomEvent(rndEvt, "after");

      evt1 = new Event(rndEvt.startTime, rndEvt.endTime);
      evt2 = new Event(
        rndNonOverlapEvent.startTime,
        rndNonOverlapEvent.endTime
      );
      expect(evt1.isOverlapping(evt2)).to.be.false;
    });

    it("events dont overlap 2", function() {
      let slot1 = {
        startTime: new Date("12/30/2017"),
        endTime: new Date("01/05/2018")
      };
      let slot2 = {
        startTime: new Date("01/30/2017"),
        endTime: new Date("02/05/2017")
      };

      let evt1 = new Event(slot1.startTime, slot1.endTime);
      let evt2 = new Event(slot2.startTime, slot2.endTime);

      expect(evt1.isOverlapping(evt2)).to.be.false;
    });

    it("events non-overlap 3 - from test cases", function() {
      for (let i = 0; i < overlappingPairs.length; i++) {
        let eventPair = [];
        for (let j = 0; j < 2; j++) {
          let slot = nonOverlappingPairs[i][j];
          let evt = new Event(new Date(slot.startTime), new Date(slot.endTime));
          eventPair.push(evt);
        }
        if (eventPair[0].isOverlapping(eventPair[1])) {
          console.log(eventPair);
        }
        expect(eventPair[0].isOverlapping(eventPair[1])).to.be.false;
      }
    });
  });
});
