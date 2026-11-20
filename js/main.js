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
