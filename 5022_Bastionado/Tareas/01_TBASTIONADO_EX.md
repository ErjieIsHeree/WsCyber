# Tarea 01 Bastionado

_Hecho por Erjie Xia_

## Actividad 01

Se ha utilizado Amazon como empresa de referencia para contextualizar el inventario

|     | Activo                               | Tipo            | Criticidad | Justificación                                                                                                                                                                                                                                                                                                      |
| --- | ------------------------------------ | --------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Datos de la empresa                  | Información     | Alta       | Contiene información financiera, estratégica y de propiedad intelectual. Su filtración o pérdida causaría daño económico, legal y competitivo grave.                                                                                                                                                               |
| 2   | Datos de clientes                    | Información     | Alta       | Contiene datos personales y de pago de los clientes. Su filtración implicaría sanciones por el RGPD, pérdida de confianza y daño reputacional difícil de revertir.                                                                                                                                                 |
| 3   | Página web                           | Sistema         | Alta       | Es el principal canal de ventas y de contacto con los clientes. Su caída o ataque paralizaría los ingresos, expondría datos personales y de pago, y dañaría la reputación de la empresa, sin una alternativa equivalente a corto plazo.                                                                            |
| 4   | Sistema ERP                          | Sistema         | Alta       | Donde se centraliza stock, facturación, compras, logística, contabilidad y datos de empleados. Su caída o filtración bloquearía pedidos, envíos y cobros, y expondría datos personales y financieros.                                                                                                              |
| 5   | Servidores (Software)                | Sistema         | Alta       | Los servidores alojan la web, el ERP y las bases de datos. Si fallan o son atacados, dejan de funcionar todos los sistemas que dependen de ellos, con paralización de ventas y operaciones y riesgo de pérdida o filtración de datos, sin alternativa inmediata salvo que existan copias y servidores de respaldo. |
| 6   | Infrastructuras de TI                | Infraestructura | Media      | Supone una importante herramienta para la operativa. Pero con una correcta gestión y descentralización, se pueden disminuir los daños.                                                                                                                                                                             |
| 7   | Sede central y almacén               | Infraestructura | Media      | Concentra la dirección y el stock principal, pero con copias de seguridad en la nube y un plan de continuidad se pueden trasladar las operaciones a otra ubicación.                                                                                                                                                |
| 8   | Sedes secundarias y almacenes        | Infraestructura | Media      | Su pérdida afecta a la operativa, pero otras sedes pueden asumir parte de la carga.                                                                                                                                                                                                                                |
| 9   | Servicio de hosting en nube          | Servicio        | Alta       | Es un servicio que ocupa gran parte de las ganancias de la empresa. Además, contienen datos confidenciales.                                                                                                                                                                                                        |
| 10  | Servicio de streaming                | Servicio        | Baja       | Afecta a la retención de suscriptores, pero no paraliza las ventas ni las operaciones principales.                                                                                                                                                                                                                 |
| 11  | Plataforma multivendedor             | Servicio        | Media      | Gran parte del catálogo proviene de comercios ajenos. Sin ellos muchos clientes no podrían encontrar productos específicos.                                                                                                                                                                                        |
| 12  | Imagen corporativa                   | Reputación      | Media      | Un incidente reduce la confianza y las ventas, pero con una buena gestión de crisis la reputación se puede recuperar con el tiempo.                                                                                                                                                                                |
| 13  | Valoraciones y opiniones de clientes | Reputación      | Baja       | Influyen en las decisiones de compra, pero el gran catálogo el cliente podrá optar por alternativas.                                                                                                                                                                                                               |
| 14  | Atención al cliente                  | Personas        | Media      | Es clave para la satisfacción y las devoluciones, pero existen alternativas temporales (chatbots, externalización).                                                                                                                                                                                                |
| 15  | Personal operativo                   | Personas        | Baja       | Es una tarea que mucha gente puede asumir. Su ausencia retrasa los procesos, pero estos retrasos ya están previstos y se pueden cubrir con personal temporal                                                                                                                                                       |
| 16  | Personal directivo                   | Personas        | Media      | Su pérdida afecta a las decisiones estratégicas, pero la empresa puede seguir operando con sustitutos y planes de sucesión                                                                                                                                                                                         |

## Actividad 2

|     | Activo                                | Amenaza                                                        | Tipo de amenaza | Vulnerabilidad asociada |
| --- | ------------------------------------- | -------------------------------------------------------------- | --------------- | ----------------------- |
| 1   | Datos de la empresa                   | Borrado accidental de datos                                    | Accidental      | Humana                  |
| 2   | Datos de clientes                     | Brecha de datos por inyección SQL                              | Intencional     | Técnica                 |
| 3   | Página web                            | Ataque DDoS                                                    | Intencional     | De diseño               |
| 4   | Sistema ERP                           | Phising que desemboca en ransomware                            | Intencional     | Humana, De diseño       |
| 5   | Servidores (Software)                 | Malware introducido por insider                                | Intencional     | De proceso              |
| 6   | Infrastructuras de TI                 | Corte eléctrico                                                | Técnica         | De diseño               |
| 7   | Sede central y almacén                | Seísmo                                                         | Natural         | De diseño               |
| 8   | Sedes secundarias y almacenes         | Inundación                                                     | Natural         | De diseño               |
| 9   | Servicio de hosting en nube           | Error de configuración que deja datos expuestos                | Accidental      | Humana                  |
| 10  | Servicio de streaming                 | Caída por saturación en un evento de alta demanda              | Técnica         | De diseño               |
| 11  | Plataforma multivendedor              | Toma de control de cuentas de vendedores por software obsoleto | Intencional     | Técnica                 |
| 12  | Imagen corporativa                    | Publicación inapropiada en redes sociales                      | Accidental      | Humana                  |
| 13  | Valoraciones y opiniones en productos | Reseñas falsas                                                 | Intencional     | De proceso              |
| 14  | Atención al cliente                   | Ataque por ingeniería social                                   | Intencional     | Humana                  |
| 15  | Personal operativo                    | Pandemia en la empresa que reduce la plantilla                 | Natural         | De proceso              |
| 16  | Personal directivo                    | Suplantación de identidad                                      | Intencional     | Humana                  |

## Actividad 3

> Para este ejercicio se han asumido los siguientes casos: no existen soluciones a los riesgos, la localización de lo físico se encuentra en Madrid y es una empresa con alta demanda.

| Riesgo                                                                    | Probabilidad | Impacto | Riesgo |
| ------------------------------------------------------------------------- | ------------ | ------- | ------ |
| Borrado accidental de datos (de la empresa)                               | 3            | 3       | 9      |
| Brecha de datos por inyección SQL (datos importantes de clientes)         | 2            | 3       | 6      |
| Ataque DDoS (denagando el acceso a web a clientes prolongadamente)        | 3            | 3       | 9      |
| Seísmo (en sede central y almacén)                                        | 1            | 3       | 3      |
| Toma de control de cuentas de vendedores por software obsoleto            | 1            | 3       | 3      |
| Caída por saturación en un evento de alta demanda (servicio de streaming) | 1            | 1       | 1      |
| Reseñas falsas (en los productos)                                         | 3            | 1       | 3      |
| Pandemia en la empresa que reduce la plantilla                            | 1            | 2       | 2      |
| Suplantación de identidad (de personal directivo)                         | 2            | 3       | 6      |

Los riesgos críticos son:

1. Borrado accidental de datos (de la empresa):
2. Ataque DDoS (denagando el acceso a web a clientes prolongadamente):
3. Brecha de datos por inyección SQL (datos importantes de clientes):
4. Suplantación de identidad (de personal directivo):
