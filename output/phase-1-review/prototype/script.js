/**
 * Diego Said — Redesign Prototype
 * Before/After toggle for Phase 1 review
 */

(function() {
  const btnBefore = document.getElementById('btn-before');
  const btnAfter = document.getElementById('btn-after');
  const body = document.body;

  function setMode(mode) {
    if (mode === 'before') {
      body.classList.add('is-before');
      body.classList.remove('is-after');
      btnBefore.classList.add('active');
      btnBefore.setAttribute('aria-pressed', 'true');
      btnAfter.classList.remove('active');
      btnAfter.setAttribute('aria-pressed', 'false');
    } else {
      body.classList.remove('is-before');
      body.classList.add('is-after');
      btnBefore.classList.remove('active');
      btnBefore.setAttribute('aria-pressed', 'false');
      btnAfter.classList.add('active');
      btnAfter.setAttribute('aria-pressed', 'true');
    }
  }

  btnBefore.addEventListener('click', () => setMode('before'));
  btnAfter.addEventListener('click', () => setMode('after'));

  // Default to AFTER (redesign) state
  setMode('after');

  // Simple scroll reveal for prototype polish
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.project-card, .award-card, .blog-card, .terminal-panel').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    observer.observe(el);
  });

  // Add is-visible styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .is-visible { opacity: 1 !important; transform: translateY(0) !important; }
  `;
  document.head.appendChild(style);
})();
