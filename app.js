const CONFIG = window.CONFIG || {
  MESSAGE_TEMPLATES: {
    ALERT_60M: "Olá, {cliente}! Passando para lembrar que sua reunião com {advogado} está agendada para hoje às {horario}.",
    ALERT_30M: "Olá, {cliente}! Faltam 30 minutos para sua reunião com {advogado} às {horario}.",
    ALERT_15M: "Olá, {cliente}! Em 15 minutos daremos início ao seu atendimento com {advogado}.",
    ALERT_0M: "Olá, {cliente}! Chegou o horário da sua reunião com {advogado}. Link: {meet_link}",
    NO_SHOW_1H: "Olá, {cliente}. Notamos que você não conseguiu comparecer à reunião agendada para hoje."
  },
  MINDCHAT: {
    API_URL: "https://api.appmindchat.com.br/webhook/v1",
    API_KEY: "ghj8mF6yaxaEmAhmqubLlVFt9wm50Oqt",
    INSTANCE_NAME: "Mind17",
    INSTANCE_ID: "3ea91866-13be-4a00-8d7a-84e8149e639d",
    STAGES: {
      AGUARDANDO_REUNIAO: "9be8049d-3e55-4261-aa63-448a0b20949a",
      NO_SHOW: "no-show-stage-id"
    }
  }
};

// ESTADO DA APLICAÇÃO
const STATE = {
  // MODO SEGURO ATIVADO: Não envia mensagens reais aos clientes até que você autorize
  SAFE_MODE: true, 
  
  // Relógio virtual (para permitir simular o avanço do tempo e ver os disparos acontecendo)
  simulatedTimeOffsetMs: 0,
  
  // Reuniões cadastradas
  meetings: [],
  
  // Templates de mensagens
  templates: { ...(CONFIG.MESSAGE_TEMPLATES || {}) },
  
  // Filtros ativos
  filterSearch: '',
  filterLawyer: 'all',
  filterStatus: 'all'
};

// Dados de Exemplo Seguros para Demonstração Inicial do Sistema
const INITIAL_DEMO_MEETINGS = [
  {
    id: 'demo-1',
    clientName: 'Roberto Almeida',
    clientPhone: '5511998822334',
    lawyer: 'Dr. Augusto Siqueira',
    area: 'Trabalhista',
    time: getRelativeTime(45), // Reunião daqui a 45 minutos (testa aviso de 30m e 15m)
    meetLink: 'https://meet.google.com/abc-defg-hij',
    status: 'pending', // pending, confirmed, in_progress, noshow
    pipeline: {
      alert60m: { sent: true, sentAt: '13:00' },
      alert30m: { sent: false, sentAt: null },
      alert15m: { sent: false, sentAt: null },
      alert0m: { sent: false, sentAt: null },
      noShowAlert: { sent: false, sentAt: null }
    }
  },
  {
    id: 'demo-2',
    clientName: 'Mariana Duarte',
    clientPhone: '5512988112233',
    lawyer: 'Dra. Natalia Tosatto',
    area: 'Trabalhista',
    time: getRelativeTime(110), // Reunião daqui a quase 2 horas (testa aviso de 1h)
    meetLink: 'https://meet.google.com/xyz-uvwx-rst',
    status: 'pending',
    pipeline: {
      alert60m: { sent: false, sentAt: null },
      alert30m: { sent: false, sentAt: null },
      alert15m: { sent: false, sentAt: null },
      alert0m: { sent: false, sentAt: null },
      noShowAlert: { sent: false, sentAt: null }
    }
  },
  {
    id: 'demo-3',
    clientName: 'Carlos Eduardo Santos',
    clientPhone: '5511977665544',
    lawyer: 'Dra. Ana Carla',
    area: 'Cível',
    time: getRelativeTime(15), // Reunião daqui a 15 min (já confirmou!)
    meetLink: 'https://meet.google.com/mno-pqrs-tuv',
    status: 'confirmed', // CLIENTE JÁ CONFIRMOU (avisos intermediários foram pulados)
    pipeline: {
      alert60m: { sent: true, sentAt: '12:45' },
      alert30m: { sent: false, sentAt: null, skipped: true },
      alert15m: { sent: false, sentAt: null, skipped: true },
      alert0m: { sent: false, sentAt: null },
      noShowAlert: { sent: false, sentAt: null }
    }
  },
  {
    id: 'demo-4',
    clientName: 'Fernando Guimarães',
    clientPhone: '5511966554433',
    lawyer: 'Dr. Marcus',
    area: 'Previdenciário',
    time: getRelativeTime(-75), // Reunião foi há 1h15 atrás (No-Show detectado)
    meetLink: 'https://meet.google.com/qwe-rtyu-iop',
    status: 'noshow',
    pipeline: {
      alert60m: { sent: true, sentAt: '11:00' },
      alert30m: { sent: true, sentAt: '11:30' },
      alert15m: { sent: true, sentAt: '11:45' },
      alert0m: { sent: true, sentAt: '12:00' },
      noShowAlert: { sent: true, sentAt: '13:00' }
    }
  }
];

