// lang.js

// ====== Куки ======
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}

// ====== Переклад ======
async function setLang(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);
    const translations = await response.json();

    // оновлення тексту на сторінці
    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.getAttribute("data-key");
      if (translations[key]) {
        // підтримка кнопок, інпутів, текстових елементів
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = translations[key];
        } else if (el.tagName === "BUTTON") {
          el.textContent = translations[key];
        } else {
          el.textContent = translations[key];
        }
      }
    });

    // оновлення заголовка вкладки
    const currentPage = window.location.pathname.split("/").pop();
    if (translations.pageTitle && currentPage === "aboutus.html") {
      document.title = translations.pageTitle;
    }
    else {
      document.title = translations.mainPagetitle;
    }

    // збереження вибору
    setCookie("siteLang", lang, 30);
  } catch (err) {
    console.error("Помилка завантаження мови:", err);
  }
}

// ====== Ініціалізація ======
document.addEventListener("DOMContentLoaded", () => {
  let savedLang = getCookie("siteLang");

  // якщо куки немає — ставимо українську
  if (!savedLang) {
    savedLang = "ua";
    setCookie("siteLang", savedLang, 30);
  }

  setLang(savedLang);

  // флаги для перемикання
  const uaFlag = document.querySelector(".ualang");
  const ruFlag = document.querySelector(".rulang");

  if (uaFlag) uaFlag.addEventListener("click", () => setLang("ua"));
  if (ruFlag) ruFlag.addEventListener("click", () => setLang("ru"));
});
