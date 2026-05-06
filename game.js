/* CASO SOMBRIO — detective noir game */
(() => {
'use strict';

// ============ GAME DATA ============

const CLUES = {
  button: {
    icon: '⬛',
    label: 'Botão de paletó',
    where: 'Cobertura Werner',
    text: 'Botão escuro de paletó masculino, encontrado embaixo do corpo. Costura recente — caiu durante luta. Marca cara, importada.',
  },
  medication: {
    icon: '💊',
    label: 'Frasco de remédio',
    where: 'Cobertura Werner',
    text: 'Digitoxina cardíaca de Augusto Werner. O frasco está quase cheio — mas a tampa foi forçada. O conteúdo tem um cheiro estranho, adocicado demais.',
  },
  note: {
    icon: '✉',
    label: 'Bilhete amassado',
    where: 'Cobertura Werner',
    text: '"Pai — preciso falar com o senhor hoje à noite. Suba quando terminar o jantar. — H." A caligrafia é apressada, irregular.',
  },
  tire_marks: {
    icon: '🛞',
    label: 'Marca de pneu',
    where: 'Doca 14',
    text: 'Sulcos frescos de um automóvel pesado, deixados em frente ao armazém na noite do crime. Pneu Pirelli — modelo usado em carros de luxo italianos.',
  },
  footprint: {
    icon: '👞',
    label: 'Pegada de couro',
    where: 'Doca 14',
    text: 'Sapato masculino tamanho 41, sola lisa, couro caro. Caminho até a porta dos fundos do prédio dos Werner. Pisada pesada — alguém com pressa.',
  },
  receipt: {
    icon: '🎟',
    label: 'Recibo do cabaré',
    where: 'Cabaré Lua Azul',
    text: 'Mesa reservada, 22h às 02h, na noite do crime. Estela Veloso assinou. Confere com o relato dela — ela esteve lá a noite toda.',
  },
  photo: {
    icon: '🖼',
    label: 'Foto rasgada',
    where: 'Cabaré Lua Azul',
    text: 'Augusto Werner ao lado de Estela, sorrindo. A foto foi rasgada ao meio. Nas costas: "Para minha querida — A.W."',
  },
  contract: {
    icon: '📄',
    label: 'Contrato anulado',
    where: 'Escritório W&P',
    text: 'Sandra Pereira tentou comprar a parte de Augusto na empresa. Ele recusou e anulou a oferta dois dias antes do crime. Há uma nota: "discutir novamente, sem pressão".',
  },
  testament: {
    icon: '📜',
    label: 'Testamento alterado',
    where: 'Escritório W&P',
    text: 'Augusto havia mudado o testamento na semana anterior. Henrique foi removido como herdeiro principal — toda a herança iria para uma fundação. Henrique soube na sexta. O crime foi no sábado.',
  },
  gloves: {
    icon: '🧤',
    label: 'Luvas com sangue',
    where: 'Beco do Porto',
    text: 'Luvas masculinas de couro fino, descartadas atrás de um latão no beco. Manchas escuras no punho direito — sangue. Iniciais bordadas: H.W.',
  },
};

const NPCS = {
  otto: { name: 'Otto Lenz', role: 'Mordomo', face: '🎩' },
  sandra: { name: 'Sandra Pereira', role: 'Sócia', face: '💼' },
  estela: { name: 'Estela Veloso', role: 'Cantora', face: '🎤' },
  beto: { name: 'Beto Marques', role: 'Capataz das docas', face: '⚓' },
};

const SUSPECTS = ['otto', 'sandra', 'estela', 'henrique'];
const SUSPECT_INFO = {
  otto: { name: 'Otto Lenz', role: 'Mordomo', face: '🎩' },
  sandra: { name: 'Sandra Pereira', role: 'Sócia', face: '💼' },
  estela: { name: 'Estela Veloso', role: 'Cantora', face: '🎤' },
  henrique: { name: 'Henrique Werner', role: 'Filho', face: '🕴' },
};

const KEY_EVIDENCE = ['button', 'gloves', 'testament', 'tire_marks', 'footprint'];
const SOLUTION_SUSPECT = 'henrique';

const LOCATIONS = {
  penthouse: {
    name: 'Cobertura Werner',
    subtitle: 'Cena do crime',
    icon: '🏛',
    desc: 'Ático no topo de um arranha-céu. Augusto Werner caído na varanda.',
    palette: { sky: '#1a1f2e', accent: '#3a2f4a', light: '#d4a55a' },
    npc: 'otto',
    hotspots: [
      { id: 'body', x: 0.5, y: 0.72, label: 'Corpo de Augusto', clue: 'medication', text: 'O corpo está caído de costas perto da porta da varanda. Marcas leves no pescoço, como se tivesse sido segurado. Ao lado, derrubado: o frasco de digitoxina. Você o recolhe.' },
      { id: 'floor', x: 0.28, y: 0.78, label: 'Algo no chão', clue: 'button', text: 'Você se abaixa. Embaixo do braço esquerdo do morto, escondido pela poça de chá derramado, há um botão escuro de paletó. Não é da roupa que ele veste.' },
      { id: 'desk', x: 0.78, y: 0.55, label: 'Escrivaninha', clue: 'note', text: 'Sobre a escrivaninha, um bilhete amassado. Você o desdobra com cuidado.' },
      { id: 'otto', x: 0.18, y: 0.38, label: 'Otto, o mordomo', npc: 'otto' },
    ],
  },
  docks: {
    name: 'Doca 14',
    subtitle: 'Porto industrial',
    icon: '⚓',
    desc: 'Armazém abandonado dos Werner. Cheiro de óleo e maresia.',
    palette: { sky: '#0f1620', accent: '#1d3344', light: '#5fa8a5' },
    npc: 'beto',
    hotspots: [
      { id: 'tire', x: 0.32, y: 0.78, label: 'Marcas no chão', clue: 'tire_marks', text: 'Você se ajoelha sob a luz fraca do poste. Sulcos profundos de pneu, ainda recentes. Um carro pesado parou aqui anteontem à noite.' },
      { id: 'mud', x: 0.62, y: 0.74, label: 'Lama na entrada', clue: 'footprint', text: 'Uma pegada nítida na lama seca. Sapato masculino, tamanho 41, couro fino. Não é de operário.' },
      { id: 'beto', x: 0.8, y: 0.42, label: 'Beto, o capataz', npc: 'beto' },
    ],
  },
  club: {
    name: 'Cabaré Lua Azul',
    subtitle: 'Pista de jazz',
    icon: '🎷',
    desc: 'Fumaça, saxofone e luzes vermelhas. Estela canta esta noite.',
    palette: { sky: '#1f0f15', accent: '#4a1f2e', light: '#e06464' },
    npc: 'estela',
    hotspots: [
      { id: 'bar', x: 0.25, y: 0.55, label: 'Balcão', clue: 'receipt', text: 'O barman te entrega um recibo: mesa de Estela, da noite do crime. 22h às 02h. Ela passou a noite inteira aqui.' },
      { id: 'frame', x: 0.7, y: 0.4, label: 'Foto na parede', clue: 'photo', text: 'Pendurada atrás do palco, uma foto rasgada. Augusto Werner abraça Estela. Alguém rasgou ao meio — a metade dele. As costas trazem uma dedicatória.' },
      { id: 'estela', x: 0.5, y: 0.45, label: 'Estela', npc: 'estela' },
    ],
  },
  office: {
    name: 'Escritório W&P',
    subtitle: 'Sede da Werner & Pereira',
    icon: '🏢',
    desc: 'Andar executivo, silencioso. Sandra ainda está aqui.',
    palette: { sky: '#1a1d24', accent: '#2a3142', light: '#d4a55a' },
    npc: 'sandra',
    hotspots: [
      { id: 'safe', x: 0.3, y: 0.55, label: 'Cofre entreaberto', clue: 'contract', text: 'Documentos espalhados. Uma proposta de Sandra para comprar a parte de Augusto na empresa. Recusada. Marcada com tinta vermelha: "rever".' },
      { id: 'drawer', x: 0.72, y: 0.58, label: 'Gaveta do morto', clue: 'testament', text: 'Cópia do testamento revisado. Augusto removeu Henrique como herdeiro principal há uma semana. A fundação ficaria com tudo. Henrique foi notificado na sexta-feira.' },
      { id: 'sandra', x: 0.5, y: 0.42, label: 'Sandra', npc: 'sandra' },
    ],
  },
  alley: {
    name: 'Beco do Porto',
    subtitle: 'Saída dos fundos',
    icon: '🌫',
    desc: 'Beco escuro entre o cabaré e o porto. Algo te seguiu até aqui.',
    palette: { sky: '#0a0c10', accent: '#1a1d24', light: '#b04545' },
    triggersDefense: true,
    hotspots: [],
  },
};

const DIALOGUES = {
  otto: {
    intro: 'O senhor desculpe, detetive. Não sei se consigo... eu o servi por trinta anos.',
    options: [
      {
        q: 'Onde estava na hora do crime?',
        a: 'Eu estava na cozinha, preparando o chá. Subi ao ouvir o barulho, mas... ele já estava caído. Juro que ninguém passou por mim.',
      },
      {
        q: 'Alguém esteve com ele esta noite?',
        a: 'Augusto recebeu uma visita por volta das vinte e três. Não vi quem era. Ele me dispensou com um aceno. Disse que era... assunto de família.',
      },
      {
        q: 'Mostrar o bilhete',
        need: 'note',
        a: 'Esse "H"... é Henrique. Filho dele. Não falavam há meses. Augusto andava aborrecido — havia mudado coisas no testamento. Não me cabe dizer mais.',
        unlock: 'henriqueHinted',
      },
      {
        q: 'Mostrar o botão',
        need: 'button',
        a: 'Não é do senhor Augusto. Esse modelo é estrangeiro. Henrique trouxe um paletó assim de Milão no ano passado.',
      },
    ],
  },
  sandra: {
    intro: 'Detetive. Não esperava visita a esta hora. Sente-se. Whisky?',
    options: [
      {
        q: 'A senhora discutiu com Augusto?',
        a: 'Discordamos sobre a empresa, sim. Eu queria comprar a parte dele. Ele recusou. Negócios, detetive. Não é motivo para matar ninguém.',
      },
      {
        q: 'Onde estava sábado à noite?',
        a: 'Aqui, neste escritório, até depois das duas da manhã. A faxineira me viu sair. Telefone ali, pode confirmar com a portaria.',
      },
      {
        q: 'Mostrar o contrato',
        need: 'contract',
        a: 'Sim, ele recusou. Mas eu ia tentar de novo. Augusto era teimoso, não cego. Sabia que estávamos perdendo dinheiro com a teimosia dele. Eu não precisava dele morto — precisava dele convencido.',
      },
      {
        q: 'Mostrar o testamento',
        need: 'testament',
        a: 'Então ele realmente fez. Sabe quem mais sabia disso? Henrique. E o garoto não tem o estômago da mãe. Tem o orgulho do pai.',
      },
    ],
  },
  estela: {
    intro: 'Detetive Lima. Sente-se. O whisky é por minha conta.',
    options: [
      {
        q: 'Você conhecia Augusto Werner?',
        a: 'Conhecia. Por quase um ano. Ele me trazia flores, prometia coisas que homens casados não devem prometer. Mas estava acabando. Ele tinha medo do filho.',
      },
      {
        q: 'Onde estava na noite do crime?',
        a: 'Aqui. Cantei das vinte e duas até as duas da manhã. Setenta pessoas me viram. Pode perguntar a qualquer um.',
      },
      {
        q: 'Mostrar a foto rasgada',
        need: 'photo',
        a: 'Foi Henrique. Veio aqui há duas semanas. Disse que eu estava destruindo a família dele. Rasgou a foto e foi embora. Augusto me ligou no dia seguinte... pedindo desculpas.',
        unlock: 'henriqueHinted',
      },
      {
        q: 'Mostrar o recibo',
        need: 'receipt',
        a: 'É meu. Pode conferir. Não tenho nada a esconder, detetive. Eu o amava — do meu jeito. Não fui eu.',
      },
    ],
  },
  beto: {
    intro: 'Detetive. O senhor é o investigador, eu suponho. O que quer saber?',
    options: [
      {
        q: 'Viu algo estranho ontem à noite?',
        a: 'Um carro grande, italiano, estacionou aqui na sexta de noite. O motorista entrou no armazém dos Werner — usou chave própria. Ficou uns vinte minutos. Saiu rápido.',
      },
      {
        q: 'Reconheceu o homem?',
        a: 'Não vi o rosto, estava chovendo. Mas era jovem, magro. Tinha um andar de quem manda. Conheço o tipo.',
      },
      {
        q: 'Mostrar a marca de pneu',
        need: 'tire_marks',
        a: 'É ele, sim. Pneu de Alfa Romeo. Tem um único homem na cidade que dirige uma dessas — o filho do Werner. O senhor sabia disso?',
        unlock: 'henriqueConfirmed',
      },
    ],
  },
};

const INTRO_TEXT = `Sábado, 11 de outubro. Vinte e três horas e quarenta minutos.

Augusto Werner — industrial, viúvo, dono de meio porto — está caído na varanda da própria cobertura. A polícia chamou de acidente cardíaco. O legista discordou. Você concordou com o legista.

Você é Vera Lima. Detetive particular. Vinte anos de bons casos, três de bons trabalhos pagos.

A esposa do morto te contratou esta tarde. Quer saber quem matou o marido antes que a polícia decida que ninguém matou.

Você tem três dias.`;

const PROMPTS = [
  'Toque nos pontos brilhantes para investigar.',
  'Pessoas em destaque podem ser interrogadas.',
  'Pistas mostradas em diálogos podem revelar mais.',
];

// ============ STATE ============

const SAVE_KEY = 'caso_sombrio_v1';

const State = {
  cluesFound: new Set(),
  hotspotsUsed: new Set(),
  npcsTalked: new Set(),
  locationsVisited: new Set(),
  flags: {},
  defenseCompleted: false,
  chapter: 1,
  startTime: 0,
  totalActions: 0,
};

function saveGame() {
  try {
    const data = {
      cluesFound: [...State.cluesFound],
      hotspotsUsed: [...State.hotspotsUsed],
      npcsTalked: [...State.npcsTalked],
      locationsVisited: [...State.locationsVisited],
      flags: State.flags,
      defenseCompleted: State.defenseCompleted,
      chapter: State.chapter,
      startTime: State.startTime,
      totalActions: State.totalActions,
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (e) { /* storage unavailable */ }
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    State.cluesFound = new Set(data.cluesFound || []);
    State.hotspotsUsed = new Set(data.hotspotsUsed || []);
    State.npcsTalked = new Set(data.npcsTalked || []);
    State.locationsVisited = new Set(data.locationsVisited || []);
    State.flags = data.flags || {};
    State.defenseCompleted = !!data.defenseCompleted;
    State.chapter = data.chapter || 1;
    State.startTime = data.startTime || Date.now();
    State.totalActions = data.totalActions || 0;
    return true;
  } catch (e) { return false; }
}

function hasSave() {
  try { return !!localStorage.getItem(SAVE_KEY); } catch (e) { return false; }
}

function clearSave() {
  try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
}

function resetState() {
  State.cluesFound = new Set();
  State.hotspotsUsed = new Set();
  State.npcsTalked = new Set();
  State.locationsVisited = new Set();
  State.flags = {};
  State.defenseCompleted = false;
  State.chapter = 1;
  State.startTime = Date.now();
  State.totalActions = 0;
}

// ============ AUDIO ============

const Audio = (() => {
  let ctx = null;
  let masterGain = null;
  let ambientNodes = null;
  let muted = false;

  function ensure() {
    if (!ctx) {
      try {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        masterGain = ctx.createGain();
        masterGain.gain.value = muted ? 0 : 0.4;
        masterGain.connect(ctx.destination);
      } catch (e) { /* no audio */ }
    }
    if (ctx && ctx.state === 'suspended') ctx.resume();
  }

  function tone(freq, duration, type = 'sine', vol = 0.2) {
    ensure();
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    o.connect(g);
    g.connect(masterGain);
    o.start();
    o.stop(ctx.currentTime + duration);
  }

  function noise(duration, freqStart = 1000, freqEnd = 200, vol = 0.3) {
    ensure();
    if (!ctx) return;
    const bufSize = ctx.sampleRate * duration;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freqStart, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(freqEnd, ctx.currentTime + duration);
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    src.connect(filter);
    filter.connect(g);
    g.connect(masterGain);
    src.start();
  }

  function startAmbient() {
    ensure();
    if (!ctx || ambientNodes) return;
    const o1 = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    const g = ctx.createGain();
    o1.frequency.value = 55;
    o2.frequency.value = 82.5;
    o1.type = 'sine';
    o2.type = 'triangle';
    g.gain.value = 0.05;
    o1.connect(g);
    o2.connect(g);
    g.connect(masterGain);
    o1.start();
    o2.start();
    ambientNodes = { o1, o2, g };
  }

  function stopAmbient() {
    if (!ambientNodes) return;
    try {
      ambientNodes.o1.stop();
      ambientNodes.o2.stop();
    } catch (e) {}
    ambientNodes = null;
  }

  return {
    click: () => tone(880, 0.05, 'square', 0.05),
    discover: () => { tone(523, 0.15, 'sine', 0.1); setTimeout(() => tone(784, 0.3, 'sine', 0.1), 80); },
    error: () => tone(150, 0.2, 'sawtooth', 0.1),
    win: () => { tone(523, 0.2); setTimeout(() => tone(659, 0.2), 200); setTimeout(() => tone(784, 0.4), 400); },
    lose: () => { tone(220, 0.3, 'sawtooth', 0.15); setTimeout(() => tone(165, 0.6, 'sawtooth', 0.15), 200); },
    shot: () => noise(0.1, 1500, 100, 0.3),
    hit: () => noise(0.15, 600, 100, 0.4),
    hurt: () => tone(110, 0.2, 'sawtooth', 0.2),
    startAmbient, stopAmbient,
    setMuted: (m) => { muted = m; if (masterGain) masterGain.gain.value = m ? 0 : 0.4; },
    isMuted: () => muted,
    resume: ensure,
  };
})();

// ============ BACKGROUND CANVAS (rain) ============

const Background = (() => {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let drops = [];
  let w = 0, h = 0;
  let mode = 'title';
  let raf = null;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth = window.innerWidth;
    h = canvas.clientHeight = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initDrops();
  }

  function initDrops() {
    drops = [];
    const count = mode === 'title' ? 80 : 30;
    for (let i = 0; i < count; i++) {
      drops.push({
        x: Math.random() * w,
        y: Math.random() * h,
        speed: 4 + Math.random() * 6,
        len: 8 + Math.random() * 14,
        op: 0.1 + Math.random() * 0.3,
      });
    }
  }

  function draw() {
    ctx.fillStyle = mode === 'title' ? '#0a0d12' : 'rgba(10, 13, 18, 0.4)';
    ctx.fillRect(0, 0, w, h);

    if (mode === 'title') {
      const grd = ctx.createRadialGradient(w/2, h*0.4, 0, w/2, h*0.4, w*0.7);
      grd.addColorStop(0, 'rgba(212, 165, 90, 0.08)');
      grd.addColorStop(1, 'rgba(10, 13, 18, 0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);
    }

    ctx.strokeStyle = 'rgba(180, 200, 220, 0.25)';
    ctx.lineWidth = 1;
    drops.forEach(d => {
      ctx.globalAlpha = d.op;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - 1, d.y + d.len);
      ctx.stroke();
      d.y += d.speed;
      d.x -= 0.5;
      if (d.y > h) { d.y = -10; d.x = Math.random() * (w + 50); }
    });
    ctx.globalAlpha = 1;

    raf = requestAnimationFrame(draw);
  }

  function start() {
    resize();
    if (!raf) draw();
  }

  function setMode(m) {
    mode = m;
    initDrops();
  }

  window.addEventListener('resize', resize);
  start();

  return { setMode };
})();

// ============ TOAST ============

const toastEl = document.getElementById('toast');
let toastTimer = null;
function toast(text, icon = '◆') {
  toastEl.innerHTML = `<span class="ti">${icon}</span><span>${text}</span>`;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2400);
}

// ============ UI / SCREEN MANAGER ============

const screenContainer = document.getElementById('screen-container');
let currentScreen = null;

function transitionTo(builder) {
  if (currentScreen) {
    currentScreen.classList.remove('active');
    const old = currentScreen;
    setTimeout(() => old.remove(), 350);
  }
  const screen = document.createElement('div');
  screen.className = 'screen';
  screenContainer.appendChild(screen);
  builder(screen);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => screen.classList.add('active'));
  });
  currentScreen = screen;
  return screen;
}

