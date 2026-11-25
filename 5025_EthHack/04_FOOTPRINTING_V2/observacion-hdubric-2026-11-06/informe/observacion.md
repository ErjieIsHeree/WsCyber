# Observacion de la presencia publica de hdubric.com

Fecha: 2026-11-06. Entorno: Kali Linux en VirtualBox.
Metodo: Firefox, consultas DNS puntuales, WHOIS filtrado, curl y OpenSSL. Reloj de Kali sin sincronizacion confirmada.

## Resultados

1. DNS: hdubric.com A 148.72.152.131; <www.hdubric.com> CNAME hdubric.com. No se obtuvo AAAA.
2. DNS y correo: NS ns5.globalhostla.com y ns6.globalhostla.com; MX 0 hdubric.com. SPF observado: v=spf1 +a +mx +ip4:148.72.152.131 ~all. CAA sin respuesta del tipo solicitado; DMARC NXDOMAIN.
3. Registro: WHOIS mostro Onlinenic Inc y los mismos servidores de nombres. Se guardaron campos tecnicos seleccionados.
4. Web: las tres variantes alternativas devolvieron 301 hacia <https://www.hdubric.com/>, que devolvio 200 en HEAD. Firefox abrio la portada y Bibliotecas. El sitio presenta al autor H. Dubric y sus libros.
5. Tecnologias: Server anuncia Apache; el HTML contiene wp-content, Elementor, Elementor Pro y Hello Elementor. Son indicios publicos de componentes.
6. HTTPS: TLS 1.3 con validacion correcta en OpenSSL. Let's Encrypt YR2; nombres hdubric.com y *.hdubric.com; vigencia 2026-10-29 a 2027-01-27 UTC.

## Incertidumbres

- Versiones instaladas y estado de parches.
- Entrega efectiva de correo a un buzon del dominio.
- Renovacion automatica y configuracion TLS completa.

## Comprobaciones propuestas para otra fase autorizada

- Contrastar los indicios de WordPress con el inventario interno.
- Verificar recepcion de un mensaje en un buzon de prueba y correlacionarlo con el registro de entrega.

Evidencias: evidencias/dns-*.txt, http-*.txt, registro.txt, portada.html, tecnologias.txt, tls.txt y certificado.txt. Bitacora: notas/bitacora.txt.
