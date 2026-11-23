# UT4 · Bastionado de servicios críticos — resumen

> RA7 (temas 12 y 13: servicios, protocolos y administración remota segura) · enlaza con RA5 (tema 10).

## 1. Objetivo

Que todo servicio, **expuesto o interno**, funcione con las **mínimas funcionalidades necesarias**, **cifrado fuerte** y **autenticación adecuada**, sin **configuraciones débiles** que permitan **ataques triviales**.
Los **servicios mal configurados** son una de las **principales causas de intrusiones**.

## 2. Principios generales

| Principio | Idea clave |
|---|---|
| **Mínima funcionalidad** | El servicio hace solo lo necesario. Se deshabilitan **opciones, módulos y extensiones** innecesarios. |
| **Cifrado obligatorio** | Todo **tráfico sensible** va por **TLS** con configuración moderna. |
| **Autenticación y control de acceso** | Si el servicio ofrece autenticación, **nunca se deja acceso libre**. |
| **Reducción de superficie** | Limitar **puertos**, **restricciones por IP**, **límites de conexión**, **timeouts** y **políticas defensivas**. |
| **Registro y monitorización** | Cada servicio crítico **registra actividad** y envía los **logs a un sistema centralizado**. |

## 3. Servicios web (HTTP/HTTPS)

