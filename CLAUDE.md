# WsCyber — mapa de asignaturas

Repositorio de un curso de ciberseguridad (2026/27). El curso acaba de empezar y el temario irá creciendo.

**Dónde está cada tema:** el número de tema del mapa es la carpeta `NN_*` dentro de su asignatura.
Por ejemplo, Bastionado 3 → `5022_Bastionado/03_BASTIONADO/` y Hacking Ético 2 → `5025_EthHack/02_*/`.
Dentro suele haber apuntes (`*_Apuntes.pdf`), actividades (`*_Actividades.pdf`), la entrega del alumno (`*_EX.md`) y un `RA*.md` cuyo nombre indica el resultado de aprendizaje del tema.

**Material y avisos:**
- Los títulos y apartados de cada tema salen de los PDF de apuntes: `pdftotext -l 3 <archivo>.pdf -`.
- Los `RA*.md` y los `.md` índice de cada asignatura están vacíos por ahora.
- Los binarios de retos (p. ej. `reto_peligroso/`) se ejecutan solo en las VMs del laboratorio (`vb_machines/`, fuera de git), nunca en el host.
- Ignora `node_modules/`, `vb_imgs/` y `vb_machines/` al explorar.

## Cómo usar este mapa

Al responder sobre un tema de una asignatura, aporta también la perspectiva de las otras usando los ejes y puentes de abajo.
Por ejemplo, una duda de Bastionado puede responderse además desde PPS, Hacking Ético o Incidentes.
Un puente `↔ Asignatura N` apunta a la carpeta `NN_*` de esa asignatura; sin número, el tema destino aún no existe.
Este archivo recoge solo temas y relaciones. Los detalles (apuntes, entregas, soluciones) se leen del repo cuando hagan falta.

## Ejes transversales

| Eje | Asignaturas que lo tratan |
|---|---|
| Riesgo y amenazas | Incidentes (taxonomía, Kill Chain, MITRE ATT&CK) · Bastionado (análisis de riesgos) · PPS (modelado de amenazas) · Hacking Ético (visión del atacante) |
| Prevenir / endurecer | Bastionado (hardening, redes, IAM, cloud, parches) · PPS (código y despliegue seguros) · Incidentes (políticas, concienciación) |
| Detectar | Incidentes (IDS/IPS, SIEM, OSINT) · Bastionado (logs, monitorización) · Hacking Ético (reconocimiento: lo que un atacante ve) |
| Responder y recuperar | Incidentes (contención, erradicación, continuidad) · Bastionado (respuesta, backups) · Forense (evidencias) |
| Evidencia y ley | Forense (metodología, normas UNE) · Incidentes (cadena de custodia, notificación) · Normativa |
| Ataque ↔ defensa | Cada técnica de Hacking Ético tiene su contramedida en Bastionado/PPS y su detección en Incidentes |

## Asignaturas y puentes

### 5021 Incidentes de Ciberseguridad — ciclo de vida del incidente
1. Introducción y prevención (evento/alerta/incidente/brecha, CID): base común del curso.
2. Prevención y concienciación (factor humano) ↔ IAM y credenciales (Bastionado 5).
3. Taxonomía y clasificación (Kill Chain, ATT&CK, ransomware) ↔ reconocimiento, la fase 1 que practica el atacante (Hacking Ético 3); modelado de amenazas (PPS).
4. Detección (IDS/IPS, SIEM, OSINT) ↔ monitorización (Bastionado 8); footprinting (Hacking Ético 3).
5. Auditoría ↔ auditorías de hardening (Bastionado 3).
6. Recogida de evidencias (volatilidad, custodia) ↔ metodología forense (Forense 1).
7. Gestión del incidente (contención, cierre) ↔ respuesta y recuperación (Bastionado 10).
8. Medidas y respuesta (políticas, continuidad) ↔ respuesta y backups (Bastionado 10).
9. Mejora continua (lecciones aprendidas, informe).
10. Notificación y comunicación (phishing) ↔ Normativa.

