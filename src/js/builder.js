/**
 * Boba Bloom - 5-Step Interactive Beverage Customizer
 * Safe DOM rendering (zero unsafe innerHTML).
 */

import { el, clearChildren } from './safe-dom.js';

export class DrinkBuilder {
  constructor(cartManager, showToastFn) {
    this.cartManager = cartManager;
    this.showToast = showToastFn;

    this.state = {
      base: 'Milk Tea',
      basePrice: 2200,
      baseColor: '#D2AC84',
      flavor: 'Strawberry',
      flavorColor: '#F28299',
      topping: 'Tapioca',
      toppingPrice: 500,
      toppingClass: 'tapioca',
      sweetness: '50%',
      ice: '50%',
      size: 'regular',
      sizeExtra: 0
    };

    this.initElements();
    this.bindEvents();
    this.updateVisuals();
  }

  initElements() {
    this.container = document.getElementById('builder');
    this.liquid = document.getElementById('builder-liquid');
    this.foam = document.getElementById('builder-foam');
    this.iceLayer = document.getElementById('builder-ice-layer');
    this.toppingsLayer = document.getElementById('builder-toppings-layer');
    this.straw = document.getElementById('builder-straw');
    
    this.drinkNameEl = document.getElementById('builder-drink-name');
    this.drinkPriceEl = document.getElementById('builder-live-price');
    this.drinkSummaryEl = document.getElementById('builder-drink-summary');
    this.statusTextEl = document.getElementById('builder-status-text');
    this.addToCartBtn = document.getElementById('btn-add-custom-drink');
    this.resetBtn = document.getElementById('btn-reset-builder');
    this.autoGenerateBtn = document.getElementById('btn-auto-generate');
    
    this.sizeBtns = document.querySelectorAll('.size-opt-btn');
    this.stepCards = document.querySelectorAll('.builder-step-card');
    this.nextStepBtns = document.querySelectorAll('.btn-next-step');
  }

