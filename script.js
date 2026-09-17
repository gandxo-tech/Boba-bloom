/**
 * BOBA BLOOM - Maison de Thé & Bubble Tea d'Exception (Cotonou, Bénin)
 * Master Application Controller (Root Main File)
 * Safe DOM rendering (Zero unsafe innerHTML).
 */

/* ==========================================================================
   1. Safe DOM Utilities
   ========================================================================== */
function el(tag, props = {}, ...children) {
  const element = document.createElement(tag);
  Object.entries(props).forEach(([key, val]) => {
    if (key === 'className') {
      element.className = val;
    } else if (key === 'style' && typeof val === 'object') {
      Object.assign(element.style, val);
    } else if (key.startsWith('on') && typeof val === 'function') {
      element.addEventListener(key.substring(2).toLowerCase(), val);
    } else if (val !== null && val !== undefined) {
      element.setAttribute(key, String(val));
    }
  });

  children.flat(Infinity).forEach(child => {
    if (child === null || child === undefined || child === false) return;
    if (typeof child === 'string' || typeof child === 'number') {
      element.appendChild(document.createTextNode(String(child)));
    } else if (child instanceof Node) {
      element.appendChild(child);
    }
  });

  return element;
}

function clearChildren(parent) {
  if (!parent) return;
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function createToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const iconMap = {
    success: '✓',
    error: '✕',
    info: 'ℹ'
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

/* ==========================================================================
   2. Products & Sommelier Data
   ========================================================================== */
const menuProducts = [
  {
    id: "prod-1",
    name: "Brown Sugar Bliss",
    category: "signature",
    price: 3000,
    base: "Thé Noir d'Assam & Lait Frais",
    desc: "Perles de tapioca chaudes mijotées au sucre noir d'Okinawa et crème fouettée maison.",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=700&q=85",
    tags: ["Best Seller", "Signature"]
  },
  {
    id: "prod-2",
    name: "Strawberry Cloud",
    category: "milk-tea",
    price: 3200,
    base: "Thé Vert Jasmin & Coulis de Fraise",
    desc: "Fraises fraîches écrasées, lait d'avoine velouté et mousse de fromage salé.",
    image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=700&q=85",
    tags: ["Fruité", "Crémeux"]
  },
  {
    id: "prod-3",
    name: "Matcha Uji Imperial",
    category: "matcha",
    price: 3400,
    base: "Matcha Cérémonial de Kyoto Bio",
    desc: "Fouetté au chasen traditionnel, coulis de haricot rouge azuki et tapioca doré.",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=700&q=85",
    tags: ["Grand Cru", "Bio"]
  },
  {
    id: "prod-4",
    name: "Mangue Passion Sparkle",
    category: "fruity",
    price: 2800,
    base: "Thé Oolong des 4 Saisons",
    desc: "Purée de mangue locale du Bénin, fruit de la passion et popping boba litchi.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=85",
    tags: ["Ultra Frais", "Tropical"]
  },
  {
    id: "prod-5",
    name: "Taro Royal Velvet",
    category: "milk-tea",
    price: 3200,
    base: "Racine de Taro Pourpre & Lait de Coco",
    desc: "Saveur noisettée et texture onctueuse naturelle avec perles de tapioca noires.",
    image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=700&q=85",
    tags: ["Gourmand", "Sans Caféine"]
  },
  {
    id: "prod-6",
    name: "Hibiscus Rose Dégustation",
    category: "fruity",
    price: 2600,
    base: "Infusion Florale de Bissap & Pétales de Rose",
    desc: "Infusion noble aux notes acidulées, gelée d'herbes rafraîchissante et miel sauvage.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=700&q=85",
    tags: ["Origine Bénin", "Floral"]
  }
];

const sommelierData = {
  fruity: {
    title: "Mangue Passion Sparkle",
    desc: "Un éclat vibrant d'agrumes et de mangues mûries au soleil sur un thé Oolong floral.",
    price: "2 800 FCFA",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=85",
    aroma: "Notes de fruits de la passion, mangue fraîche, finale citronnée.",
    pairing: "Macaron yuzu ou tartelette mangue.",
    rawItem: { id: "som-1", name: "Mangue Passion Sparkle", price: 2800, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=85" }
  },
  comfort: {
    title: "Brown Sugar Bliss",
    desc: "La douceur réconfortante du caramel d'Okinawa chaud marié à un thé noir d'Assam corsé.",
    price: "3 000 FCFA",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=700&q=85",
    aroma: "Sucre caramélisé, vanille bourbon, thé malté velouté.",
    pairing: "Cookie pépites chocolat noir ou cannelé.",
    rawItem: { id: "som-2", name: "Brown Sugar Bliss", price: 3000, image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=700&q=85" }
  },
  matcha: {
    title: "Matcha Uji Imperial",
    desc: "Énergie propre et clarté d'esprit grâce à notre grand cru de thé vert biologique d'Uji.",
    price: "3 400 FCFA",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=700&q=85",
    aroma: "Herbe fraîche coupée, umami délicat, douceur lactée.",
    pairing: "Mochi haricot rouge azuki ou financier.",
    rawItem: { id: "som-3", name: "Matcha Uji Imperial", price: 3400, image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=700&q=85" }
  },
  gourmand: {
    title: "Taro Royal Velvet",
    desc: "Une rondeur irrésistible aux nuances de vanille et de noisette, servi avec tapioca chaud.",
    price: "3 200 FCFA",
    image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=700&q=85",
    aroma: "Noisette biscuitée, lait de coco, vanille onctueuse.",
    pairing: "Chou à la crème vanille ou gaufre liégeoise.",
    rawItem: { id: "som-4", name: "Taro Royal Velvet", price: 3200, image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=700&q=85" }
  }
};

const legalContents = {
  privacy: {
    title: "Politique de Confidentialité & Protection des Données (APDP Bénin / RGPD)",
    sections: [
      {
        heading: "1. Responsable du Traitement",
        text: "BOBA BLOOM SARL, immatriculée au RCCM de Cotonou sous le numéro RB/COT/24-B-89421, ayant son siège à Haie Vive, Rue du Commerce, Cotonou, République du Bénin. Email DPO : contact@bobabloom.bj."
      },
      {
        heading: "2. Données Collectées",
        text: "Dans le cadre de l'utilisation du site, nous recueillons : nom, prénom, numéro de téléphone, adresse de livraison (Cotonou et environs) et historique de commande."
      },
      {
        heading: "3. Finalités & Bases Légales",
        text: "Les données sont traitées pour l'exécution des commandes en ligne, la réservation de tables au Salon Privilège et le respect des normes APDP Bénin."
      },
      {
        heading: "4. Paiements & Sécurité",
        text: "Les transactions via Mobile Money (MTN MoMo, Moov Money, Wave) et Cartes Bancaires sont chiffrées par protocoles TLS 1.3. Aucune coordonnée bancaire n'est conservée sur nos serveurs."
      }
    ]
  },
  terms: {
    title: "Conditions Générales de Vente (CGV) & Mentions Légales",
    sections: [
      {
        heading: "1. Objet & Champ d'Application",
        text: "Les présentes CGV régissent les ventes de boissons et pâtisseries artisanales proposées par BOBA BLOOM en Click & Collect ou en livraison à Cotonou."
      },
      {
        heading: "2. Fraîcheur Minute",
        text: "Toutes nos boissons sont préparées à la commande avec des infusions de moins de 4 heures et des perles de tapioca fraîches cuites du jour."
      }
    ]
  },
  cookies: {
    title: "Gestion des Cookies & Traçeurs",
    sections: [
      {
        heading: "1. Cookies Utilisés",
        text: "Nous utilisons des cookies strictement nécessaires au panier d'achat, à la mémorisation de votre niveau de sucre personnalisé et à la sécurité."
      }
    ]
  },
  allergens: {
    title: "Guide des Allergènes & Informations Nutritionnelles",
    sections: [
      {
        heading: "1. Produits Laitiers",
        text: "Nos boissons traditionnelles utilisent du lait entier frais. Des alternatives végétales (Lait d'Avoine Bio, Soja) sont disponibles."
      },
      {
        heading: "2. Gluten & Tapioca",
        text: "Nos perles de tapioca artisanales sont confectionnées à partir de fécule pure de manioc et de sucre noir d'Okinawa (Naturellement sans gluten)."
      }
    ]
  }
};

/* ==========================================================================
   3. Application Logic Classes
   ========================================================================== */

class CartManager {
  constructor() {
    this.cart = this.loadCart();
    this.discountPercent = 0;
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
      console.warn('Cart storage error:', e);
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
    this.cartOpenBtn?.addEventListener('click', () => this.openCart());
    this.cartCloseBtn?.addEventListener('click', () => this.closeCart());
    this.cartOverlay?.addEventListener('click', () => this.closeCart());
    this.promoBtn?.addEventListener('click', () => this.applyPromo());
    this.checkoutBtn?.addEventListener('click', () => this.openCheckout());
    this.checkoutCloseBtn?.addEventListener('click', () => this.closeCheckout());
    this.checkoutForm?.addEventListener('submit', (e) => this.handleCheckoutSubmit(e));
    this.receiptCloseBtn?.addEventListener('click', () => this.closeReceipt());
  }

  openCart() {
    this.cartDrawer?.classList.add('open');
    this.cartOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeCart() {
    this.cartDrawer?.classList.remove('open');
    this.cartOverlay?.classList.remove('open');
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
    createToast(`✨ "${item.name}" ajouté à votre commande !`, 'success');
  }

  updateQuantity(cartItemId, delta) {
    const idx = this.cart.findIndex(i => i.cartItemId === cartItemId);
    if (idx === -1) return;

    this.cart[idx].quantity += delta;
    if (this.cart[idx].quantity <= 0) {
      this.cart.splice(idx, 1);
      createToast('Article retiré du panier.', 'info');
    }
    this.saveCart();
    this.render();
  }

  removeItem(cartItemId) {
    this.cart = this.cart.filter(i => i.cartItemId !== cartItemId);
    this.saveCart();
    this.render();
    createToast('Article supprimé.', 'info');
  }

  applyPromo() {
    const code = this.promoInput?.value.trim().toUpperCase();
    if (code === 'BLOOM10') {
      this.discountPercent = 10;
      createToast('🎉 Code BLOOM10 appliqué (-10%)', 'success');
    } else if (code === 'VIP20') {
      this.discountPercent = 20;
      createToast('🌟 Code Privilège VIP20 appliqué (-20%)', 'success');
    } else {
      this.discountPercent = 0;
      createToast('Code promotionnel non reconnu.', 'error');
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

    if (this.cartSubtotalEl) this.cartSubtotalEl.textContent = `${subtotal.toLocaleString('fr-FR')} FCFA`;
    if (this.cartTotalEl) this.cartTotalEl.textContent = `${total.toLocaleString('fr-FR')} FCFA`;
    
    if (this.cartDiscountRow && this.cartDiscountEl) {
      if (discount > 0) {
        this.cartDiscountRow.style.display = 'flex';
        this.cartDiscountEl.textContent = `-${discount.toLocaleString('fr-FR')} FCFA (${this.discountPercent}%)`;
      } else {
        this.cartDiscountRow.style.display = 'none';
      }
    }

    if (this.checkoutBtn) this.checkoutBtn.disabled = this.cart.length === 0;

    if (!this.cartItemsContainer) return;
    clearChildren(this.cartItemsContainer);

    if (this.cart.length === 0) {
      this.cartItemsContainer.appendChild(
        el('div', { style: { textAlign: 'center', padding: '40px 10px', color: 'var(--color-text-muted)' } },
          el('div', { style: { fontSize: '2.5rem', marginBottom: '10px' } }, '🧋'),
          el('h4', { style: { fontFamily: 'var(--font-display)', marginBottom: '6px' } }, 'Votre panier est vide'),
          el('p', { style: { fontSize: '0.85rem' } }, 'Découvrez nos créations ou composez votre thé sur-mesure.')
        )
      );
      return;
    }

    this.cart.forEach(item => {
      const itemEl = el('div', { className: 'cart-item-card' },
        el('img', {
          className: 'cart-item-thumb',
          src: item.image || 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=120&q=80',
          alt: item.name
        }),
        el('div', { className: 'cart-item-info' },
          el('div', { className: 'cart-item-title-row' },
            el('h5', { className: 'cart-item-title' }, item.name),
            el('button', {
              type: 'button',
              className: 'cart-item-remove-btn',
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
                onclick: () => this.updateQuantity(item.cartItemId, -1)
              }, '−'),
              el('span', {}, item.quantity),
              el('button', {
                type: 'button',
                className: 'qty-btn',
                onclick: () => this.updateQuantity(item.cartItemId, 1)
              }, '+')
            ),
            el('div', { style: { fontWeight: '700', color: 'var(--color-rose)', fontSize: '0.92rem' } },
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
    this.checkoutModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeCheckout() {
    this.checkoutModal?.classList.remove('open');
    document.body.style.overflow = '';
  }

  handleCheckoutSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this.checkoutForm);
    const clientName = formData.get('client_name') || 'Client Privilège';
    const clientPhone = formData.get('client_phone') || '+229';
    const deliveryMethod = formData.get('delivery_type') || 'Click & Collect (Haie Vive)';
    const paymentMethod = formData.get('payment_method') || 'Mobile Money / Comptoir';

    const { subtotal, discount, total } = this.calculateTotals();
    const orderNum = 'BB-' + Math.floor(100000 + Math.random() * 900000);

    if (this.receiptContainer) {
      clearChildren(this.receiptContainer);
      this.receiptContainer.appendChild(
        el('div', { style: { textAlign: 'center' } },
          el('span', { className: 'section-tag' }, 'Commande Validée'),
          el('h4', { style: { fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '8px 0' } }, `N° ${orderNum}`),
          el('p', { style: { fontSize: '0.85rem', color: 'var(--color-text-muted)' } }, new Date().toLocaleString('fr-FR')),
          el('div', { style: { background: 'var(--color-cream-bg)', padding: '14px', borderRadius: '8px', margin: '14px 0', textAlign: 'left', fontSize: '0.88rem' } },
            el('div', {}, el('strong', {}, 'Client : '), clientName, ` (${clientPhone})`),
            el('div', {}, el('strong', {}, 'Mode : '), deliveryMethod),
            el('div', {}, el('strong', {}, 'Paiement : '), paymentMethod)
          ),
          el('div', { style: { borderTop: '1px dashed var(--color-border)', paddingTop: '10px', marginTop: '10px' } },
            el('div', { style: { fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-espresso)' } }, `Total : ${total.toLocaleString('fr-FR')} FCFA`)
          ),
          el('p', { style: { fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '12px' } },
            'Présentez ce reçu au salon de Haie Vive ou au livreur.'
          )
        )
      );
    }

    this.cart = [];
    this.saveCart();
    this.render();
    this.closeCheckout();

    this.receiptModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
    createToast(`🎉 Commande ${orderNum} validée avec succès !`, 'success');
  }

  closeReceipt() {
    this.receiptModal?.classList.remove('open');
    document.body.style.overflow = '';
  }
}

class DrinkBuilder {
  constructor(cartManager) {
    this.cartManager = cartManager;
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
      ice: '50%'
    };

    this.initElements();
    this.bindEvents();
    this.updateVisuals();
  }

  initElements() {
    this.liquid = document.getElementById('builder-liquid');
    this.iceLayer = document.getElementById('builder-ice-layer');
    this.toppingsLayer = document.getElementById('builder-toppings-layer');
    this.drinkNameEl = document.getElementById('builder-drink-name');
    this.drinkPriceEl = document.getElementById('builder-live-price');
    this.drinkSummaryEl = document.getElementById('builder-drink-summary');
    this.addToCartBtn = document.getElementById('btn-add-custom-drink');
  }

  bindEvents() {
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

    document.querySelectorAll('[data-step="sweetness"] .slider-label-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('[data-step="sweetness"] .slider-label-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.state.sweetness = e.currentTarget.dataset.value;
        this.updateVisuals();
      });
    });

    document.querySelectorAll('[data-step="ice"] .slider-label-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('[data-step="ice"] .slider-label-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.state.ice = e.currentTarget.dataset.value;
        this.updateVisuals();
      });
    });

    this.addToCartBtn?.addEventListener('click', () => {
      const price = this.state.basePrice + this.state.toppingPrice;
      const title = `${this.state.flavor} ${this.state.base}`;
      this.cartManager.addItem({
        id: 'custom-' + Date.now(),
        name: title,
        price,
        size: '500ml',
        sweetness: this.state.sweetness,
        ice: this.state.ice,
        toppings: this.state.topping,
        image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=700&q=85'
      });
    });
  }

  updateVisuals() {
    if (this.liquid) {
      this.liquid.style.background = `linear-gradient(180deg, ${this.state.flavorColor} 0%, ${this.state.baseColor} 85%)`;
    }

    if (this.toppingsLayer) {
      clearChildren(this.toppingsLayer);
      const pearlCount = this.state.topping === 'Aucun' ? 0 : 7;
      for (let i = 0; i < pearlCount; i++) {
        this.toppingsLayer.appendChild(
          el('div', {
            className: `boba-pearl pearl-${this.state.toppingClass}`,
            style: { left: `${15 + (i * 11)}%`, bottom: `${6 + ((i % 2) * 8)}px` }
          })
        );
      }
    }

    if (this.iceLayer) {
      clearChildren(this.iceLayer);
      const iceCount = this.state.ice === '0%' ? 0 : (this.state.ice === '30%' ? 2 : (this.state.ice === '50%' ? 4 : 6));
      for (let i = 0; i < iceCount; i++) {
        this.iceLayer.appendChild(
          el('div', {
            className: 'ice-cube',
            style: { left: `${20 + (i * 16)}%`, top: `${10 + ((i % 2) * 12)}px` }
          })
        );
      }
    }

    const price = this.state.basePrice + this.state.toppingPrice;
    const title = `${this.state.flavor} ${this.state.base}`;

    if (this.drinkNameEl) this.drinkNameEl.textContent = title;
    if (this.drinkPriceEl) this.drinkPriceEl.textContent = `${price.toLocaleString('fr-FR')} FCFA`;

    if (this.drinkSummaryEl) {
      clearChildren(this.drinkSummaryEl);
      [
        `Base: ${this.state.base}`,
        `Saveur: ${this.state.flavor}`,
        `Topping: ${this.state.topping}`,
        `Sucre: ${this.state.sweetness}`,
        `Glace: ${this.state.ice}`
      ].forEach(text => {
        this.drinkSummaryEl.appendChild(el('span', { className: 'summary-chip' }, text));
      });
    }
  }
}

class SommelierManager {
  constructor(cartManager) {
    this.cartManager = cartManager;
    this.currentMood = 'comfort';
    this.init();
  }

  init() {
    const chips = document.querySelectorAll('.sommelier-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        chips.forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentMood = e.currentTarget.dataset.mood;
        this.renderRecommendation();
      });
    });

    document.getElementById('btn-order-sommelier')?.addEventListener('click', () => {
      const rec = sommelierData[this.currentMood];
      if (rec) {
        this.cartManager.addItem({
          id: rec.rawItem.id,
          name: rec.rawItem.name,
          price: rec.rawItem.price,
          image: rec.rawItem.image,
          size: '500ml',
          sweetness: '50%',
          ice: '50%',
          toppings: 'Inclus'
        });
      }
    });

    const tastingModal = document.getElementById('tasting-sheet-modal');
    document.getElementById('btn-open-tasting-sheet')?.addEventListener('click', () => {
      const rec = sommelierData[this.currentMood];
      if (rec && tastingModal) {
        const titleEl = document.getElementById('ts-drink-title');
        const descEl = document.getElementById('ts-drink-desc');
        const aromaEl = document.getElementById('ts-aroma-notes');
        const pairingEl = document.getElementById('ts-pairing');
        
        if (titleEl) titleEl.textContent = rec.title;
        if (descEl) descEl.textContent = rec.desc;
        if (aromaEl) aromaEl.textContent = rec.aroma;
        if (pairingEl) pairingEl.textContent = rec.pairing;
        
        tastingModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });

    document.getElementById('ts-modal-close')?.addEventListener('click', () => {
      tastingModal?.classList.remove('open');
      document.body.style.overflow = '';
    });
    document.getElementById('ts-btn-close')?.addEventListener('click', () => {
      tastingModal?.classList.remove('open');
      document.body.style.overflow = '';
    });
    document.getElementById('ts-btn-order')?.addEventListener('click', () => {
      tastingModal?.classList.remove('open');
      document.body.style.overflow = '';
      const rec = sommelierData[this.currentMood];
      if (rec) {
        this.cartManager.addItem({
          id: rec.rawItem.id,
          name: rec.rawItem.name,
          price: rec.rawItem.price,
          image: rec.rawItem.image,
          size: '500ml',
          sweetness: '50%',
          ice: '50%',
          toppings: 'Inclus'
        });
      }
    });
  }

  renderRecommendation() {
    const rec = sommelierData[this.currentMood];
    if (!rec) return;

    const imgEl = document.getElementById('sommelier-rec-img');
    const titleEl = document.getElementById('sommelier-rec-title');
    const descEl = document.getElementById('sommelier-rec-desc');
    const priceEl = document.getElementById('sommelier-rec-price');

    if (imgEl) imgEl.src = rec.image;
    if (titleEl) titleEl.textContent = rec.title;
    if (descEl) descEl.textContent = rec.desc;
    if (priceEl) priceEl.textContent = rec.price;
  }
}

class LegalModalManager {
  constructor() {
    this.modal = document.getElementById('info-modal');
    this.titleEl = document.getElementById('info-modal-title');
    this.bodyEl = document.getElementById('info-modal-body');
    this.closeBtn = document.getElementById('info-modal-close');
    this.init();
  }

  init() {
    this.closeBtn?.addEventListener('click', () => this.close());
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    document.querySelectorAll('[data-legal-type]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open(e.currentTarget.dataset.legalType);
      });
    });
  }

  open(type) {
    const data = legalContents[type] || legalContents.privacy;
    if (this.titleEl) this.titleEl.textContent = data.title;
    
    if (this.bodyEl) {
      clearChildren(this.bodyEl);
      data.sections.forEach(sec => {
        this.bodyEl.appendChild(
          el('div', { style: { marginBottom: '18px' } },
            el('h5', { style: { fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--color-espresso)', marginBottom: '4px' } }, sec.heading),
            el('p', { style: { fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.6' } }, sec.text)
          )
        );
      });
    }

    this.modal?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal?.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   4. Main Orchestrator Bootstrap
   ========================================================================== */
class BobaBloomApp {
  constructor() {
    this.activeCategory = 'all';
    this.searchQuery = '';
    
    this.cartManager = new CartManager();
    this.drinkBuilder = new DrinkBuilder(this.cartManager);
    this.sommelier = new SommelierManager(this.cartManager);
    this.legalModals = new LegalModalManager();

    this.initNavigation();
    this.initHeroSwitcher();
    this.initMenuSection();
    this.initReservation();
    this.initCookies();
    this.initGallery();
    this.initNewsletter();
  }

  initNavigation() {
    const navbar = document.getElementById('main-navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const mobileDrawerClose = document.getElementById('mobile-nav-close');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) navbar?.classList.add('scrolled');
      else navbar?.classList.remove('scrolled');

      if (window.scrollY > 400) backToTop?.classList.add('visible');
      else backToTop?.classList.remove('visible');
    });

    backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

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

    mobileMenuBtn?.addEventListener('click', () => toggleMobile(true));
    mobileDrawerClose?.addEventListener('click', () => toggleMobile(false));
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => toggleMobile(false));
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

        if (heroImg) heroImg.src = target.dataset.img;
        if (heroTitle) heroTitle.textContent = target.dataset.title;
        if (heroPrice) heroPrice.textContent = `${parseInt(target.dataset.price, 10).toLocaleString('fr-FR')} FCFA`;
        if (heroBadge) heroBadge.textContent = target.dataset.badge;
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
          el('div', { style: { gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' } },
            el('p', {}, 'Aucune création ne correspond à votre recherche.')
          )
        );
        return;
      }

      filtered.forEach(product => {
        const card = el('div', { className: 'menu-product-card' },
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

    searchInput?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.trim();
      render();
    });

    render();
  }

  initReservation() {
    const form = document.getElementById('salon-booking-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('res_name');
      const date = formData.get('res_date');
      const time = formData.get('res_time');
      createToast(`👑 Merci ${name} ! Table réservée le ${date} à ${time}.`, 'success');
      form.reset();
    });
  }

  initCookies() {
    const banner = document.getElementById('cookie-consent-banner');
    if (!localStorage.getItem('boba_cookie_consent') && banner) {
      setTimeout(() => banner.classList.add('visible'), 1000);
    }
    document.getElementById('btn-cookie-accept')?.addEventListener('click', () => {
      localStorage.setItem('boba_cookie_consent', 'accepted');
      banner?.classList.remove('visible');
      createToast('Préférences de cookies enregistrées.', 'success');
    });
    document.getElementById('btn-cookie-refuse')?.addEventListener('click', () => {
      localStorage.setItem('boba_cookie_consent', 'essential_only');
      banner?.classList.remove('visible');
      createToast('Seuls les cookies indispensables sont activés.', 'info');
    });
  }

  initGallery() {
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    document.querySelectorAll('.gallery-thumb-item img').forEach(img => {
      img.parentElement.addEventListener('click', () => {
        if (lightboxImg && lightbox) {
          lightboxImg.src = img.src;
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });
    document.getElementById('lightbox-close-btn')?.addEventListener('click', () => {
      lightbox?.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  initNewsletter() {
    const form = document.getElementById('newsletter-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      createToast('🎉 Merci ! Bienvenue dans le Club Privilège Boba Bloom.', 'success');
      form.reset();
    });
  }
}

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  new BobaBloomApp();
});
