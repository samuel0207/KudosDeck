# KudosDeck 🚀 — Plataforma de Prova Social & Wall of Love (Micro-SaaS)

**KudosDeck** é uma aplicação Web completa (Micro-SaaS) construída com **React**, **Tailwind CSS v4** e **Lucide React**, projetada para permitir que fundadores, criadores e equipes gerenciem prova social e exibam depoimentos autênticos em um elegante **Mural de Amor (Wall of Love)**.

---

## 🎨 Identidade Visual & Design System

- **Paleta Primária**: Laranja simples e elegante (`#ea580c` / `orange-600`) para ações e destaques.
- **Fundo**: Slate (`#f8fafc` / `slate-50`) com cards em branco puro e sombras suaves.
- **Tipografia**: *Plus Jakarta Sans* e *Inter* via Google Fonts.
- **Micro-interações**: Efeito de celebração com confetes (`canvas-confetti`), transições fluidas e sistema de feedback com Toasts flutuantes.

---

## ⚡ As 3 Partes Principais da Interface

### 1. Dashboard Principal
- **Métricas SaaS em Tempo Real**:
  - Total de depoimentos coletados.
  - Depoimentos aprovados e taxa de conversão.
  - Depoimentos pendentes de moderação.
  - Avaliação média com estrelas (Rating).
- **Cards Modernos de Depoimentos**:
  - Foto de perfil do cliente com fallback inteligente para avatares iniciais.
  - Nome, Cargo e Empresa com selo de verificação (*Cliente Verificado*).
  - Classificação de 1 a 5 estrelas.
  - Badge de status com código de cores:
    - **Aprovado** (Verde / Emerald com ícone de check)
    - **Pendente** (Âmbar / Amarelo com ícone de relógio)
  - **Toggle de Aprovação**: Alterne instantaneamente entre Pendente e Aprovado com um clique no switch.
  - **Botão de Deletar**: Com confirmação rápida inline para evitar exclusões acidentais.
- **Filtros e Busca**:
  - Filtro por status (`Todos`, `Aprovados`, `Pendentes`).
  - Busca em tempo real por nome do cliente, empresa, cargo ou palavras-chave do depoimento.
  - Ação em lote: "Aprovar Todos os Pendentes".

### 2. Editor de Formulário
- **Layout Split-Screen (Lado a Lado)**:
  - **Painel Esquerdo (Configurações)**:
    - Edição em tempo real do Título, Subtítulo, Nome da Marca e Texto do Botão.
    - Mensagem customizada de agradecimento.
    - Toggles para ativar/desativar estrelas e URL de foto de perfil.
    - URL pública compartilhável com botão de cópia com um clique.
  - **Painel Direito (Preview Interativo ao Vivo)**:
    - Mockup fidedigno da experiência do cliente.
    - **Campos**: Nome Completo, Cargo & Empresa, Foto URL (com seletores rápidos de demonstração) e Depoimento.
    - **Interatividade Completa**: Você pode preencher o formulário no preview e enviá-lo! O depoimento é injetado diretamente no estado do KudosDeck e entra como **Pendente** no Dashboard.

### 3. Widget Preview: Mural de Amor (Wall of Love)
- **Layout Masonry Grid Responsivo**:
  - Exibe exclusivamente os depoimentos com status **Aprovado**.
  - Distribuição dinâmica em colunas (1 coluna em dispositivos móveis, 2 ou 3 no desktop).
  - Cartões com tipografia limpa, aspas estilizadas em marca d'água, avatar, estrelas e data.
- **Barra de Customização do Widget**:
  - Alternador de Temas: **Claro** (Slate Modern), **Escuro** (Midnight Obsidian) e **Orange Glow** (Vidro & Gradientes).
  - Seletor de Colunas (2, 3 ou 4 colunas).
  - Toggles para ocultar/exibir estrelas, selos de verificação e datas.
- **Modal de Incorporação (Embed Code)**:
  - Gera snippets prontos para copiar:
    1. **iFrame Universal**: Para qualquer site ou landing page (WordPress, Webflow, Shopify, Framer).
    2. **Script HTML**: Tag assíncrona leve.
    3. **Componente React / Next.js**: Para aplicações modernas.

---

## 🛠️ Tecnologias Utilizadas

- **React 19** com React Hooks (`useState`, `useEffect`, `useMemo`).
- **Tailwind CSS v4** via `@tailwindcss/vite`.
- **Lucide React** para ícones modernos e consistentes.
- **Canvas-Confetti** para efeitos de celebração ao aprovar ou enviar depoimentos.
- **LocalStorage**: Os dados persistem mesmo após recarregar a página, com botão para restaurar os dados de demonstração a qualquer momento.

---

## 🚀 Como Executar Localmente

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev

# 3. Acessar a aplicação
# Abra http://localhost:5173 no seu navegador
```
