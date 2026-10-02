(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const navToggle = $('.nav-toggle');
  const navLinks = $('.nav-links');

  navToggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

  const reveal = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: .12 })
    : null;
  document.querySelectorAll('.reveal').forEach(element => reveal ? reveal.observe(element) : element.classList.add('is-visible'));

  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', event => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      card.style.transform = `perspective(800px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-3px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  // Local-only by default: no payment SDK, analytics, font loader, or upload
  // is injected by this project. External links are explicit user navigation.
  document.documentElement.dataset.networkPolicy = 'local-only';
})();
