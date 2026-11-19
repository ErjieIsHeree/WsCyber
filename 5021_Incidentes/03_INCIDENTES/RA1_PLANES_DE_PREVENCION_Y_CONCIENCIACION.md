# RA1 · Planes de prevención y concienciación

## Tema 3. Taxonomía y clasificación de incidentes de ciberseguridad

> Resumen de `T03_Incidentes_Apuntes.pdf`. Actividades: `T03_Incidentes_Actividades.pdf`.
> Idea clave: **clasificar bien es lo que permite priorizar y, más adelante, notificar correctamente.**

---

### 1. Amenazas

#### 1.1. Malware

| Tipo                          | Qué hace                                                                    |
| ----------------------------- | --------------------------------------------------------------------------- |
| **Virus**                     | Se adjunta a ficheros y **necesita que alguien los ejecute**                |
| **Gusano**                    | **Se propaga solo** por la red aprovechando vulnerabilidades                |
| **Troyano**                   | **Se hace pasar por software legítimo**                                     |
| **Ransomware**                | Cifra o bloquea y **pide un rescate**                                       |
| **Spyware / infostealer**     | Roba **credenciales, cookies de sesión** y datos                            |
| **Keylogger**                 | Registra las **pulsaciones del teclado**                                    |
| **Rootkit**                   | **Se oculta** en el sistema para mantener el acceso                         |
| **Botnet**                    | Convierte el equipo en parte de una **red controlada por el atacante**      |
| **Malware sin fichero** (_fileless_) | **Vive en memoria** y usa herramientas del propio sistema (PowerShell, WMI) |

⚠ **Infostealers**: las credenciales y sesiones que roban **se venden** y hoy son el **punto de partida de muchos ataques de ransomware**.

#### 1.2. Ingeniería social

Phishing, spear phishing, smishing, vishing, pretexting y fraude del CEO → **tema 2, §4**.

#### 1.3. Fraudes

- **Fraude de facturas** y cambio de cuenta bancaria.
- **Falsas tiendas** en línea y **falsos soportes técnicos**.
- **Suplantación de marca** en dominios y redes sociales.

#### 1.4. Amenazas físicas y de comportamiento

- **Acceso físico** no autorizado; robo o pérdida de equipos y soportes.
- **Personal interno** (_insider_): malintencionado, descuidado o manipulado.
- Uso de servicios y dispositivos no autorizados: **TI en la sombra** (_shadow IT_).

---

### 2. Del riesgo al incidente

- **Un incidente es un riesgo que se ha materializado.**
- **Riesgo = probabilidad × impacto** (se trabaja a fondo en Bastionado 1).
- Aquí sirve para dos cosas:
    1. Decidir qué **casos de uso de detección** se montan primero.
    2. Valorar la **gravedad** de un incidente cuando ocurre.

---

### 3. Fases de un ataque: Cyber Kill Chain (Lockheed Martin)

Un ataque es una **cadena de 7 eslabones**: **si se rompe uno, el ataque se detiene**, y **cuanto antes se rompa, menos daño**.

| Fase                             | Qué hace el atacante                   | Cómo se frena o detecta                                   |
| -------------------------------- | -------------------------------------- | --------------------------------------------------------- |
| 1. **Reconocimiento**            | Recopila información del objetivo      | Reducir la información pública; vigilar escaneos          |
| 2. **Preparación** (_weaponization_) | Prepara el malware o el señuelo    | **Ciberinteligencia**: conocer sus herramientas           |
| 3. **Distribución** (_delivery_) | Lo hace llegar: correo, web, USB       | Filtrado de correo y navegación; concienciación           |
| 4. **Explotación**               | Aprovecha una vulnerabilidad **o un clic** | Parches; bastionado; EDR                              |
| 5. **Instalación**               | Deja **persistencia** en el equipo     | EDR; control de aplicaciones; integridad de ficheros      |
| 6. **Mando y control** (C2)      | El equipo **contacta con el atacante** | **Filtrado de salida**; DNS; IDS                          |
| 7. **Acciones sobre el objetivo** | Roba, cifra o destruye                | Segmentación; copias; detección de **exfiltración**       |

