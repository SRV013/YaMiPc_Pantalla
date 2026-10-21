# Promos para la pantalla LED (1152×384)

Cada promo es una página HTML en su carpeta (`promos/<nombre>/index.html`) que se anima a partir del tiempo, así la misma página sirve para verla, sacar imágenes y generar el video.

## Pasos

1. **Foto del producto sin fondo**
   `swift promos/herramientas/recortar.swift foto.jpg promos/<nombre>/producto.png`
2. **Guion (imágenes fijas)** — congela la promo en un segundo con `t`:
   `promos/captura.sh <nombre> salida.png "t=4.2"`
3. **Ver cómo se lee en la pantalla** (de cerca y de lejos):
   `promos/simular-led.sh imagen.png salida.png`
4. **Video MP4** (25 cuadros por segundo, H.264, colores BT.709):
   `node promos/video.mjs <nombre>`

## Estilos

- **Oscuro** (`institucional`, `servicio-tecnico`): fondo de líneas animado, logo con halo y brillo, Bebas Neue, texto letra por letra con salidas de latigazo.
- **Claro, estilo Samsung** (`ps5`, `impresora-hp`): fondo gris claro, logo arriba a la izquierda, producto quieto, modelo abajo a la derecha, texto negro, cortes secos cada ~2 s y cierre con el logo sobre negro. Para una oferta nueva, copiar `impresora-hp` y cambiar textos, foto y modelo.

## Partes comunes

- `comun/promo.js`: motor de animación (entradas, salidas, logo, brillo).
- `comun/fondos.js`: fondos animados (`lineas`, `formas`, `aurora`, `liso`).
- `comun/promo.css`: estilos compartidos y colores de la marca (#EC268F y #FFF212).
