// Didactic simulator of the QInsights web interface (labels follow the official manual)
(function () {
  const D = () => window.QDATA;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Clickable element helpers; data-sid marks anything the engine can check
  const btn = (sid, label, cls = "qi-btn") => `<button type="button" class="${cls}" data-sid="${sid}">${label}</button>`;
  const primary = (sid, label) => btn(sid, label, "qi-btn qi-primary");
  const ghost = (sid, label) => btn(sid, label, "qi-btn qi-ghost");
  const dots = (sid) => `<button type="button" class="qi-dots" data-sid="${sid}" aria-label="More options">⋯</button>`;
  const input = (sid, ph, val = "") => `<input class="qi-input" data-sid="${sid}" placeholder="${esc(ph)}" value="${esc(val)}" aria-label="${esc(ph)}">`;
  const select = (sid, opts, val) => `<select class="qi-select" data-sid="${sid}" aria-label="${sid}">${opts.map((o) => `<option${o === val ? " selected" : ""}>${esc(o)}</option>`).join("")}</select>`;
  const qBtn = (pos = "left") => `<button type="button" class="qi-qfab qi-qfab-${pos}" data-sid="q-btn" aria-label="Ask Q">Q</button>`;
  const icon = (kind) => ({ docx: "W", pdf: "PDF", xlsx: "XLS", mp3: "♪", mp4: "▶" }[kind] || "▢");

  function shell(main, opts = {}) {
    const crumb = opts.crumb ? `<div class="qi-crumb"><span data-sid="crumb-dashboard" class="qi-link">Dashboard</span> / ${esc(opts.crumb)}</div>` : "";
    const nav = opts.inProject
      ? `<div class="qi-nav-group"><div class="qi-nav-title">Current project</div>
          <div class="qi-nav-item qi-active">${esc(opts.crumb || "")}</div>
          <div class="qi-nav-item" data-sid="nav-analysis">Analysis</div>
          <div class="qi-nav-item qi-nav-sub" data-sid="archive">Archive</div></div>`
      : "";
    return `<div class="qi-browser"><div class="qi-urlbar"><span></span><span></span><span></span><div>app.qinsights.ai</div></div>
      <div class="qi-app">
        <aside class="qi-side">
          <div class="qi-logo">QInsights</div>
          <div class="qi-nav-item${opts.inProject ? "" : " qi-active"}" data-sid="nav-dashboard">Dashboard</div>
          ${nav}
          <div class="qi-nav-spacer"></div>
          <div class="qi-nav-item" data-sid="nav-anonymizer">QInsights Anonymizer</div>
          <div class="qi-nav-item" data-sid="nav-settings">Settings</div>
        </aside>
        <main class="qi-main">${crumb}${main}</main>
        ${opts.modal ? `<div class="qi-overlay"><div class="qi-modal">${opts.modal}</div></div>` : ""}
      </div></div>`;
  }

  function docCards(list, p) {
    const sel = p.selected || [];
    return `<div class="qi-cards">${list.map((d, i) => `
      <div class="qi-doccard${sel.includes(i) ? " qi-selected" : ""}">
        <label class="qi-check"><input type="checkbox" data-sid="doc-check-${i}"${sel.includes(i) ? " checked" : ""} aria-label="Select ${esc(d.name)}"></label>
        ${dots("doc-menu-" + i)}
        <div class="qi-fileicon qi-k-${d.kind}">${icon(d.kind)}</div>
        <div class="qi-docname">${esc(d.name)}</div>
        <div class="qi-doclabel">${esc(d.label)}</div>
        <div class="qi-docfoot">${btn("doc-summary-" + i, "Summary", "qi-btn qi-small")}<button type="button" class="qi-bin" data-sid="doc-del-${i}" aria-label="Delete">🗑</button></div>
        ${p.menuOpen === i ? `<div class="qi-pop">${btn("doc-preview", "Preview", "qi-menuitem")}${btn("doc-rename", "Rename", "qi-menuitem")}${btn("doc-speakers", "See Speakers", "qi-menuitem")}${d.kind === "mp3" || p.editable ? btn("doc-edit", "Edit", "qi-menuitem") : ""}</div>` : ""}
      </div>`).join("")}</div>`;
  }

  function filterBanner(p) {
    return p.filter ? `<div class="qi-filterbar">Respondent filter active: ${esc(p.filter)} <span class="qi-chip">Active Filters 1</span></div>` : "";
  }

  const screens = {
    dashboard(p) {
      const projects = (p.projects || [D().projectA.name, D().projectB.name]).map((n, i) => `
        <div class="qi-projcard">${dots("proj-menu-" + i)}<div class="qi-projname" data-sid="proj-open-${i}">${esc(n)}</div><div class="qi-muted">Last modified today</div>
        ${p.menuOpen === i ? `<div class="qi-pop">${btn("proj-open", "Open Project", "qi-menuitem")}${btn("proj-rename", "Rename", "qi-menuitem")}${btn("proj-share", "Share", "qi-menuitem")}${btn("proj-delete", "Delete", "qi-menuitem")}</div>` : ""}</div>`).join("");
      return shell(`
        <div class="qi-row qi-between"><h2 class="qi-h">Dashboard</h2>${primary("add-project", "+ Add New Project")}</div>
        <div class="qi-row">${input("search-projects", "Search projects")}${btn("sort-projects", "Sort: Last modified")}</div>
        <div class="qi-stats"><div><b>${p.projects ? p.projects.length : 2}</b> Projects</div><div><b>6</b> Documents</div><div><b>4</b> Analyses</div></div>
        <div class="qi-projgrid">${projects || `<div class="qi-empty">No projects yet. Create your first project.</div>`}</div>`);
    },

    newProject(p) {
      return shell("", { modal: `<h3>Create New Project</h3><p class="qi-muted">Step 1 of 2</p>
        <label class="qi-label">Project name</label>${input("proj-name", "Enter a project name", p.value || "")}
        <div class="qi-row qi-end">${ghost("cancel", "Cancel")}${primary("continue", "Continue")}</div>` });
    },

    projectContext(p) {
      return shell("", { modal: `<h3>Project Context</h3><p class="qi-muted">Step 2 of 2. Describe the project for Q, or upload a document.</p>
        <div class="qi-tabs">${btn("ctx-tab-editor", "Write description", "qi-tab" + (p.upload ? "" : " qi-tab-on"))}${btn("ctx-tab-upload", "Upload document", "qi-tab" + (p.upload ? " qi-tab-on" : ""))}</div>
        ${p.upload
          ? `<div class="qi-drop">${btn("ctx-choose", "Choose file")}<div class="qi-muted">${p.file ? esc(p.file) : "Proposal, brief or protocol (Docx, PDF)"}</div></div>
             <div class="qi-row qi-end">${ghost("back", "Back")}${primary("extract", "Extract Context")}</div>`
          : `<textarea class="qi-textarea" data-sid="proj-desc" placeholder="What is the project about? Research questions, participants, setting..." aria-label="Project description">${esc(p.value || "")}</textarea>
             <div class="qi-row qi-end">${ghost("back", "Back")}${primary("create", "Create Project")}</div>`}` });
    },

    workspace(p) {
      const proj = p.project === "B" ? D().projectB : D().projectA;
      let list = proj.docs.slice(0, p.ndocs || proj.docs.length);
      const sel = p.selected || [];
      const ctx = p.noContext ? "" : `<div class="qi-ctxcard"><div class="qi-row qi-between"><b>Project Context</b><div>${btn("ctx-more", "Show more", "qi-btn qi-small")}${btn("ctx-edit", "Edit", "qi-btn qi-small")}</div></div><p class="qi-clamp">${esc(proj.description)}</p></div>`;
      return shell(`
        ${ctx}
        <div class="qi-row qi-between qi-toolbar">
          <div class="qi-row">${primary("add-files", "+ Add Files")}${btn("vocab", "Project Vocabulary")}${btn("data-context", "Data Context")}${btn("share", "Share Project")}</div>
          <div class="qi-row">${btn("sort", "Sort")}${btn("type", "Type")}${btn("filter", "Filters")}${btn("select-all", "Select All")}${btn("analyse", "Analyse", "qi-btn qi-primary" + (sel.length ? "" : " qi-disabled"))}</div>
        </div>
        ${p.filterMenu ? `<div class="qi-pop qi-pop-right">${btn("doc-filter", "Document Filters", "qi-menuitem")}${btn("resp-filter", "Respondent Filters", "qi-menuitem")}${p.filter ? btn("remove-doc-filter", "Remove document filter", "qi-menuitem qi-dim") + btn("remove-resp-filter", "Remove respondent filter", "qi-menuitem") : ""}</div>` : ""}
        ${p.sortMenu ? `<div class="qi-pop qi-pop-right">${btn("sort-name", "Name (A-Z)", "qi-menuitem")}${btn("sort-date", "Date (Newest / Oldest)", "qi-menuitem")}</div>` : ""}
        ${filterBanner(p)}
        ${docCards(list, p)}`, { inProject: true, crumb: proj.name });
    },

    shareDialog(p) {
      return shell("", { modal: `<h3>Share Project</h3><p class="qi-muted">Enter the email your colleague uses for their QInsights account.</p>
        ${input("share-email", "colleague@university.edu", p.value || "")}
        <div class="qi-row qi-end">${ghost("cancel", "Cancel")}${primary("share-confirm", "Share Project")}</div>` });
    },

    addFilesType() {
      const opt = (sid, t, d) => `<button type="button" class="qi-option" data-sid="${sid}"><b>${t}</b><span>${d}</span></button>`;
      return shell("", { modal: `<h3>Add Files</h3><p class="qi-muted">What kind of material do you want to add?</p>
        ${opt("opt-av", "Audio or video for transcription", "Upload a recording. QInsights creates the transcript.")}
        ${opt("opt-transcript", "Existing transcript", "A transcript created elsewhere (Docx, TXT, PDF).")}
        ${opt("opt-docs", "Documents or other files", "Reports, PDFs, spreadsheets or text documents.")}
        <div class="qi-row qi-end">${ghost("cancel", "Cancel")}${primary("continue", "Continue")}</div>` });
    },

    avUpload(p) {
      return shell("", { modal: `<h3>Audio or video for transcription</h3><p class="qi-muted">One file at a time. Supported: .mp3, .m4a, .mp4 (up to 1 GB).</p>
        <label class="qi-label">Spoken language</label>${select("lang", ["Auto-detect", "Spanish", "English", "German", "Portuguese"], p.lang || "Auto-detect")}
        <div class="qi-drop">${btn("choose-file", "Choose file")}<div class="qi-muted">${p.file ? esc(p.file) : "No file selected"}</div></div>
        <div class="qi-row qi-end">${ghost("cancel", "Cancel")}${primary("continue", "Continue")}</div>` });
    },

    customDictionary(p) {
      return shell("", { modal: `<h3>Custom Dictionary</h3><p class="qi-muted">Add names, acronyms or domain terms so they are spelled correctly.</p>
        <div class="qi-row">${input("term", "Enter a term", p.value || "")}${btn("add-terms", "Add terms")}</div>
        ${(p.terms || []).length ? `<div class="qi-chips">${p.terms.map((t) => `<span class="qi-chip">${esc(t)}</span>`).join("")}</div>` : ""}
        <div class="qi-row">${btn("dict-file", "Choose File")}<span class="qi-muted">Text or Excel, one term per line</span></div>
        <div class="qi-row qi-end">${ghost("skip-dict", "Skip dictionary")}${primary("continue", "Continue")}</div>` });
    },

    transcribeSummary(p) {
      return shell("", { modal: `<h3>Ready to transcribe</h3>
        <table class="qi-table"><tr><td>File</td><td>E04_Wilmer.mp3</td></tr><tr><td>Language</td><td>${esc(p.lang || "Auto-detect")}</td></tr><tr><td>Dictionary terms</td><td>${esc((p.terms || []).join(", ") || "None")}</td></tr></table>
        <div class="qi-row qi-end">${ghost("back", "Back")}${primary("start-trans", "Start transcription")}</div>` });
    },

    transcriptEditor(p) {
      const names = p.names || {};
      const lines = D().transcript.map((l, i) => `<div class="qi-utt"><button type="button" class="qi-time" data-sid="time-${i}">${l.t}</button>
        <button type="button" class="qi-spk" data-sid="spk-${l.spk.slice(-1)}">${esc(names[l.spk] || l.spk)}</button><p>${esc(l.text)}</p></div>`).join("");
      return shell(`<div class="qi-row qi-between"><h2 class="qi-h">E04_Wilmer.mp3 <span class="qi-chip">Edit mode</span></h2>
          <div class="qi-tabs">${btn("tab-transcript", "Transcript", "qi-tab qi-tab-on")}${btn("speakers-tab", "Speakers", "qi-tab")}</div></div>
        <div class="qi-player">${btn("back10", "↶ 10")}<div class="qi-wave">${Array.from({ length: 48 }, (_, i) => `<i style="height:${18 + ((i * 37) % 30)}px"></i>`).join("")}</div>${btn("fwd10", "↷ 10")}${select("speed", ["0.75×", "1×", "1.25×", "1.5×", "2×"], p.speed || "1×")}</div>
        ${p.rename ? `<div class="qi-inline-edit">Rename <b>${esc(p.rename)}</b> ${input("spk-name", "New speaker name", p.value || "")}${primary("spk-save", "Save")}</div>` : ""}
        <div class="qi-transcript">${lines}</div>`, { inProject: true, crumb: D().projectA.name });
    },

    dataContext(p) {
      const tab = p.tab || "roles";
      const tabs = `<div class="qi-tabs">${btn("tab-roles", "Roles", "qi-tab" + (tab === "roles" ? " qi-tab-on" : ""))}${btn("tab-profiles", "Profiles", "qi-tab" + (tab === "profiles" ? " qi-tab-on" : ""))}${btn("tab-values", "Values", "qi-tab" + (tab === "values" ? " qi-tab-on" : ""))}</div>`;
      let body = "";
      if (tab === "roles") {
        const roles = p.roles || {};
        body = `<table class="qi-table"><tr><th>Document</th><th>Speaker</th><th>First lines</th><th>Role</th></tr>
          ${D().speakers.map((s, i) => `<tr><td>${esc(s.doc)}</td><td>${esc(s.id)}</td><td class="qi-muted">${esc(s.first)}</td><td>${select("role-" + i, ["Select role", "Respondent", "Interviewer / Moderator", "Exclude"], roles[i] || "Select role")}</td></tr>`).join("")}</table>
          <div class="qi-row qi-end">${btn("redetect", "Re-detect respondents")}${primary("save-roles", "Save roles")}</div>`;
      } else if (tab === "profiles") {
        const chars = p.chars || [{ n: "Pais_origen", t: "Text", a: "Speaker" }];
        body = `<div class="qi-row qi-end">${btn("import-excel", "Import from Excel")}${primary("add-char", "+ Add Characteristic")}</div>
          <table class="qi-table"><tr><th>Characteristic</th><th>Type</th><th>Applies to</th></tr>
          ${chars.map((c) => `<tr><td>${esc(c.n)}</td><td>${c.t}</td><td>${c.a}</td></tr>`).join("")}
          ${p.adding ? `<tr class="qi-newrow"><td>${input("char-name", "Name", p.value || "")}</td><td>${select("char-type", ["Text", "Number", "Boolean"], p.ctype || "Text")}</td><td>${select("char-applies", ["Speaker", "Document"], p.capplies || "Speaker")}</td></tr>` : ""}</table>
          ${p.adding ? `<div class="qi-row qi-end">${primary("char-save", "Save")}</div>` : ""}`;
      } else {
        const vals = p.vals || {};
        body = `<div class="qi-tabs">${btn("vals-docs", "Documents", "qi-tab" + (p.view === "docs" ? " qi-tab-on" : ""))}${btn("vals-resp", "Respondents", "qi-tab" + (p.view === "docs" ? "" : " qi-tab-on"))}</div>
          <table class="qi-table"><tr><th>Respondent</th><th>Pais_origen</th><th>Edad</th></tr>
          ${["Marisol (E01)", "Jorge (E02)", "Yesenia (E03)"].map((r, i) => `<tr><td>${r}</td><td>${input("val-" + i + "-pais", "", vals[i + "p"] || ["Honduras", "Guatemala", "El Salvador"][i])}</td><td>${input("val-" + i + "-edad", "", vals[i + "e"] !== undefined ? vals[i + "e"] : (i === 1 ? "" : ["34", "", "41"][i]))}</td></tr>`).join("")}</table>
          <p class="qi-muted">Changes are saved automatically.</p>`;
      }
      return shell("", { modal: `<div class="qi-row qi-between"><h3>Data Context</h3>${btn("close", "Close", "qi-btn qi-small")}</div>${tabs}${body}`, inProject: true });
    },

    excelColumns(p) {
      const st = p.cols || {};
      return shell("", { modal: `<h3>Select Excel columns</h3><p class="qi-muted">Mark the columns that are variables. Leave the text you want to analyse unmarked.</p>
        <table class="qi-table"><tr><th>Column</th><th>Example</th><th>is a variable</th><th>Data type</th></tr>
        ${D().projectB.columns.map((c, i) => `<tr><td><b>${esc(c.name)}</b></td><td class="qi-muted">${esc(c.sample)}</td>
          <td><input type="checkbox" data-sid="var-${i}"${st["v" + i] ? " checked" : ""} aria-label="${c.name} is a variable"></td>
          <td>${select("type-" + i, ["Text", "Number", "Boolean"], st["t" + i] || "Text")}</td></tr>`).join("")}</table>
        <div class="qi-row qi-end">${primary("continue-proc", "Continue Processing")}</div>` });
    },

    filterDialog(p) {
      const chosen = p.chosen || [];
      const chip = (sid, v) => `<button type="button" class="qi-chipbtn${chosen.includes(sid) ? " qi-chip-on" : ""}" data-sid="${sid}">${v}</button>`;
      return shell("", { modal: `<h3>Respondent Filters</h3>
        <div class="qi-filterrow"><b>Genero</b> <span class="qi-muted">Text</span><div>${chip("fv-gen-mujer", "Mujer")}${chip("fv-gen-hombre", "Hombre")}</div></div>
        <div class="qi-filterrow"><b>Pais_origen</b> <span class="qi-muted">Text</span><div>${chip("fv-pais-hn", "Honduras")}${chip("fv-pais-gt", "Guatemala")}${chip("fv-pais-sv", "El Salvador")}${chip("fv-pais-ve", "Venezuela")}</div></div>
        <div class="qi-filterrow"><b>Edad</b> <span class="qi-muted">Number</span><div>${select("fv-edad-op", ["is", "different", "less than", "greater than", "From_To"], p.op || "is")} ${input("fv-edad-val", "Value", p.value || "")}</div></div>
        <div class="qi-filterrow"><b>Tiene_hijos</b> <span class="qi-muted">Boolean</span><div>${chip("fv-hijos-true", "True")}${chip("fv-hijos-false", "False")}</div></div>
        <div class="qi-row qi-end">${ghost("cancel", "Cancel")}${primary("apply", "Apply")}</div>` });
    },

    analyseMenu(p) {
      const types = p.excel
        ? [["an-topic", "Topic Analysis", "Docx, PDF, Excel"], ["an-conv", "Conversational Analysis", "Docx, PDF, Excel"], ["an-guided", "Guided Conversational Analysis", "Docx, PDF, Excel"], ["an-sent", "Sentiment Analysis", "Excel"]]
        : [["an-topic", "Topic Analysis", "Docx, PDF, Excel"], ["an-grid", "Grid Analysis", "Docx, PDF"], ["an-conv", "Conversational Analysis", "Docx, PDF, Excel"], ["an-guided", "Guided Conversational Analysis", "Docx, PDF, Excel"]];
      return shell("", { modal: `<h3>Choose an analysis</h3><p class="qi-muted">${p.n || 3} documents selected${p.filter ? ". Filter: " + esc(p.filter) : ""}</p>
        ${types.map(([sid, t, f]) => `<button type="button" class="qi-option" data-sid="${sid}"><b>${t}</b><span>${f}</span></button>`).join("")}
        <div class="qi-row qi-end">${ghost("cancel", "Cancel")}</div>` });
    },

    columnSelect(p) {
      const cols = ["ID_caso", "P1_Motivo_salida", "P2_Dificultades_trayecto", "P3_Apoyos_recibidos"];
      const on = p.on || [];
      return shell("", { modal: `<h3>Select columns</h3><p class="qi-muted">Which columns contain the text you want to analyse?</p>
        ${cols.map((c, i) => `<label class="qi-checkrow"><input type="checkbox" data-sid="col-${i}"${on.includes(i) ? " checked" : ""}> ${c}</label>`).join("")}
        <div class="qi-row qi-end">${btn("col-all", "Select All")}${primary("col-select", "Select")}</div>` });
    },

    topicResult(p) {
      const T = D().topics;
      const cards = T.map((t, i) => `<div class="qi-topic${p.open === i ? " qi-topic-open" : ""}">
        <div class="qi-row qi-between"><b>${esc(t.title)}</b><span class="qi-chip">${t.prev} quotes</span></div>
        <p>${esc(t.desc)}</p>
        ${p.open === i
          ? `<div class="qi-topicdet"><div class="qi-row"><span>Prevalence <b>${t.prev}</b></span><span>File coverage <b>${t.files}</b></span></div>
              ${t.refs.map((r, j) => `<blockquote>“${esc(r.quote)}”<br><button type="button" class="qi-reflink" data-sid="ref-${i}-${j}">${esc(r.doc)}</button></blockquote>`).join("")}</div>`
          : btn("details-" + i, "Show more Details", "qi-btn qi-small")}
      </div>`).join("");
      return shell(`<div class="qi-row qi-between"><h2 class="qi-h">Topic Analysis <span class="qi-muted">Topic_1</span></h2>
          <div class="qi-row">${btn("export", "Download")}</div></div>
        ${p.exportMenu ? `<div class="qi-pop qi-pop-right">${btn("export-word", "Word", "qi-menuitem")}${btn("export-pdf", "PDF", "qi-menuitem")}</div>` : ""}
        <div class="qi-topics">${cards}</div>${qBtn("left")}`, { inProject: true, crumb: D().projectA.name });
    },

    docPreview(p) {
      const text = [
        ["Entrevistadora", "¿Cómo fue el camino hasta aquí?"],
        ["Jorge", "Difícil. Salí con poco dinero y en Chiapas ya no traía nada."],
        ["Jorge", "[[Mi primo me mandó dinero cuando me quedé sin nada. Sin él no llego.]]"],
        ["Entrevistadora", "¿Y aquí quién lo ha apoyado?"],
        ["Jorge", "El mismo primo me metió a la obra. [[Aquí en la obra pagan por semana, sin contrato, pero pagan.]]"]
      ];
      const hl = (s) => esc(s).replace(/\[\[(.+?)\]\]/g, '<mark class="qi-hl">$1</mark>');
      return shell(`<div class="qi-preview"><div class="qi-row qi-between"><b>E02_Jorge.docx</b>
          <div class="qi-row">${input("search-doc", "Search document")}${btn("hl-up", "Up")}${btn("hl-down", "Down")}${btn("close-preview", "Close", "qi-btn qi-small")}</div></div>
        <div class="qi-previewtext">${text.map(([w, t]) => `<p><b>${w}:</b> ${hl(t)}</p>`).join("")}</div></div>`, { inProject: true, crumb: D().projectA.name });
    },

    chat(p) {
      const msgs = (p.msgs || []).map((m) => m.q
        ? `<div class="qi-msg qi-me">${esc(m.q)}</div>`
        : `<div class="qi-msg qi-q"><span class="qi-qav">Q</span><div>${m.a}${m.refs ? `<div class="qi-refs">${m.refs.map((r, i) => `<button type="button" class="qi-reflink" data-sid="cref-${i}">${esc(r)}</button>`).join("")}</div>` : ""}</div></div>`).join("");
      return shell(`<div class="qi-actionbar">${btn("active-filters", "Active Filters" + (p.filter ? " 1" : ""))}${btn("chat-select-all", "Select All")}${btn("chat-download", "Download")}${btn("clear", "Clear chat")}${btn("save", "Save")}${btn("support", "Support")}${btn("close-chat", "Close")}</div>
        ${p.saveMenu ? `<div class="qi-pop qi-pop-right">${btn("save-as", "Save as", "qi-menuitem")}</div>` : ""}
        ${p.saveName !== undefined ? `<div class="qi-inline-edit">Save as ${input("save-name", "Analysis name", p.saveName)}${primary("save-ok", "Save")}</div>` : ""}
        <div class="qi-chat">${msgs || `<div class="qi-empty">Conversational Analysis. ${p.n || 3} documents selected. Ask your first question.</div>`}</div>
        <div class="qi-composer">${input("chat-input", "Ask a question about your data", p.value || "")}<button type="button" class="qi-mic" data-sid="mic" aria-label="Voice input">🎤</button>${primary("run", "Run")}</div>`, { inProject: true, crumb: D().projectA.name });
    },

    guided(p) {
      const qs = p.questions || [];
      return shell(`<div class="qi-chat">
          <div class="qi-msg qi-q"><span class="qi-qav">Q</span><div>Hello. Which topic would you like to explore in depth? Please state it as specifically as you can.</div></div>
          ${p.topic ? `<div class="qi-msg qi-me">${esc(p.topic)}</div>` : ""}
          ${qs.length ? `<div class="qi-msg qi-q"><span class="qi-qav">Q</span><div>Here are four analytic questions to start with:
            <div class="qi-suggest">${qs.map((q, i) => `<button type="button" class="qi-sugg" data-sid="gq-${i}">${esc(q)}</button>`).join("")}</div></div></div>` : ""}
          ${p.answer ? `<div class="qi-msg qi-q"><span class="qi-qav">Q</span><div>${p.answer}
            <div class="qi-suggest">${["Case-based summaries", "Synthesis of key insights", "Similarities and differences", "Create an overview table"].map((s, i) => `<button type="button" class="qi-sugg qi-syn" data-sid="syn-${i}">${s}</button>`).join("")}${btn("wrap", "Wrap Up", "qi-btn qi-primary qi-small")}</div></div></div>` : ""}
          ${p.wrapped ? `<div class="qi-msg qi-q"><span class="qi-qav">Q</span><div>Suggested chat name: <b>Guided_Espera e incertidumbre</b>. Remember to save the analysis to the Archive.</div></div>` : ""}
        </div>
        <div class="qi-composer">${input("guided-input", qs.length ? "Click a question or type your own" : "Your topic", p.value || "")}${primary("run", "Run")}</div>`, { inProject: true, crumb: D().projectA.name });
    },

    gridStart(p) {
      return shell("", { modal: `<h3>Grid Analysis</h3><p class="qi-muted">Select an existing grid or create a new one.</p>
        ${select("grid-existing", ["Create new grid"], "Create new grid")}
        <label class="qi-label">Grid name</label>${input("grid-name", "e.g. Apoyos recibidos", p.value || "")}
        <div class="qi-row qi-end">${ghost("cancel", "Cancel")}${primary("continue", "Continue")}</div>` });
    },

    grid(p) {
      const rows = p.answered ? D().grid.map((r, i) => `<tr><td><b>${r.who}</b></td><td>${esc(r.ans)}</td><td>${btn("grid-ref-" + i, "References", "qi-btn qi-small")}</td></tr>`).join("") : "";
      const tabs = (p.tabs || ["Apoyos recibidos"]).map((t, i) => `<span class="qi-tab${i === (p.tabs || [1]).length - 1 ? " qi-tab-on" : ""}">${esc(t)}</span>`).join("");
      return shell(`<div class="qi-row qi-between"><div class="qi-tabs">${tabs}<button type="button" class="qi-tab" data-sid="grid-plus" aria-label="New tab">+</button></div>${btn("grid-dl", "Download")}</div>
        <div class="qi-composer">${input("grid-q", "Ask a question (keywords optional)", p.value || "")}${primary("ask", "Ask Question")}</div>
        ${p.answered ? `<div class="qi-ctxcard"><div class="qi-row qi-between"><b>Overview</b>${btn("customize", "Customize", "qi-btn qi-small")}</div><p>Los apoyos provienen de tres fuentes distintas: un albergue, la familia y un grupo religioso. Solo una persona usó servicios institucionales.</p></div>
          <table class="qi-table">${rows}</table>` : `<div class="qi-empty">Ask your first question. Results appear case by case.</div>`}
        ${p.dl ? `<div class="qi-overlay"><div class="qi-modal"><h3>Download Analysis</h3>${btn("dl-docx", "Word Document (.docx)", "qi-option")}${btn("dl-xlsx", "Excel Spreadsheet (.xlsx)", "qi-option")}
          ${p.dl === "xlsx" ? `<div class="qi-row">${btn("dl-tab", "Current Tab Only")}${primary("dl-full", "Full Session")}</div>` : ""}</div></div>` : ""}
        ${qBtn("right")}`, { inProject: true, crumb: D().projectA.name });
    },

    sentiment(p) {
      const pie = `<svg viewBox="0 0 42 42" class="qi-pie" role="img" aria-label="Pie chart"><circle r="15.9" cx="21" cy="21" fill="none" stroke="#3b82f6" stroke-width="8" stroke-dasharray="42 58" stroke-dashoffset="25"/><circle r="15.9" cx="21" cy="21" fill="none" stroke="#f59e0b" stroke-width="8" stroke-dasharray="35 65" stroke-dashoffset="83"/><circle r="15.9" cx="21" cy="21" fill="none" stroke="#94a3b8" stroke-width="8" stroke-dasharray="23 77" stroke-dashoffset="48"/></svg>`;
      const rows = D().projectB.rows.map((r) => { const c = /confí|confianza/.test(r.p3) ? "Confianza" : /no espero|nadie|nomás/.test(r.p3) ? "Desconfianza" : "Indiferencia"; return `<tr><td>${r.id}</td><td>${esc(r.p3)}</td><td>${c}</td></tr>`; }).join("");
      return shell(p.result
        ? `<div class="qi-row qi-between"><h2 class="qi-h">Sentiment Analysis <span class="qi-muted">P3_Apoyos_recibidos</span></h2>${btn("sent-export", "Export table")}</div>
           <div class="qi-row qi-sentrow">${pie}<ul class="qi-legend"><li><i style="background:#3b82f6"></i>Confianza 42%</li><li><i style="background:#f59e0b"></i>Desconfianza 35%</li><li><i style="background:#94a3b8"></i>Indiferencia 23%</li></ul>${btn("ai-summary", "View AI Summary")}</div>
           <table class="qi-table"><tr><th>Case</th><th>Response</th><th>Category</th></tr>${rows}</table>${qBtn("right")}`
        : `<h2 class="qi-h">Sentiment Analysis</h2><p class="qi-muted">Column: P3_Apoyos_recibidos. Define the categories you want to analyse.</p>
           <div class="qi-composer">${input("sent-cats", "e.g. Positive, negative, neutral", p.value || "")}${primary("sent-run", "Run")}</div>`,
        { inProject: true, crumb: D().projectB.name });
    },

    archive(p) {
      const items = p.items || [
        { t: "Topic Analysis", n: "Topic_1", f: 3, follow: true },
        { t: "Conversational Analysis", n: "Redes de apoyo por país", f: 3 },
        { t: "Grid Analysis", n: "Apoyos recibidos", f: 3 },
        { t: "Sentiment Analysis", n: "P3 confianza", f: 1 }
      ];
      const folders = p.folders || [];
      return shell(`<div class="qi-row qi-between"><h2 class="qi-h">Analysis Archive</h2>
          <div class="qi-row"><div class="qi-tabs">${btn("list-view", "List View", "qi-tab" + (p.folderView ? "" : " qi-tab-on"))}${btn("folder-view", "Folder View", "qi-tab" + (p.folderView ? " qi-tab-on" : ""))}</div>${btn("new-folder", "New folder")}</div></div>
        ${p.naming ? `<div class="qi-inline-edit">Folder name ${input("folder-name", "e.g. PI1 Redes de apoyo", p.value || "")}${primary("folder-ok", "Create")}</div>` : ""}
        ${folders.length ? `<div class="qi-folders">${folders.map((f, i) => `<button type="button" class="qi-folder" data-sid="folder-${i}">📁 ${esc(f.name)} <span class="qi-muted">${f.n || 0}</span></button>`).join("")}</div>` : ""}
        <table class="qi-table"><tr><th></th><th data-sid="sort-date">Date</th><th data-sid="sort-type">Type</th><th data-sid="sort-name">Name</th><th>Files</th><th></th></tr>
        ${items.map((it, i) => `<tr class="qi-arcrow${p.picked === i ? " qi-selected" : ""}" data-sid="arc-row-${i}"><td>${it.follow ? `<button type="button" class="qi-mini" data-sid="arc-expand-${i}" aria-label="Show follow-up chats">▸</button>` : ""}</td><td>14 Oct 2026</td><td>${it.t}</td><td>${it.inFolder ? "📁 " : ""}${esc(it.n)}</td><td><button type="button" class="qi-mini" data-sid="arc-files-${i}">${it.f}</button></td><td>${dots("arc-menu-" + i)}</td></tr>
          ${p.expanded === i ? `<tr><td></td><td colspan="5" class="qi-muted">↳ Follow-up chat: ¿Qué diferencias hay entre quienes usaron albergue y quienes no?</td></tr>` : ""}`).join("")}</table>
        <p class="qi-muted">${btn("go-full", "Go to Full Analysis", "qi-btn qi-small")}</p>`, { inProject: true, crumb: D().projectA.name });
    },

    anonymizer(p) {
      const ents = [["Marisol Rivera", "Person name"], ["Colonia Las Palmas", "Location"], ["Tegucigalpa", "Location"], ["504 9988 7766", "Phone number"]];
      const st = p.st || {};
      return shell(`<h2 class="qi-h">QInsights Privacy Guard <span class="qi-chip">beta, desktop app</span></h2>
        <div class="qi-row">${btn("browse", "Browse Files")}<span class="qi-muted">${p.file ? esc(p.file) : "Word or PDF"}</span>${primary("run-analysis", "Run Analysis")}</div>
        ${p.ran ? `<table class="qi-table"><tr><th>Detected Entities</th><th>Type field</th><th>Status</th><th>Replace with</th><th></th></tr>
          ${ents.map(([e, t], i) => `<tr><td>${e}</td><td>${t}</td><td>${btn("mask-" + i, st[i] === "Visible" ? "Visible" : "Masked", "qi-btn qi-small" + (st[i] === "Visible" ? "" : " qi-on"))}</td><td>${i === 0 ? input("replace-0", "Replacement", p.value || "") : `<span class="qi-muted">[${t.toUpperCase().replace(/ /g, "_")}]</span>`}</td><td>${btn("locate-" + i, "Locate", "qi-btn qi-small")}</td></tr>`).join("")}</table>
          <div class="qi-row qi-end">${btn("replace-all", "Replace All")}${primary("next-reduction", "Next: Reduction")}</div>` : ""}
        ${p.reduction ? `<div class="qi-ctxcard">Reduction ready. ${btn("run-reduction", "Run Reduction")} ${primary("save-output", "Save Output")}</div>` : ""}`);
    }
  };

  window.Sim = {
    render(name, params) {
      const fn = screens[name];
      return fn ? fn(params || {}) : `<div class="qi-empty">Screen not found: ${esc(name)}</div>`;
    }
  };
})();
