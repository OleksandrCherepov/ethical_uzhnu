const pptxgen = require("pptxgenjs");

const pres = new pptxgen();

// --- Theme colors ---
const BG = "0c1929";
const PRIMARY = "38bdf8";
const SECONDARY = "4ade80";
const ACCENT_RED = "f87171";
const ACCENT_YELLOW = "fbbf24";
const ACCENT_PURPLE = "a78bfa";
const TEXT = "e2e8f0";
const MUTED = "94a3b8";
const LINE = "1e3a5f";

const CARD_BLUE_BG = "0f2a3d";
const CARD_GREEN_BG = "0f2d1f";
const CARD_RED_BG = "2d1515";
const CARD_YELLOW_BG = "2d2510";
const CARD_PURPLE_BG = "1f1a2d";

pres.author = "Черепов О.";
pres.title = "Hands-On Forensics: Практичний підхід до CTF у сфері цифрової форензики";
pres.subject = "Кафедра ТЕІБ, УжНУ";
pres.layout = "LAYOUT_WIDE";

// --- Slide masters ---
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: BG },
  objects: [
    { rect: { x: 0, y: 0, w: "100%", h: 0.04, fill: { color: PRIMARY } } },
  ],
});

pres.defineSlideMaster({
  title: "DIVIDER",
  background: { color: "0a1220" },
  objects: [
    { rect: { x: 0, y: 0, w: "100%", h: 0.04, fill: { color: ACCENT_RED } } },
  ],
});

// --- Helpers ---
function addCard(slide, x, y, w, h, bgColor, borderColor) {
  slide.addShape(pres.ShapeType.roundRect, {
    x, y, w, h,
    fill: { color: bgColor },
    line: { color: borderColor, width: 1.5 },
    rectRadius: 0.12,
  });
}

function addStatBox(slide, x, y, w, number, label, numColor = PRIMARY, bgColor = CARD_BLUE_BG, borderColor = PRIMARY) {
  addCard(slide, x, y, w, 1.1, bgColor, borderColor);
  slide.addText(number, { x, y: y + 0.1, w, h: 0.6, align: "center", fontSize: 28, bold: true, color: numColor });
  slide.addText(label, { x, y: y + 0.65, w, h: 0.4, align: "center", fontSize: 11, color: MUTED });
}

function addDivider(emoji, title, subtitle) {
  const s = pres.addSlide({ masterName: "DIVIDER" });
  s.addText(`${emoji}  ${title}`, {
    x: 1, y: 2.2, w: 11.33, h: 1.2, align: "center", fontSize: 40, bold: true, color: PRIMARY,
  });
  s.addText(subtitle, {
    x: 1, y: 3.6, w: 11.33, h: 0.7, align: "center", fontSize: 18, color: MUTED,
  });
  return s;
}

function codeBlock(text) {
  return { text, options: { fontFace: "Consolas", fontSize: 10, color: SECONDARY, lineSpacingMultiple: 1.4 } };
}

const halfW = 5.9;
let slide;

// ============================================================
// SLIDE 1: Title
// ============================================================
slide = pres.addSlide({ masterName: "DIVIDER" });
slide.addText("Hands-On Forensics", {
  x: 1, y: 1.5, w: 11.33, h: 1.5,
  align: "center", fontSize: 42, bold: true, color: PRIMARY, lineSpacingMultiple: 1.3,
});
slide.addText("Практичний підхід до CTF у сфері\nцифрової форензики", {
  x: 1, y: 3.2, w: 11.33, h: 1.2,
  align: "center", fontSize: 22, color: TEXT, lineSpacingMultiple: 1.3,
});
slide.addText("Черепов О.", {
  x: 1, y: 4.8, w: 11.33, h: 0.5, align: "center", fontSize: 16, color: MUTED,
});
slide.addText("Кафедра ТЕІБ, Ужгородський національний університет  •  2026", {
  x: 1, y: 5.3, w: 11.33, h: 0.5, align: "center", fontSize: 14, color: MUTED,
});

// ============================================================
// SLIDE 2: Agenda
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("План доповіді", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

const agendaLeft = [
  { text: "Огляд: ", options: { bold: true, color: TEXT, fontSize: 15 } },
  { text: "цифрова форензика у CTF\n", options: { color: TEXT, fontSize: 15 } },
  { text: "Диск: ", options: { bold: true, color: TEXT, fontSize: 15 } },
  { text: "Autopsy, Sleuth Kit, карвінг\n", options: { color: TEXT, fontSize: 15 } },
  { text: "Пам'ять: ", options: { bold: true, color: TEXT, fontSize: 15 } },
  { text: "Volatility та аналіз RAM\n", options: { color: TEXT, fontSize: 15 } },
  { text: "Мережа: ", options: { bold: true, color: TEXT, fontSize: 15 } },
  { text: "Wireshark, tshark, Zeek", options: { color: TEXT, fontSize: 15 } },
];
const agendaRight = [
  { text: "Стеганографія: ", options: { bold: true, color: TEXT, fontSize: 15 } },
  { text: "приховані дані\n", options: { color: TEXT, fontSize: 15 } },
  { text: "Логи та таймлайн: ", options: { bold: true, color: TEXT, fontSize: 15 } },
  { text: "EVTX, Plaso\n", options: { color: TEXT, fontSize: 15 } },
  { text: "Методологія: ", options: { bold: true, color: TEXT, fontSize: 15 } },
  { text: "системний підхід\n", options: { color: TEXT, fontSize: 15 } },
  { text: "Практика: ", options: { bold: true, color: TEXT, fontSize: 15 } },
  { text: "платформи та ресурси", options: { color: TEXT, fontSize: 15 } },
];

slide.addText(agendaLeft, { x: 0.7, y: 1.3, w: 5.8, h: 3, lineSpacingMultiple: 1.8, bullet: { code: "25CF", color: PRIMARY } });
slide.addText(agendaRight, { x: 6.8, y: 1.3, w: 5.8, h: 3, lineSpacingMultiple: 1.8, bullet: { code: "25CF", color: PRIMARY } });

// ============================================================
// SLIDE 3: Divider — Overview
// ============================================================
addDivider("🔍", "Огляд", "Цифрова форензика у CTF-змаганнях");

// ============================================================
// SLIDE 4: CTF Forensics Overview
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Форензика у CTF: що це?", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

const sw = 2.8, sg = 0.25, sx0 = 0.7;
addStatBox(slide, sx0, 1.2, sw, "85%", "CTF містять форензику");
addStatBox(slide, sx0 + sw + sg, 1.2, sw, "6", "Основних категорій", SECONDARY, CARD_GREEN_BG, SECONDARY);
addStatBox(slide, sx0 + 2 * (sw + sg), 1.2, sw, "200+", "Інструментів", ACCENT_PURPLE, CARD_PURPLE_BG, ACCENT_PURPLE);
addStatBox(slide, sx0 + 3 * (sw + sg), 1.2, sw, "Jeopardy", "Найпоширеніший формат", ACCENT_YELLOW, CARD_YELLOW_BG, ACCENT_YELLOW);

addCard(slide, 0.7, 2.6, halfW, 3.2, CARD_BLUE_BG, PRIMARY);
slide.addText("Типи завдань", { x: 0.9, y: 2.7, w: halfW - 0.4, h: 0.4, fontSize: 18, bold: true, color: PRIMARY });
slide.addText("Аналіз файлів — формати, метадані, вбудовані об'єкти\nАналіз дисків — образи, видалені файли, файлові системи\nАналіз пам'яті — дампи RAM, процеси, ін'єкції\nМережева форензика — PCAP, потоки, протоколи\nСтеганографія — приховані дані в медіафайлах\nАналіз логів — EVTX, syslog, таймлайни", {
  x: 0.9, y: 3.2, w: halfW - 0.4, h: 2.4, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "25CF", color: PRIMARY },
});

