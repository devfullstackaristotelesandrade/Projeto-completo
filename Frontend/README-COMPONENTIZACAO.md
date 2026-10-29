# Aprender+ V2 — Componentização final (Etapa 3)

Esta etapa complementa as etapas anteriores, mantendo os serviços e endpoints existentes.

## Componentes reutilizáveis

- `components/common/Loading.jsx`: estado de carregamento.
- `components/common/Alert.jsx`: mensagens de erro/sucesso/aviso.
- `components/common/PageTitle.jsx`: título padronizado de páginas.
- `components/common/EmptyState.jsx`: estado sem dados.
- `components/common/ConfirmDialog.jsx`: confirmação de ações destrutivas.
- `components/common/DataTable.jsx`: tabela configurável por colunas e linhas.
- `components/common/FormField.jsx`: campo reutilizável input/textarea/select.
- `components/common/ActionButtons.jsx`: botões padronizados de editar/excluir.
- `components/dashboard/StatCard.jsx`: cartão de indicador.
- `components/AdminNav.jsx` + `layouts/AdminLayout.jsx`: navegação administrativa compartilhada.

## Páginas atualizadas nesta etapa

- `AdminUsuarios.jsx`: tabela configurável e botões reutilizáveis.
- `AdminConteudos.jsx`: campos reutilizáveis, tabela configurável e ações padronizadas.
- `AdminAtividades.jsx`: campos reutilizáveis, tabela configurável e ações padronizadas.

## Instalação e validação

Na pasta do projeto, execute `npm ci`, depois `npm run dev` para teste e `npm run build` para validar a compilação de produção.

A API não foi alterada. Teste o login, perfis, CRUD e logout contra o backend já existente.
