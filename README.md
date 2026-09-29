# KudosDeck 🚀 — Plataforma de Prova Social & Wall of Love (Retro Neo-Brutalist)

**KudosDeck** é uma aplicação Web completa (Micro-SaaS) construída com **React 19**, **Tailwind CSS v4** e **Lucide React**, inspirada na estética **Neo-Brutalist Vintage / Retro Pop**. Permite a criadores e equipes gerenciar prova social e exibir depoimentos autênticos em um elegante **Mural de Amor (Wall of Love)**.

---

## 🎨 Identidade Visual & Design System

- **Estética**: *Neo-Brutalist Retro Pop*
- **Canvas de Fundo**: Tom creme aquecido (`#eee8dc`) com fitas amarelas artesanais curvas (`#f59e0b` / `#fbbf24`).
- **Moldura da Janela**: Janela desktop flutuante em cantos arredondados (`rounded-[36px]`), bordas pretas sólidas de 2.5px (`#18181b`) e sombras em relevo sem desfoque.
- **Tipografia**:
  - *Fraunces* (Google Fonts): Serifa retrô pesada para o logotipo, títulos de seções e destaques.
  - *Plus Jakarta Sans*: Sans-serif moderna e nítida para legibilidade e campos de entrada.
- **Micro-interações**: Efeito de celebração com confetes (`canvas-confetti`), transições fluidas e sistema de feedback com Toasts flutuantes.

---

## ⚡ Estrutura da Aplicação

### 1. Barra Lateral Esquerda (Navegação & Upgrade PRO)
- Logotipo **Retro.** em serifa vintage pesada.
- Navegação em pílulas neo-brutalistas com bordas pretas e sombras:
  - **Wall of Love**: Visualização do Mural de Amor.
  - **Dashboard**: Métricas SaaS e Moderação de Depoimentos.
  - **Form Editor**: Editor visual do formulário de coleta.
  - **+ Coletar**: Cadastro manual rápido de novos depoimentos.
  - **Embed Code**: Gerador de snippets para sites e landing pages.
- Ação para restaurar os dados padrão de demonstração (`localStorage`).
- **Card Promocional PRO**: Ilustração 3D da caixa de presente com laço dourado, medalha #1 e botão *"Get Started"*.

### 2. Área Central (Wall of Love, Dashboard & Editor)
- **Wall of Love (Mural de Amor)**:
  - Layout Masonry Grid responsivo com 2, 3 ou 4 colunas.
  - Alternador de temas (*Claro*, *Escuro* e *Retro Amarelo*).
  - Toggles para exibir/ocultar estrelas, selos de verificação e datas.
  - Cards de depoimento em estética retro com aspas em marca d'água, foto de perfil, estrelas e dados do cliente.
- **Dashboard de Moderação**:
  - 4 Cards de métricas coloridos em pastel (*Total*, *Aprovados*, *Pendentes*, *Média de Avaliação*).
  - Barra de controle organizada em 2 níveis (busca ampla + filtros de status sem cortes).
  - Switch rápido para alternar entre Pendente e Aprovado com animação de confetes.
  - Exclusão com confirmação rápida inline.
- **Editor de Formulário**:
  - Layout lado a lado (*Split-Screen*): configurações à esquerda e mockup interativo em tempo real à direita.
  - Permite testar o preenchimento e envio diretamente no preview, injetando o depoimento no estado como *Pendente*.

### 3. Coluna Lateral Direita (Perfil & Metas de Prova Social)
- Perfil do administrador / criador (**Basith Ali** com avatar em círculo amarelo).
- Card em destaque com imagem 3D vintage exibindo o feedback mais recente.
- 4 Barras de progresso com acompanhamento visual de metas (*Taxa de Aprovação*, *Avaliações 5★*, *Meta de Provas* e *Status do Widget*).

---

## 🛠️ Tecnologias Utilizadas

- **React 19**
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **Lucide React** para ícones consistentes
- **Canvas-Confetti** para efeitos de celebração
- **LocalStorage**: Persistência automática dos dados no navegador

---

## 🚀 Como Executar Localmente

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev

# 3. Acessar a aplicação
# Abra http://localhost:5174 no seu navegador
```
