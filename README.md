# corcelli-dev

Portfólio de **Guilherme Corcelli**: desenvolvimento web e automação com IA, de São Paulo, aberto a trabalho remoto.

## O que tem no site

- **Abertura:** nome, apresentação e foto.
- **Sobre mim:** formação, experiência, como uso IA no desenvolvimento e as ferramentas do dia a dia. A trajetória aparece como uma linha que desce da foto.
- **Projetos:** três sistemas com print, destaques técnicos e link para o código.
- **Contato:** e-mail com os botões "Enviar e-mail" e "Copiar e-mail".

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
- Acessibilidade: navegação pelo teclado com foco visível, link para pular ao conteúdo, textos alternativos e respeito à opção "reduzir movimento".

## Estrutura

```
corcelli-dev/
├── index.html
├── css/
│   ├── base.css         # cores, tipografia e reset
│   ├── layout.css       # cabeçalho, seções e grade
│   └── components.css   # botões, trajetória, projetos e contato
├── js/
│   └── main.js          # animação da trajetória e cópia do e-mail
└── assets/
    ├── icons/
    │   └── favicon.svg
    └── images/
        ├── guilherme-corcelli.jpg
        └── projects/    # prints dos projetos (dados fictícios)
```

## Como ver localmente

É um site estático. Abra o `index.html` no navegador ou sirva a pasta:

```bash
python -m http.server 5510
```

Depois acesse http://localhost:5510.

## Contato

corcellidev@gmail.com
