// ═══════════════════════════════════════════════════════════════════════════════
// MOTOR DE INTENCIÓN — MEJORA 3
// Permite búsqueda en lenguaje natural sin API, 100% gratuito
// Basado en análisis real de los 417 artículos del D.S. 024-2016-EM
// ═══════════════════════════════════════════════════════════════════════════════

// ─── MAPA DE INTENCIONES ─────────────────────────────────────────────────────
// Cada intención tiene:
//   triggers   : frases/palabras que activan esta intención
//   articles   : artículos directamente relevantes (del análisis real)
//   response   : mensaje explicativo que ve el usuario
//   keywords   : palabras extra para reforzar la búsqueda normal

const INTENT_MAP = [

  // ── ACCIDENTES Y NOTIFICACIÓN ──────────────────────────────────────────────
  {
    id: 'accidente_fatal',
    triggers: ['murio','muerto','fallecio','fallecido','muerte','fatal','fatalidad',
               'accidente mortal','trabajador muerto','obrero muerto','victima',
               'que hago si muere','que pasa si muere','murio un trabajador'],
    articles: [164, 165, 166, 167, 168, 169, 170],
    response: '⚠️ Ante un accidente mortal debes notificar al MEM en las primeras 24 horas. Aquí los artículos que debes conocer:',
    keywords: 'accidente mortal notificacion investigacion'
  },
  {
    id: 'notificar_incidente',
    triggers: ['como reporto','como notifico','como aviso','reportar accidente',
               'notificar accidente','avisar accidente','reporte incidente',
               'formulario accidente','plazo notificacion','24 horas accidente'],
    articles: [164, 165, 167, 169, 170],
    response: '📋 Los incidentes y accidentes mortales deben notificarse dentro de las 24 horas. Aquí el procedimiento:',
    keywords: 'notificacion accidente incidente plazo formulario'
  },
  {
    id: 'investigar_accidente',
    triggers: ['investigar accidente','investigacion accidente','causa accidente',
               'analisis causa','acr accidente','como investigo','quien investiga',
               'investigar incidente','root cause'],
    articles: [167, 168, 169, 63, 69, 26],
    response: '🔍 Todo accidente debe ser investigado para encontrar las causas raíz. Artículos del procedimiento:',
    keywords: 'investigacion accidente causa raiz acr supervisor'
  },

  // ── EPP ────────────────────────────────────────────────────────────────────
  {
    id: 'epp_general',
    triggers: ['que epp','cual epp','epp obligatorio','equipos proteccion','casco obligatorio',
               'que debo usar','que me pongo','proteccion personal','implementos seguridad',
               'equipo proteccion personal','dotacion epp','epp minero'],
    articles: [81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94],
    response: '🦺 El uso de EPP es obligatorio en toda la unidad minera. Estos son los artículos que lo regulan:',
    keywords: 'epp equipo proteccion personal casco guantes botas lentes arnes'
  },
  {
    id: 'epp_altura',
    triggers: ['epp para altura','proteccion altura','arnes altura','trabajar altura',
               'trabajo en altura','caida altura','linea vida','que usar altura'],
    articles: [81, 86, 129, 134, 372],
    response: '🪝 Para trabajos en altura se requiere arnés y línea de vida certificados. Artículos aplicables:',
    keywords: 'trabajo altura arnes linea vida epp caida'
  },
  {
    id: 'epp_ruido',
    triggers: ['proteccion oidos','tapones oidos','orejeras','ruido mina','epp auditivo',
               'proteccion auditiva','cuanto ruido','limite ruido','decibeles'],
    articles: [81, 102, 103],
    response: '👂 La exposición al ruido está limitada por ley. Artículos sobre protección auditiva:',
    keywords: 'ruido proteccion auditiva decibeles epp oidos'
  },

  // ── IPERC ──────────────────────────────────────────────────────────────────
  {
    id: 'iperc',
    triggers: ['iperc','identificacion peligros','evaluacion riesgos','matriz riesgo',
               'como identifico peligros','peligros laborales','evaluar riesgo',
               'mapa riesgos','que es iperc','hacer iperc','iperc continuo'],
    articles: [95, 96, 97],
    response: '⚠️ El IPERC es la herramienta base para gestionar riesgos en minería. Artículos que lo regulan:',
    keywords: 'iperc identificacion peligros evaluacion riesgos medidas control'
  },

  // ── PETS ───────────────────────────────────────────────────────────────────
  {
    id: 'pets',
    triggers: ['pets','procedimiento escrito','trabajo seguro','estandar trabajo',
               'como hago pets','que es pets','procedimiento seguro','instructivo trabajo',
               'paso a paso trabajo'],
    articles: [98, 99],
    response: '📄 Los PETS son procedimientos escritos obligatorios para tareas críticas. Artículos aplicables:',
    keywords: 'pets procedimiento escrito trabajo seguro estandar'
  },

  // ── TRABAJOS DE ALTO RIESGO ────────────────────────────────────────────────
  {
    id: 'trabajos_alto_riesgo',
    triggers: ['trabajo alto riesgo','trabajos criticos','espacio confinado','trabajo caliente',
               'izaje carga','trabajo electrico peligroso','permiso trabajo','alto riesgo',
               'cuales son trabajos riesgo','actividades riesgo'],
    articles: [129, 130, 131, 132, 133, 134, 135, 136],
    response: '🚨 Los trabajos de alto riesgo requieren permisos y controles especiales. Artículos que los regulan:',
    keywords: 'trabajos alto riesgo espacio confinado izaje electrico permiso'
  },
  {
    id: 'espacio_confinado',
    triggers: ['espacio confinado','trabajar espacio cerrado','tanque interior',
               'galeria cerrada','atmosfera deficiente','oxigeno espacio'],
    articles: [129, 130, 7],
    response: '⛔ Los espacios confinados son de los trabajos más peligrosos. Artículos aplicables:',
    keywords: 'espacio confinado oxigeno atmosfera permiso trabajo'
  },

  // ── EXPLOSIVOS Y VOLADURA ──────────────────────────────────────────────────
  {
    id: 'explosivos_general',
    triggers: ['explosivos','voladura','disparo','detonacion','anfo','polvorin',
               'almacenar explosivos','usar explosivos','manipular explosivos',
               'como hago voladura','quien maneja explosivos','tronadura'],
    articles: [278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291],
    response: '💥 El uso de explosivos está estrictamente regulado. Artículos del capítulo de Explosivos:',
    keywords: 'explosivos voladura disparo anfo polvorin detonador almacenamiento'
  },
  {
    id: 'voladura_subterranea',
    triggers: ['voladura subterranea','disparo subterraneo','perforacion voladura',
               'frente voladura','cargar taladros','encendido mecha'],
    articles: [234, 235, 236, 237, 238, 239, 240, 241, 242, 243],
    response: '💥 La voladura subterránea tiene procedimientos específicos. Artículos aplicables:',
    keywords: 'voladura subterranea perforacion disparo electrico no electrico'
  },

  // ── VENTILACIÓN ────────────────────────────────────────────────────────────
  {
    id: 'ventilacion',
    triggers: ['ventilacion','ventilar mina','aire fresco','aire viciado','gases mina',
               'oxigeno mina','co2 mina','monoxido mina','calidad aire','ductos ventilacion',
               'ventilador mina','cuanto oxigeno'],
    articles: [246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257],
    response: '🌬️ La ventilación es crítica para la seguridad subterránea. Artículos del capítulo de Ventilación:',
    keywords: 'ventilacion mina aire fresco gases oxigeno ducto ventilador'
  },

  // ── OBLIGACIONES ───────────────────────────────────────────────────────────
  {
    id: 'obligaciones_titular',
    triggers: ['obligaciones empresa','obligaciones titular','que debe hacer empresa',
               'responsabilidad empresa','deberes empresa minera','obligado empresa',
               'titular minero obligaciones','que exige ley empresa'],
    articles: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
    response: '🏢 El titular de actividad minera tiene obligaciones específicas ante la ley. Artículos aplicables:',
    keywords: 'obligaciones titular empresa minera responsabilidad deberes'
  },
  {
    id: 'obligaciones_supervisor',
    triggers: ['obligaciones supervisor','que debe hacer supervisor','responsabilidad supervisor',
               'deberes supervisor','supervisor seguridad','que exige supervisor',
               'funciones supervisor','rol supervisor'],
    articles: [38, 39],
    response: '👷 El supervisor tiene obligaciones clave en seguridad. Artículos específicos:',
    keywords: 'obligaciones supervisor responsabilidad funciones seguridad'
  },
  {
    id: 'derechos_trabajador',
    triggers: ['derechos trabajador','que derechos tengo','puedo negarme','derecho negarse',
               'trabajador derechos','mis derechos','derecho paralizar','trabajo peligroso derecho',
               'puedo parar trabajo','negarse trabajo inseguro'],
    articles: [40, 41, 42, 43],
    response: '✊ Los trabajadores tienen derechos importantes en materia de seguridad. Artículos que los protegen:',
    keywords: 'derechos trabajador negarse trabajo peligroso paralizar'
  },
  {
    id: 'obligaciones_trabajador',
    triggers: ['obligaciones trabajador','deberes trabajador','que debo hacer como trabajador',
               'responsabilidad trabajador','trabajador obligado','mis obligaciones'],
    articles: [44, 45, 46, 47, 48, 49],
    response: '👷 Los trabajadores también tienen obligaciones bajo el reglamento. Artículos aplicables:',
    keywords: 'obligaciones trabajador deberes responsabilidad cumplimiento'
  },

  // ── COMITÉ SSO ─────────────────────────────────────────────────────────────
  {
    id: 'comite_sso',
    triggers: ['comite seguridad','comite sso','csso','como formo comite','elegir comite',
               'integrantes comite','funciones comite','reunion comite','comite minero',
               'representantes seguridad','que hace comite'],
    articles: [60, 61, 62, 63, 64],
    response: '🤝 El Comité de SSO es obligatorio y clave para la gestión de seguridad. Artículos que lo regulan:',
    keywords: 'comite seguridad salud sso csso integrantes funciones reunion'
  },

  // ── CAPACITACIÓN ───────────────────────────────────────────────────────────
  {
    id: 'capacitacion',
    triggers: ['capacitacion','entrenamiento','induccion','charla seguridad',
               'horas capacitacion','capacitar trabajadores','programa capacitacion',
               'cuantas horas capacitacion','induccion minera','charla diaria'],
    articles: [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
    response: '📚 La capacitación en seguridad es obligatoria para todos. Artículos del Capítulo de Capacitación:',
    keywords: 'capacitacion entrenamiento induccion horas programa charla'
  },

  // ── SALUD OCUPACIONAL ──────────────────────────────────────────────────────
  {
    id: 'salud_ocupacional',
    triggers: ['salud ocupacional','examen medico','control medico','vigilancia medica',
               'examen ingreso','examen periodico','examen retiro','apto medico',
               'aptitud medica','medico mina','enfermedades ocupacionales'],
    articles: [117, 118, 119, 120, 121, 122, 123, 124, 125, 126],
    response: '🏥 La vigilancia médica ocupacional es obligatoria. Artículos del Capítulo de Salud Ocupacional:',
    keywords: 'salud ocupacional examen medico vigilancia aptitud enfermedad'
  },
  {
    id: 'higiene_ocupacional',
    triggers: ['higiene ocupacional','agentes fisicos','monitoreo agentes','ruido polvo gases',
               'agentes quimicos','agentes biologicos','ergonomia trabajo','factores psicosociales',
               'estres laboral','carga mental'],
    articles: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116],
    response: '🔬 La higiene ocupacional monitorea los agentes que afectan la salud. Artículos aplicables:',
    keywords: 'higiene ocupacional agentes fisicos quimicos biologicos monitoreo'
  },

  // ── EMERGENCIAS ────────────────────────────────────────────────────────────
  {
    id: 'plan_emergencias',
    triggers: ['plan emergencia','emergencia mina','que hago en emergencia','evacuacion',
               'brigada emergencia','simulacro','rescate minero','como evacuo',
               'alarma emergencia','plan contingencia','sismos mina','inundacion mina'],
    articles: [148, 149, 150, 151, 152, 153, 154, 155],
    response: '🚨 El Plan de Emergencias es obligatorio para toda unidad minera. Artículos que lo regulan:',
    keywords: 'plan emergencia evacuacion brigada simulacro rescate alarma'
  },
  {
    id: 'primeros_auxilios',
    triggers: ['primeros auxilios','botiquin','herido mina','accidentado','atencion herido',
               'que hago si hay herido','primeros auxilios mina','ambulancia mina',
               'topico mina','enfermeria mina'],
    articles: [156, 157, 158, 159, 160, 161, 162, 163],
    response: '🩺 Los primeros auxilios están regulados en detalle. Artículos del capítulo correspondiente:',
    keywords: 'primeros auxilios botiquin herido ambulancia topico enfermeria'
  },

  // ── INCENDIOS ──────────────────────────────────────────────────────────────
  {
    id: 'incendio',
    triggers: ['incendio','fuego mina','extintor','como apago fuego','prevencion incendio',
               'materiales inflamables','combustibles mina','extintores obligatorios',
               'contra incendios','que hago si hay fuego'],
    articles: [402, 403, 404, 405, 406, 407],
    response: '🔥 La prevención de incendios es crítica en minería. Artículos del capítulo específico:',
    keywords: 'incendio extintor fuego prevencion combustible inflamable'
  },

  // ── SOSTENIMIENTO ──────────────────────────────────────────────────────────
  {
    id: 'sostenimiento',
    triggers: ['sostenimiento','perno anclaje','malla sostenimiento','shotcrete',
               'cuadro madera','desate roca','estabilidad roca','geomecanica',
               'roca suelta','caida roca','cuneta sostenimiento'],
    articles: [213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228],
    response: '⛏️ El sostenimiento es fundamental para la seguridad subterránea. Artículos aplicables:',
    keywords: 'sostenimiento perno malla shotcrete desate roca geomecanica'
  },

  // ── TRANSPORTE Y ACARREO ───────────────────────────────────────────────────
  {
    id: 'transporte_mina',
    triggers: ['transporte mina','acarreo','volquete mina','camion mina','locomotora',
               'transporte subterraneo','jaula minera','pique transporte',
               'vehiculos mina','operador vehiculo','scooptram','dumper mina'],
    articles: [292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311],
    response: '🚛 El transporte y acarreo en mina tiene normas estrictas. Artículos del capítulo específico:',
    keywords: 'transporte acarreo volquete locomotora jaula pique vehiculo'
  },
  {
    id: 'transporte_personal',
    triggers: ['transporte personal','bus mina','camion personal','movilidad trabajadores',
               'traslado trabajadores','vehiculo personal mina','transporte trabajadores'],
    articles: [408, 409, 410, 411, 412, 413, 414, 415, 416, 417],
    response: '🚌 El transporte de personal tiene requisitos de seguridad específicos. Artículos aplicables:',
    keywords: 'transporte personal bus vehiculo trabajadores traslado'
  },

  // ── IZAJE ──────────────────────────────────────────────────────────────────
  {
    id: 'izaje',
    triggers: ['izaje','izar carga','grua mina','winche','carga suspendida',
               'eslingas','ganchos izaje','capacidad carga grua','levantar carga',
               'malacate','polipasto'],
    articles: [371],
    response: '🏗️ El sistema de izaje requiere controles estrictos de seguridad. Artículo específico:',
    keywords: 'izaje grua winche carga suspendida eslingas malacate'
  },

  // ── ELECTRICIDAD ───────────────────────────────────────────────────────────
  {
    id: 'electricidad',
    triggers: ['electricidad mina','riesgo electrico','instalacion electrica',
               'trabajo electrico','tension electrica','voltaje mina','cable electrico',
               'tablero electrico','interruptor mina','bloqueo electrico','loto'],
    articles: [360, 361, 362, 363, 364, 365, 366, 346, 347, 348, 349, 350, 351],
    response: '⚡ Los riesgos eléctricos son críticos en minería. Artículos del capítulo de Electricidad:',
    keywords: 'electricidad tension voltaje cable instalacion bloqueo loto'
  },

  // ── ALCOHOL Y DROGAS ───────────────────────────────────────────────────────
  {
    id: 'alcohol_drogas',
    triggers: ['alcohol trabajo','drogas trabajo','borracho trabajo','ebrio mina',
               'prueba alcohol','alcotest','drogas mina','sustancias psicoactivas',
               'prueba toxicologica','estado alerta'],
    articles: [44, 126, 134],
    response: '🚫 El consumo de alcohol y drogas está terminantemente prohibido. Artículos aplicables:',
    keywords: 'alcohol drogas prohibido ebrio prueba toxicologica trabajo'
  },

  // ── SANCIONES ──────────────────────────────────────────────────────────────
  {
    id: 'sanciones',
    triggers: ['sancion','multa','infraccion','penalidad','que pasa si incumplo',
               'consecuencias incumplimiento','fiscalizacion','sunafil','osinergmin',
               'me pueden multar','cuanto es la multa'],
    articles: [20, 21, 22, 23],
    response: '⚖️ El incumplimiento del reglamento genera sanciones. Artículos sobre sanciones:',
    keywords: 'sancion multa infraccion fiscalizacion sunafil osinergmin'
  },

  // ── ESTADÍSTICAS ───────────────────────────────────────────────────────────
  {
    id: 'estadisticas',
    triggers: ['estadisticas seguridad','indices seguridad','indice frecuencia',
               'indice gravedad','tasa accidentabilidad','calcular indices',
               'registro accidentes','cuadro estadistico'],
    articles: [171, 172, 173, 174, 175, 176],
    response: '📊 Las estadísticas de seguridad son obligatorias. Artículos del capítulo de Estadísticas:',
    keywords: 'estadisticas indices frecuencia gravedad accidentabilidad registro'
  },

  // ── SEÑALIZACIÓN ───────────────────────────────────────────────────────────
  {
    id: 'senalizacion',
    triggers: ['señalizacion','señales seguridad','colores seguridad','codigo colores',
               'letreros mina','advertencia señal','prohibicion señal','obligacion señal',
               'señal emergencia','demarcacion area'],
    articles: [127, 128],
    response: '🚦 La señalización y código de colores es obligatoria. Artículos aplicables:',
    keywords: 'señalizacion colores advertencia prohibicion obligacion area'
  },

  // ── SUSTANCIAS PELIGROSAS ──────────────────────────────────────────────────
  {
    id: 'sustancias_peligrosas',
    triggers: ['sustancias peligrosas','quimicos peligrosos','cianuro','mercurio',
               'reactivos mina','hoja seguridad','msds','manejo quimicos',
               'almacenar quimicos','derrame quimico'],
    articles: [332, 333, 334, 335, 336, 337, 338, 339, 340],
    response: '☣️ El manejo de sustancias peligrosas requiere controles estrictos. Artículos aplicables:',
    keywords: 'sustancias peligrosas cianuro mercurio quimico msds hoja seguridad'
  },

  // ── CONTRATISTAS ───────────────────────────────────────────────────────────
  {
    id: 'contratistas',
    triggers: ['contratista','empresa contratista','subcontrata','terceros mina',
               'proveedor servicio','obligaciones contratista','responsabilidad contratista',
               'empresa tercera','servicio tercero'],
    articles: [50, 51, 52, 53],
    response: '🤝 Las empresas contratistas tienen obligaciones específicas. Artículos aplicables:',
    keywords: 'contratista empresa terceros obligaciones responsabilidad servicio'
  },

  // ── CIELO ABIERTO ──────────────────────────────────────────────────────────
  {
    id: 'cielo_abierto',
    triggers: ['tajo abierto','cielo abierto','mina superficie','open pit',
               'banco talud','talud tajo','voladura superficie','perforacion superficie',
               'rampa tajo','acceso tajo'],
    articles: [262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273],
    response: '⛏️ Las operaciones a cielo abierto tienen normas específicas. Artículos del capítulo:',
    keywords: 'tajo abierto cielo abierto banco talud voladura superficie'
  },

  // ── BENEFICIO ──────────────────────────────────────────────────────────────
  {
    id: 'beneficio',
    triggers: ['planta concentradora','beneficio mineral','flotacion','chancadora',
               'molino bolas','lixiviacion','planta hidrometalurgica','fundicion',
               'refineria','planta procesamiento'],
    articles: [315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328],
    response: '🏭 Las operaciones de beneficio tienen normas de seguridad propias. Artículos aplicables:',
    keywords: 'beneficio planta concentradora flotacion lixiviacion fundicion'
  },

  // ── INSPECCIONES ───────────────────────────────────────────────────────────
  {
    id: 'inspecciones',
    triggers: ['inspeccion','auditoria','fiscalizacion','visita inspeccion',
               'quien inspecciona','inspector mina','como me preparo inspeccion',
               'control seguridad','revision seguridad'],
    articles: [140, 141, 142, 143, 144, 145, 146, 147],
    response: '🔎 Las inspecciones y auditorías son mecanismos de control obligatorios. Artículos aplicables:',
    keywords: 'inspeccion auditoria control fiscalizacion revision seguridad'
  },

  // ═══════════════════════════════════════════════════════════════════════════════
// NUEVAS INTENCIONES — CAMINO 1
// Cubre los 25 capítulos sin cobertura detectados por análisis
// Pegar este bloque DENTRO del array INTENT_MAP, antes del cierre "];
// ═══════════════════════════════════════════════════════════════════════════════

  // ── LIDERAZGO Y COMPROMISO ─────────────────────────────────────────────────
  {
    id: 'liderazgo_sso',
    triggers: ['liderazgo seguridad','compromiso gerencia','alta gerencia seguridad',
               'gerente seguridad','lider seguridad','compromiso directivo',
               'responsabilidad gerencial','direccion seguridad','cultura seguridad'],
    articles: [54, 55, 56, 57, 58, 59],
    response: '👔 El liderazgo y compromiso de la alta gerencia es la base del sistema de gestión. Artículos aplicables:',
    keywords: 'liderazgo compromiso gerencia alta direccion cultura seguridad'
  },

  // ── POLÍTICA SSO ───────────────────────────────────────────────────────────
  {
    id: 'politica_sso',
    triggers: ['politica seguridad','politica sso','politica prevencion',
               'que dice la politica','politica empresa seguridad',
               'documento politica','politica salud ocupacional'],
    articles: [55, 56],
    response: '📜 La Política de SSO es el documento rector del sistema de gestión. Artículos que la regulan:',
    keywords: 'politica seguridad salud ocupacional prevencion empresa'
  },

  // ── PROGRAMA ANUAL SSO ─────────────────────────────────────────────────────
  {
    id: 'passt',
    triggers: ['programa anual','passt','programa seguridad anual','plan anual seguridad',
               'programa anual sso','elaborar programa','contenido programa anual',
               'que debe tener programa seguridad','programa prevencion'],
    articles: [57],
    response: '📅 El Programa Anual de SSO (PASST) es obligatorio para toda unidad minera. Artículo aplicable:',
    keywords: 'programa anual seguridad salud passt planificacion'
  },

  // ── REGLAMENTO INTERNO SSO ─────────────────────────────────────────────────
  {
    id: 'risst',
    triggers: ['reglamento interno','risst','reglamento interno seguridad',
               'norma interna empresa','reglamento empresa sso',
               'que debe tener risst','elaborar reglamento interno',
               'reglamento interno minero'],
    articles: [58, 59],
    response: '📋 El Reglamento Interno de SSO (RISST) es obligatorio. Artículos que lo regulan:',
    keywords: 'reglamento interno seguridad salud risst norma empresa'
  },

  // ── GERENTE DE SEGURIDAD ───────────────────────────────────────────────────
  {
    id: 'gerente_seguridad',
    triggers: ['gerente seguridad','quien es gerente sso','requisitos gerente seguridad',
               'funciones gerente seguridad','perfil gerente sso','ingeniero seguridad',
               'jefe seguridad mina','responsable sso empresa','anos experiencia gerente'],
    articles: [65, 66, 67, 68, 69, 70],
    response: '👷 El Gerente de SSO tiene requisitos y funciones específicas. Artículos aplicables:',
    keywords: 'gerente seguridad salud ocupacional funciones requisitos experiencia'
  },

  // ── SISTEMAS DE COMUNICACIÓN ───────────────────────────────────────────────
  {
    id: 'comunicacion_mina',
    triggers: ['sistema comunicacion','comunicacion mina','radio mina','telefono mina',
               'comunicarse en mina','señal comunicacion','comunicacion subterranea',
               'como me comunico mina','comunicacion emergencia mina'],
    articles: [137, 138, 139],
    response: '📡 Los sistemas de comunicación son críticos en la seguridad minera. Artículos aplicables:',
    keywords: 'comunicacion sistema radio telefono mina subterranea emergencia'
  },

  // ── BIENESTAR ──────────────────────────────────────────────────────────────
  {
    id: 'bienestar_trabajador',
    triggers: ['bienestar trabajador','bienestar minero','condiciones bienestar',
               'beneficios trabajador','bienestar social','servicios bienestar',
               'que beneficios tengo','bienestar en mina'],
    articles: [177, 178],
    response: '🤝 El titular debe garantizar el bienestar de sus trabajadores. Artículos aplicables:',
    keywords: 'bienestar trabajador social servicios beneficios mina'
  },

  // ── VIVIENDA Y CAMPAMENTO ──────────────────────────────────────────────────
  {
    id: 'vivienda_campamento',
    triggers: ['campamento minero','vivienda trabajador','alojamiento mina',
               'dormitorio mina','campamento condiciones','housing minero',
               'cuarto trabajador','habitacion mina','condiciones campamento',
               'donde duermen mineros'],
    articles: [179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193],
    response: '🏠 Las viviendas y campamentos tienen requisitos mínimos de seguridad e higiene. Artículos aplicables:',
    keywords: 'vivienda campamento alojamiento dormitorio condiciones higiene mina'
  },

  // ── EDUCACIÓN Y ESCUELAS ───────────────────────────────────────────────────
  {
    id: 'educacion_mina',
    triggers: ['escuela mina','educacion campamento','colegio minero',
               'hijos trabajadores escuela','educacion trabajadores mina'],
    articles: [194, 195, 196],
    response: '🏫 Las unidades mineras deben proveer acceso a educación. Artículos aplicables:',
    keywords: 'educacion escuela campamento hijos trabajadores mina'
  },

  // ── RECREACIÓN ─────────────────────────────────────────────────────────────
  {
    id: 'recreacion_mina',
    triggers: ['recreacion mina','deporte mina','tiempo libre mina',
               'areas recreativas','actividades recreativas trabajador',
               'instalaciones recreativas campamento'],
    articles: [197],
    response: '⚽ Las unidades mineras deben contar con áreas de recreación. Artículo aplicable:',
    keywords: 'recreacion deporte tiempo libre areas instalaciones campamento'
  },

  // ── ASISTENCIA SOCIAL ──────────────────────────────────────────────────────
  {
    id: 'asistencia_social',
    triggers: ['asistencia social','trabajador social mina','apoyo social',
               'servicio social minero','asistente social','problemas personales trabajador'],
    articles: [198, 199],
    response: '🤗 La asistencia social al trabajador es parte del bienestar obligatorio. Artículos aplicables:',
    keywords: 'asistencia social trabajador apoyo servicio bienestar'
  },

  // ── ASISTENCIA MÉDICA Y HOSPITALARIA ──────────────────────────────────────
  {
    id: 'asistencia_medica',
    triggers: ['asistencia medica','hospital mina','clinica mina','atencion medica mina',
               'medico mina','servicio medico','posta medica','enfermeria requisitos',
               'cuantos medicos mina','topico minero requisitos'],
    articles: [200, 201, 202, 203, 204],
    response: '🏥 La asistencia médica y hospitalaria tiene requisitos específicos. Artículos aplicables:',
    keywords: 'asistencia medica hospital clinica topico enfermeria medico mina'
  },

  // ── FACILIDADES SANITARIAS ─────────────────────────────────────────────────
  {
    id: 'facilidades_sanitarias',
    triggers: ['servicios higienicos','baños mina','duchas mina','lavado manos',
               'sanitarios trabajadores','inodoros mina','facilidades sanitarias',
               'vestuario mina','casilleros mina','limpieza instalaciones'],
    articles: [205, 206, 207, 208, 209, 210, 211, 212],
    response: '🚿 Las facilidades sanitarias tienen estándares mínimos obligatorios. Artículos aplicables:',
    keywords: 'sanitarios baños duchas vestuario casilleros limpieza higiene instalaciones'
  },

  // ── EXPLOTACIÓN DE CARBÓN ──────────────────────────────────────────────────
  {
    id: 'carbon',
    triggers: ['carbon mineral','mina carbon','explotacion carbon','mineria carbon',
               'carbón subterraneo','grisú','metano carbon','explosion carbon'],
    articles: [274],
    response: '⛏️ La explotación de carbón tiene normas específicas adicionales. Artículo aplicable:',
    keywords: 'carbon mineral explotacion gris metano explosion mina'
  },

  // ── EXPLOTACIÓN EN PLACERES ────────────────────────────────────────────────
  {
    id: 'placeres',
    triggers: ['placer minero','explotacion placeres','mineria aluvial','oro aluvial',
               'draga minera','mineria placer','lavado oro','mineria aurifera'],
    articles: [275, 276],
    response: '🌊 La explotación en placeres tiene regulaciones específicas. Artículos aplicables:',
    keywords: 'placer aluvial draga oro lavado explotacion mineria'
  },

  // ── ACCESO Y VÍAS DE ESCAPE ────────────────────────────────────────────────
  {
    id: 'vias_escape',
    triggers: ['via escape','salida emergencia','ruta evacuacion','via fuga',
               'como salgo mina','escape subterraneo','acceso labor','via acceso mina',
               'ruta escape subterraneo','camara refuge'],
    articles: [277],
    response: '🚪 Las vías de acceso y escape son críticas para la seguridad. Artículo aplicable:',
    keywords: 'via escape acceso evacuacion ruta emergencia subterranea labor'
  },

  // ── PLANOS Y MAPAS ─────────────────────────────────────────────────────────
  {
    id: 'planos_mapas',
    triggers: ['planos mina','mapas mina','cartografia minera','levantamiento topografico',
               'plano labor','actualizacion planos','planos subterraneos',
               'mapa geomecanico','plano ventilacion','documentacion tecnica mina'],
    articles: [341, 342, 343, 344, 345],
    response: '🗺️ Los planos y mapas de la mina deben mantenerse actualizados. Artículos aplicables:',
    keywords: 'planos mapas cartografia topografia labores documentacion tecnica'
  },

  // ── AGUA, AIRE COMPRIMIDO Y CALDEROS ──────────────────────────────────────
  {
    id: 'agua_aire_calderos',
    triggers: ['agua potable mina','aire comprimido','compresora mina','caldero mina',
               'vapor caldero','presion aire','tuberia agua mina','sistema agua',
               'compresor aire mina','gas comprimido','agua industrial mina'],
    articles: [367, 368, 369, 370],
    response: '💧 Los sistemas de agua, aire comprimido y calderos tienen normas específicas. Artículos aplicables:',
    keywords: 'agua potable aire comprimido caldero vapor presion tuberia compresor'
  },

  // ── MAQUINARIA EQUIPOS Y HERRAMIENTAS ─────────────────────────────────────
  {
    id: 'maquinaria_equipos',
    triggers: ['maquinaria mina','equipo minero','herramienta mina','mantenimiento maquina',
               'inspeccion equipo','equipo sin mantenimiento','maquina peligrosa',
               'herramienta defectuosa','equipo obsoleto','guardia maquina',
               'protector maquina','resguardo maquinaria'],
    articles: [374, 375, 376, 377, 378, 379],
    response: '⚙️ La maquinaria, equipos y herramientas tienen requisitos de seguridad estrictos. Artículos aplicables:',
    keywords: 'maquinaria equipos herramientas mantenimiento inspeccion resguardo protector'
  },

  // ── EDIFICACIONES E INSTALACIONES ─────────────────────────────────────────
  {
    id: 'edificaciones',
    triggers: ['edificio mina','instalacion minera','construccion mina','estructura mina',
               'oficina mina','almacen mina','taller mina','planta mina',
               'infraestructura minera','instalacion electrica edificio',
               'condiciones edificio trabajo'],
    articles: [380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396],
    response: '🏗️ Las edificaciones e instalaciones mineras tienen normas de seguridad específicas. Artículos aplicables:',
    keywords: 'edificacion instalacion construccion estructura oficina almacen taller infraestructura'
  },

  // ── ALMACENAMIENTO Y MANIPULEO ─────────────────────────────────────────────
  {
    id: 'almacenamiento',
    triggers: ['almacenamiento materiales','almacen seguro','guardar materiales',
               'manipuleo materiales','apilamiento materiales','bodega mina',
               'como almaceno','almacenar correctamente','estiba materiales'],
    articles: [397],
    response: '📦 El almacenamiento y manipuleo de materiales tiene normas de seguridad. Artículo aplicable:',
    keywords: 'almacenamiento manipuleo materiales bodega apilamiento estiba'
  },

  // ── ORDEN Y LIMPIEZA ───────────────────────────────────────────────────────
  {
    id: 'orden_limpieza',
    triggers: ['orden limpieza','5s mina','housekeeping mina','limpiar area trabajo',
               'desorden trabajo','area limpia mina','orden en mina',
               'limpieza taller','limpieza galeria'],
    articles: [398],
    response: '🧹 El orden y limpieza son obligatorios en todas las áreas de trabajo. Artículo aplicable:',
    keywords: 'orden limpieza housekeeping area trabajo galeria taller mina'
  },

  // ── MANEJO DE RESIDUOS ─────────────────────────────────────────────────────
  {
    id: 'residuos',
    triggers: ['residuos mina','basura mina','desechos mina','residuos peligrosos',
               'residuos solidos','disposicion residuos','manejo desechos',
               'eliminacion residuos','reciclaje mina','residuo industrial'],
    articles: [399, 400, 401],
    response: '♻️ El manejo de residuos en mina está regulado normativamente. Artículos aplicables:',
    keywords: 'residuos desechos basura peligrosos solidos disposicion manejo eliminacion'
  },

  // ── AUTORIDAD COMPETENTE ───────────────────────────────────────────────────
  {
    id: 'autoridad_competente',
    triggers: ['quien fiscaliza','osinergmin mineria','sunafil mineria','dgm mineria',
               'ministerio energia minas','gobierno regional mineria','autoridad minera',
               'quien regula mineria','ente fiscalizador','inspeccion osinergmin',
               'direccion general mineria'],
    articles: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    response: '⚖️ La fiscalización minera está a cargo de varias autoridades. Artículos aplicables:',
    keywords: 'autoridad osinergmin sunafil dgm ministerio gobierno regional fiscalizacion'
  },

  // ═══════════════════════════════════════════════════════════════════════════════
// NUEVAS INTENCIONES — AGREGAR AL INTENT_MAP DE motor_intencion.js
// Pegar este bloque DENTRO del array INTENT_MAP, antes del cierre "];
// Todos los artículos verificados contra reglamento_data.js real
// Sin repetir ninguna intención ya existente
// ═══════════════════════════════════════════════════════════════════════════════
 
  // ── GEOMECÁNICA Y MACIZO ROCOSO ────────────────────────────────────────────
  {
    id: 'geomecanica',
    triggers: ['geomecanica','macizo rocoso','estudio geomecanico','clasificacion rocas',
               'roca competente','roca incompetente','resistencia roca','estallido roca',
               'presion litostática','diseño labor','seccion galeria','ingeniero geomecanica',
               'roca mala','zona perturbada','fractura roca','condicion geotecnica'],
    articles: [213, 214, 215, 216],
    response: '⛏️ La geomecánica define el diseño seguro de las labores mineras. Artículos aplicables:',
    keywords: 'geomecanica macizo rocoso clasificacion roca estudio diseño labor'
  },
 
  // ── CHIMENEAS Y PIQUES SUBTERRÁNEOS ───────────────────────────────────────
  {
    id: 'chimeneas_piques',
    triggers: ['chimenea minera','preparar chimenea','chimenea subterranea','pique minero',
               'profundizar pique','chimenea ventilacion','echadero chimenea','rimado chimenea',
               'chimenea companion','ascender chimenea','subir chimenea','bajar chimenea',
               'compartimiento chimenea','chimenea mecanica','jaula pique','balde pique'],
    articles: [219, 221, 222, 223, 235, 244, 245, 296, 297, 298, 299, 300],
    response: '🪜 Las chimeneas y piques tienen estándares estrictos de seguridad. Artículos aplicables:',
    keywords: 'chimenea pique rimado echadero jaula balde compartimiento ascenso'
  },
 
  // ── WINCHE Y CASTILLO ─────────────────────────────────────────────────────
  {
    id: 'winche_castillo',
    triggers: ['winche mina','operador winche','castillo izaje','señales winche',
               'codigo timbres','timbre pique','señal jaula','frenos winche',
               'embrague winche','cable izaje pique','tambor winche','velocidad jaula'],
    articles: [298, 299, 300, 301, 302, 303, 304, 305, 306],
    response: '🏗️ El winche, castillo y cables de izaje tienen normas muy específicas. Artículos aplicables:',
    keywords: 'winche castillo cable izaje jaula señal timbre freno embrague tambor'
  },
 
  // ── ECHADEROS Y TOLVAS ─────────────────────────────────────────────────────
  {
    id: 'echaderos_tolvas',
    triggers: ['echadero mineral','tolva mineral','chute minero','desatoro chute',
               'campaneo echadero','tolva subterranea','cargar chute','limpieza tolva',
               'mineral campaneado','parrilla echadero','tapón echadero','buzón mineral'],
    articles: [307, 308],
    response: '📦 Los echaderos y tolvas de mineral tienen procedimientos de seguridad específicos. Artículos:',
    keywords: 'echadero tolva chute campaneo mineral desatoro parrilla buzon'
  },
 
  // ── FERROCARRIL MINERO ─────────────────────────────────────────────────────
  {
    id: 'ferrocarril_mina',
    triggers: ['ferrocarril mina','locomotora mina','carros mineros','rieles mina',
               'decauville','brequero','carro metalico mina','vía ferrea mina',
               'locomotora subterranea','tren mina','transporte rieles'],
    articles: [312, 313, 314],
    response: '🚂 El transporte en ferrocarril minero tiene normas de seguridad específicas. Artículos:',
    keywords: 'ferrocarril locomotora carros rieles decauville brequero via ferrea'
  },
 
  // ── DRENAJE Y BOMBEO ──────────────────────────────────────────────────────
  {
    id: 'drenaje_bombeo',
    triggers: ['drenaje mina','sistema drenaje','bombeo agua mina','bomba sumergible',
               'agua subterranea mina','cuneta galeria','hidrogeologia mina',
               'inundacion subterranea','bomba mina','estacion bombeo','golpe agua',
               'filtración galeria','agua en labor','dique agua mina'],
    articles: [260, 261],
    response: '💧 El sistema de drenaje y bombeo es crítico para prevenir inundaciones. Artículos aplicables:',
    keywords: 'drenaje bombeo agua mina cuneta hidrogeologia inundacion bomba estacion'
  },
 
  // ── PERFORACIÓN SUBTERRÁNEA ────────────────────────────────────────────────
  {
    id: 'perforacion_subterranea',
    triggers: ['perforacion subterranea','perforar galeria','perforar frente',
               'jumbo perforacion','taladros frente','tiro cortado','tiro fallado',
               'perforar chimenea','perforista trabajo','perforar tajo','diseño malla',
               'patron perforacion','barrenado mina','taladro produccion'],
    articles: [234, 235, 236, 237, 238, 239, 240, 241, 242, 243],
    response: '🔩 La perforación y voladura subterránea tiene normas muy estrictas. Artículos aplicables:',
    keywords: 'perforacion frente taladro jumbo tiro cortado fallado disparo diseño'
  },
 
  // ── RELLENO DE LABORES ─────────────────────────────────────────────────────
  {
    id: 'relleno_labores',
    triggers: ['relleno labor','relleno tajeo','relleno subterraneo','relleno hidraulico',
               'relleno pasta','relleno cementado','rellenar mina','backfill mina',
               'tapón hidraulico','estabilidad relleno','subsiden cia relleno',
               'corte y relleno','material relleno'],
    articles: [226, 227, 228],
    response: '🪨 El relleno de labores mineras tiene estándares técnicos obligatorios. Artículos aplicables:',
    keywords: 'relleno labor tajeo hidraulico pasta cementado tapón estabilidad subsidencia'
  },
 
  // ── DESATE DE ROCAS ────────────────────────────────────────────────────────
  {
    id: 'desate_rocas',
    triggers: ['desate rocas','desatar roca','barretilla desate','roca suelta techo',
               'desatador mecanico','desatado manual','dos personas desate',
               'roca suelta pared','roca inspeccion','verificar techo','limpiar frente',
               'inspeccion labor','antes de entrar labor','revisar roca'],
    articles: [218, 224, 225, 230, 231],
    response: '🪨 El desate de rocas es obligatorio y debe hacerse en dos personas. Artículos aplicables:',
    keywords: 'desate roca barretilla techo pared inspeccion labor dos personas mecanico'
  },
 
  // ── MINERÍA SIN RIELES (TRACKLESS) ────────────────────────────────────────
  {
    id: 'mineria_sin_rieles',
    triggers: ['mineria sin rieles','trackless','scooptram','scoop','dumper subterraneo',
               'jumbo mina','operador jumbo','operador scoop','licencia conducir mina',
               'equipo pesado mina','carreteras alivio mina','rampa alivio mina'],
    articles: [229, 230, 231, 232, 233, 215, 216],
    response: '🚜 La minería sin rieles con equipos pesados tiene normas específicas. Artículos aplicables:',
    keywords: 'mineria sin rieles scooptram dumper jumbo operador licencia carretera alivio'
  },
 
  // ── CONEXIÓN DE LABORES ────────────────────────────────────────────────────
  {
    id: 'conexion_labores',
    triggers: ['conectar labores','conexion galeria','comunicar galerías','conectar chimenea',
               'peligro conexion','conexion subterranea','aviso conexion','señal conexion',
               'cruce galerías','personal vigía conexion'],
    articles: [221],
    response: '⚠️ La conexión de labores mineras es una operación de alto riesgo. Artículo aplicable:',
    keywords: 'conexion labores galeria chimenea peligro vigia señalizacion cruce'
  },
 
  // ── VENTILACIÓN EN MINAS DE CARBÓN ────────────────────────────────────────
  {
    id: 'ventilacion_carbon',
    triggers: ['ventilacion carbon','grisú','metano mina','gas metano mina',
               'mina carbon ventilacion','ventilador carbon','zona gaseada carbon',
               'explosion metano','gas inflamable mina','concentracion metano'],
    articles: [258, 259],
    response: '⚠️ La ventilación en minas de carbón tiene normas adicionales por el riesgo de grisú. Artículos:',
    keywords: 'ventilacion carbon grisu metano zona gaseada explosion gas inflamable'
  },
 
  // ── VENTILADORES Y CALIDAD DE AIRE ────────────────────────────────────────
  {
    id: 'ventiladores_calidad_aire',
    triggers: ['ventilador principal','ventilador auxiliar','falla ventilador',
               'paralizar labor ventilacion','cuanto oxigeno mina','19.5 oxigeno',
               'medicion gases mina','monitoreo gases','calidad aire labor',
               'velocidad aire mina','co mina','no2 mina','co2 mina',
               'motor petroleo mina','diesel subterraneo','gases equipo diesel'],
    articles: [246, 247, 248, 249, 250, 251, 253, 254, 255, 256, 257],
    response: '🌬️ Los ventiladores y la calidad del aire tienen parámetros técnicos precisos. Artículos:',
    keywords: 'ventilador auxiliar principal calidad aire oxigeno gases co no2 velocidad diesel'
  },
 
  // ── CARGADOR DE BATERÍAS SUBTERRÁNEO ─────────────────────────────────────
  {
    id: 'cargador_baterias',
    triggers: ['sala baterias mina','cargar baterias mina','hidrogeno sala baterias',
               'estacion baterias subterranea','explosion hidrogeno','baterias equipo mina',
               'cargador bateria subterraneo'],
    articles: [257],
    response: '⚡ La sala de carga de baterías subterránea requiere ventilación especial. Artículo aplicable:',
    keywords: 'sala baterias hidrogeno explosion cargador subterraneo ventilacion'
  },
 
  // ── OPERACIONES DE BENEFICIO — PLANTA CONCENTRADORA ───────────────────────
  {
    id: 'planta_concentradora',
    triggers: ['planta concentradora','flotacion mineral','chancadora primaria',
               'molino bolas mineral','clasificador espiral','chancado mineral',
               'molienda mina','circuito flotacion','reactivos flotacion',
               'espesador planta','filtro planta','bombas planta'],
    articles: [315, 316, 317, 318, 319, 320, 321, 322],
    response: '🏭 Las plantas concentradoras tienen normas de seguridad específicas. Artículos aplicables:',
    keywords: 'planta concentradora flotacion chancado molienda reactivos espesador filtro'
  },
 
  // ── PIROMETALURGIA — FUNDICIÓN ─────────────────────────────────────────────
  {
    id: 'fundicion_pirometalurgia',
    triggers: ['fundicion mina','horno fundicion','metal fundido','sangria horno',
               'pirometalurgia','tostacion mineral','convertidor fundicion',
               'escoria fundicion','trabajar metal caliente','horno electrico mina',
               'colada metal','vaciado metal'],
    articles: [91, 92, 323, 324, 325, 326, 327, 328],
    response: '🔥 Las operaciones de fundición y pirometalurgia tienen normas propias. Artículos aplicables:',
    keywords: 'fundicion horno metal caliente sangria pirometalurgia tostacion escoria'
  },
 
  // ── PLANTAS HIDROMETALÚRGICAS — LIXIVIACIÓN ──────────────────────────────
  {
    id: 'hidrometalurgia_lixiviacion',
    triggers: ['lixiviacion mina','planta lixiviacion','poza lixiviacion','heap leach',
               'pila lixiviacion','solución lixiviacion','electrolisis mina',
               'electrodeposicion','planta hidrometalurgica','adsorcion desorcion',
               'carbon activado mina','merrill crowe','precipitacion doré'],
    articles: [328, 329, 330, 331],
    response: '⚗️ Las plantas de lixiviación y electrometalurgia tienen normas de seguridad específicas. Artículos:',
    keywords: 'lixiviacion heap leach poza planta hidrometalurgica carbon activado electrolisis'
  },
 
  // ── CIANURO ────────────────────────────────────────────────────────────────
  {
    id: 'cianuro',
    triggers: ['cianuro mina','uso cianuro','manipular cianuro','derrame cianuro',
               'intoxicacion cianuro','antidoto cianuro','almacenar cianuro',
               'solucion cianuro','cianuración','ley cianuro','hcn gas'],
    articles: [338, 339],
    response: '☣️ El manejo de cianuro tiene normas estrictísimas de seguridad. Artículos aplicables:',
    keywords: 'cianuro solucion almacenamiento derrame intoxicacion antidoto hcn cianuración'
  },
 
  // ── MERCURIO ──────────────────────────────────────────────────────────────
  {
    id: 'mercurio',
    triggers: ['mercurio mina','usar mercurio','derrame mercurio','amalgamacion',
               'recuperacion oro mercurio','manipular mercurio','intoxicacion mercurio',
               'mercurio subproducto','retorta mercurio','vapores mercurio'],
    articles: [340],
    response: '☣️ El mercurio es un material altamente peligroso con normas estrictas. Artículo aplicable:',
    keywords: 'mercurio amalgamacion recuperacion oro derrame intoxicacion vapores retorta'
  },
 
  // ── DEPÓSITO DE CONCENTRADOS ──────────────────────────────────────────────
  {
    id: 'deposito_concentrados',
    triggers: ['deposito concentrados','almacen concentrado mineral','manipuleo concentrado',
               'transporte concentrado','polvo concentrado','plomo concentrado',
               'humedad concentrado','zona portuaria concentrado','carbon activado deposito'],
    articles: [329, 330, 331],
    response: '📦 Los depósitos de concentrados tienen normas de almacenamiento estrictas. Artículos aplicables:',
    keywords: 'deposito concentrado almacen manipuleo polvo plomo humedad portuaria'
  },
 
  // ── ESMERILES Y AMOLADORES ─────────────────────────────────────────────────
  {
    id: 'esmeriles_amoladores',
    triggers: ['esmeril mina','amoladora mina','rectificadora','corte esmeril','disco corte',
               'amolar metal','esmeril angular','piedra esmeril','chispas esmeril',
               'usar amoladora','operacion esmeril'],
    articles: [93],
    response: '🔧 El uso de esmeriles y amoladoras requiere EPP específico. Artículo aplicable:',
    keywords: 'esmeril amoladora corte disco chispas proteccion respirador lentes'
  },
 
  // ── CHALECO SALVAVIDAS ─────────────────────────────────────────────────────
  {
    id: 'chaleco_salvavidas',
    triggers: ['chaleco salvavidas','trabajar sobre agua','caida al agua','trabajo agua',
               'poza agua trabajo','draga seguridad','flotacion trabajo','trabajo acuatico'],
    articles: [94],
    response: '🦺 El chaleco salvavidas es obligatorio cuando hay riesgo de caída al agua. Artículo aplicable:',
    keywords: 'chaleco salvavidas agua caida flotacion draga trabajo acuatico poza'
  },
 
  // ── SEÑALES Y CÓDIGO DE COLORES SUBTERRÁNEO ─────────────────────────────
  {
    id: 'senales_subterraneo',
    triggers: ['señalizacion subterranea','señales galeria','letreros mina subterranea',
               'material reflexivo mina','señal nivel','señal crucero','señal galeria',
               'señal tajo','identificar labor','rotular labor','codigo señales mina'],
    articles: [217],
    response: '🚦 Todas las labores subterráneas deben señalizarse con material reflexivo. Artículo aplicable:',
    keywords: 'señalizacion subterranea reflexivo galeria crucero nivel tajo labor rotular'
  },
 
  // ── REFUGIOS PEATONALES ────────────────────────────────────────────────────
  {
    id: 'refugios_peatonales',
    triggers: ['refugio peatonal','nicho peatonal','refugio galeria','espacio peatonal',
               'donde me refugio galeria','nicho rampa','esquivar vehiculo mina',
               'espacio cruce equipo','protegerme de vehiculo mina'],
    articles: [214, 216],
    response: '🚶 Los refugios peatonales son obligatorios cada 50 metros en galerías. Artículos aplicables:',
    keywords: 'refugio peatonal nicho galeria rampa distancia cruce vehiculo esquivar'
  },
 
  // ── CARRETERAS DE ALIVIO ──────────────────────────────────────────────────
  {
    id: 'carreteras_alivio',
    triggers: ['carretera alivio','rampa emergencia','freno mina','vehiculo sin frenos',
               'equipo descontrolado','maquina sin frenos rampa','pendiente vehiculo',
               'bajada vehiculo mina','control velocidad rampa'],
    articles: [215, 262],
    response: '🛑 Las carreteras de alivio controlan equipos descontrolados en rampas. Artículos aplicables:',
    keywords: 'carretera alivio rampa emergencia freno vehiculo descontrolado pendiente velocidad'
  },
 
  // ── INSPECCIÓN PREOPERACIONAL ─────────────────────────────────────────────
  {
    id: 'inspeccion_preoperacional',
    triggers: ['inspeccion preoperacional','checklist equipo','check list vehiculo',
               'verificar equipo antes','revision antes turno','inspeccionar maquina',
               'formato inspeccion equipo','pre operacional mina','hoja inspeccion diaria'],
    articles: [374, 375, 376],
    response: '✅ La inspección preoperacional es obligatoria antes de usar cualquier equipo. Artículos:',
    keywords: 'inspeccion preoperacional checklist equipo revision turno formato diario'
  },
 
  // ── ESCALERAS Y ACCESOS ────────────────────────────────────────────────────
  {
    id: 'escaleras_accesos',
    triggers: ['escalera mina','escala minera','acceso vertical','subir escala',
               'bajar escala mina','escalerilla','peldaño mina','plataforma trabajo',
               'andamio mina','descanso escalera','acceso labor','acceder nivel'],
    articles: [372, 373],
    response: '🪜 Las escaleras y accesos a labores mineras tienen requisitos de seguridad. Artículos aplicables:',
    keywords: 'escalera acceso vertical peldaño plataforma andamio descanso labor nivel'
  },
 
  // ── ATS — ANÁLISIS DE TRABAJO SEGURO ─────────────────────────────────────
  {
    id: 'ats',
    triggers: ['ats','analisis trabajo seguro','tarea no rutinaria','actividad no rutinaria',
               'trabajo sin pets','tarea nueva sin procedimiento','formato ats',
               'como hago ats','cuando uso ats','ats antes de trabajar'],
    articles: [99],
    response: '📋 El ATS (Análisis de Trabajo Seguro) se usa para tareas no rutinarias sin PETS. Artículo:',
    keywords: 'ats analisis trabajo seguro tarea rutinaria formato procedimiento'
  },
 
  // ── ESTALLIDO DE ROCAS ─────────────────────────────────────────────────────
  {
    id: 'estallido_rocas',
    triggers: ['estallido roca','rock burst','presion litostática','golpe roca',
               'explosion roca','roca a presion','sismica mina','monitoreo sismico',
               'alta presion litostática','roca a tension'],
    articles: [214],
    response: '💥 El estallido de rocas (rock burst) requiere monitoreo sísmico permanente. Artículo aplicable:',
    keywords: 'estallido roca rock burst presion litostática sismica monitoreo golpe'
  },
 
  // ── VISITAS A MINA ─────────────────────────────────────────────────────────
  {
    id: 'visitas_mina',
    triggers: ['visita mina','visitante mina','induccion visita','quien puede ingresar',
               'acceso visitante','ingresar mina visita','induccion 30 minutos',
               'autorizar visita','turista mina','periodista mina','prensa mina'],
    articles: [78],
    response: '👤 Las visitas a la mina requieren inducción mínima de 30 minutos. Artículo aplicable:',
    keywords: 'visita visitante mina induccion acceso autorizar 30 minutos ingreso'
  },
 
  // ── PRACTICANTES Y TESISTAS ─────────────────────────────────────────────────
  {
    id: 'practicantes',
    triggers: ['practicante mina','tesista mina','practicas mina','alumno mina',
               'pasante mina','estudiante mina','practica profesional','pre profesional',
               'tesis en mina','ingenieria minas practicas'],
    articles: [79, 80],
    response: '🎓 Los practicantes y tesistas tienen derechos específicos en la unidad minera. Artículos:',
    keywords: 'practicante tesista alumno practica profesional universidad ingenieria minas'
  },
 
  // ── CAPACITACIÓN EN CAMBIO DE PUESTO ─────────────────────────────────────
  {
    id: 'capacitacion_rotacion',
    triggers: ['cambio de puesto','rotacion trabajo','transferencia area','nuevo puesto',
               'cambio labor','asignacion nueva tarea','trabajar en otra area',
               'capacitacion antes cambio','entrenar antes rotar','nueva asignacion'],
    articles: [73, 76],
    response: '📚 Toda rotación o cambio de puesto requiere capacitación previa. Artículos aplicables:',
    keywords: 'rotacion cambio puesto transferencia area capacitacion nueva tarea asignacion'
  },
 
  // ── REINGRESO DESPUÉS DE ACCIDENTE ───────────────────────────────────────
  {
    id: 'reingreso_accidente',
    triggers: ['reingreso accidente','volver trabajar accidente','alta medica trabajo',
               'regreso tras accidente','recuperado accidente','retorno trabajo accidente',
               'capacitacion reingreso','trabajar despues accidente'],
    articles: [76],
    response: '🩺 El trabajador que regresa tras un accidente debe recibir capacitación especial. Artículo:',
    keywords: 'reingreso accidente retorno alta medica capacitacion causas prevencion'
  },
 
  // ── BRIGADAS DE EMERGENCIA ─────────────────────────────────────────────────
  {
    id: 'brigadas_emergencia',
    triggers: ['brigada emergencia','integrante brigada','entrenamiento brigada',
               'capacitar brigada','equipo respiracion rescate','equipo salvamento',
               'brigada incendio','brigada rescate','grupo emergencia',
               'voluntario brigada','entrenar rescatistas'],
    articles: [77, 148, 149, 150],
    response: '🚒 Las brigadas de emergencia deben entrenarse bimensualmente. Artículos aplicables:',
    keywords: 'brigada emergencia entrenamiento rescate incendio equipo respiracion salvamento'
  },
 
  // ── OPERACIONES CIELO ABIERTO — RAMPAS Y BERMAS ──────────────────────────
  {
    id: 'rampas_bermas_tajo',
    triggers: ['rampa tajo','berma seguridad','gradiente rampa','pendiente tajo',
               'ancho rampa','berma tajo','muro seguridad tajo','muro contención rampa',
               'vía doble sentido tajo','cuneta rampa tajo','regar via tajo'],
    articles: [262],
    response: '🏔️ Las rampas y bermas en tajo abierto tienen dimensiones mínimas obligatorias. Artículo:',
    keywords: 'rampa berma gradiente pendiente ancho muro seguridad cuneta tajo abierto'
  },
 
  // ── PLANOS Y ACTUALIZACIÓN ─────────────────────────────────────────────────
  {
    id: 'planos_actualizacion',
    triggers: ['actualizar planos','plano mina actualizado','plano labores','plano subterraneo',
               'coordenadas utm mina','wgs84 mina','bocamina plano','plano contra incendios',
               'plano relleno hidraulico','plano sistema agua mina','plano ventilacion mina'],
    articles: [341, 342, 343, 344, 345],
    response: '🗺️ Los planos de mina deben mantenerse actualizados en coordenadas UTM WGS84. Artículos:',
    keywords: 'planos mina actualizado utm wgs84 bocamina ventilacion incendio relleno labores'
  },
 
  // ── CONTROL DE SUSTANCIAS — LISTADO Y MSDS ───────────────────────────────
  {
    id: 'control_sustancias_msds',
    triggers: ['listado sustancias','inventario quimicos','acido sulfurico mina',
               'cal viva mina','combustible mina','lubricante mina','etiqueta quimico',
               'hdsm archivo','msds disponible','trabajador conocer msds',
               'lavaojos emergencia quimico','ducha emergencia quimico'],
    articles: [332, 333, 334, 335, 336],
    response: '☣️ El control de sustancias peligrosas requiere etiquetas, MSDS y equipos de emergencia. Artículos:',
    keywords: 'sustancias listado msds hdsm etiqueta acido cal combustible lavaojos ducha'
  },
 
  // ── INSTALACIÓN DE SERVICIOS EN LABORES ─────────────────────────────────
  {
    id: 'instalacion_servicios_labores',
    triggers: ['instalar tuberias labor','cable electrico galeria','tuberia aire galeria',
               'tuberia agua galeria','instalacion subterranea','servicios galeria',
               'manga ventilacion','ducto ventilacion galeria','colocar tuberia mina'],
    articles: [233],
    response: '🔧 La instalación de servicios en labores debe hacerse con equipos de izaje seguros. Artículo:',
    keywords: 'instalacion tuberias cables servicios galeria izaje ducto ventilacion'
  },
 
  // ── AUDITORÍA INTERNA DE SEGURIDAD ────────────────────────────────────────
  {
    id: 'auditoria_interna',
    triggers: ['auditoria interna','auditoria seguridad','auditoria sso','auditor mina',
               'programa auditoria','resultado auditoria','hallazgo auditoria',
               'no conformidad auditoria','auditoria iso','auditoria ohsas'],
    articles: [140, 141, 142, 143, 144],
    response: '🔎 Las auditorías internas son parte obligatoria del sistema de gestión. Artículos aplicables:',
    keywords: 'auditoria interna seguridad hallazgo no conformidad programa resultado'
  },
 
  // ── MONITOREO AMBIENTAL OCUPACIONAL ──────────────────────────────────────
  {
    id: 'monitoreo_ambiental',
    triggers: ['monitoreo ambiental','monitoreo polvo','monitoreo ruido mina',
               'monitoreo gases mina','muestreo polvo','limite exposicion ocupacional',
               'anexo 15 reglamento','valor limite agente quimico','TLV mina',
               'higienista industrial','profesional higiene','monitor gases personal'],
    articles: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
    response: '🔬 El monitoreo ambiental debe realizarse por profesionales calificados. Artículos aplicables:',
    keywords: 'monitoreo ambiental polvo ruido gases limite exposicion higiene profesional'
  },
 
  // ── ERGONOMÍA ────────────────────────────────────────────────────────────
  {
    id: 'ergonomia',
    triggers: ['ergonomia mina','carga manual peso','levantar peso mina',
               'postura trabajo mina','trabajo repetitivo','esfuerzo fisico mina',
               'sobreesfuerzo','carga postural','diseño puesto trabajo',
               'dolor lumbar trabajo','lesion musculo mina'],
    articles: [112, 113],
    response: '🦾 La ergonomía en minería previene lesiones por esfuerzo. Artículos aplicables:',
    keywords: 'ergonomia carga manual peso postura repetitivo esfuerzo lumbar lesion'
  },
 
  // ── ESTRÉS TÉRMICO ────────────────────────────────────────────────────────
  {
    id: 'estres_termico',
    triggers: ['estres termico mina','calor excesivo mina','temperatura mina',
               'humedad calor mina','golpe calor','temperatura confort mina',
               'hidratacion mina','agua tomar mina','trabajar calor mina',
               'limite temperatura mina','termometria mina'],
    articles: [114, 115],
    response: '🌡️ El estrés térmico debe controlarse en labores calurosas. Artículos aplicables:',
    keywords: 'estres termico calor temperatura humedad hidratacion confort limite'
  },
 
  // ── FACTORES PSICOSOCIALES ────────────────────────────────────────────────
  {
    id: 'psicosociales',
    triggers: ['factores psicosociales','estres laboral mina','presion trabajo mina',
               'carga mental mina','burnout mina','acoso laboral','hostigamiento trabajo',
               'ambiente trabajo psicologico','bienestar psicologico mina'],
    articles: [116],
    response: '🧠 Los factores psicosociales afectan la salud mental del trabajador minero. Artículo:',
    keywords: 'psicosociales estres laboral presion mental burnout acoso hostigamiento'
  },
 
  // ── ENFERMEDADES PREVALENTES ─────────────────────────────────────────────
  {
    id: 'enfermedades_prevalentes',
    triggers: ['enfermedad prevalente','silicosis','neumoconiosis','hipoacusia laboral',
               'perdida audicion trabajo','enfermedad pulmones mina','asbestosis',
               'dermatitis ocupacional','cinco enfermedades mina','estadistica enfermedad'],
    articles: [173, 175],
    response: '🏥 Las cinco enfermedades prevalentes deben monitorearse estadísticamente. Artículos:',
    keywords: 'enfermedad prevalente silicosis neumoconiosis hipoacusia pulmones estadistica'
  },
 
  // ── EVACUACIONES MÉDICAS ─────────────────────────────────────────────────
  {
    id: 'evacuacion_medica',
    triggers: ['evacuacion medica','evacuar herido','traslado herido','transfer medico',
               'helicoptero emergencia','ambulancia mina','evacuacion emergencia medica',
               'coordinacion medica emergencia','registro evacuacion'],
    articles: [174, 200, 201, 202, 203],
    response: '🚑 Las evacuaciones médicas deben registrarse y coordinarse. Artículos aplicables:',
    keywords: 'evacuacion medica traslado herido ambulancia helicoptero registro transfer'
  },
 
  // ── ODONTOLOGÍA Y OFTALMOLOGÍA ───────────────────────────────────────────
  {
    id: 'atencion_dental_visual',
    triggers: ['atencion dental mina','dentista mina','oftalmologia mina',
               'examen visual trabajo','atencion ojos mina','dientes mina',
               'control dental campamento','revision vista mina'],
    articles: [204],
    response: '👁️ El titular debe brindar atención dental y oftalmológica anual. Artículo aplicable:',
    keywords: 'dental odontologia oftalmologia vision ojos atencion anual campamento'
  },
 
  // ── LAVANDERÍA Y VESTUARIO ────────────────────────────────────────────────
  {
    id: 'lavanderia_vestuario',
    triggers: ['lavanderia mina','lavar ropa trabajo','vestuario mina','casillero mina',
               'ropa trabajo higiene','cambiar ropa mina','ropa limpia mina',
               'locker mina','guardar ropa trabajo'],
    articles: [206, 212],
    response: '👔 Las instalaciones de vestuario y lavandería son obligatorias. Artículos aplicables:',
    keywords: 'lavanderia vestuario ropa trabajo casillero locker higiene cambiar'
  },
 
  // ── AGUA POTABLE EN MINA ─────────────────────────────────────────────────
  {
    id: 'agua_potable_mina',
    triggers: ['agua potable campamento','agua beber mina','fuente agua trabajador',
               'suministro agua mina','calidad agua mina','agua comedor mina',
               'deposito reserva agua','contaminacion agua mina'],
    articles: [208, 209],
    response: '💧 El agua potable debe cumplir estándares de calidad en toda la mina. Artículos aplicables:',
    keywords: 'agua potable campamento bebida fuente suministro calidad deposito reserva'
  },
 
  // ── RESIDUOS SÓLIDOS Y LIMPIEZA ───────────────────────────────────────────
  {
    id: 'residuos_solidos_limpieza',
    triggers: ['residuos solidos mina','deposito basura mina','recipiente residuos',
               'vaciar basura mina','limpiar area trabajo mina','desecho comida mina',
               'higiene area trabajo','limpieza pasadizo','almacen limpio mina'],
    articles: [210, 211],
    response: '🧹 La limpieza y disposición de residuos son obligatorias en toda la mina. Artículos:',
    keywords: 'residuos solidos deposito basura recipiente limpieza area pasadizo almacen'
  },
 
  // ── PROHIBICIÓN ALIMENTOS EN ZONA TÓXICA ────────────────────────────────
  {
    id: 'prohibicion_alimentos_toxicos',
    triggers: ['comer area toxica','alimentos zona quimica','comer cerca quimicos',
               'prohibido comer baño mina','bebida zona peligrosa','ingerir quimico accidental'],
    articles: [212],
    response: '⛔ Está prohibido comer o almacenar alimentos en áreas con material tóxico. Artículo:',
    keywords: 'prohibicion alimentos toxicos zona quimica baño comer bebida peligrosa'
  },
 
  // ── RELAVES Y DEPÓSITOS ──────────────────────────────────────────────────
  {
    id: 'relaves',
    triggers: ['relave mina','deposito relaves','tranque relaves','presa relaves',
               'estabilidad relaves','geosintético relaves','relave filtracion',
               'rotura presa relave','plan relaves','manejo relaves'],
    articles: [341],
    response: '🏞️ Los relaves y su depósito requieren control técnico permanente. Artículo aplicable:',
    keywords: 'relave deposito tranque presa estabilidad geosintético filtracion plan'
  },
 
  // ── TRABAJO NOCTURNO ──────────────────────────────────────────────────────
  {
    id: 'trabajo_nocturno',
    triggers: ['trabajo nocturno mina','turno noche mina','jornada noche','trabajar de noche',
               'guardia noche mina','iluminacion noche trabajo','visibilidad nocturna'],
    articles: [352, 353, 354, 355],
    response: '🌙 El trabajo nocturno requiere iluminación adecuada y controles especiales. Artículos:',
    keywords: 'trabajo nocturno turno noche jornada iluminacion visibilidad guardia'
  },

  // ═══════════════════════════════════════════════════════════════════════════════
// NUEVAS INTENCIONES — BLOQUE COMPLETO PARA AGREGAR AL INTENT_MAP
// ─────────────────────────────────────────────────────────────────────────────
// INSTRUCCIÓN: Pega este bloque DENTRO del array INTENT_MAP de motor_intencion.js,
// justo antes del cierre "];  (última línea del array)
//
// Cubre los capítulos que NO tenían ninguna intención:
//   Cap. I  – Disposiciones Generales (Arts. 1-7)
//   Cap. II – Autoridad: Sanciones/Multas (Arts. 20-23)
//   Cap. I  – Titular: Derechos y Acceso (Arts. 24-25)
//   Cap. IV – Contratistas Mineros (Arts. 50-53)
//   Cap. I  – Liderazgo y Política SSO (Arts. 54-57)
//   Cap. XIII– Señalización y Código de Colores (Arts. 127-128)
//   Cap. XVI – Auditorías Externas (Arts. 145-147)
//   Cap. XX  – Estadísticas de SSO (Arts. 171-176)  ← sin cobertura completa
//   Sub. Trackless completo (Arts. 229-233)
//   Chimeneas mecánicas (Arts. 244-245)
//   Cielo Abierto completo (Arts. 263-273)
//   Cianuro y almacén peligrosos (Arts. 337-339)
//   Iluminación completa (Arts. 352-359)
// ═══════════════════════════════════════════════════════════════════════════════

  // ── DISPOSICIONES GENERALES / GLOSARIO ────────────────────────────────────
  {
    id: 'disposiciones_generales',
    triggers: ['que es el reglamento','a quien aplica reglamento','objetivo reglamento',
               'alcance reglamento','que actividades cubre','que dice articulo 1',
               'definiciones reglamento','glosario minero','terminos reglamento',
               'vocabulario mineria','que significa en mineria','base legal reglamento',
               'decreto supremo 024','ds 024 2016','normas minimas reglamento',
               'finalidad reglamento','cultura prevencion','definicion accidente',
               'definicion incidente','definicion labor','definicion sostenimiento',
               'definicion acarreo','que es titular minero','glosario ds024'],
    articles: [1, 2, 3, 4, 5, 6, 7],
    response: '📖 El Artículo 7 contiene el glosario completo con más de 80 definiciones técnicas del reglamento. Artículos de disposiciones generales:',
    keywords: 'disposiciones generales objetivo alcance definiciones terminos glosario reglamento'
  },

  // ── SANCIONES, MULTAS Y PARALIZACIONES ────────────────────────────────────
  {
    id: 'sanciones_multas',
    triggers: ['multa mineria','sancion empresa minera','paralizacion mina','clausura mina',
               'cuanto multan mineria','infraccion reglamento','consecuencia incumplir',
               'responsabilidad civil minera','responsabilidad penal minera',
               'paralizar operacion mina','que pasa si no cumplo reglamento',
               'fiscalizador puede paralizar','inspector paraliza labor',
               'suspension actividades mina','cierre mina por accidente',
               'multa accidente trabajo','sancion incumplimiento sso'],
    articles: [20, 21, 22, 23],
    response: '⚖️ El incumplimiento del reglamento puede derivar en multas, paralizaciones y responsabilidad civil y penal. Artículos:',
    keywords: 'multa sancion paralizacion clausura infraccion responsabilidad civil penal fiscalizador'
  },

  // ── DERECHOS DEL TITULAR / ACCESO A INSTALACIONES ─────────────────────────
  {
    id: 'acceso_instalaciones_titular',
    triggers: ['quien puede entrar mina','prohibido ingreso mina','personas extranas mina',
               'acceso labores mineras','controlar ingreso mina','persona no autorizada mina',
               'restringir acceso mina','ingreso no autorizado mina',
               'permisos especiales ingreso','derecho titular seleccionar gerente',
               'titular puede elegir gerente sso','alumno ingresa mina',
               'profesor ingresa mina','visita autorizada mina'],
    articles: [24, 25],
    response: '🚫 El ingreso a labores e instalaciones mineras está restringido. Solo con permiso especial del titular. Artículos:',
    keywords: 'prohibicion ingreso personas extranas labores instalaciones acceso control titular'
  },

  // ── EMPRESAS CONTRATISTAS MINERAS ─────────────────────────────────────────
  {
    id: 'contratistas_mineros',
    triggers: ['empresa contratista minera','contratista mina','subcontratista mina',
               'obligaciones contratista','responsabilidad contratista',
               'empresa tercera mina','service minero','responsabilidad solidaria',
               'titular y contratista obligaciones','accidente trabajador contratista',
               'sso contratista mina','empresa conexa minera','actividad conexa',
               'proveedor servicios mina','inscripcion dgm contratista',
               'contratista inscrito dgm','epp contratista','capacitacion contratista',
               'vivienda contratista mina','risst contratista'],
    articles: [50, 51, 52, 53],
    response: '🏢 Las contratistas deben estar inscritas en la DGM y cumplir el reglamento con responsabilidad solidaria. Artículos:',
    keywords: 'contratista empresa tercera obligaciones responsabilidad solidaria dgm actividad conexa'
  },

  // ── LIDERAZGO, POLÍTICA Y PROGRAMA ANUAL SSO ──────────────────────────────
  {
    id: 'liderazgo_politica_sso',
    triggers: ['liderazgo seguridad','alta gerencia sso','compromiso gerencia',
               'politica seguridad salud','politica sso empresa','declaracion politica',
               'programa anual seguridad','programa anual sso','passt',
               'que debe tener programa anual','elaborar programa sso',
               'politica sso escrita','gerencia lidera seguridad',
               'sistema gestion sso implementar','recursos para seguridad',
               'compromiso empresa seguridad','politica de prevencion'],
    articles: [54, 55, 56, 57],
    response: '🏆 La Alta Gerencia debe liderar el SSO con una Política escrita y un Programa Anual. Artículos:',
    keywords: 'liderazgo politica programa anual sso alta gerencia compromiso recursos sistema gestion'
  },

  // ── SEÑALIZACIÓN Y CÓDIGO DE COLORES ──────────────────────────────────────
  {
    id: 'senalizacion_codigo_colores',
    triggers: ['codigo colores seguridad','señalizacion area trabajo',
               'color amarillo peligro','color rojo mina','color verde seguridad',
               'señal advertencia mina','letrero seguridad mina','como señalizo area',
               'señalizar zona peligrosa','codigo señales mineria','señal obligacion',
               'señal prohibicion mina','señal emergencia color','anexo 17 reglamento',
               'señal alto voltaje','señal area restringida','señal equipo en mantenimiento',
               'codigo colores tuberias','identificacion tuberias mina',
               'señal piso demarcado','linea amarilla seguridad'],
    articles: [127, 128],
    response: '🚦 Todas las áreas de trabajo se señalizan según el Código de Señales y Colores (Anexo 17). Artículos:',
    keywords: 'señalizacion codigo colores area trabajo letrero obligacion prohibicion advertencia anexo17'
  },

  // ── AUDITORÍAS EXTERNAS ────────────────────────────────────────────────────
  {
    id: 'auditoria_externa',
    triggers: ['auditoria externa mina','cada cuanto auditoria externa',
               'auditoria cada tres años','informe auditoria sunafil',
               'informe auditoria osinergmin','presentar auditoria gobierno regional',
               'quien hace auditoria externa','empresa auditora mineria',
               'plazo auditoria externa','auditoria obligatoria mineria anual',
               'tres primeros meses auditoria','auditoria sgo externo',
               'auditoria tercera parte mina'],
    articles: [145, 146, 147],
    response: '🔍 Las auditorías externas son obligatorias en los 3 primeros meses de cada año. El informe va a SUNAFIL, OSINERGMIN y Gobierno Regional. Artículos:',
    keywords: 'auditoria externa tres años plazo sunafil osinergmin gobierno regional informe empresa'
  },

  // ── ESTADÍSTICAS DE SSO ────────────────────────────────────────────────────
  {
    id: 'estadisticas_sso',
    triggers: ['estadisticas accidentes','registro accidentes mina','indice frecuencia',
               'indice severidad','tasa accidentabilidad','estadistica incidentes',
               'reporte estadistico sso','informe anual accidentes',
               'cuantos accidentes mina','registro enfermedades ocupacionales',
               'base datos accidentes','llevar registro sso','libro accidentes',
               'cuadro estadistico mina','indicadores seguridad mina',
               'dias perdidos accidente','horas hombre trabajadas'],
    articles: [171, 172, 173, 174, 175, 176],
    response: '📊 Todo titular debe llevar estadísticas de accidentes, incidentes y enfermedades. Artículos del Capítulo de Estadísticas:',
    keywords: 'estadisticas accidentes indice frecuencia severidad tasa registro informe anual indicadores'
  },

  // ── MINERÍA SIN RIELES — MÉTODO DE MINADO Y EQUIPOS ───────────────────────
  {
    id: 'metodo_minado_trackless',
    triggers: ['metodo de minado subterraneo','seleccion metodo minado',
               'metodo corte relleno','metodo sublevel stoping','metodo block caving',
               'metodo camara pilares','techo alto labor','techo mayor 4 metros',
               'desatador mecanico obligatorio','techo mayor 5 metros sostenimiento',
               'sostenimiento mecanizado obligatorio','equipo scoop autorizado',
               'operador scoop capacitado','operador jumbo licencia',
               'instalar tuberias elevadas labor','izaje instalacion servicios',
               'cable electrico altura galeria'],
    articles: [229, 230, 231, 232, 233],
    response: '⛏️ El método de minado, los techos altos y la instalación de servicios en labores tienen normas específicas. Artículos:',
    keywords: 'metodo minado seleccion techo alto desatador mecanico sostenimiento operador autorizado'
  },

  // ── CHIMENEAS MECANIZADAS (RAISE BORING / ALIMAK) ─────────────────────────
  {
    id: 'chimeneas_mecanizadas',
    triggers: ['chimenea mecanizada','raise boring','alimak','rimado mecanico',
               'chimenea manual subterranea','construccion chimenea grande',
               'chimenea piloto descendente','rimado ascendente','plataforma chimenea',
               'jaula seguridad chimenea','chimenea gran dimension','chimenea manual ascendente',
               'norma chimenea mecanica','manual operacion chimenea'],
    articles: [244, 245],
    response: '🪜 La construcción de chimeneas mecanizadas (raise boring/Alimak) tiene normas técnicas precisas. Artículos:',
    keywords: 'chimenea mecanizada raise boring alimak rimado piloto plataforma jaula seguridad'
  },

  // ── OPERACIONES A CIELO ABIERTO — GEOTECNIA Y DISEÑO ─────────────────────
  {
    id: 'cielo_abierto_geotecnia',
    triggers: ['geotecnia tajo abierto','estabilidad talud tajo','pendiente general tajo',
               'angulo talud','diseño tajo geomecanico','estudio hidrogeologia tajo',
               'mecanica rocas tajo','sismica tajo diseño','periodo retorno sismica',
               'labores subterraneas cerca tajo','zona influencia tajo superficie',
               'tajo sobre tuneles','pilares entre tajo subterraneo'],
    articles: [263, 264, 265],
    response: '🏔️ El diseño del tajo requiere estudios geológicos, geomecánicos e hidrológicos. Artículos:',
    keywords: 'geotecnia tajo estabilidad talud pendiente diseño geomecanica hidrogeologia sismica'
  },

  // ── BOTADEROS DE DESMONTE ─────────────────────────────────────────────────
  {
    id: 'botaderos_desmonte',
    triggers: ['botadero desmonte','deposito desmonte','escombrera mina',
               'estabilidad botadero','diseño botadero mina','desmonte mina',
               'top soil deposito','suelo organico botadero','botadero aprobado dgm',
               'operacion botadero','seguridad botadero','talud botadero',
               'altura botadero','berma botadero','botadero cielo abierto'],
    articles: [266],
    response: '🏔️ Los botaderos de desmonte deben operar según lo aprobado por la DGM con estabilidad técnica garantizada. Artículo:',
    keywords: 'botadero desmonte escombrera diseño estabilidad dgm top soil operacion talud'
  },

  // ── VOLADURA A CIELO ABIERTO ──────────────────────────────────────────────
  {
    id: 'voladura_cielo_abierto',
    triggers: ['voladura tajo abierto','disparo cielo abierto','carguio taladros tajo',
               'voladura nocturna tajo','zona exclusion voladura','frente libre voladura',
               'vibracion voladura superficial','monitorear vibracion voladura',
               'voladura secundaria tajo','cachorreo tajo','desquinche tajo',
               'calambucos tajo','sobre perforacion voladura','voladura reglamentacion interna',
               'disparo primario secundario tajo','protocolo voladura superficie'],
    articles: [267, 268, 269, 270],
    response: '💥 La voladura a cielo abierto tiene protocolos específicos distintos a la subterránea. Artículos:',
    keywords: 'voladura cielo abierto taladros carguio zona exclusion vibracion monitoreo protocolo'
  },

  // ── EQUIPOS Y FATIGA EN CIELO ABIERTO ─────────────────────────────────────
  {
    id: 'equipos_fatiga_tajo',
    triggers: ['equipo tajo abierto','camion minero tajo','pala electrica','retroexcavadora mina',
               'cargador frontal tajo','motoniveladora mina','tractor mina',
               'inspeccion equipo tajo','mantenimiento equipo tajo',
               'fatiga operador tajo','somnolencia conduccion mina',
               'turno largo operador','programa anti fatiga','control fatiga mina',
               'detector somnolencia','cabina equipo tajo','rops fops camion mina',
               'equipo movil tajo normas','velocidad equipo tajo'],
    articles: [271, 272, 273],
    response: '🚜 Los equipos de cielo abierto y el control de fatiga en operadores tienen normas propias. Artículos:',
    keywords: 'equipos tajo camion pala cargador inspeccion mantenimiento fatiga somnolencia programa'
  },

  // ── CIANURO Y ALMACENAMIENTO DE SUSTANCIAS PELIGROSAS ─────────────────────
  {
    id: 'cianuro_almacenamiento_peligrosos',
    triggers: ['cianuro mina','uso cianuro mineria','cianuración oro plata',
               'planta cianuro','almacenar cianuro','ley cianuro peru','ley 29023',
               'trabajar con cianuro epp','poza cianuro','derrame cianuro',
               'intoxicacion cianuro','cianuro contenedor','almacenamiento sustancias peligrosas',
               'deposito sustancias peligrosas','contenedor quimico peligroso',
               'etiqueta contenedor peligroso','norma almacen quimicos',
               'recipiente materiales peligrosos'],
    articles: [337, 338, 339],
    response: '☣️ El cianuro y las sustancias peligrosas deben almacenarse en contenedores etiquetados y bajo Ley N° 29023. Artículos:',
    keywords: 'cianuro ley29023 almacenamiento sustancias peligrosas contenedor etiqueta deposito epp'
  },

  // ── ILUMINACIÓN EN TODA LA MINA ───────────────────────────────────────────
  {
    id: 'iluminacion_completa',
    triggers: ['iluminacion mina','cuantos lux mina','nivel iluminacion reglamento',
               'lamparas mina requisito','iluminacion subterranea minima',
               'luz interior labor','iluminacion taller mina','lampara frontal mina',
               'iluminacion sala maquinas','luxes sala maquinas','200 lux maquinas',
               '300 lux pasadizos','iluminacion escaleras mina','luxes reglamento minero',
               'luz pasadizo mina','iluminacion canales zanjas','luz natural mina',
               'tragaluz mina','ventana luz trabajo','emergencia iluminacion falla',
               'lampara emergencia mina','luz de emergencia mina',
               'iluminacion minima trabajo','nivel minimo luxes','lux requerido'],
    articles: [352, 353, 354, 355, 356, 357, 358, 359],
    response: '💡 La iluminación tiene niveles mínimos obligatorios: 200 lux en salas de máquinas, 300 lux en pasadizos. Artículos del Capítulo XII:',
    keywords: 'iluminacion lux lampara luz subterranea taller sala maquinas pasadizo natural emergencia'
  },

// ═══════════════════════════════════════════════════════════════════════════════
// FIN DEL BLOQUE — Total: 16 intenciones nuevas
// Cubre 100% de los capítulos del D.S. 024-2016-EM sin repetir intenciones existentes
// ═══════════════════════════════════════════════════════════════════════════════

];

