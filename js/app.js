const defaultData = {
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

const ids = ['headline','brideParents','groomParents','brideName','groomName','guestName','day','month','date','year','time','poruwa','venue','location','finalWish'];
const form = document.getElementById('inviteForm');
const editor = document.getElementById('editorPanel');
const params = new URLSearchParams(location.search);

function urlData(){
  const data = {};
  Object.keys(defaultData).forEach(key => {
    const value = params.get(key);
    if(value) data[key] = decodeURIComponent(value);
  });
  return data;
}

function getData(){
  const saved = JSON.parse(localStorage.getItem('weddingInviteData') || '{}');
  return {...defaultData, ...saved, ...urlData()};
}

function setText(id, value){
  const el = document.getElementById(id);
  if(!el) return;
  if(id === 'headline') el.innerHTML = String(value).replace(/\n/g, '<br/>');
  else el.textContent = value;
}

function render(data){
  ids.forEach(id => setText(id, data[id]));
  document.getElementById('closingBride').textContent = data.brideName;
  document.getElementById('closingGroom').textContent = data.groomName;
  document.getElementById('mapLink').href = data.mapLink;
  Object.keys(defaultData).forEach(key => {
    if(form.elements[key]) form.elements[key].value = data[key];
  });
  document.title = `${data.brideName} & ${data.groomName} Wedding Invitation`;
}

function collectForm(){
  const data = {};
  Object.keys(defaultData).forEach(key => data[key] = form.elements[key]?.value.trim() || defaultData[key]);
  return data;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = collectForm();
  localStorage.setItem('weddingInviteData', JSON.stringify(data));
  render(data);
  editor.classList.remove('open');
});

document.getElementById('resetBtn').addEventListener('click', () => {
  localStorage.removeItem('weddingInviteData');
  render(defaultData);
});

document.getElementById('copyLinkBtn').addEventListener('click', async () => {
  const data = collectForm();
  const query = new URLSearchParams(data).toString();
  const url = `${location.origin}${location.pathname}?${query}`;
  try{
    await navigator.clipboard.writeText(url);
    document.getElementById('copyLinkBtn').textContent = 'Copied URL ✓';
    setTimeout(() => document.getElementById('copyLinkBtn').textContent = 'Copy Client URL', 1600);
  }catch(err){
    prompt('Copy this URL:', url);
  }
});

document.getElementById('editToggle').addEventListener('click', () => editor.classList.add('open'));
document.getElementById('closeEditor').addEventListener('click', () => editor.classList.remove('open'));

function createPetals(){
  const layer = document.getElementById('petalsLayer');
  for(let i=0;i<46;i++){
    const el = document.createElement('span');
    el.className = Math.random() > .78 ? 'flower-dot' : 'petal';
    el.style.left = `${Math.random()*100}vw`;
    el.style.animationDuration = `${8 + Math.random()*12}s`;
    el.style.animationDelay = `${Math.random()*-15}s`;
    el.style.setProperty('--drift', `${(Math.random()*260)-130}px`);
    el.style.transform = `scale(${.7 + Math.random()*1.2})`;
    layer.appendChild(el);
  }
}

function revealOnScroll(){
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('show');
    });
  }, {threshold:.16});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

render(getData());
createPetals();
revealOnScroll();
