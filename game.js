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
let state = 'intro';
let score = 0;
let lives = 3;
let combo = 0;
let activeModes = ['present', 'passe', 'futur', 'imparfait'];

// ---- Missions mode ----------------------------------------
const MISSIONS = [
  { tense: 'present',   name: 'Le Présent',       desc: 'Gary est en mission de reconnaissance au-dessus de la nébuleuse Sigma. Prouve que tu maîtrises le présent pour maintenir le cap !' },
  { tense: 'passe',     name: 'Le Passé composé',  desc: "L'escadron a traversé la zone de danger. Raconte les événements passés au passé composé pour débriefing !" },
  { tense: 'futur',     name: 'Le Futur',          desc: "La grande bataille approche. Gary doit anticiper chaque manœuvre. Conjugue au futur pour préparer l'assaut !" },
  { tense: 'imparfait', name: "L'Imparfait",       desc: "Les anciens pilotes se souviennent... Maîtrise l'imparfait pour honorer la mémoire de l'escadron !" },
];
const MISSION_TARGET = 5;
let gameMode = 'libre';
let missionIndex = 0;
let missionCorrect = 0;

// Plane physics
const MAX_SPEED   = 340;   // px/s (clamp pour le calcul de bank/effets)
const BANK_RATE   = 4.0;   // how quickly bank angle tracks velocity
const FOLLOW_SPEED = 9;    // vitesse de suivi du curseur (lerp)

let plane = { x: 0, y: 0, vx: 0, vy: 0, bank: 0 };

// ---- Sprite loading + background removal ------------------
let processedSprite = null; // HTMLCanvasElement après traitement
let spriteReady = false;

// Supprime le fond (uni ou en damier) par flood-fill 8-connecté depuis les coins.
// Robuste face aux damiers car la connectivité diagonale traverse les deux couleurs.
function processSprite(img) {
  const oc = document.createElement('canvas');
  oc.width = img.naturalWidth;
  oc.height = img.naturalHeight;
  const octx = oc.getContext('2d');
  octx.drawImage(img, 0, 0);
  try {
    const w = oc.width, h = oc.height;
    const data = octx.getImageData(0, 0, w, h);
    const px = data.data;

    // Si au moins un coin est déjà transparent → vraie transparence PNG, rien à faire
    const cornerIdx = [0, (w-1)*4, (h-1)*w*4, ((h-1)*w+w-1)*4];
    if (cornerIdx.some(i => px[i+3] < 128)) return oc;

    // Échantillonner les couleurs de fond : 4 coins + milieux des 4 bords
    // → capture les deux couleurs d'un damier
    const samples = [[0,0],[w-1,0],[0,h-1],[w-1,h-1],
                     [w>>1,0],[0,h>>1],[w-1,h>>1],[w>>1,h-1]];
    const bgCols = samples.map(([x,y]) => {
      const i = (y*w+x)*4;
      return [px[i], px[i+1], px[i+2]];
    });
    const T = 60 * 60; // tolérance par composante²

    function isBg(i) {
      if (px[i+3] < 10) return true;
      const r=px[i], g=px[i+1], b=px[i+2];
      return bgCols.some(([br,bg_,bb]) => {
        const dr=r-br, dg=g-bg_, db=b-bb;
        return dr*dr + dg*dg + db*db < T;
      });
    }

    // Flood-fill 8-connecté (les diagonales permettent de traverser le damier)
    const visited = new Uint8Array(w * h);
    const stack = [0, w-1, w*(h-1), w*h-1]; // index de pixel (pas byte)
    while (stack.length) {
      const pi = stack.pop();
      if (visited[pi]) continue;
      visited[pi] = 1;
      if (!isBg(pi * 4)) continue;
      px[pi*4 + 3] = 0;
      const x = pi % w, y = (pi / w) | 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const nx = x+dx, ny = y+dy;
          if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
            const npi = ny*w+nx;
            if (!visited[npi]) stack.push(npi);
          }
        }
      }
    }
    octx.putImageData(data, 0, 0);
  } catch(e) {}
  return oc;
}

