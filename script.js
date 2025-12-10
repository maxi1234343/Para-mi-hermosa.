const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let width = canvas.width;
let height = canvas.height;

// ---------- Corazones flotando ---------
let floatingHearts = [];
class FloatingHeart {
  constructor() {
    this.x = Math.random() * width;
    this.y = height + 20;
    this.size = 10 + Math.random() * 20;
    this.speed = 1 + Math.random() * 2;
    this.alpha = 0.3 + Math.random() * 0.7;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "#ff4d6d";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2,
                      this.x - this.size, this.y + this.size / 3,
                      this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 3,
                      this.x + this.size / 2, this.y - this.size / 2,
                      this.x, this.y);
    ctx.fill();
    ctx.restore();
  }
  update() {
    this.y -= this.speed;
    if (this.y < -20) {
      this.y = height + 20;
      this.x = Math.random() * width;
    }
    this.draw();
  }
}
for (let i = 0; i < 30; i++) floatingHearts.push(new FloatingHeart());

// ---------- Corazón interactivo ----------
class Petal {
  constructor(x, y) {
    this.baseX = x;
    this.baseY = y;
    this.x = x;
    this.y = y;
    this.size = 2 + Math.random() * 2;
    this.color = "#ff4d6d";
    this.vx = (Math.random() - 0.5) * 8;
    this.vy = (Math.random() - 0.5) * 8;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update(exploded) {
    if (exploded) {
      this.x += this.vx;
      this.y += this.vy;
    } else {
      this.x += (this.baseX - this.x) * 0.05;
      this.y += (this.baseY - this.y) * 0.05;
    }
    this.draw();
  }
}
let petals = [];
function createHeart() {
  petals = [];
  for (let i = 0; i < Math.PI*2; i += 0.05) {
    let x = 16*Math.pow(Math.sin(i),3);
    let y = -(13*Math.cos(i)-5*Math.cos(2*i)-2*Math.cos(3*i)-Math.cos(4*i));
    x *= 15;
    y *= 15;
    petals.push(new Petal(width/2 + x, height/2 + y));
  }
}
createHeart();

let exploded = false;
function animate() {
  ctx.clearRect(0,0,width,height);
  ctx.fillStyle = "#1a000a";
  ctx.fillRect(0,0,width,height);
  floatingHearts.forEach(h=>h.update());
  petals.forEach(p=>p.update(exploded));
  requestAnimationFrame(animate);
}
animate();

canvas.addEventListener("click",()=>{
  exploded = !exploded;
  if(!exploded){
    setTimeout(()=>showPoema(),1500);
  }
});

// ---------- Poema animado ----------
const poema = `Un mes no es tiempo para el mundo,
pero fue suficiente para mí
para entender cuanto te amo.

Treinta días aprendiendo tu nombre
en cada gesto,
descubriendo que amar
también es cuidar, esperar, quedarme.

En un mes sembraste en mi vida
una calma que no conocía,
y aunque solo es el comienzo,
quiero seguir contando el tiempo
de mes en mes,
de abrazo en abrazo,
de vos en vos.

Porque si el primer mes fue así de real,
no imagino lo que nos espera
cuando el amor tenga años
y siga eligiéndote como hoy.

Con Amor Facu.`;

function showPoema(){
  const overlay = document.getElementById("poema");
  const textEl = document.querySelector(".message-text");
  overlay.style.display = "flex";
  textEl.textContent = "";
  let i=0;
  function typeWriter(){
    if(i<poema.length){
      textEl.textContent+=poema.charAt(i);
      i++;
      setTimeout(typeWriter,50);
    }
  }
  typeWriter();
}
