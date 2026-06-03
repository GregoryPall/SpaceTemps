// ============================================================
//  ConjuVol — French conjugation airplane game
// ============================================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resize() {
  const maxW = Math.min(window.innerWidth - 4, 900);
  const maxH = Math.min(window.innerHeight - 4, 700);
  canvas.width  = maxW;
  canvas.height = maxH;
}
resize();
window.addEventListener('resize', resize);

// ---- Conjugation data -------------------------------------
const VERBES = {
  present: [
    { prompt: 'JE',   verb: 'être',    answer: 'SUIS',    wrong: ['ES', 'SOMMES'] },
    { prompt: 'TU',   verb: 'être',    answer: 'ES',      wrong: ['EST', 'SUIS'] },
    { prompt: 'IL',   verb: 'être',    answer: 'EST',     wrong: ['ES', 'SONT'] },
    { prompt: 'NOUS', verb: 'être',    answer: 'SOMMES',  wrong: ['ÊTES', 'SONT'] },
    { prompt: 'VOUS', verb: 'être',    answer: 'ÊTES',    wrong: ['SOMMES', 'SONT'] },
    { prompt: 'ILS',  verb: 'être',    answer: 'SONT',    wrong: ['EST', 'ÊTES'] },

    { prompt: 'JE',   verb: 'avoir',   answer: 'AI',      wrong: ['AS', 'AVONS'] },
    { prompt: 'TU',   verb: 'avoir',   answer: 'AS',      wrong: ['AI', 'A'] },
    { prompt: 'IL',   verb: 'avoir',   answer: 'A',       wrong: ['AS', 'ONT'] },
    { prompt: 'NOUS', verb: 'avoir',   answer: 'AVONS',   wrong: ['AVEZ', 'ONT'] },
    { prompt: 'VOUS', verb: 'avoir',   answer: 'AVEZ',    wrong: ['AVONS', 'ONT'] },
    { prompt: 'ILS',  verb: 'avoir',   answer: 'ONT',     wrong: ['A', 'AVEZ'] },

    { prompt: 'JE',   verb: 'aller',   answer: 'VAIS',    wrong: ['VAS', 'ALLONS'] },
    { prompt: 'TU',   verb: 'aller',   answer: 'VAS',     wrong: ['VAIS', 'VA'] },
    { prompt: 'IL',   verb: 'aller',   answer: 'VA',      wrong: ['VAS', 'VONT'] },
    { prompt: 'NOUS', verb: 'aller',   answer: 'ALLONS',  wrong: ['ALLEZ', 'VONT'] },
    { prompt: 'VOUS', verb: 'aller',   answer: 'ALLEZ',   wrong: ['ALLONS', 'VONT'] },
    { prompt: 'ILS',  verb: 'aller',   answer: 'VONT',    wrong: ['VA', 'ALLEZ'] },

    { prompt: 'JE',   verb: 'faire',   answer: 'FAIS',    wrong: ['FAIT', 'FAISONS'] },
    { prompt: 'TU',   verb: 'faire',   answer: 'FAIS',    wrong: ['FAIT', 'FAITES'] },
    { prompt: 'IL',   verb: 'faire',   answer: 'FAIT',    wrong: ['FAIS', 'FONT'] },
    { prompt: 'NOUS', verb: 'faire',   answer: 'FAISONS', wrong: ['FAITES', 'FONT'] },
    { prompt: 'VOUS', verb: 'faire',   answer: 'FAITES',  wrong: ['FAISONS', 'FONT'] },
    { prompt: 'ILS',  verb: 'faire',   answer: 'FONT',    wrong: ['FAIT', 'FAITES'] },

    { prompt: 'JE',   verb: 'pouvoir', answer: 'PEUX',    wrong: ['PEUT', 'POUVONS'] },
    { prompt: 'TU',   verb: 'pouvoir', answer: 'PEUX',    wrong: ['PEUT', 'POUVEZ'] },
    { prompt: 'IL',   verb: 'pouvoir', answer: 'PEUT',    wrong: ['PEUX', 'PEUVENT'] },
    { prompt: 'NOUS', verb: 'pouvoir', answer: 'POUVONS', wrong: ['POUVEZ', 'PEUVENT'] },
    { prompt: 'VOUS', verb: 'pouvoir', answer: 'POUVEZ',  wrong: ['POUVONS', 'PEUVENT'] },
    { prompt: 'ILS',  verb: 'pouvoir', answer: 'PEUVENT', wrong: ['PEUT', 'POUVEZ'] },

    { prompt: 'JE',   verb: 'vouloir', answer: 'VEUX',    wrong: ['VEUT', 'VOULONS'] },
    { prompt: 'TU',   verb: 'vouloir', answer: 'VEUX',    wrong: ['VEUT', 'VOULEZ'] },
    { prompt: 'IL',   verb: 'vouloir', answer: 'VEUT',    wrong: ['VEUX', 'VEULENT'] },
    { prompt: 'NOUS', verb: 'vouloir', answer: 'VOULONS', wrong: ['VOULEZ', 'VEULENT'] },
    { prompt: 'VOUS', verb: 'vouloir', answer: 'VOULEZ',  wrong: ['VOULONS', 'VEULENT'] },
    { prompt: 'ILS',  verb: 'vouloir', answer: 'VEULENT', wrong: ['VEUT', 'VOULEZ'] },
  ],

  passe: [
    { prompt: "J'",   verb: 'être',    answer: 'AI ÉTÉ',       wrong: ['AS ÉTÉ', 'AVONS ÉTÉ'] },
    { prompt: 'TU',   verb: 'être',    answer: 'AS ÉTÉ',       wrong: ['AI ÉTÉ', 'EST ÉTÉ'] },
    { prompt: 'IL',   verb: 'être',    answer: 'A ÉTÉ',        wrong: ['AS ÉTÉ', 'ONT ÉTÉ'] },
    { prompt: 'NOUS', verb: 'être',    answer: 'AVONS ÉTÉ',    wrong: ['AVEZ ÉTÉ', 'ONT ÉTÉ'] },
    { prompt: 'VOUS', verb: 'être',    answer: 'AVEZ ÉTÉ',     wrong: ['AVONS ÉTÉ', 'ONT ÉTÉ'] },
    { prompt: 'ILS',  verb: 'être',    answer: 'ONT ÉTÉ',      wrong: ['A ÉTÉ', 'AVEZ ÉTÉ'] },

    { prompt: "J'",   verb: 'avoir',   answer: 'AI EU',        wrong: ['AS EU', 'A EU'] },
    { prompt: 'TU',   verb: 'avoir',   answer: 'AS EU',        wrong: ['AI EU', 'A EU'] },
    { prompt: 'IL',   verb: 'avoir',   answer: 'A EU',         wrong: ['AS EU', 'ONT EU'] },
    { prompt: 'NOUS', verb: 'avoir',   answer: 'AVONS EU',     wrong: ['AVEZ EU', 'ONT EU'] },
    { prompt: 'VOUS', verb: 'avoir',   answer: 'AVEZ EU',      wrong: ['AVONS EU', 'ONT EU'] },
    { prompt: 'ILS',  verb: 'avoir',   answer: 'ONT EU',       wrong: ['A EU', 'AVEZ EU'] },

    { prompt: "J'",   verb: 'aller',   answer: 'SUIS ALLÉ',    wrong: ['ES ALLÉ', 'SOMMES ALLÉS'] },
    { prompt: 'TU',   verb: 'aller',   answer: 'ES ALLÉ',      wrong: ['SUIS ALLÉ', 'EST ALLÉ'] },
    { prompt: 'IL',   verb: 'aller',   answer: 'EST ALLÉ',     wrong: ['ES ALLÉ', 'SONT ALLÉS'] },
    { prompt: 'NOUS', verb: 'aller',   answer: 'SOMMES ALLÉS', wrong: ['ÊTES ALLÉS', 'SONT ALLÉS'] },
    { prompt: 'VOUS', verb: 'aller',   answer: 'ÊTES ALLÉS',   wrong: ['SOMMES ALLÉS', 'SONT ALLÉS'] },
    { prompt: 'ILS',  verb: 'aller',   answer: 'SONT ALLÉS',   wrong: ['EST ALLÉ', 'ÊTES ALLÉS'] },

    { prompt: "J'",   verb: 'faire',   answer: 'AI FAIT',      wrong: ['AS FAIT', 'A FAIT'] },
    { prompt: 'TU',   verb: 'faire',   answer: 'AS FAIT',      wrong: ['AI FAIT', 'A FAIT'] },
    { prompt: 'IL',   verb: 'faire',   answer: 'A FAIT',       wrong: ['AS FAIT', 'ONT FAIT'] },
    { prompt: 'NOUS', verb: 'faire',   answer: 'AVONS FAIT',   wrong: ['AVEZ FAIT', 'ONT FAIT'] },
    { prompt: 'VOUS', verb: 'faire',   answer: 'AVEZ FAIT',    wrong: ['AVONS FAIT', 'ONT FAIT'] },
    { prompt: 'ILS',  verb: 'faire',   answer: 'ONT FAIT',     wrong: ['A FAIT', 'AVEZ FAIT'] },
  ],

  futur: [
    { prompt: 'JE',   verb: 'être',    answer: 'SERAI',    wrong: ['SERAS', 'SERONS'] },
    { prompt: 'TU',   verb: 'être',    answer: 'SERAS',    wrong: ['SERAI', 'SERA'] },
    { prompt: 'IL',   verb: 'être',    answer: 'SERA',     wrong: ['SERAS', 'SERONT'] },
    { prompt: 'NOUS', verb: 'être',    answer: 'SERONS',   wrong: ['SEREZ', 'SERONT'] },
    { prompt: 'VOUS', verb: 'être',    answer: 'SEREZ',    wrong: ['SERONS', 'SERONT'] },
    { prompt: 'ILS',  verb: 'être',    answer: 'SERONT',   wrong: ['SERA', 'SEREZ'] },

    { prompt: "J'",   verb: 'avoir',   answer: 'AURAI',    wrong: ['AURAS', 'AURONS'] },
    { prompt: 'TU',   verb: 'avoir',   answer: 'AURAS',    wrong: ['AURAI', 'AURA'] },
    { prompt: 'IL',   verb: 'avoir',   answer: 'AURA',     wrong: ['AURAS', 'AURONT'] },
    { prompt: 'NOUS', verb: 'avoir',   answer: 'AURONS',   wrong: ['AUREZ', 'AURONT'] },
    { prompt: 'VOUS', verb: 'avoir',   answer: 'AUREZ',    wrong: ['AURONS', 'AURONT'] },
    { prompt: 'ILS',  verb: 'avoir',   answer: 'AURONT',   wrong: ['AURA', 'AUREZ'] },

    { prompt: "J'",   verb: 'aller',   answer: 'IRAI',     wrong: ['IRAS', 'IRONS'] },
    { prompt: 'TU',   verb: 'aller',   answer: 'IRAS',     wrong: ['IRAI', 'IRA'] },
    { prompt: 'IL',   verb: 'aller',   answer: 'IRA',      wrong: ['IRAS', 'IRONT'] },
    { prompt: 'NOUS', verb: 'aller',   answer: 'IRONS',    wrong: ['IREZ', 'IRONT'] },
    { prompt: 'VOUS', verb: 'aller',   answer: 'IREZ',     wrong: ['IRONS', 'IRONT'] },
    { prompt: 'ILS',  verb: 'aller',   answer: 'IRONT',    wrong: ['IRA', 'IREZ'] },

    { prompt: 'JE',   verb: 'faire',   answer: 'FERAI',    wrong: ['FERAS', 'FERONS'] },
    { prompt: 'TU',   verb: 'faire',   answer: 'FERAS',    wrong: ['FERAI', 'FERA'] },
    { prompt: 'IL',   verb: 'faire',   answer: 'FERA',     wrong: ['FERAS', 'FERONT'] },
    { prompt: 'NOUS', verb: 'faire',   answer: 'FERONS',   wrong: ['FEREZ', 'FERONT'] },
    { prompt: 'VOUS', verb: 'faire',   answer: 'FEREZ',    wrong: ['FERONS', 'FERONT'] },
    { prompt: 'ILS',  verb: 'faire',   answer: 'FERONT',   wrong: ['FERA', 'FEREZ'] },

    { prompt: 'JE',   verb: 'pouvoir', answer: 'POURRAI',  wrong: ['POURRAS', 'POURRONS'] },
    { prompt: 'TU',   verb: 'pouvoir', answer: 'POURRAS',  wrong: ['POURRAI', 'POURRA'] },
    { prompt: 'IL',   verb: 'pouvoir', answer: 'POURRA',   wrong: ['POURRAS', 'POURRONT'] },
    { prompt: 'NOUS', verb: 'pouvoir', answer: 'POURRONS', wrong: ['POURREZ', 'POURRONT'] },
    { prompt: 'VOUS', verb: 'pouvoir', answer: 'POURREZ',  wrong: ['POURRONS', 'POURRONT'] },
    { prompt: 'ILS',  verb: 'pouvoir', answer: 'POURRONT', wrong: ['POURRA', 'POURREZ'] },
  ],

  imparfait: [
    { prompt: "J'",   verb: 'être',    answer: 'ÉTAIS',     wrong: ['ÉTAIT', 'ÉTIONS'] },
    { prompt: 'TU',   verb: 'être',    answer: 'ÉTAIS',     wrong: ['ÉTAIT', 'ÉTIEZ'] },
    { prompt: 'IL',   verb: 'être',    answer: 'ÉTAIT',     wrong: ['ÉTAIS', 'ÉTAIENT'] },
    { prompt: 'NOUS', verb: 'être',    answer: 'ÉTIONS',    wrong: ['ÉTIEZ', 'ÉTAIENT'] },
    { prompt: 'VOUS', verb: 'être',    answer: 'ÉTIEZ',     wrong: ['ÉTIONS', 'ÉTAIENT'] },
    { prompt: 'ILS',  verb: 'être',    answer: 'ÉTAIENT',   wrong: ['ÉTAIT', 'ÉTIEZ'] },

    { prompt: "J'",   verb: 'avoir',   answer: 'AVAIS',     wrong: ['AVAIT', 'AVIONS'] },
    { prompt: 'TU',   verb: 'avoir',   answer: 'AVAIS',     wrong: ['AVAIT', 'AVIEZ'] },
    { prompt: 'IL',   verb: 'avoir',   answer: 'AVAIT',     wrong: ['AVAIS', 'AVAIENT'] },
    { prompt: 'NOUS', verb: 'avoir',   answer: 'AVIONS',    wrong: ['AVIEZ', 'AVAIENT'] },
    { prompt: 'VOUS', verb: 'avoir',   answer: 'AVIEZ',     wrong: ['AVIONS', 'AVAIENT'] },
    { prompt: 'ILS',  verb: 'avoir',   answer: 'AVAIENT',   wrong: ['AVAIT', 'AVIEZ'] },

    { prompt: "J'",   verb: 'aller',   answer: 'ALLAIS',    wrong: ['ALLAIT', 'ALLIONS'] },
    { prompt: 'TU',   verb: 'aller',   answer: 'ALLAIS',    wrong: ['ALLAIT', 'ALLIEZ'] },
    { prompt: 'IL',   verb: 'aller',   answer: 'ALLAIT',    wrong: ['ALLAIS', 'ALLAIENT'] },
    { prompt: 'NOUS', verb: 'aller',   answer: 'ALLIONS',   wrong: ['ALLIEZ', 'ALLAIENT'] },
    { prompt: 'VOUS', verb: 'aller',   answer: 'ALLIEZ',    wrong: ['ALLIONS', 'ALLAIENT'] },
    { prompt: 'ILS',  verb: 'aller',   answer: 'ALLAIENT',  wrong: ['ALLAIT', 'ALLIEZ'] },

    { prompt: 'JE',   verb: 'faire',   answer: 'FAISAIS',   wrong: ['FAISAIT', 'FAISIONS'] },
    { prompt: 'TU',   verb: 'faire',   answer: 'FAISAIS',   wrong: ['FAISAIT', 'FAISIEZ'] },
    { prompt: 'IL',   verb: 'faire',   answer: 'FAISAIT',   wrong: ['FAISAIS', 'FAISAIENT'] },
    { prompt: 'NOUS', verb: 'faire',   answer: 'FAISIONS',  wrong: ['FAISIEZ', 'FAISAIENT'] },
    { prompt: 'VOUS', verb: 'faire',   answer: 'FAISIEZ',   wrong: ['FAISIONS', 'FAISAIENT'] },
    { prompt: 'ILS',  verb: 'faire',   answer: 'FAISAIENT', wrong: ['FAISAIT', 'FAISIEZ'] },

    { prompt: 'JE',   verb: 'pouvoir', answer: 'POUVAIS',   wrong: ['POUVAIT', 'POUVIONS'] },
    { prompt: 'TU',   verb: 'pouvoir', answer: 'POUVAIS',   wrong: ['POUVAIT', 'POUVIEZ'] },
    { prompt: 'IL',   verb: 'pouvoir', answer: 'POUVAIT',   wrong: ['POUVAIS', 'POUVAIENT'] },
    { prompt: 'NOUS', verb: 'pouvoir', answer: 'POUVIONS',  wrong: ['POUVIEZ', 'POUVAIENT'] },
    { prompt: 'VOUS', verb: 'pouvoir', answer: 'POUVIEZ',   wrong: ['POUVIONS', 'POUVAIENT'] },
    { prompt: 'ILS',  verb: 'pouvoir', answer: 'POUVAIENT', wrong: ['POUVAIT', 'POUVIEZ'] },
  ],
};

