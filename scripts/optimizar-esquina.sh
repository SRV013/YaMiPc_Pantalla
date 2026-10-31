#!/bin/sh
# Genera las versiones livianas de las fotos de la esquina, sin tocar los originales.
#   public/img/esquina/vista/<nombre>.jpg  la que se muestra en la página
#   public/img/esquina/mini/<nombre>.jpg   una miniatura que se ve desenfocada mientras carga la otra
# Uso: sh scripts/optimizar-esquina.sh   (requiere ffmpeg)
set -e
cd "$(dirname "$0")/../public/img/esquina"
mkdir -p vista mini

for foto in *.webp *.jpg *.jpeg *.png; do
  [ -f "$foto" ] || continue
  nombre="${foto%.*}"
  case "$nombre" in
    *-desde) tamano="scale='min(1000,iw)':-2" ;; # Se muestra chica, en el recuadro.
    *) tamano="scale='min(1600,iw)':-2" ;;
  esac
  ffmpeg -loglevel error -y -i "$foto" -vf "$tamano" -q:v 8 "vista/$nombre.jpg"
  ffmpeg -loglevel error -y -i "$foto" -vf "scale=48:-2" -q:v 6 "mini/$nombre.jpg"
done

echo "Listo: $(ls vista | wc -l | tr -d ' ') fotos optimizadas."
