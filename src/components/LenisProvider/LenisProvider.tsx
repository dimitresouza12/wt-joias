"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = { children: React.ReactNode };

export default function LenisProvider({ children }: Props) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      /* iOS: multiplicador moderado para não sobrepor a inércia nativa */
      touchMultiplier: 1.0,
      infinite: false,
    });

    /* Lenis alimenta o ScrollTrigger a cada tick */
    lenis.on("scroll", ScrollTrigger.update);

    /* Expõe a instância para scripts (gravação de vídeo, debug) */
    (window as unknown as { lenis: typeof lenis }).lenis = lenis;

    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    /*
     * ScrollTrigger.refresh() só é chamado depois que:
     *   1. O evento "load" dispara (fontes, imagens, vídeo metadata)
     *   2. Dois frames passam para o Lenis calcular a altura real da página
     *
     * Chamar refresh() cedo demais causa cálculos errados de start/end
     * nos ScrollTriggers — erro clássico no Safari iOS.
     */
    const scheduleRefresh = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    };

    if (document.readyState === "complete") {
      scheduleRefresh();
    } else {
      window.addEventListener("load", scheduleRefresh, { once: true });
    }

    /* Intercepta cliques em links âncora e passa para o Lenis */
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { duration: 1.2, lock: false });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return <>{children}</>;
}
