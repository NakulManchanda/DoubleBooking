class Event {
  constructor(stTime, enTime) {
    this.startTime = stTime;
    this.endTime = enTime;
  }

  isOverlapping(evt) {
    return this.startTime < evt.endTime && evt.startTime < this.endTime;
  }

  clone() {
    let proto = Object.getPrototypeOf(this);
    let cloned = Object.create(proto);

    cloned.startTime = this.startTime;
    cloned.endTime = this.endTime;

    return cloned;
  }
}

module.exports = Event;
