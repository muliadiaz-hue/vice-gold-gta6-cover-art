// Vice Gold — GTA 6-style cover renderer. Canvas 2D, fully offline, deterministic:
// every grade overlay uses fixed seeds and fixed geometry, so the same state
// always paints the same pixels. No network, no clock, no randomness at draw time.

export const PHOTOS = [
  { id: 'hero', file: 'hero-woman-convertible.jpg', place: 'OCEAN DRIVE', time: '6:42 PM', note: 'LOOKING FOR TROUBLE', fx: 0.72, fy: 0.38 },
  { id: 'duo', file: 'duo.jpg', place: 'MARINA DEL SOL', time: '7:48 PM', note: 'NO WITNESSES', fx: 0.32, fy: 0.38 },
  { id: 'car', file: 'car.jpg', place: 'PALM BOULEVARD', time: '9:15 PM', note: 'LIGHTS OUT', fx: 0.5, fy: 0.55 },
  { id: 'dj', file: 'dj.jpg', place: 'CLUB NEON', time: '10:30 PM', note: 'LAST SET', fx: 0.42, fy: 0.30 },
  { id: 'heli', file: 'heli.jpg', place: 'INTERSTATE 6', time: '11:58 PM', note: 'FULL THROTTLE', fx: 0.5, fy: 0.45 },
  { id: 'boat', file: 'boat.jpg', place: 'SUNSET HEIGHTS', time: '8:30 PM', note: 'BIG MONEY', fx: 0.5, fy: 0.5 },
  { id: 'pier', file: 'pier.jpg', place: 'PIER 26', time: '5:30 AM', note: 'GONE FISHING', fx: 0.35, fy: 0.24 },
  { id: 'boulevard', file: 'boulevard.jpg', place: 'BOULEVARD', time: '7:05 PM', note: 'GOLDEN HOUR', fx: 0.5, fy: 0.25 },
];

export const GRADES = {
  'vice-gold': { label: 'VICE GOLD', sat: 1.18, con: 1.06, sepia: 0.12, bright: 1.02, top: '255,170,60', topA: 0.16, bot: '255,70,130', botA: 0.10, halftone: false },
  'vice-sunset': { label: 'VICE SUNSET', sat: 1.32, con: 1.08, sepia: 0.18, bright: 1.0, top: '255,120,30', topA: 0.22, bot: '220,40,160', botA: 0.14, halftone: false },
  'neon-night': { label: 'NEON NIGHT', sat: 1.35, con: 1.12, sepia: 0, bright: 0.95, top: '40,220,255', topA: 0.14, bot: '255,40,180', botA: 0.16, halftone: false },
  'golden-hour': { label: 'GOLDEN HOUR', sat: 1.25, con: 1.05, sepia: 0.28, bright: 1.04, top: '255,190,80', topA: 0.20, bot: '255,110,60', botA: 0.10, halftone: false },
  'duotone': { label: 'DUOTONE PINK/TEAL', sat: 0.12, con: 1.15, sepia: 0, bright: 1.0, top: '255,80,170', topA: 0.42, bot: '30,200,220', botA: 0.42, halftone: false },
  'comic-ink': { label: 'COMIC INK', sat: 1.5, con: 1.35, sepia: 0.05, bright: 1.05, top: '255,150,60', topA: 0.08, bot: '120,40,160', botA: 0.08, halftone: true },
  'natural': { label: 'NATURAL', sat: 1, con: 1, sepia: 0, bright: 1, top: '255,255,255', topA: 0, bot: '255,255,255', botA: 0, halftone: false },
};

export const VARIANTS = {
  landscape: { key: 'landscape', label: '1920 × 1080', sub: 'LANDSCAPE', w: 1920, h: 1080, title: 'VICE GOLD', subtitle: 'Golden hour heist', tagline: 'GOLDEN HOUR • ONE LAST SCORE • COMING SOON', city: 'LEONIDA', ribbon: "COLLECTOR'S EDITION", kicker: 'EVERY SUNSET HAS A PRICE', source: 'THE LEONIDA LEDGER', grade: 'vice-gold', halftone: false, heroFracV: 0, titleFrac: 0 },
  portrait: { key: 'portrait', label: '1080 × 1350', sub: 'PORTRAIT', w: 1080, h: 1350, title: 'GOLD RUSH', subtitle: 'Coast to Coast', tagline: 'ONE SUMMER • NO RULES • ALL GOLD', city: 'LEONIDA', ribbon: "COLLECTOR'S EDITION", kicker: 'EVERY SUNSET HAS A PRICE', source: 'THE LEONIDA LEDGER', grade: 'golden-hour', halftone: true, heroFracV: 0.415, titleFrac: 0.19 },
  square: { key: 'square', label: '1080 × 1080', sub: 'SQUARE', w: 1080, h: 1080, title: 'VICE GOLD', subtitle: 'Golden hour heist', tagline: 'GOLDEN HOUR • ONE LAST SCORE • COMING SOON', city: 'LEONIDA', ribbon: "COLLECTOR'S EDITION", kicker: 'EVERY SUNSET HAS A PRICE', source: 'THE LEONIDA LEDGER', grade: 'vice-gold', halftone: false, heroFracV: 0.44, titleFrac: 0.185 },
  story: { key: 'story', label: '1080 × 1920', sub: 'STORY', w: 1080, h: 1920, title: 'AFTERGLOW', subtitle: 'Last light in Leonida', tagline: 'LIGHTS ON • TOP DOWN • AFTER DARK', city: 'LEONIDA', ribbon: "COLLECTOR'S EDITION", kicker: 'EVERY SUNSET HAS A PRICE', source: 'THE LEONIDA LEDGER', grade: 'duotone', halftone: false, heroFracV: 0.40, titleFrac: 0.135 },
};

