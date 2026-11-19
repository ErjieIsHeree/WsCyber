# Bastionado de Redes y Sistemas

_Hecho por Erjie Xia_
_15 de noviembre de 2026_

___

## UT3 – Actividad 1. Hardening básico de Linux

1. Arranca una máquina Linux (puede ser VM).
2. Identifica servicios que no se necesiten y desactívalos
3. Edita la configuración de SSH para endurecerla (autenticación, permisos, acceso)
4. Revisa permisos en carpetas sensibles (/etc/, /var/log, /var/crash)
5. Ajusta parámetros básicos en sysctl que mejoren seguridad
6. Anota todos los cambios aplicados y las razones de cada uno

La tarea se realizará sobre una nueva instalación de "Ubuntu 26.04.1 LTS" y kernel "7.0.0-43-generic" con la configuración predeterminada en VirtualBox.

Notas de configuración por comodida:

- El usuario creado es "someone" con la contraseña "1234" (nótese que es una práctica, en entornos de producción el usuario debe contener un nombre indicativo y la contraseña debe portar mayor fortaleza)
- Se añadió la distribución española para el teclado
- Se cambió la resolución a 1920x1080p.
- Se instaló Lynis

> El usuario debería ser uno más reconocible y la contraseña más complicada, pero debido a que es un entorno para testing se han usado estos para facilitar su uso

| Cambio aplicado                                                                                                                        | Razón                                                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Deshabilitar `apport.service`, `apport-forward.socket`, `apport-autoreport.path` y `apport-autoreport.timer`                           | Recogen volcados de memoria de procesos que fallan, que pueden contener contraseñas o claves, y preparan su envío a Canonical. Han tenido vulnerabilidades de escalada de privilegios.    |
| Deshabilitar `avahi-daemon.service` y `avahi-daemon.socket`                                                                            | Anuncia el equipo y descubre otros por mDNS (UDP 5353). Expone información en la red local y no se usa.                                                                                   |
| Deshabilitar `cups-browsed.service`                                                                                                    | Añade automáticamente impresoras anunciadas en la red. Tiene vulnerabilidades graves de ejecución remota de código (CVE-2024-47176 y otras).                                              |
| Deshabilitar `ModemManager.service`                                                                                                    | Gestiona módems móviles 3G/4G/5G y SIM. El equipo no tiene ninguno, y además sondea puertos serie.                                                                                        |
| Deshabilitar `networkd-dispatcher.service`                                                                                             | Ejecuta scripts cuando cambia una interfaz gestionada por `systemd-networkd`. La red la gestiona NetworkManager, así que no tiene nada que escuchar.                                      |
| Deshabilitar `openvpn.service`                                                                                                         | Arranca túneles VPN de `/etc/openvpn/*.conf`. No hay ninguno configurado.                                                                                                                 |
| Deshabilitar `sssd.service` y sus 6 sockets (`sssd-nss`, `sssd-pam`, `sssd-sudo`, `sssd-ssh`, `sssd-autofs`, `sssd-pac`)               | Cliente de autenticación centralizada (Active Directory, LDAP, Kerberos). El equipo no está en ningún dominio, así que es un servicio de autenticación sin función.                       |
| Deshabilitar `cloud-init-local`, `cloud-init-network`, `cloud-init-main`, `cloud-config`, `cloud-final` y `cloud-init-hotplugd.socket` | Configuran máquinas en la nube en el primer arranque (usuarios, claves SSH, red, scripts). Un equipo físico no es una instancia cloud.                                                    |
| Deshabilitar `ubuntu-advantage.service`, `ua-reboot-cmds.service` y `ua-timer.timer`                                                   | Cliente de Ubuntu Pro. Sin suscripción solo hace consultas externas a Canonical.                                                                                                          |
| Deshabilitar `motd-news.timer`                                                                                                         | Descarga noticias de Canonical para el mensaje de login. Es una conexión saliente sin utilidad de seguridad.                                                                              |
| Deshabilitar `update-notifier-download.timer` y `update-notifier-motd.timer`                                                           | Avisos informativos de actualizaciones. Las actualizaciones reales las gestiona `unattended-upgrades`.                                                                                    |
| Deshabilitar `kdump-tools.service`                                                                                                     | Guarda un volcado completo de la RAM tras un fallo del kernel, con claves y datos sensibles, y reserva memoria. Solo sirve para depurar el kernel.                                        |
| Deshabilitar `ssl-cert.service`                                                                                                        | Vinculado a un certificado autofirmado de prueba (_snakeoil_). Ningún servicio instalado lo usa.                                                                                          |
| Enmascarar `colord.service`                                                                                                            | Gestiona perfiles de color de pantallas e impresoras. No hay trabajo gráfico que lo justifique, y es un demonio más con acceso a D-Bus. Se enmascara porque lo activa D-Bus bajo demanda. |

> Los cambios a aplicar para bastionar una máquina deben seguir guía como las proporcionadas por CIS Benchmarks o CCN-STIC.

## UT3 – Actividad 2. Hardening básico de Windows

1. Accede al panel de políticas locales o GPO según el sistema
2. Configura políticas de contraseñas (complejidad, bloqueo, longitud mínima)
3. Revisa y ajusta el firewall local por perfiles
4. Configura RDP de forma segura (acceso limitado, autenticación requerida)
5. Deshabilita cuentas innecesarias o con permisos excesivos
6. Documenta cada ajuste y justifica por qué mejora la seguridad

## UT3 – Actividad 3. Auditoría del sistema

1. En Linux, ejecuta una herramienta como Lynis
2. Anota los hallazgos más relevantes: configuraciones débiles, servicios abiertos, permisos incorrectos, etc
3. Identifica qué problemas son críticos, cuáles son medios y cuáles son menores
4. Redacta un breve informe con los puntos detectados y propuestas de mejora
5. Asegúrate de que el informe sea claro, entendible y útil para tomar decisiones
