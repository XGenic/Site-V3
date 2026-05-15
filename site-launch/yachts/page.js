(() => {
  const VALID_TIERS = new Set(["all", "luxury", "premium", "standard", "sandbar"]);

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

  initFilter();
})();