export const LAYOUTS = {
  hero: { label: 'HERO', total: 7, heroFrac: 0.52 },
  comic: { label: 'COMIC', total: 5, heroFrac: 0.46 },
  panels8: { label: '8 PANELS', total: 8, heroFrac: 0.38 },
  panels7: { label: '7 PANELS', total: 7, heroFrac: 0.44 },
  panels6: { label: '6 PANELS', total: 6, heroFrac: 0.52 },
  panels4: { label: '4 PANELS', total: 4, heroFrac: 0.58 },
  panels2: { label: '2 PANELS', total: 2, heroFrac: 0.66 },
  panels1: { label: '1 PANEL', total: 1, heroFrac: 1.0 },
};

export const SIZES = ['landscape', 'portrait', 'square', 'story'];

export function defaultState() {
  const state = {
    layout: 'hero',
    grade: 'vice-gold',
    strength: 0.9, contrast: 1.06, saturation: 1.06, grain: 0.28, vignette: 0.5,
    halftone: false, ribbon: true,
    selected: 0,
    slots: [0, 1, 2, 3, 4, 5, 6, 7],
    photos: PHOTOS.map((p) => ({ fx: p.fx, fy: p.fy, zoom: 1, custom: null })),
    variants: {},
  };
  for (const key of SIZES) {
    const v = VARIANTS[key];
    state.variants[key] = { title: v.title, subtitle: v.subtitle, tagline: v.tagline, city: v.city, ribbon: v.ribbon };
  }
  return state;
}

// Fixed-seed PRNG (mulberry32) — grain is identical on every run.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let noisePattern = null;
let dotPattern = null;
function grainPattern(ctx) {
  if (noisePattern) return noisePattern;
  const c = document.createElement('canvas'); c.width = 128; c.height = 128;
  const g = c.getContext('2d');
  const img = g.createImageData(128, 128);
  const rnd = mulberry32(20260707);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.floor(rnd() * 255);
    img.data[i] = v; img.data[i + 1] = v; img.data[i + 2] = v; img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  noisePattern = ctx.createPattern(c, 'repeat');
  return noisePattern;
}
function halftonePattern(ctx) {
  if (dotPattern) return dotPattern;
  const c = document.createElement('canvas'); c.width = 9; c.height = 9;
  const g = c.getContext('2d');
  g.fillStyle = '#000';
  g.beginPath(); g.arc(4.5, 4.5, 2.1, 0, Math.PI * 2); g.fill();
  dotPattern = ctx.createPattern(c, 'repeat');
  return dotPattern;
}

export function loadLibrary() {
  return Promise.all(PHOTOS.map((p) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = `samples/${p.file}`;
  })));
}

export async function loadFonts() {
  try {
    await Promise.all([
      document.fonts.load('100px "Passion One"'),
      document.fonts.load('40px "Anton"'),
      document.fonts.ready,
    ]);
  } catch { /* fall back to system fonts */ }
}

function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

// Split a length into n integer parts that sum exactly to total (remainder to last).
function splitExact(total, n, gap) {
  if (n <= 0) return [];
  const usable = total - gap * (n - 1);
  const base = Math.floor(usable / n);
  const parts = new Array(n).fill(base);
  parts[n - 1] += usable - base * n;
  return parts;
}