// ============ TITLE SCREEN ============

function showTitle() {
  Background.setMode('title');
  Audio.startAmbient();
  transitionTo(screen => {
    screen.classList.add('title-screen');
    const has = hasSave();
    screen.innerHTML = `
      <div class="brand">
        <p class="subtitle">Um caso de detetive</p>
        <h1 class="display">Caso Sombrio</h1>
        <p class="subtitle" style="color: var(--ink-mute); margin-top: 6px;">Capítulo I — A Cobertura</p>
      </div>
      <div class="menu">
        ${has ? '<button class="btn primary" id="continue-btn">Continuar</button>' : ''}
        <button class="btn ${has ? '' : 'primary'}" id="new-btn">Novo Jogo</button>
        <button class="btn ghost" id="mute-btn">${Audio.isMuted() ? '♪ Som desligado' : '♪ Som ligado'}</button>
      </div>
      <div class="credits">Toque para começar</div>
    `;
    if (has) {
      screen.querySelector('#continue-btn').onclick = () => {
        Audio.click();
        if (loadGame()) showMap();
        else { resetState(); showIntro(); }
      };
    }
    screen.querySelector('#new-btn').onclick = () => {
      Audio.click();
      if (has && !confirm('Apagar o progresso anterior e começar um novo caso?')) return;
      clearSave();
      resetState();
      showIntro();
    };
    screen.querySelector('#mute-btn').onclick = (e) => {
      Audio.setMuted(!Audio.isMuted());
      e.target.textContent = Audio.isMuted() ? '♪ Som desligado' : '♪ Som ligado';
    };
  });
}

