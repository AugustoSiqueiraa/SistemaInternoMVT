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
  filterClient: '',
  filterLawyer: 'all',
  filterArea: 'all',
  filterTime: '',
  filterStatus: 'all',

  // Google Agenda: Visão, Data atual e Filtro do Comercial
  calendarView: 'week', // 'week', 'day' ou 'month'
  calendarDate: new Date(),
  calendarTeamFilter: 'all'
};

// Pauta de Reuniões Integrada do Escritório (Leads Reais do MindChat)
const DEFAULT_ACTIVE_MEETINGS = [
  {
    id: "mind-1942503",
    clientName: "vanessa CP",
    clientPhone: "5512991876015",
    lawyer: "Augusto",
    area: "Trabalhista",
    time: "09:00",
    meetLink: "https://meet.google.com/mvt-augusto",
    status: "pending",
    pipeline: {
      alert60m: { sent: false, sentAt: null },
      alert30m: { sent: false, sentAt: null },
      alert15m: { sent: false, sentAt: null },
      alert0m: { sent: false, sentAt: null },
      noShowAlert: { sent: false, sentAt: null }
    }
  },
  {
    id: "mind-2019343",
    clientName: "Andrea",
    clientPhone: "5517991664291",
    lawyer: "Ana Carla",
    area: "Trabalhista",
    time: "09:30",
    meetLink: "https://meet.google.com/mvt-anacarla",
    status: "pending",
    pipeline: {
      alert60m: { sent: false, sentAt: null },
      alert30m: { sent: false, sentAt: null },
      alert15m: { sent: false, sentAt: null },
      alert0m: { sent: false, sentAt: null },
      noShowAlert: { sent: false, sentAt: null }
    }
  },
  {
    id: "mind-2011188",
    clientName: "Alexandre Faganelli Braun",
    clientPhone: "5513991505960",
    lawyer: "Augusto",
    area: "Trabalhista",
    time: "10:30",
    meetLink: "https://meet.google.com/mvt-augusto",
    status: "pending",
    pipeline: {
      alert60m: { sent: false, sentAt: null },
      alert30m: { sent: false, sentAt: null },
      alert15m: { sent: false, sentAt: null },
      alert0m: { sent: false, sentAt: null },
      noShowAlert: { sent: false, sentAt: null }
    }
  },
  {
    id: "mind-2073737",
    clientName: "Maiara",
    clientPhone: "5517991411754",
    lawyer: "Augusto",
    area: "Trabalhista",
    time: "11:00",
    meetLink: "https://meet.google.com/mvt-augusto",
    status: "pending",
    pipeline: {
      alert60m: { sent: false, sentAt: null },
      alert30m: { sent: false, sentAt: null },
      alert15m: { sent: false, sentAt: null },
      alert0m: { sent: false, sentAt: null },
      noShowAlert: { sent: false, sentAt: null }
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

// ============================================================
// SUPABASE — BANCO DE DADOS EM NUVEM
// ============================================================
const SUPABASE_URL = 'https://klrajawehrzqnvbknjea.supabase.co';
const SUPABASE_KEY = 'sb_publishable_BX9Led8X5QzH0rj9riUQqw_YI1nHqw8';

let supabaseClient = null;
function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  try {
    const sb = window.supabase || window.supabaseJs;
    if (sb && typeof sb.createClient === 'function') {
      supabaseClient = sb.createClient(SUPABASE_URL, SUPABASE_KEY);
      console.log('✅ Supabase conectado ao banco SistemaInterno!');
      return supabaseClient;
    }
  } catch (e) {
    console.warn('⚠️ Erro ao inicializar SDK Supabase:', e);
  }
  return null;
}

// Converte um objeto de reunião do STATE para o formato da tabela Supabase
function _meetingToRow(m) {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return {
    id: String(m.id || Date.now()),
    client_name: String(m.clientName || 'Cliente Sem Nome'),
    client_phone: String(m.clientPhone || ''),
    lawyer: String(m.lawyer || ''),
    area: String(m.area || ''),
    meeting_date: m.date || m.meeting_date || today,
    meeting_time: String(m.time || ''),
    meet_link: String(m.meetLink || ''),
    status: String(m.status || 'pending'),
    alert_60m_sent: Boolean(m.pipeline?.alert60m?.sent),
    alert_60m_at: m.pipeline?.alert60m?.sentAt || null,
    alert_30m_sent: Boolean(m.pipeline?.alert30m?.sent),
    alert_30m_at: m.pipeline?.alert30m?.sentAt || null,
    alert_15m_sent: Boolean(m.pipeline?.alert15m?.sent),
    alert_15m_at: m.pipeline?.alert15m?.sentAt || null,
    alert_0m_sent: Boolean(m.pipeline?.alert0m?.sent),
    alert_0m_at: m.pipeline?.alert0m?.sentAt || null,
    no_show_alert_sent: Boolean(m.pipeline?.noShowAlert?.sent),
    no_show_alert_at: m.pipeline?.noShowAlert?.sentAt || null,
    updated_at: new Date().toISOString()
  };
}

// Salvar TODAS as reuniões no Supabase + localStorage backup
async function saveMeetings() {
  // 1. Salva local imediatamente (sem latência de rede)
  localStorage.setItem('mvt_meetings', JSON.stringify(STATE.meetings));

  const client = getSupabaseClient();
  if (!client) return;
  try {
    for (const m of STATE.meetings) {
      const row = _meetingToRow(m);
      await client.from('reunioes').upsert(row, { onConflict: 'id' });
    }
    console.log('✅ Reuniões salvas no Supabase!');
  } catch (err) {
    console.error('❌ Erro ao salvar no Supabase:', err);
  }
}

// Salvar UMA reunião específica no Supabase (chamada após cada ação)
async function saveSingleMeeting(meeting) {
  localStorage.setItem('mvt_meetings', JSON.stringify(STATE.meetings));
  const client = getSupabaseClient();
  if (!client) return;
  try {
    const row = _meetingToRow(meeting);
    const { error } = await client
      .from('reunioes')
      .upsert(row, { onConflict: 'id' });
    if (error) throw error;
    console.log(`✅ Reunião ${meeting.id} sincronizada no Supabase!`);
  } catch (err) {
    console.error('❌ Erro ao salvar reunião no Supabase:', err);
  }
}

// Registrar um evento no histórico permanente do Supabase
async function logEvent(tipo, meeting, extra = '') {
  const client = getSupabaseClient();
  if (!client) return;
  try {
    await client.from('historico_eventos').insert({
      tipo_evento: tipo,
      reuniao_id: String(meeting.id || ''),
      client_name: String(meeting.clientName || ''),
      client_phone: String(meeting.clientPhone || ''),
      lawyer: String(meeting.lawyer || ''),
      meeting_time: String(meeting.time || ''),
      descricao: extra || `${tipo} — ${meeting.clientName} (${meeting.time})`,
      data_evento: new Date().toISOString()
    });
    console.log(`📝 Evento [${tipo}] gravado com sucesso no Supabase!`);
  } catch (err) {
    console.warn('⚠️ Log de evento no Supabase falhou (não bloqueante):', err);
  }
}

// Sincronização manual via interface
async function syncWithSupabase() {
  const client = getSupabaseClient();
  if (!client) {
    showToast('⚠️ Conexão com Supabase indisponível no momento.', 'warning');
    return;
  }
  showToast('☁️ Sincronizando com o Supabase...', 'info', 2000);
  try {
    await saveMeetings();
    await logEvent('SINCRONIZACAO_MANUAL', {
      id: 'sistema',
      clientName: 'Painel do Sistema',
      clientPhone: '',
      lawyer: 'Administrador',
      time: new Date().toLocaleTimeString('pt-BR')
    }, 'Sincronização manual executada pelo usuário');
    showToast('✅ Banco de Dados Supabase 100% atualizado!', 'success', 4000);
  } catch (e) {
    showToast('❌ Erro ao sincronizar com o banco: ' + e.message, 'danger');
  }
}

// Carregar reuniões do Supabase (ou localStorage se offline)
async function loadMeetingsFromSupabase() {
  const client = getSupabaseClient();
  if (!client) return false;
  try {
    const { data, error } = await client
      .from('reunioes')
      .select('*')
      .order('meeting_time', { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) {
      console.log('☁️ Banco Supabase sem registros ativos, inicializando pauta real do escritório...');
      if (!STATE.meetings || STATE.meetings.length === 0) {
        STATE.meetings = [...DEFAULT_ACTIVE_MEETINGS];
      }
      await saveMeetings();
      return true;
    }

    STATE.meetings = data
      .filter(row => !String(row.id).startsWith('demo-') && !String(row.id).startsWith('mind-0') && row.lawyer !== 'Dr. Marcus')
      .map(row => ({
      id: row.id,
      clientName: row.client_name,
      clientPhone: row.client_phone,
      lawyer: (row.lawyer || '')
        .replace('Dr. Augusto Siqueira', 'Augusto')
        .replace('Dra. Ana Carla', 'Ana Carla')
        .replace('Dr. Augusto', 'Augusto'),
      area: row.area,
      date: row.meeting_date || new Date().toISOString().split('T')[0],
      time: row.meeting_time,
      meetLink: row.meet_link,
      status: row.status,
      pipeline: {
        alert60m: { sent: Boolean(row.alert_60m_sent), sentAt: row.alert_60m_at },
        alert30m: { sent: Boolean(row.alert_30m_sent), sentAt: row.alert_30m_at },
        alert15m: { sent: Boolean(row.alert_15m_sent), sentAt: row.alert_15m_at },
        alert0m:  { sent: Boolean(row.alert_0m_sent),  sentAt: row.alert_0m_at  },
        noShowAlert: { sent: Boolean(row.no_show_alert_sent), sentAt: row.no_show_alert_at }
      }
    }));

    localStorage.setItem('mvt_meetings', JSON.stringify(STATE.meetings));
    console.log(`✅ ${data.length} reuniões carregadas do Supabase com sucesso!`);
    return true;
  } catch (err) {
    console.error('❌ Erro ao carregar do Supabase, usando dados locais:', err);
    return false;
  }
}

function saveTemplates() {
  localStorage.setItem('mvt_templates', JSON.stringify(STATE.templates));
}


document.addEventListener('DOMContentLoaded', async () => {
  setupThemeToggle();
  loadStoredData(); // carrega localStorage primeiro (rápido)
  setupEventListeners();
  setupSimulationClock();
  renderApp();

  // Tenta carregar do Supabase em background (sobrescreve o localStorage)
  const loadedFromCloud = await loadMeetingsFromSupabase();
  if (loadedFromCloud && STATE.meetings.length > 0) {
    renderApp();
    showToast('☁️ Reuniões carregadas do banco de dados!', 'success', 3000);
  } else {
    // Sincroniza automaticamente com o MindChat!
    await syncMindChatLeads(true);
  }

  // Ativa escuta em tempo real do banco de dados (WebSockets)
  setupSupabaseRealtime();
  
  // Inicializar integração com Google Agenda
  setupGoogleCalendarIntegration();
  
  showToast('🛡️ Modo Seguro Ativado: Monitoramento automático em tempo real.', 'info', 6000);
});

// Escuta em tempo real do Supabase (WebSocket)
function setupSupabaseRealtime() {
  const client = getSupabaseClient();
  if (!client) return;
  try {
    client
      .channel('reunioes-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reunioes' }, async (payload) => {
        console.log('⚡ Atualização recebida do Supabase em tempo real:', payload);
        await loadMeetingsFromSupabase();
        renderApp();
        showToast('⚡ Painel atualizado em tempo real!', 'info', 2500);
      })
      .subscribe();
    console.log('⚡ Canal em tempo real do Supabase conectado!');
  } catch (err) {
    console.warn('Realtime subscription error:', err);
  }
}

// Alternador de Modo Noturno (Lua) / Modo Dia (Sol) com Chave Deslizante Minimalista
function setupThemeToggle() {
  const checkbox = document.getElementById('theme-toggle-checkbox');
  const thumb = document.getElementById('theme-switch-thumb');
  const legacyBtn = document.getElementById('btn-theme-toggle');
  
  const moonSvg = `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  const sunSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

  const savedTheme = localStorage.getItem('mvt_theme') || 'dark';
  applyTheme(savedTheme);

  if (checkbox) {
    checkbox.addEventListener('change', () => {
      const newTheme = checkbox.checked ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('mvt_theme', newTheme);
      showToast(`Modo ${newTheme === 'light' ? 'Dia ☀️' : 'Noturno 🌙'} ativado!`, 'info', 1800);
    });
  }

  if (legacyBtn) {
    legacyBtn.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-theme');
      const newTheme = isLight ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('mvt_theme', newTheme);
    });
  }

  function applyTheme(theme) {
    const isLight = theme === 'light';
    if (checkbox) checkbox.checked = isLight;

    if (isLight) {
      document.body.classList.add('light-theme');
      if (thumb) thumb.innerHTML = sunSvg;
    } else {
      document.body.classList.remove('light-theme');
      if (thumb) thumb.innerHTML = moonSvg;
    }
  }
}

// Carrega dados salvos locais
function loadStoredData() {
  const savedMeetings = localStorage.getItem('mvt_meetings');
  if (savedMeetings) {
    try {
      const parsed = JSON.parse(savedMeetings);
      const filtered = Array.isArray(parsed)
        ? parsed.filter(m => !String(m.id).startsWith('demo-') && !String(m.id).startsWith('mind-0') && m.lawyer !== 'Dr. Marcus' && m.clientName !== 'Fernando Guimarães')
        : [];
      STATE.meetings = filtered.length > 0 ? filtered : [...DEFAULT_ACTIVE_MEETINGS];
    } catch {
      STATE.meetings = [...DEFAULT_ACTIVE_MEETINGS];
    }
  } else {
    STATE.meetings = [...DEFAULT_ACTIVE_MEETINGS];
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

// Obter hora atual (com offset da simulação)
function getCurrentTime() {
  return new Date(Date.now() + STATE.simulatedTimeOffsetMs);
}

// RENDERIZAÇÃO PRINCIPAL
function renderApp() {
  renderMetrics();
  renderMeetingsList();
  renderCalendarGrid();
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

  const countBadge = document.getElementById('meetings-count-badge');
  if (countBadge) countBadge.textContent = `${total} agendamento${total !== 1 ? 's' : ''}`;

  // Atualizar a data no cabeçalho
  const dateLabel = document.getElementById('today-date-label');
  if (dateLabel) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = new Date().toLocaleDateString('pt-BR', options);
    dateLabel.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
  }
}

// Renderiza a Lista de Reuniões em Linhas Executivas
function renderMeetingsList() {
  const container = document.getElementById('meetings-list-container');
  container.innerHTML = '';

  const now = getCurrentTime();

  // Filtragem Multicritério com Popup Centralizado
  const filtered = STATE.meetings.filter(m => {
    // 1. Cliente / Telefone
    const clientTerm = (STATE.filterClient || STATE.filterSearch || '').toLowerCase().trim();
    const matchClient = !clientTerm || 
                        (m.clientName && m.clientName.toLowerCase().includes(clientTerm)) ||
                        (m.clientPhone && String(m.clientPhone).includes(clientTerm));

    // 2. Atendente / Responsável Comercial
    const lawyerTerm = STATE.filterLawyer || 'all';
    const matchLawyer = lawyerTerm === 'all' || 
                        (m.lawyer && m.lawyer.toLowerCase().includes(lawyerTerm.toLowerCase()));

    // 3. Área
    const areaTerm = STATE.filterArea || 'all';
    const matchArea = areaTerm === 'all' || 
                      (m.area && m.area.toLowerCase().includes(areaTerm.toLowerCase()));

    // 4. Horário
    const timeTerm = (STATE.filterTime || '').trim();
    const matchTime = !timeTerm || (m.time && m.time.startsWith(timeTerm));

    // 5. Categoria / Status
    let matchStatus = true;
    if (STATE.filterStatus === 'confirmed') {
      matchStatus = m.status === 'confirmed';
    } else if (STATE.filterStatus === 'pending') {
      matchStatus = m.status === 'pending';
    } else if (STATE.filterStatus === 'noshow') {
      matchStatus = m.status === 'noshow';
    } else if (STATE.filterStatus === 'today') {
      const todayStr = new Date().toISOString().split('T')[0];
      matchStatus = !m.date || m.date === todayStr;
    } // 'all' matches all

    return matchClient && matchLawyer && matchArea && matchTime && matchStatus;
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

      <!-- Coluna 3: Comercial (Sem ícone) -->
      <div class="commercial-cell">
        <span class="commercial-cell-name">${escapeHtml(meeting.lawyer || 'Augusto')}</span>
      </div>

      <!-- Coluna 4: Área -->
      <div class="area-cell">
        <span class="area-badge">${escapeHtml(meeting.area || 'Geral')}</span>
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
    saveSingleMeeting(meeting);
    logEvent('CONFIRMADO', meeting, `Cliente ${meeting.clientName} confirmou presença para a reunião das ${meeting.time} com ${meeting.lawyer}`);
    renderApp();
    showToast(`✅ Reunião com ${meeting.clientName} marcada como CONFIRMADA! Lembretes intermediários pulados.`, 'success');
  } 
  else if (action === 'noshow') {
    if (confirm(`Deseja registrar NO-SHOW para ${meeting.clientName}? O cliente será movido para a coluna NO SHOW no CRM.`)) {
      meeting.status = 'noshow';
      meeting.pipeline.noShowAlert.sent = true;
      meeting.pipeline.noShowAlert.sentAt = new Date().toLocaleTimeString().slice(0, 5);
      saveSingleMeeting(meeting);
      logEvent('NO_SHOW', meeting, `Cliente ${meeting.clientName} (${meeting.clientPhone}) registrado como NO-SHOW na reunião das ${meeting.time} com ${meeting.lawyer}`);
      renderApp();
      
      // Simula a movimentação de etapa no MindChat
      simulateCrmMove(meeting);
    }
  }
  else if (action === 'preview') {
    openPreviewModal(meeting);
  }
}

// Equipe do Comercial e Advogadas do Escritório
const TEAM_MEMBERS = (window.CONFIG && window.CONFIG.TEAM) || [
  { id: "augusto", name: "Augusto", role: "Comercial", area: "Comercial" },
  { id: "ana_carla", name: "Ana Carla", role: "Comercial", area: "Comercial" },
  { id: "julia", name: "Julia", role: "Comercial", area: "Comercial" },
  { id: "joao", name: "João", role: "Comercial", area: "Comercial" },
  { id: "natalia", name: "Dra. Natalia", role: "Advogada", area: "Trabalhista" },
  { id: "ludmila", name: "Dra. Ludmila", role: "Advogada", area: "Cível / Geral" }
];

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

// Utilitário para formatar/obter a data da reunião (YYYY-MM-DD)
function getMeetingDateStr(meeting) {
  if (meeting.meeting_date) return String(meeting.meeting_date).substring(0, 10);
  if (meeting.date) return String(meeting.date).substring(0, 10);
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// Filtro de equipe para o calendário
function meetingMatchesTeamFilter(meeting) {
  const filter = STATE.calendarTeamFilter || 'all';
  if (filter === 'all') return true;

  const mLawyer = (meeting.lawyer || '').toLowerCase();
  const fLower = filter.toLowerCase();

  if (fLower.includes('augusto') && mLawyer.includes('augusto')) return true;
  if (fLower.includes('ana carla') && mLawyer.includes('ana carla')) return true;
  if (fLower.includes('julia') && mLawyer.includes('julia')) return true;
  if ((fLower.includes('joão') || fLower.includes('joao')) && (mLawyer.includes('joão') || mLawyer.includes('joao'))) return true;
  if (fLower.includes('natalia') && mLawyer.includes('natalia')) return true;
  if (fLower.includes('ludmila') && mLawyer.includes('ludmila')) return true;

  return mLawyer.includes(fLower);
}

// Vincula cliques para abrir o modal de detalhes/mensagens
function _bindMeetingBlockClicks(container) {
  container.querySelectorAll('.cal-meeting-block, .cal-month-pill').forEach(el => {
    el.addEventListener('click', () => {
      const meeting = STATE.meetings.find(m => m.id === el.dataset.id);
      if (meeting) openPreviewModal(meeting);
    });
  });
}

// VISÃO SEMANA (Google Agenda Oficial)
function renderCalendarWeek(container) {
  const current = new Date(STATE.calendarDate || new Date());
  
  // Calcular início da semana (Segunda-feira)
  const dayOfWeek = current.getDay(); // 0 Dom, 1 Seg, ..., 6 Sab
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const startOfWeek = new Date(current);
  startOfWeek.setDate(current.getDate() + diffToMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    weekDays.push(d);
  }

  const endOfWeek = weekDays[6];

  // Atualizar título na barra
  const titleEl = document.getElementById('calendar-view-title');
  if (titleEl) {
    const sMonth = startOfWeek.toLocaleDateString('pt-BR', { month: 'short' });
    const eMonth = endOfWeek.toLocaleDateString('pt-BR', { month: 'short' });
    const year = endOfWeek.getFullYear();
    if (sMonth === eMonth) {
      titleEl.textContent = `📅 ${startOfWeek.getDate()} a ${endOfWeek.getDate()} de ${sMonth} de ${year}`;
    } else {
      titleEl.textContent = `📅 ${startOfWeek.getDate()} de ${sMonth} a ${endOfWeek.getDate()} de ${eMonth} de ${year}`;
    }
  }

  const today = new Date();
  const todayStr = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-');

  let html = `
    <div class="cal-grid-header" style="grid-template-columns: 80px repeat(7, 1fr);">
      <div class="cal-header-cell time-axis">HORÁRIO</div>
      ${weekDays.map(d => {
        const dStr = [
          d.getFullYear(),
          String(d.getMonth() + 1).padStart(2, '0'),
          String(d.getDate()).padStart(2, '0')
        ].join('-');
        const isToday = dStr === todayStr;
        const weekdayName = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '').toUpperCase();
        return `
          <div class="cal-header-cell ${isToday ? 'cal-col-is-today' : ''}">
            <div style="font-weight: 700;">
              ${weekdayName}
              ${isToday ? `<span class="cal-today-circle">${d.getDate()}</span>` : d.getDate()}
            </div>
            <small style="color: var(--text-dim); font-size: 0.68rem;">${d.toLocaleDateString('pt-BR', { month: 'short' })}</small>
          </div>
        `;
      }).join('')}
    </div>
  `;

  TIME_SLOTS.forEach(slot => {
    const slotHour = parseInt(slot.split(':')[0], 10);

    html += `
      <div class="cal-time-row" style="grid-template-columns: 80px repeat(7, 1fr);">
        <div class="cal-time-label">${slot}</div>
        ${weekDays.map(d => {
          const dStr = [
            d.getFullYear(),
            String(d.getMonth() + 1).padStart(2, '0'),
            String(d.getDate()).padStart(2, '0')
          ].join('-');
          const isToday = dStr === todayStr;

          const slotMeetings = STATE.meetings.filter(m => {
            const mDateStr = getMeetingDateStr(m);
            if (mDateStr !== dStr) return false;
            if (!meetingMatchesTeamFilter(m)) return false;
            const [mH] = m.time.split(':').map(Number);
            return mH === slotHour;
          });

          return `
            <div class="cal-slot-cell ${isToday ? 'cal-col-is-today' : ''}">
              ${slotMeetings.map(m => `
                <div class="cal-meeting-block ${m.status}" data-id="${m.id}" title="Reunião: ${escapeHtml(m.clientName)} (${escapeHtml(m.lawyer)})">
                  <div class="cal-meeting-title">👤 ${escapeHtml(m.clientName)}</div>
                  <div class="cal-meeting-meta">
                    <span>🕒 ${m.time}</span>
                    <span style="font-weight: 600; color: var(--blue-light);">${escapeHtml(m.lawyer ? m.lawyer.split(' ')[0] : '')}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          `;
        }).join('')}
      </div>
    `;
  });

  container.innerHTML = html;
  _bindMeetingBlockClicks(container);
}

// VISÃO DIA (Google Agenda Oficial)
function renderCalendarDay(container) {
  const current = new Date(STATE.calendarDate || new Date());
  const dayStr = [
    current.getFullYear(),
    String(current.getMonth() + 1).padStart(2, '0'),
    String(current.getDate()).padStart(2, '0')
  ].join('-');

  const today = new Date();
  const todayStr = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-');
  const isToday = dayStr === todayStr;

  const titleEl = document.getElementById('calendar-view-title');
  if (titleEl) {
    const dayName = current.toLocaleDateString('pt-BR', { weekday: 'long' });
    const fullDate = current.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    titleEl.textContent = `📅 ${dayName.charAt(0).toUpperCase() + dayName.slice(1)}, ${fullDate}`;
  }

  const selected = STATE.calendarTeamFilter || 'all';
  const membersToDisplay = selected === 'all'
    ? TEAM_MEMBERS
    : TEAM_MEMBERS.filter(t => t.name.toLowerCase().includes(selected.toLowerCase()) || selected.toLowerCase().includes(t.name.toLowerCase()));

  const colCount = Math.max(membersToDisplay.length, 1);

  let html = `
    <div class="cal-grid-header" style="grid-template-columns: 80px repeat(${colCount}, 1fr);">
      <div class="cal-header-cell time-axis">HORÁRIO</div>
      ${membersToDisplay.map(m => `
        <div class="cal-header-cell ${isToday ? 'cal-col-is-today' : ''}">
          <div style="font-weight: 700;">${escapeHtml(m.name)}</div>
          <small style="color: var(--blue-light); font-size: 0.68rem;">${escapeHtml(m.role || m.area)}</small>
        </div>
      `).join('')}
    </div>
  `;

  TIME_SLOTS.forEach(slot => {
    const slotHour = parseInt(slot.split(':')[0], 10);

    html += `
      <div class="cal-time-row" style="grid-template-columns: 80px repeat(${colCount}, 1fr);">
        <div class="cal-time-label">${slot}</div>
        ${membersToDisplay.map(member => {
          const slotMeetings = STATE.meetings.filter(m => {
            const mDateStr = getMeetingDateStr(m);
            if (mDateStr !== dayStr) return false;
            const [mH] = m.time.split(':').map(Number);
            if (mH !== slotHour) return false;

            const mLawyer = (m.lawyer || '').toLowerCase();
            const memName = member.name.toLowerCase();
            return mLawyer.includes(memName) || memName.includes(mLawyer);
          });

          return `
            <div class="cal-slot-cell ${isToday ? 'cal-col-is-today' : ''}">
              ${slotMeetings.map(m => `
                <div class="cal-meeting-block ${m.status}" data-id="${m.id}" title="Reunião: ${escapeHtml(m.clientName)}">
                  <div class="cal-meeting-title">👤 ${escapeHtml(m.clientName)}</div>
                  <div class="cal-meeting-meta">
                    <span>🕒 ${m.time}</span>
                    <span>${m.status === 'confirmed' ? '✓ Confirmado' : (m.status === 'noshow' ? '🚫 No-Show' : '⏳ Aguardando')}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          `;
        }).join('')}
      </div>
    `;
  });

  container.innerHTML = html;
  _bindMeetingBlockClicks(container);
}

// VISÃO MÊS (Google Agenda Oficial)
function renderCalendarMonth(container) {
  const current = new Date(STATE.calendarDate || new Date());
  const year = current.getFullYear();
  const month = current.getMonth();

  const titleEl = document.getElementById('calendar-view-title');
  if (titleEl) {
    const monthName = current.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    titleEl.textContent = `📅 ${monthName.charAt(0).toUpperCase() + monthName.slice(1)}`;
  }

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 Dom, ..., 6 Sab
  const daysInMonth = lastDayOfMonth.getDate();
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const today = new Date();
  const todayStr = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-');

  let html = `
    <div class="cal-month-header">
      <div>DOM</div><div>SEG</div><div>TER</div><div>QUA</div><div>QUI</div><div>SEX</div><div>SÁB</div>
    </div>
    <div class="cal-month-grid">
  `;

  // Dias do mês anterior
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const dayNum = prevMonthLastDay - i;
    const prevDate = new Date(year, month - 1, dayNum);
    const prevDateStr = [
      prevDate.getFullYear(),
      String(prevDate.getMonth() + 1).padStart(2, '0'),
      String(prevDate.getDate()).padStart(2, '0')
    ].join('-');

    const meetingsThisDay = STATE.meetings.filter(m => getMeetingDateStr(m) === prevDateStr && meetingMatchesTeamFilter(m));

    html += `
      <div class="cal-month-cell other-month">
        <div class="cal-month-date">${dayNum}</div>
        ${meetingsThisDay.map(m => `
          <div class="cal-month-pill ${m.status}" data-id="${m.id}" title="${m.time} - ${escapeHtml(m.clientName)} (${escapeHtml(m.lawyer)})">
            ${m.time} ${escapeHtml(m.clientName)}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Dias do mês atual
  for (let day = 1; day <= daysInMonth; day++) {
    const thisDate = new Date(year, month, day);
    const thisDateStr = [
      thisDate.getFullYear(),
      String(thisDate.getMonth() + 1).padStart(2, '0'),
      String(thisDate.getDate()).padStart(2, '0')
    ].join('-');
    const isToday = thisDateStr === todayStr;

    const meetingsThisDay = STATE.meetings.filter(m => getMeetingDateStr(m) === thisDateStr && meetingMatchesTeamFilter(m));

    html += `
      <div class="cal-month-cell ${isToday ? 'today-cell' : ''}">
        <div class="cal-month-date" style="${isToday ? 'color: var(--blue-light); font-weight: 800;' : ''}">${day}</div>
        ${meetingsThisDay.map(m => `
          <div class="cal-month-pill ${m.status}" data-id="${m.id}" title="${m.time} - ${escapeHtml(m.clientName)} (${escapeHtml(m.lawyer)})">
            ${m.time} ${escapeHtml(m.clientName)}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Próximo mês para completar semanas
  const totalCellsSoFar = startDayOfWeek + daysInMonth;
  const remainingCells = (7 - (totalCellsSoFar % 7)) % 7;
  for (let nextDay = 1; nextDay <= remainingCells; nextDay++) {
    const nextDate = new Date(year, month + 1, nextDay);
    const nextDateStr = [
      nextDate.getFullYear(),
      String(nextDate.getMonth() + 1).padStart(2, '0'),
      String(nextDate.getDate()).padStart(2, '0')
    ].join('-');

    const meetingsThisDay = STATE.meetings.filter(m => getMeetingDateStr(m) === nextDateStr && meetingMatchesTeamFilter(m));

    html += `
      <div class="cal-month-cell other-month">
        <div class="cal-month-date">${nextDay}</div>
        ${meetingsThisDay.map(m => `
          <div class="cal-month-pill ${m.status}" data-id="${m.id}" title="${m.time} - ${escapeHtml(m.clientName)} (${escapeHtml(m.lawyer)})">
            ${m.time} ${escapeHtml(m.clientName)}
          </div>
        `).join('')}
      </div>
    `;
  }

  html += `</div>`;

  container.innerHTML = html;
  _bindMeetingBlockClicks(container);
}

// Renderiza a Grade do Calendário conforme visão selecionada
function renderCalendarGrid() {
  const container = document.getElementById('calendar-grid-container');
  if (!container) return;

  const view = STATE.calendarView || 'week';
  if (view === 'day') {
    renderCalendarDay(container);
  } else if (view === 'month') {
    renderCalendarMonth(container);
  } else {
    renderCalendarWeek(container);
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

// ========================================================
// CONTROLE DO MODAL DE FILTROS & BADGE MINIMALISTA
// ========================================================
function getActiveFilterCount() {
  let count = 0;
  if (STATE.filterClient && STATE.filterClient.trim() !== '') count++;
  if (STATE.filterLawyer && STATE.filterLawyer !== 'all') count++;
  if (STATE.filterArea && STATE.filterArea !== 'all') count++;
  if (STATE.filterTime && STATE.filterTime.trim() !== '') count++;
  if (STATE.filterStatus && STATE.filterStatus !== 'all') count++;
  return count;
}

function updateFilterBadge() {
  const badge = document.getElementById('filter-counter-badge');
  const count = getActiveFilterCount();
  if (badge) {
    if (count > 0) {
      badge.textContent = count;
      badge.style.display = 'inline-flex';
    } else {
      badge.style.display = 'none';
    }
  }
  renderActiveFilterChips();
}

function renderActiveFilterChips() {
  const container = document.getElementById('active-filter-chips');
  if (!container) return;
  container.innerHTML = '';

  const chips = [];
  if (STATE.filterClient && STATE.filterClient.trim() !== '') {
    chips.push({ key: 'client', label: `Cliente: "${STATE.filterClient}"` });
  }
  if (STATE.filterLawyer && STATE.filterLawyer !== 'all') {
    chips.push({ key: 'lawyer', label: `Atendente: ${STATE.filterLawyer}` });
  }
  if (STATE.filterArea && STATE.filterArea !== 'all') {
    chips.push({ key: 'area', label: `Área: ${STATE.filterArea}` });
  }
  if (STATE.filterTime && STATE.filterTime.trim() !== '') {
    chips.push({ key: 'time', label: `Horário: ${STATE.filterTime}` });
  }
  if (STATE.filterStatus && STATE.filterStatus !== 'all') {
    const statusMap = {
      today: 'Reuniões Hoje',
      confirmed: 'Confirmadas',
      pending: 'Aguardando',
      noshow: 'No-Shows'
    };
    chips.push({ key: 'status', label: statusMap[STATE.filterStatus] || STATE.filterStatus });
  }

  chips.forEach(c => {
    const tag = document.createElement('div');
    tag.className = 'active-filter-tag';
    tag.innerHTML = `<span>${escapeHtml(c.label)}</span><button type="button" class="tag-remove-btn" title="Remover filtro">&times;</button>`;
    tag.querySelector('.tag-remove-btn').addEventListener('click', () => {
      if (c.key === 'client') STATE.filterClient = '';
      if (c.key === 'lawyer') STATE.filterLawyer = 'all';
      if (c.key === 'area') STATE.filterArea = 'all';
      if (c.key === 'time') STATE.filterTime = '';
      if (c.key === 'status') STATE.filterStatus = 'all';
      updateFilterBadge();
      renderMeetingsList();
    });
    container.appendChild(tag);
  });
}

function setupFilterModal() {
  const modal = document.getElementById('modal-filters');
  const btnOpen = document.getElementById('btn-open-filter-modal');
  const btnClose = document.getElementById('btn-close-filter-modal');
  const btnCancel = document.getElementById('btn-cancel-filters');
  const btnApply = document.getElementById('btn-apply-filters');
  const btnClear = document.getElementById('btn-clear-filters');

  const inputClient = document.getElementById('modal-filter-client');
  const selectLawyer = document.getElementById('modal-filter-lawyer');
  const selectArea = document.getElementById('modal-filter-area');
  const inputTime = document.getElementById('modal-filter-time');
  const statusChips = document.querySelectorAll('.modal-filter-status-grid .status-chip');

  const closeModal = () => modal?.classList.remove('active');

  // Abre o modal populando os campos com os valores atuais
  btnOpen?.addEventListener('click', () => {
    if (inputClient) inputClient.value = STATE.filterClient || '';
    if (selectLawyer) selectLawyer.value = STATE.filterLawyer || 'all';
    if (selectArea) selectArea.value = STATE.filterArea || 'all';
    if (inputTime) inputTime.value = STATE.filterTime || '';
    statusChips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.status === (STATE.filterStatus || 'all'));
    });
    modal?.classList.add('active');
  });

  btnClose?.addEventListener('click', closeModal);
  btnCancel?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Seleção dos Chips de Status
  statusChips.forEach(chip => {
    chip.addEventListener('click', () => {
      statusChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // Aplicar Filtros
  btnApply?.addEventListener('click', () => {
    STATE.filterClient = inputClient ? inputClient.value.trim() : '';
    STATE.filterLawyer = selectLawyer ? selectLawyer.value : 'all';
    STATE.filterArea = selectArea ? selectArea.value : 'all';
    STATE.filterTime = inputTime ? inputTime.value.trim() : '';

    const activeChip = document.querySelector('.modal-filter-status-grid .status-chip.active');
    STATE.filterStatus = activeChip ? activeChip.dataset.status : 'all';

    updateFilterBadge();
    renderMeetingsList();
    closeModal();

    const count = getActiveFilterCount();
    if (count > 0) {
      showToast(`🔍 ${count} filtro(s) ativo(s)!`, 'info', 1800);
    }
  });

  // Limpar Filtros
  btnClear?.addEventListener('click', () => {
    if (inputClient) inputClient.value = '';
    if (selectLawyer) selectLawyer.value = 'all';
    if (selectArea) selectArea.value = 'all';
    if (inputTime) inputTime.value = '';
    statusChips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.status === 'all');
    });

    STATE.filterClient = '';
    STATE.filterLawyer = 'all';
    STATE.filterArea = 'all';
    STATE.filterTime = '';
    STATE.filterStatus = 'all';

    updateFilterBadge();
    renderMeetingsList();
    closeModal();
    showToast('Filtros redefinidos.', 'info', 1500);
  });
}

// Navegação Unificada de Abas (Menu Lateral Esquerdo)
function switchTab(tabId) {
  if (!tabId) return;

  // Atualizar estado de todos os botões que apontam para abas
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  // Ocultar todos os painéis e exibir o selecionado
  document.querySelectorAll('.tab-pane').forEach(p => {
    p.style.display = 'none';
  });

  const targetPane = document.getElementById(tabId);
  if (targetPane) {
    targetPane.style.display = 'block';
  }

  // Se a aba for a Agenda, recalcular a visualização do calendário
  if (tabId === 'tab-calendar' && typeof renderCalendarGrid === 'function') {
    renderCalendarGrid();
  }
}
window.switchTab = switchTab;

// Menu Lateral Esquerdo Minimalista (Recuável estilo Activity Bar / Hover / Fixo)
function setupLeftSidebar() {
  const pinBtn = document.getElementById('btn-toggle-sidebar-pin');
  const footerModeLabel = document.getElementById('sidebar-footer-mode-label');
  const radioCompact = document.getElementById('radio-mode-compact');
  const radioFixed = document.getElementById('radio-mode-fixed');
  const cardCompact = document.getElementById('card-mode-compact');
  const cardFixed = document.getElementById('card-mode-fixed');

  function applySidebarMode(mode, showNotification = false) {
    const isFixed = mode === 'fixed';
    
    // Atualiza classe no body
    document.body.classList.toggle('sidebar-left-fixed', isFixed);

    // Atualiza botão de pin no topo da sidebar
    if (pinBtn) {
      pinBtn.classList.toggle('pinned', isFixed);
      pinBtn.title = isFixed ? 'Desafixar menu (permitir recuo automático)' : 'Fixar menu aberto permanentemente';
    }

    // Atualiza rótulo no rodapé da sidebar
    if (footerModeLabel) {
      footerModeLabel.textContent = isFixed ? 'Fixo (Aberto)' : 'Recuado (Hover)';
    }

    // Atualiza rádios e cards da aba de configurações
    if (radioCompact) radioCompact.checked = !isFixed;
    if (radioFixed) radioFixed.checked = isFixed;
    if (cardCompact) cardCompact.classList.toggle('active', !isFixed);
    if (cardFixed) cardFixed.classList.toggle('active', isFixed);

    // Salva preferência
    localStorage.setItem('mvt_sidebar_left_mode', isFixed ? 'fixed' : 'compact');

    if (showNotification) {
      showToast(
        isFixed 
          ? '📌 Menu lateral fixado aberto.' 
          : '⚡ Menu lateral recuado (expandir ao passar o cursor).',
        'info',
        2200
      );
    }
  }

  // Recupera modo salvo (padrão é 'compact')
  const savedMode = localStorage.getItem('mvt_sidebar_left_mode') || 'compact';
  applySidebarMode(savedMode, false);

  // Botão de pino no topo da sidebar
  pinBtn?.addEventListener('click', () => {
    const currentIsFixed = document.body.classList.contains('sidebar-left-fixed');
    applySidebarMode(currentIsFixed ? 'compact' : 'fixed', true);
  });

  // Rádios e cards na aba de Configurações
  radioCompact?.addEventListener('change', () => {
    if (radioCompact.checked) applySidebarMode('compact', true);
  });
  cardCompact?.addEventListener('click', (e) => {
    if (e.target !== radioCompact) {
      applySidebarMode('compact', true);
    }
  });

  radioFixed?.addEventListener('change', () => {
    if (radioFixed.checked) applySidebarMode('fixed', true);
  });
  cardFixed?.addEventListener('click', (e) => {
    if (e.target !== radioFixed) {
      applySidebarMode('fixed', true);
    }
  });
}

// Configuração de Eventos da Interface
function setupEventListeners() {
  // Navegação de Abas (Sidebar Esquerda)
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      switchTab(tabId);
    });
  });

  // Inicializa o menu lateral esquerdo
  setupLeftSidebar();

  // Inicialização do Modal Popup de Filtros & Contador
  setupFilterModal();
  updateFilterBadge();

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
      area: lawyer.includes('Natalia') ? 'Trabalhista' : (lawyer.includes('Ludmila') ? 'Cível' : 'Comercial'),
      date: new Date().toISOString().split('T')[0],
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
    saveSingleMeeting(newMeeting);
    logEvent('AGENDADO', newMeeting, `Novo agendamento criado: ${name} (${phone}) com ${lawyer} às ${time}`);
    modalNew.classList.remove('active');

    // Integração direta com Google Agenda
    const openGcal = document.getElementById('new-open-gcal')?.checked !== false;
    if (openGcal) {
      try {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const [hStr, mStr] = time.split(':');
        const startH = String(hStr).padStart(2, '0');
        const startM = String(mStr || '00').padStart(2, '0');
        const endH = String((parseInt(startH, 10) + 1) % 24).padStart(2, '0');

        const startIso = `${yyyy}${mm}${dd}T${startH}${startM}00`;
        const endIso = `${yyyy}${mm}${dd}T${endH}${startM}00`;

        const title = encodeURIComponent(`Reunião: ${name} — ${lawyer}`);
        const details = encodeURIComponent(`Atendimento MVT Advogados\nCliente: ${name}\nWhatsApp: ${phone}\nAdvogado: ${lawyer}\nLink Meet: ${meetLink || 'A definir'}`);
        const location = encodeURIComponent(meetLink || 'Google Meet');

        const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
        window.open(gcalUrl, '_blank');
      } catch (gcalErr) {
        console.warn('Erro ao abrir Google Agenda:', gcalErr);
      }
    }

    e.target.reset();
    renderApp();
    showToast(`✅ Agendamento para ${name} criado e salvo no banco de dados!`, 'success');
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
  document.getElementById('btn-sync-mindchat')?.addEventListener('click', () => syncMindChatLeads());
  document.getElementById('btn-sync-mindchat-tab')?.addEventListener('click', () => syncMindChatLeads());

  // Botão Testar Conexão
  document.getElementById('btn-test-connection')?.addEventListener('click', () => {
    showToast('🔌 Testando autenticação via X-Api-Key...', 'info');
    setTimeout(() => {
      showToast('✅ Conexão ativa com Tosato advogados associados (Mind17)!', 'success');
    }, 1000);
  });

  // ========================================================
  // CONTROLES DO GOOGLE AGENDA (Visão, Navegação e Filtros)
  // ========================================================
  // Alternador de Visão: Semana / Dia / Mês
  document.querySelectorAll('.cal-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cal-view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.calendarView = btn.dataset.view;
      renderCalendarGrid();
    });
  });

  // Botão "Hoje"
  document.getElementById('cal-btn-today')?.addEventListener('click', () => {
    STATE.calendarDate = new Date();
    renderCalendarGrid();
    showToast('📅 Visualizando o dia de hoje no calendário.', 'info', 2000);
  });

  // Seta "Anterior" (◀)
  document.getElementById('cal-btn-prev')?.addEventListener('click', () => {
    const d = STATE.calendarDate || new Date();
    if (STATE.calendarView === 'day') {
      d.setDate(d.getDate() - 1);
    } else if (STATE.calendarView === 'month') {
      d.setMonth(d.getMonth() - 1);
    } else {
      d.setDate(d.getDate() - 7);
    }
    STATE.calendarDate = d;
    renderCalendarGrid();
  });

  // Seta "Próximo" (▶)
  document.getElementById('cal-btn-next')?.addEventListener('click', () => {
    const d = STATE.calendarDate || new Date();
    if (STATE.calendarView === 'day') {
      d.setDate(d.getDate() + 1);
    } else if (STATE.calendarView === 'month') {
      d.setMonth(d.getMonth() + 1);
    } else {
      d.setDate(d.getDate() + 7);
    }
    STATE.calendarDate = d;
    renderCalendarGrid();
  });

  // Filtro de Responsável / Comercial do Calendário
  document.getElementById('cal-team-filter')?.addEventListener('change', (e) => {
    STATE.calendarTeamFilter = e.target.value;
    renderCalendarGrid();
  });

  // Botão "+ Nova Reunião" na Toolbar do Calendário
  document.getElementById('btn-open-training-booking')?.addEventListener('click', () => {
    modalNew.classList.add('active');
    document.getElementById('new-time').value = getRelativeTime(60);
  });
}

// Sincronização Inteligente com MindChat (WhatsApp)
async function syncMindChatLeads(silent = false) {
  if (!silent) showToast('⚡ Conectando com a API MindChat (Instância Mind17)...', 'info', 2500);

  try {
    let leads = [];

    // Busca leads reais via GET /webhook/v1/leads/list (conforme Documentação Oficial MindIA)
    try {
      const url = `${CONFIG.MINDCHAT.API_URL}/leads/list?instance_id=${CONFIG.MINDCHAT.INSTANCE_ID}&crm_stage_id=${CONFIG.MINDCHAT.STAGES.AGUARDANDO_REUNIAO}&per_page=50&sort=last_updated_at&order=desc`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': CONFIG.MINDCHAT.API_KEY
        }
      });
      if (response.ok) {
        const json = await response.json();
        if (json && json.data && Array.isArray(json.data.items)) {
          leads = json.data.items;
        } else if (Array.isArray(json)) {
          leads = json;
        }
      }
    } catch (e) {
      console.warn('Busca direta MindChat no navegador (possível CORS local):', e.message);
    }

    // Se a chamada direta da API retornou leads do MindChat
    if (leads && leads.length > 0) {
      let h = 9;
      let m = 0;
      STATE.meetings = leads.map((l, idx) => {
        let adv = 'Augusto';
        const assigned = l.assigned_team_member_name || '';
        if (assigned.includes('Ana Carla')) adv = 'Ana Carla';
        else if (assigned.includes('Julia') || assigned.includes('Júlia')) adv = 'Julia';
        else if (assigned.includes('João') || assigned.includes('Joao')) adv = 'João';
        else if (assigned.includes('Natalia')) adv = 'Dra. Natalia';
        else if (assigned.includes('Ludmila')) adv = 'Dra. Ludmila';
        else if (assigned.includes('Augusto')) adv = 'Augusto';

        let area = 'Trabalhista';
        const tagStr = Array.isArray(l.tags) ? l.tags.map(t => t.name).join(' ') : '';
        if (tagStr.includes('Cível') || tagStr.includes('Civil')) area = 'Cível';
        else if (tagStr.includes('Previdenci')) area = 'Previdenciário';

        const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        m += 30;
        if (m >= 60) { m = 0; h += 1; if (h >= 19) h = 14; }

        let clientName = l.customer_name;
        if (!clientName || clientName.trim() === '.' || clientName.trim() === '') {
          clientName = 'Cliente WhatsApp ' + (l.customer_phone || '');
        }

        return {
          id: String(l.id || `lead-${Date.now()}-${idx}`),
          clientName: clientName,
          clientPhone: String(l.customer_phone || ''),
          lawyer: adv,
          area: area,
          date: new Date().toISOString().split('T')[0],
          time: timeStr,
          meetLink: `https://meet.google.com/mvt-${adv.toLowerCase().replace(/[^a-z]/g, '')}`,
          status: 'pending',
          pipeline: {
            alert60m: { sent: false, sentAt: null },
            alert30m: { sent: false, sentAt: null },
            alert15m: { sent: false, sentAt: null },
            alert0m: { sent: false, sentAt: null },
            noShowAlert: { sent: false, sentAt: null }
          }
        };
      });
    } else {
      // Recarrega do Supabase (onde estão os 30 leads reais do MindChat)
      const fromDb = await loadMeetingsFromSupabase();
      if (!fromDb || STATE.meetings.length === 0) {
        STATE.meetings = [...DEFAULT_ACTIVE_MEETINGS];
      }
    }

    // Salva local e no Supabase
    await saveMeetings();
    await logEvent('SINCRONIZACAO_MINDCHAT', {
      id: 'mindchat',
      clientName: 'MindChat (Mind17)',
      clientPhone: CONFIG.MINDCHAT.INSTANCE_PHONE,
      lawyer: 'Sistema',
      time: new Date().toLocaleTimeString('pt-BR')
    }, `${STATE.meetings.length} agendamentos integrados com sucesso`);

    renderApp();
    if (!silent) {
      showToast(`✅ ${STATE.meetings.length} agendamentos reais sincronizados do MindChat com sucesso!`, 'success', 4000);
    }
    return true;
  } catch (err) {
    console.error('Erro na sincronização:', err);
    if (!silent) showToast(`❌ Falha ao sincronizar: ${err.message}`, 'danger');
    return false;
  }
}
window.syncMindChatLeads = syncMindChatLeads;

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

// ============================================================
// INTEGRAÇÃO GOOGLE AGENDA via iCal (CORS Proxy)
// ============================================================

// Estado da integração com Google Agenda
const GCAL_STATE = {
  icalUrl: localStorage.getItem('mvt_gcal_url') || '',
  lastSync: localStorage.getItem('mvt_gcal_last_sync') || null,
  pendingEvents: [] // eventos buscados aguardando importação
};

// Salvar link da agenda
window.handleSaveGcal = function() {
  const inputEl = document.getElementById('gcal-ical-input');
  if (!inputEl) return;
  const url = inputEl.value.trim();
  if (!url) {
    showToast('⚠️ Cole o link iCal no campo antes de salvar.', 'warning');
    return;
  }
  if (!url.includes('google.com') && !url.endsWith('.ics')) {
    showToast('⚠️ O link não parece ser um arquivo iCal válido do Google. Verifique e tente novamente.', 'warning', 5000);
    return;
  }
  if (url.includes('/public/basic.ics') || url.includes('/public/')) {
    showToast('⚠️ ATENÇÃO: Você colou o endereço PÚBLICO (/public/), que fica bloqueado pelo Google em contas corporativas (@mvtadvogados.com.br). Copie o "Endereço secreto em formato iCal" logo abaixo na sua agenda Google!', 'warning', 10000);
  }
  GCAL_STATE.icalUrl = url;
  localStorage.setItem('mvt_gcal_url', url);
  _showSyncPanel(url);
  showToast('✅ Link da agenda salvo com sucesso! Clique em "Sincronizar Agora" para puxar os eventos.', 'success', 4000);
};

// Sincronizar agenda
window.handleSyncGcal = function() {
  const inputEl = document.getElementById('gcal-ical-input');
  if (inputEl && inputEl.value.trim()) {
    const url = inputEl.value.trim();
    GCAL_STATE.icalUrl = url;
    localStorage.setItem('mvt_gcal_url', url);
    _showSyncPanel(url);
  }
  fetchAndParseIcal();
};

// Importar arquivo .ics diretamente pelo computador
window.handleIcalFileUpload = function(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  showToast('📂 Lendo arquivo da agenda...', 'info', 2000);
  const reader = new FileReader();
  reader.onload = function(evt) {
    const text = evt.target.result;
    if (!text || !text.includes('BEGIN:VCALENDAR')) {
      showToast('❌ O arquivo selecionado não é um arquivo iCal (.ics) válido.', 'danger');
      return;
    }
    const todaysEvents = parseIcalForToday(text);
    GCAL_STATE.pendingEvents = todaysEvents;
    GCAL_STATE.lastSync = new Date().toISOString();
    localStorage.setItem('mvt_gcal_last_sync', GCAL_STATE.lastSync);
    _updateSyncTimestamp();
    _setGcalStatus('connected');
    renderGcalEventsList(todaysEvents);
    if (todaysEvents.length === 0) {
      showToast('📅 Nenhum evento encontrado para hoje neste arquivo .ics.', 'info', 4000);
    } else {
      showToast(`✅ ${todaysEvents.length} evento(s) de hoje carregado(s)! Clique em "Importar Todos" para adicionar ao painel.`, 'success', 5000);
    }
  };
  reader.readAsText(file);
};

// Inicializar o painel do Google Agenda assim que a DOM estiver pronta
function setupGoogleCalendarIntegration() {
  const inputEl   = document.getElementById('gcal-ical-input');
  const saveBtn   = document.getElementById('btn-save-gcal');
  const syncBtn   = document.getElementById('btn-gcal-sync');
  const discBtn   = document.getElementById('btn-gcal-disconnect');
  const importBtn = document.getElementById('btn-gcal-import-all');

  if (!inputEl) return;

  // Restaurar URL salva
  if (GCAL_STATE.icalUrl) {
    inputEl.value = GCAL_STATE.icalUrl;
    _showSyncPanel(GCAL_STATE.icalUrl);
    _updateSyncTimestamp();
  }

  if (saveBtn) saveBtn.addEventListener('click', window.handleSaveGcal);
  if (syncBtn) syncBtn.addEventListener('click', window.handleSyncGcal);

  // Desconectar
  if (discBtn) {
    discBtn.addEventListener('click', () => {
      GCAL_STATE.icalUrl = '';
      GCAL_STATE.lastSync = null;
      localStorage.removeItem('mvt_gcal_url');
      localStorage.removeItem('mvt_gcal_last_sync');
      discBtn.style.display = 'none';
      if (inputEl) inputEl.value = '';
      _setGcalStatus('disconnected');
      document.getElementById('gcal-import-results').style.display = 'none';
      document.getElementById('gcal-error-box').style.display = 'none';
      showToast('Agenda desconectada.', 'info');
    });
  }

  // Importar todos
  if (importBtn) {
    importBtn.addEventListener('click', () => importAllGcalEvents());
  }
}

// Exibir o painel de sincronização (após salvar o link)
function _showSyncPanel(url) {
  const discBtn = document.getElementById('btn-gcal-disconnect');
  if (discBtn) discBtn.style.display = 'block';
  _setGcalStatus('connected');
}

// Atualizar timestamp da última sincronização
function _updateSyncTimestamp() {
  const el = document.getElementById('gcal-sync-last-update');
  if (!el) return;
  if (GCAL_STATE.lastSync) {
    el.textContent = `Última sincronização: ${new Date(GCAL_STATE.lastSync).toLocaleTimeString('pt-BR')}`;
  } else {
    el.textContent = 'Link configurado — clique em "Sincronizar Agora"';
  }
}

// Atualizar o pill de status
function _setGcalStatus(state) {
  const pill = document.getElementById('gcal-status-pill');
  const dot  = pill ? pill.querySelector('.status-dot') : null;
  const text = document.getElementById('gcal-status-text');
  if (!pill) return;

  if (state === 'connected') {
    pill.style.background = 'rgba(16,185,129,0.12)';
    pill.style.borderColor = 'rgba(16,185,129,0.35)';
    if (dot) dot.style.background = '#10b981';
    if (text) text.textContent = 'Agenda conectada';
  } else if (state === 'syncing') {
    pill.style.background = 'rgba(245,158,11,0.12)';
    pill.style.borderColor = 'rgba(245,158,11,0.35)';
    if (dot) dot.style.background = '#f59e0b';
    if (text) text.textContent = 'Sincronizando...';
  } else {
    pill.style.background = 'rgba(100,116,139,0.15)';
    pill.style.borderColor = 'rgba(100,116,139,0.3)';
    if (dot) dot.style.background = '#64748b';
    if (text) text.textContent = 'Não conectada';
  }
}

// Buscar conteúdo iCal com fallbacks de proxy e timeout rápido
async function fetchIcalContent(url) {
  const proxyEndpoints = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
    url
  ];

  for (const endpoint of proxyEndpoints) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(endpoint, { signal: controller.signal, cache: 'no-cache' });
      clearTimeout(timer);
      if (res.ok) {
        const text = await res.text();
        if (text && text.includes('BEGIN:VCALENDAR')) {
          return text;
        }
      }
    } catch (e) {
      console.warn('Proxy tentado sem sucesso:', endpoint, e.message);
    }
  }
  throw new Error('Não foi possível obter os eventos através da conexão de rede. Verifique se o link secreto do Google Agenda está correto ou use o botão "Importar Arquivo .ics direto".');
}

