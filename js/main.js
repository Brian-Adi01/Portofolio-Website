/* Shared interactions: mobile menu, sound, skills, asset paths, social links, image zoom. */
document.addEventListener('DOMContentLoaded', () => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  // Mobile menu
  const nav = $('#nav'), burger = $('#burger');
  burger.addEventListener('click', () => { const o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });
  // Sound: original synthesized beeps, off by default, only starts after a click.
  let on = false, ctx; try { on = localStorage.getItem('snd') === '1'; } catch (e) {}
  const snd = $('#snd'); snd.setAttribute('aria-pressed', on);
  function beep(f = 660, d = .06) {
    if (!on) return;
    try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'square'; o.frequency.value = f; g.gain.value = .03;
      o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + d); } catch (e) {}
  }
  // Transition sound: filtered-noise "swoosh" whose pitch sweeps upward. Called by transitions.js.
  window.gbSweep = () => {
    if (!on) return;
    try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); ctx.resume();
      const n = ctx.sampleRate * .4, buf = ctx.createBuffer(1, n, ctx.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
      const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain(), t0 = ctx.currentTime;
      s.buffer = buf; f.type = 'bandpass'; f.Q.value = 2;
      f.frequency.setValueAtTime(300, t0); f.frequency.exponentialRampToValueAtTime(4000, t0 + .38);
      g.gain.setValueAtTime(.0001, t0); g.gain.exponentialRampToValueAtTime(.25, t0 + .12); g.gain.exponentialRampToValueAtTime(.0001, t0 + .4);
      s.connect(f); f.connect(g); g.connect(ctx.destination); s.start(t0); } catch (e) {}
  };
  snd.addEventListener('click', () => { on = !on; snd.setAttribute('aria-pressed', on); try { localStorage.setItem('snd', on ? '1' : '0'); } catch (e) {} beep(880); });
  $$('a,button').forEach(el => el.addEventListener('mouseenter', () => beep(520, .03)));
  // Navigation blips (hover/click). Page-change links are skipped here because transitions.js plays the sweep instead.
  document.addEventListener('click', e => { if (!e.defaultPrevented && e.target.closest('a,button') && e.target.id !== 'snd') beep(660); });
  // Skills archive
  $$('.sk').forEach(b => b.addEventListener('click', () => {
    $$('.sk').forEach(x => x.setAttribute('aria-pressed', x === b));
    $('#sk-name').textContent = b.dataset.name;
    $('#sk-desc').dataset.i18n = 's.' + b.dataset.skill;
    $('#sk-tag').dataset.i18n = b.dataset.skill === 'csharp' ? 'skills.current' : 'skills.learned';
    setLang(window.LANG, false);
  }));
  // Asset paths from projects.js
  $$('img[data-project]').forEach(i => { const p = PROJECTS[i.dataset.project]; if (p) i.src = p.img; });
  $$('img[data-avatar]').forEach(i => { i.src = AVATAR; });
  // Repo / demo links appear only when a real URL is provided
  const pk = document.body.dataset.project, p = PROJECTS[pk], box = $('#links');
  if (p && box && (p.repo || p.demo)) {
    box.innerHTML = '';
    [['repo', 'proj.repo'], ['demo', 'proj.demo']].forEach(([k, key]) => { if (p[k]) { const a = document.createElement('a'); a.className = 'btn'; a.href = p[k]; a.target = '_blank'; a.rel = 'noopener'; a.dataset.i18n = key; box.append(a, ' '); } });
    setLang(window.LANG, false);
  }
  // Social links: enable a card once its URL is set in projects.js
  $$('[data-social]').forEach(c => { const u = SOCIALS[c.dataset.social]; if (u) { c.href = u; c.target = '_blank'; c.rel = 'noopener'; c.classList.remove('off'); c.removeAttribute('aria-disabled'); $('.open', c).dataset.i18n = 'contact.go'; setLang(window.LANG, false); } });
  // Zoom: click a real screenshot (not a placeholder) to enlarge
  const dlg = $('#zoom');
  $$('.shot img').forEach(i => i.addEventListener('click', () => { if (!/placeholder/.test(i.src)) { $('img', dlg).src = i.src; $('img', dlg).alt = i.alt; dlg.showModal(); } }));
});
