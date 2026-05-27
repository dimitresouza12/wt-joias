import { chromium } from "playwright";
import { mkdir, rename, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const URL = "http://localhost:3000";
const OUT_DIR = path.resolve(process.cwd(), "videos");

const presets = {
  desktop: { width: 1920, height: 1080, label: "desktop-1920x1080" },
  mobile:  { width: 390,  height: 844,  label: "mobile-390x844"   },
};

const target = process.argv[2] || "desktop";
const cfg = presets[target];
if (!cfg) {
  console.error(`Preset desconhecido: ${target}. Use desktop ou mobile.`);
  process.exit(1);
}

if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });

/* deviceScaleFactor=2 faz o Chrome renderizar em DPR retina dentro do
   viewport — texto, bordas e ícones ficam nítidos no output final. */
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: cfg.width, height: cfg.height },
  deviceScaleFactor: 2,
  recordVideo: {
    dir: OUT_DIR,
    size: { width: cfg.width, height: cfg.height },
  },
});

const page = await ctx.newPage();
console.log(`[${cfg.label}] abrindo ${URL}`);
await page.goto(URL, { waitUntil: "networkidle" });

/* segura 2s no hero para a animação de clip-path terminar */
await page.waitForTimeout(2000);

const totalHeight = await page.evaluate(() => document.body.scrollHeight);
const viewport = cfg.height;
const scrollDistance = totalHeight - viewport;

/* duração com easing: hero impactante, catálogo rápido, CTA com pausa */
const scrollMs = target === "mobile" ? 26000 : 24000;
const steps = 48;
const stepDelay = scrollMs / steps;

/* easeInOutQuad — posição lenta nos extremos, rápida no meio */
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t));

console.log(`[${cfg.label}] altura total ${totalHeight}px, ${steps} passos em ${scrollMs/1000}s com easing`);

await page.mouse.move(cfg.width / 2, cfg.height / 2);

let lastPos = 0;
for (let i = 1; i <= steps; i++) {
  const targetPos = ease(i / steps) * scrollDistance;
  const delta = targetPos - lastPos;
  await page.mouse.wheel(0, delta);
  await page.waitForTimeout(stepDelay);
  lastPos = targetPos;
}

/* GARANTE chegar no fim via Lenis — corrige déficit do wheel-throttle */
await page.evaluate((y) => {
  if (window.lenis) window.lenis.scrollTo(y, { duration: 1.5, lock: false });
  else window.scrollTo({ top: y, behavior: "smooth" });
}, scrollDistance);
await page.waitForTimeout(2000);

/* segura mais 2.5s para o CTA final aparecer com a animação */
await page.waitForTimeout(2500);

const video = page.video();
await page.close();
await ctx.close();
await browser.close();

if (video) {
  const savedPath = await video.path();
  const final = path.join(OUT_DIR, `wt-joias-${cfg.label}.webm`);
  await rename(savedPath, final);
  console.log(`[${cfg.label}] OK → ${final}`);
} else {
  console.log(`[${cfg.label}] AVISO: page.video() retornou null`);
}