addCard(slide, 6.85, 2.6, halfW, 3.2, CARD_GREEN_BG, SECONDARY);
slide.addText("Чому форензика важлива?", { x: 7.05, y: 2.7, w: halfW - 0.4, h: 0.4, fontSize: 18, bold: true, color: SECONDARY });
slide.addText("Прямий зв'язок із реальними розслідуваннями (DFIR)\nРозвиває аналітичне мислення та увагу до деталей\nКросдисциплінарність: мережі + ОС + криптографія\nЗатребуваність на ринку: DFIR-аналітик", {
  x: 7.05, y: 3.2, w: halfW - 0.4, h: 2.4, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "25CF", color: SECONDARY },
});

// ============================================================
// SLIDE 5: Divider — Tools
// ============================================================
addDivider("🧰", "Інструменти", "Арсенал форензика");

// ============================================================
// SLIDE 6: Disk Forensics
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Аналіз дисків", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

addCard(slide, 0.7, 1.1, halfW, 5.5, CARD_BLUE_BG, PRIMARY);
slide.addText("Autopsy / Sleuth Kit", { x: 0.9, y: 1.2, w: halfW - 0.4, h: 0.4, fontSize: 18, bold: true, color: PRIMARY });
slide.addText("Повнофункціональна платформа аналізу образів дисків", {
  x: 0.9, y: 1.65, w: halfW - 0.4, h: 0.3, fontSize: 12, color: TEXT,
});
slide.addText(
  "mmls disk.img              # таблиця розділів\n" +
  "fls -r -o 2048 disk.img    # список файлів\n" +
  "icat -o 2048 disk.img 65   # витягти файл за inode\n" +
  "blkcat disk.img 1024       # вміст блоку", {
  x: 0.9, y: 2.1, w: halfW - 0.4, h: 1.8, fontSize: 10, fontFace: "Consolas", color: SECONDARY, lineSpacingMultiple: 1.5,
});
slide.addText("Підтримка: NTFS, FAT, EXT, HFS+, APFS\nAutopsy — GUI з таймлайном та пошуком", {
  x: 0.9, y: 4.0, w: halfW - 0.4, h: 1.2, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "25CF", color: PRIMARY },
});

addCard(slide, 6.85, 1.1, halfW, 5.5, CARD_GREEN_BG, SECONDARY);
slide.addText("Карвінг файлів", { x: 7.05, y: 1.2, w: halfW - 0.4, h: 0.4, fontSize: 18, bold: true, color: SECONDARY });
slide.addText("Відновлення файлів без метаданих файлової системи", {
  x: 7.05, y: 1.65, w: halfW - 0.4, h: 0.3, fontSize: 12, color: TEXT,
});
slide.addText(
  "foremost -t all -i disk.img -o output/\n" +
  "scalpel -c scalpel.conf -o out/ disk.img\n" +
  "binwalk -e firmware.bin", {
  x: 7.05, y: 2.1, w: halfW - 0.4, h: 1.4, fontSize: 10, fontFace: "Consolas", color: SECONDARY, lineSpacingMultiple: 1.5,
});
slide.addText("photorec — відновлення медіафайлів\nbulk_extractor — паралельний аналіз\ntestdisk — відновлення розділів", {
  x: 7.05, y: 3.7, w: halfW - 0.4, h: 1.5, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "25CF", color: SECONDARY },
});

// ============================================================
// SLIDE 7: Memory Forensics
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Аналіз пам'яті (RAM)", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

addStatBox(slide, 0.7, 1.1, 3.85, "Volatility 3", "Стандарт галузі", ACCENT_PURPLE, CARD_PURPLE_BG, ACCENT_PURPLE);
addStatBox(slide, 4.8, 1.1, 3.85, "80+", "Плагінів Windows", SECONDARY, CARD_GREEN_BG, SECONDARY);
addStatBox(slide, 8.9, 1.1, 3.85, "40+", "Плагінів Linux", ACCENT_YELLOW, CARD_YELLOW_BG, ACCENT_YELLOW);

addCard(slide, 0.7, 2.5, halfW, 4.2, CARD_PURPLE_BG, ACCENT_PURPLE);
slide.addText("Ключові плагіни Volatility 3", { x: 0.9, y: 2.6, w: halfW - 0.4, h: 0.4, fontSize: 16, bold: true, color: ACCENT_PURPLE });
slide.addText(
  "vol -f mem.raw windows.info\n" +
  "vol -f mem.raw windows.pslist\n" +
  "vol -f mem.raw windows.pstree\n" +
  "vol -f mem.raw windows.netscan\n" +
  "vol -f mem.raw windows.cmdline", {
  x: 0.9, y: 3.1, w: halfW - 0.4, h: 2.5, fontSize: 10, fontFace: "Consolas", color: SECONDARY, lineSpacingMultiple: 1.5,
});

