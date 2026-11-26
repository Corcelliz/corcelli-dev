// Portfólio de Guilherme Corcelli. JavaScript puro, sem dependências.

// 1) Linha da trajetória: o desenho acompanha a rolagem.
//    No computador a trajetória fica fixa na tela (position: sticky no CSS) e
//    a linha avança conforme você rola a seção. No celular ela não fica fixa:
//    a linha é desenhada à medida que passa pela tela.
//    Quem pediu ao sistema para reduzir movimento vê a linha pronta, sem animação.
const linha = document.querySelector(".linha");
const trajetoria = document.querySelector(".trajetoria");
const cena = document.querySelector(".sobre .container");
const estacoes = [...document.querySelectorAll(".estacao")];
const podeAnimar = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Limita um número ao intervalo de 0 a 1
const limitar = (n) => Math.min(1, Math.max(0, n));

// Quanto da trajetória já foi percorrido (0 a 1), conforme a posição na tela
function calcularProgresso() {
  const altura = window.innerHeight;

  if (getComputedStyle(trajetoria).position === "sticky") {
    // Modo fixo: avança do momento em que a trajetória gruda na tela
    // até o fim do espaço reservado pela seção.
    const topoFixo = parseFloat(getComputedStyle(trajetoria).top) || 0;
    const caixa = cena.getBoundingClientRect();
    const percurso = caixa.height - trajetoria.offsetHeight;
    return percurso > 0 ? limitar((topoFixo - caixa.top) / percurso) : 1;
  }

  // Modo solto (celular): desenha enquanto a linha cruza a tela
  const caixa = linha.getBoundingClientRect();
  return limitar((altura * 0.85 - caixa.top) / (altura * 0.25 + caixa.height));
}

function atualizarLinha() {
  const progresso = calcularProgresso();
  const total = estacoes.length;
  let atual = -1;

  linha.style.setProperty("--p", progresso.toFixed(4));

  estacoes.forEach((estacao, i) => {
    // Cada estação ocupa uma fatia igual do percurso
    const trecho = limitar(progresso * total - i);
    estacao.style.setProperty("--f", trecho.toFixed(4));
    estacao.classList.toggle("ativa", trecho > 0);
    if (trecho > 0) atual = i;
  });

  estacoes.forEach((estacao, i) => estacao.classList.toggle("atual", i === atual));
}

if (linha && trajetoria && cena && estacoes.length && podeAnimar) {
  document.documentElement.classList.add("anima");

  // Recalcula no máximo uma vez por quadro, para a rolagem ficar leve
  let agendado = false;
  const aoRolar = () => {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(() => {
      agendado = false;
      atualizarLinha();
    });
  };

  window.addEventListener("scroll", aoRolar, { passive: true });
  window.addEventListener("resize", aoRolar);
  atualizarLinha();
}

// 2) Copiar e-mail: alternativa ao "Enviar e-mail" para quem não usa
//    um programa de e-mail no computador. Confirma na tela o que aconteceu.
const botaoCopiar = document.querySelector("[data-copiar]");
const aviso = document.querySelector(".aviso");

// Copia pelo jeito moderno; se o navegador bloquear, tenta o jeito antigo
// (um campo de texto temporário + execCommand), que ainda funciona em muitos casos.
async function copiarTexto(texto) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    const campo = document.createElement("textarea");
    campo.value = texto;
    campo.setAttribute("readonly", "");
    campo.style.position = "fixed";
    campo.style.opacity = "0";
    document.body.append(campo);
    campo.select();
    const copiou = document.execCommand("copy");
    campo.remove();
    return copiou;
  }
}

if (botaoCopiar && aviso) {
  const textoOriginal = botaoCopiar.textContent.trim();

  botaoCopiar.addEventListener("click", async () => {
    const email = botaoCopiar.dataset.copiar;

    if (await copiarTexto(email)) {
      botaoCopiar.textContent = "E-mail copiado";
      aviso.textContent = `${email} foi copiado. É só colar no seu e-mail.`;
      setTimeout(() => {
        botaoCopiar.textContent = textoOriginal;
      }, 2500);
    } else {
      aviso.textContent = `Não foi possível copiar. Selecione o endereço ${email} e copie manualmente.`;
    }
  });
}

// 3) Menu: marca a seção que está na tela, para quem rola saber onde está.
//    Usa aria-current, que leitores de tela também anunciam.
const linksMenu = [...document.querySelectorAll('.menu a[href^="#"]:not(.botao)')];
const secoesMenu = linksMenu
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && secoesMenu.length) {
  const marcar = (id) => {
    linksMenu.forEach((link) => {
      if (link.getAttribute("href") === `#${id}`) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  // A seção "atual" é a que cruza uma faixa fina perto do topo da tela
  const vigia = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) marcar(entrada.target.id);
      });
    },
    { rootMargin: "-30% 0px -65% 0px" }
  );

  secoesMenu.forEach((secao) => vigia.observe(secao));

  // Na abertura, nenhum item fica marcado
  const abertura = document.querySelector(".abertura");
  if (abertura) {
    new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) marcar(null);
      },
      { rootMargin: "-30% 0px -65% 0px" }
    ).observe(abertura);
  }
}