---

### 4. MITRE ATT&CK

La Kill Chain es la **visión general**; **MITRE ATT&CK baja al detalle**. Es una **base de conocimiento pública** de:

| Concepto    | Qué es                                       | Ejemplo                                   |
| ----------- | -------------------------------------------- | ----------------------------------------- |
| **Táctica** | El **objetivo** del atacante en cada momento | Acceso inicial, movimiento lateral        |
| **Técnica** | **Cómo** lo consigue, con un identificador   | **T1566** = phishing                      |

Se usa como **idioma común** para:

- Describir un incidente.
- Saber **qué técnicas detectan** nuestras herramientas.
- Comparar un ataque con los de **grupos conocidos**.

**Wazuh** y la mayoría de herramientas **etiquetan sus alertas** con la técnica de ATT&CK.

---

### 5. Ransomware

#### 5.1. Tipos

- **Scareware**: falsas alertas que asustan para que se pague o se instale algo.
- **Bloqueadores de pantalla**: impiden usar el equipo **sin cifrar** los datos.
- **Ransomware de cifrado**: cifra los ficheros y pide rescate por la clave.
- **Ransomware como servicio (RaaS)**: un grupo desarrolla el malware y lo **alquila a afiliados** que ejecutan los ataques a cambio de una **comisión**.

#### 5.2. Cómo actúan hoy

- **Doble extorsión**: **antes de cifrar, roban** los datos y amenazan con publicarlos. _Las copias resuelven el cifrado, pero no la fuga._
- **Triple extorsión**: añaden presión sobre **clientes** o ataques **DDoS**.
- Pasan **días o semanas dentro** antes de cifrar: **buscan y destruyen primero las copias de seguridad** (→ por eso la copia desconectada de la regla 3-2-1, tema 1).

#### 5.3. ¿Pagar?

**No** (recomendación de INCIBE, CCN-CERT y fuerzas de seguridad):

1. **No garantiza** recuperar los datos.
2. **Financia** al grupo.
3. **Señala a la víctima** como buena pagadora.

---

### 6. La taxonomía oficial

Referencia en España: **Guía Nacional de Notificación y Gestión de Ciberincidentes**, alineada con la **taxonomía europea**. **Es la que hay que usar al notificar.**

| Clase                          | Ejemplos de tipos                                                          |
| ------------------------------ | -------------------------------------------------------------------------- |
| **Contenido abusivo**          | Spam, delitos de odio, contenido ilegal                                    |
| **Contenido dañino**           | Malware, sistema infectado, servidor de mando y control                    |
| **Obtención de información**   | Escaneo de redes, análisis de tráfico, ingeniería social                   |
| **Intento de intrusión**       | Explotación de vulnerabilidades, intento de acceso con credenciales        |
| **Intrusión**                  | Compromiso de cuenta, de aplicación o de sistema; robo                     |
| **Disponibilidad**             | DoS, DDoS, sabotaje, interrupciones                                        |
| **Compromiso de la información** | Acceso, modificación o pérdida no autorizada de datos                    |
| **Fraude**                     | Uso no autorizado de recursos, suplantación, phishing                      |
| **Vulnerable**                 | Criptografía débil, servicios expuestos, sistema vulnerable                |
| **Otros**                      | Lo que no encaja; **amenazas persistentes avanzadas (APT)**                |

Un caso puede **cambiar de clase** al evolucionar:
`Fraude (phishing) → Intrusión (cuenta comprometida) → Compromiso de la información`

---

### 7. Peligrosidad e impacto

La guía pide valorar cada incidente con **dos criterios distintos**:

| Criterio        | Qué valora                                                        | Niveles                                                  |
| --------------- | ----------------------------------------------------------------- | -------------------------------------------------------- |
| **Peligrosidad** | Lo dañina que es **la amenaza en sí**, sin importar a quién afecte | Bajo · medio · alto · muy alto · crítico               |
| **Impacto**     | Las **consecuencias reales para esta organización**               | **Sin impacto** · bajo · medio · alto · muy alto · crítico |

