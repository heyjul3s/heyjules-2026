(function () {
  var storageKey = "preferred-theme";
  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");
  var toggleLabel = document.querySelector("[data-theme-toggle-label]");
  var year = document.querySelector("[data-current-year]");
  var preferredTheme = window.matchMedia("(prefers-color-scheme: dark)");

  function getSavedTheme() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (_error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (_error) {
      return;
    }
  }

  function getSystemTheme() {
    return preferredTheme.matches ? "dark" : "light";
  }

  function setTheme(theme) {
    var nextTheme = theme || getSystemTheme();
    var isDark = nextTheme === "dark";

    root.dataset.theme = nextTheme;

    if (toggle) {
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    }

    if (toggleLabel) {
      toggleLabel.textContent = isDark ? "Light" : "Dark";
    }
  }

  setTheme(getSavedTheme());

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
      saveTheme(nextTheme);
    });
  }

  preferredTheme.addEventListener("change", function () {
    if (!getSavedTheme()) {
      setTheme();
    }
  });
})();
