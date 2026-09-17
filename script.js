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
      base: 'Milk Tea',
      basePrice: 2200,
      baseColor: '#D2AC84',
      baseIntensity: 'Moyenne (Assam)',
      baseCal: 140,
      flavor: 'Strawberry',
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
    this.pearlsGroup = document.getElementById('svg-pearls-group');
    this.iceGroup = document.getElementById('svg-ice-cubes-group');
    this.bubblesGroup = document.getElementById('svg-fizzy-bubbles');
    
    this.drinkNameEl = document.getElementById('builder-drink-name');
    this.drinkPriceEl = document.getElementById('builder-live-price');
    this.drinkSummaryEl = document.getElementById('builder-drink-summary');
    this.stepIndicatorEl = document.getElementById('builder-step-indicator');
    this.addToCartBtn = document.getElementById('btn-add-custom-drink');
    
    this.calEl = document.getElementById('spec-calories');
    this.intensityEl = document.getElementById('spec-intensity');
  }

  bindEvents() {
    // Option selections
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
          this.state.toppingPrice = parseInt(target.dataset.price, 10) || 500;
          this.state.toppingClass = target.dataset.toppingClass || 'tapioca';
          this.state.toppingCal = parseInt(target.dataset.cal, 10) || 0;
          
          if (this.state.toppingClass === 'tapioca') this.state.toppingGrad = 'url(#pearlGradTapioca)';
          else if (this.state.toppingClass === 'popping') this.state.toppingGrad = 'url(#pearlGradPopping)';
          else if (this.state.toppingClass === 'jelly') this.state.toppingGrad = 'url(#pearlGradJelly)';
          else this.state.toppingGrad = 'none';

          this.state.currentStep = 3;
        }

        this.updateStepCards();
        this.updateVisuals();
      });
    });

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

    this.addToCartBtn?.addEventListener('click', () => {
      const price = this.state.basePrice + this.state.toppingPrice;
      const title = `${this.state.flavor} ${this.state.base}`;
      this.cartManager.addItem({
        id: 'custom-' + Date.now(),
        name: title,
        price,
        size: '500ml Grand Format',
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
      '', 'Base de Thé', 'Saveur & Coulis', 'Toppings Artisanaux', 'Niveau de Sucre', 'Niveau de Glaçons'
    ];
    if (this.stepIndicatorEl) {
      this.stepIndicatorEl.textContent = `Étape ${this.state.currentStep} / 5 • ${stepNames[this.state.currentStep] || 'Personnalisation'}`;
    }
  }

  updateVisuals() {
    // 1. Dynamic Liquid Gradient
    if (this.liquidTop) this.liquidTop.setAttribute('stop-color', this.state.flavorColor);
    if (this.liquidMid) this.liquidMid.setAttribute('stop-color', this.state.flavorColor);
    if (this.liquidBottom) this.liquidBottom.setAttribute('stop-color', this.state.baseColor);

    // 2. SVG 3D Boba Pearls
    if (this.pearlsGroup) {
      clearChildren(this.pearlsGroup);
      if (this.state.toppingClass !== 'none') {
        const pearlLayout = [
          { cx: 100, cy: 405, r: 11 },
          { cx: 122, cy: 412, r: 10 },
          { cx: 144, cy: 408, r: 12 },
          { cx: 168, cy: 412, r: 11 },
          { cx: 190, cy: 404, r: 10 },
          { cx: 110, cy: 388, r: 11.5 },
          { cx: 132, cy: 392, r: 11 },
          { cx: 154, cy: 386, r: 12 },
          { cx: 178, cy: 390, r: 11.5 },
          { cx: 124, cy: 370, r: 10.5 },
          { cx: 148, cy: 368, r: 11.5 },
          { cx: 168, cy: 372, r: 10 },
          { cx: 138, cy: 350, r: 11 }
        ];

        pearlLayout.forEach(p => {
          if (this.state.toppingClass === 'jelly') {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', String(p.cx - 10));
            rect.setAttribute('y', String(p.cy - 10));
            rect.setAttribute('width', '20');
            rect.setAttribute('height', '18');
            rect.setAttribute('rx', '4');
            rect.setAttribute('fill', this.state.toppingGrad);
            rect.setAttribute('class', 'svg-boba-pearl');
            this.pearlsGroup.appendChild(rect);
          } else {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', String(p.cx));
            circle.setAttribute('cy', String(p.cy));
            circle.setAttribute('r', String(p.r));
            circle.setAttribute('fill', this.state.toppingGrad);
            circle.setAttribute('class', 'svg-boba-pearl');
            this.pearlsGroup.appendChild(circle);
          }
        });
      }
    }

    // 3. SVG 3D Ice Cubes
    if (this.iceGroup) {
      clearChildren(this.iceGroup);
      const iceLevels = {
        '0%': [],
        '30%': [
          { x: 105, y: 190, w: 32, h: 28, rot: 12 },
          { x: 160, y: 200, w: 34, h: 30, rot: -15 }
        ],
        '50%': [
          { x: 95, y: 175, w: 34, h: 30, rot: 14 },
          { x: 155, y: 180, w: 36, h: 32, rot: -18 },
          { x: 125, y: 220, w: 32, h: 28, rot: 8 },
          { x: 165, y: 235, w: 30, h: 26, rot: -10 }
        ],
        '100%': [
          { x: 90, y: 160, w: 34, h: 30, rot: 15 },
          { x: 150, y: 165, w: 36, h: 32, rot: -20 },
          { x: 110, y: 205, w: 34, h: 30, rot: 6 },
          { x: 160, y: 215, w: 32, h: 28, rot: -12 },
          { x: 130, y: 250, w: 34, h: 30, rot: 18 },
          { x: 95, y: 260, w: 30, h: 26, rot: -8 }
        ]
      };

      const cubes = iceLevels[this.state.ice] || iceLevels['50%'];
      cubes.forEach(c => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('transform', `rotate(${c.rot} ${c.x + c.w/2} ${c.y + c.h/2})`);

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', String(c.x));
        rect.setAttribute('y', String(c.y));
        rect.setAttribute('width', String(c.w));
        rect.setAttribute('height', String(c.h));
        rect.setAttribute('rx', '6');
        rect.setAttribute('fill', 'url(#iceCubeGrad)');
        rect.setAttribute('stroke', 'rgba(255,255,255,0.8)');
        rect.setAttribute('stroke-width', '1.5');
        rect.setAttribute('class', 'svg-ice-cube');

        g.appendChild(rect);
        this.iceGroup.appendChild(g);
      });
    }

    // 4. Fizzy Micro Bubbles
    if (this.bubblesGroup) {
      clearChildren(this.bubblesGroup);
      const bubblePositions = [
        { cx: 88, cy: 320, r: 2.5 },
        { cx: 120, cy: 290, r: 3 },
        { cx: 175, cy: 310, r: 2 },
        { cx: 195, cy: 260, r: 3.5 },
        { cx: 140, cy: 240, r: 2.5 },
        { cx: 105, cy: 210, r: 2 }
      ];
      bubblePositions.forEach(b => {
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', String(b.cx));
        c.setAttribute('cy', String(b.cy));
        c.setAttribute('r', String(b.r));
        c.setAttribute('fill', 'rgba(255,255,255,0.6)');
        this.bubblesGroup.appendChild(c);
      });
    }

    // 5. Total Price & Title
    const price = this.state.basePrice + this.state.toppingPrice;
    const title = `${this.state.flavor} ${this.state.base}`;

    if (this.drinkNameEl) this.drinkNameEl.textContent = title;
    if (this.drinkPriceEl) this.drinkPriceEl.textContent = `${price.toLocaleString('fr-FR')} FCFA`;

    // 6. Summary Chips
    if (this.drinkSummaryEl) {
      clearChildren(this.drinkSummaryEl);
      [
        `Base: ${this.state.base}`,
        `Saveur: ${this.state.flavor}`,
        `Topping: ${this.state.topping}`,
        `Sucre: ${this.state.sweetness}`,
        `Glaçons: ${this.state.ice}`
      ].forEach(text => {
        this.drinkSummaryEl.appendChild(el('span', { className: 'summary-chip' }, text));
      });
    }

    // 7. Nutrition Calculation
    const totalCal = this.state.baseCal + this.state.flavorCal + this.state.toppingCal + this.state.sweetnessCal;
    if (this.calEl) this.calEl.textContent = `~${totalCal} kcal`;
    if (this.intensityEl) this.intensityEl.textContent = this.state.baseIntensity;
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
      createToast('Merci ! Bienvenue dans le Club Privilège Boba Bloom.', 'success');
      form.reset();
    });
  }
}

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  new BobaBloomApp();
});