addCard(slide, 6.85, 2.5, halfW, 4.2, CARD_BLUE_BG, PRIMARY);
slide.addText("Поглиблений аналіз", { x: 7.05, y: 2.6, w: halfW - 0.4, h: 0.4, fontSize: 16, bold: true, color: PRIMARY });
slide.addText(
  "vol -f mem.raw windows.dlllist\n" +
  "vol -f mem.raw windows.malfind\n" +
  "vol -f mem.raw windows.registry.hivelist\n" +
  "vol -f mem.raw windows.filescan\n" +
  "vol -f mem.raw windows.hashdump", {
  x: 7.05, y: 3.1, w: halfW - 0.4, h: 2.0, fontSize: 10, fontFace: "Consolas", color: SECONDARY, lineSpacingMultiple: 1.5,
});
slide.addText("hashdump — хеші паролів\nhandles — відкриті хендли процесів", {
  x: 7.05, y: 5.2, w: halfW - 0.4, h: 1.0, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "25CF", color: PRIMARY },
});

// ============================================================
// SLIDE 8: Network Forensics
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Мережева форензика", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

addCard(slide, 0.7, 1.1, halfW, 3.0, CARD_GREEN_BG, SECONDARY);
slide.addText("Wireshark Display Filters", { x: 0.9, y: 1.2, w: halfW - 0.4, h: 0.4, fontSize: 16, bold: true, color: SECONDARY });
slide.addText(
  'http.request.method == "POST"\n' +
  'http contains "flag"\n' +
  'dns.qry.name contains "suspicious"\n' +
  'tcp.stream eq 5\n' +
  'tls.handshake.type == 1', {
  x: 0.9, y: 1.7, w: halfW - 0.4, h: 2.0, fontSize: 10, fontFace: "Consolas", color: SECONDARY, lineSpacingMultiple: 1.4,
});

addCard(slide, 0.7, 4.3, halfW, 2.3, CARD_BLUE_BG, PRIMARY);
slide.addText("tshark (CLI)", { x: 0.9, y: 4.4, w: halfW - 0.4, h: 0.35, fontSize: 16, bold: true, color: PRIMARY });
slide.addText(
  'tshark -r capture.pcap -Y "http"\n' +
  'tshark -r capture.pcap -T fields -e http.host\n' +
  'tshark -r capture.pcap --export-objects http,out/', {
  x: 0.9, y: 4.8, w: halfW - 0.4, h: 1.5, fontSize: 10, fontFace: "Consolas", color: SECONDARY, lineSpacingMultiple: 1.4,
});

// Network tools table
const netRows = [
  [
    { text: "Інструмент", options: { bold: true, color: PRIMARY, fill: { color: "0f2a3d" }, fontSize: 12 } },
    { text: "Тип", options: { bold: true, color: PRIMARY, fill: { color: "0f2a3d" }, fontSize: 12 } },
    { text: "Переваги", options: { bold: true, color: PRIMARY, fill: { color: "0f2a3d" }, fontSize: 12 } },
  ],
  [
    { text: "Wireshark", options: { bold: true, color: TEXT, fontSize: 12 } },
    { text: "GUI", options: { color: TEXT, fontSize: 12 } },
    { text: "Глибокий аналіз пакетів", options: { color: TEXT, fontSize: 12 } },
  ],
  [
    { text: "tshark", options: { bold: true, color: TEXT, fontSize: 12 } },
    { text: "CLI", options: { color: TEXT, fontSize: 12 } },
    { text: "Автоматизація, фільтрація", options: { color: TEXT, fontSize: 12 } },
  ],
  [
    { text: "NetworkMiner", options: { bold: true, color: TEXT, fontSize: 12 } },
    { text: "GUI", options: { color: TEXT, fontSize: 12 } },
    { text: "Автоекстракція файлів", options: { color: TEXT, fontSize: 12 } },
  ],
  [
    { text: "Zeek (Bro)", options: { bold: true, color: TEXT, fontSize: 12 } },
    { text: "Framework", options: { color: TEXT, fontSize: 12 } },
    { text: "Журнали з'єднань", options: { color: TEXT, fontSize: 12 } },
  ],
  [
    { text: "Scapy", options: { bold: true, color: TEXT, fontSize: 12 } },
    { text: "Python", options: { color: TEXT, fontSize: 12 } },
    { text: "Кастомний аналіз пакетів", options: { color: TEXT, fontSize: 12 } },
  ],
];

slide.addTable(netRows, {
  x: 6.85, y: 1.1, w: halfW,
  border: { type: "solid", pt: 1, color: LINE },
  colW: [1.6, 1.1, 3.2],
  rowH: [0.4, 0.38, 0.38, 0.38, 0.38, 0.38],
  fill: { color: BG },
  margin: [4, 6, 4, 6],
});

addCard(slide, 6.85, 4.3, halfW, 1.1, CARD_YELLOW_BG, ACCENT_YELLOW);
slide.addText([
  { text: "CTF-порада: ", options: { bold: true, color: ACCENT_YELLOW, fontSize: 12 } },
  { text: "завжди починайте з Statistics → Protocol Hierarchy у Wireshark", options: { color: TEXT, fontSize: 12 } },
], { x: 7.05, y: 4.4, w: halfW - 0.4, h: 0.9, valign: "middle" });

// ============================================================
// SLIDE 9: Divider — Steganography
// ============================================================
addDivider("👁", "Стеганографія", "Приховане на видному місці");

// ============================================================
// SLIDE 10: Steganography Tools
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Інструменти стеганографії", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

addCard(slide, 0.7, 1.1, halfW, 5.5, CARD_YELLOW_BG, ACCENT_YELLOW);
slide.addText("Зображення", { x: 0.9, y: 1.2, w: halfW - 0.4, h: 0.4, fontSize: 18, bold: true, color: ACCENT_YELLOW });
slide.addText(
  "# steghide — JPEG/BMP\n" +
  "steghide extract -sf image.jpg\n\n" +
  "# zsteg — PNG/BMP (LSB)\n" +
  "zsteg image.png\n" +
  "zsteg -a image.png    # всі канали\n\n" +
  "# stegsolve — візуальний аналіз\n" +
  "java -jar StegSolve.jar", {
  x: 0.9, y: 1.7, w: halfW - 0.4, h: 2.6, fontSize: 10, fontFace: "Consolas", color: SECONDARY, lineSpacingMultiple: 1.3,
});
slide.addText("Aperi'Solve — онлайн, 10+ інструментів\npngcheck — валідація PNG-чанків\nexiftool — метадані EXIF", {
  x: 0.9, y: 4.5, w: halfW - 0.4, h: 1.5, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "25CF", color: ACCENT_YELLOW },
});

