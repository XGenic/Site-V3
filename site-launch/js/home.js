(function () {
  const carousel = document.querySelector('[data-home-carousel]');
  const track = document.querySelector('[data-home-progress-track]');
  const thumb = document.querySelector('[data-home-progress-thumb]');

  if (!carousel || !track || !thumb) return;

  let isCarouselDragging = false;
  let isProgressDragging = false;
  let startX = 0;
  let startScrollLeft = 0;
  let suppressClick = false;

  const getMaxScroll = () => Math.max(carousel.scrollWidth - carousel.clientWidth, 0);

  const setScrollFromRatio = (ratio) => {
    carousel.scrollLeft = getMaxScroll() * Math.min(1, Math.max(0, ratio));
  };

  const updateProgress = () => {
    const maxScroll = getMaxScroll();
    const thumbWidth = thumb.offsetWidth || 1;
    const trackWidth = track.clientWidth || 1;
    const maxLeft = Math.max(trackWidth - thumbWidth, 0);
    const ratio = maxScroll ? carousel.scrollLeft / maxScroll : 0;
    const left = maxLeft * Math.min(1, Math.max(0, ratio));

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

  carousel.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  window.addEventListener('load', updateProgress);

  carousel.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    isCarouselDragging = true;
    suppressClick = false;
    startX = event.clientX;
    startScrollLeft = carousel.scrollLeft;
    carousel.classList.add('is-dragging');
    carousel.setPointerCapture(event.pointerId);
  });

  carousel.addEventListener('pointermove', (event) => {
    if (!isCarouselDragging) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 6) suppressClick = true;
    carousel.scrollLeft = startScrollLeft - delta;
  });

  const stopCarouselDrag = (event) => {
    if (!isCarouselDragging) return;
    isCarouselDragging = false;
    carousel.classList.remove('is-dragging');
    if (carousel.hasPointerCapture(event.pointerId)) {
      carousel.releasePointerCapture(event.pointerId);
    }
  };

  carousel.addEventListener('pointerup', stopCarouselDrag);
  carousel.addEventListener('pointercancel', stopCarouselDrag);
  carousel.addEventListener('click', (event) => {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick = false;
  }, true);

  const startProgressDrag = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    isProgressDragging = true;
    setScrollFromRatio(ratioFromPointer(event.clientX));
  };

  const moveProgressDrag = (event) => {
    if (!isProgressDragging) return;
    setScrollFromRatio(ratioFromPointer(event.clientX));
  };

  const stopProgressDrag = (event) => {
    if (!isProgressDragging) return;
    isProgressDragging = false;
  };

  track.addEventListener('pointerdown', startProgressDrag);
  document.addEventListener('pointermove', moveProgressDrag);
  document.addEventListener('pointerup', stopProgressDrag);
  document.addEventListener('pointercancel', stopProgressDrag);

  thumb.addEventListener('keydown', (event) => {
    const maxScroll = getMaxScroll();
    const step = carousel.clientWidth * 0.8;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      carousel.scrollLeft = Math.min(maxScroll, carousel.scrollLeft + step);
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      carousel.scrollLeft = Math.max(0, carousel.scrollLeft - step);
    }

    if (event.key === 'Home') {
      event.preventDefault();
      carousel.scrollLeft = 0;
    }

    if (event.key === 'End') {
      event.preventDefault();
      carousel.scrollLeft = maxScroll;
    }
  });

  updateProgress();
})();
