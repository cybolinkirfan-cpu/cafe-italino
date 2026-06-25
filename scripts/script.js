/**
 * Cafe Italino Restaurant Website Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // GSAP SCROLLTRIGGER & LENIS SMOOTH SCROLL INITIALIZATION
    // ==========================================================================
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // ==========================================================================
    // STICKY NAVBAR & SCROLL SPY (INTEGRATED WITH LENIS SCROLL)
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    // ==========================================================================
    // MOBILE NAVIGATION DRAWER
    // ==========================================================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMobileMenu = () => {
        hamburgerBtn.classList.toggle('open');
        navMenu.classList.toggle('active');
    };

    const closeMobileMenu = () => {
        hamburgerBtn.classList.remove('open');
        navMenu.classList.remove('active');
    };

    hamburgerBtn.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !hamburgerBtn.contains(e.target) && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    lenis.on('scroll', (e) => {
        // Sticky Header Transition
        if (e.scroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Spy tracking
        const scrollPosition = e.scroll + 120; // offset for sticky header
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Intercept clicks on links for Lenis smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                lenis.scrollTo(targetEl, {
                    offset: -80, // offset for sticky header
                    duration: 1.2
                });
            }
        });
    });

    // ==========================================================================
    // GSAP SCROLL ANIMATIONS
    // ==========================================================================
    // Hero Elements on Load + Pillars of Our Craft Stagger
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    heroTl.fromTo('.hero-subtitle', { opacity: 0, y: -20 }, { opacity: 1, y: 0, delay: 0.2 })
        .fromTo('.hero-title', { opacity: 0, y: 35 }, { opacity: 1, y: 0 }, '-=0.7')
        .fromTo('.hero-tagline', { opacity: 0 }, { opacity: 1 }, '-=0.6')
        .fromTo('.hero-actions .btn', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.15 }, '-=0.6')
        .fromTo('.feature-card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.4 }, '-=0.4');

    // Menu Section Header & Tabs
    gsap.fromTo('.menu-section .section-header',
        { opacity: 0, y: 30 },
        {
            scrollTrigger: {
                trigger: '.menu-section',
                start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }
    );

    gsap.fromTo('.menu-tabs',
        { opacity: 0, y: 20 },
        {
            scrollTrigger: {
                trigger: '.menu-section',
                start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }
    );

    gsap.fromTo('.menu-type-filters',
        { opacity: 0, y: 15 },
        {
            scrollTrigger: {
                trigger: '.menu-section',
                start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }
    );

    gsap.fromTo('.menu-grid .menu-card',
        { opacity: 0, y: 40 },
        {
            scrollTrigger: {
                trigger: '.menu-section',
                start: 'top 75%',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out'
        }
    );

    // About Section Split Screen Scroll animations
    gsap.fromTo('.about-story-inner > *',
        { opacity: 0, x: -40 },
        {
            scrollTrigger: {
                trigger: '.about-story',
                start: 'top 75%',
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
        }
    );

    gsap.fromTo('.special-card',
        { opacity: 0, x: 40 },
        {
            scrollTrigger: {
                trigger: '.chef-special-highlight',
                start: 'top 75%',
            },
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power2.out'
        }
    );

    // Table Reservation Container
    gsap.fromTo('.reservation-form-container',
        { opacity: 0, scale: 0.96, y: 30 },
        {
            scrollTrigger: {
                trigger: '.reservation-section',
                start: 'top 70%',
            },
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
        }
    );

    // Opening Hours Box
    gsap.fromTo('.opening-hours-box',
        { opacity: 0, y: 40 },
        {
            scrollTrigger: {
                trigger: '.opening-hours-box',
                start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }
    );

    // Footer Columns Stagger
    gsap.fromTo('.footer-box',
        { opacity: 0, y: 30 },
        {
            scrollTrigger: {
                trigger: '.footer-grid',
                start: 'top 90%',
            },
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out'
        }
    );

    // ==========================================================================
    // CHEF'S CHOICE — HORIZONTAL SCROLL ANIMATION
    // ==========================================================================
    const chefsTrack = document.getElementById('chefsChoiceTrack');
    const chefsCards = document.querySelectorAll('.chefs-card');
    const chefsProgressFill = document.getElementById('chefsProgressFill');

    if (chefsTrack && chefsCards.length) {
        const numCards = chefsCards.length;

        // Helper function to calculate and set card positions based on scroll progress (0 to 1)
        const updateCarousel = (progress) => {
            // Virtual index of the center card
            const currentIndex = progress * (numCards - 1);

            chefsCards.forEach((card, i) => {
                const offset = i - currentIndex;
                const absOffset = Math.abs(offset);

                // Card positioning logic
                // Center card (offset 0) is scaled 1, x 0
                // Side cards spread out, scale down, and curve backwards (rotationY)
                const xOffset = offset * 260; // Spread distance
                const scale = Math.max(0.6, 1 - absOffset * 0.15);
                const opacity = Math.max(0, 1 - absOffset * 0.45);
                const rotationY = offset * -20; // 3D inward curve
                const zIndex = 100 - Math.round(absOffset * 10);

                gsap.set(card, {
                    x: xOffset,
                    scale: scale,
                    rotationY: rotationY,
                    opacity: opacity,
                    zIndex: zIndex
                });

                // Toggle active class for glow styling on the front-most card
                if (absOffset < 0.5) {
                    card.classList.add('active-card');
                } else {
                    card.classList.remove('active-card');
                }
            });
        };

        // Initialize carousel positions at progress 0
        updateCarousel(0);

        // --- STEP 1: Entrance animation — fade in track and pop cards up ---
        const introTL = gsap.timeline({
            scrollTrigger: {
                trigger: '.chefs-choice-section',
                start: 'top 75%',
                toggleActions: 'play none none none',
            }
        });

        introTL.fromTo(chefsTrack,
            { opacity: 0 },
            { opacity: 1, duration: 0.4 }
        ).from(chefsCards, {
            y: 100,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.2)',
            clearProps: 'y' // clean up inline y after animation
        }, "-=0.2");

        // --- STEP 2: Curved 3D scrub tied to scroll ---
        ScrollTrigger.create({
            trigger: '.chefs-choice-section',
            start: 'top top',
            end: '+=2000', // 2000px scroll distance provides a smooth scrubbing experience
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
                updateCarousel(self.progress);

                // Update the bottom progress bar
                if (chefsProgressFill) {
                    chefsProgressFill.style.width = (self.progress * 100) + '%';
                }
            },
        });
    }


    // Refresh ScrollTrigger calculations initially and on window load
    ScrollTrigger.refresh();

    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    // Fallback delayed refresh for asynchronous asset expansion
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 600);


    // ==========================================================================
    // DYNAMIC MENU FILTERING (DOUBLE FILTERS: CATEGORY & VEG/NON-VEG CHECKBOXES)
    // ==========================================================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const vegCheckbox = document.getElementById('vegCheckbox');
    const nonVegCheckbox = document.getElementById('nonVegCheckbox');
    const noItemsMessage = document.getElementById('noItemsMessage');
    const menuCards = document.querySelectorAll('.menu-card');

    let activeCategory = 'all';

    const filterMenu = () => {
        const isVegChecked = vegCheckbox ? vegCheckbox.checked : false;
        const isNonVegChecked = nonVegCheckbox ? nonVegCheckbox.checked : false;
        let visibleCount = 0;

        menuCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const type = card.getAttribute('data-type'); // 'veg' or 'non-veg'

            const matchesCategory = (activeCategory === 'all' || category === activeCategory);

            let matchesType = true;
            if (isVegChecked && !isNonVegChecked) {
                matchesType = (type === 'veg');
            } else if (!isVegChecked && isNonVegChecked) {
                matchesType = (type === 'non-veg');
            }
            // If both are checked or neither is checked, show all.

            if (matchesCategory && matchesType) {
                // Show item with transition
                card.classList.remove('hidden');
                visibleCount++;
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                // Hide item
                card.classList.add('hidden');
            }
        });

        if (noItemsMessage) {
            if (visibleCount === 0) {
                noItemsMessage.style.display = 'flex';
            } else {
                noItemsMessage.style.display = 'none';
            }
        }

        // Refresh ScrollTrigger since layout height changed
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 300);
    };

    // Category Tabs click listener
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            activeCategory = button.getAttribute('data-filter');
            filterMenu();
        });
    });

    // Checkbox state change listeners
    if (vegCheckbox) {
        vegCheckbox.addEventListener('change', filterMenu);
    }
    if (nonVegCheckbox) {
        nonVegCheckbox.addEventListener('change', filterMenu);
    }


    // ==========================================================================
    // STATEFUL CART SYSTEM
    // ==========================================================================
    let cart = [];

    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const navCartBtn = document.getElementById('navCartBtn');
    const floatingCartBtn = document.getElementById('floatingCartBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartShopBtn = document.getElementById('cartShopBtn');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTax = document.getElementById('cartTax');
    const cartTotal = document.getElementById('cartTotal');
    const cartBadgeNavbar = document.getElementById('cartBadgeNavbar');
    const cartBadgeFloating = document.getElementById('cartBadgeFloating');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Sidebar Toggles
    const openCart = () => {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
    };

    const closeCart = () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    };

    navCartBtn.addEventListener('click', openCart);
    floatingCartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    if (cartShopBtn) {
        cartShopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeCart();
            lenis.scrollTo('#menu', { offset: -80, duration: 1.2 });
        });
    }

    // Add To Cart logic
    const addToCart = (id, name, price, image) => {
        const parsedPrice = parseFloat(price);
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price: parsedPrice,
                image,
                quantity: 1
            });
        }

        showToast(`<i class="fa-solid fa-circle-check"></i> Added ${name} to order!`);
        renderCart();
    };

    // Remove from cart logic
    const removeFromCart = (id) => {
        const itemIndex = cart.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            const itemName = cart[itemIndex].name;
            cart.splice(itemIndex, 1);
            showToast(`<i class="fa-solid fa-trash-can"></i> Removed ${itemName} from order`);
            renderCart();
        }
    };

    // Update Item Quantity logic
    const updateQuantity = (id, amount) => {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += amount;
            if (item.quantity <= 0) {
                removeFromCart(id);
            } else {
                renderCart();
            }
        }
    };

    // Re-render Cart Drawer
    const renderCart = () => {
        // Clear items list container
        cartItemsContainer.innerHTML = '';

        // Calculate counts
        let totalCount = 0;
        let subtotal = 0;

        cart.forEach(item => {
            totalCount += item.quantity;
            subtotal += item.price * item.quantity;
        });

        // Update Badges
        cartBadgeNavbar.textContent = totalCount;
        cartBadgeFloating.textContent = totalCount;

        if (cart.length === 0) {
            // Render empty cart layout
            cartItemsContainer.innerHTML = `
                <div class="empty-cart-message">
                    <i class="fa-solid fa-basket-shopping"></i>
                    <p>Your order is currently empty.</p>
                    <a href="#menu" class="btn btn-outline" id="cartShopBtnInner">Explore Menu</a>
                </div>
            `;

            // Add click listener inside empty screen
            document.getElementById('cartShopBtnInner').addEventListener('click', (e) => {
                e.preventDefault();
                closeCart();
                lenis.scrollTo('#menu', { offset: -80, duration: 1.2 });
            });

            // Set values to 0
            cartSubtotal.textContent = '$0.00';
            cartTax.textContent = '$0.00';
            cartTotal.textContent = '$0.00';
            checkoutBtn.disabled = true;
            return;
        }

        checkoutBtn.disabled = false;

        // Render populated list
        cart.forEach(item => {
            const itemHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <div class="cart-item-title-price">
                            <h4>${item.name}</h4>
                            <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <div class="cart-item-controls">
                            <div class="quantity-controller">
                                <button class="qty-btn dec-qty" data-id="${item.id}">-</button>
                                <span class="qty-val">${item.quantity}</span>
                                <button class="qty-btn inc-qty" data-id="${item.id}">+</button>
                            </div>
                            <button class="remove-item-btn" data-id="${item.id}" aria-label="Remove item">
                                <i class="fa-regular fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
        });

        // Wire event listeners for dynamically added controls
        document.querySelectorAll('.dec-qty').forEach(btn => {
            btn.addEventListener('click', () => {
                updateQuantity(btn.getAttribute('data-id'), -1);
            });
        });

        document.querySelectorAll('.inc-qty').forEach(btn => {
            btn.addEventListener('click', () => {
                updateQuantity(btn.getAttribute('data-id'), 1);
            });
        });

        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                removeFromCart(btn.getAttribute('data-id'));
            });
        });

        // Calculate and Render Totals (10% Tax)
        const taxRate = 0.10;
        const taxAmount = subtotal * taxRate;
        const totalAmount = subtotal + taxAmount;

        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        cartTax.textContent = `$${taxAmount.toFixed(2)}`;
        cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
    };

    // Event Delegation / Select for Add to Order button clicks
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const name = btn.getAttribute('data-name');
            const price = btn.getAttribute('data-price');
            const image = btn.getAttribute('data-image');
            addToCart(id, name, price, image);
        });
    });

    // Checkout Order logic
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('<i class="fa-solid fa-triangle-exclamation"></i> Your order is empty!');
            return;
        }

        showToast('<i class="fa-solid fa-kitchen-set"></i> Order placed! Chef is preparing your dishes.');
        cart = [];
        renderCart();
        setTimeout(closeCart, 1000);
    });


    // ==========================================================================
    // TOAST NOTIFICATIONS
    // ==========================================================================
    const toastContainer = document.getElementById('toastContainer');

    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fa-solid fa-bell-concierge"></i>
            </div>
            <div class="toast-body">${message}</div>
        `;

        toastContainer.appendChild(toast);

        // Slide out and remove toast after 3 seconds
        setTimeout(() => {
            toast.classList.add('removing');
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 2500);
    };


    // ==========================================================================
    // INTERACTIVE RESERVATION FORM VALIDATION
    // ==========================================================================
    const reservationForm = document.getElementById('reservationForm');

    // Modals references
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalOkBtn = document.getElementById('modalOkBtn');

    // Summary placeholders inside modal
    const summaryName = document.getElementById('summaryName');
    const summaryDate = document.getElementById('summaryDate');
    const summaryTime = document.getElementById('summaryTime');
    const summaryGuests = document.getElementById('summaryGuests');

    // Validation Regex Helper
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidPhone = (phone) => {
        // Clean special characters and count digits
        const digits = phone.replace(/\D/g, '');
        return digits.length >= 7 && digits.length <= 15;
    };

    // Function to set default date to today
    const setMinReservationDate = () => {
        const dateInput = document.getElementById('reserveDate');
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
    };

    setMinReservationDate();

    // Form Submit Listener
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Inputs
        const nameInput = document.getElementById('guestName');
        const emailInput = document.getElementById('guestEmail');
        const phoneInput = document.getElementById('guestPhone');
        const guestsSelect = document.getElementById('guestCount');
        const dateInput = document.getElementById('reserveDate');
        const timeSelect = document.getElementById('reserveTime');

        let isValid = true;

        // 1. Name Validation
        if (!nameInput.value.trim()) {
            nameInput.closest('.form-group').classList.add('error');
            isValid = false;
        } else {
            nameInput.closest('.form-group').classList.remove('error');
        }

        // 2. Email Validation
        if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
            emailInput.closest('.form-group').classList.add('error');
            isValid = false;
        } else {
            emailInput.closest('.form-group').classList.remove('error');
        }

        // 3. Phone Validation
        if (!phoneInput.value.trim() || !isValidPhone(phoneInput.value.trim())) {
            phoneInput.closest('.form-group').classList.add('error');
            isValid = false;
        } else {
            phoneInput.closest('.form-group').classList.remove('error');
        }

        // 4. Guests Validation
        if (!guestsSelect.value) {
            guestsSelect.closest('.form-group').classList.add('error');
            isValid = false;
        } else {
            guestsSelect.closest('.form-group').classList.remove('error');
        }

        // 5. Date Validation (Check if in the past)
        if (!dateInput.value) {
            dateInput.closest('.form-group').classList.add('error');
            isValid = false;
        } else {
            const selectedDate = new Date(dateInput.value);
            selectedDate.setHours(0, 0, 0, 0);
            const todayDate = new Date();
            todayDate.setHours(0, 0, 0, 0);

            if (selectedDate < todayDate) {
                dateInput.closest('.form-group').classList.add('error');
                isValid = false;
            } else {
                dateInput.closest('.form-group').classList.remove('error');
            }
        }

        // 6. Time Validation
        if (!timeSelect.value) {
            timeSelect.closest('.form-group').classList.add('error');
            isValid = false;
        } else {
            timeSelect.closest('.form-group').classList.remove('error');
        }

        // Action on Valid Form
        if (isValid) {
            // Retrieve formatting
            const guestName = nameInput.value.trim();
            const rawDate = new Date(dateInput.value);

            // Format date beautifully (e.g. Thursday, Jun 25, 2026)
            const formattedDate = rawDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                timeZone: 'UTC' // keep the day matching input without timezone shifts
            });

            const guestCountVal = guestsSelect.options[guestsSelect.selectedIndex].text;
            const timeSlotVal = timeSelect.value;

            // Fill Modal elements
            summaryName.textContent = guestName;
            summaryDate.textContent = formattedDate;
            summaryTime.textContent = timeSlotVal;
            summaryGuests.textContent = guestCountVal;

            // Trigger Modal Opening
            successModal.classList.add('active');

            // Reset Form Fields
            reservationForm.reset();
            setMinReservationDate();
        }
    });

    // Close Modal actions
    const closeModal = () => {
        successModal.classList.remove('active');
    };

    closeModalBtn.addEventListener('click', closeModal);
    modalOkBtn.addEventListener('click', closeModal);

    // Close modal when clicking on overlay background
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            closeModal();
        }
    });

});
