# RA1 · Planes de prevención y concienciación

## Tema 2. Planificación de la prevención y concienciación en ciberseguridad

> Resumen de `T02_Incidentes_Apuntes.pdf`. Actividades: `T02_Incidentes_Actividades.pdf` (entrega en `E02_Planning_EX.md`).

---

### 1. Por qué empezar por las personas

- **La mayoría** de los incidentes tienen un **componente humano**: alguien hace clic, reutiliza una contraseña, se fía de una llamada o configura algo mal.
- No es un problema de torpeza, sino de **diseño**: los ataques están pensados para **parecer trabajo normal**.
- La concienciación no es «una charla al año», sino un **plan** (objetivos, destinatarios, contenidos, medición), igual que **cualquier otro control de seguridad**.

---

### 2. El plan de concienciación

#### 2.1. Fases

| Fase                         | Qué se hace                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------- |
| 1. **Diagnóstico**           | De dónde partimos: encuestas, **simulación de phishing inicial**, incidentes del último año |
| 2. **Objetivos**             | **Concretos y medibles** (ver ejemplo abajo)                                                |
| 3. **Públicos**              | Dirección, administración, RR. HH., atención al cliente y técnicos: **riesgos distintos**   |
| 4. **Contenidos y formatos** | Píldoras cortas, simulaciones, carteles, sesiones prácticas, casos reales del sector        |
| 5. **Calendario**            | **Poco y a menudo** funciona mejor que mucho de golpe                                       |
| 6. **Medición y revisión**   | Qué ha cambiado y qué se ajusta para el siguiente ciclo                                     |

- ✅ Objetivo: «Subir la **tasa de reporte** del 5 % al 30 % en seis meses».
- ❌ No es objetivo: «Concienciar a la plantilla».

#### 2.2. Lo que debe saber hacer cualquier empleado

- **Reconocer** un mensaje sospechoso y saber **a quién y cómo avisar**.
- Usar un **gestor de contraseñas** y el **segundo factor** (2FA/MFA).
- **Bloquear el equipo** y proteger los dispositivos fuera de la oficina.
- **Verificar por otro canal** cualquier petición inusual de dinero o de datos.
- **Avisar de inmediato** si cree que ha cometido un error.

---

### 3. Cultura de seguridad

#### 3.1. Integrarla en el día a día

- **El ejemplo de la dirección** pesa más que cualquier curso: _si el jefe pide saltarse el procedimiento, el procedimiento no existe._
- La seguridad forma parte de la **acogida** de cada persona nueva.
- **Lo seguro debe ser lo cómodo**; si no, la gente busca atajos.

#### 3.2. Cultura que no castiga

- Quien avisa de que ha hecho clic da a la organización **los minutos que necesita para contener** el daño.
- Si recibe una bronca, la próxima vez callará.
- Regla: **se agradece el aviso y se corrige el proceso, no a la persona.**

---

### 4. Ataques dirigidos a personas (ingeniería social)

<!-- TODO (alumno): rellena «En qué consiste» con tus palabras SIN mirar el PDF.
     Después compáralo con el apartado 4 de los apuntes y corrige. -->

| Técnica                                              | En qué consiste |
| ---------------------------------------------------- | --------------- |
| **Phishing**                                         |                 |
| **Spear phishing**                                   |                 |
| **Smishing**                                         |                 |
| **Vishing**                                          |                 |
| **QRishing**                                         |                 |
| **Fraude del CEO** (BEC, _Business Email Compromise_) |                 |
| **Pretexting**                                       |                 |
| **Baiting**                                          |                 |

**Dos tendencias:**

- La **IA** redacta mensajes fraudulentos **sin faltas de ortografía**.
- La **clonación de voz** hace creíbles llamadas de un supuesto directivo.

➡ Las señales clásicas siguen sirviendo, pero **la defensa fiable es el procedimiento: verificar por otro canal.**

#### 4.1. Las palancas que usan

**Urgencia, autoridad, miedo, curiosidad, deseo de ayudar y recompensa.**
Si un mensaje aprieta una de ellas **y además pide una acción inmediata** → parar.

#### 4.2. Malware y ransomware como consecuencia

El phishing rara vez es el final: es **la puerta de entrada** al robo de credenciales, el malware y, a menudo, el **ransomware** (tema 3).

---

### 5. Teletrabajo y movilidad

- Equipos **corporativos gestionados, cifrados y actualizados**; evitar el uso personal y familiar.
- Conexión por **VPN o acceso de confianza cero (Zero Trust), siempre con MFA**.
- **Wifi doméstica** con contraseña robusta y router actualizado; **nunca redes públicas** sin protección.
- Cuidado con **pantallas y conversaciones** en lugares públicos.
- **Procedimiento claro** para la pérdida o robo de un dispositivo.

---

