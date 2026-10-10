# Tema 1

- [Solución de Actividad 1](#solución-1)
- [Solución de Actividad 2](#solución-2)
- [Solución de Actividad 3](#solución-3)

## Actividad 1. Evento, alerta, incidente o brecha

### Enunciado

Clasifica diez situaciones cotidianas de una empresa como evento, alerta, incidente o
brecha de datos personales, e indica qué dimensión de la seguridad se ve afectada en cada
una. El objetivo es fijar el vocabulario que usaremos todo el curso y acostumbrarte a
justificar la clasificación.

### Guía paso a paso

1. Lee las situaciones
    - (a) un usuario se equivoca de contraseña una vez
    - (b) el antivirus pone un fichero en cuarentena
    - (c) 300 inicios de sesión fallidos contra la VPN en cinco minutos
    - (d) un comercial pierde un portátil sin cifrar con la cartera de clientes
    - (e) la web corporativa muestra un mensaje de un grupo atacante
    - (f) un empleado envía por error las nóminas a toda la plantilla
    - (g) el servidor de ficheros se queda sin espacio
    - (h) aparece un usuario administrador que nadie ha creado
    - (i) un proveedor avisa de que le han robado credenciales de acceso a vuestros sistemas
    - (j) el cortafuegos bloquea un escaneo de puertos desde Internet.

2. Clasifica cada una y justifícalo en una frase.
3. Indica la dimensión afectada: confidencialidad, integridad, disponibilidad,
   autenticidad o trazabilidad.
4. Marca cuáles exigirían avisar a alguien de inmediato y a quién.
5. Señala las que dependen de información que no tienes y qué preguntarías.
6. Entrega una tabla: Situación / Clasificación / Dimensión / A quién avisar / Qué falta por saber.

### Solución 1

| Situación | Clasificación                                                                                | Dimensión                   | A quién avisar | Qué falta por saber                                                 |
| --------- | -------------------------------------------------------------------------------------------- | --------------------------- | -------------- | ------------------------------------------------------------------- |
| a         | Evento (No existe peligro alguno, solo es una acción más.)                                   | Ninguna                     |                |                                                                     |
| b         | Alerta (Una herramienta detectó que existe un peligro en relación con un fichero.)           | Ninguna                     | IT             |                                                                     |
| c         | Alerta (Un cracker intenta, pero no logra, obtener acceso a un espacio restringido.)         | Autenticidad                | RS y IT        |                                                                     |
| d         | Incidente (Un hecho que compromete los datos de los clientes.)                               | Confidencialidad            | RS, DPD y AEPD |                                                                     |
| e         | Incidente (La confirmación de una ameneza de hackers.)                                       | Integridad                  | RS, CERT       | ¿La web tiene conexión con datos confidenciales?                    |
| f         | Brecha (La difusión de datos privados.)                                                      | Confidencialidad            | RS, DPD y AEPD |                                                                     |
| g         | Incidente (El servicio puede verse afectado (no se guardan los ficheros o se sobreescriben.) | (\*Caso 1)                  | IT             |                                                                     |
| h         | Incidente (Existe la ameneza de un acceso no autorizado.)                                    | Autenticidad y trazabilidad | RS y CERT      | ¿Existen datos confidenciales en el sistema en el que se encuentra? |
| i         | Incidente (Existe la ameneza de un acceso no autorizado.)                                    | Autenticidad                | RS             | ¿Existen datos confidenciales en los sistemas afectados?            |
| j         | Alerta (Una herramienta detecta un patrón que podría suponer un peligro.)                    | Ninguna                     |                |                                                                     |

_Caso 1: Disponibilidad si no se pueden guardar nuevos ficheros o integridad en caso de que los nuevos sobreescriban los viejos.</br>_
_IT: equipo de IT</br>_
_RS: responsable de seguridad_

> Por si acaso crees que es IA porque la tabla del markdown que tengo es muy surrealista, estoy de acuerdo, pero uso un markdownlinter que él solito pone los espacios, corrige cosas y... Si te interesa la próxima vez que me veas y te muestro que no es IA :D (Si alejas lo suficiente la pantalla verás que la tabla en el .md está bonito)

## Tema 1 – Actividad 2. Ataques activos y pasivos

### Enunciado 2

Analiza cómo podría sufrir una pequeña empresa un ataque pasivo y uno activo sobre el
mismo servicio, y qué defensa corresponde a cada uno. El objetivo es entender por qué los
ataques pasivos se previenen y los activos, además, se detectan.

### Guía paso a paso 2

1. Elige un servicio: el correo, la wifi de la oficina o la web de pedidos.
2. Describe un ataque pasivo contra él: qué observa el atacante y qué consigue.
3. Describe un ataque activo contra el mismo servicio.
4. Para cada uno, indica si dejaría algún rastro y dónde.
5. Propón un control preventivo y, si es posible, uno detectivo para cada ataque.
6. Presenta el resultado en una tabla comparativa

### Solución 2

| Web de pedidos | Descripción                          | Rastro                                                                 | Control preventivo                            | Control detectivo                                      |
| -------------- | ------------------------------------ | ---------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------ |
| Ataque pasivo  | Web sniffing (como espectador)       | Solamente en el sistema del atacante                                   | Utilizando conexiones https bien configuradas | No se puede                                            |
| Ataque activo  | Web sniffing (alterando la web/MitM) | En el sistema del cliente y en la red por la que llegaron los paquetes | Utilizando conexiones https bien configuradas | Mediante el uso de un IDS (Intrusion Detection System) |

## Tema 1 – Actividad 3. Mapa de defensa de una pyme

### Enunciado 3

Diseña la defensa en profundidad de una gestoría de quince personas con un servidor de
ficheros, correo en la nube y teletrabajo dos días por semana. El objetivo es colocar cada
control en su capa y ver qué queda sin cubrir.

### Guía paso a paso 3

1. Dibuja las capas: personas, perímetro, red, equipo, aplicación y dato.
2. Coloca en cada capa al menos dos controles concretos.
3. Clasifica cada control como preventivo, detectivo o correctivo.
4. Elige un ataque (por ejemplo, phishing que acaba en ransomware) y recórrelo capa a capa: ¿dónde se frena?
5. Identifica la capa más débil y propón una mejora barata.
6. Entrega el esquema y media página de explicación.

| Capa       | Control preventivo                                                  | Control detectivo                                                               | Control correctivo                                                       |
| ---------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Personas   | Formación en ciberseguridad y simulacros de phishing                | Canal para que los empleados comuniquen correos o comportamientos sospechosos   |                                                                          |
| Perímetro  |                                                                     | Alertas del cortafuegos ante escaneos de puertos o intentos de acceso repetidos | Bloqueo de la IP atacante y cambio de las reglas del cortafuegos         |
| Red        | Segmentación (red de invitados separada), WPA3 y DHCP snooping      |                                                                                 | Aislar el segmento afectado y expulsar al dispositivo no autorizado      |
| Equipo     | Antivirus/EDR, parches al día, cifrado de disco y mínimo privilegio |                                                                                 | Reinstalar o restaurar el equipo y cambiar las credenciales usadas en él |
| Aplicación | HTTPS con HSTS, consultas parametrizadas y WAF                      |                                                                                 | Parchear la vulnerabilidad                                               |
| Datos      | Cifrado de datos sensibles y control de acceso por roles            | Registro de accesos a ficheros y alertas de descargas masivas                   |                                                                          |

El ataque elegido para la prueba es la del ejemplo (phishing que acaba en
ransomware):

Con los controles definidos, el ataque se frenaría en el primer momento, gracias
a la formación en ciberseguridad. Pero supongamos que supera esta capa.
Ahora uno de nuestros personales en la empresa habría activado un virus que
cifra los datos del ordenador. Superando la capa de la persona la siguiente es
el perímetro, este solo vigila intentos de accesos desautorizados, pero al
obtener acceso a un equipo, ya habrían obtenido las credenciales de este, por lo
que no serviría. En este punto llegaría a contagiar a todo el segmento de la red, sin embargo al estar segmentado, costaría más al ataque acceder a los datos. Este momento es el más crítico, aquí se dependerá de la velocidad de toma de decisiones del equipo SOC y la velocidad de detección de los agentes de control como Wazuh. Pues si el ataque es mediante un Ransomware que sea capaz de propagarse a través de la red, la respuesta más eficaz sería la de aislar este segmento. Sin embargo, si logra acceder hasta los datos antes de que el equipo SOC logre evitarlo, ya deberán ir preparando indemnizacione.

En cuanto a la capa más débil, por su puesto, normalmente suele ser el humano. Con esto no me refiero que las demás capas se puedan mejorar, pero el factor humano es impredecible y por mucha educación que se dé, la toma de decisiones siempre se hace desde las emociones, las cuales varían. Por tanto, una de las soluciones más óptimas y surrealistas, sería sumplantarlas por IAs capaces de realizar sus tareas, quitando de esta forma el factor humano. Esto podría suponer un problema sin un correcto entrenamiento, algo que hoy en día se sigue mejorando, por lo que hasta ese día, la toma de decisiones humanas, aún supera en ciertos aspectos al de la IA.