  bindEvents() {
    // Option chips selection
    document.querySelectorAll('.option-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const target = e.currentTarget;
        const grid = target.closest('.option-chips-grid');
        const step = grid?.dataset.step;
        if (!step) return;

        grid.querySelectorAll('.option-chip').forEach(c => c.classList.remove('selected'));
        target.classList.add('selected');

        if (step === 'base') {
          this.state.base = target.dataset.value;
          this.state.basePrice = parseInt(target.dataset.price, 10) || 2200;
          this.state.baseColor = target.dataset.color || '#D2AC84';
        } else if (step === 'flavor') {
          this.state.flavor = target.dataset.value;
          this.state.flavorColor = target.dataset.color || '#F28299';
        } else if (step === 'topping') {
          this.state.topping = target.dataset.value;
          this.state.toppingPrice = parseInt(target.dataset.price, 10) || 500;
          this.state.toppingClass = target.dataset.toppingClass || 'tapioca';
        }

        this.updateVisuals();
      });
    });

    // Sweetness buttons
    document.querySelectorAll('[data-step="sweetness"] .slider-label-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const allSweetBtns = document.querySelectorAll('[data-step="sweetness"] .slider-label-btn');
        allSweetBtns.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.state.sweetness = e.currentTarget.dataset.value;
        const hint = document.getElementById('current-sweetness-text');
        if (hint) hint.textContent = this.state.sweetness;
        this.updateVisuals();
      });
    });

    // Ice level buttons
    document.querySelectorAll('[data-step="ice"] .slider-label-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const allIceBtns = document.querySelectorAll('[data-step="ice"] .slider-label-btn');
        allIceBtns.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.state.ice = e.currentTarget.dataset.value;
        const hint = document.getElementById('current-ice-text');
        if (hint) hint.textContent = this.state.ice;
        this.updateVisuals();
      });
    });

    // Size toggle
    this.sizeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.sizeBtns.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.state.size = e.currentTarget.dataset.size;
        this.state.sizeExtra = parseInt(e.currentTarget.dataset.extra, 10) || 0;
        this.updateVisuals();
      });
    });

    // Next step navigation
    this.nextStepBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const nextIdx = e.currentTarget.dataset.next;
        const targetStep = document.querySelector(`.builder-step-card[data-step-index="${nextIdx}"]`);
        if (targetStep) {
          this.stepCards.forEach(s => s.classList.remove('active-step'));
          targetStep.classList.add('active-step');
          targetStep.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          if (this.statusTextEl) {
            this.statusTextEl.textContent = `Étape ${nextIdx} sur 5 en cours de personnalisation.`;
          }
        }
      });
    });

    // Reset button
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this.reset());
    }

    // Add to cart
    if (this.addToCartBtn) {
      this.addToCartBtn.addEventListener('click', () => this.addToCart());
    }
  }

  calculatePrice() {
    return this.state.basePrice + this.state.toppingPrice + this.state.sizeExtra;
  }

  getDrinkTitle() {
    return `${this.state.flavor} ${this.state.base}`;
  }

  updateVisuals() {
    // Liquid color
    if (this.liquid) {
      this.liquid.style.background = `linear-gradient(180deg, ${this.state.flavorColor} 0%, ` +
                                    `${this.state.baseColor} 85%)`;
    }

    // Toppings layer (Safe DOM)
    if (this.toppingsLayer) {
      clearChildren(this.toppingsLayer);
      const pearlCount = this.state.topping === 'Aucun' ? 0 : 7;
      for (let i = 0; i < pearlCount; i++) {
        const pearl = el('div', {
          className: `boba-pearl pearl-${this.state.toppingClass}`,
          style: {
            left: `${15 + (i * 11)}%`,
            bottom: `${6 + ((i % 2) * 8)}px`,
            animationDelay: `${i * 0.15}s`
          }
        });
        this.toppingsLayer.appendChild(pearl);
      }
    }

    // Ice layer (Safe DOM)
    if (this.iceLayer) {
      clearChildren(this.iceLayer);
      const iceCount = this.state.ice === '0%' ? 0 :
                       (this.state.ice === '30%' ? 2 :
                       (this.state.ice === '50%' ? 4 : 6));
      for (let i = 0; i < iceCount; i++) {
        const cube = el('div', {
          className: 'ice-cube',
          style: {
            transform: `rotate(${i % 2 === 0 ? 15 : -20}deg)`,
            left: `${20 + (i * 16)}%`,
            top: `${10 + ((i % 2) * 12)}px`
          }
        });
        this.iceLayer.appendChild(cube);
      }
    }

    // Text & price updates (Safe text content)
    const price = this.calculatePrice();
    const title = this.getDrinkTitle();

    if (this.drinkNameEl) this.drinkNameEl.textContent = title;
    if (this.drinkPriceEl) {
      this.drinkPriceEl.textContent = `${price.toLocaleString('fr-FR')} FCFA`;
    }

    if (this.drinkSummaryEl) {
      clearChildren(this.drinkSummaryEl);
      const summaryList = [
        `Base : ${this.state.base}`,
        `Saveur : ${this.state.flavor}`,
        `Topping : ${this.state.topping}`,
        `Sucre : ${this.state.sweetness}`,
        `Glaçons : ${this.state.ice}`,
        `Format : ${this.state.size === 'large' ? 'Grand 700ml' : 'Standard 500ml'}`
      ];
      summaryList.forEach(itemText => {
        this.drinkSummaryEl.appendChild(el('span', { className: 'summary-chip' }, itemText));
      });
    }
  }

  reset() {
    this.state = {
      base: 'Milk Tea',
      basePrice: 2200,
      baseColor: '#D2AC84',
      flavor: 'Strawberry',
      flavorColor: '#F28299',
      topping: 'Tapioca',
      toppingPrice: 500,
      toppingClass: 'tapioca',
      sweetness: '50%',
      ice: '50%',
      size: 'regular',
      sizeExtra: 0
    };
    this.updateVisuals();
    if (this.showToast) this.showToast('Atelier réinitialisé avec les valeurs signatures.', 'info');
  }

  addToCart() {
    const item = {
      id: 'custom-' + Date.now(),
      name: this.getDrinkTitle(),
      price: this.calculatePrice(),
      size: this.state.size === 'large' ? '700ml' : '500ml',
      sweetness: this.state.sweetness,
      ice: this.state.ice,
      toppings: this.state.topping,
      image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=700&q=85'
    };
    this.cartManager.addItem(item);
  }
}
