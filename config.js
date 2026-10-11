// Configurações Globais do Sistema MVT Advogados & Integração MindChat
window.CONFIG = {
  // Dados do Escritório
  OFFICE_NAME: "MVT Advogados",
  SUBTITLE: "Sistema de Gestão de Reuniões & Automação Anti No-Show",
  
  // Integração com MindChat (MindIA)
  MINDCHAT: {
    API_URL: "https://api.appmindchat.com.br/webhook/v1",
    API_KEY: "ghj8mF6yaxaEmAhmqubLlVFt9wm50Oqt",
    INSTANCE_ID: "3ea91866-13be-4a00-8d7a-84e8149e639d", // Mind17
    INSTANCE_NAME: "Mind17 (WhatsApp)",
    INSTANCE_PHONE: "5512988919634",
    STAGES: {
      AGUARDANDO_REUNIAO: "9be8049d-3e55-4261-aa63-448a0b20949a", // ID real da etapa Aguardando Reunião
      NO_SHOW: "84f5ed7e-eb5f-49b8-b5da-611aa963ba59", // ID real da etapa NoShow no CRM MindChat
      CONTRATO_FECHADO: "2b0baf19-e8db-49f4-9da1-7bc6145457d8"
    }
  },

  // Templates de Mensagens Pré-estabelecidos
  MESSAGE_TEMPLATES: {
    ALERT_60M: "Olá, {cliente}! Aqui é da equipe do MVT Advogados. Passando para lembrar que sua reunião com {advogado} está agendada para hoje às {horario}. Por gentileza, responda esta mensagem confirmando sua presença.",
    ALERT_30M: "Olá, {cliente}! Faltam 30 minutos para sua reunião com {advogado} às {horario}. Já estamos organizando seu atendimento.",
    ALERT_15M: "Olá, {cliente}! Em 15 minutos daremos início ao seu atendimento com {advogado}. Esteja pronto(a)!",
    ALERT_0M: "Olá, {cliente}! Chegou o horário da sua reunião com {advogado}.\n\n🔗 Segue o link de acesso ao Google Meet:\n{meet_link}\n\nO advogado já está aguardando você na sala!",
    NO_SHOW_1H: "Olá, {cliente}. Notamos que você não conseguiu comparecer à reunião agendada para hoje às {horario}. Nossa equipe comercial entrará em contato para verificar se deseja reagendar um novo horário com a nossa equipe."
  },

  // Equipe de Atendimento (Comercial) & Advogadas
  TEAM: [
    { id: "augusto", name: "Augusto", role: "Comercial", area: "Comercial" },
    { id: "ana_carla", name: "Ana Carla", role: "Comercial", area: "Comercial" },
    { id: "julia", name: "Julia", role: "Comercial", area: "Comercial" },
    { id: "joao", name: "João", role: "Comercial", area: "Comercial" },
    { id: "natalia", name: "Dra. Natalia", role: "Advogada", area: "Trabalhista" },
    { id: "ludmila", name: "Dra. Ludmila", role: "Advogada", area: "Cível / Geral" }
  ],
  LAWYERS: [
    { id: "augusto", name: "Augusto", area: "Comercial" },
    { id: "ana_carla", name: "Ana Carla", area: "Comercial" },
    { id: "julia", name: "Julia", area: "Comercial" },
    { id: "joao", name: "João", area: "Comercial" },
    { id: "natalia", name: "Dra. Natalia", area: "Trabalhista" },
    { id: "ludmila", name: "Dra. Ludmila", area: "Cível / Geral" }
  ]
};
