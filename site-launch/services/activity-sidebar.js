(function () {
  const defaultPricingColumns = [
    {
      key: 'hours',
      label: 'Duration',
      format: (value) => `${value} hours`,
    },
    {
      key: 'price',
      label: 'Price',
    },
  ];

  const defaultConfig = {
    bookingTitle: 'Availability & Booking',
    depositNote: 'Reserve with just a deposit!',
    fareHarborSrc: '',
    pricing: {
      title: 'Hourly Pricing',
      note: 'Includes crew, local fuel usage, and the allocated time with the vessel.',
      groups: [],
    },
    addon: {
      href: 'https://store.flamingoyachtcharters.net/',
      imageSrc: '../imgs/Addon-CTA.webp',
      ariaLabel: 'View available add-ons in a new tab',
    },
    packages: {
      title: 'Purchased a package?',
      items: [
        {
          title: 'Essentials Package',
          href: 'https://store.flamingoyachtcharters.net/products/charter-essentials-package',
          buttonLabel: 'Purchase Essentials Package',
          includes: ['Ice', 'Towels', 'Cups/Plates/Cutlery', 'Floating Mat', 'Inflatable Toy', 'Cooler'],
        },
        {
          title: 'Bachelorette Package',
          href: 'https://store.flamingoyachtcharters.net/products/bachelorette-package',
          buttonLabel: 'Purchase Bachelorette Package',
          includes: ['Captain Hats', 'Themed Floats', 'Floating Mat', 'Alcohol Order Pickup', 'Large Charcuterie Board or Fruit Platter', 'Essentials Package'],
        },
        {
          title: 'Watersports Package',
          href: 'https://store.flamingoyachtcharters.net/products/water-sports-package',
          buttonLabel: 'Purchase Watersports Package',
          includes: ['Sea Bob', 'Floating Mat', 'Inflatable Toys', 'Paddle Board', 'Watersports Lifevests', 'Inflatable Trampoline (Premium Vessels Only)', 'Tubing (optional)'],
        },
        {
          title: 'Cocktail Package',
          href: 'https://store.flamingoyachtcharters.net/products/alcohol-package',
          buttonLabel: 'Purchase Cocktail Package',
          includes: ['Soda', 'Mixers', 'Blender', 'Ice', 'Cups and Appropriate Glassware', 'Alcohol Order Pickup', 'Bartender (optional)'],
        },
        {
          title: 'Lunch Package',
          href: 'https://store.flamingoyachtcharters.net/',
          buttonLabel: 'Purchase Lunch Package',
          includes: ['Mixed Sub Platter', 'Hot Dogs (Premium Vessels Only)', 'Soda', 'Chips', 'Snack Basket', 'Veggie Platter'],
        },
      ],
    },
  };

  const toKey = (value) => String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const normalizeColumn = (column) => {
    if (typeof column === 'string') {
      return { key: toKey(column), label: column };
    }
    return {
      key: column.key || toKey(column.label),
      label: column.label || column.key,
      format: column.format,
    };
  };

  const getColumns = (pricingConfig) => {
    if (pricingConfig?.columns?.length) {
      return pricingConfig.columns.map(normalizeColumn);
    }
    return defaultPricingColumns;
  };

  const getCellValue = (row, column, index) => {
    if (Array.isArray(row)) return row[index];
    if (row && Object.prototype.hasOwnProperty.call(row, column.key)) {
      return row[column.key];
    }
    return '';
  };

  const renderRows = (rows, columns) => rows.map((row) => {
    const cells = columns.map((column, index) => {
      const rawValue = getCellValue(row, column, index);
      const renderedValue = column.format ? column.format(rawValue) : rawValue;
      return `<td>${escapeHtml(renderedValue)}</td>`;
    }).join('');
    return `<tr>${cells}</tr>`;
  }).join('');

  const renderThead = (columns) => (
    `<thead><tr>${columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join('')}</tr></thead>`
  );

  const renderCartIcon = () => [
    '<span class="sidebar-package-link-icon" aria-hidden="true">',
    '<svg viewBox="0 0 24 24" focusable="false">',
    '<circle cx="9" cy="20" r="1.5" fill="currentColor"></circle>',
    '<circle cx="17" cy="20" r="1.5" fill="currentColor"></circle>',
    '<path d="M3 4h2l2.1 9.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 7H7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>',
    '</svg>',
    '</span>',
  ].join('');

  const renderPackages = (packagesConfig) => {
    const excludedTitles = new Set((packagesConfig?.excludeTitles || []).map((title) => toKey(title)));
    const items = (packagesConfig?.items || []).filter((item) => !excludedTitles.has(toKey(item.title)));
    if (!items.length) return '';

    const groupId = 'booking-packages';
    const sections = items.map((item, index) => {
      const panelId = `${groupId}-panel-${index + 1}`;
      const triggerId = `${groupId}-trigger-${index + 1}`;
      const includes = (item.includes || []).map((entry) => `<li>${escapeHtml(entry)}</li>`).join('');

      return `
        <article class="sidebar-accordion-item">
          <button class="sidebar-accordion-trigger" type="button" id="${triggerId}" aria-expanded="false" aria-controls="${panelId}" data-accordion-trigger>
            <span class="sidebar-accordion-title">${escapeHtml(item.title)}</span>
            <span class="sidebar-accordion-icon" aria-hidden="true">+</span>
          </button>
          <div class="sidebar-accordion-panel" id="${panelId}" role="region" aria-labelledby="${triggerId}" hidden>
            <ul class="sidebar-package-list">${includes}</ul>
            <a class="sidebar-package-link" href="${escapeHtml(item.href)}" target="_blank" rel="noopener noreferrer">
              <span>${escapeHtml(item.buttonLabel || `Purchase ${item.title}`)}</span>
              ${renderCartIcon()}
            </a>
          </div>
        </article>
      `;
    }).join('');

    return `
      <section class="sidebar-packages" aria-labelledby="${groupId}-title">
        <h3 class="sidebar-section-title" id="${groupId}-title">${escapeHtml(packagesConfig.title || defaultConfig.packages.title)}</h3>
        <div class="sidebar-accordion-group" data-accordion-group="${groupId}">
          ${sections}
        </div>
      </section>
    `;
  };

  const renderGroupedPricing = (pricingConfig) => {
    const columns = getColumns(pricingConfig);
    const groups = pricingConfig.groups || [];

    if (groups.length <= 1) {
      const rows = groups[0]?.rows || pricingConfig.rows || [];
      return `
        <table aria-label="${escapeHtml(pricingConfig.title || defaultConfig.pricing.title)} table">
          ${renderThead(columns)}
          <tbody>${renderRows(rows, columns)}</tbody>
        </table>
      `;
    }

    const tabs = groups.map((group, index) => {
      const panelId = `rates-${index + 1}`;
      const tabId = `tab-rates-${index + 1}`;
      return `<button class="ptab" type="button" role="tab" aria-selected="${index === 0}" aria-controls="${panelId}" id="${tabId}">${escapeHtml(group.label || `Option ${index + 1}`)}</button>`;
    }).join('');

    const bodies = groups.map((group, index) => {
      const panelId = `rates-${index + 1}`;
      const tabId = `tab-rates-${index + 1}`;
      const hidden = index === 0 ? '' : ' hidden';
      return `<tbody id="${panelId}" role="tabpanel" aria-labelledby="${tabId}"${hidden}>${renderRows(group.rows || [], columns)}</tbody>`;
    }).join('');

    return `
      <div class="price-tabs" role="tablist" aria-label="Pricing groups">
        ${tabs}
      </div>
      <table aria-label="${escapeHtml(pricingConfig.title || defaultConfig.pricing.title)} table">
        ${renderThead(columns)}
        ${bodies}
      </table>
    `;
  };

  const config = {
    ...defaultConfig,
    ...window.pageSidebar,
    pricing: {
      ...defaultConfig.pricing,
      ...(window.pageSidebar?.pricing || {}),
    },
    addon: {
      ...defaultConfig.addon,
      ...(window.pageSidebar?.addon || {}),
    },
    packages: {
      ...defaultConfig.packages,
      ...(window.pageSidebar?.packages || {}),
      items: window.pageSidebar?.packages?.items || defaultConfig.packages.items,
      excludeTitles: window.pageSidebar?.packages?.excludeTitles || [],
    },
  };

  document.write(`
    <aside class="panel right" aria-label="Booking panel">
      <div class="summary">
        <h3 style="margin-bottom:6px;">${escapeHtml(config.bookingTitle)}</h3>

        <p class="booking-deposit-note">${escapeHtml(config.depositNote)}</p>

        <div id="book" class="cal" aria-label="Booking calendar">
          <div class="cal-body">
            <div class="fh-embed" aria-label="FareHarbor booking calendar">
              <script src="${escapeHtml(config.fareHarborSrc)}"><\/script>
            </div>
          </div>
        </div>

        <h3 style="margin-bottom:6px;">${escapeHtml(config.pricing.title)}</h3>

        ${renderGroupedPricing(config.pricing)}

        <div class="note">
          ${escapeHtml(config.pricing.note)}
        </div>

        <a class="addon-promo" href="${escapeHtml(config.addon.href)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(config.addon.ariaLabel)}">
          <img class="addon-promo-img" src="${escapeHtml(config.addon.imageSrc)}" alt="" loading="lazy" width="2752" height="1536" />
        </a>

        ${renderPackages(config.packages)}
      </div>
    </aside>
  `);
})();
