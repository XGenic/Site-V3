(function () {
  const bookingTarget = document.querySelector('[data-service-inline-booking]');
  if (!bookingTarget) return;

  const calendarScript = bookingTarget.querySelector('script[src*="fareharbor.com/embeds/script/calendar"]');
  if (!calendarScript) return;

  bookingTarget.hidden = false;
})();