addCard(slide, 6.85, 1.1, halfW, 3.0, CARD_PURPLE_BG, ACCENT_PURPLE);
slide.addText("Аудіо", { x: 7.05, y: 1.2, w: halfW - 0.4, h: 0.4, fontSize: 18, bold: true, color: ACCENT_PURPLE });
slide.addText(
  "# Sonic Visualiser — спектрограма\n" +
  "# Audacity — Layer > Spectrogram\n" +
  "# DeepSound — приховування у WAV\n" +
  "sstv -d audio.wav -o output.png", {
  x: 7.05, y: 1.7, w: halfW - 0.4, h: 1.5, fontSize: 10, fontFace: "Consolas", color: SECONDARY, lineSpacingMultiple: 1.4,
});
slide.addText("Морзе — перевірити частоти CW\nDTMF — декодування телефонних тонів", {
  x: 7.05, y: 3.3, w: halfW - 0.4, h: 0.7, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.4,
  bullet: { code: "25CF", color: ACCENT_PURPLE },
});

addCard(slide, 6.85, 4.3, halfW, 2.3, CARD_BLUE_BG, PRIMARY);
slide.addText("Автоматизація", { x: 7.05, y: 4.4, w: halfW - 0.4, h: 0.35, fontSize: 16, bold: true, color: PRIMARY });
slide.addText("Aperi'Solve — запускає exiftool, binwalk, zsteg, steghide, foremost одночасно\nstegcracker — брутфорс паролів steghide\nstegseek — швидший за stegcracker у 1000x", {
  x: 7.05, y: 4.8, w: halfW - 0.4, h: 1.5, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "25CF", color: PRIMARY },
});

// ============================================================
// SLIDE 11: File Analysis
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Аналіз файлів та Magic Bytes", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

const magicRows = [
  [
    { text: "Формат", options: { bold: true, color: PRIMARY, fill: { color: "0f2a3d" }, fontSize: 12 } },
    { text: "Magic Bytes (hex)", options: { bold: true, color: PRIMARY, fill: { color: "0f2a3d" }, fontSize: 12 } },
    { text: "ASCII", options: { bold: true, color: PRIMARY, fill: { color: "0f2a3d" }, fontSize: 12 } },
  ],
  [{ text: "PNG", options: { bold: true, color: TEXT, fontSize: 11 } }, { text: "89 50 4E 47 0D 0A 1A 0A", options: { fontFace: "Consolas", color: SECONDARY, fontSize: 11 } }, { text: ".PNG....", options: { color: TEXT, fontSize: 11 } }],
  [{ text: "JPEG", options: { bold: true, color: TEXT, fontSize: 11 } }, { text: "FF D8 FF E0", options: { fontFace: "Consolas", color: SECONDARY, fontSize: 11 } }, { text: "----", options: { color: TEXT, fontSize: 11 } }],
  [{ text: "PDF", options: { bold: true, color: TEXT, fontSize: 11 } }, { text: "25 50 44 46 2D", options: { fontFace: "Consolas", color: SECONDARY, fontSize: 11 } }, { text: "%PDF-", options: { color: TEXT, fontSize: 11 } }],
  [{ text: "ZIP/DOCX", options: { bold: true, color: TEXT, fontSize: 11 } }, { text: "50 4B 03 04", options: { fontFace: "Consolas", color: SECONDARY, fontSize: 11 } }, { text: "PK..", options: { color: TEXT, fontSize: 11 } }],
  [{ text: "GIF", options: { bold: true, color: TEXT, fontSize: 11 } }, { text: "47 49 46 38", options: { fontFace: "Consolas", color: SECONDARY, fontSize: 11 } }, { text: "GIF8", options: { color: TEXT, fontSize: 11 } }],
  [{ text: "ELF", options: { bold: true, color: TEXT, fontSize: 11 } }, { text: "7F 45 4C 46", options: { fontFace: "Consolas", color: SECONDARY, fontSize: 11 } }, { text: ".ELF", options: { color: TEXT, fontSize: 11 } }],
  [{ text: "RAR", options: { bold: true, color: TEXT, fontSize: 11 } }, { text: "52 61 72 21 1A 07", options: { fontFace: "Consolas", color: SECONDARY, fontSize: 11 } }, { text: "Rar!..", options: { color: TEXT, fontSize: 11 } }],
  [{ text: "PCAP", options: { bold: true, color: TEXT, fontSize: 11 } }, { text: "D4 C3 B2 A1", options: { fontFace: "Consolas", color: SECONDARY, fontSize: 11 } }, { text: "----", options: { color: TEXT, fontSize: 11 } }],
];

slide.addTable(magicRows, {
  x: 0.7, y: 1.1, w: 6.1,
  border: { type: "solid", pt: 1, color: LINE },
  colW: [1.2, 2.8, 1.1],
  rowH: [0.38, 0.36, 0.36, 0.36, 0.36, 0.36, 0.36, 0.36, 0.36],
  fill: { color: BG },
  margin: [3, 6, 3, 6],
});

addCard(slide, 7.05, 1.1, 5.7, 2.8, CARD_GREEN_BG, SECONDARY);
slide.addText("Перші команди", { x: 7.25, y: 1.2, w: 5.3, h: 0.35, fontSize: 16, bold: true, color: SECONDARY });
slide.addText(
  "file mystery_file\n" +
  "xxd mystery_file | head\n" +
  "exiftool mystery_file\n" +
  "strings -n 8 mystery_file\n" +
  "strings -e l mystery_file   # UTF-16\n" +
  "binwalk mystery_file", {
  x: 7.25, y: 1.6, w: 5.3, h: 2.0, fontSize: 10, fontFace: "Consolas", color: SECONDARY, lineSpacingMultiple: 1.4,
});

addCard(slide, 7.05, 4.1, 5.7, 2.5, CARD_BLUE_BG, PRIMARY);
slide.addText("CyberChef", { x: 7.25, y: 4.2, w: 5.3, h: 0.35, fontSize: 16, bold: true, color: PRIMARY });
slide.addText("Веб-інструмент для трансформацій даних\nBase64, XOR, ROT13, AES, Gunzip\n\"Magic\" рецепт — автоматичне розпізнавання\nЛанцюжки рецептів (\"recipes\")", {
  x: 7.25, y: 4.6, w: 5.3, h: 1.8, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "25CF", color: PRIMARY },
});

// ============================================================
// SLIDE 12: Divider — Logs & Timeline
// ============================================================
addDivider("📜", "Логи та таймлайн", "Відтворення хронології подій");

// ============================================================
// SLIDE 13: Log Analysis
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Аналіз логів", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

