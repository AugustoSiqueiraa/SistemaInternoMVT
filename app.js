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
  calendarTeamFilter: 'all',

  // Controle Geral da Automação Anti No-Show (WhatsApp)
  automationEnabled: localStorage.getItem('mvt_automation_enabled') !== 'false',

  // Controle Geral de Conexão com a API MindChat (Instância Mind17)
  mindchatConnected: localStorage.getItem('mvt_global_mindchat_connected') !== 'false'
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
window.getSupabaseClient = getSupabaseClient;

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
  
  // Inicializar controle de toggle da Automação Anti No-Show
  setupAutomationToggle();
  
  // Inicializar controle de Cadência de Horários (Anti No-Show)
  setupCadenceControls();

  // Inicializar controles de visualização/exibição da tabela Anti No-Show (Proporção, Zoom e Tela)
  updateNoShowDisplayControlsUi();

  // Inicializar botão e controle geral de conexão com o MindChat
  updateGlobalMindChatButtonUi();

  // Sincronizar clientes da Planilha Comercial com a nuvem Supabase
  if (typeof syncCommercialWithSupabase === 'function') {
    syncCommercialWithSupabase();
  }
  
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
    console.log('⚡ Canal em tempo real de reuniões conectado!');

    client
      .channel('comercial-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'clientes_comercial' }, async (payload) => {
        console.log('⚡ Atualização da Planilha Comercial recebida do Supabase:', payload);
        if (typeof syncCommercialWithSupabase === 'function') {
          await syncCommercialWithSupabase();
        }
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'historico_eventos', filter: 'tipo_evento=eq.ESTADO_PLANILHA_COMERCIAL' }, async (payload) => {
        console.log('⚡ Snapshot da Planilha Comercial recebido em tempo real:', payload);
        if (payload?.new?.descricao) {
          try {
            const parsed = JSON.parse(payload.new.descricao);
            if (Array.isArray(parsed) && parsed.length > 0) {
              COMMERCIAL_STATE.clients = parsed.map(sanitizeCommercialClient);
              localStorage.setItem('mvt_commercial_clients', JSON.stringify(COMMERCIAL_STATE.clients));
              if (typeof renderCommercialApp === 'function') {
                renderCommercialApp();
              }
            }
          } catch (e) {}
        }
      })
      .subscribe();
    console.log('⚡ Canal em tempo real da Planilha Comercial conectado!');
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
      STATE.templates = { ...CONFIG.MESSAGE_TEMPLATES, ...JSON.parse(savedTemplates) };
    } catch {
      STATE.templates = { ...CONFIG.MESSAGE_TEMPLATES };
    }
  } else {
    STATE.templates = { ...CONFIG.MESSAGE_TEMPLATES };
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

// Badge Interativo com Select Embutido: Área (Trabalhista [Âmbar], Cível [Azul], Previdenciário [Roxo])
function getMeetingAreaSelect(meeting) {
  const rawArea = (meeting.area || '').toLowerCase();
  let area = 'Trabalhista';
  let areaClass = 'trabalhista';

  if (rawArea.includes('cív') || rawArea.includes('civ')) {
    area = 'Cível';
    areaClass = 'civel';
  } else if (rawArea.includes('prev') || rawArea.includes('aposent') || rawArea.includes('aux')) {
    area = 'Previdenciário';
    areaClass = 'previdenciario';
  } else {
    area = 'Trabalhista';
    areaClass = 'trabalhista';
  }

  return `
    <div class="comm-area-badge-container">
      <select class="comm-area-pill-select area-${areaClass}" onchange="changeMeetingArea('${meeting.id}', this.value)" title="Clique para alterar a área">
        <option value="Trabalhista" ${area === 'Trabalhista' ? 'selected' : ''}>Trabalhista</option>
        <option value="Cível" ${area === 'Cível' ? 'selected' : ''}>Cível</option>
        <option value="Previdenciário" ${area === 'Previdenciário' ? 'selected' : ''}>Previdenciário</option>
      </select>
      <svg class="comm-status-caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  `;
}
window.getMeetingAreaSelect = getMeetingAreaSelect;

async function changeMeetingArea(meetingId, newArea) {
  const meeting = STATE.meetings.find(m => String(m.id) === String(meetingId));
  if (!meeting) return;
  const oldArea = meeting.area;
  meeting.area = newArea;
  await saveSingleMeeting(meeting);
  await logEvent('ALTERACAO_AREA', meeting, `Área de ${meeting.clientName} alterada de "${oldArea}" para "${newArea}"`);
  renderApp();
  showToast(`Área de ${meeting.clientName} alterada para "${newArea}".`, 'success', 2500);
}
window.changeMeetingArea = changeMeetingArea;

// Renderiza a Lista de Reuniões em Linhas Executivas
function renderMeetingsList() {
  const container = document.getElementById('meetings-list-container');
  container.innerHTML = '';

  const now = getCurrentTime();

  // Filtragem Multicritério com Busca Rápida e Popup Centralizado
  const filtered = STATE.meetings.filter(m => {
    // 0. Busca Rápida (Barra de Pesquisa da Toolbar)
    const q = (STATE.filterSearch || '').toLowerCase().trim();
    let matchSearch = true;
    if (q) {
      const name = (m.clientName || '').toLowerCase();
      const phone = String(m.clientPhone || '').toLowerCase();
      const notes = (m.notes || m.obs || m.observation || m.description || '').toLowerCase();
      const lawyer = (m.lawyer || '').toLowerCase();
      const area = (m.area || '').toLowerCase();
      matchSearch = name.includes(q) || phone.includes(q) || notes.includes(q) || lawyer.includes(q) || area.includes(q);
    }

    // 1. Cliente / Telefone (do modal de filtros)
    const clientTerm = (STATE.filterClient || '').toLowerCase().trim();
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

    return matchSearch && matchClient && matchLawyer && matchArea && matchTime && matchStatus;
  });

  if (filtered.length === 0) {
    updateFilteredResultsCounter(0, STATE.meetings.length);
    container.innerHTML = `
      <div class="empty-state">
        <p>Nenhuma reunião encontrada para os filtros selecionados.</p>
      </div>
    `;
    return;
  }

  updateFilteredResultsCounter(filtered.length, STATE.meetings.length);

  // Ordena por horário
  filtered.sort((a, b) => a.time.localeCompare(b.time));

  const cadence = getCadenceConfig();

  filtered.forEach(meeting => {
    const row = document.createElement('div');
    row.className = `meeting-row status-${meeting.status}`;
    row.id = `meeting-${meeting.id}`;

    // Cálculo da contagem regressiva com indicador minimalista
    const [mHours, mMinutes] = meeting.time.split(':').map(Number);
    const meetingDate = new Date(now);
    meetingDate.setHours(mHours, mMinutes, 0, 0);

    const diffMinutes = Math.round((meetingDate - now) / 60000);
    let countdownPillHtml = '';

    if (meeting.status === 'noshow') {
      countdownPillHtml = `<span class="countdown-pill pill-noshow"><span class="pill-dot dot-rose"></span>No-Show</span>`;
    } else if (diffMinutes > 60) {
      countdownPillHtml = `<span class="countdown-pill"><span class="pill-dot dot-muted"></span>Faltam ${Math.floor(diffMinutes / 60)}h ${diffMinutes % 60}m</span>`;
    } else if (diffMinutes > 15) {
      countdownPillHtml = `<span class="countdown-pill due-soon"><span class="pill-dot dot-amber"></span>Faltam ${diffMinutes}m</span>`;
    } else if (diffMinutes > 0) {
      countdownPillHtml = `<span class="countdown-pill urgent"><span class="pill-dot dot-rose"></span>Faltam ${diffMinutes}m</span>`;
    } else if (diffMinutes > -30) {
      countdownPillHtml = `<span class="countdown-pill now"><span class="pill-dot dot-emerald"></span>No Horário</span>`;
    } else {
      countdownPillHtml = `<span class="countdown-pill"><span class="pill-dot dot-muted"></span>Encerrada</span>`;
    }

    const p = meeting.pipeline || { alert60m: {}, alert30m: {}, alert15m: {}, alert0m: {} };
    const isConfirmed = meeting.status === 'confirmed';
    const isImmediate = Boolean(p.alertImmediate?.sent);

    row.innerHTML = `
      <!-- Coluna 1: Horário -->
      <div class="time-cell">
        <span class="time-main">${meeting.time}</span>
        ${countdownPillHtml}
      </div>

      <!-- Coluna 2: Cliente (Com Ícones Minimalistas) -->
      <div class="client-cell">
        <span class="client-cell-name">
          <svg class="mini-client-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>${escapeHtml(meeting.clientName)}</span>
        </span>
        <span class="client-cell-phone">
          <svg class="mini-phone-svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>${escapeHtml(meeting.clientPhone)}</span>
        </span>
      </div>

      <!-- Coluna 3: Comercial (Sem ícone) -->
      <div class="commercial-cell">
        <span class="commercial-cell-name">${escapeHtml(meeting.lawyer || 'Augusto')}</span>
      </div>

      <!-- Coluna 4: Área (Select Interativo de Cores Oficiais) -->
      <div class="area-cell">
        ${getMeetingAreaSelect(meeting)}
      </div>

      <!-- Coluna 5: Régua Anti No-Show (Mini Passos) -->
      <div class="pipeline-cell">
        ${isImmediate ? `
          <div class="pipe-step sent" title="Agendamento Imediato (<45m)">Imed</div>
          <div class="pipe-step skipped" title="Passo intermediário dispensado">—</div>
          <div class="pipe-step skipped" title="Passo intermediário dispensado">—</div>
          <div class="pipe-step confirmed" title="Link do Google Meet Entregue">Meet</div>
        ` : `
          <div class="pipe-step ${p.alert60m?.sent ? 'sent' : ''}" title="Alerta 1h (Confirmação)">1h</div>
          <div class="pipe-step ${isConfirmed || !cadence.step2.enabled ? 'skipped' : (p.alert30m?.sent ? 'sent' : '')}" title="${!cadence.step2.enabled ? 'Dispensado na cadência' : 'Alerta 30m'}">${!cadence.step2.enabled ? '—' : '30m'}</div>
          <div class="pipe-step ${isConfirmed || !cadence.step3.enabled ? 'skipped' : (p.alert15m?.sent ? 'sent' : '')}" title="${!cadence.step3.enabled ? 'Dispensado na cadência' : 'Alerta 15m'}">${!cadence.step3.enabled ? '—' : '15m'}</div>
          <div class="pipe-step ${p.alert0m?.sent ? 'confirmed' : ''}" title="${cadence.step4.interval > 0 ? `Pré-sala & Meet (${cadence.step4.interval}m antes)` : 'Google Meet'}">Meet</div>
        `}
      </div>

      <!-- Coluna 6: Vídeo Chamada (Coluna Dedicada com Link do Google Meet) -->
      <div class="meet-cell">
        <a href="${escapeHtml(meeting.meetLink)}" target="_blank" class="btn-meet-video" title="Entrar na sala de vídeo: ${escapeHtml(meeting.meetLink)}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
            <rect x="2" y="6" width="14" height="12" rx="2"></rect>
          </svg>
          <span>Entrar Meet</span>
        </a>
      </div>

      <!-- Coluna 7: Ações Rápidas (Confirmar, Registrar Falta e Lápis de Edição) -->
      <div class="actions-cell">
        ${meeting.status === 'confirmed' ? `
          <span class="act-confirmed-pill" title="Presença confirmada">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Confirmada</span>
          </span>
        ` : (meeting.status !== 'noshow' ? `
          <button class="btn-tbl-compact btn-confirm" data-action="confirm" data-id="${meeting.id}" title="Confirmar Presença do Cliente">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Confirmar</span>
          </button>
        ` : `
          <span class="act-noshow-pill" title="Falta registrada">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <span>Falta Registrada</span>
          </span>
        `)}

        ${meeting.status !== 'noshow' ? `
          <button class="btn-tbl-compact btn-falta" data-action="noshow" data-id="${meeting.id}" title="Registrar Falta do Cliente (No-Show)">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <span>Registrar Falta</span>
          </button>
        ` : ''}

        <!-- Ícone de Lápis: Editar Informações do Cliente -->
        <button class="btn-tbl-icon btn-edit-client" data-action="edit" data-id="${meeting.id}" title="Editar informações do cliente">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
        </button>
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
  const meeting = STATE.meetings.find(m => String(m.id) === String(id));
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
    if (confirm(`Deseja registrar FALTA (NO-SHOW) para ${meeting.clientName}? O cliente será movido para a coluna NO SHOW no CRM.`)) {
      meeting.status = 'noshow';
      meeting.pipeline.noShowAlert.sent = true;
      meeting.pipeline.noShowAlert.sentAt = new Date().toLocaleTimeString().slice(0, 5);
      saveSingleMeeting(meeting);
      logEvent('NO_SHOW', meeting, `Falta registrada para ${meeting.clientName} (${meeting.clientPhone}) na reunião das ${meeting.time} com ${meeting.lawyer}`);
      renderApp();
      
      // Simula a movimentação de etapa no MindChat
      simulateCrmMove(meeting);
    }
  }
  else if (action === 'edit') {
    openEditMeetingModal(id);
  }
  else if (action === 'preview') {
    openPreviewModal(meeting);
  }
}

// ========================================================
// MODAL: EDITAR INFORMAÇÕES DO CLIENTE (LÁPIS)
// ========================================================
function openEditMeetingModal(meetingId) {
  const meeting = STATE.meetings.find(m => String(m.id) === String(meetingId));
  if (!meeting) return;

  const modal = document.getElementById('modal-edit-meeting');
  if (!modal) return;

  document.getElementById('edit-meeting-id').value = meeting.id;
  document.getElementById('edit-client-name').value = meeting.clientName || '';
  document.getElementById('edit-client-phone').value = meeting.clientPhone || '';
  document.getElementById('edit-meeting-time').value = meeting.time || '';
  document.getElementById('edit-meeting-lawyer').value = meeting.lawyer || 'Augusto';
  document.getElementById('edit-meeting-area').value = meeting.area || 'Trabalhista';
  document.getElementById('edit-meeting-link').value = meeting.meetLink || '';
  document.getElementById('edit-meeting-notes').value = meeting.notes || meeting.obs || '';

  modal.style.display = 'flex';
}
window.openEditMeetingModal = openEditMeetingModal;

function closeEditMeetingModal() {
  const modal = document.getElementById('modal-edit-meeting');
  if (modal) modal.style.display = 'none';
}
window.closeEditMeetingModal = closeEditMeetingModal;

async function saveEditedMeeting() {
  const id = document.getElementById('edit-meeting-id').value;
  const meeting = STATE.meetings.find(m => String(m.id) === String(id));
  if (!meeting) return;

  const name = document.getElementById('edit-client-name').value.trim();
  const phone = document.getElementById('edit-client-phone').value.trim();
  const time = document.getElementById('edit-meeting-time').value.trim();
  const lawyer = document.getElementById('edit-meeting-lawyer').value;
  const area = document.getElementById('edit-meeting-area').value;
  const link = document.getElementById('edit-meeting-link').value.trim();
  const notes = document.getElementById('edit-meeting-notes').value.trim();

  if (!name || !time) {
    showToast('⚠️ Por favor preencha ao menos o nome e o horário.', 'warning');
    return;
  }

  meeting.clientName = name;
  meeting.clientPhone = phone;
  meeting.time = time;
  meeting.lawyer = lawyer;
  meeting.area = area;
  meeting.meetLink = link || meeting.meetLink;
  meeting.notes = notes;

  await saveSingleMeeting(meeting);
  await logEvent('EDICAO_CLIENTE', meeting, `Dados de ${meeting.clientName} atualizados via edição rápida`);

  closeEditMeetingModal();
  renderApp();
  showToast(`✅ Informações de ${meeting.clientName} atualizadas e sincronizadas no banco com sucesso!`, 'success', 3500);
}
window.saveEditedMeeting = saveEditedMeeting;

// ========================================================
// CONTROLES DE EXIBIÇÃO / VISUALIZAÇÃO (ANTI NO-SHOW)
// ========================================================
const NOSHOW_VIEW_STATE = {
  density: localStorage.getItem('mvt_noshow_density') || 'comfortable',
  zoom: Number(localStorage.getItem('mvt_noshow_zoom')) || 100,
  panoramic: localStorage.getItem('mvt_noshow_panoramic') === 'true'
};

function toggleNoShowViewConfigDropdown(event) {
  if (event) event.stopPropagation();
  const menu = document.getElementById('noshow-table-view-menu');
  const btn = document.getElementById('btn-noshow-view-config');
  if (!menu) return;
  const isHidden = menu.style.display === 'none' || !menu.style.display;
  if (isHidden) {
    menu.style.display = 'flex';
    if (btn) btn.classList.add('active');
  } else {
    menu.style.display = 'none';
    if (btn) btn.classList.remove('active');
  }
}
window.toggleNoShowViewConfigDropdown = toggleNoShowViewConfigDropdown;

function closeNoShowViewConfigDropdown() {
  const menu = document.getElementById('noshow-table-view-menu');
  const btn = document.getElementById('btn-noshow-view-config');
  if (menu) menu.style.display = 'none';
  if (btn) btn.classList.remove('active');
}
window.closeNoShowViewConfigDropdown = closeNoShowViewConfigDropdown;

function setNoShowTableDensity(density) {
  NOSHOW_VIEW_STATE.density = density;
  localStorage.setItem('mvt_noshow_density', density);
  updateNoShowDisplayControlsUi();
}
window.setNoShowTableDensity = setNoShowTableDensity;

function changeNoShowTableZoom(delta) {
  let z = (NOSHOW_VIEW_STATE.zoom || 100) + delta;
  if (z < 70) z = 70;
  if (z > 140) z = 140;
  NOSHOW_VIEW_STATE.zoom = z;
  localStorage.setItem('mvt_noshow_zoom', String(z));
  applyNoShowTableZoom();
}
window.changeNoShowTableZoom = changeNoShowTableZoom;

function resetNoShowTableZoom() {
  NOSHOW_VIEW_STATE.zoom = 100;
  localStorage.setItem('mvt_noshow_zoom', '100');
  applyNoShowTableZoom();
}
window.resetNoShowTableZoom = resetNoShowTableZoom;

function applyNoShowTableZoom() {
  const display = document.getElementById('noshow-zoom-display');
  if (display) display.textContent = `${NOSHOW_VIEW_STATE.zoom}%`;
  const container = document.getElementById('noshow-table-view-container');
  if (container) {
    container.style.zoom = `${(NOSHOW_VIEW_STATE.zoom || 100) / 100}`;
  }
}
window.applyNoShowTableZoom = applyNoShowTableZoom;

function toggleNoShowPanoramicView() {
  NOSHOW_VIEW_STATE.panoramic = !NOSHOW_VIEW_STATE.panoramic;
  localStorage.setItem('mvt_noshow_panoramic', String(NOSHOW_VIEW_STATE.panoramic));
  updateNoShowPanoramicUi();
}
window.toggleNoShowPanoramicView = toggleNoShowPanoramicView;

function updateNoShowPanoramicUi() {
  const sec = document.getElementById('tab-reunioes');
  const btn = document.getElementById('btn-noshow-panoramic-toggle');
  const text = document.getElementById('noshow-panoramic-text');
  if (NOSHOW_VIEW_STATE.panoramic) {
    if (sec) sec.classList.add('noshow-panoramic');
    if (btn) btn.classList.add('active');
    if (text) text.textContent = 'Visão Padrão';
  } else {
    if (sec) sec.classList.remove('noshow-panoramic');
    if (btn) btn.classList.remove('active');
    if (text) text.textContent = 'Visão Panorâmica';
  }
}
window.updateNoShowPanoramicUi = updateNoShowPanoramicUi;

function updateNoShowDisplayControlsUi() {
  const btnCompact = document.getElementById('btn-noshow-density-compact');
  const btnComfortable = document.getElementById('btn-noshow-density-comfortable');
  const container = document.getElementById('noshow-table-view-container');
  if (btnCompact && btnComfortable) {
    if (NOSHOW_VIEW_STATE.density === 'compact') {
      btnCompact.classList.add('active');
      btnComfortable.classList.remove('active');
      if (container) container.classList.add('density-compact');
    } else {
      btnComfortable.classList.add('active');
      btnCompact.classList.remove('active');
      if (container) container.classList.remove('density-compact');
    }
  }
  applyNoShowTableZoom();
  updateNoShowPanoramicUi();
}
window.updateNoShowDisplayControlsUi = updateNoShowDisplayControlsUi;

// Fechar menus de exibição ao clicar fora
document.addEventListener('click', (e) => {
  if (!e.target.closest('.comm-view-settings-dropdown-wrapper')) {
    if (typeof closeTableViewConfigDropdown === 'function') closeTableViewConfigDropdown();
    closeNoShowViewConfigDropdown();
  }
});

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

// Obtém tarefas comerciais de 30m para integração na Grade da Agenda
function getCommercialCalendarTasks() {
  const clients = (window.COMMERCIAL_STATE && Array.isArray(window.COMMERCIAL_STATE.clients))
    ? window.COMMERCIAL_STATE.clients
    : (() => {
        try {
          return JSON.parse(localStorage.getItem('mvt_commercial_clients') || '[]');
        } catch(e) {
          return [];
        }
      })();

  return clients
    .filter(c => c && c.task && c.task.dueDate)
    .map(c => {
      const startTime = c.task.dueTime || '10:00';
      const endTime = c.task.endTime || (typeof window.calculateEndTime30m === 'function' ? window.calculateEndTime30m(startTime) : '10:30');
      return {
        id: 'task-' + c.id,
        clientId: c.id,
        clientName: c.name || 'Cliente Comercial',
        clientPhone: c.phone || '',
        date: c.task.dueDate,
        time: startTime,
        endTime: endTime,
        action: c.task.action || 'Compromisso Comercial',
        notes: c.task.notes || '',
        status: c.task.status || 'pending',
        lawyer: c.responsible || 'Augusto',
        area: c.area || 'Comercial',
        isCommercialTask: true
      };
    });
}
window.getCommercialCalendarTasks = getCommercialCalendarTasks;

// Vincula cliques para abrir o modal de detalhes/mensagens ou modal de tarefa de 30m
function _bindMeetingBlockClicks(container) {
  // Reuniões Anti No-Show (Google Agenda / CRM)
  container.querySelectorAll('.cal-meeting-block:not(.task-block), .cal-month-pill:not(.task-commercial-pill)').forEach(el => {
    el.addEventListener('click', () => {
      const meeting = STATE.meetings.find(m => m.id === el.dataset.id);
      if (meeting) openPreviewModal(meeting);
    });
  });

  // Tarefas Comerciais de 30m (Abre modal de edição/acompanhamento da tarefa)
  container.querySelectorAll('.cal-meeting-block.task-block, .cal-month-pill.task-commercial-pill').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const clientId = el.dataset.taskId;
      if (clientId && typeof window.openCommercialTaskModal === 'function') {
        window.openCommercialTaskModal(clientId);
      }
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

          const slotTasks = getCommercialCalendarTasks().filter(t => {
            if (t.date !== dStr) return false;
            if (!meetingMatchesTeamFilter({ lawyer: t.lawyer })) return false;
            const [tH] = t.time.split(':').map(Number);
            return tH === slotHour;
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
              ${slotTasks.map(t => `
                <div class="cal-meeting-block task-block ${t.status === 'done' ? 'task-done' : ''}" data-task-id="${t.clientId}" title="⏱️ Tarefa Comercial (30m): ${escapeHtml(t.clientName)} - ${escapeHtml(t.action)}">
                  <div class="cal-meeting-title" style="display: flex; align-items: center; justify-content: space-between; gap: 4px;">
                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">🎯 ${escapeHtml(t.clientName)}</span>
                    <span class="cal-task-tag-30m">30m</span>
                  </div>
                  <div class="cal-meeting-meta">
                    <span>🕒 ${t.time} - ${t.endTime}</span>
                    <span style="font-weight: 600; color: #c084fc; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 80px;" title="${escapeHtml(t.action)}">${escapeHtml(t.action)}</span>
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

          const slotTasks = getCommercialCalendarTasks().filter(t => {
            if (t.date !== dayStr) return false;
            const [tH] = t.time.split(':').map(Number);
            if (tH !== slotHour) return false;

            const tLawyer = (t.lawyer || '').toLowerCase();
            const memName = member.name.toLowerCase();
            return tLawyer.includes(memName) || memName.includes(tLawyer);
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
              ${slotTasks.map(t => `
                <div class="cal-meeting-block task-block ${t.status === 'done' ? 'task-done' : ''}" data-task-id="${t.clientId}" title="⏱️ Tarefa Comercial (30m): ${escapeHtml(t.clientName)} - ${escapeHtml(t.action)}">
                  <div class="cal-meeting-title" style="display: flex; align-items: center; justify-content: space-between; gap: 4px;">
                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">🎯 ${escapeHtml(t.clientName)}</span>
                    <span class="cal-task-tag-30m">30m</span>
                  </div>
                  <div class="cal-meeting-meta">
                    <span>🕒 ${t.time} - ${t.endTime}</span>
                    <span style="color: #c084fc; font-weight: 600;">${t.status === 'done' ? '✓ Concluída' : '⏱️ 30 min'}</span>
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
    const tasksThisDay = getCommercialCalendarTasks().filter(t => t.date === prevDateStr && meetingMatchesTeamFilter({ lawyer: t.lawyer }));

    html += `
      <div class="cal-month-cell other-month">
        <div class="cal-month-date">${dayNum}</div>
        ${meetingsThisDay.map(m => `
          <div class="cal-month-pill ${m.status}" data-id="${m.id}" title="${m.time} - ${escapeHtml(m.clientName)} (${escapeHtml(m.lawyer)})">
            ${m.time} ${escapeHtml(m.clientName)}
          </div>
        `).join('')}
        ${tasksThisDay.map(t => `
          <div class="cal-month-pill task-commercial-pill ${t.status === 'done' ? 'task-done' : ''}" data-task-id="${t.clientId}" title="⏱️ Tarefa Comercial: ${escapeHtml(t.clientName)} - ${escapeHtml(t.action)}">
            ⏱️ ${t.time} ${escapeHtml(t.clientName)} (30m)
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
    const tasksThisDay = getCommercialCalendarTasks().filter(t => t.date === thisDateStr && meetingMatchesTeamFilter({ lawyer: t.lawyer }));

    html += `
      <div class="cal-month-cell ${isToday ? 'today-cell' : ''}">
        <div class="cal-month-date" style="${isToday ? 'color: var(--blue-light); font-weight: 800;' : ''}">${day}</div>
        ${meetingsThisDay.map(m => `
          <div class="cal-month-pill ${m.status}" data-id="${m.id}" title="${m.time} - ${escapeHtml(m.clientName)} (${escapeHtml(m.lawyer)})">
            ${m.time} ${escapeHtml(m.clientName)}
          </div>
        `).join('')}
        ${tasksThisDay.map(t => `
          <div class="cal-month-pill task-commercial-pill ${t.status === 'done' ? 'task-done' : ''}" data-task-id="${t.clientId}" title="⏱️ Tarefa Comercial: ${escapeHtml(t.clientName)} - ${escapeHtml(t.action)}">
            ⏱️ ${t.time} ${escapeHtml(t.clientName)} (30m)
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
    const tasksThisDay = getCommercialCalendarTasks().filter(t => t.date === nextDateStr && meetingMatchesTeamFilter({ lawyer: t.lawyer }));

    html += `
      <div class="cal-month-cell other-month">
        <div class="cal-month-date">${nextDay}</div>
        ${meetingsThisDay.map(m => `
          <div class="cal-month-pill ${m.status}" data-id="${m.id}" title="${m.time} - ${escapeHtml(m.clientName)} (${escapeHtml(m.lawyer)})">
            ${m.time} ${escapeHtml(m.clientName)}
          </div>
        `).join('')}
        ${tasksThisDay.map(t => `
          <div class="cal-month-pill task-commercial-pill ${t.status === 'done' ? 'task-done' : ''}" data-task-id="${t.clientId}" title="⏱️ Tarefa Comercial: ${escapeHtml(t.clientName)} - ${escapeHtml(t.action)}">
            ⏱️ ${t.time} ${escapeHtml(t.clientName)} (30m)
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
  const embedContainer = document.getElementById('calendar-google-embed-container');
  const iframe = document.getElementById('gcal-embed-iframe');
  if (!container) return;

  const view = STATE.calendarView || 'week';

  if (view === 'google') {
    container.style.display = 'none';
    if (embedContainer) embedContainer.style.display = 'block';

    const savedEmbed = localStorage.getItem('mvt_gcal_embed_url') || 'https://calendar.google.com/calendar/embed?src=asiqueira%40mvtadvogados.com.br&ctz=America%2FSao_Paulo';
    if (iframe && iframe.src !== savedEmbed) {
      iframe.src = savedEmbed;
    }
    return;
  }

  container.style.display = 'block';
  if (embedContainer) embedContainer.style.display = 'none';

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
  document.getElementById('template-alert-60m').value = STATE.templates.ALERT_60M || '';
  document.getElementById('template-alert-30m').value = STATE.templates.ALERT_30M || '';
  document.getElementById('template-alert-15m').value = STATE.templates.ALERT_15M || '';
  document.getElementById('template-alert-0m').value = STATE.templates.ALERT_0M || '';
  const im = document.getElementById('template-alert-imediato');
  if (im) im.value = STATE.templates.ALERT_IMEDIATO || CONFIG.MESSAGE_TEMPLATES.ALERT_IMEDIATO || '';
  document.getElementById('template-noshow-1h').value = STATE.templates.NO_SHOW_1H || '';
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

// ========================================================
// CONTROLE DE CADÊNCIA DE HORÁRIOS (RÉGUA ANTI NO-SHOW)
// ========================================================
const DEFAULT_CADENCE_CONFIG = {
  step1: { interval: 60, enabled: true },   // 1º: Confirmação ativa (1h antes)
  step2: { interval: 30, enabled: false },  // 2º: Reforço (desativado por padrão para evitar spam)
  step3: { interval: 15, enabled: false },  // 3º: Urgência (desativado por padrão para evitar spam)
  step4: { interval: 10, enabled: true },   // 4º: Pré-Sala & Google Meet (10m antes - Recomendado!)
  step5: { interval: 60, enabled: true }    // 5º: Tolerância No-Show (60m após)
};

function getCadenceConfig() {
  try {
    const saved = localStorage.getItem('mvt_cadence_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migração suave: se a configuração ainda tinha 0min na etapa 4, eleva para o padrão de pré-sala (10m)
      if (parsed.step4 && parsed.step4.interval === 0) {
        parsed.step4.interval = 10;
      }
      return { ...DEFAULT_CADENCE_CONFIG, ...parsed };
    }
  } catch (e) {}
  return { ...DEFAULT_CADENCE_CONFIG };
}

function saveCadenceConfig(cfg) {
  localStorage.setItem('mvt_cadence_settings', JSON.stringify(cfg));
  updateCadenceTimelineUi(cfg);
}

function updateCadenceTimelineUi(cfg) {
  const t1 = document.getElementById('tag-cadence-step1');
  const t2 = document.getElementById('tag-cadence-step2');
  const t3 = document.getElementById('tag-cadence-step3');
  const t4 = document.getElementById('tag-cadence-step4');
  const t5 = document.getElementById('tag-cadence-step5');

  if (t1) t1.textContent = cfg.step1.enabled ? `${cfg.step1.interval}m antes` : 'Pausado';
  if (t2) t2.textContent = cfg.step2.enabled ? `${cfg.step2.interval}m antes` : 'Dispensado';
  if (t3) t3.textContent = cfg.step3.enabled ? `${cfg.step3.interval}m antes` : 'Dispensado';
  if (t4) t4.textContent = cfg.step4.enabled ? (cfg.step4.interval === 0 ? 'No Horário' : `${cfg.step4.interval}m antes`) : 'Pausado';
  if (t5) t5.textContent = cfg.step5.enabled ? `${cfg.step5.interval}m após` : 'Pausado';
}

function setupCadenceControls() {
  const cfg = getCadenceConfig();

  const s1 = document.getElementById('cadence-interval-step1');
  const e1 = document.getElementById('cadence-enable-step1');
  const s2 = document.getElementById('cadence-interval-step2');
  const e2 = document.getElementById('cadence-enable-step2');
  const s3 = document.getElementById('cadence-interval-step3');
  const e3 = document.getElementById('cadence-enable-step3');
  const s4 = document.getElementById('cadence-interval-step4');
  const e4 = document.getElementById('cadence-enable-step4');
  const s5 = document.getElementById('cadence-interval-step5');
  const e5 = document.getElementById('cadence-enable-step5');

  if (s1 && cfg.step1) s1.value = String(cfg.step1.interval);
  if (e1 && cfg.step1) e1.checked = Boolean(cfg.step1.enabled);
  if (s2 && cfg.step2) s2.value = String(cfg.step2.interval);
  if (e2 && cfg.step2) e2.checked = Boolean(cfg.step2.enabled);
  if (s3 && cfg.step3) s3.value = String(cfg.step3.interval);
  if (e3 && cfg.step3) e3.checked = Boolean(cfg.step3.enabled);
  if (s4 && cfg.step4) s4.value = String(cfg.step4.interval);
  if (e4 && cfg.step4) e4.checked = Boolean(cfg.step4.enabled);
  if (s5 && cfg.step5) s5.value = String(cfg.step5.interval);
  if (e5 && cfg.step5) e5.checked = Boolean(cfg.step5.enabled);

  updateCadenceTimelineUi(cfg);

  const readCurrentForm = () => ({
    step1: { interval: Number(s1?.value || 60), enabled: Boolean(e1?.checked) },
    step2: { interval: Number(s2?.value || 30), enabled: Boolean(e2?.checked) },
    step3: { interval: Number(s3?.value || 15), enabled: Boolean(e3?.checked) },
    step4: { interval: Number(s4?.value || 10), enabled: Boolean(e4?.checked) },
    step5: { interval: Number(s5?.value || 60), enabled: Boolean(e5?.checked) }
  });

  [s1, e1, s2, e2, s3, e3, s4, e4, s5, e5].forEach(el => {
    if (el) {
      el.addEventListener('change', () => {
        const current = readCurrentForm();
        updateCadenceTimelineUi(current);
      });
    }
  });

  const btnSave = document.getElementById('btn-save-cadence');
  if (btnSave) {
    btnSave.addEventListener('click', () => {
      const current = readCurrentForm();
      saveCadenceConfig(current);
      showToast('✅ Cadência de horários anti no-show salva com sucesso!', 'success', 3500);
    });
  }
}

// Motor de Automação Anti No-Show (Disparos Automáticos Conforme Cadência)
function checkAutomatedTriggers(now) {
  if (STATE.automationEnabled === false) return; // Automação pausada pelo usuário

  const cadence = getCadenceConfig();

  STATE.meetings.forEach(meeting => {
    if (meeting.status === 'noshow') return;

    if (!meeting.pipeline) {
      meeting.pipeline = {
        alert60m: { sent: false, sentAt: null },
        alert30m: { sent: false, sentAt: null },
        alert15m: { sent: false, sentAt: null },
        alert0m: { sent: false, sentAt: null },
        alertImmediate: { sent: false, sentAt: null },
        noShowAlert: { sent: false, sentAt: null }
      };
    }

    const [mH, mM] = meeting.time.split(':').map(Number);
    const meetingDate = new Date(now);
    meetingDate.setHours(mH, mM, 0, 0);

    const diffMinutes = Math.round((meetingDate - now) / 60000);

    // 0. AGENDAMENTO IMEDIATO / CURTA DURAÇÃO (< 45 minutos da reunião)
    // Se a reunião foi criada/agendada para daqui a menos de 45 minutos e ainda não teve disparo:
    // Dispara notificação imediata contendo confirmação e o link do Meet direto!
    const isShortNotice = diffMinutes <= 45 && diffMinutes > 0;
    const hasSentAnyAlert = Boolean(meeting.pipeline?.alertImmediate?.sent || meeting.pipeline?.alert60m?.sent || meeting.pipeline?.alert0m?.sent);

    if (isShortNotice && !hasSentAnyAlert) {
      const nowTimeStr = new Date().toLocaleTimeString().slice(0, 5);
      meeting.pipeline.alertImmediate = { sent: true, sentAt: nowTimeStr };
      meeting.pipeline.alert60m = { sent: true, sentAt: nowTimeStr };
      meeting.pipeline.alert0m = { sent: true, sentAt: nowTimeStr };
      saveSingleMeeting(meeting);
      logEvent('AGENDAMENTO_IMEDIATO', meeting, `Agendamento de última hora (${diffMinutes}m restantes): Confirmação e link do Google Meet entregues.`);
      showToast(`⚡ Agendamento Imediato: Link da sala e confirmação enviados para ${meeting.clientName}!`, 'success', 5000);
      renderApp();
      return;
    }

    // 1º Disparo (Confirmação 1h antes)
    const meetInterval = cadence.step4.enabled ? cadence.step4.interval : 0;
    if (cadence.step1.enabled && !meeting.pipeline.alert60m?.sent && diffMinutes <= cadence.step1.interval && diffMinutes > meetInterval) {
      meeting.pipeline.alert60m.sent = true;
      meeting.pipeline.alert60m.sentAt = new Date().toLocaleTimeString().slice(0, 5);
      saveSingleMeeting(meeting);
      logEvent('ALERTA_60M', meeting, `Pedido de confirmação de presença (${cadence.step1.interval}m antes) disparado`);
      showToast(`🟡 Confirmação (${cadence.step1.interval}m antes) disparada para ${meeting.clientName}!`, 'warning', 3500);
      renderMeetingsList();
    }

    // 2º Disparo (Reforço se habilitado e não confirmado)
    const nextLimit2 = cadence.step3.enabled ? cadence.step3.interval : meetInterval;
    if (cadence.step2.enabled && meeting.status !== 'confirmed' && !meeting.pipeline.alert30m?.sent && diffMinutes <= cadence.step2.interval && diffMinutes > nextLimit2) {
      meeting.pipeline.alert30m.sent = true;
      meeting.pipeline.alert30m.sentAt = new Date().toLocaleTimeString().slice(0, 5);
      saveSingleMeeting(meeting);
      logEvent('ALERTA_30M', meeting, `Lembrete de reforço (${cadence.step2.interval}m antes) disparado`);
      showToast(`🟠 Reforço de ${cadence.step2.interval}m disparado para ${meeting.clientName}!`, 'warning', 3000);
      renderMeetingsList();
    }

    // 3º Disparo (Última Chamada se habilitada e não confirmada)
    if (cadence.step3.enabled && meeting.status !== 'confirmed' && !meeting.pipeline.alert15m?.sent && diffMinutes <= cadence.step3.interval && diffMinutes > meetInterval) {
      meeting.pipeline.alert15m.sent = true;
      meeting.pipeline.alert15m.sentAt = new Date().toLocaleTimeString().slice(0, 5);
      saveSingleMeeting(meeting);
      logEvent('ALERTA_15M', meeting, `Última chamada (${cadence.step3.interval}m antes) disparada`);
      showToast(`🔴 Última chamada de ${cadence.step3.interval}m disparada para ${meeting.clientName}!`, 'danger', 3000);
      renderMeetingsList();
    }

    // 4º Disparo (Pré-Sala & Google Meet — 10m antes por padrão!)
    if (cadence.step4.enabled && !meeting.pipeline.alert0m?.sent && diffMinutes <= cadence.step4.interval && diffMinutes > -20) {
      meeting.pipeline.alert0m.sent = true;
      meeting.pipeline.alert0m.sentAt = new Date().toLocaleTimeString().slice(0, 5);
      saveSingleMeeting(meeting);
      logEvent('ENVIO_MEET', meeting, `Pré-sala liberada: Link do Google Meet enviado ${cadence.step4.interval}m antes`);
      showToast(`🚀 Pré-Sala Liberada! Link do Meet enviado para ${meeting.clientName} (${cadence.step4.interval}m antes)!`, 'success', 4500);
      renderMeetingsList();
    }

    // 5º Disparo (Tolerância pós-falta / NO SHOW automático)
    if (cadence.step5.enabled && diffMinutes <= -cadence.step5.interval && meeting.status !== 'confirmed' && meeting.status !== 'noshow') {
      meeting.status = 'noshow';
      meeting.pipeline.noShowAlert.sent = true;
      meeting.pipeline.noShowAlert.sentAt = new Date().toLocaleTimeString().slice(0, 5);
      saveSingleMeeting(meeting);
      logEvent('NO_SHOW_AUTOMATICO', meeting, `Tolerância de ${cadence.step5.interval}m esgotada. Declarado No-Show.`);
      showToast(`⚠️ NO-SHOW DETECTADO: ${meeting.clientName} não compareceu após ${cadence.step5.interval}m. Movido para NO SHOW no CRM.`, 'danger', 6000);
      renderApp();
      simulateCrmMove(meeting);
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

// Atualizar contador de reuniões na barra de filtros (formato limpo idêntico ao comercial)
function updateFilteredResultsCounter(filteredCount, totalCount) {
  const pill = document.getElementById('filter-results-counter-pill');
  const countText = document.getElementById('filter-results-count-text');
  if (!countText) return;

  const activeFilters = getActiveFilterCount();
  const hasSearch = Boolean(STATE.filterSearch && STATE.filterSearch.trim());

  if (pill) {
    pill.classList.toggle('is-filtered', activeFilters > 0 || hasSearch);
  }

  const plural = filteredCount === 1 ? 'reunião' : 'reuniões';
  countText.innerHTML = `<strong>${filteredCount}</strong> ${plural}`;
}

// Atualizar interface visual do botão de automação
function updateAutomationButtonUi() {
  const btn = document.getElementById('btn-automation-toggle');
  const label = document.getElementById('auto-toggle-label');
  if (!btn) return;
  const isEnabled = STATE.automationEnabled !== false;

  if (isEnabled) {
    btn.className = 'btn-automation-toggle active';
    if (label) label.textContent = 'Automação Ativa';
    btn.title = 'Automação Anti No-Show ligada. Clique para pausar os envios automáticos de WhatsApp.';
  } else {
    btn.className = 'btn-automation-toggle inactive';
    if (label) label.textContent = 'Automação Pausada';
    btn.title = 'Automação Anti No-Show desligada. Clique para reativar os envios automáticos de WhatsApp.';
  }
}

// Configuração do Modal e Ações do Botão de Automação Anti No-Show
function setupAutomationToggle() {
  const toggleBtn = document.getElementById('btn-automation-toggle');
  const modal = document.getElementById('modal-automation-confirm');
  const btnCancel = document.getElementById('btn-cancel-automation-modal');
  const btnConfirm = document.getElementById('btn-confirm-automation-action');
  const icon = document.getElementById('confirm-auto-icon');
  const title = document.getElementById('confirm-auto-title');
  const desc = document.getElementById('confirm-auto-desc');

  if (!toggleBtn || !modal) return;

  updateAutomationButtonUi();

  toggleBtn.addEventListener('click', () => {
    const isCurrentlyEnabled = STATE.automationEnabled !== false;
    if (isCurrentlyEnabled) {
      if (icon) icon.textContent = '⚠️';
      if (title) title.textContent = 'Pausar Automação Anti No-Show?';
      if (desc) desc.textContent = 'Ao pausar a automação, o envio automático de todas as mensagens de confirmação e alertas da régua anti no-show pelo WhatsApp será interrompido para todos os clientes.';
      if (btnConfirm) {
        btnConfirm.textContent = 'Sim, Pausar Automação';
        btnConfirm.style.background = '#ef4444';
        btnConfirm.style.borderColor = '#ef4444';
      }
    } else {
      if (icon) icon.textContent = '⚡';
      if (title) title.textContent = 'Reativar Automação Anti No-Show?';
      if (desc) desc.textContent = 'Ao reativar, o sistema retomará o monitoramento contínuo dos horários e o envio automático das mensagens da régua anti no-show no WhatsApp para os clientes da pauta.';
      if (btnConfirm) {
        btnConfirm.textContent = 'Sim, Reativar Automação';
        btnConfirm.style.background = '#10b981';
        btnConfirm.style.borderColor = '#10b981';
      }
    }
    modal.classList.add('active');
  });

  if (btnCancel) {
    btnCancel.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  if (btnConfirm) {
    btnConfirm.addEventListener('click', () => {
      STATE.automationEnabled = !STATE.automationEnabled;
      localStorage.setItem('mvt_automation_enabled', String(STATE.automationEnabled));
      modal.classList.remove('active');
      updateAutomationButtonUi();

      if (STATE.automationEnabled) {
        showToast('🟢 Automação Anti No-Show ATIVADA com sucesso!', 'success', 3500);
      } else {
        showToast('⏸️ Automação Anti No-Show PAUSADA! Disparos suspensos.', 'warning', 4500);
      }
    });
  }
}

// ========================================================
// CONTROLE GLOBAL DE CONEXÃO COM O MINDCHAT (WHATSAPP)
// ========================================================
function updateGlobalMindChatButtonUi() {
  const isConnected = STATE.mindchatConnected !== false;

  // Botão no Dashboard Principal
  const btnDash = document.getElementById('btn-global-mindchat-toggle');
  const lblDash = document.getElementById('global-mindchat-label');
  if (btnDash) {
    btnDash.className = `btn-automation-toggle ${isConnected ? 'active' : 'inactive'}`;
    btnDash.title = isConnected 
      ? 'MindChat conectado (Instância Mind17 ativa). Clique para desconectar a API geral.' 
      : 'MindChat desconectado (Instância Mind17 pausada). Clique para reconectar a API geral.';
  }
  if (lblDash) lblDash.textContent = isConnected ? 'MindChat Conectado' : 'MindChat Desconectado';

  // Botão na Pauta Anti No-Show
  const btnNoShow = document.getElementById('btn-noshow-mindchat-toggle');
  const lblNoShow = document.getElementById('noshow-mindchat-label');
  if (btnNoShow) {
    btnNoShow.className = `btn-automation-toggle ${isConnected ? 'active' : 'inactive'}`;
    btnNoShow.title = isConnected 
      ? 'MindChat conectado. Clique para desconectar a API geral.' 
      : 'MindChat desconectado. Clique para reconectar a API geral.';
  }
  if (lblNoShow) lblNoShow.textContent = isConnected ? 'MindChat Conectado' : 'MindChat Desconectado';

  // Sincroniza com o botão do módulo Comercial se existente
  if (typeof COMMERCIAL_STATE !== 'undefined') {
    COMMERCIAL_STATE.mindchatConnected = isConnected;
    if (typeof updateCommercialMindChatButtonUi === 'function') {
      updateCommercialMindChatButtonUi();
    }
  }
}
window.updateGlobalMindChatButtonUi = updateGlobalMindChatButtonUi;

function toggleGlobalMindChatConnection() {
  const isConnected = STATE.mindchatConnected !== false;
  const nextState = !isConnected;
  STATE.mindchatConnected = nextState;
  localStorage.setItem('mvt_global_mindchat_connected', nextState ? 'true' : 'false');
  localStorage.setItem('mvt_commercial_mindchat_connected', nextState ? 'true' : 'false');

  updateGlobalMindChatButtonUi();

  if (nextState) {
    showToast('🟢 MindChat Reconectado! Sincronização e integração com a instância Mind17 reativadas.', 'success', 3500);
  } else {
    showToast('🛑 MindChat Desconectado Geralmente! Toda sincronização de WhatsApp e CRM com a API foi pausada.', 'warning', 4500);
  }
}
window.toggleGlobalMindChatConnection = toggleGlobalMindChatConnection;

function renderActiveFilterChips() {
  const container = document.getElementById('active-filter-chips');
  if (!container) return;
  container.innerHTML = '';

  const chips = [];
  if (STATE.filterSearch && STATE.filterSearch.trim() !== '') {
    chips.push({ key: 'search', label: `Busca: "${STATE.filterSearch}"` });
  }
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
      if (c.key === 'search') {
        STATE.filterSearch = '';
        const searchInput = document.getElementById('meetings-search-input');
        if (searchInput) searchInput.value = '';
      }
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
      showToast(`${count} filtro(s) ativo(s)!`, 'info', 1800);
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
function switchTab(tabId, subtab) {
  if (!tabId) return;

  // Atualizar estado de todos os botões que apontam para abas
  document.querySelectorAll('[data-tab]').forEach(btn => {
    if (subtab && btn.dataset.subtab) {
      btn.classList.toggle('active', btn.dataset.tab === tabId && btn.dataset.subtab === subtab);
    } else if (!subtab && btn.dataset.subtab) {
      btn.classList.remove('active');
    } else {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    }
  });

  // Ocultar todos os painéis e exibir o selecionado
  document.querySelectorAll('.tab-pane').forEach(p => {
    p.style.display = 'none';
  });

  const targetPane = document.getElementById(tabId);
  if (targetPane) {
    targetPane.style.display = 'block';
  }

  // Controle inteligente de expansão de subcategorias no menu lateral:
  const groupPlanilhas = document.getElementById('group-planilhas');
  const groupAntiNoShow = document.getElementById('group-anti-noshow');

  // Planilhas e Dados
  if (tabId === 'tab-comercial' || tabId === 'tab-dados') {
    groupPlanilhas?.classList.add('expanded');
  } else {
    groupPlanilhas?.classList.remove('expanded');
  }

  // Anti No-Show e Mensagem
  if (tabId === 'tab-reunioes' || tabId === 'tab-templates') {
    groupAntiNoShow?.classList.add('expanded');
  } else {
    groupAntiNoShow?.classList.remove('expanded');
  }

  // Se a aba for a Planilha Comercial, acionar renderização ou mudar sub-aba
  if (tabId === 'tab-comercial') {
    if (subtab && typeof window.setCommercialSubtab === 'function') {
      window.setCommercialSubtab(subtab);
    } else if (typeof window.renderCommercialApp === 'function') {
      window.renderCommercialApp();
    }
  }

  // Se a aba for a Agenda de Reuniões, recalcular grade do calendário e legendas
  if (tabId === 'tab-calendar' && typeof renderCalendarGrid === 'function') {
    renderCalendarGrid();
    updateCalendarLegendCounts();
  }

  // Se a aba for Reuniões / Anti No-Show, renderizar lista
  if (tabId === 'tab-reunioes' && typeof renderMeetingsList === 'function') {
    renderMeetingsList();
  }
}
window.switchTab = switchTab;

function updateCalendarLegendCounts() {
  const meetingCountEl = document.getElementById('cal-legend-meetings-count');
  const taskCountEl = document.getElementById('cal-legend-tasks-count');
  if (meetingCountEl && STATE.meetings) {
    meetingCountEl.textContent = STATE.meetings.length;
  }
  if (taskCountEl && typeof getCommercialCalendarTasks === 'function') {
    taskCountEl.textContent = getCommercialCalendarTasks().length;
  }
}
window.updateCalendarLegendCounts = updateCalendarLegendCounts;

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
      const subtab = btn.dataset.subtab;
      const parentGroup = btn.closest('.collapsible-group');

      // Se for um item principal com subcategorias e já estiver ativo e expandido, permite alternar/recolher
      if (btn.classList.contains('main-item') && parentGroup) {
        if (parentGroup.classList.contains('expanded') && btn.classList.contains('active')) {
          parentGroup.classList.remove('expanded');
          return;
        }
      }

      switchTab(tabId, subtab);
    });
  });

  // Inicializa o menu lateral esquerdo
  setupLeftSidebar();

  // Inicialização do Modal Popup de Filtros & Contador
  setupFilterModal();
  updateFilterBadge();

  // Barra de Pesquisa Rápida na Aba de Reuniões / Anti No-Show (com debounce para digitação instantânea)
  const meetingsSearchInput = document.getElementById('meetings-search-input');
  let meetingsSearchTimeout = null;
  if (meetingsSearchInput) {
    meetingsSearchInput.addEventListener('input', (e) => {
      STATE.filterSearch = e.target.value;
      clearTimeout(meetingsSearchTimeout);
      meetingsSearchTimeout = setTimeout(() => {
        renderMeetingsList();
        renderActiveFilterChips();
      }, 120);
    });
  }

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
  document.getElementById('btn-open-new-meeting')?.addEventListener('click', () => {
    if (modalNew) {
      modalNew.classList.add('active');
      document.getElementById('new-time').value = getRelativeTime(60);
    }
  });

  // Clique no Perfil do Usuário leva para Configurações
  document.getElementById('user-profile-badge')?.addEventListener('click', () => {
    switchTab('tab-settings');
  });

  document.getElementById('btn-close-modal')?.addEventListener('click', () => modalNew?.classList.remove('active'));
  document.getElementById('btn-cancel-meeting')?.addEventListener('click', () => modalNew?.classList.remove('active'));

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
    const im = document.getElementById('template-alert-imediato');
    if (im) STATE.templates.ALERT_IMEDIATO = im.value;
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
  if (STATE.mindchatConnected === false) {
    if (!silent) showToast('🛑 MindChat está desconectado. Clique no botão de conexão no Dashboard para reconectar antes de sincronizar.', 'warning', 4000);
    return;
  }
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

// Salvar link da agenda (suporta tanto links .ics quanto URLs de embed/iframe)
window.handleSaveGcal = function() {
  const inputEl = document.getElementById('gcal-ical-input');
  if (!inputEl) return;
  let raw = inputEl.value.trim();
  if (!raw) {
    showToast('⚠️ Cole o link ou código da agenda antes de salvar.', 'warning');
    return;
  }

  // 1. Extração automática caso o usuário cole a tag <iframe src="...">
  let cleanUrl = raw;
  if (raw.includes('<iframe') && raw.includes('src=')) {
    const match = raw.match(/src=["']([^"']+)["']/i);
    if (match && match[1]) {
      cleanUrl = match[1];
      inputEl.value = cleanUrl; // limpa o campo na tela para ficar elegante
    }
  }

  // 2. Se for link do tipo Embed do Google Calendar (URL público / Incorporar)
  if (cleanUrl.includes('calendar.google.com/calendar/embed') || cleanUrl.includes('/embed?src=')) {
    GCAL_STATE.icalUrl = cleanUrl;
    localStorage.setItem('mvt_gcal_url', cleanUrl);
    localStorage.setItem('mvt_gcal_embed_url', cleanUrl);
    _showSyncPanel(cleanUrl);
    _setGcalStatus('connected');

    // Configura o iframe do Google Agenda
    const iframe = document.getElementById('gcal-embed-iframe');
    if (iframe) iframe.src = cleanUrl;

    // Ativa automaticamente a visão do Google Agenda Oficial
    STATE.calendarView = 'google';
    document.querySelectorAll('.cal-view-btn').forEach(b => b.classList.toggle('active', b.dataset.view === 'google'));
    renderCalendarGrid();

    showToast('🎉 Google Agenda Oficial conectada com sucesso! Visualização ao vivo ativada.', 'success', 5000);
    return;
  }

  // 3. Se for link iCal (.ics)
  if (!cleanUrl.includes('google.com') && !cleanUrl.endsWith('.ics')) {
    showToast('⚠️ O link não parece ser válido. Cole o URL da sua agenda ou o código do iframe.', 'warning', 5000);
    return;
  }

  if (cleanUrl.includes('/public/basic.ics')) {
    showToast('⚠️ Nota: o Google Workspace corporativo (@mvtadvogados.com.br) bloqueia links /public/. Caso dê erro 404, use o código de Incorporar (iframe) ou o botão "Importar Arquivo .ics direto".', 'warning', 7000);
  }

  GCAL_STATE.icalUrl = cleanUrl;
  localStorage.setItem('mvt_gcal_url', cleanUrl);
  _showSyncPanel(cleanUrl);
  showToast('✅ Link salvo com sucesso! Clique em "Sincronizar Agora" para processar.', 'success', 4000);
};

// Sincronizar agenda
window.handleSyncGcal = function() {
  const inputEl = document.getElementById('gcal-ical-input');
  if (inputEl && inputEl.value.trim()) {
    let url = inputEl.value.trim();
    if (url.includes('<iframe') && url.includes('src=')) {
      const match = url.match(/src=["']([^"']+)["']/i);
      if (match && match[1]) {
        url = match[1];
        inputEl.value = url;
      }
    }
    GCAL_STATE.icalUrl = url;
    localStorage.setItem('mvt_gcal_url', url);
    _showSyncPanel(url);

    // Se for link embed, atualiza o iframe e confirma conexão
    if (url.includes('/embed?src=') || url.includes('/calendar/embed')) {
      localStorage.setItem('mvt_gcal_embed_url', url);
      const iframe = document.getElementById('gcal-embed-iframe');
      if (iframe) iframe.src = url;
      STATE.calendarView = 'google';
      document.querySelectorAll('.cal-view-btn').forEach(b => b.classList.toggle('active', b.dataset.view === 'google'));
      renderCalendarGrid();
      _setGcalStatus('connected');
      showToast('🔄 Google Agenda Oficial atualizada ao vivo na tela!', 'success', 3500);
      return;
    }
  }

  // Se for link de embed já salvo
  if (GCAL_STATE.icalUrl && (GCAL_STATE.icalUrl.includes('/embed?src=') || GCAL_STATE.icalUrl.includes('/calendar/embed'))) {
    const iframe = document.getElementById('gcal-embed-iframe');
    if (iframe) iframe.src = GCAL_STATE.icalUrl;
    STATE.calendarView = 'google';
    document.querySelectorAll('.cal-view-btn').forEach(b => b.classList.toggle('active', b.dataset.view === 'google'));
    renderCalendarGrid();
    _setGcalStatus('connected');
    showToast('🔄 Google Agenda Oficial atualizada ao vivo na tela!', 'success', 3500);
    return;
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

// Alterar usuário associado à Google Agenda
window.handleGcalUserChange = function(newUser) {
  if (!newUser) return;
  localStorage.setItem('mvt_gcal_user', newUser);
  const currentStatus = GCAL_STATE.icalUrl ? 'connected' : 'disconnected';
  _setGcalStatus(currentStatus);
  showToast(`👤 Usuário da agenda definido para: ${newUser}`, 'info', 3000);
};

// Rolar suavemente até as configurações da Google Agenda
window.scrollToGcalSettings = function() {
  const box = document.querySelector('.calendar-integration-box');
  if (box) {
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const input = document.getElementById('gcal-ical-input');
    if (input) {
      setTimeout(() => {
        input.focus();
        input.classList.add('gcal-input-highlight');
        setTimeout(() => input.classList.remove('gcal-input-highlight'), 2200);
      }, 350);
    }
  }
};

// Inicializar o painel do Google Agenda assim que a DOM estiver pronta
function setupGoogleCalendarIntegration() {
  const inputEl    = document.getElementById('gcal-ical-input');
  const userSelect = document.getElementById('gcal-user-select');
  const saveBtn    = document.getElementById('btn-save-gcal');
  const syncBtn    = document.getElementById('btn-gcal-sync');
  const discBtn    = document.getElementById('btn-gcal-disconnect');
  const importBtn  = document.getElementById('btn-gcal-import-all');

  const savedUser = localStorage.getItem('mvt_gcal_user') || 'Augusto';
  if (userSelect) {
    userSelect.value = savedUser;
  }

  // Restaurar URL salva (com normalização caso tenha tag iframe)
  if (GCAL_STATE.icalUrl) {
    let clean = GCAL_STATE.icalUrl;
    if (clean.includes('<iframe') && clean.includes('src=')) {
      const match = clean.match(/src=["']([^"']+)["']/i);
      if (match && match[1]) {
        clean = match[1];
        localStorage.setItem('mvt_gcal_url', clean);
      }
    }
    if (inputEl) inputEl.value = clean;
    if (clean.includes('/embed?src=') || clean.includes('/calendar/embed')) {
      const iframe = document.getElementById('gcal-embed-iframe');
      if (iframe) iframe.src = clean;
    }
    _showSyncPanel(clean);
    _updateSyncTimestamp();
    _setGcalStatus('connected');
  } else {
    _setGcalStatus('disconnected');
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
      showToast('Agenda desconectada com sucesso.', 'info');
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

// Atualizar o status da integração no painel e no cabeçalho executivo
function _setGcalStatus(state) {
  const pill = document.getElementById('gcal-status-pill');
  const dot  = pill ? pill.querySelector('.status-dot') : null;
  const text = document.getElementById('gcal-status-text');

  // Elementos do novo cabeçalho executivo na página de Agenda
  const headerBadge = document.getElementById('cal-status-connection-badge');
  const badgeTitle  = document.getElementById('cal-badge-status-title');
  const badgeUserSub = document.getElementById('cal-badge-user-sub');
  const userDesc    = document.getElementById('cal-user-connection-desc');

  const savedUser = localStorage.getItem('mvt_gcal_user') || 'Augusto';
  const userEmailMap = {
    'Augusto': 'augusto@mvtadvogados.com.br',
    'Ana Carla': 'anacarla@mvtadvogados.com.br',
    'Julia': 'julia@mvtadvogados.com.br',
    'João': 'joao@mvtadvogados.com.br',
    'Dra. Natalia': 'natalia@mvtadvogados.com.br',
    'Dra. Ludmila': 'ludmila@mvtadvogados.com.br'
  };
  const userEmail = userEmailMap[savedUser] || `${savedUser.toLowerCase().replace(/[^a-z]/g, '')}@mvtadvogados.com.br`;
  const roleLabel = savedUser.includes('Dra.') ? 'Advogada' : 'Comercial';

  if (state === 'connected') {
    // Painel secundário
    if (pill) {
      pill.style.background = 'rgba(16,185,129,0.12)';
      pill.style.borderColor = 'rgba(16,185,129,0.35)';
      if (dot) dot.style.background = '#10b981';
      if (text) text.textContent = 'Agenda conectada';
    }
    // Cabeçalho executivo da página
    if (headerBadge) {
      headerBadge.classList.remove('disconnected', 'syncing');
      headerBadge.classList.add('connected');
      headerBadge.title = `Sincronização ativa com a agenda de ${savedUser}. Clique para gerenciar.`;
    }
    if (badgeTitle) badgeTitle.textContent = 'Conectado';
    if (badgeUserSub) badgeUserSub.textContent = `${savedUser} (${roleLabel})`;
    if (userDesc) {
      userDesc.innerHTML = `Integrado com a agenda de <strong id="cal-header-user-name" class="cal-highlight-user">${savedUser}</strong> (<span id="cal-header-user-email">${userEmail}</span>)`;
    }
  } else if (state === 'syncing') {
    // Painel secundário
    if (pill) {
      pill.style.background = 'rgba(245,158,11,0.12)';
      pill.style.borderColor = 'rgba(245,158,11,0.35)';
      if (dot) dot.style.background = '#f59e0b';
      if (text) text.textContent = 'Sincronizando...';
    }
    // Cabeçalho executivo da página
    if (headerBadge) {
      headerBadge.classList.remove('connected', 'disconnected');
      headerBadge.classList.add('syncing');
      headerBadge.title = `Sincronizando eventos com a agenda de ${savedUser}...`;
    }
    if (badgeTitle) badgeTitle.textContent = 'Sincronizando...';
    if (badgeUserSub) badgeUserSub.textContent = `Atualizando ${savedUser}...`;
  } else {
    // Desconectado
    if (pill) {
      pill.style.background = 'rgba(239,68,68,0.12)';
      pill.style.borderColor = 'rgba(239,68,68,0.35)';
      if (dot) dot.style.background = '#ef4444';
      if (text) text.textContent = 'Desconectado';
    }
    // Cabeçalho executivo da página
    if (headerBadge) {
      headerBadge.classList.remove('connected', 'syncing');
      headerBadge.classList.add('disconnected');
      headerBadge.title = 'Nenhuma agenda conectada. Clique para vincular o Google Agenda.';
    }
    if (badgeTitle) badgeTitle.textContent = 'Desconectado';
    if (badgeUserSub) badgeUserSub.textContent = 'Nenhuma agenda vinculada';
    if (userDesc) {
      userDesc.innerHTML = `<span class="cal-desc-disconnected">Desconectado — Nenhuma agenda integrada</span>`;
    }
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