const TENSE_LABELS = { present: 'Présent', passe: 'Passé composé', futur: 'Futur', imparfait: 'Imparfait' };
const TENSE_COLORS = { present: '#2a9fff', passe: '#aa44ff', futur: '#ff9922', imparfait: '#22ddaa' };

// ---- State ------------------------------------------------
let state = 'start';
let score = 0;
let lives = 3;
let combo = 0;
let activeModes = ['present', 'passe', 'futur', 'imparfait'];

// Plane physics
const ACCEL      = 480;   // px/s²
const DECEL      = 320;   // px/s² friction
const MAX_SPEED  = 340;   // px/s
const BANK_RATE  = 4.0;   // how quickly bank angle tracks velocity

let plane = { x: 0, y: 0, vx: 0, vy: 0, bank: 0 };

// ---- Sprite loading ---------------------------------------
const planeImg = new Image();
let spriteReady = false;
planeImg.onload  = () => { spriteReady = true; };
planeImg.onerror = () => { /* fallback to canvas drawing */ };
planeImg.src = 'plane.png';

let tunnels = [];
let particles = [];
let stars = [];
let currentQuestion = null;
let lastTime = 0;
let questionAnswered = false;
let feedbackTimer = 0;
let feedbackCorrect = false;
let screenShake = 0;
let comboTimeout = null;

