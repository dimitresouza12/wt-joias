"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./ScrollCamera.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

type ImageCard = {
  type?: "image";
  src: string;
  alt: string;
  badge?: string;
  name: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type CtaCard = {
  type: "cta";
  badge?: string;
  name: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type CategoryCard = ImageCard | CtaCard;

type Props = {
  card1: CategoryCard;
  card2: CategoryCard;
  card3: CategoryCard;
  sectionTitle?: string;
  sectionId?: string;
};

function ImageCardEl({ card, slot }: { card: ImageCard; slot: string }) {
  return (
    <div className={`${styles.card} ${styles[slot as keyof typeof styles]}`}>
      {card.badge && <span className={styles.cardBadge}>{card.badge}</span>}
      <Image
        className={styles.cardImg}
        src={card.src}
        alt={card.alt}
        fill
        sizes="(max-width: 768px) 100vw, 26vw"
        style={{ objectFit: "cover" }}
      />
      <div className={styles.cardMeta}>
        <span className={styles.cardLabel}>{card.badge ?? ""}</span>
        <span className={styles.cardName}>{card.name}</span>
        {card.description && <span className={styles.cardDesc}>{card.description}</span>}
        {card.ctaHref && (
          <a href={card.ctaHref} target="_blank" rel="noopener noreferrer"
            className={styles.cardCta} onClick={(e) => e.stopPropagation()}>
            <span className={styles.cardCtaText}>{card.ctaLabel ?? "Ver Opções"}</span>
          </a>
        )}
      </div>
    </div>
  );
}

function CtaCardEl({ card, slot }: { card: CtaCard; slot: string }) {
  return (
    <div className={`${styles.card} ${styles[slot as keyof typeof styles]} ${styles.cardCtaOnly}`}>
      <div className={styles.ctaCardInner}>
        {card.badge && <span className={styles.ctaCardEyebrow}>{card.badge}</span>}
        <span className={styles.ctaCardTitle}>{card.name}</span>
        {card.description && <span className={styles.ctaCardDesc}>{card.description}</span>}
        {card.ctaHref && (
          <a href={card.ctaHref} target="_blank" rel="noopener noreferrer"
            className={styles.ctaCardBtn} onClick={(e) => e.stopPropagation()}>
            <span className={styles.ctaCardBtnInner}>
              {card.ctaLabel ?? "Ver no WhatsApp"}
              <span aria-hidden>→</span>
            </span>
          </a>
        )}
      </div>
    </div>
  );
}

function renderCard(card: CategoryCard, slot: string) {
  if (card.type === "cta") return <CtaCardEl key={slot} card={card} slot={slot} />;
  return <ImageCardEl key={slot} card={card as ImageCard} slot={slot} />;
}

export default function ScrollCamera({
  card1,
  card2,
  card3,
  sectionTitle = "COLEÇÃO",
  sectionId = "colecao",
}: Props) {
  const root      = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      const sticky  = stickyRef.current;
      if (!section || !sticky) return;

      const isMobile = () => window.innerWidth < 769;

      const titleEl = sticky.querySelector<HTMLElement>(`.${styles.title}`);
      const c1 = sticky.querySelector<HTMLElement>(`.${styles.card1}`);
      const c2 = sticky.querySelector<HTMLElement>(`.${styles.card2}`);
      const c3 = sticky.querySelector<HTMLElement>(`.${styles.card3}`);

      if (isMobile()) {
        const els = [c1, c2, c3].filter(Boolean) as HTMLElement[];
        gsap.set(els, { opacity: 0, y: 40 });
        ScrollTrigger.batch(els, {
          start: "top 90%",
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", force3D: true }),
          once: true,
        });
        return;
      }

      gsap.set(c1, { opacity: 0, x: "-120%", force3D: true });
      gsap.set(c2, { xPercent: -50, yPercent: -58, opacity: 0, y: 48, force3D: true });
      gsap.set(c3, { opacity: 0, x: "120%",  force3D: true });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          onUpdate: (self) => {
            const r = Math.round(5 + (18 - 5) * self.progress);
            sticky.style.background = `rgb(${r}, ${r}, ${r})`;
          },
        },
      });

      tl.to(c1, { opacity: 1, x: "0%", ease: "power3.out", force3D: true }, 0.13)
        .to(c2, { opacity: 1, y: 0,    ease: "power3.out", force3D: true }, 0.30)
        .to(c3, {
          opacity: 1, x: "0%", ease: "power3.out", force3D: true,
          onComplete: () => gsap.set([c1, c2, c3], { clearProps: "will-change" }),
        }, 0.47)
        .fromTo(titleEl, { y: 0 }, { y: -40, ease: "none", duration: 1 }, 0);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.section}>
      <div id={sectionId} className={styles.anchor} aria-hidden />
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.title}>
          <span className={styles.titleText}>{sectionTitle}</span>
        </div>
        <div className={styles.cards}>
          {renderCard(card1, "card1")}
          {renderCard(card2, "card2")}
          {renderCard(card3, "card3")}
        </div>
      </div>
    </section>
  );
}
