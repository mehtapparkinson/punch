let punchIn, lunchStart, lunchEnd, punchOut, timeRemaining, comments;
let audio = new Audio("alarm.mp3");

document.getElementById("calculateBtn").addEventListener("click", function () {
  punchIn = new Date("1970-01-01T" + document.getElementById("punchIn").value);
  console.log(punchIn);
  lunchStart = new Date(
    "1970-01-01T" + document.getElementById("lunchStart").value
  );
  lunchEnd = new Date(
    "1970-01-01T" + document.getElementById("lunchEnd").value
  );

  let lunchDuration = new Date(lunchEnd.getTime() - lunchStart.getTime());
  let comments = document.getElementById("comments")
  if (lunchDuration.getTime() < 30 * 60 * 1000 || lunchDuration.getTime() > 60 * 60 * 1000) {
    comments.innerHTML = "Lunch duration is not between 30 and 60 minutes."
  }

  punchOut = new Date(
    punchIn.getTime() +
      (lunchEnd.getTime() - lunchStart.getTime()) +
      8 * 60 * 60 * 1000
  );

  if (!punchIn || !lunchStart || !lunchEnd) {
    alert("Please enter all times.");
    return;
  }

  if (punchOut) {
    document.getElementById("punchOut").innerHTML =
      punchOut.toLocaleTimeString();
  }
});

let countDown = setInterval(function () {
  let currentTime = new Date();
  if (!punchOut) {
    return;
  }

  timeRemaining = new Date(punchOut.getTime() - currentTime.getTime());
  let timeRemainingString =  (timeRemaining.getHours()  + ":" + timeRemaining.getMinutes() + ":" + timeRemaining.getSeconds());
  console.log(timeRemainingString);
    if (timeRemainingString === "0:0:0") {
        audio.play();
        document.getElementById("comments").innerHTML = "Yay! Time's up! 🥳 ";
       timeRemaining = new Date(0,0,0,0,0,0);
       clearInterval(countDown);

        
    }

  document.getElementById("timeRemaining").innerHTML =
    timeRemaining.toLocaleTimeString();
}, 1000);
