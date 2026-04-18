// Andersen's HVACR LLC — Site JavaScript
// ADA-compliant, lightweight, no dependencies
// IMPORTANT: Business config below — change here to pivot services/areas

(function () {
    'use strict';

    // =========================================================
    // BUSINESS CONFIG — Edit this to pivot the business focus
    // =========================================================
    var CONFIG = {
        name: "Andersen's HVACR LLC",
        owner: "Max Andersen",
        phone: "(816) 308-8796",
        phoneRaw: "8163088796",
        email: "e.andersen916@gmail.com",
        tagline: "Commercial Kitchen & HVAC Service",
        baseZip: "64113",
        radiusMiles: 20,

        // Services — add, remove, or modify to pivot
        services: [
            {
                id: "hvac",
                title: "Commercial HVAC",
                shortDesc: "Heating, cooling, ventilation, and exhaust systems for restaurants and commercial kitchens.",
                icon: "thermostat",
                items: [
                    "Rooftop unit installation & repair",
                    "Kitchen exhaust & ventilation systems",
                    "Make-up air units",
                    "Commercial heating systems",
                    "AC repair & maintenance",
                    "Preventive maintenance plans"
                ]
            },
            {
                id: "refrigeration",
                title: "Commercial Refrigeration",
                shortDesc: "Walk-ins, reach-ins, ice machines — keeping your inventory safe and your kitchen running.",
                icon: "ac_unit",
                items: [
                    "Walk-in cooler & freezer repair",
                    "Reach-in refrigerator service",
                    "Ice machine repair & maintenance",
                    "Refrigerated prep tables",
                    "Display coolers & merchandisers",
                    "Temperature monitoring solutions"
                ]
            },
            {
                id: "cooking",
                title: "Commercial Cooking Equipment",
                shortDesc: "Fryers, ovens, grills, steamers — we fix the equipment your kitchen depends on.",
                icon: "local_fire_department",
                items: [
                    "Commercial fryer repair",
                    "Convection & conveyor oven service",
                    "Range & grill maintenance",
                    "Steamer & combi oven repair",
                    "Commercial dishwasher service",
                    "Gas line & connection work"
                ]
            }
        ],

        // Service areas — add or remove to change coverage
        areas: [
            { name: "Waldo", type: "neighborhood" },
            { name: "Brookside", type: "neighborhood" },
            { name: "Country Club Plaza", type: "neighborhood" },
            { name: "Westport", type: "neighborhood" },
            { name: "Midtown KC", type: "neighborhood" },
            { name: "South KC", type: "neighborhood" },
            { name: "Overland Park", type: "city" },
            { name: "Leawood", type: "city" },
            { name: "Prairie Village", type: "city" },
            { name: "Olathe", type: "city" },
            { name: "Lenexa", type: "city" },
            { name: "Shawnee", type: "city" },
            { name: "Lee's Summit", type: "city" },
            { name: "Grandview", type: "city" },
            { name: "Raymore", type: "city" },
            { name: "Belton", type: "city" }
        ],

        // Equipment types for contact form dropdown
        equipmentTypes: [
            "HVAC / Heating / Cooling",
            "Walk-in Cooler or Freezer",
            "Reach-in Refrigeration",
            "Ice Machine",
            "Commercial Oven / Range",
            "Fryer",
            "Dishwasher",
            "Steamer / Combi Oven",
            "Exhaust / Ventilation",
            "Other"
        ]
    };

    // Make config accessible globally for debugging/integration
    window.ANDERSEN_CONFIG = CONFIG;

    // =========================================================
    // Populate dynamic elements from config
    // =========================================================
    function populateFromConfig() {
        // Phone links
        document.querySelectorAll('[data-config="phone"]').forEach(function (el) {
            el.textContent = CONFIG.phone;
        });
        document.querySelectorAll('[data-config="phone-link"]').forEach(function (el) {
            el.href = 'tel:' + CONFIG.phoneRaw;
            if (!el.querySelector('[data-config="phone"]')) {
                el.textContent = CONFIG.phone;
            }
        });

        // Business name
        document.querySelectorAll('[data-config="name"]').forEach(function (el) {
            el.textContent = CONFIG.name;
        });

        // Owner name
        document.querySelectorAll('[data-config="owner"]').forEach(function (el) {
            el.textContent = CONFIG.owner;
        });

        // Copyright year
        document.querySelectorAll('[data-config="year"]').forEach(function (el) {
            el.textContent = new Date().getFullYear();
        });

        // Service area radius
        document.querySelectorAll('[data-config="radius"]').forEach(function (el) {
            el.textContent = CONFIG.radiusMiles;
        });

        // Populate equipment type dropdowns
        document.querySelectorAll('[data-config="equipment-select"]').forEach(function (select) {
            CONFIG.equipmentTypes.forEach(function (type) {
                var option = document.createElement('option');
                option.value = type;
                option.textContent = type;
                select.appendChild(option);
            });
        });

        // Populate area grids
        document.querySelectorAll('[data-config="area-grid"]').forEach(function (grid) {
            CONFIG.areas.forEach(function (area) {
                var tag = document.createElement('div');
                tag.className = 'area-tag';
                tag.textContent = area.name;
                grid.appendChild(tag);
            });
        });
    }

    // =========================================================
    // Mobile menu toggle
    // =========================================================
    function initMobileMenu() {
        var toggle = document.querySelector('.menu-toggle');
        var navMenu = document.getElementById('nav-menu');

        if (!toggle || !navMenu) return;

        toggle.addEventListener('click', function () {
            var expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            navMenu.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                toggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('open');
            });
        });

        // Close menu on Escape key (ADA)
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                toggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('open');
                toggle.focus();
            }
        });
    }

    // =========================================================
    // Smooth scroll for anchor links
    // =========================================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var href = this.getAttribute('href');
                if (href === '#') return;
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                    target.setAttribute('tabindex', '-1');
                    target.focus({ preventScroll: true });
                }
            });
        });
    }

    // =========================================================
    // Form validation with accessible error messages
    // =========================================================
    function initFormValidation() {
        var forms = document.querySelectorAll('.contact-form');
        forms.forEach(function (form) {
            form.addEventListener('submit', function (e) {
                var valid = true;

                // Clear previous errors
                form.querySelectorAll('.error-msg').forEach(function (el) { el.remove(); });
                form.querySelectorAll('[aria-invalid]').forEach(function (el) { el.removeAttribute('aria-invalid'); });

                // Check required fields
                form.querySelectorAll('[required]').forEach(function (input) {
                    if (!input.value.trim()) {
                        valid = false;
                        showError(input, 'This field is required.');
                    }
                });

                // Email format check
                var emailInput = form.querySelector('#email');
                if (emailInput && emailInput.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                    valid = false;
                    showError(emailInput, 'Please enter a valid email address.');
                }

                // Phone format check (optional but validate if filled)
                var phoneInput = form.querySelector('#phone');
                if (phoneInput && phoneInput.value.trim()) {
                    var digits = phoneInput.value.replace(/\D/g, '');
                    if (digits.length < 10) {
                        valid = false;
                        showError(phoneInput, 'Please enter a valid phone number.');
                    }
                }

                if (!valid) {
                    e.preventDefault();
                    var firstInvalid = form.querySelector('[aria-invalid="true"]');
                    if (firstInvalid) firstInvalid.focus();
                    return;
                }

                // If endpoint is configured, try posting to it first.
                // Fall back to native mailto submission if the endpoint is missing or errors.
                var endpoint = form.getAttribute('data-endpoint');
                if (endpoint) {
                    e.preventDefault();
                    submitViaEndpoint(form, endpoint);
                }
            });
        });
    }

    function submitViaEndpoint(form, endpoint) {
        var btn = form.querySelector('button[type="submit"]');
        var original = btn ? btn.textContent : '';
        if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }

        // Gather fields
        var payload = {
            client: form.getAttribute('data-client') || 'unknown',
            to:     form.getAttribute('data-to') || '',
            cc:     form.getAttribute('data-cc') || '',
            fields: {}
        };
        Array.prototype.forEach.call(form.querySelectorAll('input, select, textarea'), function (el) {
            if (!el.name) return;
            payload.fields[el.name] = el.value;
        });

        var controller = new AbortController();
        var timeoutId = setTimeout(function () { controller.abort(); }, 8000);

        fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: controller.signal
        })
        .then(function (res) {
            clearTimeout(timeoutId);
            if (!res.ok) throw new Error('Endpoint returned ' + res.status);
            return res.json().catch(function () { return {}; });
        })
        .then(function () {
            showFormSuccess(form, "Thanks - message sent. Max will reach out shortly. For urgent issues, call (816) 308-8796.");
            form.reset();
            if (btn) { btn.disabled = false; btn.textContent = original; }
        })
        .catch(function () {
            // Endpoint unreachable or errored. Fall back to native mailto submit.
            if (btn) { btn.disabled = false; btn.textContent = original; }
            form.submit();
        });
    }

    function showFormSuccess(form, message) {
        var existing = form.querySelector('.form-success');
        if (existing) existing.remove();
        var note = document.createElement('div');
        note.className = 'form-success';
        note.setAttribute('role', 'status');
        note.style.cssText = 'background:#e8f5e9;border:1px solid #3A7D44;color:#1f2937;border-radius:8px;padding:1rem 1.25rem;margin-top:1rem;';
        note.textContent = message;
        form.appendChild(note);
    }

    function showError(input, message) {
        input.setAttribute('aria-invalid', 'true');
        var error = document.createElement('span');
        error.className = 'error-msg';
        error.setAttribute('role', 'alert');
        error.textContent = message;
        input.parentNode.appendChild(error);
    }

    // =========================================================
    // Active nav link highlighting
    // =========================================================
    function initActiveNav() {
        var path = window.location.pathname;
        var page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
        document.querySelectorAll('.nav-links a').forEach(function (link) {
            var href = link.getAttribute('href');
            if (href === page || (page === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // =========================================================
    // Initialize everything
    // =========================================================
    populateFromConfig();
    initMobileMenu();
    initSmoothScroll();
    initFormValidation();
    initActiveNav();

})();
