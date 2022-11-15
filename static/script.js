function refreshAt(hours, minutes, seconds) {
  var now = new Date();
  var then = new Date();

  if (now.getHours() > hours ||
    (now.getHours() == hours && now.getMinutes() > minutes) ||
    now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds) {
    then.setDate(now.getDate() + 1);
  }
  then.setHours(hours);
  then.setMinutes(minutes);
  then.setSeconds(seconds);

  var timeout = (then.getTime() - now.getTime());
  setTimeout(function() { window.location.reload(true); }, timeout);
}

refreshAt(0, 0, 0); //Will refresh the page at 0:00
refreshAt(0, 1, 0); //Will refresh the page at 0:10
refreshAt(1, 0, 0); //Will refresh the page at 1:00
refreshAt(1, 1, 0); //Will refresh the page at 1:10
refreshAt(2, 0, 0); //Will refresh the page at 2:00
refreshAt(2, 1, 0); //Will refresh the page at 2:10

