/* ========== AOS INIT ========== */
AOS.init({
  duration: 800,
  easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  once: true,
  offset: 60
});

/* ========== CUSTOM CURSOR ========== */
document.addEventListener('mousemove', (e) => {
  document.body.style.setProperty('--cx', e.clientX + 'px');
  document.body.style.setProperty('--cy', e.clientY + 'px');
});

/* ========== NAVBAR SCROLL ========== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ========== HAMBURGER MENU ========== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

/* ========== PORTFOLIO TABS ========== */
const tabBtns = document.querySelectorAll('.tab-btn');
const grids = {
  video: document.getElementById('tab-video'),
  design: document.getElementById('tab-design')
};

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.dataset.tab;
    Object.entries(grids).forEach(([key, grid]) => {
      if (key === target) {
        grid.classList.add('active');
        // Re-trigger AOS for newly visible items
        AOS.refresh();
      } else {
        grid.classList.remove('active');
      }
    });
  });
});

/* ========== SMOOTH SCROLL FOR ANCHOR LINKS ========== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navHeight = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ========== SERVICE CARD SUBTLE PARALLAX ON HOVER ========== */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateZ(4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ========== STATS COUNT-UP ANIMATION ========== */
function animateCount(el, target, suffix = '', duration = 1500) {
  const start = 0;
  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  let startTime = null;
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const stats = entry.target.querySelectorAll('.stat-num');
      const configs = [
        { target: 600, suffix: 'K+' },
        { target: 152, suffix: 'K' },
        { target: 3.5, suffix: 'K+', isDecimal: true }
      ];
      stats.forEach((stat, i) => {
        const c = configs[i];
        if (!c) return;
        if (c.isDecimal) {
          stat.textContent = '3.5K+';
          return;
        }
        animateCount(stat, c.target, c.suffix);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about-stats');
if (aboutSection) statsObserver.observe(aboutSection);

/* ========== EXPERIENCE CARD HOVER GLOW ========== */
document.querySelectorAll('.exp-card').forEach((card, i) => {
  const color = i % 2 === 0 ? 'rgba(204,0,0,0.08)' : 'rgba(0,170,255,0.08)';
  card.addEventListener('mouseenter', () => {
    card.style.background = color;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

/* ========== ACTIVE NAV LINK ON SCROLL ========== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${id}`) {
          a.style.color = 'var(--white)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ========== PROCESS STEP LINE ANIMATION ========== */
const processSteps = document.querySelectorAll('.process-step');
processSteps.forEach((step, i) => {
  const num = step.querySelector('.step-number');
  const colors = ['#cc0000', '#00aaff', '#cc0000', '#00aaff'];
  num.style.webkitTextStroke = `1px ${colors[i]}44`;
  
  step.addEventListener('mouseenter', () => {
    num.style.webkitTextStroke = `1px ${colors[i]}`;
    num.style.color = colors[i] + '22';
    num.style.transition = 'all 0.3s';
  });
  step.addEventListener('mouseleave', () => {
    num.style.webkitTextStroke = `1px ${colors[i]}44`;
    num.style.color = 'transparent';
  });
});

/* ========== HERO TITLE LETTER HOVER ========== */
const heroTitle = document.querySelector('.title-aurox');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.innerHTML = text.split('').map(char =>
    `<span style="display:inline-block;transition:transform 0.2s,color 0.2s">${char}</span>`
  ).join('');

  heroTitle.querySelectorAll('span').forEach(span => {
    span.addEventListener('mouseenter', () => {
      span.style.transform = 'translateY(-4px)';
      span.style.color = '#cc0000';
    });
    span.addEventListener('mouseleave', () => {
      span.style.transform = '';
      span.style.color = '';
    });
  });
}
