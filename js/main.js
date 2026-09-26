/* =====================================================================
   Ashesh Shrestha — Portfolio behaviour
   Renders content from js/data.js and wires up all interactions.
   No build step. Three.js (CDN) powers the particle background;
   everything else is vanilla.
   ===================================================================== */

(function () {
  'use strict';

  const S = window.SITE || {};
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const bold = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  /* ---------- Icons (Feather-style, stroke based) ---------- */
  const ICON_PATHS = {
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    twitter: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
    arrow: '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    server: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>',
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'
  };
  const icon = (name, size) => {
    const s = size || 18;
    return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name] || ICON_PATHS.globe}</svg>`;
  };

  /* =====================================================================
     RENDER
     ===================================================================== */
  function socialsHTML() {
    return (S.socials || []).map((s) => {
      const external = !/^mailto:/i.test(s.url);
      return `<a class="social-btn" href="${esc(s.url)}" ${external ? 'target="_blank" rel="noopener noreferrer"' : ''} aria-label="${esc(s.name)}" title="${esc(s.name)}">${icon(s.icon, 19)}</a>`;
    }).join('');
  }

  function renderHero() {
    $$('[data-name]').forEach((el) => (el.textContent = S.name || ''));
    $$('[data-initials]').forEach((el) => (el.textContent = S.initials || ''));

    const pre = $('#preloader-name');
    if (pre) {
      pre.innerHTML = (S.name || '').split('').map((ch, i) => `<span style="--i:${i}">${ch === ' ' ? '&nbsp;' : esc(ch)}</span>`).join('');
    }

    $('#hero-eyebrow').textContent = S.eyebrow || '';
    $('#hero-sub').textContent = S.subtitle || '';
    $('#hero-mono').textContent = S.initials || '';
    $('#hero-socials').innerHTML = socialsHTML();

    let idx = 0;
    $('#hero-title').innerHTML = (S.headline || []).map((line) => {
      const words = line.split(' ').map((w) => {
        const m = w.match(/^\*(.+?)\*([^\w*]*)$/); // *word* with optional trailing punctuation
        const inner = m ? `<em>${esc(m[1])}</em>${esc(m[2])}` : esc(w);
        return `<span class="word" style="--i:${idx++}">${inner}</span>`;
      });
      return `<span class="line">${words.join(' ')}</span>`;
    }).join('');

    $('#hero-chips').innerHTML = (S.floatingChips || []).slice(0, 5).map((c, i) =>
      `<span class="monogram__chip" data-pos="${i}" style="--d:-${i * 1.1}s">${esc(c)}</span>`
    ).join('');
  }

  function renderAbout() {
    const a = S.about || {};
    $('#about-text').innerHTML = (a.paragraphs || []).map((p) => `<p>${bold(p)}</p>`).join('');
    $('#about-stats').innerHTML = (a.stats || []).map((st, i) => `
      <div class="stat" data-reveal style="--i:${i}">
        <div class="stat__value"><span data-count="${Number(st.value) || 0}">0</span><sup>${esc(st.suffix || '')}</sup></div>
        <div class="stat__label">${esc(st.label)}</div>
      </div>`).join('');
  }

  function renderSkills() {
    const items = S.marquee || [];
    const track = $('#marquee');
    const half = items.map((t) => `<span class="marquee__item">${esc(t)}</span>`).join('');
    track.innerHTML = half + half; // duplicated for a seamless loop

    $('#skills-grid').innerHTML = (S.skills || []).map((g, i) => `
      <article class="skill-card" data-reveal style="--i:${i}">
        <div class="skill-card__icon">${icon(g.icon, 22)}</div>
        <h3 class="skill-card__title">${esc(g.title)}</h3>
        <p class="skill-card__desc">${esc(g.desc || '')}</p>
        <div class="skill-card__list">${(g.items || []).map((s) => `<span class="pill">${esc(s)}</span>`).join('')}</div>
      </article>`).join('');
  }

  function renderExperience() {
    $('#timeline').innerHTML = (S.experience || []).map((e, i) => `
      <div class="tl-item">
        <article class="tl-card" data-reveal style="--i:${Math.min(i, 3)}">
          <div>
            <div class="tl-period">${esc(e.period)}</div>
            ${e.location ? `<div class="tl-location">${icon('pin', 13)}${esc(e.location)}</div>` : ''}
          </div>
          <div>
            <h3 class="tl-role">${esc(e.role)}</h3>
            <div class="tl-company">${esc(e.company)}</div>
            <p class="tl-summary">${esc(e.summary || '')}</p>
            ${(e.bullets || []).length ? `<ul class="tl-bullets">${e.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
            ${(e.tags || []).length ? `<div class="tl-tags">${e.tags.map((t) => `<span class="pill">${esc(t)}</span>`).join('')}</div>` : ''}
          </div>
        </article>
      </div>`).join('');
  }

  function renderProjects() {
    $('#projects-grid').innerHTML = (S.projects || []).map((p, i) => {
      const [c1, c2] = p.colors || ['#5eead4', '#a78bfa'];
      const primary = p.live || p.github || '#';
      const links = [
        p.github ? `<a href="${esc(p.github)}" target="_blank" rel="noopener noreferrer">${icon('github', 16)} Source</a>` : '',
        p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener noreferrer">${icon('external', 16)} Live site</a>` : ''
      ].join('');
      return `
      <article class="project" data-reveal style="--i:${i % 2};--c1:${esc(c1)};--c2:${esc(c2)}">
        <a class="project__visual" href="${esc(primary)}" ${primary !== '#' ? 'target="_blank" rel="noopener noreferrer"' : ''} aria-label="${esc(p.title)}">
          <span class="project__grid-lines"></span>
          <span class="project__orb"></span>
          <span class="project__category">${esc(p.category || '')}</span>
          <span class="project__index">${String(i + 1).padStart(2, '0')}</span>
        </a>
        <div class="project__body">
          <h3 class="project__title">${esc(p.title)}${icon('arrow', 22)}</h3>
          <p class="project__desc">${esc(p.description || '')}</p>
          <div class="project__tags">${(p.tags || []).map((t) => `<span class="pill">${esc(t)}</span>`).join('')}</div>
          <div class="project__links">${links}</div>
        </div>
      </article>`;
    }).join('');
  }

  function renderContact() {
    const c = S.contact || {};
    const title = esc(c.title || "Let's talk.").replace(/\*(.+?)\*/g, '<em>$1</em>');
    $('#contact-title').innerHTML = title;
    $('#contact-text').textContent = c.text || '';
    const email = $('#contact-email');
    email.href = `mailto:${S.email || ''}`;
    email.innerHTML = `<span>${esc(S.email || '')}</span>${icon('arrow', 18)}`;
    $('#contact-socials').innerHTML = socialsHTML();
    $('#contact-meta').innerHTML = `<span><i class="dot"></i>${esc(S.availability || '')}</span>${S.location ? `<span class="sep">·</span><span>${icon('pin', 13)}${esc(S.location)}</span>` : ''}`;
    $('#year').textContent = new Date().getFullYear();
  }

  /* =====================================================================
     BEHAVIOUR
     ===================================================================== */
  function initPreloader() {
    const pre = $('#preloader');
    let finished = false;
    const done = () => {
      if (finished) return;
      finished = true;
      pre.classList.add('is-done');
      document.body.classList.remove('is-locked');
      document.body.classList.add('is-loaded');
      setTimeout(() => pre.remove(), 1200);
    };
    if (reduceMotion) { done(); return; }
    window.addEventListener('load', () => setTimeout(done, 1400));
    setTimeout(done, 4000); // safety net if `load` is slow
  }

  function initCursor() {
    if (!finePointer || reduceMotion) return;
    const dot = $('#cursor');
    const ring = $('#cursor-ring');
    document.body.classList.add('has-cursor');
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, shown = false;

    window.addEventListener('pointermove', (e) => {
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      if (!shown) { shown = true; dot.style.opacity = 1; ring.style.opacity = 1; }
    }, { passive: true });

    (function loop() {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();

    const hoverable = 'a, button, [data-hover]';
    document.addEventListener('pointerover', (e) => { if (e.target.closest(hoverable)) ring.classList.add('is-hover'); });
    document.addEventListener('pointerout', (e) => { if (e.target.closest(hoverable)) ring.classList.remove('is-hover'); });
    document.documentElement.addEventListener('mouseleave', () => { dot.style.opacity = 0; ring.style.opacity = 0; });
    document.documentElement.addEventListener('mouseenter', () => { dot.style.opacity = 1; ring.style.opacity = 1; });
  }

  function initNav() {
    const nav = $('#nav');
    const burger = $('#burger');
    const links = $$('.nav__links a');
    const progress = $('#progress');
    const toTop = $('#to-top');

    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle('is-scrolled', y > 30);
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      toTop.classList.toggle('is-visible', y > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const closeMenu = () => {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      if (document.body.classList.contains('is-loaded')) document.body.classList.remove('is-locked');
    };
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('is-locked', open);
    });
    links.forEach((a) => a.addEventListener('click', closeMenu));
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

    // Highlight the nav link for the section in view
    const sections = $$('main section[id]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((s) => io.observe(s));
  }

  function initReveal() {
    const els = $$('[data-reveal]');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-visible');
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach((el) => io.observe(el));
  }

  function initCounters() {
    const els = $$('[data-count]');
    const run = (el) => {
      const target = Number(el.dataset.count) || 0;
      if (reduceMotion) { el.textContent = target; return; }
      const duration = 1600;
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.6 });
    els.forEach((el) => io.observe(el));
  }

  function initTypewriter() {
    const el = $('#typewriter');
    const words = S.rotatingRoles || [];
    if (!el || !words.length) return;
    if (reduceMotion) { el.textContent = words[0]; return; }
    let wi = 0, ci = 0, deleting = false;
    const tick = () => {
      const word = words[wi];
      ci += deleting ? -1 : 1;
      el.textContent = word.slice(0, ci);
      let delay = deleting ? 40 : 75;
      if (!deleting && ci === word.length) { deleting = true; delay = 2000; }
      else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 350; }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 1800);
  }

  function initSpotlightAndTilt() {
    if (!finePointer || reduceMotion) return;
    $$('.project, .skill-card, .stat, .tl-card').forEach((card) => {
      const tilts = card.classList.contains('project');
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', `${px * 100}%`);
        card.style.setProperty('--my', `${py * 100}%`);
        if (tilts) {
          card.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * 7}deg) rotateY(${(px - 0.5) * 7}deg) translateY(-4px)`;
        }
      });
      card.addEventListener('pointerleave', () => { if (tilts) card.style.transform = ''; });
    });
  }

  function initMagnetic() {
    if (!finePointer || reduceMotion) return;
    $$('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- Three.js particle field ---------- */
  function initParticles() {
    const canvas = $('#bg-canvas');
    if (!canvas) return;
    if (!window.THREE || reduceMotion) { canvas.remove(); return; }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch (err) {
      canvas.remove();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100);
    camera.position.z = 6;

    // Soft round sprite for each particle
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = spriteCanvas.height = 64;
    const g = spriteCanvas.getContext('2d');
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.35, 'rgba(255,255,255,0.55)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    const sprite = new THREE.CanvasTexture(spriteCanvas);

    const mobile = innerWidth < 768;
    const count = mobile ? 900 : 2400;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [new THREE.Color('#5eead4'), new THREE.Color('#a78bfa'), new THREE.Color('#f472b6'), new THREE.Color('#ffffff')];

    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.4;
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(phi) - 3;
      const t = Math.random();
      const c = t < 0.55 ? palette[0] : t < 0.8 ? palette[1] : t < 0.9 ? palette[2] : palette[3];
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: mobile ? 0.05 : 0.04,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Faint wireframe shape drifting behind everything
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.2, 1),
      new THREE.MeshBasicMaterial({ color: 0x5eead4, wireframe: true, transparent: true, opacity: 0.045 })
    );
    wire.position.set(mobile ? 0 : 2.6, 0.4, -1);
    scene.add(wire);

    let mx = 0, my = 0, tx = 0, ty = 0, scroll = 0, visible = true;
    window.addEventListener('pointermove', (e) => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
    }, { passive: true });
    window.addEventListener('scroll', () => { scroll = window.scrollY; }, { passive: true });
    document.addEventListener('visibilitychange', () => { visible = !document.hidden; });

    const resize = () => {
      renderer.setSize(innerWidth, innerHeight, false);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    const clock = new THREE.Clock();
    const tick = () => {
      requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      tx += (mx - tx) * 0.04;
      ty += (my - ty) * 0.04;
      points.rotation.y = t * 0.035 + tx * 0.45;
      points.rotation.x = Math.sin(t * 0.12) * 0.08 + ty * 0.3;
      points.position.y = -scroll * 0.0012;
      material.size = (mobile ? 0.05 : 0.04) + Math.sin(t * 0.9) * 0.006;
      wire.rotation.y = t * 0.08 + tx * 0.6;
      wire.rotation.x = t * 0.05 + ty * 0.4;
      wire.position.y = 0.4 - scroll * 0.0018;
      renderer.render(scene, camera);
    };
    tick();
  }

  /* ---------- Boot ---------- */
  function boot() {
    renderHero();
    renderAbout();
    renderSkills();
    renderExperience();
    renderProjects();
    renderContact();

    initPreloader();
    initCursor();
    initNav();
    initReveal();
    initCounters();
    initTypewriter();
    initSpotlightAndTilt();
    initMagnetic();
    initParticles();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
