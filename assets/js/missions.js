// Course content. Each mission is a list of steps; see README for the step types
window.MISSIONS = [
  {
    id: "m0",
    title: "Conoce a Q",
    badge: "Primer contacto",
    goal: "Entender qué es QInsights, cómo reparte el trabajo entre la persona investigadora y la IA, y qué pasa con tus datos.",
    steps: [
      { type: "brief", title: "Una plataforma para conversar con tus datos", html: `
        <p>QInsights es una plataforma web para analizar datos cualitativos con apoyo de inteligencia artificial. Trabaja con entrevistas, grupos focales, respuestas abiertas de encuestas, informes, audio y video.</p>
        <p>Dentro de la plataforma hay un asistente llamado <b>Q</b>. Q busca, compara y propone patrones, pero la interpretación sigue siendo tuya. Cada hallazgo queda ligado a los fragmentos del material que lo sostienen, así puedes revisarlo, validarlo o discutirlo.</p>
        <p>A diferencia de programas como QualCoder o ATLAS.ti, aquí no se empieza codificando segmento por segmento. Se trabaja con preguntas, mapas de temas y comparaciones, y se vuelve una y otra vez a la evidencia.</p>
        <p>En este curso vas a practicar con un simulador. Los nombres de botones y menús aparecen en inglés porque así se ven en la plataforma.</p>` },
      { type: "video", title: "Recorrido general por QInsights", youtube: "" },
      { type: "quiz", q: "Según el principio de colaboración humano-IA de QInsights, ¿quién decide qué significan los resultados?", options: ["Q, porque procesa todo el material más rápido", "La persona investigadora, que revisa la evidencia y decide la interpretación", "Nadie, los temas salen listos para publicar", "El equipo de QInsights que revisa cada proyecto"], answer: 1, explain: "La IA ayuda a procesar el material y a encontrar patrones. La persona investigadora define el foco, revisa las referencias y decide cómo interpretar." },
      { type: "quiz", q: "Trabajas con entrevistas a personas migrantes. ¿Cuál de estas afirmaciones sobre el manejo de datos en QInsights es correcta según su documentación?", options: ["Los datos se usan para entrenar modelos de IA de uso general", "Los datos se procesan dentro de la Unión Europea, van cifrados y no se usan para entrenar modelos generales", "Los datos se publican en un repositorio abierto", "No hace falta anonimizar porque la plataforma lo hace sola al subir"], answer: 1, explain: "La plataforma procesa en la UE conforme al RGPD, cifra en tránsito y en reposo y no entrena modelos generales con tu material. Aun así, anonimizar antes de subir sigue siendo tu responsabilidad ética." },
      { type: "quiz", q: "¿Qué papel tiene el material fuente cuando Q te da una respuesta?", options: ["Ninguno, la respuesta se basa en el conocimiento general del modelo", "Las respuestas enlazan a los fragmentos del material que las respaldan, para que puedas verificarlas", "Solo se usa para contar palabras", "Se borra después de cada análisis"], answer: 1, explain: "La trazabilidad es el centro de la plataforma. Siempre que veas una afirmación de Q, busca el enlace a su fuente y léelo." }
    ]
  },
  {
    id: "m1",
    title: "Preparar el material",
    badge: "Mano limpia",
    goal: "Saber qué formatos acepta QInsights, cómo dejar listas las transcripciones y las hojas de cálculo, y cómo anonimizar antes de subir.",
    steps: [
      { type: "brief", title: "Antes de subir nada", html: `
        <p>QInsights acepta audio y video (.mp3, .m4a, .mp4, hasta 1 GB), documentos de texto (.docx, .txt, .pdf) y hojas de cálculo (.xlsx y .csv, de preferencia .xlsx).</p>
        <p>Si traes transcripciones hechas en otro programa, escribe cada intervención con el nombre de quien habla seguido de dos puntos, por ejemplo "Marisol:". Evita etiquetas genéricas como "R:" o "Speaker 1". Si anonimizas, usa seudónimos distintos para cada persona.</p>
        <p>Para encuestas en Excel, deja una sola hoja, una fila por caso, sin encabezados ni pies decorativos. Los nombres de columna deben ser cortos y el texto completo de cada pregunta conviene ponerlo en la descripción del proyecto. La documentación recomienda alrededor de 1,000 casos por archivo.</p>
        <p>Para anonimizar existe <b>QInsights Privacy Guard</b>, una aplicación de escritorio en versión beta que funciona en tu computadora, detecta nombres, lugares, teléfonos y otras entidades, y genera un archivo con el sufijo "_redacted" más un informe de correspondencias.</p>` },
      { type: "video", title: "Preparar transcripciones y encuestas", youtube: "" },
      { type: "classify", title: "¿Está lista para subir?", prompt: "Clasifica cada transcripción hecha fuera de QInsights según si cumple o no con el formato recomendado.", categories: ["Lista", "Hay que corregir"], items: [
        { text: "Marisol: Llegamos de noche, mis hijos ya no podían caminar.", cat: "Lista" },
        { text: "R: Llegamos de noche, mis hijos ya no podían caminar.", cat: "Hay que corregir" },
        { text: "Speaker 1: Pues por el trabajo, allá no alcanzaba.", cat: "Hay que corregir" },
        { text: "Entrevistadora: ¿Cómo fue el camino hasta aquí?", cat: "Lista" },
        { text: "Persona 2 Pues mi primo me mandó dinero", cat: "Hay que corregir" }
      ], explain: "QInsights identifica a los hablantes a partir del nombre seguido de dos puntos. Las etiquetas genéricas o sin dos puntos dificultan asignar roles y perfiles después." },
      { type: "sim", title: "Anonimiza una entrevista", intro: "Abre Privacy Guard, revisa las entidades detectadas en la entrevista de Marisol y guarda la versión anonimizada.", beats: [
        { screen: "dashboard", p: {}, say: "Abre la herramienta de anonimización desde la barra lateral.", act: { kind: "click", sid: "nav-anonymizer" }, hint: "Está en la parte baja de la barra lateral izquierda." },
        { screen: "anonymizer", p: {}, say: "Elige el archivo de la entrevista.", act: { kind: "click", sid: "browse" }, hint: "Busca \"Browse Files\"." },
        { screen: "anonymizer", p: { file: "E01_Marisol.docx" }, say: "Pide a la herramienta que busque datos identificables.", act: { kind: "click", sid: "run-analysis" }, hint: "Es el botón azul \"Run Analysis\"." },
        { screen: "anonymizer", p: { file: "E01_Marisol.docx", ran: true }, say: "Reemplaza el nombre de la entrevistada por su seudónimo \"Marisol\" y pulsa Enter.", act: { kind: "input", sid: "replace-0", min: 3, match: "marisol" }, hint: "Escribe Marisol en la casilla \"Replace with\" de la primera fila.", explain: "Un seudónimo consistente permite seguir a la persona en el análisis sin exponer su identidad." },
        { screen: "anonymizer", p: { file: "E01_Marisol.docx", ran: true, value: "Marisol" }, say: "Revisadas las entidades, pasa a la etapa de reducción.", act: { kind: "click", sid: "next-reduction" }, hint: "Busca \"Next: Reduction\"." },
        { screen: "anonymizer", p: { file: "E01_Marisol.docx", ran: true, value: "Marisol", reduction: true }, say: "Guarda el archivo anonimizado.", act: { kind: "click", sid: "save-output" }, hint: "Es \"Save Output\".", explain: "Se genera E01_Marisol_redacted.docx y un informe con cada valor original y su reemplazo. Guarda ese informe aparte, porque mientras exista los datos están seudonimizados, no anonimizados." }
      ] },
      { type: "quiz", q: "Tienes 100 respuestas de encuesta en Excel con dos hojas, una con datos y otra con gráficas, y un título en la fila 1. ¿Qué haces antes de subirla?", options: ["Nada, QInsights lee cualquier formato de Excel", "Dejo una sola hoja con una fila por caso y los nombres de columna en la primera fila", "La convierto a PDF para que se lea mejor", "Pego todas las respuestas en un Word"], answer: 1, explain: "Una sola hoja, una fila por caso, encabezados cortos en la primera fila y sin títulos ni pies. Las gráficas y notas van en otro archivo." }
    ]
  },
  {
    id: "m2",
    title: "Crear el proyecto y subir archivos",
    badge: "Fundación del proyecto",
    goal: "Crear un proyecto con una descripción útil para Q y conocer las tres vías para añadir material.",
    steps: [
      { type: "brief", title: "Qué escribir en la descripción", html: `
        <p>Todo lo que escribes al crear un proyecto es información para Q. Piensa en Q como alguien del equipo que se incorpora tarde y necesita entender de qué va el estudio, con quiénes se trabajó, en qué contexto y con qué preguntas.</p>
        <p>Al principio conviene una descripción descriptiva. Si desde el inicio cargas un marco teórico detallado, las respuestas pueden volverse demasiado dirigidas. Siempre puedes editarla después con <b>Edit</b>.</p>
        <p>No uses la descripción para recordatorios ajenos al análisis, como "escribir el informe en inglés", porque Q los toma como contexto y puede cambiar el idioma de sus resúmenes.</p>` },
      { type: "sim", title: "Crea el proyecto de entrevistas", intro: "Vas a crear el proyecto para las entrevistas sobre migración y redes de apoyo.", beats: [
        { screen: "dashboard", p: { projects: [] }, say: "Empieza un proyecto nuevo.", act: { kind: "click", sid: "add-project" }, hint: "Está arriba a la derecha del Dashboard." },
        { screen: "newProject", p: {}, say: "Escribe un nombre que describa el proyecto (por ejemplo \"Migración y redes de apoyo\") y pulsa Continue.", act: { kind: "input", sid: "proj-name", min: 8, submit: "continue" }, hint: "Usa al menos 8 caracteres y luego pulsa Continue.", explain: "El nombre también orienta a Q sobre el tema general." },
        { screen: "projectContext", p: {}, say: "Escribe una descripción breve del estudio (al menos 60 caracteres) y crea el proyecto.", act: { kind: "input", sid: "proj-desc", min: 60, submit: "create" }, hint: "Menciona quiénes participaron, dónde y qué quieres saber. Luego pulsa Create Project.", explain: "Si ya tienes un protocolo o un resumen del proyecto, puedes subirlo y usar Extract Context para que Q proponga la descripción, que tú revisas antes de crear." }
      ] },
      { type: "quiz", q: "¿Cuál descripción le sirve más a Q al inicio del análisis?", options: ["\"Entrevistas.\"", "\"Analiza esto con la teoría de capital social de Bourdieu y encuentra los tres tipos de capital.\"", "\"Entrevistas semiestructuradas a personas migrantes en albergues del noroeste de México sobre motivos de salida, trayecto y apoyos recibidos. Interesa cómo se forman las redes de apoyo.\"", "\"Recuérdame entregar el informe el viernes.\""], answer: 2, explain: "Una descripción descriptiva da contexto sin sesgar. El marco teórico puede añadirse después, cuando quieras un análisis más dirigido." },
      { type: "sim", title: "Sube una entrevista en audio", intro: "La entrevista con Wilmer está grabada en audio. QInsights puede transcribirla.", beats: [
        { screen: "workspace", p: { ndocs: 3, noContext: false }, say: "Añade material al proyecto.", act: { kind: "click", sid: "add-files" }, hint: "Es el botón azul \"+ Add Files\"." },
        { screen: "addFilesType", p: {}, say: "Elige la opción para grabaciones que necesitan transcripción.", act: { kind: "click", sid: "opt-av" }, hint: "La primera opción." },
        { screen: "addFilesType", p: {}, say: "Confirma con Continue.", act: { kind: "click", sid: "continue" }, hint: "Abajo a la derecha." },
        { screen: "avUpload", p: {}, say: "La entrevista es en español. Selecciona el idioma manualmente para mejorar la precisión.", act: { kind: "select", sid: "lang", value: "Spanish" }, hint: "Cambia \"Auto-detect\" por Spanish.", explain: "Por defecto el idioma se detecta solo. Si la transcripción sale con errores, se puede repetir eligiendo el idioma a mano." },
        { screen: "avUpload", p: { lang: "Spanish" }, say: "Selecciona el archivo de audio.", act: { kind: "click", sid: "choose-file" }, hint: "Busca \"Choose file\"." },
        { screen: "avUpload", p: { lang: "Spanish", file: "E04_Wilmer.mp3" }, say: "Continúa.", act: { kind: "click", sid: "continue" }, hint: "Botón azul abajo." },
        { screen: "customDictionary", p: {}, say: "Añade al diccionario la sigla \"COMAR\" para que se transcriba bien. Escríbela y pulsa Add terms.", act: { kind: "input", sid: "term", min: 4, match: "comar", submit: "add-terms" }, hint: "Escribe COMAR y pulsa Add terms.", explain: "El diccionario personalizado ayuda con siglas, nombres de organizaciones y términos del campo." },
        { screen: "customDictionary", p: { terms: ["COMAR"] }, say: "Continúa hacia el resumen.", act: { kind: "click", sid: "continue" }, hint: "Botón azul Continue." },
        { screen: "transcribeSummary", p: { lang: "Spanish", terms: ["COMAR"] }, say: "Inicia la transcripción.", act: { kind: "click", sid: "start-trans" }, hint: "Es \"Start transcription\"." },
        { screen: "transcriptEditor", p: {}, say: "La transcripción abre en modo edición con etiquetas genéricas. Haz clic en \"Speaker B\" para cambiarle el nombre.", act: { kind: "click", sid: "spk-B" }, hint: "Haz clic en la etiqueta del hablante, junto a la marca de tiempo." },
        { screen: "transcriptEditor", p: { rename: "Speaker B" }, say: "Escribe el seudónimo \"Wilmer\" y guarda.", act: { kind: "input", sid: "spk-name", min: 3, match: "wilmer", submit: "spk-save" }, hint: "Escribe Wilmer y pulsa Save.", explain: "Renombrar hablantes con seudónimos facilita asignar roles y perfiles en Data Context." }
      ] },
      { type: "classify", title: "¿Por qué puerta entra cada archivo?", prompt: "Indica qué opción de Add Files corresponde a cada material.", categories: ["Audio or video for transcription", "Existing transcript", "Documents or other files"], items: [
        { text: "E04_Wilmer.mp3, grabación sin transcribir", cat: "Audio or video for transcription" },
        { text: "E01_Marisol.docx, transcripción hecha en noScribe", cat: "Existing transcript" },
        { text: "Informe_albergue_2025.pdf, informe institucional", cat: "Documents or other files" },
        { text: "encuesta_migracion.xlsx, respuestas abiertas", cat: "Documents or other files" },
        { text: "Grupo_focal_madres.mp4, video del grupo focal", cat: "Audio or video for transcription" }
      ], explain: "Las transcripciones existentes pasan por detección automática de hablantes. Los Excel entran por Documents or other files, pero se suben aparte de Word y PDF porque piden un paso extra de configuración de columnas." },
      { type: "sim", title: "Sube la encuesta en un proyecto aparte", intro: "La documentación recomienda un proyecto separado para encuestas en Excel, porque no se pueden analizar junto con Word, PDF o audio. Ya creaste \"Encuesta migración 2025\". Ahora configura sus columnas.", beats: [
        { screen: "excelColumns", p: {}, say: "Marca como variable las columnas de contexto (Edad, Genero, Pais_origen, Tiene_hijos) y asigna el tipo correcto a cada una. Deja sin marcar ID_caso y las preguntas abiertas. Luego pulsa Continue Processing.", act: { kind: "multi", submit: "continue-proc", items: [
          { sid: "var-0", kind: "check", value: false }, { sid: "var-1", kind: "check", value: true }, { sid: "var-2", kind: "check", value: true }, { sid: "var-3", kind: "check", value: true }, { sid: "var-4", kind: "check", value: true }, { sid: "var-5", kind: "check", value: false }, { sid: "var-6", kind: "check", value: false }, { sid: "var-7", kind: "check", value: false },
          { sid: "type-1", kind: "select", value: "Number" }, { sid: "type-2", kind: "select", value: "Text" }, { sid: "type-3", kind: "select", value: "Text" }, { sid: "type-4", kind: "select", value: "Boolean" }
        ] }, hint: "Edad es Number, Tiene_hijos es Boolean. ID_caso no se marca como variable para que Q pueda citar el número de caso.", explain: "Las variables pasan a Data Context y sirven para filtrar y comparar. El identificador conviene dejarlo como texto, así Q puede usarlo como referencia en sus respuestas." }
      ] }
    ]
  },
  {
    id: "m3",
    title: "Contexto de los datos",
    badge: "Cartografía de voces",
    goal: "Asignar roles a quienes hablan, crear características de perfil y cargar sus valores.",
    steps: [
      { type: "brief", title: "Quién habla y desde dónde", html: `
        <p><b>Data Context</b> le dice a QInsights cómo entender tu material antes de analizarlo. Tiene tres pestañas.</p>
        <p>En <b>Roles</b> decides cómo se trata a cada hablante. Lo que dice un <i>Respondent</i> es dato primario, se cita y se cuenta. Lo que dice un <i>Interviewer / Moderator</i> queda como contexto que enmarca la conversación, pero no se analiza. Con <i>Exclude</i> se elimina a alguien del análisis, por ejemplo una persona que entró a la sala por error.</p>
        <p>En <b>Profiles</b> creas características (Text, Number o Boolean) que aplican a un hablante o a un documento. En <b>Values</b> llenas esos datos para cada persona o documento. Si ya los tienes en una hoja de cálculo, puedes importarlos desde Excel.</p>
        <p>Crea solo las características que vayas a usar para comparar o filtrar. Muchas casillas innecesarias complican el proyecto sin mejorar el análisis.</p>` },
      { type: "sim", title: "Asigna roles", intro: "En la entrevista de Marisol se detectaron tres hablantes.", beats: [
        { screen: "workspace", p: { ndocs: 3 }, say: "Abre Data Context.", act: { kind: "click", sid: "data-context" }, hint: "Está en la barra de herramientas del proyecto." },
        { screen: "dataContext", p: { tab: "roles" }, say: "Lee las primeras líneas de cada hablante, asígnale su rol y guarda.", act: { kind: "multi", submit: "save-roles", items: [
          { sid: "role-0", kind: "select", value: "Interviewer / Moderator" }, { sid: "role-1", kind: "select", value: "Respondent" }, { sid: "role-2", kind: "select", value: "Exclude" }
        ] }, hint: "Quien pregunta es la entrevistadora. Speaker C entró por error buscando otra oficina.", explain: "Si un rol queda mal asignado, las preguntas de la entrevistadora podrían terminar citadas como si fueran voz de la participante." }
      ] },
      { type: "sim", title: "Crea una característica", intro: "Quieres comparar por edad a las personas entrevistadas.", beats: [
        { screen: "dataContext", p: { tab: "roles" }, say: "Ve a la pestaña de perfiles.", act: { kind: "click", sid: "tab-profiles" }, hint: "Es la segunda pestaña." },
        { screen: "dataContext", p: { tab: "profiles" }, say: "Añade una característica.", act: { kind: "click", sid: "add-char" }, hint: "\"+ Add Characteristic\"." },
        { screen: "dataContext", p: { tab: "profiles", adding: true }, say: "Llámala \"Edad\", elige el tipo adecuado, verifica que aplique a Speaker y guarda.", act: { kind: "multi", submit: "char-save", items: [
          { sid: "char-name", kind: "input", match: "edad" }, { sid: "char-type", kind: "select", value: "Number" }, { sid: "char-applies", kind: "select", value: "Speaker" }
        ] }, hint: "La edad es un número y es un atributo de la persona, no del documento.", explain: "Con tipo Number después podrás filtrar con opciones como less than, greater than o From_To." },
        { screen: "dataContext", p: { tab: "profiles", chars: [{ n: "Pais_origen", t: "Text", a: "Speaker" }, { n: "Edad", t: "Number", a: "Speaker" }] }, say: "Pasa a la pestaña de valores.", act: { kind: "click", sid: "tab-values" }, hint: "Tercera pestaña." },
        { screen: "dataContext", p: { tab: "values" }, say: "A Jorge le falta la edad. Escribe 27 y pulsa Enter.", act: { kind: "input", sid: "val-1-edad", match: "^27$" }, hint: "Fila de Jorge, columna Edad.", explain: "Los valores se guardan automáticamente." }
      ] },
      { type: "classify", title: "¿Speaker o Document?", prompt: "Decide si cada característica describe a una persona hablante o a un documento.", categories: ["Speaker", "Document"], items: [
        { text: "País de origen", cat: "Speaker" }, { text: "Tipo de fuente (entrevista, informe, nota de campo)", cat: "Document" }, { text: "Tiempo en México", cat: "Speaker" }, { text: "Año de publicación", cat: "Document" }, { text: "Organización que elaboró el informe", cat: "Document" }, { text: "Viaja con hijos", cat: "Speaker" }
      ], explain: "Las características de hablante sirven para comparar voces. Las de documento sirven para comparar fuentes, por ejemplo entrevistas frente a informes institucionales." },
      { type: "quiz", q: "Ya tienes en un CSV la edad, el país y la situación migratoria de 20 participantes. ¿Qué te conviene?", options: ["Capturar todo a mano en Values", "Usar Import from Excel, elegir Respondent, indicar la columna con el nombre como clave de coincidencia y revisar las coincidencias", "Subir el CSV con Add Files como si fuera una encuesta", "Pegar los datos en la descripción del proyecto"], answer: 1, explain: "La importación tiene cinco pasos (Upload, Identify, Match, Characteristics, Complete). Es distinta de subir una encuesta para analizar, porque aquí solo cargas metadatos." }
    ]
  },
  {
    id: "m4",
    title: "Gestionar el proyecto",
    badge: "Orden en el fichero",
    goal: "Moverte por el Dashboard y el espacio del proyecto, usar las tarjetas de documento y compartir con tu equipo.",
    steps: [
      { type: "brief", title: "Dashboard y espacio de proyecto", html: `
        <p>El <b>Dashboard</b> muestra tus proyectos con el número de documentos y análisis. Desde el menú de tres puntos de cada proyecto puedes abrirlo, cambiarle el nombre, compartirlo o borrarlo.</p>
        <p>Dentro del proyecto, cada archivo aparece como una <b>tarjeta de documento</b>. Su menú de tres puntos ofrece Preview, Rename y See Speakers. Las transcripciones hechas en QInsights añaden Edit. Si el botón Summary de un Word o PDF aparece desvanecido, no se generó el resumen al importar, y lo mejor es borrar el archivo y volver a subirlo.</p>
        <p>Al compartir, tu colega puede ver el archivo de análisis, hacer análisis nuevos y trabajar con los datos, pero no puede borrar documentos.</p>` },
      { type: "sim", title: "Recorre el proyecto", intro: "Practica las acciones básicas en el proyecto de entrevistas.", beats: [
        { screen: "dashboard", p: {}, say: "Abre el menú de opciones del proyecto de entrevistas.", act: { kind: "click", sid: "proj-menu-0" }, hint: "Los tres puntos en la esquina de la primera tarjeta." },
        { screen: "dashboard", p: { menuOpen: 0 }, say: "Abre el proyecto.", act: { kind: "click", sid: "proj-open" }, hint: "\"Open Project\"." },
        { screen: "workspace", p: {}, say: "Revisa qué hablantes se detectaron en la entrevista de Jorge. Abre el menú de su tarjeta.", act: { kind: "click", sid: "doc-menu-1" }, hint: "Tres puntos en la tarjeta de E02_Jorge.docx." },
        { screen: "workspace", p: { menuOpen: 1 }, say: "Elige la opción para ver hablantes.", act: { kind: "click", sid: "doc-speakers" }, hint: "\"See Speakers\"." },
        { screen: "workspace", p: {}, say: "Ordena los documentos por nombre. Abre el menú de orden.", act: { kind: "click", sid: "sort" }, hint: "Botón Sort, a la derecha." },
        { screen: "workspace", p: { sortMenu: true }, say: "Elige orden alfabético.", act: { kind: "click", sid: "sort-name" }, hint: "\"Name (A-Z)\"." },
        { screen: "workspace", p: {}, say: "Comparte el proyecto con tu colega de investigación.", act: { kind: "click", sid: "share" }, hint: "\"Share Project\"." },
        { screen: "shareDialog", p: {}, say: "Escribe el correo de tu colega (cualquier correo válido) y confirma.", act: { kind: "input", sid: "share-email", match: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", submit: "share-confirm" }, hint: "Debe tener forma de correo, por ejemplo colega@uas.edu.mx.", explain: "La persona recibe un correo. Debe usar el mismo correo de su cuenta de QInsights." }
      ] },
      { type: "quiz", q: "Compartiste el proyecto con un colega. ¿Qué NO puede hacer?", options: ["Ver los análisis guardados en el archivo", "Hacer análisis nuevos", "Borrar documentos del proyecto", "Trabajar con los datos como tú"], answer: 2, explain: "Para proteger la integridad del conjunto de datos, las personas invitadas no pueden borrar documentos." }
    ]
  },
  {
    id: "m5",
    title: "Seleccionar y filtrar",
    badge: "Filtro fino",
    goal: "Elegir qué documentos entran a un análisis, usar filtros por perfil y entender por qué trabajar con subconjuntos.",
    steps: [
      { type: "brief", title: "Elegir qué se analiza", html: `
        <p>Para analizar hay que seleccionar documentos. Puedes marcarlos uno por uno con la casilla de cada tarjeta, usar <b>Select All</b> o aplicar un <b>filtro</b>. En proyectos de diez o más documentos los filtros suelen ser más cómodos.</p>
        <p>Los filtros usan las características de Data Context. Hay filtros de documento y de hablante (<i>Respondent Filters</i>). Mientras un filtro está activo se ve arriba de la lista y en cada análisis que hagas.</p>
        <p>No necesitas filtros para preguntar por diferencias entre grupos, porque Q ya conoce los perfiles. Los filtros sirven para reducir el alcance. Con mucho material a la vez, las respuestas se vuelven generales y las voces minoritarias se pierden.</p>` },
      { type: "sim", title: "Filtra por mujeres hondureñas", intro: "Quieres analizar solo las respuestas de mujeres de Honduras en la encuesta.", beats: [
        { screen: "workspace", p: { project: "B" }, say: "Abre el menú de filtros.", act: { kind: "click", sid: "filter" }, hint: "Botón Filters, a la derecha." },
        { screen: "workspace", p: { project: "B", filterMenu: true }, say: "Elige filtros de hablante.", act: { kind: "click", sid: "resp-filter" }, hint: "\"Respondent Filters\"." },
        { screen: "filterDialog", p: {}, say: "Selecciona Mujer y Honduras, y aplica.", act: { kind: "multi", submit: "apply", items: [
          { sid: "fv-gen-mujer", kind: "toggle", value: true }, { sid: "fv-gen-hombre", kind: "toggle", value: false }, { sid: "fv-pais-hn", kind: "toggle", value: true }
        ] }, hint: "Haz clic en los valores para activarlos y luego en Apply." },
        { screen: "workspace", p: { project: "B", filter: "Genero = Mujer, Pais_origen = Honduras" }, say: "El filtro está activo. Selecciona el archivo de la encuesta marcando su casilla.", act: { kind: "click", sid: "doc-check-0" }, hint: "La casilla está en la esquina superior izquierda de la tarjeta." },
        { screen: "workspace", p: { project: "B", filter: "Genero = Mujer, Pais_origen = Honduras", selected: [0] }, say: "Ahora sí, abre las opciones de análisis.", act: { kind: "click", sid: "analyse" }, hint: "Botón azul Analyse." },
        { screen: "columnSelect", p: {}, say: "Como es un Excel, elige qué columnas analizar. Marca ID_caso y P3_Apoyos_recibidos y confirma.", act: { kind: "multi", submit: "col-select", items: [
          { sid: "col-0", kind: "check", value: true }, { sid: "col-1", kind: "check", value: false }, { sid: "col-2", kind: "check", value: false }, { sid: "col-3", kind: "check", value: true }
        ] }, hint: "Dos casillas, la primera y la última.", explain: "Incluir ID_caso permite pedir citas con el número de caso como referencia. Analizar todas las preguntas abiertas juntas rara vez tiene sentido." }
      ] },
      { type: "quiz", q: "Para quitar el filtro anterior, ¿qué haces?", options: ["Borro el archivo y lo vuelvo a subir", "Abro Filters y elijo Remove respondent filter", "Cierro sesión", "Edito la descripción del proyecto"], answer: 1, explain: "En el menú Filters solo está activa la opción de quitar el tipo de filtro que aplicaste." },
      { type: "quiz", q: "Tu proyecto tiene 60 entrevistas a migrantes, personal de albergues y funcionarios. ¿Qué estrategia recomienda la documentación?", options: ["Analizar siempre las 60 juntas para no perder nada", "Trabajar con subconjuntos con sentido analítico (por grupo de actores), hacer las mismas preguntas en cada uno y después contrastar con el conjunto completo", "Elegir 5 entrevistas al azar", "Analizar solo las más largas"], answer: 1, explain: "El conjunto completo da una síntesis amplia pero favorece los patrones dominantes. Los subconjuntos elegidos por razones analíticas dan detalle y comparaciones más claras." }
    ]
  },
  {
    id: "m6",
    title: "Topic Analysis",
    badge: "Mapa de temas",
    goal: "Obtener un primer mapa de temas, revisar su prevalencia y seguir cada tema hasta las citas del material.",
    steps: [
      { type: "brief", title: "Qué hace Topic Analysis", html: `
        <p><b>Topic Analysis</b> revisa el material seleccionado y agrupa el contenido en temas (entre 2 y 10), cada uno con título, descripción y referencias. Funciona con Word, PDF y Excel.</p>
        <p>Con <b>Show more Details</b> ves la prevalencia, la cobertura por archivo y las citas. Al hacer clic en el nombre de un documento se abre una vista previa con los pasajes resaltados en amarillo. Esos resaltados indican dónde mirar, no son segmentos codificados.</p>
        <p>Los temas son un lugar para empezar, no un análisis terminado. Espera temas amplios o que se traslapan, y decide cuáles conservar, dividir o descartar. El botón <b>Q</b> abre un chat de seguimiento ligado a ese análisis.</p>` },
      { type: "video", title: "Topic Analysis paso a paso", youtube: "" },
      { type: "sim", title: "Corre tu primer mapa de temas", intro: "Analiza las tres entrevistas transcritas.", beats: [
        { screen: "workspace", p: { ndocs: 3 }, say: "Selecciona todos los documentos visibles.", act: { kind: "click", sid: "select-all" }, hint: "\"Select All\", a la derecha." },
        { screen: "workspace", p: { ndocs: 3, selected: [0, 1, 2] }, say: "Abre las opciones de análisis.", act: { kind: "click", sid: "analyse" }, hint: "Botón azul Analyse." },
        { screen: "analyseMenu", p: { n: 3 }, say: "Elige el análisis que da un panorama de temas.", act: { kind: "click", sid: "an-topic" }, hint: "\"Topic Analysis\"." },
        { screen: "topicResult", p: {}, say: "El tema de la espera te llama la atención. Abre sus detalles.", act: { kind: "click", sid: "details-2" }, hint: "\"Show more Details\" en la tarjeta \"Espera e incertidumbre por trámites\"." },
        { screen: "topicResult", p: { open: 2 }, say: "Revisa las citas. Ahora abre los detalles del tema de redes de apoyo.", act: { kind: "click", sid: "details-0" }, hint: "Primera tarjeta." },
        { screen: "topicResult", p: { open: 0 }, say: "Abre la cita de Jorge en su documento para verla en contexto.", act: { kind: "click", sid: "ref-0-1" }, hint: "Haz clic en el enlace E02_Jorge.docx debajo de la cita." },
        { screen: "docPreview", p: {}, say: "Los pasajes citados están en amarillo. Salta al siguiente resaltado.", act: { kind: "click", sid: "hl-down" }, hint: "Botón Down.", explain: "Leer la cita en su contexto es la manera de comprobar que el tema dice lo que el material dice." },
        { screen: "topicResult", p: { open: 0 }, say: "Quieres preguntar más sobre las redes de apoyo. Abre el chat de seguimiento.", act: { kind: "click", sid: "q-btn" }, hint: "El botón redondo Q, abajo a la izquierda.", explain: "El chat de seguimiento queda vinculado a este Topic Analysis en el archivo." }
      ] },
      { type: "evidence", title: "Revisa las afirmaciones de Q", prompt: "Q propuso estas afirmaciones a partir del tema \"Redes de apoyo durante el trayecto\". Lee la cita y decide si la respalda.", items: [
        { claim: "Jorge atribuye a su primo haber podido terminar el trayecto.", quote: "Mi primo me mandó dinero cuando me quedé sin nada. Sin él no llego.", doc: "E02_Jorge.docx", answer: "Respaldada", explain: "La cita lo dice de forma directa." },
        { claim: "Todas las personas entrevistadas recibieron apoyo de albergues.", quote: "Mi primo me mandó dinero cuando me quedé sin nada. Sin él no llego.", doc: "E02_Jorge.docx", answer: "No respaldada", explain: "Jorge no menciona albergues, su apoyo fue familiar. La afirmación generaliza más allá de la evidencia." },
        { claim: "Yesenia encontró en la iglesia orientación sobre trámites y una red de mujeres.", quote: "En la iglesia conocí a otras mujeres que ya tenían sus papeles y me explicaron cómo hacerle.", doc: "E03_Yesenia.docx", answer: "Respaldada", explain: "La cita menciona a las mujeres y la explicación de cómo hacer los trámites." },
        { claim: "Marisol desconfía de las instituciones mexicanas.", quote: "Una señora nos dijo que aquí nos recibían, si no, nos quedábamos en la calle.", doc: "E01_Marisol.docx", answer: "No respaldada", explain: "La cita habla de una orientación recibida, no de desconfianza. Q puede inferir de más, por eso se lee la fuente." },
        { claim: "Las mujeres reciben más apoyo comunitario que los hombres.", quote: "Tres entrevistas, dos mujeres y un hombre.", doc: "Conjunto de datos", answer: "Parcial", explain: "Hay una diferencia en estos tres casos, pero con tres entrevistas no se puede afirmar como patrón por género. Es una pista para indagar, no un hallazgo." }
      ] }
    ]
  },
  {
    id: "m7",
    title: "Conversational Analysis",
    badge: "Conversación con los datos",
    goal: "Hacer preguntas propias al material, seguir las referencias, pedir visualizaciones y guardar la conversación.",
    steps: [
      { type: "brief", title: "Cómo funciona la conversación", html: `
        <p>En <b>Conversational Analysis</b> haces preguntas abiertas y Q recupera y analiza el material relevante. Bajo cada respuesta aparecen los nombres de los documentos citados, que abren el pasaje resaltado.</p>
        <p>Q responde en el idioma de tu pregunta. Puedes pedir gráficas en lenguaje natural y gestionarlas desde su menú de tres puntos. Hay entrada por voz (solo inglés y alemán, en Chrome).</p>
        <p>La barra superior tiene Active Filters, Select All, Download, Clear chat, Save y Close. <b>Clear chat</b> borra toda la conversación, así que guarda antes con <b>Save</b>.</p>` },
      { type: "sim", title: "Conversa con las entrevistas", intro: "Tienes seleccionadas las tres entrevistas.", beats: [
        { screen: "analyseMenu", p: { n: 3 }, say: "Elige el análisis abierto basado en preguntas.", act: { kind: "click", sid: "an-conv" }, hint: "\"Conversational Analysis\"." },
        { screen: "chat", p: {}, say: "Haz una pregunta descriptiva sobre los apoyos (por ejemplo \"¿Qué tipos de apoyo mencionan las personas entrevistadas?\") y pulsa Run.", act: { kind: "input", sid: "chat-input", min: 15, match: "apoy", submit: "run" }, hint: "Tu pregunta debe mencionar el apoyo o los apoyos.", explain: "Las preguntas descriptivas son el mejor arranque. Las relacionales y causales llegan después." },
        { screen: "chat", p: { msgs: [{ q: "¿Qué tipos de apoyo mencionan las personas entrevistadas?" }, { a: "Aparecen tres tipos de apoyo. <b>Institucional</b>, en el albergue que recibió a Marisol y sus hijos. <b>Familiar</b>, en el primo de Jorge que le envió dinero y le consiguió trabajo. <b>Comunitario</b>, en el grupo de mujeres de la iglesia que orientó a Yesenia.", refs: ["E01_Marisol.docx", "E02_Jorge.docx", "E03_Yesenia.docx"] }] }, say: "Verifica la afirmación sobre Yesenia. Abre su referencia.", act: { kind: "click", sid: "cref-2" }, hint: "El enlace E03_Yesenia.docx debajo de la respuesta." },
        { screen: "chat", p: { msgs: [{ q: "¿Qué tipos de apoyo mencionan las personas entrevistadas?" }, { a: "Aparecen tres tipos de apoyo. <b>Institucional</b>, <b>familiar</b> y <b>comunitario</b>.", refs: ["E01_Marisol.docx", "E02_Jorge.docx", "E03_Yesenia.docx"] }] }, say: "Pide una visualización. Escribe algo como \"Haz una tabla de qué tipo de apoyo recibió cada persona\" y pulsa Run.", act: { kind: "input", sid: "chat-input", min: 12, match: "tabla|gráfic|grafic|diagrama|visual", submit: "run" }, hint: "Pide una tabla, gráfica o diagrama." },
        { screen: "chat", p: { msgs: [{ q: "¿Qué tipos de apoyo mencionan?" }, { a: "Aparecen tres tipos de apoyo.", refs: ["E01_Marisol.docx"] }, { q: "Haz una tabla de qué tipo de apoyo recibió cada persona" }, { a: "<table class='qi-table'><tr><th></th><th>Institucional</th><th>Familiar</th><th>Comunitario</th></tr><tr><td>Marisol</td><td>X</td><td></td><td></td></tr><tr><td>Jorge</td><td></td><td>X</td><td></td></tr><tr><td>Yesenia</td><td></td><td></td><td>X</td></tr></table>" }] }, say: "Guarda la conversación en el archivo de análisis.", act: { kind: "click", sid: "save" }, hint: "Botón Save en la barra superior." },
        { screen: "chat", p: { saveMenu: true, msgs: [{ q: "Tabla de apoyos por persona" }, { a: "Tabla creada." }] }, say: "Elige guardar con nombre.", act: { kind: "click", sid: "save-as" }, hint: "\"Save as\"." },
        { screen: "chat", p: { saveName: "", msgs: [{ q: "Tabla de apoyos por persona" }, { a: "Tabla creada." }] }, say: "Ponle un nombre que puedas reconocer después y guarda.", act: { kind: "input", sid: "save-name", min: 6, submit: "save-ok" }, hint: "Por ejemplo \"PI1 Tipos de apoyo\".", explain: "Nombres consistentes (por pregunta de investigación o subconjunto) mantienen ordenado el archivo." }
      ] },
      { type: "sort", title: "Ordena la conversación", prompt: "Ordena estas preguntas como avanzaría una exploración inductiva, de lo descriptivo a lo conceptual.", items: [
        "¿Qué dificultades describen durante el trayecto?",
        "¿Hay diferencias entre quienes viajan con hijos y quienes viajan solos?",
        "Agrupa las dificultades bajo etiquetas de mayor nivel, como riesgo físico o precariedad económica.",
        "¿Cómo se relacionan esas categorías con las redes de apoyo que mencionan?"
      ], explain: "Primero se describe, luego se compara por grupos, después se agrupa en categorías de mayor nivel y al final se relacionan conceptos." }
    ]
  },
  {
    id: "m8",
    title: "Guided Conversational Analysis",
    badge: "Ruta guiada",
    goal: "Profundizar en un tema con preguntas que propone Q y cerrar con una síntesis.",
    steps: [
      { type: "brief", title: "Un tema por conversación", html: `
        <p>En el análisis guiado, Q te pregunta qué tema quieres explorar y te propone cuatro preguntas analíticas. Al elegir una, se coloca en el campo de consulta y la ejecutas con <b>Run</b>.</p>
        <p>Bajo cada respuesta reaparecen las preguntas no usadas, más opciones de síntesis. <i>Case-based summaries</i> y <i>Create an overview table</i> funcionan mejor con uno a seis documentos. <i>Synthesis of key insights</i> y <i>Similarities and differences</i> sirven para conjuntos más grandes. Cuando sientas el tema saturado, pulsa <b>Wrap Up</b>.</p>
        <p>Conviene hacer primero un Topic Analysis para elegir el tema. Si las preguntas de seguimiento de Q te desvían, anótalas para otra conversación y regresa a tu foco.</p>` },
      { type: "sim", title: "Explora la espera", intro: "El Topic Analysis mostró el tema de la espera. Ahora vas a profundizar.", beats: [
        { screen: "analyseMenu", p: { n: 3 }, say: "Elige el análisis guiado.", act: { kind: "click", sid: "an-guided" }, hint: "\"Guided Conversational Analysis\"." },
        { screen: "guided", p: {}, say: "Escribe el tema de forma específica (debe incluir la palabra espera) y pulsa Run.", act: { kind: "input", sid: "guided-input", min: 15, match: "espera", submit: "run" }, hint: "Por ejemplo \"La espera de citas y documentos y cómo la viven\"." },
        { screen: "guided", p: { topic: "La espera de citas y documentos y cómo la viven", questions: ["¿Qué emociones asocian las personas con la espera?", "¿Qué actividades realizan mientras esperan?", "¿Qué diferencias hay entre quienes esperan en albergue y quienes ya tienen vivienda?", "¿Cómo influye la espera en sus planes a futuro?"] }, say: "Elige la pregunta sobre las actividades mientras esperan.", act: { kind: "click", sid: "gq-1" }, hint: "La segunda sugerencia." },
        { screen: "guided", p: { value: "¿Qué actividades realizan mientras esperan?", topic: "La espera de citas y documentos y cómo la viven", questions: ["¿Qué emociones asocian las personas con la espera?", "¿Qué actividades realizan mientras esperan?", "¿Qué diferencias hay entre quienes esperan en albergue y quienes ya tienen vivienda?", "¿Cómo influye la espera en sus planes a futuro?"] }, say: "La pregunta ya está en el campo. Ejecútala.", act: { kind: "click", sid: "run" }, hint: "Botón Run." },
        { screen: "guided", p: { topic: "La espera de citas y documentos y cómo la viven", answer: "Marisol revisa a diario la aplicación de citas y describe la espera como angustia. Yesenia la resignifica como tiempo para aprender a vender tamales y organizarse. Jorge apenas habla de espera porque se insertó rápido al trabajo." }, say: "Con tres entrevistas, pide resúmenes por caso.", act: { kind: "click", sid: "syn-0" }, hint: "\"Case-based summaries\"." },
        { screen: "guided", p: { topic: "La espera de citas y documentos y cómo la viven", answer: "Resúmenes por caso generados." }, say: "El tema está saturado. Cierra la conversación.", act: { kind: "click", sid: "wrap" }, hint: "\"Wrap Up\".", explain: "Q propone un nombre para el chat y te recuerda guardarlo en el archivo." }
      ] },
      { type: "quiz", q: "Durante el análisis guiado, Q sugiere una pregunta interesante sobre la salud mental en el trayecto, que no es tu tema. ¿Qué te recomienda la documentación?", options: ["Seguirla de inmediato, Q sabe lo que conviene", "Anotarla para explorarla en otro chat y mantener el foco en la espera", "Cerrar el análisis y empezar de cero", "Pedirle a Q que cambie de tema por su cuenta"], answer: 1, explain: "Cada chat guiado trabaja un tema. Las rutas laterales se guardan para otra conversación." }
    ]
  },
  {
    id: "m9",
    title: "Grid Analysis",
    badge: "Caso por caso",
    goal: "Comparar lo que dijo cada participante sobre una pregunta y exportar la matriz.",
    steps: [
      { type: "brief", title: "Resultados por participante", html: `
        <p><b>Grid Analysis</b> muestra los resultados caso por caso. Haces una pregunta y obtienes un resumen general (<i>Overview</i>) y una fila por participante, cada una con sus referencias. Funciona solo con Word y PDF.</p>
        <p>Es útil cuando la perspectiva de cada persona debe seguir visible. Empieza con preguntas descriptivas, por ejemplo las de tu guion de entrevista. Las preguntas relacionales o comparativas no encajan, porque la respuesta no se puede atribuir a una sola persona.</p>
        <p>Cada pregunta nueva va en una pestaña nueva (botón +). Al final puedes descargar en Word o en Excel, con la pestaña actual o toda la sesión.</p>` },
      { type: "sim", title: "Arma una matriz de apoyos", intro: "Ya seleccionaste las tres entrevistas.", beats: [
        { screen: "analyseMenu", p: { n: 3 }, say: "Elige el análisis caso por caso.", act: { kind: "click", sid: "an-grid" }, hint: "\"Grid Analysis\"." },
        { screen: "gridStart", p: {}, say: "Crea una matriz nueva con el nombre \"Apoyos recibidos\" y continúa.", act: { kind: "input", sid: "grid-name", min: 5, submit: "continue" }, hint: "Escribe el nombre y pulsa Continue." },
        { screen: "grid", p: {}, say: "Escribe la pregunta \"¿Qué apoyos recibió durante el trayecto y a su llegada?\" y pulsa Ask Question.", act: { kind: "input", sid: "grid-q", min: 12, match: "apoy", submit: "ask" }, hint: "La pregunta debe tratar de los apoyos." },
        { screen: "grid", p: { answered: true }, say: "Revisa la fila de Jorge contra su fuente. Abre sus referencias.", act: { kind: "click", sid: "grid-ref-1" }, hint: "Botón References en la fila de Jorge." },
        { screen: "grid", p: { answered: true }, say: "Añade una pestaña para la siguiente pregunta del guion.", act: { kind: "click", sid: "grid-plus" }, hint: "El botón + junto a la pestaña." },
        { screen: "grid", p: { answered: true, tabs: ["Apoyos recibidos", "Nueva pestaña"] }, say: "Descarga el análisis.", act: { kind: "click", sid: "grid-dl" }, hint: "Botón Download." },
        { screen: "grid", p: { answered: true, dl: true, tabs: ["Apoyos recibidos", "Nueva pestaña"] }, say: "Elige Excel para seguir trabajando la matriz.", act: { kind: "click", sid: "dl-xlsx" }, hint: "\"Excel Spreadsheet (.xlsx)\"." },
        { screen: "grid", p: { answered: true, dl: "xlsx", tabs: ["Apoyos recibidos", "Nueva pestaña"] }, say: "Descarga todas las pestañas de la sesión.", act: { kind: "click", sid: "dl-full" }, hint: "\"Full Session\".", explain: "La matriz en Excel se puede llevar a QualCoder como atributos o a una tabla de casos para el informe." }
      ] },
      { type: "classify", title: "¿Sirve para Grid?", prompt: "Decide si cada pregunta funciona bien en Grid Analysis.", categories: ["Funciona en Grid", "Mejor en otro análisis"], items: [
        { text: "¿Qué motivo de salida menciona la persona?", cat: "Funciona en Grid" },
        { text: "¿Con quién viajó?", cat: "Funciona en Grid" },
        { text: "¿Cómo se relaciona el miedo con el uso de redes de apoyo en todo el grupo?", cat: "Mejor en otro análisis" },
        { text: "¿Qué espera hacer en los próximos meses?", cat: "Funciona en Grid" },
        { text: "¿En qué se parecen y diferencian los relatos de hombres y mujeres?", cat: "Mejor en otro análisis" }
      ], explain: "Las preguntas que cada persona puede responder por sí misma funcionan en Grid. Las relacionales y comparativas van mejor en Conversational Analysis." }
    ]
  },
  {
    id: "m10",
    title: "Sentiment Analysis",
    badge: "Termómetro",
    goal: "Clasificar respuestas abiertas de una encuesta según categorías evaluativas que tú defines.",
    steps: [
      { type: "brief", title: "Categorías que defines tú", html: `
        <p><b>Sentiment Analysis</b> trabaja con Excel, una columna a la vez, y clasifica cada respuesta según las categorías que tú escribes. No tienes que limitarte a positivo, negativo o neutral. Puedes definir, por ejemplo, confianza, desconfianza e indiferencia hacia las instituciones.</p>
        <p>El resultado incluye una gráfica de pastel, un resumen de IA editable con <b>View AI Summary</b> y una tabla con respuesta, categoría y razón, exportable a Excel.</p>
        <p>Pocas categorías con contraste claro funcionan mejor. Si usas un marco formal, pon las definiciones en la descripción del proyecto. Para Word o PDF no existe esta opción, pero puedes pedir una clasificación similar en Conversational Analysis.</p>` },
      { type: "sim", title: "Mide la confianza en P3", intro: "Proyecto de la encuesta, con la columna P3_Apoyos_recibidos seleccionada.", beats: [
        { screen: "analyseMenu", p: { excel: true, n: 1 }, say: "Elige el análisis de sentimiento.", act: { kind: "click", sid: "an-sent" }, hint: "\"Sentiment Analysis\"." },
        { screen: "sentiment", p: {}, say: "Escribe tres categorías con contraste claro sobre la confianza en las instituciones y pulsa Run.", act: { kind: "input", sid: "sent-cats", min: 10, match: "confianza", submit: "sent-run" }, hint: "Por ejemplo \"Confianza, desconfianza, indiferencia\"." },
        { screen: "sentiment", p: { result: true }, say: "Revisa el resumen que redactó la IA.", act: { kind: "click", sid: "ai-summary" }, hint: "\"View AI Summary\"." },
        { screen: "sentiment", p: { result: true }, say: "Lee la tabla. Ahora haz una pregunta de seguimiento sobre los subgrupos con el botón Q.", act: { kind: "click", sid: "q-btn" }, hint: "Botón redondo Q.", explain: "Para comparar subgrupos (por ejemplo por país o por tener hijos) conviene el chat de seguimiento." }
      ] },
      { type: "classify", title: "Revisa la clasificación", prompt: "Antes de confiar en la gráfica, revisa algunas filas. ¿Qué categoría asignarías tú?", categories: ["Confianza", "Desconfianza", "Indiferencia"], items: [
        { text: "C001 \"En el albergue me dieron comida y asesoría legal, ahí sí confío.\"", cat: "Confianza" },
        { text: "C002 \"Las oficinas nomás te dan papeles, nadie te explica nada.\"", cat: "Desconfianza" },
        { text: "C003 \"La iglesia nos apoyó con ropa. Del gobierno no espero mucho.\"", cat: "Desconfianza" },
        { text: "C006 \"Me da igual quién ayude, lo que quiero es trabajar.\"", cat: "Indiferencia" }
      ], explain: "C003 es un caso mixto, confía en la iglesia y desconfía del gobierno. Revisar la columna de razones ayuda a decidir si tus categorías necesitan definirse mejor." }
    ]
  },
  {
    id: "m11",
    title: "Analysis Archive",
    badge: "Archivista",
    goal: "Organizar los análisis guardados en carpetas y volver a ellos con chats de seguimiento.",
    steps: [
      { type: "brief", title: "Cómo se organiza el archivo", html: `
        <p>El <b>Analysis Archive</b> está en el menú del proyecto, en Analysis y luego Archive. Muestra cada análisis con fecha, tipo, nombre y número de archivos incluidos.</p>
        <p>Hay vista de lista y vista de carpetas. Arrastras un análisis a una carpeta para ordenarlo, y cada análisis solo puede estar en una carpeta. Los Topic Analysis se nombran solos (Topic_1, Topic_2...), así que conviene renombrarlos.</p>
        <p>Los análisis de tipo Topic, Grid y Sentiment pueden tener chats de seguimiento, que se despliegan con la flecha junto al nombre. Antes de repetir un análisis, considera continuar con un seguimiento.</p>` },
      { type: "sim", title: "Ordena el archivo", intro: "En este simulador, para mover un análisis a una carpeta haces clic en el análisis y luego en la carpeta (en la plataforma se arrastra).", beats: [
        { screen: "workspace", p: {}, say: "Abre el archivo de análisis desde la barra lateral.", act: { kind: "click", sid: "archive" }, hint: "Debajo de Analysis, en el menú del proyecto." },
        { screen: "archive", p: {}, say: "Crea una carpeta para tu primera pregunta de investigación.", act: { kind: "click", sid: "new-folder" }, hint: "\"New folder\"." },
        { screen: "archive", p: { naming: true }, say: "Nómbrala \"PI1 Redes de apoyo\" y créala.", act: { kind: "input", sid: "folder-name", min: 4, submit: "folder-ok" }, hint: "Escribe el nombre y pulsa Create." },
        { screen: "archive", p: { folders: [{ name: "PI1 Redes de apoyo" }] }, say: "Selecciona el análisis de la matriz de apoyos.", act: { kind: "click", sid: "arc-row-2" }, hint: "La fila \"Apoyos recibidos\" (Grid Analysis)." },
        { screen: "archive", p: { folders: [{ name: "PI1 Redes de apoyo" }], picked: 2 }, say: "Muévelo a la carpeta.", act: { kind: "click", sid: "folder-0" }, hint: "Haz clic en la carpeta PI1 Redes de apoyo." },
        { screen: "archive", p: { folders: [{ name: "PI1 Redes de apoyo", n: 1 }], items: [{ t: "Topic Analysis", n: "Topic_1", f: 3, follow: true }, { t: "Conversational Analysis", n: "Redes de apoyo por país", f: 3 }, { t: "Grid Analysis", n: "Apoyos recibidos", f: 3, inFolder: true }, { t: "Sentiment Analysis", n: "P3 confianza", f: 1 }] }, say: "Despliega los chats de seguimiento del Topic Analysis.", act: { kind: "click", sid: "arc-expand-0" }, hint: "La flecha a la izquierda de Topic_1." },
        { screen: "archive", p: { expanded: 0, folders: [{ name: "PI1 Redes de apoyo", n: 1 }] }, say: "Revisa qué documentos entraron en ese Topic Analysis.", act: { kind: "click", sid: "arc-files-0" }, hint: "El número en la columna Files.", explain: "Saber qué archivos entraron en cada análisis es clave para reportar el procedimiento con transparencia." }
      ] },
      { type: "quiz", q: "Hiciste el mismo Topic Analysis con tres subconjuntos (mujeres, hombres y personal de albergue). ¿Qué práctica te ayuda más en el archivo?", options: ["Dejar Topic_1, Topic_2 y Topic_3", "Renombrarlos con un patrón consistente, por ejemplo \"Topic PI1 mujeres\", \"Topic PI1 hombres\"", "Borrar los dos primeros", "Meter cada uno en tres carpetas distintas a la vez"], answer: 1, explain: "Como la lista se ordena alfabéticamente, un patrón consistente mantiene juntos los análisis relacionados. Además, un análisis solo puede estar en una carpeta." }
    ]
  },
  {
    id: "m12",
    title: "Desafío final, dialogar con Q",
    badge: "Colega de Q",
    goal: "Elegir el análisis adecuado para cada pregunta y conducir a Q con estrategias inductivas, deductivas y abductivas.",
    steps: [
      { type: "brief", title: "Tres maneras de preguntar", html: `
        <p>La calidad del análisis depende de cómo preguntas. La documentación propone tres caminos.</p>
        <p><b>Inductivo</b>, de lo descriptivo a lo conceptual. Empiezas con un subconjunto pequeño, preguntas qué aparece, comparas grupos, agrupas en etiquetas de mayor nivel y relacionas conceptos.</p>
        <p><b>Deductivo</b>, de lo conceptual a lo descriptivo. Llevas conceptos o hipótesis definidos y preguntas si aparecen en el material, con ejemplos. Antes de usar una teoría, comprueba que Q la conoce o descríbela tú.</p>
        <p><b>Abductivo</b>, para explicar lo inesperado. Cuando algo sorprende o se contradice, pides a Q hipótesis posibles y las contrastas con otros subconjuntos.</p>
        <p>Si eres principiante, puedes decirle a Q que eres nuevo y pedirle preguntas para empezar. Cuando preguntas algo ajeno a tus datos, Q responde con conocimiento general del modelo, no con tu material.</p>` },
      { type: "video", title: "Estrategias para dialogar con Q", youtube: "" },
      { type: "picker", title: "Elige el análisis", prompt: "Para cada situación, elige la opción de análisis más adecuada.", options: ["Topic Analysis", "Grid Analysis", "Conversational Analysis", "Guided Conversational Analysis", "Sentiment Analysis"], items: [
        { q: "Acabas de subir 12 entrevistas y quieres una primera vista de qué temas aparecen.", answer: "Topic Analysis", explain: "Da un mapa inicial con prevalencia y referencias." },
        { q: "Quieres ver qué respondió cada persona sobre su motivo de salida, sin perder la voz individual.", answer: "Grid Analysis", explain: "Muestra un resumen por caso." },
        { q: "En la encuesta, quieres clasificar P3 en confianza, desconfianza e indiferencia.", answer: "Sentiment Analysis", explain: "Clasifica respuestas abiertas de Excel con tus propias categorías." },
        { q: "Eres nueva en el análisis cualitativo y quieres profundizar en el tema de la espera con preguntas sugeridas.", answer: "Guided Conversational Analysis", explain: "Q propone preguntas y opciones de síntesis paso a paso." },
        { q: "Quieres explorar cómo se relacionan el miedo y las redes de apoyo en todas las entrevistas, con tus propias preguntas de seguimiento.", answer: "Conversational Analysis", explain: "Las preguntas relacionales y abiertas van mejor en la conversación libre." },
        { q: "Quieres comparar los temas del informe del albergue con los de una encuesta en Excel en un mismo análisis.", answer: "Conversational Analysis", explain: "Esta tiene truco, porque Excel no se puede combinar con Word o PDF en un mismo análisis. Tendrías que analizar por separado y luego subir los resultados exportados como documentos para compararlos en Conversational o Grid." }
      ] },
      { type: "classify", title: "¿Qué estrategia es?", prompt: "Clasifica cada pregunta a Q según la estrategia que usa.", categories: ["Inductiva", "Deductiva", "Abductiva"], items: [
        { text: "¿Qué tipos de dificultades describen durante el trayecto?", cat: "Inductiva" },
        { text: "Según Woolcock, el capital social puede ser de vínculo (bonding), de puente (bridging) o de enlace (linking). ¿Cuáles aparecen en las entrevistas? Da ejemplos.", cat: "Deductiva" },
        { text: "Yesenia vive la espera como oportunidad y Marisol como angustia, aunque ambas esperan cita. ¿Qué podría explicar esa diferencia? Propón hipótesis.", cat: "Abductiva" },
        { text: "Agrupa los apoyos mencionados en categorías de mayor nivel.", cat: "Inductiva" },
        { text: "Comprueba si se cumple la hipótesis de que quienes viajan con hijos recurren más a albergues.", cat: "Deductiva" }
      ], explain: "Las tres estrategias se combinan. Lo inesperado que encuentras en lo inductivo abre la puerta a lo abductivo, y las hipótesis se validan en otros subconjuntos." },
      { type: "quiz", q: "¿Cuál de estas preguntas a Q es más útil?", options: ["\"¿Qué opinan?\"", "\"Dime todo lo importante.\"", "\"¿Qué apoyos mencionan las mujeres que viajan con hijos? Incluye una cita por persona con su referencia.\"", "\"¿Las personas migrantes son buenas o malas?\""], answer: 2, explain: "Es específica, delimita un subgrupo y pide evidencia citada. Las otras son vagas o introducen juicios que no son analíticos." },
      { type: "evidence", title: "Última revisión", prompt: "Q te entrega estas conclusiones para tu informe. Decide si están respaldadas por lo que viste en el curso.", items: [
        { claim: "Los apoyos provienen de tres fuentes, albergue, familia y grupo religioso.", quote: "Overview del Grid \"Apoyos recibidos\" con una fila por entrevista.", doc: "Grid Analysis", answer: "Respaldada", explain: "Cada fila del Grid lo sostiene con referencias." },
        { claim: "La espera produce angustia en todas las personas migrantes.", quote: "Esos meses de espera me sirvieron para aprender a hacer tamales y venderlos.", doc: "E03_Yesenia.docx", answer: "No respaldada", explain: "Yesenia contradice la generalización. Ese contraste es justo lo que vale la pena analizar." },
        { claim: "En la encuesta predomina la desconfianza hacia las instituciones de gobierno.", quote: "Sentiment de P3 con 42% confianza, 35% desconfianza, 23% indiferencia, y varias respuestas mixtas.", doc: "Sentiment Analysis", answer: "Parcial", explain: "La confianza aparece sobre todo hacia albergues y organizaciones. La desconfianza se dirige al gobierno. Hay que separar el objeto de la confianza antes de concluir." }
      ] }
    ]
  }
];
