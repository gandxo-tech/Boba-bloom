/**
 * Boba Bloom - Main Application Entry & Controller
 * Safe DOM rendering (zero unsafe innerHTML) & Modular Component Orchestration.
 */

import { el, clearChildren } from './safe-dom.js';
import { menuProducts } from './products-data.js';
import { CartManager } from './cart.js';
import { DrinkBuilder } from './builder.js';
import { SommelierManager } from './sommelier.js';
import { ReservationManager } from './reservation.js';
import {
  createToast,
  LegalModalManager,
  CookieBannerManager,
  LightboxManager
} from './modals.js';

class BobaBloomApp {
  constructor() {
    this.activeCategory = 'all';
    this.searchQuery = '';
    
    this.cartManager = new CartManager(createToast);
    this.drinkBuilder = new DrinkBuilder(this.cartManager, createToast);
    this.sommelier = new SommelierManager(this.cartManager, createToast);
    this.reservation = new ReservationManager(createToast);
    this.legalModals = new LegalModalManager();
    this.cookieBanner = new CookieBannerManager(createToast);
    this.lightbox = new LightboxManager();

    this.initNavigation();
    this.initHeroSwitcher();
    this.initMenuSection();
    this.initScrollEffects();
    this.initNewsletter();
  }

  initNavigation() {
    const navbar = document.getElementById('main-navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const mobileDrawerClose = document.getElementById('mobile-nav-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    // Sticky shadow
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    });

    // Mobile drawer toggle
    const toggleMobile = (open) => {
      if (mobileDrawer) {
        if (open) {
          mobileDrawer.classList.add('open');
          document.body.style.overflow = 'hidden';
        } else {
          mobileDrawer.classList.remove('open');
          document.body.style.overflow = '';
        }
      }
    };

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => toggleMobile(true));
    if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', () => toggleMobile(false));
    mobileLinks.forEach(link => link.addEventListener('click', () => toggleMobile(false)));

    // Smooth scroll for nav anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  initHeroSwitcher() {
    const heroImg = document.getElementById('hero-main-photo');
    const heroTitle = document.getElementById('hero-drink-title');
    const heroPrice = document.getElementById('hero-drink-price');
    const heroBadge = document.getElementById('hero-recipe-badge');
    const heroBtns = document.querySelectorAll('.hero-drink-btn');

    heroBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        heroBtns.forEach(b => b.classList.remove('active'));
        const target = e.currentTarget;
        target.classList.add('active');

        const imgUrl = target.dataset.img;
        const title = target.dataset.title;
        const price = target.dataset.price;
        const badge = target.dataset.badge;

        if (heroImg && imgUrl) heroImg.src = imgUrl;
        if (heroTitle && title) heroTitle.textContent = title;
        if (heroPrice && price) heroPrice.textContent = `${parseInt(price, 10).toLocaleString('fr-FR')} FCFA`;
        if (heroBadge && badge) heroBadge.textContent = badge;
      });
    });
  }

  initMenuSection() {
    const menuGrid = document.getElementById('menu-items-grid');
    const categoryTabs = document.querySelectorAll('.category-tab-btn');
    const searchInput = document.getElementById('menu-search-input');

    const render = () => {
      if (!menuGrid) return;
      clearChildren(menuGrid);

      const filtered = menuProducts.filter(item => {
        const matchesCategory = this.activeCategory === 'all' || item.category === this.activeCategory;
        const query = this.searchQuery.toLowerCase();
        const matchesSearch = item.name.toLowerCase().includes(query) ||
                              item.desc.toLowerCase().includes(query) ||
                              item.base.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
      });

      if (filtered.length === 0) {
        menuGrid.appendChild(
          el('div', { className: 'menu-no-results' },
            el('p', {}, 'Aucune création ne correspond à votre recherche.')
          )
        );
        return;
      }

      filtered.forEach(product => {
        const card = el('div', { className: 'menu-product-card', 'data-id': product.id },
          el('div', { className: 'card-media-wrapper' },
            el('img', {
              src: product.image,
              alt: product.name,
              className: 'card-img',
              loading: 'lazy'
            }),
            el('div', { className: 'card-tags-list' },
              ...product.tags.map(t => el('span', { className: 'product-tag-pill' }, t))
            )
          ),
          el('div', { className: 'card-content' },
            el('div', { className: 'card-header-row' },
              el('h4', { className: 'card-title' }, product.name),
              el('span', { className: 'card-price' }, `${product.price.toLocaleString('fr-FR')} FCFA`)
            ),
            el('p', { className: 'card-base-info' }, product.base),
            el('p', { className: 'card-description' }, product.desc),
            el('button', {
              type: 'button',
              className: 'btn-order-card',
              onclick: () => this.cartManager.addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: '500ml',
                sweetness: '50%',
                ice: '50%',
                toppings: 'Inclus'
              })
            }, 'Ajouter au Panier')
          )
        );
        menuGrid.appendChild(card);
      });
    };

    categoryTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.activeCategory = e.currentTarget.dataset.category;
        render();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim();
        render();
      });
    }

    render();
  }

  initScrollEffects() {
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop?.classList.add('visible');
      } else {
        backToTop?.classList.remove('visible');
      }
    });

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        createToast(`🎉 Merci ! Bienvenue dans le Club Privilège Boba Bloom.`, 'success');
        form.reset();
      }
    });
  }
}

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  new BobaBloomApp();
});
