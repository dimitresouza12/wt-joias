"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WhatsAppButton.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

type Props = {
  phone: string;
  message?: string;
};

export default function WhatsAppButton({
  phone,
  message = "Olá! Acessei o site da WT Joias e gostaria de cotar uma peça em ouro 18k.",
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const magnetRef  = useRef<HTMLAnchorElement>(null);
  const labelRef   = useRef<HTMLSpanElement>(null);
  const ringRef    = useRef<HTMLSpanElement>(null);

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const ring    = ringRef.current;
      if (!wrapper || !ring) return;

      gsap.set(wrapper, { opacity: 0, y: 24 });
      const entrance = gsap.to(wrapper, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: {
          trigger: "#conceito",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      /* anel dourado pulsante — sine.inOut como pedido no briefing */
      const pulse = gsap.fromTo(
        ring,
        { opacity: 0, scale: 1 },
        {
          opacity: 0.65,
          scale: 1.1,
          duration: 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        },
      );

      return () => {
        entrance.scrollTrigger?.kill();
        entrance.kill();
        pulse.kill();
      };
    },
    { scope: wrapperRef },
  );

  /* Magnetic effect */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const btn = magnetRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width  / 2)) * 0.3;
      const dy = (e.clientY - (rect.top  + rect.height / 2)) * 0.3;
      gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
    },
    [],
  );

  const handleMouseEnter = useCallback(() => {
    gsap.to(labelRef.current, { maxWidth: 240, opacity: 1, duration: 0.3, ease: "power2.out" });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(magnetRef.current, { x: 0, y: 0, duration: 0.55, ease: "power3.out" });
    gsap.to(labelRef.current,  { maxWidth: 0, opacity: 0, duration: 0.22, ease: "power2.in" });
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {/* Anel dourado pulsante — fora do botão para não ser clipado */}
      <span ref={ringRef} className={styles.ring} aria-hidden />

      <a
        ref={magnetRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Falar com a WT Joias no WhatsApp"
      >
        <span ref={labelRef} className={styles.label}>
          Falar com Consultor VIP / Cotar Peça
        </span>
        <span className={styles.icon}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.558 4.14 1.535 5.878L.057 23.215a.75.75 0 0 0 .916.927l5.453-1.43A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.69 9.69 0 0 1-4.95-1.352l-.355-.213-3.676.964.983-3.589-.232-.368A9.696 9.696 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
          </svg>
        </span>
      </a>
    </div>
  );
}
