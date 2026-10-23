/* =============================================================
   Small interactions: theme toggle + mobile menu
   (No editing needed here for normal content updates.)
   ============================================================= */

// ---- Dark / light theme ----
(function () {
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var theme = stored || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", theme);

  window.toggleTheme = function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  };
})();

// ---- Mobile nav menu ----
window.toggleMenu = function () {
  var links = document.getElementById("navLinks");
  if (links) links.classList.toggle("is-open");
};

// Keep the two navigation dropdowns usable with a pointer or keyboard.
(function () {
  var menus = document.querySelectorAll('.nav__dropdown');
  menus.forEach(function (menu) {
    menu.addEventListener('toggle', function () {
      if (menu.open) menus.forEach(function (other) { if (other !== menu) other.open = false; });
    });
  });
  document.addEventListener('click', function (event) {
    menus.forEach(function (menu) { if (!menu.contains(event.target)) menu.open = false; });
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') menus.forEach(function (menu) {
      if (menu.open) { menu.open = false; menu.querySelector('summary').focus(); }
    });
  });
})();
