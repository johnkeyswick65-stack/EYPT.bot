const $ = id => document.getElementById(id)

const POLL_INTERVAL = 2000
let pollTimer = null
let busy = false
let lastLogsSignature = ''

const STATUS_META = {
  idle: { label: 'Sem ligação', hint: 'Liga o WhatsApp para começar.' },
  connecting: { label: 'A ligar…', hint: 'A preparar a ligação ao WhatsApp.' },
  reconnecting: { label: 'A reconectar…', hint: 'Conexão perdida. A tentar de novo.' },
  connected: { label: 'Conectado', hint: 'O bot está ligado e a receber mensagens.' },
  disconnected: { label: 'Desligado', hint: 'Sessão terminada. Liga novamente.' }
}

function toast(message, tone = 'info') {
  const el = $('toast')
  el.textContent = message
  el.dataset.tone = tone
  el.hidden = false

  clearTimeout(el._timer)
  el._timer = setTimeout(() => {
    el.hidden = true
  }, 3600)
}

function formatUptime(seconds) {
  if (!seconds || seconds < 1) return '—'

  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`
  if (m > 0) return `${m}m ${String(s).padStart(2, '0')}s`

  return `${s}s`
}

function formatPhone(phone) {
  if (!phone) return '—'

  return String(phone)
    .split('@')[0]
    .split(':')[0]
}

function renderLogs(logs) {
  const signature = JSON.stringify(logs)

  if (signature === lastLogsSignature) return
  lastLogsSignature = signature

  const container = $('logs')
  $('log-count').textContent = String(logs.length)

  if (!logs.length) {
    container.innerHTML = '<p class="log-empty">Sem atividade registada.</p>'
    return
  }

  container.innerHTML = logs
    .map(entry => {
      const time = new Date(entry.at).toLocaleTimeString('pt-PT', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })

      const text = entry.message
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')

      return `<div class="log-item" data-level="${entry.level}">
        <time>${time}</time><span>${text}</span>
      </div>`
    })
    .join('')

  container.scrollTop = container.scrollHeight
}

function render(state) {
  const meta = STATUS_META[state.status] || STATUS_META.idle

  $('status-pill').dataset.status = state.status
  $('status-label').textContent = meta.label
  $('connect-hint').textContent = meta.hint
  $('stat-state').textContent = meta.label

  $('stat-uptime').textContent = formatUptime(state.uptimeSeconds)
  $('stat-messages').textContent = String(state.stats.messagesReceived)
  $('stat-commands').textContent = String(state.stats.commandsExecuted)

  $('row-session').textContent = state.session.exists
    ? `Guardada (${state.session.files} ficheiros)`
    : 'Nenhuma'
  $('row-session').className =
    'row-value ' + (state.session.exists ? 'on' : 'off')

  $('row-commands').textContent = String(state.commandsLoaded)

  $('row-ai').textContent = state.aiEnabled ? 'Ativa' : 'Sem chave'
  $('row-ai').className = 'row-value ' + (state.aiEnabled ? 'on' : 'off')

  $('row-phone').textContent = formatPhone(state.phoneNumber)

  const qrImage = $('qr-image')
  const placeholder = $('qr-placeholder')

  if (state.qr) {
    qrImage.src = state.qr
    qrImage.hidden = false
    placeholder.hidden = true
  } else {
    qrImage.hidden = true
    qrImage.removeAttribute('src')
    placeholder.hidden = false
  }

  const pairingBox = $('pairing-code')

  if (state.pairingCode) {
    $('code-value').textContent = state.pairingCode
    pairingBox.hidden = false
  } else {
    pairingBox.hidden = true
  }

  const errorLine = $('error-line')

  if (state.lastError) {
    errorLine.innerHTML =
      '<span class="material-symbols-rounded">error</span>' +
      state.lastError
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
    errorLine.hidden = false
  } else {
    errorLine.hidden = true
  }

  renderLogs(state.logs)
}

async function fetchStatus() {
  try {
    const response = await fetch('/api/status', { cache: 'no-store' })

    if (!response.ok) throw new Error('Estado indisponível.')

    render(await response.json())
  } catch {
    $('status-pill').dataset.status = 'disconnected'
    $('status-label').textContent = 'Servidor offline'
    $('connect-hint').textContent = 'O processo do bot não está a responder.'
  }
}

async function action(path, body) {
  if (busy) return

  busy = true
  document.body.classList.add('is-busy')

  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-panel-action': '1'
      },
      body: body ? JSON.stringify(body) : '{}'
    })

    const data = await response.json()

    if (!response.ok || data.ok === false) {
      throw new Error(data.error || 'A ação falhou.')
    }

    if (data.message) toast(data.message)

    await fetchStatus()
  } catch (error) {
    toast(error.message, 'error')
  } finally {
    busy = false
    document.body.classList.remove('is-busy')
  }
}

$('btn-pair').addEventListener('click', () => {
  const phone = $('phone').value.replace(/\D/g, '')

  if (phone.length < 8) {
    return toast('Indica o número com o código do país.', 'error')
  }

  action('/api/pair', { phone })
})

$('phone').addEventListener('keydown', event => {
  if (event.key === 'Enter') $('btn-pair').click()
})

$('btn-reconnect').addEventListener('click', () => action('/api/reconnect'))

$('btn-copy').addEventListener('click', async () => {
  const code = $('code-value').textContent

  try {
    await navigator.clipboard.writeText(code)
    toast('Código copiado.')
  } catch {
    toast('Não foi possível copiar.', 'error')
  }
})

$('btn-logout').addEventListener('click', () => {
  const confirmed = window.confirm(
    'Terminar a sessão? Vais precisar de ligar o WhatsApp outra vez com um novo código.'
  )

  if (confirmed) action('/api/logout')
})

function startPolling() {
  clearInterval(pollTimer)
  pollTimer = setInterval(fetchStatus, POLL_INTERVAL)
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearInterval(pollTimer)
  } else {
    fetchStatus()
    startPolling()
  }
})

fetchStatus()
startPolling()
