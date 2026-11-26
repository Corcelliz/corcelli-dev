# corcelli-dev

Portfólio de **Guilherme Corcelli**: desenvolvimento web e automação com IA, de São Paulo, aberto a trabalho remoto.

**Site no ar:** https://corcelliportfolio.vercel.app/ (hospedado na Vercel)

## O que tem no site

- **Abertura:** um prompt de terminal (`whoami`), nome, a função sendo digitada, apresentação, botões para os projetos e o GitHub e foto.
- **[01] Sobre mim:** formação, experiência, como trabalho e o que procuro, com cartões de fatos rápidos.
- **[02] Tecnologias:** uma grade de ícones com o que uso no dia a dia.
- **[03] Trajetória:** uma linha de estações. No computador ela fica fixa na tela e é desenhada conforme a rolagem.
- **[04] Projetos:** três sistemas em cartões, com o CRM em destaque. Cada um tem print, estudo de caso que abre e fecha (desafio, decisões, resultado e próximo passo) e link para o código.
- **[05] Contato:** e-mail em destaque (clicar copia) e atalhos para enviar e-mail, GitHub e o código deste site.
- **Página 404** própria, que leva de volta ao início ou aos projetos.

## Projetos apresentados

| Projeto | O que é | Código |
|---|---|---|
| CRM System | Gestão comercial com área do colaborador e do administrador (Node.js, Express, SQLite) | [crm-system](https://github.com/Corcelliz/crm-system) |
| tokenEye | App desktop que mostra o uso do plano do Claude (Electron) | [tokenEye](https://github.com/Corcelliz/tokenEye) |
| Supatasks | Lista de tarefas com Supabase e Row Level Security | [supatasks](https://github.com/Corcelliz/supatasks) |

## Tecnologias

- HTML, CSS e JavaScript puros, sem framework, sem dependências e sem etapa de build.
- Fontes **Archivo** (títulos), **Roboto** (textos) e **JetBrains Mono** (detalhes em estilo terminal), pelo Google Fonts.
- Ícones das tecnologias do [Simple Icons](https://simpleicons.org/) (licença CC0), reunidos em um único SVG.
- Tema claro e escuro automáticos, conforme o sistema de quem visita.
- Acessibilidade: navegação pelo teclado com foco visível, link para pular ao conteúdo, menu do celular que fecha com Esc, menu que indica a seção atual (`aria-current`), textos alternativos, contraste mínimo de 4,5:1 e respeito à opção "reduzir movimento".
- Desempenho: imagens em WebP (com PNG/JPG de reserva), carregamento preguiçoso dos prints e prioridade para a foto da abertura.
- Compartilhamento e busca: prévia com imagem (Open Graph), dados estruturados (`schema.org/Person`), `robots.txt` e `sitemap.xml`.

## Estrutura

```
corcelli-dev/
├── index.html
├── 404.html             # página de endereço não encontrado
├── robots.txt
├── sitemap.xml
├── css/
│   ├── base.css         # cores, tipografia e reset
│   ├── layout.css       # cabeçalho, menu, seções e grades
│   └── components.css   # botões, cartões, tecnologias, trajetória, projetos e contato
├── js/
│   └── main.js          # menu do celular, digitação, trajetória, seção atual e cópia do e-mail
└── assets/
    ├── icons/           # favicon, ícone para iPhone e tecnologias.svg (ícones)
    └── images/
        ├── guilherme-corcelli.jpg / .webp
        ├── og-image.png # prévia ao compartilhar o link
        └── projects/    # prints dos projetos (dados fictícios)
```

## Publicação

O site é publicado na **Vercel**. Como é estático e não tem etapa de build, a Vercel serve os arquivos como estão.

## Como ver localmente

É um site estático. Abra o `index.html` no navegador ou sirva a pasta:

```bash
python -m http.server 5510
```

Depois acesse http://localhost:5510.

## Contato

corcellidev@gmail.com