// Geometry plan: every band is computed from the space left after the previous
// one, so the last row/column always lands exactly on the frame edge — no
// empty strip, no half cell, in any size.
export function computePlan(v, layoutName) {
  const W = v.w, H = v.h;
  const g = Math.max(4, Math.round(W / 320));
  const creditH = Math.round(H * 0.058);
  const ribbonH = Math.round(H * 0.082);
  const L = LAYOUTS[layoutName] || LAYOUTS.hero;
  const smallCount = Math.max(0, L.total - 1);
  const rows = smallCount === 0 ? 0 : Math.ceil(smallCount / 2);
  const plan = { W, H, g, creditH, ribbonH, layout: L, smallCount, rows, landscape: W > H };
  if (plan.landscape) {
    plan.photoH = H - ribbonH - creditH;
    plan.heroW = Math.round(W * L.heroFrac);
    plan.gridX = plan.heroW + g;
    plan.gridW = W - plan.gridX;
    plan.gridY = 0;
    plan.gridH = plan.photoH;
    plan.bandH = Math.round(H * 0.26);
    plan.bandY = plan.photoH - plan.bandH;
    plan.hero = { x: 0, y: 0, w: plan.heroW, h: plan.photoH };
  } else {
    plan.heroH = Math.round(H * v.heroFracV);
    plan.bandH = Math.round(H * v.titleFrac);
    plan.bandY = plan.heroH;
    plan.gridY = plan.heroH + plan.bandH;
    plan.gridH = H - ribbonH - creditH - plan.gridY;
    plan.gridX = 0;
    plan.gridW = W;
    plan.hero = { x: 0, y: 0, w: W, h: plan.heroH };
  }
  // Grid cells: rows fill gridH exactly, columns fill gridW exactly; an odd
  // last row spans the full width instead of leaving an empty cell.
  const cells = [];
  if (rows > 0) {
    const rowHs = splitExact(plan.gridH, rows, g);
    let y = plan.gridY;
    for (let r = 0; r < rows; r++) {
      const inRow = (r === rows - 1 && smallCount % 2 === 1) ? 1 : 2;
      const colWs = splitExact(plan.gridW, inRow, g);
      let x = plan.gridX;
      for (let c = 0; c < inRow; c++) {
        cells.push({ x, y, w: colWs[c], h: rowHs[r] });
        x += colWs[c] + g;
      }
      y += rowHs[r] + g;
    }
  }
  plan.cells = cells;
  plan.ribbonY = H - ribbonH - creditH;
  plan.creditY = H - creditH;
  plan.sealR = Math.round(Math.min(W, H) * 0.052);
  if (plan.landscape) {
    plan.seal = { x: plan.heroW, y: Math.round(plan.photoH * 0.40), r: plan.sealR };
  } else {
    plan.seal = { x: W - plan.sealR - Math.round(W * 0.02), y: plan.heroH - Math.round(plan.sealR * 0.45), r: plan.sealR };
  }
  return plan;
}

function gradeFilter(grade, state) {
  const sat = (grade.sat * state.saturation).toFixed(3);
  const con = (grade.con * state.contrast).toFixed(3);
  return `saturate(${sat}) contrast(${con}) sepia(${grade.sepia}) brightness(${grade.bright})`;
}

function drawPhoto(ctx, img, rect, photo, grade, state) {
  if (!img || !img.complete || !img.naturalWidth || !rect.w || !rect.h) return;
  ctx.save();
  ctx.beginPath(); ctx.rect(rect.x, rect.y, rect.w, rect.h); ctx.clip();
  const iw = img.naturalWidth, ih = img.naturalHeight;
  const base = Math.max(rect.w / iw, rect.h / ih);
  const scale = base * (photo.zoom || 1);
  const sw = Math.min(iw, rect.w / scale);
  const sh = Math.min(ih, rect.h / scale);
  let sx = clamp(photo.fx * iw - sw / 2, 0, iw - sw);
  let sy = clamp(photo.fy * ih - sh / 2, 0, ih - sh);
  ctx.filter = gradeFilter(grade, state);
  ctx.drawImage(img, sx, sy, sw, sh, rect.x, rect.y, rect.w, rect.h);
  ctx.filter = 'none';
  // Warm top / cool bottom grade wash, scaled by the strength slider.
  const s = state.strength;
  if (grade.topA * s > 0.004) {
    const top = ctx.createLinearGradient(0, rect.y, 0, rect.y + rect.h * 0.6);
    top.addColorStop(0, `rgba(${grade.top},${(grade.topA * s).toFixed(3)})`);
    top.addColorStop(1, `rgba(${grade.top},0)`);
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = top; ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    ctx.globalCompositeOperation = 'source-over';
  }
  if (grade.botA * s > 0.004) {
    const bot = ctx.createLinearGradient(0, rect.y + rect.h * 0.4, 0, rect.y + rect.h);
    bot.addColorStop(0, `rgba(${grade.bot},0)`);
    bot.addColorStop(1, `rgba(${grade.bot},${(grade.botA * s).toFixed(3)})`);
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = bot; ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    ctx.globalCompositeOperation = 'source-over';
  }
  if (state.vignette > 0.01) {
    const vg = ctx.createRadialGradient(
      rect.x + rect.w / 2, rect.y + rect.h / 2, Math.min(rect.w, rect.h) * 0.35,
      rect.x + rect.w / 2, rect.y + rect.h / 2, Math.max(rect.w, rect.h) * 0.75);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(1, `rgba(0,0,0,${(state.vignette * 0.42).toFixed(3)})`);
    ctx.fillStyle = vg; ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  }
  if (state.grain > 0.01) {
    ctx.globalAlpha = state.grain * 0.45;
    ctx.fillStyle = grainPattern(ctx);
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    ctx.globalAlpha = 1;
  }
  if (state.halftone || grade.halftone) {
    ctx.globalAlpha = 0.16;
    ctx.fillStyle = halftonePattern(ctx);
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    ctx.globalAlpha = 1;
  }
  ctx.restore();
}

