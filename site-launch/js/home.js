(function () {
  const carousel = document.querySelector('[data-home-carousel]');
  const track = document.querySelector('[data-home-progress]');
  const thumb = document.querySelector('[data-home-progress-thumb]');
  const gallery = document.querySelector('.home-general-gallery__track');

  if (!carousel || !track || !thumb) return;

  let isProgressDragging = false;
  let isCarouselPaused = false;
  let isGalleryPaused = false;
  let galleryIndex = 0;

  thumb.setAttribute('aria-valuemin', '0');
  thumb.setAttribute('aria-valuemax', '100');
  thumb.setAttribute('aria-valuenow', '0');

  const getMaxScroll = () => Math.max(carousel.scrollWidth - carousel.clientWidth, 0);

  const scrollToRatio = (ratio, behavior = 'auto') => {
    const clamped = Math.min(1, Math.max(0, ratio));
    carousel.scrollTo({
      left: getMaxScroll() * clamped,
      behavior
    });
  };

  const updateProgress = () => {
    const maxScroll = getMaxScroll();
    const thumbWidth = thumb.offsetWidth || 1;
    const trackWidth = track.clientWidth || 1;
    const maxLeft = Math.max(trackWidth - thumbWidth, 0);
    const ratio = maxScroll ? carousel.scrollLeft / maxScroll : 0;
    const left = maxLeft * Math.min(1, Math.max(0, ratio));

    track.style.setProperty('--home-progress', `${left}px`);
    thumb.style.setProperty('--home-progress', `${left}px`);
    thumb.setAttribute('aria-valuenow', String(Math.round(ratio * 100)));
  };

  const ratioFromPointer = (clientX) => {
    const rect = track.getBoundingClientRect();
    const thumbWidth = thumb.offsetWidth || 1;
    const maxLeft = Math.max(rect.width - thumbWidth, 1);
    const left = clientX - rect.left - thumbWidth / 2;
    return left / maxLeft;
  };

  const getNextCarouselLeft = () => {
    const maxScroll = getMaxScroll();
    const cards = Array.from(carousel.children);
    const currentLeft = carousel.scrollLeft;

    if (!cards.length || currentLeft >= maxScroll - 8) {
      return 0;
    }

    const nextCard = cards.find((card) => card.offsetLeft > currentLeft + 8);
    return nextCard ? Math.min(nextCard.offsetLeft, maxScroll) : 0;
  };

  const advanceCarousel = () => {
    if (isCarouselPaused || document.hidden || isProgressDragging) return;
    carousel.scrollTo({
      left: getNextCarouselLeft(),
      behavior: 'smooth'
    });
  };

  const advanceGallery = () => {
    if (!gallery || isGalleryPaused || document.hidden) return;

    const items = Array.from(gallery.querySelectorAll('img'));
    if (items.length < 2) return;

    galleryIndex = (galleryIndex + 1) % items.length;
    gallery.scrollTo({
      left: items[galleryIndex].offsetLeft - items[0].offsetLeft,
      behavior: 'smooth'
    });
  };

  const startProgressDrag = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    isProgressDragging = true;
    track.setPointerCapture(event.pointerId);
    scrollToRatio(ratioFromPointer(event.clientX));
  };

  const moveProgressDrag = (event) => {
    if (!isProgressDragging) return;
    scrollToRatio(ratioFromPointer(event.clientX));
  };

  const stopProgressDrag = (event) => {
    if (!isProgressDragging) return;
    isProgressDragging = false;
    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
  };

  carousel.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  window.addEventListener('load', updateProgress);
  carousel.addEventListener('pointerenter', () => { isCarouselPaused = true; });
  carousel.addEventListener('pointerleave', () => { isCarouselPaused = false; });
  carousel.addEventListener('focusin', () => { isCarouselPaused = true; });
  carousel.addEventListener('focusout', () => { isCarouselPaused = false; });

  if (gallery) {
    gallery.addEventListener('pointerenter', () => { isGalleryPaused = true; });
    gallery.addEventListener('pointerleave', () => { isGalleryPaused = false; });
    gallery.addEventListener('focusin', () => { isGalleryPaused = true; });
    gallery.addEventListener('focusout', () => { isGalleryPaused = false; });
    gallery.addEventListener('scroll', () => {
      const items = Array.from(gallery.querySelectorAll('img'));
      if (!items.length) return;

      const scrollLeft = gallery.scrollLeft;
      const nearest = items.reduce((best, item, index) => {
        const distance = Math.abs((item.offsetLeft - items[0].offsetLeft) - scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      }, { index: galleryIndex, distance: Infinity });

      galleryIndex = nearest.index;
    }, { passive: true });
  }

  track.addEventListener('pointerdown', startProgressDrag);
  track.addEventListener('pointermove', moveProgressDrag);
  track.addEventListener('pointerup', stopProgressDrag);
  track.addEventListener('pointercancel', stopProgressDrag);

  thumb.addEventListener('keydown', (event) => {
    const maxScroll = getMaxScroll();
    const step = carousel.clientWidth * 0.82;
    let next = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      next = Math.min(maxScroll, carousel.scrollLeft + step);
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = Math.max(0, carousel.scrollLeft - step);
    }

    if (event.key === 'Home') {
      next = 0;
    }

    if (event.key === 'End') {
      next = maxScroll;
    }

    if (next === null) return;
    event.preventDefault();
    carousel.scrollTo({ left: next, behavior: 'smooth' });
  });

  if ('ResizeObserver' in window) {
    new ResizeObserver(updateProgress).observe(carousel);
  }

  setInterval(advanceCarousel, 4200);
  setInterval(advanceGallery, 3600);
  updateProgress();
})();
