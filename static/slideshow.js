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
//   setTimeout(showSlides, 13000);
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

// NEW CLOCK

// function startTime() {
//     var today = new Date();
//     var hr = today.getHours();
//     var min = today.getMinutes();
//     var sec = today.getSeconds();
//     ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
//     hr = (hr == 0) ? 12 : hr;
//     hr = (hr > 12) ? hr - 12 : hr;
//     //Add a zero in front of numbers<10
//     hr = checkTime(hr);
//     min = checkTime(min);
//     sec = checkTime(sec);
//     document.getElementById("clock").innerHTML = hr + ":" + min + " " + ap;
    
//     var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//     var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     var curWeekDay = days[today.getDay()];
//     var curDay = today.getDate();
//     var curMonth = months[today.getMonth()];
//     var curYear = today.getFullYear();
//     var date = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
//     document.getElementById("date").innerHTML = date;
    
//     var time = setTimeout(function(){ startTime() }, 100);
// }
// function checkTime(i) {
//     if (i < 10) {
//         i = "0" + i;
//     }
//     return i;
// }
// startTime();


//COUNTDOWN
setInterval(function masjidClock() {
  
  setInterval(function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    am_pm = "AM";
  
    if (hour > 12) {
        hour -= 12;
        am_pm = "PM";
    }
    if (hour == 0) {
        hr = 12;
        am_pm = "AM";
    }
  
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
  
    let currentTime = hour + ":"
            + min + ":" + sec + " " + am_pm;
  
    document.getElementById("clock").innerHTML = currentTime;
  }, 1000);
  
  var countDownDate = new Date(document.getElementById("fajrc").innerHTML).getTime();
  var salah = "Fajr";
  
  // Update the count down every 1 second
  var x = setInterval(function salahCountdown() {
    // Get today's date and time
    var now = new Date().getTime();
    if (now > countDownDate) {
      countDownDate = new Date(document.getElementById("mysunc").innerHTML).getTime();
      salah = "Sunrise";
      if (now > countDownDate) {
        countDownDate = new Date(document.getElementById("zuhrc").innerHTML).getTime();
        salah = (document.getElementById("jumuah").innerHTML);
        if (now > countDownDate) {
          countDownDate = new Date(document.getElementById("asrc").innerHTML).getTime();
          salah = "Asr Salah";
          if (now > countDownDate) {
            countDownDate = new Date(document.getElementById("maghribc").innerHTML).getTime();
            salah = "Maghrib Salah";
            if (now > countDownDate) {
              countDownDate = new Date(document.getElementById("ishac").innerHTML).getTime();
              salah = "Isha Salah";
            }
          }
        }
      }
    }
    
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    distance = distance + 61000;

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

    //Display the result in the element with id="demo"
    document.getElementById("cc").innerHTML = hours + " hour" + s + " & " + minutes + " minute" + s2;
    if (hours == 0) {
      document.getElementById("cc").innerHTML = minutes + " minute" + s2;
    }
    document.getElementById("cc").innerHTML = (salah + " in " + document.getElementById("cc").innerHTML)

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("cc").innerHTML = "Madina Masjid & Islamic Centre";
    }
  }, 1000);;
  return document.getElementById("cc").innerHTML;
  
  requestAnimationFrame(masjidClock);
}, 1000);

requestAnimationFrame(masjidClock);

document.body.style.cursor = 'none';