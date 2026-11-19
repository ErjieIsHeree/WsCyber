# RA1 · Planes de prevención y concienciación

## Tema 1. Introducción a la ciberseguridad y la prevención de incidentes

> Resumen de `T01_Incidentes_Apuntes.pdf`. Es la base de vocabulario de todo el módulo.

---

### 1. Qué es la ciberseguridad

Conjunto de medidas **técnicas, organizativas y humanas** que protegen sistemas, redes e información frente a accesos, usos o daños no autorizados.

- No es un producto ni un estado final: es un **proceso continuo** → _prevenir, detectar, responder y aprender_.
- El módulo se centra en _detectar, responder y aprender_, pero empieza por prevenir porque **el incidente más barato es el que no llega a ocurrir.**

---

### 2. Evento → Alerta → Incidente → Brecha

| Término                        | Qué es                                                     | Ejemplo                                        |
| ------------------------------ | ---------------------------------------------------------- | ---------------------------------------------- |
| **Evento**                     | Cualquier cosa observable en un sistema                    | Un usuario inicia sesión                       |
| **Alerta**                     | Evento(s) que una herramienta marca como sospechosos       | 10 logins fallidos en un minuto                |
| **Incidente**                  | Hecho **confirmado** que compromete o amenaza la seguridad | Un atacante entra con una contraseña adivinada |
| **Brecha de datos personales** | Incidente que afecta a **datos personales**                | El atacante descarga la base de clientes       |

- No toda alerta es un incidente (**falsos positivos**).
- No todo incidente es una brecha.
- Una brecha de datos personales **activa obligaciones legales** (notificación, tema 10).

---

### 3. La tríada CID (+2)

| Dimensión            | Significa                                                | Se protege con                                                                  | Se rompe con                                           |
| -------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **Confidencialidad** | Solo accede quien está autorizado                        | Control de acceso, cifrado, clasificación                                       | Fuga de datos, correo mal enviado, contraseña robada   |
| **Integridad**       | La información es exacta y no se ha alterado sin permiso | Hashes, firmas digitales, control de versiones, permisos de escritura limitados | Alteración de un registro, factura o fichero de config |
| **Disponibilidad**   | Accesible cuando se necesita                             | Redundancia, backups, planes de continuidad                                     | DoS/DDoS, ransomware, avería sin respaldo              |

El **ENS** (RD 311/2022) añade dos dimensiones clave en gestión de incidentes:

- **Autenticidad**: asegurar que alguien es quien dice ser y que un dato procede de donde dice.
- **Trazabilidad**: saber quién hizo qué y cuándo. _Sin trazabilidad no hay investigación posible._

**La tríada en la empresa** — identificar la dimensión afectada orienta la respuesta:

| Incidente                                | Dimensión                                        |
| ---------------------------------------- | ------------------------------------------------ |
| Ransomware cifra el servidor de ficheros | Disponibilidad (+ confidencialidad si exfiltran) |
| Empleado consulta nóminas ajenas         | Confidencialidad                                 |
| Cambian el nº de cuenta de una factura   | Integridad                                       |
| Caída de la web por DDoS                 | Disponibilidad                                   |

---

### 4. Tipos de ataques

#### 4.1. Pasivos — observan sin modificar (muy difíciles de detectar)

- **Escucha de tráfico** (_sniffing_): capturar comunicaciones sin cifrar.
- **Análisis de tráfico**: aun cifrado, deducir quién habla con quién, cuándo y cuánto.
- **Reconocimiento con fuentes abiertas** (**OSINT**): recopilar información pública de la organización.

➡ Defensa **preventiva**: cifrar, segmentar la red, reducir lo que se publica.

#### 4.2. Activos — modifican datos o el funcionamiento (hacen ruido → detectables)

- **Suplantación** de identidad (persona o sistema).
- **Modificación de mensajes** en tránsito (**ataque de intermediario**, _man-in-the-middle_).
- **Repetición** (_replay_): reenviar más tarde un mensaje válido capturado.
- **Denegación de servicio** (DoS): saturar un servicio hasta dejarlo inaccesible.
- **Ejecución de código malicioso** (malware).

#### 4.3. Vectores de entrada más habituales

1. Credenciales robadas, reutilizadas o débiles.
2. Phishing e ingeniería social.
3. Vulnerabilidades sin parchear en servicios expuestos.
4. Errores de configuración (sobre todo en la nube).
5. Proveedores y cadena de suministro.

---

### 5. Estrategias de defensa

#### 5.1. Defensa en profundidad

Ningún control es infalible → varias **capas**; si una falla, la siguiente frena o avisa:
`políticas y personas → perímetro → red interna → equipo → aplicación → dato`

#### 5.2. Tipos de controles

