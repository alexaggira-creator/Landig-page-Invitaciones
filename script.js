document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       HEADER SCROLL
       ============================================================ */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    /* ============================================================
       MOBILE MENU
       ============================================================ */
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');

    menuBtn.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        menuBtn.classList.toggle('open', isOpen);
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            menuBtn.classList.remove('open');
        });
    });

    /* ============================================================
       CURRENCY SWITCHER
       ============================================================ */
    let activeCurrency = 'cop';
    const allCurrBtns = document.querySelectorAll('.currency-btn, .curr-mini-btn');

    function formatMoney(val, currency) {
        const locales = {
            'cop': 'es-CO',
            'usd': 'en-US',
            'mxn': 'es-MX',
            'pen': 'es-PE',
            'clp': 'es-CL',
            'ars': 'es-AR',
            'brl': 'pt-BR',
            'gtq': 'es-GT',
            'eur': 'de-DE'
        };
        return new Intl.NumberFormat(locales[currency] || 'es-CO').format(val);
    }

    function switchCurrency(currency) {
        activeCurrency = currency;

        // Update all price amounts
        document.querySelectorAll('.p-amount').forEach(el => {
            const raw = el.getAttribute(`data-${currency}`);
            el.textContent = formatMoney(parseInt(raw), currency);
            
            // Symbol handling (optional refinement)
            const parent = el.parentElement;
            const symbol = parent.querySelector('.p-currency');
            if (symbol) symbol.textContent = currency === 'eur' ? '€' : '$';

            // Small animation
            el.style.transform = 'scale(0.9)';
            el.style.opacity = '0.4';
            setTimeout(() => {
                el.style.transition = 'all .3s';
                el.style.transform = 'scale(1)';
                el.style.opacity = '1';
            }, 50);
        });

        // Update currency labels
        document.querySelectorAll('.p-label').forEach(el => {
            el.textContent = currency.toUpperCase();
        });

        // Sync all buttons (desktop + mobile)
        allCurrBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.currency === currency);
        });
    }

    allCurrBtns.forEach(btn => {
        btn.addEventListener('click', () => switchCurrency(btn.dataset.currency));
    });

    /* ============================================================
       CURRENCY MODAL LOGIC
       ============================================================ */
    const coinTrigger = document.getElementById('coin-trigger');
    const currencyModal = document.getElementById('currency-modal');
    const closeModal = document.getElementById('c-modal-close');
    const modalOverlay = document.getElementById('c-modal-overlay');

    if (coinTrigger && currencyModal) {
        coinTrigger.addEventListener('click', () => {
            currencyModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });

        const closeFunc = () => {
            currencyModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeModal.addEventListener('click', closeFunc);
        modalOverlay.addEventListener('click', closeFunc);

        // Close when a currency is selected in the modal
        currencyModal.querySelectorAll('.currency-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                setTimeout(closeFunc, 300); // Slight delay for feedback
            });
        });
    }

    /* ============================================================
       SCROLL REVEAL
       ============================================================ */
    const revealAll = document.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger siblings in the same parent
                const siblings = [...entry.target.parentElement.querySelectorAll('[data-reveal]')];
                const idx = siblings.indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, idx * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealAll.forEach(el => observer.observe(el));

    /* ============================================================
       CATALOG
       ============================================================ */
    const catalogItems = [
        {
            id: 20,
            title: 'Mis XV Años - Amelia',
            category: 'quince',
            catClass: 'cat-quince',
            catLabel: '✨ XV Años',
            img: 'amelia_thumb.png',
            link: 'https://alexaggira-creator.github.io/Invitacion-amelia/',
            live: true,
            imgPos: 'center top'
        },
        {
            id: 19,
            title: 'Nuestra Boda - Sara y Camilo',
            category: 'boda',
            catClass: 'cat-boda',
            catLabel: '💍 Boda',
            img: 'sara_thumb.jpg',
            link: 'https://alexaggira-creator.github.io/Sara-y-camilo/',
            live: true,
            imgPos: 'center top'
        },
        {
            id: 18,
            title: 'Bautizo de Miguel',
            category: 'bautizo',
            catClass: 'cat-bautizo',
            catLabel: '🕊️ Bautizo',
            img: 'miguel_thumb.jpg',
            link: 'https://alexaggira-creator.github.io/Miguel/',
            live: true,
            imgPos: 'center top'
        },
        {
            id: 17,
            title: 'Mi Primera Comunión - Sofía',
            category: 'comunion',
            catClass: 'cat-comunion',
            catLabel: '🙏 Comunión',
            img: 'sofia_thumb.jpeg',
            link: 'https://alexaggira-creator.github.io/Sofia/',
            live: true,
            imgPos: 'center top'
        },
        {
            id: 101,
            title: 'Laura – Mis 7 Añitos Mágicos',
            category: 'cumple',
            catClass: 'cat-cumple',
            catLabel: '🎂 Cumpleaños',
            img: 'laura_thumb.png',
            link: 'https://alexaggira-creator.github.io/laura/',
            live: true,
            imgPos: 'center top'
        },
        {
            id: 16,
            title: 'Baby Shower Perla',
            category: 'reveal',
            catClass: 'cat-reveal',
            catLabel: '🎀 Baby Shower',
            img: 'perla_thumb.png',
            link: 'https://alexaggira-creator.github.io/perla/',
            live: true,
            imgPos: 'center top'
        },
        {
            id: 15,
            title: '¡Celeste Cumple 5! (Minnie)',
            category: 'cumple',
            catClass: 'cat-cumple',
            catLabel: '🎂 Cumpleaños',
            img: 'minnie_thumb.png',
            link: 'https://alexaggira-creator.github.io/Minnie/',
            live: true,
            imgPos: 'center top'
        },
        {
            id: 14,
            title: 'Cenicienta Mágica',
            category: 'quince',
            catClass: 'cat-quince',
            catLabel: '✨ XV Años',
            img: 'cenicienta_thumb.png',
            link: 'https://alexaggira-creator.github.io/cenicienta/',
            live: true,
            imgPos: 'center top'
        }
    ];



    const grid = document.getElementById('catalog-grid');
    const filters = document.querySelectorAll('.filter-btn');

    function renderCatalog(filter) {
        const data = filter === 'all' ? catalogItems : catalogItems.filter(i => i.category === filter);

        grid.style.opacity = '0';
        grid.style.transform = 'translateY(12px)';

        setTimeout(() => {
            grid.innerHTML = '';

            if (data.length === 0) {
                grid.innerHTML = `
                    <div class="empty-cat">
                        <i class="fas fa-compass"></i>
                        <p style="margin-top:14px;color:var(--text-dim)">Próximamente más diseños para esta categoría ✨</p>
                    </div>`;
            }

            data.forEach(item => {
                const isLive = item.live === true;
                const isDemo = item.link !== '#';
                const btnLabel = isDemo ? '👁 Ver Demo' : 'Próximamente';
                const card = document.createElement('div');
                card.className = 'catalog-card';
                card.innerHTML = `
                    <div class="card-thumb">
                        <img src="${item.img}" alt="${item.title}" loading="lazy"
                             style="object-position: ${item.imgPos || 'center center'}">
                        <span class="card-cat-pill ${item.catClass}">${item.catLabel}</span>
                        ${isLive ? `` : ''}
                        <div class="card-overlay">
                            <a href="${item.link}" class="btn btn-gold"
                               ${isDemo ? 'target="_blank"' : 'style="opacity:.6;pointer-events:none;"'}>
                               ${btnLabel}
                            </a>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div>
                            <h4>${item.title}</h4>
                            <p>${item.catLabel.replace(/\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu, '').trim()}</p>
                        </div>
                        <div class="card-arrow ${isLive ? 'card-arrow-live' : ''}"><i class="fas fa-arrow-right"></i></div>
                    </div>`;

                grid.appendChild(card);
            });

            grid.style.transition = 'opacity .4s ease, transform .4s ease';
            grid.style.opacity = '1';
            grid.style.transform = 'translateY(0)';
        }, 180);
    }

    renderCatalog('all');

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCatalog(btn.dataset.filter);
        });
    });

    /* ============================================================
       TESTIMONIALS
       ============================================================ */
    const reviews = [
        {
            stars: 5,
            text: 'Me quedé sin palabras cuando vi cómo quedó la invitación de mi boda. Todos mis invitados me preguntaron quién las diseñó. ¡Simplemente preciosa!',
            name: 'Andrea Martínez',
            event: '💍 Boda',
            avatar: 'https://i.pravatar.cc/80?img=5',
            date: 'Marzo 2026'
        },
        {
            stars: 5,
            text: 'La invitación de los 15 de mi hija superó todas nuestras expectativas. Llegamos a 48 horas antes de la fiesta y fue perfecta. ¡La música y el mapa una maravilla!',
            name: 'Patricia Gómez',
            event: '✨ XV Años',
            avatar: 'https://i.pravatar.cc/80?img=10',
            date: 'Febrero 2026'
        },
        {
            stars: 5,
            text: 'Súper profesionales y atentos en todo momento. Mi invitación del cumpleaños quedó increíble, la galería de fotos emocionó a más de uno. 100% recomendados.',
            name: 'Carlos Restrepo',
            event: '🎂 Cumpleaños',
            avatar: 'https://i.pravatar.cc/80?img=12',
            date: 'Enero 2026'
        },
        {
            stars: 5,
            text: 'Honestamente no esperaba que fuera tan bonito. La cuenta regresiva le dio un toque especial al gender reveal. Todos amaron la invitación.',
            name: 'Valeria Torres',
            event: '🎀 Gender Reveal',
            avatar: 'https://i.pravatar.cc/80?img=9',
            date: 'Marzo 2026'
        },
        {
            stars: 5,
            text: 'El proceso fue facilísimo, me explicaron todo por WhatsApp. En 5 días ya tenía mi link listo. La invitación de mi bebé quedó divina, con música y todo.',
            name: 'Luisa Herrera',
            event: '🕊️ Bautizo',
            avatar: 'https://i.pravatar.cc/80?img=16',
            date: 'Abril 2026'
        },
        {
            stars: 5,
            text: 'Vale cada pesos. Mis invitados pensaron que gaste un millón en la invitación. ¡Muy elegante, muy bonita y muy fácil de compartir por WhatsApp!',
            name: 'Daniela Vélez',
            event: '💍 Boda',
            avatar: 'https://i.pravatar.cc/80?img=20',
            date: 'Febrero 2026'
        }
    ];

    const reviewsGrid = document.getElementById('reviews-grid');

    reviews.forEach(r => {
        const stars = '★'.repeat(r.stars) + '☆'.repeat(5 - r.stars);
        const card = document.createElement('div');
        card.className = 'review-card';
        card.setAttribute('data-reveal', '');
        card.innerHTML = `
            <div class="review-stars">${stars}</div>
            <p class="review-text">${r.text}</p>
            <div class="review-author">
                <img class="author-avatar" src="${r.avatar}" alt="${r.name}">
                <div class="author-info">
                    <strong>${r.name}</strong>
                    <span>${r.date}</span>
                </div>
            </div>
            <span class="review-event">${r.event}</span>`;
        reviewsGrid.appendChild(card);

        // Re-observe newly created elements for scroll reveal
        observer.observe(card);
    });

});
