/*
 * MMIC Digital Signage
 * Author: Ukasa
 * GitHub: https://github.com/mdukasa
 */

var myIndex = 0;
var slideIntervals = [25000, 25000, 25000]; // Example intervals for each slide in milliseconds

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1;
  }
  x[myIndex - 1].style.display = "block";

  // Use the specific timeout for the current slide
  var timeout = slideIntervals[myIndex - 1];
  setTimeout(carousel, timeout);
}

// Start the carousel
carousel();


//
// function carousel() {
//   var i;
//   var x = document.getElementsByClassName("mySlides");
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";
//   }
//   myIndex++;
//   if (myIndex > x.length) {
//     myIndex = 1;
//   }
//   x[myIndex - 1].style.display = "block";
//   setTimeout(carousel, 25000); // Change image every 25 seconds
// }

var myIndex2 = 0;
carousel2();

function carousel2() {
  var i2;
  var x2 = document.getElementsByClassName("myTexts");
  for (i2 = 0; i2 < x2.length; i2++) {
    x2[i2].style.display = "none";
  }
  myIndex2++;
  if (myIndex2 > x2.length) {
    myIndex2 = 1;
  }
  x2[myIndex2 - 1].style.display = "block";
  setTimeout(carousel2, 25000); // Change image every 2 seconds
}

// let slideIndex = 0;
// showSlides();

// function showSlides() {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   let dots = document.getElementsByClassName("dot");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) { slideIndex = 1 }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex - 1].style.display = "block";
//   dots[slideIndex - 1].className += " active";
//   setTimeout(showSlides, 5000);
// }

// //for switching between mmic link and countdown

// let slideIndex2 = 0;
// showSlides2();

// function showSlides2() {
//   let i2;
//   let slides2 = document.getElementsByClassName("myWidgets");
//   let dots2 = document.getElementsByClassName("dot2");
//   for (i2 = 0; i2 < slides2.length; i2++) {
//     slides2[i2].style.display = "none";
//   }
//   slideIndex2++;
//   if (slideIndex2 > slides2.length) { slideIndex2 = 1 }
//   for (i2 = 0; i2 < dots2.length; i2++) {
//     dots2[i2].className = dots2[i2].className.replace(" active", "");
//   }
//   slides2[slideIndex2 - 1].style.display = "block";
//   dots2[slideIndex2 - 1].className += " active";
//   setTimeout(showSlides2, 7000);
// }

