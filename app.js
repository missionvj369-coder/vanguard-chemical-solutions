/* ============================================================================
   VANGUARD CHEMICAL SOLUTIONS LLP — application.js
   Header · Mobile nav · 3D hero scene · Scroll UI · Catalogue · Quote form
   Product catalogue data lives in products-data.js (verified 66 entries).
   ========================================================================== */
(function () {
  'use strict';

  var REDUCED = false;
  try { REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };
  function KZ(k, el) { if (el) el.classList.remove(k); }
  function AD(k, el) { if (el) el.classList.add(k); }

  /* ---------- DIVISIONS (verified business lines) ---------- */
  var DIVISIONS = [
    { key: 'spec', name: 'Speciality Chemicals', kicker: 'Food-grade · Chelators · USP actives',
      blurb: 'Application-specific chemistry backed by complete COA / MSDS documentation on every lot.' },
    { key: 'ind', name: 'Industrial Chemicals', kicker: 'Alkalis · Acids · Solvents · Nutrients',
      blurb: 'Backbone industrial chemistry with lab-verified assay on every consignment.' },
    { key: 'con', name: 'Construction Chemicals', kicker: 'Admixtures · Waterproofing · Flooring',
      blurb: 'Built for RMC plants, precasters and contractors.' },
    { key: 'hc', name: 'Healthcare Chemicals', kicker: 'Pharma solvents · Disinfectants',
      blurb: 'Pharmacopeia-grade hygiene and clinical chemistry.' },
    { key: 'cln', name: 'Cleaning Chemicals', kicker: 'Surfactants · Institutional formulations',
      blurb: 'Ready-to-dilute systems for hospitality, facility services and industry.' },
    { key: 'og', name: 'Oil & Gas Chemicals', kicker: 'Drilling fluids · Production chemistry',
      blurb: 'API-spec drilling and production chemistry for oilfield programs.' },
    { key: 'mar', name: 'Marine Chemicals', kicker: 'Tank cleaning · Boiler treatment',
      blurb: 'Ship maintenance chemistry for tankers, bulkers and offshore fleets.' }
  ];
  var DIV_NAME = {};
  DIVISIONS.forEach(function (d) { DIV_NAME[d.key] = d.name; });

  var SALES_MAIL = 'sales@vanguardchemicals.in';
  function mailto(subject, body) {
    return 'mailto:' + SALES_MAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body || '');
  }

  /* ---------- Cross-browser scroll utilities ---------- */
  var scrollY = function () { return window.scrollY || window.pageYOffset || 0; };
  var scrollTo = function (y, behavior) {
    if (behavior === 'smooth' && window.scrollTo && window.scrollTo.bind) {
      try { window.scrollTo({ top: y, behavior: 'smooth' }); return; } catch (e) {}
    }
    window.scrollTo(0, y);
  };
  var getHeaderHeight = function () { return document.querySelector('.site-header') ? document.querySelector('.site-header').offsetHeight || 72 : 72; };

  /* ---------- PRODUCT DATA: loaded from products-data.js when available ---------- */
  function getProducts() {
    if (window.VC_PRODUCTS && window.VC_PRODUCTS.length) return window.VC_PRODUCTS;
    var fallback = [
      { id: 'f1', cat: 'ind', name: 'Caustic Soda Flakes', grade: 'Industrial 99%', app: 'Sodium hydroxide for soap, textiles, paper, alumina.', specs: ['NaOH 99%', 'Flakes', '25/50kg'], div: 'ind' },
      { id: 'f2', cat: 'spec', name: 'Sodium Metabisulphite', grade: 'Technical 97%', app: 'Dechlorination, preservation and reduction processes.', specs: ['97%', 'Powder', '25kg'], div: 'spec' }
    ];
    return fallback;
  }

  /* ==========================================================================
     1.  SITE HEADER — sticky nav, mobile panel, scroll behaviour
     Optimized for Safari iOS 8+ and Android
     ========================================================================== */
  function initHeader() {
    var header = $('.site-header');
    var burger = $('.burger');
    var panel = $('.mobile-panel');
    var nav = $('.mobile-nav');
    var closeBtn = $('.mobile-close');
    if (!header || !burger || !panel || !nav) return;
    var body = document.body;
    var isIOS = /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
    var isAndroid = /Android/i.test(navigator.userAgent);
    var isMobile = isIOS || isAndroid;

    // Prevent body scroll when mobile nav is open (iOS Safari fix)
    function openMobile() {
      panel.setAttribute('open', '');
      nav.setAttribute('open', '');
      burger.setAttribute('aria-expanded', 'true');
      AD('no-scroll', body);
      // iOS Safari: prevent overscroll
      if (isIOS) {
        body.style.position = 'fixed';
        body.style.width = '100%';
        body.style.top = '-' + scrollY() + 'px';
      }
    }
    function closeMobile() {
      KZ('open', panel);
      KZ('open', nav);
      burger.setAttribute('aria-expanded', 'false');
      KZ('no-scroll', body);
      // iOS Safari: restore body position and scroll position
      if (isIOS) {
        body.style.position = '';
        body.style.width = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(body.style.top || 0) * -1 || 0);
      }
    }

    // Use touch events for better iOS responsiveness
    var openMobileHandler = function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (panel.hasAttribute('open')) closeMobile(); else openMobile();
    };
    burger.addEventListener('touchstart', openMobileHandler, { passive: true });
    burger.addEventListener('click', openMobileHandler);

    if (closeBtn) {
      closeBtn.addEventListener('touchstart', function (e) { e.preventDefault(); closeMobile(); }, { passive: true });
      closeBtn.addEventListener('click', closeMobile);
    }
    panel.addEventListener('click', function (e) { if (e.target === panel) closeMobile(); });
    panel.addEventListener('touchstart', function (e) { if (e.target === panel) closeMobile(); }, { passive: true });

    nav.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (a && (a.getAttribute('href') === '#' || a.getAttribute('data-close') === '1')) closeMobile();
    });
    nav.addEventListener('touchstart', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (a && (a.getAttribute('href') === '#' || a.getAttribute('data-close') === '1')) {
        e.preventDefault();
        closeMobile();
      }
    }, { passive: true });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.hasAttribute('open')) closeMobile();
    });

    // Header shadow on scroll - optimized for mobile
    var ticking = false, lastY = 0, headerHeight = getHeaderHeight();
    var updateHeader = function () {
      var y = scrollY();
      if (y > 20 && y > lastY) AD('is-solid', header);
      else if (y <= 20) KZ('is-solid', header);
      else if (y < lastY) KZ('is-solid', header);
      lastY = y;
      ticking = false;
    };

    // Use throttled scroll for better mobile performance
    if (isMobile) {
      var lastScrollTime = 0;
      window.addEventListener('scroll', function () {
        var now = Date.now();
        if (now - lastScrollTime > 50) { // Throttle to 20fps on mobile
          if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
          }
          lastScrollTime = now;
        }
      }, { passive: true });
      // Recalculate header height on resize
      window.addEventListener('resize', function () { headerHeight = getHeaderHeight(); }, { passive: true });
    } else {
      window.addEventListener('scroll', function () {
        if (!ticking) {
          window.requestAnimationFrame(updateHeader);
          ticking = true;
        }
      }, { passive: true });
    }
  }

  /* ==========================================================================
     2.  ACTIVE NAV LINK
     ========================================================================== */
  function setActiveNav() {
    var raw = window.location.pathname.replace(/^.*\//, '').split('?')[0];
    var page = raw || 'index.html';
    $$('.nav-links a, .mobile-nav a:not(.nav-cta)').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href) return;
      var key = href.split('#')[0].split('?')[0];
      if (key === page || (page === 'index.html' && key === 'index.html')) AD('active', a);
      else KZ('active', a);
    });
  }

  /* ==========================================================================
     3.  3D HERO SCENE — procedural crystal / molecular structure
         Three.js is lazy-loaded from CDN. If it fails, the static SVG
         fallback (hero-svg, defined in the HTML) remains visible.
     ========================================================================== */
  var HeroScene = {
    raf: false,
    scene: null, camera: null, renderer: null, meshGroup: null,
    animId: null, mounted: false,

    init: function () {
      if (REDUCED) return;
      var sceneEl = $('.hero-scene');
      if (!sceneEl) return;
      if (sceneEl.getAttribute && sceneEl.getAttribute('data-static') === '1') return; /* keep static SVG (chemical plant) */
      if (typeof THREE !== 'undefined') { this.mounted = true; this.build(sceneEl); return; }
      var s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
      s.crossOrigin = 'anonymous';
      s.setAttribute('referrerpolicy', 'no-referrer');
      s.onload = function () { HeroScene.mounted = true; HeroScene.build(sceneEl); };
      s.onerror = function () { /* keep SVG fallback */ };
      document.head.appendChild(s);
    },

    build: function (sceneEl) {
      var W = sceneEl.clientWidth || 560;
      var H = sceneEl.clientHeight || 460;
      if (W < 40 || H < 40) { W = 560; H = 460; }

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
      this.camera.position.set(5.2, 3.4, 9.5);
      this.camera.lookAt(0, 0, 0);

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(W, H);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.setClearColor(0x0C1728, 1);
      if (this.renderer.shadowMap) this.renderer.shadowMap.enabled = false;
      sceneEl.appendChild(this.renderer.domElement);
      AD('is-3d', sceneEl);

      var amb = new THREE.AmbientLight(0x5A6B8A, 0.65); this.scene.add(amb);
      var key = new THREE.DirectionalLight(0xFFFFFF, 1.15); key.position.set(5, 8, 6); this.scene.add(key);
      var fill = new THREE.DirectionalLight(0x3FC6E0, 0.5); fill.position.set(-4, 2, -3); this.scene.add(fill);
      var rim = new THREE.DirectionalLight(0x2F6BED, 0.6); rim.position.set(-2, -1, 6); this.scene.add(rim);

      this.meshGroup = new THREE.Group();
      this.buildStructure();
      this.buildBonds();
      this.scene.add(this.meshGroup);

      this.raf = true;
      this.animate();

      if (typeof ResizeObserver === 'function') {
        var ro = new ResizeObserver(function () {
          var w = sceneEl.clientWidth || 560;
          var h = sceneEl.clientHeight || 460;
          if (w < 40 || h < 40) return;
          this.camera.aspect = w / h;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(w, h);
        }.bind(this));
        ro.observe(sceneEl);
        this._ro = ro;
      }
    },

    buildStructure: function () {
      var g = this.meshGroup;
      if (!g) return;
      // Central faceted core
      var core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.05, 1),
        new THREE.MeshPhysicalMaterial({
          color: 0x2F6BED, metalness: 0.15, roughness: 0.3,
          transparent: true, opacity: 0.9, clearcoat: 0.25, clearcoatRoughness: 0.3
        })
      );
      g.add(core);

      // Orbiting nodes ("atoms")
      var N = 12;
      for (var i = 0; i < N; i++) {
        var theta = (i / N) * Math.PI * 2;
        var phi = Math.acos(2 * (i + 0.37) / N - 1);
        var r = 2.35 + (i % 3) * 0.28;
        var x = r * Math.sin(phi) * Math.cos(theta);
        var y = r * Math.sin(phi) * Math.sin(theta) * 0.62;
        var z = r * Math.cos(phi);
        var size = 0.16 + ((i * 7) % 3) * 0.05;
        var hue = 0.56 + ((i * 11) % 5) * 0.018;
        var col = new THREE.Color().setHSL(hue, 0.62, 0.5);
        var node = new THREE.Mesh(
          new THREE.SphereGeometry(size, 14, 14),
          new THREE.MeshPhysicalMaterial({
            color: col, metalness: 0.3, roughness: 0.25,
            emissive: col, emissiveIntensity: 0.12
          })
        );
        node.position.set(x, y, z);
        g.add(node);
      }

      // Satellite crystal motifs (tetrahedra)
      for (var j = 0; j < 3; j++) {
        var ang = (j / 3) * Math.PI * 2 + 0.4;
        var dist = 3.55;
        var sat = new THREE.Mesh(
          new THREE.TetrahedronGeometry(0.42),
          new THREE.MeshPhysicalMaterial({
            color: 0x3FC6E0, metalness: 0.1, roughness: 0.4,
            transparent: true, opacity: 0.35, wireframe: true
          })
        );
        sat.position.set(Math.cos(ang) * dist, Math.sin(ang * 2) * 0.55, Math.sin(ang) * dist * 0.5);
        g.add(sat);
      }
    },

    buildBonds: function () {
      var g = this.meshGroup;
      if (!g) return;
      var nodes = [];
      g.children.forEach(function (c) {
        if (c.isMesh && c.position) nodes.push(c.position);
      });
      var mat = new THREE.LineBasicMaterial({ color: 0x9FB8E8, transparent: true, opacity: 0.28 });
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var dx = nodes[i].x - nodes[j].x;
          var dy = nodes[i].y - nodes[j].y;
          var dz = nodes[i].z - nodes[j].z;
          var d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d > 1.1 && d < 2.15) {
            var line = new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(nodes[i].x, nodes[i].y, nodes[i].z),
                new THREE.Vector3(nodes[j].x, nodes[j].y, nodes[j].z)
              ]),
              mat
            );
            g.add(line);
          }
        }
      }
    },

    animate: function () {
      if (!this.raf) return;
      this.animId = requestAnimationFrame(this.animate.bind(this));
      if (this.meshGroup) {
        this.meshGroup.rotation.y += 0.0022;
        this.meshGroup.rotation.x += 0.00035;
      }
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    },

    dispose: function () {
      this.raf = false;
      if (this.animId) cancelAnimationFrame(this.animId);
      if (this._ro && this._ro.disconnect) this._ro.disconnect();
      if (this.renderer) {
        try { this.renderer.dispose(); } catch (e) {}
        var c = this.renderer.domElement;
        if (c && c.parentNode) c.parentNode.removeChild(c);
      }
      this.scene = null; this.camera = null; this.renderer = null;
    }
  };

  /* ==========================================================================
     4.  SCROLL PROGRESS + BACK TO TOP - iOS & Android optimized
     ========================================================================== */
  function initScrollUI() {
    var progress = $('.scroll-progress');
    var toTop = $('.to-top');
    if (!progress && !toTop) return;

    var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    var ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var h = document.documentElement;
        var scroll = scrollY();
        var max = (h.scrollHeight - h.clientHeight) || 1;
        var percentage = Math.min(100, (scroll / max) * 100);

        if (progress) {
          progress.style.width = percentage + '%';
        }
        if (toTop) {
          if (scroll > 500) AD('show', toTop);
          else KZ('show', toTop);
        }
        ticking = false;
      });
    }

    // Throttle scroll events on mobile for performance
    if (isMobile) {
      var lastScrollTime = 0;
      window.addEventListener('scroll', function () {
        var now = Date.now();
        if (now - lastScrollTime > 40) { // ~25fps on mobile
          onScroll();
          lastScrollTime = now;
        }
      }, { passive: true });
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    if (toTop) {
      toTop.addEventListener('touchstart', function (e) {
        e.preventDefault();
        scrollTo(0, REDUCED ? 'auto' : 'smooth');
      }, { passive: true });
      toTop.addEventListener('click', function () {
        scrollTo(0, REDUCED ? 'auto' : 'smooth');
      });
    }
  }

  /* ==========================================================================
     5.  REVEAL ON SCROLL (safe: never leaves content hidden)
     Uses IntersectionObserver with fallback for older mobile browsers
     ========================================================================== */
  function initReveal() {
    var targets = $$('.section-head, .trust-card, .division-card, .product-card, .q-step, .q-doc, .export-point, .child-card, .a-stat, .quote-note, .why-item, .cat, .info-card');
    if (!targets.length) return;

    targets.forEach(function (el) {
      if (el.classList.contains('in') || el.classList.contains('reveal')) return;
      AD('reveal', el);
      var d = el.dataset ? el.dataset.delay : '';
      if (d) el.classList.add('reveal-d' + d.replace(/\D/g, ''));
    });

    // Fallback for browsers without IntersectionObserver (older Safari)
    if (typeof IntersectionObserver !== 'function') {
      targets.forEach(function (el) { AD('in', el); });
      return;
    }

    // Use IntersectionObserver for scroll-triggered animations
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          AD('in', e.target);
          io.unobserve(e.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -20px 0px'
    });

    targets.forEach(function (el) { io.observe(el); });

    // Safety net: reveal anything still hidden after load
    setTimeout(function () {
      $$('.reveal:not(.in)').forEach(function (el) { AD('in', el); });
    }, 1500);
  }

  /* ==========================================================================
     6.  PRODUCT CATALOGUE — filter + search over products-data.js
     ========================================================================== */
  var Catalogue = {
    grid: null,
    count: null,
    activeCat: 'all',
    query: '',

    init: function () {
      this.grid = $('#grid');
      if (!this.grid) return;
      this.count = $('#resultCount');
      var m = window.location.search.match(/[?&]cat=([a-z]+)/i);
      if (m) {
        this.activeCat = m[1];
        var btn = document.querySelector('.filter-btn[data-cat="' + m[1] + '"]');
        $$('.filter-btn').forEach(function (b) { KZ('active', b); });
        if (btn) AD('active', btn);
      }
      this.render();
    },

    filtered: function () {
      var q = this.query.toLowerCase().trim();
      return getProducts().filter(function (p) {
        if (this.activeCat !== 'all' && p.cat !== this.activeCat) return false;
        if (q) {
          var hay = (p.name + ' ' + p.grade + ' ' + p.app + ' ' + (p.specs || []).join(' ')).toLowerCase();
          if (hay.indexOf(q) === -1) return false;
        }
        return true;
      }, this);
    },

    render: function () {
      var list = this.filtered();
      if (this.count) {
        this.count.textContent = list.length + (list.length === 1 ? ' product' : ' products') +
          (this.activeCat !== 'all' ? ' in ' + DIV_NAME[this.activeCat] + ' division' : ' across all divisions');
      }
      if (!list.length) {
        this.grid.innerHTML = '<div class="no-result"><strong>No products match</strong>' +
          'Try a different search or division filter — or email the export desk for your specification.</div>';
        return;
      }
      var html = '';
      list.forEach(function (p) {
        var sc = (p.specs || []).map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('');
        var ms = 'Product Enquiry — ' + esc(p.name) + ' — Vanguard Chemical';
        html += '<div class="product-card">' +
          '<span class="p-tag">' + esc(DIV_NAME[p.div] || p.cat) + '</span>' +
          '<h3>' + esc(p.name) + '</h3>' +
          '<div class="p-grade">' + esc(p.grade) + '</div>' +
          '<p>' + esc(p.app) + '</p>' +
          (sc ? '<div class="p-spec">' + sc + '</div>' : '') +
          '<div class="p-actions">' +
            '<a class="btn btn-sm btn-ghost" href="' + mailto(ms) + '">Enquire</a>' +
            '<a class="btn btn-sm btn-primary" href="' + mailto(ms, 'Request COA / MSDS for ' + esc(p.name) + ' — ' + DIV_NAME[p.div]) + '">Request docs</a>' +
          '</div>' +
        '</div>';
      });
      this.grid.innerHTML = html;
    },

    setCat: function (cat, btn) {
      this.activeCat = cat;
      $$('.filter-btn').forEach(function (b) { KZ('active', b); });
      if (btn) AD('active', btn);
      this.render();
    },

    setQuery: function (val) {
      this.query = val;
      this.render();
    }
  };

  /* ==========================================================================
     7.  QUOTE / RFQ FORM — validation + mailto delivery (no backend).
         Uses only the public sales address; nothing secret is exposed.
     ========================================================================== */
  var QuoteForm = {
    form: null,
    status: null,
    sent: null,

    init: function () {
      this.form = $('#quote-form');
      if (!this.form) return;
      this.status = $('#form-status');
      this.sent = $('#form-sent');
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
      this.form.querySelectorAll('.field input, .field select, .field textarea').forEach(function (el) {
        el.addEventListener('blur', function () { QuoteForm.validateField(el); });
        el.addEventListener('input', function () {
          var f = el.closest('.field');
          if (f && el.value && el.value.trim()) KZ('invalid', f);
        });
      });
    },

    fieldRules: function (el) {
      var rules = [];
      var name = el.name || el.id;
      if (el.required || el.hasAttribute('required')) rules.push(function (v) { return v.trim().length > 0; });
      if (name === 'email') rules.push(function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); });
      if (name === 'phone') rules.push(function (v) { return !v || /^[\d\s+\-()]{7,}$/.test(v.trim()); });
      return rules;
    },

    validateField: function (el) {
      var field = el.closest('.field');
      if (!field) return true;
      var ok = this.fieldRules(el).every(function (r) { return r(el.value || ''); });
      if (ok) KZ('invalid', field); else AD('invalid', field);
      return ok;
    },

    handleSubmit: function (e) {
      e.preventDefault();
      var hp = this.form.querySelector('input[name="company_website"]');
      if (hp && hp.value && hp.value.trim()) return; // spam bot

      var allOk = true;
      this.form.querySelectorAll('.field input, .field select, .field textarea').forEach(function (el) {
        if (!QuoteForm.validateField(el)) allOk = false;
      });
      if (!allOk) {
        var first = this.form.querySelector('.field.invalid input, .field.invalid select, .field.invalid textarea');
        if (first) first.focus();
        return;
      }

      var lines = [];
      this.form.querySelectorAll('input, select, textarea').forEach(function (el) {
        var v = (el.value || '').trim();
        if (!el.name || el.name === 'company_website' || !v) return;
        var label = el.name.replace(/_/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
        lines.push(label + ': ' + v);
      });
      var subject = 'RFQ — Vanguard Chemical Solutions';
      var msg = 'Your email client is opening with the quotation request pre-filled. ' +
        'Send it to sales@vanguardchemicals.in and the export desk replies within 24 working hours.';
      this.showStatus('ok', 'Enquiry prepared', msg);
      try { window.location.href = mailto(subject, lines.join('\n')); } catch (err) {}
    },

    showStatus: function (type, title, msg) {
      if (this.status) {
        this.status.setAttribute('open', '');
        this.status.innerHTML = '<h4>' + esc(title) + '</h4><p>' + esc(msg) + '</p>';
      }
      if (this.sent) {
        this.sent.setAttribute('open', '');
        this.sent.innerHTML = '<h4>' + esc(title) + '</h4><p>' + esc(msg) + '</p>';
      }
    }
  };

  /* ==========================================================================
     8.  SMOOTH ANCHOR SCROLL (same-page #links)
     Cross-browser compatible with iOS Safari and Android fixes
     ========================================================================== */
  function initAnchorScroll() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;

      var href = a.getAttribute('href');
      // Only handle same-page anchors (not external links with hash)
      if (href === '#' || href.indexOf('#') === 0) {
        var id = href === '#' ? '' : href.slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();

        var headerHeight = getHeaderHeight();
        var targetRect = target.getBoundingClientRect();
        var y = targetRect.top + scrollY() - headerHeight - 8;

        scrollTo(Math.max(0, y), REDUCED ? 'auto' : 'smooth');
      }
    });

    // iOS Safari: handle touch events for faster response
    document.addEventListener('touchstart', function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href.indexOf('#') !== 0) return;

      // Use a slight delay to ensure scroll position is captured
      var touchTimer = setTimeout(function () {
        var id = href === '#' ? '' : href.slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target) return;
        var headerHeight = getHeaderHeight();
        var targetRect = target.getBoundingClientRect();
        var y = targetRect.top + scrollY() - headerHeight - 8;
        scrollTo(Math.max(0, y), REDUCED ? 'auto' : 'smooth');
      }, 100);

      // Clear timeout on scroll to prevent unwanted navigation
      var scrollHandler = function () {
        clearTimeout(touchTimer);
        document.removeEventListener('scroll', scrollHandler);
      };
      document.addEventListener('scroll', scrollHandler, { once: true });
    }, { passive: true });
  }

  /* ==========================================================================
     9.  LAUNCH
     ========================================================================== */
  function launch() {
    var root = document.documentElement;
    KZ('no-js', root);
    AD('js-ready', root);

    initHeader();
    setActiveNav();
    initScrollUI();
    initReveal();
    initAnchorScroll();

    var sceneEl = $('.hero-scene');
    if (sceneEl) {
      var isStaticHero = sceneEl.getAttribute && sceneEl.getAttribute('data-static') === '1';
      if (REDUCED) {
        if (!isStaticHero) AD('is-3d', sceneEl); /* reduced motion: static SVG only */
      } else if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(function () { HeroScene.init(); });
      } else { HeroScene.init(); }
    }

    if ($('#grid')) Catalogue.init();

    if ($('#quote-form')) QuoteForm.init();

    window.filterCat = function (cat, btn) { if (Catalogue) Catalogue.setCat(cat, btn); };
    window.filterQ = function (val) { if (Catalogue) Catalogue.setQuery(val); };

    console.log('[Vanguard] app ready — js-ready=' + root.className);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', launch);
  } else {
    launch();
  }
})();