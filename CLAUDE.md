# Regras do Projeto — WT Joias

## Marca
- Grife de joias em ouro 18k legítimo (750), público masculino de alto padrão.
- O site é Vitrine de Desejo. Sem e-commerce, sem preço estático, sem checkout.
- Toda conversão acontece via WhatsApp (botão fixo + CTAs internos com tags #QueroCordao, #QueroPingente, #QueroAcessorios).

## Animação
- Todo scroll usa Lenis. Nunca scroll nativo.
- Todo movimento usa GSAP. Nunca CSS transition em animações de entrada.
- Ease padrão do projeto: power3.out
- Duration mínima de entrada: 0.6s
- Nenhuma animação abaixo de 0.6s — sites cinematográficos são lentos com intenção.

## Lenis + ScrollTrigger
- Inicializar Lenis uma única vez no layout.tsx como Provider.
- Lenis deve alimentar o ScrollTrigger via lenis.on('scroll', ScrollTrigger.update).
- NUNCA usar window.addEventListener('scroll') quando Lenis estiver ativo.

## Componentes
- Um componente = um .tsx + um .module.css. Sem exceções.
- Sem Tailwind inline. Todo CSS em .module.css.
- Todo componente com GSAP: useGSAP do @gsap/react, cleanup no return.

## Paleta (variáveis em globals.css)
- --bg: #050505 (preto absoluto)
- --surface: #121212
- --gold: #c9a24c (ouro polido)
- Detalhes de destaque (bordas ativas, badges, anel pulsante) sempre em --gold.

## O que nunca fazer
- bounce ou elastic em qualquer animação
- ease-in-out (parece slideshow de PowerPoint)
- translateY menor que 24px em entradas (não tem peso visual)
- Duration round como 500ms ou 1000ms (parece relógio)
