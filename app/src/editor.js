// Vice Gold studio — editor wiring: photo strip, panel controls, layout/grade
// pickers, caption fields, size switching, drag-to-pan, export. The preview is
// one canvas re-painted from the same drawCover the exports use, so what the
// user sees is exactly what the PNG contains.

import {
  PHOTOS, GRADES, VARIANTS, LAYOUTS, SIZES,
  defaultState, computePlan, loadLibrary, loadFonts, drawCover,
} from './vicegold.js';

let state = defaultState();
let images = [];
let resolved = [];
let sizeKey = 'landscape';
let history = [];
let future = [];
const $ = (id) => document.getElementById(id);

function snapshot() {
  history.push(JSON.stringify(state));
  if (history.length > 30) history.shift();
  future = [];
}
function restore(json) {
  state = JSON.parse(json);
  syncAll();
  render();
}

function currentVariant() { return VARIANTS[sizeKey]; }
function plan() { return computePlan(currentVariant(), state.layout); }

// Images indexed by photo id: library Image objects, replaced by a decoded
// Image whenever the user uploads a custom photo for that slot.
function resolveCustom(idx, dataUrl) {
  const img = new Image();
  img.onload = () => render();
  img.src = dataUrl;
  resolved[idx] = img;
}

// The preview canvas is painted at the variant's own pixel size and scaled
// down by CSS, so a drag maps back through the same scale factor.
function render() {
  const v = currentVariant();
  const cv = $('preview');
  cv.width = v.w; cv.height = v.h;
  const ctx = cv.getContext('2d');
  drawCover(ctx, sizeKey, state, resolved);
  $('panel-label').textContent = `${state.selected + 1} OF 8`;
  $('zoom').value = String(state.photos[state.selected].zoom || 1);
  $('zoom-val').textContent = `${(state.photos[state.selected].zoom || 1).toFixed(2)}×`;
}

function syncAll() {
  buildPhotoGrid();
  buildLayouts();
  buildGrades();
  buildSizes();
  syncCaption();
}

function buildPhotoGrid() {
  const grid = $('photo-grid');
  grid.innerHTML = '';
  PHOTOS.forEach((p, i) => {
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'photo-cell' + (state.selected === i ? ' selected' : '') + (i === state.slots[0] ? ' hero-cell' : '');
    cell.innerHTML = `<img src="samples/${p.file}" alt="${p.place}"><span class="num">${i + 1}</span><span class="tag">${p.place}</span>`;
    cell.addEventListener('click', () => { state.selected = i; buildPhotoGrid(); render(); });
    grid.appendChild(cell);
  });
  $('photo-count').textContent = `${PHOTOS.length} LOADED`;
}

function buildLayouts() {
  const grid = $('layout-grid');
  grid.innerHTML = '';
  for (const [key, L] of Object.entries(LAYOUTS)) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'layout-btn' + (state.layout === key ? ' active' : '');
    b.innerHTML = `<div class="mini"></div>${L.label}`;
    b.addEventListener('click', () => { snapshot(); state.layout = key; buildLayouts(); render(); });
    grid.appendChild(b);
  }
}

function buildGrades() {
  const grid = $('grade-grid');
  grid.innerHTML = '';
  for (const [key, g] of Object.entries(GRADES)) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'grade-btn' + (state.grade === key ? ' active' : '');
    b.textContent = g.label;
    b.addEventListener('click', () => { snapshot(); state.grade = key; buildGrades(); render(); });
    grid.appendChild(b);
  }
}

function buildSizes() {
  const bar = $('size-bar');
  bar.innerHTML = '';
  for (const key of SIZES) {
    const v = VARIANTS[key];
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'size-btn' + (sizeKey === key ? ' active' : '');
    b.innerHTML = `${v.label}<small>${v.sub}</small>`;
    b.addEventListener('click', () => { sizeKey = key; syncCaption(); buildSizes(); render(); });
    bar.appendChild(b);
  }
}

