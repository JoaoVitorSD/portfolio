# Portfólio — João Vitor Santana Depollo

Landing page pessoal de **João Vitor Santana Depollo**, Sênior Software Engineer.

🔗 **[joaovitorsd.github.io/portfolio](https://joaovitorsd.github.io/portfolio)**

## Sobre

Página estática em HTML, CSS e JavaScript puro — sem build, sem dependências, sem framework.
Basta abrir o `index.html` ou servir a pasta.

**Direção visual:** estética industrial/terminal — grafite quase preto, laranja-reator como
acento, tipografia técnica (Bricolage Grotesque + Sora + Martian Mono).

## Estrutura

```
├── index.html            # página completa
├── Joao-Vitor-Depollo-Curriculo.pdf   # currículo
└── assets/
    ├── css/styles.css    # estilos
    ├── js/main.js        # interações
    └── logos/            # logos das empresas e instituições
```

## Rodando localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Detalhes técnicos

- **Zero dependências** — apenas as fontes do Google Fonts
- **Responsivo** — grades colapsam em 3 → 2 → 1 coluna; sem overflow horizontal
- **Acessível** — `alt` em todas as imagens, HTML semântico, respeita `prefers-reduced-motion`
- **Animações** — revelação por `IntersectionObserver`, terminal com digitação, spotlight
  seguindo o cursor, contador animado

## Créditos das marcas

Os logos das empresas e instituições pertencem aos seus respectivos titulares e são usados
apenas para identificar a trajetória profissional e acadêmica. Cada arquivo em `assets/logos/`
tem a URL de origem anotada em comentário no `index.html`.

## Licença

O código é livre para uso e adaptação. O conteúdo pessoal (currículo, textos, logos de
terceiros) não está incluído nessa permissão.
