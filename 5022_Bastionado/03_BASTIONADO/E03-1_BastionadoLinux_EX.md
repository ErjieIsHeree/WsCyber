# E03. Bastionado de Linux

_Módulo 5022. Bastionado de redes y sistemas_
_Hecho por Erjie Xia_
_16 de noviembre de 2026_

## Cuaderno de cambios

| Fichero o comando                                         | Cambio                                             | Por qué (riesgo)                                                                                                                                    | Cómo deshacerlo                                                                                                |
| --------------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `/etc/passwd` y `/etc/shadow`                             | Permisos 664 en lugar de 644 y 600                 | Si el grupo puede escribir, alguien podría añadir una cuenta con UID 0 y escalar a root, en shadow con que puedan leerlo ya vulnera las contraseñas | `sudo chmod 644 /etc/passwd` y `sudo chmod 600 /etc/shadow`                                                    |
| `/usr/bin/find`                                           | Bit SUID activado                                  | `find . -exec /bin/sh -p \;` da una shell de root a cualquier usuario                                                                               | `sudo chmod u-s /usr/bin/find`                                                                                 |
| Usuario `invitado`                                        | Cuenta con shell `/bin/bash` y sin contraseña (NP) | Acceso local o por FTP sin credenciales; sirve como puerta de entrada persistente                                                                   | `sudo deluser --remove-home invitado` (o `sudo passwd -l invitado`)                                            |
| `vsftpd` (servicio)                                       | Instalado, activo y habilitado                     | Servicio innecesario, sin cifrado (`ssl_enable=NO`), amplía la superficie de ataque                                                                 | `sudo systemctl disable --now vsftpd` (o `apt remove --purge vsftpd`)                                          |
| `/etc/vsftpd.conf`                                        | `anonymous_enable=YES`                             | Permite entrar al FTP sin autenticarse                                                                                                              | `sudo sed -i 's/^anonymous_enable=YES/anonymous_enable=NO/' /etc/vsftpd.conf`                                  |
| `/etc/cron.d/limpieza-tmp` y `/usr/local/bin/limpieza.sh` | Tarea de root cada 10 min que ejecuta un script    | Root ejecuta un script con una ruta modificable; si alguien puede escribirlo, escala a root. Su contenido solo borra ficheros viejos de `/tmp`      | `sudo rm /etc/cron.d/limpieza-tmp /usr/local/bin/limpieza.sh`                                                  |
| `/etc/ssh/sshd_config.d/05-legacy-compat.conf`            | `PermitRootLogin yes`                              | Permite login directo como root por SSH, objetivo típico de fuerza bruta                                                                            | Borrar el fichero y fijar `PermitRootLogin no` en `99-hardening.conf`                                          |
| `/etc/ssh/sshd_config.d/05-legacy-compat.conf`            | `PermitEmptyPasswords yes`                         | Permite entrar por SSH a cuentas sin contraseña                                                                                                     | Borrar el fichero y fijar `PermitEmptyPasswords no`                                                            |
| `/etc/ssh/sshd_config.d/05-legacy-compat.conf`            | `X11Forwarding yes`                                | Reenviar X11 expone al cliente a ataques a través del servidor                                                                                      | `X11Forwarding no` en `99-hardening.conf` y `sudo sshd -t && sudo systemctl restart ssh`                       |
| `/etc/sysctl.d/60-net-tuning.conf`                        | `kernel.randomize_va_space = 0`                    | ASLR desactivado: facilita explotar desbordamientos de memoria                                                                                      | Borrar el fichero y fijar `kernel.randomize_va_space = 2` en `99-hardening.conf`, luego `sudo sysctl --system` |
| `/etc/sysctl.d/60-net-tuning.conf`                        | `net.ipv4.ip_forward = 1`                          | El equipo reenvía tráfico entre redes como si fuera un router                                                                                       | Fijar `net.ipv4.ip_forward = 0`                                                                                |
| `/etc/sysctl.d/60-net-tuning.conf`                        | `fs.suid_dumpable = 2`                             | Los programas SUID pueden volcar su memoria a disco (core dumps), con posible fuga de secretos                                                      | Fijar `fs.suid_dumpable = 0`                                                                                   |