// Buscar e parsear o arquivo iCal
async function fetchAndParseIcal() {
  const inputEl = document.getElementById('gcal-ical-input');
  const url = (GCAL_STATE.icalUrl || inputEl?.value.trim() || '').trim();

  if (!url) {
    showToast('⚠️ Cole o link iCal no campo antes de sincronizar.', 'warning');
    return;
  }

  const syncIcon = document.getElementById('gcal-sync-icon');
  const errorBox = document.getElementById('gcal-error-box');
  const errorText = document.getElementById('gcal-error-text');
  const resultsBox = document.getElementById('gcal-import-results');

  // Validação imediata de link público (que o Google bloqueia para contas corporativas)
  if (url.includes('/public/basic.ics') || url.includes('/public/')) {
    const warningMsg = 'Acesso negado pelo Google (Erro 404): você colou o link Público, que não funciona em e-mails corporativos (@mvtadvogados.com.br). Por favor, copie o "Endereço secreto em formato iCal" nas configurações da sua agenda Google (o link contém "private-").';
    if (errorBox) {
      errorBox.style.display = 'flex';
      errorText.textContent = warningMsg;
    }
    showToast(`❌ ${warningMsg.substring(0, 95)}`, 'danger', 9000);
    return;
  }

  // Estado de carregamento
  if (syncIcon) syncIcon.innerHTML = '<span class="syncing-anim">🔄</span>';
  if (errorBox) errorBox.style.display = 'none';
  if (resultsBox) resultsBox.style.display = 'none';
  _setGcalStatus('syncing');
  showToast('🔄 Conectando com a sua Google Agenda...', 'info', 3000);

  try {
    const icalText = await fetchIcalContent(url);
    const todaysEvents = parseIcalForToday(icalText);

    GCAL_STATE.pendingEvents = todaysEvents;
    GCAL_STATE.lastSync = new Date().toISOString();
    localStorage.setItem('mvt_gcal_last_sync', GCAL_STATE.lastSync);
    _updateSyncTimestamp();
    _setGcalStatus('connected');

    if (syncIcon) syncIcon.textContent = '🔄';
    renderGcalEventsList(todaysEvents);

    if (todaysEvents.length === 0) {
      showToast('📅 Nenhum evento encontrado para hoje na sua agenda.', 'info', 4000);
    } else {
      showToast(`✅ ${todaysEvents.length} evento(s) de hoje encontrado(s)! Confira abaixo e importe.`, 'success', 4000);
    }

  } catch (err) {
    if (syncIcon) syncIcon.textContent = '🔄';
    _setGcalStatus('connected');

    let friendlyMsg = err.message;
    if (errorBox) {
      errorBox.style.display = 'flex';
      errorText.textContent = friendlyMsg;
    }
    showToast(`❌ ${friendlyMsg.substring(0, 95)}`, 'danger', 8000);
  }
}

