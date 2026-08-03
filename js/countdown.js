const matchDate = new Date("August 10, 2026 08:10:00").getTime();

const countdown = setInterval(() => {
  const now = new Date().getTime();

  const distance = matchDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = String(days).padStart(2, "0");

  document.getElementById("hours").innerHTML = String(hours).padStart(2, "0");

  document.getElementById("minutes").innerHTML = String(minutes).padStart(
    2,
    "0",
  );

  document.getElementById("seconds").innerHTML = String(seconds).padStart(
    2,
    "0",
  );

  if (distance < 0) {
    clearInterval(countdown);

    document.querySelector(".countdown").innerHTML =
      "<h2>Match Started ⚽</h2>";
  }
}, 1000);
