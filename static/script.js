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
//   setTimeout(showSlides, 30000);
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

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let currentTime = hour + ":" +
        min + ":" + sec + " " + am_pm;

    document.getElementById("clock").innerHTML = currentTime;

    //CURRENT GREGORIAN DATE

    $(function() {
        $('.hijri').hijriDate({
            // showGregDate:true,
            weekDayLang: 'en',
            hijriLang: 'en',
            gregLang: 'en',
            correction: 0,
        });
    });

    const nth = function(da) {
        if (da > 3 && da < 21) return 'th';
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
    }
    date = now.getDate();
    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][now.getMonth()];

    document.getElementById("date").innerHTML = date + nth(date) + " " + month + " " + now.getFullYear();

    //COUNTDOWN TO SALAH TIME

    var countDownDate = new Date(document.getElementById("fajrc").innerHTML).getTime();
    var salah = "Fajr Salah";

    // var x = setInterval(function salahCountdown() {
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
                        if (now > countDownDate) {
                            countDownDate = new Date(document.getElementById("fajrt").innerHTML).getTime();
                            salah = "Fajr Salah";
                        }
                    }
                }
            }
        }
    }

    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    distance = distance + 60000;

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
        // clearInterval(x);
        document.getElementById("cc").innerHTML = "Madina Masjid & Islamic Centre";
    }
    // }, 100);;
    return document.getElementById("cc").innerHTML;
    return document.getElementById("date").innerHTML;
}, 1000);

//INVISIBLE CURSOR

document.body.style.cursor = 'none';

//AUTO REFRESH

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
    setTimeout(function() {
        window.location.reload(true);
    }, timeout);
}

refreshAt(0, 0, 0); //Will refresh the page at 0:00
refreshAt(0, 1, 0); //Will refresh the page at 0:01
refreshAt(1, 0, 0); //Will refresh the page at 1:00
refreshAt(1, 1, 0); //Will refresh the page at 1:01
refreshAt(2, 0, 0); //Will refresh the page at 2:00
refreshAt(2, 1, 0); //Will refresh the page at 2:01