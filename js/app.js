const defaults = {
  headline: 'Two souls, One blessed\njourney',
  brideName: 'Prashani',
  groomName: 'Sanjaya',
  brideParents: 'Beloved daughter of Mr. Gamini Ariyawansa & Mrs. Renuka Liyanagedara',
  groomParents: 'Beloved son of Mrs. Shanthi Samarasinghe & the late Mr. Susil Perera',
  guestName: 'Janith',
  day: 'Thursday',
  month: 'June',
  date: '04',
  year: '2026',
  time: '9:15 AM – 3:30 PM',
  poruwa: '(Poruwa 9:30 AM)',
  venue: 'Grand Mondo Luxury Banquets',
  location: 'Homagama, Sri Lanka',
  mapLink: 'https://maps.google.com/?q=Grand+Mondo+Luxury+Banquets+Homagama',
  finalWish: 'Your blessed presence is awaited'
};

const $ = (selector) => document.querySelector(selector);
const form = $('#inviteForm');
const params = new URLSearchParams(window.location.search);

function getState() {
  const state = { ...defaults };
  Object.keys(defaults).forEach((key) => {
    if (params.has(key)) state[key] = params.get(key);
  });
  return state;
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function render(state) {
  const headline = document.getElementById('headline');
  if (headline) headline.innerHTML = String(state.headline).split('\n').map(x => x.trim()).join('<br />');
  setText('brideParents', state.brideParents);
  setText('groomParents', state.groomParents);
  setText('brideName', state.brideName);
  setText('groomName', state.groomName);
  setText('closingBride', state.brideName);
  setText('closingGroom', state.groomName);
  setText('guestName', state.guestName);
  setText('day', state.day);
  setText('month', state.month.toUpperCase());
  setText('date', state.date);
  setText('year', state.year);
  setText('time', state.time);
  setText('poruwa', state.poruwa);
  setText('venue', state.venue);
  setText('location', state.location);
  setText('finalWish', state.finalWish);
  const mapLink = document.getElementById('mapLink');
  if (mapLink) mapLink.href = state.mapLink;
  document.title = `${state.brideName} & ${state.groomName} — Wedding Invitation for ${state.guestName}`;
}

function fillForm(state) {
  Object.keys(defaults).forEach((key) => {
    const input = form.elements[key];
    if (input) input.value = state[key];
  });
}

function buildUrl(state) {
  const url = new URL(window.location.href);
  url.search = '';
  Object.entries(state).forEach(([key, value]) => {
    if (String(value) !== String(defaults[key])) url.searchParams.set(key, value);
  });
  return url.toString();
}

let state = getState();
render(state);
fillForm(state);

$('#editToggle').addEventListener('click', () => $('#editorPanel').classList.add('open'));
$('#closeEditor').addEventListener('click', () => $('#editorPanel').classList.remove('open'));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  state = { ...defaults };
  Object.keys(defaults).forEach((key) => state[key] = formData.get(key) || defaults[key]);
  render(state);
  history.replaceState(null, '', buildUrl(state));
  $('#editorPanel').classList.remove('open');
});

$('#resetBtn').addEventListener('click', () => {
  state = { ...defaults };
  render(state);
  fillForm(state);
  history.replaceState(null, '', window.location.pathname);
});

$('#copyLinkBtn').addEventListener('click', async () => {
  const formData = new FormData(form);
  const current = { ...defaults };
  Object.keys(defaults).forEach((key) => current[key] = formData.get(key) || defaults[key]);
  const url = buildUrl(current);
  try {
    await navigator.clipboard.writeText(url);
    $('#copyLinkBtn').textContent = 'Copied ✓';
  } catch {
    prompt('Copy this URL:', url);
  }
  setTimeout(() => $('#copyLinkBtn').textContent = 'Copy Client URL', 1400);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
/* ==================================================
   Mixed Falling Petals, Flowers and Leaves
================================================== */

const petalsLayer = document.getElementById('petalsLayer');

const fallingAssets = [
  {
    type: 'petal'
  },
  {
    type: 'petal'
  },
  {
    type: 'flower',
    src: 'assets/falling/fall-flower-1.webp'
  },
  {
    type: 'flower',
    src: 'assets/falling/fall-flower-2.webp'
  },
  {
    type: 'leaf',
    src: 'assets/falling/fall-leaf-1.webp'
  }
];

function createFallingItem() {
  if (!petalsLayer) return;

  const itemData = fallingAssets[Math.floor(Math.random() * fallingAssets.length)];

  let item;

  if (itemData.type === 'petal') {
    item = document.createElement('span');
    item.className = 'falling-item falling-petal';
  } else {
    item = document.createElement('img');
    item.src = itemData.src;
    item.alt = '';
    item.setAttribute('aria-hidden', 'true');
    item.className =
      itemData.type === 'flower'
        ? 'falling-item falling-flower'
        : 'falling-item falling-leaf-img';
  }

  const startLeft = Math.random() * 100;
  const drift = (Math.random() * 180 - 90).toFixed(0);
  const duration = (16 + Math.random() * 12).toFixed(1);
  const delay = (Math.random() * 5).toFixed(1);
  const scale = (0.75 + Math.random() * 0.65).toFixed(2);

  item.style.left = `${startLeft}%`;
  item.style.setProperty('--drift', `${drift}px`);
  item.style.setProperty('--scale', scale);
  item.style.animationDuration = `${duration}s`;
  item.style.animationDelay = `-${delay}s`;

  petalsLayer.appendChild(item);

  setTimeout(() => {
  item.remove();
}, (Number(duration) + 6) * 1000);
}

function startFallingAnimation() {
  if (!petalsLayer) return;

  for (let i = 0; i < 30; i++) {
    createFallingItem();
  }

  setInterval(createFallingItem, 700);
}

startFallingAnimation();