function drawPanelCaption(ctx, rect, photo) {
  const pad = Math.max(8, Math.round(rect.w * 0.02));
  const h1 = Math.max(13, Math.round(rect.h * 0.085));
  const h2 = Math.max(10, Math.round(rect.h * 0.062));
  const grad = ctx.createLinearGradient(0, rect.y + rect.h * 0.55, 0, rect.y + rect.h);
  grad.addColorStop(0, 'rgba(8,3,10,0)');
  grad.addColorStop(1, 'rgba(8,3,10,0.72)');
  ctx.fillStyle = grad;
  ctx.fillRect(rect.x, rect.y + rect.h * 0.55, rect.w, rect.h * 0.45);
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#fff';
  let capSize = h1;
  ctx.font = `${capSize}px Anton, sans-serif`;
  while (capSize > 10 && ctx.measureText(photo.place).width > rect.w - pad * 2) {
    capSize -= 1;
    ctx.font = `${capSize}px Anton, sans-serif`;
  }
  ctx.fillText(photo.place, rect.x + pad, rect.y + rect.h - h2 - 6);
  ctx.fillStyle = '#ffd76a';
  ctx.font = `${h2}px Arial, sans-serif`;
  ctx.fillText(`${photo.time} · ${photo.note}`, rect.x + pad, rect.y + rect.h - 6);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function fitFont(ctx, text, font, maxWidth, maxSize) {
  let size = maxSize;
  ctx.font = font(size);
  while (size > 12 && ctx.measureText(text).width > maxWidth) {
    size -= 2;
    ctx.font = font(size);
  }
  return size;
}

function setTracking(ctx, px) {
  try { ctx.letterSpacing = `${px}px`; } catch { /* older canvas: ignore */ }
}

function drawTitleBlock(ctx, plan, v, cap, mode) {
  const W = plan.W;
  const grad = ctx.createLinearGradient(0, plan.bandY, 0, plan.bandY + plan.bandH);
  grad.addColorStop(0, '#ffd76a'); grad.addColorStop(0.5, '#ff9a3d'); grad.addColorStop(1, '#ff5e7a');
  const ink = '#160818';
  const margin = Math.round(W * 0.03);
  if (mode === 'stacked') {
    // Solid dark band between hero and grid.
    const bg = ctx.createLinearGradient(0, plan.bandY, 0, plan.bandY + plan.bandH);
    bg.addColorStop(0, '#1d0a20'); bg.addColorStop(1, '#2c0f26');
    ctx.fillStyle = bg;
    ctx.fillRect(0, plan.bandY, W, plan.bandH);
    ctx.fillStyle = '#ff9a3d';
    ctx.fillRect(0, plan.bandY, W, Math.max(3, Math.round(plan.bandH * 0.02)));
    const cx = W / 2;
    const citySize = Math.max(15, Math.round(plan.bandH * 0.10));
    ctx.font = `${citySize}px Anton, sans-serif`;
    setTracking(ctx, Math.round(citySize * 0.35));
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd76a';
    ctx.fillText(`★ ${cap.city} ★`, cx, plan.bandY + plan.bandH * 0.16);
    setTracking(ctx, 0);
    const kickSize = Math.max(12, Math.round(plan.bandH * 0.075));
    ctx.font = `${kickSize}px Anton, sans-serif`;
    setTracking(ctx, Math.round(kickSize * 0.18));
    ctx.fillStyle = '#f6e8f2';
    ctx.fillText(`★★★★★  "${v.kicker}" — ${v.source}`, cx, plan.bandY + plan.bandH * 0.30);
    setTracking(ctx, 0);
    const titleMax = Math.round(plan.bandH * 0.46);
    const tSize = fitFont(ctx, cap.title, (s) => `${s}px "Passion One", sans-serif`, W - margin * 2, titleMax);
    ctx.font = `${tSize}px "Passion One", sans-serif`;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = ink; ctx.lineWidth = Math.max(5, tSize * 0.055);
    ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = Math.round(tSize * 0.08); ctx.shadowOffsetY = Math.round(tSize * 0.03);
    const titleY = plan.bandY + plan.bandH * 0.68;
    ctx.strokeText(cap.title, cx, titleY);
    ctx.fillStyle = grad; ctx.fillText(cap.title, cx, titleY);
    ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
    const subSize = Math.max(18, Math.round(tSize * 0.30));
    ctx.save();
    ctx.translate(cx, plan.bandY + plan.bandH * 0.90);
    ctx.rotate(-0.05);
    ctx.font = `${subSize}px "Passion One", sans-serif`;
    ctx.fillStyle = '#ff5e9e';
    ctx.lineWidth = Math.max(3, subSize * 0.12);
    ctx.strokeStyle = ink;
    ctx.strokeText(cap.subtitle, 0, 0);
    ctx.fillText(cap.subtitle, 0, 0);
    ctx.restore();
    ctx.textAlign = 'left';
  } else {
    // Landscape: scrim over the photo bottom, title spanning the full width.
    const scrim = ctx.createLinearGradient(0, plan.bandY, 0, plan.bandY + plan.bandH);
    scrim.addColorStop(0, 'rgba(10,4,12,0)');
    scrim.addColorStop(0.55, 'rgba(10,4,12,0.45)');
    scrim.addColorStop(1, 'rgba(10,4,12,0.78)');
    ctx.fillStyle = scrim;
    ctx.fillRect(0, plan.bandY, W, plan.bandH);
    const citySize = Math.max(16, Math.round(plan.bandH * 0.09));
    ctx.font = `${citySize}px Anton, sans-serif`;
    setTracking(ctx, Math.round(citySize * 0.4));
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffd76a';
    ctx.fillText(`★ ${cap.city} ★`, margin, plan.bandY + plan.bandH * 0.17);
    setTracking(ctx, 0);
    const kickSize = Math.max(13, Math.round(plan.bandH * 0.08));
    ctx.font = `${kickSize}px Anton, sans-serif`;
    setTracking(ctx, Math.round(kickSize * 0.2));
    ctx.fillStyle = '#f6e8f2';
    ctx.fillText(`★★★★★  "${v.kicker}" — ${v.source}`, margin, plan.bandY + plan.bandH * 0.30);
    setTracking(ctx, 0);
    const titleMax = Math.round(plan.bandH * 0.52);
    const tSize = fitFont(ctx, cap.title, (s) => `${s}px "Passion One", sans-serif`, W - margin * 2, titleMax);
    ctx.font = `${tSize}px "Passion One", sans-serif`;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = ink; ctx.lineWidth = Math.max(6, tSize * 0.06);
    ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = Math.round(tSize * 0.08); ctx.shadowOffsetY = Math.round(tSize * 0.03);
    const titleY = plan.bandY + plan.bandH * 0.76;
    ctx.strokeText(cap.title, margin, titleY);
    ctx.fillStyle = grad; ctx.fillText(cap.title, margin, titleY);
    ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
    const subSize = Math.max(20, Math.round(tSize * 0.30));
    ctx.save();
    // Park the script subtitle over the hero's lower right, clear of the
    // grid panels, so it never covers a panel caption.
    ctx.translate(plan.heroW - margin, plan.bandY + plan.bandH * 0.97);
    ctx.rotate(-0.06);
    ctx.textAlign = 'right';
    ctx.font = `${subSize}px "Passion One", sans-serif`;
    ctx.fillStyle = '#ff5e9e';
    ctx.lineWidth = Math.max(3, subSize * 0.12);
    ctx.strokeStyle = ink;
    ctx.strokeText(cap.subtitle, 0, 0);
    ctx.fillText(cap.subtitle, 0, 0);
    ctx.restore();
    ctx.textAlign = 'left';
  }
}

function drawSeal(ctx, seal) {
  const { x, y, r } = seal;
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  const spikes = 18;
  for (let i = 0; i < spikes * 2; i++) {
    const rad = (i % 2 === 0 ? r : r * 0.86) ;
    const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
    const px = Math.cos(a) * rad, py = Math.sin(a) * rad;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.closePath();
  const g = ctx.createLinearGradient(-r, -r, r, r);
  g.addColorStop(0, '#ffe08a'); g.addColorStop(1, '#ff9a3d');
  ctx.fillStyle = g; ctx.fill();
  ctx.lineWidth = Math.max(2, r * 0.03); ctx.strokeStyle = '#7a2d00'; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, r * 0.72, 0, Math.PI * 2);
  ctx.fillStyle = '#fff3d0'; ctx.fill();
  ctx.lineWidth = Math.max(1, r * 0.015); ctx.strokeStyle = '#7a2d00'; ctx.stroke();
  ctx.textAlign = 'center'; ctx.fillStyle = '#7a2d00';
  ctx.font = `${Math.round(r * 0.22)}px Anton, sans-serif`;
  ctx.fillText('★ ★ ★', 0, -r * 0.30);
  ctx.font = `${Math.round(r * 0.26)}px Anton, sans-serif`;
  ctx.fillText('EST.', 0, -r * 0.02);
  ctx.fillText('2026', 0, r * 0.26);
  ctx.font = `${Math.round(r * 0.15)}px Anton, sans-serif`;
  ctx.fillText('VICE GOLD', 0, r * 0.50);
  ctx.restore();
}

function drawChip(ctx, x, y, text, size, fg, bg, border) {
  ctx.font = `${size}px Anton, sans-serif`;
  const w = ctx.measureText(text).width + size * 1.2;
  const h = size * 1.9;
  ctx.save();
  roundRect(ctx, x, y, w, h, h * 0.3);
  ctx.fillStyle = bg; ctx.fill();
  if (border) { ctx.lineWidth = Math.max(1.5, size * 0.08); ctx.strokeStyle = border; ctx.stroke(); }
  ctx.fillStyle = fg;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, x + w / 2, y + h / 2 + size * 0.05);
  ctx.restore();
  return { x, y, w, h };
}

