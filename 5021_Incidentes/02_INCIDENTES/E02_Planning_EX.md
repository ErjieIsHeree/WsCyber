# Tema 02. Planes de prevención y concienciación

_Módulo 5021. Incidentes de Ciberseguridad_
_Hecho por Erjie Xia_
_18 de noviembre de 2026_

## Actividad 01. Plan de concienciación trimestral

### 1. Punto de partida

| Qué sabemos                                                                                                         | Qué mediremos antes de empezar                                                                                  |
| ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Dos fraudes por correo el último año: la plantilla no detecta los correos fraudulentos o no verifica las peticiones | Tasa de clic en una simulación de phishing inicial, sin formación previa                                        |
| No hay una formación periódica en seguridad                                                                         | Tasa de reporte: cuántos avisan del correo sospechoso                                                           |
| No sabemos si existe un canal para avisar                                                                           | Tiempo hasta el primer aviso                                                                                    |
| —                                                                                                                   | Encuesta breve (5 preguntas): ¿sabes a quién avisar?, ¿usas un gestor de contraseñas?, ¿tienes activado el MFA? |

### 2. Objetivos medibles

1. **Tasa de reporte:** pasar del valor medido en la semana 1 a **al menos el 30 % (12 de 40 empleados)** en la simulación de la semana 12.
2. **Tasa de clic:** reducir **a la mitad** el valor medido en la semana 1 y quedar **por debajo del 10 % (4 de 40)** en la simulación de la semana 12, con una dificultad parecida.

Las metas se expresan también en personas porque, con 40 empleados, cada persona vale un 2,5 %.

### 3. Públicos

| Público                         | Riesgo principal                                                 |
| ------------------------------- | ---------------------------------------------------------------- |
| Administración y pagos          | Fraude del CEO (BEC) y cambio de cuenta bancaria de un proveedor |
| Dirección                       | Spear phishing                                                   |
| Recursos humanos                | Currículos con adjuntos maliciosos, envío de datos de nóminas    |
| Atención al cliente y recepción | Vishing y pretexting para obtener datos personales o internos    |
| Toda la plantilla               | Phishing genérico, contraseñas, teletrabajo                      |

### 4. Plan de acciones

píldoras cortas, simulaciones, carteles, sesiones prácticas,
casos reales del sector.

| Semana | Acción                                                        | Formato                               | Duración | Departamento                       |
| ------ | ------------------------------------------------------------- | ------------------------------------- | -------- | ---------------------------------- |
| 1      | Diagnóstico (phising + nivel de concienciación)               | Simulación de phishing + cuestionario | 15 min   | Todos                              |
| 1      | Presentación del plan y del canal único de aviso              | Mensaje de la dirección + Cartel      | 5 min    | Todos                              |
| 1      | Compromiso de no pedir excepciones a los procedimientos       | Píldora corta                         | 5 min    | Dirección + administración y pagos |
| 2      | Reconocer un correo sospechoso y usar el botón de reportar    | Píldora corta                         | 2 min    | Todos                              |
| 2      | Fraude del CEO y cambio de cuenta: Protocolos de departamento | Sesión práctica                       | 20 min   | Administración y pagos             |
| 3      | Vishing y pretexting: Protocolos de departamento              | Sesión práctica                       | 20 min   | Atención al cliente                |
| 3      | Descarga de ficheros adjuntos en entorno seguro               | Píldora corta                         | 5 min    | Recursos humanos                   |
| 4      | Diagnóstico (phising)                                         | Simulación de phishing                | 5 min    | Todos                              |
| 4      | Contraseñas: gestor y segundo factor                          | Píldora corta + Cartel                | 3 min    | Todos                              |
| 5      | BEC: Protocolos de departamento                               | Sesión práctica                       | 20 min   | Administración y pagos             |
| 6      | Petición de pago urgente                                      | Simulación + Cartel                   | 15 min   | Administración y pagos             |
| 6      | Diagnóstico (descarga de ficheros adjuntos en entorno seguro) | Simulación                            | 5 min    | Recursos humanos                   |
| 6      | Seguridad en el teletrabajo                                   | Píldora corta + Cartel                | 2 min    | Todos                              |
| 7      | Diagnóstico (vishing)                                         | Simulación                            | 10 min   | Atención al cliente                |
| 8      | Diagnóstico (phising)                                         | Simulacro                             | 5 min    | Todos                              |
| 9      | Diagnóstico (BEC)                                             | Simulacro                             | 10 min   | Administración y pagos             |
| 11     | BEC (Spear phising)                                           | Simulacro                             | 10 min   | Dirección                          |
| 12     | Diagnóstico (phising + nivel de concienciación)               | Simulación de phishing + cuestionario | 15 min   | Todos                              |

### 5. Indicadores y revisión

| Indicador                                | Cuándo se revisa           |
| ---------------------------------------- | -------------------------- |
| Tasa de clic                             | Tras las semanas 4, 8 y 12 |
| Tasa de reporte                          | Tras las semanas 4, 8 y 12 |
| Tiempo hasta el primer aviso             | Tras las semanas 4, 8 y 12 |
| Resultado de las simulaciones dirigidas  | Tras las semanas 6, 9 y 11 |
| Participación en las píldoras y talleres | Al final de cada mes       |

