// ============================================================
//  ConjuVol — French conjugation airplane game
// ============================================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ---- Resize -----------------------------------------------
function resize() {
  const maxW = Math.min(window.innerWidth - 4, 900);
  const maxH = Math.min(window.innerHeight - 4, 700);
  canvas.width  = maxW;
  canvas.height = maxH;
}
resize();
window.addEventListener('resize', () => { resize(); });

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
    { prompt: "J'",   verb: 'être',    answer: 'AI ÉTÉ',      wrong: ['AS ÉTÉ', 'AVONS ÉTÉ'] },
    { prompt: 'TU',   verb: 'être',    answer: 'AS ÉTÉ',      wrong: ['AI ÉTÉ', 'EST ÉTÉ'] },
    { prompt: 'IL',   verb: 'être',    answer: 'A ÉTÉ',       wrong: ['AS ÉTÉ', 'ONT ÉTÉ'] },
    { prompt: 'NOUS', verb: 'être',    answer: 'AVONS ÉTÉ',   wrong: ['AVEZ ÉTÉ', 'ONT ÉTÉ'] },
    { prompt: 'VOUS', verb: 'être',    answer: 'AVEZ ÉTÉ',    wrong: ['AVONS ÉTÉ', 'ONT ÉTÉ'] },
    { prompt: 'ILS',  verb: 'être',    answer: 'ONT ÉTÉ',     wrong: ['A ÉTÉ', 'AVEZ ÉTÉ'] },

    { prompt: "J'",   verb: 'avoir',   answer: 'AI EU',       wrong: ['AS EU', 'A EU'] },
    { prompt: 'TU',   verb: 'avoir',   answer: 'AS EU',       wrong: ['AI EU', 'A EU'] },
    { prompt: 'IL',   verb: 'avoir',   answer: 'A EU',        wrong: ['AS EU', 'ONT EU'] },
    { prompt: 'NOUS', verb: 'avoir',   answer: 'AVONS EU',    wrong: ['AVEZ EU', 'ONT EU'] },
    { prompt: 'VOUS', verb: 'avoir',   answer: 'AVEZ EU',     wrong: ['AVONS EU', 'ONT EU'] },
    { prompt: 'ILS',  verb: 'avoir',   answer: 'ONT EU',      wrong: ['A EU', 'AVEZ EU'] },

    { prompt: "J'",   verb: 'aller',   answer: 'SUIS ALLÉ',   wrong: ['ES ALLÉ', 'SOMMES ALLÉS'] },
    { prompt: 'TU',   verb: 'aller',   answer: 'ES ALLÉ',     wrong: ['SUIS ALLÉ', 'EST ALLÉ'] },
    { prompt: 'IL',   verb: 'aller',   answer: 'EST ALLÉ',    wrong: ['ES ALLÉ', 'SONT ALLÉS'] },
    { prompt: 'NOUS', verb: 'aller',   answer: 'SOMMES ALLÉS',wrong: ['ÊTES ALLÉS', 'SONT ALLÉS'] },
    { prompt: 'VOUS', verb: 'aller',   answer: 'ÊTES ALLÉS',  wrong: ['SOMMES ALLÉS', 'SONT ALLÉS'] },
    { prompt: 'ILS',  verb: 'aller',   answer: 'SONT ALLÉS',  wrong: ['EST ALLÉ', 'ÊTES ALLÉS'] },

    { prompt: "J'",   verb: 'faire',   answer: 'AI FAIT',     wrong: ['AS FAIT', 'A FAIT'] },
    { prompt: 'TU',   verb: 'faire',   answer: 'AS FAIT',     wrong: ['AI FAIT', 'A FAIT'] },
    { prompt: 'IL',   verb: 'faire',   answer: 'A FAIT',      wrong: ['AS FAIT', 'ONT FAIT'] },
    { prompt: 'NOUS', verb: 'faire',   answer: 'AVONS FAIT',  wrong: ['AVEZ FAIT', 'ONT FAIT'] },
    { prompt: 'VOUS', verb: 'faire',   answer: 'AVEZ FAIT',   wrong: ['AVONS FAIT', 'ONT FAIT'] },
    { prompt: 'ILS',  verb: 'faire',   answer: 'ONT FAIT',    wrong: ['A FAIT', 'AVEZ FAIT'] },
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

    { prompt: "JE",   verb: 'faire',   answer: 'FERAI',    wrong: ['FERAS', 'FERONS'] },
    { prompt: 'TU',   verb: 'faire',   answer: 'FERAS',    wrong: ['FERAI', 'FERA'] },
    { prompt: 'IL',   verb: 'faire',   answer: 'FERA',     wrong: ['FERAS', 'FERONT'] },
    { prompt: 'NOUS', verb: 'faire',   answer: 'FERONS',   wrong: ['FEREZ', 'FERONT'] },
    { prompt: 'VOUS', verb: 'faire',   answer: 'FEREZ',    wrong: ['FERONS', 'FERONT'] },
    { prompt: 'ILS',  verb: 'faire',   answer: 'FERONT',   wrong: ['FERA', 'FEREZ'] },

    { prompt: "JE",   verb: 'pouvoir', answer: 'POURRAI',  wrong: ['POURRAS', 'POURRONS'] },
    { prompt: 'TU',   verb: 'pouvoir', answer: 'POURRAS',  wrong: ['POURRAI', 'POURRA'] },
    { prompt: 'IL',   verb: 'pouvoir', answer: 'POURRA',   wrong: ['POURRAS', 'POURRONT'] },
    { prompt: 'NOUS', verb: 'pouvoir', answer: 'POURRONS', wrong: ['POURREZ', 'POURRONT'] },
    { prompt: 'VOUS', verb: 'pouvoir', answer: 'POURREZ',  wrong: ['POURRONS', 'POURRONT'] },
    { prompt: 'ILS',  verb: 'pouvoir', answer: 'POURRONT', wrong: ['POURRA', 'POURREZ'] },
  ],

  imparfait: [
    { prompt: "J'",   verb: 'être',    answer: 'ÉTAIS',    wrong: ['ÉTAIT', 'ÉTIONS'] },
    { prompt: 'TU',   verb: 'être',    answer: 'ÉTAIS',    wrong: ['ÉTAIT', 'ÉTIEZ'] },
    { prompt: 'IL',   verb: 'être',    answer: 'ÉTAIT',    wrong: ['ÉTAIS', 'ÉTAIENT'] },
    { prompt: 'NOUS', verb: 'être',    answer: 'ÉTIONS',   wrong: ['ÉTIEZ', 'ÉTAIENT'] },
    { prompt: 'VOUS', verb: 'être',    answer: 'ÉTIEZ',    wrong: ['ÉTIONS', 'ÉTAIENT'] },
    { prompt: 'ILS',  verb: 'être',    answer: 'ÉTAIENT',  wrong: ['ÉTAIT', 'ÉTIEZ'] },

    { prompt: "J'",   verb: 'avoir',   answer: 'AVAIS',    wrong: ['AVAIT', 'AVIONS'] },
    { prompt: 'TU',   verb: 'avoir',   answer: 'AVAIS',    wrong: ['AVAIT', 'AVIEZ'] },
    { prompt: 'IL',   verb: 'avoir',   answer: 'AVAIT',    wrong: ['AVAIS', 'AVAIENT'] },
    { prompt: 'NOUS', verb: 'avoir',   answer: 'AVIONS',   wrong: ['AVIEZ', 'AVAIENT'] },
    { prompt: 'VOUS', verb: 'avoir',   answer: 'AVIEZ',    wrong: ['AVIONS', 'AVAIENT'] },
    { prompt: 'ILS',  verb: 'avoir',   answer: 'AVAIENT',  wrong: ['AVAIT', 'AVIEZ'] },

    { prompt: "J'",   verb: 'aller',   answer: 'ALLAIS',   wrong: ['ALLAIT', 'ALLIONS'] },
    { prompt: 'TU',   verb: 'aller',   answer: 'ALLAIS',   wrong: ['ALLAIT', 'ALLIEZ'] },
    { prompt: 'IL',   verb: 'aller',   answer: 'ALLAIT',   wrong: ['ALLAIS', 'ALLAIENT'] },
    { prompt: 'NOUS', verb: 'aller',   answer: 'ALLIONS',  wrong: ['ALLIEZ', 'ALLAIENT'] },
    { prompt: 'VOUS', verb: 'aller',   answer: 'ALLIEZ',   wrong: ['ALLIONS', 'ALLAIENT'] },
    { prompt: 'ILS',  verb: 'aller',   answer: 'ALLAIENT', wrong: ['ALLAIT', 'ALLIEZ'] },

    { prompt: "JE",   verb: 'faire',   answer: 'FAISAIS',  wrong: ['FAISAIT', 'FAISIONS'] },
    { prompt: 'TU',   verb: 'faire',   answer: 'FAISAIS',  wrong: ['FAISAIT', 'FAISIEZ'] },
    { prompt: 'IL',   verb: 'faire',   answer: 'FAISAIT',  wrong: ['FAISAIS', 'FAISAIENT'] },
    { prompt: 'NOUS', verb: 'faire',   answer: 'FAISIONS', wrong: ['FAISIEZ', 'FAISAIENT'] },
    { prompt: 'VOUS', verb: 'faire',   answer: 'FAISIEZ',  wrong: ['FAISIONS', 'FAISAIENT'] },
    { prompt: 'ILS',  verb: 'faire',   answer: 'FAISAIENT',wrong: ['FAISAIT', 'FAISIEZ'] },

    { prompt: "JE",   verb: 'pouvoir', answer: 'POUVAIS',  wrong: ['POUVAIT', 'POUVIONS'] },
    { prompt: 'TU',   verb: 'pouvoir', answer: 'POUVAIS',  wrong: ['POUVAIT', 'POUVIEZ'] },
    { prompt: 'IL',   verb: 'pouvoir', answer: 'POUVAIT',  wrong: ['POUVAIS', 'POUVAIENT'] },
    { prompt: 'NOUS', verb: 'pouvoir', answer: 'POUVIONS', wrong: ['POUVIEZ', 'POUVAIENT'] },
    { prompt: 'VOUS', verb: 'pouvoir', answer: 'POUVIEZ',  wrong: ['POUVIONS', 'POUVAIENT'] },
    { prompt: 'ILS',  verb: 'pouvoir', answer: 'POUVAIENT',wrong: ['POUVAIT', 'POUVIEZ'] },
  ],
};