function drawHeroCaption(ctx, plan, photo) {
  const size = Math.max(13, Math.round(plan.W * 0.013));
  ctx.font = `${size}px Anton, sans-serif`;
  const line1 = photo.place;
  const line2 = `${photo.time} · ${photo.note}`;
  const w = Math.max(ctx.measureText(line1).width, ctx.measureText(line2).width) + size * 1.6;
  const h = size * 3.4;
  const x = plan.hero.x + Math.round(plan.W * 0.012);
  const y = (plan.landscape ? plan.bandY : plan.hero.h) - h - Math.round(plan.H * 0.012);
  ctx.save();
  roundRect(ctx, x, y, w, h, Math.round(h * 0.18));
  ctx.fillStyle = 'rgba(8,3,10,0.62)'; ctx.fill();
  ctx.strokeStyle = 'rgba(255,215,106,0.7)'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#fff';
  ctx.fillText(line1, x + size * 0.8, y + size * 1.45);
  ctx.fillStyle = '#ffd76a';
  ctx.font = `${Math.round(size * 0.85)}px Arial, sans-serif`;
  ctx.fillText(line2, x + size * 0.8, y + size * 2.7);
  ctx.restore();
}

function drawPalm(ctx, x, yBase, h, lean) {
  ctx.save();
  ctx.strokeStyle = '#160818';
  ctx.fillStyle = '#160818';
  ctx.lineWidth = Math.max(2, h * 0.05);
  ctx.beginPath();
  ctx.moveTo(x, yBase);
  ctx.quadraticCurveTo(x + lean * 0.4, yBase - h * 0.6, x + lean, yBase - h);
  ctx.stroke();
  const tx = x + lean, ty = yBase - h;
  ctx.lineWidth = Math.max(1.5, h * 0.035);
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI * (0.08 + i * 0.16) + (lean >= 0 ? 0 : 0);
    const len = h * (0.42 - Math.abs(i - 2) * 0.05);
    const ex = tx + Math.cos(a + (lean >= 0 ? 0.15 : -0.15)) * len;
    const ey = ty + Math.sin(a) * len * 0.7 + h * 0.12;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.quadraticCurveTo(tx + (ex - tx) * 0.5, ty - h * 0.08, ex, ey);
    ctx.stroke();
  }
  ctx.restore();
}

