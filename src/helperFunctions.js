function getDate() {
  var time = new Date().getTime();
  var date = new Date(time);
  return {
    ms: time,
    date: date.toDateString() + " " + date.toTimeString(),
  };
}

export { getDate };
