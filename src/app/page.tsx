import Hero          from "@/components/Hero/Hero";
import Conceito      from "@/components/Conceito/Conceito";
import ScrollCamera  from "@/components/ScrollCamera/ScrollCamera";
import Galeria, { type Categoria } from "@/components/Galeria/Galeria";
import WhatsAppCTA   from "@/components/WhatsAppCTA/WhatsAppCTA";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";

const WA_PHONE = "5588994068397";
const WA_BASE  = `https://wa.me/${WA_PHONE}?text=`;

const enc = (s: string) => encodeURIComponent(s);

/* Mensagens "macro" das categorias (CTAs do ScrollCamera) */
const MSG_CATALOGO    = enc("Olá! Acessei o site de vocês e gostaria de receber o catálogo de joias disponíveis hoje e fazer uma cotação em ouro 18k.");
const MSG_CORDAO      = enc("Olá! Tenho interesse nos cordões e correntes em ouro 18k. Podem me mostrar os modelos disponíveis e cotação do dia? #QueroCordao");
const MSG_PINGENTE    = enc("Olá! Tenho interesse em pingentes e peças personalizadas em ouro 18k. Podem me mostrar os modelos disponíveis? #QueroPingente");
const MSG_ACESSORIOS  = enc("Olá! Tenho interesse em pulseiras, anéis e dediras em ouro 18k. Podem me mostrar os modelos disponíveis? #QueroAcessorios");
const MSG_FEMININO    = enc("Olá! Tenho interesse nos cordões femininos em ouro 18k. Podem me mostrar os modelos disponíveis e cotação do dia? #QueroCordaoFeminino");
const MSG_CONSULTOR   = enc("Olá! Acessei o site da WT Joias e gostaria de falar com um consultor VIP para cotar uma peça em ouro 18k.");

/* Helper — gera link de cotação direta de uma peça */
const cotar = (nome: string, tag: string) =>
  WA_BASE + enc(`Olá! Vi no site da WT Joias a peça "${nome}" e queria saber se está disponível, o peso exato e a cotação do dia em ouro 18k. ${tag}`);

