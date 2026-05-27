import Hero              from "@/components/Hero/Hero";
import Conceito          from "@/components/Conceito/Conceito";
import ScrollCamera      from "@/components/ScrollCamera/ScrollCamera";
import Galeria, { type Categoria } from "@/components/Galeria/Galeria";
import WhatsAppCTA       from "@/components/WhatsAppCTA/WhatsAppCTA";
import WhatsAppButton    from "@/components/WhatsAppButton/WhatsAppButton";
import PromoNamorados    from "@/components/PromoNamorados/PromoNamorados";
import AnuncioBanner     from "@/components/AnuncioBanner/AnuncioBanner";
import VideoGaleria      from "@/components/VideoGaleria/VideoGaleria";

const WA_PHONE = "5588994068397";
const WA_BASE  = `https://wa.me/${WA_PHONE}?text=`;

const enc = (s: string) => encodeURIComponent(s);

const MSG_CATALOGO    = enc("Olá! Acessei o site de vocês e gostaria de receber o catálogo de joias disponíveis banhadas a ouro 18k.");
const MSG_CORDAO      = enc("Olá! Tenho interesse nos cordões e correntes banhados a ouro 18k. Podem me mostrar os modelos disponíveis? #QueroCordao");
const MSG_PINGENTE    = enc("Olá! Tenho interesse em pingentes e peças personalizadas banhadas a ouro 18k. Podem me mostrar os modelos disponíveis? #QueroPingente");
const MSG_ACESSORIOS  = enc("Olá! Tenho interesse em pulseiras, anéis e dediras banhados a ouro 18k. Podem me mostrar os modelos disponíveis? #QueroAcessorios");
const MSG_CONSULTOR   = enc("Olá! Acessei o site da WT Joias e gostaria de falar com um consultor para ver as peças banhadas a ouro 18k disponíveis.");
const MSG_PROMO       = enc("Olá! Vi a promoção de Dia dos Namorados no site da WT Joias. Quero aproveitar os descontos especiais nos conjuntos femininos e kits masculinos. Podem me mostrar o que está disponível? #PromoNamorados");

const cotar = (nome: string, tag: string) =>
  WA_BASE + enc(`Olá! Vi no site da WT Joias a peça "${nome}" banhada a ouro 18k e gostaria de saber se está disponível e o valor. ${tag}`);

// ── helpers para gerar itens de catálogo ─────────────────────────────

const corrente2mm = (n: number) => {
  const num = String(n).padStart(2, "0");
  return {
    src: `/correntes-2mm/corrente-2mm-${num}.jpeg`,
    alt: `Corrente 2mm banhada a ouro 18k — modelo ${num}`,
    name: `Corrente 2mm · Modelo ${num}`,
    detail: "Banhada a ouro 18k",
    ctaHref: cotar(`Corrente 2mm Modelo ${num}`, "#QueroCorrente"),
  };
};

const corrente4mm = (n: number) => {
  const num = String(n).padStart(2, "0");
  return {
    src: `/correntes-4mm/corrente-4mm-${num}.jpeg`,
    alt: `Corrente 4mm+ banhada a ouro 18k — modelo ${num}`,
    name: `Corrente 4mm+ · Modelo ${num}`,
    detail: "Banhada a ouro 18k",
    ctaHref: cotar(`Corrente 4mm+ Modelo ${num}`, "#QueroCorrente"),
  };
};

const pingenteP = (n: number) => {
  const num = String(n).padStart(2, "0");
  return {
    src: `/pingentes-p/pingente-p-${num}.jpeg`,
    alt: `Pingente banhado a ouro 18k — correntes até 2mm — modelo ${num}`,
    name: `Pingente · Modelo ${num}`,
    detail: "Correntes até 2mm",
    ctaHref: cotar(`Pingente P${num} (correntes até 2mm)`, "#QueroPingente"),
  };
};

const pingenteM = (n: number) => {
  const num = String(n).padStart(2, "0");
  return {
    src: `/pingentes-m/pingente-m-${num}.jpeg`,
    alt: `Pingente grande banhado a ouro 18k — correntes até 6mm — modelo ${num}`,
    name: `Pingente · Modelo ${num}`,
    detail: "Correntes até 6mm",
    ctaHref: cotar(`Pingente M${num} (correntes até 6mm)`, "#QueroPingente"),
  };
};

