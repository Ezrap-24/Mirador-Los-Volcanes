/* =========================================================
   PROGRAMA PATRIMONIAL MINERO — script.js
   Navegación, scroll reveal, acordeón FAQ, lightbox galería,
   formulario y microinteracciones.
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------
     1. HEADER: estado "scrolled"
  --------------------------------------------------- */
  var header = document.getElementById('header');
  var scrollTopBtn = document.getElementById('scrollTop');
  function toggleScrollTopButton() {
    if (!scrollTopBtn) return;
    if (window.scrollY > 640) {
      scrollTopBtn.classList.add('is-visible');
    } else {
      scrollTopBtn.classList.remove('is-visible');
    }
  }
  function onScroll() {
    if (window.scrollY > 24) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
    toggleScrollTopButton();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------
     2. NAV MOVIL
  --------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var navBackdrop = document.getElementById('navBackdrop');
  var navClose = document.getElementById('navClose');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (navBackdrop) navBackdrop.classList.remove('is-open');
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
    document.body.style.overflow = '';
  }
  function openNav() {
    if (navBackdrop) navBackdrop.classList.add('is-open');
    nav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Cerrar menu');
    document.body.style.overflow = 'hidden';
  }
  navToggle.addEventListener('click', function () {
    var isOpen = nav.classList.contains('is-open');
    isOpen ? closeNav() : openNav();
  });
  if (navClose) navClose.addEventListener('click', closeNav);
  if (navBackdrop) navBackdrop.addEventListener('click', closeNav);
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024) closeNav();
  });

  /* ---------------------------------------------------
     3. SMOOTH SCROLL para enlaces internos (#id)
  --------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (targetId.length < 2) return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var headerOffset = 96;
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---------------------------------------------------
     4. FADE-IN ON SCROLL (IntersectionObserver)
  --------------------------------------------------- */
  window.__revealInit = true;
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry, idx) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = (idx % 4) * 80;
          setTimeout(function () { el.classList.add('is-visible'); }, delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------------------------------------------
     5. ACORDEON FAQ
  --------------------------------------------------- */
  var accordionItems = document.querySelectorAll('.accordion__item');
  accordionItems.forEach(function (item) {
    var trigger = item.querySelector('.accordion__trigger');
    trigger.addEventListener('click', function () {
      var willOpen = !item.classList.contains('is-open');

      accordionItems.forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
      });

      if (willOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------------------------------------------------
     6. GALERIA + LIGHTBOX
  --------------------------------------------------- */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll('.gallery__item'));
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxPrev = document.getElementById('lightboxPrev');
  var lightboxNext = document.getElementById('lightboxNext');
  var currentIndex = 0;

  function openLightbox(index) {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    var item = galleryItems[currentIndex];
    lightboxImg.src = item.getAttribute('data-full');
    lightboxImg.alt = item.querySelector('img').getAttribute('alt');
    lightboxCaption.textContent = item.getAttribute('data-caption') || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener('click', function () { openLightbox(index); });
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', function () { openLightbox(currentIndex - 1); });
  lightboxNext.addEventListener('click', function () { openLightbox(currentIndex + 1); });
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  window.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox(currentIndex - 1);
    if (e.key === 'ArrowRight') openLightbox(currentIndex + 1);
  });

  /* ---------------------------------------------------
     7. MODAL "DOSSIER / REGLAMENTO"
  --------------------------------------------------- */
  var dossierModal = document.getElementById('dossierModal');
  var dossierClose = document.getElementById('dossierClose');
  var dossierTriggers = document.querySelectorAll('[data-modal-trigger]');

  function openModal() {
    dossierModal.classList.add('is-open');
    dossierModal.setAttribute('aria-hidden', 'false');
  }
  function closeModal() {
    dossierModal.classList.remove('is-open');
    dossierModal.setAttribute('aria-hidden', 'true');
  }
  dossierTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });
  dossierClose.addEventListener('click', closeModal);
  dossierModal.addEventListener('click', function (e) {
    if (e.target === dossierModal) closeModal();
  });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && dossierModal.classList.contains('is-open')) closeModal();
  });

  /* ---------------------------------------------------
     8. MODALES LEGALES (Privacidad y Terminos)
  --------------------------------------------------- */
  function makeLegalModal(modalId, closeId, openBtnId) {
    var modal = document.getElementById(modalId);
    var closeBtn = document.getElementById(closeId);
    var openBtn = document.getElementById(openBtnId);
    if (!modal) return;
    function open() { modal.classList.add('is-open'); }
    function close() { modal.classList.remove('is-open'); }
    if (openBtn) openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });
  }
  makeLegalModal('privacyModal', 'privacyClose', 'openPrivacy');
  makeLegalModal('termsModal', 'termsClose', 'openTerms');

  /* ---------------------------------------------------
     9. FORMULARIO DE CONTACTO
  --------------------------------------------------- */
  var form = document.getElementById('contactForm');
  var formStatus = document.getElementById('formStatus');

  var validators = {
    nombre: function (v) { return v.trim().length >= 3 ? '' : 'Ingresa tu nombre completo.'; },
    telefono: function (v) { return /^[+\d][\d\s-]{7,}$/.test(v.trim()) ? '' : 'Ingresa un telefono valido.'; },
    correo: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Ingresa un correo valido.'; },
    area: function (v) { return v ? '' : 'Selecciona tu area de trabajo.'; },
    interes: function (v) { return v ? '' : 'Selecciona un tipo de interes.'; }
  };

  function showFieldError(field, message) {
    var errorEl = document.getElementById('error-' + field);
    if (errorEl) errorEl.textContent = message;
  }

  Object.keys(validators).forEach(function (field) {
    var input = document.getElementById(field);
    if (!input) return;
    input.addEventListener('blur', function () {
      showFieldError(field, validators[field](input.value));
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var isValid = true;

    Object.keys(validators).forEach(function (field) {
      var input = document.getElementById(field);
      var message = validators[field](input.value);
      showFieldError(field, message);
      if (message) isValid = false;
    });

    var privacidad = document.getElementById('privacidad');
    if (!privacidad.checked) {
      isValid = false;
      formStatus.textContent = 'Debes aceptar la politica de privacidad para continuar.';
      formStatus.className = 'form__status is-error';
      return;
    }

    if (!isValid) {
      formStatus.textContent = 'Revisa los campos marcados antes de continuar.';
      formStatus.className = 'form__status is-error';
      return;
    }

    var submitBtn = form.querySelector('button[type="submit"]');
    var originalLabel = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    var payload = Object.fromEntries(new FormData(form).entries());
    console.info('[Programa Patrimonial Minero] Lead listo para enviar a CRM:', payload);

    setTimeout(function () {
      formStatus.textContent = 'Gracias! Hemos recibido tu solicitud. Un ejecutivo te contactara a la brevedad.';
      formStatus.className = 'form__status is-success';
      submitBtn.textContent = originalLabel;
      submitBtn.disabled = false;
      form.reset();
    }, 900);
  });

  /* ---------------------------------------------------
     10. CALCULADORA AIRBNB — modal interactivo
  --------------------------------------------------- */
  var airbnbCard    = document.getElementById('airbnbCard');
  var airbnbModal   = document.getElementById('airbnbModal');
  var airbnbClose   = document.getElementById('airbnbClose');
  var airbnbCta     = document.getElementById('airbnbCta');
  var sliderPrecio  = document.getElementById('sliderPrecio');
  var sliderNoches  = document.getElementById('sliderNoches');
  var labelPrecio   = document.getElementById('labelPrecio');
  var labelNoches   = document.getElementById('labelNoches');
  var resultMensual = document.getElementById('resultMensual');
  var resultBruto   = document.getElementById('resultBruto');
  var resultAnual   = document.getElementById('resultAnual');
  var resultOcup    = document.getElementById('resultOcupacion');

  function formatCLP(n) {
    return '$' + Math.round(n).toLocaleString('es-CL');
  }

  function calcularAirbnb() {
    var precio  = parseInt(sliderPrecio.value, 10);
    var noches  = parseInt(sliderNoches.value, 10);
    var bruto   = precio * noches;
    var neto    = bruto * 0.97;          // -3% comisión Airbnb
    var anual   = neto * 12;
    var ocup    = Math.round((noches / 30) * 100);

    labelPrecio.textContent  = formatCLP(precio);
    labelNoches.textContent  = noches + (noches === 1 ? ' noche' : ' noches');
    resultBruto.textContent  = formatCLP(bruto);
    resultMensual.textContent = formatCLP(neto);
    resultAnual.textContent  = formatCLP(anual);
    resultOcup.textContent   = ocup + '%';
  }

  function openAirbnb() {
    airbnbModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    airbnbClose.focus();
  }
  function closeAirbnb() {
    airbnbModal.classList.remove('is-open');
    document.body.style.overflow = '';
    if (airbnbCard) airbnbCard.focus();
  }

  if (airbnbCard) {
    airbnbCard.addEventListener('click', openAirbnb);
    airbnbCard.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAirbnb(); }
    });
  }
  if (airbnbClose)  airbnbClose.addEventListener('click', closeAirbnb);
  if (airbnbModal)  airbnbModal.addEventListener('click', function (e) {
    if (e.target === airbnbModal) closeAirbnb();
  });
  if (airbnbCta) airbnbCta.addEventListener('click', closeAirbnb);
  if (sliderPrecio) sliderPrecio.addEventListener('input', calcularAirbnb);
  if (sliderNoches) sliderNoches.addEventListener('input', calcularAirbnb);

  // Calc inicial
  calcularAirbnb();

  /* ---------------------------------------------------
     11. MAPA DE CONECTIVIDAD — toggle colapsable (móvil)
  --------------------------------------------------- */
  var mapaToggle = document.getElementById('mapaToggle');
  var mapaContent = document.getElementById('mapaContent');
  if (mapaToggle && mapaContent) {
    mapaToggle.addEventListener('click', function () {
      var expanded = mapaToggle.getAttribute('aria-expanded') === 'true';
      mapaToggle.setAttribute('aria-expanded', String(!expanded));
      mapaContent.classList.toggle('is-open', !expanded);
    });
  }

  /* ---------------------------------------------------
     11. BOTON "VOLVER ARRIBA"
  --------------------------------------------------- */
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
