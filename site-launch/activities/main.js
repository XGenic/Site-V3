// Tiny helpers only (keep page fast)
(function(){
  const injectSharedHeader = () => {
    const mount = document.querySelector('[data-include="site-header"]');
    if (!mount || !window.siteHeaderTemplate) return;
    mount.outerHTML = window.siteHeaderTemplate.trim();
  };

  const setupMobileMenu = () => {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');
    if (!mobileToggle || !mobileMenu) return;
    if (mobileToggle.dataset.sharedHeaderBound === 'true') return;
    mobileToggle.dataset.sharedHeaderBound = 'true';

    const setMobileMenu = (open) => {
      if (open) mobileMenu.removeAttribute('hidden');
      else mobileMenu.setAttribute('hidden', '');
      mobileToggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.hasAttribute('hidden') === false;
      setMobileMenu(!isOpen);
    });

    mobileClose?.addEventListener('click', () => setMobileMenu(false));
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) setMobileMenu(false);
    });
    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => setMobileMenu(false));
    });

    mobileMenu.querySelectorAll('.mobile-subtoggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-target');
        const panel = id ? document.getElementById(id) : null;
        if (!panel) return;
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        if (expanded) panel.setAttribute('hidden', '');
        else panel.removeAttribute('hidden');
      });
    });
  };

  const setupAddonsPanels = () => {
    const MAX_VISIBLE_ITEMS = 5;
    const panels = Array.from(document.querySelectorAll('.addons-panel'));
    if (!panels.length) return;

    const updateShell = (shell) => {
      const toggle = shell.querySelector('.addons-toggle');
      const lists = Array.from(shell.querySelectorAll('.addons-list, .addons-links'));

      if (!toggle || !lists.length) return;

      const needsCollapse = lists.some((list) => list.children.length > MAX_VISIBLE_ITEMS);
      if (!needsCollapse) {
        shell.classList.remove('is-collapsed', 'is-expanded');
        lists.forEach((list) => {
          list.style.maxHeight = '';
        });
        toggle.hidden = true;
        return;
      }

      toggle.hidden = false;
      const isExpanded = shell.classList.contains('is-expanded');

      lists.forEach((list) => {
        const items = Array.from(list.children);
        const visibleItems = items.slice(0, MAX_VISIBLE_ITEMS);
        const styles = window.getComputedStyle(list);
        const rowGap = parseFloat(styles.rowGap || styles.gap || '0');
        const collapsedHeight = visibleItems.reduce((total, item) => total + item.offsetHeight, 0);
        const collapsedHeightWithGaps = visibleItems.length
          ? collapsedHeight + (visibleItems.length - 1) * rowGap
          : 0;

        list.style.maxHeight = isExpanded
          ? `${list.scrollHeight}px`
          : `${collapsedHeightWithGaps}px`;
      });

      if (isExpanded) {
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Show fewer add-ons');
      } else {
        shell.classList.add('is-collapsed');
        shell.classList.remove('is-expanded');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Show all add-ons');
      }
    };

    const shells = panels.map((panel, index) => {
      let shell = panel.querySelector('[data-addons-collapsible]');
      const grid = panel.querySelector('.addons-grid');
      if (!grid) return null;

      if (!shell) {
        shell = document.createElement('div');
        shell.className = 'addons-collapse is-collapsed';
        shell.setAttribute('data-addons-collapsible', '');
        grid.parentNode.insertBefore(shell, grid);
        shell.appendChild(grid);
      } else {
        shell.classList.add('addons-collapse');
        if (!shell.classList.contains('is-expanded')) shell.classList.add('is-collapsed');
      }

      let toggle = shell.querySelector('.addons-toggle');
      if (!toggle) {
        toggle = document.createElement('button');
        toggle.className = 'addons-toggle';
        toggle.type = 'button';
        toggle.innerHTML = '<span class="addons-toggle-chevron" aria-hidden="true"></span>';
        shell.appendChild(toggle);
      }

      if (!grid.id) grid.id = `addons-content-${index + 1}`;
      toggle.setAttribute('aria-controls', grid.id);

      if (toggle.dataset.addonsBound !== 'true') {
        toggle.dataset.addonsBound = 'true';
        toggle.addEventListener('click', () => {
          const isExpanded = shell.classList.toggle('is-expanded');
          shell.classList.toggle('is-collapsed', !isExpanded);
          updateShell(shell);
        });
      }

      return shell;
    }).filter(Boolean);

    const refreshAddonsPanels = () => {
      shells.forEach(updateShell);
    };

    refreshAddonsPanels();
    window.addEventListener('resize', refreshAddonsPanels);
    window.addEventListener('load', refreshAddonsPanels);
  };

  const setupContactForms = () => {
    const forms = Array.from(document.querySelectorAll('.contact-form'));
    if (!forms.length) return;

    forms.forEach((form) => {
      form.setAttribute('target', '_self');
    });

    const params = new URLSearchParams(window.location.search);
    const status = params.get('contact_status');
    const message = params.get('contact_message');
    if (!status || !message) return;

    const form = forms[0];
    const card = form.closest('.contact-card') || form.parentElement;
    if (!card) return;

    let feedback = card.querySelector('.contact-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      form.parentNode.insertBefore(feedback, form);
    }

    feedback.className = 'contact-feedback';
    feedback.classList.add(status === 'success' ? 'is-success' : 'is-error');
    feedback.textContent = message;
    feedback.hidden = false;
    feedback.setAttribute('role', status === 'success' ? 'status' : 'alert');
    feedback.setAttribute('aria-live', 'polite');

    const nextQuery = new URLSearchParams(window.location.search);
    nextQuery.delete('contact_status');
    nextQuery.delete('contact_message');
    const nextUrl = `${window.location.pathname}${nextQuery.toString() ? `?${nextQuery.toString()}` : ''}${window.location.hash}`;
    window.history.replaceState({}, document.title, nextUrl);

    const target = document.getElementById('contact-form') || card;
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const setupBoatSelection = () => {
    const filterButtons = Array.from(document.querySelectorAll('[data-boat-filter]'));
    const cards = Array.from(document.querySelectorAll('[data-boat-card]'));
    const detailToggles = Array.from(document.querySelectorAll('[data-boat-toggle]'));

    if (filterButtons.length && cards.length) {
      const selectFilter = (filterValue) => {
        filterButtons.forEach((button) => {
          const isActive = button.getAttribute('data-boat-filter') === filterValue;
          button.setAttribute('aria-selected', String(isActive));
        });

        cards.forEach((card) => {
          const cardTier = card.getAttribute('data-boat-tier');
          card.hidden = filterValue !== 'all' && cardTier !== filterValue;
        });
      };

      filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
          selectFilter(button.getAttribute('data-boat-filter') || 'all');
        });
      });
    }

    detailToggles.forEach((button) => {
      button.addEventListener('click', () => {
        const panelId = button.getAttribute('aria-controls');
        const panel = panelId ? document.getElementById(panelId) : null;
        if (!panel) return;

        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!isExpanded));
        button.textContent = isExpanded ? 'View Details' : 'Hide Details';
        panel.hidden = isExpanded;
      });
    });
  };

  injectSharedHeader();

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile menu fallback for standalone pages without the shared header initializer.
  setupMobileMenu();
  setupAddonsPanels();
  setupContactForms();
  setupBoatSelection();

  const sharedBottomGalleryImages = [
    '/site-launch/assets/imgs/General/General01.webp',
    '/site-launch/assets/imgs/General/General02.webp',
    '/site-launch/assets/imgs/General/General03.webp',
    '/site-launch/assets/imgs/General/General04.webp',
    '/site-launch/assets/imgs/General/General05.webp',
    '/site-launch/assets/imgs/General/General06.webp',
    '/site-launch/assets/imgs/General/General08.webp',
    '/site-launch/assets/imgs/General/General10.webp',
    '/site-launch/assets/imgs/General/General11.webp',
    '/site-launch/assets/imgs/General/General12.webp',
    '/site-launch/assets/imgs/General/General13.webp',
    '/site-launch/assets/imgs/General/General14.webp'
  ];

  const populateBottomGallery = () => {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = sharedBottomGalleryImages.map((src, index) => `
      <div class="thumb" data-full="${src}">
        <img loading="lazy" src="${src}" alt="General yacht photo ${index + 1}" />
      </div>
    `).join('');
  };

  populateBottomGallery();

  // Hero scrolling buttons
  const heroTrack = document.getElementById('heroTrack');
  const prev = document.getElementById('prevHero');
  const next = document.getElementById('nextHero');
  const scrollBySlide = (dir) => {
    if (!heroTrack) return;
    const w = heroTrack.getBoundingClientRect().width;
    const maxScrollLeft = Math.max(heroTrack.scrollWidth - heroTrack.clientWidth, 0);
    const currentScrollLeft = heroTrack.scrollLeft;
    const edgeTolerance = Math.max(8, w * 0.05);

    if (dir > 0 && currentScrollLeft >= maxScrollLeft - edgeTolerance) {
      heroTrack.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    if (dir < 0 && currentScrollLeft <= edgeTolerance) {
      heroTrack.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
      return;
    }

    heroTrack.scrollBy({ left: dir * w, behavior: 'smooth' });
  };
  if (prev) prev.addEventListener('click', () => scrollBySlide(-1));
  if (next) next.addEventListener('click', () => scrollBySlide(1));

  // Gallery lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');

  let activeGallery = [];
  let activeIndex = -1;

  const getHeroImages = () => Array.from(document.querySelectorAll('#heroTrack .ph-img')).map((img) => ({
    src: img.currentSrc || img.src,
    label: img.alt || 'Photo'
  }));

  const getBottomGalleryImages = () => Array.from(document.querySelectorAll('#galleryGrid .thumb')).map((t) => {
    const img = t.querySelector('img');
    return {
      src: t.getAttribute('data-full') || img?.currentSrc || img?.src || '',
      label: img?.alt || 'Photo'
    };
  }).filter((item) => item.src);

  const renderLbAtIndex = (index) => {
    if (!lb || !lbImg || !activeGallery.length) return;
    const total = activeGallery.length;
    activeIndex = ((index % total) + total) % total;
    const item = activeGallery[activeIndex];
    lbImg.src = item.src;
  };

  const openLb = (galleryItems, index) => {
    if (!lb || !lbImg || !galleryItems?.length) return;
    activeGallery = galleryItems;
    renderLbAtIndex(index ?? 0);
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const stepLb = (dir) => {
    if (lb?.getAttribute('aria-hidden') !== 'false') return;
    if (!activeGallery.length) return;
    renderLbAtIndex(activeIndex + dir);
  };

  const closeLb = () => {
    if (!lb) return;
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeGallery = [];
    activeIndex = -1;
  };

  heroTrack?.addEventListener('click', (e) => {
    const img = e.target.closest('.ph-img');
    if (!img) return;
    const heroImages = getHeroImages();
    const idx = Array.from(document.querySelectorAll('#heroTrack .ph-img')).indexOf(img);
    openLb(heroImages, idx >= 0 ? idx : 0);
  });

  document.getElementById('galleryGrid')?.addEventListener('click', (e) => {
    const t = e.target.closest('.thumb');
    if (!t) return;
    const thumbs = Array.from(document.querySelectorAll('#galleryGrid .thumb'));
    const idx = thumbs.indexOf(t);
    openLb(getBottomGalleryImages(), idx >= 0 ? idx : 0);
  });

  document.querySelectorAll('[data-service-media-slider]').forEach((slider) => {
    const track = slider.querySelector('[data-service-slider-track]');
    const prevButton = slider.querySelector('[data-service-slider-prev]');
    const nextButton = slider.querySelector('[data-service-slider-next]');
    const slides = Array.from(slider.querySelectorAll('.service-media-slider__slide img'));
    if (!track || !slides.length) return;

    const scrollSlider = (direction) => {
      const maxScrollLeft = Math.max(track.scrollWidth - track.clientWidth, 0);
      const tolerance = 8;
      const atStart = track.scrollLeft <= tolerance;
      const atEnd = track.scrollLeft >= maxScrollLeft - tolerance;

      if (direction > 0 && atEnd) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }

      if (direction < 0 && atStart) {
        track.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
        return;
      }

      track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' });
    };

    prevButton?.addEventListener('click', () => scrollSlider(-1));
    nextButton?.addEventListener('click', () => scrollSlider(1));

    track.addEventListener('click', (e) => {
      const img = e.target.closest('.service-media-slider__slide img');
      if (!img) return;
      const idx = slides.indexOf(img);
      const galleryItems = slides.map((item) => ({
        src: item.currentSrc || item.src,
        label: item.alt || 'Photo'
      }));
      openLb(galleryItems, idx >= 0 ? idx : 0);
    });
  });

  lbClose?.addEventListener('click', closeLb);
  lbPrev?.addEventListener('click', () => stepLb(-1));
  lbNext?.addEventListener('click', () => stepLb(1));
  lb?.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });

  let touchStartX = 0;
  let touchStartY = 0;
  lbImg?.addEventListener('touchstart', (e) => {
    const t = e.changedTouches?.[0];
    if (!t) return;
    touchStartX = t.clientX;
    touchStartY = t.clientY;
  }, { passive: true });
  lbImg?.addEventListener('touchend', (e) => {
    const t = e.changedTouches?.[0];
    if (!t) return;
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    stepLb(dx < 0 ? 1 : -1);
  }, { passive: true });

  window.addEventListener('keydown', (e) => {
    if (lb?.getAttribute('aria-hidden') !== 'false') return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') stepLb(-1);
    if (e.key === 'ArrowRight') stepLb(1);
  });

  // Itinerary tabs
  const itineraryTabs = Array.from(document.querySelectorAll('.itinerary-tab'));
  const itineraryPanels = Array.from(document.querySelectorAll('.itinerary-panel'));
  const selectItineraryTab = (targetId) => {
    if (!targetId || !itineraryTabs.length || !itineraryPanels.length) return;
    itineraryTabs.forEach((tab) => {
      const isActive = tab.getAttribute('data-itinerary-target') === targetId;
      tab.setAttribute('aria-selected', String(isActive));
    });
    itineraryPanels.forEach((panel) => {
      if (panel.id === targetId) panel.removeAttribute('hidden');
      else panel.setAttribute('hidden', '');
    });
  };

  itineraryTabs.forEach((tab) => {
    tab.addEventListener('click', () => selectItineraryTab(tab.getAttribute('data-itinerary-target')));
  });
})();
