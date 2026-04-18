# Testing Guide: DB-Backed Cost Metrics

Este guia complementa o TESTING_GUIDE.md com testes específicos para a persistência de métricas no Postgres.

## ⚠️ Pré-requisito: Banco de Dados

Antes de testar, execute no Neon Console:

```sql
CREATE TABLE IF NOT EXISTS cost_metrics (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  guardrails_blocked INT DEFAULT 0,
  faq_cache_hits INT DEFAULT 0,
  duplicate_cache_hits INT DEFAULT 0,
  llm_calls_avoided INT DEFAULT 0,
  llm_calls INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT now()
);
```

## 1. Test: Health Check com Métricas do DB

### Objetivo
Verificar que o endpoint `/api/health` está funcionando e retornando métricas do banco.

### Comando
```bash
curl http://localhost:3000/api/health
```

### Resposta Esperada
```json
{
  "status": "ok",
  "timestamp": "2026-01-04T03:00:00.000Z",
  "env_checks": {
    "openai": true,
    "zapi": true,
    "neon": true,
    "google_calendar": true
  },
  "cost_savings": {
    "guardrails_blocked": 0,
    "faq_cache_hits": 0,
    "duplicate_cache_hits": 0,
    "llm_calls_avoided": 0,
    "llm_calls": 0,
    "estimated_savings_usd": 0
  },
  "openai_model": "gpt-4o-mini"
}
```

### ✅ Verificações
- `env_checks.neon` deve ser `true` (SELECT 1 passou)
- `cost_savings` deve ter todos os campos numéricos
- `estimated_savings_usd` é calculado como `llm_calls_avoided * 0.002`

---

## 2. Test: FAQ Cache Hit → Persistência no DB

### Objetivo
Verificar que FAQ hits são registrados na tabela `cost_metrics`.

### Setup
1. Execute health check inicial e anote valores
2. Envie mensagem que aciona FAQ

### Comando Webhook
```bash
curl -X POST http://localhost:3000/api/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "5511999999999",
    "instanceId": "test",
    "messageId": "msg-faq-test-001",
    "pushName": "Test User",
    "text": {"message": "quanto custa?"}
  }'
```

### Verificação no DB
```sql
SELECT faq_cache_hits, llm_calls_avoided, updated_at
FROM cost_metrics
WHERE date = CURRENT_DATE;
```

### ✅ Resultado Esperado
- `faq_cache_hits` incrementou em +1
- `llm_calls_avoided` incrementou em +1
- `updated_at` foi atualizado

### Verificação via Health Check
```bash
curl http://localhost:3000/api/health
```

Deve mostrar:
```json
{
  "cost_savings": {
    "faq_cache_hits": 1,
    "llm_calls_avoided": 1,
    "estimated_savings_usd": 0.002
  }
}
```

---

## 3. Test: Duplicate Detection → Persistência no DB

### Objetivo
Verificar que detecção de duplicatas persiste no banco.

### Setup
1. Envie uma mensagem nova
2. Envie a MESMA mensagem logo em seguida

### Comandos
```bash
# Primeira mensagem (vai chamar LLM)
curl -X POST http://localhost:3000/api/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "5511999999999",
    "instanceId": "test",
    "messageId": "msg-dup-test-001",
    "pushName": "Test User",
    "text": {"message": "preciso de um site para minha empresa"}
  }'

# Segunda mensagem IDÊNTICA (deve ser detectada como duplicata)
curl -X POST http://localhost:3000/api/whatsapp/webhook \
  -H "Content-Type": "application/json" \
  -d '{
    "phone": "5511999999999",
    "instanceId": "test",
    "messageId": "msg-dup-test-002",
    "pushName": "Test User",
    "text": {"message": "preciso de um site para minha empresa"}
  }'
```

### Verificação no DB
```sql
SELECT duplicate_cache_hits, llm_calls_avoided, llm_calls
FROM cost_metrics
WHERE date = CURRENT_DATE;
```

### ✅ Resultado Esperado
- `duplicate_cache_hits` incrementou em +1
- `llm_calls_avoided` incrementou em +1
- `llm_calls` incrementou em +1 (só da primeira mensagem)

---

## 4. Test: Guardrails Block → Persistência no DB

### Objetivo
Verificar que bloqueios por guardrail são registrados.

### Setup
1. Primeiro, envie mensagem para definir `service_interest`
2. Depois, envie mensagem fora de escopo

### Comandos
```bash
# 1. Definir interesse (ex: site)
curl -X POST http://localhost:3000/api/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "5511999999991",
    "instanceId": "test",
    "messageId": "msg-guard-setup-001",
    "pushName": "Test User",
    "text": {"message": "preciso de um site"}
  }'

# 2. Mensagem fora de escopo (deve ser bloqueada)
curl -X POST http://localhost:3000/api/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "5511999999991",
    "instanceId": "test",
    "messageId": "msg-guard-test-002",
    "pushName": "Test User",
    "text": {"message": "preciso de um medico"}
  }'
```