## Actividad 02. Simulación de phishing con ética

Pretexto: **aviso de una nueva plataforma de fichaje**.

> **De:** Recursos Humanos <rrhh@empresa-portal-empleado.com>
> **Asunto:** ACCIÓN REQUERIDA: activa tu cuenta del nuevo sistema de fichaje antes del viernes
>
> Hola,
>
> A partir del lunes el registro de jornada se hará desde la nueva plataforma de fichaje. Para no perder tus registros de este mes, **activa tu cuenta antes del viernes a las 14:00** con tu usuario y contraseña habituales:
>
> **[Activar mi cuenta](https://empresa-portal-empleado.com/activar)**
>
> Las cuentas que no se activen a tiempo se bloquearán y tendrán que gestionarse por ticket con el departamento.
>
> Un saludo,
> Departamento de Recursos Humanos

### 2. Pistas que debería detectar un empleado atento

- **Dominio del remitente:** `empresa-portal-empleado.com` no es el dominio corporativo.
- **Urgencia:** "antes del viernes a las 14:00", en negrita en el asunto.
- **Amenaza:** "las cuentas se bloquearán".
- **Petición de credenciales:** RR. HH. nunca pide la contraseña corporativa en una web externa.
- **Saludo genérico:** "Hola", sin el nombre de la persona.
- **Enlace:** al pasar el ratón por encima, apunta a un dominio externo.
- **Firma genérica:** sin nombre de la persona ni teléfono interno.

### 3. Registros

| Registro                  |
| ------------------------- |
| Apertura de enlace        |
| Credenciales introducidas |
| Reportes                  |

### 4. Página que ve quien hace clic

> **Esto era una simulación de phishing. No ha pasado nada.**
>
> Forma parte del plan de concienciación de la empresa. No se ha guardado ninguna contraseña y nadie va a recibir una bronca por esto: le pasa a mucha gente, y para eso hacemos estas pruebas.
>
> **Las pistas que tenía este correo:**
>
> - El remitente no era nuestro dominio.
> - Metía prisa y amenazaba con bloquear la cuenta.
> - Pedía la contraseña en una web externa.
>
> **La próxima vez:** si dudas, no hagas clic y pulsa el botón «Reportar phishing». Avisar siempre suma.
>
> ¿Dudas? Escribe a <rrhh@empresa-real.com>

### 5. Pretextos que no se usarían

| Pretexto                                        | Por qué no                                                                        |
| ----------------------------------------------- | --------------------------------------------------------------------------------- |
| Despidos o reestructuraciones                   | Provoca angustia real y destruye la confianza en la empresa                       |
| Salud (resultados médicos, COVID, bajas)        | Juega con el miedo de forma desproporcionada y toca datos especialmente sensibles |
| Pagas, nóminas o bonus                          | Toca el sueldo de la gente; quien cae se siente engañado por su propia empresa    |
| Suplantar a una persona concreta sin su permiso | Puede dañar su reputación y sus relaciones laborales                              |

La simulación tiene que enseñar sin hacer daño. Si el pretexto genera rechazo, la gente deja de confiar en el plan y deja de reportar.

### 6. Comunicación de los resultados

- **Antes:** se anuncia a toda la plantilla que habrá simulaciones durante el trimestre, sin decir cuándo.
- **Después:** solo resultados **agregados** («el 18 % hizo clic, el 25 % lo reportó»), comparados con la simulación anterior.
- **Se pone el foco en lo positivo:** se felicita al departamento con mejor tasa de reporte, no se señala al que más cae.
- **Nunca** se publican nombres ni se informa a los jefes de quién ha caído.
- **Se explican las pistas** del correo en la siguiente píldora formativa.

## Actividad 3. Protocolo antifraude de pagos

### 1. Fraudes

- **Fraude del CEO:** el atacante se hace pasar por un directivo y ordena a administración una transferencia urgente y confidencial, normalmente fuera del procedimiento habitual.
- **Fraude del cambio de cuenta:** el atacante se hace pasar por un proveedor real y comunica una "nueva cuenta bancaria", de modo que el siguiente pago legítimo acaba en su cuenta.

### 2. Protocolo

1. **Ninguna petición de pago urgente ni cambio de cuenta se tramita solo con un correo, un mensaje o una llamada** se confirmarán las peticiones por distintos medios ya registrados y si se levanta sospecha, se registrarán los datos.
2. **Se pide confirmación de un dato que solo conoce el interlocutor real** (número de la última factura, persona de contacto habitual...).
3. **Doble aprobación:** todo cambio de cuenta y todo pago por encima de 3.000 € los autorizan dos personas: quien tramita y el responsable de administración.
4. **La urgencia y la confidencialidad son señales de alarma**, no existen motivos para saltarse pasos. "No lo comentes con nadie" obliga a comentarlo.
5. **Ante cualquier duda, se para el pago y se avisa** al punto de contacto de seguridad. Nadie es sancionado por retrasar un pago para verificarlo.
