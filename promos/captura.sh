#!/bin/zsh
# Exporta una promo a PNG de 1152×384.
# Uso: promos/captura.sh <carpeta-de-la-promo> <salida.png> ["parametros-url"]
# Ej.:  promos/captura.sh plantilla promos/plantilla/plantilla.png "t=0.6"
set -e
ROOT=${0:A:h:h}
PROMO=$1
OUT=${2:A}
QUERY=${3:-t=0}
PORT=8765
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# Servidor local: las máscaras CSS del logo no funcionan abriendo el archivo directo.
python3 -m http.server $PORT --bind 127.0.0.1 --directory "$ROOT" >/dev/null 2>&1 &
SERVER=$!
trap "kill $SERVER 2>/dev/null" EXIT
sleep 0.6

"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1152,384 --virtual-time-budget=4000 \
  --screenshot="$OUT" "http://127.0.0.1:$PORT/promos/$PROMO/?$QUERY" 2>/dev/null
echo "Listo: $OUT"
