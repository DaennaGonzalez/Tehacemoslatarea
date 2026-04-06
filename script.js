document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const body = document.body;

  html.classList.remove('no-js');
  html.classList.add('js');

  // =========================
  // MENU MOVIL
  // =========================
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.main-nav a');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      body.classList.toggle('menu-open', isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
      });
    });

    document.addEventListener('click', (event) => {
      const clickedInsideNav = mainNav.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideNav && !clickedToggle && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
      }
    });
  }

  // =========================
  // REVEAL AL HACER SCROLL
  // =========================
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('reveal-visible'));
  }

  // =========================
  // ACORDEON
  // =========================
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');

    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      accordionItems.forEach((accordion) => {
        accordion.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // =========================
  // HEADER AL HACER SCROLL
  // =========================
  const header = document.querySelector('.main-header');

  const updateHeaderOnScroll = () => {
    if (!header) return;

    if (window.scrollY > 24) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  updateHeaderOnScroll();
  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });

  // =========================
  // DUPLICAR CONTENIDO EN MARQUEES
  // para que el loop se vea continuo
  // =========================
  const horizontalTracks = document.querySelectorAll('.marquee-track');

  horizontalTracks.forEach((track) => {
    if (track.dataset.duplicated === 'true') return;

    track.innerHTML += track.innerHTML;
    track.dataset.duplicated = 'true';
  });

  const verticalTracks = document.querySelectorAll('.marquee-column-track');

  verticalTracks.forEach((track) => {
    if (track.dataset.duplicated === 'true') return;

    track.innerHTML += track.innerHTML;
    track.dataset.duplicated = 'true';
  });

  // =========================
  // PAUSA DE MARQUEE AL PASAR CURSOR
  // =========================
  const pauseOnHoverElements = document.querySelectorAll(
    '.marquee-track, .marquee-column-track'
  );

  pauseOnHoverElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
      element.style.animationPlayState = 'paused';
    });

    element.addEventListener('mouseleave', () => {
      element.style.animationPlayState = 'running';
    });
  });

  // =========================
// BOTON VER MÁS (4 EN 4)
// =========================
const btnVerMas = document.getElementById('btnVerMas');

if (btnVerMas) {
  let visibles = 5; // ya tienes 5 visibles al inicio
  const incremento = 4;

  btnVerMas.addEventListener('click', () => {
    const items = document.querySelectorAll('.evidence-card');

    let mostrados = 0;

    for (let i = visibles; i < items.length && mostrados < incremento; i++) {
      items[i].style.display = 'block';
      mostrados++;
    }

    visibles += incremento;

    // si ya no hay más, oculta el botón
    if (visibles >= items.length) {
      btnVerMas.style.display = 'none';
    }
  });
}

  // =========================
  // EFECTO PARALLAX SUAVE EN HERO
  // =========================
  const hero = document.querySelector('.hero');
  const heroRocket = document.querySelector('.hero-cohete');
  const heroCard = document.querySelector('.hero-student-card');

  const handleHeroParallax = () => {
    if (!hero || window.innerWidth < 992) return;

    const rect = hero.getBoundingClientRect();
    const offset = rect.top * -0.04;

    if (heroRocket) {
      heroRocket.style.transform = `translateY(${offset}px)`;
    }

    if (heroCard) {
      heroCard.style.transform = `translateY(${offset * 0.35}px)`;
    }
  };

  window.addEventListener('scroll', handleHeroParallax, { passive: true });
  handleHeroParallax();

  // =========================
  // BOTON FLOTANTE WHATSAPP
  // ocultar un poco al llegar al footer
  // =========================
  const floatingWhatsapp = document.querySelector('.floating-whatsapp');
  const footer = document.querySelector('.main-footer');

  const updateWhatsappPosition = () => {
    if (!floatingWhatsapp || !footer) return;

    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (footerRect.top < windowHeight - 80) {
      floatingWhatsapp.classList.add('footer-near');
    } else {
      floatingWhatsapp.classList.remove('footer-near');
    }
  };

  window.addEventListener('scroll', updateWhatsappPosition, { passive: true });
  updateWhatsappPosition();

  // =========================
  // SCROLL SUAVE MEJORADO PARA ANCLAS
  // =========================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');

      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      const headerOffset = window.innerWidth <= 767 ? 90 : 110;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  // =========================
  // ACCESIBILIDAD:
  // abrir primer acordeón opcionalmente
  // =========================
  if (accordionItems.length > 0) {
    accordionItems[0].classList.add('active');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const pdfCards = document.querySelectorAll('.pdf-card');
  const pdfModal = document.getElementById('pdfModal');
  const pdfViewer = document.getElementById('pdfViewer');
  const pdfModalTitle = document.getElementById('pdfModalTitle');
  const pdfModalClose = document.getElementById('pdfModalClose');
  const pdfBackdrop = document.querySelector('[data-close-pdf]');

  if (!pdfCards.length || !pdfModal || !pdfViewer || !pdfModalTitle || !pdfModalClose) {
    return;
  }

  let lastFocusedElement = null;

  const openPdfModal = (pdfUrl, pdfTitle) => {
    if (!pdfUrl) return;

    lastFocusedElement = document.activeElement;

    pdfViewer.src = pdfUrl;
    pdfModalTitle.textContent = pdfTitle || 'Vista previa del documento';

    pdfModal.classList.add('is-active');
    pdfModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    setTimeout(() => {
      pdfModalClose.focus();
    }, 50);
  };

  const closePdfModal = () => {
    pdfModal.classList.remove('is-active');
    pdfModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    pdfViewer.src = '';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  };

  pdfCards.forEach((card) => {
    card.addEventListener('click', () => {
      const pdfUrl = card.getAttribute('data-pdf');
      const pdfTitle = card.getAttribute('data-title');

      openPdfModal(pdfUrl, pdfTitle);
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();

        const pdfUrl = card.getAttribute('data-pdf');
        const pdfTitle = card.getAttribute('data-title');

        openPdfModal(pdfUrl, pdfTitle);
      }
    });
  });

  pdfModalClose.addEventListener('click', closePdfModal);

  if (pdfBackdrop) {
    pdfBackdrop.addEventListener('click', closePdfModal);
  }

  pdfModal.addEventListener('click', (event) => {
    if (event.target === pdfModal) {
      closePdfModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && pdfModal.classList.contains('is-active')) {
      closePdfModal();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const pdfStepBlocks = document.querySelectorAll('.pdf-step-block');
  const btnMostrarMasPdf = document.getElementById('btnMostrarMasPdf');

  if (!pdfStepBlocks.length || !btnMostrarMasPdf) return;

  let visibleIndex = 0;

  pdfStepBlocks.forEach((block, index) => {
    if (index === 0) {
      block.classList.add('is-visible');
    } else {
      block.classList.remove('is-visible');
    }
  });

  btnMostrarMasPdf.addEventListener('click', () => {
    const nextIndex = visibleIndex + 1;

    if (nextIndex < pdfStepBlocks.length) {
      pdfStepBlocks[nextIndex].classList.add('is-visible');

      setTimeout(() => {
        const headerOffset = window.innerWidth <= 767 ? 90 : 110;
        const targetPosition =
          pdfStepBlocks[nextIndex].getBoundingClientRect().top +
          window.pageYOffset -
          headerOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }, 80);

      visibleIndex = nextIndex;
    }

    if (visibleIndex >= pdfStepBlocks.length - 1) {
      btnMostrarMasPdf.style.display = 'none';
    }
  });
});