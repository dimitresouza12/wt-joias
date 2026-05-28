"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./Hero.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

type SubLink = { label: string; href: string };
type NavLink = { label: string; href: string; sub?: SubLink[] };

type HeroProps = {
  videoSrc: string;
  lines?: string[];
  goldLineIndex?: number;
  subHeadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  navLinks?: NavLink[];
};

export default function Hero({
  videoSrc,
  lines = ["O PODER DO OURO 18K.", "SUA MARCA REGISTRADA."],
  goldLineIndex = 1,
  subHeadline = "Cordões, pulseiras e anéis imponentes projetados para quem não aceita menos que o topo. Peças legítimas com garantia eterna de autenticidade. Escolha seu estilo.",
  ctaLabel = "VER CATÁLOGO COMPLETO NO WHATSAPP",
  ctaHref = "#",
  navLinks = [
    { label: "Coleção",  href: "#colecao"   },
    { label: "Conceito", href: "#conceito"  },
    { label: "Garantia", href: "#garantia"  },
    { label: "Cotar",    href: "#consultor" },
  ],
}: HeroProps) {
  const root        = useRef<HTMLElement>(null);
  const hudRef      = useRef<HTMLElement>(null);
  const drawerRef   = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const burgerRef   = useRef<HTMLButtonElement>(null);
  const subRefs     = useRef<Record<string, HTMLDivElement | null>>({});
  const prevAccordion = useRef<string | null>(null);
  const mountedDrawer = useRef(false);
  const mountedAccordion = useRef(false);

  const [drawerOpen, setDrawerOpen]       = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  /* Burger visual (X icon) */
  useEffect(() => {
    const burger = burgerRef.current;
    if (!burger) return;
    if (drawerOpen) burger.classList.add(styles.burgerOpen);
    else burger.classList.remove(styles.burgerOpen);
  }, [drawerOpen, styles.burgerOpen]);

  /* Drawer GSAP — skip first render */
  useEffect(() => {
    const drawer   = drawerRef.current;
    const backdrop = backdropRef.current;
    if (!drawer || !backdrop) return;

    if (!mountedDrawer.current) {
      mountedDrawer.current = true;
      return;
    }

    if (drawerOpen) {
      drawer.style.display   = "flex";
      backdrop.style.display = "block";
      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power3.out" });
      gsap.fromTo(drawer,   { x: 320 },     { x: 0,   duration: 0.45, ease: "power3.out" });
    } else {
      gsap.to(backdrop, {
        opacity: 0, duration: 0.3, ease: "power3.in",
        onComplete: () => { if (backdrop) backdrop.style.display = "none"; },
      });
      gsap.to(drawer, {
        x: 320, duration: 0.38, ease: "power3.in",
        onComplete: () => { if (drawer) drawer.style.display = "none"; },
      });
    }
  }, [drawerOpen]);

  /* Accordion GSAP — skip first render */
  useEffect(() => {
    if (!mountedAccordion.current) {
      mountedAccordion.current = true;
      return;
    }

    // Fecha anterior
    const prev = prevAccordion.current;
    if (prev && prev !== openAccordion) {
      const el = subRefs.current[prev];
      if (el) {
        gsap.to(el, {
          height: 0, opacity: 0, duration: 0.3, ease: "power3.in",
          onComplete: () => { el.style.visibility = "hidden"; },
        });
      }
    }

    // Abre novo
    if (openAccordion) {
      const el = subRefs.current[openAccordion];
      if (el) {
        el.style.visibility = "visible";
        const h = el.scrollHeight;
        gsap.fromTo(el,
          { height: 0, opacity: 0 },
          { height: h, opacity: 1, duration: 0.42, ease: "power3.out" },
        );
      }
    }

    prevAccordion.current = openAccordion;
  }, [openAccordion]);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setOpenAccordion(null);
  }, []);

  /* ── GSAP hero entrance ── */
  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      const overlay    = scope.querySelector<HTMLElement>(`.${styles.overlay}`);
      const hud        = hudRef.current;
      const eyebrow    = scope.querySelector<HTMLElement>(`.${styles.eyebrow}`);
      const words      = scope.querySelectorAll<HTMLElement>(`.${styles.word}`);
      const sub        = scope.querySelector<HTMLElement>(`.${styles.sub}`);
      const cta        = scope.querySelector<HTMLElement>(`.${styles.cta}`);
      const scrollEl   = scope.querySelector<HTMLElement>(`.${styles.scroll}`);
      const scrollLine = scope.querySelector<HTMLElement>(`.${styles.scrollLine}`);

      gsap.set(overlay,  { opacity: 0 });
      gsap.set(hud,      { opacity: 0, y: -30 });
      gsap.set(eyebrow,  { opacity: 0, y: 24 });
      gsap.set(words,    { clipPath: "inset(100% 0 0 0)" });
      gsap.set(sub,      { opacity: 0, y: 28 });
      gsap.set(cta,      { opacity: 0, y: 24 });
      gsap.set(scrollEl, { opacity: 0 });

      const tl = gsap.timeline({
        delay: 0.4,
        defaults: { ease: "power3.out", force3D: true },
      });

      tl.to(overlay, { opacity: 1, duration: 0.85 })
        .to(hud,     { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        .to(eyebrow, { opacity: 1, y: 0, duration: 0.7 }, "-=0.35")
        .to(words, {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.95,
          stagger: 0.08,
          onComplete() { gsap.set(words, { clearProps: "will-change" }); },
        }, "-=0.3")
        .to(sub,      { opacity: 1, y: 0, duration: 0.85 }, "-=0.45")
        .to(cta,      { opacity: 1, y: 0, duration: 0.8  }, "-=0.4")
        .to(scrollEl, { opacity: 1, duration: 0.7 }, "-=0.35");

      const pulse = gsap.fromTo(
        scrollLine,
        { opacity: 0.3 },
        { opacity: 0.85, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1 },
      );

      const ctaGlow = gsap.fromTo(
        cta,
        { "--cta-glow": "0.35" },
        {
          "--cta-glow": "0.85",
          duration: 2.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        },
      );

      const fadeOut = gsap.to(scrollEl, {
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: scope, start: "top top", end: "+=100", scrub: 1 },
      });

      return () => {
        pulse.kill();
        ctaGlow.kill();
        fadeOut.scrollTrigger?.kill();
        fadeOut.kill();
      };
    },
    { scope: root },
  );

  return (
    <>
      {/* Backdrop e drawer: position fixed, fora da section para cobrir tela cheia */}
      <div
        ref={backdropRef}
        className={styles.backdrop}
        style={{ display: "none" }}
        onClick={closeDrawer}
      />

      <div ref={drawerRef} className={styles.drawer} style={{ display: "none" }}>
        <button className={styles.drawerClose} onClick={closeDrawer} aria-label="Fechar menu">
          ✕
        </button>

        <nav className={styles.drawerNav}>
          {navLinks.map((link) => (
            <div key={link.href} className={styles.drawerItem}>
              {link.sub ? (
                <>
                  <button
                    className={styles.drawerLinkBtn}
                    onClick={() => setOpenAccordion((p) => p === link.label ? null : link.label)}
                    aria-expanded={openAccordion === link.label}
                  >
                    <span>{link.label}</span>
                    <span className={`${styles.chevron} ${openAccordion === link.label ? styles.chevronOpen : ""}`}>
                      ›
                    </span>
                  </button>
                  <div
                    ref={(el) => { subRefs.current[link.label] = el; }}
                    className={styles.drawerSub}
                    style={{ visibility: "hidden", height: 0, overflow: "hidden" }}
                  >
                    {link.sub.map((s) => (
                      <a key={s.href} href={s.href} className={styles.drawerSubLink} onClick={closeDrawer}>
                        {s.label}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a href={link.href} className={styles.drawerLink} onClick={closeDrawer}>
                  {link.label}
                </a>
              )}
            </div>
          ))}
        </nav>
      </div>

      <section ref={root} className={styles.hero}>
      {/* HUD: position absolute dentro do hero — rola junto com o vídeo, some ao scrollar */}
      <header ref={hudRef} className={styles.hud}>
        <a href="#top" className={styles.logo} aria-label="WT Joias — início">
          <Image
            src="/logo.png"
            alt="WT Joias"
            width={680}
            height={680}
            sizes="(max-width: 640px) 58px, 84px"
            className={styles.logoImg}
            priority
          />
        </a>

        <nav className={styles.nav}>
          {navLinks.map((l) => (
            <a key={l.href} className={styles.navLink} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <button
          ref={burgerRef}
          className={styles.burger}
          aria-label="Menu"
          onClick={() => setDrawerOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </header>

      <video
        className={styles.video}
        src={videoSrc}
        autoPlay muted loop playsInline preload="auto"
      />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <span className={styles.eyebrow}>Banhado a Ouro 18k · Alta Qualidade</span>

        <h1 className={styles.headline} aria-label={lines.join(" ")}>
          {lines.map((line, li) => (
            <span
              key={li}
              style={{ display: "block" }}
              className={li === goldLineIndex ? styles.gold : undefined}
              aria-hidden
            >
              {line.split(/\s+/).filter(Boolean).map((w, wi) => (
                <span key={`${li}-${wi}`} className={styles.wordWrap}>
                  <span className={styles.word}>{w}</span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className={styles.sub}>{subHeadline}</p>

        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          <span className={styles.ctaInner}>
            {ctaLabel}
            <span className={styles.ctaArrow} aria-hidden>→</span>
          </span>
        </a>
      </div>

      <div className={styles.scroll}>
        <span className={styles.scrollText}>scroll</span>
        <span className={styles.scrollLine} />
      </div>
      </section>
    </>
  );
}
