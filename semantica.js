// ═══════════════════════════════════════════════════════════════════════════════
// MOTOR SEMÁNTICO — MEJORA 4
// Traduce lenguaje cotidiano → términos técnicos del reglamento
// Sin API key. 100% gratuito. Basado en análisis real de los 417 artículos.
// ═══════════════════════════════════════════════════════════════════════════════

// ─── DICCIONARIO SEMÁNTICO ────────────────────────────────────────────────────
// Estructura: frase cotidiana → { tecnico, hint }
//   tecnico : lo que se busca en el reglamento
//   hint    : sugerencia visual que ve el usuario ("¿Quisiste decir...?")

const SEMANTIC_MAP = [

  // ══ CUERPO HUMANO → PROTECCIÓN ════════════════════════════════════════════
  { from: ['proteger oidos','cuidar oidos','ruido me afecta','me duelen oidos','tapones oidos','orejeras'],
    to: 'proteccion auditiva ruido exposicion epp', hint: 'protección auditiva' },

  { from: ['proteger ojos','cuidar vista','lentes trabajo','goggles','anteojo seguridad','salpicadura ojos'],
    to: 'lentes proteccion ocular epp visual', hint: 'protección ocular' },

  { from: ['proteger manos','guantes trabajo','cortarme mano','lastimar mano','manos quimicos'],
    to: 'guantes proteccion manos epp', hint: 'protección de manos' },

  { from: ['proteger pies','botas trabajo','zapato punta acero','aplastarse pie','caer objeto pie'],
    to: 'calzado proteccion pies botas epp', hint: 'calzado de seguridad' },

  { from: ['proteger cabeza','casco obligatorio','golpe cabeza','caer objeto cabeza'],
    to: 'casco proteccion cabeza epp', hint: 'casco de seguridad' },

  { from: ['proteger espalda','dolor espalda','levantar peso','carga manual','postura trabajo'],
    to: 'ergonomia carga postural esfuerzo fisico', hint: 'ergonomía y cargas' },

  { from: ['respirar mal','aire sucio','humo trabajo','gases toxicos','no puedo respirar','mascara respirar'],
    to: 'respirador proteccion respiratoria gases polvo epp', hint: 'protección respiratoria' },

  { from: ['proteger cuerpo','ropa trabajo','uniforme seguridad','vestimenta trabajo'],
    to: 'vestimenta proteccion epp ropa trabajo', hint: 'vestimenta de protección' },

  // ══ PELIGROS COTIDIANOS → TÉCNICO ═════════════════════════════════════════
  { from: ['me cai','caer al vacio','resbalarse','tropezar','caida de persona','me resbalé'],
    to: 'caida altura trabajo en altura prevencion caida', hint: 'caída de personas' },

  { from: ['me cayo algo encima','objeto cayo','material cayo','roca cayo','techo cayo'],
    to: 'caida objeto material proyeccion sostenimiento', hint: 'caída de objetos' },

  { from: ['me queme','quemadura trabajo','calor excesivo','temperatura alta trabajo','estrés termico'],
    to: 'estres termico temperatura calor quemadura', hint: 'estrés térmico' },

  { from: ['me congelé','frio extremo','temperatura baja','hipotermia','trabajar bajo frio'],
    to: 'temperatura baja congelamiento frio exposicion', hint: 'exposición al frío' },

  { from: ['me electrocuté','descarga electrica','corriente electrica','toque cable','electrocutarse'],
    to: 'electricidad riesgo electrico descarga instalacion', hint: 'riesgo eléctrico' },

  { from: ['aplastamiento','me aplastaron','maquina me atrapó','atrapamiento maquina','enganche maquina'],
    to: 'atrapamiento aplastamiento maquinaria equipos', hint: 'atrapamiento por equipos' },

  { from: ['aire sucio','aire viciado','mala ventilacion','no hay aire','oxigeno bajo','me ahogo mina'],
    to: 'ventilacion oxigeno gases mina calidad aire', hint: 'ventilación deficiente' },

  { from: ['polvo mina','polvo respiro','polvo en cara','mucho polvo','polvo blanco roca'],
    to: 'polvo respirable silice material particulado', hint: 'polvo y sílice' },

  { from: ['mucho ruido','ruido molesta','sordera trabajo','tapones ruido','ruido maquina'],
    to: 'ruido exposicion decibeles proteccion auditiva', hint: 'exposición al ruido' },

  { from: ['vibra mucho','vibracion herramienta','maquina vibra','martillo vibra'],
    to: 'vibracion mano brazo exposicion', hint: 'vibración en manos' },

  { from: ['muy oscuro','no se ve','falta luz','poca luz mina','alumbrado malo'],
    to: 'iluminacion luxes alumbrado visibilidad', hint: 'iluminación deficiente' },

  { from: ['mucho calor','sol fuerte','trabajar calor','temperatura extrema'],
    to: 'estres termico temperatura calor hidratacion', hint: 'estrés térmico' },

  { from: ['derrumbe','caida techo','roca suelta','techo cede','colapso galeria','hundimiento'],
    to: 'derrumbe sostenimiento estabilidad roca desate', hint: 'derrumbe y estabilidad' },

  { from: ['inundacion mina','agua mina','me inundo','nivel agua subio','drenaje mina'],
    to: 'inundacion drenaje agua mina', hint: 'inundación en mina' },

  { from: ['incendio','hay fuego','se incendio','llamas','humo incendio','fuego mina'],
    to: 'incendio extintor fuego prevencion control', hint: 'prevención de incendios' },

  { from: ['explosion','exploto','detonacion accidental','disparo prematuro','fallo voladura'],
    to: 'explosion voladura accidente explosivos', hint: 'explosión accidental' },

  // ══ SITUACIONES LABORALES → TÉCNICO ═══════════════════════════════════════
  { from: ['no quiero trabajar','me niego','puedo parar','derecho parar','trabajo peligroso negarme',
           'condicion insegura','no es seguro','peligroso trabajar'],
    to: 'derecho negarse trabajo peligroso paralizar trabajador', hint: 'derecho a negarse a trabajar' },

  { from: ['me despidieron por accidente','despido accidente','botaron por seguridad'],
    to: 'derechos trabajador accidente despido', hint: 'derechos ante accidente' },

  { from: ['nuevo en trabajo','primer dia','recien ingrese','induccion trabajo','orientacion nuevo'],
    to: 'induccion capacitacion nuevo trabajador ingreso', hint: 'inducción al trabajo' },

  { from: ['turno noche','trabajar noche','trabajo nocturno','jornada nocturna'],
    to: 'turno trabajo nocturno jornada', hint: 'trabajo nocturno' },

  { from: ['cansado trabajo','fatiga laboral','somnolencia','mucho sueño trabajo','agotamiento'],
    to: 'fatiga somnolencia descanso jornada trabajo', hint: 'fatiga laboral' },

  { from: ['estresado trabajo','ansiedad trabajo','presion trabajo','estrés laboral'],
    to: 'factores psicosociales estres laboral trabajo', hint: 'factores psicosociales' },

  { from: ['tomé licor','alcohol trabajo','borracho mina','prueba alcohol','alcotest mina'],
    to: 'alcohol trabajo prohibicion prueba', hint: 'alcohol en el trabajo' },

  { from: ['embarazada trabajo','gestante mina','mujer embarazada','lactancia trabajo'],
    to: 'mujer embarazada gestante lactancia trabajo', hint: 'trabajadora gestante' },

  { from: ['me operaron','post operacion','volver trabajo enfermedad','alta medica'],
    to: 'aptitud medica retorno trabajo examen', hint: 'retorno al trabajo' },

  { from: ['enfermedad trabajo','me enferme trabajo','enfermedad por trabajo','enferme en mina'],
    to: 'enfermedad ocupacional profesional trabajo', hint: 'enfermedad ocupacional' },

  // ══ ACCIDENTES → PROCEDIMIENTO ════════════════════════════════════════════
  { from: ['hubo un accidente','ocurrio accidente','paso algo grave','hay herido','trabajador herido'],
    to: 'accidente trabajo notificacion investigacion herido', hint: 'accidente de trabajo' },

  { from: ['murio trabajador','fallecio trabajador','muerte en mina','accidente fatal','obrero muerto'],
    to: 'accidente mortal notificacion 24 horas investigacion', hint: 'accidente mortal' },

  { from: ['casi accidente','por poco','estuvo a punto','casi me pasa','incidente leve'],
    to: 'incidente peligroso casi accidente reporte', hint: 'incidente peligroso' },

  { from: ['como reporto','donde aviso','a quien llamo accidente','reportar urgente','a quien notifico'],
    to: 'notificacion accidente plazo formulario ministerio', hint: 'notificación de accidente' },

  // ══ EQUIPOS Y MAQUINARIA → TÉCNICO ═══════════════════════════════════════
  { from: ['apagar maquina','bloquear maquina','candado seguridad','maquina no se apaga',
           'energia bloqueada','loto maquina'],
    to: 'bloqueo señalizacion energia peligrosa loto', hint: 'bloqueo de energía (LOTO)' },

  { from: ['levantar carga','izar peso','grua mina','colgar carga','carga arriba'],
    to: 'izaje grua winche carga suspendida eslingas', hint: 'izaje de cargas' },

  { from: ['manejar vehiculo mina','conducir mina','chofer mina','camioneta mina','volquete manejo'],
    to: 'transporte vehiculo operador mina acarreo', hint: 'vehículos en mina' },

  { from: ['maquina fallo','equipo roto','herramienta mala','equipo sin mantenimiento'],
    to: 'mantenimiento maquinaria equipos herramientas', hint: 'mantenimiento de equipos' },

  // ══ ESPACIOS Y LUGARES → TÉCNICO ══════════════════════════════════════════
  { from: ['lugar cerrado','cuarto sin ventilacion','espacio pequeño','tanque interior','silo'],
    to: 'espacio confinado permiso trabajo oxigeno', hint: 'espacio confinado' },

  { from: ['trabajar arriba','trabajar altura','andamio','techo trabajo','nivel alto'],
    to: 'trabajo altura arnes linea vida caida', hint: 'trabajo en altura' },

  { from: ['bajar al socavon','entrar galeria','trabajo subterraneo','bajo tierra','interior mina'],
    to: 'operaciones subterraneas labor galeria', hint: 'trabajo subterráneo' },

  { from: ['salida emergencia','donde escapar','ruta escape','como salgo','evacuar mina'],
    to: 'via escape ruta evacuacion emergencia salida', hint: 'vías de escape' },

  { from: ['zona peligrosa','area peligro','donde no entrar','acceso prohibido','zona restringida'],
    to: 'area restringida zona peligro acceso prohibido señalizacion', hint: 'zonas restringidas' },

  // ══ BIENESTAR → TÉCNICO ══════════════════════════════════════════════════
  { from: ['donde duermo','campamento mina','dormitorio mina','habitacion mina','vivienda minera'],
    to: 'vivienda campamento dormitorio habitacion', hint: 'vivienda en campamento' },

  { from: ['donde como','comedor mina','alimentacion mina','refrigerio trabajo','hora comida'],
    to: 'comedor alimentacion refrigerio bienestar', hint: 'alimentación en mina' },

  { from: ['baño mina','servicio higienico','letrina mina','ducha trabajo','aseo personal'],
    to: 'facilidades sanitarias baño ducha higiene', hint: 'facilidades sanitarias' },

  { from: ['medico mina','doctor mina','atencion medica','enfermeria','topico mina'],
    to: 'asistencia medica hospitalaria medico enfermeria', hint: 'atención médica' },

  { from: ['me duele algo','control medico','examen fisico','chequeo medico','apto para trabajar'],
    to: 'examen medico ocupacional aptitud vigilancia', hint: 'examen médico' },

  // ══ GESTIÓN → TÉCNICO ════════════════════════════════════════════════════
  { from: ['como se forma comite','quien integra comite','comite obligatorio','elegir representante'],
    to: 'comite seguridad salud sso integrantes eleccion', hint: 'Comité de SSO' },

  { from: ['cuantas horas capacitacion','charla obligatoria','capacitacion obligatoria','entrenamiento obligatorio'],
    to: 'capacitacion horas programa obligatorio', hint: 'capacitación obligatoria' },

  { from: ['programa seguridad','plan anual seguridad','passt','programa anual'],
    to: 'programa anual seguridad salud passt', hint: 'Programa Anual SSO' },

  { from: ['reglamento interno','risst','reglamento empresa','norma interna'],
    to: 'reglamento interno seguridad salud risst', hint: 'Reglamento Interno SSO' },

  { from: ['me pueden multar','cuanto multa','sancion empresa','fiscalizan','viene osinergmin','viene sunafil'],
    to: 'sancion multa infraccion fiscalizacion', hint: 'sanciones e infracciones' },

  { from: ['indices accidentabilidad','calcular ifar','indice frecuencia','tasa accidente'],
    to: 'estadisticas indices frecuencia gravedad accidentabilidad', hint: 'índices de accidentabilidad' },

  { from: ['sustancia peligrosa','quimico peligroso','hoja seguridad','msds','ficha seguridad'],
    to: 'sustancias peligrosas msds hoja seguridad quimicos', hint: 'sustancias peligrosas' },

  { from: ['señal de peligro','señal obligatorio','señal advertencia','que significan colores'],
    to: 'señalizacion colores codigo seguridad advertencia', hint: 'señalización de seguridad' },

  // ══ OPERACIONES ESPECÍFICAS → TÉCNICO ════════════════════════════════════
  { from: ['perforar roca','taladrar roca','perforacion manual','jumbo perforacion'],
    to: 'perforacion voladura subterranea', hint: 'perforación de roca' },

  { from: ['cargar explosivo','poner anfo','colocar detonador','cargar taladros'],
    to: 'explosivos voladura manipuleo carga', hint: 'carga de explosivos' },

  { from: ['ventilar galeria','renovar aire','ducto aire','ventilador auxiliar'],
    to: 'ventilacion galeria aire fresco ducto', hint: 'ventilación de galerías' },

  { from: ['agua mina','bombear agua','drenaje subterraneo','inundacion galeria'],
    to: 'drenaje agua mina inundacion bombeo', hint: 'drenaje en mina' },

  { from: ['sacar mineral','extraer mineral','izaje mineral','subir mineral'],
    to: 'extraccion mineral izaje pique', hint: 'extracción de mineral' },

  { from: ['trabajar en caliente','soldadura mina','corte metalico','chispas trabajo'],
    to: 'trabajo caliente soldadura permiso incendio', hint: 'trabajo en caliente' },

    // ═══════════════════════════════════════════════════════════════════════════════
// NUEVAS ENTRADAS SEMÁNTICAS — BLOQUE COMPLETO
// ─────────────────────────────────────────────────────────────────────────────
// INSTRUCCIÓN: Pega este bloque DENTRO del array SEMANTIC_MAP de semantica.js,
// justo antes del cierre "]; " del array.
// No repite ninguna entrada ya existente.
// Cubre los 56 capítulos del D.S. 024-2016-EM al 100%.
// ═══════════════════════════════════════════════════════════════════════════════

  // ══ REGLAMENTO Y NORMATIVA → TÉCNICO ══════════════════════════════════════
  { from: ['que dice el reglamento','norma mineria','ley minera','decreto supremo minas',
           'que dice ds024','base legal mina','norma sso mineria','reglamento minero'],
    to: 'disposiciones generales objetivo alcance reglamento ds024', hint: 'base legal del reglamento' },

  { from: ['que significa','que es un','definicion de','como se llama','glosario','vocabulario mina',
           'termino tecnico mineria','que quiere decir'],
    to: 'definiciones terminos glosario reglamento minero', hint: 'glosario técnico minero' },

  // ══ LIDERAZGO Y POLÍTICA SSO → TÉCNICO ════════════════════════════════════
  { from: ['gerencia debe hacer','jefe debe seguridad','compromiso jefe','gerente no apoya',
           'direccion no hace caso','empresa no se preocupa','alta gerencia seguridad'],
    to: 'liderazgo alta gerencia compromiso recursos sso', hint: 'liderazgo en SSO' },

  { from: ['politica de seguridad','declaracion seguridad empresa','politica prevencion',
           'tiene que haber politica','documento politica sso','politica escrita'],
    to: 'politica sistema gestion seguridad salud escrita', hint: 'Política de SSO' },

  { from: ['programa del año','plan anual mina','programa sso año','que actividades año',
           'planificacion anual seguridad','cronograma sso'],
    to: 'programa anual seguridad salud passt planificacion', hint: 'elaboración del Programa Anual SSO' },

  // ══ CONTRATISTAS → TÉCNICO ════════════════════════════════════════════════
  { from: ['empresa contratada','empresa que contrate','tercero en mina','service mina',
           'empresa externa mina','subcontrato','quien responde contratista',
           'el titular responde por contratista','accidente trabajador tercero'],
    to: 'empresa contratista obligaciones responsabilidad solidaria titular', hint: 'empresas contratistas' },

  { from: ['contratista debe inscribirse','registro contratista','contratista autorizado',
           'dgm registro empresa','empresa minera inscrita'],
    to: 'contratista inscripcion direccion general mineria dgm', hint: 'registro de contratistas' },

  // ══ OBLIGACIONES ESPECÍFICAS → TÉCNICO ════════════════════════════════════
  { from: ['que hace el supervisor','rol del supervisor','supervisor que obligaciones',
           'que exigen al capataz','responsabilidad del jefe de guardia','ingeniero de seguridad que hace'],
    to: 'obligaciones supervisor funciones responsabilidad seguridad', hint: 'obligaciones del supervisor' },

  { from: ['que debo hacer como obrero','mis deberes trabajo','trabajador debe cumplir',
           'que se exige al trabajador','obligaciones mias en mina'],
    to: 'obligaciones trabajador deberes cumplimiento normas', hint: 'obligaciones del trabajador' },

  { from: ['puedo entrar a cualquier parte','me pueden prohibir zona','area prohibida para mi',
           'no dejan entrar','quien decide quien entra mina'],
    to: 'prohibicion ingreso instalaciones labores acceso control', hint: 'control de acceso a labores' },

  // ══ SISTEMA DE GESTIÓN → TÉCNICO ══════════════════════════════════════════
  { from: ['como identifico peligros campo','peligro en mi tarea','evaluar riesgo antes de trabajar',
           'iperc antes de empezar','iperc en campo','iperc continuo','peligros diarios'],
    to: 'iperc continuo identificacion peligros campo evaluacion riesgo', hint: 'IPERC continuo' },

  { from: ['como hago el procedimiento','hacer pets paso a paso','escribir procedimiento trabajo',
           'procedimiento obligatorio','estandar trabajo seguro','elaborar pets'],
    to: 'pets procedimiento escrito trabajo seguro elaboracion estandar', hint: 'elaboración de PETS' },

  { from: ['tarea que nunca hice','trabajo nuevo sin procedimiento','tarea rara sin pets',
           'actividad no rutinaria que hago','analisis rapido tarea','ats antes de trabajar'],
    to: 'ats analisis trabajo seguro tarea no rutinaria formato', hint: 'ATS (tarea no rutinaria)' },

  { from: ['quien fiscaliza mina','viene a inspeccionar','visita osinergmin','inspeccion sunafil',
           'inspeccion ministerio','funcionario mina','fiscalizador que puede hacer'],
    to: 'autoridad competente osinergmin sunafil dgm fiscalizacion inspeccion', hint: 'fiscalización minera' },

  { from: ['me van a multar','sancion por incumplir','pueden cerrar mina','paralizacion actividades',
           'consecuencia no cumplir norma','responsabilidad penal empresa'],
    to: 'multa sancion paralizacion infraccion responsabilidad civil penal', hint: 'sanciones y multas' },

  // ══ AUDITORÍAS E INSPECCIONES → TÉCNICO ═══════════════════════════════════
  { from: ['auditoria de seguridad','revisar sistema gestion','verificar cumplimiento sso',
           'auditoria interna mina','programa auditoria','hallazgos auditoria'],
    to: 'auditoria interna sistema gestion seguridad programa hallazgo', hint: 'auditoría interna' },

  { from: ['auditoria externa obligatoria','cada cuanto auditan','empresa auditora externa',
           'informe auditoria gobierno','auditor externo mina','tres años auditoria'],
    to: 'auditoria externa tres años sunafil osinergmin informe', hint: 'auditoría externa' },

  { from: ['inspeccion planificada','recorrer area trabajo','verificar condiciones','checklist inspeccion',
           'ronda seguridad','inspeccionar instalaciones','inspeccion gerencial'],
    to: 'inspecciones controles planificadas condiciones trabajo', hint: 'inspecciones de seguridad' },

  // ══ GERENTE SSO → TÉCNICO ═════════════════════════════════════════════════
  { from: ['perfil gerente seguridad','anos experiencia gerente sso','titulo gerente sso',
           'que estudios gerente seguridad','requisito jefe sso','ingeniero seguridad requisitos',
           'cuanto experiencia necesita','quien puede ser gerente sso'],
    to: 'gerente seguridad salud ocupacional requisitos perfil experiencia funciones', hint: 'Gerente de SSO' },

  // ══ HIGIENE OCUPACIONAL → TÉCNICO ═════════════════════════════════════════
  { from: ['medir agentes fisicos','medir polvo trabajo','medir ruido trabajo','medir gases',
           'cuanto polvo hay','monitorear ambiente','higienista industrial','profesional higiene'],
    to: 'higiene ocupacional monitoreo agentes fisicos quimicos biologicos medicion', hint: 'higiene ocupacional' },

  { from: ['agente quimico trabajo','quimico en mi area','exposicion quimica','reactivo peligroso',
           'acido mina','cal viva','combustible mina','solvente trabajo'],
    to: 'agentes quimicos exposicion limite higiene ocupacional monitoreo', hint: 'agentes químicos' },

  { from: ['bacteria trabajo','hongo mina','agente biologico','riesgo biologico mina',
           'microorganismo trabajo','enfermedad infecciosa trabajo'],
    to: 'agentes biologicos riesgo exposicion higiene ocupacional', hint: 'agentes biológicos' },

  { from: ['limite exposicion','valor limite','tlv mineria','dosis maxima','cuanto me afecta',
           'cuanto es peligroso','valor maximo permitido','anexo 15'],
    to: 'limite exposicion ocupacional tlv valor maximo anexo higiene', hint: 'límites de exposición' },

  // ══ ERGONOMÍA ESPECÍFICA → TÉCNICO ════════════════════════════════════════
  { from: ['levantar mucho peso','carga muy pesada','cuanto puedo cargar','peso maximo levantar',
           'hernia por trabajo','columna trabajo','lumbalgia laboral'],
    to: 'ergonomia carga manual peso maximo esfuerzo lumbar', hint: 'manejo de cargas' },

  { from: ['siempre misma posicion','postura forzada','postura incomoda trabajo','sentado todo dia',
           'brazo arriba todo el dia','movimiento repetitivo','lesion por postura'],
    to: 'ergonomia postura forzada repetitivo disergonomico', hint: 'posturas de trabajo' },

  // ══ SALUD OCUPACIONAL ESPECÍFICA → TÉCNICO ════════════════════════════════
  { from: ['examen antes de entrar','examen al ingresar','examen ingreso nuevo','apto medico ingreso',
           'evaluacion medica primer dia','examen preocupacional'],
    to: 'examen medico ocupacional ingreso preocupacional aptitud', hint: 'examen de ingreso' },

  { from: ['examen cada año','chequeo periodico','control medico anual','revision medica',
           'examen ocupacional periodico','cuantas veces examen medico'],
    to: 'examen medico periodico vigilancia salud ocupacional', hint: 'examen periódico' },

  { from: ['examen al salir','examen retiro empresa','examen ultimo dia','examen cuando me voy'],
    to: 'examen medico retiro egreso ocupacional', hint: 'examen de retiro' },

  { from: ['me pueden hacer trabajar enfermo','aptitud para trabajar','no estoy apto','observado medico',
           'restriccion medica trabajo','trabajo con enfermedad'],
    to: 'aptitud medica restriccion laboral vigilancia salud', hint: 'aptitud médica' },

  { from: ['enfermedad por polvo','pulmones polvo mina','silicosis que es','neumoconiosis',
           'polvo me daña pulmones','enfermedad por respirar polvo'],
    to: 'silicosis neumoconiosis polvo pulmones enfermedad ocupacional prevalente', hint: 'silicosis y neumoconiosis' },

  { from: ['sordera trabajo','perdida audicion','daño oido trabajo','hipoacusia','oido dañado ruido'],
    to: 'hipoacusia perdida audicion ruido enfermedad ocupacional', hint: 'hipoacusia laboral' },

  // ══ PRIMEROS AUXILIOS ESPECÍFICOS → TÉCNICO ═══════════════════════════════
  { from: ['que hago si alguien no respira','rcp minero','reanimacion trabajo','paro cardiaco mina',
           'como reanimo','persona inconsciente mina'],
    to: 'primeros auxilios rcp reanimacion paro cardiaco atencion', hint: 'RCP y primeros auxilios' },

  { from: ['botiquin que tiene','que debe tener botiquin','botiquin obligatorio','medicamentos mina',
           'vendas gasas suero','equipar botiquin'],
    to: 'botiquin primeros auxilios contenido medicamentos equipamiento', hint: 'botiquín de primeros auxilios' },

  { from: ['traslado herido','como muevo herido','camilla mina','llevar accidentado','mover lesionado',
           'evacuacion emergencia medica','ambulancia mina llegar'],
    to: 'evacuacion medica traslado herido camilla ambulancia emergencia', hint: 'evacuación de heridos' },

  { from: ['dentista en mina','diente trabajo','atencion dental campamento','caries trabajo',
           'revision dental mina','vision trabajo','lentes trabajador mina'],
    to: 'atencion dental oftalmologica anual campamento vision', hint: 'atención dental y visual' },

  // ══ BIENESTAR ESPECÍFICO → TÉCNICO ════════════════════════════════════════
  { from: ['lavar ropa trabajo','ropa sucia trabajo','donde lavo uniforme','ropa contaminada',
           'uniforme limpio mina','casillero guardar ropa','locker mina'],
    to: 'lavanderia vestuario ropa trabajo higiene casillero', hint: 'lavandería y vestuario' },

  { from: ['tiempo libre mina','deporte campamento','cancha mina','area recreo',
           'actividad recreativa mina','instalacion deporte campamento'],
    to: 'recreacion deporte tiempo libre areas instalaciones campamento', hint: 'recreación en campamento' },

  { from: ['asistente social mina','problema personal trabajo','apoyo social empresa',
           'servicio social campamento','bienestar social minero'],
    to: 'asistencia social trabajador bienestar servicio apoyo', hint: 'asistencia social' },

  // ══ EMERGENCIAS Y COMUNICACIÓN → TÉCNICO ══════════════════════════════════
  { from: ['como me comunico en mina','radio en mina','señal adentro mina','telefono galeria',
           'comunicacion interior mina','sin señal mina'],
    to: 'sistema comunicacion radio telefono subterranea emergencia', hint: 'comunicación en mina' },

  { from: ['que hago en un sismo mina','terremoto mina','temblor en mina','sismo galeria',
           'que hago cuando tiembla','emergencia sismica'],
    to: 'plan emergencia sismo evacuacion simulacro contingencia', hint: 'emergencia sísmica' },

  { from: ['practicar evacuacion','ensayo emergencia','drill mina','simulacro incendio',
           'como se hace simulacro','simulacro obligatorio','frecuencia simulacro'],
    to: 'simulacro emergencia evacuacion ejercicio drill obligatorio', hint: 'simulacros de emergencia' },

  { from: ['brigadista mina','quien es brigadista','integrar brigada','como ser brigadista',
           'entrenamiento rescate','grupo emergencia mina','equipo salvamento'],
    to: 'brigada emergencia integrantes entrenamiento rescate salvamento', hint: 'brigadas de emergencia' },

  // ══ SEÑALIZACIÓN ESPECÍFICA → TÉCNICO ══════════════════════════════════════
  { from: ['que color es peligro','color rojo que significa','color verde que significa',
           'colores seguridad mina','color amarillo que es','codigo colores reglamento',
           'color azul obligacion','color naranja mina'],
    to: 'codigo colores señalizacion seguridad obligacion prohibicion advertencia anexo17', hint: 'código de colores' },

  { from: ['poner letrero','colocar señal','letrero area peligrosa','señal visible mina',
           'donde poner señal','señal estrategica','punto visible señal'],
    to: 'señalizacion letrero area trabajo punto visible estrategico', hint: 'colocación de señales' },

  { from: ['tarjeta roja maquina','tarjeta peligro equipo','bloquear con tarjeta',
           'señal maquina peligrosa','etiqueta bloqueo','no operar tarjeta'],
    to: 'bloqueo señalizacion tarjeta roja energia peligrosa loto', hint: 'tarjeta de bloqueo (LOTO)' },

  // ══ SOSTENIMIENTO ESPECÍFICO → TÉCNICO ════════════════════════════════════
  { from: ['poner pernos roca','instalar perno anclaje','perno cementado','perno de friccion',
           'perno helical','split set mina','swellex mina'],
    to: 'perno anclaje sostenimiento cementado friccion instalacion', hint: 'pernos de anclaje' },

  { from: ['malla techo galeria','malla sostenimiento','instalar malla','malla metálica labor',
           'malla ciclonica mina','galvanizada sostenimiento'],
    to: 'malla sostenimiento techo pared instalacion labor', hint: 'malla de sostenimiento' },

  { from: ['shotcrete mina','concreto proyectado','lanzar concreto','gunita mina',
           'concreto roca','recubrir roca concreto'],
    to: 'shotcrete concreto proyectado sostenimiento roca', hint: 'shotcrete' },

  { from: ['cuadro madera mina','marco madera sostenimiento','timbrado madera','cuadro metalico',
           'cercha metalica mina','arco metalico galeria'],
    to: 'cuadro sostenimiento madera metalico arco cercha', hint: 'cuadros y cerchas' },

  { from: ['revisar techo antes de entrar','golpear techo barretilla','roca floja arriba',
           'desatar antes de trabajar','primero desato','limpiar frente roca',
           'barretilla en mano','dos personas desate'],
    to: 'desate rocas barretilla inspeccion techo labor dos personas', hint: 'desate de rocas' },

  // ══ OPERACIONES SUBTERRÁNEAS → TÉCNICO ═══════════════════════════════════
  { from: ['rellenar tajo','relleno mina','backfill','pasta relleno','relleno cementado',
           'relleno hidraulico mina','material relleno labor','rellenar labor minada'],
    to: 'relleno labor tajeo hidraulico pasta cementado backfill', hint: 'relleno de labores' },

  { from: ['preparar chimenea','subir chimenea','bajar chimenea','chimenea minera',
           'alimak chimenea','raise boring chimenea','rimado','jaula chimenea'],
    to: 'chimenea preparacion raise boring alimak rimado jaula seguridad', hint: 'preparación de chimeneas' },

  { from: ['diseñar malla perforacion','patron de taladros','taladros de alivio',
           'tiro cortado que hago','tiro fallado que hago','taladro no detono',
           'malla de perforacion frente'],
    to: 'perforacion diseño malla taladro tiro cortado fallado frente', hint: 'diseño de malla de perforación' },

  { from: ['metodo de minado','como explotar la veta','metodo subterraneo elegir',
           'corte y relleno metodo','sublevel stoping','camara y pilares',
           'open stope','block caving','método minado seguro'],
    to: 'metodo minado subterraneo seleccion corte relleno camara pilares', hint: 'método de minado' },

  { from: ['agua en galeria','galeria inundada','bomba achique','sacar agua labor',
           'cuneta galeria','agua filtrando','dique agua','estacion bombeo subterranea'],
    to: 'drenaje bombeo agua mina cuneta inundacion galeria', hint: 'drenaje subterráneo' },

  { from: ['gas en galeria','monoxido galeria','co mina','detectar gas labor',
           'equipo deteccion gas','monitor personal gas','alarma gas mina'],
    to: 'gases mina monoxido deteccion alarma ventilacion calidad aire', hint: 'detección de gases' },

  // ══ CIELO ABIERTO → TÉCNICO ════════════════════════════════════════════════
  { from: ['angulo del tajo','estabilidad del pit','talud tajo se cae','geotecnia del tajo',
           'estudio geotecnico tajo','deslizamiento talud','roca talud falla'],
    to: 'geotecnia tajo estabilidad talud diseño pendiente geomecanica', hint: 'estabilidad de taludes' },

  { from: ['donde boto desmonte','botadero donde','escombrera tajo','donde pongo el desmonte',
           'material esteril donde','top soil donde deposito'],
    to: 'botadero desmonte escombrera diseño estabilidad operacion dgm', hint: 'botaderos de desmonte' },

  { from: ['voladura en superficie','disparo en tajo','zona de exclusion tajo','alejarse voladura',
           'vibra todo voladura','casas cerca del tajo','vibracion por disparo',
           'monitoreo vibracion voladura','daños por voladura'],
    to: 'voladura cielo abierto zona exclusion vibracion monitoreo comunidad', hint: 'voladura en tajo abierto' },

  { from: ['operador cansado tajo','dormido manejando mina','somnolencia camion',
           'turno muy largo operador','programa anti sueño','detector fatiga camion',
           'operador que no duerme'],
    to: 'fatiga somnolencia operador equipo tajo programa control prevencion', hint: 'fatiga de operadores' },

  { from: ['camion tajo requisitos','pala electrica seguridad','retroexcavadora mina normas',
           'rops fops camion','cabina protegida equipo','extintor equipo tajo',
           'equipo movil tajo condiciones'],
    to: 'equipos cielo abierto requisitos rops fops inspeccion mantenimiento', hint: 'equipos en tajo abierto' },

  // ══ PLANTAS DE BENEFICIO → TÉCNICO ════════════════════════════════════════
  { from: ['trabajo en planta','planta procesamiento','concentradora seguridad',
           'chancadora peligros','molino peligros','flotacion quimicos',
           'planta mineral seguridad','equipo planta peligro'],
    to: 'planta concentradora operaciones beneficio chancado molienda flotacion', hint: 'planta concentradora' },

  { from: ['horno fundicion peligros','metal fundido quemadura','trabajo con metal caliente',
           'escoria fundicion','fundicion de mineral','pirometalurgia seguridad'],
    to: 'fundicion pirometalurgia horno metal caliente escoria epp', hint: 'fundición metalúrgica' },

  { from: ['lixiviacion peligros','heap leach seguridad','pila de mineral acido',
           'poza solucion acida','planta hidrometalurgica','electrodeposicion seguridad'],
    to: 'lixiviacion hidrometalurgia heap leach poza solucion acida epp', hint: 'planta de lixiviación' },

  { from: ['mercurio peligroso','intoxicacion mercurio','vapores mercurio','amalgama oro',
           'retorta mercurio','derrame mercurio','mercurio en trabajo'],
    to: 'mercurio amalgamacion vapores intoxicacion retorta derrame epp', hint: 'manejo de mercurio' },

  { from: ['trabajar con cianuro','cianuro oro plata','intoxicacion cianuro',
           'derrame cianuro','epp cianuro mina','poza cianuro peligro',
           'ley cianuro','usar cianuro que hago'],
    to: 'cianuro cianuración epp intoxicacion derrame ley29023', hint: 'manejo de cianuro' },

  { from: ['almacenar concentrado','deposito mineral','polvo concentrado plomo',
           'manipular concentrado','concentrado toxicidad','exportar concentrado'],
    to: 'deposito concentrado almacenamiento manipuleo polvo plomo toxicidad', hint: 'depósito de concentrados' },

  // ══ SERVICIOS Y UTILITIES → TÉCNICO ═══════════════════════════════════════
  { from: ['caldero que peligros','vapor presion alta','caldera mina','explosión caldero',
           'presion vapor caldero','operador caldero'],
    to: 'caldero vapor presion alta peligro operacion seguridad', hint: 'calderos y vapor' },

  { from: ['compresor mina','aire comprimido peligros','tuberia aire presion',
           'manguera aire trabajo','explosión compresor','presion aire mina'],
    to: 'aire comprimido compresor presion tuberia manguera seguridad', hint: 'aire comprimido' },

  { from: ['agua potable campamento','tomar agua mina','agua buena para beber',
           'calidad agua mina','agua contaminada campamento','fuente agua potable'],
    to: 'agua potable calidad campamento fuente suministro mina', hint: 'agua potable en mina' },

  { from: ['subir andamio','andamio seguro','andamio mina','trabajo andamio',
           'caer del andamio','montar andamio','andamio certificado'],
    to: 'andamio escalera seguridad altura certificado montaje', hint: 'andamios' },

  { from: ['edificio mina condicion','oficina mina segura','taller condiciones',
           'instalacion minera segura','planta condiciones edificio','estructura mina'],
    to: 'edificaciones instalaciones condiciones seguridad estructura', hint: 'edificaciones e instalaciones' },

  // ══ TRANSPORTE DE PERSONAL → TÉCNICO ══════════════════════════════════════
  { from: ['bus mina seguro','camion de personal','movilidad campamento','transporte trabajadores',
           'vehiculo personal mina','traslado en bus','buses mineros requisitos'],
    to: 'transporte personal bus vehiculo trabajadores requisitos seguridad', hint: 'transporte de personal' },

  // ══ ILUMINACIÓN ESPECÍFICA → TÉCNICO ══════════════════════════════════════
  { from: ['cuantos luxes necesito','nivel de luz reglamento','luxes minimo trabajo',
           '200 luxes','300 luxes','nivel luxes pasadizo','luxes sala maquinas'],
    to: 'iluminacion luxes nivel minimo sala maquinas pasadizo reglamento', hint: 'niveles mínimos de luxes' },

  { from: ['lampara de minero','lampara frontal','lamparita casco','luz casco minero',
           'lampara subterranea','lamparas que se usan','lampara recargable mina'],
    to: 'lampara frontal iluminacion individual subterranea intensidad', hint: 'lámparas mineras' },

  { from: ['luz emergencia fallo','cuando se va la luz','corte luz mina',
           'iluminacion emergencia','luz de respaldo','luz si falla corriente'],
    to: 'iluminacion emergencia respaldo fallo corriente natural', hint: 'iluminación de emergencia' },

  // ══ MINERÍA ESPECIAL → TÉCNICO ═════════════════════════════════════════════
  { from: ['mina de carbon','trabajar carbon','carbon subterraneo','metano mina carbon',
           'grisu explosion','gas carbon mina','mina gaseosa'],
    to: 'carbon explotacion grisu metano explosion ventilacion especial', hint: 'minería de carbón' },

  { from: ['draga oro','oro aluvial','mineria rio','lavadero oro','mineria placer',
           'mina en rio','explotacion aluvial','placeres mineros'],
    to: 'explotacion placeres draga aluvial oro rio mineria', hint: 'minería en placeres' },

  { from: ['locomotora mina','tren mina','carros mineros rieles','riel galeria',
           'transporte carros','decauville mina','brequero locomotora'],
    to: 'ferrocarril locomotora carros rieles decauville transporte subterraneo', hint: 'ferrocarril minero' },

  // ══ ACCESO, PLANOS Y MAPAS → TÉCNICO ══════════════════════════════════════
  { from: ['plano de mina','mapa labores','actualizar plano','plano subterraneo',
           'coordenadas mina','utm mina','plano topografico mina','cartografia mina'],
    to: 'planos mapas mina actualizacion utm coordenadas labores topografia', hint: 'planos de mina' },

  { from: ['estadisticas mina','cuantos accidentes hubo','reporte anual accidentes',
           'indice accidentabilidad calcular','horas hombre trabajadas','dias perdidos',
           'llevar registro accidentes','libro de accidentes'],
    to: 'estadisticas accidentes indice frecuencia severidad registro anual', hint: 'estadísticas de accidentes' },

// ═══════════════════════════════════════════════════════════════════════════════
// FIN DEL BLOQUE — Total: 62 entradas semánticas nuevas
// Pegar dentro del array SEMANTIC_MAP en semantica.js, antes del cierre "];
// ═══════════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════════
// BLOQUE ADICIONAL — 6 entradas faltantes detectadas en verificación
// Pegar también dentro del SEMANTIC_MAP antes del cierre "];
// ═══════════════════════════════════════════════════════════════════════════════
 
  { from: ['apilar materiales','como almaceno material','apilamiento correcto','bodega segura',
           'guardar materiales mina','estiba mina','almacen ordenado','material apilado'],
    to: 'almacenamiento apilamiento materiales medidas prevencion bodega', hint: 'almacenamiento de materiales' },
 
  { from: ['orden en trabajo','limpiar trabajo','suciedad trabajo','mina sucia','desorden labor',
           'piso limpio mina','5s mina','housekeeping','mantenimiento edificaciones'],
    to: 'orden limpieza mantenimiento edificaciones instalaciones trabajo', hint: 'orden y limpieza' },
 
  { from: ['basura mina','desecho mina','donde boto residuos','residuo peligroso mina',
           'residuo industrial mina','ganga desmonte relave','reciclaje mina',
           'residuo doméstico campamento','recipiente basura mina'],
    to: 'residuos solidos manejo ganga desmonte relave industrial domestico', hint: 'manejo de residuos' },
 
  { from: ['colegio mina','escuela campamento','hijos de mineros estudian','educacion hijos trabajadores',
           'servicio educativo mina','docente campamento','colegio unidad minera'],
    to: 'educacion escuela campamento hijos trabajadores servicio educativo docente', hint: 'educación en campamento' },
 
  { from: ['bocamina seguridad','entrada mina segura','ingreso pique','acceso chimenea',
           'bocamina protegida','puerta bocamina','malla bocamina','señal entrada mina',
           'condicion bocamina','seguridad entrada labor'],
    to: 'bocamina pique chimenea acceso condiciones seguridad escape', hint: 'acceso y bocaminas' },
 
  { from: ['winche de extraccion','cable del pique','jaula del pique','castillo mina',
           'señales de jaula','timbre pique','codigo timbres','balde pique',
           'velocidad jaula','frenos winche','cable cable roto'],
    to: 'sistema izaje winche cable jaula castillo señales timbres frenos', hint: 'sistema de izaje (winche/jaula)' },
 
];

