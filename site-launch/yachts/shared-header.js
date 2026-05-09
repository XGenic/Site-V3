window.siteHeaderTemplate = `
<header class="main-header">
  <div class="topbar" aria-label="Contact information">
    <div class="topbar-inner">
      <div class="topbar-left">
        <a href="tel:+17867587384">
          <span class="tb-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false"><path d="M6.6 10.8a15.4 15.4 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1.3.4 2.6.6 4 .6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.3 22 2 13.7 2 3c0-.6.4-1 1-1h4.5c.6 0 1 .4 1 1 0 1.4.2 2.7.6 4 .1.4 0 .9-.3 1.2l-2.2 2.2Z"/></svg>
          </span>(786) 758-7384
        </a>
        <a href="mailto:contact@flamingo.yachts">
          <span class="tb-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2v.2l9 6.3 9-6.3V7l-9 6.3L3 7Z"/></svg>
          </span>contact@flamingo.yachts
        </a>
        <a href="/contact/">
          <span class="tb-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false"><path d="M12 2a7 7 0 0 1 7 7c0 5.1-7 13-7 13S5 14.1 5 9a7 7 0 0 1 7-7Zm0 9.5A2.5 2.5 0 1 0 12 6.5a2.5 2.5 0 0 0 0 5Z"/></svg>
          </span>Fort Lauderdale, FL
        </a>
        <a href="/contact/">
          <span class="tb-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false"><path d="M6.6 10.8a15.4 15.4 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1.3.4 2.6.6 4 .6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.3 22 2 13.7 2 3c0-.6.4-1 1-1h4.5c.6 0 1 .4 1 1 0 1.4.2 2.7.6 4 .1.4 0 .9-.3 1.2l-2.2 2.2Z"/></svg>
          </span>Schedule a Call
        </a>
      </div>
    </div>
  </div>

  <nav class="navbar" aria-label="Primary navigation">
    <div class="brand">
      <a href="/" class="brand-link">
        <span class="brand-name">FLAMINGO</span>
        <span class="brand-sub">Yacht Charters &amp; Boat Rentals</span>
      </a>
    </div>

    <ul class="nav-links">
      <li><a href="/">Home</a></li>

      <li class="has-dropdown">
        <a class="is-current" href="/services/">Activities</a>
        <div class="dropdown-menu" role="menu" aria-label="Activities">
          <a href="/services/bachelorette-party/">Bachelorette Party</a>
          <a href="/services/bimini-trip/">Bimini Trip</a>
          <a href="/services/catamaran-charters/">Catamaran Charters</a>
          <a href="/services/dinner-cruise/">Dinner Cruise</a>
          <a href="/services/learn-to-sail/">Learn to Sail</a>
          <a href="/services/millionaires-row-tour/">Millionaires Row Tour</a>
          <a href="/services/no-captain-rentals/">No Captain Rentals</a>
          <a href="/services/sandbar-trip/">Sandbar Trip</a>
          <a href="/services/sunset-cruise/">Sunset Cruise</a>
        </div>
      </li>

      <li class="has-dropdown has-nested">
        <a href="/yachts/">Yachts</a>
        <div class="dropdown-menu y-dropdown" role="menu" aria-label="Yachts">
          <div class="nested-item">
            <a href="/yachts/?tier=premium">Premium Yachts <span aria-hidden="true">&rsaquo;</span></a>
            <div class="nested-panel">
              <a href="/yacht/fountaine-pajot/">Fountaine Pajot</a>
              <a href="/yacht/savannah/">Savannah</a>
              <a href="/yacht/vg/">VG</a>
            </div>
          </div>
          <div class="nested-item">
            <a href="/yachts/?tier=standard">Standard Yachts <span aria-hidden="true">&rsaquo;</span></a>
            <div class="nested-panel">
              <a href="/yacht/fairline/">Fairline</a>
              <a href="/yacht/sea-ray/">Sea Ray</a>
            </div>
          </div>
          <div class="nested-item">
            <a href="/yachts/?tier=luxury">Luxury Yachts <span aria-hidden="true">&rsaquo;</span></a>
            <div class="nested-panel">
              <a href="/yacht/pardo/">Pardo</a>
              <a href="/yacht/sportfish/">Sportfish</a>
              <a href="/yacht/sunreef/">Sunreef</a>
            </div>
          </div>
          <div class="nested-item">
            <a href="/yachts/?tier=sandbar">Sandbar Boats <span aria-hidden="true">&rsaquo;</span></a>
            <div class="nested-panel">
              <a href="/yacht/axopar/">Axopar</a>
              <a href="/yacht/chris-craft/">Chris Craft</a>
              <a href="/yacht/formula-40pc/">Formula 40 PC</a>
              <a href="/yacht/greenline/">Greenline</a>
              <a href="/yacht/rinker/">Rinker</a>
              <a href="/yacht/starcraft/">Starcraft</a>
            </div>
          </div>
        </div>
      </li>

      <li><a href="/extras/">Add-Ons</a></li>
      <li><a href="/faq/">FAQ</a></li>
      <li><a href="/contact/">Contact</a></li>
    </ul>

    <div class="nav-cta">
      <a href="/book-now/" class="btn-book">Book Now</a>
    </div>

    <div class="mobile-header-actions">
      <a href="/book-now/" class="btn-book btn-book-mobile">Book Now</a>
      <button class="mobile-toggle" type="button" id="mobileToggle" aria-controls="mobileMenu" aria-expanded="false" aria-label="Open menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>

  <div id="mobileMenu" class="mobile-menu" hidden>
    <div class="mobile-menu-inner">
      <div class="mobile-menu-head">
        <a href="/" class="brand-link">
          <span class="brand-name">FLAMINGO</span>
          <span class="brand-sub">Yacht Charters &amp; Boat Rentals</span>
        </a>
        <button class="mobile-close" type="button" id="mobileClose" aria-label="Close menu">&times;</button>
      </div>

      <nav class="mobile-nav" aria-label="Mobile navigation">
        <a href="/">Home</a>

        <div class="mobile-group">
          <div class="mobile-row">
            <a class="is-current" href="/services/">Activities</a>
            <button class="mobile-subtoggle" type="button" data-target="mobActivities" aria-expanded="false" aria-label="Toggle Activities">&#8964;</button>
          </div>
          <div class="mobile-submenu" id="mobActivities" hidden>
            <a href="/services/bachelorette-party/">Bachelorette Party</a>
            <a href="/services/bimini-trip/">Bimini Trip</a>
            <a href="/services/catamaran-charters/">Catamaran Charters</a>
            <a href="/services/dinner-cruise/">Dinner Cruise</a>
            <a href="/services/learn-to-sail/">Learn to Sail</a>
            <a href="/services/millionaires-row-tour/">Millionaires Row Tour</a>
            <a href="/services/no-captain-rentals/">No Captain Rentals</a>
            <a href="/services/sandbar-trip/">Sandbar Trip</a>
            <a href="/services/sunset-cruise/">Sunset Cruise</a>
          </div>
        </div>

        <div class="mobile-group">
          <div class="mobile-row">
            <a href="/yachts/">Yachts</a>
            <button class="mobile-subtoggle" type="button" data-target="mobYachts" aria-expanded="false" aria-label="Toggle Yachts">&#8964;</button>
          </div>
          <div class="mobile-submenu" id="mobYachts" hidden>
            <div class="mobile-subgroup">
              <a href="/yachts/?tier=premium">Premium Yachts</a>
              <a href="/yacht/fountaine-pajot/">Fountaine Pajot</a>
              <a href="/yacht/savannah/">Savannah</a>
              <a href="/yacht/vg/">VG</a>
            </div>
            <div class="mobile-subgroup">
              <a href="/yachts/?tier=standard">Standard Yachts</a>
              <a href="/yacht/fairline/">Fairline</a>
              <a href="/yacht/sea-ray/">Sea Ray</a>
            </div>
            <div class="mobile-subgroup">
              <a href="/yachts/?tier=luxury">Luxury Yachts</a>
              <a href="/yacht/pardo/">Pardo</a>
              <a href="/yacht/sportfish/">Sportfish</a>
              <a href="/yacht/sunreef/">Sunreef</a>
            </div>
            <div class="mobile-subgroup">
              <a href="/yachts/?tier=sandbar">Sandbar Boats</a>
              <a href="/yacht/axopar/">Axopar</a>
              <a href="/yacht/chris-craft/">Chris Craft</a>
              <a href="/yacht/formula-40pc/">Formula 40 PC</a>
              <a href="/yacht/greenline/">Greenline</a>
              <a href="/yacht/rinker/">Rinker</a>
              <a href="/yacht/starcraft/">Starcraft</a>
            </div>
          </div>
        </div>

        <a href="/yacht-charter-discounts/">Offers</a>
        <a href="/extras/">Add-Ons</a>
        <a href="/contact/">Contact</a>
      </nav>

      <div class="mobile-search" aria-label="Search">
        <input type="search" placeholder="Search" />
        <button type="button" aria-label="Search">&#8985;</button>
      </div>

      <div class="mobile-social" aria-label="Social links">
        <a href="https://facebook.com/" aria-label="Facebook">f</a>
        <a href="https://instagram.com/" aria-label="Instagram">ig</a>
      </div>
    </div>
  </div>
</header>
`;
