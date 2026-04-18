# Guia Rápido de Teste - Agen WhatsApp LLM com Controles de Custo

## 🚀 Como Testar

### Pré-requisitos
1. Servidor Next.js rodando: `npm run dev`
2. Postman ou similar
3. Variáveis de ambiente configuradas (`.env.local`)

---

## 1️⃣ Health Check

```http
GET http://localhost:3000/api/health
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "timestamp": "...",
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
    "estimated_savings_usd": 0
  },
  "openai_model": "gpt-4o-mini"
}
```

---

## 2️⃣ Teste Básico (deve chamar OpenAI)

```http
POST http://localhost:3000/api/whatsapp/send
Content-Type: application/json

{
  "phone": "+5521999999999",
  "message": "Olá, preciso de ajuda com um projeto"
}
```

**Verificar logs:**
```
[Agent] Processing message from: +5521999999999
[OpenAI] Calling model: gpt-4o-mini
[OpenAI] Success: ...
```

---

## 3️⃣ Teste FAQ Cache (NÃO deve chamar OpenAI)

```http
POST http://localhost:3000/api/whatsapp/send
Content-Type: application/json

{
  "phone": "+5521999999999",
  "message": "quanto custa um site?"
}
```

**Verificar logs:**
```
[Agent] FAQ cache hit
[Cost Control] Savings: { faq_cache_hits: 1, llm_calls_avoided: 1 }
```

**Resposta deve conter:**
- Resposta objetiva sobre preço
- Pergunta de qualificação

---

## 4️⃣ Teste Duplicate Detection

**Enviar 2x a mesma mensagem:**

```http
POST http://localhost:3000/api/whatsapp/send
{
  "phone": "+5521999999999",
  "message": "oi"
}
```

Enviar novamente:
```http
POST http://localhost:3000/api/whatsapp/send
{
  "phone": "+5521999999999",  
  "message": "oi"
}
```

**Verificar logs da 2ª chamada:**
```
[Agent] Duplicate detected - using cached response
[Cost Control] Savings: { duplicate_cache_hits: 1 }
```

---

## 5️⃣ Teste Guardrails

**Primeiro:** Definir `service_interest` no lead:
```http
POST http://localhost:3000/api/whatsapp/send
{
  "phone": "+5521999999999",
  "message": "Preciso de um bot de WhatsApp"
}
```

**Depois:** Tentar mensagem fora de escopo:
```http
POST http://localhost:3000/api/whatsapp/send
{
  "phone": "+5521999999999",
  "message": "Você pode me ajudar com um processo trabalhista?"
}
```

**Verificar logs:**
```
[Agent] Blocked by guardrail: out_of_scope
[Cost Control] Savings: { guardrails_blocked: 1 }
```

**Resposta deve ser:**
> "Consigo te ajudar só com Bot de WhatsApp por aqui 🙂 Quer voltar nesse ponto?"

---

## 6️⃣ Verificar Economia

Após todos os testes:
```http
GET http://localhost:3000/api/health
```

**Deve mostrar:**
```json
{
  "cost_savings": {
    "guardrails_blocked": 1,
    "faq_cache_hits": 1,
    "duplicate_cache_hits": 1,
    "llm_calls_avoided": 3,
    "estimated_savings_usd": 0.0045
  }
}
```

---

## 📋 Checklist de Validação

- [ ] Health check retorna status "ok"
- [ ] Todas as env_checks são `true`
- [ ] Mensagem normal chama OpenAI
- [ ] FAQ cache evita OpenAI
- [ ] Duplicate detection funciona
- [ ] Guardrails só bloqueiam quando apropriado
- [ ] Cost savings são logados corretamente
- [ ] Modelo usado é gpt-4o-mini

---

## 🐛 Troubleshooting

**Se FAQ não funcionar:**
- Verificar se mensagem contém trigger exato
- Testar com: "quanto custa", "prazo", "como funciona"

**Se guardrails não bloquearem:**
- Lead precisa ter `service_interest` definido primeiro
- Mensagem precisa ter palavra proibida E não ter palavra de serviço

**Se duplicate não funcionar:**
- Precisa enviar mensagem idêntica ou muito similar
- Só compara com histórico do mesmo `phone`

---

## 🎯 Resultado Esperado

✅ Sistema evita ~45% de chamadas OpenAI  
✅ FAQ responde instantaneamente  
✅ Guardrails protegem contra spam  
✅ Duplicate detection economiza tokens  
✅ Custo por 1000 mensagens: ~$0.82 ao invés de ~$1.50