| Tipo           | Para qué                | Ejemplos                             |
| -------------- | ----------------------- | ------------------------------------ |
| **Preventivo** | Evitar que ocurra       | MFA, cortafuegos, parches, formación |
| **Detectivo**  | Enterarse de que ocurre | IDS, SIEM, revisión de logs          |
| **Correctivo** | Reparar el daño         | Backups, reinstalación               |
| **Disuasorio** | Quitar las ganas        | Avisos legales, cámaras visibles     |

#### 5.3. Principios recurrentes

- **Mínimo privilegio**: cada usuario/servicio solo con lo que necesita.
- **Denegación por defecto**: lo no permitido explícitamente, prohibido.
- **Reducir la superficie de ataque**: lo que no se usa, se desactiva.
- **Asumir la brecha**: diseñar pensando que alguien acabará entrando.

---

### 6. Protección mínima de una red corporativa (pyme)

- Cortafuegos perimetral restrictivo + **red segmentada** (usuarios, servidores, invitados).
- Acceso remoto solo por **VPN o Zero Trust, con MFA**.
- Equipos actualizados, con **antimalware/EDR** y **disco cifrado**.
- Correo con filtro antiphishing y **SPF, DKIM y DMARC**.
- Backups con la regla **3-2-1** (3 copias, 2 soportes, 1 fuera) y **una copia desconectada**.
- **Logs centralizados… y alguien que los mire.**
- Personas formadas y un **canal sencillo para avisar** de algo raro.

---

### 7. Ciclo de gestión de incidentes (NIST)

| Fase                                           | Contenido                                        | Temas del módulo |
| ---------------------------------------------- | ------------------------------------------------ | ---------------- |
| 1. **Preparación**                             | Planes, herramientas, formación, concienciación  | 1, 2             |
| 2. **Detección y análisis**                    | Clasificar, detectar, auditar                    | 3, 4, 5          |
| 3. **Contención, erradicación y recuperación** | Evidencias, investigación, medidas               | 6, 7, 8          |
| 4. **Actividad posterior**                     | Lecciones aprendidas, notificación, comunicación | 9, 10            |

No es lineal: se retrocede a menudo y lo aprendido **realimenta la preparación** del siguiente incidente.

---

### 8. Quién es quién

| Actor            | Papel                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------- |
| **SOC**          | Centro de operaciones de seguridad: vigila y detecta (normalmente 24/7)                |
| **CSIRT / CERT** | Equipo de respuesta a incidentes (interno o de referencia nacional)                    |
| **INCIBE-CERT**  | CSIRT de referencia para ciudadanía y empresas privadas en España                      |
| **CCN-CERT**     | CSIRT de referencia para el sector público y sistemas bajo el ENS                      |
| **AEPD**         | **Autoridad de control** en protección de datos; recibe notificaciones de brechas de datos personales |
| **DPD**          | Delegado de protección de datos: **coordina** en la organización todo lo relativo a datos personales  |

---

### Glosario de siglas

<!-- TODO (alumno): rellena cada fila con tus palabras.
     "Qué es": nombre completo + una frase de qué hace.
     "Dónde reaparece": tema/asignatura donde vuelve a salir (mira el mapa de CLAUDE.md). -->

| Sigla              | Qué es | Dónde reaparece |
| ------------------ | ------ | --------------- |
| **MFA**            |        |                 |
| **IDS**            |        |                 |
| **SIEM**           |        |                 |
| **EDR**            |        |                 |
| **VPN**            |        |                 |
| **SPF/DKIM/DMARC** |        |                 |
| **CSIRT / CERT**   |        |                 |
| **DoS / DDoS**     |        |                 |
| **NIST**           |        |                 |
| **ENS**            |        |                 |

---

### Conexiones con otras asignaturas

- **Bastionado**: los controles preventivos y los principios (mínimo privilegio, denegación por defecto, superficie de ataque) son el núcleo del hardening; la red de la pyme (§6) se desarrolla en arquitecturas seguras, IAM, monitorización y backups.
- **Hacking Ético**: los ataques pasivos (OSINT, análisis de tráfico) son la fase de reconocimiento/footprinting; los vectores de entrada (§4.3) son lo que el atacante busca primero (p. ej., credenciales débiles → cracking de hashes).
- **PPS**: integridad y autenticidad se garantizan también desde el código (hashes, firmas, autenticación); "asumir la brecha" guía el modelado de amenazas.
- **Forense**: la **trazabilidad** es la materia prima de cualquier investigación; sin logs no hay evidencias.
- **Normativa**: ENS (dimensiones), AEPD/DPD y obligación de notificar brechas.

---

### Para ampliar

- NIST SP 800-61 — guía de gestión de incidentes.
- Guía Nacional de Notificación y Gestión de Ciberincidentes (INCIBE-CERT / CCN-CERT).
- Real Decreto 311/2022 (ENS).
- Glosario de ciberseguridad de INCIBE.
