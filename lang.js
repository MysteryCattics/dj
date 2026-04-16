// lang.js

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

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

async function setLang(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);
    const translations = await response.json();

    // обновляем текст на странице
    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.getAttribute("data-key");
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    // обновляем заголовок вкладки
    if (translations.pageTitle) {
      document.title = translations.pageTitle;
    }

    // сохраняем язык
    setCookie("siteLang", lang, 30);
  } catch (err) {
    console.error("Ошибка загрузки языка:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = getCookie("siteLang") || "ru";
  setLang(savedLang);

  const uaFlag = document.querySelector(".ualang");
  const ruFlag = document.querySelector(".rulang");

  if (uaFlag) uaFlag.addEventListener("click", () => setLang("ua"));
  if (ruFlag) ruFlag.addEventListener("click", () => setLang("ru"));
});
