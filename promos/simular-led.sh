#!/bin/zsh
# Simula cómo se ve una imagen de 1152×384 en la pantalla LED.
# Uso: promos/simular-led.sh <imagen.png> <salida.png>
# Arriba: de cerca, cada píxel es un LED (recorte de la zona del texto).
# Abajo: de lejos, como la ve alguien desde la otra esquina o desde un auto.
set -e
IN=$1
OUT=$2
ffmpeg -v error -y -i "$IN" -frames:v 1 -filter_complex "
  [0]split[a][b];
  [a]crop=192:96:300:150,scale=1152:576:flags=neighbor,format=rgb24[big];
  color=c=black:s=1152x576,format=gray,geq=lum='if(lt(hypot(mod(X\,6)-2.5\,mod(Y\,6)-2.5)\,2.3)\,255\,25)',format=rgb24[mask];
  [big][mask]blend=all_mode=multiply[led];
  [b]scale=230:77:flags=area,gblur=sigma=0.6,scale=1152:384:flags=bicubic[far];
  [led]pad=1152:582:0:0:color=gray[led2];
  [led2][far]vstack=shortest=1
" "$OUT"
echo "Listo: $OUT"
