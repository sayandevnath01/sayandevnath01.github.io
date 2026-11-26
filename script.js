/* ==========================================================================
   PORTFOLIO CONTENT CONFIGURATION (Edit here to update your site)
   ========================================================================== */
const PORTFOLIO_DATA = {
  phrases: [
    'Computer Science & Engineering Student',
    'Competitive Programmer (C++ / Python)',
    'Numerical Computing Enthusiast',
    'Backend & REST API Developer'
  ],
  skills: [
    {
      icon: '{ }',
      title: 'Algorithms & Data Structures',
      text: 'Strong foundation in asymptotic time/space complexity, greedy strategies, number theory, and STL / Python collections optimization.',
      tags: ['C++17', 'Python', 'Big-O Analysis', 'STL']
    },
    {
      icon: '∑fx',
      title: 'Numerical Analysis & Scientific Computing',
      text: 'From-scratch implementations of Newton-Raphson, Secant, Newton Interpolation, Numerical Differentiation, and Matrix Rank/Inverse solvers.',
      tags: ['Root Finding', 'Interpolation', 'Linear Algebra', 'LaTeX']
    },
    {
      icon: 'API',
      title: 'Backend & Web Development',
      text: 'Designing structured RESTful APIs, OOP command-line architectures, and semantic, responsive front-end web interfaces.',
      tags: ['FastAPI', 'OOP Python', 'HTML5 / CSS3', 'Git & GitHub']
    }
  ],
  projects: [
    {
      title: 'Numerical Analysis Algorithm Suite',
      category: 'algorithms',
      text: 'Comprehensive library of numerical methods written in C++ and pure Python (zero NumPy dependencies), covering root finding, forward/backward interpolation, differentiation, and matrix operations.',
      tags: ['C++', 'Python', 'Numerical Methods', 'LaTeX Reports'],
      repo: 'https://github.com/sayandevnath01'
    },
    {
      title: 'Student Management REST API',
      category: 'backend',
      text: 'RESTful backend service built with FastAPI featuring path/query parameter filtering, lambda-driven dynamic sorting, JSON persistence, and strict HTTP status error handling.',
      tags: ['Python', 'FastAPI', 'REST API', 'JSON'],
      repo: 'https://github.com/sayandevnath01'
    },
    {
      title: 'OOP Student Database CLI',
      category: 'backend',
      text: 'Menu-driven object-oriented management system implementing encapsulated student records, class-level state transitions, and robust input validation.',
      tags: ['Python', 'OOP', 'CLI Architecture'],
      repo: 'https://github.com/sayandevnath01'
    },
    {
      title: 'Competitive Programming Template & Notes',
      category: 'algorithms',
      text: 'Curated reference repository of fast I/O boilerplates, mathematical utilities, and complexity benchmarks tailored for Codeforces and CodeChef contests.',
      tags: ['C++', 'Python', 'Competitive Programming'],
      repo: 'https://github.com/sayandevnath01'
    }
  ],
  profiles: [
    {
      title: 'Codeforces',
      handle: '_Sayan_Dev_Nath_',
      text: 'Algorithmic contests, upsolving, and rated problem-solving rounds.',
      url: 'https://codeforces.com/profile/_Sayan_Dev_Nath_'
    },
    {
      title: 'LeetCode',
      handle: 'SayanDevNath',
      text: 'Data structures, dynamic programming, and technical interview preparation.',
      url: 'https://leetcode.com/u/SayanDevNath/'
    },
    {
      title: 'CodeChef',
      handle: 'sayandevnath',
      text: 'Regular participation in Starters contests and constructive algorithm drills.',
      url: 'https://www.codechef.com/users/sayandevnath'
    },
    {
      title: 'GitHub',
      handle: 'sayandevnath01',
      text: 'Open-source coursework, lab implementations, and backend experiments.',
      url: 'https://github.com/sayandevnath01'
    }
  ]
};

/* ==========================================================================
   APPLICATION LOGIC
   ========================================================================== */
