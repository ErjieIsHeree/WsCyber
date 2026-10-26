#!/bin/sh
# Reglas del firewall del Hotel Los Almendros

# Limpiar para poder recargar sin duplicar reglas
iptables -F FORWARD

# Política por defecto: todo denegado
iptables -P FORWARD DROP

# Permitir respuestas de conexiones ya autorizadas
iptables -A FORWARD -m state --state ESTABLISHED,RELATED -j ACCEPT

# web (DMZ) -> srv-reservas (Servidores)
iptables -A FORWARD -s 10.50.10.10 -d 10.50.30.10 -p tcp --dport 80 -j ACCEPT
# pc-recepcion (recepción) -> srv-reservas (Servidores)
iptables -A FORWARD -s 10.50.20.10 -d 10.50.30.10 -p tcp --dport 80 -j ACCEPT
# pc-recepcion (recepción) -> web (DMZ)
iptables -A FORWARD -s 10.50.20.10 -d 10.50.10.10 -p tcp --dport 80 -j ACCEPT
# pc-recepcion (recepción) -> camara (IoT)
iptables -A FORWARD -s 10.50.20.10 -d 10.50.40.10 -p tcp --dport 80 -j ACCEPT
# huesped (Invitados) -> web (DMZ)
iptables -A FORWARD -s 10.50.50.0/24 -d 10.50.10.10 -p tcp --dport 80 -j ACCEPT
