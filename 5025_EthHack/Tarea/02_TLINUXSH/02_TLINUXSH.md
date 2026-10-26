# 02_THLINUXSH

## Description

En esta tarea se busca lograr un nivel básico de conocimientos sobre bash. Para ello se utilizará una máquina virtual configurada con usuarios orion0, orion1, orion2..., hasta orion 16. El objetivo es llegar al usuario orion16. Para ello se debe iniciar sesión en orion0 con la contraseña 'orion0' y buscar la contraseña del siguiente usuario, orion1; la contraseña de orion2 se encontrará en orion1; y de esta forma sucesiva hasta orion16.

> Existe una hoja de ayuda para comandos linux y otro con enunciados para cada usuario como guía para hallar la contraseña del siguiente orion.

### Flag 1

El primer flag está en el `fichero 'flag1'`, ubicado en `~` (directorio personal del usuario actual), dentro del entorno del usuario orion0. Los pasos para encontrarlo son:

1. Se accede al directorio personal mediante el comando `cd`, indicando la ruta del directorio (`/home` o `~`): `cd ~`
2. Se listan los objetos del directorio actual con el comando `ls`, lo que permite localizar el fichero `flag1`: `ls`
3. Se extrae el contenido del fichero flag. El comando `cat` permite extraer y leer el contenido de numerosos ficheros: `cat flag1`

![1st flag](f01.png)

### Flag 2

El segundo flag está en el `fichero '-'`, ubicado en `~`, dentro del entorno del usuario orion1. la complejidad de este ejercicio radica en el nombre del fichero. Los carácteres '-' se usan para añadir opciones a los comandos.

Para elegir el fichero que se desea leer, se introduce la ruta absoluta o la dinámica (mediante el directorio `.`).

![2nd flag](f02.png)

### Flag 3

El tercer flag está en el `fichero 'nombre con espacios'`, ubicado en `~`, dentro del entorno del usuario orion2.