// ============ INTRO ============

function showIntro() {
  Background.setMode('rain');
  transitionTo(screen => {
    screen.classList.add('narrative-screen');
    screen.innerHTML = `
      <div class="narrative-box">
        <div class="chapter">Capítulo I — A Cobertura</div>
        <div class="text" id="narrative-text"></div>
        <div class="narrative-actions">
          <button class="btn ghost" id="skip-btn">Pular</button>
          <button class="btn primary" id="continue-btn" style="display:none">Continuar</button>
        </div>
      </div>
    `;
    const textEl = screen.querySelector('#narrative-text');
    const continueBtn = screen.querySelector('#continue-btn');
    const skipBtn = screen.querySelector('#skip-btn');

    let idx = 0;
    let typing = true;
    const cursor = '<span class="blink"></span>';
    function tick() {
      if (!typing) return;
      if (idx >= INTRO_TEXT.length) {
        textEl.innerHTML = INTRO_TEXT;
        continueBtn.style.display = '';
        skipBtn.style.display = 'none';
        typing = false;
        return;
      }
      idx++;
      textEl.innerHTML = INTRO_TEXT.slice(0, idx) + cursor;
      const ch = INTRO_TEXT[idx - 1];
      const delay = ch === '\n' ? 220 : ch === '.' ? 180 : (Math.random() < 0.04 ? 70 : 22);
      setTimeout(tick, delay);
    }
    tick();

    skipBtn.onclick = () => {
      typing = false;
      textEl.innerHTML = INTRO_TEXT;
      continueBtn.style.display = '';
      skipBtn.style.display = 'none';
    };
    continueBtn.onclick = () => {
      Audio.click();
      State.locationsVisited.add('penthouse');
      saveGame();
      showLocation('penthouse');
    };
  });
}

