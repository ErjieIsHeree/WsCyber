#!/bin/sh
# Reglas del firewall del Hotel Los Almendros

# Limpiar para poder recargar sin duplicar reglas
iptables -F FORWARD

# Política por defecto: todo denegado
iptables -P FORWARD DROP

# Permitir respuestas de conexiones ya autorizadas
iptables -A FORWARD -m state --state ESTABLISHED,RELATED -j ACCEPT

# --- Matriz de flujos permitidos (una regla por fila) ---
# DMZ (web) -> Servidores (srv-reservas): consulta de reservas
iptables -A FORWARD -s 10.50.10.10 -d 10.50.30.10 -p tcp --dport 80 -j ACCEPT
# Personal (recepción) -> Servidores: gestión de clientes y facturas
iptables -A FORWARD -s 10.50.20.10 -d 10.50.30.10 -p tcp --dport 80 -j ACCEPT
# Personal (recepción) -> DMZ: comprobar la web de reservas
iptables -A FORWARD -s 10.50.20.10 -d 10.50.10.10 -p tcp --dport 80 -j ACCEPT
# Personal (recepción) -> IoT: ver las cámaras
iptables -A FORWARD -s 10.50.20.10 -d 10.50.40.10 -p tcp --dport 80 -j ACCEPT

# Todo lo demás (Invitados -> cualquier zona interna, IoT -> Servidores...) cae en DROP

docker exec fw iptables -L FORWARD -n -v --line-numbers