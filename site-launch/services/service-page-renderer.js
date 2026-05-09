(function () {
  const config = window.servicePageConfig || {};
  document.querySelector('.content-grid')?.classList.add('content-grid--no-sidebar');

  const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const setHtml = (selector, html) => {
    const node = document.querySelector(selector);
    if (node) node.innerHTML = html;
  };

  const bestFor = config.bestFor || [];
  setHtml('[data-service-best-for]', [
    '<span><b>Best for:</b></span>',
    ...bestFor.map((item) => `<span class="pill">${escapeHtml(item)}</span>`),
  ].join(''));

  const itinerary = config.itinerary || {};
  const itineraryItems = itinerary.items || [];
  setHtml('[data-service-itinerary]', `
    <div class="kicker">${escapeHtml(itinerary.kicker || 'Example Itinerary')}</div>
    <h3>${escapeHtml(itinerary.title || 'Shape The Day Around Your Group')}</h3>
    <div class="itinerary-tabs" role="tablist" aria-label="${escapeHtml(itinerary.tabsLabel || 'Itinerary durations')}">
      ${itineraryItems.map((item, index) => {
        const panelId = `itinerary-${index + 1}`;
        return `<button class="itinerary-tab" type="button" role="tab" aria-selected="${index === 0}" aria-controls="${panelId}" id="itinerary-tab-${index + 1}" data-itinerary-target="${panelId}">${escapeHtml(item.label)}</button>`;
      }).join('')}
    </div>
    ${itineraryItems.map((item, index) => {
      const panelId = `itinerary-${index + 1}`;
      return `
        <div class="itinerary-panel" id="${panelId}" role="tabpanel" aria-labelledby="itinerary-tab-${index + 1}"${index === 0 ? '' : ' hidden'}>
          <div class="timeline">
            ${(item.stops || []).map((stop) => `
              <article class="timeline-item${stop.isNew ? ' is-new-stop' : ''}">
                <h4>${escapeHtml(stop.title)}</h4>
                <p>${escapeHtml(stop.text)}</p>
              </article>
            `).join('')}
          </div>
        </div>
      `;
    }).join('')}
  `);

  const boats = config.boats || {};
  const filters = boats.filters || [];
  const cards = boats.cards || [];
  setHtml('[data-service-boats]', `
    <div class="boat-section-head">
      <div>
        <div class="kicker">${escapeHtml(boats.kicker || 'Choose Your Boat')}</div>
        <h3 id="boat-section-title">${escapeHtml(boats.title || 'Boat Options')}</h3>
      </div>
      <div class="boat-filters" role="tablist" aria-label="${escapeHtml(boats.filtersLabel || 'Boat tiers')}">
        ${filters.map((filter, index) => `<button class="boat-filter" type="button" role="tab" aria-selected="${index === 0}" data-boat-filter="${escapeHtml(filter.key)}">${escapeHtml(filter.label)}</button>`).join('')}
      </div>
    </div>
    <div class="boat-grid">
      ${cards.map((boat, index) => {
        const detailId = `boat-detail-${index + 1}`;
        return `
          <article class="boat-card" data-boat-card data-boat-tier="${escapeHtml(boat.tier)}">
            <img src="${escapeHtml(boat.image)}" alt="${escapeHtml(boat.alt || boat.name)}" loading="lazy" width="2560" height="1440" />
            <div class="boat-card-body">
              <div class="boat-meta">${(boat.meta || []).map((item) => `<span>${escapeHtml(item)}</span>`).join('')}</div>
              <h4 title="${escapeHtml(boat.name)}">${escapeHtml(boat.name)}</h4>
              <p class="boat-card-copy">${escapeHtml(boat.summary || boat.text)}</p>
              <div class="boat-rate">${escapeHtml(boat.rate)}</div>
              <button class="boat-detail-toggle" type="button" aria-expanded="false" aria-controls="${detailId}" data-boat-toggle>View Details</button>
              <div class="boat-detail" id="${detailId}" hidden>
                <ul>${(boat.details || []).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
                <a class="boat-link" href="${escapeHtml(boat.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(boat.linkLabel || 'View Boat Page')}</a>
              </div>
            </div>
          </article>
        `;
      }).join('')}
    </div>
  `);

  const onboard = config.onboard || {};
  setHtml('[data-service-onboard]', `
    <div class="kicker">${escapeHtml(onboard.kicker || 'On Board')}</div>
    <div class="addons-grid">
      <div class="addons-column">
        <h3 class="addons-title" id="activity-addons-title">${escapeHtml(onboard.includedTitle || "What's Included")}</h3>
        <ul class="addons-list">${(onboard.included || []).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </div>
      <div class="addons-column">
        <h3 class="addons-title">${escapeHtml(onboard.optionalTitle || 'Optional')}</h3>
        <ul class="addons-links">
          ${(onboard.optional || []).map((item) => `<li><a class="addons-link" href="${escapeHtml(item.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.label)}</a></li>`).join('')}
        </ul>
      </div>
    </div>
  `);

  window.pageSidebar = config.sidebar || {};
})();
