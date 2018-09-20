
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

class Event {
  constructor(stTime, enTime) {
    this.uuid = guid();
    this.startTime = stTime;
    this.endTime = enTime;
  }

  isOverlapping(evt) {
    return this.startTime < evt.endTime && evt.startTime < this.endTime;
  }

  clone() {
    let proto = Object.getPrototypeOf(this);
    let cloned = Object.create(proto);

    cloned.uuid = guid();
    cloned.startTime = this.startTime;
    cloned.endTime = this.endTime;

    return cloned;
  }
}

module.exports = Event;
