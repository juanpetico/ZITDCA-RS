/**
 * animations.ts — ZIT'DCA RS
 * Punto de entrada único de animaciones. Lenis + GSAP/ScrollTrigger.
 * Respeta prefers-reduced-motion ESTRICTAMENTE.
 * Anima SOLO transform y opacity (nunca width/height/top/left/margin).
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Detectar preferencia de movimiento reducido
// ─────────────────────────────────────────────────────────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─────────────────────────────────────────────────────────────────────────────
// Si el usuario prefiere reducción de movimiento:
// Mostrar todo en estado final y terminar.
// ─────────────────────────────────────────────────────────────────────────────
if (prefersReducedMotion) {
  // Asegurarnos de que todos los elementos animados sean visibles
  const revealEls = document.querySelectorAll<HTMLElement>(
    '[data-anim], [data-count], [data-revline], [data-fab], [data-gallery]'
  );
  revealEls.forEach((el) => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });

  // Count-up: mostrar valor final directamente
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count ?? '0');
    const decimals = parseInt(el.dataset.countDecimals ?? '0', 10);
    el.textContent = decimals > 0 ? target.toFixed(decimals) : String(Math.round(target));
  });

  // FAB visible desde el inicio si hay reduced-motion
  const fab = document.querySelector<HTMLElement>('[data-fab]');
  if (fab) {
    fab.style.opacity = '1';
    fab.style.transform = 'none';
  }
} else {
  // ───────────────────────────────────────────────────────────────────────────
  // MODO NORMAL: inicializar Lenis + GSAP
  // ───────────────────────────────────────────────────────────────────────────

  // 1. Lenis smooth scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  // Integración Lenis ↔ GSAP ticker
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // ───────────────────────────────────────────────────────────────────────────
  // 2. Animación de carga del Hero (timeline de entrada)
  // ───────────────────────────────────────────────────────────────────────────
  const heroEyebrow = document.querySelector<HTMLElement>('[data-anim="hero-eyebrow"]');
  const heroH1 = document.querySelector<HTMLElement>('[data-anim="hero-h1"]');
  const heroSub = document.querySelector<HTMLElement>('[data-anim="hero-sub"]');
  const heroCtas = document.querySelector<HTMLElement>('[data-anim="hero-ctas"]');
  const heroScroll = document.querySelector<HTMLElement>('[data-anim="hero-scroll"]');

  const heroElements = [heroEyebrow, heroH1, heroSub, heroCtas, heroScroll].filter(Boolean) as HTMLElement[];

  // Estado inicial: invisible y desplazado hacia abajo
  gsap.set(heroElements, { opacity: 0, y: 30 });

  // Timeline de entrada con stagger
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl.to(heroElements, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
  });

  // ───────────────────────────────────────────────────────────────────────────
  // 3. Parallax sutil de la imagen hero
  // ───────────────────────────────────────────────────────────────────────────
  const heroImg = document.querySelector<HTMLElement>('#inicio img');
  if (heroImg) {
    gsap.to(heroImg, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: '#inicio',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Fade-out del contenido del hero al salir
  const heroContent = document.querySelector<HTMLElement>('#inicio .relative.z-10');
  if (heroContent) {
    gsap.to(heroContent, {
      opacity: 0,
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: '#inicio',
        start: '60% top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 4. Reveal escalonado de tarjetas [data-anim="card"]
  // ───────────────────────────────────────────────────────────────────────────
  const cards = document.querySelectorAll<HTMLElement>('[data-anim="card"]');
  if (cards.length > 0) {
    gsap.set(cards, { opacity: 0, y: 40 });

    ScrollTrigger.batch(cards, {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
        });
      },
      start: 'top 90%',
      once: true,
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 5. Reveal filas de precios [data-anim="price-row"]
  // ───────────────────────────────────────────────────────────────────────────
  const priceRows = document.querySelectorAll<HTMLElement>('[data-anim="price-row"]');
  if (priceRows.length > 0) {
    gsap.set(priceRows, { opacity: 0, x: -20 });

    ScrollTrigger.batch(priceRows, {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
        });
      },
      start: 'top 90%',
      once: true,
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 6. Reveal de razones "Por qué" [data-anim="reason"]
  // ───────────────────────────────────────────────────────────────────────────
  const reasons = document.querySelectorAll<HTMLElement>('[data-anim="reason"]');
  if (reasons.length > 0) {
    gsap.set(reasons, { opacity: 0, y: 30 });

    ScrollTrigger.batch(reasons, {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
        });
      },
      start: 'top 90%',
      once: true,
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 7. Count-up para [data-count]
  // ───────────────────────────────────────────────────────────────────────────
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count ?? '0');
    const decimals = parseInt(el.dataset.countDecimals ?? '0', 10);
    const counter = { val: 0 };

    // Mostrar "0" como estado inicial
    el.textContent = decimals > 0 ? (0).toFixed(decimals) : '0';

    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = decimals > 0
              ? counter.val.toFixed(decimals)
              : String(Math.round(counter.val));
          },
        });
      },
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // 8. Animación de la línea RevLine [data-revline]
  // ───────────────────────────────────────────────────────────────────────────
  document.querySelectorAll<SVGElement>('[data-revline]').forEach((svg) => {
    const path = svg.querySelector<SVGPathElement>('path');
    if (!path) return;

    const length = path.getTotalLength ? path.getTotalLength() : 1300;

    // Estado inicial: línea invisible (offset = length)
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    ScrollTrigger.create({
      trigger: svg,
      start: 'top 85%',
      end: 'top 30%',
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(path, {
          strokeDashoffset: length * (1 - self.progress),
        });
      },
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // 9. Galería horizontal con pin (solo desktop, ≥ 1024px)
  // ───────────────────────────────────────────────────────────────────────────
  const gallerySection = document.querySelector<HTMLElement>('#trabajos');
  const galleryTrack = document.querySelector<HTMLElement>('[data-gallery]');

  if (gallerySection && galleryTrack && window.innerWidth >= 1024) {
    // Calcular el ancho total a desplazar
    const cards2 = galleryTrack.querySelectorAll<HTMLElement>('.gallery-card');
    const cardWidth = cards2[0]?.offsetWidth ?? 400;
    const gap = 16; // gap-4 = 1rem = 16px
    const totalWidth = (cardWidth + gap) * cards2.length + 32; // + padding
    const visibleWidth = window.innerWidth;
    const scrollDistance = totalWidth - visibleWidth;

    if (scrollDistance > 0) {
      // Quitar overflow para que el pin funcione
      galleryTrack.style.overflow = 'visible';

      gsap.to(galleryTrack, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: gallerySection,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 10. FAB de WhatsApp: aparece tras 1 viewport de scroll
  // ───────────────────────────────────────────────────────────────────────────
  const fab = document.querySelector<HTMLElement>('[data-fab]');
  if (fab) {
    ScrollTrigger.create({
      start: `${window.innerHeight}px top`,
      onEnter: () => {
        gsap.to(fab, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: 'back.out(1.4)',
        });
      },
      onLeaveBack: () => {
        gsap.to(fab, {
          opacity: 0,
          scale: 0.8,
          y: 20,
          duration: 0.3,
          ease: 'power2.in',
        });
      },
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 11. Efecto scroll del nav (delegado al propio Nav.astro listener)
  // El Nav ya maneja su propio scroll listener con { passive: true } en Nav.astro.
  // No duplicamos lógica aquí para evitar conflicto.
  // ───────────────────────────────────────────────────────────────────────────

  // ───────────────────────────────────────────────────────────────────────────
  // 12. Refrescar ScrollTrigger al cargar fuentes (prevenir posiciones incorrectas)
  // ───────────────────────────────────────────────────────────────────────────
  document.fonts.ready.then(() => {
    ScrollTrigger.refresh();
  });
}