### Verificação no DB
```sql
SELECT guardrails_blocked, llm_calls_avoided
FROM cost_metrics
WHERE date = CURRENT_DATE;
```

### ✅ Resultado Esperado
- `guardrails_blocked` incrementou em +1
- `llm_calls_avoided` incrementou em +1
- Resposta foi fallback template, não LLM

---

## 5. Test: LLM Call → Persistência no DB

### Objetivo
Verificar que chamadas ao LLM são registradas.

### Comando
```bash
curl -X POST http://localhost:3000/api/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "5511999999992",
    "instanceId": "test",
    "messageId": "msg-llm-test-001",
    "pushName": "Test User",
    "text": {"message": "oi, preciso de ajuda com um projeto"}
  }'
```

### Verificação no DB
```sql
SELECT llm_calls, updated_at
FROM cost_metrics
WHERE date = CURRENT_DATE;
```

### ✅ Resultado Esperado
- `llm_calls` incrementou em +1
- Resposta foi gerada pelo LLM (texto único, não template)

---

## 6. Verificação de Economia Estimada

### Fórmula
```
estimated_savings_usd = llm_calls_avoided * COST_PER_LLM_CALL_USD
```

Onde `COST_PER_LLM_CALL_USD` default = 0.002

### Exemplo
Se após todos os testes você tiver:
```
llm_calls_avoided = 4  (1 FAQ + 1 duplicate + 1 guardrail + ...)
```

Então:
```
estimated_savings_usd = 4 * 0.002 = 0.008
```

### Configurável via ENV
```bash
COST_PER_LLM_CALL_USD=0.003  # Custom value
```

---

## 7. Reset Diário Automático

**IMPORTANTE:** As métricas são por DIA (`date = CURRENT_DATE`).

- Cada novo dia começa com contadores zerados
- Dados históricos permanecem no banco
- Health check sempre mostra métricas do dia atual

### Query para Ver Histórico
```sql
SELECT date, 
       guardrails_blocked, 
       faq_cache_hits, 
       duplicate_cache_hits,
       llm_calls_avoided,
       llm_calls,
       updated_at
FROM cost_metrics
ORDER BY date DESC
LIMIT 7;  -- Última semana
```

---

## Troubleshooting

### Problema: `env_checks.neon = false`

**Causa:** Conexão com banco falhou

**Solução:**
1. Verificar `DATABASE_URL` ou `POSTGRES_URL` no .env
2. Verificar se Neon está acessível
3. Checar logs do servidor para erro específico

### Problema: Métricas não incrementam

**Causa:** Tabela não existe ou incrementMetric() falhou

**Solução:**
1. Verificar que tabela foi criada:
   ```sql
   SELECT * FROM cost_metrics LIMIT 1;
   ```
2. Checar logs do servidor:
   ```bash
   [Metrics] Failed to increment...
   ```
3. Se incrementMetric falhar, agente continua funcionando (graceful degradation)

### Problema: `estimated_savings_usd` incorreto

**Causa:** Cálculo errado ou COST_PER_LLM_CALL_USD não configurado

**Solução:**
```typescript
// Ver código em src/lib/metrics.ts
const costPerCall = parseFloat(process.env.COST_PER_LLM_CALL_USD || '0.002');
savings = llm_calls_avoided * costPerCall;
```

---

## Métricas vs. In-Memory (Deprecated)

| Aspecto | Antes (In-Memory) | Agora (DB) |
|---------|-------------------|------------|
| Persistência | ❌ Perde ao reiniciar | ✅ Persiste no Postgres |
| Histórico | ❌ Não rastreia | ✅ Por dia |
| Multi-instância | ❌ Cada instância separado | ✅ Compartilhado |
| Reliability | ❌ Pode perder dados | ✅ Garantido pelo DB |
| Performance | ⚡ Muito rápido | ⚡ Rápido (async) |

**IMPORTANTE:**antml:function_calls> As funções `logCostSaving()` e `getCostSavings()` foram removidas.
Agora todas as métricas são persistidas automaticamente via `incrementMetric()`.

---

## Next Steps

Após validar todos os testes:

1. ✅ Commit das mudanças
2. ✅ Deploy para Vercel
3. ✅ Monitorar logs em produção
4. ✅ Acompanhar métricas reais no Neon

---

**Data de Criação:** 2026-01-04  
**Versão:** 1.0  
**Relacionado:** DATABASE_MIGRATION.md, TESTING_GUIDE.md
