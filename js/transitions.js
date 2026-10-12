/* Page transitions: a diagonal wipe plays before same-site navigation. Plain links still work if this fails. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let going = false;
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target || a.hasAttribute('download') || a.getAttribute('aria-disabled')) return;
    let u; try { u = new URL(a.href, location.href); } catch (x) { return; }
    if (u.origin !== location.origin || u.pathname === location.pathname) return;
    e.preventDefault();
    if (going) return; // ignore double clicks
    going = true;
    if (window.gbSweep) window.gbSweep();
    document.body.classList.add('leaving');
    setTimeout(() => { location.href = u.href; }, reduce.matches ? 0 : 380);
  });
  // Back/forward cache restores the page in its "leaving" state; reset it.
  addEventListener('pageshow', e => { if (e.persisted) { going = false; document.body.classList.remove('leaving'); } });
})();