// ============ MAP ============

function showMap() {
  Background.setMode('rain');
  transitionTo(screen => {
    screen.classList.add('map-screen');
    const cluesCount = State.cluesFound.size;
    const canAccuse = cluesCount >= 5;
    const alleyUnlocked = State.locationsVisited.size >= 3 || State.cluesFound.size >= 5;

    screen.innerHTML = `
      <div class="hud">
        <div class="title-line">
          <div class="place display">A Cidade</div>
          <div class="meta">${cluesCount} pista${cluesCount === 1 ? '' : 's'} reunida${cluesCount === 1 ? '' : 's'}</div>
        </div>
        <div class="actions">
          <button class="icon-btn" id="inv-btn" title="Inventário">
            ◆<span class="badge">${cluesCount}</span>
          </button>
          <button class="icon-btn" id="title-btn" title="Menu">⌂</button>
        </div>
      </div>
      <div class="map-grid" id="map-grid"></div>
      <div style="padding-top: 16px; display: flex; gap: 10px;">
        <button class="btn danger" id="accuse-btn" style="flex:1" ${canAccuse ? '' : 'disabled'}>
          ${canAccuse ? 'Fazer Acusação' : `Pistas insuficientes (${cluesCount}/5)`}
        </button>
      </div>
    `;
    const grid = screen.querySelector('#map-grid');

    Object.entries(LOCATIONS).forEach(([id, loc]) => {
      const visited = State.locationsVisited.has(id);
      const isAlley = id === 'alley';
      const locked = isAlley && !alleyUnlocked;
      const completedDefense = isAlley && State.defenseCompleted;

      const card = document.createElement('button');
      card.className = `map-card ${locked ? 'locked' : ''}`;
      card.disabled = locked;

      let status = 'Não visitado';
      let cls = '';
      if (locked) { status = 'Bloqueado — Investigue mais'; cls = 'locked'; }
      else if (completedDefense) { status = 'Resolvido'; cls = 'visited'; }
      else if (visited) { status = 'Visitado'; cls = 'visited'; }

      card.innerHTML = `
        <span class="icon">${loc.icon}</span>
        <div class="info">
          <h3>${loc.name}</h3>
          <div class="desc">${loc.desc}</div>
          <div class="status ${cls}">${status}</div>
        </div>
      `;
      if (!locked && !(isAlley && completedDefense)) {
        card.onclick = () => {
          Audio.click();
          if (id === 'alley' && !State.defenseCompleted) {
            showDefense();
          } else {
            showLocation(id);
          }
        };
      } else if (isAlley && completedDefense) {
        card.classList.add('locked');
        card.disabled = true;
      }
      grid.appendChild(card);
    });

    screen.querySelector('#inv-btn').onclick = () => { Audio.click(); showInventory(); };
    screen.querySelector('#title-btn').onclick = () => {
      Audio.click();
      saveGame();
      showTitle();
    };
    screen.querySelector('#accuse-btn').onclick = () => {
      Audio.click();
      showDeduction();
    };
  });
}

// ============ LOCATION SCENE ============

let sceneCanvas = null, sceneCtx = null, sceneAnim = null;
let currentLocation = null;
let sceneHotspots = [];

function showLocation(id) {
  Background.setMode('rain');
  State.locationsVisited.add(id);
  saveGame();
  currentLocation = id;
  const loc = LOCATIONS[id];

  transitionTo(screen => {
    screen.classList.add('location-screen');
    screen.innerHTML = `
      <div class="scene-canvas-wrap">
        <div class="hud-floating">
          <div class="location-name">${loc.name}</div>
          <div class="actions" style="display:flex; gap:8px;">
            <button class="icon-btn" id="inv-btn">◆<span class="badge">${State.cluesFound.size}</span></button>
            <button class="icon-btn" id="back-btn">↩</button>
          </div>
        </div>
        <canvas class="scene-canvas" id="scene-canvas"></canvas>
        <div class="scene-prompt" id="scene-prompt">${PROMPTS[Math.floor(Math.random() * PROMPTS.length)]}</div>
      </div>
    `;
    sceneCanvas = screen.querySelector('#scene-canvas');
    sceneCtx = sceneCanvas.getContext('2d');
    setupScene(loc);

    screen.querySelector('#back-btn').onclick = () => {
      Audio.click();
      stopScene();
      saveGame();
      showMap();
    };
    screen.querySelector('#inv-btn').onclick = () => { Audio.click(); showInventory(); };

    sceneCanvas.addEventListener('click', onSceneClick);
    sceneCanvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const t = e.touches[0];
      const rect = sceneCanvas.getBoundingClientRect();
      handleSceneTouch((t.clientX - rect.left) / rect.width, (t.clientY - rect.top) / rect.height);
    }, { passive: false });
  });
}

function onSceneClick(e) {
  const rect = sceneCanvas.getBoundingClientRect();
  handleSceneTouch((e.clientX - rect.left) / rect.width, (e.clientY - rect.top) / rect.height);
}

function handleSceneTouch(nx, ny) {
  const loc = LOCATIONS[currentLocation];
  for (const hs of loc.hotspots) {
    const dx = nx - hs.x;
    const dy = ny - hs.y;
    if (Math.sqrt(dx*dx + dy*dy) < 0.08) {
      triggerHotspot(hs);
      return;
    }
  }
}

function triggerHotspot(hs) {
  const key = `${currentLocation}:${hs.id}`;
  if (hs.npc) {
    Audio.click();
    showDialogue(hs.npc);
    return;
  }
  if (hs.clue) {
    if (State.cluesFound.has(hs.clue)) {
      toast('Você já examinou isto.', '✓');
      return;
    }
    State.cluesFound.add(hs.clue);
    State.hotspotsUsed.add(key);
    State.totalActions++;
    saveGame();
    Audio.discover();
    const clue = CLUES[hs.clue];
    showNarrativePopup(hs.text, clue);
  }
}