function syncCaption() {
  const cap = state.variants[sizeKey];
  $('cap-title').value = cap.title;
  $('cap-subtitle').value = cap.subtitle;
  $('cap-tagline').value = cap.tagline;
  $('cap-city').value = cap.city;
  $('cap-ribbon').value = cap.ribbon;
  $('c-ribbon').checked = state.ribbon;
}

function bindCaption() {
  const cap = () => state.variants[sizeKey];
  $('cap-title').addEventListener('input', (e) => { cap().title = e.target.value; render(); });
  $('cap-subtitle').addEventListener('input', (e) => { cap().subtitle = e.target.value; render(); });
  $('cap-tagline').addEventListener('input', (e) => { cap().tagline = e.target.value; render(); });
  $('cap-city').addEventListener('input', (e) => { cap().city = e.target.value; render(); });
  $('cap-ribbon').addEventListener('input', (e) => { cap().ribbon = e.target.value; render(); });
  $('c-ribbon').addEventListener('change', (e) => { snapshot(); state.ribbon = e.target.checked; render(); });
}

function bindSliders() {
  const pairs = [
    ['s-strength', 'v-strength', 'strength', (x) => x.toFixed(2)],
    ['s-contrast', 'v-contrast', 'contrast', (x) => x.toFixed(2)],
    ['s-saturation', 'v-saturation', 'saturation', (x) => x.toFixed(2)],
    ['s-grain', 'v-grain', 'grain', (x) => x.toFixed(2)],
    ['s-vignette', 'v-vignette', 'vignette', (x) => x.toFixed(2)],
  ];
  for (const [id, vid, key, fmt] of pairs) {
    $(id).addEventListener('input', (e) => {
      state[key] = Number(e.target.value);
      $(vid).textContent = fmt(state[key]);
      render();
    });
  }
  $('c-halftone').addEventListener('change', (e) => { snapshot(); state.halftone = e.target.checked; render(); });
}

function bindPanelControls() {
  $('zoom').addEventListener('input', (e) => {
    state.photos[state.selected].zoom = Number(e.target.value);
    render();
  });
  $('btn-center').addEventListener('click', () => {
    snapshot();
    const p = state.photos[state.selected];
    p.fx = 0.5; p.fy = 0.5; p.zoom = 1;
    render();
  });
  $('btn-replace').addEventListener('click', () => $('file-replace').click());
  $('file-replace').addEventListener('change', (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      snapshot();
      state.photos[state.selected].custom = r.result;
      resolveCustom(state.selected, r.result);
      buildPhotoGrid();
      render();
    };
    r.readAsDataURL(f);
    e.target.value = '';
  });
  $('btn-fill').addEventListener('click', () => {
    snapshot();
    const sel = state.selected;
    state.slots = state.slots.map(() => sel);
    render();
  });
  $('btn-spread').addEventListener('click', () => {
    snapshot();
    state.slots = [0, 1, 2, 3, 4, 5, 6, 7];
    render();
  });
  $('btn-undo').addEventListener('click', () => {
    if (!history.length) return;
    future.push(JSON.stringify(state));
    restore(history.pop());
  });
  $('btn-redo').addEventListener('click', () => {
    if (!future.length) return;
    history.push(JSON.stringify(state));
    restore(future.pop());
  });
  $('btn-add-photos').addEventListener('click', () => $('file-add').click());
  $('file-add').addEventListener('change', (e) => {
    const files = [...e.target.files].slice(0, 4);
    if (!files.length) return;
    snapshot();
    files.forEach((f, i) => {
      const r = new FileReader();
      r.onload = () => {
        const slot = (state.selected + i) % PHOTOS.length;
        state.photos[slot].custom = r.result;
        resolveCustom(slot, r.result);
        buildPhotoGrid();
        render();
      };
      r.readAsDataURL(f);
    });
    e.target.value = '';
  });
}

