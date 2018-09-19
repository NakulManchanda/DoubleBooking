class Calendar {
  constructor() {
    this.events = [];
  }

  addEvent(evt) {
    this.events.push(evt.clone());
  }

  addEvents(evts) {
    this.events = [...this.events, ...evts];
  }

  allOverlapping() {
    let allEvents = this.events.sort((x, y) => x - y);

    let overlapping = [];
    for (let i = 0; i < allEvents.length; i++) {
      for (var j = i + 1; j < allEvents.length; j++) {
        if (allEvents[i].isOverlapping(allEvents[j])) {
          overlapping.push([allEvents[i], allEvents[j]]);
        }
      }
    }
    return overlapping;
  }
}

module.exports = Calendar;
