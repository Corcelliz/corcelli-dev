# corcelli-dev

Portfólio de **Guilherme Corcelli**: desenvolvimento web e automação com IA, de São Paulo, aberto a trabalho remoto.

**Site no ar:** https://corcelliportfolio.vercel.app/ (hospedado na Vercel)

## O que tem no site

- **Abertura:** nome, apresentação, foto e um atalho para os três projetos.
- **Sobre mim:** formação, experiência, o que procuro e as ferramentas, cada uma com o projeto em que foi usada. A trajetória aparece como uma linha que desce da foto: no computador ela fica fixa na tela e é desenhada conforme a rolagem.
- **Projetos:** três sistemas, cada um como um estudo de caso curto (desafio, decisões, resultado e próximo passo), com print e link para o código.
- **Contato:** e-mail com os botões "Enviar e-mail" e "Copiar e-mail".
- **Página 404** própria, que leva de volta ao início ou aos projetos.

## Projetos apresentados

| Projeto | O que é | Código |
|---|---|---|
| CRM System | Gestão comercial com área do colaborador e do administrador (Node.js, Express, SQLite) | [crm-system](https://github.com/Corcelliz/crm-system) |
| tokenEye | App desktop que mostra o uso do plano do Claude (Electron) | [tokenEye](https://github.com/Corcelliz/tokenEye) |
| Supatasks | Lista de tarefas com Supabase e Row Level Security | [supatasks](https://github.com/Corcelliz/supatasks) |

## Tecnologias

- HTML, CSS e JavaScript puros, sem framework, sem dependências e sem etapa de build.
- Fontes **Archivo** (títulos) e **Roboto** (textos), pelo Google Fonts.
- Tema claro e escuro automáticos, conforme o sistema de quem visita.
- Acessibilidade: navegação pelo teclado com foco visível, link para pular ao conteúdo, menu que indica a seção atual (`aria-current`), textos alternativos, contraste mínimo de 4,5:1 e respeito à opção "reduzir movimento".
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
│   ├── layout.css       # cabeçalho, seções e grade
│   └── components.css   # botões, trajetória, projetos e contato
├── js/
│   └── main.js          # trajetória guiada pela rolagem, menu e cópia do e-mail
└── assets/
    ├── icons/           # favicon e ícone para iPhone
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
