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
    title: "Banhado a Ouro 18k",
    text: "Todas as peças passam por processo de banho de ouro 18k, garantindo brilho intenso, acabamento espelhado e durabilidade no uso diário.",
  },
  {
    number: "02",
    title: "Acabamento Premium",
    text: "Peças com polimento espelhado, soldas imperceptíveis e fechos de alta segurança — atenção ao detalhe em cada centímetro.",
  },
  {
    number: "03",
    title: "Envio Seguro com Seguro",
    text: "Logística com seguro total para todo o Brasil. Sua joia chega em embalagem discreta e rastreada porta a porta.",
  },
];

export default function Conceito({
  eyebrow = "O Conceito",
  title = "ESTILO QUE SE PROVA EM CADA DETALHE.",
  body = "Na WT Joias, cada peça é cuidadosamente selecionada e acabada com banho de ouro 18k de alta qualidade, garantindo brilho duradouro e aparência premium. Modelos exclusivos com design sofisticado para quem exige o melhor.",
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