const TUNNEL_RADIUS   = 46;
const TUNNEL_SPEED_BASE = 90;
const TUNNEL_SPEED_INC  = 6;
let tunnelSpeed = TUNNEL_SPEED_BASE;
let correctCount = 0;

// ---- Keyboard input ---------------------------------------
const keys = {};
window.addEventListener('keydown', e => {
  keys[e.key] = true;
  if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key)) e.preventDefault();
});
window.addEventListener('keyup', e => { keys[e.key] = false; });

// ---- Stars ------------------------------------------------
function initStars() {
  stars = [];
  for (let i = 0; i < 130; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.3,
      spd: Math.random() * 0.4 + 0.05,
      alpha: Math.random() * 0.8 + 0.2,
    });
  }
}

// ---- Questions / Tunnels ----------------------------------
function pickQuestion() {
  const pool = activeModes.flatMap(m => VERBES[m] || []);
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function getTense(q) {
  for (const [t, arr] of Object.entries(VERBES)) {
    if (arr.some(item => item === q || (item.answer === q.answer && item.prompt === q.prompt && item.verb === q.verb))) return t;
  }
  return 'present';
}

function spawnTunnels(q) {
  if (!q) return;
  currentQuestion = q;
  questionAnswered = false;
  const options = shuffle([q.answer, ...q.wrong.slice(0, 2)]);
  const colW = canvas.width / 3;
  tunnels = options.map((opt, i) => ({
    x: colW * i + colW / 2,
    y: -TUNNEL_RADIUS - 20,
    label: opt,
    isCorrect: opt === q.answer,
    radius: TUNNEL_RADIUS,
    passed: false,
    tense: getTense(q),
  }));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---- Particles --------------------------------------------
function emitParticles(x, y, correct) {
  const color = correct ? '#5bc8ff' : '#ff4444';
  for (let i = 0; i < 20; i++) {
    const ang = (Math.PI * 2 * i) / 20 + Math.random() * 0.4;
    const spd = Math.random() * 200 + 60;
    particles.push({ x, y, vx: Math.cos(ang)*spd, vy: Math.sin(ang)*spd, r: Math.random()*4+2, color, life: 0.5+Math.random()*0.5, age: 0 });
  }
}

// ---- Start / Game over ------------------------------------
function startGame() {
  score = 0; lives = 3; combo = 0; correctCount = 0;
  tunnelSpeed = TUNNEL_SPEED_BASE;
  tunnels = []; particles = [];
  questionAnswered = false; feedbackTimer = 0; screenShake = 0;

  plane.x = canvas.width / 2;
  plane.y = canvas.height - 80;
  plane.vx = 0; plane.vy = 0; plane.bank = 0;

  initStars();
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('gameOverScreen').style.display = 'none';
  updateHUD();
  state = 'playing';
  spawnTunnels(pickQuestion());
  lastTime = performance.now();
  requestAnimationFrame(loop);
}

function showGameOver() {
  state = 'gameover';
  document.getElementById('gameOverScreen').style.display = 'block';
  document.getElementById('finalScore').textContent = score + ' points';
  let msg = '';
  if (score < 50)       msg = 'Courage, tu vas y arriver !';
  else if (score < 150) msg = 'Pas mal ! Continue de t\'entraîner.';
  else if (score < 300) msg = 'Bien joué ! Tu maîtrises bien les temps.';
  else                  msg = 'Excellent ! Tu es un champion de la conjugaison !';
  document.getElementById('finalMsg').textContent = msg;
}

function updateHUD() {
  document.getElementById('scoreVal').textContent = score;
  let s = '';
  for (let i = 0; i < lives; i++) s += '❤️';
  for (let i = lives; i < 3; i++) s += '🖤';
  document.getElementById('livesVal').textContent = s;
}

// ---- Game loop --------------------------------------------
function loop(ts) {
  if (state !== 'playing') return;
  const dt = Math.min((ts - lastTime) / 1000, 0.1);
  lastTime = ts;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

function update(dt) {
  // ---- Plane movement (keyboard) ----
  const left  = keys['ArrowLeft']  || keys['a'] || keys['A'];
  const right = keys['ArrowRight'] || keys['d'] || keys['D'];
  const up    = keys['ArrowUp']    || keys['w'] || keys['W'];
  const down  = keys['ArrowDown']  || keys['s'] || keys['S'];

  if (left)  plane.vx -= ACCEL * dt;
  else if (right) plane.vx += ACCEL * dt;
  else {
    const friction = DECEL * dt;
    if (Math.abs(plane.vx) <= friction) plane.vx = 0;
    else plane.vx -= Math.sign(plane.vx) * friction;
  }

  if (up)   plane.vy -= ACCEL * dt;
  else if (down) plane.vy += ACCEL * dt;
  else {
    const friction = DECEL * dt;
    if (Math.abs(plane.vy) <= friction) plane.vy = 0;
    else plane.vy -= Math.sign(plane.vy) * friction;
  }

  plane.vx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, plane.vx));
  plane.vy = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, plane.vy));

  plane.x += plane.vx * dt;
  plane.y += plane.vy * dt;

  // Keep within bounds (with some margin)
  plane.x = Math.max(45, Math.min(canvas.width  - 45, plane.x));
  plane.y = Math.max(45, Math.min(canvas.height - 45, plane.y));

  // Bank angle smoothly tracks horizontal velocity
  const targetBank = plane.vx / MAX_SPEED; // -1 .. +1
  plane.bank += (targetBank - plane.bank) * Math.min(1, BANK_RATE * dt);

  // ---- Stars scroll ----
  for (const s of stars) {
    s.y += s.spd * dt * 60;
    if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
  }

  // ---- Screen shake ----
  if (screenShake > 0) screenShake = Math.max(0, screenShake - dt * 220);

  // ---- Feedback timer — spawn next question when done ----
  if (feedbackTimer > 0) {
    feedbackTimer -= dt;
    if (feedbackTimer <= 0) {
      spawnTunnels(pickQuestion()); // resets questionAnswered = false inside
    }
    return; // don't process tunnels during feedback
  }

  // ---- Tunnel movement & collision ----
  if (!questionAnswered) {
    for (const t of tunnels) t.y += tunnelSpeed * dt;

    for (const t of tunnels) {
      if (t.passed) continue;
      if (Math.hypot(plane.x - t.x, plane.y - t.y) < t.radius * 0.82) {
        t.passed = true;
        questionAnswered = true;
        handleAnswer(t);
        break;
      }
    }

    // Missed all tunnels
    if (tunnels.length && tunnels.every(t => t.y > canvas.height + TUNNEL_RADIUS + 10)) {
      questionAnswered = true;
      combo = 0;
      lives--;
      screenShake = 30;
      updateHUD();
      feedbackCorrect = false;
      showMsg('Raté ! ✗', '#ff4444');
      feedbackTimer = 0.9;
      if (lives <= 0) setTimeout(showGameOver, 700);
    }
  }

  // ---- Particles ----
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.age += dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 50 * dt;
    if (p.age >= p.life) particles.splice(i, 1);
  }
}

