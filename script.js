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
    const allCurrBtns = document.querySelectorAll('.currency-btn');

    function formatMoney(val, currency) {
        const locales = {
            'cop': 'es-CO',
            'usd': 'en-US',
            'mxn': 'es-MX',
            'pen': 'es-PE',
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
        // ── INVITACIONES REALES (demo disponible) ──────────────────
        {
            id: 15,
            title: '¡Celeste Cumple 5! (Minnie)',
            category: 'cumple',
            catClass: 'cat-cumple',
            catLabel: '🎂 Cumpleaños',
            img: 'WhatsApp Image 2026-04-17 at 8.59.47 PM.jpeg',
            link: 'https://alexaggira-creator.github.io/Minnie/',
            live: false
        },
        {
            id: 14,
            title: 'Cenicienta Mágica',
            category: 'quince',
            catClass: 'cat-quince',
            catLabel: '✨ XV Años',
            img: 'WhatsApp Image 2026-04-17 at 4.07.09 PM.jpeg',
            link: 'https://alexaggira-creator.github.io/cenicienta/',
            imgPos: 'center 20%'
        },
        {
            id: 10,
            title: 'Quinceañera Amelia',
            category: 'quince',
            catClass: 'cat-quince',
            catLabel: '✨ XV Años',
            img: 'WhatsApp Image 2026-04-17 at 2.40.40 PM.jpeg',
            link: 'https://alexaggira-creator.github.io/Invitacion-amelia/',
            imgPos: 'center 20%'   // ← ajusta este % para subir/bajar la imagen
        },

        // ── DISEÑOS DEL CATÁLOGO (próximamente con demo) ───────────
        {
            id: 1,
            title: 'Boda Elegante',
            category: 'boda',
            catClass: 'cat-boda',
            catLabel: '💍 Boda',
            img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600',
            link: '#'
        },
        {
            id: 2,
            title: 'Boda en Jardín',
            category: 'boda',
            catClass: 'cat-boda',
            catLabel: '💍 Boda',
            img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600',
            link: '#'
        },
        {
            id: 3,
            title: 'Mis XV Primaveras',
            category: 'quince',
            catClass: 'cat-quince',
            catLabel: '✨ XV Años',
            img: 'https://images.unsplash.com/photo-1530103862676-fa8c91abeead?auto=format&fit=crop&q=80&w=600',
            link: '#'
        },
        {
            id: 4,
            title: 'Cumpleaños Gold',
            category: 'cumple',
            catClass: 'cat-cumple',
            catLabel: '🎂 Cumpleaños',
            img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
            link: '#'
        },
        {
            id: 5,
            title: 'Cumpleaños de Princesa',
            category: 'cumple',
            catClass: 'cat-cumple',
            catLabel: '🎂 Cumpleaños',
            img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600',
            link: '#'
        },
        {
            id: 6,
            title: 'Gender Reveal Pastel',
            category: 'reveal',
            catClass: 'cat-reveal',
            catLabel: '🎀 Gender Reveal',
            img: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&q=80&w=600',
            link: '#'
        },
        {
            id: 7,
            title: 'Baby Shower Azul',
            category: 'reveal',
            catClass: 'cat-reveal',
            catLabel: '🎀 Baby Shower',
            img: 'https://images.unsplash.com/photo-1607344648963-d13c5e25a7d3?auto=format&fit=crop&q=80&w=600',
            link: '#'
        },
        {
            id: 8,
            title: 'Bautizo Celestial',
            category: 'bautizo',
            catClass: 'cat-bautizo',
            catLabel: '🕊️ Bautizo',
            img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600',
            link: '#'
        },
        {
            id: 9,
            title: 'Baby Shower Rosa',
            category: 'reveal',
            catClass: 'cat-reveal',
            catLabel: '🎀 Baby Shower',
            img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
            link: '#'
        },
        {
            id: 11,
            title: 'Primera Comunión',
            category: 'comunion',
            catClass: 'cat-comunion',
            catLabel: '🙏 Comunión',
            img: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=600',
            link: '#'
        },
        {
            id: 12,
            title: 'Aniversario Dorado',
            category: 'aniversario',
            catClass: 'cat-aniversario',
            catLabel: '💑 Aniversario',
            img: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=600',
            link: '#'
        },
        {
            id: 13,
            title: 'Grado de Honor',
            category: 'grado',
            catClass: 'cat-grado',
            catLabel: '🎓 Grados',
            img: 'https://images.unsplash.com/photo-1627556704302-624286467c65?auto=format&fit=crop&q=80&w=600',
            link: '#'
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
                        ${isLive ? `<span class="card-live-badge"><i class="fas fa-circle"></i> En vivo</span>` : ''}
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