(function () {
  'use strict';

  // Helper to create DOM elements safely
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    }
    (children || []).forEach(c => {
      if (c !== null && c !== undefined) node.append(c);
    });
    return node;
  }

  // 1. Render Skills
  const skillGrid = document.getElementById('skillGrid');
  PORTFOLIO_DATA.skills.forEach(skill => {
    skillGrid.append(
      el('article', { class: 'card' }, [
        el('div', null, [
          el('div', { class: 'card-icon', 'aria-hidden': 'true' }, [skill.icon]),
          el('h3', null, [skill.title]),
          el('p', null, [skill.text])
        ]),
        el('div', { class: 'tags' }, skill.tags.map(t => el('span', { class: 'tag' }, [t])))
      ])
    );
  });

  // 2. Render & Filter Projects
  const projectGrid = document.getElementById('projectGrid');
  function renderProjects(filter = 'all') {
    projectGrid.innerHTML = '';
    const list = filter === 'all'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter(p => p.category === filter);

    list.forEach(proj => {
      projectGrid.append(
        el('article', { class: 'card' }, [
          el('div', null, [
            el('div', { class: 'project-top' }, [
              el('h3', null, [proj.title]),
              el('div', { class: 'project-links' }, [
                el('a', { href: proj.repo, target: '_blank', rel: 'noopener', 'aria-label': `Source code for ${proj.title}` }, ['Code ↗'])
              ])
            ]),
            el('p', null, [proj.text])
          ]),
          el('div', { class: 'tags' }, proj.tags.map(t => el('span', { class: 'tag' }, [t])))
        ])
      );
    });
  }
  renderProjects('all');

  document.getElementById('projectFilters').addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });

  // 3. Render Coding Profiles with One-Click Handle Copy
  const profileGrid = document.getElementById('profileGrid');
  PORTFOLIO_DATA.profiles.forEach(prof => {
    const copyBtn = el('button', { type: 'button', class: 'copy-btn', 'aria-label': `Copy handle ${prof.handle}` }, ['Copy']);
    copyBtn.addEventListener('click', () => {
      navigator.clipboard?.writeText(prof.handle).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1600);
      });
    });

    profileGrid.append(
      el('article', { class: 'card profile-card' }, [
        el('div', null, [
          el('div', { class: 'profile-header' }, [
            el('h3', null, [
              el('a', { href: prof.url, target: '_blank', rel: 'noopener' }, [`${prof.title} ↗`])
            ])
          ]),
          el('p', null, [prof.text])
        ]),
        el('div', { class: 'handle-row' }, [
          el('span', null, [`@${prof.handle}`]),
          copyBtn
        ])
      ])
    );
  });

  // 4. Footer Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // 5. Theme Switcher (Persistent via localStorage)
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
    localStorage.setItem('portfolio-theme', theme);
  }

  const savedTheme = localStorage.getItem('portfolio-theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  // 6. Hero Typing Animation
  const typedEl = document.getElementById('typed');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    typedEl.textContent = PORTFOLIO_DATA.phrases[0];
  } else {
    let p = 0, c = 0, deleting = false;
    (function tick() {
      const word = PORTFOLIO_DATA.phrases[p];
      typedEl.textContent = word.slice(0, c);
      let delay = deleting ? 35 : 75;
      if (!deleting && c === word.length) {
        delay = 1800;
        deleting = true;
      } else if (deleting && c === 0) {
        deleting = false;
        p = (p + 1) % PORTFOLIO_DATA.phrases.length;
        delay = 350;
      }
      c += deleting ? -1 : 1;
      setTimeout(tick, delay);
    })();
  }

  // 7. Mobile Navigation Toggle
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');

  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    siteNav.classList.toggle('open', !open);
  });

  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('open');
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && siteNav.classList.contains('open')) {
      menuToggle.click();
      menuToggle.focus();
    }
  });

  // 8. Active Nav Link & Scroll Reveal Observers
  const navLinks = [...siteNav.querySelectorAll('a')];
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href')));

  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });

  sections.forEach(sec => sec && activeObserver.observe(sec));

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // 9. Back to Top Visibility
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 450);
  }, { passive: true });

  // 10. Contact Form Validation
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldError(name, msg) {
    const input = form.elements[name];
    input.classList.toggle('invalid', Boolean(msg));
    input.setAttribute('aria-invalid', String(Boolean(msg)));
    form.querySelector(`[data-error-for="${name}"]`).textContent = msg || '';
  }

  function validateForm() {
    const values = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      message: form.elements.message.value.trim()
    };
    let valid = true;

    if (!values.name) {
      setFieldError('name', 'Please enter your name.');
      valid = false;
    } else {
      setFieldError('name', '');
    }

    if (!emailRe.test(values.email)) {
      setFieldError('email', 'Please enter a valid email address.');
      valid = false;
    } else {
      setFieldError('email', '');
    }

    if (values.message.length < 10) {
      setFieldError('message', 'Message must be at least 10 characters long.');
      valid = false;
    } else {
      setFieldError('message', '');
    }

    return valid ? values : null;
  }

  ['name', 'email', 'message'].forEach(field => {
    form.elements[field].addEventListener('blur', validateForm);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    statusEl.className = 'form-status';
    const data = validateForm();
    if (!data) {
      statusEl.textContent = 'Please correct the highlighted fields above.';
      statusEl.classList.add('fail');
      return;
    }
    statusEl.textContent = `Thanks, ${data.name}! Your message has been validated and prepared.`;
    statusEl.classList.add('ok');
    form.reset();
  });
})();