const pulseira4mm = (n: number) => {
  const num = String(n).padStart(2, "0");
  return {
    src: `/pulseiras-4mm/pulseira-4mm-${num}.jpeg`,
    alt: `Pulseira 4mm+ banhada a ouro 18k — modelo ${num}`,
    name: `Pulseira 4mm+ · Modelo ${num}`,
    detail: "Banhada a ouro 18k",
    ctaHref: cotar(`Pulseira 4mm+ Modelo ${num}`, "#QueroAcessorios"),
  };
};

const pulseiraFina = (n: number) => {
  const num = String(n).padStart(2, "0");
  return {
    src: `/pulseiras-finas/pulseira-fina-${num}.jpeg`,
    alt: `Pulseira fina banhada a ouro 18k — modelo ${num}`,
    name: `Pulseira Fina · Modelo ${num}`,
    detail: "1mm · Banhada a ouro 18k",
    ctaHref: cotar(`Pulseira Fina Modelo ${num}`, "#QueroAcessorios"),
  };
};

// ── catálogo completo ─────────────────────────────────────────────────

const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

const categorias: Categoria[] = [
  {
    id: "catalogo-correntes-2mm",
    eyebrow: "Mais Vendidas · 2mm",
    title: "CORRENTES 2MM",
    description: "As mais vendidas da casa. Correntes finas banhadas a ouro 18k, perfeitas para usar com pingentes ou soltas. Elo fino, caimento leve e presença garantida.",
    group: "Correntes",
    pecas: range(11).map(corrente2mm),
  },
  {
    id: "catalogo-correntes-4mm",
    eyebrow: "Correntes · 4mm ou mais",
    title: "CORRENTES 4MM+",
    description: "Correntes com presença. Elos mais robustos, acabamento espelhado e fecho gaveta de segurança. Para quem quer ser visto.",
    group: "Correntes",
    pecas: range(10).map(corrente4mm),
  },
  {
    id: "catalogo-pingentes-p",
    eyebrow: "Pingentes · Correntes até 2mm",
    title: "PINGENTES FINOS",
    description: "Coleção de pingentes delicados banhados a ouro 18k. Servem em correntes de até 2mm. Crucifixos, medalhas e peças cravejadas.",
    group: "Pingentes",
    pecas: range(22).map(pingenteP),
  },
  {
    id: "catalogo-pingentes-m",
    eyebrow: "Pingentes · Correntes até 6mm",
    title: "PINGENTES GRANDES",
    description: "Pingentes com presença. Servem em correntes de até 6mm. Para quem busca um look mais imponente e marcante.",
    group: "Pingentes",
    pecas: range(12).map(pingenteM),
  },
  {
    id: "catalogo-pulseiras-finas",
    eyebrow: "Pulseiras · 1mm ou mais",
    title: "PULSEIRAS FINAS",
    description: "Pulseiras delicadas banhadas a ouro 18k. Elo fino, caimento suave. As mais buscadas para uso diário.",
    group: "Pulseiras",
    pecas: range(7).map(pulseiraFina),
  },
  {
    id: "catalogo-pulseiras-4mm",
    eyebrow: "Pulseiras · 4mm ou mais",
    title: "PULSEIRAS 4MM+",
    description: "Pulseiras com presença. Elo robusto, acabamento espelhado, fecho gaveta de segurança. Do modelo mais discreto ao mais imponente.",
    group: "Pulseiras",
    pecas: range(17).map(pulseira4mm),
  },
  {
    id: "catalogo-braceletes",
    eyebrow: "Braceletes",
    title: "BRACELETES",
    description: "Braceletes rígidos banhados a ouro 18k. Acabamento premium e presença de sobra no pulso.",
    group: "Braceletes",
    pecas: [
      {
        src: "/braceletes/bracelete-escamado-22mm.jpeg",
        alt: "Bracelete Escamado 22mm banhado a ouro 18k",
        name: "Bracelete Escamado 22mm",
        detail: "Elo escamado · Acabamento espelhado",
        ctaHref: cotar("Bracelete Escamado 22mm", "#QueroAcessorios"),
      },
      {
        src: "/braceletes/bracelete-escamado-22mm-b.jpeg",
        alt: "Bracelete Escamado 22mm variação banhado a ouro 18k",
        name: "Bracelete Escamado 22mm",
        detail: "Variação · Acabamento espelhado",
        ctaHref: cotar("Bracelete Escamado 22mm (var. B)", "#QueroAcessorios"),
      },
    ],
  },
];