## Documentación

### /etc/passwd y /etc/shadow

**Hallazgo:** Los dos ficheros tienen permisos `664`.

**Detección:**

```bash
ls -l /etc/passwd /etc/shadow
```

**Riesgo:** `/etc/passwd` define las cuentas y sus UID. Si alguien del grupo puede escribirlo, le basta con añadir una línea como `someone::0:0::/root:/bin/bash` para tener una cuenta con UID 0, es decir, root. `/etc/shadow` es el encargado de guardar las contraseñas en hash, si otros usuarios que no sean root son capaces de leer o en peor caso, editar, podrían hallar o alterar las contraseñas

**Corrección:** Cada fichero tiene sus propios permisos correctos: `/etc/passwd` debe ser legible por todos, porque muchos programas necesitan resolver nombres de usuario, y `/etc/shadow`, dependiendo del sistema, solo debe poder leerlo el grupo `shadow` y/o `root`.

```bash
sudo chmod 644 /etc/passwd
sudo chmod 600 /etc/shadow
```

### /usr/bin/find

**Hallazgo:** `/usr/bin/find` tiene el bit SUID activado (`-rwsr-xr-x`) y su propietario es root.

**Detección:**

```bash
ls -l /usr/bin/find
```

**Riesgo:** Un binario con SUID se ejecuta con los privilegios de su propietario, no con los del usuario que lo lanza. `find` puede ejecutar comandos (`-exec`), así que cualquier usuario consigue una shell de root con `find . -exec /bin/sh -p \; -quit`. La opción `-p` hace que `sh` permanezca con los privilegios de `find`.

**Corrección:**

```bash
sudo chmod u-s /usr/bin/find
```

### Usuario invitado

**Hallazgo:** La cuenta `invitado` tiene la shell interactiva `/bin/bash` y no tiene contraseña (estado `NP`, _No Password_).

**Detección:**

```bash
sudo passwd -S invitado            # muestra "NP"
sudo awk -F: '$2==""' /etc/shadow  # cuentas con el campo de contraseña vacío
getent passwd invitado             # shell asignada
```

**Riesgo:** Cualquiera puede entrar como `invitado` sin credenciales.

**Corrección:**

```bash
sudo deluser --remove-home invitado
```

### vsftpd (servicio)

**Hallazgo:** `vsftpd` sin cifrado (ssl_enable=NO)

**Detección:**

```bash
systemctl status vsftpd
sudo ss -tlnp | grep ':21'
```

**Riesgo:** FTP transmite usuario, contraseña y datos sin cifrado (`ssl_enable=NO`), así que cualquiera que intercepte el tráfico se lleva las credenciales.

**Corrección:** Se para y se deshabilita. Si alguna vez se desea usar, configurar el cifrado ssl.

```bash
sudo systemctl disable --now vsftpd
```

### /etc/vsftpd.conf

**Hallazgo:** La configuración de `vsftpd` incluye `anonymous_enable=YES`.

**Detección:**

```bash
grep -E '^(anonymous_enable|anon_upload_enable|write_enable|ssl_enable)' /etc/vsftpd.conf
```

**Riesgo:** El acceso anónimo deja entrar con el usuario `anonymous` (o `ftp`) y cualquier contraseña. Se puede leer lo que esté publicado y, si `anon_upload_enable` o `write_enable` están activos, también subir ficheros para alojar malware o llenar el disco.

**Corrección:** Solo hace falta si se decide mantener el servicio. Si se ha desinstalado, el fichero desaparece con `--purge`.

```bash
sudo sed -i 's/^anonymous_enable=YES/anonymous_enable=NO/' /etc/vsftpd.conf
sudo systemctl restart vsftpd
```