// Utilitário para gerar horários relativos seguros hoje
function getRelativeTime(offsetMinutes) {
  const d = new Date();
  d.setMinutes(d.getMinutes() + offsetMinutes);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  loadStoredData();
  setupEventListeners();
  setupSimulationClock();
  renderApp();
  
  // Mensagem de boas-vindas informando sobre o modo seguro
  showToast('🛡️ Modo Seguro Ativado: Nenhuma mensagem real será enviada a clientes.', 'info', 6000);
});

// Alternador de Modo Noturno (Lua 🌙) / Modo Dia (Sol ☀️)
function setupThemeToggle() {
  const btn = document.getElementById('btn-theme-toggle');
  const icon = document.getElementById('theme-icon');
  const text = document.getElementById('theme-text');
  
  const savedTheme = localStorage.getItem('mvt_theme') || 'dark';
  applyTheme(savedTheme);

  if (btn) {
    btn.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-theme');
      const newTheme = isLight ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('mvt_theme', newTheme);
      showToast(`Modo ${newTheme === 'light' ? 'Dia ☀️' : 'Noturno 🌙'} ativado!`, 'info', 2000);
    });
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      if (icon) icon.textContent = '☀️';
      if (text) text.textContent = 'Dia';
    } else {
      document.body.classList.remove('light-theme');
      if (icon) icon.textContent = '🌙';
      if (text) text.textContent = 'Noturno';
    }
  }
}

// Carrega dados salvos ou dados de demonstração
function loadStoredData() {
  const savedMeetings = localStorage.getItem('mvt_meetings');
  if (savedMeetings) {
    try {
      STATE.meetings = JSON.parse(savedMeetings);
    } catch {
      STATE.meetings = INITIAL_DEMO_MEETINGS;
    }
  } else {
    STATE.meetings = INITIAL_DEMO_MEETINGS;
    saveMeetings();
  }

  const savedTemplates = localStorage.getItem('mvt_templates');
  if (savedTemplates) {
    try {
      STATE.templates = JSON.parse(savedTemplates);
    } catch {
      STATE.templates = { ...CONFIG.MESSAGE_TEMPLATES };
    }
  }
}

function saveMeetings() {
  localStorage.setItem('mvt_meetings', JSON.stringify(STATE.meetings));
}

function saveTemplates() {
  localStorage.setItem('mvt_templates', JSON.stringify(STATE.templates));
}

// Obter hora atual (com offset da simulação)
function getCurrentTime() {
  return new Date(Date.now() + STATE.simulatedTimeOffsetMs);
}

// RENDERIZAÇÃO PRINCIPAL
function renderApp() {
  renderMetrics();
  renderMeetingsList();
  populateTemplateFields();
  populateIntegrationFields();
}

// Métricas do Topo
function renderMetrics() {
  const total = STATE.meetings.length;
  const confirmed = STATE.meetings.filter(m => m.status === 'confirmed').length;
  const pending = STATE.meetings.filter(m => m.status === 'pending').length;
  const noshow = STATE.meetings.filter(m => m.status === 'noshow').length;

  const totalFinished = confirmed + noshow;
  const rate = totalFinished > 0 ? Math.round((confirmed / totalFinished) * 100) : 100;

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-confirmed').textContent = confirmed;
  document.getElementById('stat-pending').textContent = pending;
  document.getElementById('stat-noshow').textContent = noshow;
  document.getElementById('stat-rate').textContent = `${rate}%`;

  document.getElementById('meetings-count-badge').textContent = `${total} agendamento${total !== 1 ? 's' : ''}`;
}

