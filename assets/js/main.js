// Add to Calendar (basic implementation)
const addToCalendarBtn = document.getElementById('addToCalendar');
if (addToCalendarBtn) {
addToCalendarBtn.addEventListener('click', () => {
if (addToCalendarBtn.classList.contains('is-sliding')) {
return;
}
addToCalendarBtn.classList.add('is-sliding');
const title = 'National ICT Week 2026';
const startDate = '20260824';
const endDate = '20260828';
const location = 'Accra International Conference Centre';
const details = 'Innovation at Scale: Creating Opportunities Across Ghanaâ€™s Digital Ecosystem';

const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;

setTimeout(() => {
window.open(calendarUrl, '_blank');
addToCalendarBtn.classList.remove('is-sliding');
}, 900);
});
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
if (navToggle && siteNav) {
navToggle.addEventListener('click', () => {
const isOpen = siteNav.classList.toggle('is-open');
navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach((link) => {
link.addEventListener('click', () => {
siteNav.classList.remove('is-open');
navToggle.setAttribute('aria-expanded', 'false');
});
});
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
const observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add('is-visible');
observer.unobserve(entry.target);
}
});
}, { threshold: 0.2 });

revealEls.forEach((el) => observer.observe(el));
}

// Hero slideshow
const slides = document.querySelectorAll('.hero-slide');
let activeIndex = 0;
if (slides.length > 1) {
setInterval(() => {
slides[activeIndex].classList.remove('is-active');
activeIndex = (activeIndex + 1) % slides.length;
slides[activeIndex].classList.add('is-active');
}, 6000);
}

// 2025 highlights carousel
const gallerySlides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dots = document.querySelectorAll('.carousel-dots .dot');
let galleryIndex = 0;

const setGallerySlide = (index) => {
gallerySlides.forEach((slide, i) => {
slide.classList.toggle('is-active', i === index);
});
dots.forEach((dot, i) => {
dot.classList.toggle('is-active', i === index);
});
galleryIndex = index;
};

if (gallerySlides.length) {
const showNext = () => setGallerySlide((galleryIndex + 1) % gallerySlides.length);
const showPrev = () => setGallerySlide((galleryIndex - 1 + gallerySlides.length) % gallerySlides.length);

if (nextBtn) nextBtn.addEventListener('click', showNext);
if (prevBtn) prevBtn.addEventListener('click', showPrev);

dots.forEach((dot, i) => {
dot.addEventListener('click', () => setGallerySlide(i));
});

setInterval(showNext, 5000);
}

// Countdown timer to program start (Accra, GMT)
const targetDate = new Date('2026-08-24T09:00:00+00:00');
const countDaysEl = document.getElementById('countDays');
const countHoursEl = document.getElementById('countHours');
const countMinutesEl = document.getElementById('countMinutes');
const countSecondsEl = document.getElementById('countSeconds');

const formatTwo = (value) => String(value).padStart(2, '0');

const updateCountdown = () => {
const now = new Date();
let diff = targetDate - now;
if (diff < 0) diff = 0;

const totalSeconds = Math.floor(diff / 1000);
const days = Math.floor(totalSeconds / 86400);
const hours = Math.floor((totalSeconds % 86400) / 3600);
const minutes = Math.floor((totalSeconds % 3600) / 60);
const seconds = totalSeconds % 60;

if (countDaysEl) countDaysEl.textContent = formatTwo(days);
if (countHoursEl) countHoursEl.textContent = formatTwo(hours);
if (countMinutesEl) countMinutesEl.textContent = formatTwo(minutes);
if (countSecondsEl) countSecondsEl.textContent = formatTwo(seconds);
};

updateCountdown();
setInterval(updateCountdown, 1000);
