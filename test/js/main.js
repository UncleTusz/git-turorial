const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const bookingForm = document.getElementById('bookingForm');
const galleryTrack = document.getElementById('galleryTrack');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

if (bookingForm) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('感谢您的预约，Regina 团队将尽快与您联系。');
  });
}

function initGalleryScroll() {
  if (!galleryTrack || !galleryPrev || !galleryNext) return;

  const scrollStep = () => {
    const item = galleryTrack.querySelector('.gallery__item');
    if (!item) return galleryTrack.clientWidth * 0.8;
    const styles = getComputedStyle(galleryTrack);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;
    return item.offsetWidth + gap;
  };

  const updateGalleryNav = () => {
    const maxScroll = galleryTrack.scrollWidth - galleryTrack.clientWidth;
    galleryPrev.disabled = galleryTrack.scrollLeft <= 1;
    galleryNext.disabled = galleryTrack.scrollLeft >= maxScroll - 1;
  };

  galleryPrev.addEventListener('click', () => {
    galleryTrack.scrollBy({ left: -scrollStep(), behavior: 'smooth' });
  });

  galleryNext.addEventListener('click', () => {
    galleryTrack.scrollBy({ left: scrollStep(), behavior: 'smooth' });
  });

  galleryTrack.addEventListener('scroll', updateGalleryNav, { passive: true });
  window.addEventListener('resize', updateGalleryNav);
  updateGalleryNav();
}

initGalleryScroll();

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
reveals.forEach((el) => observer.observe(el));