const TENSE_LABELS = {
  present: 'Présent',
  passe: 'Passé composé',
  futur: 'Futur',
  imparfait: 'Imparfait',
};

const TENSE_COLORS = {
  present:  '#2a9fff',
  passe:    '#aa44ff',
  futur:    '#ff9922',
  imparfait:'#22ddaa',
};

// ---- State ------------------------------------------------
let state = 'start'; // 'start' | 'playing' | 'gameover'
let score = 0;
let lives = 3;
let combo = 0;
let activeModes = ['present', 'passe', 'futur', 'imparfait'];

let plane = { x: 0, y: 0, targetX: 0, targetY: 0, angle: 0 };
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

// ---- Stars background ------------------------------------
function initStars() {
  stars = [];
  for (let i = 0; i < 120; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      spd: Math.random() * 0.3 + 0.05,
      alpha: Math.random() * 0.8 + 0.2,
    });
  }
}

// ---- Question / Tunnel management -----------------------
const TUNNEL_RADIUS = 46;
const TUNNEL_SPEED_BASE = 90; // px/s
const TUNNEL_SPEED_INC = 4;   // added every 5 correct answers
let tunnelSpeed = TUNNEL_SPEED_BASE;
let correctCount = 0;

function pickQuestion() {
  const pool = activeModes.flatMap(m => VERBES[m] || []);
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function getTenseOfQuestion(q) {
  for (const [tense, arr] of Object.entries(VERBES)) {
    if (arr.includes(q)) return tense;
  }
  // fallback: find by answer
  for (const [tense, arr] of Object.entries(VERBES)) {
    const found = arr.find(item => item.answer === q.answer && item.prompt === q.prompt && item.verb === q.verb);
    if (found) return tense;
  }
  return 'present';
}

function spawnTunnels(q) {
  currentQuestion = q;
  questionAnswered = false;
  const options = shuffle([q.answer, ...q.wrong.slice(0, 2)]);
  const cols = 3;
  const colW = canvas.width / cols;
  tunnels = options.map((opt, i) => ({
    x: colW * i + colW / 2,
    y: -TUNNEL_RADIUS - 20,
    label: opt,
    isCorrect: opt === q.answer,
    radius: TUNNEL_RADIUS,
    passed: false,
    tense: getTenseOfQuestion(q),
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

// ---- Particles -------------------------------------------
function emitParticles(x, y, correct) {
  const color = correct ? '#5bc8ff' : '#ff4444';
  for (let i = 0; i < 18; i++) {
    const angle = (Math.PI * 2 * i) / 18 + Math.random() * 0.5;
    const spd = Math.random() * 180 + 60;
    particles.push({
      x, y,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd,
      alpha: 1,
      r: Math.random() * 4 + 2,
      color,
      life: 0.6 + Math.random() * 0.4,
      age: 0,
    });
  }
}

// ---- Init game -------------------------------------------
function startGame() {
  score = 0;
  lives = 3;
  combo = 0;
  correctCount = 0;
  tunnelSpeed = TUNNEL_SPEED_BASE;
  tunnels = [];
  particles = [];
  questionAnswered = false;
  feedbackTimer = 0;
  screenShake = 0;

  plane.x = canvas.width / 2;
  plane.y = canvas.height - 80;
  plane.targetX = plane.x;
  plane.targetY = plane.y;
  plane.angle = 0;

  initStars();
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('gameOverScreen').style.display = 'none';
  updateHUD();

  state = 'playing';
  spawnTunnels(pickQuestion());
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
  else                  msg = '🏆 Excellent ! Tu es un champion de la conjugaison !';
  document.getElementById('finalMsg').textContent = msg;
}

function updateHUD() {
  document.getElementById('scoreVal').textContent = score;
  let livesStr = '';
  for (let i = 0; i < lives; i++) livesStr += '❤️';
  for (let i = lives; i < 3; i++) livesStr += '🖤';
  document.getElementById('livesVal').textContent = livesStr;
}

// ---- Main loop -------------------------------------------
function loop(ts) {
  if (state !== 'playing') return;
  const dt = Math.min((ts - lastTime) / 1000, 0.1);
  lastTime = ts;

  update(dt);
  draw();
  requestAnimationFrame(loop);
}

function update(dt) {
  // Move plane smoothly toward mouse/touch
  const lerpFactor = 1 - Math.pow(0.02, dt);
  plane.x += (plane.targetX - plane.x) * lerpFactor;
  plane.y += (plane.targetY - plane.y) * lerpFactor;
  const dx = plane.targetX - plane.x;
  plane.angle = dx * 0.012;

  // Move stars
  for (const s of stars) {
    s.y += s.spd * dt * 60;
    if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
  }

  // Screen shake
  if (screenShake > 0) screenShake = Math.max(0, screenShake - dt * 200);

  // Feedback timer
  if (feedbackTimer > 0) {
    feedbackTimer -= dt;
    if (feedbackTimer <= 0 && !questionAnswered) {
      // Next question
      spawnTunnels(pickQuestion());
    }
  }

  // Move tunnels
  if (!questionAnswered) {
    for (const t of tunnels) {
      t.y += tunnelSpeed * dt;
    }

    // Check collision
    for (const t of tunnels) {
      if (t.passed) continue;
      const dist = Math.hypot(plane.x - t.x, plane.y - t.y);
      if (dist < t.radius * 0.85) {
        t.passed = true;
        questionAnswered = true;
        handleAnswer(t);
        break;
      }
    }

    // Tunnels passed bottom without answer
    if (tunnels.length && tunnels.every(t => t.y > canvas.height + TUNNEL_RADIUS + 10) && !questionAnswered) {
      questionAnswered = true;
      lives--;
      combo = 0;
      screenShake = 30;
      updateHUD();
      if (lives <= 0) { setTimeout(showGameOver, 600); return; }
      feedbackTimer = 0.8;
      feedbackCorrect = false;
      showCombo('Raté ! ✗', '#ff4444');
    }
  }

  // Particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.age += dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 60 * dt;
    p.alpha = 1 - p.age / p.life;
    if (p.age >= p.life) particles.splice(i, 1);
  }
}

function handleAnswer(tunnel) {
  emitParticles(tunnel.x, tunnel.y, tunnel.isCorrect);
  if (tunnel.isCorrect) {
    correctCount++;
    combo++;
    const points = 10 * Math.min(combo, 5);
    score += points;
    if (correctCount % 5 === 0) tunnelSpeed = Math.min(TUNNEL_SPEED_BASE + TUNNEL_SPEED_INC * (correctCount / 5), 260);
    feedbackCorrect = true;
    if (combo >= 3) showCombo(`Combo ×${combo} ! 🔥`, '#ffd700');
    else showCombo('Bravo ! ✓', '#5bc8ff');
  } else {
    combo = 0;
    lives--;
    screenShake = 40;
    feedbackCorrect = false;
    showCombo('Faux ! ✗ → ' + currentQuestion.answer, '#ff6666');
  }
  updateHUD();
  feedbackTimer = 1.0;
  if (lives <= 0) { setTimeout(showGameOver, 700); }
}

function showCombo(text, color) {
  const el = document.getElementById('comboDisplay');
  el.textContent = text;
  el.style.color = color;
  el.style.opacity = '1';
  if (comboTimeout) clearTimeout(comboTimeout);
  comboTimeout = setTimeout(() => { el.style.opacity = '0'; }, 1400);
}

// ---- Drawing ---------------------------------------------
function draw() {
  const shakeX = screenShake > 0 ? (Math.random() - 0.5) * screenShake * 0.5 : 0;
  const shakeY = screenShake > 0 ? (Math.random() - 0.5) * screenShake * 0.3 : 0;

  ctx.save();
  ctx.translate(shakeX, shakeY);

  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bg.addColorStop(0, '#04060f');
  bg.addColorStop(1, '#080d1e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Stars
  for (const s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,220,255,${s.alpha})`;
    ctx.fill();
  }

  // Draw question label (top center)
  if (currentQuestion) {
    const tense = getTenseOfQuestion(currentQuestion);
    const tenseColor = TENSE_COLORS[tense] || '#fff';
    ctx.save();
    ctx.font = 'bold 14px Segoe UI';
    ctx.fillStyle = tenseColor;
    ctx.textAlign = 'center';
    ctx.globalAlpha = 0.8;
    ctx.fillText(TENSE_LABELS[tense].toUpperCase(), canvas.width / 2, 22);
    ctx.restore();
  }

  // Tunnels
  for (const t of tunnels) {
    drawTunnel(t);
  }

  // Particles
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Plane
  drawPlane(plane.x, plane.y, plane.angle);

  // Plane screen prompt
  if (currentQuestion) {
    drawPromptScreen(plane.x, plane.y, currentQuestion.prompt, currentQuestion.verb);
  }

  // Feedback flash
  if (feedbackTimer > 0) {
    const alpha = Math.min(feedbackTimer, 0.3) * (feedbackCorrect ? 0.5 : 0.8);
    ctx.fillStyle = feedbackCorrect ? `rgba(0,200,100,${alpha})` : `rgba(255,0,0,${alpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.restore();
}

function drawTunnel(t) {
  const r = t.radius;
  const tenseColor = TENSE_COLORS[t.tense] || '#2a9fff';

  // Outer ring glow
  const grd = ctx.createRadialGradient(t.x, t.y, r * 0.5, t.x, t.y, r * 1.3);
  grd.addColorStop(0, 'transparent');
  grd.addColorStop(0.7, tenseColor + '22');
  grd.addColorStop(1, 'transparent');
  ctx.beginPath();
  ctx.arc(t.x, t.y, r * 1.3, 0, Math.PI * 2);
  ctx.fillStyle = grd;
  ctx.fill();

  // Tunnel body (perspective rings)
  for (let i = 3; i >= 0; i--) {
    const rr = r - i * 8;
    ctx.beginPath();
    ctx.ellipse(t.x, t.y, rr, rr * 0.38, 0, 0, Math.PI * 2);
    ctx.strokeStyle = i === 0 ? tenseColor : tenseColor + '44';
    ctx.lineWidth = i === 0 ? 3 : 1.5;
    ctx.stroke();
  }

  // Inner dark hole
  ctx.beginPath();
  ctx.ellipse(t.x, t.y, r * 0.55, r * 0.2, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fill();

  // Side pillars of tunnel
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = tenseColor;
  ctx.lineWidth = 2;
  // left bar
  ctx.beginPath(); ctx.moveTo(t.x - r, t.y); ctx.lineTo(t.x - r, t.y - 28); ctx.stroke();
  // right bar
  ctx.beginPath(); ctx.moveTo(t.x + r, t.y); ctx.lineTo(t.x + r, t.y - 28); ctx.stroke();
  // top connector
  ctx.beginPath(); ctx.moveTo(t.x - r, t.y - 28); ctx.lineTo(t.x + r, t.y - 28); ctx.stroke();
  ctx.restore();

  // Label
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const fontSize = t.label.length > 8 ? 13 : t.label.length > 5 ? 15 : 18;
  ctx.font = `bold ${fontSize}px Segoe UI`;
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.9)';
  ctx.fillText(t.label, t.x + 1, t.y + 1);
  // Main text
  ctx.fillStyle = '#ffffff';
  ctx.fillText(t.label, t.x, t.y);
  ctx.restore();
}

function drawPlane(x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // Engine glow
  const engineGlow = ctx.createRadialGradient(0, 30, 2, 0, 30, 20);
  engineGlow.addColorStop(0, 'rgba(100,180,255,0.9)');
  engineGlow.addColorStop(0.4, 'rgba(50,100,255,0.4)');
  engineGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = engineGlow;
  ctx.beginPath();
  ctx.arc(0, 28, 18, 0, Math.PI * 2);
  ctx.fill();

  // Jet trail
  const trailH = 35 + Math.random() * 15;
  const trail = ctx.createLinearGradient(0, 20, 0, 20 + trailH);
  trail.addColorStop(0, 'rgba(120,200,255,0.8)');
  trail.addColorStop(1, 'rgba(50,100,255,0)');
  ctx.fillStyle = trail;
  ctx.beginPath();
  ctx.moveTo(-6, 22);
  ctx.lineTo(6, 22);
  ctx.lineTo(3, 20 + trailH);
  ctx.lineTo(-3, 20 + trailH);
  ctx.closePath();
  ctx.fill();

  // Fuselage
  ctx.fillStyle = '#c8ddf8';
  ctx.beginPath();
  ctx.moveTo(0, -32);   // nose
  ctx.bezierCurveTo(8, -18, 10, 0, 8, 22);
  ctx.lineTo(-8, 22);
  ctx.bezierCurveTo(-10, 0, -8, -18, 0, -32);
  ctx.closePath();
  ctx.fill();

  // Fuselage shade
  const fShade = ctx.createLinearGradient(-10, 0, 10, 0);
  fShade.addColorStop(0, 'rgba(0,0,80,0.3)');
  fShade.addColorStop(0.5, 'rgba(255,255,255,0.15)');
  fShade.addColorStop(1, 'rgba(0,0,80,0.3)');
  ctx.fillStyle = fShade;
  ctx.beginPath();
  ctx.moveTo(0, -32);
  ctx.bezierCurveTo(8, -18, 10, 0, 8, 22);
  ctx.lineTo(-8, 22);
  ctx.bezierCurveTo(-10, 0, -8, -18, 0, -32);
  ctx.closePath();
  ctx.fill();

  // Wings
  ctx.fillStyle = '#8ab4e0';
  // Left wing
  ctx.beginPath();
  ctx.moveTo(-8, 4);
  ctx.lineTo(-36, 18);
  ctx.lineTo(-30, 24);
  ctx.lineTo(-8, 14);
  ctx.closePath();
  ctx.fill();
  // Right wing
  ctx.beginPath();
  ctx.moveTo(8, 4);
  ctx.lineTo(36, 18);
  ctx.lineTo(30, 24);
  ctx.lineTo(8, 14);
  ctx.closePath();
  ctx.fill();

  // Wing highlights
  ctx.fillStyle = 'rgba(200,230,255,0.3)';
  ctx.beginPath();
  ctx.moveTo(-8, 5);
  ctx.lineTo(-34, 17);
  ctx.lineTo(-32, 16);
  ctx.lineTo(-8, 6);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(8, 5);
  ctx.lineTo(34, 17);
  ctx.lineTo(32, 16);
  ctx.lineTo(8, 6);
  ctx.closePath();
  ctx.fill();

  // Tail fins
  ctx.fillStyle = '#7aa4d0';
  // Left tail
  ctx.beginPath();
  ctx.moveTo(-5, 14);
  ctx.lineTo(-18, 22);
  ctx.lineTo(-12, 24);
  ctx.lineTo(-5, 18);
  ctx.closePath();
  ctx.fill();
  // Right tail
  ctx.beginPath();
  ctx.moveTo(5, 14);
  ctx.lineTo(18, 22);
  ctx.lineTo(12, 24);
  ctx.lineTo(5, 18);
  ctx.closePath();
  ctx.fill();

  // Cockpit glass
  const cockpitGrad = ctx.createRadialGradient(-2, -18, 1, 0, -16, 8);
  cockpitGrad.addColorStop(0, 'rgba(180,230,255,0.95)');
  cockpitGrad.addColorStop(1, 'rgba(30,80,160,0.7)');
  ctx.fillStyle = cockpitGrad;
  ctx.beginPath();
  ctx.ellipse(0, -16, 5.5, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(100,180,255,0.6)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.restore();
}

function drawPromptScreen(x, y, prompt, verb) {
  // Screen on top of the plane showing pronoun + verb name
  ctx.save();
  ctx.translate(x, y - 48);

  // Screen background
  const sw = 72, sh = 28;
  ctx.fillStyle = 'rgba(0,10,30,0.85)';
  ctx.strokeStyle = '#2a7aff';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(-sw / 2, -sh / 2, sw, sh, 6);
  ctx.fill();
  ctx.stroke();

  // Screen glow
  ctx.shadowBlur = 10;
  ctx.shadowColor = '#2a7aff';

  // Prompt text (pronoun)
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 13px Segoe UI';
  ctx.fillStyle = '#5bc8ff';
  ctx.fillText(prompt, 0, -5);

  // Verb name
  ctx.font = '10px Segoe UI';
  ctx.fillStyle = '#88aacc';
  ctx.fillText(verb, 0, 8);

  ctx.shadowBlur = 0;
  ctx.restore();
}

// ---- Input -----------------------------------------------
function handlePointerMove(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  plane.targetX = (clientX - rect.left) * scaleX;
  plane.targetY = (clientY - rect.top) * scaleY;
}

canvas.addEventListener('mousemove', e => handlePointerMove(e.clientX, e.clientY));
canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: false });

// ---- UI --------------------------------------------------
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    btn.classList.toggle('active');
    if (btn.classList.contains('active')) {
      if (!activeModes.includes(mode)) activeModes.push(mode);
    } else {
      activeModes = activeModes.filter(m => m !== mode);
      // Ensure at least one active
      if (activeModes.length === 0) {
        activeModes.push(mode);
        btn.classList.add('active');
      }
    }
  });
});

document.getElementById('startBtn').addEventListener('click', () => {
  lastTime = performance.now();
  startGame();
});

document.getElementById('restartBtn').addEventListener('click', () => {
  document.getElementById('gameOverScreen').style.display = 'none';
  lastTime = performance.now();
  startGame();
});

document.getElementById('menuBtn').addEventListener('click', () => {
  state = 'start';
  document.getElementById('gameOverScreen').style.display = 'none';
  document.getElementById('startScreen').style.display = 'block';
});

// Center plane at start
plane.x = canvas.width / 2;
plane.y = canvas.height - 80;
plane.targetX = plane.x;
plane.targetY = plane.y;
initStars();

// Draw a static background while on start screen
(function drawStartBg() {
  if (state !== 'start') return;
  const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bg.addColorStop(0, '#04060f');
  bg.addColorStop(1, '#080d1e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (const s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,220,255,${s.alpha})`;
    ctx.fill();
  }
  drawPlane(canvas.width / 2, canvas.height - 80, 0);
  drawPromptScreen(canvas.width / 2, canvas.height - 80, 'JE', 'être');
  requestAnimationFrame(drawStartBg);
})();
