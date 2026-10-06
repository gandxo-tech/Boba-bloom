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

  const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgIcon.setAttribute('width', '18');
  svgIcon.setAttribute('height', '18');
  svgIcon.setAttribute('viewBox', '0 0 24 24');
  svgIcon.setAttribute('fill', 'none');
  svgIcon.setAttribute('stroke', 'currentColor');
  svgIcon.setAttribute('stroke-width', '2.5');
  svgIcon.setAttribute('stroke-linecap', 'round');
  svgIcon.setAttribute('stroke-linejoin', 'round');

  if (type === 'success') {
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    poly.setAttribute('points', '20 6 9 17 4 12');
    svgIcon.appendChild(poly);
  } else if (type === 'error') {
    const l1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    l1.setAttribute('x1', '18'); l1.setAttribute('y1', '6'); l1.setAttribute('x2', '6'); l1.setAttribute('y2', '18');
    const l2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    l2.setAttribute('x1', '6'); l2.setAttribute('y1', '6'); l2.setAttribute('x2', '18'); l2.setAttribute('y2', '18');
    svgIcon.appendChild(l1);
    svgIcon.appendChild(l2);
  } else {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '12'); circle.setAttribute('cy', '12'); circle.setAttribute('r', '10');
    const l1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    l1.setAttribute('x1', '12'); l1.setAttribute('y1', '16'); l1.setAttribute('x2', '12'); l1.setAttribute('y2', '12');
    const l2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    l2.setAttribute('x1', '12'); l2.setAttribute('y1', '8'); l2.setAttribute('x2', '12.01'); l2.setAttribute('y2', '8');
    svgIcon.appendChild(circle);
    svgIcon.appendChild(l1);
    svgIcon.appendChild(l2);
  }

  const toast = el('div', {
    className: `toast-message toast-${type}`,
    role: 'status',
    'aria-live': 'polite'
  },
    el('span', { className: 'toast-icon', style: { display: 'inline-flex', alignItems: 'center' } }, svgIcon),
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
    name: "Délice Sucre Noir",
    category: "signature",
    price: 3000,
    base: "Thé Noir d'Assam & Lait Frais",
    desc: "Perles de tapioca chaudes mijotées au sucre noir d'Okinawa et crème fouettée maison.",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=700&q=85",
    tags: ["Incontournable", "Signature"]
  },
  {
    id: "prod-2",
    name: "Nuage de Fraise",
    category: "milk-tea",
    price: 3200,
    base: "Thé Vert Jasmin & Coulis de Fraise",
    desc: "Fraises fraîches écrasées, lait d'avoine velouté et mousse de fromage salé.",
    image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=700&q=85",
    tags: ["Fruité", "Crémeux"]
  },
  {
    id: "prod-3",
    name: "Matcha Uji Impérial",
    category: "matcha",
    price: 3400,
    base: "Matcha Cérémonial de Kyoto Bio",
    desc: "Fouetté au chasen traditionnel, coulis de haricot rouge azuki et tapioca doré.",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=700&q=85",
    tags: ["Grand Cru", "Bio"]
  },
  {
    id: "prod-4",
    name: "Éclat Mangue Passion",
    category: "fruity",
    price: 2800,
    base: "Thé Oolong des 4 Saisons",
    desc: "Purée de mangue locale du Bénin, fruit de la passion et popping boba litchi.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=85",
    tags: ["Ultra Frais", "Tropical"]
  },
  {
    id: "prod-5",
    name: "Velours de Taro Royal",
    category: "milk-tea",
    price: 3200,
    base: "Racine de Taro Pourpre & Lait de Coco",
    desc: "Saveur noisettée et texture onctueuse naturelle avec perles de tapioca noires.",
    image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=700&q=85",
    tags: ["Gourmand", "Sans Caféine"]
  },
  {
    id: "prod-6",
    name: "Infusion Hibiscus Rose",
    category: "fruity",
    price: 2600,
    base: "Infusion Florale de Bissap & Pétales de Rose",
    desc: "Infusion noble aux notes acidulées, gelée d'herbes rafraîchissante et miel sauvage.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=700&q=85",
    tags: ["Origine Bénin", "Floral"]
  }
];

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
      },
      {
        heading: "3. Conception & Développement du Site",
        text: "Plateforme web officielle conçue et développée par GBAGUIDI Exaucé."
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
    this.orderTracker = null;
    this.activeTab = 'items';
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

  setOrderTracker(orderTracker) {
    this.orderTracker = orderTracker;
  }

  initElements() {
    this.cartDrawer = document.getElementById('cart-drawer');
    this.cartOverlay = document.getElementById('cart-overlay');
    this.cartOpenBtn = document.getElementById('cart-toggle-btn');
    this.cartCloseBtn = document.getElementById('cart-close-btn');
    
    this.tabItemsBtn = document.getElementById('tab-cart-items');
    this.tabTrackerBtn = document.getElementById('tab-cart-tracker');
    this.cartItemsView = document.getElementById('cart-items-view');
    this.cartTrackerView = document.getElementById('cart-tracker-view');
    
    this.cartItemsContainer = document.getElementById('cart-items-container');
    this.cartBadge = document.getElementById('cart-badge-count');
    this.cartTabCount = document.getElementById('cart-tab-count');
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
    this.cartOpenBtn?.addEventListener('click', () => this.openCart('items'));
    this.cartCloseBtn?.addEventListener('click', () => this.closeCart());
    this.cartOverlay?.addEventListener('click', () => this.closeCart());
    
    this.tabItemsBtn?.addEventListener('click', () => this.switchTab('items'));
    this.tabTrackerBtn?.addEventListener('click', () => this.switchTab('tracker'));

    this.promoBtn?.addEventListener('click', () => this.applyPromo());
    this.checkoutBtn?.addEventListener('click', () => this.openCheckout());
    this.checkoutCloseBtn?.addEventListener('click', () => this.closeCheckout());
    this.checkoutForm?.addEventListener('submit', (e) => this.handleCheckoutSubmit(e));
    this.receiptCloseBtn?.addEventListener('click', () => this.closeReceipt());
  }

  switchTab(tabName) {
    this.activeTab = tabName;
    if (tabName === 'items') {
      this.tabItemsBtn?.classList.add('active');
      this.tabTrackerBtn?.classList.remove('active');
      this.cartItemsView?.classList.add('active');
      this.cartTrackerView?.classList.remove('active');
    } else {
      this.tabItemsBtn?.classList.remove('active');
      this.tabTrackerBtn?.classList.add('active');
      this.cartItemsView?.classList.remove('active');
      this.cartTrackerView?.classList.add('active');
      this.orderTracker?.render();
    }
  }

  openCart(tabName = 'items') {
    this.cartDrawer?.classList.add('open');
    this.cartOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
    this.switchTab(tabName);
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
    this.openCart('items');
    createToast(`"${item.name}" ajouté à votre commande !`, 'success');
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
      createToast('Code BLOOM10 appliqué (-10%)', 'success');
    } else if (code === 'VIP20') {
      this.discountPercent = 20;
      createToast('Code Privilège VIP20 appliqué (-20%)', 'success');
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
    if (this.cartTabCount) {
      this.cartTabCount.textContent = String(totalItems);
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
      const emptySvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      emptySvg.setAttribute('width', '48');
      emptySvg.setAttribute('height', '48');
      emptySvg.setAttribute('viewBox', '0 0 24 24');
      emptySvg.setAttribute('fill', 'none');
      emptySvg.setAttribute('stroke', 'var(--color-rose)');
      emptySvg.setAttribute('stroke-width', '1.5');
      emptySvg.setAttribute('stroke-linecap', 'round');
      emptySvg.setAttribute('stroke-linejoin', 'round');
      const p1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p1.setAttribute('d', 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z');
      const p2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p2.setAttribute('d', 'M3 6h18');
      const p3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p3.setAttribute('d', 'M16 10a4 4 0 0 1-8 0');
      emptySvg.appendChild(p1);
      emptySvg.appendChild(p2);
      emptySvg.appendChild(p3);

      this.cartItemsContainer.appendChild(
        el('div', { style: { textAlign: 'center', padding: '40px 10px', color: 'var(--color-text-muted)' } },
          el('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: '12px' } }, emptySvg),
          el('h4', { style: { fontFamily: 'var(--font-display)', marginBottom: '6px', color: 'var(--color-espresso)' } }, 'Votre panier est vide'),
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
              'aria-label': 'Supprimer cet article',
              title: 'Supprimer',
              onclick: () => this.removeItem(item.cartItemId)
            },
              (() => {
                const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                s.setAttribute('width', '12');
                s.setAttribute('height', '12');
                s.setAttribute('viewBox', '0 0 24 24');
                s.setAttribute('fill', 'none');
                s.setAttribute('stroke', 'currentColor');
                s.setAttribute('stroke-width', '2.4');
                s.setAttribute('stroke-linecap', 'round');
                s.setAttribute('stroke-linejoin', 'round');
                const l1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                l1.setAttribute('x1', '18'); l1.setAttribute('y1', '6'); l1.setAttribute('x2', '6'); l1.setAttribute('y2', '18');
                const l2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                l2.setAttribute('x1', '6'); l2.setAttribute('y1', '6'); l2.setAttribute('x2', '18'); l2.setAttribute('y2', '18');
                s.appendChild(l1);
                s.appendChild(l2);
                return s;
              })()
            )
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
    const orderedItems = [...this.cart];

    // Initialize Active Live Order Simulation
    if (this.orderTracker) {
      this.orderTracker.createOrder({
        orderId: orderNum,
        clientName,
        clientPhone,
        deliveryMethod,
        paymentMethod,
        total,
        items: orderedItems
      });
    }

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
          el('button', {
            type: 'button',
            className: 'btn btn-primary',
            style: { width: '100%', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
            onclick: () => {
              this.closeReceipt();
              this.openCart('tracker');
            }
          }, 'Suivre la préparation en direct')
        )
      );
    }

    this.cart = [];
    this.saveCart();
    this.render();
    this.closeCheckout();

    this.receiptModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
    createToast(`Commande ${orderNum} validée avec succès !`, 'success');
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
      currentStep: 1,
      size: '500ml',
      sizePrice: 0,
      base: 'Thé au Lait',
      basePrice: 2200,
      baseColor: '#D2AC84',
      baseIntensity: 'Moyenne (Assam)',
      baseCal: 140,
      flavor: 'Fraise',
      flavorColor: '#F28299',
      flavorCal: 60,
      topping: 'Tapioca',
      toppingPrice: 500,
      toppingClass: 'tapioca',
      toppingGrad: 'url(#pearlGradTapioca)',
      toppingCal: 70,
      sweetness: '50%',
      sweetnessCal: 45,
      ice: '50%'
    };

    this.initElements();
    this.bindEvents();
    this.updateVisuals();
  }

  initElements() {
    this.cupViewport = document.getElementById('cup-interactive-wrapper');
    this.liquidTop = document.getElementById('liquidStopTop');
    this.liquidMid = document.getElementById('liquidStopMid');
    this.liquidBottom = document.getElementById('liquidStopBottom');
    this.liquidWaveBack = document.getElementById('liquidStopWaveBack');
    this.liquidWave = document.getElementById('svg-liquid-wave');
    this.creamLayer = document.getElementById('svg-cream-layer');
    this.milkRibbon = document.getElementById('svg-milk-ribbon');
    this.tigerStreaks = document.getElementById('svg-tiger-streaks');
    this.syrupBase = document.getElementById('svg-syrup-base');
    this.pearlsGroup = document.getElementById('svg-pearls-group');
    this.iceGroup = document.getElementById('svg-ice-cubes-group');
    this.bubblesGroup = document.getElementById('svg-fizzy-bubbles');
    
    this.drinkNameEl = document.getElementById('builder-drink-name');
    this.drinkPriceEl = document.getElementById('builder-live-price');
    this.drinkSummaryEl = document.getElementById('builder-drink-summary');
    this.stepIndicatorEl = document.getElementById('builder-step-indicator');
    this.addToCartBtn = document.getElementById('btn-add-custom-drink');
    this.sizeButtons = document.querySelectorAll('.size-switch-btn');
    
    this.calEl = document.getElementById('spec-calories');
    this.intensityEl = document.getElementById('spec-intensity');
  }

  shakeCup() {
    if (!this.cupViewport) return;
    this.cupViewport.classList.remove('cup-shaking');
    void this.cupViewport.offsetWidth; // trigger reflow
    this.cupViewport.classList.add('cup-shaking');
    setTimeout(() => {
      this.cupViewport?.classList.remove('cup-shaking');
    }, 650);
  }

  getArtisanalDrinkTitle() {
    const titles = {
      'Thé au Lait': {
        'Fraise': 'Thé au Lait & Fraise Artisanale',
        'Mangue Passion': 'Thé au Lait & Nectar Mangue Passion',
        'Taro Pourpre': 'Taro Pourpre Onctueux au Lait d\'Assam',
        'Sucre Noir': 'Brown Sugar Tiger Milk Tea'
      },
      'Thé Vert Jasmin': {
        'Fraise': 'Jasmin Floral & Coulis de Fraise',
        'Mangue Passion': 'Jasmin Impérial Mangue Passion',
        'Taro Pourpre': 'Jasmin Frais & Douceur de Taro',
        'Sucre Noir': 'Jasmin Ambré au Sucre Noir'
      },
      'Matcha Uji': {
        'Fraise': 'Matcha Uji Bio & Coulis de Fraise',
        'Mangue Passion': 'Matcha Uji & Purée de Mangue',
        'Taro Pourpre': 'Matcha & Taro Bicolore de Kyoto',
        'Sucre Noir': 'Matcha Pur & Sirop de Sucre Noir'
      },
      'Infusion Bissap': {
        'Fraise': 'Bissap Royal & Fraise Sauvage',
        'Mangue Passion': 'Bissap Sunset Mangue Passion',
        'Taro Pourpre': 'Infusion Bissap Velouté Taro',
        'Sucre Noir': 'Bissap Épicé au Sucre de Canne Brun'
      }
    };

    return titles[this.state.base]?.[this.state.flavor] || `${this.state.flavor} ${this.state.base}`;
  }

  bindEvents() {
    // 1. Size switch
    this.sizeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget;
        this.sizeButtons.forEach(b => b.classList.remove('active'));
        target.classList.add('active');
        this.state.size = target.dataset.size || '500ml';
        this.state.sizePrice = parseInt(target.dataset.price, 10) || 0;
        this.shakeCup();
        this.updateVisuals();
      });
    });

    // 2. Interactive Shaking on click
    this.cupViewport?.addEventListener('click', () => {
      this.shakeCup();
    });

    // 3. Unified option chips across all 5 steps
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
          this.state.baseIntensity = target.dataset.intensity || 'Moyenne';
          this.state.baseCal = parseInt(target.dataset.cal, 10) || 120;
          this.state.currentStep = 1;
        } else if (step === 'flavor') {
          this.state.flavor = target.dataset.value;
          this.state.flavorColor = target.dataset.color || '#F28299';
          this.state.flavorCal = parseInt(target.dataset.cal, 10) || 60;
          this.state.currentStep = 2;
        } else if (step === 'topping') {
          this.state.topping = target.dataset.value;
          this.state.toppingPrice = parseInt(target.dataset.price, 10) || 0;
          this.state.toppingClass = target.dataset.toppingClass || 'tapioca';
          this.state.toppingCal = parseInt(target.dataset.cal, 10) || 0;
          
          if (this.state.toppingClass === 'tapioca') this.state.toppingGrad = 'url(#pearlGradTapioca)';
          else if (this.state.toppingClass === 'popping') this.state.toppingGrad = 'url(#pearlGradPopping)';
          else if (this.state.toppingClass === 'jelly') this.state.toppingGrad = 'url(#pearlGradJelly)';
          else this.state.toppingGrad = 'none';

          this.state.currentStep = 3;
        } else if (step === 'sweetness') {
          this.state.sweetness = target.dataset.value;
          this.state.sweetnessCal = parseInt(target.dataset.cal, 10) || 45;
          this.state.currentStep = 4;
        } else if (step === 'ice') {
          this.state.ice = target.dataset.value;
          this.state.currentStep = 5;
        }

        this.updateStepCards();
        this.updateVisuals();
      });
    });

    // Fallback support for slider buttons if rendered
    document.querySelectorAll('[data-step="sweetness"] .slider-label-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('[data-step="sweetness"] .slider-label-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.state.sweetness = e.currentTarget.dataset.value;
        this.state.sweetnessCal = parseInt(e.currentTarget.dataset.cal, 10) || 45;
        this.state.currentStep = 4;
        this.updateStepCards();
        this.updateVisuals();
      });
    });

    document.querySelectorAll('[data-step="ice"] .slider-label-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('[data-step="ice"] .slider-label-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.state.ice = e.currentTarget.dataset.value;
        this.state.currentStep = 5;
        this.updateStepCards();
        this.updateVisuals();
      });
    });

    // 4. Add to cart
    this.addToCartBtn?.addEventListener('click', () => {
      const price = this.state.basePrice + this.state.toppingPrice + this.state.sizePrice;
      const title = this.getArtisanalDrinkTitle();
      this.cartManager.addItem({
        id: 'custom-' + Date.now(),
        name: title,
        price,
        size: `${this.state.size} (${this.state.size === '700ml' ? 'Grand Format' : 'Format Moyen'})`,
        sweetness: this.state.sweetness,
        ice: this.state.ice,
        toppings: this.state.topping,
        image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=700&q=85'
      });
    });
  }

  updateStepCards() {
    document.querySelectorAll('.builder-step-card').forEach(card => {
      const idx = parseInt(card.dataset.stepIndex, 10);
      if (idx === this.state.currentStep) card.classList.add('active-step');
      else card.classList.remove('active-step');
    });

    const stepNames = [
      '', 'Base de Thé Noble', 'Saveur & Coulis', 'Toppings Gourmands', 'Niveau de Sucre', 'Niveau de Glaçons'
    ];
    if (this.stepIndicatorEl) {
      this.stepIndicatorEl.textContent = `Étape ${this.state.currentStep} / 5 • ${stepNames[this.state.currentStep] || 'Personnalisation'}`;
    }
  }

  getRealisticMixologyProfile() {
    // Complete artisanal tea blend color science matrix
    const palette = {
      'Thé au Lait': {
        'Fraise': {
          top: '#F9B4C4',
          mid: '#E8B6A2',
          bottom: '#D0A882',
          waveBack: '#F49DB2',
          tigerStroke: '#C4284D',
          tigerOpacity: '0.7',
          creamOpacity: '0.85',
          milkRibbonOpacity: '0.38'
        },
        'Mangue Passion': {
          top: '#FFC870',
          mid: '#F2B580',
          bottom: '#CCA27C',
          waveBack: '#FCA845',
          tigerStroke: '#D97706',
          tigerOpacity: '0.75',
          creamOpacity: '0.85',
          milkRibbonOpacity: '0.36'
        },
        'Taro Pourpre': {
          top: '#B3A2D4',
          mid: '#CDBFE6',
          bottom: '#9E8DBF',
          waveBack: '#A491C9',
          tigerStroke: '#6D5B94',
          tigerOpacity: '0.65',
          creamOpacity: '0.9',
          milkRibbonOpacity: '0.45'
        },
        'Sucre Noir': {
          top: '#F4DECE',
          mid: '#D5A986',
          bottom: '#542D1A',
          waveBack: '#E3BEA0',
          tigerStroke: '#3B1B0E',
          tigerOpacity: '0.92',
          creamOpacity: '0.9',
          milkRibbonOpacity: '0.5'
        }
      },
      'Thé Vert Jasmin': {
        'Fraise': {
          top: '#E87D94',
          mid: '#C99D8F',
          bottom: '#A4BEA2',
          waveBack: '#DE6B84',
          tigerStroke: '#B82444',
          tigerOpacity: '0.75',
          creamOpacity: '0.3',
          milkRibbonOpacity: '0.15'
        },
        'Mangue Passion': {
          top: '#F7A738',
          mid: '#D6BD7D',
          bottom: '#A9C4A6',
          waveBack: '#F29724',
          tigerStroke: '#D97706',
          tigerOpacity: '0.78',
          creamOpacity: '0.25',
          milkRibbonOpacity: '0.12'
        },
        'Taro Pourpre': {
          top: '#A797C7',
          mid: '#B4B6B0',
          bottom: '#A8C2A5',
          waveBack: '#9886BD',
          tigerStroke: '#7A67A3',
          tigerOpacity: '0.6',
          creamOpacity: '0.4',
          milkRibbonOpacity: '0.2'
        },
        'Sucre Noir': {
          top: '#C2A384',
          mid: '#9E8A74',
          bottom: '#452A1D',
          waveBack: '#B1906F',
          tigerStroke: '#3B1D11',
          tigerOpacity: '0.88',
          creamOpacity: '0.35',
          milkRibbonOpacity: '0.2'
        }
      },
      'Matcha Uji': {
        'Fraise': {
          top: '#4E7E45',
          mid: '#9AB893',
          bottom: '#D94B68',
          waveBack: '#436E3B',
          tigerStroke: '#C4284D',
          tigerOpacity: '0.82',
          creamOpacity: '0.85',
          milkRibbonOpacity: '0.35'
        },
        'Mangue Passion': {
          top: '#4D7D45',
          mid: '#99B87F',
          bottom: '#F59E0B',
          waveBack: '#426D3A',
          tigerStroke: '#D97706',
          tigerOpacity: '0.8',
          creamOpacity: '0.85',
          milkRibbonOpacity: '0.32'
        },
        'Taro Pourpre': {
          top: '#4E7E46',
          mid: '#8D9088',
          bottom: '#9684BC',
          waveBack: '#416B3A',
          tigerStroke: '#6E5C96',
          tigerOpacity: '0.7',
          creamOpacity: '0.85',
          milkRibbonOpacity: '0.36'
        },
        'Sucre Noir': {
          top: '#538249',
          mid: '#7B7E67',
          bottom: '#3E2215',
          waveBack: '#46703E',
          tigerStroke: '#2D150B',
          tigerOpacity: '0.94',
          creamOpacity: '0.9',
          milkRibbonOpacity: '0.4'
        }
      },
      'Infusion Bissap': {
        'Fraise': {
          top: '#BF1E40',
          mid: '#D93256',
          bottom: '#8E122C',
          waveBack: '#AF1535',
          tigerStroke: '#7A0A21',
          tigerOpacity: '0.8',
          creamOpacity: '0.2',
          milkRibbonOpacity: '0.1'
        },
        'Mangue Passion': {
          top: '#BA1E3F',
          mid: '#E05A3A',
          bottom: '#F59E0B',
          waveBack: '#AA1736',
          tigerStroke: '#B45309',
          tigerOpacity: '0.82',
          creamOpacity: '0.2',
          milkRibbonOpacity: '0.1'
        },
        'Taro Pourpre': {
          top: '#B31E40',
          mid: '#B04B6E',
          bottom: '#8E73AB',
          waveBack: '#A11637',
          tigerStroke: '#631835',
          tigerOpacity: '0.7',
          creamOpacity: '0.3',
          milkRibbonOpacity: '0.15'
        },
        'Sucre Noir': {
          top: '#A81A37',
          mid: '#78192A',
          bottom: '#380B14',
          waveBack: '#951430',
          tigerStroke: '#28060D',
          tigerOpacity: '0.9',
          creamOpacity: '0.2',
          milkRibbonOpacity: '0.1'
        }
      }
    };

    return palette[this.state.base]?.[this.state.flavor] || {
      top: this.state.flavorColor,
      mid: this.state.flavorColor,
      bottom: this.state.baseColor,
      waveBack: this.state.flavorColor,
      tigerStroke: '#421E12',
      tigerOpacity: '0.6',
      creamOpacity: '0.8',
      milkRibbonOpacity: '0.3'
    };
  }

  updateVisuals() {
    const profile = this.getRealisticMixologyProfile();

    // 1. Dynamic Liquid Gradients & Waves
    if (this.liquidTop) this.liquidTop.setAttribute('stop-color', profile.top);
    if (this.liquidMid) this.liquidMid.setAttribute('stop-color', profile.mid);
    if (this.liquidBottom) this.liquidBottom.setAttribute('stop-color', profile.bottom);
    if (this.liquidWaveBack) this.liquidWaveBack.setAttribute('stop-color', profile.waveBack);

    // 2. Velvety Cream Foam Head & Milk Ribbon Swirl
    if (this.creamLayer) {
      this.creamLayer.setAttribute('opacity', profile.creamOpacity);
    }
    if (this.milkRibbon) {
      this.milkRibbon.setAttribute('stroke-opacity', profile.milkRibbonOpacity);
    }

    // 3. Realistic Tiger Syrup Marbling & Fruit Coulis Drips
    if (this.tigerStreaks) {
      this.tigerStreaks.setAttribute('stroke', profile.tigerStroke);
      this.tigerStreaks.setAttribute('opacity', profile.tigerOpacity);
    }

    // 4. Syrup Meniscus Bed at Base
    if (this.syrupBase) {
      if (this.state.toppingClass === 'none') {
        this.syrupBase.setAttribute('opacity', '0.2');
      } else if (this.state.toppingClass === 'popping') {
        this.syrupBase.setAttribute('opacity', '0.75');
      } else {
        this.syrupBase.setAttribute('opacity', '0.9');
      }
    }

    // 5. Realistic 3D Pearls with Natural Packing & Gloss Physics
    if (this.pearlsGroup) {
      clearChildren(this.pearlsGroup);
      if (this.state.toppingClass !== 'none') {
        const pearlLayout = [
          // Row 1 (base bed)
          { cx: 96, cy: 416, r: 12.5, anim: 1 },
          { cx: 118, cy: 418, r: 12, anim: 2 },
          { cx: 140, cy: 417, r: 13, anim: 3 },
          { cx: 162, cy: 418, r: 12.5, anim: 1 },
          { cx: 184, cy: 417, r: 12, anim: 2 },
          { cx: 204, cy: 415, r: 11.5, anim: 3 },

          // Row 2 (second layer)
          { cx: 104, cy: 397, r: 12, anim: 2 },
          { cx: 126, cy: 398, r: 12.5, anim: 3 },
          { cx: 150, cy: 396, r: 13, anim: 1 },
          { cx: 174, cy: 398, r: 12, anim: 2 },
          { cx: 196, cy: 396, r: 11.5, anim: 1 },

          // Row 3 (third layer)
          { cx: 114, cy: 377, r: 11.8, anim: 3 },
          { cx: 138, cy: 376, r: 12.2, anim: 1 },
          { cx: 162, cy: 378, r: 12, anim: 2 },
          { cx: 186, cy: 376, r: 11.5, anim: 3 },

          // Top floating gems
          { cx: 128, cy: 356, r: 11.5, anim: 1 },
          { cx: 152, cy: 355, r: 12, anim: 2 },
          { cx: 174, cy: 357, r: 11, anim: 3 }
        ];

        pearlLayout.forEach(p => {
          const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          g.setAttribute('class', `svg-boba-pearl pearl-float-${p.anim}`);

          if (this.state.toppingClass === 'jelly') {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', String(p.cx - 10));
            rect.setAttribute('y', String(p.cy - 9));
            rect.setAttribute('width', '20');
            rect.setAttribute('height', '18');
            rect.setAttribute('rx', '4');
            rect.setAttribute('fill', this.state.toppingGrad);
            g.appendChild(rect);

            // Specular facet
            const facet = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            facet.setAttribute('x', String(p.cx - 8));
            facet.setAttribute('y', String(p.cy - 7));
            facet.setAttribute('width', '7');
            facet.setAttribute('height', '5');
            facet.setAttribute('rx', '2');
            facet.setAttribute('fill', 'rgba(255,255,255,0.7)');
            g.appendChild(facet);
          } else {
            // Main sphere
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', String(p.cx));
            circle.setAttribute('cy', String(p.cy));
            circle.setAttribute('r', String(p.r));
            circle.setAttribute('fill', this.state.toppingGrad);
            g.appendChild(circle);

            // 3D Specular Highlight (Glossy curved reflection)
            const gloss1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            gloss1.setAttribute('cx', String(p.cx - p.r * 0.32));
            gloss1.setAttribute('cy', String(p.cy - p.r * 0.32));
            gloss1.setAttribute('r', String(p.r * 0.32));
            gloss1.setAttribute('fill', 'rgba(255,255,255,0.8)');
            g.appendChild(gloss1);

            // Subsurface light point
            const gloss2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            gloss2.setAttribute('cx', String(p.cx + p.r * 0.34));
            gloss2.setAttribute('cy', String(p.cy + p.r * 0.34));
            gloss2.setAttribute('r', String(p.r * 0.18));
            gloss2.setAttribute('fill', 'rgba(255,255,255,0.35)');
            g.appendChild(gloss2);
          }

          g.addEventListener('click', (e) => {
            e.stopPropagation();
            this.shakeCup();
          });

          this.pearlsGroup.appendChild(g);
        });
      }
    }

    // 6. Faceted 3D Ice Cubes with Refraction
    if (this.iceGroup) {
      clearChildren(this.iceGroup);
      const iceLevels = {
        '0%': [],
        '30%': [
          { x: 104, y: 190, w: 34, h: 28, rot: 10, wobble: 1 },
          { x: 158, y: 200, w: 34, h: 30, rot: -14, wobble: 2 }
        ],
        '50%': [
          { x: 94, y: 172, w: 34, h: 30, rot: 14, wobble: 1 },
          { x: 154, y: 178, w: 36, h: 32, rot: -18, wobble: 2 },
          { x: 122, y: 218, w: 32, h: 28, rot: 8, wobble: 1 },
          { x: 164, y: 232, w: 30, h: 26, rot: -10, wobble: 2 }
        ],
        '100%': [
          { x: 90, y: 158, w: 34, h: 30, rot: 15, wobble: 1 },
          { x: 150, y: 164, w: 36, h: 32, rot: -20, wobble: 2 },
          { x: 110, y: 204, w: 34, h: 30, rot: 6, wobble: 1 },
          { x: 160, y: 214, w: 32, h: 28, rot: -12, wobble: 2 },
          { x: 128, y: 248, w: 34, h: 30, rot: 18, wobble: 1 },
          { x: 96, y: 258, w: 30, h: 26, rot: -8, wobble: 2 }
        ]
      };

      const cubes = iceLevels[this.state.ice] || iceLevels['50%'];
      cubes.forEach(c => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', `svg-ice-cube ice-wobble-${c.wobble}`);
        g.setAttribute('transform', `rotate(${c.rot} ${c.x + c.w/2} ${c.y + c.h/2})`);

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', String(c.x));
        rect.setAttribute('y', String(c.y));
        rect.setAttribute('width', String(c.w));
        rect.setAttribute('height', String(c.h));
        rect.setAttribute('rx', '6');
        rect.setAttribute('fill', 'url(#iceCubeGrad)');
        rect.setAttribute('stroke', 'rgba(255,255,255,0.9)');
        rect.setAttribute('stroke-width', '1.6');
        g.appendChild(rect);

        // Internal bevel fissure for 3D realism
        const innerLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        innerLine.setAttribute('d', `M${c.x + 4} ${c.y + c.h - 4} L${c.x + 8} ${c.y + 6} L${c.x + c.w - 6} ${c.y + 6}`);
        innerLine.setAttribute('fill', 'none');
        innerLine.setAttribute('stroke', 'rgba(255,255,255,0.7)');
        innerLine.setAttribute('stroke-width', '1.4');
        g.appendChild(innerLine);

        this.iceGroup.appendChild(g);
      });
    }

    // 7. Rising Fizzy Micro-Bubbles
    if (this.bubblesGroup) {
      clearChildren(this.bubblesGroup);
      const bubblePositions = [
        { cx: 88, cy: 370, r: 2.5, delay: '0s' },
        { cx: 120, cy: 385, r: 3, delay: '0.6s' },
        { cx: 175, cy: 360, r: 2, delay: '1.2s' },
        { cx: 195, cy: 390, r: 3.5, delay: '1.8s' },
        { cx: 140, cy: 350, r: 2.5, delay: '2.4s' },
        { cx: 105, cy: 330, r: 2, delay: '3.0s' }
      ];
      bubblePositions.forEach(b => {
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', String(b.cx));
        c.setAttribute('cy', String(b.cy));
        c.setAttribute('r', String(b.r));
        c.setAttribute('fill', 'rgba(255,255,255,0.85)');
        c.setAttribute('class', 'fizzy-micro-bubble');
        c.style.animationDelay = b.delay;
        this.bubblesGroup.appendChild(c);
      });
    }

    // 8. Total Price & Title
    const price = this.state.basePrice + this.state.toppingPrice + this.state.sizePrice;
    const title = this.getArtisanalDrinkTitle();

    if (this.drinkNameEl) this.drinkNameEl.textContent = title;
    if (this.drinkPriceEl) this.drinkPriceEl.textContent = `${price.toLocaleString('fr-FR')} FCFA`;

    // 9. Summary Chips
    if (this.drinkSummaryEl) {
      clearChildren(this.drinkSummaryEl);
      [
        `Format: ${this.state.size}`,
        `Base: ${this.state.base}`,
        `Saveur: ${this.state.flavor}`,
        `Topping: ${this.state.topping}`,
        `Sucre: ${this.state.sweetness}`,
        `Glaçons: ${this.state.ice}`
      ].forEach(text => {
        this.drinkSummaryEl.appendChild(el('span', { className: 'summary-chip' }, text));
      });
    }

    // 10. Nutrition Calculation
    const totalCal = this.state.baseCal + this.state.flavorCal + this.state.toppingCal + this.state.sweetnessCal + (this.state.size === '700ml' ? 65 : 0);
    if (this.calEl) this.calEl.textContent = `~${totalCal} kcal`;
    if (this.intensityEl) this.intensityEl.textContent = this.state.baseIntensity;
  }
}

