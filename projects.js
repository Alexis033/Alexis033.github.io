const projectsData = [
  {
    id: 'enrollment',
    title: 'School enrollment management system',
    description: 'The project aims to develop a document management system for student registration using Bootstrap for the user interface design, React JS for the frontend, Python as the main programming language, and FastAPI as the framework for developing the RESTful API.',
    tech: ['React', 'Bootstrap', 'Python', 'MySQL'],
    github: 'https://github.com/Alexis033/miweb',
    demo: 'https://alexis033.github.io/SRDM/',
    img: 'img/app.png',
    imgAlt: 'Image of the application login interface',
    featured: false
  },
  {
    id: 'murdoku',
    title: 'Murdoku Studio',
    description: 'Editor y reproductor de Murdoku — acertijos de l\u00f3gica y asesinatos. Hecho con HTML, CSS y JavaScript vanilla, con tablero interactivo, editor de casos, y detecci\u00f3n de sospechosos por zona.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/Alexis033/mordoku_maker',
    demo: 'https://alexis033.github.io/mordoku_maker/',
    img: 'img/mordoku_studio.png',
    imgAlt: 'Murdoku Studio interface',
    featured: true
  },
  {
    id: 'tictactoe',
    title: 'Tic-tac-toe',
    description: 'A tic tac toe game created using React JS and CSS, with options to play against the computer or another player locally. It includes features to save the user\'s score and the last unfinished game.',
    tech: ['React', 'CSS'],
    github: 'https://github.com/Alexis033/Aprendiendo-React/tree/main/projects/02-tic-tac-toe',
    demo: 'https://tic-tac-toe-snowy-nine.vercel.app/',
    img: 'img/Tic-tac-toe.png',
    imgAlt: 'Image game: tic-tac-toe',
    featured: false
  },
  {
    id: 'textlock',
    title: 'TextLock',
    description: 'Text encryptor using HTML, CSS, and JavaScript. The project includes a form that allows the user to enter a text and encrypt or decrypt it.',
    tech: ['JavaScript', 'CSS', 'HTML'],
    github: 'https://github.com/Alexis033/encriptador',
    demo: 'https://alexis033.github.io/encriptador/',
    img: 'img/encrypt.png',
    imgAlt: 'Image interface TextLock',
    featured: false
  },
  {
    id: 'todolist',
    title: 'Todo-list',
    description: 'This project is a task list application built with React and TypeScript. It allows users to create, edit, and delete tasks, as well as mark them as completed.',
    tech: ['React', 'TypeScript', 'CSS'],
    github: 'https://github.com/Alexis033/Todolist',
    demo: 'https://todolist-ruby-ten.vercel.app/',
    img: 'img/Todolist.png',
    imgAlt: 'Todolist app interface',
    featured: false
  }
];

const techMeta = {
  React: { icon: 'fa-brands fa-react', color: 'rgb(8, 126, 164)', label: 'React' },
  Bootstrap: { icon: 'fa-brands fa-bootstrap', color: 'rgb(120, 17, 247)', label: 'Bootstrap' },
  Python: { icon: 'fa-brands fa-python', color: 'rgb(55, 118, 171)', label: 'Python' },
  JavaScript: { icon: 'fa-brands fa-square-js', color: 'rgb(240, 219, 81)', label: 'JavaScript' },
  HTML: { icon: 'fa-brands fa-html5', color: 'rgb(227, 79, 38)', label: 'HTML5' },
  CSS: { icon: 'fa-brands fa-css3-alt', color: 'rgb(7, 74, 242)', label: 'CSS3' },
  TypeScript: { icon: null, img: 'img/Typescript_logo.svg', label: 'TypeScript' },
  MySQL: { icon: 'fa-solid fa-database', color: 'rgb(0, 123, 154)', label: 'MySQL' }
};

function techBadgeHTML(tech) {
  const meta = techMeta[tech];
  const color = meta?.color || 'var(--muted)';
  return `<span class="tech-badge" style="--badge-color: ${color}">${meta?.label || tech}</span>`;
}

function techIconHTML(tech) {
  const meta = techMeta[tech];
  if (!meta) return '';
  if (meta.icon) {
    return `<i class="${meta.icon}" style="color: ${meta.color}" title="${meta.label}"></i>`;
  }
  if (meta.img) {
    return `<img src="${meta.img}" alt="${meta.label}" title="${meta.label}" style="height: 22px">`;
  }
  return '';
}

