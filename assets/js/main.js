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

// Conference tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
if (tabButtons.length && tabPanels.length) {
tabButtons.forEach((btn) => {
btn.addEventListener('click', () => {
const target = btn.getAttribute('data-tab');
tabButtons.forEach((b) => {
b.classList.toggle('is-active', b === btn);
b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
});
tabPanels.forEach((panel) => {
panel.classList.toggle('is-active', panel.id === target);
});
});
});
}

// Program day tabs
const dayButtons = document.querySelectorAll('.day-tab-btn');
const dayPanels = document.querySelectorAll('.day-panel');
if (dayButtons.length && dayPanels.length) {
dayButtons.forEach((btn) => {
btn.addEventListener('click', () => {
const target = btn.getAttribute('data-day');
dayButtons.forEach((b) => {
b.classList.toggle('is-active', b === btn);
b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
});
dayPanels.forEach((panel) => {
panel.classList.toggle('is-active', panel.id === target);
});
});
});
}

// Registration form tabs (registration + onsite)
const formTabGroups = document.querySelectorAll('.form-tabs');
if (formTabGroups.length) {
formTabGroups.forEach((group) => {
const buttons = group.querySelectorAll('.tab-btn');
const panels = group.parentElement?.querySelectorAll('.tab-panel') || [];
if (!buttons.length || !panels.length) return;
buttons.forEach((btn) => {
btn.addEventListener('click', () => {
const target = btn.getAttribute('data-tab');
buttons.forEach((b) => {
b.classList.toggle('is-active', b === btn);
b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
});
panels.forEach((panel) => {
panel.classList.toggle('is-active', panel.id === target);
});
});
});
});
}

// Activate form tab from hash (e.g., onsite.html#onsite-checkin)
if (location.hash) {
const hashId = location.hash.replace('#', '');
const hashBtn = document.querySelector(`.form-tabs .tab-btn[data-tab="${hashId}"]`);
if (hashBtn) {
hashBtn.click();
}
}

// Theme toggle (dark / light)
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;
const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const setTheme = (mode) => {
const isDark = mode === 'dark';
root.classList.toggle('theme-dark', isDark);
if (themeToggle) {
themeToggle.setAttribute('aria-pressed', String(isDark));
themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}
};

if (storedTheme) {
setTheme(storedTheme);
} else {
setTheme(prefersDark ? 'dark' : 'light');
}

if (themeToggle) {
themeToggle.addEventListener('click', () => {
const isDark = root.classList.contains('theme-dark');
const next = isDark ? 'light' : 'dark';
setTheme(next);
localStorage.setItem('theme', next);
});
}

// Supabase form submissions (registration + onsite)
const SUPABASE_URL = 'https://wqnresijboakwznxgbll.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxbnJlc2lqYm9ha3d6bnhnYmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MjAyNjIsImV4cCI6MjA4NjI5NjI2Mn0.i8B5rkpAnWt5AxdJGZxhV7FXfE6WQfBJ1BSnnRR6HmA';

const getModal = () => {
let modal = document.querySelector('.site-modal');
if (modal) return modal;
modal = document.createElement('div');
modal.className = 'site-modal';
modal.innerHTML = `
  <div class="site-modal__backdrop" data-close="1"></div>
  <div class="site-modal__dialog" role="dialog" aria-modal="true" aria-live="polite">
    <button class="site-modal__close" type="button" data-close="1" aria-label="Close dialog">
      <span aria-hidden="true">&times;</span>
    </button>
    <h3 class="site-modal__title">Notice</h3>
    <p class="site-modal__message"></p>
    <div class="site-modal__actions"></div>
  </div>
`;
document.body.appendChild(modal);
modal.addEventListener('click', (e) => {
if (e.target.getAttribute('data-close')) {
modal.classList.remove('is-open');
}
});
return modal;
};

const showModal = ({ title, message, actions = [] }) => {
const modal = getModal();
const titleEl = modal.querySelector('.site-modal__title');
const messageEl = modal.querySelector('.site-modal__message');
const actionsEl = modal.querySelector('.site-modal__actions');
titleEl.textContent = title || 'Notice';
messageEl.textContent = message || '';
actionsEl.innerHTML = '';
actions.forEach((action) => {
const btn = document.createElement(action.href ? 'a' : 'button');
btn.className = action.className || 'btn btn-primary';
btn.textContent = action.label;
if (action.href) {
btn.href = action.href;
btn.setAttribute('role', 'button');
} else {
btn.type = 'button';
btn.addEventListener('click', () => {
if (action.onClick) action.onClick();
});
}
actionsEl.appendChild(btn);
});
modal.classList.add('is-open');
};

