"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PromoNamorados.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

type Peca = {
  src: string;
  name: string;
  detail?: string;
  price: string;
  waMsg: string;
};

type Props = {
  phone: string;
  igHandle?: string;
};

const HEARTS = [
  { top: "5%",  left: "2%",  fontSize: 22, opacity: 0.20, delay: 0.0, dy: 12, dur: 3.2 },
  { top: "9%",  left: "94%", fontSize: 17, opacity: 0.26, delay: 0.5, dy: 9,  dur: 2.8 },
  { top: "36%", left: "1%",  fontSize: 30, opacity: 0.11, delay: 0.8, dy: 15, dur: 3.6 },
  { top: "26%", left: "96%", fontSize: 19, opacity: 0.17, delay: 0.3, dy: 11, dur: 3.1 },
  { top: "60%", left: "3%",  fontSize: 15, opacity: 0.13, delay: 0.9, dy: 8,  dur: 2.9 },
  { top: "66%", left: "92%", fontSize: 26, opacity: 0.15, delay: 0.6, dy: 13, dur: 3.4 },
  { top: "82%", left: "50%", fontSize: 13, opacity: 0.09, delay: 1.1, dy: 7,  dur: 3.0 },
];

function PromoCard({ peca, phone, igHandle }: { peca: Peca; phone: string; igHandle: string }) {
  const [open, setOpen] = useState(false);
  const waHref = `https://wa.me/${phone}?text=${encodeURIComponent(peca.waMsg)}`;
  const igHref = igHandle ? `https://ig.me/m/${igHandle}` : "";

  return (
    <div className={styles.card}>
      <div
        className={styles.imgWrap}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`Comprar ${peca.name}`}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={peca.src} alt={peca.name} className={styles.img} loading="lazy" />
        <span className={styles.offBadge}>-20%</span>
        <div className={styles.imgHint} aria-hidden>
          <span className={styles.hintHeart}>♥</span>
          <span className={styles.hintText}>Toque para comprar</span>
        </div>

        <div
          className={styles.contactOverlay}
          style={{
            opacity:       open ? 1 : 0,
            visibility:    open ? "visible" : "hidden",
            pointerEvents: open ? "all" : "none",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeContact} onClick={() => setOpen(false)} aria-label="Fechar">✕</button>
          <span className={styles.contactHeart} aria-hidden>♥</span>
          <p className={styles.contactTitle}>Como prefere ser atendido?</p>
          <div className={styles.contactBtns}>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className={styles.waBtn} onClick={() => setOpen(false)}>
              <span className={styles.btnIcon}>💬</span> WhatsApp
            </a>
            {igHandle && (
              <a href={igHref} target="_blank" rel="noopener noreferrer" className={styles.igBtn} onClick={() => setOpen(false)}>
                <span className={styles.btnIcon}>📷</span> Instagram
              </a>
            )}
          </div>
        </div>
      </div>

      <div className={styles.meta}>
        <span className={styles.name}>{peca.name}</span>
        {peca.detail && <span className={styles.detail}>{peca.detail}</span>}
        <span className={styles.price}>{peca.price}</span>
      </div>
    </div>
  );
}