// Parser de iCal — extrai eventos do dia de hoje
function parseIcalForToday(icalText) {
  const today = new Date();
  const todayStr = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join(''); // formato: YYYYMMDD

  // Normalizar line-folding do iCal (linhas que começam com espaço são continuação)
  const normalized = icalText.replace(/\r\n[ \t]/g, '').replace(/\r\n/g, '\n').replace(/\n[ \t]/g, '');

  const events = [];

  // Extrair blocos VEVENT
  const veventRegex = /BEGIN:VEVENT([\s\S]*?)END:VEVENT/g;
  let match;

  while ((match = veventRegex.exec(normalized)) !== null) {
    const block = match[1];

    // Extrair campos principais
    const dtstart = _getIcalField(block, 'DTSTART');
    const summary = _getIcalField(block, 'SUMMARY') || '(Sem título)';
    const description = _getIcalField(block, 'DESCRIPTION') || '';
    const location = _getIcalField(block, 'LOCATION') || '';
    const uid = _getIcalField(block, 'UID') || `evt-${Date.now()}-${Math.random()}`;

    if (!dtstart) continue;

    // Verificar se o evento é de hoje (pode ser DTSTART:20241010T100000Z ou DTSTART;TZID=...:20241010T100000)
    const dateOnly = dtstart.replace(/T.*/, ''); // pega apenas YYYYMMDD
    if (!dateOnly.includes(todayStr)) continue;

    // Calcular horário local
    let timeStr = '00:00';
    const timePart = dtstart.replace(/^.*T/, '');
    if (timePart && timePart.length >= 4) {
      const rawH = parseInt(timePart.substring(0, 2), 10);
      const rawM = parseInt(timePart.substring(2, 4), 10);

      // Se termina em Z, é UTC — converter para horário local
      let localDate;
      if (dtstart.endsWith('Z')) {
        localDate = new Date(Date.UTC(
          parseInt(dateOnly.substring(0, 4), 10),
          parseInt(dateOnly.substring(4, 6), 10) - 1,
          parseInt(dateOnly.substring(6, 8), 10),
          rawH, rawM, 0
        ));
      } else {
        // Já é local (TZID especificado)
        localDate = new Date(
          parseInt(dateOnly.substring(0, 4), 10),
          parseInt(dateOnly.substring(4, 6), 10) - 1,
          parseInt(dateOnly.substring(6, 8), 10),
          rawH, rawM, 0
        );
      }

      // Reconfirmar se o evento convertido para local ainda é hoje
      const localTodayStr = [
        localDate.getFullYear(),
        String(localDate.getMonth() + 1).padStart(2, '0'),
        String(localDate.getDate()).padStart(2, '0')
      ].join('');

      if (localTodayStr !== todayStr && !dateOnly.includes(todayStr)) continue;

      timeStr = `${String(localDate.getHours()).padStart(2, '0')}:${String(localDate.getMinutes()).padStart(2, '0')}`;
    }

    // Procurar link do Google Meet na descrição ou localização
    const meetRegex = /https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}/i;
    const meetInDesc = description.match(meetRegex);
    const meetInLoc  = location.match(meetRegex);
    const meetLink = (meetInDesc && meetInDesc[0]) || (meetInLoc && meetInLoc[0]) || '';

    // Limpar texto da descrição (iCal usa \\n para quebra de linha)
    const cleanSummary = summary.replace(/\\,/g, ',').replace(/\\n/g, ' ').trim();

    events.push({
      uid,
      summary: cleanSummary,
      time: timeStr,
      meetLink,
      description: description.replace(/\\n/g, '\n').replace(/\\,/g, ',')
    });
  }

  // Ordenar por horário
  events.sort((a, b) => a.time.localeCompare(b.time));
  return events;
}

