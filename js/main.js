// Portfólio de Guilherme Corcelli. JavaScript puro, sem dependências.

const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Limita um número ao intervalo de 0 a 1
const limitar = (n) => Math.min(1, Math.max(0, n));

// 1) Menu do celular: abre e fecha o painel com os links.
const botaoMenu = document.querySelector(".menu-botao");
const listaMenu = document.querySelector(".menu-lista");

if (botaoMenu && listaMenu) {
  const fecharMenu = () => {
    botaoMenu.setAttribute("aria-expanded", "false");
    listaMenu.classList.remove("aberta");
  };

  botaoMenu.addEventListener("click", () => {
    const abrir = botaoMenu.getAttribute("aria-expanded") !== "true";
    botaoMenu.setAttribute("aria-expanded", String(abrir));
    listaMenu.classList.toggle("aberta", abrir);
  });

  // Ao escolher uma seção, o painel fecha sozinho
  listaMenu.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) fecharMenu();
  });

  // Esc fecha o painel e devolve o foco ao botão
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && listaMenu.classList.contains("aberta")) {
      fecharMenu();
      botaoMenu.focus();
    }
  });
}

// 2) Papel "digitado" na abertura: escreve, espera, apaga e passa para a próxima frase.
//    Com "reduzir movimento", fica só a primeira frase, parada.
const papel = document.querySelector(".papel-texto");
const frases = ["desenvolvimento web", "automação com IA", "do banco de dados à tela"];

if (papel && !reduzirMovimento) {
  let frase = 0;
  let letras = frases[0].length;
  let apagando = true;

  const passo = () => {
    const atual = frases[frase];
    letras += apagando ? -1 : 1;
    papel.textContent = atual.slice(0, letras);

    let espera = apagando ? 35 : 70;
    if (!apagando && letras === atual.length) {
      apagando = true;
      espera = 2200; // tempo para ler a frase inteira
    } else if (apagando && letras === 0) {
      apagando = false;
      frase = (frase + 1) % frases.length;
      espera = 350;
    }
    setTimeout(passo, espera);
  };

  // Começa com a primeira frase inteira na tela, como se já tivesse sido digitada
  setTimeout(passo, 2600);
}

// 3) Linha da trajetória: o desenho acompanha a rolagem.
//    No computador a trajetória fica fixa na tela (position: sticky no CSS) e
//    a linha avança conforme você rola a seção. No celular ela não fica fixa:
//    a linha é desenhada à medida que passa pela tela.
//    Quem pediu ao sistema para reduzir movimento vê a linha pronta, sem animação.
const linha = document.querySelector(".linha");
const trajetoria = document.querySelector(".trajetoria");
const cena = document.querySelector(".trajetoria-grade");
const estacoes = [...document.querySelectorAll(".estacao")];

// Quanto da trajetória já foi percorrido (0 a 1), conforme a posição na tela
function calcularProgresso() {
  const altura = window.innerHeight;

  if (getComputedStyle(trajetoria).position === "sticky") {
    // Modo fixo: avança do momento em que a trajetória gruda na tela
    // até o fim do espaço reservado pela seção.
    const topoFixo = parseFloat(getComputedStyle(trajetoria).top) || 0;
    const caixa = cena.getBoundingClientRect();
    const percurso = caixa.height - trajetoria.offsetHeight;
    // Começa um pouco antes de grudar, para a primeira estação já aparecer
    return percurso > 0 ? limitar((topoFixo + altura * 0.25 - caixa.top) / (percurso + altura * 0.25)) : 1;
  }

  // Modo solto (celular): desenha enquanto a linha cruza a tela
  const caixa = linha.getBoundingClientRect();
  return limitar((altura * 0.85 - caixa.top) / (altura * 0.25 + caixa.height));
}

function atualizarLinha() {
  const progresso = calcularProgresso();
  const total = estacoes.length;
  let atual = -1;

  estacoes.forEach((estacao, i) => {
    // Cada estação ocupa uma fatia igual do percurso
    const trecho = limitar(progresso * total - i);
    estacao.style.setProperty("--f", trecho.toFixed(4));
    estacao.classList.toggle("ativa", trecho > 0);
    if (trecho > 0) atual = i;
  });

  estacoes.forEach((estacao, i) => estacao.classList.toggle("atual", i === atual));
}

if (linha && trajetoria && cena && estacoes.length && !reduzirMovimento) {
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

// 4) Menu e "pasta" do cabeçalho: marcam a seção que está na tela.
//    aria-current também é anunciado por leitores de tela.
const linksMenu = [...document.querySelectorAll('.menu-lista a[href^="#"]')];
const caminho = document.querySelector(".marca-caminho");
const secoes = [...document.querySelectorAll("main > section[id]")];

if ("IntersectionObserver" in window && secoes.length) {
  const marcar = (id) => {
    linksMenu.forEach((link) => {
      if (link.getAttribute("href") === `#${id}`) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    if (caminho) caminho.textContent = id === "inicio" ? "~/" : `~/${id}`;
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

  secoes.forEach((secao) => vigia.observe(secao));
}

// 5) Copiar e-mail: clicar no endereço copia para a área de transferência
//    e confirma na tela o que aconteceu.
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
  botaoCopiar.addEventListener("click", async () => {
    const email = botaoCopiar.dataset.copiar;

    if (await copiarTexto(email)) {
      aviso.textContent = `E-mail copiado: ${email}. É só colar na sua mensagem.`;
    } else {
      aviso.textContent = `Não foi possível copiar. Selecione o endereço ${email} e copie manualmente.`;
    }
  });
}