export default function PromoNamorados({ phone, igHandle = "" }: Props) {
  const root = useRef<HTMLElement>(null);

  const promoMsg = (nome: string, genero: "ela" | "ele") =>
    `Olá! Vi a promoção de Dia dos Namorados no site da WT Joias. Tenho interesse ${genero === "ela" ? "no conjunto" : "no kit"} "${nome}" com desconto especial. Está disponível? #PromoNamorados`;

  const femininos: Peca[] = [
    {
      src:    "/promocao-femininos/ponto-luz-marinho.jpeg",
      name:   "Conjunto Ponto de Luz Marinho",
      detail: "Colar + brincos · Banhado a ródio",
      price:  "R$ 239,90",
      waMsg:  promoMsg("Conjunto Ponto de Luz Marinho", "ela"),
    },
    {
      src:    "/promocao-femininos/pedras-preciosas-rodio.jpeg",
      name:   "Conjunto Pedras Preciosas",
      detail: "Colar + brincos · Banhado a ródio",
      price:  "R$ 269,90",
      waMsg:  promoMsg("Conjunto Pedras Preciosas – Ródio", "ela"),
    },
    {
      src:    "/promocao-femininos/pedras-preciosas-ouro.jpeg",
      name:   "Conjunto Pedras Preciosas",
      detail: "Colar + brincos · Banhado a ouro 18K",
      price:  "R$ 269,90",
      waMsg:  promoMsg("Conjunto Pedras Preciosas – Ouro 18K", "ela"),
    },
    {
      src:    "/promocao-femininos/coracao-zirconio-ouro.jpeg",
      name:   "Conjunto Coração Cravejado Zircônio",
      detail: "Colar + brincos · Banhado a ouro 18K",
      price:  "R$ 269,90",
      waMsg:  promoMsg("Conjunto Coração Cravejado Zircônio – Ouro 18K", "ela"),
    },
  ];

  const masculinos: Peca[] = [
    {
      src:   "/promocao-masculinos/kit-grummet-cristo.jpeg",
      name:  "Kit Grummet 2mm + Pingente Cristo na Cruz",
      price: "R$ 179,90",
      waMsg: promoMsg("Kit Grummet 2mm + Pingente Cristo na Cruz", "ele"),
    },
    {
      src:   "/promocao-masculinos/elo-alongado-cruz-palito.jpeg",
      name:  "Corrente Elo Alongado 2mm + Cruz Palito",
      price: "R$ 179,90",
      waMsg: promoMsg("Corrente Elo Alongado 2mm + Cruz Palito", "ele"),
    },
    {
      src:   "/promocao-masculinos/veneziana-cruz-palito.jpeg",
      name:  "Veneziana 1mm + Cruz Palito",
      price: "R$ 149,90",
      waMsg: promoMsg("Veneziana 1mm + Cruz Palito", "ele"),
    },
    {
      src:   "/promocao-masculinos/piastrine-cruz-amarrado.jpeg",
      name:  "Piastrine 2mm + Cruz Amarrado",
      price: "R$ 179,90",
      waMsg: promoMsg("Piastrine 2mm + Cruz Amarrado", "ele"),
    },
    {
      src:   "/promocao-masculinos/grummet-3x1-cruz-detalhado.jpeg",
      name:  "Grummet 3x1 2mm + Cruz Detalhado",
      price: "R$ 169,90",
      waMsg: promoMsg("Grummet 3x1 2mm + Cruz Detalhado", "ele"),
    },
    {
      src:   "/promocao-masculinos/cadeado-cruz-enrolado.jpeg",
      name:  "Cadeado 2mm + Cruz Enrolado",
      price: "R$ 179,90",
      waMsg: promoMsg("Cadeado 2mm + Cruz Enrolado", "ele"),
    },
  ];

  const generalMsg = `Olá! Vi a promoção de Dia dos Namorados no site da WT Joias. Quero aproveitar os descontos especiais. Podem me mostrar os produtos disponíveis? #PromoNamorados`;

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const badge      = section.querySelector<HTMLElement>(`.${styles.badge}`);
      const headline   = section.querySelector<HTMLElement>(`.${styles.headline}`);
      const pill       = section.querySelector<HTMLElement>(`.${styles.pill}`);
      const sub        = section.querySelector<HTMLElement>(`.${styles.sub}`);
      const subHeads   = section.querySelectorAll<HTMLElement>(`.${styles.subHead}`);
      const cards      = section.querySelectorAll<HTMLElement>(`.${styles.card}`);
      const footer     = section.querySelector<HTMLElement>(`.${styles.footer}`);
      const heartDecos = section.querySelectorAll<HTMLElement>(`.${styles.heartDeco}`);

      gsap.set([badge, headline, pill, sub, footer], { opacity: 0, y: 36 });
      gsap.set(subHeads, { opacity: 0, y: 28 });
      gsap.set(cards, { opacity: 0, y: 48 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 76%", toggleActions: "play none none none" },
        defaults: { ease: "power3.out", force3D: true },
      });

      tl.to(badge,    { opacity: 1, y: 0, duration: 0.7 })
        .to(headline, { opacity: 1, y: 0, duration: 0.85 }, "-=0.4")
        .to(pill,     { opacity: 1, y: 0, duration: 0.7  }, "-=0.5")
        .to(sub,      { opacity: 1, y: 0, duration: 0.65 }, "-=0.4")
        .to(subHeads, { opacity: 1, y: 0, duration: 0.65, stagger: 0.12 }, "-=0.3")
        .to(cards,    { opacity: 1, y: 0, duration: 0.75, stagger: 0.07 }, "-=0.4")
        .to(footer,   { opacity: 1, y: 0, duration: 0.7  }, "-=0.3");

      Array.from(heartDecos).forEach((el, i) => {
        const h = HEARTS[i];
        gsap.to(el, {
          y: -h.dy, rotation: i % 2 === 0 ? 6 : -6,
          duration: h.dur, ease: "sine.inOut", yoyo: true, repeat: -1, delay: h.delay,
        });
      });

      const pillGlow = gsap.fromTo(
        pill,
        { boxShadow: "0 0 20px rgba(201,162,76,0.12)" },
        { boxShadow: "0 0 44px rgba(201,162,76,0.38)", duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: -1 },
      );

      return () => { pillGlow.kill(); };
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.section} id="promo-namorados">
      <div className={styles.bg} aria-hidden />

      {HEARTS.map((h, i) => (
        <span key={i} className={styles.heartDeco} aria-hidden
          style={{ top: h.top, left: h.left, fontSize: h.fontSize + "px", opacity: h.opacity }}>
          ♥
        </span>
      ))}

      <div className={styles.inner}>

        {/* ── header ── */}
        <div className={styles.header}>
          <span className={styles.badge}>PROMOÇÃO ESPECIAL · DIA DOS NAMORADOS · 12/06</span>
          <h2 className={styles.headline}>
            SURPREENDA<br />
            <span className={styles.rose}>QUEM VOCÊ AMA</span>
            <span aria-hidden> ♥</span>
          </h2>
          <div className={styles.pill}>
            <span className={styles.pillDiscount}>20% OFF</span>
            <span className={styles.pillSub}>em toda a linha feminina e kits masculinos</span>
          </div>
          <p className={styles.sub}>
            Conjuntos e kits com desconto especial · Banhados a ouro 18K e ródio.{" "}
            <strong>Válido até 12/06.</strong>
          </p>
        </div>

        {/* ── femininos ── */}
        <div className={styles.subHead}>
          <span className={styles.subHeadLine} aria-hidden />
          <span className={styles.subHeadLabel}>♥ Para ela</span>
          <span className={styles.subHeadLine} aria-hidden />
        </div>
        <div className={`${styles.grid} ${styles.grid4}`}>
          {femininos.map((p, i) => (
            <PromoCard key={`f-${i}`} peca={p} phone={phone} igHandle={igHandle} />
          ))}
        </div>

        {/* ── masculinos ── */}
        <div className={styles.subHead}>
          <span className={styles.subHeadLine} aria-hidden />
          <span className={styles.subHeadLabel}>♥ Para ele</span>
          <span className={styles.subHeadLine} aria-hidden />
        </div>
        <div className={`${styles.grid} ${styles.grid3}`}>
          {masculinos.map((p, i) => (
            <PromoCard key={`m-${i}`} peca={p} phone={phone} igHandle={igHandle} />
          ))}
        </div>

        {/* ── footer ── */}
        <div className={styles.footer}>
          <p className={styles.validity}>
            Válido até <strong>12/06</strong> · Disponível enquanto durar o estoque
          </p>
          <a
            href={`https://wa.me/${phone}?text=${encodeURIComponent(generalMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            <span className={styles.ctaInner}>
              <span aria-hidden>♥</span>
              APROVEITAR A PROMOÇÃO NO WHATSAPP
              <span className={styles.ctaArrow} aria-hidden>→</span>
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}