function loadSprite(src, bustCache) {
  spriteReady = false;
  processedSprite = null;
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    processedSprite = processSprite(img);
    spriteReady = true;
    document.getElementById('imgLoader').style.display = 'none';
  };
  img.onerror = () => { document.getElementById('imgLoader').style.display = 'block'; };
  img.src = src;
}

// Try localStorage first, then the file
const savedSprite = localStorage.getItem('conjuvol_plane');
loadSprite(savedSprite || 'plane.png');

// File picker: user selects image → saved to localStorage
document.getElementById('imgInput').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    localStorage.setItem('conjuvol_plane', ev.target.result);
    loadSprite(ev.target.result);
  };
  reader.readAsDataURL(file);
});

// ---- Menu background image --------------------------------
let menuBgImage = null;

function loadMenuBg(src) {
  const img = new Image();
  img.onload = () => { menuBgImage = img; };
  img.src = src;
}

const savedMenuBg = localStorage.getItem('spacetempas_menu_bg');
if (savedMenuBg) loadMenuBg(savedMenuBg);
else loadMenuBg('menu.png');

document.getElementById('menuBgInput').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    localStorage.setItem('spacetempas_menu_bg', ev.target.result);
    loadMenuBg(ev.target.result);
  };
  reader.readAsDataURL(file);
});

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
const METEOR_SPAWN_MIN = 3;   // secondes
const METEOR_SPAWN_MAX = 6;
let tunnelSpeed = TUNNEL_SPEED_BASE;
let correctCount = 0;
let animTime = 0; // continuous timer for animations (seconds)

// ---- Keyboard input ---------------------------------------
const keys = {};
window.addEventListener('keydown', e => {
  keys[e.key] = true;
  if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key)) e.preventDefault();
});
window.addEventListener('keyup', e => { keys[e.key] = false; });

// ---- Mouse input (pilotage + canon) ------------------------
const mouse = { x: 0, y: 0, down: false };
function updateMouseFromEvent(e) {
  const rect = canvas.getBoundingClientRect();
  mouse.x = (e.clientX - rect.left) * (canvas.width / rect.width);
  mouse.y = (e.clientY - rect.top) * (canvas.height / rect.height);
}
canvas.addEventListener('mousemove', updateMouseFromEvent);
canvas.addEventListener('mousedown', e => {
  if (e.button === 0) {
    updateMouseFromEvent(e);
    mouse.down = true;
    fireCannon();
  }
});
window.addEventListener('mouseup', e => { if (e.button === 0) mouse.down = false; });
canvas.addEventListener('contextmenu', e => e.preventDefault());

let projectiles = [];
let meteors = [];
let fireCooldown = 0;
let meteorTimer = 3;

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
  tunnels = options.map((opt, i) => {
    const jitter = (Math.random() - 0.5) * colW * 0.5;
    let x = colW * i + colW / 2 + jitter;
    x = Math.max(TUNNEL_RADIUS + 5, Math.min(canvas.width - TUNNEL_RADIUS - 5, x));
    return {
    x,
    y: -TUNNEL_RADIUS - 20,
    label: opt,
    isCorrect: opt === q.answer,
    radius: TUNNEL_RADIUS,
    passed: false,
    tense: getTense(q),
  };
  });
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
function hideAllScreens() {
  ['introScreen','startScreen','missionBriefingScreen','missionCompleteScreen','victoryScreen','gameOverScreen']
    .forEach(id => { document.getElementById(id).style.display = 'none'; });
}

function showIntro() {
  state = 'intro';
  hideAllScreens();
  document.getElementById('introScreen').style.display = '';
  drawStartBg();
}

function showMissionBriefing(index) {
  missionIndex = index;
  const m = MISSIONS[index];
  state = 'briefing';
  hideAllScreens();
  document.getElementById('missionNumber').textContent = `Mission ${index + 1} / ${MISSIONS.length}`;
  document.getElementById('missionName').textContent = m.name;
  document.getElementById('missionDesc').textContent = m.desc;
  document.getElementById('missionBriefingScreen').style.display = '';
}