function renderHero(filter) {
  const container = document.getElementById('heroProject');
  if (!container) return;

  const project = !filter || filter === 'All'
    ? projectsData.find(p => p.featured)
    : projectsData.find(p => p.tech.includes(filter));

  if (!project) { container.innerHTML = ''; return; }

  container.innerHTML = `
    <div class="hero-project">
      <div class="hero__content">
        <h3 class="hero__title">${project.title}</h3>
        <p class="hero__description">${project.description}</p>
        <div class="hero__tech">${project.tech.map(t => techBadgeHTML(t)).join('')}</div>
        <div class="hero__actions">
          <a href="${project.demo}" target="_blank" class="button hero__btn"><i class="fa-solid fa-eye"></i> Live Demo</a>
          <a href="${project.github}" target="_blank" class="button button--outline hero__btn"><i class="fa-brands fa-github"></i> GitHub</a>
        </div>
      </div>
      <a href="${project.demo}" target="_blank" class="hero__mockup">
        <div class="mockup-bar">
          <span class="mockup-dot" style="background:#ef4444"></span>
          <span class="mockup-dot" style="background:#facc15"></span>
          <span class="mockup-dot" style="background:#22c55e"></span>
          <span class="mockup-url">${new URL(project.demo).hostname}</span>
        </div>
        <img class="mockup-img" src="${project.img}" alt="${project.imgAlt}" loading="lazy">
      </a>
    </div>
  `;
}

function getUniqueTech() {
  const set = new Set();
  projectsData.forEach(p => p.tech.forEach(t => set.add(t)));
  return ['All', ...Array.from(set)];
}

function renderFilterBar() {
  const container = document.getElementById('filterBar');
  if (!container) return;
  const techs = getUniqueTech();
  container.innerHTML = techs.map(t =>
    `<button class="filter-btn${t === 'All' ? ' active' : ''}" data-filter="${t}">${t}</button>`
  ).join('');
}

function renderGrid(filter, excludeId) {
  const container = document.getElementById('projectsGrid');
  if (!container) return;

  const filtered = projectsData.filter(p => {
    if (p.id === excludeId) return false;
    if (!filter || filter === 'All') return true;
    return p.tech.includes(filter);
  });

  if (filtered.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="project-card" data-project="${p.id}">
      <div class="project-card__img-wrap">
        <img class="project-card__img" src="${p.img}" alt="${p.imgAlt}" loading="lazy">
        <div class="project-card__overlay"><i class="fa-solid fa-expand"></i></div>
      </div>
      <div class="project-card__body">
        <h4 class="project-card__title">${p.title}</h4>
        <div class="project-card__tech">${p.tech.map(t => techIconHTML(t)).join('')}</div>
      </div>
    </div>
  `).join('');
}

function initFilters() {
  const bar = document.getElementById('filterBar');
  if (!bar) return;
  bar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    const hero = !filter || filter === 'All'
      ? projectsData.find(p => p.featured)
      : projectsData.find(p => p.tech.includes(filter));
    renderHero(filter);
    renderGrid(filter, hero?.id);
  });
}

function renderModalContent(project) {
  return `
    <div class="modal-layout">
      <div class="modal-img-wrap">
        <img class="modal-img" src="${project.img}" alt="${project.imgAlt}">
      </div>
      <div class="modal-body">
        <h3 class="modal-title">${project.title}</h3>
        <div class="modal-tech">${project.tech.map(t => techBadgeHTML(t)).join('')}</div>
        <p class="modal-description">${project.description}</p>
        <div class="modal-actions">
          <a href="${project.demo}" target="_blank" class="button"><i class="fa-solid fa-eye"></i> Live Demo</a>
          <a href="${project.github}" target="_blank" class="button button--outline"><i class="fa-brands fa-github"></i> Source Code</a>
        </div>
      </div>
    </div>
  `;
}

function initModal() {
  const overlay = document.getElementById('projectModal');
  const body = document.getElementById('modalBody');
  const close = overlay.querySelector('.modal-close');

  document.getElementById('projectsGrid').addEventListener('click', e => {
    const card = e.target.closest('.project-card');
    if (!card) return;
    const project = projectsData.find(p => p.id === card.dataset.project);
    if (!project) return;
    body.innerHTML = renderModalContent(project);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  close.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHero('All');
  renderFilterBar();
  renderGrid('All', projectsData.find(p => p.featured)?.id);
  initFilters();
  initModal();
});
