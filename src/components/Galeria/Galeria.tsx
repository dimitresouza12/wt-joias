"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./Galeria.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export type Peca = {
  src: string;
  alt: string;
  name: string;
  detail?: string;
  ctaHref: string;
};

export type Categoria = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  group?: string;
  pecas: Peca[];
};

type Props = {
  sectionTitle?: string;
  sectionEyebrow?: string;
  sectionBody?: string;
  categorias: Categoria[];
};

export default function Galeria({
  sectionTitle = "CATÁLOGO ATUAL",
  sectionEyebrow = "Peças disponíveis",
  sectionBody = "Modelos fotografados no nosso showroom. Cotação do dia, peso exato e disponibilidade você confere direto pelo WhatsApp — basta tocar na peça desejada.",
  categorias,
}: Props) {
  const root = useRef<HTMLElement>(null);
  const [activeGroup, setActiveGroup] = useState<string>("todos");

  const groups: { key: string; label: string }[] = [
    { key: "todos", label: "TODOS" },
    ...Array.from(
      new Map(
        categorias
          .filter((c) => c.group)
          .map((c) => [c.group!, c.group!])
      ).entries()
    ).map(([key]) => ({
      key,
      label: key.toUpperCase(),
    })),
  ];

  const visible = activeGroup === "todos"
    ? categorias
    : categorias.filter((c) => c.group === activeGroup);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [activeGroup]);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const header = section.querySelector<HTMLElement>(`.${styles.header}`);

      gsap.set(header, { opacity: 0, y: 36 });
      gsap.to(header, {
        opacity: 1, y: 0, duration: 0.85, ease: "power3.out", force3D: true,
        scrollTrigger: { trigger: section, start: "top 82%", toggleActions: "play none none none" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.section} id="catalogo">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{sectionEyebrow}</span>
          <h2 className={styles.title}>{sectionTitle}</h2>
          <p className={styles.body}>{sectionBody}</p>
        </div>

        {groups.length > 1 && (
          <div className={styles.filterBar}>
            {groups.map((g) => (
              <button
                key={g.key}
                className={`${styles.filterBtn} ${activeGroup === g.key ? styles.filterActive : ""}`}
                onClick={() => setActiveGroup(g.key)}
              >
                {g.label}
              </button>
            ))}
          </div>
        )}

        {visible.map((cat) => (
          <CategoryBlock key={cat.id} cat={cat} />
        ))}
      </div>
    </section>
  );
}

function CategoryBlock({ cat }: { cat: Categoria }) {
  const blockRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const block = blockRef.current;
      if (!block) return;

      const blockHeader = block.querySelector<HTMLElement>(`.${styles.blockHeader}`);
      const items = block.querySelectorAll<HTMLElement>(`.${styles.item}`);

      gsap.set(blockHeader, { opacity: 0, y: 32 });
      gsap.set(items, { opacity: 0, y: 40 });

      gsap.to(blockHeader, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out", force3D: true,
        scrollTrigger: { trigger: block, start: "top 78%", toggleActions: "play none none none" },
      });

      ScrollTrigger.batch(Array.from(items), {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1, y: 0, duration: 0.75, stagger: 0.08,
            ease: "power3.out", force3D: true,
          }),
        once: true,
      });
    },
    { scope: blockRef },
  );

  return (
    <div ref={blockRef} id={cat.id} className={styles.block}>
      <div className={styles.blockHeader}>
        <span className={styles.blockEyebrow}>{cat.eyebrow}</span>
        <h3 className={styles.blockTitle}>{cat.title}</h3>
        <p className={styles.blockDesc}>{cat.description}</p>
      </div>

      <div className={styles.grid}>
        {cat.pecas.map((p, i) => (
          <a
            key={`${cat.id}-${i}`}
            href={p.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.item}
          >
            <div className={styles.itemImgWrap}>
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className={styles.itemImg}
                style={{ objectFit: "cover" }}
              />
              <div className={styles.itemOverlay}>
                <span className={styles.itemOverlayText}>Cotar no WhatsApp →</span>
              </div>
            </div>
            <div className={styles.itemMeta}>
              <span className={styles.itemName}>{p.name}</span>
              {p.detail && <span className={styles.itemDetail}>{p.detail}</span>}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