function startGame() {
  score = 0; lives = 3; combo = 0; correctCount = 0; missionCorrect = 0;
  tunnelSpeed = TUNNEL_SPEED_BASE;
  tunnels = []; particles = []; meteors = []; projectiles = [];
  fireCooldown = 0;
  meteorTimer = METEOR_SPAWN_MIN + Math.random() * (METEOR_SPAWN_MAX - METEOR_SPAWN_MIN);
  questionAnswered = false; feedbackTimer = 0; screenShake = 0;

  plane.x = canvas.width / 2;
  plane.y = canvas.height - 80;
  mouse.x = plane.x; mouse.y = plane.y;
  plane.vx = 0; plane.vy = 0; plane.bank = 0;

  if (gameMode === 'missions') {
    activeModes = [MISSIONS[missionIndex].tense];
  }

  initStars();
  hideAllScreens();
  updateHUD();
  state = 'playing';
  spawnTunnels(pickQuestion());
  lastTime = performance.now();
  requestAnimationFrame(loop);
}

function showGameOver() {
  state = 'gameover';
  hideAllScreens();
  document.getElementById('gameOverScreen').style.display = 'block';
  document.getElementById('finalScore').textContent = score + ' points';
  let msg = '';
  if (score < 50)       msg = 'Courage, tu vas y arriver !';
  else if (score < 150) msg = 'Pas mal ! Continue de t\'entraîner.';
  else if (score < 300) msg = 'Bien joué ! Tu maîtrises bien les temps.';
  else                  msg = 'Excellent ! Tu es un champion de la conjugaison !';
  document.getElementById('finalMsg').textContent = msg;
}

function showMissionComplete() {
  state = 'missionComplete';
  hideAllScreens();
  const nextIndex = missionIndex + 1;
  const isLast = nextIndex >= MISSIONS.length;
  document.getElementById('missionStars').textContent = lives >= 3 ? '⭐⭐⭐' : lives === 2 ? '⭐⭐' : '⭐';
  document.getElementById('missionCompleteMsg').textContent = isLast
    ? 'Tu as terminé toutes les missions !'
    : `Prochaine mission : ${MISSIONS[nextIndex].name}`;
  const btn = document.getElementById('nextMissionBtn');
  btn.textContent = isLast ? '🏆 Victoire !' : 'Mission suivante →';
  btn.onclick = () => {
    if (isLast) showVictory();
    else showMissionBriefing(nextIndex);
  };
  document.getElementById('missionCompleteScreen').style.display = '';
}

function showVictory() {
  state = 'victory';
  hideAllScreens();
  document.getElementById('finalScoreVictory').textContent = score + ' points';
  document.getElementById('victoryScreen').style.display = '';
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
  animTime += dt;
  // ---- Plane movement (souris) ----
  // L'avion suit le curseur avec un lissage (lerp), la vitesse résultante
  // sert au calcul de l'inclinaison (bank) et des effets visuels.
  const targetX = Math.max(45, Math.min(canvas.width  - 45, mouse.x));
  const targetY = Math.max(45, Math.min(canvas.height - 45, mouse.y));
  const followRate = Math.min(1, FOLLOW_SPEED * dt);

  const prevX = plane.x, prevY = plane.y;
  plane.x += (targetX - plane.x) * followRate;
  plane.y += (targetY - plane.y) * followRate;

  plane.vx = (plane.x - prevX) / dt;
  plane.vy = (plane.y - prevY) / dt;
  plane.vx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, plane.vx));
  plane.vy = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, plane.vy));

  // Bank angle smoothly tracks horizontal velocity
  const targetBank = plane.vx / MAX_SPEED; // -1 .. +1
  plane.bank += (targetBank - plane.bank) * Math.min(1, BANK_RATE * dt);

  // ---- Canon : tir continu si bouton maintenu ----
  if (fireCooldown > 0) fireCooldown -= dt;
  if (mouse.down) fireCannon();

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
      spawnTunnels(pickQuestion());
    }
  }

  // ---- Tunnel movement (toujours actif) ----
  for (const t of tunnels) t.y += tunnelSpeed * dt;

  // ---- Collision (seulement si question pas encore répondue) ----
  if (!questionAnswered) {
    for (const t of tunnels) {
      if (t.passed) continue;
      if (Math.hypot(plane.x - t.x, plane.y - t.y) < t.radius * 0.82) {
        t.passed = true;
        questionAnswered = true;
        handleAnswer(t);
        break;
      }
    }

    // Tunnels manqués
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

  // ---- Météorites ----
  meteorTimer -= dt;
  if (meteorTimer <= 0) {
    spawnMeteor();
    meteorTimer = METEOR_SPAWN_MIN + Math.random() * (METEOR_SPAWN_MAX - METEOR_SPAWN_MIN);
  }
  for (let i = meteors.length - 1; i >= 0; i--) {
    const m = meteors[i];
    m.y += m.vy * dt;
    m.rot += m.rotSpeed * dt;
    if (m.y > canvas.height + m.r + 20) { meteors.splice(i, 1); continue; }

    // Collision avec l'avion
    if (Math.hypot(plane.x - m.x, plane.y - m.y) < m.r * 0.8 + 16) {
      emitParticles(m.x, m.y, false);
      meteors.splice(i, 1);
      combo = 0;
      lives--;
      screenShake = 40;
      updateHUD();
      showMsg('Météorite ! 💥', '#ff6666');
      if (lives <= 0) setTimeout(showGameOver, 750);
    }
  }

  // ---- Projectiles du canon ----
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const p = projectiles[i];
    p.y += p.vy * dt;
    if (p.y < -20) { projectiles.splice(i, 1); continue; }
    for (let j = meteors.length - 1; j >= 0; j--) {
      const m = meteors[j];
      if (Math.hypot(p.x - m.x, p.y - m.y) < m.r) {
        emitParticles(m.x, m.y, true);
        meteors.splice(j, 1);
        projectiles.splice(i, 1);
        score += 5;
        updateHUD();
        break;
      }
    }
  }
}