// ─── MOTOR DE DETECCIÓN DE INTENCIÓN ─────────────────────────────────────────
function detectIntent(query) {
  if (!query || query.trim().length < 3) return null;

  const q = query.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .trim();

  let bestMatch = null;
  let bestScore = 0;

  for (const intent of INTENT_MAP) {
    let score = 0;

    for (const trigger of intent.triggers) {
      const t = trigger.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      // Coincidencia exacta del trigger completo — peso alto
      if (q.includes(t)) {
        score += t.split(' ').length * 20;
        continue;
      }

      // Coincidencia por palabras individuales — peso muy bajo para evitar contaminación
      const triggerWords = t.split(' ').filter(w => w.length > 3);
      const queryWords = q.split(' ');
      const matches = triggerWords.filter(tw => queryWords.some(qw => qw.includes(tw) || tw.includes(qw)));
      score += matches.length * 1;
    }

    // Bonus si el id del intent coincide directamente con la query
    const intentKeywords = intent.id.replace(/_/g, ' ').split(' ');
    const directHit = intentKeywords.some(kw => kw.length > 3 && q.includes(kw));
    if (directHit) score += 25;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = intent;
    }
  }

  // Umbral mínimo para activar la intención
  return bestScore >= 6 ? bestMatch : null;
}

// ─── FUNCIÓN PRINCIPAL: BÚSQUEDA CON INTENCIÓN ───────────────────────────────
function searchWithIntent(query, REGLAMENTO_DATA, searchFn) {
  const intent = detectIntent(query);

  if (!intent) {
    // Sin intención detectada → búsqueda normal
    return {
      hasIntent: false,
      results: searchFn(query),
      message: null
    };
  }

  // Obtener artículos de la intención directamente
  const intentArticles = intent.articles
    .map(id => REGLAMENTO_DATA.find(a => a.id === id))
    .filter(Boolean);

  // Complementar con búsqueda normal usando keywords de la intención
  const keywordResults = searchFn(intent.keywords || query);

  // Combinar sin duplicar
  const intentIds = new Set(intent.articles);
  const extra = keywordResults.filter(a => !intentIds.has(a.id)).slice(0, 10);

  return {
    hasIntent: true,
    intent: intent,
    results: [...intentArticles, ...extra],
    message: intent.response
  };
}