- **Deshabilitar HTTP**: redirigir siempre a **HTTPS**, sin excepciones.
- **TLS seguro**:
  - Mínimo **TLS 1.2**, ideal **TLS 1.3**.
  - Deshabilitar **cifrados débiles**: **RC4, DES, 3DES, CBC vulnerables**.
  - **Certificados válidos** con **renovación automática** (protocolo **ACME**, p. ej. **Let's Encrypt** + **certbot**).
- **Configuración del servidor** (Nginx/Apache):
  - Deshabilitar **módulos innecesarios**.
  - Limitar los **server tokens** para no revelar la versión.
  - **Cabeceras de seguridad**: **HSTS**, **X-Content-Type-Options**, **X-Frame-Options** (o su sustituta, la directiva **`frame-ancestors`** de CSP), **Content-Security-Policy**, **Referrer-Policy** y **Permissions-Policy**.

```nginx
# Nginx: fragmento de un servidor bastionado
server_tokens off;
ssl_protocols TLSv1.2 TLSv1.3;
add_header Strict-Transport-Security "max-age=31536000" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Content-Security-Policy "default-src 'self'; frame-ancestors 'none'" always;
client_max_body_size 2m;
```

- **Comprobación desde fuera**: `curl -I https://servidor` o **testssl.sh**.
- **Protección frente a ataques comunes**: **limitar el tamaño de las peticiones**, **rate limiting**, **aislar el servidor web de la base de datos** y usar un **reverse proxy** para aislar las aplicaciones.

## 4. SSH

- **Esencial**: deshabilitar el **login de root**, solo **claves públicas** (sin contraseñas), limitar a **usuarios específicos** y **restringir por IP** (`AllowUsers` + **firewall**).
- **Extra**:
  - **Fail2ban** o equivalentes contra la **fuerza bruta**.
  - **Puerto no estándar** solo como **medida anti-ruido**, no como seguridad real.
  - **OpenSSH actualizado** y **algoritmos modernos**. **SSH1** ya no existe; hoy el riesgo está en **cifrados y claves antiguos** (**RSA corto, DSA, SHA-1**).

```text
# /etc/ssh/sshd_config.d/90-hardening.conf
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AllowUsers admin1 admin2
MaxAuthTries 3
LoginGraceTime 30
X11Forwarding no
ClientAliveInterval 300
ClientAliveCountMax 2
```

- Antes de recargar: **validar la sintaxis** con `sudo sshd -t` y **mantener abierta la sesión actual** hasta comprobar que se puede entrar con una nueva.

## 5. RDP (Windows)

- **Endurecimiento básico**: activar **Network Level Authentication (NLA)**, **exigir TLS**, restringir a **direcciones concretas**.
  **Nunca exponer RDP directamente a Internet**: siempre detrás de una **VPN** o de un **RD Gateway**, con **MFA**.
- **Firewall**: RDP solo desde **redes o jump servers autorizados**.
- **Supervisión**: registrar **conexiones exitosas y fallidas**. **Alertas** por **múltiples intentos fallidos** o **accesos fuera de horario**.

## 6. DNS

- **Configuración segura**: **sin recursión en servidores públicos**, **DNS interno separado del externo**, **transferencias de zona** solo a **servidores autorizados**.
- **Protección**:
  - **DNSSEC** si la infraestructura lo soporta.
  - **Ocultar la versión** y aplicar **limitación de tasa de respuestas (RRL)** para no servir de **amplificador en ataques DDoS**.
  - Registrar **consultas** y **peticiones malformadas**.

## 7. Bases de datos (MySQL, PostgreSQL, SQL Server)

- **Principios**:
  - **Nunca expuesta a Internet**. Debe escuchar solo en la **interfaz necesaria** (**`bind-address`** en MySQL/MariaDB, **`listen_addresses`** en PostgreSQL).
  - Acceso solo desde **servidores autorizados** (web, API).
  - **Usuarios con permisos mínimos** por aplicación.
- **Configuraciones críticas**: deshabilitar **cuentas por defecto**, **rotación periódica de contraseñas o claves**, **cifrar las conexiones cliente-servidor** y **separar los roles de administración y de aplicación**.
- **Supervisión**: registro de **consultas anómalas**, detección de **fallos de login repetidos** y **limitación de conexiones por usuario**.

## 8. Correo

- **Controles básicos**:
  - **TLS en entrada y salida**.
  - **SPF, DKIM y DMARC** bien configurados, con DMARC en política **`quarantine`** o **`reject`** (con **`none`** solo informa).
  - **Filtrado de spam y malware**.
  - **Limitación de relaying**, para no ser un **open relay**.
- **Separación de roles**: el servidor de correo **no sirve web, SSH ni bases de datos** en el mismo host.

## 9. Control de puertos y exposición

Cada servicio escucha solo en:
- el **puerto mínimo necesario**;
- la **interfaz adecuada** (**localhost** si es interno);
- la **red correcta** (**segmentos específicos**).

**Prohibido `0.0.0.0` en servicios internos.**
Para ver qué escucha y dónde: `sudo ss -tulpn` en Linux (sustituye a `netstat`) y `Get-NetTCPConnection -State Listen` en Windows.

## 10. Monitorización de servicios

- **Logs en otro servidor**, distinto del que los genera.
- **Alertas por comportamiento anormal**.
- **Métricas**: CPU, memoria, conexiones, fallos.
- **Detección de cambios en archivos de configuración**.

La **supervisión continua** es imprescindible en **producción**.

## 11. Hardening transversal

**Actualizaciones frecuentes**, **eliminación de versiones legacy**, **control de dependencias** y uso de **contenedores o entornos aislados** cuando sea posible.

## Para ampliar

- **Generador de configuraciones TLS de Mozilla**: perfiles **moderno**, **intermedio** y **antiguo**.
- **CIS Benchmarks** de Nginx, Apache, MySQL, PostgreSQL y SQL Server.
- **OWASP Secure Headers Project**.
- **Guías CCN-STIC** sobre servicios (correo, DNS, servidores web).

## Conexiones con otras asignaturas

- **Hacking Ético 3 (footprinting)**: las cabeceras, el certificado y los puertos que bastionas aquí son lo que el atacante ve desde fuera.
- **PPS 1**: HTTP y cómo el navegador aplica las cabeceras de seguridad. Despliegue endurecido.
- **Hacking Ético 1 / Bastionado 5**: solo claves en SSH y MFA en RDP frente al cracking y la fuerza bruta de credenciales.
- **Incidentes 4 / Bastionado 8**: logs centralizados y alertas alimentan el SIEM.
- **Incidentes 10**: SPF/DKIM/DMARC frente al phishing y la suplantación de dominio.
