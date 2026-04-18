# Database Schema Update for WhatsApp Agent

## Campo Adicionado: `last_message_id`

Para suportar idempotência no webhook, foi adicionado o campo `last_message_id` à tabela `leads`.

### SQL para Adicionar Coluna

Execute no Neon Console:

```sql
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS last_message_id TEXT;
```

### Descrição

- **Tipo**: `TEXT`
- **Nullable**: `true`
- **Propósito**: Armazenar o último `messageId` processado do webhook Z-API
- **Uso**: Prevenir processamento duplicado se o webhook for reenviado

### Quando Executar

Antes de fazer deploy das mudanças de confiabilidade do webhook.

### Verificação

Para verificar se a coluna foi criada:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'leads'
  AND column_name = 'last_message_id';
```

### Como o Sistema Funciona Sem Esta Coluna

Se a coluna não existir, o sistema continuará funcionando normalmente, mas:
- ⚠️ **Não haverá proteção contra mensagens duplicadas**
- O webhook processará a mesma mensagem múltiplas vezes se o Z-API reenviar
- Pode resultar em respostas duplicadas ao usuário

### Migração Segura

A coluna é **opcional** no código (via TypeScript `last_message_id?: string | null`), então:
1. ✅ Sistema funciona antes da migração
2. ✅ Após adicionar coluna, idempotência é ativada automaticamente
3. ✅ Rollback simples: apenas remover coluna (dados não são críticos)

---

## Anti-Spam Memory Cache (Janeiro 2026)

Para evitar chamadas desnecessárias à OpenAI e melhorar a performance, foram adicionados campos de cache anti-spam à tabela `leads`.

### SQL para Adicionar Colunas

Execute no Neon Console:

```sql
ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_inbound_at TIMESTAMP;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_user_text_norm TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_agent_reply TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_agent_reply_at TIMESTAMP;
```

### Descrição dos Campos

| Campo | Tipo | Propósito |
|-------|------|-----------|
| `last_inbound_at` | TIMESTAMP | Timestamp da última mensagem recebida (para cooldown) |
| `last_user_text_norm` | TEXT | Texto normalizado da última mensagem do usuário (sem acentos/pontuação) |
| `last_agent_reply` | TEXT | Última resposta gerada pelo agente (para cache) |
| `last_agent_reply_at` | TIMESTAMP | Quando a última resposta foi gerada |

### Funcionalidades Implementadas

#### 1. Cooldown Anti-Spam (5 segundos)
- Se usuário enviar mensagem menos de 5s após a anterior
- Responde com mensagem fixa: "Recebi 🙂 só um instante que já te respondo."
- **Evita chamadas OpenAI** para mensagens em rajada

#### 2. Cache de Pergunta Repetida (24 horas)
- Normaliza mensagem (remove acentos/pontuação)
- Se mensagem normalizada = `last_user_text_norm` E última resposta < 24h
- Retorna `last_agent_reply` direto
- **Evita chamadas OpenAI** para perguntas duplicadas

### Como Funciona

```typescript
// Exemplo de normalização
"Quanto custa?" → "quanto custa"
"Quanto custa??" → "quanto custa"
"Qto custa" → "qto custa"
```

Se usuário perguntar "Quanto custa?" duas vezes, a segunda resposta vem do cache.

### Verificação

```sql
SELECT phone, last_inbound_at, last_user_text_norm, last_agent_reply_at
FROM leads
WHERE last_inbound_at IS NOT NULL
ORDER BY last_inbound_at DESC
LIMIT 10;
```

### Impacto

- ✅ Reduz custos OpenAI (~30-50% dos casos evitados)
- ✅ Resposta instantânea para mensagens cachê
- ✅ Melhora UX (sem delay para perguntas repetidas)
- ✅ Protege contra spam/bots

### Rollback

Caso precise reverter:

```sql
ALTER TABLE leads DROP COLUMN IF EXISTS last_inbound_at;
ALTER TABLE leads DROP COLUMN IF EXISTS last_user_text_norm;
ALTER TABLE leads DROP COLUMN IF EXISTS last_agent_reply;
ALTER TABLE leads DROP COLUMN IF EXISTS last_agent_reply_at;
```

Sistema continua funcionando normalmente sem as colunas (sem cache, mas funcional).