function showNarrativePopup(text, clue) {
  const overlay = document.createElement('div');
  overlay.className = 'dialogue-overlay show';
  overlay.innerHTML = `
    <div class="dialogue-portrait">
      <div class="portrait-circle">${clue.icon}</div>
      <div class="who">
        <span class="name">${clue.label}</span>
        <span class="role">Pista descoberta</span>
      </div>
    </div>
    <div class="dialogue-text">${text}</div>
    <div class="dialogue-options">
      <button class="dialogue-option" id="close-popup">Continuar</button>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('#close-popup').onclick = () => {
    Audio.click();
    overlay.remove();
    refreshSceneBadges();
  };
  toast(`+ ${clue.label}`, '◆');
}

function refreshSceneBadges() {
  const badge = document.querySelector('.icon-btn .badge');
  if (badge) badge.textContent = State.cluesFound.size;
}

// ============ SCENE RENDERING ============

function setupScene(loc) {
  resizeSceneCanvas();
  window.addEventListener('resize', resizeSceneCanvas);
  let t = 0;

  function frame() {
    t += 0.016;
    drawScene(loc, t);
    sceneAnim = requestAnimationFrame(frame);
  }
  frame();
}

function stopScene() {
  if (sceneAnim) cancelAnimationFrame(sceneAnim);
  sceneAnim = null;
  window.removeEventListener('resize', resizeSceneCanvas);
}

function resizeSceneCanvas() {
  if (!sceneCanvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = sceneCanvas.getBoundingClientRect();
  sceneCanvas.width = rect.width * dpr;
  sceneCanvas.height = rect.height * dpr;
  sceneCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawScene(loc, t) {
  const w = sceneCanvas.clientWidth;
  const h = sceneCanvas.clientHeight;
  const p = loc.palette;

  const grd = sceneCtx.createLinearGradient(0, 0, 0, h);
  grd.addColorStop(0, p.sky);
  grd.addColorStop(1, '#000');
  sceneCtx.fillStyle = grd;
  sceneCtx.fillRect(0, 0, w, h);

  drawLocationArt(loc, t, w, h);

  for (let i = 0; i < 40; i++) {
    const x = ((i * 37.5 + t * 60) % (w + 40)) - 20;
    const y = ((i * 23.7 + t * 100) % h);
    sceneCtx.strokeStyle = `rgba(180, 200, 220, ${0.1 + (i % 3) * 0.05})`;
    sceneCtx.lineWidth = 1;
    sceneCtx.beginPath();
    sceneCtx.moveTo(x, y);
    sceneCtx.lineTo(x - 1, y + 8);
    sceneCtx.stroke();
  }

  loc.hotspots.forEach(hs => {
    const x = hs.x * w;
    const y = hs.y * h;
    const isNpc = !!hs.npc;
    const used = isNpc ? State.npcsTalked.has(hs.npc) : State.cluesFound.has(hs.clue);
    drawHotspot(x, y, t, isNpc, used, hs);
  });
}

function drawLocationArt(loc, t, w, h) {
  const c = sceneCtx;
  const id = currentLocation;
  c.save();

  if (id === 'penthouse') {
    c.fillStyle = '#0a0d12';
    c.fillRect(0, h*0.55, w, h*0.45);
    c.fillStyle = loc.palette.accent;
    for (let i = 0; i < 8; i++) {
      const bx = (i * w / 8) + 10;
      c.fillRect(bx, h*0.35 + Math.sin(i)*15, w/8 - 20, h*0.2);
      for (let wy = 0; wy < 5; wy++) {
        for (let wx = 0; wx < 3; wx++) {
          c.fillStyle = Math.random() < 0.6 ? 'rgba(212, 165, 90, 0.4)' : 'rgba(40, 50, 70, 0.3)';
          c.fillRect(bx + 6 + wx*8, h*0.37 + wy*7 + Math.sin(i)*15, 5, 4);
        }
      }
      c.fillStyle = loc.palette.accent;
    }
    c.fillStyle = '#0a0d12';
    c.fillRect(0, h*0.62, w, h*0.4);
    c.strokeStyle = 'rgba(212, 165, 90, 0.2)';
    c.beginPath();
    c.moveTo(0, h*0.72);
    c.lineTo(w, h*0.72);
    c.stroke();
  } else if (id === 'docks') {
    c.fillStyle = '#0d1820';
    c.fillRect(0, h*0.5, w, h*0.5);
    c.fillStyle = loc.palette.accent;
    c.fillRect(w*0.05, h*0.3, w*0.45, h*0.4);
    c.fillRect(w*0.55, h*0.35, w*0.4, h*0.3);
    c.fillStyle = 'rgba(95, 168, 165, 0.4)';
    c.beginPath();
    c.arc(w*0.85, h*0.2, 4, 0, Math.PI*2);
    c.fill();
    c.fillStyle = '#1a2a3a';
    for (let i = 0; i < 4; i++) {
      c.fillRect(w*0.1 + i*w*0.2, h*0.55, 6, h*0.15);
    }
    c.fillStyle = 'rgba(95, 168, 165, 0.15)';
    c.fillRect(0, h*0.7, w, 2);
  } else if (id === 'club') {
    c.fillStyle = '#1a0810';
    c.fillRect(0, 0, w, h);
    const grd2 = c.createRadialGradient(w*0.5, h*0.5, 0, w*0.5, h*0.5, w*0.6);
    grd2.addColorStop(0, 'rgba(224, 100, 100, 0.3)');
    grd2.addColorStop(1, 'rgba(26, 8, 16, 0)');
    c.fillStyle = grd2;
    c.fillRect(0, 0, w, h);
    c.fillStyle = '#2a1018';
    c.fillRect(w*0.3, h*0.45, w*0.4, h*0.15);
    c.fillStyle = 'rgba(212, 165, 90, 0.4)';
    for (let i = 0; i < 5; i++) {
      const lx = w*0.32 + i*(w*0.4/4);
      c.beginPath();
      c.arc(lx, h*0.43, 3 + Math.sin(t*2 + i)*1, 0, Math.PI*2);
      c.fill();
    }
    c.fillStyle = '#0a0408';
    c.fillRect(0, h*0.65, w, h*0.4);
  } else if (id === 'office') {
    c.fillStyle = '#1a1d24';
    c.fillRect(0, 0, w, h);
    c.fillStyle = '#2a3142';
    for (let i = 0; i < 12; i++) {
      const wx = (i % 4) * (w / 4) + 20;
      const wy = Math.floor(i / 4) * (h / 4) + 20;
      c.fillStyle = Math.random() < 0.4 ? 'rgba(212, 165, 90, 0.3)' : '#2a3142';
      c.fillRect(wx, wy, w/4 - 40, h/4 - 40);
    }
    c.fillStyle = '#0f1218';
    c.fillRect(0, h*0.7, w, h*0.4);
    c.fillStyle = '#3a3025';
    c.fillRect(w*0.2, h*0.65, w*0.6, h*0.1);
  } else if (id === 'alley') {
    c.fillStyle = '#0a0c10';
    c.fillRect(0, 0, w, h);
    c.fillStyle = '#1a1d24';
    c.fillRect(0, h*0.2, w*0.35, h*0.8);
    c.fillRect(w*0.65, h*0.2, w*0.35, h*0.8);
    const fog = c.createLinearGradient(0, h*0.4, 0, h);
    fog.addColorStop(0, 'rgba(176, 69, 69, 0)');
    fog.addColorStop(0.6, 'rgba(176, 69, 69, 0.1)');
    fog.addColorStop(1, 'rgba(176, 69, 69, 0.2)');
    c.fillStyle = fog;
    c.fillRect(0, 0, w, h);
    c.fillStyle = 'rgba(212, 165, 90, 0.15)';
    c.beginPath();
    c.arc(w*0.5, h*0.15, 30, 0, Math.PI*2);
    c.fill();
  }
  c.restore();
}

function drawHotspot(x, y, t, isNpc, used, hs) {
  const c = sceneCtx;
  const pulse = used ? 0 : (Math.sin(t * 3) + 1) * 0.5;
  const r = 18 + pulse * 4;

  c.save();
  if (used) {
    c.strokeStyle = 'rgba(95, 168, 165, 0.6)';
    c.lineWidth = 2;
    c.beginPath();
    c.arc(x, y, 14, 0, Math.PI*2);
    c.stroke();
    c.fillStyle = 'rgba(95, 168, 165, 0.9)';
    c.font = 'bold 14px Georgia';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText('✓', x, y);
  } else {
    c.fillStyle = `rgba(${isNpc ? '224, 100, 100' : '212, 165, 90'}, ${0.15 + pulse * 0.2})`;
    c.beginPath();
    c.arc(x, y, r + 6, 0, Math.PI*2);
    c.fill();

    c.strokeStyle = isNpc ? '#e06464' : '#d4a55a';
    c.lineWidth = 2;
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI*2);
    c.stroke();

    c.fillStyle = isNpc ? '#e06464' : '#d4a55a';
    c.font = 'bold 16px Georgia';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(isNpc ? '!' : '?', x, y);
  }

  c.fillStyle = 'rgba(232, 223, 199, 0.8)';
  c.font = '11px ui-sans-serif, sans-serif';
  c.textAlign = 'center';
  c.fillText(hs.label, x, y + r + 18);
  c.restore();
}

// ============ DIALOGUE ============

function showDialogue(npcId) {
  const npc = NPCS[npcId];
  const dlg = DIALOGUES[npcId];
  if (!dlg) return;

  State.npcsTalked.add(npcId);
  saveGame();

  const overlay = document.createElement('div');
  overlay.className = 'dialogue-overlay show';
  overlay.innerHTML = `
    <div class="dialogue-portrait">
      <div class="portrait-circle">${npc.face}</div>
      <div class="who">
        <span class="name">${npc.name}</span>
        <span class="role">${npc.role}</span>
      </div>
    </div>
    <div class="dialogue-text" id="dlg-text"></div>
    <div class="dialogue-options" id="dlg-options"></div>
  `;
  document.body.appendChild(overlay);

  const textEl = overlay.querySelector('#dlg-text');
  const optsEl = overlay.querySelector('#dlg-options');

  function showLine(speaker, text, callback) {
    textEl.innerHTML = `<span class="speaker-tag">${speaker}</span>${text}`;
    optsEl.innerHTML = '';
    const btn = document.createElement('button');
    btn.className = 'dialogue-option';
    btn.textContent = 'Continuar';
    btn.onclick = () => { Audio.click(); callback(); };
    optsEl.appendChild(btn);
  }

  function showOptions() {
    textEl.innerHTML = `<span class="speaker-tag">${npc.name}</span>${dlg.intro}`;
    optsEl.innerHTML = '';
    dlg.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'dialogue-option';
      const hasEvidence = opt.need ? State.cluesFound.has(opt.need) : true;
      if (opt.need && !hasEvidence) return;
      if (opt.need) btn.classList.add('evidence');
      btn.textContent = opt.q;
      btn.onclick = () => {
        Audio.click();
        showLine(npc.name, opt.a, () => {
          if (opt.unlock) State.flags[opt.unlock] = true;
          saveGame();
          showOptions();
        });
      };
      optsEl.appendChild(btn);
    });
    const close = document.createElement('button');
    close.className = 'dialogue-option';
    close.textContent = 'Encerrar conversa';
    close.style.borderColor = 'var(--blood)';
    close.style.color = 'var(--blood-bright)';
    close.onclick = () => {
      Audio.click();
      overlay.remove();
    };
    optsEl.appendChild(close);
  }

  showOptions();
}

// ============ INVENTORY ============

function showInventory() {
  const overlay = document.createElement('div');
  overlay.className = 'inventory-overlay show';
  const found = [...State.cluesFound];
  overlay.innerHTML = `
    <div class="inv-header">
      <div>
        <div class="eyebrow">Caderno</div>
        <h2>Pistas (${found.length})</h2>
      </div>
      <button class="icon-btn" id="inv-close">×</button>
    </div>
    ${found.length === 0
      ? '<div class="inv-empty">Você ainda não encontrou nenhuma pista.</div>'
      : '<div class="inv-grid" id="inv-grid"></div>'}
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('#inv-close').onclick = () => { Audio.click(); overlay.remove(); };

  if (found.length > 0) {
    const grid = overlay.querySelector('#inv-grid');
    found.forEach(id => {
      const c = CLUES[id];
      const item = document.createElement('button');
      item.className = 'inv-item';
      item.innerHTML = `
        <div class="icon">${c.icon}</div>
        <div class="label">${c.label}</div>
        <div class="place">${c.where}</div>
      `;
      item.onclick = () => { Audio.click(); showClueDetail(c); };
      grid.appendChild(item);
    });
  }
}