const categorias: Categoria[] = [
  {
    id: "catalogo-cordoes",
    eyebrow: "Cordões & Correntes",
    title: "CORDÕES & CORRENTES",
    description: "Peças maciças em ouro 18k legítimo, polimento espelhado e fecho gaveta. Pesos sob consulta — a cotação do dia define o valor final.",
    pecas: [
      { src: "/joias/cordoes/meia-cana.jpg",   alt: "Cordão Meia Cana em ouro 18k",         name: "Cordão Meia Cana",     detail: "Maciço · Acabamento espelhado",  ctaHref: cotar("Cordão Meia Cana 18k",      "#QueroCordao-MeiaCana") },
      { src: "/joias/cordoes/tijolinho-5mm.jpg", alt: "Cordão Tijolinho 5mm em ouro 18k",   name: "Cordão Tijolinho",     detail: "Elo 5mm · Trama fechada",        ctaHref: cotar("Cordão Tijolinho 5mm",      "#QueroCordao-Tijolinho") },
      { src: "/joias/cordoes/veneziana.jpg",   alt: "Corrente Veneziana fina em ouro 18k", name: "Corrente Veneziana",   detail: "Modelo fino · Caimento perfeito", ctaHref: cotar("Corrente Veneziana fina",   "#QueroCordao-Veneziana") },
      { src: "/joias/cordoes/escapulario.jpg", alt: "Escapulário em ouro 18k",              name: "Escapulário",          detail: "Tradicional · Duas medalhas",    ctaHref: cotar("Escapulário 18k",            "#QueroCordao-Escapulario") },
    ],
  },
  {
    id: "catalogo-femininos",
    eyebrow: "Linha Feminina",
    title: "CORDÕES FEMININOS",
    description: "Correntes finas em ouro 18k com pingentes delicados — solitários, medalhas devocionais e peças cravejadas. Pesos leves, caimento perfeito para uso diário.",
    pecas: [
      { src: "/joias/cordoes-femininos/pave-redondo.jpg",       alt: "Cordão feminino com pingente redondo cravejado em ouro 18k",  name: "Cordão Pavé Redondo",      detail: "Pingente cravejado · Veneziana fina", ctaHref: cotar("Cordão Pavé Redondo (feminino)",      "#QueroCordaoFem-PaveRedondo") },
      { src: "/joias/cordoes-femininos/solitario-zirconia.jpg", alt: "Cordão feminino com solitário de zircônia em ouro 18k",       name: "Cordão Solitário",         detail: "Ponto de luz · Corrente delicada",    ctaHref: cotar("Cordão Solitário Zircônia (feminino)", "#QueroCordaoFem-Solitario") },
      { src: "/joias/cordoes-femininos/abencoada.jpg",          alt: "Cordão feminino com medalha Abençoada em ouro 18k",            name: "Cordão Abençoada",         detail: "Medalha gravada · Corrente fina",     ctaHref: cotar("Cordão Abençoada (feminino)",          "#QueroCordaoFem-Abencoada") },
      { src: "/joias/cordoes-femininos/espirito-santo.jpg",     alt: "Cordão feminino com medalha Divino Espírito Santo em ouro 18k", name: "Cordão Espírito Santo",   detail: "Medalha devocional · Pomba em relevo", ctaHref: cotar("Cordão Espírito Santo (feminino)",     "#QueroCordaoFem-EspiritoSanto") },
      { src: "/joias/cordoes-femininos/gota-cravejada.jpg",     alt: "Cordão feminino com pingente gota cravejada em ouro 18k",      name: "Cordão Gota Cravejada",    detail: "Statement · Pavé completo",           ctaHref: cotar("Cordão Gota Cravejada (feminino)",     "#QueroCordaoFem-GotaCravejada") },
    ],
  },
  {
    id: "catalogo-pingentes",
    eyebrow: "Pingentes & Personalizados",
    title: "PINGENTES & PERSONALIZADOS",
    description: "Crucifixos, medalhas e peças cravejadas. Encomende personalizações — placas, letras e cifrões sob medida em ouro 18k maciço.",
    pecas: [
      { src: "/joias/pingentes/cruz-cravejada.jpg",    alt: "Pingente Cruz Cravejada em ouro 18k",    name: "Cruz Cravejada",        detail: "Pedraria · Pavé completo",        ctaHref: cotar("Pingente Cruz Cravejada",   "#QueroPingente-CruzCravejada") },
      { src: "/joias/pingentes/cruz.jpg",              alt: "Pingente Cruz lisa em ouro 18k",         name: "Cruz Clássica",         detail: "Lisa · Polimento espelhado",      ctaHref: cotar("Pingente Cruz Clássica",     "#QueroPingente-Cruz") },
      { src: "/joias/pingentes/nossa-senhora.jpg",     alt: "Pingente Nossa Senhora em ouro 18k",     name: "Medalha Nossa Senhora", detail: "Devocional · Detalhes em relevo", ctaHref: cotar("Medalha Nossa Senhora",      "#QueroPingente-NossaSenhora") },
    ],
  },
  {
    id: "catalogo-pulseiras-aneis",
    eyebrow: "Pulseiras & Anéis",
    title: "PULSEIRAS & ANÉIS",
    description: "Pulseiras maciças com fecho gaveta e anéis com presença. Sob medida em tamanho e gramatura — fechamos do mais discreto ao mais imponente.",
    pecas: [
      { src: "/joias/pulseiras/6mm.jpg",        alt: "Pulseira 6mm em ouro 18k",          name: "Pulseira 6mm",         detail: "Elo robusto · Imponente",        ctaHref: cotar("Pulseira 6mm",          "#QueroAcessorios-Pulseira6mm") },
      { src: "/joias/pulseiras/4mm.jpg",        alt: "Pulseira 4mm em ouro 18k",          name: "Pulseira 4mm",         detail: "Elo equilibrado · Versátil",     ctaHref: cotar("Pulseira 4mm",          "#QueroAcessorios-Pulseira4mm") },
      { src: "/joias/pulseiras/baiana-3mm.jpg", alt: "Pulseira Baiana 3mm em ouro 18k",   name: "Pulseira Baiana 3mm",  detail: "Trançada · Caimento fluido",     ctaHref: cotar("Pulseira Baiana 3mm",   "#QueroAcessorios-PulseiraBaiana") },
      { src: "/joias/pulseiras/cadeada.jpg",    alt: "Pulseira Cadeada em ouro 18k",      name: "Pulseira Cadeada",     detail: "Elo cadeado · Visual masculino", ctaHref: cotar("Pulseira Cadeada",      "#QueroAcessorios-PulseiraCadeada") },
      { src: "/joias/aneis/dedeira.jpg",        alt: "Anel Dedeira em ouro 18k",          name: "Anel Dedeira",         detail: "Maciço · Pegada forte",          ctaHref: cotar("Anel Dedeira",          "#QueroAcessorios-AnelDedeira") },
    ],
  },
];

