"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import styles from "./AnuncioBanner.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const ITEMS = [
  "♥ DIA DOS NAMORADOS",
  "20% OFF NA LINHA FEMININA",
  "VÁLIDO ATÉ 12/06",
  "CONJUNTOS BANHADOS A OURO 18K",
  "♥ SURPREENDA QUEM VOCÊ AMA",
  "20% OFF NA LINHA FEMININA",
  "VÁLIDO ATÉ 12/06",
  "♥ PRESENTES ÚNICOS E ESPECIAIS",
];

type Props = { ctaHref: string };

export default function AnuncioBanner({ ctaHref }: Props) {
  const root     = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  const dismiss = useCallback(() => {
    const el = root.current;
    if (!el) return;
    gsap.to(el, {
      height: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => setGone(true),
    });
  }, []);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      const ticker = gsap.to(track, {
        xPercent: -50,
        duration: 26,
        ease: "none",
        repeat: -1,
      });
      return () => { ticker.kill(); };
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div ref={root} className={styles.banner}>
      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        aria-label="Ver promoção Dia dos Namorados no WhatsApp"
      >
        <div ref={trackRef} className={styles.track}>
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span key={i} className={styles.item}>
              <span className={styles.dot} aria-hidden>·</span>
              <span className={item.startsWith("♥") ? styles.heart : styles.text}>
                {item}
              </span>
            </span>
          ))}
        </div>
      </a>
      <button className={styles.close} onClick={dismiss} aria-label="Fechar anúncio">
        ✕
      </button>
    </div>
  );
}