//MASJID CLOCK
setInterval(function masjidClock() {
  //CURRENT TIME (24H)

  let now = new Date();
  let hour = now.getHours();
  let min = now.getMinutes();
  let sec = now.getSeconds();
  am_pm = "AM";

  if (hour > 12) {
    hour -= 12;
    am_pm = "PM";
  }
  if (hour == 0) {
    hr = 12;
    am_pm = "AM";
  }
  if (hour == 12) {
    am_pm = "PM";
  }

  hour = hour < 10 ? hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  let currentTime = hour + ":" + min + ":" + sec + " " + am_pm;

  document.getElementById("clock").innerHTML = currentTime;

  //CURRENT HIJRI + GREGORIAN DATE

  $(function () {
    $(".hijri").hijriDate({
      // showGregDate:true,
      weekDayLang: "en",
      hijriLang: "en",
      gregLang: "en",
      correction: 0,
    });
  });

  const nth = function (da) {
    if (da > 3 && da < 21) return "th";
    switch (da % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  date = now.getDate();
  month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][now.getMonth()];

  document.getElementById("date").innerHTML =
    date + nth(date) + " " + month + " " + now.getFullYear();

  //COUNTDOWN TO SALAH TIME

  var countDownDate = new Date(
    document.getElementById("fajrc").innerHTML,
  ).getTime();
  var salah = "Fajr Salah";

  // var x = setInterval(function salahCountdown() {
  if (now > countDownDate) {
    countDownDate = new Date(
      document.getElementById("mysunc").innerHTML,
    ).getTime();
    salah = "Sunrise";
    if (now > countDownDate) {
      countDownDate = new Date(
        document.getElementById("dhuhrc").innerHTML,
      ).getTime();
      salah = document.getElementById("jumuah").innerHTML;
      if (now > countDownDate) {
        countDownDate = new Date(
          document.getElementById("asrc").innerHTML,
        ).getTime();
        salah = "Asr Salah";
        if (now > countDownDate) {
          countDownDate = new Date(
            document.getElementById("maghribc").innerHTML,
          ).getTime();
          salah = "Maghrib Salah";
          if (now > countDownDate) {
            countDownDate = new Date(
              document.getElementById("ishac").innerHTML,
            ).getTime();
            salah = "Isha Salah";
            if (now > countDownDate) {
              countDownDate = new Date(
                document.getElementById("fajrt").innerHTML,
              ).getTime();
              salah = "Fajr Salah";
            }
          }
        }
      }
    }
  }

  // Find the distance between now and the count down date
  var distance = countDownDate - now;
  distance = distance + 1000;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  var s = "s";
  if (hours == 1) {
    s = "";
  }
  var s2 = "s";
  if (minutes == 1) {
    s2 = "";
  }

  //Display the result in the element with id="cc"
  document.getElementById("cc").innerHTML =
    hours + " hour" + s + " & " + minutes + " minute" + s2;
  if (hours == 0) {
    document.getElementById("cc").innerHTML = minutes + " minute" + s2 + " & " + seconds + " seconds";
  }

  //Display the result in the element with id="cc" SIMPLIFIED
  //document.getElementById("cc").innerHTML = hours + ":" + minutes + ":" + seconds;

  //ccc will be just the time remaining.
  document.getElementById("ccc").innerHTML = salah + " in ";

  //ccb is a shorter countdown that only starts when Salah is under an hour away
  document.getElementById("ccb").innerHTML = minutes + " minute" + s2;
  document.getElementById("ccb").innerHTML =
    " • " + salah + " in " + document.getElementById("ccb").innerHTML;
  if (hours != 0) {
    document.getElementById("ccb").innerHTML = " ";
  }

  // If the count down is finished, write some text
  if (distance < 0) {
    // clearInterval(x);
    document.getElementById("cc").innerHTML = "Madina Masjid & Islamic Centre";
  }
  // }, 100);;

  // //RAMADAN-SPECIFIC
  // 	var countDownDate2 = new Date(document.getElementById("fajrb").innerHTML).getTime();
  // 	var myfast = "End of Suhoor";

  // 	if (now > countDownDate2) {
  // 		countDownDate2 = new Date(document.getElementById("maghribc").innerHTML).getTime();
  // 		myfast = "Iftar";
  //     if (now > countDownDate2) {
  //   		countDownDate2 = new Date(document.getElementById("ishac").innerHTML).getTime();
  //   		myfast = "Tarawih";
  //       if (now > countDownDate2) {
  //     		countDownDate2 = new Date(document.getElementById("isha2c").innerHTML).getTime();
  //     		myfast = "Late Tarawih";
  //       }
  //     }
  //   }

  // 	// Find the distance2 between now and the count down date
  // 	var distance2 = countDownDate2 - now;
  // 	distance2 = distance2 + 60000;

  // 	// Time calculations for days2, hours2, minutes2 and seconds2
  // 	var days2 = Math.floor(distance2 / (1000 * 60 * 60 * 24));
  // 	var hours2 = Math.floor((distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  // 	var minutes2 = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60));
  // 	var seconds2 = Math.floor((distance2 % (1000 * 60)) / 1000);

  // 	var sa = "s";
  // 	if (hours2 == 1) {
  // 		sa = "";
  // 	}
  // 	var s2a = "s";
  // 	if (minutes2 == 1) {
  // 		s2a = "";
  // 	}

  // 	//Display the result in the element with id="cc2"
  // 	document.getElementById("cc2").innerHTML = hours2 + " hour" + sa + " & " + minutes2 + " minute" + s2a;
  // 	if (hours2 == 0) {
  // 		document.getElementById("cc2").innerHTML = minutes2 + " minute" + s2a;
  // 	}
  // 	document.getElementById("cc2").innerHTML = (myfast + " in " + document.getElementById("cc2").innerHTML)

  // 	// If the count down is finished, write some text
  // 	if (distance2 < 0) {
  // 		// clearInterval(x);
  // 		document.getElementById("cc2").innerHTML = "Madina Masjid & Islamic Centre";
  // 	}
  // 	// }, 100);;

  //WAQT-SPECIFIC
  var countDownDate3 = new Date(
    document.getElementById("fajrc").innerHTML,
  ).getTime();
  var salah3 = "Fajr Salah";

  // var x = setInterval(function salahCountdown() {
  if (now > countDownDate3) {
    countDownDate3 = new Date(
      document.getElementById("mysunc").innerHTML,
    ).getTime();
    salah3 = "Sunrise";
    if (now > countDownDate3) {
      countDownDate3 = new Date(
        document.getElementById("dhuhrc").innerHTML,
      ).getTime();
      salah3 = document.getElementById("jumuah").innerHTML;
      if (now > countDownDate3) {
        countDownDate3 = new Date(
          document.getElementById("asrc").innerHTML,
        ).getTime();
        salah3 = "Asr Salah";
        if (now > countDownDate3) {
          countDownDate3 = new Date(
            document.getElementById("maghribc").innerHTML,
          ).getTime();
          salah3 = "Maghrib Salah";
          if (now > countDownDate3) {
            countDownDate3 = new Date(
              document.getElementById("ishac").innerHTML,
            ).getTime();
            salah3 = "Isha Salah";
            if (now > countDownDate3) {
              countDownDate = new Date(
                document.getElementById("fajrt").innerHTML,
              ).getTime();
              salah3 = "Fajr Salah";
            }
          }
        }
      }
    }
  }

  // Find the distance between now and the count down date
  var distance3 = countDownDate3 - now;
  distance3 = distance3 + 60000;

  // Time calculations for days, hours, minutes and seconds
  var days3 = Math.floor(distance3 / (1000 * 60 * 60 * 24));
  var hours3 = Math.floor(
    (distance3 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  var minutes3 = Math.floor((distance3 % (1000 * 60 * 60)) / (1000 * 60));
  var seconds3 = Math.floor((distance3 % (1000 * 60)) / 1000);

  var sb = "s";
  if (hours3 == 1) {
    sb = "";
  }
  var s2b = "s";
  if (minutes3 == 1) {
    s2b = "";
  }

  //Display the result in the element with id="cc"
  document.getElementById("cc3").innerHTML =
    hours3 + " hour" + sb + " & " + minutes3 + " minute" + s2b;
  if (hours3 == 0) {
    document.getElementById("cc3").innerHTML = minutes3 + " minute" + s2b;
  }
  document.getElementById("cc3").innerHTML =
    salah3 + " in " + document.getElementById("cc3").innerHTML;

  // If the count down is finished, write some text
  if (distance3 < 0) {
    // clearInterval(x);
    document.getElementById("cc3").innerHTML = "Madina Masjid & Islamic Centre";
  }
  // }, 100);;

  //   return document.getElementById("cc2").innerHTML;

  return document.getElementById("cc").innerHTML;
  return document.getElementById("ccc").innerHTML;
  return document.getElementById("ccb").innerHTML;
  return document.getElementById("cc3").innerHTML;
  return document.getElementById("date").innerHTML;
}, 1000);
document.getElementById("cc").innerHTML = "Madina Masjid & Islamic Centre";

//INVISIBLE CURSOR

document.body.style.cursor = "none";

//AUTO REFRESH

function refreshAt(hours, minutes, seconds) {
  var now = new Date();
  var then = new Date();

  if (
    now.getHours() > hours ||
    (now.getHours() == hours && now.getMinutes() > minutes) ||
    (now.getHours() == hours &&
      now.getMinutes() == minutes &&
      now.getSeconds() >= seconds)
  ) {
    then.setDate(now.getDate() + 1);
  }
  then.setHours(hours);
  then.setMinutes(minutes);
  then.setSeconds(seconds);

  var timeout = then.getTime() - now.getTime();
  setTimeout(function () {
    window.location.reload(true);
  }, timeout);
}

refreshAt(0, 0, 0); //Will refresh the page at 0:00
refreshAt(0, 1, 0); //Will refresh the page at 0:01
//refreshAt(1, 0, 0); //Will refresh the page at 1:00
//refreshAt(1, 1, 0); //Will refresh the page at 1:01
//refreshAt(2, 0, 0); //Will refresh the page at 2:00
//refreshAt(2, 1, 0); //Will refresh the page at 2:01