/* ==========================================================================
   Order Tracker Manager & Status Simulator
   ========================================================================== */
class OrderTrackerManager {
  constructor() {
    this.container = document.getElementById('order-tracker-content');
    this.autoTimer = null;
    this.currentOrder = this.loadOrder() || {
      orderId: 'BB-742910',
      clientName: 'Yasmine Dossou',
      clientPhone: '+229 97 00 11 22',
      deliveryMethod: 'Click & Collect (Haie Vive)',
      paymentMethod: 'MTN Mobile Money',
      total: 5900,
      statusStep: 2, // 1: Enregistrée, 2: En préparation, 3: Prêt / En livraison, 4: Livré
      items: [
        { name: 'Brown Sugar Lait Frais', quantity: 1, price: 3200, size: '500ml', sweetness: '50%', ice: '50%', toppings: 'Tapioca Chaud' },
        { name: 'Matcha Cérémonie Glacé', quantity: 1, price: 2700, size: '500ml', sweetness: '30%', ice: '70%', toppings: 'Perles Litchi' }
      ],
      createdAt: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };

    this.render();
  }

  loadOrder() {
    try {
      const data = localStorage.getItem('boba_bloom_active_order');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  saveOrder() {
    try {
      localStorage.setItem('boba_bloom_active_order', JSON.stringify(this.currentOrder));
    } catch (e) {
      console.warn('Order tracker storage error:', e);
    }
  }

  createOrder(details) {
    this.currentOrder = {
      ...details,
      statusStep: 1,
      createdAt: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
    this.saveOrder();
    this.render();

    // Automatically advance to 'En préparation' after 3.5s for realism
    if (this.autoTimer) clearTimeout(this.autoTimer);
    this.autoTimer = setTimeout(() => {
      if (this.currentOrder && this.currentOrder.statusStep === 1) {
        this.setStep(2);
        createToast('Mise à jour : Votre Bubble Tea est en cours de préparation au comptoir !', 'info');
      }
    }, 3500);
  }

  setStep(stepIndex) {
    if (!this.currentOrder) return;
    this.currentOrder.statusStep = stepIndex;
    this.saveOrder();
    this.render();
  }

  startAutoSimulation() {
    if (this.autoTimer) clearInterval(this.autoTimer);
    let step = 1;
    this.setStep(step);
    createToast('Simulation démarrée : 1. Enregistrée', 'info');

    this.autoTimer = setInterval(() => {
      step++;
      if (step > 4) {
        clearInterval(this.autoTimer);
        this.autoTimer = null;
        createToast('Simulation terminée : Commande livrée et dégustée !', 'success');
        return;
      }
      this.setStep(step);
      const names = ['', 'Enregistrée', 'En préparation', 'Prêt à être récupéré / En livraison', 'Livré & Dégusté'];
      createToast(`Simulation : Étape ${step} - ${names[step]}`, 'info');
    }, 4000);
  }

  render() {
    if (!this.container) return;
    clearChildren(this.container);

    const order = this.currentOrder;
    if (!order) {
      this.container.appendChild(
        el('div', { style: { textAlign: 'center', padding: '30px 10px', color: 'var(--color-text-muted)' } },
          el('h4', { style: { fontFamily: 'var(--font-display)', marginBottom: '8px', color: 'var(--color-espresso)' } }, 'Aucune commande active'),
          el('p', { style: { fontSize: '0.85rem' } }, 'Validez une commande pour suivre son statut en temps réel.')
        )
      );
      return;
    }

    const isDelivery = order.deliveryMethod && order.deliveryMethod.toLowerCase().includes('livraison');
    const step = order.statusStep || 1;

    // Step configuration
    const stepConfigs = {
      1: {
        pillClass: 'status-registered',
        pillLabel: 'Reçue au salon',
        headline: 'Commande confirmée',
        desc: "Votre commande est transmise avec succès au comptoir Boba Bloom (Haie Vive).",
        eta: 'Prêt dans ~12 min'
      },
      2: {
        pillClass: 'status-prep',
        pillLabel: 'En préparation',
        headline: 'Infusion & Assemblage Artisanal',
        desc: "Nos baristas infusent les thés d'origine, cuisent les perles au sucre d'Okinawa et émulsionnent votre création minute.",
        eta: 'Prêt dans ~6 min'
      },
      3: {
        pillClass: 'status-ready',
        pillLabel: isDelivery ? 'En cours de livraison' : 'Prêt à être récupéré',
        headline: isDelivery ? 'Livreur Express en route' : 'Votre Bubble Tea vous attend au bar',
        desc: isDelivery
          ? 'Votre commande fraîchement scellée est confiée au livreur express vers votre adresse à Cotonou.'
          : 'Votre boisson est dressée au comptoir du salon de Haie Vive. Présentez votre numéro de commande.',
        eta: isDelivery ? 'Arrivée dans ~10 min' : 'Disponible immédiatement'
      },
      4: {
        pillClass: 'status-delivered',
        pillLabel: 'Dégustation & Livré',
        headline: 'Commande remise avec succès',
        desc: 'Merci pour votre confiance chez Boba Bloom. Excellente dégustation à vous !',
        eta: 'Terminée'
      }
    };

    const currentCfg = stepConfigs[step] || stepConfigs[1];

    // Status Card
    const statusCard = el('div', { className: 'tracker-status-card' },
      el('div', { className: 'tracker-badge-row' },
        el('span', { className: `tracker-status-pill ${currentCfg.pillClass}` },
          el('span', { className: 'live-pulse-dot' }),
          currentCfg.pillLabel
        ),
        el('span', { className: 'tracker-countdown-tag' }, currentCfg.eta)
      ),
      el('div', { className: 'tracker-order-id' }, `Commande n° ${order.orderId} • ${order.createdAt || 'Aujourd\'hui'}`),
      el('h4', { className: 'tracker-headline' }, currentCfg.headline),
      el('p', { className: 'tracker-desc' }, currentCfg.desc)
    );

    // Timeline 4-step progress
    const stepsData = [
      {
        num: 1,
        title: '1. Commande Reçue',
        sub: 'Enregistrée en caisse',
        iconSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
      },
      {
        num: 2,
        title: '2. En préparation',
        sub: 'Infusion du thé & cuisson perles',
        iconSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="m4.93 10.93 2.83-2.83"/><path d="M2 18h20"/><path d="M20 18v-2a6 6 0 0 0-6-6H10a6 6 0 0 0-6 6v2"/><path d="m19.07 10.93-2.83-2.83"/></svg>'
      },
      {
        num: 3,
        title: isDelivery ? '3. En cours de livraison' : '3. Prêt à être récupéré',
        sub: isDelivery ? 'En route avec le coursier' : 'Au comptoir de Haie Vive',
        iconSvg: isDelivery
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18.5" cy="17.5" r="2.5"/><circle cx="5.5" cy="17.5" r="2.5"/><path d="M15 6h-5a2 2 0 0 0-2 2v7h10V9a3 3 0 0 0-3-3Z"/></svg>'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>'
      },
      {
        num: 4,
        title: '4. Dégustation & Livré',
        sub: 'Boisson remise au client',
        iconSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>'
      }
    ];

    const timelineEl = el('div', { className: 'tracker-timeline' });
    stepsData.forEach(s => {
      let stateClass = '';
      if (step > s.num) stateClass = 'completed';
      else if (step === s.num) stateClass = 'active';

      const iconBox = el('div', { className: 'tracker-step-icon-box' });
      iconBox.innerHTML = s.iconSvg;

      const itemEl = el('div', { className: `tracker-step-item ${stateClass}` },
        iconBox,
        el('div', { className: 'tracker-step-details' },
          el('div', { className: 'tracker-step-title' }, s.title),
          el('div', { className: 'tracker-step-subtitle' }, s.sub)
        )
      );
      timelineEl.appendChild(itemEl);
    });

    // Order Summary Info
    const orderDetailsCard = el('div', { style: { background: 'var(--color-cream-bg)', borderRadius: 'var(--radius-md)', padding: '14px', fontSize: '0.85rem' } },
      el('div', { style: { fontWeight: '700', color: 'var(--color-espresso)', marginBottom: '8px' } }, 'Détails de la commande'),
      el('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' } },
        el('span', { style: { color: 'var(--color-text-muted)' } }, 'Destinataire :'),
        el('span', { style: { fontWeight: '600' } }, order.clientName)
      ),
      el('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' } },
        el('span', { style: { color: 'var(--color-text-muted)' } }, 'Mode :'),
        el('span', { style: { fontWeight: '600' } }, order.deliveryMethod)
      ),
      el('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' } },
        el('span', { style: { color: 'var(--color-text-muted)' } }, 'Paiement :'),
        el('span', { style: { fontWeight: '600' } }, order.paymentMethod)
      ),
      el('div', { style: { borderTop: '1px dashed var(--color-border)', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: 'var(--color-espresso)' } },
        el('span', {}, 'Total réglé :'),
        el('span', {}, `${(order.total || 0).toLocaleString('fr-FR')} FCFA`)
      )
    );

    // Interactive Simulator Controls
    const simulatorPanel = el('div', { className: 'tracker-sim-panel' },
      el('div', { className: 'tracker-sim-header' },
        el('span', {}, 'Simulateur d\'état'),
        el('span', { style: { fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'none' } }, 'Test en direct')
      ),
      el('div', { className: 'tracker-sim-buttons-grid' },
        el('button', {
          type: 'button',
          className: `sim-btn-step ${step === 1 ? 'active' : ''}`,
          onclick: () => this.setStep(1)
        }, '1. Reçue'),
        el('button', {
          type: 'button',
          className: `sim-btn-step ${step === 2 ? 'active' : ''}`,
          onclick: () => this.setStep(2)
        }, '2. En préparation'),
        el('button', {
          type: 'button',
          className: `sim-btn-step ${step === 3 ? 'active' : ''}`,
          onclick: () => this.setStep(3)
        }, isDelivery ? '3. En livraison' : '3. Prêt au bar'),
        el('button', {
          type: 'button',
          className: `sim-btn-step ${step === 4 ? 'active' : ''}`,
          onclick: () => this.setStep(4)
        }, '4. Livré & Dégusté')
      ),
      el('button', {
        type: 'button',
        className: 'btn btn-secondary',
        style: { width: '100%', marginTop: '10px', fontSize: '0.8rem', padding: '8px 12px' },
        onclick: () => this.startAutoSimulation()
      }, '▶ Lancer le cycle automatique (4s/étape)')
    );

    this.container.appendChild(statusCard);
    this.container.appendChild(timelineEl);
    this.container.appendChild(orderDetailsCard);
    this.container.appendChild(simulatorPanel);
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
    this.orderTracker = new OrderTrackerManager();
    this.cartManager.setOrderTracker(this.orderTracker);
    this.drinkBuilder = new DrinkBuilder(this.cartManager);
    this.legalModals = new LegalModalManager();

    this.initNavigation();
    this.initHeroSwitcher();
    this.initMenuSection();
    this.initReservation();
    this.initTestimonialsCarousel();
    this.initFaqSection();
    this.initCookies();
    this.initGallery();
    this.initNewsletter();
    this.initScrollytellingDrinkAssembly();
    this.initScrollReveal();
    this.initHeroTextRotator();
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

  initHeroTextRotator() {
    const textEl = document.getElementById('hero-rotating-text');
    const cursorEl = document.querySelector('.hero-rotator-cursor');
    if (!textEl) return;

    const phrases = [
      'Thés Rares',
      'Créations Florales',
      'Perles d’Okinawa',
      'Infusions Nobles',
      'Saveurs d’Asie',
      'Douceurs Gourmandes'
    ];

    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let isDeleting = true;
    let timeoutId = null;

    const typeLoop = () => {
      if (document.hidden) {
        timeoutId = setTimeout(typeLoop, 400);
        return;
      }

      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        cursorEl?.classList.add('is-typing');
        charIndex--;
        textEl.textContent = currentPhrase.substring(0, charIndex);

        if (charIndex <= 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          cursorEl?.classList.remove('is-typing');
          timeoutId = setTimeout(typeLoop, 380);
          return;
        }

        timeoutId = setTimeout(typeLoop, 45);
      } else {
        cursorEl?.classList.add('is-typing');
        charIndex++;
        textEl.textContent = currentPhrase.substring(0, charIndex);

        if (charIndex >= currentPhrase.length) {
          isDeleting = true;
          cursorEl?.classList.remove('is-typing');
          timeoutId = setTimeout(typeLoop, 2200);
          return;
        }

        // Cadence de frappe réaliste type clavier
        const typingDelay = 65 + Math.floor(Math.random() * 45);
        timeoutId = setTimeout(typeLoop, typingDelay);
      }
    };

    // Pause initiale pour savourer le premier mot
    timeoutId = setTimeout(typeLoop, 2400);

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && !timeoutId) {
        typeLoop();
      }
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

      filtered.forEach((product, idx) => {
        const spinner = el('div', { className: 'card-media-spinner' },
          el('div', { className: 'boba-mini-spinner' })
        );

        const imgEl = el('img', {
          src: product.image,
          alt: product.name,
          className: 'card-img',
          loading: 'lazy'
        });

        const onImageReady = () => {
          imgEl.classList.add('loaded');
          spinner.classList.add('hidden');
        };

        if (imgEl.complete && imgEl.naturalHeight !== 0) {
          onImageReady();
        } else {
          imgEl.addEventListener('load', onImageReady);
          imgEl.addEventListener('error', onImageReady);
        }

        const card = el('div', { 
          className: 'menu-product-card',
          style: { animationDelay: `${Math.min(idx * 0.05, 0.4)}s` }
        },
          el('div', { className: 'card-media-wrapper' },
            spinner,
            imgEl,
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

  initTestimonialsCarousel() {
    const track = document.getElementById('testimonials-track');
    const carouselWrapper = document.getElementById('testimonials-carousel');
    const prevBtn = document.getElementById('testi-prev-btn');
    const nextBtn = document.getElementById('testi-next-btn');
    const dotsContainer = document.getElementById('testi-dots-container');

    if (!track || !carouselWrapper) return;

    const slides = Array.from(track.querySelectorAll('.testimonial-slide'));
    if (!slides.length) return;

    let currentIndex = 0;
    let autoInterval = null;
    let isPaused = false;

    const getVisibleCount = () => {
      const width = window.innerWidth;
      if (width > 1024) return 3;
      if (width > 640) return 2;
      return 1;
    };

    const getMaxIndex = () => {
      const visible = getVisibleCount();
      return Math.max(0, slides.length - visible);
    };

    const buildDots = () => {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const maxIdx = getMaxIndex();
      
      for (let i = 0; i <= maxIdx; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `carousel-dot ${i === currentIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Voir groupe d'avis ${i + 1}`);
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
        dot.addEventListener('click', () => {
          goToSlide(i);
          restartAutoPlay();
        });
        dotsContainer.appendChild(dot);
      }
    };

    const updateCarousel = () => {
      const maxIdx = getMaxIndex();
      if (currentIndex > maxIdx) currentIndex = maxIdx;

      // Calculate actual offset
      const firstSlide = slides[0];
      if (!firstSlide) return;

      const slideRect = firstSlide.getBoundingClientRect();
      const trackStyle = window.getComputedStyle(track);
      const gap = parseFloat(trackStyle.gap) || 24;
      const slideWidth = slideRect.width;

      const translateX = currentIndex * (slideWidth + gap);
      track.style.transform = `translateX(-${translateX}px)`;

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, idx) => {
          const isActive = idx === currentIndex;
          dot.classList.toggle('active', isActive);
          dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
      }
    };

    const goToSlide = (idx) => {
      const maxIdx = getMaxIndex();
      if (idx < 0) currentIndex = maxIdx;
      else if (idx > maxIdx) currentIndex = 0;
      else currentIndex = idx;
      updateCarousel();
    };

    const nextSlide = () => {
      const maxIdx = getMaxIndex();
      if (currentIndex >= maxIdx) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateCarousel();
    };

    const prevSlide = () => {
      const maxIdx = getMaxIndex();
      if (currentIndex <= 0) {
        currentIndex = maxIdx;
      } else {
        currentIndex--;
      }
      updateCarousel();
    };

    const startAutoPlay = () => {
      stopAutoPlay();
      autoInterval = setInterval(() => {
        if (!isPaused) {
          nextSlide();
        }
      }, 4500);
    };

    const stopAutoPlay = () => {
      if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
      }
    };

    const restartAutoPlay = () => {
      stopAutoPlay();
      startAutoPlay();
    };

    // Button Events
    nextBtn?.addEventListener('click', () => {
      nextSlide();
      restartAutoPlay();
    });

    prevBtn?.addEventListener('click', () => {
      prevSlide();
      restartAutoPlay();
    });

    // Pause on Hover & Focus
    carouselWrapper.addEventListener('mouseenter', () => { isPaused = true; });
    carouselWrapper.addEventListener('mouseleave', () => { isPaused = false; });
    carouselWrapper.addEventListener('focusin', () => { isPaused = true; });
    carouselWrapper.addEventListener('focusout', () => { isPaused = false; });

    // Touch / Swipe Navigation
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartTime = 0;

    track.addEventListener('touchstart', (e) => {
      isPaused = true;
      touchStartX = e.touches[0].clientX;
      touchStartTime = Date.now();
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      touchEndX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', () => {
      isPaused = false;
      const swipeDistance = touchStartX - touchEndX;
      const swipeDuration = Date.now() - touchStartTime;

      if (Math.abs(swipeDistance) > 40 && swipeDuration < 600) {
        if (swipeDistance > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        restartAutoPlay();
      }
      touchStartX = 0;
      touchEndX = 0;
    });

    // Keyboard support
    carouselWrapper.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
        restartAutoPlay();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
        restartAutoPlay();
      }
    });

    // Responsive resize handling
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildDots();
        updateCarousel();
      }, 150);
    });

    // Initial setup
    buildDots();
    updateCarousel();
    startAutoPlay();
  }

  initFaqSection() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      const panel = item.querySelector('.faq-answer-panel');
      if (!btn || !panel) return;

      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close other items for single-accordion luxury feel
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('open')) {
            otherItem.classList.remove('open');
            const otherBtn = otherItem.querySelector('.faq-question-btn');
            const otherPanel = otherItem.querySelector('.faq-answer-panel');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherPanel) otherPanel.style.maxHeight = '0';
          }
        });

        if (isOpen) {
          item.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = '0';
        } else {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = `${panel.scrollHeight + 30}px`;
        }
      });
    });
  }

  initReservation() {
    const form = document.getElementById('salon-booking-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('res_name');
      const date = formData.get('res_date');
      const time = formData.get('res_time');
      createToast(`Merci ${name} ! Table réservée le ${date} à ${time}.`, 'success');
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
    const lightboxSpinner = document.getElementById('lightbox-spinner');

    // Gallery thumbnail image loading handling
    document.querySelectorAll('.gallery-thumb-item').forEach(thumb => {
      const img = thumb.querySelector('.gallery-img');
      const spinner = thumb.querySelector('.gallery-skeleton-spinner');

      if (img) {
        const onLoaded = () => {
          img.classList.add('loaded');
          spinner?.classList.add('hidden');
        };

        if (img.complete && img.naturalHeight !== 0) {
          onLoaded();
        } else {
          img.addEventListener('load', onLoaded);
          img.addEventListener('error', onLoaded);
        }

        thumb.addEventListener('click', () => {
          if (lightboxImg && lightbox) {
            lightboxSpinner?.classList.remove('hidden');
            lightboxImg.style.opacity = '0';
            lightboxImg.src = img.src;

            const onLightboxImgReady = () => {
              lightboxSpinner?.classList.add('hidden');
              lightboxImg.style.opacity = '1';
            };

            if (lightboxImg.complete && lightboxImg.naturalHeight !== 0) {
              onLightboxImgReady();
            } else {
              lightboxImg.onload = onLightboxImgReady;
              lightboxImg.onerror = onLightboxImgReady;
            }

            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
          }
        });
      }
    });

    const closeLightbox = () => {
      lightbox?.classList.remove('open');
      document.body.style.overflow = '';
    };

    document.getElementById('lightbox-close-btn')?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  initNewsletter() {
    const form = document.getElementById('newsletter-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      createToast('Merci ! Bienvenue dans le Club Privilège Boba Bloom.', 'success');
      form.reset();
    });
  }

  initScrollReveal() {
    const selectors = [
      '.section-header',
      '.story-grid',
      '.values-grid',
      '.builder-container',
      '.salons-grid',
      '.testimonials-wrapper',
      '.faq-item',
      '.newsletter-container',
      '.gallery-grid',
      '.contact-card'
    ];

    const elements = document.querySelectorAll(selectors.join(', '));
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => {
      el.classList.add('reveal-init');
      observer.observe(el);
    });
  }

  initScrollytellingDrinkAssembly() {
    const section = document.getElementById('rituel');
    if (!section) return;

    // SVG elements
    const liquidRect = document.getElementById('scrolly-liquid-rect');
    const liquidWave = document.getElementById('scrolly-liquid-wave');
    const tigerStreaks = document.getElementById('scrolly-tiger-streaks');
    const creamLayer = document.getElementById('scrolly-cream-layer');
    const milkRibbon = document.getElementById('scrolly-milk-ribbon');
    const syrupBase = document.getElementById('scrolly-syrup-base');
    const pearlsGroup = document.getElementById('scrolly-pearls-group');
    const iceGroup = document.getElementById('scrolly-ice-group');
    const strawSubmerged = document.getElementById('scrolly-straw-submerged');
    const strawUpper = document.getElementById('scrolly-straw-upper');
    const domeLid = document.getElementById('scrolly-dome-lid');
    const brandSeal = document.getElementById('scrolly-brand-seal');
    const condensation = document.getElementById('scrolly-condensation');
    const cupSpotlight = document.getElementById('scrolly-cup-spotlight');

    // Video Showcase Elements
    const video = document.getElementById('scrolly-ritual-video');
    const videoFrame = document.getElementById('scrolly-video-frame');
    const videoTimecode = document.getElementById('scrolly-video-timecode');
    const videoChapterBadge = document.getElementById('video-chapter-badge');
    const videoChapterNum = document.getElementById('video-chapter-num');
    const videoChapterText = document.getElementById('video-chapter-text');
    const videoGlow = document.getElementById('scrolly-video-glow');
    const btnViewVideo = document.getElementById('btn-view-video');
    const btnViewVector = document.getElementById('btn-view-vector');

    // View Mode Toggle (Video Mode active by default)
    let currentMode = 'video';
    const setMode = (mode) => {
      currentMode = mode;
      if (mode === 'video') {
        if (btnViewVideo) {
          btnViewVideo.classList.add('active');
          btnViewVideo.setAttribute('aria-pressed', 'true');
        }
        if (btnViewVector) {
          btnViewVector.classList.remove('active');
          btnViewVector.setAttribute('aria-pressed', 'false');
        }
        if (videoFrame) videoFrame.classList.add('active');
        if (cupSpotlight) cupSpotlight.classList.remove('active');
      } else {
        if (btnViewVideo) {
          btnViewVideo.classList.remove('active');
          btnViewVideo.setAttribute('aria-pressed', 'false');
        }
        if (btnViewVector) {
          btnViewVector.classList.add('active');
          btnViewVector.setAttribute('aria-pressed', 'true');
        }
        if (videoFrame) videoFrame.classList.remove('active');
        if (cupSpotlight) cupSpotlight.classList.add('active');
      }
    };
    if (btnViewVideo) btnViewVideo.addEventListener('click', () => setMode('video'));
    if (btnViewVector) btnViewVector.addEventListener('click', () => setMode('vector'));
    setMode('video');

    // Video Scroll-Control Engine (Option B Specification)
    let isSeeking = false;
    let pendingSeekTime = null;
    let videoDuration = 10.5;

    if (video) {
      // Crucial: ensure the video never plays autonomously
      video.pause();
      video.addEventListener('loadedmetadata', () => {
        if (video.duration && !isNaN(video.duration) && video.duration > 0) {
          videoDuration = video.duration;
        }
        updateVideoDisplay(lastCalculatedProgress);
      });
      video.addEventListener('seeked', () => {
        isSeeking = false;
        if (pendingSeekTime !== null) {
          const t = pendingSeekTime;
          pendingSeekTime = null;
          seekVideo(t);
        }
      });
      video.addEventListener('play', () => {
        video.pause();
      });
    }

    const seekVideo = (time) => {
      if (!video) return;
      const clampedTime = clamp(time, 0, videoDuration);
      if (isSeeking) {
        pendingSeekTime = clampedTime;
        return;
      }
      isSeeking = true;
      if (typeof video.fastSeek === 'function') {
        try {
          video.fastSeek(clampedTime);
        } catch (e) {
          video.currentTime = clampedTime;
        }
      } else {
        video.currentTime = clampedTime;
      }
    };

    const formatTime = (secs) => {
      const m = Math.floor(secs / 60);
      const s = Math.floor(secs % 60);
      const ms = Math.floor((secs % 1) * 100);
      return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
    };

    const updateVideoDisplay = (progress) => {
      if (!video) return;
      const targetTime = progress * videoDuration;
      seekVideo(targetTime);

      if (videoTimecode) {
        videoTimecode.textContent = `${formatTime(targetTime)} / ${formatTime(videoDuration)}`;
      }

      // Video chapter progression
      let chapNum = '01';
      let chapText = "Infusion des Feuilles d'Assam à 82°C";
      if (progress >= 0.75) {
        chapNum = '04';
        chapText = "Glaçons Diamant & Sceau Prestige prêt à déguster";
      } else if (progress >= 0.50) {
        chapNum = '03';
        chapText = "Émulsion Laitière Onctueuse & Marbrage Tigré";
      } else if (progress >= 0.25) {
        chapNum = '02';
        chapText = "Perles Noires Caramélisées au Sucre Brut d'Okinawa";
      }

      if (videoChapterNum) videoChapterNum.textContent = chapNum;
      if (videoChapterText) videoChapterText.textContent = chapText;
    };

    // HUD & Controls elements
    const progressBar = document.getElementById('ritual-progress-bar');
    const progressPercent = document.getElementById('ritual-progress-percent');
    const phaseKicker = document.getElementById('scrolly-phase-kicker');
    const phaseLabel = document.getElementById('scrolly-phase-label');
    const scrollHint = document.getElementById('ritual-scroll-hint');
    const recipePills = document.querySelectorAll('.hud-recipe-pill');
    const teaGlow = document.getElementById('scrolly-tea-glow');
    const addCartBtn = document.getElementById('btn-scrolly-add-cart');

    // Liquid gradient stops for dynamic recipe switching
    const liquidStopTop = document.getElementById('scrollyLiquidStopTop');
    const liquidStopMid = document.getElementById('scrollyLiquidStopMid');
    const liquidStopBottom = document.getElementById('scrollyLiquidStopBottom');
    const waveStop = document.getElementById('scrollyWaveStop');

    // 6 Accompanying Phase Cards
    const phaseCards = [1, 2, 3, 4, 5, 6].map(i => document.getElementById(`scrolly-card-${i}`));

    const phaseTitles = [
      '',
      'LE VERRE EN CRISTAL',
      'LES PERLES DE TAPIOCA',
      "L'INFUSION DES GRANDS CRUS",
      'LE LAIT VELOUTÉ & MARBRAGE',
      'LES GLAÇONS CRISTALLINS',
      'LE COUVERCLE & LA PAILLE'
    ];

    const phaseShorts = [
      '',
      'Verre Vide',
      'Perles Noires',
      'Infusion Thé',
      'Lait & Marbrage',
      'Glaçons Purs',
      'Boisson Terminée'
    ];

    // Current Recipe Profile
    let activeRecipe = {
      name: 'Brown Sugar Tiger Milk Tea',
      price: 2700,
      color: '#D2AC84',
      top: '#E8B6A2',
      mid: '#D2AC84',
      bottom: '#8C4E28',
      wave: '#F4D3C2',
      tigerStroke: '#3D1A0D',
      tigerOpacity: 0.9,
      glow: 'rgba(210, 172, 132, 0.16)'
    };

    const recipes = {
      'Sucre Noir': {
        name: 'Brown Sugar Tiger Milk Tea (Signature)',
        price: 2700,
        color: '#D2AC84',
        top: '#E8B6A2',
        mid: '#D2AC84',
        bottom: '#8C4E28',
        wave: '#F4D3C2',
        tigerStroke: '#3D1A0D',
        tigerOpacity: 0.9,
        glow: 'rgba(210, 172, 132, 0.18)'
      },
      'Matcha Bio': {
        name: 'Matcha Uji Bio & Douceur de Lait',
        price: 2900,
        color: '#769C72',
        top: '#A1C89B',
        mid: '#648E60',
        bottom: '#3E5C3B',
        wave: '#B5DCB0',
        tigerStroke: '#2A4228',
        tigerOpacity: 0.85,
        glow: 'rgba(118, 156, 114, 0.2)'
      },
      'Bissap Floral': {
        name: 'Infusion Royale Bissap & Coulis Fraise',
        price: 2500,
        color: '#C83E58',
        top: '#E8657E',
        mid: '#BA2F48',
        bottom: '#7D1629',
        wave: '#F78CA0',
        tigerStroke: '#5C0B1B',
        tigerOpacity: 0.8,
        glow: 'rgba(200, 62, 88, 0.2)'
      }
    };

    const applyRecipeColors = (rec) => {
      activeRecipe = rec;
      if (liquidStopTop) liquidStopTop.setAttribute('stop-color', rec.top);
      if (liquidStopMid) liquidStopMid.setAttribute('stop-color', rec.mid);
      if (liquidStopBottom) liquidStopBottom.setAttribute('stop-color', rec.bottom);
      if (waveStop) waveStop.setAttribute('stop-color', rec.wave);
      if (tigerStreaks) tigerStreaks.setAttribute('stroke', rec.tigerStroke);
      if (teaGlow) {
        teaGlow.style.background = `radial-gradient(circle, ${rec.glow} 0%, rgba(232, 67, 101, 0.05) 45%, transparent 70%)`;
      }
      if (videoGlow) {
        videoGlow.style.background = `radial-gradient(circle at 50% 50%, ${rec.glow} 0%, rgba(232, 67, 101, 0.08) 60%, transparent 80%)`;
      }
    };

    // Recipe Switcher Pills click listeners
    recipePills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        recipePills.forEach(p => p.classList.remove('active'));
        const target = e.currentTarget;
        target.classList.add('active');
        const key = target.textContent.trim();
        if (recipes[key]) {
          applyRecipeColors(recipes[key]);
          renderProgress(lastCalculatedProgress);
          createToast(`Recette affichée : ${recipes[key].name}`, 'info');
        }
      });
    });

    // Populate Tapioca Pearls into SVG group (18 pearls carefully nested at cup base)
    const pearlData = [
      // Row 1 (Bed level: y ~ 418)
      { cx: 98, cy: 418, r: 12.5, initialY: -160 },
      { cx: 120, cy: 420, r: 12.0, initialY: -185 },
      { cx: 142, cy: 419, r: 13.0, initialY: -210 },
      { cx: 164, cy: 420, r: 12.5, initialY: -170 },
      { cx: 184, cy: 418, r: 12.0, initialY: -195 },
      { cx: 204, cy: 416, r: 11.5, initialY: -150 },

      // Row 2 (Middle layer: y ~ 398)
      { cx: 106, cy: 398, r: 12.0, initialY: -220 },
      { cx: 128, cy: 399, r: 12.5, initialY: -175 },
      { cx: 150, cy: 397, r: 13.0, initialY: -200 },
      { cx: 172, cy: 399, r: 12.2, initialY: -230 },
      { cx: 194, cy: 397, r: 11.8, initialY: -165 },

      // Row 3 (Upper layer: y ~ 378)
      { cx: 116, cy: 378, r: 12.0, initialY: -190 },
      { cx: 138, cy: 377, r: 12.2, initialY: -215 },
      { cx: 160, cy: 378, r: 12.0, initialY: -180 },
      { cx: 182, cy: 377, r: 11.5, initialY: -205 },

      // Row 4 (Crest gems: y ~ 358)
      { cx: 130, cy: 358, r: 11.5, initialY: -225 },
      { cx: 152, cy: 357, r: 12.0, initialY: -195 },
      { cx: 172, cy: 359, r: 11.0, initialY: -210 }
    ];

    const pearlElements = [];
    if (pearlsGroup) {
      clearChildren(pearlsGroup);
      pearlData.forEach((p, idx) => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'scrolly-pearl-node');
        g.setAttribute('transform', `translate(0, ${p.initialY})`);
        g.setAttribute('opacity', '0');

        // Dark Glossy Sphere
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', String(p.cx));
        circle.setAttribute('cy', String(p.cy));
        circle.setAttribute('r', String(p.r));
        circle.setAttribute('fill', 'url(#scrollyPearlShading)');
        g.appendChild(circle);

        // 3D Curved Specular Gleam
        const gloss1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        gloss1.setAttribute('cx', String(p.cx - p.r * 0.32));
        gloss1.setAttribute('cy', String(p.cy - p.r * 0.32));
        gloss1.setAttribute('r', String(p.r * 0.32));
        gloss1.setAttribute('fill', 'rgba(255,255,255,0.75)');
        g.appendChild(gloss1);

        // Ambient Subsurface Point
        const gloss2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        gloss2.setAttribute('cx', String(p.cx + p.r * 0.35));
        gloss2.setAttribute('cy', String(p.cy + p.r * 0.35));
        gloss2.setAttribute('r', String(p.r * 0.16));
        gloss2.setAttribute('fill', 'rgba(255,255,255,0.3)');
        g.appendChild(gloss2);

        pearlsGroup.appendChild(g);
        pearlElements.push({ el: g, ...p });
      });
    }

    // Populate 3D Faceted Ice Cubes into SVG group (5 crystalline blocks)
    const iceData = [
      { x: 96, y: 174, w: 34, h: 30, rot: 14, initialY: -120 },
      { x: 152, y: 180, w: 36, h: 32, rot: -18, initialY: -140 },
      { x: 122, y: 220, w: 32, h: 28, rot: 8, initialY: -110 },
      { x: 162, y: 232, w: 30, h: 26, rot: -10, initialY: -130 },
      { x: 94, y: 248, w: 32, h: 28, rot: -8, initialY: -150 }
    ];

    const iceElements = [];
    if (iceGroup) {
      clearChildren(iceGroup);
      iceData.forEach((c) => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'scrolly-ice-node');
        const cx = c.x + c.w / 2;
        const cy = c.y + c.h / 2;
        g.setAttribute('transform', `translate(0, ${c.initialY}) rotate(${c.rot} ${cx} ${cy})`);
        g.setAttribute('opacity', '0');

        // Faceted Block Body
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', String(c.x));
        rect.setAttribute('y', String(c.y));
        rect.setAttribute('width', String(c.w));
        rect.setAttribute('height', String(c.h));
        rect.setAttribute('rx', '5');
        rect.setAttribute('fill', 'url(#scrollyIceGrad)');
        rect.setAttribute('stroke', 'rgba(255,255,255,0.85)');
        rect.setAttribute('stroke-width', '1.2');
        g.appendChild(rect);

        // Specular Top Facet Highlight
        const facet = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        facet.setAttribute('d', `M ${c.x + 4},${c.y + 4} L ${c.x + c.w - 4},${c.y + 4}`);
        facet.setAttribute('stroke', '#FFFFFF');
        facet.setAttribute('stroke-width', '1.8');
        facet.setAttribute('stroke-linecap', 'round');
        g.appendChild(facet);

        iceGroup.appendChild(g);
        iceElements.push({ el: g, cx, cy, ...c });
      });
    }

    // Mathematical Interpolation Helpers
    const clamp = (val, min, max) => Math.min(max, Math.max(min, val));
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easeOutBounce = (t) => {
      const n1 = 7.5625;
      const d1 = 2.75;
      if (t < 1 / d1) {
        return n1 * t * t;
      } else if (t < 2 / d1) {
        return n1 * (t -= 1.5 / d1) * t + 0.75;
      } else if (t < 2.5 / d1) {
        return n1 * (t -= 2.25 / d1) * t + 0.9375;
      } else {
        return n1 * (t -= 2.625 / d1) * t + 0.984375;
      }
    };

    let lastCalculatedProgress = 0;
    const isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Core Scroll-Controlled Visual State Engine
    const renderProgress = (progress) => {
      lastCalculatedProgress = progress;

      // Synchronize video timeline directly with scroll
      updateVideoDisplay(progress);

      // 1. Identify Current Active Phase (1 through 6)
      let activePhase = 1;
      if (progress >= 0.82) activePhase = 6;
      else if (progress >= 0.65) activePhase = 5;
      else if (progress >= 0.50) activePhase = 4;
      else if (progress >= 0.25) activePhase = 3;
      else if (progress >= 0.10) activePhase = 2;
      else activePhase = 1;

      // Update Phase Cards
      phaseCards.forEach((card, idx) => {
        if (!card) return;
        if (idx + 1 === activePhase) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });

      // Update HUD Gauges
      const pct = Math.round(progress * 100);
      if (progressBar) progressBar.style.width = `${pct}%`;
      if (progressPercent) progressPercent.textContent = `${pct}%`;
      if (phaseKicker) phaseKicker.textContent = `• PHASE ${activePhase}/6 : ${phaseTitles[activePhase]}`;
      if (phaseLabel) phaseLabel.textContent = `0${activePhase}. ${phaseShorts[activePhase]}`;

      if (scrollHint) {
        if (progress > 0.05) scrollHint.classList.add('hidden');
        else scrollHint.classList.remove('hidden');
      }

      // Micro spotlight scale as cup gets full & majestic
      if (cupSpotlight) {
        const spotScale = 0.96 + 0.04 * progress;
        cupSpotlight.style.transform = `scale(${spotScale})`;
      }

      // =========================================================================
      // PHASE 1 — Le Verre Vide (0.00 à 0.10)
      // =========================================================================
      if (progress < 0.10) {
        const p1 = clamp(progress / 0.10, 0, 1);
        if (brandSeal) brandSeal.setAttribute('opacity', String(0.25 + 0.15 * p1));
        if (condensation) condensation.setAttribute('opacity', String(0.4 + 0.2 * p1));

        // All internal ingredients empty
        if (syrupBase) syrupBase.setAttribute('opacity', '0');
        if (liquidRect) {
          liquidRect.setAttribute('y', '428');
          liquidRect.setAttribute('height', '0');
          liquidRect.setAttribute('opacity', '0');
        }
        if (liquidWave) liquidWave.setAttribute('opacity', '0');
        if (creamLayer) creamLayer.setAttribute('opacity', '0');
        if (milkRibbon) milkRibbon.setAttribute('opacity', '0');
        if (tigerStreaks) tigerStreaks.setAttribute('opacity', '0');

        pearlElements.forEach(p => {
          p.el.setAttribute('transform', `translate(0, ${p.initialY})`);
          p.el.setAttribute('opacity', '0');
        });

        iceElements.forEach(c => {
          c.el.setAttribute('transform', `translate(0, ${c.initialY}) rotate(${c.rot} ${c.cx} ${c.cy})`);
          c.el.setAttribute('opacity', '0');
        });

        if (domeLid) {
          domeLid.setAttribute('transform', 'translate(0, -90)');
          domeLid.setAttribute('opacity', '0');
        }
        if (strawUpper) {
          strawUpper.setAttribute('transform', 'translate(0, -220)');
          strawUpper.setAttribute('opacity', '0');
        }
        if (strawSubmerged) {
          strawSubmerged.setAttribute('transform', 'translate(0, -220)');
          strawSubmerged.setAttribute('opacity', '0');
        }
        return;
      }

      // =========================================================================
      // PHASE 2 — Les Perles de Tapioca (0.10 à 0.25)
      // =========================================================================
      const p2 = clamp((progress - 0.10) / 0.15, 0, 1);

      // Syrup Meniscus fills base
      if (syrupBase) syrupBase.setAttribute('opacity', String(p2 * 0.9));

      // Pearls Cascade & Settling with physical bounce
      pearlElements.forEach((p, idx) => {
        const staggerDelay = (idx / pearlElements.length) * 0.45;
        const itemP = clamp((p2 - staggerDelay) / 0.55, 0, 1);
        const easedP = isReducedMotion ? itemP : easeOutBounce(itemP);
        const yOffset = (1 - easedP) * p.initialY;

        p.el.setAttribute('transform', `translate(0, ${yOffset})`);
        p.el.setAttribute('opacity', String(Math.min(1, itemP * 2.5)));
      });

      // Liquid not yet started in Phase 2
      if (progress < 0.25) {
        if (liquidRect) {
          liquidRect.setAttribute('y', '428');
          liquidRect.setAttribute('height', '0');
          liquidRect.setAttribute('opacity', '0');
        }
        if (liquidWave) liquidWave.setAttribute('opacity', '0');
        if (creamLayer) creamLayer.setAttribute('opacity', '0');
        if (milkRibbon) milkRibbon.setAttribute('opacity', '0');
        if (tigerStreaks) tigerStreaks.setAttribute('opacity', '0');

        iceElements.forEach(c => {
          c.el.setAttribute('transform', `translate(0, ${c.initialY}) rotate(${c.rot} ${c.cx} ${c.cy})`);
          c.el.setAttribute('opacity', '0');
        });

        if (domeLid) {
          domeLid.setAttribute('transform', 'translate(0, -90)');
          domeLid.setAttribute('opacity', '0');
        }
        if (strawUpper) {
          strawUpper.setAttribute('transform', 'translate(0, -220)');
          strawUpper.setAttribute('opacity', '0');
        }
        if (strawSubmerged) {
          strawSubmerged.setAttribute('transform', 'translate(0, -220)');
          strawSubmerged.setAttribute('opacity', '0');
        }
        return;
      }

      // Ensure all pearls are fully settled for progress >= 0.25
      pearlElements.forEach(p => {
        p.el.setAttribute('transform', 'translate(0, 0)');
        p.el.setAttribute('opacity', '1');
      });

      // =========================================================================
      // PHASE 3 — L'Infusion du Thé (0.25 à 0.50)
      // =========================================================================
      if (progress < 0.50) {
        const p3 = clamp((progress - 0.25) / 0.25, 0, 1);
        const easedP3 = isReducedMotion ? p3 : easeOutCubic(p3);

        // Liquid rises from bottom (428) up to mid-height (275)
        const currentY = 428 - easedP3 * (428 - 275);
        const currentH = 428 - currentY;

        if (liquidRect) {
          liquidRect.setAttribute('y', String(currentY));
          liquidRect.setAttribute('height', String(currentH));
          liquidRect.setAttribute('opacity', String(Math.min(1, p3 * 2)));
        }

        if (liquidWave) {
          const waveCurve = 4 * (1 - p3 * 0.5);
          liquidWave.setAttribute('d', `M 50,${currentY} Q 100,${currentY - waveCurve} 150,${currentY} T 250,${currentY} L 250,432 L 50,432 Z`);
          liquidWave.setAttribute('opacity', String(Math.min(0.9, p3 * 1.5)));
        }

        // Milk & Tiger layers not yet active in Phase 3
        if (creamLayer) creamLayer.setAttribute('opacity', '0');
        if (milkRibbon) milkRibbon.setAttribute('opacity', '0');
        if (tigerStreaks) tigerStreaks.setAttribute('opacity', '0');

        iceElements.forEach(c => {
          c.el.setAttribute('transform', `translate(0, ${c.initialY}) rotate(${c.rot} ${c.cx} ${c.cy})`);
          c.el.setAttribute('opacity', '0');
        });

        if (domeLid) {
          domeLid.setAttribute('transform', 'translate(0, -90)');
          domeLid.setAttribute('opacity', '0');
        }
        if (strawUpper) {
          strawUpper.setAttribute('transform', 'translate(0, -220)');
          strawUpper.setAttribute('opacity', '0');
        }
        if (strawSubmerged) {
          strawSubmerged.setAttribute('transform', 'translate(0, -220)');
          strawSubmerged.setAttribute('opacity', '0');
        }
        return;
      }

      // =========================================================================
      // PHASE 4 — Le Lait Velouté & Le Marbrage (0.50 à 0.65)
      // =========================================================================
      if (progress < 0.65) {
        const p4 = clamp((progress - 0.50) / 0.15, 0, 1);
        const easedP4 = isReducedMotion ? p4 : easeOutCubic(p4);

        // Liquid continues rising from mid-height (275) to full surface (152)
        const currentY = 275 - easedP4 * (275 - 152);
        const currentH = 428 - currentY;

        if (liquidRect) {
          liquidRect.setAttribute('y', String(currentY));
          liquidRect.setAttribute('height', String(currentH));
          liquidRect.setAttribute('opacity', '1');
        }

        if (liquidWave) {
          liquidWave.setAttribute('d', `M 50,${currentY} Q 100,${currentY - 3} 150,${currentY} T 250,${currentY} L 250,432 L 50,432 Z`);
          liquidWave.setAttribute('opacity', '0.85');
        }

        // Cream layer emerges at the surface
        if (creamLayer) {
          creamLayer.setAttribute('opacity', String(p4 * 0.9));
          const creamShift = currentY - 152;
          creamLayer.setAttribute('transform', `translate(0, ${creamShift}) scale(1)`);
        }

        // Swirling milk ribbon
        if (milkRibbon) {
          milkRibbon.setAttribute('opacity', String(p4 * 0.45));
        }

        // Caramelized tiger sugar marbling
        if (tigerStreaks) {
          tigerStreaks.setAttribute('opacity', String(p4 * activeRecipe.tigerOpacity));
        }

        iceElements.forEach(c => {
          c.el.setAttribute('transform', `translate(0, ${c.initialY}) rotate(${c.rot} ${c.cx} ${c.cy})`);
          c.el.setAttribute('opacity', '0');
        });

        if (domeLid) {
          domeLid.setAttribute('transform', 'translate(0, -90)');
          domeLid.setAttribute('opacity', '0');
        }
        if (strawUpper) {
          strawUpper.setAttribute('transform', 'translate(0, -220)');
          strawUpper.setAttribute('opacity', '0');
        }
        if (strawSubmerged) {
          strawSubmerged.setAttribute('transform', 'translate(0, -220)');
          strawSubmerged.setAttribute('opacity', '0');
        }
        return;
      }

      // Ensure liquid, cream and marbling are fully established for progress >= 0.65
      if (liquidRect) {
        liquidRect.setAttribute('y', '152');
        liquidRect.setAttribute('height', String(428 - 152));
        liquidRect.setAttribute('opacity', '1');
      }
      if (liquidWave) {
        liquidWave.setAttribute('d', 'M 50,152 Q 100,148 150,152 T 250,152 L 250,432 L 50,432 Z');
        liquidWave.setAttribute('opacity', '0.85');
      }
      if (creamLayer) {
        creamLayer.setAttribute('opacity', '0.9');
        creamLayer.setAttribute('transform', 'translate(0, 0)');
      }
      if (milkRibbon) milkRibbon.setAttribute('opacity', '0.45');
      if (tigerStreaks) tigerStreaks.setAttribute('opacity', String(activeRecipe.tigerOpacity));

      // =========================================================================
      // PHASE 5 — Les Glaçons Cristallins (0.65 à 0.82)
      // =========================================================================
      if (progress < 0.82) {
        const p5 = clamp((progress - 0.65) / 0.17, 0, 1);

        iceElements.forEach((c, idx) => {
          const staggerDelay = (idx / iceElements.length) * 0.35;
          const itemP = clamp((p5 - staggerDelay) / 0.65, 0, 1);
          const easedP = isReducedMotion ? itemP : easeOutCubic(itemP);
          const yOffset = (1 - easedP) * c.initialY;
          const currentRot = c.rot + (1 - itemP) * 16;

          c.el.setAttribute('transform', `translate(0, ${yOffset}) rotate(${currentRot} ${c.cx} ${c.cy})`);
          c.el.setAttribute('opacity', String(Math.min(0.9, itemP * 1.8)));
        });

        if (domeLid) {
          domeLid.setAttribute('transform', 'translate(0, -90)');
          domeLid.setAttribute('opacity', '0');
        }
        if (strawUpper) {
          strawUpper.setAttribute('transform', 'translate(0, -220)');
          strawUpper.setAttribute('opacity', '0');
        }
        if (strawSubmerged) {
          strawSubmerged.setAttribute('transform', 'translate(0, -220)');
          strawSubmerged.setAttribute('opacity', '0');
        }
        return;
      }

      // Ensure all ice cubes are in resting submerged state for progress >= 0.82
      iceElements.forEach(c => {
        c.el.setAttribute('transform', `translate(0, 0) rotate(${c.rot} ${c.cx} ${c.cy})`);
        c.el.setAttribute('opacity', '0.9');
      });

      // =========================================================================
      // PHASE 6 — Le Couvercle & La Paille Signature (0.82 à 1.00)
      // =========================================================================
      const p6 = clamp((progress - 0.82) / 0.18, 0, 1);

      // Part 6A: Dome Sealed Lid Descends onto rim lip (0.82 to 0.91)
      const pLid = clamp((progress - 0.82) / 0.09, 0, 1);
      const easedLid = isReducedMotion ? pLid : easeOutCubic(pLid);
      const lidY = (1 - easedLid) * -90;

      if (domeLid) {
        domeLid.setAttribute('transform', `translate(0, ${lidY})`);
        domeLid.setAttribute('opacity', String(Math.min(1, pLid * 2)));
      }

      // Part 6B: Straw Slides Down through Lid Opening (0.90 to 1.00)
      const pStraw = clamp((progress - 0.90) / 0.10, 0, 1);
      const easedStraw = isReducedMotion ? pStraw : easeOutCubic(pStraw);
      const strawY = (1 - easedStraw) * -220;

      if (strawUpper) {
        strawUpper.setAttribute('transform', `translate(0, ${strawY})`);
        strawUpper.setAttribute('opacity', String(Math.min(1, pStraw * 2.5)));
      }

      if (strawSubmerged) {
        strawSubmerged.setAttribute('transform', `translate(0, ${strawY})`);
        strawSubmerged.setAttribute('opacity', String(Math.min(0.85, pStraw * 2)));
      }

      // Seal & Glass Condensation peak at 100%
      if (brandSeal) {
        brandSeal.setAttribute('opacity', String(0.45 + 0.35 * pStraw));
      }
    };

    // Fast, Debounced RAF Scroll Handler with Zero Time-Based Autonomous Loops
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = section.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          const scrollableDistance = rect.height - windowHeight;

          if (scrollableDistance > 0) {
            const rawProgress = (-rect.top) / scrollableDistance;
            const progress = clamp(rawProgress, 0, 1);
            renderProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial render call on mount
    onScroll();

    // Interactive Scrubber Jump Click
    const scrubberTrack = document.querySelector('.hud-scrubber-track');
    if (scrubberTrack) {
      scrubberTrack.style.cursor = 'pointer';
      scrubberTrack.addEventListener('click', (e) => {
        const bounds = scrubberTrack.getBoundingClientRect();
        const clickRatio = clamp((e.clientX - bounds.left) / bounds.width, 0, 1);
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const scrollableDistance = rect.height - windowHeight;
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        const targetScrollY = currentScrollY + rect.top + clickRatio * scrollableDistance;
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      });
    }

    // Interactive Phase Card Click to smoothly focus and navigate
    phaseCards.forEach((card, idx) => {
      if (!card) return;
      card.addEventListener('click', (e) => {
        // If clicking on a button or link inside card, don't jump scroll
        if (e.target.closest('button') || e.target.closest('a')) return;
        const phaseFractions = [0.05, 0.18, 0.38, 0.58, 0.74, 0.95];
        const targetPct = phaseFractions[idx];
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const scrollableDistance = rect.height - windowHeight;
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        const targetScrollY = currentScrollY + rect.top + targetPct * scrollableDistance;
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      });
    });

    // Hook direct Add-to-Cart button in Phase 6
    if (addCartBtn) {
      addCartBtn.addEventListener('click', () => {
        this.cartManager.addItem({
          id: 'scrolly-drink-' + Date.now(),
          name: activeRecipe.name,
          price: activeRecipe.price,
          size: '500ml (Format Moyen)',
          sweetness: '50% (Standard)',
          ice: '50% (Idéal)',
          toppings: 'Tapioca Sucre Noir',
          image: '/src/assets/images/boba_finished_cup_1791124334445.jpg'
        });
        createToast(`${activeRecipe.name} ajouté à votre commande !`, 'success');
      });
    }
  }
}

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  new BobaBloomApp();
});