function fireCannon() {
  if (fireCooldown > 0 || state !== 'playing') return;
  fireCooldown = 0.18;
  projectiles.push({ x: plane.x, y: plane.y - 32, vy: -700 });
}

function spawnMeteor() {
  const r = 16 + Math.random() * 16;
  meteors.push({
    x: r + Math.random() * (canvas.width - 2 * r),
    y: -r - 10,
    r,
    vy: tunnelSpeed * (0.8 + Math.random() * 0.5),
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 2,
  });
}

function handleAnswer(t) {
  emitParticles(t.x, t.y, t.isCorrect);
  if (t.isCorrect) {
    correctCount++;
    missionCorrect++;
    combo++;
    score += 10 * Math.min(combo, 5);
    if (correctCount % 5 === 0) tunnelSpeed = Math.min(TUNNEL_SPEED_BASE + TUNNEL_SPEED_INC * (correctCount / 5), 270);
    feedbackCorrect = true;
    if (combo >= 3) showMsg(`Combo ×${combo} ! 🔥`, '#ffd700');
    else            showMsg('Bravo ! ✓', '#5bc8ff');
    if (gameMode === 'missions' && missionCorrect >= MISSION_TARGET) {
      setTimeout(showMissionComplete, 800);
      return;
    }
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

  // Météorites
  for (const m of meteors) drawMeteor(m);

  // Projectiles du canon
  for (const p of projectiles) drawProjectile(p);

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

function drawMeteor(m) {
  ctx.save();
  ctx.translate(m.x, m.y);
  ctx.rotate(m.rot);
  const grad = ctx.createRadialGradient(-m.r * 0.3, -m.r * 0.3, m.r * 0.1, 0, 0, m.r);
  grad.addColorStop(0, '#a8988a');
  grad.addColorStop(1, '#4a3a2e');
  ctx.beginPath();
  ctx.arc(0, 0, m.r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  // Cratères
  ctx.fillStyle = 'rgba(30,20,15,0.5)';
  ctx.beginPath(); ctx.arc(m.r * 0.32, m.r * 0.18, m.r * 0.22, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(-m.r * 0.35, -m.r * 0.18, m.r * 0.16, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(m.r * 0.05, -m.r * 0.42, m.r * 0.13, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function drawProjectile(p) {
  const grad = ctx.createLinearGradient(p.x, p.y - 14, p.x, p.y + 14);
  grad.addColorStop(0,   'rgba(255,255,255,0)');
  grad.addColorStop(0.5, 'rgba(120,220,255,0.95)');
  grad.addColorStop(1,   'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(p.x - 2, p.y - 14, 4, 28);
  ctx.beginPath();
  ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(200,240,255,0.9)';
  ctx.fill();
}

function drawTunnel(t) {
  const r = t.radius;
  const col = TENSE_COLORS[t.tense] || '#2a9fff';
  const cr = parseInt(col.slice(1,3), 16);
  const cg = parseInt(col.slice(3,5), 16);
  const cb = parseInt(col.slice(5,7), 16);
  const pulse = 0.88 + 0.12 * Math.sin(animTime * 4.2 + t.x * 0.03);

  // Vue légèrement de dessus : anneaux elliptiques qui rétrécissent et remontent
  const NRINGS = 4;
  const vScale = 0.36;  // compression verticale (perspective)
  const yShift = 9;     // px dont chaque anneau plus profond remonte
  const rStep  = 0.22;  // réduction de rayon par niveau de profondeur

  // d=0 = anneau avant (le plus grand), d=3 = anneau arrière (le plus petit)
  const rings = Array.from({length: NRINGS}, (_, d) => {
    const s = (1 - d * rStep) * pulse;
    return { rx: r * s, ry: r * s * vScale, cx: t.x, cy: t.y - d * yShift };
  });

  ctx.save();

  // 1. Halo ambiant externe
  const halo = ctx.createRadialGradient(t.x, t.y, r * 0.1, t.x, t.y, r * 1.85);
  halo.addColorStop(0.35, `rgba(${cr},${cg},${cb}, 0.0)`);
  halo.addColorStop(0.72, `rgba(${cr},${cg},${cb}, 0.16)`);
  halo.addColorStop(1.0,  'rgba(0,0,0,0)');
  ctx.beginPath(); ctx.arc(t.x, t.y, r * 1.85, 0, Math.PI * 2);
  ctx.fillStyle = halo; ctx.fill();

  // 2. Fond intérieur du tunnel (dégradé radial, donne la profondeur)
  {
    const fr = rings[0];
    const depth = ctx.createRadialGradient(t.x, fr.cy - fr.ry * 0.25, 1, t.x, fr.cy, fr.rx * 1.05);
    depth.addColorStop(0.0, `rgba(${cr},${cg},${cb}, 0.08)`);
    depth.addColorStop(0.5, `rgba(2, 6, 24, 0.82)`);
    depth.addColorStop(1.0, `rgba(0, 2, 12, 0.97)`);
    ctx.beginPath();
    ctx.ellipse(fr.cx, fr.cy, fr.rx, fr.ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = depth; ctx.fill();
  }

  // 3. Parois du tunnel entre anneaux consécutifs (evenodd = donut)
  for (let d = 0; d < NRINGS - 1; d++) {
    const outer = rings[d];
    const inner = rings[d + 1];
    const b = (1 - d * 0.28) * 0.38;
    const wg = ctx.createLinearGradient(0, inner.cy - inner.ry, 0, outer.cy + outer.ry * 0.6);
    wg.addColorStop(0,   `rgba(${cr},${cg},${cb}, ${b * 0.85})`);
    wg.addColorStop(0.55,`rgba(${Math.floor(cr*0.35)},${Math.floor(cg*0.35)},${Math.floor(cb*0.45)}, ${b * 0.6})`);
    wg.addColorStop(1,   `rgba(0, 3, 18, 0.25)`);
    ctx.beginPath();
    ctx.ellipse(outer.cx, outer.cy, outer.rx + 0.5, outer.ry + 0.5, 0, 0, Math.PI * 2);
    ctx.ellipse(inner.cx, inner.cy, inner.rx,       inner.ry,       0, 0, Math.PI * 2);
    ctx.fillStyle = wg;
    ctx.fill('evenodd');
  }

  // 4. Anneaux du plus loin au plus proche
  for (let d = NRINGS - 1; d >= 0; d--) {
    const ring = rings[d];
    const a = (1.0 - d * 0.18) * pulse;
    const lw = d === 0 ? 2.4 : 1.5 - d * 0.15;

    // Lueur douce
    ctx.beginPath();
    ctx.ellipse(ring.cx, ring.cy, ring.rx, ring.ry, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${cr},${cg},${cb}, ${a * 0.28})`;
    ctx.lineWidth = lw + 7;
    ctx.stroke();

    // Anneau principal
    ctx.beginPath();
    ctx.ellipse(ring.cx, ring.cy, ring.rx, ring.ry, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${cr},${cg},${cb}, ${a})`;
    ctx.lineWidth = lw;
    ctx.stroke();

    // Reflet spéculaire (arc supérieur) sur les 2 anneaux avant
    if (d <= 1) {
      ctx.beginPath();
      ctx.ellipse(ring.cx, ring.cy, ring.rx * 0.8, ring.ry * 0.8, 0, -Math.PI * 0.78, -Math.PI * 0.22);
      ctx.strokeStyle = `rgba(255,255,255, ${(0.75 - d * 0.35) * pulse})`;
      ctx.lineWidth = 1.2 - d * 0.2;
      ctx.stroke();
    }
  }

  // 5. Label
  const labelY = t.y - yShift * 1.2;
  const fontSize = t.label.length > 8 ? 12 : t.label.length > 5 ? 14 : 17;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${fontSize}px Segoe UI`;
  ctx.shadowBlur = 10;
  ctx.shadowColor = col;
  ctx.fillStyle = 'rgba(0,0,0,0.75)';
  ctx.fillText(t.label, t.x + 1, labelY + 1);
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(t.label, t.x, labelY);

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

// Animated engine flames — drawn in additive mode so they glow over the sprite.
// engineY : y-position of the nozzle in sprite-local coords (positive = toward tail).
function drawEngineFlames(bank) {
  const t = animTime;
  const scaleX = 1 - Math.abs(bank) * 0.12;

  // Engine nozzle is at roughly 38% of half-height down from center
  // (sprite: nose at top, engine at ~85% from top → in [-55,+55] coords ≈ +39)
  const nozzleY = 39;

  ctx.save();
  ctx.scale(scaleX, 1);
  ctx.globalCompositeOperation = 'lighter'; // additive glow

  // ---- Core inner flame (bright white-cyan) ----
  const coreLen = 28 + 10 * Math.sin(t * 22) + 6 * Math.sin(t * 37 + 1.3);
  const coreW   = 5  +  2 * Math.sin(t * 19 + 0.7);
  const cg = ctx.createLinearGradient(0, nozzleY, 0, nozzleY + coreLen);
  cg.addColorStop(0,   'rgba(200, 240, 255, 0.95)');
  cg.addColorStop(0.3, 'rgba(100, 200, 255, 0.7)');
  cg.addColorStop(1,   'rgba(40,  120, 255, 0)');
  ctx.beginPath();
  ctx.moveTo(-coreW, nozzleY);
  ctx.bezierCurveTo(-coreW * 1.4, nozzleY + coreLen * 0.45,
                    -coreW * 0.2, nozzleY + coreLen * 0.85,
                     0,           nozzleY + coreLen);
  ctx.bezierCurveTo( coreW * 0.2, nozzleY + coreLen * 0.85,
                     coreW * 1.4, nozzleY + coreLen * 0.45,
                     coreW,       nozzleY);
  ctx.fillStyle = cg;
  ctx.fill();

  // ---- Outer flame plume (blue, longer, softer) ----
  const outerLen = 55 + 18 * Math.sin(t * 14 + 0.5) + 10 * Math.sin(t * 27 + 2.1);
  const outerW   = 12 +  4 * Math.sin(t * 11 + 1.0);
  // Slight lateral drift for a live feel
  const drift = 1.5 * Math.sin(t * 8.3);
  const og = ctx.createLinearGradient(0, nozzleY, 0, nozzleY + outerLen);
  og.addColorStop(0,   'rgba(80, 180, 255, 0.55)');
  og.addColorStop(0.4, 'rgba(30, 100, 255, 0.35)');
  og.addColorStop(0.75,'rgba(10,  50, 200, 0.15)');
  og.addColorStop(1,   'rgba(0,   20, 150, 0)');
  ctx.beginPath();
  ctx.moveTo(-outerW, nozzleY);
  ctx.bezierCurveTo(-outerW * 1.5 + drift, nozzleY + outerLen * 0.4,
                    -outerW * 0.3 + drift,  nozzleY + outerLen * 0.85,
                     drift,                 nozzleY + outerLen);
  ctx.bezierCurveTo( outerW * 0.3 + drift,  nozzleY + outerLen * 0.85,
                     outerW * 1.5 + drift,  nozzleY + outerLen * 0.4,
                     outerW,                nozzleY);
  ctx.fillStyle = og;
  ctx.fill();

  // ---- Glow halo at nozzle ----
  const haloR = 10 + 4 * Math.sin(t * 20);
  const hg = ctx.createRadialGradient(0, nozzleY, 0, 0, nozzleY, haloR);
  hg.addColorStop(0,   'rgba(150, 230, 255, 0.5)');
  hg.addColorStop(0.5, 'rgba(60,  160, 255, 0.2)');
  hg.addColorStop(1,   'rgba(20,   80, 255, 0)');
  ctx.beginPath();
  ctx.arc(0, nozzleY, haloR, 0, Math.PI * 2);
  ctx.fillStyle = hg;
  ctx.fill();

  ctx.restore();
}

// Draws using the plane.png sprite, nez vers le HAUT.
function drawPlaneSprite(bank) {
  const spr = processedSprite;
  const drawH = 110;
  const drawW = drawH * (spr.width / spr.height);
  // Flames first (behind sprite so nozzle area overlaps cleanly)
  drawEngineFlames(bank);
  ctx.save();
  ctx.scale(1 - Math.abs(bank) * 0.12, 1);
  ctx.drawImage(spr, -drawW / 2, -drawH / 2, drawW, drawH);
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
  // Sprite : nez en haut → arrière (moteurs) vers le bas → panel vers y positif
  const py = spriteReady ? 28 : 8;
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

document.getElementById('missionsModeBtn').addEventListener('click', () => {
  gameMode = 'missions';
  missionIndex = 0;
  showMissionBriefing(0);
  drawStartBg();
});

document.getElementById('libreModeBtn').addEventListener('click', () => {
  gameMode = 'libre';
  state = 'start';
  hideAllScreens();
  document.getElementById('startScreen').style.display = '';
  drawStartBg();
});

document.getElementById('backToIntroBtn').addEventListener('click', showIntro);

document.getElementById('startBtn').addEventListener('click', startGame);

document.getElementById('launchMissionBtn').addEventListener('click', startGame);

document.getElementById('restartBtn').addEventListener('click', () => {
  if (gameMode === 'missions') showMissionBriefing(missionIndex);
  else { hideAllScreens(); startGame(); }
});

document.getElementById('menuBtn').addEventListener('click', showIntro);

document.getElementById('victoryMenuBtn').addEventListener('click', showIntro);

// ---- Start screen static preview --------------------------
plane.x = canvas.width / 2;
plane.y = canvas.height - 80;
initStars();

function drawStartBg() {
  if (state === 'playing' || state === 'gameover' || state === 'victory') return;
  animTime += 1 / 60; // ~60fps tick for menu animations
  if (menuBgImage && state === 'intro') {
    // Draw menu background image, cover-fit
    const iw = menuBgImage.naturalWidth, ih = menuBgImage.naturalHeight;
    const cw = canvas.width, ch = canvas.height;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale, dh = ih * scale;
    ctx.drawImage(menuBgImage, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    // Dark overlay so text stays readable
    ctx.fillStyle = 'rgba(3, 5, 20, 0.55)';
    ctx.fillRect(0, 0, cw, ch);
  } else {
    const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bg.addColorStop(0, '#03050e'); bg.addColorStop(1, '#060c1c');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  for (const s of stars) {
    s.y += s.spd * 0.5;
    if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,220,255,${s.alpha})`;
    ctx.fill();
  }
  const cx = canvas.width / 2, cy = canvas.height - 80;
  if (spriteReady && processedSprite) {
    ctx.save();
    ctx.translate(cx, cy);
    drawPlaneSprite(0);
    ctx.restore();
    ctx.save();
    ctx.translate(cx, cy);
    drawRearPanel('JE', 'être');
    ctx.restore();
  } else {
    drawPlane(cx, cy, 0, 0, 'JE', 'être');
  }
  requestAnimationFrame(drawStartBg);
}

// ---- Start screen static preview --------------------------
plane.x = canvas.width / 2;
plane.y = canvas.height - 80;
initStars();
drawStartBg();
