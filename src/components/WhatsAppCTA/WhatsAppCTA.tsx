"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WhatsAppCTA.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

type Props = {
  phone: string;
  message?: string;
  eyebrow?: string;
  headline?: string;
  sub?: string;
};

function formatPhone(phone: string) {
  /* 5588994068397 → (88) 99406-8397 */
  const digits = phone.replace(/\D/g, "");
  const m = digits.match(/^55(\d{2})(\d{5})(\d{4})$/);
  if (!m) return phone;
  return `(${m[1]}) ${m[2]}-${m[3]}`;
}

export default function WhatsAppCTA({
  phone,
  message = "Olá! Acessei o site da WT Joias e gostaria de falar com um consultor.",
  eyebrow = "Pronto para encomendar?",
  headline = "FALE COM UM CONSULTOR VIP",
  sub = "Nossa equipe envia o catálogo do dia, cotação atualizada do grama do ouro e fotos reais das peças disponíveis. Atendimento rápido e discreto pelo WhatsApp.",
}: Props) {
  const root = useRef<HTMLElement>(null);
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const eyebrowEl  = section.querySelector<HTMLElement>(`.${styles.eyebrow}`);
      const headlineEl = section.querySelector<HTMLElement>(`.${styles.headline}`);
      const subEl      = section.querySelector<HTMLElement>(`.${styles.sub}`);
      const ctaEl      = section.querySelector<HTMLElement>(`.${styles.cta}`);
      const phoneEl    = section.querySelector<HTMLElement>(`.${styles.phone}`);

      gsap.set([eyebrowEl, headlineEl, subEl, ctaEl, phoneEl], {
        opacity: 0,
        y: 36,
      });

      gsap.to([eyebrowEl, headlineEl, subEl, ctaEl, phoneEl], {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.section} id="consultor">
      <span className={styles.eyebrow}>{eyebrow}</span>

      <h2 className={styles.headline}>{headline}</h2>

      <p className={styles.sub}>{sub}</p>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cta}
        aria-label="Falar com a WT Joias no WhatsApp"
      >
        <span className={styles.ctaIcon}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.558 4.14 1.535 5.878L.057 23.215a.75.75 0 0 0 .916.927l5.453-1.43A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.69 9.69 0 0 1-4.95-1.352l-.355-.213-3.676.964.983-3.589-.232-.368A9.696 9.696 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
          </svg>
        </span>
        Falar com a WT Joias
      </a>

      <span className={styles.phone}>{formatPhone(phone)} · Atendimento VIP</span>
    </section>
  );
}
