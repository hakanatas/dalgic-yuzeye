/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 7. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: '−18 m’de, dakikada 2,4 m yukarı', en: 'At −18 m, rising 2.4 m a minute',
      note: 'Bir dalgıç deniz seviyesinin 18 metre altında, yani eksi 18 metrede. Dakikada 2,4 metre yükseliyor. 5 dakika sonra nerede olur?' },
    { scene: 2, start: 10.8, end: 20.6, tr: 'Verilenler ve istenen', en: 'What is given, what is asked',
      note: 'Önce problemi anlayalım. Başlangıç eksi 18 metre, hız dakikada 2,4 metre yukarı, süre 5 dakika. İstenen: 5 dakika sonraki konum.' },
    { scene: 2, start: 21.0, end: 27.8, tr: 'Yeni konum = −18 + 5 × 2,4', en: 'New position = −18 + 5 × 2.4',
      note: 'Yukarı çıkmak konuma eklemek demek. 5 dakikada 5 kez 2,4 eklenir: yeni konum eksi 18 artı 5 çarpı 2,4.' },
    { scene: 3, start: 28.6, end: 37.6, tr: '2,4’er 2,4’er yukarı', en: 'Up 2.4 at a time',
      note: 'Birinci strateji: sayı doğrusunda 2,4’er 2,4’er yukarı sayalım. Eksi 15,6, eksi 13,2, eksi 10,8, eksi 8,4, eksi 6.' },
    { scene: 3, start: 38.0, end: 45.8, tr: '5 × 2,4 = 12, −18 + 12 = −6', en: '5 × 2.4 = 12, −18 + 12 = −6',
      note: 'İkinci strateji: önce toplam yükselmeyi bulalım: 5 çarpı 2,4, 12 metre. Eksi 18 artı 12, eksi 6. İki strateji de aynı sonucu verdi.' },
    { scene: 4, start: 46.6, end: 56.6, tr: 'Kontrol: −6 − 12 = −18', en: 'Check: −6 − 12 = −18',
      note: 'Sonucu kontrol edelim: eksi 6’dan 12 metre geri inersek eksi 18’e döneriz. Başka bir yol: yüzeye olan uzaklık 18 eksi 12, 6 metre; yani yüzeyin 6 metre altı.' },
    { scene: 4, start: 57.0, end: 63.8, tr: 'Üç strateji, aynı sonuç: −6 m', en: 'Three strategies, one answer: −6 m',
      note: 'Kontrol doğru. Üç strateji de dalgıcın 5 dakika sonra eksi 6 metrede olduğunu buldu.' },
    { scene: 5, start: 64.6, end: 74.6, tr: 'Konum = −18 + 2,4 × t', en: 'Position = −18 + 2.4 × t',
      note: 'Genelleyelim: t dakika sonra konum, eksi 18 artı 2,4 çarpı t. t 5 iken eksi 6. 18 bölü 2,4, 7,5: dalgıç 7,5 dakikada yüzeye çıkar. Peki t 10 olursa? Artı 6 metre: dalgıç havada olamaz.' },
    { scene: 5, start: 75.0, end: 79.8, tr: 'Kural 0 ≤ t ≤ 7,5 için geçerli', en: 'The rule holds for 0 ≤ t ≤ 7.5',
      note: 'Demek ki kural yalnızca 0 ile 7,5 dakika arasında geçerli.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Anla, çöz, kontrol et', en: 'Understand, solve, check',
      note: 'Aklında kalsın: verilenleri ve istenen ayır, uygun bir temsil seç, çöz ve kontrol et.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Genellemenin sınırlarını sına!', en: 'Test where the rule holds!',
      note: 'Genellemenin nerede geçerli olduğunu sına!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
