(function () {
  const carousel = document.querySelector('[data-home-carousel]');
  const track = document.querySelector('[data-home-progress]');
  const thumb = document.querySelector('[data-home-progress-thumb]');

  if (!carousel || !track || !thumb) return;

  let isProgressDragging = false;

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

  updateProgress();
})();
