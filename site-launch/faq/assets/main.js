(function () {
  const GENERAL_FAQ = [
    {
      question: "What Can I Bring?",
      answer: "<p>You’re welcome to bring anything you’d like as long as it’s federally legal and allowed on our waterways. We highly recommend packing light.</p>"
    },
    {
      question: "Can I still make changes to my reservation?",
      answer: "<p>Absolutely. Upgrade your booking with add-ons using this link or contact us if you need to make changes to your vessel or duration.</p>"
    },
    {
      question: "When will I get my captain's contact information?",
      answer: "<p>You will receive a list of captains ~48 hours before your trip. USCG regulations do not allow us, or any private charter, to assign captains. We are required to offer you an open-ended list. All captains sent to you are already covered under our insurance policies and are heavily experienced on our vessels.</p>"
    },
    {
      question: "Can I update my guest count?",
      answer: "<p>You only need to contact us if you’re moving from a group count of 6 or fewer to 7 or more, as fees would apply.</p>"
    },
    {
      question: "When is my final payment due?",
      answer: "<p>If you booked with a deposit, the final payment is due 48 hours prior to departure. You can find your payment link within your confirmation email. </p>"
    },
    {
      question: "What is expected with gratuity?",
      answer: "<p>Gratuity is service industry standard at 18-30% of your booking total. You can handle this directly with your crew, or we can send you a credit card link upon request.</p>"
    },
    {
      question: "What if it rains?",
      answer: "<p>We do go out in rain or shine, so it would be up to you and your group to decide. Our cancellation policy allows a full refund if you cancel within 48 hours of your departure. However, our captains constantly monitor radar to avoid pockets of rain when possible.</p>"
    },
    {
      question: "When should we arrive?",
      answer: "<p>Please arrive no earlier than 15 minutes before your scheduled departure time.If you're arriving late, please text your captain. We have very strict dock and bridge schedules to factor in. We recommend arriving on time.</p>"
    },
    {
      question: "Can I bring alcohol?",
      answer: "<p>Of course. However, we recommend against red wine and glass bottles when possible.</p>"
    },
    {
      question: "Can I smoke on board?",
      answer: "<p>Smoking tobacco is allowed on the back decks and platforms while anchored.</p>"
    },
    {
      question: "Can I decorate the boat?",
      answer: "<p>Your reservation is for a set time frame. What you do during your allocated time is entirely up to you. We do offer the ability to arrive early to decorate within our add-ons list.</p>"
    },
    {
      question: "What is not allowed on the boat?",
      answer: "<p>Anything federally illegal, loose plastic pollutants such as balloons and confetti, fireworks, drugs, and firearms.</p>"
    }
  ];

  const PACKAGE_TEMPLATES = {
    "Essentials Package": renderPackageTemplate(
      "Essentials",
      "https://store.flamingoyachtcharters.net/products/charter-essentials-package",
      ["Ice", "Towels", "Cups/Plates/Cutlery", "Floating Mat", "Inflatable Toy", "Cooler"]
    ),
    "Bachelorette Package": renderPackageTemplate(
      "Bachelorette",
      "https://store.flamingoyachtcharters.net/products/bachelorette-package",
      ["Captain Hats", "Themed Floats", "Floating Mat", "Alcohol Order Pickup", "Large Charcuterie Board or Fruit Platter", "Essentials Package"]
    ),
    "Watersports Package": renderPackageTemplate(
      "Watersports",
      "https://store.flamingoyachtcharters.net/products/water-sports-package",
      ["Sea Bob", "Floating Mat", "Inflatable Toys", "Paddle Board", "Watersports Lifevests", "Inflatable Trampoline (Premium Vessels Only)", "Tubing (optional)"]
    ),
    "Cocktail Package": renderPackageTemplate(
      "Cocktail",
      "https://store.flamingoyachtcharters.net/products/alcohol-package",
      ["Soda", "Mixers", "Blender", "Ice", "Cups and Appropriate Glassware", "Alcohol Order Pickup", "Bartender (optional)"]
    ),
    "Lunch Package": renderPackageTemplate(
      "Lunch",
      "https://store.flamingoyachtcharters.net/",
      ["Mixed Sub Platter", "Hot Dogs (Premium Vessels Only)", "Soda", "Chips", "Snack Basket", "Veggie Platter"]
    )
  };

  const SHARED_INCLUDED = [
    "The basic vessel booking includes your vessel allocation, crew allocation, fuel, taxes, dockage fees, and bottled water. All other additions would be entirely dependent on your selected add-ons."
  ];

  const PICKUP_LOCATIONS = {
    esplanade: {
      name: "Esplanade",
      address: "400 SW 2nd St, Fort Lauderdale, FL 33312",
      parkingInstructions: "Street parking is available, and a parking garage is located directly across the street. Please walk through the park and towards the docks found along the river."
    },
    oneHundredP: {
      name: "100P",
      address: "908 NE 20th Ave, Fort Lauderdale, FL 33304",
      parkingInstructions: "Street parking is available, and there is a parking lot located directly across the street by the Big Louis Pizzeria. Walk through the white gate with the \"100 Pro Boats\" signage and towards the docks behind the property."
    },
    galleryOne: {
      name: "Gallery One",
      address: "2670 E Sunrise Blvd, Fort Lauderdale, FL 33304",
      parkingInstructions: "Valet parking is available. Walk straight through the lobby and towards the docks in the back."
    },
    vgHouse: {
      name: "VG-house",
      address: "1401 SW 11th Pl, Fort Lauderdale, FL 33312",
      parkingInstructions: "Parking is available for four cars, vessel is located behind a house. After arriving, contact your captain so that they can lead you to the vessel."
    }
  };

  const CUSTOM_LOCATIONS = [
    {
      name: "New River",
      address: "400 SW 2nd St, Fort Lauderdale, FL 33312",
      instructions: "Street parking is available, and a parking garage is located directly across the street. Please walk through the park and towards the docks found along the river."
    },
    {
      name: "Gallery one",
      address: "2670 E Sunrise Blvd, Fort Lauderdale, FL 33304",
      instructions: "Valet parking is available. Walk straight through the lobby and towards the docks in the back."
    },
    {
      name: "Maestros",
      address: "3000 NE 32nd Ave, Fort Lauderdale, FL 33308",
      instructions: "The restaurant offers both self-parking and valet. Walk through the restaurant and towards the docks in the back."
    },
    {
      name: "Shooters",
      address: "3033 NE 32nd Ave, Fort Lauderdale, FL 33308",
      instructions: "The restaurant offers both self-parking and valet. Walk through the restaurant and towards the docks in the back."
    },
    {
      name: "Bokampers",
      address: "3115 NE 32nd Ave, Fort Lauderdale, FL 33308",
      instructions: "Valet your car and walk towards the docks in the back."
    },
    {
      name: "Private residence",
      address: "Varied",
      instructions: "Please make sure that you have already reached out to confirm that the selected vessel can dock at residence."
    }
  ];

  const GUEST_LIMIT_MESSAGE = [
    "Our charters must follow the legal maximum that is enforced by the USCG regulations. The regulations apply to vessels under charter and the limit has nothing to do with the vessel size.",
    "The legal maximum is 12 plus the primary renter. If you, the signer, are on board, you can have an additional 12 guests on board, giving a maximum of 13 guests.",
    "Children of all ages are considered guests."
  ];

  const PANEL_TRANSITION_MS = 180;
  const ASSET_PREFIX = "";

  const BOAT_SEEDS = [
    { name: "VG", slug: "vg", accent: "#d7859d", length: "Length: 62 ft", guests: "Guest capacity: 13 Guests*", pickupLocationKey: "vgHouse", imagePaths: ["/assets/imgs/VG/VG (1).webp", "/assets/imgs/VG/VG (10).webp", "/assets/imgs/VG/VG (11).webp", "/assets/imgs/VG/VG (12).webp", "/assets/imgs/VG/VG (2).webp", "/assets/imgs/VG/VG (3).webp", "/assets/imgs/VG/VG (4).webp", "/assets/imgs/VG/VG (5).webp", "/assets/imgs/VG/VG (6).webp", "/assets/imgs/VG/VG (7).webp", "/assets/imgs/VG/VG (8).webp", "/assets/imgs/VG/VG (9).webp"] },
    { name: "Fountaine Pajot", slug: "fountaine-pajot", accent: "#b08d57", length: "Length: 58 ft", guests: "Guest capacity: 13 Guests*", pickupLocationKey: "galleryOne", imagePaths: ["/assets/imgs/FP/FP1.webp", "/assets/imgs/FP/FP10.webp", "/assets/imgs/FP/FP11.webp", "/assets/imgs/FP/FP12.webp", "/assets/imgs/FP/FP2.webp", "/assets/imgs/FP/FP3.webp", "/assets/imgs/FP/FP4.webp", "/assets/imgs/FP/FP5.webp", "/assets/imgs/FP/FP6.webp", "/assets/imgs/FP/FP7.webp", "/assets/imgs/FP/FP8.webp", "/assets/imgs/FP/FP9.webp"] },
    { name: "Searay", slug: "searay", accent: "#2f6882", length: "Length: 52 ft", guests: "Guest capacity: 13 Guests*", pickupLocationKey: "esplanade", imagePaths: ["/assets/imgs/Searay/Searay1.webp", "/assets/imgs/Searay/Searay10.webp", "/assets/imgs/Searay/Searay11.webp", "/assets/imgs/Searay/Searay12.webp", "/assets/imgs/Searay/Searay2.webp", "/assets/imgs/Searay/Searay3.webp", "/assets/imgs/Searay/Searay4.webp", "/assets/imgs/Searay/Searay5.webp", "/assets/imgs/Searay/Searay6.webp", "/assets/imgs/Searay/Searay7.webp", "/assets/imgs/Searay/Searay8.webp", "/assets/imgs/Searay/Searay9.webp"] },
    { name: "Fairline", slug: "fairline", accent: "#7d8fa3", length: "Length: 48 ft", guests: "Guest capacity: 13 Guests*", pickupLocationKey: "esplanade", imagePaths: ["/assets/imgs/Fairline/Fairline1.webp", "/assets/imgs/Fairline/Fairline10.webp", "/assets/imgs/Fairline/Fairline11.webp", "/assets/imgs/Fairline/Fairline12.webp", "/assets/imgs/Fairline/Fairline2.webp", "/assets/imgs/Fairline/Fairline3.webp", "/assets/imgs/Fairline/Fairline4.webp", "/assets/imgs/Fairline/Fairline5.webp", "/assets/imgs/Fairline/Fairline6.webp", "/assets/imgs/Fairline/Fairline7.webp", "/assets/imgs/Fairline/Fairline8.webp", "/assets/imgs/Fairline/Fairline9.webp"] },
    { name: "Savannah", slug: "savannah", accent: "#cc8d68", length: "Length: 58 ft", guests: "Guest capacity: 13 Guests*", pickupLocationKey: "oneHundredP", imagePaths: ["/assets/imgs/Savannah/Savannah1.webp", "/assets/imgs/Savannah/Savannah10.webp", "/assets/imgs/Savannah/Savannah11.webp", "/assets/imgs/Savannah/Savannah12.webp", "/assets/imgs/Savannah/Savannah2.webp", "/assets/imgs/Savannah/Savannah3.webp", "/assets/imgs/Savannah/Savannah4.webp", "/assets/imgs/Savannah/Savannah5.webp", "/assets/imgs/Savannah/Savannah6.webp", "/assets/imgs/Savannah/Savannah7.webp", "/assets/imgs/Savannah/Savannah8.webp", "/assets/imgs/Savannah/Savannah9.webp"] },
    { name: "Pardo", slug: "pardo", accent: "#6f8796", length: "Length: 49 ft", guests: "Guest capacity: 13 Guests*", pickupLocationKey: "oneHundredP", imagePaths: ["/assets/imgs/Pardo/Pardo01.webp", "/assets/imgs/Pardo/Pardo02.webp", "/assets/imgs/Pardo/Pardo03.webp", "/assets/imgs/Pardo/Pardo04.webp", "/assets/imgs/Pardo/Pardo05.webp", "/assets/imgs/Pardo/Pardo06.webp", "/assets/imgs/Pardo/Pardo07.webp", "/assets/imgs/Pardo/Pardo08.webp", "/assets/imgs/Pardo/Pardo09.webp", "/assets/imgs/Pardo/Pardo10.webp", "/assets/imgs/Pardo/Pardo11.webp", "/assets/imgs/Pardo/Pardo12.webp"] },
    { name: "Sunreef", slug: "sunreef", accent: "#b77a92", length: "Length: 60 ft", guests: "Guest capacity: 13 Guests*", pickupLocationKey: "galleryOne", imagePaths: ["/assets/imgs/Sunreef/Sunreef01.webp", "/assets/imgs/Sunreef/Sunreef02.webp", "/assets/imgs/Sunreef/Sunreef03.webp", "/assets/imgs/Sunreef/Sunreef04.webp", "/assets/imgs/Sunreef/Sunreef05.webp", "/assets/imgs/Sunreef/Sunreef06.webp", "/assets/imgs/Sunreef/Sunreef07.webp", "/assets/imgs/Sunreef/Sunreef08.webp", "/assets/imgs/Sunreef/Sunreef09.webp"] },
    { name: "Axopar", slug: "axopar", accent: "#6a8b86", length: "Length: 37 ft", guests: "Guest capacity: 10 guests", pickupLocationKey: "oneHundredP", imagePaths: ["/assets/imgs/Axopar/Axopar01.webp", "/assets/imgs/Axopar/Axopar04.webp", "/assets/imgs/Axopar/Axopar05.webp", "/assets/imgs/Axopar/Axopar06.webp"] },
    { name: "Criscraft", slug: "criscraft", accent: "#a87354", length: "Length: 34 ft", guests: "Guest capacity: 6 guests", pickupLocationKey: "esplanade", imagePaths: ["/assets/imgs/ChrisCraft/Chriscraft01.webp", "/assets/imgs/ChrisCraft/Chriscraft02.webp", "/assets/imgs/ChrisCraft/Chriscraft03.webp", "/assets/imgs/ChrisCraft/Chriscraft04.webp", "/assets/imgs/ChrisCraft/Chriscraft05.webp", "/assets/imgs/ChrisCraft/Chriscraft06.webp", "/assets/imgs/ChrisCraft/Chriscraft07.webp", "/assets/imgs/ChrisCraft/Chriscraft08.webp", "/assets/imgs/ChrisCraft/Chriscraft09.webp"] },
    { name: "Formula", slug: "formula", accent: "#6e83b3", length: "Length: 40 ft", guests: "Guest capacity: 10 guests", pickupLocationKey: "esplanade", imagePaths: ["/assets/imgs/Formula40PC/Formula01.webp", "/assets/imgs/Formula40PC/Formula02.webp", "/assets/imgs/Formula40PC/Formula03.webp", "/assets/imgs/Formula40PC/Formula04.webp", "/assets/imgs/Formula40PC/Formula05.webp", "/assets/imgs/Formula40PC/Formula06.webp"] },
    { name: "Greenline", slug: "greenline", accent: "#6c8a5c", length: "Length: 39 ft", guests: "Guest capacity: 12 guests", pickupLocationKey: "oneHundredP", imagePaths: ["/assets/imgs/Greenline/Greenline01.webp", "/assets/imgs/Greenline/Greenline02.webp", "/assets/imgs/Greenline/Greenline03.webp", "/assets/imgs/Greenline/Greenline04.webp", "/assets/imgs/Greenline/Greenline05.webp", "/assets/imgs/Greenline/Greenline06.webp"] },
    { name: "Rinker", slug: "rinker", accent: "#8b7a69", length: "Length: 37 ft", guests: "Guest capacity: 12 guests", pickupLocationKey: "oneHundredP", imagePaths: ["/assets/imgs/Rinker/Rinker01.webp", "/assets/imgs/Rinker/Rinker02.webp", "/assets/imgs/Rinker/Rinker03.webp", "/assets/imgs/Rinker/Rinker04.webp", "/assets/imgs/Rinker/Rinker05.webp", "/assets/imgs/Rinker/Rinker06.webp"] },
    { name: "Starcraft", slug: "starcraft", accent: "#6e7e99", length: "Length: 24 ft", guests: "Guest capacity: 12 guests", pickupLocationKey: "oneHundredP", imagePaths: ["/assets/imgs/Starcraft/Starcraft01.webp", "/assets/imgs/Starcraft/Starcraft02.webp", "/assets/imgs/Starcraft/Starcraft03.webp", "/assets/imgs/Starcraft/Starcraft04.webp", "/assets/imgs/Starcraft/Starcraft05.webp", "/assets/imgs/Starcraft/Starcraft06.webp"] }
  ];

  function escapeXml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function renderCartIcon() {
    return [
      "<span class='package-link-icon' aria-hidden='true'>",
      "<svg viewBox='0 0 24 24' focusable='false'>",
      "<circle cx='9' cy='20' r='1.5' fill='currentColor'></circle>",
      "<circle cx='17' cy='20' r='1.5' fill='currentColor'></circle>",
      "<path d='M3 4h2l2.1 9.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 7H7' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'></path>",
      "</svg>",
      "</span>"
    ].join("");
  }

  function renderPackageTemplate(name, href, items) {
    return [
      "<ul>" + items.map(function (item) {
        return "<li>" + item + "</li>";
      }).join("") + "</ul>",
      `<a class="package-link" href="${href}" target="_blank" rel="noopener noreferrer"><span>Purchase ${name} Package</span>${renderCartIcon()}</a>`
    ].join("");
  }

  function buildMapEmbedUrl(address) {
    return "https://maps.google.com/maps?q=" + encodeURIComponent(address) + "&t=&z=15&ie=UTF8&iwloc=&output=embed";
  }

  function buildMapsLink(address) {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(address);
  }

  function extractStreetAddress(address) {
    return String(address).split(",")[0].trim();
  }

  function renderCustomLocations() {
    return [
      "<div class='map-frame map-panel map-panel-custom' data-map-panel='custom' hidden>",
      "<div class='custom-locations'>",
      CUSTOM_LOCATIONS.map(function (location) {
        return [
          "<article class='custom-location-card'>",
          `<p class='custom-location-name'>${escapeXml(location.name)}</p>`,
          `<p class='custom-location-address'>${escapeXml(location.address)}</p>`,
          `<p class='custom-location-copy'>${escapeXml(location.instructions)}</p>`,
          "</article>"
        ].join("");
      }).join(""),
      "</div>",
      "</div>"
    ].join("");
  }

  function renderGuestLimitMessage() {
    return [
      "<div class='gallery-stage gallery-stage-info gallery-panel' data-gallery-panel='custom' data-panel-state='hidden' hidden>",
      "<div class='guest-limit-copy'>",
      GUEST_LIMIT_MESSAGE.map(function (paragraph) {
        return `<p>${escapeXml(paragraph)}</p>`;
      }).join(""),
      "</div>",
      "</div>"
    ].join("");
  }

  function renderGuestCapacity(boat) {
    if (boat.guestCapacityLabel !== "Guest capacity: 13 Guests*") {
      return `<li>${escapeXml(boat.guestCapacityLabel)}</li>`;
    }

    return "<li>Guest capacity: <button class='guest-limit-trigger' type='button' data-guest-limit-trigger aria-expanded='false'>13 Guests*</button></li>";
  }

  function renderQuestionBar(boat) {
    return [
      "<section class='faq-contact-bar' data-faq-question-bar>",
      "<p class='faq-contact-copy'>New Question?</p>",
      "<form class='faq-contact-form' data-faq-question-form action='../assets/contact.php' method='post' novalidate>",
      "<input type='hidden' name='form_type' value='faq_question' />",
      `<input type='hidden' name='boat_name' value='${escapeXml(boat.name)}' />`,
      "<input class='faq-contact-field faq-contact-date' type='date' name='trip_date' aria-label='Date' required />",
      "<select class='faq-contact-field faq-contact-time' name='start_time' aria-label='Start time' required>",
      "<option value='' selected disabled>Start time</option>",
      renderTimeOptions(),
      "</select>",
      "<textarea class='faq-contact-field faq-contact-question' name='question' rows='1' placeholder='Question' aria-label='Question' required></textarea>",
      "<button class='package-link faq-contact-submit' type='submit'>Ask</button>",
      "<p class='faq-contact-status' data-faq-question-status aria-live='polite'></p>",
      "</form>",
      "</section>"
    ].join("");
  }

  function renderTimeOptions() {
    const options = [];
    for (let hour = 0; hour < 24; hour += 1) {
      for (let minute = 0; minute < 60; minute += 30) {
        const value = String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0");
        const suffix = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12;
        const label = hour12 + ":" + String(minute).padStart(2, "0") + " " + suffix;
        options.push(`<option value="${value}">${label}</option>`);
      }
    }
    return options.join("");
  }

  function createBoat(seed) {
    const pickupLocation = PICKUP_LOCATIONS[seed.pickupLocationKey];
    const images = seed.imagePaths.map(function (path, imageIndex) {
      return {
        src: ASSET_PREFIX + path,
        alt: seed.name + " photo " + (imageIndex + 1),
        label: "Photo " + (imageIndex + 1)
      };
    });

    return {
      name: seed.name,
      slug: seed.slug,
      accent: seed.accent,
      images: images,
      pickupLocationName: pickupLocation.name,
      pickupEmbedUrl: buildMapEmbedUrl(pickupLocation.address),
      pickupAddress: pickupLocation.address,
      pickupStreetAddress: extractStreetAddress(pickupLocation.address),
      pickupMapsUrl: buildMapsLink(pickupLocation.address),
      pickupParkingInstructions: pickupLocation.parkingInstructions,
      lengthLabel: seed.length,
      guestCapacityLabel: seed.guests,
      hasGuestLimitMessage: seed.guests === "Guest capacity: 13 Guests*",
      includedItems: SHARED_INCLUDED.slice(),
      packageContent: {
        "Essentials Package": PACKAGE_TEMPLATES["Essentials Package"],
        "Bachelorette Package": PACKAGE_TEMPLATES["Bachelorette Package"],
        "Watersports Package": PACKAGE_TEMPLATES["Watersports Package"],
        "Cocktail Package": PACKAGE_TEMPLATES["Cocktail Package"],
        "Lunch Package": PACKAGE_TEMPLATES["Lunch Package"]
      }
    };
  }

  const BOATS = BOAT_SEEDS.map(createBoat);
  const BOAT_BY_SLUG = BOATS.reduce(function (acc, boat) {
    acc[boat.slug] = boat;
    return acc;
  }, {});

  function renderHomePage() {
    const grid = document.querySelector("[data-boat-grid]");
    if (!grid) return;

    grid.innerHTML = BOATS.map(function (boat) {
      return [
        `<a class="orb-card" href="boats/${boat.slug}.html" style="--boat-accent:${boat.accent};" aria-label="Open ${boat.name} FAQ page">`,
        `<div class="orb-media"><img src="${boat.images[0].src}" alt="${boat.images[0].alt}" loading="lazy" /></div>`,
        `<div class="orb-name">${boat.name}</div>`,
        "</a>"
      ].join("");
    }).join("");
  }

  function renderBoatPage() {
    const root = document.querySelector("[data-boat-root]");
    const slug = document.body.getAttribute("data-boat-slug");
    if (!root || !slug) return;

    const boat = BOAT_BY_SLUG[slug];
    if (!boat) {
      root.innerHTML = "<section class='panel empty-state'><h1>Boat not found</h1><p>This FAQ page is missing a matching boat entry in the shared data.</p></section>";
      return;
    }

    document.title = boat.name + " FAQ | Flamingo Yacht Charters";

    root.innerHTML = [
      "<section class='boat-layout'>",
      "<article class='panel info-card boat-map'>",
      `<h2 class='pickup-title'>Pickup: <a class='pickup-link' href='${escapeXml(boat.pickupMapsUrl)}' target='_blank' rel='noopener noreferrer' aria-label='Open ${escapeXml(boat.pickupAddress)} in Google Maps'>${escapeXml(boat.pickupStreetAddress)}</a></h2>`,
      `<div class='map-viewer' data-map-switcher data-map-view='default'>`,
      `<div class='map-frame map-panel' data-map-panel='default'><iframe src="${boat.pickupEmbedUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${boat.name} pickup map"></iframe></div>`,
      renderCustomLocations(),
      "</div>",
      "<p class='address-label'>Parking Instructions</p>",
      `<p class='address-copy'>${boat.pickupParkingInstructions}</p>`,
      "<button class='custom-location-trigger' type='button' data-custom-location-trigger aria-expanded='false'>Did you choose a custom pickup location?</button>",
      "</article>",
      "<article class='panel info-card boat-gallery'>",
      `<h2>${boat.name}</h2>`,
      renderGallery(boat),
      `<ul class='spec-list'><li>${escapeXml(boat.lengthLabel)}</li>${renderGuestCapacity(boat)}</ul>`,
      "<a class='package-link' href='https://flamingoyachtcharters.com/contact/' target='_blank' rel='noopener noreferrer'>modify/upgrade booking</a>",
      "</article>",
      "<section class='double-grid boat-lists'>",
      "<article class='panel list-card'>",
      "<h2>What's included</h2>",
      renderList(boat.includedItems),
      "<a class='addon-link' href='https://store.flamingoyachtcharters.net/' target='_blank' rel='noopener noreferrer' aria-label='Open add-ons store'>",
      "<img src='/assets/imgs/Addon-CTA.webp' alt='Shop add-ons' width='2752' height='1536' loading='lazy' />",
      "</a>",
      "</article>",
      "<article class='panel faq-card'>",
      "<h2>Purchased a package?</h2>",
      renderAccordion("packages", boat.packageContent, true),
      "</article>",
      "</section>",
      renderQuestionBar(boat),
      "<section class='panel faq-card boat-faq'>",
      renderFaqAccordion("general", GENERAL_FAQ),
      "</section>",
      "</section>"
    ].join("");

    bindGallery(root, boat);
    bindGuestLimitGallery(root, boat);
    bindAccordions(root);
    bindCustomLocationMap(root);
    bindQuestionBar(root);
  }

  function renderList(items) {
    return "<ul class='copy-list copy-list-plain'>" + items.map(function (item) {
      return "<li>" + item + "</li>";
    }).join("") + "</ul>";
  }

  function renderGallery(boat) {
    const controlsDisabled = boat.images.length <= 1 ? " disabled" : "";

    return [
      `<div class="gallery-widget" data-gallery data-gallery-view="default" data-boat="${boat.slug}" style="--boat-accent:${boat.accent};">`,
      `<div class="gallery-stage gallery-panel" data-gallery-panel="default" data-panel-state="visible" tabindex="0">`,
      `<img data-gallery-image src="${boat.images[0].src}" alt="${boat.images[0].alt}" />`,
      "<div class='gallery-overlay'>",
      "<div class='gallery-controls'>",
      `<button class="gallery-button" type="button" data-gallery-prev aria-label="Previous image"${controlsDisabled}>&lsaquo;</button>`,
      `<button class="gallery-button" type="button" data-gallery-next aria-label="Next image"${controlsDisabled}>&rsaquo;</button>`,
      "</div>",
      "</div>",
      "</div>",
      boat.hasGuestLimitMessage ? renderGuestLimitMessage() : "",
      "</div>"
    ].join("");
  }

  function renderAccordion(prefix, contentMap, collapsed) {
    return [
      `<div class="accordion-group" data-accordion-group="${prefix}">`,
      Object.keys(contentMap).map(function (title, index) {
        const panelId = prefix + "-panel-" + index;
        const triggerId = prefix + "-trigger-" + index;
        const expanded = collapsed ? "false" : index === 0 ? "true" : "false";
        const hidden = expanded === "true" ? "" : " hidden";
        return [
          "<article class='accordion-item'>",
          `<button class="accordion-trigger" id="${triggerId}" type="button" aria-expanded="${expanded}" aria-controls="${panelId}">`,
          `<span class="accordion-title">${title}</span>`,
          "<span class='accordion-icon' aria-hidden='true'>+</span>",
          "</button>",
          `<div class="accordion-panel" id="${panelId}" role="region" aria-labelledby="${triggerId}"${hidden}>`,
          contentMap[title],
          "</div>",
          "</article>"
        ].join("");
      }).join(""),
      "</div>"
    ].join("");
  }

  function renderFaqAccordion(prefix, items) {
    const mapped = items.reduce(function (acc, item) {
      acc[item.question] = item.answer;
      return acc;
    }, {});
    return renderAccordion(prefix, mapped, true);
  }

  function bindGallery(root, boat) {
    const gallery = root.querySelector("[data-gallery]");
    if (!gallery) return;

    const stage = gallery.querySelector(".gallery-stage");
    const image = gallery.querySelector("[data-gallery-image]");
    const prev = gallery.querySelector("[data-gallery-prev]");
    const next = gallery.querySelector("[data-gallery-next]");
    let index = 0;
    let touchStartX = 0;
    let touchStartY = 0;

    function render(nextIndex) {
      index = nextIndex;
      const item = boat.images[index];
      image.src = item.src;
      image.alt = item.alt;
    }

    function step(direction) {
      if (boat.images.length <= 1) return;
      const nextIndex = (index + direction + boat.images.length) % boat.images.length;
      render(nextIndex);
    }

    prev.addEventListener("click", function () {
      step(-1);
    });

    next.addEventListener("click", function () {
      step(1);
    });

    stage.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      }
    });

    stage.addEventListener("touchstart", function (event) {
      const point = event.changedTouches && event.changedTouches[0];
      if (!point) return;
      touchStartX = point.clientX;
      touchStartY = point.clientY;
    }, { passive: true });

    stage.addEventListener("touchend", function (event) {
      const point = event.changedTouches && event.changedTouches[0];
      if (!point) return;
      const deltaX = point.clientX - touchStartX;
      const deltaY = point.clientY - touchStartY;
      if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) return;
      step(deltaX < 0 ? 1 : -1);
    }, { passive: true });
  }

  function bindAccordions(root) {
    Array.from(root.querySelectorAll("[data-accordion-group]")).forEach(function (group) {
      const triggers = Array.from(group.querySelectorAll(".accordion-trigger"));
      triggers.forEach(function (trigger) {
        trigger.addEventListener("click", function () {
          const isExpanded = trigger.getAttribute("aria-expanded") === "true";
          triggers.forEach(function (otherTrigger) {
            const panel = document.getElementById(otherTrigger.getAttribute("aria-controls"));
            if (!panel) return;
            otherTrigger.setAttribute("aria-expanded", "false");
            panel.hidden = true;
          });

          if (!isExpanded) {
            const panel = document.getElementById(trigger.getAttribute("aria-controls"));
            if (!panel) return;
            trigger.setAttribute("aria-expanded", "true");
            panel.hidden = false;
          }
        });
      });
    });
  }

  function createPanelFader(defaultPanel, customPanel) {
    let hideTimer = 0;

    if (defaultPanel) {
      defaultPanel.setAttribute("data-panel-state", defaultPanel.hidden ? "hidden" : "visible");
    }

    if (customPanel) {
      customPanel.setAttribute("data-panel-state", customPanel.hidden ? "hidden" : "visible");
    }

    return function setCustomVisible(showCustom) {
      const nextPanel = showCustom ? customPanel : defaultPanel;
      const previousPanel = showCustom ? defaultPanel : customPanel;

      window.clearTimeout(hideTimer);

      if (nextPanel) {
        nextPanel.hidden = false;
        nextPanel.setAttribute("data-panel-state", "hidden");
      }

      if (previousPanel) {
        previousPanel.hidden = false;
      }

      window.requestAnimationFrame(function () {
        if (nextPanel) {
          nextPanel.setAttribute("data-panel-state", "visible");
        }

        if (previousPanel) {
          previousPanel.setAttribute("data-panel-state", "hidden");
        }
      });

      hideTimer = window.setTimeout(function () {
        if (previousPanel) {
          previousPanel.hidden = true;
        }
      }, PANEL_TRANSITION_MS);
    };
  }

  function bindCustomLocationMap(root) {
    const switcher = root.querySelector("[data-map-switcher]");
    const trigger = root.querySelector("[data-custom-location-trigger]");
    if (!switcher || !trigger) return;

    const defaultPanel = switcher.querySelector("[data-map-panel='default']");
    const customPanel = switcher.querySelector("[data-map-panel='custom']");
    const mapCard = trigger.closest(".boat-map");
    const hoverQuery = typeof window.matchMedia === "function"
      ? window.matchMedia("(hover: hover) and (pointer: fine)")
      : { matches: false };
    const fadePanels = createPanelFader(defaultPanel, customPanel);

    function setView(view) {
      const isCustom = view === "custom";
      if (switcher.getAttribute("data-map-view") === view) return;
      switcher.setAttribute("data-map-view", view);
      trigger.setAttribute("aria-expanded", String(isCustom));
      fadePanels(isCustom);
    }

    if (hoverQuery.matches) {
      trigger.addEventListener("mouseenter", function () {
        setView("custom");
      });

      trigger.addEventListener("focus", function () {
        setView("custom");
      });

      trigger.addEventListener("blur", function () {
        setView("default");
      });

      if (mapCard) {
        mapCard.addEventListener("mouseleave", function () {
          setView("default");
        });
      }
      return;
    }

    trigger.addEventListener("click", function () {
      const nextView = switcher.getAttribute("data-map-view") === "custom" ? "default" : "custom";
      setView(nextView);
    });
  }

  function bindGuestLimitGallery(root, boat) {
    if (!boat.hasGuestLimitMessage) return;

    const gallery = root.querySelector("[data-gallery]");
    const trigger = root.querySelector("[data-guest-limit-trigger]");
    if (!gallery || !trigger) return;

    const defaultPanel = gallery.querySelector("[data-gallery-panel='default']");
    const customPanel = gallery.querySelector("[data-gallery-panel='custom']");
    const galleryCard = gallery.closest(".boat-gallery");
    const hoverQuery = typeof window.matchMedia === "function"
      ? window.matchMedia("(hover: hover) and (pointer: fine)")
      : { matches: false };
    const fadePanels = createPanelFader(defaultPanel, customPanel);

    function setView(view) {
      const isCustom = view === "custom";
      if (gallery.getAttribute("data-gallery-view") === view) return;
      gallery.setAttribute("data-gallery-view", view);
      trigger.setAttribute("aria-expanded", String(isCustom));
      fadePanels(isCustom);
    }

    if (hoverQuery.matches) {
      trigger.addEventListener("mouseenter", function () {
        setView("custom");
      });

      trigger.addEventListener("focus", function () {
        setView("custom");
      });

      trigger.addEventListener("blur", function () {
        setView("default");
      });

      if (galleryCard) {
        galleryCard.addEventListener("mouseleave", function () {
          setView("default");
        });
      }
      return;
    }

    trigger.addEventListener("click", function () {
      const nextView = gallery.getAttribute("data-gallery-view") === "custom" ? "default" : "custom";
      setView(nextView);
    });
  }

  function bindQuestionBar(root) {
    const form = root.querySelector("[data-faq-question-form]");
    const status = root.querySelector("[data-faq-question-status]");
    const question = form ? form.querySelector(".faq-contact-question") : null;
    if (!form || !status || !question) return;

    function resizeQuestionField() {
      question.style.height = "auto";
      question.style.height = question.scrollHeight + "px";
    }

    question.addEventListener("input", resizeQuestionField);
    resizeQuestionField();

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      status.textContent = "";

      if (!form.reportValidity()) return;

      const submit = form.querySelector(".faq-contact-submit");
      if (submit) submit.disabled = true;

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        }
      }).then(function (response) {
        return response.json();
      }).then(function (payload) {
        status.textContent = payload && payload.message ? payload.message : "Question sent.";
        status.setAttribute("data-state", payload && payload.success ? "success" : "error");
        if (payload && payload.success) {
          form.reset();
          resizeQuestionField();
        }
      }).catch(function () {
        status.textContent = "Question failed to send. Try again later.";
        status.setAttribute("data-state", "error");
      }).finally(function () {
        if (submit) submit.disabled = false;
      });
    });
  }

  if (document.body.getAttribute("data-page") === "home") {
    renderHomePage();
  }

  if (document.body.getAttribute("data-page") === "boat") {
    renderBoatPage();
  }
})();