const logRows = [
  [
    { text: "Event ID", options: { bold: true, color: PRIMARY, fill: { color: "0f2a3d" }, fontSize: 12 } },
    { text: "Джерело", options: { bold: true, color: PRIMARY, fill: { color: "0f2a3d" }, fontSize: 12 } },
    { text: "Опис", options: { bold: true, color: PRIMARY, fill: { color: "0f2a3d" }, fontSize: 12 } },
  ],
  [{ text: "4624", options: { bold: true, color: TEXT, fontSize: 11 } }, { text: "Security", options: { color: TEXT, fontSize: 11 } }, { text: "Успішний вхід", options: { color: TEXT, fontSize: 11 } }],
  [{ text: "4625", options: { bold: true, color: TEXT, fontSize: 11 } }, { text: "Security", options: { color: TEXT, fontSize: 11 } }, { text: "Невдалий вхід", options: { color: TEXT, fontSize: 11 } }],
  [{ text: "4688", options: { bold: true, color: TEXT, fontSize: 11 } }, { text: "Security", options: { color: TEXT, fontSize: 11 } }, { text: "Створення процесу", options: { color: TEXT, fontSize: 11 } }],
  [{ text: "4720", options: { bold: true, color: TEXT, fontSize: 11 } }, { text: "Security", options: { color: TEXT, fontSize: 11 } }, { text: "Створення користувача", options: { color: TEXT, fontSize: 11 } }],
  [{ text: "1", options: { bold: true, color: TEXT, fontSize: 11 } }, { text: "Sysmon", options: { color: ACCENT_YELLOW, fontSize: 11 } }, { text: "Процес (детальне)", options: { color: TEXT, fontSize: 11 } }],
  [{ text: "3", options: { bold: true, color: TEXT, fontSize: 11 } }, { text: "Sysmon", options: { color: ACCENT_YELLOW, fontSize: 11 } }, { text: "Мережеве з'єднання", options: { color: TEXT, fontSize: 11 } }],
  [{ text: "7045", options: { bold: true, color: TEXT, fontSize: 11 } }, { text: "System", options: { color: TEXT, fontSize: 11 } }, { text: "Встановлення сервісу", options: { color: TEXT, fontSize: 11 } }],
  [{ text: "1102", options: { bold: true, color: ACCENT_RED, fontSize: 11 } }, { text: "Security", options: { color: TEXT, fontSize: 11 } }, { text: "Очищення журналу", options: { color: ACCENT_RED, fontSize: 11 } }],
];

slide.addTable(logRows, {
  x: 0.7, y: 1.0, w: 6.1,
  border: { type: "solid", pt: 1, color: LINE },
  colW: [1.1, 1.4, 3.6],
  rowH: [0.38, 0.36, 0.36, 0.36, 0.36, 0.36, 0.36, 0.36, 0.36],
  fill: { color: BG },
  margin: [3, 6, 3, 6],
});

addCard(slide, 7.05, 1.0, 5.7, 2.5, CARD_RED_BG, ACCENT_RED);
slide.addText("Chainsaw", { x: 7.25, y: 1.1, w: 5.3, h: 0.35, fontSize: 16, bold: true, color: ACCENT_RED });
slide.addText("Швидкий пошук у EVTX за Sigma-правилами", {
  x: 7.25, y: 1.5, w: 5.3, h: 0.3, fontSize: 12, color: TEXT,
});
slide.addText(
  'chainsaw hunt ./evtx_logs/ -s sigma/\n' +
  'chainsaw search "mimikatz" -e ./logs/', {
  x: 7.25, y: 1.9, w: 5.3, h: 0.9, fontSize: 10, fontFace: "Consolas", color: SECONDARY, lineSpacingMultiple: 1.4,
});

addCard(slide, 7.05, 3.7, 5.7, 3.0, CARD_GREEN_BG, SECONDARY);
slide.addText("Linux-логи", { x: 7.25, y: 3.8, w: 5.3, h: 0.35, fontSize: 16, bold: true, color: SECONDARY });
slide.addText(
  "/var/log/auth.log   # аутентифікація\n" +
  "/var/log/syslog     # системні події\n" +
  "/var/log/apache2/   # веб-сервер\n" +
  "~/.bash_history     # команди\n\n" +
  'grep -i "failed" auth.log\n' +
  'journalctl --since "2026-01-01"', {
  x: 7.25, y: 4.2, w: 5.3, h: 2.2, fontSize: 10, fontFace: "Consolas", color: SECONDARY, lineSpacingMultiple: 1.3,
});

// ============================================================
// SLIDE 14: Timeline Analysis
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Побудова таймлайну", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

// Flow row
const flowSteps = [
  { label: "Збір\nджерел", color: ACCENT_RED, bg: CARD_RED_BG },
  { label: "Парсинг\nlog2timeline", color: ACCENT_YELLOW, bg: CARD_YELLOW_BG },
  { label: "Фільтрація\npsort", color: PRIMARY, bg: CARD_BLUE_BG },
  { label: "Візуалізація\nTimesketch", color: SECONDARY, bg: CARD_GREEN_BG },
  { label: "Звіт\nВисновки", color: ACCENT_PURPLE, bg: CARD_PURPLE_BG },
];

const fsW = 2.1, fsGap = 0.3, fsX0 = 0.7, fsY = 1.2, fsH = 1.0;
flowSteps.forEach((fs, i) => {
  const fx = fsX0 + i * (fsW + fsGap);
  addCard(slide, fx, fsY, fsW, fsH, fs.bg, fs.color);
  slide.addText(fs.label, { x: fx, y: fsY + 0.1, w: fsW, h: fsH - 0.2, align: "center", fontSize: 12, bold: true, color: fs.color, lineSpacingMultiple: 1.2 });
  if (i < flowSteps.length - 1) {
    slide.addText("→", { x: fx + fsW, y: fsY, w: fsGap, h: fsH, align: "center", fontSize: 18, color: PRIMARY });
  }
});

addCard(slide, 0.7, 2.6, halfW, 3.8, CARD_BLUE_BG, PRIMARY);
slide.addText("Plaso / log2timeline", { x: 0.9, y: 2.7, w: halfW - 0.4, h: 0.4, fontSize: 16, bold: true, color: PRIMARY });
slide.addText(
  "# Створення супертаймлайну\n" +
  "log2timeline.py timeline.plaso disk.img\n\n" +
  "# Фільтрація та експорт\n" +
  "psort.py -o l2tcsv timeline.plaso \\\n" +
  '  -w timeline.csv \\\n' +
  '  "date > \'2026-01-15\' AND date < \'2026-01-20\'"', {
  x: 0.9, y: 3.2, w: halfW - 0.4, h: 3.0, fontSize: 10, fontFace: "Consolas", color: SECONDARY, lineSpacingMultiple: 1.3,
});

