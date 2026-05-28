"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./VideoGaleria.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const VIDEOS = [
  "/pecas-video/video-01.mp4",
  "/pecas-video/video-02.mp4",
  "/pecas-video/video-03.mp4",
  "/pecas-video/video-04.mp4",
  "/pecas-video/video-05.mp4",
];

export default function VideoGaleria() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const header = section.querySelector<HTMLElement>(`.${styles.header}`);
      const items = section.querySelectorAll<HTMLElement>(`.${styles.item}`);

      gsap.set(header, { opacity: 0, y: 36 });
      gsap.to(header, {
        opacity: 1, y: 0, duration: 0.85, ease: "power3.out", force3D: true,
        scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none" },
      });

      // set ANTES do batch — senão elementos já em viewport disparam onEnter antes de serem ocultados
      gsap.set(items, { opacity: 0, y: 44 });

      ScrollTrigger.batch(Array.from(items), {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1, y: 0, duration: 0.75, stagger: 0.1,
            ease: "power3.out", force3D: true,
            onComplete: () => gsap.set(batch, { clearProps: "will-change" }),
          }),
        once: true,
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.section} id="videos">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Peças em movimento</span>
          <h2 className={styles.title}>VEJA O BRILHO DE PERTO</h2>
          <p className={styles.body}>
            Detalhes que foto não captura. Assista e veja o acabamento espelhado
            das peças banhadas a ouro 18k em movimento real.
          </p>
        </div>

        <div className={styles.grid}>
          {VIDEOS.map((src, i) => (
            <div key={i} className={styles.item}>
              <video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                className={styles.video}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
