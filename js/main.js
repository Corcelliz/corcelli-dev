// Portfólio de Guilherme Corcelli. JavaScript puro, sem dependências.

// 1) Linha da trajetória: desenhada uma única vez, quando aparece na tela.
//    Quem pediu ao sistema para reduzir movimento vê a linha pronta, sem animação.
const linha = document.querySelector(".linha");
const podeAnimar =
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (linha && podeAnimar) {
  document.documentElement.classList.add("anima");

  const observador = new IntersectionObserver(
    (entradas) => {
      if (entradas.some((entrada) => entrada.isIntersecting)) {
        linha.classList.add("visivel");
        observador.disconnect();
      }
    },
    { threshold: 0.25 }
  );

  observador.observe(linha);
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
