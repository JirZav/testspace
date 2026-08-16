(() => {
  const header = document.querySelector('[data-header]');
  const navLinks = [...document.querySelectorAll('.site-nav a')];
  const observedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`);
    });
  }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.45] });
  observedSections.forEach((section) => sectionObserver.observe(section));

  const voices = [...document.querySelectorAll('.voice')];
  const voiceStatus = document.querySelector('[data-voice-status]');
  let voiceIndex = 0;
  const showVoice = (nextIndex) => {
    if (!voices.length) return;
    voiceIndex = (nextIndex + voices.length) % voices.length;
    voices.forEach((voice, index) => voice.classList.toggle('is-active', index === voiceIndex));
    if (voiceStatus) voiceStatus.textContent = `${voiceIndex + 1} / ${voices.length}`;
  };
  document.querySelector('[data-voice-prev]')?.addEventListener('click', () => showVoice(voiceIndex - 1));
  document.querySelector('[data-voice-next]')?.addEventListener('click', () => showVoice(voiceIndex + 1));

  const dialog = document.querySelector('[data-lightbox-dialog]');
  const dialogImage = document.querySelector('[data-lightbox-image]');
  const openLightbox = (button) => {
    if (!dialog || !dialogImage) return;
    const thumbnail = button.querySelector('img');
    dialogImage.src = button.dataset.lightbox;
    dialogImage.alt = thumbnail?.alt || 'Zvětšený historický snímek';
    dialog.showModal();
  };
  document.querySelectorAll('[data-lightbox]').forEach((button) => {
    button.addEventListener('click', () => openLightbox(button));
  });
  document.querySelector('[data-lightbox-close]')?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
})();
