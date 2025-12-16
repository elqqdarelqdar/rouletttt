const prizes = [
  { text: "5%", chance: 40 },
  { text: "10%", chance: 30 },
  { text: "15%", chance: 15 },
  { text: "20%", chance: 10 },
  { text: "30%", chance: 3.3 },
  { text: "50%", chance: 1.5 },
  { text: "100%", chance: 0.2 }
];
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
let angle = 0;

function drawWheel() {
  const radius = 150;
  let start = 0;
  prizes.forEach((p, i) => {
    const slice = (p.chance / 100) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(150,150);
    ctx.arc(150,150,radius,start,start+slice);
    ctx.fillStyle = `hsl(${i*50},80%,50%)`;
    ctx.fill();

    ctx.save();
    ctx.translate(150,150);
    ctx.rotate(start + slice/2);
    ctx.fillStyle = "#fff";
    ctx.fillText(p.text, 60, 0);
    ctx.restore();

    start += slice;
  });
}

drawWheel();
function getPrize() {
  let rand = Math.random() * 100;
  let sum = 0;
  for (let p of prizes) {
    sum += p.chance;
    if (rand <= sum) return p.text;
  }
}
function spin() {
  if (localStorage.getItem("used")) {
    alert("❌ Попытка уже использована");
    return;
  }

  angle += 360 * 5 + Math.random() * 360;
  canvas.style.transition = "transform 4s ease-out";
  canvas.style.transform = `rotate(${angle}deg)`;

  const prize = getPrize();

  setTimeout(() => {
    alert("🎉 Ваша скидка: " + prize);
    localStorage.setItem("used", "true");
  }, 4000);
}
function confirmSubscribe() {
  localStorage.setItem("subscribed", "yes");
  document.getElementById("subscribeBlock").style.display = "none";
  document.getElementById("game").style.display = "block";
}

if (localStorage.getItem("subscribed")) {
  confirmSubscribe();
}
const promoCodes = ["VIP2025", "BONUS50"];

function usePromo() {
  const code = document.getElementById("promoInput").value;
  if (!promoCodes.includes(code)) {
    alert("❌ Неверный промокод");
    return;
  }

  if (localStorage.getItem("promo_" + code)) {
    alert("❌ Промокод уже использован");
    return;
  }

  localStorage.removeItem("used");
  localStorage.setItem("promo_" + code, "used");
  alert("✅ Промокод принят! Можно крутить ещё раз");
}