const forms = document.querySelectorAll('.registration-form');
if (forms.length) {
forms.forEach((form) => {
form.addEventListener('submit', async (e) => {
e.preventDefault();
const status = form.querySelector('.form-status');
if (status) status.textContent = 'Submitting...';

const data = new FormData(form);
const formType = data.get('type');

// Special case: on-site check-in should UPDATE existing record
if (formType === 'onsite-checkin') {
const name = (data.get('fullName') || '').trim();
const email = (data.get('email') || '').trim();
const phone = (data.get('telephone') || '').trim();

let query = '';
if (email) query = `email.eq.${encodeURIComponent(email)}`;
else if (phone) query = `telephone.eq.${encodeURIComponent(phone)}`;
else if (name) query = `full_name.ilike.${encodeURIComponent('%' + name + '%')}`;

if (!query) {
if (status) status.textContent = 'Please enter name, email, or phone to check in.';
return;
}

try {
const lookup = await fetch(`${SUPABASE_URL}/rest/v1/registrations?select=id&${query}`, {
headers: {
apikey: SUPABASE_ANON_KEY,
Authorization: `Bearer ${SUPABASE_ANON_KEY}`
}
});
if (!lookup.ok) throw new Error('Lookup failed');
const rows = await lookup.json();
if (!rows.length) {
if (status) status.textContent = 'Record not found. Please register first.';
return;
}
const id = rows[0].id;
const res = await fetch(`${SUPABASE_URL}/rest/v1/registrations?id=eq.${id}`, {
method: 'PATCH',
headers: {
apikey: SUPABASE_ANON_KEY,
Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
'Content-Type': 'application/json',
Prefer: 'return=minimal'
},
body: JSON.stringify({ checked_in: true, checked_in_at: new Date().toISOString() })
});
if (!res.ok) throw new Error('Check-in failed');
if (status) status.textContent = 'Checked in successfully.';
form.reset();
return;
} catch (err) {
if (status) status.textContent = 'Check-in failed. Please try again.';
return;
}
}

const payload = {
full_name: data.get('fullName'),
designation: data.get('designation'),
organization: data.get('organization'),
email: data.get('email'),
telephone: data.get('telephone'),
type: formType
};

const email = (payload.email || '').trim();
const phone = (payload.telephone || '').trim();
if (email || phone) {
let lookupUrl = `${SUPABASE_URL}/rest/v1/registrations?select=id,full_name,type`;
if (email && phone) {
lookupUrl += `&or=(email.eq.${encodeURIComponent(email)},telephone.eq.${encodeURIComponent(phone)})`;
} else if (email) {
lookupUrl += `&email=eq.${encodeURIComponent(email)}`;
} else if (phone) {
lookupUrl += `&telephone=eq.${encodeURIComponent(phone)}`;
}
lookupUrl += `&type=eq.${encodeURIComponent(formType)}`;
try {
const lookup = await fetch(lookupUrl, {
headers: {
apikey: SUPABASE_ANON_KEY,
Authorization: `Bearer ${SUPABASE_ANON_KEY}`
}
});
if (lookup.ok) {
const rows = await lookup.json();
if (rows.length) {
showModal({
title: 'Already Registered',
message: 'Your details already exist. Please check in instead.',
actions: [
{ label: 'Go to Check-In', href: 'staff-site/onsite.html#onsite-checkin', className: 'btn btn-primary' },
{ label: 'Close', className: 'btn btn-outline', onClick: () => document.querySelector('.site-modal')?.classList.remove('is-open') }
]
});
if (status) status.textContent = 'Already registered. Please check in.';
return;
}
}
} catch (err) {
// If lookup fails, continue to submit to avoid blocking registrations
}
}

try {
const res = await fetch(`${SUPABASE_URL}/rest/v1/registrations`, {
method: 'POST',
headers: {
apikey: SUPABASE_ANON_KEY,
Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
'Content-Type': 'application/json',
Prefer: 'return=minimal'
},
body: JSON.stringify(payload)
});

if (!res.ok) {
throw new Error('Submission failed');
}

showModal({
title: 'Registration Successful',
message: 'Thank you. Your registration has been saved.',
actions: [
{ label: 'Close', className: 'btn btn-primary', onClick: () => document.querySelector('.site-modal')?.classList.remove('is-open') }
]
});
if (status) status.textContent = 'Submitted successfully.';
form.reset();
} catch (err) {
if (status) status.textContent = 'Submission failed. Please try again.';
}
});
});
}

