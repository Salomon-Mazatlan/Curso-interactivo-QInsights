// Simulated research data used across missions (fictional, for teaching only)
window.QDATA = {
  projectA: {
    name: "Migración y redes de apoyo en el noroeste de México",
    description: "Estudio cualitativo con personas migrantes que pasan o se establecen en ciudades del noroeste de México. Se realizaron entrevistas semiestructuradas sobre motivos de salida, experiencias en el trayecto, apoyos recibidos y expectativas. Las entrevistas fueron hechas por una entrevistadora del equipo en un albergue y en espacios comunitarios. Interesa conocer cómo se forman y se usan las redes de apoyo.",
    docs: [
      { name: "E01_Marisol.docx", kind: "docx", label: "Transcripción", summary: "Mujer de 34 años, Honduras, viaja con sus dos hijos. Habla del albergue, del miedo en el camino y de la espera de una cita." },
      { name: "E02_Jorge.docx", kind: "docx", label: "Transcripción", summary: "Hombre de 27 años, Guatemala, trabaja en la construcción. Describe la ayuda de un primo y el trabajo informal." },
      { name: "E03_Yesenia.docx", kind: "docx", label: "Transcripción", summary: "Mujer de 41 años, El Salvador, residente desde hace tres años. Relata la espera como tiempo para organizarse." },
      { name: "E04_Wilmer.mp3", kind: "mp3", label: "Audio", summary: "Entrevista grabada en audio, pendiente de revisar después de la transcripción." },
      { name: "Informe_albergue_2025.pdf", kind: "pdf", label: "Documento", summary: "Informe anual de un albergue con cifras de atención y servicios ofrecidos." }
    ]
  },
  projectB: {
    name: "Encuesta migración 2025",
    description: "Encuesta con preguntas abiertas aplicada a personas migrantes atendidas en albergues y organizaciones del noroeste de México. P1 pregunta por el motivo de salida, P2 por las dificultades del trayecto y P3 por los apoyos recibidos y la confianza en las instituciones.",
    docs: [
      { name: "encuesta_migracion.xlsx", kind: "xlsx", label: "Hoja de cálculo", summary: "100 casos, datos sociodemográficos y tres preguntas abiertas." }
    ],
    columns: [
      { name: "ID_caso", sample: "C001", variable: false, type: "Text", why: "Conviene tratar el identificador como texto de análisis, así Q puede citar el número de caso en sus respuestas." },
      { name: "Edad", sample: "34", variable: true, type: "Number", why: "Es una variable numérica que servirá para filtrar por rangos de edad." },
      { name: "Genero", sample: "Mujer", variable: true, type: "Text", why: "Es una categoría útil para comparar subgrupos." },
      { name: "Pais_origen", sample: "Honduras", variable: true, type: "Text", why: "Es una categoría útil para comparar subgrupos." },
      { name: "Tiene_hijos", sample: "Sí", variable: true, type: "Boolean", why: "Tiene solo dos estados posibles, por eso es Boolean." },
      { name: "P1_Motivo_salida", sample: "Por la violencia en mi colonia...", variable: false, type: "Text", why: "Es respuesta abierta, el material que se analiza." },
      { name: "P2_Dificultades_trayecto", sample: "Lo más difícil fue cruzar sin dinero...", variable: false, type: "Text", why: "Es respuesta abierta, el material que se analiza." },
      { name: "P3_Apoyos_recibidos", sample: "En el albergue me dieron comida y asesoría...", variable: false, type: "Text", why: "Es respuesta abierta, el material que se analiza." }
    ],
    rows: [
      { id: "C001", edad: 34, genero: "Mujer", pais: "Honduras", hijos: "Sí", p3: "En el albergue me dieron comida y asesoría legal, ahí sí confío." },
      { id: "C002", edad: 27, genero: "Hombre", pais: "Guatemala", hijos: "No", p3: "Las oficinas nomás te dan papeles, nadie te explica nada." },
      { id: "C003", edad: 41, genero: "Mujer", pais: "El Salvador", hijos: "Sí", p3: "La iglesia nos apoyó con ropa. Del gobierno no espero mucho." },
      { id: "C004", edad: 19, genero: "Hombre", pais: "Venezuela", hijos: "No", p3: "Unos paisanos me pasaron el contacto de un trabajo." },
      { id: "C005", edad: 36, genero: "Mujer", pais: "Honduras", hijos: "Sí", p3: "La abogada de la organización me ayudó con la cita, le tengo confianza." },
      { id: "C006", edad: 52, genero: "Hombre", pais: "Nicaragua", hijos: "Sí", p3: "Me da igual quién ayude, lo que quiero es trabajar." }
    ]
  },
  speakers: [
    { doc: "E01_Marisol.docx", id: "Speaker A", first: "Buenos días, gracias por aceptar la entrevista. ¿Me puede contar cómo llegó al albergue?", role: "Interviewer / Moderator" },
    { doc: "E01_Marisol.docx", id: "Speaker B", first: "Llegamos de noche, mis hijos ya no podían caminar. Una señora nos dijo que aquí nos recibían.", role: "Respondent" },
    { doc: "E01_Marisol.docx", id: "Speaker C", first: "Perdón, ¿aquí es la oficina de trabajo social? Ah, no, disculpen.", role: "Exclude" }
  ],
  transcript: [
    { spk: "Speaker A", t: "00:00", text: "Buenos días. ¿Me puede contar por qué decidió salir de su país?" },
    { spk: "Speaker B", t: "00:07", text: "Pues por el trabajo, allá no alcanzaba. Un primo me dijo que acá en la construcción siempre hay." },
    { spk: "Speaker A", t: "00:21", text: "¿Y cómo fue el camino hasta aquí?" },
    { spk: "Speaker B", t: "00:25", text: "Difícil, pero mi primo me mandó dinero cuando me quedé sin nada. Sin él no llego." }
  ],
  topics: [
    { title: "Redes de apoyo durante el trayecto", desc: "Las personas describen ayudas de familiares, paisanos, albergues e iglesias que hicieron posible continuar el viaje.", prev: 9, files: "3 de 3", refs: [
      { doc: "E01_Marisol.docx", quote: "Una señora nos dijo que aquí nos recibían, si no, nos quedábamos en la calle." },
      { doc: "E02_Jorge.docx", quote: "Mi primo me mandó dinero cuando me quedé sin nada. Sin él no llego." },
      { doc: "E03_Yesenia.docx", quote: "En la iglesia conocí a otras mujeres que ya tenían sus papeles y me explicaron cómo hacerle." }
    ] },
    { title: "Miedo y riesgos en el camino", desc: "Aparecen relatos de extorsión, robos y temor por la seguridad propia y de los hijos.", prev: 8, files: "3 de 3", refs: [
      { doc: "E01_Marisol.docx", quote: "Yo no dormía en el tren, cuidando que no se fueran a caer los niños." },
      { doc: "E02_Jorge.docx", quote: "En un retén nos quitaron lo poco que traíamos." }
    ] },
    { title: "Espera e incertidumbre por trámites", desc: "La espera de citas y documentos se vive como angustia, aunque en algunos casos se resignifica como tiempo para organizarse.", prev: 7, files: "3 de 3", refs: [
      { doc: "E01_Marisol.docx", quote: "Cada día reviso la aplicación a ver si ya salió la cita, y nada." },
      { doc: "E03_Yesenia.docx", quote: "Esos meses de espera me sirvieron para aprender a hacer tamales y venderlos." }
    ] },
    { title: "Trabajo informal y sustento", desc: "El empleo en construcción, comercio y servicios aparece como motivo de llegada y como medio para sostenerse.", prev: 5, files: "2 de 3", refs: [
      { doc: "E02_Jorge.docx", quote: "Aquí en la obra pagan por semana, sin contrato, pero pagan." },
      { doc: "E03_Yesenia.docx", quote: "Vendo tamales afuera de la escuela y con eso pago el cuarto." }
    ] },
    { title: "Familia como motivo y como carga", desc: "Los hijos y la familia que se queda aparecen como razón para migrar y como preocupación constante.", prev: 6, files: "2 de 3", refs: [
      { doc: "E01_Marisol.docx", quote: "Me vine por ellos, para que no los fueran a reclutar allá." },
      { doc: "E03_Yesenia.docx", quote: "Mi mamá se quedó cuidando a mi niña más chica y eso me pesa todos los días." }
    ] }
  ],
  grid: [
    { who: "Marisol (E01)", ans: "Recibió alojamiento y comida en el albergue y orientación sobre la cita de asilo. Valora a la señora que la orientó al llegar." },
    { who: "Jorge (E02)", ans: "No usó albergues. Su principal apoyo fue un primo que le envió dinero y le consiguió trabajo." },
    { who: "Yesenia (E03)", ans: "Encontró apoyo en un grupo de mujeres de la iglesia, que le explicaron trámites y la animaron a vender comida." }
  ]
};