function handleAnswer(t) {
  emitParticles(t.x, t.y, t.isCorrect);
  if (t.isCorrect) {
    correctCount++;
    combo++;
    score += 10 * Math.min(combo, 5);
    if (correctCount % 5 === 0) tunnelSpeed = Math.min(TUNNEL_SPEED_BASE + TUNNEL_SPEED_INC * (correctCount / 5), 270);
    feedbackCorrect = true;
    if (combo >= 3) showMsg(`Combo ×${combo} ! 🔥`, '#ffd700');
    else            showMsg('Bravo ! ✓', '#5bc8ff');
  } else {
    combo = 0;
    lives--;
    screenShake = 45;
    feedbackCorrect = false;
    showMsg('Faux ! → ' + currentQuestion.answer, '#ff6666');
  }
  updateHUD();
  feedbackTimer = 1.0;
  if (lives <= 0) setTimeout(showGameOver, 750);
}

function showMsg(text, color) {
  const el = document.getElementById('comboDisplay');
  el.textContent = text;
  el.style.color = color;
  el.style.opacity = '1';
  if (comboTimeout) clearTimeout(comboTimeout);
  comboTimeout = setTimeout(() => { el.style.opacity = '0'; }, 1500);
}

// ---- Drawing ----------------------------------------------
function draw() {
  const sx = screenShake > 0 ? (Math.random() - 0.5) * screenShake * 0.5 : 0;
  const sy = screenShake > 0 ? (Math.random() - 0.5) * screenShake * 0.3 : 0;

  ctx.save();
  ctx.translate(sx, sy);

  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bg.addColorStop(0, '#03050e');
  bg.addColorStop(1, '#060c1c');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Stars
  for (const s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,220,255,${s.alpha})`;
    ctx.fill();
  }

  // Tense label at top
  if (currentQuestion) {
    const tense = getTense(currentQuestion);
    ctx.save();
    ctx.font = 'bold 14px Segoe UI';
    ctx.fillStyle = TENSE_COLORS[tense] || '#fff';
    ctx.textAlign = 'center';
    ctx.globalAlpha = 0.75;
    ctx.fillText(TENSE_LABELS[tense].toUpperCase(), canvas.width / 2, 22);
    ctx.restore();
  }

  // Tunnels
  for (const t of tunnels) drawTunnel(t);

  // Particles
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = 1 - p.age / p.life;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Plane
  if (currentQuestion) {
    drawPlane(plane.x, plane.y, plane.bank, plane.vy, currentQuestion.prompt, currentQuestion.verb);
  } else {
    drawPlane(plane.x, plane.y, plane.bank, plane.vy, '', '');
  }

  // Feedback flash overlay
  if (feedbackTimer > 0) {
    const a = Math.min(feedbackTimer * 0.8, 0.28);
    ctx.fillStyle = feedbackCorrect ? `rgba(0,200,100,${a})` : `rgba(255,0,0,${a})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.restore();
}

