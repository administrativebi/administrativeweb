# Feature: Diagnóstico IER Inteligente (v2.0)

## Visão Geral
O Diagnóstico IER (Índice de Eficiência de Restaurante) agora opera como o funil de entrada principal da Administrative, integrando coleta de dados operacionais com análise de sentimento de mercado via IA.

## Fluxo de Dados
1. **Identificação:** O usuário informa `restaurant_name` e `restaurant_city`.
2. **Diagnóstico:** 8 dimensões operacionais (40 questões).
3. **Persistência:** Dados salvos na tabela `web_ier_diagnostics`.
4. **Análise de IA:** O Gemini recebe os scores + dados do restaurante e realiza um cruzamento técnico.

## Regras de Inteligência (Brain Protocol)
A IA deve:
*   **Simular/Pesquisar Mercado:** Usar o nome e cidade para identificar o perfil do restaurante no Google.
*   **Correlação Crítica:** Se o score de "Processos" é baixo, a IA deve prever reclamações sobre "demora" ou "inconsistência no prato".
*   **Plano de Intervenção:** Propor 3 ações práticas de 30 dias focadas em MARGEM.

## Impacto na Gamificação
*   Usuários com score < 50 são marcados como "Operação de Risco".
*   O convite para WhatsApp é personalizado com os dados da análise gerada.

## Metadados do Banco de Dados
*   Tabela: `web_ier_diagnostics`
*   Campos novos: `restaurant_name` (text), `restaurant_city` (text)