export default function Page() {
  return (
    <main>
      {/* 01 — Hero */}
      <Hero
        videoSrc="/hero.mp4"
        lines={["O PODER DO OURO 18K.", "SUA MARCA REGISTRADA."]}
        goldLineIndex={1}
        subHeadline="Cordões, pulseiras e anéis imponentes projetados para quem não aceita menos que o topo. Peças legítimas com garantia eterna de autenticidade. Escolha seu estilo."
        ctaLabel="VER CATÁLOGO COMPLETO NO WHATSAPP"
        ctaHref={WA_BASE + MSG_CATALOGO}
        navLinks={[
          { label: "Coleção",   href: "#colecao"   },
          { label: "Catálogo",  href: "#catalogo"  },
          { label: "Conceito",  href: "#conceito"  },
          { label: "Cotar",     href: "#consultor" },
        ]}
      />

      {/* 02 — Conceito & Diferenciais */}
      <Conceito
        eyebrow="O Conceito"
        title="AUTENTICIDADE SE PROVA EM CADA ELO."
        body="Na WT Joias, cada peça nasce de ouro 18k legítimo (750), trabalhada por ourives veteranos e finalizada com polimento espelhado. Não vendemos folheados, não vendemos banhados — entregamos patrimônio para ser usado todo dia."
        diferenciais={[
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
        ]}
      />

      {/* 03 — Vitrine cinematográfica */}
      <ScrollCamera
        sectionId="colecao"
        sectionTitle="COLEÇÃO"
        card1={{
          src: "/joias/cordoes/meia-cana.jpg",
          alt: "Cordões e correntes em ouro 18k — Grumet, Cartier, Veneziana e Piastrine",
          badge: "Cordões & Correntes",
          name: "PRESENÇA INCONFUNDÍVEL",
          description: "Grumet, Cartier, Cordão Baiano e Piastrine. Correntes maciças, feitas para se destacar.",
          ctaLabel: "Ver Modelos Disponíveis",
          ctaHref: WA_BASE + MSG_CORDAO,
        }}
        card2={{
          src: "/joias/pingentes/cruz-cravejada.jpg",
          alt: "Pingentes e personalizados em ouro 18k — crucifixos, placas e letras",
          badge: "Pingentes & Personalizados",
          name: "SUA HISTÓRIA EM OURO",
          description: "Crucifixos, placas, letras cravejadas e cifrões. Suas conquistas em peças maciças.",
          ctaLabel: "Ver Modelos Disponíveis",
          ctaHref: WA_BASE + MSG_PINGENTE,
        }}
        card3={{
          src: "/joias/pulseiras/cadeada.jpg",
          alt: "Pulseiras, anéis e dediras em ouro 18k — elo duplo e dediras",
          badge: "Pulseiras & Anéis",
          name: "TOQUE FINAL DE PODER",
          description: "Pulseiras maciças, dediras e anéis. A sofisticação que fecha o conjunto com autoridade.",
          ctaLabel: "Ver Modelos Disponíveis",
          ctaHref: WA_BASE + MSG_ACESSORIOS,
        }}
      />

      {/* 04 — Catálogo real com fotos */}
      <Galeria categorias={categorias} />

      {/* 05 — CTA Final */}
      <WhatsAppCTA
        phone={WA_PHONE}
        message={decodeURIComponent(MSG_CONSULTOR)}
        eyebrow="Pronto para encomendar?"
        headline="FALE COM UM CONSULTOR VIP"
        sub="Nossa equipe envia o catálogo do dia, cotação atualizada do grama do ouro e fotos reais das peças disponíveis. Atendimento rápido e discreto pelo WhatsApp."
      />

      {/* Botão flutuante com anel dourado */}
      <WhatsAppButton
        phone={WA_PHONE}
        message={decodeURIComponent(MSG_CONSULTOR)}
      />
    </main>
  );
}
