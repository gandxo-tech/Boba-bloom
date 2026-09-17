/**
 * Boba Bloom - Virtual Tea Sommelier & Tasting Sheet Module
 * Safe DOM rendering (zero unsafe innerHTML).
 */

import { el, clearChildren } from './safe-dom.js';
import { sommelierData } from './sommelier-data.js';

export class SommelierManager {
  constructor(cartManager, showToastFn) {
    this.cartManager = cartManager;
    this.showToast = showToastFn;
    this.currentProfile = 'comfort';

    this.initElements();
    this.bindEvents();
    this.renderRecommendation('comfort');
  }

  initElements() {
    this.chips = document.querySelectorAll('.sommelier-chip');
    this.recTitle = document.getElementById('sommelier-rec-title');
    this.recDesc = document.getElementById('sommelier-rec-desc');
    this.recImg = document.getElementById('sommelier-rec-img');
    this.recPrice = document.getElementById('sommelier-rec-price');
    this.btnOrderSommelier = document.getElementById('btn-order-sommelier');
    this.btnOpenTastingSheet = document.getElementById('btn-open-tasting-sheet');
    
    this.sheetModal = document.getElementById('tasting-sheet-modal');
    this.sheetCloseBtn = document.getElementById('ts-modal-close');
    this.sheetCloseBtn2 = document.getElementById('ts-btn-close');
    this.sheetOrderBtn = document.getElementById('ts-btn-order');
    
    this.tsTitle = document.getElementById('ts-drink-title');
    this.tsDesc = document.getElementById('ts-drink-desc');
    this.tsNotes = document.getElementById('ts-aroma-notes');
    this.tsSweetness = document.getElementById('ts-sweetness');
    this.tsIce = document.getElementById('ts-ice');
    this.tsPairing = document.getElementById('ts-pairing');
  }

  bindEvents() {
    this.chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        this.chips.forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const mood = e.currentTarget.dataset.mood;
        this.currentProfile = mood;
        this.renderRecommendation(mood);
      });
    });

    if (this.btnOrderSommelier) {
      this.btnOrderSommelier.addEventListener('click', () => {
        this.orderCurrentRecommendation();
      });
    }

    if (this.btnOpenTastingSheet) {
      this.btnOpenTastingSheet.addEventListener('click', () => {
        this.openTastingSheet();
      });
    }

    const closeSheet = () => {
      if (this.sheetModal) {
        this.sheetModal.classList.remove('open');
        this.sheetModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    };

    if (this.sheetCloseBtn) this.sheetCloseBtn.addEventListener('click', closeSheet);
    if (this.sheetCloseBtn2) this.sheetCloseBtn2.addEventListener('click', closeSheet);
    if (this.sheetModal) {
      this.sheetModal.addEventListener('click', (e) => {
        if (e.target === this.sheetModal) closeSheet();
      });
    }

    if (this.sheetOrderBtn) {
      this.sheetOrderBtn.addEventListener('click', () => {
        closeSheet();
        this.orderCurrentRecommendation();
      });
    }
  }

  renderRecommendation(moodKey) {
    const data = sommelierData[moodKey] || sommelierData.comfort;
    if (this.recTitle) this.recTitle.textContent = data.title;
    if (this.recDesc) this.recDesc.textContent = data.desc;
    if (this.recPrice) this.recPrice.textContent = `${data.price.toLocaleString('fr-FR')} FCFA`;
    if (this.recImg) {
      this.recImg.src = data.img;
      this.recImg.alt = data.title;
    }

    if (this.tsTitle) this.tsTitle.textContent = data.title;
    if (this.tsDesc) this.tsDesc.textContent = data.desc;
    if (this.tsNotes) this.tsNotes.textContent = data.notes;
    if (this.tsSweetness) this.tsSweetness.textContent = data.sweetness;
    if (this.tsIce) this.tsIce.textContent = data.ice;
    if (this.tsPairing) this.tsPairing.textContent = data.pairing;
  }

  openTastingSheet() {
    if (this.sheetModal) {
      this.sheetModal.classList.add('open');
      this.sheetModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  orderCurrentRecommendation() {
    const data = sommelierData[this.currentProfile] || sommelierData.comfort;
    const item = {
      id: 'sommelier-' + this.currentProfile,
      name: data.title,
      price: data.price,
      size: '500ml',
      sweetness: data.sweetness,
      ice: data.ice,
      toppings: 'Perles de Tapioca',
      image: data.img
    };
    this.cartManager.addItem(item);
  }
}
