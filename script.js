/**
 * BOBA BLOOM — Handcrafted Bubble Tea (Cotonou, Benin)
 * Pure Vanilla JavaScript Client Application
 * Fully responsive, accessible, and conversion-focused
 */

function initBobaBloom() {
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
          <div style="margin-bottom: 8px; color: var(--color-gold);">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <h3 style="font-size: 1.25rem; margin-bottom: 6px;">Aucune boisson trouvée</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem;">
            Essayez des mots-clés comme « taro », « matcha » ou « jasmin ».
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
              <span>Ajouter</span>
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
          specs: 'Recette Signature &bull; Glaçons modérés',
          quantity: 1
        });
        showToast(`${name} ajouté à votre commande`);
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
        specs: 'Sélection Exclusive &bull; Perles Fraîches',
        quantity: 1
      });
      showToast(`${name} ajouté à votre commande`);
    });
  });

  // Initial Menu Render
  renderMenu();

  /* ==========================================================================
     2. INTERACTIVE BUBBLE TEA BUILDER & PROGRESSIVE GENERATOR
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
    ice: 'Regular Ice',
    size: 'regular',
    sizeExtra: 0,
    currentStep: 1
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
  const builderStatusText = document.getElementById('builder-status-text');
  const btnAutoGenerate = document.getElementById('btn-auto-generate');
  const btnBuilderReset = document.getElementById('btn-builder-reset');

  const stepInstructions = {
    1: 'Étape 1 sur 5 : Choisissez votre base de thé fraîchement infusée.',
    2: 'Étape 2 sur 5 : Ajoutez votre arôme de fruits ou infusion gourmande.',
    3: 'Étape 3 sur 5 : Sélectionnez vos perles de tapioca ou toppings frais.',
    4: 'Étape 4 sur 5 : Personnalisez votre niveau de douceur.',
    5: 'Étape 5 sur 5 : Ajustez la quantité de glaçons rafraîchissants.',
    complete: 'Recette harmonieuse et équilibrée. Prête à être dégustée.'
  };

  function setActiveStep(stepNum, scrollIntoView = false) {
    builderState.currentStep = stepNum;

    // Update stepper tabs
    document.querySelectorAll('.stepper-step').forEach(stepBtn => {
      const s = parseInt(stepBtn.getAttribute('data-step'), 10);
      stepBtn.classList.remove('active', 'completed');
      if (s === stepNum) {
        stepBtn.classList.add('active');
      } else if (s < stepNum) {
        stepBtn.classList.add('completed');
      }
    });

    // Update step cards highlighting
    document.querySelectorAll('.builder-step-card').forEach(card => {
      const s = parseInt(card.getAttribute('data-step-index'), 10);
      if (s === stepNum) {
        card.classList.add('active-step');
        if (scrollIntoView) {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        card.classList.remove('active-step');
      }
    });

    // Update status text
    if (builderStatusText) {
      builderStatusText.textContent = stepInstructions[stepNum] || stepInstructions[1];
    }
  }

  function updateBuilderVisual(triggerAnimation = false) {
    // 1. Calculate price with size extra
    const totalPrice = builderState.base.price + builderState.topping.price + builderState.sizeExtra;

    // 2. Liquid color blending
    if (builderLiquid) {
      const baseCol = builderState.base.color;
      const flavorCol = builderState.flavor.color;
      builderLiquid.style.background = `linear-gradient(180deg, ${flavorCol} 0%, ${baseCol} 100%)`;

      if (triggerAnimation) {
        builderLiquid.classList.remove('is-pouring');
        void builderLiquid.offsetWidth; // Trigger reflow
        builderLiquid.classList.add('is-pouring');
      }
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

      if (triggerAnimation) {
        builderToppingsLayer.classList.remove('is-dropping');
        void builderToppingsLayer.offsetWidth;
        builderToppingsLayer.classList.add('is-dropping');
      }
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

        if (triggerAnimation) {
          builderIceLayer.classList.remove('is-clinking');
          void builderIceLayer.offsetWidth;
          builderIceLayer.classList.add('is-clinking');
        }
      }
    }

    // 5. Texts & Price update
    const sizeLabel = builderState.size === 'large' ? 'Grand (700ml)' : 'Standard (500ml)';
    const drinkTitle = `${builderState.flavor.name} ${builderState.base.name}`;
    if (builderDrinkName) {
      builderDrinkName.textContent = drinkTitle;
    }

    if (builderDrinkSummary) {
      builderDrinkSummary.innerHTML = `
        ${builderState.base.name} &bull; ${builderState.flavor.name} &bull; ${builderState.topping.name} &bull; ${builderState.sweetness} &bull; ${builderState.ice} &bull; <span style="font-weight:700;">${sizeLabel}</span>
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
      updateBuilderVisual(true);
      setActiveStep(2, false);
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
      updateBuilderVisual(true);
      setActiveStep(3, false);
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
      updateBuilderVisual(true);
      setActiveStep(4, false);
    });
  });

  // Step 4: Sweetness buttons
  document.querySelectorAll('#step-sweetness .slider-label-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#step-sweetness .slider-label-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      builderState.sweetness = btn.getAttribute('data-value');
      updateBuilderVisual(false);
      setActiveStep(5, false);
    });
  });

  // Step 5: Ice buttons
  document.querySelectorAll('#step-ice .slider-label-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#step-ice .slider-label-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      builderState.ice = btn.getAttribute('data-value');
      updateBuilderVisual(true);
      if (builderStatusText) {
        builderStatusText.textContent = stepInstructions.complete;
      }
    });
  });

  // Next step buttons on each step card
  document.querySelectorAll('.btn-next-step').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextStep = parseInt(btn.getAttribute('data-next'), 10);
      setActiveStep(nextStep, true);
    });
  });

  // Finish button on step 5
  const btnFinishBuilder = document.getElementById('btn-finish-builder');
  if (btnFinishBuilder && btnAddCustomBoba) {
    btnFinishBuilder.addEventListener('click', () => {
      btnAddCustomBoba.click();
    });
  }

  // Stepper tabs navigation
  document.querySelectorAll('.stepper-step').forEach(tab => {
    tab.addEventListener('click', () => {
      const stepTarget = parseInt(tab.getAttribute('data-step'), 10);
      setActiveStep(stepTarget, true);
    });
  });

  // Size toggle (Standard 500ml vs Grand 700ml)
  document.querySelectorAll('.size-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-opt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      builderState.size = btn.getAttribute('data-size');
      builderState.sizeExtra = parseInt(btn.getAttribute('data-extra'), 10) || 0;
      updateBuilderVisual(false);
    });
  });

  // PROGRESSIVE GENERATOR: "Générer au fur et à mesure"
  let isGenerating = false;
  if (btnAutoGenerate) {
    btnAutoGenerate.addEventListener('click', () => {
      if (isGenerating) return;
      isGenerating = true;
      btnAutoGenerate.disabled = true;
      const originalText = btnAutoGenerate.innerHTML;
      btnAutoGenerate.innerHTML = `<span>⏳ Création en direct...</span>`;

      // Available options from DOM chips
      const baseChips = Array.from(document.querySelectorAll('#step-base .option-chip'));
      const flavorChips = Array.from(document.querySelectorAll('#step-flavor .option-chip'));
      const toppingChips = Array.from(document.querySelectorAll('#step-topping .option-chip'));
      const sweetnessBtns = Array.from(document.querySelectorAll('#step-sweetness .slider-label-btn'));
      const iceBtns = Array.from(document.querySelectorAll('#step-ice .slider-label-btn'));

      // Helper for random pick
      const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

      const chosenBase = pickRandom(baseChips);
      const chosenFlavor = pickRandom(flavorChips);
      const chosenTopping = pickRandom(toppingChips);
      const chosenSweetness = pickRandom(sweetnessBtns.slice(1, 4)); // 30%, 50%, or 70%
      const chosenIce = pickRandom(iceBtns.slice(1, 3)); // Less Ice or Regular Ice

      // Step 1: Base (0ms)
      setActiveStep(1, true);
      if (chosenBase) {
        baseChips.forEach(c => c.classList.remove('selected'));
        chosenBase.classList.add('selected');
        builderState.base = {
          name: chosenBase.getAttribute('data-value'),
          price: parseInt(chosenBase.getAttribute('data-price'), 10),
          color: chosenBase.getAttribute('data-color')
        };
        if (builderStatusText) {
          builderStatusText.textContent = `Étape 1/5 : Versement de la base fraîche (${builderState.base.name})...`;
        }
        updateBuilderVisual(true);
      }

      // Step 2: Flavor (550ms)
      setTimeout(() => {
        setActiveStep(2, true);
        if (chosenFlavor) {
          flavorChips.forEach(c => c.classList.remove('selected'));
          chosenFlavor.classList.add('selected');
          builderState.flavor = {
            name: chosenFlavor.getAttribute('data-value'),
            color: chosenFlavor.getAttribute('data-color')
          };
          if (builderStatusText) {
            builderStatusText.textContent = `Étape 2/5 : Infusion des arômes (${builderState.flavor.name})...`;
          }
          updateBuilderVisual(true);
        }
      }, 550);

      // Step 3: Toppings (1150ms)
      setTimeout(() => {
        setActiveStep(3, true);
        if (chosenTopping) {
          toppingChips.forEach(c => c.classList.remove('selected'));
          chosenTopping.classList.add('selected');
          builderState.topping = {
            name: chosenTopping.getAttribute('data-value'),
            price: parseInt(chosenTopping.getAttribute('data-price'), 10),
            class: chosenTopping.getAttribute('data-topping-class')
          };
          if (builderStatusText) {
            builderStatusText.textContent = `Étape 3/5 : Ajout des perles fraîches (${builderState.topping.name})...`;
          }
          updateBuilderVisual(true);
        }
      }, 1150);

      // Step 4: Sweetness (1700ms)
      setTimeout(() => {
        setActiveStep(4, true);
        if (chosenSweetness) {
          sweetnessBtns.forEach(b => b.classList.remove('active'));
          chosenSweetness.classList.add('active');
          builderState.sweetness = chosenSweetness.getAttribute('data-value');
          if (builderStatusText) {
            builderStatusText.textContent = `Étape 4/5 : Dosage de la douceur (${builderState.sweetness})...`;
          }
          updateBuilderVisual(false);
        }
      }, 1700);

      // Step 5: Ice (2200ms)
      setTimeout(() => {
        setActiveStep(5, true);
        if (chosenIce) {
          iceBtns.forEach(b => b.classList.remove('active'));
          chosenIce.classList.add('active');
          builderState.ice = chosenIce.getAttribute('data-value');
          if (builderStatusText) {
            builderStatusText.textContent = `Étape 5/5 : Fraîcheur des glaçons (${builderState.ice})...`;
          }
          updateBuilderVisual(true);
        }
      }, 2200);

      // Completion (2650ms)
      setTimeout(() => {
        if (builderStatusText) {
          builderStatusText.textContent = `Votre création sur-mesure "${builderState.flavor.name} ${builderState.base.name}" est prête.`;
        }
        btnAutoGenerate.disabled = false;
        btnAutoGenerate.innerHTML = originalText;
        isGenerating = false;
        showToast(`Recette harmonisée : ${builderState.flavor.name} ${builderState.base.name}`);
      }, 2650);
    });
  }

  // Reset Builder button: "Recommencer"
  if (btnBuilderReset) {
    btnBuilderReset.addEventListener('click', () => {
      // Reset state to initial Classic Milk Tea
      builderState.base = { name: 'Milk Tea', price: 2200, color: '#D2AC84' };
      builderState.flavor = { name: 'Strawberry', color: '#F28299' };
      builderState.topping = { name: 'Tapioca', price: 500, class: 'tapioca' };
      builderState.sweetness = '50%';
      builderState.ice = 'Regular Ice';
      builderState.size = 'regular';
      builderState.sizeExtra = 0;

      // Reset DOM chips
      document.querySelectorAll('#step-base .option-chip').forEach(c => {
        c.classList.toggle('selected', c.getAttribute('data-value') === 'Milk Tea');
      });
      document.querySelectorAll('#step-flavor .option-chip').forEach(c => {
        c.classList.toggle('selected', c.getAttribute('data-value') === 'Strawberry');
      });
      document.querySelectorAll('#step-topping .option-chip').forEach(c => {
        c.classList.toggle('selected', c.getAttribute('data-value') === 'Tapioca');
      });
      document.querySelectorAll('#step-sweetness .slider-label-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-value') === '50%');
      });
      document.querySelectorAll('#step-ice .slider-label-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-value') === 'Regular Ice');
      });
      document.querySelectorAll('.size-opt-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-size') === 'regular');
      });

      setActiveStep(1, true);
      updateBuilderVisual(true);
      showToast('Composition réinitialisée');
    });
  }

  // "Add to Order" custom drink button
  if (btnAddCustomBoba) {
    btnAddCustomBoba.addEventListener('click', () => {
      const customDrinkTotal = builderState.base.price + builderState.topping.price + builderState.sizeExtra;
      const sizeLabel = builderState.size === 'large' ? ' (Grand 700ml)' : ' (Standard 500ml)';
      const customName = `Custom ${builderState.flavor.name} ${builderState.base.name}${sizeLabel}`;
      const customSpecs = `${builderState.topping.name} &bull; ${builderState.sweetness} Sugar &bull; ${builderState.ice}`;
      
      addToCart({
        id: 'custom-' + Date.now(),
        name: customName,
        price: customDrinkTotal,
        image: 'https://images.unsplash.com/photo-1558857563-b37cf5c490ff?auto=format&fit=crop&w=600&q=80',
        specs: customSpecs,
        quantity: 1
      });

      showToast(`Création "${customName}" ajoutée au panier`);
      openCartDrawer();
    });
  }

  // Initialize visual builder and step once
  setActiveStep(1, false);
  updateBuilderVisual(false);

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
      cartDrawerCount.textContent = `${count} article${count > 1 ? 's' : ''}`;
    }

    // 2. Free Delivery Threshold (6,000 FCFA)
    const FREE_DELIVERY_THRESHOLD = 6000;
    if (meterFill && meterLabel && meterPct) {
      if (subtotal >= FREE_DELIVERY_THRESHOLD) {
        meterFill.style.width = '100%';
        meterPct.textContent = '100%';
        meterLabel.textContent = 'Livraison offerte débloquée à Cotonou !';
      } else {
        const remaining = FREE_DELIVERY_THRESHOLD - subtotal;
        const pct = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
        meterFill.style.width = `${pct}%`;
        meterPct.textContent = `${pct}%`;
        meterLabel.textContent = `Plus que ${remaining.toLocaleString()} FCFA pour la livraison offerte`;
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
          <h4 style="font-size: 1.15rem; margin-bottom: 6px; font-family:var(--font-serif);">Votre sélection est vide</h4>
          <p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 16px;">
            Vous n'avez pas encore sélectionné de thé. Découvrez notre carte de saison ou composez votre création personnalisée !
          </p>
          <button class="btn btn-secondary btn-sm" id="btn-empty-explore">Découvrir la Carte</button>
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
    showToast('Création retirée du panier');
  }

  function clearCart() {
    if (cart.length === 0) return;
    cart = [];
    appliedPromo = null;
    if (promoInput) promoInput.value = '';
    renderCart();
    showToast('Votre sélection a été vidée');
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
        showToast('Code privilège BLOOM10 appliqué (-10%)');
      } else if (code === 'COTONOU') {
        appliedPromo = { code: 'COTONOU', rate: 0.15 };
        renderCart();
        showToast('Privilège Cotonou : -15% sur votre commande');
      } else if (code === '') {
        showToast('Veuillez saisir un code privilège.');
      } else {
        showToast('Code non reconnu. Essayez "BLOOM10"');
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
      showToast('Votre panier est vide ! Choisissez une boisson.');
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
          <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:6px; margin-bottom:8px; border-bottom:1px solid rgba(0,0,0,0.08); padding-bottom:8px;">
            <span><strong>N° Commande :</strong> ${orderNum}</span>
            <span><strong>Statut :</strong> Préparation artisanale</span>
          </div>
          <div style="margin-bottom:8px; line-height:1.5;">
            <div><strong>Client :</strong> ${custName} (${custPhone})</div>
            <div><strong>Mode :</strong> ${orderType === 'delivery' ? `Livraison à ${address}` : 'Retrait au Salon Haie Vive'}</div>
            ${notes ? `<div><strong>Précisions :</strong> <em>${notes}</em></div>` : ''}
          </div>
          <div style="border-top:1px dashed rgba(0,0,0,0.15); padding-top:8px; margin-top:8px;">
            <div style="font-weight:700; margin-bottom:6px;">Créations commandées :</div>
            ${cart.map(i => `
              <div style="display:flex; justify-content:space-between; gap:10px; font-size:0.85rem; margin-bottom:4px; align-items:baseline;">
                <span style="flex:1; min-width:0; word-break:break-word;">${i.quantity}x ${i.name}</span>
                <span style="white-space:nowrap; font-weight:600; text-align:right;">${(i.price * i.quantity).toLocaleString()} FCFA</span>
              </div>
            `).join('')}
          </div>
          <div style="border-top:1px solid rgba(0,0,0,0.1); padding-top:8px; margin-top:8px; display:flex; justify-content:space-between; gap:10px; align-items:baseline;">
            <span><strong>Total Réglé :</strong></span>
            <strong style="color:var(--color-gold); font-size:1.15rem; font-family:var(--font-serif); white-space:nowrap;">${grandTotal.toLocaleString()} FCFA</strong>
          </div>
          <div style="margin-top:10px; font-size:0.82rem; color:var(--color-text-muted); text-align:center;">
            Prêt au salon dans : <strong>15 à 20 minutes</strong>
          </div>
        `;
      }

      // Pre-fill WhatsApp message link for direct follow-up
      if (btnWhatsappTrack) {
        const waText = encodeURIComponent(
          `Bonjour Boba Bloom Cotonou ! Je viens de valider la commande ${orderNum} au nom de ${custName}. Articles : ${cart.map(i => `${i.quantity}x ${i.name}`).join(', ')}. Total : ${grandTotal.toLocaleString()} FCFA.`
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
      showToast(`Commande ${orderNum} validée. À très bientôt au Salon.`);
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

  // Pause on hover & touch swipe gestures for mobile
  const testimonialContainer = document.querySelector('.testimonials-slider-container');
  if (testimonialContainer) {
    testimonialContainer.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
    testimonialContainer.addEventListener('mouseleave', startSlideTimer);

    // Touch swipe support for testimonials
    let tStartX = 0;
    let tStartY = 0;
    testimonialContainer.addEventListener('touchstart', (e) => {
      if (!e.touches || e.touches.length === 0) return;
      tStartX = e.touches[0].clientX;
      tStartY = e.touches[0].clientY;
      clearInterval(autoSlideTimer);
    }, { passive: true });

    testimonialContainer.addEventListener('touchend', (e) => {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      const tEndX = e.changedTouches[0].clientX;
      const tEndY = e.changedTouches[0].clientY;
      const diffX = tEndX - tStartX;
      const diffY = tEndY - tStartY;

      // Check if horizontal swipe
      if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      resetSlideTimer();
    }, { passive: true });
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

  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', toggleMobileDrawer);
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-gold); flex-shrink:0;">
        <path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
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
        'Guide des Allergènes & Ingrédients Nobles',
        `
        <p><strong>Lait & Lactose :</strong> Nos thés au lait traditionnels sont préparés avec du lait frais de qualité supérieure. Nous proposons des alternatives 100% végétales en lait d'avoine barista bio ou lait de coco artisanal sans supplément.</p>
        <br />
        <p><strong>Perles de Tapioca Kokuto :</strong> Nos perles de tapioca sont façonnées à partir de fécule de manioc pure, mijotées dans du sucre noir d'Okinawa. Elles sont 100% véganes, sans gélatine et naturellement sans gluten.</p>
        <br />
        <p><strong>Perles Fruitées Explosives (Popping Boba) :</strong> Enrobées d'une membrane végétale fine à base d'algues marines (alginate de sodium). Zéro gélatine animale.</p>
        <br />
        <p><strong>Théine & Caféine :</strong> Nos grands crus de thés noir d'Assam, vert au jasmin de Nantou, oolong et matcha de cérémonie contiennent naturellement de la théine stimulante douce. Nos infusions florales (Hibiscus d'Atacora, Litchi Rose) sont naturellement sans théine.</p>
        `
      );
    });
  }

  if (btnOpenPrivacy) {
    btnOpenPrivacy.addEventListener('click', () => {
      openInfoModal(
        'Engagement de Confidentialité & Service Salon',
        `
        <p><strong>Boba Bloom Cotonou</strong> s'engage à protéger l'intimité et les données de ses hôtes. Votre numéro WhatsApp et vos coordonnées sont exclusivement utilisés pour orchestrer vos réservations de salon et acheminer vos commandes à Cotonou.</p>
        <br />
        <p>Aucune coordonnée bancaire n'est conservée. Vos préférences sont sécurisées localement dans votre session de navigation. Notre service conciergerie est disponible au Salon Haie Vive.</p>
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
      const vipModal = document.getElementById('vip-booking-modal');
      if (vipModal && vipModal.classList.contains('open')) {
        vipModal.classList.remove('open');
        document.body.style.overflow = '';
      }
      const tastingModal = document.getElementById('tasting-sheet-modal');
      if (tastingModal && tastingModal.classList.contains('open')) {
        tastingModal.classList.remove('open');
        document.body.style.overflow = '';
      }
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
        showToast('Bienvenue au Club Boba Bloom ! Votre privilège de -10% est activé.');
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
     BOBA SOMMELIER & TASTING SHEET MODAL
     ========================================================================== */
  const sommelierData = {
    fruity: {
      name: 'Cotonou Hibiscus Blossom',
      cat: 'Signature Exclusive Cotonou',
      price: '2 900 FCFA',
      numPrice: 2900,
      img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
      quote: '« Une création florale lumineuse célébrant la fleur d\'hibiscus locale de l\'Atacora, équilibrée par la rondeur du thé vert au jasmin et l\'éclat acidulé des perles de grenade explosives. »',
      terroir: 'Bissap Atacora & Jasmin Vert',
      aroma: 'Acidulé, Floral & Givré',
      pairing: 'Mochi Mangue Passion',
      sheet: {
        terroir: "Fleurs d'Hibiscus Sabdariffa (Atacora, Bénin) & Jasmin de Nantou",
        temp: "88°C • Infusion lente 5 min",
        caffeine: "Modéré (15mg / 100ml)",
        texture: "Légère, étincelante et désaltérante",
        top: "Baies sauvages, Grenade fraîche & Fleur de tiaré",
        heart: "Jasmin blanc infusé, Miel d'acacia subtil",
        finish: "Acidulée vive, fraîcheur minérale prolongée",
        pairing: "Mochi artisanal Mangue Passion ou Macaron à la Framboise"
      }
    },
    comfort: {
      name: 'Brown Sugar Bliss',
      cat: 'Thé au Lait Caramélisé',
      price: '3 000 FCFA',
      numPrice: 3000,
      img: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
      quote: '« Le réconfort absolu d\'un thé noir d\'Assam corsé enrobé d\'un sirop de sucre roux d\'Okinawa longuement réduit, accompagné de perles de tapioca servies chaudes et fondantes. »',
      terroir: 'Assam Royal 1ère Récolte & Sucre Noir',
      aroma: 'Caramel beurré, Cassonade & Boisé',
      pairing: 'Gaufre Dorée au Sucre Perlé',
      sheet: {
        terroir: "Feuilles entières d'Assam (Inde) & Cassonade Kokuto d'Okinawa",
        temp: "95°C • Décoction soutenue 6 min",
        caffeine: "Élevé (42mg / 100ml)",
        texture: "Crémeuse, chaleureuse et enveloppante",
        top: "Sucre caramélisé, Sirop d'érable fumé",
        heart: "Malt torréfié, Lait riche et velouté",
        finish: "Rondeur rémanente de mélasse noble",
        pairing: "Gaufre liégeoise croustillante ou Cookies pécan"
      }
    },
    matcha: {
      name: 'Ceremonial Matcha Bloom',
      cat: 'Grand Cru Japonais',
      price: '3 400 FCFA',
      numPrice: 3400,
      img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
      quote: '« Fouetté traditionnellement au chasen en bambou, ce matcha de cérémonie Grade A d\'Uji déploie une texture veloutée sur lit de lait d\'avoine bio, marié à la douceur d\'un miel sauvage. »',
      terroir: 'Uji (Kyoto) & Lait d\'Avoine Bio',
      aroma: 'Végétal noble, Umami & Cacao blanc',
      pairing: 'Mochi Matcha & Haricots Rouges',
      sheet: {
        terroir: "Tencha de première récolte ombragé 21 jours, Uji (Kyoto)",
        temp: "75°C • Fouetté au Chasen traditionnel",
        caffeine: "Tonique doux (30mg / 100ml)",
        texture: "Mousseuse, dense et soyeuse",
        top: "Chlorophylle fraîche, Herbe coupée, Amande",
        heart: "Notes umami intenses, Lait végétal soyeux",
        finish: "Amertume noble ultra-fine et persistante",
        pairing: "Mochi traditionnel au thé vert ou Financier pistache"
      }
    },
    gourmand: {
      name: 'Tiger Crème Brûlée Boba',
      cat: 'Haute Pâtisserie Liquide',
      price: '3 500 FCFA',
      numPrice: 3500,
      img: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=800&q=80',
      quote: '« Une interprétation haute couture du dessert français : crème anglaise onctueuse caramélisée au chalumeau à la minute, perles tièdes et lait soyeux parfumé à la vanille de Madagascar. »',
      terroir: 'Gousse Vanille Bourbon & Sucre de Canne',
      aroma: 'Crème brûlée croustillante & Vanille',
      pairing: 'Cheesecake Passion Vanille',
      sheet: {
        terroir: "Vanille Bourbon de Madagascar & Sucre roux de canne",
        temp: "Service tempéré / Chaud-Froid minute",
        caffeine: "Faible (10mg / 100ml)",
        texture: "Épaisse, gourmande et contrastée",
        top: "Caramel chaud craquant au chalumeau",
        heart: "Custard onctueux, Vanille intense",
        finish: "Perles tièdes fondantes au cœur",
        pairing: "Tartelette sablée aux noix de cajou de Parakou"
      }
    }
  };

  let currentSommelierKey = 'fruity';

  function updateSommelierUI(key) {
    const item = sommelierData[key];
    if (!item) return;
    currentSommelierKey = key;

    const img = document.getElementById('sommelier-img');
    const cat = document.getElementById('sommelier-cat');
    const name = document.getElementById('sommelier-name');
    const price = document.getElementById('sommelier-price');
    const quote = document.getElementById('sommelier-quote');
    const terroir = document.getElementById('sommelier-terroir');
    const aroma = document.getElementById('sommelier-aroma');
    const pairing = document.getElementById('sommelier-pairing');
    const card = document.getElementById('sommelier-card');

    if (card) {
      card.style.opacity = '0.7';
      card.style.transform = 'translateY(6px)';
      card.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
    }

    setTimeout(() => {
      if (img) img.src = item.img;
      if (cat) cat.textContent = item.cat;
      if (name) name.textContent = item.name;
      if (price) price.textContent = item.price;
      if (quote) quote.textContent = item.quote;
      if (terroir) terroir.textContent = item.terroir;
      if (aroma) aroma.textContent = item.aroma;
      if (pairing) pairing.textContent = item.pairing;

      if (card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    }, 150);
  }

  function initSommelier() {
    const chips = document.querySelectorAll('.sommelier-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => {
          c.classList.remove('active');
          c.setAttribute('aria-selected', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-selected', 'true');
        const mood = chip.getAttribute('data-mood');
        updateSommelierUI(mood);
      });
    });

    const btnAdd = document.getElementById('btn-sommelier-add');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        const item = sommelierData[currentSommelierKey];
        if (!item) return;
        addToCart({
          id: 'sommelier-' + currentSommelierKey + '-' + Date.now(),
          name: item.name,
          price: item.numPrice,
          image: item.img,
          specs: 'Accord Sommelier • Grand Cru 500ml',
          quantity: 1
        });
        showToast(`Ajouté au panier: ${item.name} (${item.price})`);
      });
    }

    // Tasting sheet modal
    const tastingModal = document.getElementById('tasting-sheet-modal');
    const btnSheet = document.getElementById('btn-sommelier-sheet');
    const btnCloseSheet = document.getElementById('tasting-sheet-close-btn');
    const btnCloseSheetBottom = document.getElementById('ts-btn-close');
    const btnOrderFromSheet = document.getElementById('ts-btn-order');

    function openTastingSheet(key) {
      const item = sommelierData[key] || sommelierData.fruity;
      const title = document.getElementById('tasting-sheet-title');
      const sub = document.getElementById('tasting-sheet-subtitle');
      const tsTerroir = document.getElementById('ts-terroir');
      const tsTemp = document.getElementById('ts-temp');
      const tsCaffeine = document.getElementById('ts-caffeine');
      const tsTexture = document.getElementById('ts-texture');
      const tsTop = document.getElementById('ts-top-notes');
      const tsHeart = document.getElementById('ts-heart-notes');
      const tsFinish = document.getElementById('ts-finish-notes');
      const tsPairing = document.getElementById('ts-pairing');

      if (title) title.textContent = item.name;
      if (sub) sub.textContent = item.cat + ' • ' + item.price;
      if (tsTerroir) tsTerroir.textContent = item.sheet.terroir;
      if (tsTemp) tsTemp.textContent = item.sheet.temp;
      if (tsCaffeine) tsCaffeine.textContent = item.sheet.caffeine;
      if (tsTexture) tsTexture.textContent = item.sheet.texture;
      if (tsTop) tsTop.textContent = item.sheet.top;
      if (tsHeart) tsHeart.textContent = item.sheet.heart;
      if (tsFinish) tsFinish.textContent = item.sheet.finish;
      if (tsPairing) tsPairing.textContent = item.sheet.pairing;

      if (tastingModal) {
        tastingModal.classList.add('open');
        tastingModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeTastingSheet() {
      if (tastingModal) {
        tastingModal.classList.remove('open');
        tastingModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }

    if (btnSheet) {
      btnSheet.addEventListener('click', () => openTastingSheet(currentSommelierKey));
    }
    if (btnCloseSheet) btnCloseSheet.addEventListener('click', closeTastingSheet);
    if (btnCloseSheetBottom) btnCloseSheetBottom.addEventListener('click', closeTastingSheet);
    if (tastingModal) {
      tastingModal.addEventListener('click', (e) => {
        if (e.target === tastingModal) closeTastingSheet();
      });
    }

    if (btnOrderFromSheet) {
      btnOrderFromSheet.addEventListener('click', () => {
        const item = sommelierData[currentSommelierKey];
        if (item) {
          addToCart({
            id: 'sommelier-' + currentSommelierKey + '-' + Date.now(),
            name: item.name,
            price: item.numPrice,
            image: item.img,
            specs: 'Accord Sommelier • Grand Cru 500ml',
            quantity: 1
          });
          showToast(`Ajouté au panier: ${item.name} (${item.price})`);
          closeTastingSheet();
        }
      });
    }
  }

  /* ==========================================================================
     VIP SALON PRIVILÈGE & TABLE BOOKING ENGINE
     ========================================================================== */
  function initVipBooking() {
    const vipModal = document.getElementById('vip-booking-modal');
    const btnCloseVip = document.getElementById('vip-modal-close-btn');
    const btnCloseSuccess = document.getElementById('btn-vip-success-close');
    const form = document.getElementById('vip-booking-form');
    const successView = document.getElementById('vip-booking-success');
    const dateInput = document.getElementById('vip-date');
    const btnWhatsappDirect = document.getElementById('vip-whatsapp-direct');

    // Set today as min date
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.value = today;
    }

    function openVipModal() {
      if (vipModal) {
        vipModal.classList.add('open');
        vipModal.setAttribute('aria-hidden', 'false');
        if (form) form.style.display = 'block';
        if (successView) successView.style.display = 'none';
        document.body.style.overflow = 'hidden';
      }
    }

    function closeVipModal() {
      if (vipModal) {
        vipModal.classList.remove('open');
        vipModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }

    // Connect all buttons requesting a table
    const bookingButtons = [
      document.getElementById('btn-nav-reserve'),
      document.getElementById('mobile-drawer-reserve'),
      document.getElementById('hero-cta-reserve'),
      document.getElementById('btn-open-vip-modal'),
      document.getElementById('final-cta-reserve-btn')
    ];

    bookingButtons.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          if (mobileDrawer && mobileDrawer.classList.contains('open')) {
            toggleMobileDrawer();
          }
          openVipModal();
        });
      }
    });

    if (btnCloseVip) btnCloseVip.addEventListener('click', closeVipModal);
    if (btnCloseSuccess) btnCloseSuccess.addEventListener('click', closeVipModal);
    if (vipModal) {
      vipModal.addEventListener('click', (e) => {
        if (e.target === vipModal) closeVipModal();
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('vip-name')?.value || '';
        const phone = document.getElementById('vip-phone')?.value || '';
        const guests = document.getElementById('vip-guests')?.value || '2';
        const date = document.getElementById('vip-date')?.value || '';
        const time = document.getElementById('vip-time')?.value || '';
        const experience = document.getElementById('vip-experience')?.selectedOptions[0]?.text || '';
        const notes = document.getElementById('vip-notes')?.value || '';

        const textMessage = `Bonjour Boba Bloom Cotonou ! Je souhaite confirmer ma réservation au Salon Privilège :%0A%0A` +
          `• Nom : ${encodeURIComponent(name)}%0A` +
          `• Téléphone : ${encodeURIComponent(phone)}%0A` +
          `• Convives : ${encodeURIComponent(guests)} pers.%0A` +
          `• Date & Heure : ${encodeURIComponent(date)} à ${encodeURIComponent(time)}%0A` +
          `• Expérience : ${encodeURIComponent(experience)}%0A` +
          (notes ? `• Demande particulière : ${encodeURIComponent(notes)}%0A` : '') +
          `%0AMerci de me confirmer la disponibilité !`;

        const waUrl = `https://wa.me/22997000000?text=${textMessage}`;

        if (btnWhatsappDirect) {
          btnWhatsappDirect.href = waUrl;
        }

        form.style.display = 'none';
        if (successView) successView.style.display = 'block';
        showToast('Demande de réservation reçue avec succès !');
      });
    }
  }

  // Initialize Sommelier and VIP booking
  initSommelier();
  initVipBooking();

  /* ==========================================================================
     3D FLAVOR CAROUSEL — LIQUID GLASS ORBITAL ROTATION ENGINE
     ========================================================================== */
  function init3DOrbitCarousel() {
    const carouselInner = document.getElementById('carousel-3d-inner');
    const bobaStage = document.getElementById('boba-3d-stage');
    const btnToggle = document.getElementById('btn-orbit-toggle');
    const btnReverse = document.getElementById('btn-orbit-reverse');
    const btnPrev = document.getElementById('btn-orbit-prev');
    const btnNext = document.getElementById('btn-orbit-next');
    const stagePrev = document.getElementById('stage-orbit-prev');
    const stageNext = document.getElementById('stage-orbit-next');
    const speedBtns = document.querySelectorAll('.orbit-speed-btn');
    const toggleText = document.getElementById('orbit-toggle-text');
    const iconPause = document.querySelector('.ctrl-icon-pause');
    const iconPlay = document.querySelector('.ctrl-icon-play');

    if (!carouselInner) return;

    // Rotation State Variables
    let rotationAngle = 0;
    let targetAngle = null;
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
    let touchStartX = 0;
    let touchStartY = 0;
    let touchAxisDetermined = false;
    let isHorizontalGesture = false;

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

    // Step navigation by 1 card (36 degrees)
    function stepOrbit(directionStep) {
      targetAngle = (targetAngle !== null ? targetAngle : rotationAngle) + (directionStep * 36);
      dragVelocity = 0;
    }

    // High-performance 60fps animation loop
    function tick() {
      if (!isDragging) {
        // Smooth interpolation towards targetAngle if stepping or centering a card
        if (targetAngle !== null) {
          const diff = targetAngle - rotationAngle;
          if (Math.abs(diff) > 0.05) {
            rotationAngle += diff * 0.14;
          } else {
            rotationAngle = targetAngle;
            targetAngle = null;
          }
        } else {
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
      }

      renderTransform();
      requestAnimationFrame(tick);
    }

    // Launch RAF loop
    requestAnimationFrame(tick);

    // Step navigation buttons
    if (btnPrev) btnPrev.addEventListener('click', () => stepOrbit(1));
    if (btnNext) btnNext.addEventListener('click', () => stepOrbit(-1));
    if (stagePrev) stagePrev.addEventListener('click', () => stepOrbit(1));
    if (stageNext) stageNext.addEventListener('click', () => stepOrbit(-1));

    // Play / Pause toggle
    if (btnToggle) {
      btnToggle.addEventListener('click', () => {
        isPaused = !isPaused;
        targetAngle = null;
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
        targetAngle = null;
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

      // Mouse Wheel / Trackpad 2-finger scrolling
      bobaStage.addEventListener('wheel', (e) => {
        const isHoriz = Math.abs(e.deltaX) > Math.abs(e.deltaY);
        if (isHoriz || e.shiftKey) {
          // Horizontal trackpad swipe or shift+wheel: direct scroll control
          e.preventDefault();
          targetAngle = null;
          const scrollDelta = isHoriz ? e.deltaX : e.deltaY;
          rotationAngle -= scrollDelta * 0.45;
        } else if (Math.abs(e.deltaY) > 0) {
          // Vertical wheel on stage: subtle rotational glide without trapping vertical page scroll
          targetAngle = null;
          dragVelocity -= Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY) * 0.035, 2.5);
        }
      }, { passive: false });

      // Keyboard arrow navigation when hovering over the carousel
      window.addEventListener('keydown', (e) => {
        if (!isHovered) return;
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          stepOrbit(1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          stepOrbit(-1);
        }
      });
    }

    // Mouse Pointer down for dragging
    function onMouseDown(e) {
      if (e.target.closest('button')) return;
      isDragging = true;
      targetAngle = null;
      totalDragMovement = 0;
      lastDragX = e.pageX;
      lastDragTime = performance.now();
      dragVelocity = 0;
    }

    function onMouseMove(e) {
      if (!isDragging) return;
      const clientX = e.pageX;
      const diffX = clientX - lastDragX;
      totalDragMovement += Math.abs(diffX);

      const now = performance.now();
      const dt = now - lastDragTime || 16;
      dragVelocity = (diffX / dt) * 16 * 0.35;

      rotationAngle += diffX * 0.35;
      lastDragX = clientX;
      lastDragTime = now;
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      touchAxisDetermined = false;
      if (Math.abs(dragVelocity) > 6) {
        dragVelocity = Math.sign(dragVelocity) * 6;
      }
    }

    // Touch events with intelligent Axis Locking (never blocks vertical page scrolling)
    function onTouchStart(e) {
      if (e.target.closest('button')) return;
      if (!e.touches || e.touches.length === 0) return;

      isDragging = true;
      targetAngle = null;
      totalDragMovement = 0;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      lastDragX = touchStartX;
      lastDragTime = performance.now();
      dragVelocity = 0;
      touchAxisDetermined = false;
      isHorizontalGesture = false;
    }

    function onTouchMove(e) {
      if (!isDragging || !e.touches || e.touches.length === 0) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = currentX - lastDragX;
      const totalDiffX = currentX - touchStartX;
      const totalDiffY = currentY - touchStartY;

      // Determine if user wants to scroll page (vertical) or spin carousel (horizontal)
      if (!touchAxisDetermined) {
        if (Math.abs(totalDiffY) > 8 && Math.abs(totalDiffY) > Math.abs(totalDiffX)) {
          // Vertical swipe: release drag so browser scrolls the page smoothly!
          isDragging = false;
          touchAxisDetermined = true;
          isHorizontalGesture = false;
          return;
        } else if (Math.abs(totalDiffX) > 8) {
          touchAxisDetermined = true;
          isHorizontalGesture = true;
        }
      }

      if (isHorizontalGesture) {
        totalDragMovement += Math.abs(diffX);
        const now = performance.now();
        const dt = now - lastDragTime || 16;
        dragVelocity = (diffX / dt) * 16 * 0.35;

        rotationAngle += diffX * 0.35;
        lastDragX = currentX;
        lastDragTime = now;
      }
    }

    if (bobaStage) {
      bobaStage.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onPointerUp);

      bobaStage.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onPointerUp);
    }

    // Card interactions: Click card to bring to front and center, or click "Ajouter" to order
    const cards = carouselInner.querySelectorAll('.card');
    cards.forEach(card => {
      const name = card.getAttribute('data-name');
      const price = parseInt(card.getAttribute('data-price'), 10);
      const img = card.getAttribute('data-img');
      const btn = card.querySelector('.card-drink-btn');
      const cardIndex = parseInt(card.style.getPropertyValue('--index'), 10) || 0;

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
        // Only trigger if user tapped/clicked without a swipe gesture
        if (totalDragMovement < 8 && !e.target.closest('.card-drink-btn')) {
          // Bring this card smoothly to front facing the user!
          const cardAngle = cardIndex * 36;
          // Target angle brings the card to 0deg facing front
          const nearestBase = Math.round((rotationAngle + cardAngle) / 360) * 360;
          targetAngle = nearestBase - cardAngle;
          dragVelocity = 0;
          showToast(`Défilé vers: ${name}`);
        }
      });
    });
  }

  // Initialize 3D Orbit Carousel
  init3DOrbitCarousel();
}

// Ensure execution whether loaded as deferred, module, or async
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBobaBloom);
} else {
  initBobaBloom();
}