Para seleccionar un fichero cuyo nombre contiene espacios, se puede emplear el carácter `\`, que permite que el espacio se interprete como parte de la cadena anterior.

![3rd flag](f03.png)

### Flag 4

El cuarto flag está en el `fichero '.flag'`, ubicado en `~`, dentro del entorno del usuario orion3.

Los ficheros cuyo nombre comienza con el carácter `.` son ficheros ocultos. Para localizarlo, se puede utilizar el comando `ls` con la opción `-a`, que incluye los ficheros ocultos en el listado.

![4th flag](f04.png)

### Flag 5

El quinto flag está en el `fichero '-file04'`, ubicado en `~`, dentro del entorno del usuario orion4.

El objetivo de este ejercicio consiste en identificar en cuál de los ficheros se encuentra el flag. En el directorio `~` aparecen varios archivos con un gran volumen de caracteres, cuya lectura podría dejar la terminal "estropeada". En tal caso, se puede utilizar el comando `reset` para reiniciarla.

![5th flag](f05.png)

### Flag 6

El sexto flag está en el `fichero 'flag'`, ubicado en `/var/www/orion5`, dentro del entorno del usuario orion5.

En este ejercicio se debe encontrar la ubicación del fichero que contiene el flag. Se proporcionan tres datos del fichero: pertenece al usuario orion5, pertenece al grupo orion6 y tiene un tamaño de 89 bytes. Estos datos se pueden aplicar como criterios al comando `find` para que busque ficheros que coincidan con ellos. Las opciones para indicar dichos criterios son: `-user <usuario>`, `-group <grupo>` y `-size <cantidad_bytes>c`. (También existe la opción `-name <nombre>` para buscar el fichero según su nombre).

![6th flag](f06.png)

### Flag 7

El séptimo flag está oculto entre un gran volumen de texto en el `fichero 'datos.txt'`, ubicado en `/usr/share`, dentro del entorno del usuario orion6.

Se indica que la clave se encuentra en una línea que contiene la cadena "su clave es". Con el comando `grep <cadena>` se muestran únicamente las líneas que contienen la cadena indicada.

![7th flag](f07.png)

### Flag8

El octavo flag está oculto entre un gran volumen de texto en el `fichero '1009'`, ubicado en `/usr/share/flags`, dentro del entorno del usuario orion7.

Se indica que la clave se encuentra en un fichero cuyo nombre es el UID del usuario. El UID se puede obtener con el comando `id -u` o buscándolo entre los ficheros que contienen la palabra "uid". Dentro del fichero que contiene la clave, se indica que esta corresponde a la línea que no se repite. Con el comando `uniq` y la opción `-u` se filtran los resultados y se muestra aquella línea que no se repite.

![8th flag](f08.png)

### Flag 9

El noveno flag está en el `fichero 'data.bin'`, ubicado en `~`, dentro del entorno del usuario orion8.

La clave se encuentra en un fichero binario, que se lee mediante el comando `string`. Además, la clave se localiza en una línea que comienza con el carácter `=`. El comando `grep` dispone de la opción `-G` para indicar una cadena mediante expresiones regulares (regex), en las cuales el carácter `^` señala el inicio de una línea.

![9th flag](f09.png)

### Flag 10

El décimo flag está en el `fichero 'encripted'`, ubicado en `~`, dentro del entorno del usuario orion9.

Para desencriptar el contenido del fichero, se utiliza el comando `base64` con la opción `-d`.

![10th flag](f10.png)

### Flag 11

El undécimo flag está en el `fichero 'cesar_flag'`, ubicado en `~`, dentro del entorno del usuario orion10.

Para deshacer el cifrado César, se deben desplazar los caracteres el mismo número de posiciones en que fueron desplazados para encriptarlos. Para ello se puede emplear el comando `tr`.

![11th flag](f11.png)

### Flag 12

El duodécimo flag está en el `fichero 'datos.hexa'`, ubicado en `~`, dentro del entorno del usuario orion11.

En este ejercicio se utilizan los siguientes comandos:

- `xxd -r` para restaurar fichero hexdump
- `tar -xf` para descomprimir ficheros tar
- `gunzip` para descomprimir fichero gz
- `file` para identificar los tipos de ficheros

Para hallar la flag debemos restaurar el fichero hexdump, descomprimir el fichero tar que nos devolvió la restauración, descomprimir el fichero gz que nos devolvió el tar, y volver a descomprimir el fichero gz debido a que estaba comprimido dos veces.

![12th flag](f12.png)

### Flag 13

El decimotercer flag está en el `fichero 'key_orion13'`, ubicado en `~`, dentro del entorno del usuario orion13.

Para hallar la clave de orion13, se establece una conexión con dicho usuario mediante ssh utilizando el fichero de clave id_rsa. Para ello se emplea el comando `ssh -i <fichero_con_clave> <usuario>@ip`.

![13th flag](f13.png)

### Flag 14

El decimocuarto flag lo retorna un proceso que está escuchando en el `puerto 50001` tras enviarle la `contraseña del usuario orion13`.

Mediante el comando `nc <ip> <puerto>` se pueden enviar datos a un puerto de un ordenador; en este caso, al propio equipo (127.0.0.1 o localhost).

![14th flag](f14.png)

### Flag 15

El decimoquinto flag lo retorna un proceso que está escuchando en el `puerto 50003` tras enviarle la `contraseña del usuario orion14`, pero lo debemos solictar con seguridad SSL.

Mediante el comando `openssl s_client -connect <ip>:<puerto>` se pueden enviar datos a un puerto de un ordenador con seguridad SSL; en este caso, al propio equipo (127.0.0.1 o localhost).

![15th flag](f15.png)

### Flag 16

El decimosexto flag está en el `fichero 'README'`, ubicado en `~`, dentro del entorno del usuario orion15.

> El objetivo de este flag no consiste en hallarlo, sino en aprender que se pueden utilizar comandos directos sin necesidad de conectarse a un usuario mediante ssh.

![16th flag](f16.png)

### Flag 17

El decimoséptimo flag lo retorna un proceso que está escuchando en el `puerto 50005` tras enviarle la `contraseña del usuario orion16 y una combinación de 4 digitos`.

> El objetivo de este ejercicio consiste en aprender a crear scripts en bash.

![17th flag](f17.png)

### Flag 18

El decimoctavo flag lo retorna un `proceso que espera la contraseña de orion 17`. Pero `debe ser activado` previamente e indicarle el puerto al que debe estar escuchando.

Para activar el proceso, se debe ejecutar el fichero `conexion` seguido del puerto en el que se desea que escuche. Para ejecutar ficheros, basta con escribir su ruta absoluta o dinámica. Para ejecutarlo en segundo plano, se puede añadir `&`.

![18th flag](f18.png)

### Flag 19

El decimonoveno flag está en el `fichero 'README'`, ubicado en `~`, dentro del entorno del usuario orion18.

Al iniciar sesión con este usuario, se muestra un texto de bienvenida y se cierra la sesión automáticamente. Para tomar el control, se establece la conexión mediante ssh y se utiliza el comando `more` (si el texto no es lo suficientemente largo para que `more` se ejecute, se puede reducir la cantidad de líneas de la terminal con `stty rows <cantidad>`). Una vez dentro de `more`, se puede presionar la tecla `v` para abrir el editor de texto por defecto (normalmente vi). Desde vi se pueden ejecutar comandos o editar ficheros con las opciones `:! <comando>` y `:e <fichero>`. De esta forma, se accede a la edición del fichero README y se puede leer el flag.

![19.1 flag](f19-1.png)
![19.2 flag](f19-2.png)
![19.3 flag](f19-3.png)

### SCT

![SCT](SCT.png)
