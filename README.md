# MVT Advogados — Sistema Interno de Gestão de Reuniões & Anti No-Show

Sistema executivo de gestão de pauta e automação de alertas anti no-show desenvolvido para o escritório **MVT Advogados**.

---

## ⚖️ Visão Geral

O sistema tem como objetivo principal **reduzir a zero a taxa de No-Show** (não comparecimento de clientes a reuniões com os advogados), automatizando uma régua de lembretes no WhatsApp e fornecendo um painel ágil para a equipe comercial e os advogados.

### Principais Funcionalidades

- **Dashboard Executivo em Tempo Real**:
  - Métricas do dia: *Reuniões Hoje, Confirmadas, Aguardando Confirmação, No-Shows e Taxa de Presença*.
  - Alternador de tema: **Modo Noturno (Preto & Azul)** e **Modo Dia (Sol)** com persistência local.
  - Identidade visual oficial: Tipografia elegante **MVT Advogados**.

- **Régua Anti No-Show Inteligente (4 Passos)**:
  - 🟡 **1 Hora Antes**: Alerta inicial de confirmação ativa no WhatsApp.
  - 🟠 **30 Minutos Antes**: Reforço automático (automaticamente pulado se o cliente já confirmou).
  - 🔴 **15 Minutos Antes**: Última chamada (pulado se confirmado).
  - 🚀 **No Horário**: Envio automático do link oficial do Google Meet.
  - ⚠️ **1 Hora Pós-Reunião**: Identificação automática de falta com movimentação do lead para a etapa **NO SHOW** no CRM do MindChat.

- **Ações Ágeis da Equipe Comercial**:
  - Botão de confirmação com 1 clique (pausa alertas intermediários).
  - Acesso direto à sala do Google Meet.
  - Pré-visualização e disparo manual de mensagens.
  - Registro e declaração rápida de No-Show.

- **Integração com MindChat (MindIA)**:
  - Disparos via API oficial (`POST /webhook/v1/messages/text`).
  - Movimentação de etapas no CRM (`POST /webhook/v1/leads/crm-stage`).
  - Modo Seguro de Simulação para testes protegidos sem envio a clientes reais.

---

## 🚀 Como Executar

O sistema foi concebido para rodar de forma leve e instantânea:

1. Abra a pasta do projeto.
2. Dê um duplo clique no arquivo `index.html`.
3. O sistema abrirá diretamente no Google Chrome ou Microsoft Edge.

---

## 📁 Estrutura de Arquivos

```
├── index.html              # Interface do dashboard executivo
├── styles.css              # Design system (Preto & Azul, Modo Dia/Noite, tipografia MVT)
├── app.js                  # Lógica reativa, cronômetros, esteira e simulação
├── config.js               # Parâmetros de API, templates e advogados
└── README.md               # Documentação técnica do projeto
```
