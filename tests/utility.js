let timeSlots = (function() {
  let dates = ["12/30/2017", "12/31/2017", "01/01/2018", "01/02/2018"];
  let timeSlots = [];
  let slotMins = 15;
  for (i = 0; i < dates.length; i++) {
    let dt = new Date(dates[i]);
    let nextDt = new Date(dates[i]);
    nextDt.setDate(dt.getDate() + 1);
    while (dt < nextDt) {
      timeSlots.push(new Date(dt));
      dt.setMinutes(dt.getMinutes() + slotMins);
    }
  }
  return timeSlots;
})();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function randomEvent(evt, type = "overlap") {
  let min = 0,
    max = timeSlots.length - 1;

  if (evt) {
    if (type === "overlap") {
      min = evt.sIndex;
      max = evt.eIndex;
    } else if (type === "before") {
      if (evt.sIndex === min) {
        return false;
      }
      max = evt.sIndex - 1;
    } else if (type === "after") {
      if (evt.eIndex === max) {
        return false;
      }
      min = evt.eIndex + 1;
    }
  }

  let sIndex = getRandomInt(min, max);
  let eIndex = getRandomInt(sIndex, max);

  return {
    startTime: timeSlots[sIndex],
    endTime: timeSlots[eIndex],
    sIndex,
    eIndex
  };
}

module.exports = {
  randomEvent
};