Si el servicio se mantiene, también conviene activar `ssl_enable=YES` con un certificado y limitar los usuarios con `userlist_enable=YES`.

### /etc/cron.d/limpieza-tmp y /usr/local/bin/limpieza.sh

**Hallazgo:** Root ejecuta `/usr/local/bin/limpieza.sh` cada 10 minutos desde `/etc/cron.d/limpieza-tmp`. El script solo borra ficheros antiguos de `/tmp`.

**Detección:**

```bash
cat /etc/cron.d/limpieza-tmp
ls -l /usr/local/bin/limpieza.sh
ls -ld /usr/local/bin
cat /usr/local/bin/limpieza.sh
```

**Riesgo:** Lo que hace el script hoy no es peligroso, pero quien pueda modificar el script o su directorio puede añadir comandos que serán ejecutados con root.

**Corrección:** Ubuntu ya limpia `/tmp` con `systemd-tmpfiles-clean.timer` (y lo vacía al arrancar), así que esta tarea sobra y se elimina:

```bash
sudo rm /etc/cron.d/limpieza-tmp /usr/local/bin/limpieza.sh
```

### PermitRootLogin yes (/etc/ssh/sshd_config.d/05-legacy-compat.conf)

**Hallazgo:** Un fichero de configuración añadido, `05-legacy-compat.conf`, activa el login directo de root por SSH.

**Detección:** Lo fiable es consultar la configuración que `sshd` aplica de verdad, no un fichero suelto:

```bash
sudo sshd -T | grep -i permitrootlogin
grep -r . /etc/ssh/sshd_config.d/
```

**Riesgo:** `root` es un nombre de usuario que existe en todos los sistemas, así que los ataques de fuerza bruta solo tienen que adivinar la contraseña.

**Corrección:** En OpenSSH, **para cada opción vale el primer valor que se lee**. El `sshd_config` de Ubuntu incluye `sshd_config.d/*.conf` al principio y esos ficheros se leen por orden alfabético, así que mientras exista `05-legacy-compat.conf` su valor gana a cualquier `99-hardening.conf`. Hay que borrarlo:

```bash
sudo rm /etc/ssh/sshd_config.d/05-legacy-compat.conf
echo 'PermitRootLogin no' | sudo tee -a /etc/ssh/sshd_config.d/99-hardening.conf
sudo sshd -t && sudo systemctl restart ssh
```

### PermitEmptyPasswords yes (/etc/ssh/sshd_config.d/05-legacy-compat.conf)

**Hallazgo:** El mismo fichero permite iniciar sesión por SSH en cuentas sin contraseña.

**Detección:**

```bash
sudo sshd -T | grep -i permitemptypasswords
```

**Riesgo:** Por sí sola esta opción no hace nada, pero junto con la cuenta `invitado` sin contraseña permite entrar en remoto escribiendo solo `ssh invitado@<ip>`. Con el SUID de `find`, eso lleva a root sin conocer ninguna credencial.

**Corrección:** Al borrar `05-legacy-compat.conf` se vuelve al valor por defecto (`no`), pero conviene dejarlo escrito para que nadie lo active sin querer:

```bash
echo 'PermitEmptyPasswords no' | sudo tee -a /etc/ssh/sshd_config.d/99-hardening.conf
sudo sshd -t && sudo systemctl restart ssh
```

### X11Forwarding yes (/etc/ssh/sshd_config.d/05-legacy-compat.conf)

**Hallazgo:** El reenvío de X11 parece estar activado.

**Detección:**

```bash
sudo sshd -T | grep -i x11forwarding
```

**Riesgo:** El reenvío de X11 lleva las aplicaciones gráficas del servidor a la pantalla del cliente. Si el servidor está comprometido, un atacante con acceso a ese canal puede capturar las teclas que se pulsan, hacer capturas de pantalla o inyectar eventos en el escritorio del cliente.