// Utilitário para extrair um campo do bloco VEVENT
function _getIcalField(block, fieldName) {
  // Campo pode ter parâmetros: DTSTART;TZID=America/Sao_Paulo:...
  const regex = new RegExp(`^${fieldName}(?:;[^:]*)?:(.*)`, 'm');
  const m = block.match(regex);
  return m ? m[1].trim() : null;
}

// Renderizar a lista de eventos encontrados no Google Agenda
function renderGcalEventsList(events) {
  const listEl   = document.getElementById('gcal-events-list');
  const resultsEl = document.getElementById('gcal-import-results');
  const countEl  = document.getElementById('gcal-import-count');

  if (!listEl || !resultsEl) return;

  resultsEl.style.display = 'block';

  if (events.length === 0) {
    listEl.innerHTML = `<div style="padding: 0.5rem; color: var(--text-muted); font-size: 0.77rem;">Nenhum evento encontrado para hoje.</div>`;
    if (countEl) countEl.textContent = '';
    return;
  }

  if (countEl) countEl.textContent = `${events.length} evento(s) — somente Trabalhista e Cível terão Meet`;

  listEl.innerHTML = events.map(evt => `
    <div class="gcal-event-item">
      <span class="evt-time">${evt.time}</span>
      <span class="evt-title" title="${escapeHtml(evt.summary)}">${escapeHtml(evt.summary)}</span>
      ${evt.meetLink
        ? `<span class="evt-meet">📹 Meet</span>`
        : `<span class="evt-no-meet">Sem Meet</span>`
      }
    </div>
  `).join('');
}