// Drag to pan the panel under the cursor; wheel to zoom it; double-click to
// re-center it. Hit-testing uses the same plan the painter uses.
function bindPreview() {
  const cv = $('preview');
  let drag = null;
  const toCanvas = (e) => {
    const r = cv.getBoundingClientRect();
    const v = currentVariant();
    return { x: (e.clientX - r.left) * (v.w / r.width), y: (e.clientY - r.top) * (v.h / r.height) };
  };
  const hitPanel = (p) => {
    const pl = plan();
    if (p.x >= pl.hero.x && p.x < pl.hero.x + pl.hero.w && p.y >= pl.hero.y && p.y < pl.hero.y + pl.hero.h) return { slot: 0, rect: pl.hero };
    for (let i = 0; i < pl.cells.length; i++) {
      const c = pl.cells[i];
      if (p.x >= c.x && p.x < c.x + c.w && p.y >= c.y && p.y < c.y + c.h) return { slot: i + 1, rect: c };
    }
    return null;
  };
  cv.addEventListener('pointerdown', (e) => {
    const hit = hitPanel(toCanvas(e));
    if (!hit) return;
    state.selected = state.slots[hit.slot];
    buildPhotoGrid();
    drag = { slot: hit.slot, rect: hit.rect, start: toCanvas(e), moved: false };
    cv.setPointerCapture(e.pointerId);
    render();
  });
  cv.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const p = toCanvas(e);
    const dx = p.x - drag.start.x, dy = p.y - drag.start.y;
    if (Math.abs(dx) + Math.abs(dy) > 2) drag.moved = true;
    if (!drag.moved) return;
    const idx = state.slots[drag.slot];
    const ph = state.photos[idx];
    const img = resolved[idx];
    if (!img || !img.naturalWidth) return;
    // A drag of dx display px moves the focus by dx / (scale * image width),
    // where scale is the cover-fit scale of this panel.
    const base = Math.max(drag.rect.w / img.naturalWidth, drag.rect.h / img.naturalHeight);
    const scale = base * (ph.zoom || 1);
    ph.fx = Math.min(0.98, Math.max(0.02, ph.fx - dx / (scale * img.naturalWidth)));
    ph.fy = Math.min(0.98, Math.max(0.02, ph.fy - dy / (scale * img.naturalHeight)));
    drag.start = p;
    render();
  });
  cv.addEventListener('pointerup', () => { if (drag && drag.moved) snapshot(); drag = null; });
  cv.addEventListener('wheel', (e) => {
    e.preventDefault();
    const hit = hitPanel(toCanvas(e));
    if (!hit) return;
    const idx = state.slots[hit.slot];
    const ph = state.photos[idx];
    ph.zoom = Math.min(2.5, Math.max(1, (ph.zoom || 1) * (e.deltaY < 0 ? 1.08 : 0.93)));
    state.selected = idx;
    render();
  }, { passive: false });
  cv.addEventListener('dblclick', (e) => {
    const hit = hitPanel(toCanvas(e));
    if (!hit) return;
    snapshot();
    const ph = state.photos[state.slots[hit.slot]];
    ph.fx = 0.5; ph.fy = 0.5; ph.zoom = 1;
    render();
  });
}

function downloadPNG(key) {
  const v = VARIANTS[key];
  const cv = document.createElement('canvas');
  cv.width = v.w; cv.height = v.h;
  drawCover(cv.getContext('2d'), key, state, resolved);
  cv.toBlob((blob) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${state.variants[key].title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${v.w}x${v.h}.png`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    $('export-note').textContent = `SAVED ${a.download.toUpperCase()}`;
  }, 'image/png');
}

function bindExport() {
  $('btn-export').addEventListener('click', () => downloadPNG(sizeKey));
  const all = () => {
    let i = 0;
    const step = () => {
      if (i >= SIZES.length) return;
      downloadPNG(SIZES[i]);
      i += 1;
      setTimeout(step, 350);
    };
    step();
  };
  $('btn-export-all').addEventListener('click', all);
  $('btn-export-all-top').addEventListener('click', all);
}

export async function initEditor() {
  images = await loadLibrary();
  resolved = images.slice();
  await loadFonts();
  buildPhotoGrid();
  buildLayouts();
  buildGrades();
  buildSizes();
  syncCaption();
  bindCaption();
  bindSliders();
  bindPanelControls();
  bindPreview();
  bindExport();
  render();
  window.__viceGoldReady = true;
}
