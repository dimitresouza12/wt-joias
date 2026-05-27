"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./Hero.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

type NavLink = { label: string; href: string };

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
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      const overlay    = scope.querySelector<HTMLElement>(`.${styles.overlay}`);
      const hud        = scope.querySelector<HTMLElement>(`.${styles.hud}`);
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
    <section ref={root} className={styles.hero}>
      <video
        className={styles.video}
        src={videoSrc}
        autoPlay muted loop playsInline preload="auto"
      />
      <div className={styles.overlay} />

      <header className={styles.hud}>
        <a href="#top" className={styles.logo} aria-label="WT Joias — início">
          <Image
            src="/logo.png"
            alt="WT Joias"
            width={680}
            height={680}
            className={styles.logoImg}
            priority
          />
        </a>
        <nav className={styles.nav}>
          {navLinks.map((l) => (
            <a key={l.href} className={styles.navLink} href={l.href}>{l.label}</a>
          ))}
        </nav>
      </header>

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
  );
}
