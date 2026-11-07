// --- NAVEGACIÓN LATERAL ---
function verSeccion(idSec, btnObj) {
  document.querySelectorAll('.box-card').forEach(card => card.classList.remove('active-box'));
  document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
  
  document.getElementById(idSec).classList.add('active-box');
  btnObj.classList.add('active');
}

// --- PROYECTO 1: CONTADOR ---
let valorCont = parseInt(localStorage.getItem('val_c')) || 0;
const numDisplay = document.getElementById('num-display');
numDisplay.innerText = valorCont;

function modificarSuma(val) {
  if (val === 0) valorCont = 0;
  else valorCont += val;
  numDisplay.innerText = valorCont;
  localStorage.setItem('val_c', valorCont);
}

// --- PROYECTO 2: TAREAS ---
function anadirPendiente() {
  const campo = document.getElementById('campo-tarea');
  if(!campo.value.trim()) return;
  const lista = document.getElementById('lista-pendientes');
  const li = document.createElement('li');
  li.innerText = "• " + campo.value;
  li.onclick = () => li.remove();
  lista.appendChild(li);
  campo.value = "";
}

// --- PROYECTO 3: ADIVINA ---
let numSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;
function chequearNumero() {
  const n = parseInt(document.getElementById('input-secreto').value);
  const aviso = document.getElementById('aviso-juego');
  intentos++;
  document.getElementById('contador-intentos').innerText = intentos;
  
  if(n === numSecreto) {
    aviso.innerText = "¡Excelente, adivinaste!";
    aviso.style.color = "green";
  } else if(n > numSecreto) {
    aviso.innerText = "Demasiado alto.";
    aviso.style.color = "orange";
  } else {
    aviso.innerText = "Demasiado bajo.";
    aviso.style.color = "red";
  }
}
function reiniciarAdivina() {
  numSecreto = Math.floor(Math.random() * 100) + 1;
  intentos = 0;
  document.getElementById('contador-intentos').innerText = 0;
  document.getElementById('aviso-juego').innerText = "Nuevo número generado.";
}

// --- PROYECTO 4: CALCULADORA ---
const visorCalc = document.getElementById('visor-calc');
function teclear(car) {
  if(visorCalc.value === "0") visorCalc.value = "";
  visorCalc.value += car;
}
function limpiarCalc() {
  visorCalc.value = "0";
}
function resolverCalc() {
  try {
    visorCalc.value = eval(visorCalc.value);
  } catch {
    visorCalc.value = "Error";
  }
}

// --- PROYECTO 5: COLORES ---
const hexTexto = document.getElementById('codigo-hex-texto');
function girarColor() {
  const chars = "0123456789ABCDEF";
  let col = "#";
  for(let i=0; i<6; i++) col += chars[Math.floor(Math.random()*16)];
  hexTexto.innerText = col;
  hexTexto.style.color = col;
}
function copiarHex() {
  navigator.clipboard.writeText(hexTexto.innerText);
  alert("Copiado: " + hexTexto.innerText);
}

// --- PROYECTO 6: TEMPORIZADOR ---
let segsTotal = 10;
let refIntervalo = null;
const relojDisplay = document.getElementById('reloj-display');

function arrancarReloj() {
  if(refIntervalo) return;
  const m = parseInt(document.getElementById('input-min').value) || 0;
  const s = parseInt(document.getElementById('input-seg').value) || 0;
  if(segsTotal === 10 && (m > 0 || s > 0)) segsTotal = (m * 60) + s;
  
  refIntervalo = setInterval(() => {
    if(segsTotal > 0) {
      segsTotal--;
      let min = Math.floor(segsTotal / 60);
      let seg = segsTotal % 60;
      relojDisplay.innerText = `${String(min).padStart(2,'0')}:${String(seg).padStart(2,'0')}`;
    } else {
      clearInterval(refIntervalo);
      refIntervalo = null;
      document.getElementById('alerta-tiempo').innerText = "¡Tiempo finalizado!";
    }
  }, 1000);
}
function pausarReloj() {
  clearInterval(refIntervalo);
  refIntervalo = null;
}
function resetReloj() {
  pausarReloj();
  segsTotal = 10;
  relojDisplay.innerText = "00:10";
  document.getElementById('alerta-tiempo').innerText = "";
}

// --- PROYECTO 7: CONTRASEÑAS ---
function fabricarClave() {
  const largo = parseInt(document.getElementById('pass-largo').value) || 10;
  const alfa = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$";
  let token = "";
  for(let i=0; i<largo; i++) token += alfa.charAt(Math.floor(Math.random() * alfa.length));
  document.getElementById('input-pass-gen').value = token;
}
function copiarPass() {
  const campoP = document.getElementById('input-pass-gen');
  navigator.clipboard.writeText(campoP.value);
  alert("Contraseña copiada.");
}

// --- PROYECTO 8: MODO OSCURO ---
function conmutarTema() {
  document.body.classList.toggle('dark-mode');
}

// --- PROYECTO 9: PIEDRA, PAPEL O TIJERA ---
let pUser = 0, pPC = 0;
function enfrentarPPT(jugada) {
  const opciones = ['Piedra', 'Papel', 'Tijera'];
  const pc = opciones[Math.floor(Math.random() * 3)];
  let res = "";
  if(jugada === pc) res = `Empate (${pc})`;
  else if((jugada==='Piedra'&&pc==='Tijera')||(jugada==='Papel'&&pc==='Piedra')||(jugada==='Tijera'&&pc==='Papel')) {
    pUser++; res = `Ganaste (${pc})`;
  } else {
    pPC++; res = `Perdiste contra (${pc})`;
  }
  document.getElementById('pts-user').innerText = pUser;
  document.getElementById('pts-pc').innerText = pPC;
  document.getElementById('resultado-ppt').innerText = res;
}
function resetPPT() {
  pUser = 0; pPC = 0;
  document.getElementById('pts-user').innerText = 0;
  document.getElementById('pts-pc').innerText = 0;
  document.getElementById('resultado-ppt').innerText = "";
}

// --- PROYECTO 10: GALERÍA ---
function categoriaFoto(cat) {
  document.querySelectorAll('.gallery-grid img').forEach(img => {
    if(cat === 'todas' || img.getAttribute('data-cat') === cat) img.style.display = 'block';
    else img.style.display = 'none';
  });
}
function filtrarFotos() {
  const txt = document.getElementById('buscador-galeria').value.toLowerCase();
  document.querySelectorAll('.gallery-grid img').forEach(img => {
    const alt = img.alt.toLowerCase();
    img.style.display = alt.includes(txt) ? 'block' : 'none';
  });
}