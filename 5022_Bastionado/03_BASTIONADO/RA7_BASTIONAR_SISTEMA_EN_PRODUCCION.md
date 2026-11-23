# RA7. Bastionar el sistema en producción

_Resumen de la UT3. Hardening de sistemas operativos (Linux y Windows)_

> La UT3 desarrolla el **RA7** (bastionar el sistema en producción, tema 12) y toca el **RA6** (instalación segura, tema 11) en lo relativo al cifrado.

## 1. Objetivo del hardening

**Hardening** = reducir la **superficie de ataque** de un SO: quitar servicios innecesarios, aplicar configuraciones seguras, reforzar permisos y prepararlo para resistir ataques básicos y avanzados.

Sin hardening, un sistema queda expuesto a **escalada de privilegios**, **movimiento lateral** y **explotación automatizada**.

## 2. Principios generales

| Principio | Idea clave |
|---|---|
| Mínimos servicios | Solo los estrictamente necesarios: más servicios = más vectores de ataque |
| Configuraciones seguras por defecto | Los sistemas vienen pensados para facilidad de uso; el hardening lo revierte |
| Parches y actualizaciones | Sin parchear = vulnerable. Ciclo continuo |
| Control estricto de privilegios | Permisos mínimos: exactamente los necesarios (**mínimo privilegio**) |
| Monitorización y auditoría | Lo que no se registra no se puede detectar |
| No partir de cero | Se parte de una guía/línea base y se documentan las desviaciones |

**Guías y líneas base:**

- **CIS Benchmarks**: una por sistema y versión, con dos niveles de exigencia (nivel 1 y nivel 2).
- **Guías CCN-STIC**: referencia en España, obligatorias en el ámbito del **ENS**. Serie **600** (Linux y otros) y serie **500** (Windows).
- **Microsoft Security Baselines**: plantillas de **GPO** oficiales, dentro del **Security Compliance Toolkit**.
- **DISA STIG**: muy estrictas, habituales en defensa.

## 3. Hardening en Linux

### 3.1. Usuarios y permisos
- Eliminar cuentas innecesarias.
- `sudo` con restricciones.
- Permisos mínimos en archivos críticos (`/etc/passwd`, `/etc/shadow`…).
- Revisar grupos y accesos.

### 3.2. Servicios y procesos
- Deshabilitar servicios no usados: `systemctl disable`.
- Detectar demonios innecesarios: **FTP, Telnet, NFS, RPC** antiguos.
- Reducir los puertos abiertos.

### 3.3. Kernel (`sysctl`)
- Deshabilitar **IP forwarding** si no se usa.
- Anti-**spoofing**: filtrado de ruta inversa (`rp_filter`).
- Limitar paquetes **ICMP**.
- Protección de memoria y punteros: **ASLR**, `kptr_restrict`.

```ini
# /etc/sysctl.d/90-hardening.conf
net.ipv4.ip_forward = 0
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.icmp_echo_ignore_broadcasts = 1
net.ipv4.tcp_syncookies = 1
kernel.randomize_va_space = 2
kernel.kptr_restrict = 2
```

Se aplica con `sudo sysctl --system` y se comprueba con `sysctl <parámetro>`.

### 3.4. SSH
- Deshabilitar el acceso de **root**.
- Forzar **claves** en lugar de contraseñas.
- Cambiar el puerto **no** mejora la seguridad, solo reduce ruido.
- Controlar hosts permitidos y protocolos.

### 3.5. Integridad del sistema
- **AIDE**, **Tripwire** o el módulo **FIM** de **Wazuh**.
- Alertas cuando cambian archivos críticos.

### 3.6. Control de acceso obligatorio (MAC)
- **SELinux** (familia Red Hat) o **AppArmor** (Debian, Ubuntu): confinan cada servicio a lo que necesita, aunque corra como root.
- Deben estar en modo **enforcing**. Desactivarlos «porque molestan» es un error muy habitual.

### 3.7. Logs y auditoría
- **journald** / **rsyslog**.
- **auditd** para eventos relevantes.
- Rotación y retención de logs.

## 4. Hardening en Windows

### 4.1. Políticas de seguridad
- Bloqueo de cuentas por intentos fallidos.
- Reglas de contraseñas seguras.
- Restricciones de ejecución.

### 4.2. GPO (Group Policy Objects)
Configuración a nivel corporativo:
- Deshabilitar servicios inseguros.
- Firewall por defecto.
- Reforzar **RDP**.
- Controlar dispositivos **USB**.

### 4.3. Hardening de RDP
- Activar **NLA** (Network Level Authentication).
- Forzar **TLS**.
- Limitar las IP permitidas.
- Usar **gateway** o **VPN**.

### 4.4. Cuentas y privilegios
- Deshabilitar el **administrador local** o gestionarlo con **Windows LAPS** (contraseña distinta y rotada en cada equipo).
- Separar cuentas de administrador y de usuario.
- Permisos mínimos en carpetas sensibles.

### 4.5. Servicios y arranque
- Deshabilitar servicios **legacy**: **SMBv1**, **Telnet**, **Remote Registry**.
- Revisar las aplicaciones que arrancan al inicio.
- Evitar software obsoleto.

### 4.6. Auditoría y logs
- **Auditoría avanzada**: acceso a archivos, autenticación, cambios de política.
- Revisar los **Windows Event Logs** con regularidad.
- Enviar logs a un **SIEM** o servidor centralizado.

## 5. Hardening transversal (ambos sistemas)

| Medida | Linux | Windows |
|---|---|---|
| Cortafuegos local | **nftables** (sucesor de iptables), **firewalld**, **ufw** | **Firewall de Windows** con reglas específicas |
| Antivirus / antimalware | No obligatorio, útil en entornos mixtos | **Microsoft Defender**; en empresa + **EDR** |
| Cifrado de disco | **LUKS** | **BitLocker** |

- Cortafuegos: **negar todo excepto lo necesario**.
- Cifrado también **en tránsito** para los servicios.
- **Inventario y control de software**: solo software autorizado; detectar binarios no firmados o sospechosos.

## 6. Auditorías de seguridad

El hardening **no es un evento, es un proceso continuo**: la auditoría valida que el sistema sigue cumpliendo los controles.

**Herramientas:**
- Linux: **Lynis**, **OpenSCAP**.
- Multiplataforma: módulo **SCA** de **Wazuh** (compara con el CIS Benchmark y da un % de cumplimiento).
- Windows: **Policy Analyzer** (Security Compliance Toolkit), **Microsoft Defender for Endpoint**, **CLARA** (CCN).
- Escáneres de vulnerabilidades: **Nessus**, **OpenVAS**.

**Informe de auditoría:** hallazgos · severidad · control afectado · recomendaciones · acciones correctivas.

## 7. Buenas prácticas finales

- Eliminar software preinstalado innecesario.
- **MFA** en accesos críticos.
- Segregar las redes de administración.
- Registrar todo lo que afecte a la seguridad.
- Automatizar: scripts, **Ansible**, **GPO**.

## Conexiones con otras asignaturas

- **Hacking Ético 2 (Linux y shell)**: cada fallo de hardening (SUID, cuentas sin contraseña, `PermitRootLogin`) es un vector de **escalada de privilegios** visto desde el atacante.
- **Incidentes 5 (Auditoría)**: Lynis, OpenSCAP y el informe de auditoría son la misma idea vista desde la gestión.
- **Bastionado 8 (Monitorización y logs)** e **Incidentes 4 (Detección/SIEM)**: auditd y los Event Logs alimentan el SIEM.
- **Forense 1**: los logs que configuras aquí serán las evidencias de un análisis posterior.
