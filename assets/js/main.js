/* ══════════════════════════════════════════════
   João Vitor Depollo — interações da landing
   ══════════════════════════════════════════════ */
(() => {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── ano no rodapé ── */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── barra de progresso + nav grudada ── */
  const fill = document.getElementById('scrollFill');
  const nav = document.getElementById('nav');
  let ticking = false;

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (fill) fill.style.width = pct + '%';
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 40);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ── revelação em scroll ── */
  const revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add('is-in'));
  }

  /* ── link ativo na nav ── */
  const navLinks = [...document.querySelectorAll('[data-nav]')];
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { threshold: 0.3, rootMargin: '-25% 0px -55% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* ── contador numérico ── */
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        cio.unobserve(el);
        const target = parseInt(el.dataset.count, 10) || 0;
        if (reduced) { el.textContent = String(target); return; }
        const dur = 1100;
        const t0 = performance.now();
        const step = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => cio.observe(c));
  }

  /* ── spotlight seguindo o mouse no hero ── */
  const hero = document.getElementById('hero');
  const spot = document.getElementById('heroSpot');
  if (hero && spot && !reduced && window.matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      spot.style.left = ((e.clientX - r.left) / r.width) * 100 + '%';
      spot.style.top = ((e.clientY - r.top) / r.height) * 100 + '%';
    }, { passive: true });
  }

  /* ── terminal com digitação ── */
  const term = document.getElementById('termBody');
  if (term) {
    const LINES = [
      { t: '<span class="c-cm">// engineer.profile — runtime</span>' },
      { t: '<span class="c-key">$</span> <span class="c-fn">whoami</span>' },
      { t: 'joao_vitor_depollo <span class="c-cm">// senior software engineer</span>' },
      { t: '' },
      { t: '<span class="c-key">$</span> <span class="c-fn">cat</span> stack.json' },
      { t: '{' },
      { t: '  <span class="c-key">"backend"</span>:  [<span class="c-str">"java"</span>, <span class="c-str">"spring"</span>, <span class="c-str">"python"</span>, <span class="c-str">"go"</span>],' },
      { t: '  <span class="c-key">"frontend"</span>: [<span class="c-str">"react"</span>, <span class="c-str">"next.js"</span>],' },
      { t: '  <span class="c-key">"data"</span>:     [<span class="c-str">"postgres"</span>, <span class="c-str">"clickhouse"</span>],' },
      { t: '  <span class="c-key">"infra"</span>:    [<span class="c-str">"docker"</span>, <span class="c-str">"k8s"</span>, <span class="c-str">"ci/cd"</span>],' },
      { t: '  <span class="c-key">"focus"</span>:    <span class="c-str">"ia + sistemas distribuídos"</span>' },
      { t: '}' },
      { t: '' },
      { t: '<span class="c-key">$</span> <span class="c-fn">status</span> --now' },
      { t: '<span class="c-str">▸ construindo do zero à produção.</span>' }
    ];

    const caret = '<span class="caret"></span>';

    if (reduced) {
      term.innerHTML = LINES.map((l) => l.t).join('\n') + ' ' + caret;
    } else {
      let i = 0;
      const printed = [];
      const next = () => {
        if (i >= LINES.length) {
          term.innerHTML = printed.join('\n') + ' ' + caret;
          return;
        }
        printed.push(LINES[i].t);
        term.innerHTML = printed.join('\n') + ' ' + caret;
        i++;
        setTimeout(next, LINES[i - 1].t === '' ? 90 : 165);
      };
      // arranca quando o terminal entra em cena
      if ('IntersectionObserver' in window) {
        const tio = new IntersectionObserver((entries, obs) => {
          if (entries[0].isIntersecting) { obs.disconnect(); setTimeout(next, 600); }
        }, { threshold: 0.25 });
        tio.observe(term);
      } else {
        setTimeout(next, 600);
      }
    }
  }
})();
