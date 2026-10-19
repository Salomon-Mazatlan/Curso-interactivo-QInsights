// Course engine: progress, XP, badges, mission flow and step renderers
(function () {
  const M = window.MISSIONS;
  const KEY = "qinsights-curso-v1";
  const RANKS = [[0, "Aprendiz de campo"], [400, "Asistente de investigación"], [900, "Analista"], [1500, "Analista sénior"]];
  const XP = { quiz: 20, quizRetry: 5, beat: 10, beatRetry: 4, item: 6, sort: 30, mission: 50 };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const $ = (sel, root = document) => root.querySelector(sel);
  const app = $("#app");

  // Persistent state, guarded for private windows
  let S = { xp: 0, done: {}, skipped: {}, awarded: {} };
  try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(S, JSON.parse(raw)); } catch (e) { /* storage unavailable */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } };

  function award(key, pts) {
    if (S.awarded[key]) return 0;
    S.awarded[key] = true; S.xp += pts; save(); hud(); popXP(pts);
    return pts;
  }
  const rank = () => RANKS.filter(([t]) => S.xp >= t).pop();
  const nextRank = () => RANKS.find(([t]) => S.xp < t);
  const unlocked = (i) => i === 0 || S.done[M[i - 1].id] || S.skipped[M[i - 1].id];

  function hud() {
    const r = rank(), n = nextRank();
    const floor = r[0], ceil = n ? n[0] : floor + 1;
    const pct = n ? Math.min(100, ((S.xp - floor) / (ceil - floor)) * 100) : 100;
    const el = $("#hud");
    if (!el) return;
    el.innerHTML = `<div class="hud-rank">${r[1]}</div>
      <div class="hud-bar" role="progressbar" aria-valuenow="${Math.round(pct)}" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso al siguiente rango"><span style="width:${pct}%"></span></div>
      <div class="hud-xp">${S.xp} XP${n ? `<span> de ${n[0]} para ${n[1]}</span>` : ""}</div>`;
  }

  function popXP(pts) {
    if (!pts) return;
    const t = document.createElement("div");
    t.className = "xp-pop"; t.textContent = "+" + pts + " XP";
    t.style.bottom = 24 + document.querySelectorAll(".xp-pop").length * 46 + "px";
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1400);
  }

  // Home view
  function home() {
    cur = null;
    const doneCount = M.filter((m) => S.done[m.id]).length;
    const rows = M.map((m, i) => {
      const st = S.done[m.id] ? "done" : unlocked(i) ? "open" : "locked";
      const label = { done: "Completada", open: S.skipped[m.id] ? "Saltada" : "Disponible", locked: "Se abre al terminar la anterior" }[st];
      return `<li class="route-item is-${st}">
        <span class="route-n" aria-hidden="true">${i}</span>
        <div class="route-body">
          <h3><span class="${st === "done" ? "marked" : ""}">${esc(m.title)}</span></h3>
          <p>${esc(m.goal)}</p>
          <div class="route-meta">${label}${st === "done" ? `, insignia "${esc(m.badge)}"` : ""}</div>
        </div>
        ${st === "locked" ? `<span class="route-lock" aria-hidden="true">🔒</span>` : `<button class="btn ${st === "done" ? "btn-quiet" : "btn-go"}" data-open="${i}">${st === "done" ? "Repetir" : i === firstOpen() ? "Empezar" : "Abrir"}</button>`}
      </li>`;
    }).join("");
    const badges = M.map((m) => `<li class="badge ${S.done[m.id] ? "got" : ""}" title="${esc(m.title)}"><span class="badge-mark" aria-hidden="true">${S.done[m.id] ? "★" : ""}</span>${esc(m.badge)}</li>`).join("");
    app.innerHTML = `
      <section class="hero">
        <div class="hero-text">
          <h1>Aprende QInsights analizando entrevistas sobre migración</h1>
          <p class="lede">Trece misiones con un simulador de la plataforma, ejercicios para rastrear la evidencia y elegir el análisis adecuado, y práctica para conversar con Q, el asistente de IA. Trabajas con datos ficticios de un estudio sobre redes de apoyo.</p>
          <div class="hero-actions"><button class="btn btn-go btn-big" data-open="${firstOpen()}">${doneCount ? "Continuar" : "Empezar el curso"}</button><span class="muted">${doneCount} de ${M.length} misiones completadas</span></div>
        </div>
        <aside class="notebook" aria-label="Tu cuaderno">
          <h2>Tu cuaderno</h2>
          <div id="hud" class="hud"></div>
          <h3 class="nb-sub">Insignias</h3>
          <ul class="badges">${badges}</ul>
        </aside>
      </section>
      <section class="route" aria-labelledby="route-h">
        <h2 id="route-h">Ruta del curso</h2>
        <ol class="route-list">${rows}</ol>
      </section>`;
    hud();
    app.querySelectorAll("[data-open]").forEach((b) => b.addEventListener("click", () => openMission(+b.dataset.open)));
    window.scrollTo(0, 0);
  }
  const firstOpen = () => { const i = M.findIndex((m, k) => unlocked(k) && !S.done[m.id]); return i < 0 ? 0 : i; };

  // Mission view
  let cur = null; // { mi, si, ctx }
  function openMission(mi, si = 0) {
    if (!unlocked(mi)) return;
    cur = { mi, si, ctx: {} };
    location.hash = "m" + mi;
    renderMission();
  }

  function renderMission() {
    const m = M[cur.mi];
    const dots = m.steps.map((s, i) => `<li class="${i < cur.si ? "past" : i === cur.si ? "now" : ""}" title="${esc(s.title || stepName(s.type))}"><span class="sr">Paso ${i + 1}</span></li>`).join("");
    app.innerHTML = `
      <div class="mission">
        <div class="mission-top">
          <button class="link" id="back">Ruta del curso</button>
          <div id="hud" class="hud hud-inline"></div>
        </div>
        <header class="mission-head">
          <div class="mission-n">Misión ${cur.mi} de ${M.length - 1}</div>
          <h1>${esc(m.title)}</h1>
          <p>${esc(m.goal)}</p>
          <ol class="stepdots" aria-label="Pasos de la misión">${dots}</ol>
        </header>
        <section id="stage" class="stage" aria-live="polite"></section>
        <footer class="mission-foot">
          <button class="btn btn-quiet" id="restart">Reiniciar lección</button>
          <button class="btn btn-quiet" id="skip">Saltar</button>
        </footer>
      </div>`;
    hud();
    $("#back").addEventListener("click", () => { location.hash = ""; home(); });
    $("#restart").addEventListener("click", () => { cur.si = 0; cur.ctx = {}; renderMission(); });
    $("#skip").addEventListener("click", skip);
    renderStep();
    $("#stage").focus({ preventScroll: true });
  }
  const stepName = (t) => ({ brief: "Lectura", video: "Video", quiz: "Pregunta", sim: "Simulador", classify: "Clasificar", evidence: "Rastrear la evidencia", picker: "Elegir el análisis", sort: "Ordenar" }[t] || t);

  function next() {
    const m = M[cur.mi];
    if (cur.si < m.steps.length - 1) { cur.si++; cur.ctx = {}; renderMission(); window.scrollTo({ top: 0, behavior: "smooth" }); }
    else finish();
  }

  function skip() {
    const m = M[cur.mi];
    if (cur.si < m.steps.length - 1) next();
    else { S.skipped[m.id] = true; save(); finish(true); }
  }

  function finish(skipped) {
    const m = M[cur.mi];
    let gained = 0;
    if (!skipped) { S.done[m.id] = true; save(); gained = award("mission-" + m.id, XP.mission); }
    const hasNext = cur.mi < M.length - 1;
    $("#stage").innerHTML = `<div class="finish">
      ${skipped ? `<h2>Misión saltada</h2><p>Puedes volver a ella cuando quieras desde la ruta del curso. La siguiente misión ya está disponible.</p>`
        : `<p class="finish-k">Insignia obtenida</p><h2 class="finish-badge"><span class="sweep">${esc(m.badge)}</span></h2><p>${gained ? `Sumaste ${gained} XP por completar la misión.` : "Ya tenías esta insignia."} Llevas ${S.xp} XP en total.</p>`}
      <div class="row">${hasNext ? `<button class="btn btn-go" id="nextm">Siguiente misión</button>` : `<button class="btn btn-go" id="certi">Ver mi resumen</button>`}<button class="btn btn-quiet" id="tomap">Ruta del curso</button></div></div>`;
    $(".stepdots").querySelectorAll("li").forEach((li) => (li.className = "past"));
    $("#tomap").addEventListener("click", () => { location.hash = ""; home(); });
    if (hasNext) $("#nextm").addEventListener("click", () => openMission(cur.mi + 1));
    else $("#certi").addEventListener("click", summary);
  }

  function summary() {
    const got = M.filter((m) => S.done[m.id]);
    $("#stage").innerHTML = `<div class="finish"><h2>Resumen del recorrido</h2>
      <p>Completaste ${got.length} de ${M.length} misiones con ${S.xp} XP. Tu rango es ${rank()[1]}.</p>
      <ul class="badges badges-wide">${got.map((m) => `<li class="badge got"><span class="badge-mark">★</span>${esc(m.badge)}</li>`).join("")}</ul>
      <p class="muted">Siguiente paso sugerido. Abre una cuenta de prueba en QInsights y repite la ruta con tus propios datos, empezando por un proyecto pequeño de cuatro a seis documentos.</p>
      <div class="row"><button class="btn btn-quiet" id="tomap">Ruta del curso</button></div></div>`;
    $("#tomap").addEventListener("click", () => { location.hash = ""; home(); });
  }

  // Step dispatcher
  function renderStep() {
    const step = M[cur.mi].steps[cur.si];
    const stage = $("#stage");
    stage.innerHTML = `<div class="step step-${step.type}"><div class="step-kind">${stepName(step.type)}</div>${step.title ? `<h2>${esc(step.title)}</h2>` : ""}<div id="body"></div></div>`;
    const body = $("#body");
    const key = M[cur.mi].id + "-" + cur.si;
    ({ brief, video, quiz, classify, evidence, picker, sort, sim })[step.type](step, body, key);
  }

  const contBtn = (label = "Continuar") => `<div class="row"><button class="btn btn-go" data-next>${label}</button></div>`;
  const bindNext = (root) => root.querySelectorAll("[data-next]").forEach((b) => b.addEventListener("click", next));

  function brief(step, body) {
    body.innerHTML = `<div class="prose">${step.html}</div>${contBtn()}`;
    bindNext(body);
  }

  function ytId(u) {
    const m = String(u).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : /^[\w-]{11}$/.test(u) ? u : "";
  }
  function video(step, body) {
    const id = ytId(step.youtube || "");
    body.innerHTML = (id
      ? `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${esc(step.title)}" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
      : `<div class="video video-empty"><p>Espacio reservado para el video.</p><p class="muted">Añade el enlace de YouTube en el campo <code>youtube</code> de este paso, en assets/js/missions.js.</p></div>`) + contBtn();
    bindNext(body);
  }

  function quiz(step, body, key) {
    let tries = 0;
    body.innerHTML = `<p class="q">${esc(step.q)}</p><div class="opts">${step.options.map((o, i) => `<button class="opt" data-i="${i}">${esc(o)}</button>`).join("")}</div><div class="fb" id="fb"></div>`;
    body.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => {
      const i = +b.dataset.i;
      if (body.dataset.solved) return;
      tries++;
      if (i === step.answer) {
        b.classList.add("ok"); body.dataset.solved = 1;
        award(key, tries === 1 ? XP.quiz : XP.quizRetry);
        $("#fb").innerHTML = `<p class="fb-ok">Correcto. ${esc(step.explain)}</p>${contBtn()}`; bindNext(body);
        body.querySelectorAll(".opt").forEach((x) => (x.disabled = true));
      } else {
        b.classList.add("bad"); b.disabled = true;
        $("#fb").innerHTML = `<p class="fb-bad">Esa no es. Vuelve a leer la pregunta y prueba otra opción.</p>`;
      }
    }));
  }

  // Shared engine for item-by-item choice steps (classify, evidence, picker)
  function choiceItems(body, key, items, cats, renderItem, immediate, explainAll) {
    const picked = {}; let checks = 0;
    body.insertAdjacentHTML("beforeend", `<div class="items">${items.map((it, i) => `<div class="item" data-i="${i}">${renderItem(it, i)}
      <div class="chips" role="group">${cats.map((c) => `<button class="chip" data-c="${esc(c)}">${esc(c)}</button>`).join("")}</div><div class="item-fb"></div></div>`).join("")}</div>
      ${immediate ? "" : `<div class="row"><button class="btn btn-go" id="check">Comprobar</button></div>`}<div class="fb" id="fb"></div>`);
    const done = () => {
      $("#fb").innerHTML = `${explainAll ? `<p class="fb-ok">${esc(explainAll)}</p>` : ""}${contBtn()}`; bindNext(body);
    };
    body.querySelectorAll(".item").forEach((row) => {
      const i = +row.dataset.i, it = items[i];
      row.querySelectorAll(".chip").forEach((ch) => ch.addEventListener("click", () => {
        if (row.dataset.solved) return;
        row.querySelectorAll(".chip").forEach((x) => x.classList.remove("on", "bad"));
        ch.classList.add("on"); picked[i] = ch.dataset.c;
        if (immediate) {
          const right = it.answer === picked[i];
          row.dataset.tries = (+row.dataset.tries || 0) + 1;
          if (right) {
            row.dataset.solved = 1; row.classList.add("ok"); ch.classList.add("okc");
            award(key + "-" + i, row.dataset.tries === "1" ? XP.item + 4 : 2);
            row.querySelector(".item-fb").innerHTML = `<p class="fb-ok">${esc(it.explain)}</p>`;
            if (body.querySelectorAll(".item[data-solved]").length === items.length) done();
          } else {
            ch.classList.add("bad");
            row.querySelector(".item-fb").innerHTML = `<p class="fb-bad">No coincide con lo que dice la fuente. Vuelve a leerla.</p>`;
          }
        }
      }));
    });
    if (!immediate) $("#check").addEventListener("click", () => {
      checks++; let good = 0;
      body.querySelectorAll(".item").forEach((row) => {
        const i = +row.dataset.i, ok = picked[i] === items[i].cat;
        row.classList.toggle("ok", ok); row.classList.toggle("no", !ok && picked[i] !== undefined);
        if (ok) { good++; row.dataset.solved = 1; if (checks === 1) award(key + "-" + i, XP.item); }
      });
      if (good === items.length) { $("#check").remove(); done(); }
      else $("#fb").innerHTML = `<p class="fb-bad">${good} de ${items.length} bien. Corrige las que quedaron marcadas o sin respuesta y vuelve a comprobar.</p>`;
    });
  }

  function classify(step, body, key) {
    body.innerHTML = `<p class="q">${esc(step.prompt)}</p>`;
    choiceItems(body, key, step.items, step.categories, (it) => `<p class="item-text">${esc(it.text)}</p>`, false, step.explain);
  }

  function evidence(step, body, key) {
    body.innerHTML = `<p class="q">${esc(step.prompt)}</p>`;
    choiceItems(body, key, step.items, ["Respaldada", "Parcial", "No respaldada"], (it) =>
      `<p class="claim"><span class="qbadge" aria-hidden="true">Q</span>${esc(it.claim)}</p><blockquote class="src"><mark>${esc(it.quote)}</mark><cite>${esc(it.doc)}</cite></blockquote>`, true);
  }

  function picker(step, body, key) {
    body.innerHTML = `<p class="q">${esc(step.prompt)}</p>`;
    choiceItems(body, key, step.items, step.options, (it) => `<p class="item-text">${esc(it.q)}</p>`, true);
  }

  function sort(step, body, key) {
    let order = step.items.map((_, i) => i);
    do { order.sort(() => Math.random() - 0.5); } while (order.every((v, i) => v === i));
    let checks = 0;
    const draw = () => {
      body.innerHTML = `<p class="q">${esc(step.prompt)}</p><ol class="sortlist">${order.map((v, pos) => `<li><span>${esc(step.items[v])}</span>
        <span class="sortbtns"><button class="mini" data-up="${pos}" aria-label="Subir"${pos === 0 ? " disabled" : ""}>▲</button><button class="mini" data-down="${pos}" aria-label="Bajar"${pos === order.length - 1 ? " disabled" : ""}>▼</button></span></li>`).join("")}</ol>
        <div class="row"><button class="btn btn-go" id="check">Comprobar orden</button></div><div class="fb" id="fb"></div>`;
      body.querySelectorAll("[data-up]").forEach((b) => b.addEventListener("click", () => { const p = +b.dataset.up; [order[p - 1], order[p]] = [order[p], order[p - 1]]; draw(); }));
      body.querySelectorAll("[data-down]").forEach((b) => b.addEventListener("click", () => { const p = +b.dataset.down; [order[p + 1], order[p]] = [order[p], order[p + 1]]; draw(); }));
      $("#check").addEventListener("click", () => {
        checks++;
        if (order.every((v, i) => v === i)) {
          award(key, checks === 1 ? XP.sort : 10);
          body.querySelectorAll(".mini").forEach((x) => (x.disabled = true));
          $("#check").remove();
          $("#fb").innerHTML = `<p class="fb-ok">Orden correcto. ${esc(step.explain)}</p>${contBtn()}`; bindNext(body);
        } else {
          const right = order.filter((v, i) => v === i).length;
          $("#fb").innerHTML = `<p class="fb-bad">${right} de ${order.length} en su lugar. Piensa qué necesitas saber antes de poder comparar o relacionar.</p>`;
        }
      });
    };
    draw();
  }

  // Simulator step
  function sim(step, body, key) {
    let bi = 0, misses = 0, hinted = false, note = "";
    body.innerHTML = `<p class="sim-intro">${esc(step.intro)}</p>
      <div class="sim-task"><div class="sim-count" id="scount"></div><p class="sim-say" id="say"></p>
        <div class="sim-tools"><button class="btn btn-small btn-quiet" id="hintb">Pista</button></div><div class="fb" id="sfb"></div></div>
      <div class="sim-frame" id="frame"></div>
      <p class="sim-disclaimer">Simulación con fines didácticos, basada en el manual oficial. La apariencia real de la plataforma puede variar.</p>`;
    const frame = $("#frame");

    function draw() {
      const b = step.beats[bi];
      misses = 0; hinted = false;
      $("#scount").textContent = `Acción ${bi + 1} de ${step.beats.length}`;
      $("#say").textContent = b.say;
      $("#sfb").innerHTML = note ? `<p class="fb-ok">${esc(note)}</p>` : "";
      note = "";
      frame.innerHTML = window.Sim.render(b.screen, b.p);
      // Keep focusable inputs ready for typing tasks
      if (b.act.kind === "input") { const el = frame.querySelector(`[data-sid="${b.act.sid}"]`); if (el) setTimeout(() => el.focus({ preventScroll: true }), 50); }
    }

    function success() {
      const b = step.beats[bi];
      award(key + "-" + bi, misses === 0 && !hinted ? XP.beat : XP.beatRetry);
      note = b.explain ? "Bien. " + b.explain : "";
      bi++;
      if (bi < step.beats.length) draw();
      else {
        frame.querySelectorAll("button, input, select, textarea").forEach((el) => (el.disabled = true));
        $("#say").textContent = "Completaste todas las acciones de este ejercicio.";
        $("#scount").textContent = "Ejercicio terminado";
        $("#hintb").remove();
        $("#sfb").innerHTML = `${note ? `<p class="fb-ok">${esc(note)}</p>` : ""}${contBtn()}`; bindNext(body);
      }
    }

    function miss(msg) {
      misses++;
      const b = step.beats[bi];
      $("#sfb").innerHTML = `<p class="fb-bad">${esc(msg)}${misses >= 2 ? " Pista. " + esc(b.hint) : ""}</p>`;
    }

    const valOk = (it, el) => {
      if (!el) return false;
      if (it.kind === "check") return el.checked === it.value;
      if (it.kind === "select") return el.value === it.value;
      if (it.kind === "toggle") return el.classList.contains("qi-chip-on") === it.value;
      const v = el.value.trim();
      if (v.length < (it.min || 1)) return false;
      return it.match ? new RegExp(it.match, "i").test(v) : true;
    };

    function submit() {
      const a = step.beats[bi].act;
      const items = a.kind === "multi" ? a.items : [a];
      const bad = items.filter((it) => !valOk(it, frame.querySelector(`[data-sid="${it.sid}"]`)));
      frame.querySelectorAll(".qi-wrong").forEach((x) => x.classList.remove("qi-wrong"));
      if (!bad.length) return success();
      bad.forEach((it) => { const el = frame.querySelector(`[data-sid="${it.sid}"]`); if (el) el.classList.add("qi-wrong"); });
      miss(a.kind === "multi" ? `Hay ${bad.length} ${bad.length === 1 ? "elemento" : "elementos"} por corregir, quedaron marcados en rojo.` : "Revisa lo que escribiste, todavía no cumple con lo que pide la instrucción.");
    }

    frame.addEventListener("click", (e) => {
      const el = e.target.closest("[data-sid]");
      if (!el || el.disabled || bi >= step.beats.length) return;
      const a = step.beats[bi].act, sid = el.dataset.sid;
      const tag = el.tagName;
      if (a.kind === "multi") {
        const it = a.items.find((x) => x.sid === sid);
        if (it && it.kind === "toggle") { el.classList.toggle("qi-chip-on"); el.classList.remove("qi-wrong"); return; }
        if (it) { el.classList.remove("qi-wrong"); return; }
        if (sid === a.submit) return submit();
      } else if (a.kind === "click") {
        if (sid === a.sid) return success();
      } else if (a.kind === "input") {
        if (sid === a.sid) return;
        if (sid === a.submit) return submit();
      } else if (a.kind === "select" && sid === a.sid) return;
      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
      miss("Ese control existe en la plataforma, pero no es el que corresponde ahora.");
    });

    frame.addEventListener("change", (e) => {
      const el = e.target.closest("[data-sid]");
      if (!el || bi >= step.beats.length) return;
      const a = step.beats[bi].act;
      if (a.kind === "select" && el.dataset.sid === a.sid) {
        if (el.value === a.value) success(); else miss(`"${el.value}" no es la opción que pide la instrucción.`);
      } else if (el.type === "checkbox" && a.kind !== "multi" && el.dataset.sid !== a.sid) {
        el.checked = !el.checked;
      }
    });

    frame.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" || bi >= step.beats.length) return;
      const a = step.beats[bi].act, el = e.target.closest("[data-sid]");
      if (!el || el.tagName === "TEXTAREA" || el.tagName === "BUTTON") return;
      if (a.kind === "input" && el.dataset.sid === a.sid) { e.preventDefault(); a.submit ? submit() : (valOk(a, el) ? success() : miss("Revisa lo que escribiste, todavía no cumple con lo que pide la instrucción.")); }
      else if (a.kind === "multi" && a.items.some((x) => x.sid === el.dataset.sid)) { e.preventDefault(); submit(); }
    });

    $("#hintb").addEventListener("click", () => {
      const b = step.beats[bi];
      hinted = true;
      $("#sfb").innerHTML = `<p class="fb-hint">Pista. ${esc(b.hint)}</p>`;
      const sid = b.act.kind === "multi" ? b.act.submit : b.act.sid;
      const el = frame.querySelector(`[data-sid="${sid}"]`);
      if (el) { el.classList.remove("qi-pulse"); void el.offsetWidth; el.classList.add("qi-pulse"); }
    });

    draw();
  }

  // Routing and boot
  $("#reset").addEventListener("click", () => {
    if (!confirm("Se borrará tu XP, tus insignias y el avance de todas las misiones en este navegador. ¿Continuar?")) return;
    S = { xp: 0, done: {}, skipped: {}, awarded: {} }; save(); home();
  });
  $("#home-link").addEventListener("click", (e) => { e.preventDefault(); location.hash = ""; home(); });
  const fromHash = () => { const m = location.hash.match(/^#m(\d+)$/); if (m && M[+m[1]] && unlocked(+m[1])) openMission(+m[1]); else home(); };
  window.addEventListener("hashchange", () => { if (!cur || location.hash !== "#m" + cur.mi) fromHash(); });
  fromHash();
})();