addCard(slide, 6.85, 2.6, halfW, 3.8, CARD_PURPLE_BG, ACCENT_PURPLE);
slide.addText("MFT-аналіз (NTFS)", { x: 7.05, y: 2.7, w: halfW - 0.4, h: 0.4, fontSize: 16, bold: true, color: ACCENT_PURPLE });
slide.addText(
  "# MFTECmd (Eric Zimmerman)\n" +
  "MFTECmd.exe -f '$MFT' --csv out/\n\n" +
  "# analyzeMFT (Python)\n" +
  "analyzeMFT.py -f '$MFT' -o mft.csv", {
  x: 7.05, y: 3.2, w: halfW - 0.4, h: 1.8, fontSize: 10, fontFace: "Consolas", color: SECONDARY, lineSpacingMultiple: 1.3,
});
slide.addText("$STANDARD_INFORMATION vs $FILE_NAME timestamps\nTimestomping detection", {
  x: 7.05, y: 5.1, w: halfW - 0.4, h: 1.0, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "25CF", color: ACCENT_PURPLE },
});

// ============================================================
// SLIDE 15: Divider — Methodology
// ============================================================
addDivider("🧭", "Методологія", "Системний підхід до форензичних завдань CTF");

// ============================================================
// SLIDE 16: CTF Forensics Methodology
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Методологія розв'язання", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

// Flow row
const methSteps = [
  { label: "Identify\nВизначити тип", color: ACCENT_RED },
  { label: "Extract\nВитягти дані", color: ACCENT_YELLOW },
  { label: "Analyze\nАналізувати", color: PRIMARY },
  { label: "Decode\nДекодувати", color: ACCENT_PURPLE },
  { label: "Flag!\nОтримати прапорець", color: SECONDARY },
];
const mw = 2.1, mGap = 0.3, mX0 = 0.7, mY = 1.1, mH = 0.9;
methSteps.forEach((ms, i) => {
  const mx = mX0 + i * (mw + mGap);
  const bgMap = { [ACCENT_RED]: CARD_RED_BG, [ACCENT_YELLOW]: CARD_YELLOW_BG, [PRIMARY]: CARD_BLUE_BG, [ACCENT_PURPLE]: CARD_PURPLE_BG, [SECONDARY]: CARD_GREEN_BG };
  addCard(slide, mx, mY, mw, mH, bgMap[ms.color], ms.color);
  slide.addText(ms.label, { x: mx, y: mY + 0.05, w: mw, h: mH - 0.1, align: "center", fontSize: 12, bold: true, color: ms.color, lineSpacingMultiple: 1.2 });
  if (i < methSteps.length - 1) {
    slide.addText("→", { x: mx + mw, y: mY, w: mGap, h: mH, align: "center", fontSize: 18, color: PRIMARY });
  }
});

addCard(slide, 0.7, 2.3, halfW, 4.3, CARD_GREEN_BG, SECONDARY);
slide.addText('"Low-Hanging Fruit" — перевірте першими', { x: 0.9, y: 2.4, w: halfW - 0.4, h: 0.4, fontSize: 14, bold: true, color: SECONDARY });
slide.addText(
  "file + strings + exiftool на кожен файл\n" +
  "binwalk -e — вбудовані файли\n" +
  'grep -r "flag\\|CTF\\|{" . — прямий пошук\n' +
  "Перевірити кінець файлу (дані після EOF)\n" +
  "Порівняти розмір файлу з очікуваним\n" +
  "Спробувати змінити розширення файлу\n" +
  "Base64, hex, ROT13 на підозрілі рядки", {
  x: 0.9, y: 2.9, w: halfW - 0.4, h: 3.2, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "2713", color: SECONDARY },
});

addCard(slide, 6.85, 2.3, halfW, 4.3, CARD_RED_BG, ACCENT_RED);
slide.addText("Типові помилки", { x: 7.05, y: 2.4, w: halfW - 0.4, h: 0.4, fontSize: 14, bold: true, color: ACCENT_RED });
slide.addText(
  "Пропуск метаданих — EXIF часто містить підказки\n" +
  "Ігнорування strings — паролі, URL, ключі\n" +
  "Один інструмент — різні tools бачать різне\n" +
  "Пропуск alternate data — ADS в NTFS\n" +
  "Неуважність до часових зон — UTC vs локальний", {
  x: 7.05, y: 2.9, w: halfW - 0.4, h: 2.5, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "25CF", color: ACCENT_RED },
});

addCard(slide, 7.05, 5.6, halfW - 0.4, 0.9, CARD_YELLOW_BG, ACCENT_YELLOW);
slide.addText([
  { text: "Правило: ", options: { bold: true, color: ACCENT_YELLOW, fontSize: 12 } },
  { text: "якщо щось виглядає не так — це підказка!", options: { color: TEXT, fontSize: 12 } },
], { x: 7.25, y: 5.65, w: halfW - 0.8, h: 0.7, valign: "middle" });

// ============================================================
// SLIDE 17: Cheatsheet
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Шпаргалка: Essential Commands", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

const cheatW = 5.9, cheatH = 2.8, cheatGap = 0.25;

// File analysis
addCard(slide, 0.7, 1.1, cheatW, cheatH, CARD_BLUE_BG, PRIMARY);
slide.addText("Аналіз файлів", { x: 0.9, y: 1.15, w: cheatW - 0.4, h: 0.35, fontSize: 14, bold: true, color: PRIMARY });
slide.addText(
  "file *                   # тип файлів\n" +
  "exiftool file            # метадані\n" +
  "strings -n 8 file        # рядки\n" +
  "xxd file | head -20      # hex-дамп\n" +
  "binwalk -e file          # витягти\n" +
  "foremost -i file -o out/ # карвінг", {
  x: 0.9, y: 1.55, w: cheatW - 0.4, h: 2.2, fontSize: 10, fontFace: "Consolas", color: SECONDARY, lineSpacingMultiple: 1.35,
});

// Memory
addCard(slide, 6.85, 1.1, cheatW, cheatH, CARD_PURPLE_BG, ACCENT_PURPLE);
slide.addText("Пам'ять (Volatility 3)", { x: 7.05, y: 1.15, w: cheatW - 0.4, h: 0.35, fontSize: 14, bold: true, color: ACCENT_PURPLE });
slide.addText(
  "vol -f mem.raw windows.pslist\n" +
  "vol -f mem.raw windows.pstree\n" +
  "vol -f mem.raw windows.netscan\n" +
  "vol -f mem.raw windows.cmdline\n" +
  "vol -f mem.raw windows.filescan\n" +
  "vol -f mem.raw windows.malfind", {
  x: 7.05, y: 1.55, w: cheatW - 0.4, h: 2.2, fontSize: 10, fontFace: "Consolas", color: SECONDARY, lineSpacingMultiple: 1.35,
});

