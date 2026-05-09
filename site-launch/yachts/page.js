(() => {
  const VALID_TIERS = new Set(["all", "luxury", "premium", "standard", "sandbar"]);

  const mountHeader = () => {
    const mountPoint = document.querySelector("#site-header");
    if (!mountPoint || typeof window.siteHeaderTemplate !== "string") {
      return;
    }

    mountPoint.outerHTML = window.siteHeaderTemplate.trim();
  };

  const initHeader = () => {
    const mobileMenu = document.querySelector("#mobileMenu");
    const mobileToggle = document.querySelector("#mobileToggle");
    const mobileClose = document.querySelector("#mobileClose");
    const submenuToggles = Array.from(document.querySelectorAll(".mobile-subtoggle"));

    if (!mobileMenu || !mobileToggle || !mobileClose) {
      return;
    }
    if (mobileToggle.dataset.sharedHeaderBound === "true") {
      return;
    }

    const setMenuState = (isOpen) => {
      mobileMenu.hidden = !isOpen;
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    };

    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileToggle.getAttribute("aria-expanded") === "true";
      setMenuState(!isOpen);
    });

    mobileClose.addEventListener("click", () => {
      setMenuState(false);
    });

    mobileMenu.addEventListener("click", (event) => {
      if (event.target === mobileMenu) {
        setMenuState(false);
      }
    });

    submenuToggles.forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-target");
        if (!targetId) {
          return;
        }

        const submenu = document.getElementById(targetId);
        if (!submenu) {
          return;
        }

        const isExpanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!isExpanded));
        submenu.hidden = isExpanded;
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenuState(false);
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 960) {
        setMenuState(false);
      }
    });
  };

  const initFilter = () => {
    const filter = document.querySelector(".yacht-filter");
    if (!filter) {
      return;
    }

    const buttons = Array.from(filter.querySelectorAll("[data-tier]"));
    const sections = Array.from(document.querySelectorAll(".yacht-tier-section"));

    const setActive = (tier) => {
      const safeTier = VALID_TIERS.has(tier) ? tier : "all";

      buttons.forEach((button) => {
        const isActive = button.dataset.tier === safeTier;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });

      sections.forEach((section) => {
        const matches = safeTier === "all" || section.classList.contains(`tier-${safeTier}`);
        section.classList.toggle("is-hidden", !matches);
      });

      const url = new URL(window.location.href);
      if (safeTier === "all") {
        url.searchParams.delete("tier");
      } else {
        url.searchParams.set("tier", safeTier);
      }

      window.history.replaceState({}, "", url.toString());
    };

    filter.addEventListener("click", (event) => {
      const button = event.target.closest("[data-tier]");
      if (!button) {
        return;
      }

      setActive(button.dataset.tier || "all");
    });

    const initialTier = new URL(window.location.href).searchParams.get("tier") || "all";
    setActive(initialTier);
  };

  mountHeader();
  initHeader();
  initFilter();
})();