// Admin check-in view
const adminRows = document.getElementById('adminRows');
const adminSearch = document.getElementById('adminSearch');
const adminRefresh = document.getElementById('adminRefresh');
const adminExport = document.getElementById('adminExport');
const adminStatus = document.getElementById('adminStatus');

const fetchRegistrations = async (query = '') => {
if (!adminRows) return;
adminStatus.textContent = 'Loading...';
let url = `${SUPABASE_URL}/rest/v1/registrations?select=*`;
if (query) {
const q = encodeURIComponent(`%${query}%`);
url += `&or=(full_name.ilike.${q},email.ilike.${q},telephone.ilike.${q})`;
}
url += `&order=created_at.desc`;

const res = await fetch(url, {
headers: {
apikey: SUPABASE_ANON_KEY,
Authorization: `Bearer ${SUPABASE_ANON_KEY}`
}
});

if (!res.ok) {
adminStatus.textContent = 'Failed to load records.';
return;
}

const data = await res.json();
adminRows.innerHTML = '';
data.forEach((row) => {
const tr = document.createElement('tr');
tr.innerHTML = `
  <td>${row.full_name || ''}</td>
  <td>${row.designation || ''}</td>
  <td>${row.organization || ''}</td>
  <td>${row.email || ''}</td>
  <td>${row.telephone || ''}</td>
  <td>${row.type || ''}</td>
  <td>
    <button class="btn btn-outline admin-checkin" data-id="${row.id}" data-checked="${row.checked_in ? '1' : '0'}">
      ${row.checked_in ? 'Checked‑In' : 'Check‑In'}
    </button>
  </td>
`;
adminRows.appendChild(tr);
});
adminStatus.textContent = `${data.length} records loaded.`;
};

const updateCheckIn = async (id, nextValue) => {
const res = await fetch(`${SUPABASE_URL}/rest/v1/registrations?id=eq.${id}`, {
method: 'PATCH',
headers: {
apikey: SUPABASE_ANON_KEY,
Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
'Content-Type': 'application/json',
Prefer: 'return=minimal'
},
body: JSON.stringify({ checked_in: nextValue, checked_in_at: nextValue ? new Date().toISOString() : null })
});
return res.ok;
};

if (adminRows) {
fetchRegistrations();

adminRows.addEventListener('click', async (e) => {
const btn = e.target.closest('.admin-checkin');
if (!btn) return;
const id = btn.getAttribute('data-id');
const checked = btn.getAttribute('data-checked') === '1';
const ok = await updateCheckIn(id, !checked);
if (ok) {
fetchRegistrations(adminSearch?.value || '');
}
});
}

if (adminRefresh) {
adminRefresh.addEventListener('click', () => {
fetchRegistrations(adminSearch?.value || '');
});
}

if (adminSearch) {
adminSearch.addEventListener('input', () => {
fetchRegistrations(adminSearch.value);
});
}

if (adminExport) {
adminExport.addEventListener('click', async () => {
const res = await fetch(`${SUPABASE_URL}/rest/v1/registrations?select=*`, {
headers: {
apikey: SUPABASE_ANON_KEY,
Authorization: `Bearer ${SUPABASE_ANON_KEY}`
}
});
if (!res.ok) return;
const data = await res.json();
const headers = ['full_name','designation','organization','email','telephone','type','created_at','checked_in','checked_in_at'];
const rows = [headers.join(',')].concat(
data.map(r => headers.map(h => `"${(r[h] ?? '').toString().replace(/"/g,'""')}"`).join(','))
);
const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = 'registrations.csv';
link.click();
URL.revokeObjectURL(url);
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

document.addEventListener('keydown', (event) => {
if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
siteNav.classList.remove('is-open');
navToggle.setAttribute('aria-expanded', 'false');
navToggle.focus();
}
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
dot.setAttribute('tabindex', i === index ? '0' : '-1');
dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
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
dot.setAttribute('role', 'tab');
dot.setAttribute('tabindex', i === 0 ? '0' : '-1');
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