// Network
addCard(slide, 0.7, 4.15, cheatW, cheatH, CARD_GREEN_BG, SECONDARY);
slide.addText("Мережа", { x: 0.9, y: 4.2, w: cheatW - 0.4, h: 0.35, fontSize: 14, bold: true, color: SECONDARY });
slide.addText(
  'tshark -r file.pcap -Y "http"\n' +
  "tshark -r file.pcap -z io,phs\n" +
  "tshark --export-objects http,out/\n" +
  "tcpdump -r file.pcap -A\n" +
  'ngrep -I file.pcap "flag"', {
  x: 0.9, y: 4.6, w: cheatW - 0.4, h: 2.0, fontSize: 10, fontFace: "Consolas", color: SECONDARY, lineSpacingMultiple: 1.35,
});

// Stego
addCard(slide, 6.85, 4.15, cheatW, cheatH, CARD_YELLOW_BG, ACCENT_YELLOW);
slide.addText("Стеганографія", { x: 7.05, y: 4.2, w: cheatW - 0.4, h: 0.35, fontSize: 14, bold: true, color: ACCENT_YELLOW });
slide.addText(
  "steghide extract -sf img.jpg\n" +
  "zsteg -a img.png\n" +
  "stegseek img.jpg wordlist.txt\n" +
  "pngcheck -v img.png\n" +
  "# Aperi'Solve: aperisolve.com\n" +
  "# CyberChef: gchq.github.io/CyberChef", {
  x: 7.05, y: 4.6, w: cheatW - 0.4, h: 2.0, fontSize: 10, fontFace: "Consolas", color: SECONDARY, lineSpacingMultiple: 1.35,
});

// ============================================================
// SLIDE 18: Divider — Practice
// ============================================================
addDivider("💪", "Практика", "Тренувальні платформи та ресурси");

// ============================================================
// SLIDE 19: Training Platforms
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Тренувальні платформи", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

const pW = 3.85, pH = 2.6;

// picoCTF
addCard(slide, 0.7, 1.1, pW, pH, CARD_GREEN_BG, SECONDARY);
slide.addText("picoCTF", { x: 0.9, y: 1.2, w: pW - 0.4, h: 0.35, fontSize: 16, bold: true, color: SECONDARY });
slide.addText("Рівень: початковий-середній\nБезкоштовний, з підказками\nОкрема категорія Forensics\nІдеальний для старту", {
  x: 0.9, y: 1.6, w: pW - 0.4, h: 1.8, fontSize: 11, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "25CF", color: SECONDARY },
});

// CyberDefenders
addCard(slide, 0.7 + pW + 0.25, 1.1, pW, pH, CARD_BLUE_BG, PRIMARY);
slide.addText("CyberDefenders", { x: 0.9 + pW + 0.25, y: 1.2, w: pW - 0.4, h: 0.35, fontSize: 16, bold: true, color: PRIMARY });
slide.addText("Рівень: середній-просунутий\nBlue Team Labs: DFIR-кейси\nРеальні дампи пам'яті та дисків\nДетальні звіти-відповіді", {
  x: 0.9 + pW + 0.25, y: 1.6, w: pW - 0.4, h: 1.8, fontSize: 11, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "25CF", color: PRIMARY },
});

// BTLO
addCard(slide, 0.7 + 2 * (pW + 0.25), 1.1, pW, pH, CARD_PURPLE_BG, ACCENT_PURPLE);
slide.addText("BTLO", { x: 0.9 + 2 * (pW + 0.25), y: 1.2, w: pW - 0.4, h: 0.35, fontSize: 16, bold: true, color: ACCENT_PURPLE });
slide.addText("Blue Team Labs Online\nForensics + Incident Response\nБезкоштовні та PRO-завдання\nСередній-просунутий рівень", {
  x: 0.9 + 2 * (pW + 0.25), y: 1.6, w: pW - 0.4, h: 1.8, fontSize: 11, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "25CF", color: ACCENT_PURPLE },
});

// HTB
addCard(slide, 0.7, 3.95, pW, pH, CARD_RED_BG, ACCENT_RED);
slide.addText("Hack The Box", { x: 0.9, y: 4.05, w: pW - 0.4, h: 0.35, fontSize: 16, bold: true, color: ACCENT_RED });
slide.addText("Forensics Challenges + Sherlocks\nРеалістичні DFIR-сценарії\nАктивна спільнота\nСередній-експерт рівень", {
  x: 0.9, y: 4.45, w: pW - 0.4, h: 1.8, fontSize: 11, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "25CF", color: ACCENT_RED },
});

// SANS NetWars
addCard(slide, 0.7 + pW + 0.25, 3.95, pW, pH, CARD_YELLOW_BG, ACCENT_YELLOW);
slide.addText("SANS NetWars", { x: 0.9 + pW + 0.25, y: 4.05, w: pW - 0.4, h: 0.35, fontSize: 16, bold: true, color: ACCENT_YELLOW });
slide.addText("DFIR NetWars Tournament\nПрофесійна підготовка\nКомерційний, але є гранти\nПросунутий рівень", {
  x: 0.9 + pW + 0.25, y: 4.45, w: pW - 0.4, h: 1.8, fontSize: 11, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "25CF", color: ACCENT_YELLOW },
});

// Other resources
addCard(slide, 0.7 + 2 * (pW + 0.25), 3.95, pW, pH, CARD_BLUE_BG, PRIMARY);
slide.addText("Інші ресурси", { x: 0.9 + 2 * (pW + 0.25), y: 4.05, w: pW - 0.4, h: 0.35, fontSize: 16, bold: true, color: PRIMARY });
slide.addText("MemLabs — Volatility практика\nDFRWS — форензичні челенджі\nCTFtime.org — розклад CTF\nroot-me.org — форензика", {
  x: 0.9 + 2 * (pW + 0.25), y: 4.45, w: pW - 0.4, h: 1.8, fontSize: 11, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "25CF", color: PRIMARY },
});

// ============================================================
// SLIDE 20: Resources
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Ресурси для поглиблення", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

