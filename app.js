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
     ========================================================================== */
  function initHeader() {
    var header = $('.site-header');
    var burger = $('.burger');
    var panel = $('.mobile-panel');
    var nav = $('.mobile-nav');
    var closeBtn = $('.mobile-close');
    if (!header || !burger || !panel || !nav) return;
    var body = document.body;

    function openMobile() {
      panel.setAttribute('open', '');
      nav.setAttribute('open', '');
      burger.setAttribute('aria-expanded', 'true');
      AD('no-scroll', body);
    }
    function closeMobile() {
      KZ('open', panel);
      KZ('open', nav);
      burger.setAttribute('aria-expanded', 'false');
      KZ('no-scroll', body);
    }
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (panel.hasAttribute('open')) closeMobile(); else openMobile();
    });
    if (closeBtn) closeBtn.addEventListener('click', closeMobile);
    panel.addEventListener('click', function (e) { if (e.target === panel) closeMobile(); });
    nav.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (a && (a.getAttribute('href') === '#' || a.getAttribute('data-close') === '1')) closeMobile();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.hasAttribute('open')) closeMobile();
    });

    var ticking = false, lastY = 0;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var y = window.scrollY || window.pageYOffset;
          if (y > 24 && y > lastY) AD('is-solid', header);
          else if (y <= 24) KZ('is-solid', header);
          else if (y < lastY) KZ('is-solid', header);
          lastY = y; ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
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
     4.  SCROLL PROGRESS + BACK TO TOP
     ========================================================================== */
  function initScrollUI() {
    var progress = $('.scroll-progress');
    var toTop = $('.to-top');
    if (!progress && !toTop) return;
    function onScroll() {
      var h = document.documentElement;
      var scroll = (window.scrollY || window.pageYOffset) || 0;
      var max = (h.scrollHeight - h.clientHeight) || 1;
      if (progress) progress.style.width = Math.min(100, (scroll / max) * 100) + '%';
      if (toTop) { if (scroll > 600) AD('show', toTop); else KZ('show', toTop); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
      });
    }
  }

  /* ==========================================================================
     5.  REVEAL ON SCROLL (safe: never leaves content hidden)
     ========================================================================== */
  function initReveal() {
    var targets = $$('.section-head, .trust-card, .division-card, .product-card, .q-step, .q-doc, .export-point, .child-card, .a-stat, .quote-note');
    targets.forEach(function (el) {
      if (el.classList.contains('in') || el.classList.contains('reveal')) return;
      AD('reveal', el);
      var d = el.dataset ? el.dataset.delay : '';
      if (d) el.classList.add('reveal-d' + d.replace(/\D/g, ''));
    });
    if (typeof IntersectionObserver !== 'function') {
      targets.forEach(function (el) { AD('in', el); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { AD('in', e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el) { io.observe(el); });
    // safety net: reveal anything still hidden shortly after load
    setTimeout(function () {
      $$('.reveal:not(.in)').forEach(function (el) { AD('in', el); });
    }, 2000);
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
     ========================================================================== */
  function initAnchorScroll() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var y = target.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) - 72;
      window.scrollTo({ top: Math.max(0, y), behavior: REDUCED ? 'auto' : 'smooth' });
    });
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