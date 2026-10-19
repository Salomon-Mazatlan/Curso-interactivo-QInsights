# QInsights en práctica

Curso interactivo y gamificado, en español, para aprender a usar [QInsights](https://qinsights.ai), la plataforma de análisis de datos cualitativos asistido por inteligencia artificial. Está pensado para estudiantes, docentes y equipos de investigación que trabajan con entrevistas, grupos focales y respuestas abiertas de encuestas.

El curso recorre el flujo completo de la plataforma con un simulador de su interfaz, de modo que se puede practicar sin cuenta y sin subir datos reales. Todas las misiones usan un mismo estudio ficticio sobre migración y redes de apoyo en el noroeste de México, con tres entrevistas transcritas, una grabación en audio, un informe institucional y una encuesta con preguntas abiertas.

Elaborado por el Psic. Lorenzo Salomón Cárdenas para [SoftCualitativo](https://www.softcualitativo.com). Es un material independiente, no oficial de QInsights B.V.

## Ruta del curso

| Misión | Tema | Insignia |
|---|---|---|
| 0 | Conoce a Q. Colaboración humano-IA, trazabilidad y privacidad | Primer contacto |
| 1 | Preparar el material. Formatos, transcripciones, Excel y Privacy Guard | Mano limpia |
| 2 | Crear el proyecto y subir archivos. Descripción para Q, audio, diccionario, columnas de Excel | Fundación del proyecto |
| 3 | Contexto de los datos. Roles, perfiles, valores e importación desde Excel | Cartografía de voces |
| 4 | Gestionar el proyecto. Dashboard, tarjetas de documento, ordenar y compartir | Orden en el fichero |
| 5 | Seleccionar y filtrar. Selección, filtros por perfil, columnas y subconjuntos | Filtro fino |
| 6 | Topic Analysis. Mapa de temas, prevalencia, citas y chat de seguimiento | Mapa de temas |
| 7 | Conversational Analysis. Preguntas, referencias, visualizaciones y guardado | Conversación con los datos |
| 8 | Guided Conversational Analysis. Preguntas sugeridas, síntesis y Wrap Up | Ruta guiada |
| 9 | Grid Analysis. Resultados caso por caso y exportación | Caso por caso |
| 10 | Sentiment Analysis. Categorías propias en respuestas de Excel | Termómetro |
| 11 | Analysis Archive. Carpetas, nombres y seguimientos | Archivista |
| 12 | Desafío final. Elegir el análisis y conducir a Q con estrategias inductiva, deductiva y abductiva | Colega de Q |

## Mecánicas

- **Simulador de la interfaz.** Cada misión práctica reproduce las pantallas de QInsights con los nombres de botones y menús en inglés, tal como aparecen en la plataforma. La persona lee una instrucción y debe encontrar el control correcto. Hay botón de pista y retroalimentación cuando se equivoca.
- **Rastrear la evidencia.** Se presentan afirmaciones de Q junto con la cita que las sostiene, y hay que decidir si están respaldadas, parcialmente respaldadas o no respaldadas.
- **Elegir el análisis.** Para cada pregunta de investigación se elige cuál de los cinco análisis conviene, en la línea del nivel de traducción del Five-Level QDA.
- **Clasificar y ordenar.** Ejercicios para decidir roles, tipos de variable, formatos y estrategias de pregunta, y para ordenar una exploración inductiva.
- **Puntos e insignias.** Cada acción correcta suma XP (más si sale al primer intento y sin pista). Cada misión completada da una insignia, y el XP acumulado define el rango.
- **Sin vidas.** Debajo de cada lección hay dos botones, "Reiniciar lección" y "Saltar". Saltar pasa a la siguiente actividad, y en la última actividad deja la misión como saltada y abre la siguiente.

El avance se guarda en el navegador de cada persona (localStorage). No se envía ningún dato a servidores.


## Estructura de archivos

```
index.html              página única del curso
assets/css/style.css    estilos del curso y del simulador
assets/js/data.js       datos ficticios del estudio (documentos, temas, encuesta)
assets/js/missions.js   contenido de las 13 misiones
assets/js/sim.js        pantallas simuladas de QInsights
assets/js/app.js        motor del curso (progreso, XP, insignias, ejercicios)
```

## Editar el contenido

Cada misión de `missions.js` tiene `title`, `badge`, `goal` y una lista de `steps`. Los tipos de paso disponibles son estos.

| Tipo | Uso | Campos principales |
|---|---|---|
| `brief` | Lectura | `title`, `html` |
| `video` | Video de YouTube | `title`, `youtube` |
| `quiz` | Pregunta de opción múltiple | `q`, `options`, `answer` (índice desde 0), `explain` |
| `classify` | Clasificar elementos en categorías | `prompt`, `categories`, `items` con `text` y `cat`, `explain` |
| `evidence` | Rastrear la evidencia | `prompt`, `items` con `claim`, `quote`, `doc`, `answer` ("Respaldada", "Parcial" o "No respaldada") y `explain` |
| `picker` | Elegir el análisis | `prompt`, `options`, `items` con `q`, `answer` y `explain` |
| `sort` | Ordenar en secuencia | `prompt`, `items` en el orden correcto, `explain` |
| `sim` | Ejercicio en el simulador | `intro`, `beats` |

Cada `beat` del simulador indica la pantalla (`screen`), sus parámetros (`p`), la instrucción (`say`), la acción esperada (`act`), una pista (`hint`) y, si se quiere, una nota que aparece al acertar (`explain`). Las acciones posibles son `click`, `input` (con `min`, `match` y `submit`), `select` (con `value`) y `multi`, que agrupa varias casillas, listas o chips que se revisan juntas al pulsar el botón indicado en `submit`. Las pantallas están en `sim.js`, y cada control que el motor puede revisar lleva un atributo `data-sid`.

## Fuentes y vigencia

Los nombres de la interfaz, los pasos y las recomendaciones se tomaron del [manual de usuario oficial de QInsights](https://qinsights.ai/manual), en su versión consultada en octubre de 2026. La apariencia del simulador es una aproximación didáctica y no reproduce el diseño gráfico real de la plataforma. Conviene revisar el manual cuando QInsights publique cambios y ajustar `sim.js` y `missions.js` si cambian nombres de botones o flujos.

Los datos del estudio sobre migración son ficticios y se crearon solo para fines de enseñanza.
