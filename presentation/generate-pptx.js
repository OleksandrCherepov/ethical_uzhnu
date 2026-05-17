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

// Card backgrounds (semi-transparent approximation on dark bg)
const CARD_BLUE_BG = "0f2a3d";
const CARD_GREEN_BG = "0f2d1f";
const CARD_RED_BG = "2d1515";
const CARD_YELLOW_BG = "2d2510";
const CARD_PURPLE_BG = "1f1a2d";

pres.author = "Черепов О.";
pres.title = "Практико-орієнтована модель підготовки спеціалістів з ІБ";
pres.subject = "Кафедра ТЕІБ, УжНУ";
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 inches

// --- Slide master definitions ---
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: BG },
  objects: [
    // Top gradient line
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

// Helper: add card box
function addCard(slide, x, y, w, h, bgColor, borderColor) {
  slide.addShape(pres.ShapeType.roundRect, {
    x, y, w, h,
    fill: { color: bgColor },
    line: { color: borderColor, width: 1.5 },
    rectRadius: 0.12,
  });
}

// Helper: add stat box
function addStatBox(slide, x, y, w, number, label, numColor = PRIMARY, bgColor = CARD_BLUE_BG, borderColor = PRIMARY) {
  addCard(slide, x, y, w, 1.1, bgColor, borderColor);
  slide.addText(number, { x, y: y + 0.1, w, h: 0.6, align: "center", fontSize: 32, bold: true, color: numColor });
  slide.addText(label, { x, y: y + 0.65, w, h: 0.4, align: "center", fontSize: 11, color: MUTED });
}

// ============================================================
// SLIDE 1: Title
// ============================================================
let slide = pres.addSlide({ masterName: "DIVIDER" });
slide.addText("Практико-орієнтована модель\nпідготовки спеціалістів\nз інформаційної безпеки", {
  x: 1, y: 1.5, w: 11.33, h: 3,
  align: "center", fontSize: 36, bold: true, color: PRIMARY, lineSpacingMultiple: 1.3,
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
  { text: "Проблема: ", options: { bold: true, color: TEXT, fontSize: 15 } },
  { text: "глобальний дефіцит кадрів\n", options: { color: TEXT, fontSize: 15 } },
  { text: "Аналіз: ", options: { bold: true, color: TEXT, fontSize: 15 } },
  { text: "чому традиційна модель не працює\n", options: { color: TEXT, fontSize: 15 } },
  { text: "Фреймворки: ", options: { bold: true, color: TEXT, fontSize: 15 } },
  { text: "NICE, ECSF, ABCDE\n", options: { color: TEXT, fontSize: 15 } },
  { text: "Міжнародний досвід: ", options: { bold: true, color: TEXT, fontSize: 15 } },
  { text: "9 країн та організацій", options: { color: TEXT, fontSize: 15 } },
];
const agendaRight = [
  { text: "Інструменти: ", options: { bold: true, color: TEXT, fontSize: 15 } },
  { text: "Cyber Range, CTF, стажування\n", options: { color: TEXT, fontSize: 15 } },
  { text: "Педагогіка: ", options: { bold: true, color: TEXT, fontSize: 15 } },
  { text: "Блум, Kolb, ECAC\n", options: { color: TEXT, fontSize: 15 } },
  { text: "Архітектура: ", options: { bold: true, color: TEXT, fontSize: 15 } },
  { text: "модель 30/50/20\n", options: { color: TEXT, fontSize: 15 } },
  { text: "Висновки ", options: { bold: true, color: TEXT, fontSize: 15 } },
  { text: "та рекомендації", options: { color: TEXT, fontSize: 15 } },
];

slide.addText(agendaLeft, { x: 0.7, y: 1.3, w: 5.8, h: 3, lineSpacingMultiple: 1.8, bullet: { code: "25CF", color: PRIMARY } });
slide.addText(agendaRight, { x: 6.8, y: 1.3, w: 5.8, h: 3, lineSpacingMultiple: 1.8, bullet: { code: "25CF", color: PRIMARY } });

// ============================================================
// SLIDE 3: Divider — Problem
// ============================================================
slide = pres.addSlide({ masterName: "DIVIDER" });
slide.addText("⚠  Проблема", {
  x: 1, y: 2.2, w: 11.33, h: 1.2, align: "center", fontSize: 40, bold: true, color: PRIMARY,
});
slide.addText("Глобальний дефіцит кадрів у сфері кібербезпеки", {
  x: 1, y: 3.6, w: 11.33, h: 0.7, align: "center", fontSize: 18, color: MUTED,
});

// ============================================================
// SLIDE 4: Global deficit stats
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Масштаб проблеми (ISC2, 2025)", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

// Stat boxes row
const statW = 2.8;
const statGap = 0.25;
const statX0 = 0.7;
addStatBox(slide, statX0, 1.2, statW, "10.2M", "Глобальна потреба");
addStatBox(slide, statX0 + statW + statGap, 1.2, statW, "5.5M", "Наявна робоча сила");
addStatBox(slide, statX0 + 2 * (statW + statGap), 1.2, statW, "4.76M", "Дефіцит (+19% YoY)", ACCENT_RED, CARD_RED_BG, ACCENT_RED);
addStatBox(slide, statX0 + 3 * (statW + statGap), 1.2, statW, "88%", "Інциденти через\nдефіцит навичок", ACCENT_YELLOW, CARD_YELLOW_BG, ACCENT_YELLOW);

// Two cards below
addCard(slide, 0.7, 2.6, 5.9, 2.8, CARD_RED_BG, ACCENT_RED);
slide.addText("Нестача персоналу", { x: 1.0, y: 2.7, w: 5.3, h: 0.4, fontSize: 18, bold: true, color: ACCENT_RED });
slide.addText([
  { text: "67%", options: { bold: true } }, { text: " організацій мають нестачу кадрів\n" },
  { text: "48%", options: { bold: true } }, { text: " компаній шукають спеціаліста > 6 місяців\n" },
  { text: "Найбільший дефіцит — Азія-Тихоокеанський регіон (3.4M)" },
], { x: 1.0, y: 3.2, w: 5.3, h: 2.0, fontSize: 13, color: TEXT, lineSpacingMultiple: 1.5, bullet: { code: "25CF", color: ACCENT_RED } });

addCard(slide, 6.9, 2.6, 5.9, 2.8, CARD_YELLOW_BG, ACCENT_YELLOW);
slide.addText("Україна", { x: 7.2, y: 2.7, w: 5.3, h: 0.4, fontSize: 18, bold: true, color: ACCENT_YELLOW });
slide.addText([
  { text: "~2 000", options: { bold: true } }, { text: " випускників спец. 125 щороку\n" },
  { text: "47", options: { bold: true } }, { text: " ЗВО готують фахівців\n" },
  { text: "21", options: { bold: true } }, { text: " професійний стандарт (Держспецзв'язку)\n" },
  { text: "Ключова проблема — якість, не кількість" },
], { x: 7.2, y: 3.2, w: 5.3, h: 2.0, fontSize: 13, color: TEXT, lineSpacingMultiple: 1.5, bullet: { code: "25CF", color: ACCENT_YELLOW } });

slide.addText("Джерело: ISC2 Cybersecurity Workforce Study 2025, Fortinet Skills Gap Report 2025", {
  x: 0.7, y: 6.8, w: 12, h: 0.4, fontSize: 10, color: MUTED,
});

// ============================================================
// SLIDE 5: Divider — Traditional model
// ============================================================
slide = pres.addSlide({ masterName: "DIVIDER" });
slide.addText("🎓  Традиційна модель", {
  x: 1, y: 2.2, w: 11.33, h: 1.2, align: "center", fontSize: 40, bold: true, color: PRIMARY,
});
slide.addText("Чому лекційно-семінарська форма не працює", {
  x: 1, y: 3.6, w: 11.33, h: 0.7, align: "center", fontSize: 18, color: MUTED,
});

// ============================================================
// SLIDE 6: Bloom's taxonomy
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Таксономія Блума: розрив між освітою та практикою", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 26, bold: true, color: PRIMARY });

const bloomRows = [
  [
    { text: "Рівень", options: { bold: true, color: PRIMARY, fill: { color: "0f2a3d" }, fontSize: 13 } },
    { text: "Традиційний формат", options: { bold: true, color: PRIMARY, fill: { color: "0f2a3d" }, fontSize: 13 } },
    { text: "Практико-орієнтований", options: { bold: true, color: PRIMARY, fill: { color: "0f2a3d" }, fontSize: 13 } },
  ],
  [
    { text: "Запам'ятовування", options: { bold: true, color: TEXT, fontSize: 13 } },
    { text: "Лекції, підручники", options: { color: TEXT, fontSize: 13 } },
    { text: "Лекції + інтерактивні демо", options: { color: TEXT, fontSize: 13 } },
  ],
  [
    { text: "Розуміння", options: { bold: true, color: TEXT, fontSize: 13 } },
    { text: "Семінари", options: { color: TEXT, fontSize: 13 } },
    { text: "Розбір реальних інцидентів", options: { color: TEXT, fontSize: 13 } },
  ],
  [
    { text: "Застосування", options: { bold: true, color: TEXT, fontSize: 13 } },
    { text: "Стандартні лабораторні", options: { color: TEXT, fontSize: 13 } },
    { text: "CTF, Cyber Range, віртуальні лаби", options: { color: TEXT, fontSize: 13 } },
  ],
  [
    { text: "Аналіз", options: { bold: true, color: TEXT, fontSize: 13 } },
    { text: "Курсові роботи", options: { color: TEXT, fontSize: 13 } },
    { text: "Форензика, аналіз малварі", options: { color: TEXT, fontSize: 13 } },
  ],
  [
    { text: "Оцінювання", options: { bold: true, color: TEXT, fontSize: 13 } },
    { text: "Іспити, тести", options: { color: TEXT, fontSize: 13 } },
    { text: "Аудит безпеки реальних систем", options: { color: TEXT, fontSize: 13 } },
  ],
  [
    { text: "Створення", options: { bold: true, color: TEXT, fontSize: 13 } },
    { text: "Дипломна робота", options: { color: TEXT, fontSize: 13 } },
    { text: "Пентест-звіти, захисні рішення", options: { color: TEXT, fontSize: 13 } },
  ],
];

slide.addTable(bloomRows, {
  x: 0.7, y: 1.2, w: 11.9,
  border: { type: "solid", pt: 1, color: LINE },
  colW: [3.5, 4.2, 4.2],
  rowH: [0.45, 0.42, 0.42, 0.42, 0.42, 0.42, 0.42],
  fill: { color: BG },
  margin: [5, 8, 5, 8],
});

slide.addText([
  { text: "«Традиційне навчання охоплює переважно 2 нижні рівні, тоді як професійна діяльність вимагає вищих рівнів когнітивної діяльності.»", options: { italic: true, color: TEXT, fontSize: 13 } },
  { text: "\n— IEEE, Optimizing Cyber Security Education, 2020", options: { color: MUTED, fontSize: 11 } },
], { x: 0.7, y: 5.0, w: 11.9, h: 1.2, valign: "top" });

// ============================================================
// SLIDE 7: Divider — Frameworks
// ============================================================
slide = pres.addSlide({ masterName: "DIVIDER" });
slide.addText("🔷  Фреймворки компетенцій", {
  x: 1, y: 2.2, w: 11.33, h: 1.2, align: "center", fontSize: 40, bold: true, color: PRIMARY,
});
slide.addText("NICE, ECSF, ABCDE — спільна мова освіти та індустрії", {
  x: 1, y: 3.6, w: 11.33, h: 0.7, align: "center", fontSize: 18, color: MUTED,
});

// ============================================================
// SLIDE 8: NICE + ECSF + ABCDE
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Міжнародні рамкові моделі", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

const cardW = 3.85;
const cardH = 4.5;
const cardY = 1.2;

// NICE
addCard(slide, 0.7, cardY, cardW, cardH, CARD_BLUE_BG, PRIMARY);
slide.addText("NICE Framework", { x: 0.9, y: cardY + 0.1, w: cardW - 0.4, h: 0.4, fontSize: 18, bold: true, color: PRIMARY });
slide.addText("NIST SP 800-181 Rev.1", { x: 0.9, y: cardY + 0.5, w: cardW - 0.4, h: 0.3, fontSize: 12, bold: true, color: TEXT });
slide.addText("7 категорій, 52 робочі ролі\nTasks, Knowledge, Skills\nОснова для NSA CAE, SANS, ISC2\nNICE Challenge Project — віртуалізовані задачі", {
  x: 0.9, y: cardY + 0.9, w: cardW - 0.4, h: 3.2, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.6,
  bullet: { code: "25CF", color: PRIMARY },
});

// ECSF
addCard(slide, 0.7 + cardW + 0.25, cardY, cardW, cardH, CARD_GREEN_BG, SECONDARY);
slide.addText("ECSF (ENISA)", { x: 0.9 + cardW + 0.25, y: cardY + 0.1, w: cardW - 0.4, h: 0.4, fontSize: 18, bold: true, color: SECONDARY });
slide.addText("European Cybersecurity Skills Framework", { x: 0.9 + cardW + 0.25, y: cardY + 0.5, w: cardW - 0.4, h: 0.3, fontSize: 11, bold: true, color: TEXT });
slide.addText("12 професійних ролей\nWorkplace-driven + Learning-driven\nГармонізація освіти по ЄС\nРелевантний для євроінтеграції України", {
  x: 0.9 + cardW + 0.25, y: cardY + 0.9, w: cardW - 0.4, h: 3.2, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.6,
  bullet: { code: "25CF", color: SECONDARY },
});

// ABCDE
addCard(slide, 0.7 + 2 * (cardW + 0.25), cardY, cardW, cardH, CARD_PURPLE_BG, ACCENT_PURPLE);
slide.addText("ABCDE (ACM)", { x: 0.9 + 2 * (cardW + 0.25), y: cardY + 0.1, w: cardW - 0.4, h: 0.4, fontSize: 18, bold: true, color: ACCENT_PURPLE });
slide.addText("Competency Model, 2023", { x: 0.9 + 2 * (cardW + 0.25), y: cardY + 0.5, w: cardW - 0.4, h: 0.3, fontSize: 12, bold: true, color: TEXT });
slide.addText("A — Actor (ролі)\nB — Behaviour (задачі)\nC — Context (середовище)\nD — Degree (складність)\nE — Employability (готовність)", {
  x: 0.9 + 2 * (cardW + 0.25), y: cardY + 0.9, w: cardW - 0.4, h: 3.2, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.6,
  bullet: { code: "25CF", color: ACCENT_PURPLE },
});

// ============================================================
// SLIDE 9: Divider — International
// ============================================================
slide = pres.addSlide({ masterName: "DIVIDER" });
slide.addText("🌐  Міжнародний досвід", {
  x: 1, y: 2.2, w: 11.33, h: 1.2, align: "center", fontSize: 40, bold: true, color: PRIMARY,
});
slide.addText("Практики 9 країн та організацій", {
  x: 1, y: 3.6, w: 11.33, h: 0.7, align: "center", fontSize: 18, color: MUTED,
});

// ============================================================
// SLIDE 10: USA + Israel
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("США та Ізраїль", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

const halfW = 5.9;

// USA card
addCard(slide, 0.7, 1.2, halfW, 4.5, CARD_BLUE_BG, PRIMARY);
slide.addText("🇺🇸  США", { x: 0.9, y: 1.3, w: halfW - 0.4, h: 0.5, fontSize: 20, bold: true, color: PRIMARY });
slide.addText("NCAE-C: 429 акредитованих ЗВО (NSA)\nCyberCorps SFS: стипендія за держслужбу\nSANS CyberStart: гейміфіковане навчання\nМодель: освіта + сертифікація + служба", {
  x: 0.9, y: 1.9, w: halfW - 0.4, h: 3.5, fontSize: 13, color: TEXT, lineSpacingMultiple: 1.7,
  bullet: { code: "25CF", color: PRIMARY },
});

// Israel card
addCard(slide, 6.85, 1.2, halfW, 4.5, CARD_YELLOW_BG, ACCENT_YELLOW);
slide.addText("🇮🇱  Ізраїль", { x: 7.05, y: 1.3, w: halfW - 0.4, h: 0.5, fontSize: 20, bold: true, color: ACCENT_YELLOW });
slide.addText("Unit 8200: відбір з 16 років (математика, криптографія)\nРеальні кібероперації з 18 років\n90% high-tech сектору — з армії\n1/3 CTO кіберстартапів — з Unit 8200\nМодель: рання ідентифікація + бойовий досвід", {
  x: 7.05, y: 1.9, w: halfW - 0.4, h: 3.5, fontSize: 13, color: TEXT, lineSpacingMultiple: 1.6,
  bullet: { code: "25CF", color: ACCENT_YELLOW },
});

// ============================================================
// SLIDE 11: UK + Estonia
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Великобританія та Естонія", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

addCard(slide, 0.7, 1.2, halfW, 4.5, CARD_RED_BG, ACCENT_RED);
slide.addText("🇬🇧  Великобританія — CyberFirst", { x: 0.9, y: 1.3, w: halfW - 0.4, h: 0.5, fontSize: 18, bold: true, color: ACCENT_RED });
slide.addText("260 000 студентів у 2 500 школах (з 2016)\nСтипендія £4 000/рік за бакалаврат\nЛітня академія (1-й рік) + стажування (2-й рік)\n180+ індустріальних партнерів + GCHQ", {
  x: 0.9, y: 1.9, w: halfW - 0.4, h: 3.5, fontSize: 13, color: TEXT, lineSpacingMultiple: 1.7,
  bullet: { code: "25CF", color: ACCENT_RED },
});

addCard(slide, 6.85, 1.2, halfW, 4.5, CARD_GREEN_BG, SECONDARY);
slide.addText("🇪🇪  Естонія — від дитсадка до НАТО", { x: 7.05, y: 1.3, w: halfW - 0.4, h: 0.5, fontSize: 18, bold: true, color: SECONDARY });
slide.addText("Мета: 10 000 кіберталантів за 10 років\nCR14: кіберполігон (NATO Innovation Award)\nCCDCOE (Tallinn): 39 країн, координація навчань\nLocked Shields: 38 країн, 5 500 систем, live-fire", {
  x: 7.05, y: 1.9, w: halfW - 0.4, h: 3.5, fontSize: 13, color: TEXT, lineSpacingMultiple: 1.7,
  bullet: { code: "25CF", color: SECONDARY },
});

// ============================================================
// SLIDE 12: Singapore + Others
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Сінгапур, Південна Корея, Австралія, ЄС", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 26, bold: true, color: PRIMARY });

const qW = 5.9;
const qH = 2.6;

// Singapore
addCard(slide, 0.7, 1.15, qW, qH, CARD_PURPLE_BG, ACCENT_PURPLE);
slide.addText("🇸🇬  Сінгапур (CSA)", { x: 0.9, y: 1.2, w: qW - 0.4, h: 0.4, fontSize: 16, bold: true, color: ACCENT_PURPLE });
slide.addText("$50M — план Cyber TIG на 3 роки\nSG Cyber Associates — навчання не-кіберспеціалістів\n10 000 місць ISC2 сертифікації", {
  x: 0.9, y: 1.7, w: qW - 0.4, h: 1.8, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.6,
  bullet: { code: "25CF", color: ACCENT_PURPLE },
});

// South Korea
addCard(slide, 6.85, 1.15, qW, qH, CARD_YELLOW_BG, ACCENT_YELLOW);
slide.addText("🇰🇷  Південна Корея (KISA)", { x: 7.05, y: 1.2, w: qW - 0.4, h: 0.4, fontSize: 16, bold: true, color: ACCENT_YELLOW });
slide.addText("K-Shield — підготовка топових кіберексперків\nКейс-орієнтоване навчання (MOU з ISC2)", {
  x: 7.05, y: 1.7, w: qW - 0.4, h: 1.8, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.6,
  bullet: { code: "25CF", color: ACCENT_YELLOW },
});

// Australia
addCard(slide, 0.7, 4.0, qW, qH, CARD_BLUE_BG, PRIMARY);
slide.addText("🇦🇺  Австралія (ASD)", { x: 0.9, y: 4.05, w: qW - 0.4, h: 0.4, fontSize: 16, bold: true, color: PRIMARY });
slide.addText("ASD Cyber Skills Framework\nCyberEXP — інтерактивні симуляції\n200 партнерів у Joint Cyber Centres", {
  x: 0.9, y: 4.55, w: qW - 0.4, h: 1.8, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.6,
  bullet: { code: "25CF", color: PRIMARY },
});

// EU
addCard(slide, 6.85, 4.0, qW, qH, CARD_GREEN_BG, SECONDARY);
slide.addText("🇪🇺  ЄС — ECSC (ENISA)", { x: 7.05, y: 4.05, w: qW - 0.4, h: 0.4, fontSize: 16, bold: true, color: SECONDARY });
slide.addText("CTF для молоді 14–25 років\nНавички → 80% вакансій з кібербезпеки\nInternational Cybersecurity Challenge", {
  x: 7.05, y: 4.55, w: qW - 0.4, h: 1.8, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.6,
  bullet: { code: "25CF", color: SECONDARY },
});

// ============================================================
// SLIDE 13: International lessons
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Ключові уроки міжнародного досвіду", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

const lessons = [
  ["🎯", "Рання ідентифікація", "більшість починають зі школи", SECONDARY],
  ["💰", "Державне фінансування", "є критичним фактором успіху", ACCENT_YELLOW],
  ["🤝", "Партнерство з індустрією", "стажування обов'язкові", PRIMARY],
  ["📚", "Стандартизація", "через фреймворки (NICE, ECSF)", ACCENT_PURPLE],
  ["🏆", "Змагальний елемент", "CTF як мотиватор та відбір", ACCENT_RED],
  ["🔄", "Наскрізність", "від школи до професійного розвитку", SECONDARY],
];

lessons.forEach((item, i) => {
  const lY = 1.3 + i * 0.85;
  slide.addText(`${item[0]}  `, { x: 0.7, y: lY, w: 0.6, h: 0.6, fontSize: 20, valign: "middle" });
  slide.addText([
    { text: item[1], options: { bold: true, color: item[3], fontSize: 16 } },
    { text: ` — ${item[2]}`, options: { color: TEXT, fontSize: 15 } },
  ], { x: 1.4, y: lY, w: 11, h: 0.6, valign: "middle" });
});

// ============================================================
// SLIDE 14: Divider — Tools
// ============================================================
slide = pres.addSlide({ masterName: "DIVIDER" });
slide.addText("🧰  Інструменти моделі", {
  x: 1, y: 2.2, w: 11.33, h: 1.2, align: "center", fontSize: 40, bold: true, color: PRIMARY,
});
slide.addText("Cyber Range, CTF, проєктне навчання, сертифікація", {
  x: 1, y: 3.6, w: 11.33, h: 0.7, align: "center", fontSize: 18, color: MUTED,
});

// ============================================================
// SLIDE 15: Cyber Range + CTF
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Кіберполігони та CTF-змагання", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

addCard(slide, 0.7, 1.2, halfW, 5.0, CARD_BLUE_BG, PRIMARY);
slide.addText("🖥  Cyber Range", { x: 0.9, y: 1.3, w: halfW - 0.4, h: 0.5, fontSize: 18, bold: true, color: PRIMARY });
slide.addText("Віртуалізоване середовище реальної інфраструктури\nRed Team / Blue Team сценарії\nМасштабованість та відтворюваність\nПлатформи: TryHackMe, Hack The Box, CybExer", {
  x: 0.9, y: 1.9, w: halfW - 0.4, h: 2.5, fontSize: 13, color: TEXT, lineSpacingMultiple: 1.7,
  bullet: { code: "25CF", color: PRIMARY },
});
slide.addText([
  { text: "«Ефективні на всіх рівнях освіти — від школи до магістратури»", options: { italic: true, color: TEXT, fontSize: 12 } },
  { text: "\n— Springer, 2025", options: { color: MUTED, fontSize: 10 } },
], { x: 0.9, y: 4.7, w: halfW - 0.4, h: 0.9 });

addCard(slide, 6.85, 1.2, halfW, 5.0, CARD_GREEN_BG, SECONDARY);
slide.addText("🏁  CTF (Capture The Flag)", { x: 7.05, y: 1.3, w: halfW - 0.4, h: 0.5, fontSize: 18, bold: true, color: SECONDARY });
slide.addText("Підвищують мотивацію більше ніж традиційні вправи\nЗбільшують впевненість та практичні навички\nStorytelling-інтеграція покращує результати", {
  x: 7.05, y: 1.9, w: halfW - 0.4, h: 2.0, fontSize: 13, color: TEXT, lineSpacingMultiple: 1.7,
  bullet: { code: "25CF", color: SECONDARY },
});

// Warning subcard
addCard(slide, 7.05, 4.1, halfW - 0.4, 1.3, CARD_YELLOW_BG, ACCENT_YELLOW);
slide.addText([
  { text: "⚠ Обмеження: ", options: { bold: true, color: ACCENT_YELLOW, fontSize: 12 } },
  { text: "CTF не замінюють глибокого теоретичного навчання — потрібна інтеграція обох підходів", options: { color: TEXT, fontSize: 12 } },
], { x: 7.25, y: 4.2, w: halfW - 0.8, h: 1.0, valign: "middle" });

slide.addText("Джерело: Schafeitel-Tähtinen et al., Wiley 2025 (Фінляндія vs Чехія)", {
  x: 0.7, y: 6.8, w: 12, h: 0.4, fontSize: 10, color: MUTED,
});

// ============================================================
// SLIDE 16: Internships + Certifications
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Стажування та сертифікація", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

// Left: Professional integration
slide.addText("💼  Професійна інтеграція", { x: 0.7, y: 1.2, w: halfW, h: 0.5, fontSize: 18, bold: true, color: PRIMARY });
slide.addText("Студентські кібербригади (КУБГ) — робота на об'єктах КІ\nre/start in cyber (Мінцифри) — безкоштовне навчання\nBug Bounty — легальний пошук вразливостей\nSOC-стажування — Security Operations Center", {
  x: 0.7, y: 1.8, w: halfW, h: 3.5, fontSize: 13, color: TEXT, lineSpacingMultiple: 1.8,
  bullet: { code: "25CF", color: PRIMARY },
});

// Right: Certifications table
slide.addText("📜  Сертифікації у навчальному плані", { x: 6.85, y: 1.2, w: halfW, h: 0.5, fontSize: 18, bold: true, color: SECONDARY });

const certRows = [
  [
    { text: "Сертифікація", options: { bold: true, color: PRIMARY, fill: { color: "0f2a3d" }, fontSize: 13 } },
    { text: "Рівень", options: { bold: true, color: PRIMARY, fill: { color: "0f2a3d" }, fontSize: 13 } },
    { text: "Практика", options: { bold: true, color: PRIMARY, fill: { color: "0f2a3d" }, fontSize: 13 } },
  ],
  [
    { text: "CompTIA Security+", options: { color: TEXT, fontSize: 12 } },
    { text: "Базовий", options: { color: SECONDARY, fontSize: 12 } },
    { text: "Теоретичний іспит", options: { color: TEXT, fontSize: 12 } },
  ],
  [
    { text: "CEH", options: { color: TEXT, fontSize: 12 } },
    { text: "Середній", options: { color: ACCENT_YELLOW, fontSize: 12 } },
    { text: "Практичний іспит", options: { color: TEXT, fontSize: 12 } },
  ],
  [
    { text: "OSCP", options: { color: TEXT, fontSize: 12 } },
    { text: "Просунутий", options: { color: ACCENT_RED, fontSize: 12 } },
    { text: "24-год практика", options: { color: TEXT, fontSize: 12 } },
  ],
  [
    { text: "BTL1", options: { color: TEXT, fontSize: 12 } },
    { text: "Середній", options: { color: ACCENT_YELLOW, fontSize: 12 } },
    { text: "Практичний іспит", options: { color: TEXT, fontSize: 12 } },
  ],
];

slide.addTable(certRows, {
  x: 6.85, y: 1.85, w: halfW,
  border: { type: "solid", pt: 1, color: LINE },
  colW: [2.2, 1.6, 2.1],
  rowH: [0.4, 0.38, 0.38, 0.38, 0.38],
  fill: { color: BG },
  margin: [4, 6, 4, 6],
});

// ============================================================
// SLIDE 17: Divider — Architecture
// ============================================================
slide = pres.addSlide({ masterName: "DIVIDER" });
slide.addText("📦  Архітектура моделі", {
  x: 1, y: 2.2, w: 11.33, h: 1.2, align: "center", fontSize: 40, bold: true, color: PRIMARY,
});
slide.addText("Триблокова структура 30 / 50 / 20", {
  x: 1, y: 3.6, w: 11.33, h: 0.7, align: "center", fontSize: 18, color: MUTED,
});

// ============================================================
// SLIDE 18: Model architecture
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Запропонована архітектура", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

const thirdW = 3.85;

// Theory
addCard(slide, 0.7, 1.1, thirdW, 4.0, CARD_BLUE_BG, PRIMARY);
slide.addText("Теоретичне ядро", { x: 0.7, y: 1.2, w: thirdW, h: 0.4, align: "center", fontSize: 18, bold: true, color: PRIMARY });
slide.addText("30%", { x: 0.7, y: 1.65, w: thirdW, h: 0.6, align: "center", fontSize: 28, bold: true, color: PRIMARY });
slide.addText("Криптографія\nМережеві технології\nБезпека ОС\nПравові аспекти\nСтандарти (OWASP, NIST)", {
  x: 0.9, y: 2.35, w: thirdW - 0.4, h: 2.5, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.6,
  bullet: { code: "25CF", color: PRIMARY },
});

// Practice
addCard(slide, 0.7 + thirdW + 0.25, 1.1, thirdW, 4.0, CARD_GREEN_BG, SECONDARY);
slide.addText("Практичне ядро", { x: 0.7 + thirdW + 0.25, y: 1.2, w: thirdW, h: 0.4, align: "center", fontSize: 18, bold: true, color: SECONDARY });
slide.addText("50%", { x: 0.7 + thirdW + 0.25, y: 1.65, w: thirdW, h: 0.6, align: "center", fontSize: 28, bold: true, color: SECONDARY });
slide.addText("Cyber Range\nCTF-змагання\nRed/Blue Team\nЦифрова форензика\nПентест-проєкти", {
  x: 0.9 + thirdW + 0.25, y: 2.35, w: thirdW - 0.4, h: 2.5, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.6,
  bullet: { code: "25CF", color: SECONDARY },
});

// Professional integration
addCard(slide, 0.7 + 2 * (thirdW + 0.25), 1.1, thirdW, 4.0, CARD_PURPLE_BG, ACCENT_PURPLE);
slide.addText("Професійна інтеграція", { x: 0.7 + 2 * (thirdW + 0.25), y: 1.2, w: thirdW, h: 0.4, align: "center", fontSize: 18, bold: true, color: ACCENT_PURPLE });
slide.addText("20%", { x: 0.7 + 2 * (thirdW + 0.25), y: 1.65, w: thirdW, h: 0.6, align: "center", fontSize: 28, bold: true, color: ACCENT_PURPLE });
slide.addText("Стажування на КІ\nКібербригади\nСертифікація\nBug Bounty\nМенторство", {
  x: 0.9 + 2 * (thirdW + 0.25), y: 2.35, w: thirdW - 0.4, h: 2.5, fontSize: 12, color: TEXT, lineSpacingMultiple: 1.6,
  bullet: { code: "25CF", color: ACCENT_PURPLE },
});

// Flow row at bottom
const flowStepW = 3.2;
const flowY = 5.4;
const flowH = 0.8;

addCard(slide, 1.0, flowY, flowStepW, flowH, CARD_BLUE_BG, PRIMARY);
slide.addText("Фреймворки\nNICE / ECSF", { x: 1.0, y: flowY, w: flowStepW, h: flowH, align: "center", fontSize: 12, bold: true, color: TEXT, lineSpacingMultiple: 1.2 });

slide.addText("⟷", { x: 1.0 + flowStepW, y: flowY, w: 0.7, h: flowH, align: "center", fontSize: 18, color: PRIMARY });

addCard(slide, 1.0 + flowStepW + 0.7, flowY, flowStepW, flowH, CARD_BLUE_BG, PRIMARY);
slide.addText("Таксономія Блума\nKolb / ECAC", { x: 1.0 + flowStepW + 0.7, y: flowY, w: flowStepW, h: flowH, align: "center", fontSize: 12, bold: true, color: TEXT, lineSpacingMultiple: 1.2 });

slide.addText("⟷", { x: 1.0 + 2 * flowStepW + 0.7, y: flowY, w: 0.7, h: flowH, align: "center", fontSize: 18, color: PRIMARY });

addCard(slide, 1.0 + 2 * (flowStepW + 0.7), flowY, flowStepW, flowH, CARD_BLUE_BG, PRIMARY);
slide.addText("Індустрія\nРоботодавці + Держава", { x: 1.0 + 2 * (flowStepW + 0.7), y: flowY, w: flowStepW, h: flowH, align: "center", fontSize: 12, bold: true, color: TEXT, lineSpacingMultiple: 1.2 });

// ============================================================
// SLIDE 19: Semesters
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Розподіл за семестрами", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

const semW = 2.95;
const semH = 5.0;
const semY = 1.1;

const semesters = [
  { title: "1–2 семестр", subtitle: "Фундамент", items: "Мережі, ОС, програмування\nВведення у кібербезпеку", ratio: "60% теорія / 40% практика", bg: CARD_BLUE_BG, border: PRIMARY, color: PRIMARY, ratioT: "60%", ratioP: "40%" },
  { title: "3–4 семестр", subtitle: "Спеціалізація", items: "Криптографія, веб-безпека\nCTF, віртуальні лаби\nCompTIA Security+", ratio: "40% / 60%", bg: CARD_GREEN_BG, border: SECONDARY, color: SECONDARY, ratioT: "40%", ratioP: "60%" },
  { title: "5–6 семестр", subtitle: "Поглиблення", items: "Пентест, форензика\nCyber Range, проєкти\nCEH / OSCP", ratio: "20% / 80%", bg: CARD_PURPLE_BG, border: ACCENT_PURPLE, color: ACCENT_PURPLE, ratioT: "20%", ratioP: "80%" },
  { title: "7–8 семестр", subtitle: "Інтеграція", items: "Стажування (SOC, КІ)\nДипломний пентест\nКібербригади", ratio: "100% практика", bg: CARD_YELLOW_BG, border: ACCENT_YELLOW, color: ACCENT_YELLOW, ratioT: "", ratioP: "100%" },
];

semesters.forEach((s, i) => {
  const sx = 0.7 + i * (semW + 0.2);
  addCard(slide, sx, semY, semW, semH, s.bg, s.border);
  slide.addText(s.title, { x: sx, y: semY + 0.1, w: semW, h: 0.4, align: "center", fontSize: 16, bold: true, color: s.color });
  slide.addText(s.subtitle, { x: sx, y: semY + 0.5, w: semW, h: 0.35, align: "center", fontSize: 13, bold: true, color: TEXT });
  slide.addText(s.items, {
    x: sx + 0.15, y: semY + 1.0, w: semW - 0.3, h: 2.5, fontSize: 11, color: TEXT, lineSpacingMultiple: 1.6,
    bullet: { code: "25CF", color: s.border },
  });
  // Ratio at bottom
  const ratioText = i < 3
    ? [
        { text: s.ratioT, options: { bold: true, color: PRIMARY, fontSize: 13 } },
        { text: " теорія / ", options: { color: TEXT, fontSize: 12 } },
        { text: s.ratioP, options: { bold: true, color: SECONDARY, fontSize: 13 } },
        { text: " практика", options: { color: TEXT, fontSize: 12 } },
      ]
    : [{ text: "100%", options: { bold: true, color: SECONDARY, fontSize: 13 } }, { text: " практика", options: { color: TEXT, fontSize: 12 } }];
  slide.addText(ratioText, { x: sx, y: semY + semH - 0.7, w: semW, h: 0.5, align: "center" });
});

// ============================================================
// SLIDE 20: Divider — Conclusions
// ============================================================
slide = pres.addSlide({ masterName: "DIVIDER" });
slide.addText("🎯  Висновки", {
  x: 1, y: 2.7, w: 11.33, h: 1.2, align: "center", fontSize: 44, bold: true, color: PRIMARY,
});

// ============================================================
// SLIDE 21: Key conclusions
// ============================================================
slide = pres.addSlide({ masterName: "CONTENT" });
slide.addText("Ключові висновки", { x: 0.7, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: PRIMARY });

const conclusions = [
  [{ text: "Дефіцит ", options: { color: TEXT } }, { text: "4.76M", options: { bold: true, color: ACCENT_RED } }, { text: " фахівців — це проблема ", options: { color: TEXT } }, { text: "якості підготовки", options: { bold: true, color: PRIMARY } }, { text: ", не лише кількості", options: { color: TEXT } }],
  [{ text: "Міжнародні фреймворки (", options: { color: TEXT } }, { text: "NICE, ECSF", options: { bold: true, color: PRIMARY } }, { text: ") дають спільну мову для побудови програм на основі ", options: { color: TEXT } }, { text: "робочих ролей", options: { bold: true, color: TEXT } }],
  [{ text: "CTF та Cyber Range підвищують ", options: { color: TEXT } }, { text: "мотивацію та навички", options: { bold: true, color: SECONDARY } }, { text: ", але мають доповнюватися теорією", options: { color: TEXT } }],
  [{ text: "Оптимальне співвідношення: ", options: { color: TEXT } }, { text: "30% теорія / 50% практика / 20% професійна інтеграція", options: { bold: true, color: PRIMARY } }],
  [{ text: "Українські ініціативи (", options: { color: TEXT } }, { text: "кібербригади, re/start in cyber", options: { bold: true, color: SECONDARY } }, { text: ") — приклади успішного впровадження", options: { color: TEXT } }],
  [{ text: "Ключ до успіху — ", options: { color: TEXT } }, { text: "партнерство ЗВО + Індустрія + Держава", options: { bold: true, color: ACCENT_YELLOW } }, { text: " (трикутник знань)", options: { color: TEXT } }],
];

conclusions.forEach((c, i) => {
  slide.addText(c, {
    x: 0.7, y: 1.2 + i * 0.9, w: 12, h: 0.7, fontSize: 15, valign: "middle",
    bullet: { code: "25CF", color: PRIMARY },
  });
});

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
pres.writeFile({ fileName: "C:/Users/Alex/Desktop/Аспірант/Лекції_ОЕХ/presentation/presentation.pptx" })
  .then(() => console.log("OK: presentation.pptx created"))
  .catch(err => console.error("Error:", err));