function showClueDetail(clue) {
  const detail = document.createElement('div');
  detail.className = 'inv-detail show';
  detail.innerHTML = `
    <div class="icon-large">${clue.icon}</div>
    <h3>${clue.label}</h3>
    <div class="where">${clue.where}</div>
    <div class="text">${clue.text}</div>
    <button class="btn primary" id="close-detail">Fechar</button>
  `;
  document.body.appendChild(detail);
  detail.querySelector('#close-detail').onclick = () => { Audio.click(); detail.remove(); };
}

// ============ DEFENSE MINIGAME ============

function showDefense() {
  Background.setMode('rain');
  Audio.stopAmbient();

  transitionTo(screen => {
    screen.classList.add('defense-screen');
    screen.innerHTML = `
      <div class="hud-floating">
        <div class="location-name">Beco do Porto — Emboscada</div>
      </div>
      <div class="defense-hud">
        <div class="defense-stat hp">VIDA: <span class="val" id="def-hp">100</span></div>
        <div class="defense-stat">ONDA: <span class="val" id="def-wave">1/3</span></div>
        <div class="defense-stat">INIMIGOS: <span class="val" id="def-enemies">0</span></div>
      </div>
      <canvas id="defense-canvas"></canvas>
      <div class="defense-instructions fade" id="def-inst">
        Arraste para mover. Você atira automaticamente.
      </div>
    `;
    runDefense(screen);
  });
}

