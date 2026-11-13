(function () {
  'use strict';
  var form = document.getElementById('asset-form');
  var locSel = document.getElementById('location');
  var msg = document.getElementById('msg');
  var places = [], assets = [];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function api(method, url, body) {
    var raw = body instanceof Blob;
    var headers = { 'X-PPE-Admin': '1' };
    if (body && !raw) headers['Content-Type'] = 'application/json';
    if (raw) headers['Content-Type'] = 'application/octet-stream';
    return fetch(url, {
      method: method,
      headers: headers,
      body: body ? (raw ? body : JSON.stringify(body)) : undefined,
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (!r.ok) throw new Error(j.error || ('Request failed (' + r.status + ')'));
        return j;
      });
    });
  }
  function say(text, kind) { msg.textContent = text; msg.className = kind || ''; }

  // ------------------------------------------------------------ buildings
  function fillBuildings(filter) {
    var f = (filter || '').toLowerCase();
    var current = locSel.value;
    var groups = {};
    places.forEach(function (p) {
      if (f && p.key.toLowerCase().indexOf(f) < 0 && p.layer.toLowerCase().indexOf(f) < 0) return;
      (groups[p.layer] = groups[p.layer] || []).push(p.key);
    });
    var html = '<option value="">— Select building —</option>';
    Object.keys(groups).sort().forEach(function (g) {
      html += '<optgroup label="' + esc(g) + '">' + groups[g].map(function (k) {
        return '<option' + (k === current ? ' selected' : '') + '>' + esc(k) + '</option>';
      }).join('') + '</optgroup>';
    });
    locSel.innerHTML = html;
    // If the filter leaves exactly one building, pick it.
    if (f && locSel.querySelectorAll('optgroup option').length === 1) locSel.querySelector('optgroup option').selected = true;
  }
  document.getElementById('bfilter').addEventListener('input', function (e) { fillBuildings(e.target.value); });

  // -------------------------------------------------------------- records
  function render() {
    var fb = document.getElementById('f-building').value;
    var q = document.getElementById('f-q').value.trim().toLowerCase();
    var list = assets.filter(function (a) {
      if (fb && a.location !== fb) return false;
      if (!q) return true;
      return [a.code, a.description, a.category, a.location, a.room, a.condition, a.remarks].join(' ').toLowerCase().indexOf(q) >= 0;
    });
    document.getElementById('count').textContent = '(' + list.length + (list.length !== assets.length ? ' of ' + assets.length : '') + ')';
    document.getElementById('rows').innerHTML = list.length ? list.slice().reverse().map(function (a) {
      return '<tr' + (a.building ? '' : ' class="bad" title="Location does not match a building on the map"') + '>' +
        '<td>' + esc(a.sl) + '</td><td>' + esc(a.code) + '</td><td>' + esc(a.description) + '</td><td>' + esc(a.category) + '</td>' +
        '<td>' + (a.building ? '<a href="/?building=' + encodeURIComponent(a.building) + '" target="_blank">' + esc(a.location) + '</a>' : esc(a.location)) + '</td>' +
        '<td>' + esc(a.room) + '</td><td>' + esc(a.date) + '</td>' +
        '<td class="num">' + (a.cost == null ? '' : Number(a.cost).toLocaleString(undefined, { minimumFractionDigits: 2 })) + '</td>' +
        '<td class="num">' + esc(a.qty) + '</td><td>' + esc(a.condition) + '</td>' +
        '<td class="row-actions"><button data-edit="' + a.sl + '">Edit</button><button data-del="' + a.sl + '" class="danger">Delete</button></td></tr>';
    }).join('') : '<tr><td colspan="11" class="empty">No records yet. Add the first one above.</td></tr>';

    var bad = assets.filter(function (a) { return !a.building; });
    var warn = document.getElementById('unmatched');
    warn.hidden = !bad.length;
    if (bad.length) {
      warn.textContent = bad.length + ' row(s) in the Excel sheet have a Location that is not a building on the map, so they are not shown on the map (highlighted in red). Edit them and pick a building.';
    }
  }
  function refreshBuildingFilter() {
    var sel = document.getElementById('f-building');
    var cur = sel.value;
    var used = Array.from(new Set(assets.map(function (a) { return a.location; }))).sort();
    sel.innerHTML = '<option value="">All buildings</option>' + used.map(function (k) {
      return '<option' + (k === cur ? ' selected' : '') + '>' + esc(k) + '</option>';
    }).join('');
  }
  function load() {
    return api('GET', '/api/assets').then(function (j) {
      assets = j.assets; refreshBuildingFilter(); render();
    });
  }
  document.getElementById('f-building').addEventListener('change', render);
  document.getElementById('f-q').addEventListener('input', render);

  // ----------------------------------------------------------------- form
  function resetForm(keep) {
    var loc = locSel.value, room = form.room.value;
    form.reset();
    form.sl.value = '';
    if (keep) { locSel.value = loc; form.room.value = room; }
    document.getElementById('form-title').textContent = 'Add asset';
    document.getElementById('save-btn').textContent = 'Save to Excel';
    document.getElementById('cancel-btn').hidden = true;
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = v; });
    var editing = !!data.sl;
    var btn = document.getElementById('save-btn');
    btn.disabled = true;
    say('Saving…');
    (editing ? api('PUT', '/api/assets/' + data.sl, data) : api('POST', '/api/assets', data))
      .then(function (r) {
        say((editing ? 'Updated' : 'Saved') + ' Sl. No. ' + r.asset.sl + ' in ' + r.asset.location + '.', 'ok');
        resetForm(!editing && document.getElementById('keep').checked);
        form.description.focus();
        return load();
      })
      .catch(function (err) { say(err.message, 'err'); })
      .then(function () { btn.disabled = false; });
  });
  document.getElementById('cancel-btn').addEventListener('click', function () { resetForm(false); say(''); });

  document.getElementById('rows').addEventListener('click', function (e) {
    var ed = e.target.getAttribute('data-edit'), del = e.target.getAttribute('data-del');
    if (ed) {
      var a = assets.find(function (x) { return String(x.sl) === ed; });
      if (!a) return;
      document.getElementById('bfilter').value = '';
      fillBuildings('');
      ['sl', 'code', 'description', 'category', 'room', 'date', 'cost', 'qty', 'condition', 'remarks'].forEach(function (k) {
        if (form[k]) form[k].value = a[k] == null ? '' : a[k];
      });
      locSel.value = a.building || '';
      document.getElementById('form-title').textContent = 'Edit Sl. No. ' + a.sl;
      document.getElementById('save-btn').textContent = 'Update in Excel';
      document.getElementById('cancel-btn').hidden = false;
      say(a.building ? '' : 'This row\'s Location "' + a.location + '" is not on the map. Pick a building.', a.building ? '' : 'err');
      document.getElementById('form-card').scrollIntoView({ behavior: 'smooth' });
    }
    if (del) {
      var b = assets.find(function (x) { return String(x.sl) === del; });
      if (!confirm('Delete Sl. No. ' + del + (b ? ' (' + b.description + ', ' + b.location + ')' : '') + ' from the Excel sheet?')) return;
      api('DELETE', '/api/assets/' + del).then(function () { say('Deleted Sl. No. ' + del + '.', 'ok'); return load(); })
        .catch(function (err) { say(err.message, 'err'); });
    }
  });

  // ---------------------------------------------------------- bulk upload
  var upFile = document.getElementById('up-file');
  var upCheck = document.getElementById('up-check');
  var upGo = document.getElementById('up-go');
  var upOut = document.getElementById('up-result');
  var upMsg = document.getElementById('up-msg');
  var preview = null;
  function upMode() { return document.querySelector('input[name="up-mode"]:checked').value; }
  function upSay(t, k) { upMsg.textContent = t; upMsg.className = k || ''; }
  function resetUpload() { preview = null; upGo.hidden = true; upOut.innerHTML = ''; }
  upFile.addEventListener('change', function () { resetUpload(); upSay(''); upCheck.disabled = !upFile.files.length; });
  Array.prototype.forEach.call(document.querySelectorAll('input[name="up-mode"]'), function (r) {
    r.addEventListener('change', function () { if (preview) showPreview(preview); });
  });

  function showPreview(s) {
    var probs = s.problems.slice(0, 50).map(function (p) {
      return '<tr><td>' + p.excelRow + '</td><td>' + esc(p.location) + '</td><td>' + esc(p.description) + '</td><td>' + esc(p.error) + '</td></tr>';
    }).join('');
    var replace = upMode() === 'replace';
    upOut.innerHTML =
      '<p><b>' + s.valid + '</b> of ' + s.rowsFound + ' rows are ready to import (sheet "' + esc(s.sheet) + '", ' + s.buildings + ' buildings).' +
      (s.problems.length ? ' <b class="bad-txt">' + s.problems.length + ' row(s) have problems and will be skipped:</b>' : '') + '</p>' +
      (probs ? '<div class="table-wrap"><table><thead><tr><th>Excel row</th><th>Location</th><th>Description</th><th>Problem</th></tr></thead><tbody>' +
        probs + '</tbody></table></div>' + (s.problems.length > 50 ? '<p>…and ' + (s.problems.length - 50) + ' more.</p>' : '') : '') +
      (replace && s.valid ? '<p class="warn">Replace mode: all ' + assets.length + ' existing records will be deleted and replaced by these ' + s.valid + ' rows.</p>' : '');
    upGo.hidden = !s.valid;
    upGo.textContent = (replace ? 'Replace register with ' : 'Import ') + s.valid + ' rows';
  }

  upCheck.addEventListener('click', function () {
    if (!upFile.files.length) return;
    upCheck.disabled = true; resetUpload(); upSay('Checking file…');
    api('POST', '/api/import?dryRun=1&mode=' + upMode(), upFile.files[0])
      .then(function (s) { preview = s; upSay(''); showPreview(s); })
      .catch(function (err) { upSay(err.message, 'err'); })
      .then(function () { upCheck.disabled = false; });
  });
  upGo.addEventListener('click', function () {
    var replace = upMode() === 'replace';
    if (replace && !confirm('Delete all ' + assets.length + ' existing records and replace them with this file?')) return;
    upGo.disabled = true; upSay('Importing…');
    api('POST', '/api/import?mode=' + upMode(), upFile.files[0])
      .then(function (s) {
        upSay('Imported ' + s.imported + ' rows into the Excel sheet' + (s.problems.length ? ' (' + s.problems.length + ' skipped)' : '') + '. They are now on the map.', 'ok');
        resetUpload(); upFile.value = ''; upCheck.disabled = true;
        return load();
      })
      .catch(function (err) { upSay(err.message, 'err'); })
      .then(function () { upGo.disabled = false; });
  });

  // ------------------------------------------------------------------ init
  api('GET', '/api/meta').then(function (m) {
    places = m.places;
    document.getElementById('excel-name').textContent = m.excelFile;
    document.getElementById('cats').innerHTML = m.categories.map(function (c) { return '<option value="' + esc(c) + '">'; }).join('');
    document.getElementById('condition').innerHTML = m.conditions.map(function (c) { return '<option>' + esc(c) + '</option>'; }).join('');
    fillBuildings('');
    var pre = new URLSearchParams(location.search).get('building');
    if (pre) locSel.value = pre;
    return load();
  }).catch(function (err) { say('Could not reach the server: ' + err.message, 'err'); });
})();
