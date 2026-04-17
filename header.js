document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("header");
  if (!headerContainer) return;

  fetch("/header.html")
    .then(res => res.text())
    .then(html => {
      headerContainer.innerHTML = html;

      // ✅ Після вставки хедера активуємо переклад
      initLangSwitcher();
    })
    .catch(err => console.error("Помилка завантаження хедера:", err));
});

function initLangSwitcher() {
  const uaFlag = document.querySelector(".ualang");
  const ruFlag = document.querySelector(".rulang");

  if (!uaFlag || !ruFlag) {
    console.error("Флаги не знайдені у хедері.");
    return;
  }

  uaFlag.addEventListener("click", () => setLang("ua"));
  ruFlag.addEventListener("click", () => setLang("ru"));
}