function drawFooterRibbon(ctx, plan, v, cap) {
  const y = plan.ribbonY, h = plan.ribbonH, W = plan.W;
  const sky = ctx.createLinearGradient(0, y, 0, y + h);
  sky.addColorStop(0, '#2a0a3d'); sky.addColorStop(0.45, '#a02060');
  sky.addColorStop(0.75, '#ff7a3d'); sky.addColorStop(1, '#ffd76a');
  ctx.fillStyle = sky;
  ctx.fillRect(0, y, W, h);
  // Slitted sun in the middle.
  const cx = W / 2, cy = y + h * 0.52, r = h * 0.62;
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
  ctx.fillStyle = '#ffe9a8';
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
  ctx.fillStyle = '#ff9a3d';
  const slitH = Math.max(2, h * 0.045);
  for (let i = 0; i < 3; i++) ctx.fillRect(cx - r, cy + r * (0.05 + i * 0.28), r * 2, slitH);
  ctx.restore();
  // Palm silhouettes at both ends.
  drawPalm(ctx, W * 0.06, y + h, h * 0.95, -W * 0.008);
  drawPalm(ctx, W * 0.11, y + h, h * 0.7, W * 0.006);
  drawPalm(ctx, W * 0.94, y + h, h * 0.95, W * 0.008);
  drawPalm(ctx, W * 0.89, y + h, h * 0.7, -W * 0.006);
  // Tagline over the strip, shrunk to fit the strip width.
  let tSize = Math.max(15, Math.round(h * 0.40));
  ctx.font = `${tSize}px Anton, sans-serif`;
  setTracking(ctx, Math.round(tSize * 0.28));
  while (tSize > 10 && ctx.measureText(cap.tagline).width + Math.round(tSize * 0.28) * (cap.tagline.length - 1) > W * 0.92) {
    tSize -= 2;
    ctx.font = `${tSize}px Anton, sans-serif`;
    setTracking(ctx, Math.round(tSize * 0.28));
  }
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = Math.round(tSize * 0.15); ctx.shadowOffsetY = 2;
  ctx.fillText(cap.tagline, cx, y + h * 0.62);
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  setTracking(ctx, 0);
  ctx.textAlign = 'left';
}

