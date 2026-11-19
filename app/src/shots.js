// Screenshot scenes for the entry's contact sheet: ?shot=cover shows the
// landscape cover alone, ?shot=portrait / story / square the other variants,
// ?shot=editor (or no shot) the full studio. window.__viceGoldReady is set
// once the scene is painted, so a headless driver can wait on it.
import { VARIANTS, loadLibrary, loadFonts, drawCover, defaultState } from './vicegold.js';
import { initEditor } from './editor.js';

async function paintCover(key) {
  document.body.classList.add('shot-cover');
  const stage = document.createElement('div');
  stage.id = 'shot-stage';
  const cv = document.createElement('canvas');
  const v = VARIANTS[key];
  cv.width = v.w; cv.height = v.h;
  stage.appendChild(cv);
  document.body.appendChild(stage);
  const images = await loadLibrary();
  await loadFonts();
  drawCover(cv.getContext('2d'), key, defaultState(), images);
  requestAnimationFrame(() => requestAnimationFrame(() => { window.__viceGoldReady = true; }));
}

export async function runShot() {
  const query = new URLSearchParams(location.search);
  const shot = query.get('shot');
  if (shot === 'cover') return paintCover('landscape');
  if (shot === 'portrait') return paintCover('portrait');
  if (shot === 'story') return paintCover('story');
  if (shot === 'square') return paintCover('square');
  return initEditor();
}

runShot();
