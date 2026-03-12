# Changelog de Banco de Dados

## [1.2.0] - 2026-03-12

### Corrigido
- Revertido o prefixo de `web_` para `ai1_` para tabelas que pertencem a outro projeto.
  - `web_financial_transactions` -> `ai1_financial_transactions`
  - `web_inventory_items` -> `ai1_inventory_items`
  - `web_suppliers` -> `ai1_suppliers`
  - `web_checklists` -> `ai1_checklists`
  - `web_documents` -> `ai1_documents`

### Alterado
- Renomeado o prefixo das tabelas deste projeto de `ai1_` para `web_`.
  - `ai1_web_ier_diagnostics` -> `web_ier_diagnostics`
  - `ai1_ier_diagnostics` -> `web_ier_diagnostics_internal`
  - `ai1_web_chat_sessions` -> `web_chat_sessions`
  - `ai1_web_chat_messages` -> `web_chat_messages`

## [1.1.0] - 2026-03-12


### Adicionado
- Nova tabela `ai1_web_ier_diagnostics` para armazenar os diagnósticos do quiz IER (Índice de Eficiência de Restaurantes).
- Adicionadas colunas para pontuação total (`score_total`) e pontuação por dimensão (`dim_financeira`, `dim_custos`, `dim_processos`, `dim_pessoas`, `dim_comercial`, `dim_experiencia`, `dim_dados`, `dim_lideranca`).
- Coluna `answers` do tipo JSONB para armazenar o array completo de respostas brutas das 40 questões.
- Políticas RLS (Row Level Security) criadas:
  - Permitir inserts anônimos (para clientes que preenchem o form sem login).
  - Permitir leitura anônima apenas para agregação e cálculo de média dos índices.