### 5022 Bastionado de Redes y Sistemas — reducir la superficie de ataque
1. Análisis de riesgos ↔ taxonomía (Incidentes 3); requisitos de seguridad (PPS).
2. Arquitecturas de red seguras (segmentación, DMZ, Zero Trust) ↔ movimiento lateral (Hacking Ético).
3. Hardening de SO Linux/Windows ↔ shell y escalada de privilegios (Hacking Ético 2); auditoría (Incidentes 5).
4. Bastionado de servicios (web, SSH, DNS, BBDD, correo) ↔ fundamentos web (PPS 1) y despliegue endurecido (PPS); servicios expuestos que revela el footprinting (Hacking Ético 3).
5. IAM ↔ autenticación en aplicaciones (PPS); cracking de hashes (Hacking Ético 1); concienciación (Incidentes 2).
6. WiFi y movilidad.
7. Cloud y contenedores ↔ despliegue (PPS).
8. Monitorización y logs ↔ detección/SIEM (Incidentes 4); materia prima de Forense (Forense 1).
9. Parches y vulnerabilidades (CVE) ↔ mantenimiento (PPS); explotación (Hacking Ético).
10. Respuesta y recuperación ↔ gestión y medidas (Incidentes 7, 8); evidencias (Forense 1).

### 5023 Puesta en Producción Segura (PPS) — seguridad en todo el ciclo de desarrollo (S-SDLC)
1. Fundamentos de la programación web (HTTP, navegador, modelo de ejecución) ↔ servicios web (Bastionado 4); HTTP y certificados vistos desde fuera (Hacking Ético 3). Es el único tema con material por ahora.

Fases del S-SDLC que estructuran el resto del módulo:
- Requisitos ↔ análisis de riesgos (Bastionado 1).
- Diseño / modelado de amenazas ↔ Kill Chain y ATT&CK (Incidentes 3).
- Codificación segura ↔ vulnerabilidades web que explota Hacking Ético; almacenamiento de contraseñas (Hacking Ético 1, Bastionado 5).
- Pruebas de seguridad ↔ técnicas ofensivas (Hacking Ético).
- Despliegue endurecido ↔ hardening de servicios y cloud (Bastionado 4, 7).
- Mantenimiento ↔ gestión de parches (Bastionado 9).

### 5024 Análisis Forense Informático — sobre todo práctico
1. Normativa y metodología forense (preservación, adquisición, documentación, análisis, presentación) ↔ evidencias y custodia (Incidentes 6); respuesta (Bastionado 10); marco legal (Normativa).

Los artefactos que deja un ataque (Hacking Ético 2) y los logs que configura Bastionado 8 son la materia prima del análisis.

### 5025 Hacking Ético — pensar como el atacante (retos CTF)
1. Hashing y cracking de contraseñas ↔ credenciales/IAM (Bastionado 5); almacenamiento seguro (PPS).
2. Linux y shell ↔ hardening de Linux (Bastionado 3); recogida de evidencias (Forense 1).
3. Footprinting / reconocimiento ↔ Kill Chain y OSINT (Incidentes 3, 4); exposición de servicios (Bastionado 4); HTTP y certificados (PPS 1).

### 5026 Normativa de Ciberseguridad — sin temario todavía
Puentes previstos: notificación de incidentes (Incidentes 10), validez legal de la evidencia (Forense 1), cumplimiento y retención de logs (Bastionado 8), protección de datos en aplicaciones (PPS).

## Mantenimiento del mapa

Cuando llegue temario nuevo, añade sus temas a la asignatura con el mismo número que su carpeta `NN_*`, y sus puentes con las otras en ambos lados.
Si un puente apuntaba solo a una asignatura (sin número) y ya existe el tema destino, añádele el número.
No añadas aquí detalles concretos de entregas, rutas ni soluciones.