function drawBarcode(ctx, x, y, w, h) {
  ctx.fillStyle = '#fff';
  ctx.fillRect(x, y, w, h);
  const bars = [3, 1, 2, 1, 1, 3, 2, 2, 1, 1, 3, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 2, 1, 1, 3, 1];
  const unit = w / bars.reduce((a, b) => a + b, 0);
  let bx = x;
  ctx.fillStyle = '#000';
  for (let i = 0; i < bars.length; i++) {
    if (i % 2 === 0) ctx.fillRect(bx, y + 2, bars[i] * unit, h - 2);
    bx += bars[i] * unit;
  }
}

function drawCreditBar(ctx, plan, v, cap) {
  const y = plan.creditY, h = plan.creditH, W = plan.W;
  ctx.fillStyle = '#0a050c';
  ctx.fillRect(0, y, W, h);
  const mono = Math.round(h * 0.52);
  ctx.save();
  roundRect(ctx, Math.round(W * 0.012), y + (h - mono) / 2, mono, mono, Math.round(mono * 0.18));
  ctx.fillStyle = '#ff4d8d'; ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = `${Math.round(mono * 0.42)}px "Passion One", sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('VG', Math.round(W * 0.012) + mono / 2, y + h / 2 + 1);
  ctx.restore();
  const text = `${cap.title} — A VICE GOLD COVER STUDIO PICTURE · STARRING YOU · SHOT ON YOUR OWN CAMERA · GRADED BY HAND · LETTERING AND SEAL ORIGINAL · CAT. VG-07-2026`;
  const tx = Math.round(W * 0.012) + mono + Math.round(W * 0.012);
  const bw = Math.round(W * 0.055);
  const bx = W - Math.round(W * 0.012) - bw;
  let cSize = Math.max(9, Math.round(h * 0.30));
  ctx.font = `${cSize}px Arial, sans-serif`;
  while (cSize > 8 && ctx.measureText(text).width > bx - tx - Math.round(W * 0.01)) {
    cSize -= 1;
    ctx.font = `${cSize}px Arial, sans-serif`;
  }
  ctx.fillStyle = '#cfc4d0';
  ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  ctx.fillText(text, tx, y + h / 2);
  drawBarcode(ctx, bx, y + Math.round(h * 0.16), bw, Math.round(h * 0.56));
  ctx.fillStyle = '#cfc4d0';
  ctx.font = `${Math.max(7, Math.round(h * 0.14))}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('0 261904 1080 7', bx + bw / 2, y + h - Math.round(h * 0.08));
  ctx.textAlign = 'left';
}