function drawTunnel(t) {
  const r = t.radius;
  const col = TENSE_COLORS[t.tense] || '#2a9fff';

  // Outer glow halo
  const grd = ctx.createRadialGradient(t.x, t.y, r * 0.4, t.x, t.y, r * 1.5);
  grd.addColorStop(0, 'transparent');
  grd.addColorStop(0.6, col + '18');
  grd.addColorStop(1, 'transparent');
  ctx.beginPath();
  ctx.arc(t.x, t.y, r * 1.5, 0, Math.PI * 2);
  ctx.fillStyle = grd;
  ctx.fill();

  // Perspective rings (depth illusion)
  for (let i = 4; i >= 0; i--) {
    const rr = r - i * 7;
    const alpha = i === 0 ? 1 : 0.25 + i * 0.08;
    ctx.beginPath();
    ctx.ellipse(t.x, t.y, rr, rr * 0.35, 0, 0, Math.PI * 2);
    ctx.strokeStyle = col;
    ctx.lineWidth = i === 0 ? 2.5 : 1;
    ctx.globalAlpha = alpha;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // Dark hole center
  ctx.beginPath();
  ctx.ellipse(t.x, t.y, r * 0.52, r * 0.18, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.75)';
  ctx.fill();

  // Frame pillars
  ctx.save();
  ctx.globalAlpha = 0.45;
  ctx.strokeStyle = col;
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(t.x - r, t.y); ctx.lineTo(t.x - r, t.y - 30); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(t.x + r, t.y); ctx.lineTo(t.x + r, t.y - 30); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(t.x - r, t.y - 30); ctx.lineTo(t.x + r, t.y - 30); ctx.stroke();
  ctx.restore();

  // Label
  const fontSize = t.label.length > 8 ? 12 : t.label.length > 5 ? 14 : 17;
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${fontSize}px Segoe UI`;
  ctx.fillStyle = 'rgba(0,0,0,0.85)';
  ctx.fillText(t.label, t.x + 1, t.y + 1);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(t.label, t.x, t.y);
  ctx.restore();
}

// drawPlane: bank in [-1,+1], prompt/verb for rear panel
function drawPlane(x, y, bank, vy, prompt, verb) {
  ctx.save();
  ctx.translate(x, y);

  // Small directional tilt + horizontal shear for 3D banking illusion
  ctx.rotate(bank * 0.10);
  ctx.transform(1, 0, bank * 0.09, 1, 0, 0);

  if (spriteReady) {
    drawPlaneSprite(bank);
  } else {
    drawPlaneCanvas(bank);
  }

  // Rear panel — always drawn on top of whatever plane graphic is used
  if (prompt) drawRearPanel(prompt, verb);

  ctx.restore();
}

// Draws using the plane.png sprite.
// The image nose points LEFT → rotate +π/2 so it points UP.
// drawW×drawH is the sprite render size; after rotation it appears drawH wide × drawW tall.
function drawPlaneSprite(bank) {
  const drawW = 130, drawH = 65; // → 65px wide, 130px tall in game after rotation
  ctx.save();
  ctx.rotate(Math.PI / 2);
  // Slight horizontal scale for 3D depth perception when banking
  ctx.scale(1, 1 - Math.abs(bank) * 0.12);
  ctx.drawImage(planeImg, -drawW / 2, -drawH / 2, drawW, drawH);
  ctx.restore();
}

// Canvas fallback drawing (used when plane.png is not available)
function drawPlaneCanvas(bank) {
  const speed = Math.hypot(plane.vx, plane.vy);
  const trailLen = 30 + (speed / MAX_SPEED) * 28 + Math.random() * 10;
  for (const side of [-1, 1]) {
    const ox = side * 4;
    const trail = ctx.createLinearGradient(ox, 22, ox, 22 + trailLen);
    trail.addColorStop(0, 'rgba(100,180,255,0.85)');
    trail.addColorStop(0.5, 'rgba(60,120,255,0.4)');
    trail.addColorStop(1, 'transparent');
    ctx.fillStyle = trail;
    ctx.beginPath();
    ctx.moveTo(ox - 3, 22); ctx.lineTo(ox + 3, 22);
    ctx.lineTo(ox + 1, 22 + trailLen); ctx.lineTo(ox - 1, 22 + trailLen);
    ctx.closePath(); ctx.fill();
  }
  const lx = -38 + bank * 8, ly = 16 - bank * 4;
  const rx =  38 + bank * 8, ry = 16 + bank * 4;
  ctx.fillStyle = '#7aaee0';
  ctx.beginPath(); ctx.moveTo(-8,5); ctx.lineTo(lx,ly); ctx.lineTo(lx-5,ly+5); ctx.lineTo(-8,14); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo( 8,5); ctx.lineTo(rx,ry); ctx.lineTo(rx+5,ry+5); ctx.lineTo( 8,14); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#c0d8f5';
  ctx.beginPath(); ctx.moveTo(0,-32); ctx.bezierCurveTo(7,-18,9,0,7,20); ctx.lineTo(-7,20); ctx.bezierCurveTo(-9,0,-7,-18,0,-32); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#6898cc';
  ctx.beginPath(); ctx.moveTo(-5,13); ctx.lineTo(-17,20); ctx.lineTo(-11,22); ctx.lineTo(-5,17); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo( 5,13); ctx.lineTo( 17,20); ctx.lineTo( 11,22); ctx.lineTo( 5,17); ctx.closePath(); ctx.fill();
  const cg = ctx.createRadialGradient(-2,-19,1,0,-17,8);
  cg.addColorStop(0,'rgba(180,230,255,0.95)'); cg.addColorStop(1,'rgba(20,70,160,0.7)');
  ctx.fillStyle = cg;
  ctx.beginPath(); ctx.ellipse(0,-17,5,8,0,0,Math.PI*2); ctx.fill();
}

// Panel at the rear fuselage showing the conjugation prompt
function drawRearPanel(prompt, verb) {
  // When using the sprite: rear is roughly at y=+18 in game space (engine area).
  // When using canvas fallback: rear fuselage is also around y=+8..+18.
  const py = spriteReady ? 12 : 8;
  const pw = 40, ph = 22;

  ctx.fillStyle = 'rgba(0,5,20,0.88)';
  ctx.strokeStyle = '#1a4aaa';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.roundRect(-pw / 2, py - ph / 2, pw, ph, 3);
  ctx.fill();
  ctx.stroke();

  ctx.save();
  ctx.shadowBlur = 8;
  ctx.shadowColor = '#2a6aff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const promptSize = prompt.length > 4 ? 9 : 11;
  ctx.font = `bold ${promptSize}px Segoe UI`;
  ctx.fillStyle = '#5bc8ff';
  ctx.fillText(prompt, 0, py - 4);
  ctx.font = '8px Segoe UI';
  ctx.fillStyle = 'rgba(140,180,220,0.9)';
  ctx.fillText(verb, 0, py + 6);
  ctx.shadowBlur = 0;
  ctx.restore();

  for (const i of [-1, 1]) {
    ctx.beginPath();
    ctx.arc(i * (pw / 2 - 3), py - ph / 2 + 3, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = '#3af';
    ctx.fill();
  }
}

// ---- UI events --------------------------------------------
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    btn.classList.toggle('active');
    if (btn.classList.contains('active')) {
      if (!activeModes.includes(mode)) activeModes.push(mode);
    } else {
      activeModes = activeModes.filter(m => m !== mode);
      if (activeModes.length === 0) { activeModes.push(mode); btn.classList.add('active'); }
    }
  });
});

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('restartBtn').addEventListener('click', () => {
  document.getElementById('gameOverScreen').style.display = 'none';
  startGame();
});
document.getElementById('menuBtn').addEventListener('click', () => {
  state = 'start';
  document.getElementById('gameOverScreen').style.display = 'none';
  document.getElementById('startScreen').style.display = 'block';
});

// ---- Start screen static preview --------------------------
plane.x = canvas.width / 2;
plane.y = canvas.height - 80;
initStars();

(function drawStartBg() {
  if (state !== 'start') return;
  const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bg.addColorStop(0, '#03050e'); bg.addColorStop(1, '#060c1c');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (const s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,220,255,${s.alpha})`;
    ctx.fill();
  }
  drawPlane(canvas.width / 2, canvas.height - 80, 0, 0, 'JE', 'être');
  requestAnimationFrame(drawStartBg);
})();
