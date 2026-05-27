"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Conceito.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

type Diferencial = { number: string; title: string; text: string };

type Props = {
  eyebrow?: string;
  title?: string;
  body?: string;
  diferenciais?: Diferencial[];
};

const DEFAULT_DIFERENCIAIS: Diferencial[] = [
  {
    number: "01",
    title: "Ouro 18k Legítimo",
    text: "Certificado de garantia eterna do teor do ouro 750. Cada peça acompanha laudo de autenticidade e marcação a fogo.",
  },
  {
    number: "02",
    title: "Acabamento Premium",
    text: "Peças maciças com polimento espelhado, soldas invisíveis e fechos gaveta de alta segurança que travam de verdade.",
  },
  {
    number: "03",
    title: "Envio Seguro com Seguro",
    text: "Logística blindada com seguro total para todo o Brasil. Sua joia chega em embalagem discreta e rastreada porta a porta.",
  },
];

export default function Conceito({
  eyebrow = "O Conceito",
  title = "AUTENTICIDADE SE PROVA EM CADA ELO.",
  body = "Na WT Joias, cada peça nasce de ouro 18k legítimo (750), trabalhada por ourives veteranos e finalizada com polimento espelhado. Não vendemos folheados, não vendemos banhados — entregamos patrimônio para ser usado todo dia.",
  diferenciais = DEFAULT_DIFERENCIAIS,
}: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const header = section.querySelector<HTMLElement>(`.${styles.header}`);
      const cards  = section.querySelectorAll<HTMLElement>(`.${styles.card}`);

      gsap.set(header, { opacity: 0, y: 40 });
      gsap.set(cards,  { opacity: 0, y: 36 });

      gsap.to(header, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out", force3D: true,
        scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none" },
      });

      gsap.to(cards, {
        opacity: 1, y: 0, duration: 0.85, stagger: 0.13, ease: "power3.out", force3D: true,
        scrollTrigger: { trigger: section, start: "top 72%", toggleActions: "play none none none" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.section} id="conceito">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.body}>{body}</p>
        </div>

        <div className={styles.grid}>
          {diferenciais.map((d) => (
            <div key={d.number} className={styles.card}>
              <span className={styles.number}>{d.number}</span>
              <h3 className={styles.cardTitle}>{d.title}</h3>
              <p className={styles.cardText}>{d.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