**Corrección:** El `/etc/ssh/sshd_config` de Ubuntu ya trae `X11Forwarding yes` por defecto. Hay que fijar el valor explícitamente en `99-hardening.conf`, que se lee antes que esa línea del fichero principal:

```bash
echo 'X11Forwarding no' | sudo tee -a /etc/ssh/sshd_config.d/99-hardening.conf
sudo sshd -t && sudo systemctl restart ssh
```

### kernel.randomize_va_space = 0 (/etc/sysctl.d/60-net-tuning.conf)

**Hallazgo:** El fichero `60-net-tuning.conf` desactiva ASLR (_Address Space Layout Randomization_). Por su nombre parece un ajuste de red, pero mezcla parámetros de seguridad del kernel.

**Detección:**

```bash
sysctl kernel.randomize_va_space
grep -r . /etc/sysctl.d/
```

**Riesgo:** ASLR coloca la pila, el heap y las librerías en direcciones aleatorias cada vez que se ejecuta un programa. Con el valor `0`, las direcciones siempre son las mismas, así que un exploit de desbordamiento de búfer puede saltar a direcciones fijas (por ejemplo en _return-to-libc_ o ROP) sin tener que filtrarlas ni probar a ciegas. Los valores posibles son `0` (desactivado), `1` (parcial) y `2` (completo, el valor por defecto).

**Corrección:** Los ficheros de `/etc/sysctl.d/` se aplican por orden alfabético y **gana el último**, al revés que en SSH. Un `99-hardening.conf` ya sobrescribiría el `60`, pero es mejor borrar el fichero problemático para evitar confusiones:

```bash
sudo rm /etc/sysctl.d/60-net-tuning.conf
echo 'kernel.randomize_va_space = 2' | sudo tee -a /etc/sysctl.d/99-hardening.conf
sudo sysctl --system
```

### net.ipv4.ip_forward = 1 (/etc/sysctl.d/60-net-tuning.conf)

**Hallazgo:** El reenvío de paquetes IPv4 está activado.

**Detección:**

```bash
sysctl net.ipv4.ip_forward
```

**Riesgo:** Con el reenvío activado, el equipo pasa paquetes de una interfaz a otra como si fuera un router.

**Corrección:**

```bash
echo 'net.ipv4.ip_forward = 0' | sudo tee -a /etc/sysctl.d/99-hardening.conf
sudo sysctl --system
```

### fs.suid_dumpable = 2 (/etc/sysctl.d/60-net-tuning.conf)

**Hallazgo:** Los programas SUID pueden generar volcados de memoria (_core dumps_).

**Detección:**

```bash
sysctl fs.suid_dumpable
sysctl kernel.core_pattern
```

**Riesgo:** Cuando un programa falla, el kernel puede guardar su memoria en un fichero _core_. Los programas SUID como `passwd`, `su` o `sudo` manejan en memoria contraseñas, hashes leídos de `/etc/shadow` o claves. Con el valor `2`, si alguien provoca que uno de ellos falle, esos datos acaban escritos en disco, y según `core_pattern` pueden quedar en una ruta donde otros usuarios pueden leerlos. Los valores posibles son `0` (sin volcados, el valor por defecto), `1` (volcados sin restricciones, solo para depurar) y `2` (volcados que solo root puede leer).

**Corrección:**

```bash
echo 'fs.suid_dumpable = 0' | sudo tee -a /etc/sysctl.d/99-hardening.conf
sudo sysctl --system
```

### Cadena de ataque combinada

Algunos de estos hallazgos son graves por sí solos, pero juntos permiten tomar el sistema completo desde fuera sin conocer ninguna contraseña:

1. `ssh invitado@<ip>`: entra sin contraseña gracias a `PermitEmptyPasswords yes` y a la cuenta en estado `NP`.
2. `find . -exec /bin/sh -p \; -quit`: el SUID de `find` da una shell de root.
3. Persistencia: añadir una cuenta con UID 0 en `/etc/passwd` o modificar `limpieza.sh` para que root lo ejecute cada 10 minutos.
