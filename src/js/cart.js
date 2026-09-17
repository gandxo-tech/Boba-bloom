/**
 * Boba Bloom - Shopping Cart & Checkout Module
 * Safe DOM rendering (zero unsafe innerHTML) & Local Storage Persistence.
 */

import { el, clearChildren } from './safe-dom.js';

export class CartManager {
  constructor(showToastFn) {
    this.showToast = showToastFn;
    this.cart = this.loadCart();
    this.discountPercent = 0;
    this.discountCode = '';
    
    this.initElements();
    this.bindEvents();
    this.render();
  }

  loadCart() {
    try {
      const stored = localStorage.getItem('boba_bloom_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('boba_bloom_cart', JSON.stringify(this.cart));
    } catch (e) {
      console.warn('Could not save cart:', e);
    }
  }

  initElements() {
    this.cartDrawer = document.getElementById('cart-drawer');
    this.cartOverlay = document.getElementById('cart-overlay');
    this.cartOpenBtn = document.getElementById('cart-toggle-btn');
    this.cartCloseBtn = document.getElementById('cart-close-btn');
    this.cartItemsContainer = document.getElementById('cart-items-container');
    this.cartBadge = document.getElementById('cart-badge-count');
    this.cartTotalEl = document.getElementById('cart-total-price');
    this.cartSubtotalEl = document.getElementById('cart-subtotal-price');
    this.cartDiscountRow = document.getElementById('cart-discount-row');
    this.cartDiscountEl = document.getElementById('cart-discount-amount');
    
    this.promoInput = document.getElementById('promo-code-input');
    this.promoBtn = document.getElementById('btn-apply-promo');
    this.checkoutBtn = document.getElementById('btn-checkout');
    
    this.checkoutModal = document.getElementById('checkout-modal');
    this.checkoutForm = document.getElementById('checkout-form');
    this.checkoutCloseBtn = document.getElementById('checkout-close-btn');
    this.receiptContainer = document.getElementById('receipt-details');
    this.receiptModal = document.getElementById('receipt-modal');
    this.receiptCloseBtn = document.getElementById('receipt-close-btn');
  }

  bindEvents() {
    if (this.cartOpenBtn) {
      this.cartOpenBtn.addEventListener('click', () => this.openCart());
    }
    if (this.cartCloseBtn) {
      this.cartCloseBtn.addEventListener('click', () => this.closeCart());
    }
    if (this.cartOverlay) {
      this.cartOverlay.addEventListener('click', () => this.closeCart());
    }
    if (this.promoBtn) {
      this.promoBtn.addEventListener('click', () => this.applyPromo());
    }
    if (this.checkoutBtn) {
      this.checkoutBtn.addEventListener('click', () => this.openCheckout());
    }
    if (this.checkoutCloseBtn) {
      this.checkoutCloseBtn.addEventListener('click', () => this.closeCheckout());
    }
    if (this.checkoutForm) {
      this.checkoutForm.addEventListener('submit', (e) => this.handleCheckoutSubmit(e));
    }
    if (this.receiptCloseBtn) {
      this.receiptCloseBtn.addEventListener('click', () => this.closeReceipt());
    }
  }

  openCart() {
    if (!this.cartDrawer || !this.cartOverlay) return;
    this.cartDrawer.classList.add('open');
    this.cartOverlay.classList.add('open');
    this.cartDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  closeCart() {
    if (!this.cartDrawer || !this.cartOverlay) return;
    this.cartDrawer.classList.remove('open');
    this.cartOverlay.classList.remove('open');
    this.cartDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  addItem(item) {
    const existing = this.cart.find(i => 
      i.id === item.id && 
      i.size === item.size && 
      i.sweetness === item.sweetness && 
      i.ice === item.ice && 
      i.toppings === item.toppings
    );

    if (existing) {
      existing.quantity += (item.quantity || 1);
    } else {
      this.cart.push({
        ...item,
        quantity: item.quantity || 1,
        cartItemId: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4)
      });
    }

    this.saveCart();
    this.render();
    this.openCart();
    if (this.showToast) {
      this.showToast(`✨ "${item.name}" ajouté à votre commande !`, 'success');
    }
  }

  updateQuantity(cartItemId, delta) {
    const idx = this.cart.findIndex(i => i.cartItemId === cartItemId);
    if (idx === -1) return;

    this.cart[idx].quantity += delta;
    if (this.cart[idx].quantity <= 0) {
      this.cart.splice(idx, 1);
      if (this.showToast) this.showToast('Article retiré du panier.', 'info');
    }
    this.saveCart();
    this.render();
  }

  removeItem(cartItemId) {
    this.cart = this.cart.filter(i => i.cartItemId !== cartItemId);
    this.saveCart();
    this.render();
    if (this.showToast) this.showToast('Article supprimé.', 'info');
  }

  applyPromo() {
    if (!this.promoInput) return;
    const code = this.promoInput.value.trim().toUpperCase();
    if (code === 'BLOOM10') {
      this.discountPercent = 10;
      this.discountCode = 'BLOOM10';
      if (this.showToast) this.showToast('🎉 Code BLOOM10 appliqué (-10%)', 'success');
    } else if (code === 'VIP20') {
      this.discountPercent = 20;
      this.discountCode = 'VIP20';
      if (this.showToast) this.showToast('🌟 Code Privilège VIP20 appliqué (-20%)', 'success');
    } else {
      this.discountPercent = 0;
      this.discountCode = '';
      if (this.showToast) this.showToast('Code promotionnel invalide.', 'error');
    }
    this.render();
  }

  calculateTotals() {
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = Math.round(subtotal * (this.discountPercent / 100));
    const total = Math.max(0, subtotal - discount);
    return { subtotal, discount, total };
  }

  render() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (this.cartBadge) {
      this.cartBadge.textContent = String(totalItems);
      this.cartBadge.style.display = totalItems > 0 ? 'inline-flex' : 'none';
    }

    const { subtotal, discount, total } = this.calculateTotals();

    if (this.cartSubtotalEl) {
      this.cartSubtotalEl.textContent = `${subtotal.toLocaleString('fr-FR')} FCFA`;
    }
    if (this.cartTotalEl) {
      this.cartTotalEl.textContent = `${total.toLocaleString('fr-FR')} FCFA`;
    }
    if (this.cartDiscountRow && this.cartDiscountEl) {
      if (discount > 0) {
        this.cartDiscountRow.style.display = 'flex';
        this.cartDiscountEl.textContent = `-${discount.toLocaleString('fr-FR')} FCFA (${this.discountPercent}%)`;
      } else {
        this.cartDiscountRow.style.display = 'none';
      }
    }

    if (this.checkoutBtn) {
      this.checkoutBtn.disabled = this.cart.length === 0;
    }

    this.renderCartItems();
  }

  renderCartItems() {
    if (!this.cartItemsContainer) return;
    clearChildren(this.cartItemsContainer);

    if (this.cart.length === 0) {
      const emptyDiv = el('div', { className: 'cart-empty-state' },
        el('div', { className: 'empty-icon' }, '🧋'),
        el('h4', {
          style: {
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            marginBottom: '6px'
          }
        }, 'Votre panier est vide'),
        el('p', {
          style: { color: 'var(--color-text-muted)', fontSize: '0.88rem' }
        }, 'Découvrez nos thés d\'exception ou créez votre Bubble Tea personnalisé.')
      );
      this.cartItemsContainer.appendChild(emptyDiv);
      return;
    }

    this.cart.forEach(item => {
      const itemEl = el('div', { className: 'cart-item-card' },
        el('img', {
          className: 'cart-item-thumb',
          src: item.image ||
               'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=120&q=80',
          alt: item.name,
          loading: 'lazy'
        }),
        el('div', { className: 'cart-item-info' },
          el('div', { className: 'cart-item-title-row' },
            el('h5', { className: 'cart-item-title' }, item.name),
            el('button', {
              type: 'button',
              className: 'cart-item-remove-btn',
              'aria-label': `Supprimer ${item.name}`,
              onclick: () => this.removeItem(item.cartItemId)
            }, '×')
          ),
          el('div', { className: 'cart-item-specs' },
            item.size ? el('span', { className: 'cart-spec-tag' }, item.size) : null,
            item.sweetness ? el('span', { className: 'cart-spec-tag' }, `Sucre: ${item.sweetness}`) : null,
            item.ice ? el('span', { className: 'cart-spec-tag' }, `Glace: ${item.ice}`) : null,
            item.toppings ? el('span', { className: 'cart-spec-tag' }, item.toppings) : null
          ),
          el('div', { className: 'cart-item-bottom-row' },
            el('div', { className: 'cart-qty-picker' },
              el('button', {
                type: 'button',
                className: 'qty-btn',
                'aria-label': 'Diminuer la quantité',
                onclick: () => this.updateQuantity(item.cartItemId, -1)
              }, '−'),
              el('span', { className: 'qty-val' }, item.quantity),
              el('button', {
                type: 'button',
                className: 'qty-btn',
                'aria-label': 'Augmenter la quantité',
                onclick: () => this.updateQuantity(item.cartItemId, 1)
              }, '+')
            ),
            el('div', { className: 'cart-item-price' },
              `${(item.price * item.quantity).toLocaleString('fr-FR')} FCFA`
            )
          )
        )
      );
      this.cartItemsContainer.appendChild(itemEl);
    });
  }

  openCheckout() {
    if (this.cart.length === 0) return;
    this.closeCart();
    if (this.checkoutModal) {
      this.checkoutModal.classList.add('open');
      this.checkoutModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  closeCheckout() {
    if (this.checkoutModal) {
      this.checkoutModal.classList.remove('open');
      this.checkoutModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  handleCheckoutSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this.checkoutForm);
    const clientName = formData.get('client_name') || 'Client Privilège';
    const clientPhone = formData.get('client_phone') || '+229';
    const deliveryMethod = formData.get('delivery_type') || 'Click & Collect (Haie Vive)';
    const paymentMethod = formData.get('payment_method') || 'Paiement au comptoir / Mobile Money';

    const { subtotal, discount, total } = this.calculateTotals();
    const orderNum = 'BB-' + Math.floor(100000 + Math.random() * 900000);

    this.renderReceipt({
      orderNum,
      clientName,
      clientPhone,
      deliveryMethod,
      paymentMethod,
      items: [...this.cart],
      subtotal,
      discount,
      total
    });

    this.cart = [];
    this.saveCart();
    this.render();
    this.closeCheckout();

    if (this.receiptModal) {
      this.receiptModal.classList.add('open');
      this.receiptModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    if (this.showToast) {
      this.showToast(`🎉 Commande ${orderNum} validée avec succès !`, 'success');
    }
  }

  renderReceipt(order) {
    if (!this.receiptContainer) return;
    clearChildren(this.receiptContainer);

    const receiptEl = el('div', { className: 'receipt-box' },
      el('div', { className: 'receipt-header' },
        el('div', { className: 'receipt-badge' }, 'Commande Confirmée'),
        el('h4', {
          style: {
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            margin: '8px 0 2px'
          }
        }, `N° ${order.orderNum}`),
        el('p', {
          style: { fontSize: '0.85rem', color: 'var(--color-text-muted)' }
        }, new Date().toLocaleString('fr-FR'))
      ),
      el('div', { className: 'receipt-client-info' },
        el('p', {}, el('strong', {}, 'Client : '), order.clientName, ` (${order.clientPhone})`),
        el('p', {}, el('strong', {}, 'Mode : '), order.deliveryMethod),
        el('p', {}, el('strong', {}, 'Paiement : '), order.paymentMethod)
      ),
      el('div', { className: 'receipt-items-list' },
        ...order.items.map(item => el('div', { className: 'receipt-item-row' },
          el('span', {}, `${item.quantity}× ${item.name} (${item.size || '500ml'})`),
          el('span', { style: { fontWeight: '600' } }, `${(item.price * item.quantity).toLocaleString('fr-FR')} FCFA`)
        ))
      ),
      el('div', { className: 'receipt-totals' },
        order.discount > 0 ? el('div', { className: 'receipt-total-row' },
          el('span', {}, 'Sous-total :'),
          el('span', {}, `${order.subtotal.toLocaleString('fr-FR')} FCFA`)
        ) : null,
        order.discount > 0 ? el('div', {
          className: 'receipt-total-row',
          style: { color: 'var(--color-raspberry)' }
        },
          el('span', {}, 'Remise :'),
          el('span', {}, `-${order.discount.toLocaleString('fr-FR')} FCFA`)
        ) : null,
        el('div', {
          className: 'receipt-total-row',
          style: {
            fontSize: '1.1rem',
            fontWeight: '700',
            color: 'var(--color-espresso)',
            borderTop: '1px dashed #D2AC84',
            paddingTop: '8px',
            marginTop: '6px'
          }
        },
          el('span', {}, 'Total Réglé :'),
          el('span', {}, `${order.total.toLocaleString('fr-FR')} FCFA`)
        )
      ),
      el('p', { className: 'receipt-footer-note' },
        'Présentez ce reçu au salon de Haie Vive pour le retrait minute ou au livreur.'
      )
    );

    this.receiptContainer.appendChild(receiptEl);
  }

  closeReceipt() {
    if (this.receiptModal) {
      this.receiptModal.classList.remove('open');
      this.receiptModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }
}