// Books
addCard(slide, 0.7, 1.1, halfW, 2.8, CARD_BLUE_BG, PRIMARY);
slide.addText("Книги", { x: 0.9, y: 1.2, w: halfW - 0.4, h: 0.35, fontSize: 16, bold: true, color: PRIMARY });
slide.addText(
  '"The Art of Memory Forensics" — M. Ligh et al.\n' +
  '"File System Forensic Analysis" — B. Carrier\n' +
  '"Network Forensics" — S. Davidoff, J. Ham\n' +
  '"Practical Malware Analysis" — M. Sikorski\n' +
  '"Digital Forensics with Kali Linux" — S. Parasram', {
  x: 0.9, y: 1.6, w: halfW - 0.4, h: 2.0, fontSize: 11, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "25CF", color: PRIMARY },
});

// Certifications
const certRows = [
  [
    { text: "Сертифікація", options: { bold: true, color: PRIMARY, fill: { color: "0f2a3d" }, fontSize: 12 } },
    { text: "Фокус", options: { bold: true, color: PRIMARY, fill: { color: "0f2a3d" }, fontSize: 12 } },
  ],
  [{ text: "GCFE (GIAC)", options: { bold: true, color: TEXT, fontSize: 11 } }, { text: "Windows Forensics", options: { color: TEXT, fontSize: 11 } }],
  [{ text: "GCFA (GIAC)", options: { bold: true, color: TEXT, fontSize: 11 } }, { text: "Advanced Forensics", options: { color: TEXT, fontSize: 11 } }],
  [{ text: "CHFI (EC-Council)", options: { bold: true, color: TEXT, fontSize: 11 } }, { text: "Hacking Forensic Investigator", options: { color: TEXT, fontSize: 11 } }],
  [{ text: "CDFE (IACRB)", options: { bold: true, color: TEXT, fontSize: 11 } }, { text: "Digital Forensics Examiner", options: { color: TEXT, fontSize: 11 } }],
];

slide.addTable(certRows, {
  x: 0.7, y: 4.15, w: halfW,
  border: { type: "solid", pt: 1, color: LINE },
  colW: [2.5, 3.4],
  rowH: [0.36, 0.34, 0.34, 0.34, 0.34],
  fill: { color: BG },
  margin: [3, 6, 3, 6],
});

// YouTube
addCard(slide, 6.85, 1.1, halfW, 2.8, CARD_GREEN_BG, SECONDARY);
slide.addText("YouTube-канали", { x: 7.05, y: 1.2, w: halfW - 0.4, h: 0.35, fontSize: 16, bold: true, color: SECONDARY });
slide.addText(
  "13Cubed — DFIR, Volatility, Autopsy\n" +
  "DFIR Science — наукові методи форензики\n" +
  "John Hammond — CTF write-ups, форензика\n" +
  "NetworkChuck — Wireshark, мережі\n" +
  "IppSec — HTB walkthroughs", {
  x: 7.05, y: 1.6, w: halfW - 0.4, h: 2.0, fontSize: 11, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "25CF", color: SECONDARY },
});

// Blogs
addCard(slide, 6.85, 4.15, halfW, 2.5, CARD_YELLOW_BG, ACCENT_YELLOW);
slide.addText("Блоги та спільноти", { x: 7.05, y: 4.25, w: halfW - 0.4, h: 0.35, fontSize: 16, bold: true, color: ACCENT_YELLOW });
slide.addText(
  "SANS DFIR Blog — dfir.sans.org\n" +
  "This Week in 4n6 — щотижневий дайджест\n" +
  "AboutDFIR.com — каталог інструментів\n" +
  "ForensicFocus — спільнота форензиків\n" +
  "r/digitalforensics — Reddit", {
  x: 7.05, y: 4.65, w: halfW - 0.4, h: 1.8, fontSize: 11, color: TEXT, lineSpacingMultiple: 1.5,
  bullet: { code: "25CF", color: ACCENT_YELLOW },
});

// ============================================================
// SLIDE 21: Summary
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Підсумки", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

const summaryItems = [
  "file + strings + exiftool — перші три команди для будь-якого завдання",
  "Volatility 3 — стандарт аналізу пам'яті, знати ключові плагіни",
  "Wireshark + tshark — мережевий аналіз з правильними фільтрами",
  "Стеганографія — перевіряти LSB, метадані, аудіо-спектрограми",
  "Windows Event IDs — знати ключові коди (4624, 4688, 7045)",
  "Таймлайн — Plaso/log2timeline для відтворення хронології",
  "CyberChef — універсальний інструмент декодування",
  "Практика — picoCTF, CyberDefenders, HTB для тренування",
];

summaryItems.forEach((item, i) => {
  slide.addText([
    { text: "✓  ", options: { bold: true, color: SECONDARY, fontSize: 14 } },
    { text: item, options: { color: TEXT, fontSize: 13 } },
  ], { x: i < 4 ? 0.7 : 6.85, y: 1.1 + (i % 4) * 0.75, w: 5.9, h: 0.6, valign: "middle" });
});

// Three stat boxes at bottom
addStatBox(slide, 0.7, 4.4, 3.85, "Систематичність", "Методологія > хаотичний пошук", SECONDARY, CARD_GREEN_BG, SECONDARY);
addStatBox(slide, 4.8, 4.4, 3.85, "Різноманітність", "Кілька інструментів > один", PRIMARY, CARD_BLUE_BG, PRIMARY);
addStatBox(slide, 8.9, 4.4, 3.85, "Регулярність", "Постійна практика = зростання", ACCENT_PURPLE, CARD_PURPLE_BG, ACCENT_PURPLE);

// ============================================================
// SLIDE 22: Thank you
// ============================================================
slide = pres.addSlide({ masterName: "DIVIDER" });
slide.addText("Дякую за увагу!", {
  x: 1, y: 2.0, w: 11.33, h: 1.5, align: "center", fontSize: 44, bold: true, color: PRIMARY,
});
slide.addText("Черепов О.  •  Кафедра ТЕІБ, УжНУ", {
  x: 1, y: 3.8, w: 11.33, h: 0.6, align: "center", fontSize: 18, color: TEXT,
});
slide.addText("Запитання?", {
  x: 1, y: 4.8, w: 11.33, h: 0.6, align: "center", fontSize: 16, color: MUTED,
});

// ============================================================
// Write file
// ============================================================
pres.writeFile({ fileName: "C:/Users/Alex/Desktop/Аспірант/Лекції_ОЕХ/presentation/forensics.pptx" })
  .then(() => console.log("OK: forensics.pptx created (22 slides)"))
  .catch(err => console.error("Error:", err));
