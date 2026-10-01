(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const navToggle = $('.nav-toggle');
  const navLinks = $('.nav-links');
  navToggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  const reveal = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('is-visible')), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', e => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(800px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-3px)`;
    });
    card.addEventListener('pointerleave', () => card.style.transform = '');
  });

  const gate = $('#age-gate');
  const allow = $('#confirm-age');
  const leave = $('#leave-site');
  const paymentArea = $('#payment-area');
  const AGE_KEY = 'fedpromptly-age-confirmed-v1';
  function loadPayments() {
    if (!paymentArea || paymentArea.dataset.loaded === 'true') return;
    paymentArea.dataset.loaded = 'true';
    paymentArea.querySelectorAll('[data-payment-template]').forEach(t => {
      const holder = document.createElement('div');
      holder.innerHTML = t.textContent;
      t.replaceWith(...holder.childNodes);
    });
    const paypal = document.createElement('script');
    paypal.src = 'https://www.paypal.com/sdk/js?client-id=BAA_ndqaWMyQwTnDZ0LXwLQ22jdJo9uxkeXYqmBbF-hD41HMiZ83mvOcx1Kti0b6ZfXfje7Q1ievNaS8Ok&vault=true&intent=subscription';
    paypal.async = true;
    document.head.appendChild(paypal);
    const stripe = document.createElement('script');
    stripe.src = 'https://js.stripe.com/v3/buy-button.js'; stripe.async = true;
    document.head.appendChild(stripe);
  }
  function unlock() { localStorage.setItem(AGE_KEY, 'yes'); gate.hidden = true; loadPayments(); }
  if (localStorage.getItem(AGE_KEY) === 'yes') { gate.hidden = true; loadPayments(); }
  allow?.addEventListener('click', unlock);
  leave?.addEventListener('click', () => { window.location.href = 'https://www.google.com/'; });
  document.querySelectorAll('[data-age-required]').forEach(el => el.addEventListener('click', e => {
    if (localStorage.getItem(AGE_KEY) !== 'yes') { e.preventDefault(); gate.hidden = false; }
  }));
})();