function runDefense(screen) {
  const canvas = screen.querySelector('#defense-canvas');
  const ctx = canvas.getContext('2d');
  const hpEl = screen.querySelector('#def-hp');
  const waveEl = screen.querySelector('#def-wave');
  const enemiesEl = screen.querySelector('#def-enemies');

  let w = 0, h = 0, dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    w = r.width;
    h = r.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  const player = { x: w * 0.5, y: h * 0.8, r: 14, hp: 100, cooldown: 0 };
  const bullets = [];
  const enemies = [];
  const particles = [];
  let wave = 1;
  const TOTAL_WAVES = 3;
  let toSpawn = 6;
  let spawnTimer = 0;
  let waveBreak = 0;
  let gameOver = false;
  let won = false;
  let lastT = performance.now();
  let aimTarget = null;

  function spawnEnemy() {
    const fromTop = Math.random() < 0.7;
    let x, y;
    if (fromTop) {
      x = Math.random() * w;
      y = -20;
    } else {
      x = Math.random() < 0.5 ? -20 : w + 20;
      y = Math.random() * h * 0.5;
    }
    enemies.push({
      x, y, r: 13,
      hp: 2 + Math.floor((wave - 1) * 0.5),
      speed: 50 + wave * 15 + Math.random() * 20,
      cooldown: 1 + Math.random(),
    });
  }

  function shoot() {
    if (enemies.length === 0) return;
    let target = aimTarget;
    if (!target) {
      let best = Infinity;
      for (const e of enemies) {
        const d = Math.hypot(e.x - player.x, e.y - player.y);
        if (d < best) { best = d; target = e; }
      }
    }
    if (!target) return;
    const dx = target.x - player.x;
    const dy = target.y - player.y;
    const len = Math.hypot(dx, dy) || 1;
    bullets.push({
      x: player.x, y: player.y,
      vx: dx / len * 600, vy: dy / len * 600,
      life: 1.5,
    });
    Audio.shot();
  }

  function update(dt) {
    if (gameOver) return;

    player.cooldown -= dt;
    if (player.cooldown <= 0) {
      shoot();
      player.cooldown = 0.25;
    }

    if (waveBreak > 0) {
      waveBreak -= dt;
      if (waveBreak <= 0 && wave < TOTAL_WAVES) {
        wave++;
        toSpawn = 6 + wave * 2;
        waveEl.textContent = `${wave}/${TOTAL_WAVES}`;
      }
    } else {
      spawnTimer -= dt;
      if (spawnTimer <= 0 && toSpawn > 0) {
        spawnEnemy();
        toSpawn--;
        spawnTimer = Math.max(0.4, 1.2 - wave * 0.15);
      }
    }

    if (toSpawn <= 0 && enemies.length === 0 && waveBreak <= 0) {
      if (wave >= TOTAL_WAVES) {
        won = true;
        gameOver = true;
        endDefense(true);
        return;
      } else {
        waveBreak = 2.5;
      }
    }

    for (const b of bullets) {
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.life -= dt;
    }
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      if (b.life <= 0 || b.x < 0 || b.x > w || b.y < 0 || b.y > h) bullets.splice(i, 1);
    }

    for (const e of enemies) {
      const dx = player.x - e.x;
      const dy = player.y - e.y;
      const d = Math.hypot(dx, dy) || 1;
      e.x += dx / d * e.speed * dt;
      e.y += dy / d * e.speed * dt;
      e.cooldown -= dt;
      if (d < e.r + player.r + 5 && e.cooldown <= 0) {
        player.hp -= 8;
        e.cooldown = 0.6;
        Audio.hurt();
        for (let k = 0; k < 6; k++) {
          particles.push({ x: player.x, y: player.y, vx: (Math.random()-0.5)*200, vy: (Math.random()-0.5)*200, life: 0.5, color: '#e06464' });
        }
        if (player.hp <= 0) {
          gameOver = true;
          endDefense(false);
          return;
        }
      }
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];
      for (let j = bullets.length - 1; j >= 0; j--) {
        const b = bullets[j];
        if (Math.hypot(b.x - e.x, b.y - e.y) < e.r + 4) {
          e.hp--;
          bullets.splice(j, 1);
          for (let k = 0; k < 4; k++) {
            particles.push({ x: e.x, y: e.y, vx: (Math.random()-0.5)*150, vy: (Math.random()-0.5)*150, life: 0.4, color: '#d4a55a' });
          }
          Audio.hit();
          if (e.hp <= 0) {
            enemies.splice(i, 1);
            for (let k = 0; k < 10; k++) {
              particles.push({ x: e.x, y: e.y, vx: (Math.random()-0.5)*250, vy: (Math.random()-0.5)*250, life: 0.6, color: '#b04545' });
            }
          }
          break;
        }
      }
    }

    for (const p of particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.95;
      p.vy *= 0.95;
      p.life -= dt;
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].life <= 0) particles.splice(i, 1);
    }

    hpEl.textContent = Math.max(0, Math.floor(player.hp));
    enemiesEl.textContent = enemies.length + toSpawn;
  }

  function draw() {
    ctx.fillStyle = '#08090c';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(180, 200, 220, 0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 20; i++) {
      const x = (i * 37 + (performance.now() / 30)) % (w + 20) - 10;
      const y = ((i * 13) + (performance.now() / 10)) % h;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 1, y + 8);
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(176, 69, 69, 0.05)';
    ctx.fillRect(0, h * 0.85, w, h * 0.15);

    if (waveBreak > 0 && wave < TOTAL_WAVES) {
      ctx.fillStyle = 'rgba(212, 165, 90, 0.9)';
      ctx.font = 'bold 24px Georgia';
      ctx.textAlign = 'center';
      ctx.fillText(`Onda ${wave + 1} em ${Math.ceil(waveBreak)}...`, w/2, h/2);
    }

    for (const p of particles) {
      ctx.globalAlpha = Math.max(0, p.life * 2);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
    }
    ctx.globalAlpha = 1;

    ctx.strokeStyle = '#d4a55a';
    ctx.lineWidth = 2;
    for (const b of bullets) {
      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(b.x - b.vx * 0.015, b.y - b.vy * 0.015);
      ctx.stroke();
    }

    for (const e of enemies) {
      ctx.fillStyle = '#1a0a0a';
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r, 0, Math.PI*2);
      ctx.fill();
      ctx.strokeStyle = '#b04545';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#e06464';
      ctx.beginPath();
      ctx.arc(e.x - 4, e.y - 3, 2, 0, Math.PI*2);
      ctx.arc(e.x + 4, e.y - 3, 2, 0, Math.PI*2);
      ctx.fill();
    }

    ctx.fillStyle = '#1a1d24';
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.r, 0, Math.PI*2);
    ctx.fill();
    ctx.strokeStyle = '#d4a55a';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#d4a55a';
    ctx.beginPath();
    ctx.arc(player.x, player.y - 4, 5, 0, Math.PI*2);
    ctx.fill();
  }

  let raf;
  function loop(now) {
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;
    update(dt);
    draw();
    if (!gameOver || particles.length > 0) raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);

  function pointerMove(e) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    player.x = Math.max(player.r, Math.min(w - player.r, t.clientX - rect.left));
    player.y = Math.max(player.r, Math.min(h - player.r, t.clientY - rect.top));
  }

  canvas.addEventListener('touchmove', pointerMove, { passive: false });
  canvas.addEventListener('touchstart', pointerMove, { passive: false });
  canvas.addEventListener('mousemove', (e) => { if (e.buttons) pointerMove(e); });
  canvas.addEventListener('mousedown', pointerMove);

  function endDefense(victory) {
    cancelAnimationFrame(raf);
    setTimeout(() => {
      if (victory) {
        State.cluesFound.add('gloves');
        State.defenseCompleted = true;
        State.locationsVisited.add('alley');
        saveGame();
        Audio.win();
        showNarrativeBetween(
          'Vitória',
          'Você se encosta na parede do beco, ofegante. Os capangas estão no chão. No bolso do último, escondidas, você encontra luvas de couro fino com manchas escuras de sangue. Iniciais bordadas: H.W.\n\nO caso está quase fechado.',
          () => {
            toast('+ Luvas com sangue', '◆');
            showMap();
          }
        );
      } else {
        Audio.lose();
        showNarrativeBetween(
          'Derrota',
          'Você cai no chão molhado. A última coisa que vê é o brilho das luzes do porto. O caso fica em aberto. O assassino caminha livre.\n\nDescanse. Tente novamente.',
          () => {
            State.cluesFound.delete('gloves');
            State.defenseCompleted = false;
            saveGame();
            showMap();
          }
        );
      }
    }, won ? 600 : 1200);
  }
}

