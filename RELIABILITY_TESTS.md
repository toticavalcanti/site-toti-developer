# Novos Testes - Melhorias de Confiabilidade

## 1️⃣ Teste Normalização de Texto (Acentos)

**Com acento:**
```http
POST http://localhost:3000/api/whatsapp/send
{"phone": "+5521999999999", "message": "Você tem médico disponível?"}
```

**Sem acento:**
```http
POST http://localhost:3000/api/whatsapp/send
{"phone": "+5521999999999", "message": "Voce tem medico disponivel?"}
```

✅ **Ambas devem bloquear** (se service_interest existe)

---

## 2️⃣ FAQ: Pergunta vs Informação de Orçamento

**A) Pergunta genérica:**
```http
POST http://localhost:3000/api/whatsapp/send
{"phone": "+5521999999999", "message": "quanto custa?"}
```
✅ FAQ template + pergunta  
❌ NÃO salva budget

**B) Informando valor:**
```http
POST http://localhost:3000/api/whatsapp/send
{"phone": "+5521999999999", "message": "Meu orçamento é R$ 5000"}
```
✅ Resposta: "Perfeito — anotei seu orçamento de R$ 5000..."  
✅ **Salva** budget_range no lead  
✅ Log: `[Agent] Budget saved from FAQ: 5000`

---

## 3️⃣ Idempotência por messageId

**1ª chamada** (webhook):
```json
{
  "messageId": "abc123",
  "phone": "5521999999999",
  "type": "text",
  "text": {"message": "oi"}
}
```
✅ Processada → `{status: "success"}`

**2ª chamada** (MESMO messageId):
```json
{
  "messageId": "abc123",
  "phone": "5521999999999",
  "type": "text",
  "text": {"message": "oi"}
}
```
✅ **Ignorada** → `{status: "ignored", reason: "duplicate_messageId"}`

---

## 4️⃣ Webhook Síncrono + Timeout

Para testar timeout (opcional):
1. Adicione delay no agent-processor: `await new Promise(r => setTimeout(r, 10000));`
2. Envie mensagem
3. ✅ Webhook retorna em ~9s
4. ✅ Response: `{status: "timeout"}`
5. ✅ Usuário recebe fallback

⚠️ **Remover delay após teste**

---

## Checklist Atualizado

- [ ] Acentos normalizados (médico = medico)
- [ ] FAQ "quanto custa" → template
- [ ] FAQ "meu orçamento R$ 2000" → salva budget
- [ ] messageId duplicado ignorado
- [ ] Webhook síncrono (não background)
- [ ] Timeout 9s funciona

---

## Troubleshooting

**Normalização não funciona:**
- Verificar `normalizeText()` em uso
- Testar: `'médico'.normalize('NFD').replace(/\p{Diacritic}/gu, '')` → "medico"

**Budget não salvo:**
- Ver logs: `[Agent] Budget saved from FAQ:`
- Mensagem precisa ter R$/números/mil

**Idempotency não funciona:**
- Executar migração: ver `DATABASE_MIGRATION.md`
- SQL: `ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_message_id TEXT;`

**Timeout em produção:**
- Configurado para 9s (seguro Vercel)
- Fallback automático

---

## Resumo das Melhorias

✅ Webhook síncrono (Vercel-safe)  
✅ Timeout 9s + fallback message  
✅ Normalização de acentos (NFD)  
✅ Idempotência por messageId  
✅ FAQ detecta valores de orçamento  
✅ Budget parser simples  
✅ Sempre retorna em <10s
