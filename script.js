/**
 * BOBA BLOOM — Handcrafted Bubble Tea (Cotonou, Benin)
 * Pure Vanilla JavaScript Client Application
 * Fully responsive, accessible, and conversion-focused
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. MENU DATABASE & CATEGORY FILTERING
     ========================================================================== */
  const menuProducts = [
    {
      id: 'm-1',
      name: 'Strawberry Cloud',
      category: 'signature',
      price: 3200,
      description: 'Jasmine green tea with fresh strawberry purée, velvety sweet cream cloud foam, and strawberry popping pearls.',
      image: 'https://images.unsplash.com/photo-1558857563-b37cf5c490ff?auto=format&fit=crop&w=600&q=80',
      tags: ['Best Seller', 'Fresh Berries', 'Signature']
    },
    {
      id: 'm-2',
      name: 'Brown Sugar Bliss',
      category: 'milk-tea',
      price: 3000,
      description: 'Assam black tea swirled with caramelized Okinawa tiger brown sugar syrup and warm, bouncy tapioca pearls.',
      image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80',
      tags: ['Customer Favorite', 'Chewy Tapioca']
    },
    {
      id: 'm-3',
      name: 'Mango Passion Cooler',
      category: 'fruit-tea',
      price: 2800,
      description: 'Sun-ripened tropical mango and zesty passion fruit infused into jade green tea with popping juice boba.',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
      tags: ['Refreshing', 'Dairy Free']
    },
    {
      id: 'm-4',
      name: 'Ceremonial Matcha Bloom',
      category: 'matcha',
      price: 3400,
      description: 'First-harvest Uji ceremonial matcha whisked to perfection over creamy oat milk and golden honey pearls.',
      image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
      tags: ['Ceremonial Grade', 'Antioxidants']
    },
    {
      id: 'm-5',
      name: 'Taro Velvet Dream',
      category: 'milk-tea',
      price: 3000,
      description: 'Sweet and creamy roasted taro blended with slow-steeped black tea, topped with chewy herbal grass jelly.',
      image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80',
      tags: ['Velvety Sweet', 'Natural Color']
    },
    {
      id: 'm-6',
      name: 'Cotonou Hibiscus Blossom',
      category: 'signature',
      price: 2900,
      description: 'Our signature coastal tribute: West African Bissap hibiscus flowers, pomegranate pearls, and cooling mint.',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
      tags: ['Local Twist', 'Cotonou Exclusive']
    },
    {
      id: 'm-7',
      name: 'Strawberry Matcha Latte',
      category: 'matcha',
      price: 3500,
      description: 'Artistic three-layer drink: homemade strawberry compote, silk milk, and vivid green whisked matcha.',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
      tags: ['Layered Latte', 'House Special']
    },
    {
      id: 'm-8',
      name: 'Royal Earl Grey Milk Tea',
      category: 'milk-tea',
      price: 2800,
      description: 'Fragrant bergamot Earl Grey leaves infused with whole milk and brown sugar tapioca.',
      image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80',
      tags: ['Floral', 'Classic']
    },
    {
      id: 'm-9',
      name: 'Lychee Rose Sparkling Tea',
      category: 'fruit-tea',
      price: 3000,
      description: 'Crisp green tea with juicy sweet lychee nectar, fragrant edible rose water, and crystal aloe vera.',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
      tags: ['Floral & Crisp', 'Light Sugar']
    },
    {
      id: 'm-10',
      name: 'Tiger Crème Brûlée Boba',
      category: 'signature',
      price: 3600,
      description: 'Rich brown sugar milk tea topped with fresh egg custard cream torched into a crispy caramelized sugar crust.',
      image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80',
      tags: ['Torched Custard', 'Decadent']
    },
    {
      id: 'm-11',
      name: 'Side: Warm Tapioca Pearls',
      category: 'toppings',
      price: 500,
      description: 'Portion of slow-simmered Taiwanese black tapioca pearls coated in Okinawa brown sugar syrup.',
      image: 'https://images.unsplash.com/photo-1594488518001-0e1378370162?auto=format&fit=crop&w=600&q=80',
      tags: ['Slow Simmered', 'Chewy']
    },
    {
      id: 'm-12',
      name: 'Side: Mango Popping Boba',
      category: 'toppings',
      price: 600,
      description: 'Thin translucent sea-kelp pearls filled with real, bursting mango fruit juice.',
      image: 'https://images.unsplash.com/photo-1558857563-b37cf5c490ff?auto=format&fit=crop&w=600&q=80',
      tags: ['Juice Explosion', 'Fun Texture']
    }
  ];

  const menuGrid = document.getElementById('menu-grid');
  const categoryTabs = document.querySelectorAll('.category-tab');
  const searchInput = document.getElementById('menu-search-input');

  let activeCategory = 'all';
  let searchQuery = '';

  function renderMenu() {
    if (!menuGrid) return;

    const filtered = menuProducts.filter(item => {
      const matchesCat = (activeCategory === 'all') || (item.category === activeCategory);
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = query === '' || 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query));
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      menuGrid.innerHTML = `
        <div class="menu-empty-state">
          <div style="font-size: 2.5rem; margin-bottom: 8px;">🔍</div>
          <h3 style="font-size: 1.25rem; margin-bottom: 6px;">No drinks found</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem;">
            Try checking for different keywords like "taro", "matcha", or "pearls".
          </p>
        </div>
      `;
      return;
    }

    menuGrid.innerHTML = filtered.map(product => `
      <article class="product-card" data-product-id="${product.id}">
        <div class="product-image-wrap">
          <span class="card-category-tag">${product.category.replace('-', ' ')}</span>
          <img src="${product.image}" 
               alt="${product.name}" 
               class="product-image" 
               loading="lazy" 
               onerror="this.src='https://images.unsplash.com/photo-1558857563-b37cf5c490ff?auto=format&fit=crop&w=600&q=80'" />
        </div>
        <div class="product-info">
          <div class="product-tag-list">
            ${product.tags.map(tag => `<span class="product-tag">${tag}</span>`).join('')}
          </div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-meta">
            <div class="product-price">${product.price.toLocaleString()} <small>FCFA</small></div>
            <button class="btn-add-product" 
                    data-name="${product.name}" 
                    data-price="${product.price}" 
                    data-img="${product.image}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Add</span>
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Attach click handlers to newly generated add buttons
    menuGrid.querySelectorAll('.btn-add-product').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-name');
        const price = parseInt(btn.getAttribute('data-price'), 10);
        const img = btn.getAttribute('data-img');
        addToCart({
          id: 'item-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
          name: name,
          price: price,
          image: img,
          specs: 'Signature Recipe &bull; Regular Ice',
          quantity: 1
        });
        showToast(`Added ${name} to your order! 🧋`);
      });
    });
  }

  // Category filter click event
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeCategory = tab.getAttribute('data-category');
      renderMenu();
    });
  });

  // Search input live event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderMenu();
    });
  }

  // Also bind Best Sellers "Add" buttons
  document.querySelectorAll('#best-sellers-grid .btn-add-product').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      const price = parseInt(btn.getAttribute('data-price'), 10);
      const img = btn.getAttribute('data-img');
      addToCart({
        id: 'bs-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        name: name,
        price: price,
        image: img,
        specs: 'Best Seller &bull; Fresh Pearls',
        quantity: 1
      });
      showToast(`Added ${name} to your order! 🌸`);
    });
  });

  // Initial Menu Render
  renderMenu();

  /* ==========================================================================
     2. INTERACTIVE BUBBLE TEA BUILDER
     ========================================================================== */
  const builderState = {
    base: {
      name: 'Milk Tea',
      price: 2200,
      color: '#D2AC84'
    },
    flavor: {
      name: 'Strawberry',
      color: '#F28299'
    },
    topping: {
      name: 'Tapioca',
      price: 500,
      class: 'tapioca'
    },
    sweetness: '50%',
    ice: 'Regular Ice'
  };

  // Elements in builder
  const builderLiquid = document.getElementById('builder-liquid');
  const builderToppingsLayer = document.getElementById('builder-toppings-layer');
  const builderIceLayer = document.getElementById('builder-ice-layer');
  const builderDrinkName = document.getElementById('builder-drink-name');
  const builderDrinkSummary = document.getElementById('builder-drink-summary');
  const builderDrinkPrice = document.getElementById('builder-drink-price');
  const btnAddCustomBoba = document.getElementById('btn-add-custom-boba');
  const currentSweetnessText = document.getElementById('current-sweetness-text');
  const currentIceText = document.getElementById('current-ice-text');

  function updateBuilderVisual() {
    // 1. Calculate price
    const totalPrice = builderState.base.price + builderState.topping.price;

    // 2. Liquid color blending
    if (builderLiquid) {
      // Create rich fluid gradient matching the base & flavor
      const baseCol = builderState.base.color;
      const flavorCol = builderState.flavor.color;
      builderLiquid.style.background = `linear-gradient(180deg, ${flavorCol} 0%, ${baseCol} 100%)`;
    }

    // 3. Toppings visualization
    if (builderToppingsLayer) {
      let toppingHTML = '';
      const topClass = builderState.topping.class;
      const pearlCount = 8;
      for (let i = 0; i < pearlCount; i++) {
        toppingHTML += `<div class="boba-pearl ${topClass}"></div>`;
      }
      builderToppingsLayer.innerHTML = toppingHTML;
    }

    // 4. Ice cubes visualization
    if (builderIceLayer) {
      if (builderState.ice === 'No Ice') {
        builderIceLayer.style.display = 'none';
      } else {
        builderIceLayer.style.display = 'flex';
        let count = 1;
        if (builderState.ice === 'Regular Ice') count = 2;
        if (builderState.ice === 'Extra Ice') count = 3;
        
        let iceHTML = '';
        for (let j = 0; j < count; j++) {
          const rot = (j % 2 === 0) ? 15 : -18;
          iceHTML += `<div class="ice-cube" style="transform: rotate(${rot}deg);"></div>`;
        }
        builderIceLayer.innerHTML = iceHTML;
      }
    }

    // 5. Texts & Price update
    const drinkTitle = `${builderState.flavor.name} ${builderState.base.name}`;
    if (builderDrinkName) {
      builderDrinkName.textContent = drinkTitle;
    }

    if (builderDrinkSummary) {
      builderDrinkSummary.innerHTML = `
        ${builderState.base.name} Base &bull; ${builderState.flavor.name} &bull; ${builderState.topping.name} &bull; ${builderState.sweetness} Sugar &bull; ${builderState.ice}
      `;
    }

    if (builderDrinkPrice) {
      builderDrinkPrice.textContent = `${totalPrice.toLocaleString()} FCFA`;
    }

    if (currentSweetnessText) {
      currentSweetnessText.textContent = `${builderState.sweetness} Sweetness`;
    }

    if (currentIceText) {
      currentIceText.textContent = builderState.ice;
    }
  }

  // Step 1: Base chips
  document.querySelectorAll('#step-base .option-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#step-base .option-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      builderState.base = {
        name: chip.getAttribute('data-value'),
        price: parseInt(chip.getAttribute('data-price'), 10),
        color: chip.getAttribute('data-color')
      };
      updateBuilderVisual();
    });
  });

  // Step 2: Flavor chips
  document.querySelectorAll('#step-flavor .option-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#step-flavor .option-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      builderState.flavor = {
        name: chip.getAttribute('data-value'),
        color: chip.getAttribute('data-color')
      };
      updateBuilderVisual();
    });
  });

  // Step 3: Topping chips
  document.querySelectorAll('#step-topping .option-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#step-topping .option-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      builderState.topping = {
        name: chip.getAttribute('data-value'),
        price: parseInt(chip.getAttribute('data-price'), 10),
        class: chip.getAttribute('data-topping-class')
      };
      updateBuilderVisual();
    });
  });

  // Step 4: Sweetness buttons
  document.querySelectorAll('#step-sweetness .slider-label-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#step-sweetness .slider-label-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      builderState.sweetness = btn.getAttribute('data-value');
      updateBuilderVisual();
    });
  });

  // Step 5: Ice buttons
  document.querySelectorAll('#step-ice .slider-label-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#step-ice .slider-label-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      builderState.ice = btn.getAttribute('data-value');
      updateBuilderVisual();
    });
  });

  // "Add to Order" custom drink button
  if (btnAddCustomBoba) {
    btnAddCustomBoba.addEventListener('click', () => {
      const customDrinkTotal = builderState.base.price + builderState.topping.price;
      const customName = `Custom ${builderState.flavor.name} ${builderState.base.name}`;
      const customSpecs = `${builderState.topping.name} &bull; ${builderState.sweetness} Sugar &bull; ${builderState.ice}`;
      
      addToCart({
        id: 'custom-' + Date.now(),
        name: customName,
        price: customDrinkTotal,
        image: 'https://images.unsplash.com/photo-1558857563-b37cf5c490ff?auto=format&fit=crop&w=600&q=80',
        specs: customSpecs,
        quantity: 1
      });

      showToast(`Custom boba "${customName}" added to order! 🎨`);
      openCartDrawer();
    });
  }

  // Initialize visual builder once
  updateBuilderVisual();

  /* ==========================================================================
     3. CART & ORDER SYSTEM (PERSISTENT IN LOCALSTORAGE)
     ========================================================================== */
  let cart = [];
  let appliedPromo = null; // e.g. { code: 'BLOOM10', rate: 0.1 }

  // Load from localStorage if present
  try {
    const stored = localStorage.getItem('bobabloom_cart');
    if (stored) {
      cart = JSON.parse(stored);
    }
  } catch (e) {
    console.warn('LocalStorage unavailable or empty');
  }

  const cartCounter = document.getElementById('cart-counter');
  const cartDrawerCount = document.getElementById('cart-drawer-count');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const calcSubtotal = document.getElementById('calc-subtotal');
  const calcDiscount = document.getElementById('calc-discount');
  const rowDiscount = document.getElementById('row-discount');
  const calcTotal = document.getElementById('calc-total');
  const checkoutFinalTotal = document.getElementById('checkout-final-total');
  const meterFill = document.getElementById('meter-fill');
  const meterLabel = document.getElementById('meter-label');
  const meterPct = document.getElementById('meter-pct');

  const cartDrawer = document.getElementById('cart-drawer');
  const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const btnClearCart = document.getElementById('btn-clear-cart');
  const btnApplyPromo = document.getElementById('btn-apply-promo');
  const promoInput = document.getElementById('promo-input');
  const btnCartCheckout = document.getElementById('btn-cart-checkout');

  function saveCart() {
    try {
      localStorage.setItem('bobabloom_cart', JSON.stringify(cart));
    } catch (e) {
      // Storage limits or privacy settings
    }
  }

  function getCartItemCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  function getCartSubtotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  function renderCart() {
    const count = getCartItemCount();
    const subtotal = getCartSubtotal();

    // 1. Update Badges
    if (cartCounter) {
      cartCounter.textContent = count;
      cartCounter.classList.add('bump');
      setTimeout(() => cartCounter.classList.remove('bump'), 350);
    }
    if (cartDrawerCount) {
      cartDrawerCount.textContent = `${count} item${count === 1 ? '' : 's'}`;
    }

    // 2. Free Delivery Threshold (6,000 FCFA)
    const FREE_DELIVERY_THRESHOLD = 6000;
    if (meterFill && meterLabel && meterPct) {
      if (subtotal >= FREE_DELIVERY_THRESHOLD) {
        meterFill.style.width = '100%';
        meterPct.textContent = '100%';
        meterLabel.textContent = '🎉 You unlocked Free Cotonou Delivery!';
      } else {
        const remaining = FREE_DELIVERY_THRESHOLD - subtotal;
        const pct = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
        meterFill.style.width = `${pct}%`;
        meterPct.textContent = `${pct}%`;
        meterLabel.textContent = `Add ${remaining.toLocaleString()} FCFA more for Free Cotonou Delivery`;
      }
    }

    // 3. Render Cart Item Rows
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-view">
          <svg class="empty-cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h4 style="font-size: 1.15rem; margin-bottom: 6px;">Your cart is empty</h4>
          <p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 16px;">
            Looks like you haven't picked your boba yet. Explore our favorites or build your own!
          </p>
          <button class="btn btn-secondary btn-sm" id="btn-empty-explore">Explore Menu</button>
        </div>
      `;

      const emptyExploreBtn = document.getElementById('btn-empty-explore');
      if (emptyExploreBtn) {
        emptyExploreBtn.addEventListener('click', () => {
          closeCartDrawer();
          const menuElem = document.getElementById('menu');
          if (menuElem) menuElem.scrollIntoView({ behavior: 'smooth' });
        });
      }
    } else {
      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-cart-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1558857563-b37cf5c490ff?auto=format&fit=crop&w=120&q=80'" />
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-specs">${item.specs || 'Regular Ice'}</div>
            <div class="cart-item-bottom">
              <div class="qty-control">
                <button class="qty-btn btn-qty-minus" data-id="${item.id}" aria-label="Decrease quantity">&minus;</button>
                <span class="qty-val">${item.quantity}</span>
                <button class="qty-btn btn-qty-plus" data-id="${item.id}" aria-label="Increase quantity">&plus;</button>
              </div>
              <div class="cart-item-price">${(item.price * item.quantity).toLocaleString()} FCFA</div>
            </div>
          </div>
          <button class="cart-item-remove btn-item-remove" data-id="${item.id}" aria-label="Remove ${item.name}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      `).join('');

      // Add Quantity & Remove Listeners
      cartItemsContainer.querySelectorAll('.btn-qty-minus').forEach(b => {
        b.addEventListener('click', () => decreaseQty(b.getAttribute('data-id')));
      });
      cartItemsContainer.querySelectorAll('.btn-qty-plus').forEach(b => {
        b.addEventListener('click', () => increaseQty(b.getAttribute('data-id')));
      });
      cartItemsContainer.querySelectorAll('.btn-item-remove').forEach(b => {
        b.addEventListener('click', () => removeItem(b.getAttribute('data-id')));
      });
    }

    // 4. Calculations (Subtotal, Discount, Total)
    let discountAmount = 0;
    if (appliedPromo && appliedPromo.rate) {
      discountAmount = Math.round(subtotal * appliedPromo.rate);
      if (rowDiscount) rowDiscount.style.display = 'flex';
      if (calcDiscount) calcDiscount.textContent = `-${discountAmount.toLocaleString()} FCFA`;
    } else {
      if (rowDiscount) rowDiscount.style.display = 'none';
    }

    const finalTotal = Math.max(0, subtotal - discountAmount);

    if (calcSubtotal) calcSubtotal.textContent = `${subtotal.toLocaleString()} FCFA`;
    if (calcTotal) calcTotal.textContent = `${finalTotal.toLocaleString()} FCFA`;
    if (checkoutFinalTotal) checkoutFinalTotal.textContent = `${finalTotal.toLocaleString()} FCFA`;

    saveCart();
  }

  function addToCart(newItem) {
    // Check if an identical standard item exists
    const existingIndex = cart.findIndex(item => item.name === newItem.name && item.specs === newItem.specs);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += newItem.quantity;
    } else {
      cart.push(newItem);
    }
    renderCart();
  }

  function increaseQty(id) {
    const target = cart.find(item => item.id === id);
    if (target) {
      target.quantity += 1;
      renderCart();
    }
  }

  function decreaseQty(id) {
    const target = cart.find(item => item.id === id);
    if (target) {
      if (target.quantity > 1) {
        target.quantity -= 1;
      } else {
        cart = cart.filter(item => item.id !== id);
      }
      renderCart();
    }
  }

  function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
    showToast('Item removed from order');
  }

  function clearCart() {
    if (cart.length === 0) return;
    cart = [];
    appliedPromo = null;
    if (promoInput) promoInput.value = '';
    renderCart();
    showToast('Cart cleared');
  }

  function openCartDrawer() {
    if (cartDrawer && cartDrawerOverlay) {
      cartDrawer.classList.add('open');
      cartDrawer.setAttribute('aria-hidden', 'false');
      cartDrawerOverlay.classList.add('open');
      cartDrawerOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCartDrawer() {
    if (cartDrawer && cartDrawerOverlay) {
      cartDrawer.classList.remove('open');
      cartDrawer.setAttribute('aria-hidden', 'true');
      cartDrawerOverlay.classList.remove('open');
      cartDrawerOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  // Toggle Cart
  if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCartDrawer);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);
  if (cartDrawerOverlay) cartDrawerOverlay.addEventListener('click', closeCartDrawer);
  if (btnClearCart) btnClearCart.addEventListener('click', clearCart);

  // Promo code system
  if (btnApplyPromo && promoInput) {
    btnApplyPromo.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'BLOOM10') {
        appliedPromo = { code: 'BLOOM10', rate: 0.10 };
        renderCart();
        showToast('Promo code BLOOM10 applied (10% OFF)! 🎉');
      } else if (code === 'COTONOU') {
        appliedPromo = { code: 'COTONOU', rate: 0.15 };
        renderCart();
        showToast('Local love: 15% OFF your order! 🌸');
      } else if (code === '') {
        showToast('Please enter a promo code first.');
      } else {
        showToast('Invalid promo code. Try "BLOOM10"');
      }
    });
  }

  // Initialize cart on boot
  renderCart();

  /* ==========================================================================
     4. CHECKOUT MODAL & SIMULATED ORDER CONFIRMATION
     ========================================================================== */
  const checkoutModal = document.getElementById('checkout-modal');
  const checkoutCloseBtn = document.getElementById('checkout-close-btn');
  const checkoutForm = document.getElementById('checkout-form');
  const checkoutFormView = document.getElementById('checkout-form-view');
  const checkoutSuccessView = document.getElementById('checkout-success-view');
  const orderTypeSelect = document.getElementById('order-type');
  const deliveryAddressGroup = document.getElementById('delivery-address-group');
  const receiptDetails = document.getElementById('receipt-details');
  const btnWhatsappTrack = document.getElementById('btn-whatsapp-track');
  const btnReceiptDone = document.getElementById('btn-receipt-done');

  function openCheckoutModal() {
    if (cart.length === 0) {
      showToast('Your cart is empty! Add a boba drink first.');
      return;
    }
    closeCartDrawer();
    if (checkoutModal) {
      checkoutModal.classList.add('open');
      checkoutModal.setAttribute('aria-hidden', 'false');
      if (checkoutFormView) checkoutFormView.style.display = 'block';
      if (checkoutSuccessView) checkoutSuccessView.style.display = 'none';
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCheckoutModal() {
    if (checkoutModal) {
      checkoutModal.classList.remove('open');
      checkoutModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (btnCartCheckout) btnCartCheckout.addEventListener('click', openCheckoutModal);
  if (checkoutCloseBtn) checkoutCloseBtn.addEventListener('click', closeCheckoutModal);
  if (checkoutModal) {
    checkoutModal.addEventListener('click', (e) => {
      if (e.target === checkoutModal) closeCheckoutModal();
    });
  }

  // Delivery toggle inside checkout
  if (orderTypeSelect && deliveryAddressGroup) {
    orderTypeSelect.addEventListener('change', (e) => {
      if (e.target.value === 'delivery') {
        deliveryAddressGroup.style.display = 'block';
        const addrInput = document.getElementById('cust-address');
        if (addrInput) addrInput.setAttribute('required', 'true');
      } else {
        deliveryAddressGroup.style.display = 'none';
        const addrInput = document.getElementById('cust-address');
        if (addrInput) addrInput.removeAttribute('required');
      }
    });
  }

  // Form submission: Generates simulated order confirmation receipt
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const custName = document.getElementById('cust-name').value.trim();
      const custPhone = document.getElementById('cust-phone').value.trim();
      const orderType = orderTypeSelect ? orderTypeSelect.value : 'pickup';
      const address = document.getElementById('cust-address') ? document.getElementById('cust-address').value.trim() : '';
      const notes = document.getElementById('cust-notes') ? document.getElementById('cust-notes').value.trim() : '';

      // Generate Order Number
      const orderNum = 'BB-' + Math.floor(1000 + Math.random() * 9000);
      const subtotal = getCartSubtotal();
      let discountAmount = 0;
      if (appliedPromo && appliedPromo.rate) {
        discountAmount = Math.round(subtotal * appliedPromo.rate);
      }
      const deliveryFee = (orderType === 'delivery' && subtotal < 6000) ? 1000 : 0;
      const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

      // Render Receipt View
      if (receiptDetails) {
        receiptDetails.innerHTML = `
          <div style="display:flex; justify-content:space-between; margin-bottom:8px; border-bottom:1px solid rgba(0,0,0,0.08); padding-bottom:8px;">
            <span><strong>Order ID:</strong> ${orderNum}</span>
            <span><strong>Status:</strong> Brewing 🧋</span>
          </div>
          <div style="margin-bottom:8px;">
            <div><strong>Customer:</strong> ${custName} (${custPhone})</div>
            <div><strong>Type:</strong> ${orderType === 'delivery' ? `Delivery to ${address}` : 'Pickup at Haie Vive Lounge'}</div>
            ${notes ? `<div><strong>Notes:</strong> <em>${notes}</em></div>` : ''}
          </div>
          <div style="border-top:1px dashed rgba(0,0,0,0.15); padding-top:8px; margin-top:8px;">
            <div style="font-weight:700; margin-bottom:4px;">Items Ordered:</div>
            ${cart.map(i => `
              <div style="display:flex; justify-content:space-between; font-size:0.84rem; margin-bottom:2px;">
                <span>${i.quantity}x ${i.name}</span>
                <span>${(i.price * i.quantity).toLocaleString()} FCFA</span>
              </div>
            `).join('')}
          </div>
          <div style="border-top:1px solid rgba(0,0,0,0.1); padding-top:8px; margin-top:8px; font-weight:8px; display:flex; justify-content:space-between;">
            <strong>Total Amount:</strong>
            <strong style="color:var(--color-raspberry); font-size:1.05rem;">${grandTotal.toLocaleString()} FCFA</strong>
          </div>
          <div style="margin-top:10px; font-size:0.8rem; color:var(--color-text-muted); text-align:center;">
            ⏱ Estimated ready in: <strong>15–20 minutes</strong>
          </div>
        `;
      }

      // Pre-fill WhatsApp message link for direct follow-up
      if (btnWhatsappTrack) {
        const waText = encodeURIComponent(
          `Hello Boba Bloom Cotonou! I just placed order ${orderNum} for ${custName}. Items: ${cart.map(i => `${i.quantity}x ${i.name}`).join(', ')}. Total: ${grandTotal.toLocaleString()} FCFA.`
        );
        btnWhatsappTrack.href = `https://wa.me/22997000000?text=${waText}`;
      }

      // Switch views in modal
      if (checkoutFormView) checkoutFormView.style.display = 'none';
      if (checkoutSuccessView) checkoutSuccessView.style.display = 'block';

      // Clear the cart
      cart = [];
      appliedPromo = null;
      renderCart();
      showToast(`Order ${orderNum} confirmed! See you soon 🌸`);
    });
  }

  if (btnReceiptDone) {
    btnReceiptDone.addEventListener('click', closeCheckoutModal);
  }

  /* ==========================================================================
     5. TESTIMONIALS SLIDER
     ========================================================================== */
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const sliderDots = document.querySelectorAll('.slider-dot');
  const sliderPrev = document.getElementById('slider-prev');
  const sliderNext = document.getElementById('slider-next');
  let currentSlide = 0;
  let autoSlideTimer = null;

  function showSlide(index) {
    if (testimonialSlides.length === 0) return;
    currentSlide = (index + testimonialSlides.length) % testimonialSlides.length;

    testimonialSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });

    sliderDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
      dot.setAttribute('aria-selected', i === currentSlide ? 'true' : 'false');
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  if (sliderNext) sliderNext.addEventListener('click', () => { nextSlide(); resetSlideTimer(); });
  if (sliderPrev) sliderPrev.addEventListener('click', () => { prevSlide(); resetSlideTimer(); });

  sliderDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(idx);
      resetSlideTimer();
    });
  });

  function startSlideTimer() {
    autoSlideTimer = setInterval(nextSlide, 5500);
  }

  function resetSlideTimer() {
    clearInterval(autoSlideTimer);
    startSlideTimer();
  }

  startSlideTimer();

  // Pause on hover
  const testimonialContainer = document.querySelector('.testimonials-slider-container');
  if (testimonialContainer) {
    testimonialContainer.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
    testimonialContainer.addEventListener('mouseleave', startSlideTimer);
  }

  /* ==========================================================================
     6. ANIMATED STATISTICS ON SCROLL (INTERSECTION OBSERVER)
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  function animateStats() {
    statNumbers.forEach(el => {
      const target = parseFloat(el.getAttribute('data-target'));
      const format = el.getAttribute('data-format');
      const suffix = el.getAttribute('data-suffix') || '';
      const isDecimal = el.getAttribute('data-decimal') === '1';

      let start = 0;
      const duration = 1800; // 1.8s
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * easeOut;

        if (format === 'k') {
          const kVal = Math.round(current / 1000);
          el.textContent = `${kVal}K+`;
        } else if (isDecimal) {
          el.textContent = `${current.toFixed(1)}${suffix}`;
        } else {
          el.textContent = `${Math.round(current)}${suffix || (target === 15 ? '+' : '')}`;
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    });
  }

  const statsSection = document.getElementById('stats');
  if (statsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          animateStats();
          observer.unobserve(statsSection);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }

  /* ==========================================================================
     7. EDITORIAL GALLERY LIGHTBOX
     ========================================================================== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

  function openLightbox(fullSrc, caption) {
    if (lightboxModal && lightboxImg && lightboxCaption) {
      lightboxImg.src = fullSrc;
      lightboxCaption.textContent = caption;
      lightboxModal.classList.add('open');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('open');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const full = item.getAttribute('data-full');
      const caption = item.getAttribute('data-caption');
      openLightbox(full, caption);
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  /* ==========================================================================
     8. STICKY NAVBAR & MOBILE DRAWER NAVIGATION
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-drawer-link');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 35) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile drawer toggle
  function toggleMobileDrawer() {
    if (!mobileDrawer || !mobileNavToggle) return;
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('hidden', '');
      mobileNavToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      mobileDrawer.classList.remove('open'); // reset
      mobileDrawer.removeAttribute('hidden');
      // trigger reflow
      void mobileDrawer.offsetWidth;
      mobileDrawer.classList.add('open');
      mobileNavToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', toggleMobileDrawer);
  }

  // Close mobile drawer on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        toggleMobileDrawer();
      }
    });
  });

  // Active section highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 140;
    sections.forEach(sec => {
      const secTop = sec.offsetTop;
      const secHeight = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  });

  /* ==========================================================================
     9. BACK TO TOP BUTTON
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     10. TOAST NOTIFICATION ENGINE
     ========================================================================== */
  const toastContainer = document.getElementById('toast-container');

  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span>🧋</span>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px) scale(0.95)';
      setTimeout(() => toast.remove(), 320);
    }, 3200);
  }

  /* ==========================================================================
     11. ALLERGENS & PRIVACY MODAL
     ========================================================================== */
  const infoModal = document.getElementById('info-modal');
  const infoModalTitle = document.getElementById('info-modal-title');
  const infoModalBody = document.getElementById('info-modal-body');
  const infoModalCloseBtn = document.getElementById('info-modal-close-btn');
  const btnOpenAllergens = document.getElementById('btn-open-allergens');
  const btnOpenPrivacy = document.getElementById('btn-open-privacy');

  function openInfoModal(title, content) {
    if (infoModal && infoModalTitle && infoModalBody) {
      infoModalTitle.textContent = title;
      infoModalBody.innerHTML = content;
      infoModal.classList.add('open');
      infoModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeInfoModal() {
    if (infoModal) {
      infoModal.classList.remove('open');
      infoModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (btnOpenAllergens) {
    btnOpenAllergens.addEventListener('click', () => {
      openInfoModal(
        'Allergen & Dietary Information',
        `
        <p><strong>Dairy / Lactose:</strong> Our standard milk teas are made with dairy milk. We offer 100% plant-based oat milk and coconut milk substitutions upon request at no extra charge!</p>
        <br />
        <p><strong>Tapioca Pearls:</strong> Our brown sugar pearls are made from cassava root starch (tapioca) and are naturally 100% vegan and gluten-free.</p>
        <br />
        <p><strong>Popping Boba:</strong> Enclosed in plant-based seaweed extract (sodium alginate). No gelatin is used.</p>
        <br />
        <p><strong>Caffeine:</strong> Black, green, oolong, and matcha teas naturally contain tea caffeine. Our fruit infusions (like Hibiscus and Lychee Rose) can be prepared caffeine-free.</p>
        `
      );
    });
  }

  if (btnOpenPrivacy) {
    btnOpenPrivacy.addEventListener('click', () => {
      openInfoModal(
        'Privacy Policy & Local Service',
        `
        <p><strong>Boba Bloom Cotonou</strong> respects your personal data. We only use your phone number and address to coordinate and deliver your drink orders across Cotonou, Benin.</p>
        <br />
        <p>We do not store credit card details or share your information with third-party advertisers. All orders are stored securely in your browser session.</p>
        `
      );
    });
  }

  if (infoModalCloseBtn) infoModalCloseBtn.addEventListener('click', closeInfoModal);
  if (infoModal) {
    infoModal.addEventListener('click', (e) => {
      if (e.target === infoModal) closeInfoModal();
    });
  }

  // Global ESC key to dismiss any active modal/drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeCheckoutModal();
      closeLightbox();
      closeInfoModal();
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        toggleMobileDrawer();
      }
    }
  });

  // Newsletter form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('Welcome to the Bloom Club! Check your inbox for 10% off.');
        input.value = '';
      }
    });
  }

  // Set current copyright year
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     3D FLAVOR CAROUSEL — LIQUID GLASS ORBITAL ROTATION ENGINE
     ========================================================================== */
  function init3DOrbitCarousel() {
    const carouselInner = document.getElementById('carousel-3d-inner');
    const bobaStage = document.getElementById('boba-3d-stage');
    const btnToggle = document.getElementById('btn-orbit-toggle');
    const btnReverse = document.getElementById('btn-orbit-reverse');
    const speedBtns = document.querySelectorAll('.orbit-speed-btn');
    const toggleText = document.getElementById('orbit-toggle-text');
    const iconPause = document.querySelector('.ctrl-icon-pause');
    const iconPlay = document.querySelector('.ctrl-icon-play');

    if (!carouselInner) return;

    // Rotation State Variables
    let rotationAngle = 0;
    const baseSpeed = 0.28; // degrees per frame (~17 deg/sec)
    let speedMultiplier = 1;
    let direction = 1; // 1 for clockwise, -1 for counter-clockwise
    let isPaused = false;
    let isHovered = false;
    let hoverDamping = 1; // 1 = full speed, eases to 0 on hover
    let isDragging = false;
    let dragVelocity = 0;
    let lastDragX = 0;
    let lastDragTime = 0;
    let totalDragMovement = 0;

    function getPerspectiveConfig() {
      const w = window.innerWidth;
      if (w <= 480) return { perspective: 800, rotateX: -10 };
      if (w <= 768) return { perspective: 900, rotateX: -10 };
      return { perspective: 1100, rotateX: -10 };
    }

    function renderTransform() {
      const config = getPerspectiveConfig();
      const normalized = ((rotationAngle % 360) + 360) % 360;
      carouselInner.style.transform = `perspective(${config.perspective}px) rotateX(${config.rotateX}deg) rotateY(${normalized}deg)`;
    }

    // High-performance 60fps animation loop
    function tick() {
      if (!isDragging) {
        // Smooth hover deceleration & acceleration
        if (isHovered && !isPaused) {
          hoverDamping += (0 - hoverDamping) * 0.12;
        } else if (!isHovered && !isPaused) {
          hoverDamping += (1 - hoverDamping) * 0.08;
        }

        // Apply drag throw inertia
        if (Math.abs(dragVelocity) > 0.02) {
          rotationAngle += dragVelocity;
          dragVelocity *= 0.93; // smooth friction
        } else {
          dragVelocity = 0;
          if (!isPaused) {
            rotationAngle += direction * baseSpeed * speedMultiplier * hoverDamping;
          }
        }
      }

      renderTransform();
      requestAnimationFrame(tick);
    }

    // Launch RAF loop
    requestAnimationFrame(tick);

    // Play / Pause toggle
    if (btnToggle) {
      btnToggle.addEventListener('click', () => {
        isPaused = !isPaused;
        if (toggleText) toggleText.textContent = isPaused ? 'Reprendre' : 'Pause';
        if (iconPause) iconPause.style.display = isPaused ? 'none' : 'block';
        if (iconPlay) iconPlay.style.display = isPaused ? 'block' : 'none';
        btnToggle.classList.toggle('active', isPaused);
      });
    }

    // Reverse Direction toggle
    if (btnReverse) {
      btnReverse.addEventListener('click', () => {
        direction = -direction;
        btnReverse.classList.toggle('active', direction === -1);
      });
    }

    // Speed Controls
    speedBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        speedBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const speed = btn.getAttribute('data-speed');
        if (speed === 'slow') speedMultiplier = 0.5;
        else if (speed === 'fast') speedMultiplier = 2.0;
        else speedMultiplier = 1.0;
      });
    });

    // Smooth hover detection for desktop
    if (bobaStage) {
      bobaStage.addEventListener('mouseenter', () => {
        isHovered = true;
      });
      bobaStage.addEventListener('mouseleave', () => {
        isHovered = false;
        if (isDragging) onPointerUp();
      });
    }

    // Pointer down for swipe/drag
    function onPointerDown(e) {
      if (e.target.closest('button.card-drink-btn')) return;
      isDragging = true;
      totalDragMovement = 0;
      const clientX = e.pageX !== undefined ? e.pageX : (e.touches && e.touches[0].pageX);
      lastDragX = clientX;
      lastDragTime = performance.now();
      dragVelocity = 0;
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const clientX = e.pageX !== undefined ? e.pageX : (e.touches && e.touches[0].pageX);
      const diffX = clientX - lastDragX;
      totalDragMovement += Math.abs(diffX);

      const now = performance.now();
      const dt = now - lastDragTime || 16;
      dragVelocity = (diffX / dt) * 16 * 0.35; // velocity in deg/frame

      rotationAngle += diffX * 0.35;
      lastDragX = clientX;
      lastDragTime = now;
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      // Cap throw velocity for gentle organic glide
      if (Math.abs(dragVelocity) > 6) {
        dragVelocity = Math.sign(dragVelocity) * 6;
      }
    }

    if (bobaStage) {
      bobaStage.addEventListener('mousedown', onPointerDown);
      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerUp);

      bobaStage.addEventListener('touchstart', onPointerDown, { passive: true });
      window.addEventListener('touchmove', onPointerMove, { passive: true });
      window.addEventListener('touchend', onPointerUp);
    }

    // Card interactions & Add to Cart
    const cards = carouselInner.querySelectorAll('.card');
    cards.forEach(card => {
      const name = card.getAttribute('data-name');
      const price = parseInt(card.getAttribute('data-price'), 10);
      const img = card.getAttribute('data-img');
      const btn = card.querySelector('.card-drink-btn');

      function handleAddDrink(e) {
        if (e) e.stopPropagation();
        addToCart({
          id: 'orbit-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
          name: name,
          price: price,
          image: img,
          specs: 'Signature Orbit Liquid Glass • Perles Fraîches',
          quantity: 1
        });
        showToast(`Ajouté au panier: ${name} (${price.toLocaleString()} FCFA)`);
      }

      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          handleAddDrink(e);
        });
      }

      card.addEventListener('click', (e) => {
        // Only trigger order when user tapped/clicked without a drag gesture
        if (totalDragMovement < 8 && !e.target.closest('.card-drink-btn')) {
          handleAddDrink(e);
        }
      });
    });
  }

  // Initialize 3D Orbit Carousel
  init3DOrbitCarousel();
});
