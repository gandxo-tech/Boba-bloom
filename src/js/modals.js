/**
 * Boba Bloom - Modals, Legal Center, Cookie Consent & Toast Notifications
 * Safe DOM rendering (zero unsafe innerHTML).
 */

import { el, clearChildren } from './safe-dom.js';
import { legalContents } from './legal-data.js';

export function createToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const iconMap = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠'
  };

  const toast = el('div', {
    className: `toast-message toast-${type}`,
    role: 'status',
    'aria-live': 'polite'
  },
    el('span', { className: 'toast-icon' }, iconMap[type] || '✨'),
    el('span', { className: 'toast-text' }, message)
  );

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3500);
}

export class LegalModalManager {
  constructor() {
    this.modal = document.getElementById('info-modal');
    this.titleEl = document.getElementById('info-modal-title');
    this.bodyEl = document.getElementById('info-modal-body');
    this.closeBtn = document.getElementById('info-modal-close');
    this.init();
  }

  init() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    }

    document.querySelectorAll('[data-legal-type]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const type = e.currentTarget.dataset.legalType;
        this.open(type);
      });
    });
  }

  open(type) {
    const data = legalContents[type] || legalContents.privacy;
    if (this.titleEl) this.titleEl.textContent = data.title;
    
    if (this.bodyEl) {
      clearChildren(this.bodyEl);
      data.sections.forEach(sec => {
        const secDiv = el('div', {
          className: 'legal-section-block',
          style: { marginBottom: '18px' }
        },
          el('h5', {
            style: {
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem',
              color: 'var(--color-espresso)',
              marginBottom: '4px'
            }
          }, sec.heading),
          el('p', {
            style: {
              fontSize: '0.88rem',
              color: 'var(--color-text-muted)',
              lineHeight: '1.6'
            }
          }, sec.text)
        );
        this.bodyEl.appendChild(secDiv);
      });
    }

    if (this.modal) {
      this.modal.classList.add('open');
      this.modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove('open');
      this.modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }
}

export class CookieBannerManager {
  constructor(showToastFn) {
    this.showToast = showToastFn;
    this.banner = document.getElementById('cookie-consent-banner');
    this.init();
  }

  init() {
    const consent = localStorage.getItem('boba_cookie_consent');
    if (!consent && this.banner) {
      setTimeout(() => {
        this.banner.classList.add('visible');
      }, 1000);
    }

    const acceptBtn = document.getElementById('btn-cookie-accept');
    const refuseBtn = document.getElementById('btn-cookie-refuse');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('boba_cookie_consent', 'accepted');
        if (this.banner) this.banner.classList.remove('visible');
        if (this.showToast) {
          this.showToast('Préférences de cookies enregistrées.', 'success');
        }
      });
    }

    if (refuseBtn) {
      refuseBtn.addEventListener('click', () => {
        localStorage.setItem('boba_cookie_consent', 'essential_only');
        if (this.banner) this.banner.classList.remove('visible');
        if (this.showToast) {
          this.showToast('Seuls les cookies indispensables sont activés.', 'info');
        }
      });
    }
  }
}

export class LightboxManager {
  constructor() {
    this.lightbox = document.getElementById('gallery-lightbox');
    this.imgEl = document.getElementById('lightbox-img');
    this.captionEl = document.getElementById('lightbox-caption');
    this.closeBtn = document.getElementById('lightbox-close-btn');
    this.init();
  }

  init() {
    document.querySelectorAll('.gallery-thumb-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const img = e.currentTarget.querySelector('img');
        const caption = e.currentTarget.querySelector('.gallery-overlay-caption')?.textContent || '';
        if (img && this.imgEl) {
          this.imgEl.src = img.src;
          this.imgEl.alt = img.alt;
          if (this.captionEl) this.captionEl.textContent = caption;
          if (this.lightbox) {
            this.lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
          }
        }
      });
    });

    const close = () => {
      if (this.lightbox) {
        this.lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    };

    if (this.closeBtn) this.closeBtn.addEventListener('click', close);
    if (this.lightbox) {
      this.lightbox.addEventListener('click', (e) => {
        if (e.target === this.lightbox) close();
      });
    }
  }
}