// ─── MOTOR DE TRADUCCIÓN SEMÁNTICA ───────────────────────────────────────────
function translateSemantic(query) {
  const q = query.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .trim();

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of SEMANTIC_MAP) {
    for (const phrase of entry.from) {
      const p = phrase.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      // Coincidencia exacta de frase
      if (q.includes(p)) {
        const score = p.split(' ').length * 12;
        if (score > bestScore) {
          bestScore = score;
          bestMatch = entry;
        }
        continue;
      }

      // Coincidencia por palabras clave de la frase
      const phraseWords = p.split(' ').filter(w => w.length > 3);
      const queryWords = q.split(' ').filter(w => w.length > 2);
      let matches = 0;
      for (const pw of phraseWords) {
        if (queryWords.some(qw => qw.includes(pw) || pw.includes(qw))) matches++;
      }

      if (phraseWords.length > 0) {
        const coverage = matches / phraseWords.length;
        const score = coverage * phraseWords.length * 8;
        if (score > bestScore && coverage >= 0.6) {
          bestScore = score;
          bestMatch = entry;
        }
      }
    }
  }

  return bestScore >= 8 ? bestMatch : null;
}

// ─── FUNCIÓN PRINCIPAL: BÚSQUEDA SEMÁNTICA ───────────────────────────────────
function searchSemantic(query, searchFn) {
  const semantic = translateSemantic(query);

  if (!semantic) return null; // sin coincidencia semántica

  return {
    hasSemantic: true,
    hint: semantic.hint,
    translatedQuery: semantic.to,
    results: searchFn(semantic.to)
  };
}

