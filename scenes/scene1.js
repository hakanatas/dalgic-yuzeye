/* SAHNE 1 — DALGIÇ (0–10 s)  −18 m’deki dalgıç dakikada 2,4 m yükseliyor.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, lerp, inOut } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const amber = (a) => `rgba(${LI.AMBER_RGB},${a})`;
  const fr = (n, d, h) => F().fr(n, d, h);
  const neg = (s) => s.replace('-', '−');
  const label = (v) => (v < 0 ? neg(String(v)) : String(v));

  const LO = -20, HI = 8;
  const fmt = (v) => { const r = Math.round(v * 10) / 10, s = String(Math.abs(r)).replace('.', ','); return (r < 0 ? '−' : r > 0 ? '+' : '') + s; };
  /** the diver's depth (m) as a function of time */
  function depth(t) {
    if (t < 31) return -18;
    if (t < 37) { let v = -18; for (let i = 0; i < 5; i++) v += 2.4 * inOut(seg(t, 31.2 + i * 1.1, 31.9 + i * 1.1)); return v; }
    if (t < 66) return -6;
    return lerp(-6, 0, inOut(seg(t, 67.0, 69.4)));
  }
  /** a vertical depth line with the sea surface at 0 */
  function depthLine(ctx, D, a, s, t) {
    if (a <= 0) return null;
    const f = F(), Y = (v) => lerp(D.bot, D.top, (v - LO) / (HI - LO)), x = D.x;
    Ink.path(ctx, [[x, Y(LO) + 20], [x, Y(HI) - 20]], { w: 4, alpha: a, seed: 7001, taper: [0, 0] });
    Ink.path(ctx, [[x - 12, Y(HI) - 2], [x, Y(HI) - 22], [x + 12, Y(HI) - 2]], { w: 4, alpha: a, seed: 7002, taper: [0, 0] });
    for (let v = LO; v <= HI; v += 2) {
      const y = Y(v), big = v % 4 === 0;
      Ink.path(ctx, [[x - (big ? 13 : 8), y], [x + (big ? 13 : 8), y]], { w: 3, alpha: a, seed: 7010 + v, taper: [0, 0] });
      if (big) f.T(ctx, v === 0 ? '0' : fmt(v), x + 34, y, { size: s * 0.56, alpha: a, align: 'left' });
    }
    const P = []; for (let i = 0; i <= 40; i++) { const u = i / 40; P.push([x - 170 + 340 * u, Y(0) + 5 * Math.sin(u * 14 + t * 2)]); }
    Ink.path(ctx, P, { w: 3, alpha: 0.7 * a, seed: 7050, taper: [0.1, 0.1] });
    f.T(ctx, 'deniz seviyesi', x - 110, Y(0) - 26, { size: s * 0.5, alpha: 0.8 * a });
    return Y;
  }
  function diver(ctx, x, y, a, s, lab, color) {
    if (a <= 0) return;
    ctx.fillStyle = color || amber(a); ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2); ctx.fill();
    Ink.path(ctx, [[x + 8, y - 10], [x + 14, y - 30], [x + 22, y - 32]], { w: 3, alpha: a, seed: 7090, taper: [0, 0] });
    if (lab) F().T(ctx, lab, x + 100, y, { size: s * 0.7, alpha: a, align: 'left', halo: true, color: A.amber });
  }
  /** rows of the working, left panel */
  function rows(ctx, P, list, t, s) {
    const f = F();
    list.forEach(([t0, t1, i, items, hot, tick]) => {
      const k = win(t, t0, t1); if (k <= 0) return;
      const y = P.y0 + i * P.dy;
      f.expr(ctx, items, P.x, y, s * 0.88, { alpha: k, halo: true, color: hot ? A.amber : undefined, w: 820 });
      if (tick) f.tick(ctx, P.x + tick, y - 6, seg(t, t0 + 0.4, t0 + 1.0), k);
    });
  }

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Bir dalgıç yüzeye çıkıyor'],
      [10.6, 27.8, 'Problemi anlayalım: verilenler ve istenen'],
      [28.4, 45.8, 'İki strateji deneyelim'],
      [46.4, 63.8, 'Kontrol edelim, başka yolla da çözelim'],
      [64.4, 79.8, 'Genelleyelim: kural her zaman geçerli mi?'],
    ]);
  }

  function figure(ctx, env, t) {
    const L = KD.L(env), f = F(), a = END(t), s = L.G.s, D = L.DL, P = L.PN;
    const dl = win(t, 4.6, 79.8) * a;
    const Y = depthLine(ctx, D, dl, s, t);
    if (Y) {
      const v = depth(t);
      diver(ctx, D.x, Y(v), dl * seg(t, 5.2, 5.8), s, fmt(v) + ' m');
      // hops
      for (let i = 0; i < 5; i++) {
        const p = seg(t, 31.2 + i * 1.1, 31.9 + i * 1.1), al = win(t, 31.2, 45.8) * a; if (p <= 0 || al <= 0) continue;
        const y0 = Y(-18 + 2.4 * i), y1 = Y(-18 + 2.4 * (i + 1)), Q = [];
        for (let j = 0; j <= 12; j++) { const u = j / 12; Q.push([D.x - 26 - 36 * Math.sin(Math.PI * u), lerp(y0, y1, u)]); }
        Ink.path(ctx, Q, { w: 3.5, p, alpha: al, seed: 7100 + i, taper: [0.1, 0.2], color: LI.AMBER_RGB });
        if (p >= 1) f.T(ctx, '+2,4', D.x - 90, (y0 + y1) / 2, { size: s * 0.5, alpha: al, align: 'right', color: A.amber });
      }
      // the ghost at +6 m (t = 10)
      const g = win(t, 71.8, 79.8) * a;
      if (g > 0) { diver(ctx, D.x, Y(6), g * 0.5, s, '+6 m?', `rgba(${LI.INK_RGB},${0.35 * g})`); f.crossInk(ctx, D.x, Y(6), 26, seg(t, 73.0, 73.8), g); }
    }
    rows(ctx, P, [
      [11.4, 27.8, 0, ['Başlangıç: −18 m']], [12.8, 27.8, 1, ['Hız: dakikada 2,4 m yukarı']], [14.2, 27.8, 2, ['Süre: 5 dakika']],
      [15.6, 27.8, 3, ['İstenen: 5 dakika sonraki konum'], true],
      [29.4, 45.8, 0, ['Strateji 1: 2,4’er 2,4’er yukarı say']], [31.4, 45.8, 1, ['−18 → −15,6 → −13,2 → −10,8 → −8,4 → −6']],
      [38.0, 45.8, 2, ['Strateji 2: 5 × 2,4 = 12 m yükselir']], [39.4, 45.8, 3, ['−18 + 12 = −6'], true],
      [47.4, 63.8, 0, ['Kontrol: −6 − 12 = −18'], false, 330], [51.4, 63.8, 1, ['Strateji 3: yüzeye uzaklık 18 − 12 = 6 m']], [53.4, 63.8, 2, ['Yüzeyin 6 m altı: −6 m'], true],
      [65.4, 79.8, 0, ['t dakika sonra konum = −18 + 2,4 × t']], [66.6, 79.8, 1, ['t = 5 → −6 m'], false, 190], [67.8, 79.8, 2, ['t = 7,5 → 0: yüzeyde'], false, 250],
      [71.4, 79.8, 3, ['t = 10 → +6 m? Dalgıç havada olamaz'], true],
    ], t, s);
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[6.4, 10.2, 'Dalgıç deniz seviyesinin 18 m altında: −18 m'], [11.4, 27.8, 'Sayı ve işlem bileşenlerini belirleyelim'],
      [29.4, 45.8, 'Sayı doğrusunda 5 atlama'], [47.4, 63.8, 'Sonucu kontrol et: geri git'], [65.4, 79.8, 'Her dakika için bir kural yazalım']]);
    exprs(ctx, t, at(W, 1), [[17.0, 27.8, 'Yukarı çıkmak konuma eklemek demek; 5 kez 2,4 eklenir'], [38.0, 45.8, 'Önce toplam yükselme, sonra ekleme'],
      [51.4, 63.8, 'Başka bir yol: yüzeye olan uzaklığı bul'], [69.0, 79.8, '18 ÷ 2,4 = 7,5 dakikada yüzeye çıkar']]);
    exprs(ctx, t, at(W, 2), [[8.8, 10.2, 'Dakikada 2,4 m yükselirse 5 dakika sonra nerede?', true], [21.0, 27.8, 'Yeni konum = −18 + 5 × 2,4', true],
      [41.0, 45.8, 'İki strateji de aynı sonuç: 5 dakika sonra −6 m', true],
      [57.0, 63.8, 'Kontrol doğru, üç strateji de −6 m buldu', true],
      [75.0, 79.8, 'Kural yalnızca 0 ≤ t ≤ 7,5 için geçerli', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Verilenleri ve istenen ayır', 80.6], ['Temsil seç: sayı doğrusu, işlem', 81.6], ['Çöz, sonra kontrol et', 82.6], ['Genellemenin sınırlarını sına!', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.1 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); figure(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'A diver', nameTr: 'Dalgıç', concept: '−18 m, +2,4 m a minute', conceptTr: '−18 m, dakikada +2,4 m', render });
})(window.LI = window.LI || {});