export default function Page() {
  return (
    <main>
      {/* Faixa ticker — Promoção Dia dos Namorados */}
      <AnuncioBanner ctaHref={WA_BASE + MSG_PROMO} />

      {/* 01 — Hero */}
      <Hero
        videoSrc="/hero.mp4"
        lines={["O BRILHO DO OURO 18K.", "SUA MARCA REGISTRADA."]}
        goldLineIndex={1}
        subHeadline="Cordões, pulseiras e anéis com acabamento premium, banhados a ouro 18k. Peças com estilo e qualidade para quem valoriza presença. Escolha seu modelo."
        ctaLabel="VER CATÁLOGO COMPLETO NO WHATSAPP"
        ctaHref={WA_BASE + MSG_CATALOGO}
        navLinks={[
          { label: "Coleção",   href: "#colecao"   },
          { label: "Catálogo",  href: "#catalogo"  },
          { label: "Conceito",  href: "#conceito"  },
          { label: "Cotar",     href: "#consultor" },
        ]}
      />

      {/* 02 — Promoção Dia dos Namorados */}
      <PromoNamorados phone={WA_PHONE} igHandle="wtjoias18k" />

      {/* 03 — Conceito & Diferenciais */}
      <Conceito
        eyebrow="O Conceito"
        title="ESTILO QUE SE PROVA EM CADA DETALHE."
        body="Na WT Joias, cada peça é cuidadosamente selecionada e acabada com banho de ouro 18k de alta qualidade, garantindo brilho duradouro e aparência premium. Modelos exclusivos com design sofisticado para quem exige o melhor."
        diferenciais={[
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
            text: "Logística com seguro total para todo o Brasil. Sua joia chega em embalagem discreta e rastreada, porta a porta.",
          },
        ]}
      />

      {/* 04 — Vitrine cinematográfica */}
      <ScrollCamera
        sectionId="colecao"
        sectionTitle="COLEÇÃO"
        card1={{
          src: "/correntes-2mm/corrente-2mm-01.jpeg",
          alt: "Correntes e cordões banhados a ouro 18k",
          badge: "Cordões & Correntes",
          name: "PRESENÇA INCONFUNDÍVEL",
          description: "Correntes 2mm e 4mm+ com acabamento espelhado. Feitas para se destacar no dia a dia.",
          ctaLabel: "Ver Modelos Disponíveis",
          ctaHref: WA_BASE + MSG_CORDAO,
        }}
        card2={{
          src: "/pingentes-m/pingente-m-01.jpeg",
          alt: "Pingentes banhados a ouro 18k",
          badge: "Pingentes",
          name: "SUA HISTÓRIA EM OURO",
          description: "Crucifixos, medalhas e peças cravejadas. Suas conquistas em acabamento premium.",
          ctaLabel: "Ver Modelos Disponíveis",
          ctaHref: WA_BASE + MSG_PINGENTE,
        }}
        card3={{
          src: "/pulseiras-4mm/pulseira-4mm-01.jpeg",
          alt: "Pulseiras banhadas a ouro 18k",
          badge: "Pulseiras & Braceletes",
          name: "TOQUE FINAL DE PODER",
          description: "Pulseiras finas, 4mm+ e braceletes. A sofisticação que fecha o conjunto com autoridade.",
          ctaLabel: "Ver Modelos Disponíveis",
          ctaHref: WA_BASE + MSG_ACESSORIOS,
        }}
      />

      {/* 05 — Catálogo completo com fotos */}
      <Galeria categorias={categorias} />

      {/* 06 — Vídeos das peças */}
      <VideoGaleria />

      {/* 07 — CTA Final */}
      <WhatsAppCTA
        phone={WA_PHONE}
        message={decodeURIComponent(MSG_CONSULTOR)}
        eyebrow="Pronto para encomendar?"
        headline="FALE COM UM CONSULTOR"
        sub="Nossa equipe envia o catálogo do dia, fotos reais das peças disponíveis e todas as informações sobre os modelos banhados a ouro 18k. Atendimento rápido e discreto pelo WhatsApp."
      />

      {/* Botão flutuante */}
      <WhatsAppButton
        phone={WA_PHONE}
        message={decodeURIComponent(MSG_CONSULTOR)}
      />
    </main>
  );
}