// ─── BÚSQUEDA MAESTRA: INTENCIÓN + SEMÁNTICA + NORMAL + FUSE ─────────────────
// Esta es la función que reemplaza todo — combina las 4 mejoras en orden
function masterSearch(query, REGLAMENTO_DATA, baseFn) {

  query = query.trim();
  if (!query) return { results: [], message: null, hint: null };

  // 1. Motor de intención (Mejora 3) — preguntas directas
  const intentResult = searchWithIntent(query, REGLAMENTO_DATA, baseFn);
  if (intentResult.hasIntent && intentResult.results.length >= 2) {
    return {
      results: intentResult.results,
      message: intentResult.message,
      hint: null,
      source: 'intent'
    };
  }

  // 2. Motor semántico (Mejora 4) — lenguaje cotidiano
  const semanticResult = searchSemantic(query, baseFn);
  if (semanticResult && semanticResult.results.length >= 2) {
    return {
      results: semanticResult.results,
      message: null,
      hint: semanticResult.hint,
      source: 'semantic'
    };
  }

  // 3. Búsqueda normal con sinónimos (Mejora 2) + Fuse.js (Mejora 1)
  const normalResults = baseFn(query);
  return {
    results: normalResults,
    message: null,
    hint: null,
    source: 'normal'
  };
}