function drawDiagonalRibbon(ctx, plan, text) {
  // Diagonal band across the top-left corner: rotate around a point on the
  // top edge so the band always crosses both the top and the left edge.
  const W = plan.W;
  const size = Math.max(15, Math.round(W * 0.016));
  const bandH = size * 2.1;
  const len = Math.round(W * 0.62);
  ctx.save();
  ctx.translate(Math.round(W * 0.17), 0);
  ctx.rotate(-0.62);
  const g = ctx.createLinearGradient(0, -bandH / 2, 0, bandH / 2);
  g.addColorStop(0, '#ff7ab0'); g.addColorStop(1, '#ff2e7e');
  ctx.fillStyle = g;
  // Band straddles the top edge at the rotation point and runs down-left
  // to the left edge; the text sits centred on the visible stretch of it,
  // shrunk so neither end leaves the frame.
  ctx.fillRect(-len / 2, -bandH / 2, len, bandH);
  ctx.fillStyle = '#fff';
  const tSize = Math.max(11, Math.round(size * 0.78));
  ctx.font = `${tSize}px Anton, sans-serif`;
  setTracking(ctx, Math.round(size * 0.18));
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, -len * 0.17, tSize * 0.06);
  setTracking(ctx, 0);
  ctx.restore();
}

export function drawCover(ctx, variantKey, state, images) {
  const v = VARIANTS[variantKey];
  const W = v.w, H = v.h;
  const cap = state.variants[variantKey];
  const grade = GRADES[state.grade] || GRADES['vice-gold'];
  // A variant may override the grade (portrait golden-hour + halftone, story duotone).
  const vGrade = GRADES[v.grade] || grade;
  const effGrade = state.grade === 'vice-gold' ? vGrade : grade;
  const effHalftone = state.halftone || v.halftone || effGrade.halftone;
  const eff = { ...state, halftone: effHalftone };
  ctx.save();
  ctx.fillStyle = '#0d060f';
  ctx.fillRect(0, 0, W, H);
  const plan = computePlan(v, state.layout);
  const comic = state.layout === 'comic';
  const visible = state.slots.slice(0, plan.layout.total);
  const heroIdx = visible[0];
  const heroPhoto = PHOTOS[heroIdx];
  drawPhoto(ctx, images[heroIdx], plan.hero, heroPhoto, effGrade, eff);
  // Grid panels (photos now; captions later, after the title block, so the
  // title scrim never dims them).
  const captioned = [];
  for (let i = 0; i < plan.cells.length; i++) {
    const idx = visible[i + 1];
    if (idx === undefined) break;
    const photo = PHOTOS[idx];
    drawPhoto(ctx, images[idx], plan.cells[i], photo, effGrade, eff);
    if (comic) {
      ctx.save();
      ctx.lineWidth = Math.max(4, plan.g * 1.6);
      ctx.strokeStyle = '#160818';
      ctx.strokeRect(plan.cells[i].x, plan.cells[i].y, plan.cells[i].w, plan.cells[i].h);
      ctx.restore();
    }
    captioned.push({ rect: plan.cells[i], photo });
  }
  // Thin cream seams between panels (drawn as gaps are the dark background).
  ctx.strokeStyle = 'rgba(246,232,242,0.9)';
  ctx.lineWidth = Math.max(2, plan.g * 0.5);
  ctx.strokeRect(plan.hero.x + 1, plan.hero.y + 1, plan.hero.w - 2, plan.hero.h - 2);
  for (const c of plan.cells) ctx.strokeRect(c.x + 1, c.y + 1, c.w - 2, c.h - 2);
  // Title band: scrim (landscape) or solid band (stacked).
  drawTitleBlock(ctx, plan, v, cap, plan.landscape ? 'landscape' : 'stacked');
  // Panel captions on top of everything painted so far.
  for (const c of captioned) drawPanelCaption(ctx, c.rect, c.photo);
  // Badges: VOL. 07 top-left, WANTED top-right (measured first, drawn once).
  const chipSize = Math.max(14, Math.round(W * 0.014));
  ctx.font = `${chipSize}px Anton, sans-serif`;
  const wantedW = ctx.measureText('WANTED ★★★★★').width + chipSize * 1.2;
  drawChip(ctx, Math.round(W * 0.012), Math.round(H * 0.016), 'VOL. 07', chipSize, '#ffd76a', 'rgba(10,4,12,0.72)', '#ffd76a');
  drawChip(ctx, W - Math.round(W * 0.012) - wantedW, Math.round(H * 0.016), 'WANTED ★★★★★', chipSize, '#ffd76a', 'rgba(10,4,12,0.72)', '#ffd76a');
  drawSeal(ctx, plan.seal);
  drawHeroCaption(ctx, plan, PHOTOS[state.slots[0]]);
  if (state.ribbon) drawDiagonalRibbon(ctx, plan, cap.ribbon);
  drawFooterRibbon(ctx, plan, v, cap);
  drawCreditBar(ctx, plan, v, cap);
  // Outer cream frame.
  ctx.strokeStyle = 'rgba(246,232,242,0.95)';
  ctx.lineWidth = Math.max(2, Math.round(W * 0.002));
  ctx.strokeRect(1, 1, W - 2, H - 2);
  ctx.restore();
}
