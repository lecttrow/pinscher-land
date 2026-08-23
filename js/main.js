/* Pinscher Land — Global scripts */

document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    let overlay = document.querySelector('.nav-overlay');

    function closeMenu() {
        if (!mobileBtn || !nav) return;
        mobileBtn.classList.remove('active');
        nav.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
        if (overlay) overlay.classList.remove('visible');
    }

    function openMenu() {
        if (!mobileBtn || !nav) return;
        mobileBtn.classList.add('active');
        nav.classList.add('open');
        mobileBtn.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
        if (overlay) overlay.classList.add('visible');
    }

    if (mobileBtn && nav) {
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            overlay.setAttribute('aria-hidden', 'true');
            document.body.appendChild(overlay);
        }

        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileBtn.setAttribute('aria-controls', 'main-nav');

        mobileBtn.addEventListener('click', () => {
            if (nav.classList.contains('open')) closeMenu();
            else openMenu();
        });

        overlay.addEventListener('click', closeMenu);

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu();
        });
    }

    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        }, { passive: true });
    }

    const faders = document.querySelectorAll('.fade-up');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        faders.forEach(el => io.observe(el));
    } else {
        faders.forEach(el => el.classList.add('visible'));
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (filterBtns.length && galleryItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                galleryItems.forEach(item => {
                    const cat = item.getAttribute('data-category');
                    item.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
                });
            });
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            if (!btn) return;
            const original = btn.textContent;
            btn.textContent = 'Изпратено ✓';
            btn.disabled = true;
            btn.style.background = '#4caf50';
            setTimeout(() => {
                contactForm.reset();
                btn.textContent = original;
                btn.disabled = false;
                btn.style.background = '';
            }, 3000);
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // Проверява какъв език е запазен в браузъра (по подразбиране е 'bg')
    const savedLang = localStorage.getItem('site_lang') || 'bg';
    
    if (savedLang === 'en') {
        applyEnglishTranslations(); // Извиква функцията ви за английски език
    }
});

// Функция, която се задейства, когато потребителят кликне на бутона за смяна на езика
function setSiteLanguage(lang) {
    localStorage.setItem('site_lang', lang);
    
    if (lang === 'en') {
        applyEnglishTranslations();
    } else {
        localStorage.setItem('site_lang', 'bg');
        location.reload(); // Презарежда за връщане към български по подразбиране
    }
}

// Примерна функция за превод (ако ползвате data-атрибути или скрит речник)
function applyEnglishTranslations() {
    // Тук слагате вашата логика за смяна на текстовете или класовете по страниците
    document.querySelectorAll('[data-en]').forEach(el => {
        el.setAttribute('data-bg', el.innerText);
        el.innerText = el.getAttribute('data-en');
    });
}