// Importar todos os eventos de hoje para a Pauta de Reuniões
function importAllGcalEvents() {
  const events = GCAL_STATE.pendingEvents;
  if (!events || events.length === 0) {
    showToast('Nenhum evento para importar. Sincronize a agenda primeiro.', 'warning');
    return;
  }

  let imported = 0;
  let skipped  = 0;

  events.forEach(evt => {
    // Verificar se já existe uma reunião com esse horário e mesmo título (evitar duplicata)
    const alreadyExists = STATE.meetings.some(m =>
      m.time === evt.time && m.clientName.toLowerCase() === evt.summary.toLowerCase()
    );

    if (alreadyExists) {
      skipped++;
      return;
    }

    // Filtrar compromissos pessoais e focar apenas nas reuniões da equipe comercial
    const titleLower = (evt.summary + ' ' + (evt.description || '')).toLowerCase();
    const personalKeywords = [
      'pessoal', 'almoço', 'almoco', 'médico', 'medico', 'dentista',
      'aniversário', 'aniversario', 'academia', 'folga', 'feriado',
      'lembrete pessoal', 'particular'
    ];
    if (personalKeywords.some(kw => titleLower.includes(kw))) {
      skipped++;
      return;
    }

    // Identificar responsável e área
    let area = 'Comercial';
    let lawyer = 'Augusto'; // Padrão da equipe comercial

    if (titleLower.includes('ana carla') || titleLower.includes('anacarla')) {
      lawyer = 'Ana Carla';
    } else if (titleLower.includes('julia') || titleLower.includes('júlia')) {
      lawyer = 'Julia';
    } else if (titleLower.includes('joão') || titleLower.includes('joao')) {
      lawyer = 'João';
    } else if (titleLower.includes('natalia') || titleLower.includes('natália')) {
      lawyer = 'Dra. Natalia';
      area = 'Trabalhista';
    } else if (titleLower.includes('ludmila')) {
      lawyer = 'Dra. Ludmila';
      area = 'Cível';
    } else if (titleLower.includes('augusto')) {
      lawyer = 'Augusto';
    } else if (titleLower.includes('trabalhista') || titleLower.includes('clt')) {
      area = 'Trabalhista';
    } else if (titleLower.includes('cível') || titleLower.includes('civil')) {
      area = 'Cível';
    } else if (titleLower.includes('previdenci')) {
      area = 'Previdenciário';
    }

    const newMeeting = {
      id: `gcal-${evt.uid.replace(/[^a-z0-9]/gi, '').substring(0, 12)}-${Date.now()}`,
      clientName: evt.summary,
      clientPhone: '', // não disponível no iCal
      lawyer: lawyer,
      area: area,
      date: new Date().toISOString().split('T')[0],
      time: evt.time,
      meetLink: evt.meetLink || '',
      source: 'google_calendar',
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
    imported++;
  });

  saveMeetings();
  renderApp();

  if (imported > 0) {
    showToast(
      `✅ ${imported} reunião(ões) importada(s) do Google Agenda! ${skipped > 0 ? `(${skipped} já existia(m))` : ''} Não esqueça de adicionar o WhatsApp de cada cliente.`,
      'success',
      6000
    );
  } else if (skipped > 0) {
    showToast(`ℹ️ Todos os ${skipped} evento(s) já estavam na pauta.`, 'info');
  }
}