- Peligrosidad: un **escaneo = baja**; un **ransomware = muy alta**.
- Impacto se mide por: sistemas y usuarios afectados, **tiempo de interrupción**, datos comprometidos, daño **económico** y **reputacional**.
- ➡ **Se toma como referencia el más alto de los dos**, y de él dependen los **plazos de notificación** y la **urgencia** de la respuesta.

---

### 8. Priorizar

Con varios incidentes abiertos y un equipo pequeño, se ordena preguntando:

- ¿Está **activo** ahora mismo o ya ha terminado?
- ¿Puede **extenderse** a otros sistemas?
- ¿Afecta a un **servicio crítico** o a **datos personales**?
- ¿Hay **plazo legal** corriendo?

➡ **Un incidente activo y con capacidad de propagación va siempre antes que uno grave pero contenido.**

---

### Practica: clasifica tú

<!-- TODO (alumno): rellena las columnas vacías usando §3, §6 y §7.
     Pista: la fase de Kill Chain es "hasta dónde llegó el atacante". -->

| Caso                                                                 | Clase (§6) | Fase Kill Chain (§3) | Peligrosidad (§7) |
| -------------------------------------------------------------------- | ---------- | -------------------- | ----------------- |
| El IDS detecta un escaneo de puertos desde Internet                  |            |                      |                   |
| Un empleado introduce su contraseña en una web falsa de Microsoft 365 |            |                      |                   |
| Los servidores de ficheros amanecen cifrados con una nota de rescate |            |                      |                   |
| Un servidor web expuesto usa TLS 1.0                                 |            |                      |                   |

---

### Conexiones con otros temas y asignaturas

| Apartado                        | Conecta con                               | Relación                                                                          |
| ------------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------- |
| 1.2 (ingeniería social)         | Incidentes 2 (§4)                         | Las técnicas de engaño, ya definidas allí                                         |
| 1.1 (infostealer, keylogger)    | Hacking Ético 1 (cracking) · Bastionado 5 (IAM) | Credenciales robadas = vector de entrada nº 1 (tema 1, §4.3); MFA lo frena  |
| 2 (riesgo)                      | Bastionado 1 (análisis de riesgos)        | Probabilidad × impacto se calcula allí y se usa aquí                              |
| 3 (reconocimiento)              | Hacking Ético 3 (footprinting)            | La fase 1 de la Kill Chain es lo que practica el atacante                         |
| 3, 4 (Kill Chain, ATT&CK)       | PPS (modelado de amenazas)                | Pensar las fases del ataque al diseñar la aplicación                              |
| 3 (explotación)                 | Bastionado 3, 9 (hardening, parches)      | Los controles que rompen el eslabón 4                                             |
| 3 (acciones sobre el objetivo)  | Bastionado 2 (segmentación)               | Frena el movimiento lateral                                                       |
| 4 (Wazuh etiqueta con ATT&CK)   | Incidentes 4 (SIEM) · Bastionado 8        | Las alertas del SIEM llegan ya clasificadas por técnica                           |
| 5 (ransomware, copias)          | Bastionado 10 (backups) · Incidentes 1 (§6) | Copia desconectada: la que el atacante no puede destruir                        |
| 6 (Obtención de información)    | Incidentes 1 (§4.1)                       | Los ataques pasivos (sniffing, análisis de tráfico) caen en esta clase            |
| 6, 7 (taxonomía, peligrosidad)  | Incidentes 10 (notificación) · Normativa  | Clase y nivel deciden si, a quién y en qué plazo se notifica                      |
| 8 (datos personales)            | Incidentes 1 (§2, brecha)                 | Una brecha de datos personales tiene plazo legal → sube en la prioridad           |

---

### Para ampliar

- **Guía Nacional de Notificación y Gestión de Ciberincidentes**: taxonomía, peligrosidad e impacto.
- **MITRE ATT&CK** (attack.mitre.org).
- **Lockheed Martin**: Cyber Kill Chain.
- Proyecto **No More Ransom**: herramientas de descifrado gratuitas.