### 6. Mitigar el error humano

| Principio                       | En la práctica                                                                                                                                                 |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Comprender antes que prohibir** | Explicar el **porqué** de una norma con un caso real funciona mejor que una lista de prohibiciones                                                           |
| **Hacer fácil lo correcto**     | Botón de **«reportar phishing»** en el correo · **único punto de contacto** conocido por todos · **controles técnicos** que no dependan de la memoria (MFA, filtrado de correo, bloqueo automático de pantalla) |
| **Dar capacidad de decisión**   | Cualquiera puede decir **«esto lo compruebo antes de hacerlo»**, aunque lo pida (en apariencia) la dirección                                                  |

---

### 7. Protocolos por departamento

| Departamento                       | Protocolo                                                                                                                                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Atención al cliente y recepción** | No dar datos personales ni internos sin **verificar la identidad** · ante una petición inusual: tomar los datos, **colgar y devolver la llamada** al número que consta en los sistemas |
| **Administración y pagos**         | **Ningún cambio de cuenta bancaria** de un proveedor solo con un correo: se confirma por teléfono al número ya registrado · **doble aprobación** por encima de un importe · desconfiar de la urgencia y del «no lo comentes con nadie» |
| **Recursos humanos**               | CV y adjuntos de candidatos en un **entorno controlado** · nóminas y datos de empleados solo por **canales seguros** a destinatarios verificados · coordinación con sistemas en **altas y, sobre todo, bajas** |
| **Dirección**                      | **Objetivo más rentable** para el atacante y quienes más excepciones piden → **formación específica** y **las mismas normas** que el resto                                                 |

---

### 8. Medir si funciona

| Indicador                               | Qué mide                                                       |
| --------------------------------------- | -------------------------------------------------------------- |
| Tasa de clic en simulaciones            | Cuántos caen                                                   |
| **Tasa de reporte**                     | Cuántos avisan → **el indicador que más importa**              |
| Tiempo hasta el primer aviso            | Cuánto tarda la organización en enterarse                      |
| Incidentes reales con origen humano     | El resultado final                                             |
| Participación en la formación           | Alcance del plan                                               |

Las **simulaciones de phishing** son aprendizaje, **no una trampa**: se avisa de que existen, no se señala a nadie y quien cae recibe una explicación breve en el momento.

---

### Conexiones con otros temas y asignaturas

| Apartado                       | Conecta con                           | Relación                                                                      |
| ------------------------------ | ------------------------------------- | ----------------------------------------------------------------------------- |
| 2 (2FA, gestor de contraseñas) | Bastionado 5 (IAM)                    | Lo que el usuario hace con sus credenciales frente a lo que impone el sistema |
| 2, 4 (contraseñas)             | Hacking Ético 1 (cracking)            | Por qué una contraseña reutilizada o débil cae enseguida                      |
| 3 (cultura que no castiga)     | Incidentes 4 (detección), 7 (gestión) | Un aviso temprano es una fuente de detección y da tiempo para contener        |
| 4 (ingeniería social)          | Hacking Ético 3 (footprinting)        | El spear phishing y el pretexting se preparan con reconocimiento y OSINT      |
| 4 (malware y ransomware)       | Incidentes 3 (taxonomía, Kill Chain)  | El engaño a la persona es la fase de entrega o acceso inicial                 |
| 4 (phishing)                   | Incidentes 10 (notificación)          | Cómo se comunica y se notifica                                                |
| 5 (teletrabajo)                | Incidentes 1 (§6, red de la pyme)     | Mismos controles fuera de la oficina: VPN/Zero Trust, MFA, disco cifrado      |
| 5 (teletrabajo)                | Bastionado 6 (WiFi y movilidad)       | Dispositivos y redes fuera del perímetro                                      |
| 6 (hacer fácil lo correcto)    | PPS (diseño seguro)                   | Si lo seguro es lo cómodo, la gente no busca atajos                           |
| 7 (pagos)                      | Incidentes 1 (§3.5, integridad)       | El protocolo evita el «cambio del nº de cuenta en una factura»                |
| 7 (protocolos, pagos)          | Bastionado 1 (análisis de riesgos)    | Cada departamento tiene riesgos distintos                                     |
| 8 (medir)                      | Incidentes 9 (mejora continua)        | Las métricas alimentan el siguiente ciclo                                     |
| Todo el tema                   | Normativa                             | La formación como obligación de cumplimiento                                  |

---

### Para ampliar

- **INCIBE**: kit de concienciación para empresas (gratuito, con materiales y simulaciones).
- **CCN-CERT**: informes de buenas prácticas (**serie BP**) sobre correo electrónico y dispositivos móviles.
- **ENISA**: guías de concienciación en ciberseguridad.
- Línea de ayuda en ciberseguridad de INCIBE: **017**.