// Renderiza a Lista de Reuniões em Linhas Executivas
function renderMeetingsList() {
  const container = document.getElementById('meetings-list-container');
  container.innerHTML = '';

  const now = getCurrentTime();

  // Filtragem
  const filtered = STATE.meetings.filter(m => {
    const matchSearch = m.clientName.toLowerCase().includes(STATE.filterSearch.toLowerCase()) ||
                        m.clientPhone.includes(STATE.filterSearch);
    const matchLawyer = STATE.filterLawyer === 'all' || m.lawyer === STATE.filterLawyer;
    const matchStatus = STATE.filterStatus === 'all' || m.status === STATE.filterStatus;
    return matchSearch && matchLawyer && matchStatus;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Nenhuma reunião encontrada para os filtros selecionados.</p>
      </div>
    `;
    return;
  }

  // Ordena por horário
  filtered.sort((a, b) => a.time.localeCompare(b.time));

  filtered.forEach(meeting => {
    const row = document.createElement('div');
    row.className = `meeting-row status-${meeting.status}`;
    row.id = `meeting-${meeting.id}`;

    // Cálculo da contagem regressiva
    const [mHours, mMinutes] = meeting.time.split(':').map(Number);
    const meetingDate = new Date(now);
    meetingDate.setHours(mHours, mMinutes, 0, 0);

    const diffMinutes = Math.round((meetingDate - now) / 60000);
    let countdownPillHtml = '';

    if (meeting.status === 'noshow') {
      countdownPillHtml = `<span class="countdown-pill" style="color: var(--rose);">🚫 No-Show</span>`;
    } else if (diffMinutes > 60) {
      countdownPillHtml = `<span class="countdown-pill">Faltam ${Math.floor(diffMinutes / 60)}h ${diffMinutes % 60}m</span>`;
    } else if (diffMinutes > 15) {
      countdownPillHtml = `<span class="countdown-pill due-soon">⚡ Faltam ${diffMinutes}m</span>`;
    } else if (diffMinutes > 0) {
      countdownPillHtml = `<span class="countdown-pill urgent">🔥 Faltam ${diffMinutes}m</span>`;
    } else if (diffMinutes > -30) {
      countdownPillHtml = `<span class="countdown-pill now">🟢 No Horário</span>`;
    } else {
      countdownPillHtml = `<span class="countdown-pill">Encerrada</span>`;
    }

    const p = meeting.pipeline;
    const isConfirmed = meeting.status === 'confirmed';

    row.innerHTML = `
      <!-- Coluna 1: Horário -->
      <div class="time-cell">
        <span class="time-main">${meeting.time}</span>
        ${countdownPillHtml}
      </div>

      <!-- Coluna 2: Cliente -->
      <div class="client-cell">
        <span class="client-cell-name">👤 ${escapeHtml(meeting.clientName)}</span>
        <span class="client-cell-phone">📱 ${escapeHtml(meeting.clientPhone)}</span>
      </div>

      <!-- Coluna 3: Advogado -->
      <div class="lawyer-cell">
        <span class="lawyer-cell-name">⚖️ ${escapeHtml(meeting.lawyer)}</span>
        <span class="lawyer-cell-area">${escapeHtml(meeting.area)}</span>
      </div>

      <!-- Coluna 4: Régua Anti No-Show (Mini Passos) -->
      <div class="pipeline-cell">
        <div class="pipe-step ${p.alert60m.sent ? 'sent' : ''}" title="Alerta 1h">1h</div>
        <div class="pipe-step ${isConfirmed ? 'skipped' : (p.alert30m.sent ? 'sent' : '')}" title="Alerta 30m">30m</div>
        <div class="pipe-step ${isConfirmed ? 'skipped' : (p.alert15m.sent ? 'sent' : '')}" title="Alerta 15m">15m</div>
        <div class="pipe-step ${p.alert0m.sent ? 'confirmed' : ''}" title="Google Meet">Meet</div>
      </div>

      <!-- Coluna 5: Ações Rápidas -->
      <div class="actions-cell">
        ${meeting.status !== 'confirmed' && meeting.status !== 'noshow' ? `
          <button class="btn-tbl confirm" data-action="confirm" data-id="${meeting.id}" title="Confirmar Presença">
            ✓ Confirmar
          </button>
        ` : ''}

        <a href="${escapeHtml(meeting.meetLink)}" target="_blank" class="btn-tbl meet" title="Abrir Link do Google Meet">
          🔗 Meet
        </a>

        ${meeting.status !== 'noshow' ? `
          <button class="btn-tbl more" data-action="preview" data-id="${meeting.id}" title="Ver Mensagem">
            💬
          </button>
          <button class="btn-tbl more" data-action="noshow" data-id="${meeting.id}" title="Declarar No-Show" style="color: var(--rose);">
            🚫
          </button>
        ` : `
          <span class="noshow-tag">NO-SHOW</span>
        `}
      </div>
    `;

    container.appendChild(row);
  });

  // Vincular eventos aos botões dentro das linhas
  container.querySelectorAll('button[data-action]').forEach(btn => {
    btn.addEventListener('click', handleCardAction);
  });
}

// Ações dos Cards
function handleCardAction(e) {
  const action = e.currentTarget.dataset.action;
  const id = e.currentTarget.dataset.id;
  const meeting = STATE.meetings.find(m => m.id === id);
  if (!meeting) return;

  if (action === 'confirm') {
    meeting.status = 'confirmed';
    meeting.pipeline.alert30m.skipped = true;
    meeting.pipeline.alert15m.skipped = true;
    saveMeetings();
    renderApp();
    showToast(`✅ Reunião com ${meeting.clientName} marcada como CONFIRMADA! Lembretes intermediários pulados.`, 'success');
  } 
  else if (action === 'noshow') {
    if (confirm(`Deseja registrar NO-SHOW para ${meeting.clientName}? O cliente será movido para a coluna NO SHOW no CRM.`)) {
      meeting.status = 'noshow';
      meeting.pipeline.noShowAlert.sent = true;
      meeting.pipeline.noShowAlert.sentAt = new Date().toLocaleTimeString().slice(0, 5);
      saveMeetings();
      renderApp();
      
      // Simula a movimentação de etapa no MindChat
      simulateCrmMove(meeting);
    }
  }
  else if (action === 'preview') {
    openPreviewModal(meeting);
  }
}

// Simulação Segura de Movimentação no CRM
function simulateCrmMove(meeting) {
  showToast(`[Modo Seguro] Lead ${meeting.clientName} movido para a etapa NO SHOW no CRM do MindChat!`, 'warning');
}

// Modal de Pré-visualização de Mensagem
function openPreviewModal(meeting) {
  const modal = document.getElementById('modal-preview-message');
  const recipientInput = document.getElementById('preview-recipient');
  const textArea = document.getElementById('preview-text');

  recipientInput.value = `${meeting.clientName} (${meeting.clientPhone})`;
  
  // Mensagem calculada
  const text = STATE.templates.ALERT_60M
    .replace('{cliente}', meeting.clientName)
    .replace('{advogado}', meeting.lawyer)
    .replace('{horario}', meeting.time);

  textArea.value = text;
  modal.classList.add('active');

  const sendBtn = document.getElementById('btn-confirm-send-preview');
  sendBtn.onclick = () => {
    modal.classList.remove('active');
    showToast(`🛡️ [Modo Seguro]: Mensagem simulada com sucesso para ${meeting.clientName}! (Nenhum envio real realizado)`, 'info');
  };
}

// Atualização dos Campos da Aba Templates
function populateTemplateFields() {
  document.getElementById('template-alert-60m').value = STATE.templates.ALERT_60M;
  document.getElementById('template-alert-30m').value = STATE.templates.ALERT_30M;
  document.getElementById('template-alert-15m').value = STATE.templates.ALERT_15M;
  document.getElementById('template-alert-0m').value = STATE.templates.ALERT_0M;
  document.getElementById('template-noshow-1h').value = STATE.templates.NO_SHOW_1H;
}

// Atualização dos Campos da Aba Integração
function populateIntegrationFields() {
  document.getElementById('config-api-url').value = CONFIG.MINDCHAT.API_URL;
  document.getElementById('config-api-key').value = CONFIG.MINDCHAT.API_KEY;
  document.getElementById('config-instance-id').value = `${CONFIG.MINDCHAT.INSTANCE_NAME} (${CONFIG.MINDCHAT.INSTANCE_ID})`;
  document.getElementById('config-stage-waiting').value = CONFIG.MINDCHAT.STAGES.AGUARDANDO_REUNIAO;
  document.getElementById('config-stage-noshow').value = CONFIG.MINDCHAT.STAGES.NO_SHOW;
}

// Relógio do Sistema e Verificação da Régua
function setupSimulationClock() {
  setInterval(() => {
    const now = getCurrentTime();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('live-clock').textContent = `${h}:${m}:${s}`;

    // A cada minuto, atualiza as contagens regressivas
    if (now.getSeconds() === 0) {
      checkAutomatedTriggers(now);
      renderMeetingsList();
    }
  }, 1000);
}

// Motor de Automação Anti No-Show (Disparos Automáticos Simulados)
function checkAutomatedTriggers(now) {
  STATE.meetings.forEach(meeting => {
    if (meeting.status === 'noshow') return;

    const [mH, mM] = meeting.time.split(':').map(Number);
    const meetingDate = new Date(now);
    meetingDate.setHours(mH, mM, 0, 0);

    const diffMinutes = Math.round((meetingDate - now) / 60000);

    // 1 Hora antes (60m)
    if (diffMinutes <= 60 && diffMinutes > 30 && !meeting.pipeline.alert60m.sent) {
      meeting.pipeline.alert60m.sent = true;
      meeting.pipeline.alert60m.sentAt = meeting.time;
      saveMeetings();
      showToast(`🟡 Alerta de 1h disparado para ${meeting.clientName}!`, 'warning');
    }

    // 30 Minutos antes (se não confirmado)
    if (diffMinutes <= 30 && diffMinutes > 15 && !meeting.pipeline.alert30m.sent && meeting.status !== 'confirmed') {
      meeting.pipeline.alert30m.sent = true;
      meeting.pipeline.alert30m.sentAt = meeting.time;
      saveMeetings();
      showToast(`🟠 Reforço de 30 min disparado para ${meeting.clientName}!`, 'warning');
    }

    // 15 Minutos antes (se não confirmado)
    if (diffMinutes <= 15 && diffMinutes > 0 && !meeting.pipeline.alert15m.sent && meeting.status !== 'confirmed') {
      meeting.pipeline.alert15m.sent = true;
      meeting.pipeline.alert15m.sentAt = meeting.time;
      saveMeetings();
      showToast(`🔴 Última chamada de 15 min disparada para ${meeting.clientName}!`, 'danger');
    }

    // No Horário (0m) - Envio do Google Meet
    if (diffMinutes <= 0 && diffMinutes > -30 && !meeting.pipeline.alert0m.sent) {
      meeting.pipeline.alert0m.sent = true;
      meeting.pipeline.alert0m.sentAt = meeting.time;
      saveMeetings();
      showToast(`🚀 Horário da Reunião! Link do Meet enviado para ${meeting.clientName}!`, 'success');
    }

    // 1 Hora pós-reunião (Se não confirmou e passou 60 min -> NO SHOW automático)
    if (diffMinutes <= -60 && meeting.status !== 'confirmed' && meeting.status !== 'noshow') {
      meeting.status = 'noshow';
      meeting.pipeline.noShowAlert.sent = true;
      saveMeetings();
      showToast(`⚠️ NO-SHOW DETECTADO: ${meeting.clientName} não compareceu. Movido para NO SHOW no CRM.`, 'danger', 6000);
      renderApp();
    }
  });
}

// Configuração de Eventos da Interface
function setupEventListeners() {
  // Navegação de Abas
  document.querySelectorAll('.nav-tab-btn, .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-tab-btn, .tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');

      btn.classList.add('active');
      const targetPane = document.getElementById(btn.dataset.tab);
      if (targetPane) targetPane.style.display = 'block';
    });
  });

  // Filtros
  document.getElementById('filter-search')?.addEventListener('input', e => {
    STATE.filterSearch = e.target.value;
    renderMeetingsList();
  });

  document.getElementById('filter-lawyer')?.addEventListener('change', e => {
    STATE.filterLawyer = e.target.value;
    renderMeetingsList();
  });

  document.getElementById('filter-status')?.addEventListener('change', e => {
    STATE.filterStatus = e.target.value;
    renderMeetingsList();
  });

  // Controles de Simulação de Tempo
  document.getElementById('btn-advance-15m')?.addEventListener('click', () => {
    STATE.simulatedTimeOffsetMs += 15 * 60 * 1000;
    const label = document.getElementById('sim-status-label');
    if (label) label.textContent = 'Simulação Ativa (+)';
    checkAutomatedTriggers(getCurrentTime());
    renderApp();
  });

  document.getElementById('btn-advance-30m')?.addEventListener('click', () => {
    STATE.simulatedTimeOffsetMs += 30 * 60 * 1000;
    const label = document.getElementById('sim-status-label');
    if (label) label.textContent = 'Simulação Ativa (+)';
    checkAutomatedTriggers(getCurrentTime());
    renderApp();
  });

  document.getElementById('btn-advance-1h')?.addEventListener('click', () => {
    STATE.simulatedTimeOffsetMs += 60 * 60 * 1000;
    const label = document.getElementById('sim-status-label');
    if (label) label.textContent = 'Simulação Ativa (+)';
    checkAutomatedTriggers(getCurrentTime());
    renderApp();
  });

  document.getElementById('btn-reset-time')?.addEventListener('click', () => {
    STATE.simulatedTimeOffsetMs = 0;
    const label = document.getElementById('sim-status-label');
    if (label) label.textContent = 'Modo Tempo Real';
    renderApp();
    showToast('Relógio sincronizado com a hora real.', 'info');
  });

  // Modal Novo Agendamento
  const modalNew = document.getElementById('modal-new-meeting');
  document.getElementById('btn-open-new-meeting').addEventListener('click', () => {
    modalNew.classList.add('active');
    document.getElementById('new-time').value = getRelativeTime(60);
  });

  document.getElementById('btn-close-modal').addEventListener('click', () => modalNew.classList.remove('active'));
  document.getElementById('btn-cancel-meeting').addEventListener('click', () => modalNew.classList.remove('active'));

  document.getElementById('form-new-meeting').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('new-client-name').value.trim();
    const phone = document.getElementById('new-client-phone').value.trim();
    const lawyer = document.getElementById('new-lawyer').value;
    const time = document.getElementById('new-time').value;
    const meetLink = document.getElementById('new-meet-link').value.trim();

    const newMeeting = {
      id: `meet-${Date.now()}`,
      clientName: name,
      clientPhone: phone,
      lawyer: lawyer,
      area: lawyer.includes('Trabalhista') ? 'Trabalhista' : 'Geral',
      time: time,
      meetLink: meetLink,
      status: 'pending',
      pipeline: {
        alert60m: { sent: false, sentAt: null },
        alert30m: { sent: false, sentAt: null },
        alert15m: { sent: false, sentAt: null },
        alert0m: { sent: false, sentAt: null },
        noShowAlert: { sent: false, sentAt: null }
      }
    };

    STATE.meetings.push(newMeeting);
    saveMeetings();
    modalNew.classList.remove('active');
    e.target.reset();
    renderApp();
    showToast(`✅ Agendamento para ${name} criado e régua anti no-show ativada!`, 'success');
  });

  // Modal Preview
  document.getElementById('btn-close-preview').addEventListener('click', () => {
    document.getElementById('modal-preview-message').classList.remove('active');
  });
  document.getElementById('btn-cancel-preview').addEventListener('click', () => {
    document.getElementById('modal-preview-message').classList.remove('active');
  });

  // Salvar Templates
  document.getElementById('btn-save-templates').addEventListener('click', () => {
    STATE.templates.ALERT_60M = document.getElementById('template-alert-60m').value;
    STATE.templates.ALERT_30M = document.getElementById('template-alert-30m').value;
    STATE.templates.ALERT_15M = document.getElementById('template-alert-15m').value;
    STATE.templates.ALERT_0M = document.getElementById('template-alert-0m').value;
    STATE.templates.NO_SHOW_1H = document.getElementById('template-noshow-1h').value;

    saveTemplates();
    showToast('💾 Textos da régua atualizados com sucesso!', 'success');
  });

  // Botão Sincronizar CRM
  document.getElementById('btn-sync-mindchat').addEventListener('click', () => {
    showToast('🔄 Conectando com a API do MindChat...', 'info');
    setTimeout(() => {
      showToast('✅ 30 leads sincronizados da etapa "Aguardando reunião"!', 'success');
    }, 1200);
  });

  // Botão Testar Conexão
  document.getElementById('btn-test-connection').addEventListener('click', () => {
    showToast('🔌 Testando autenticação via X-Api-Key...', 'info');
    setTimeout(() => {
      showToast('✅ Conexão ativa com Tosato advogados associados (Mind17)!', 'success');
    }, 1000);
  });
}

// Utilitário de Toast
function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
