(() => {
  const root = document.querySelector('[data-ledger-app]');
  if (!root) return;

  const STORAGE_KEY = 'fedpromptly-local-ledger-v1';
  const METHODS = ['measured', 'reported', 'estimated', 'unavailable'];
  const METHOD_LABELS = {
    measured: 'Measured',
    reported: 'Reported',
    estimated: 'Estimated',
    unavailable: 'Unavailable'
  };
  const statusText = {
    success: 'Success',
    failed: 'Failed',
    partial: 'Partial'
  };
  const form = root.querySelector('[data-ledger-form]');
  const tableBody = root.querySelector('[data-ledger-rows]');
  const empty = root.querySelector('[data-ledger-empty]');
  const count = root.querySelector('[data-ledger-count]');
  const summary = root.querySelector('[data-ledger-summary]');
  const notice = root.querySelector('[data-ledger-notice]');
  const exportCsv = root.querySelector('[data-ledger-export-csv]');
  const exportJson = root.querySelector('[data-ledger-export-json]');
  const clear = root.querySelector('[data-ledger-clear]');
  const cancel = root.querySelector('[data-ledger-cancel]');
  const submit = form?.querySelector('[type="submit"]');
  let entries = readEntries();
  let editingId = null;

  function readEntries() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(stored) ? stored : [];
    } catch (_) { return []; }
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }

  function escape(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  }

  function numberOrNull(value) {
    if (value === '' || value == null) return null;
    const number = Number(value);
    return Number.isFinite(number) && number >= 0 ? number : null;
  }

  function formatBytes(value) {
    if (value == null) return '—';
    if (value < 1024) return `${value} B`;
    const units = ['KB', 'MB', 'GB'];
    let amount = value;
    let unit = -1;
    while (amount >= 1024 && unit < units.length - 1) { amount /= 1024; unit += 1; }
    return `${amount.toFixed(amount >= 10 ? 0 : 1)} ${units[unit]}`;
  }

  function render() {
    tableBody.innerHTML = entries.map(entry => {
      const total = entry.totalBytes == null ? null : entry.totalBytes;
      return `<tr data-entry-id="${escape(entry.id)}"><td><strong>${escape(entry.actionId)}</strong><small>${escape(entry.actionType)}</small></td><td>${escape(entry.target)}</td><td>${formatBytes(entry.sentBytes)}</td><td>${formatBytes(entry.receivedBytes)}</td><td>${formatBytes(total)}</td><td><span class="ledger-method method-${escape(entry.method)}">${METHOD_LABELS[entry.method]}</span><small>${escape(entry.evidence || 'No evidence note')}</small></td><td>${statusText[entry.status] || 'Success'}</td><td><button type="button" class="ledger-icon-button" data-edit="${escape(entry.id)}" aria-label="Edit ${escape(entry.actionId)}">Edit</button><button type="button" class="ledger-icon-button danger" data-delete="${escape(entry.id)}" aria-label="Delete ${escape(entry.actionId)}">Delete</button></td></tr>`;
    }).join('');
    empty.hidden = entries.length > 0;
    count.textContent = `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`;
    const known = entries.filter(e => e.totalBytes != null).reduce((sum, e) => sum + e.totalBytes, 0);
    summary.innerHTML = `<span><b>${entries.length}</b> logged</span><span><b>${formatBytes(known)}</b> known total</span><span><b>${entries.filter(e => e.method === 'unavailable').length}</b> unavailable</span>`;
    tableBody.querySelectorAll('[data-edit]').forEach(button => button.addEventListener('click', () => editEntry(button.dataset.edit)));
    tableBody.querySelectorAll('[data-delete]').forEach(button => button.addEventListener('click', () => deleteEntry(button.dataset.delete)));
  }

  function valuesFromForm() {
    const data = new FormData(form);
    const sentBytes = numberOrNull(data.get('sentBytes'));
    const receivedBytes = numberOrNull(data.get('receivedBytes'));
    const method = METHODS.includes(data.get('method')) ? data.get('method') : 'unavailable';
    return {
      actionId: String(data.get('actionId') || '').trim(),
      actionType: String(data.get('actionType') || 'Other').trim(),
      target: String(data.get('target') || '').trim(),
      sentBytes,
      receivedBytes,
      totalBytes: sentBytes == null || receivedBytes == null ? null : sentBytes + receivedBytes,
      method,
      evidence: String(data.get('evidence') || '').trim(),
      status: String(data.get('status') || 'success'),
      notes: String(data.get('notes') || '').trim()
    };
  }

  function resetForm() {
    form.reset();
    form.elements.actionId.value = `A-${String(entries.length + 1).padStart(3, '0')}`;
    form.elements.method.value = 'measured';
    editingId = null;
    submit.textContent = 'Add to ledger';
    cancel.hidden = true;
  }

  function editEntry(id) {
    const entry = entries.find(item => item.id === id);
    if (!entry) return;
    editingId = id;
    Object.entries(entry).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value ?? ''; });
    submit.textContent = 'Save changes';
    cancel.hidden = false;
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function deleteEntry(id) {
    entries = entries.filter(entry => entry.id !== id);
    persist();
    if (editingId === id) resetForm();
    render();
    announce('Entry removed from this device.');
  }

  function announce(message) {
    notice.textContent = message;
    notice.classList.add('is-visible');
    window.setTimeout(() => notice.classList.remove('is-visible'), 2800);
  }

  function download(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = filename; link.click();
    URL.revokeObjectURL(url);
  }

  function csvValue(value) { return `"${String(value ?? '').replaceAll('"', '""')}"`; }

  form?.addEventListener('submit', event => {
    event.preventDefault();
    const value = valuesFromForm();
    if (!value.actionId || !value.target) { announce('Add an action ID and target before saving.'); return; }
    if (editingId) entries = entries.map(entry => entry.id === editingId ? { ...entry, ...value } : entry);
    else entries.unshift({ id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, createdAt: new Date().toISOString(), ...value });
    persist(); render(); resetForm(); announce('Saved locally on this device.');
  });
  cancel?.addEventListener('click', resetForm);
  clear?.addEventListener('click', () => { if (!entries.length) return; entries = []; persist(); resetForm(); render(); announce('Local ledger cleared.'); });
  exportJson?.addEventListener('click', () => download('fedpromptly-ledger.json', JSON.stringify({ exportedAt: new Date().toISOString(), entries }, null, 2), 'application/json'));
  exportCsv?.addEventListener('click', () => {
    const columns = ['action_id', 'action_type', 'target', 'sent_bytes', 'received_bytes', 'total_bytes', 'method', 'evidence', 'status', 'notes', 'created_at'];
    const rows = entries.map(entry => [entry.actionId, entry.actionType, entry.target, entry.sentBytes, entry.receivedBytes, entry.totalBytes, entry.method, entry.evidence, entry.status, entry.notes, entry.createdAt].map(csvValue).join(','));
    download('fedpromptly-ledger.csv', [columns.join(','), ...rows].join('\n'), 'text/csv');
  });
  resetForm(); render();
})();
