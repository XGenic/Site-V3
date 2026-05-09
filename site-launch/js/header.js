/**
 * Shared Header — Standalone JavaScript
 *
 * Usage:
 *   1. Include this script on your page.
 *   2. Place <div data-include="site-header"></div> where you
 *      want the header to appear.
 *   3. Make sure header.html (or your own template) sets
 *      window.siteHeaderTemplate before this script runs, OR
 *      embed the template inline.
 *
 * This module handles:
 *   • Injecting the header HTML into the DOM
 *   • Mobile menu open / close / submenu accordions
 */
(function () {
  /* -------------------------------------------------- *\
     Inject shared header template into the page
  \* -------------------------------------------------- */
  const injectSharedHeader = function () {
    var mount = document.querySelector('[data-include="site-header"]');
    if (!mount || !window.siteHeaderTemplate) return;
    mount.outerHTML = window.siteHeaderTemplate.trim();
  };

  /* -------------------------------------------------- *\
     Mobile menu behaviour
  \* -------------------------------------------------- */
  const setupMobileMenu = function () {
    var mobileToggle = document.getElementById('mobileToggle');
    var mobileMenu   = document.getElementById('mobileMenu');
    var mobileClose  = document.getElementById('mobileClose');
    if (!mobileToggle || !mobileMenu) return;

    var setMobileMenu = function (open) {
      if (open) mobileMenu.removeAttribute('hidden');
      else      mobileMenu.setAttribute('hidden', '');
      mobileToggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };

    // Toggle button
    mobileToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.hasAttribute('hidden') === false;
      setMobileMenu(!isOpen);
    });

    // Close button
    if (mobileClose) {
      mobileClose.addEventListener('click', function () { setMobileMenu(false); });
    }

    // Click outside (on the dark backdrop) closes the menu
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) setMobileMenu(false);
    });

    // Any link inside the mobile menu closes it
    var links = mobileMenu.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () { setMobileMenu(false); });
    }

    // Collapsible submenus
    var subtoggles = mobileMenu.querySelectorAll('.mobile-subtoggle');
    for (var j = 0; j < subtoggles.length; j++) {
      subtoggles[j].addEventListener('click', function () {
        var id    = this.getAttribute('data-target');
        var panel = id ? document.getElementById(id) : null;
        if (!panel) return;
        var expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', String(!expanded));
        if (expanded) panel.setAttribute('hidden', '');
        else          panel.removeAttribute('hidden');
      });
    }
  };

  /* -------------------------------------------------- *\
     Boot
  \* -------------------------------------------------- */
  injectSharedHeader();
  setupMobileMenu();
})();
