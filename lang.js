// lang.js

// Установить cookie
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Получить cookie
function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}

// Загрузить JSON перевода и применить
async function setLang(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.getAttribute("data-key");
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    // Сохраняем выбранный язык в cookie
    setCookie("siteLang", lang, 30);
  } catch (err) {
    console.error("Ошибка загрузки языка:", err);
  }
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  // Проверяем сохранённый язык
  const savedLang = getCookie("siteLang") || "ru"; // по умолчанию русский
  setLang(savedLang);

  // Навешиваем обработчики на флаги
  const uaFlag = document.querySelector(".ualang");
  const ruFlag = document.querySelector(".rulang");

  if (uaFlag) uaFlag.addEventListener("click", () => setLang("ua"));
  if (ruFlag) ruFlag.addEventListener("click", () => setLang("ru"));
});