function showNarrativeBetween(title, text, onContinue) {
  Background.setMode('rain');
  transitionTo(screen => {
    screen.classList.add('narrative-screen');
    screen.innerHTML = `
      <div class="narrative-box">
        <div class="chapter">${title}</div>
        <div class="text">${text}</div>
        <div class="narrative-actions">
          <button class="btn primary" id="continue-btn">Continuar</button>
        </div>
      </div>
    `;
    screen.querySelector('#continue-btn').onclick = () => {
      Audio.click();
      onContinue();
    };
  });
}

// ============ DEDUCTION ============

let deductionState = { suspect: null, evidence: new Set() };

function showDeduction() {
  deductionState = { suspect: null, evidence: new Set() };
  Background.setMode('rain');

  transitionTo(screen => {
    screen.classList.add('deduction-screen');
    const found = [...State.cluesFound];
    screen.innerHTML = `
      <div class="hud">
        <div class="title-line">
          <div class="place display">A Acusação</div>
          <div class="meta">Aponte o assassino</div>
        </div>
        <button class="icon-btn" id="back-btn">↩</button>
      </div>
      <div class="deduction-intro">
        <p>Escolha o suspeito e três pistas que sustentem sua acusação.</p>
        <p style="color: var(--ink-mute); margin-top: 8px;">A escolha é definitiva.</p>
      </div>
      <div class="deduction-section">
        <h3>Suspeito</h3>
        <div class="suspect-grid" id="susp-grid"></div>
      </div>
      <div class="deduction-section">
        <h3>Evidências (escolha 3)</h3>
        <div class="evidence-list" id="ev-list"></div>
        <div class="deduction-counter" id="ev-counter">0 de 3 selecionadas</div>
      </div>
      <div class="deduction-actions">
        <button class="btn danger" id="accuse-btn" disabled>Apresentar acusação</button>
        <button class="btn ghost" id="back-btn-2">Voltar</button>
      </div>
    `;

    const suspGrid = screen.querySelector('#susp-grid');
    const evList = screen.querySelector('#ev-list');
    const counter = screen.querySelector('#ev-counter');
    const accuseBtn = screen.querySelector('#accuse-btn');

    function refresh() {
      counter.textContent = `${deductionState.evidence.size} de 3 selecionadas`;
      accuseBtn.disabled = !(deductionState.suspect && deductionState.evidence.size === 3);
    }

    SUSPECTS.forEach(id => {
      const info = SUSPECT_INFO[id];
      const card = document.createElement('button');
      card.className = 'suspect-card';
      card.innerHTML = `
        <div class="face">${info.face}</div>
        <div class="name">${info.name}</div>
        <div class="role">${info.role}</div>
      `;
      card.onclick = () => {
        Audio.click();
        deductionState.suspect = id;
        suspGrid.querySelectorAll('.suspect-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        refresh();
      };
      suspGrid.appendChild(card);
    });

    if (found.length === 0) {
      evList.innerHTML = '<div class="inv-empty">Nenhuma pista para apresentar.</div>';
    } else {
      found.forEach(id => {
        const c = CLUES[id];
        const chip = document.createElement('button');
        chip.className = 'evidence-chip';
        chip.innerHTML = `<span class="ic">${c.icon}</span><span>${c.label}</span>`;
        chip.onclick = () => {
          Audio.click();
          if (chip.classList.contains('selected')) {
            chip.classList.remove('selected');
            deductionState.evidence.delete(id);
          } else {
            if (deductionState.evidence.size >= 3) return;
            chip.classList.add('selected');
            deductionState.evidence.add(id);
          }
          refresh();
        };
        evList.appendChild(chip);
      });
    }

    accuseBtn.onclick = () => {
      Audio.click();
      const suspect = deductionState.suspect;
      const ev = [...deductionState.evidence];
      const correctSuspect = suspect === SOLUTION_SUSPECT;
      const validEvidence = ev.filter(id => KEY_EVIDENCE.includes(id)).length;
      const win = correctSuspect && validEvidence >= 2;
      showEnding(win, suspect, ev);
    };

    screen.querySelector('#back-btn').onclick = () => { Audio.click(); showMap(); };
    screen.querySelector('#back-btn-2').onclick = () => { Audio.click(); showMap(); };
  });
}

// ============ ENDING ============

function showEnding(win, suspect, evidence) {
  if (win) Audio.win(); else Audio.lose();

  const time = State.startTime ? Math.floor((Date.now() - State.startTime) / 60000) : 0;
  const cluesCount = State.cluesFound.size;

  const winText = `Henrique Werner está sentado à sua frente. Não nega.

"Ele tirou tudo de mim", você ouve. "Tudo o que eu seria. A noite estava chovendo. Eu só queria conversar. Mas o frasco — eu já tinha trazido. Não sei se planejei. Talvez sim."

A digitoxina adulterada. O botão arrancado na luta. As luvas com sangue dos seus arranhões.

Você apresenta tudo ao delegado às oito da manhã. Cinco horas depois, Henrique é preso.

A esposa de Augusto te paga em dinheiro.

Está chovendo de novo. Você acende um cigarro na escada do prédio.
Outro caso fechado.`;

  const loseText = `Você apresenta a acusação. O delegado escuta. Coça a cabeça.

"Detetive, com todo o respeito — o senhor não tem o suficiente. Esta acusação não vai a julgamento."

Você sai da delegacia sem o caso. A vítima ficou sem justiça. O assassino — quem quer que seja — segue livre.

Talvez você tenha apontado a pessoa errada. Talvez as pistas certas estivessem lá, e você não as viu.

A chuva começa de novo. Você caminha sob ela.

Há sempre um próximo caso.`;

  Background.setMode('rain');
  transitionTo(screen => {
    screen.classList.add('ending-screen');
    screen.innerHTML = `
      <div class="ending-content">
        <p class="eyebrow" style="color: var(--gold);">Epílogo</p>
        <h1 class="verdict ${win ? 'win' : 'lose'}">${win ? 'Caso Encerrado' : 'Caso em Aberto'}</h1>
        <div class="stats">
          <div><b>${cluesCount}</b>Pistas</div>
          <div><b>${time}m</b>Tempo</div>
          <div><b>${win ? '✓' : '✗'}</b>Veredito</div>
        </div>
        <div class="epilogue">${win ? winText : loseText}</div>
        <div style="display:flex; flex-direction:column; gap:10px; margin-top:24px;">
          ${win ? '<button class="btn primary" id="restart-btn">Novo Caso</button>'
                : '<button class="btn primary" id="retry-btn">Voltar à investigação</button>'}
          <button class="btn ghost" id="title-btn">Menu Principal</button>
        </div>
      </div>
    `;

    if (win) {
      clearSave();
      screen.querySelector('#restart-btn').onclick = () => {
        Audio.click();
        resetState();
        showIntro();
      };
    } else {
      screen.querySelector('#retry-btn').onclick = () => {
        Audio.click();
        showMap();
      };
    }
    screen.querySelector('#title-btn').onclick = () => {
      Audio.click();
      saveGame();
      showTitle();
    };
  });
}

// ============ BOOT ============

document.addEventListener('click', () => Audio.resume(), { once: true });
document.addEventListener('touchstart', () => Audio.resume(), { once: true });

document.body.classList.add('grain');
showTitle();

})();
