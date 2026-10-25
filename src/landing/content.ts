// Datos del home institucional. Lo que cambie con el tiempo se edita acá.

export const COMPANY = {
  name: 'YaMiPc Computación',
  address: 'La Rioja 1902, esquina Belgrano',
  city: 'Mar del Plata, Buenos Aires',
  hours: 'Lunes a sábado de 10 a 18',
  phone: '223 616-9545',
  whatsapp: 'https://wa.me/5492236169545',
  web: 'https://www.yamipc.com',
  webLabel: 'www.yamipc.com',
  social: '@yamipccomputacion',
  instagram: 'https://www.instagram.com/yamipccomputacion',
  facebook: 'https://www.facebook.com/yamipccomputacion',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=La+Rioja+1902,+Mar+del+Plata',
  // URL final del mapa embebido: la corta redirige acá y esa redirección no se puede embeber.
  mapsEmbed: 'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sLa+Rioja+1902,+Mar+del+Plata!6i17',
}

export const SCREEN = {
  size: '8 metros x 4 metros',
  hours: '9 a 23 h',
  spot: '15 segundos',
}

// Año de la temporada que se ofrece en la portada.
export const PREVENTA = {
  año: '2027',
}

// Fotos de la esquina, de día y de noche. Cada punto tiene la foto que mira hacia la pantalla
// (`hacia`) y la de lo que la pantalla tiene enfrente (`desde`). Mientras una ruta esté vacía
// se muestra un bloque de color con su nombre, para reconocerla hasta tener las fotos reales.
// Nombres: '/img/esquina/<dia|noche>-<punto>-<hacia|desde>.webp'.
export type Momento = 'dia' | 'noche'

export const ESQUINA = [
  {
    lugar: 'Cruce de La Rioja',
    dia: { hacia: '/img/esquina/dia-1-hacia.webp', desde: '/img/esquina/dia-1-desde.webp' },
    noche: { hacia: '/img/esquina/noche-1-hacia.jpg', desde: '/img/esquina/noche-1-desde.jpg' },
  },
  {
    lugar: 'Diagonal Pueyrredón',
    dia: { hacia: '/img/esquina/dia-2-hacia.webp', desde: '/img/esquina/dia-2-desde.webp' },
    noche: { hacia: '', desde: '' },
  },
  {
    lugar: 'Diagonal Pueyrredón',
    dia: { hacia: '/img/esquina/dia-3-hacia.webp', desde: '/img/esquina/dia-3-desde.webp' },
    noche: { hacia: '', desde: '' },
  },
  {
    lugar: 'Desde el interior del shopping Los Gallegos',
    dia: { hacia: '/img/esquina/dia-4-hacia.webp', desde: '/img/esquina/dia-4-desde.webp' },
    noche: { hacia: '', desde: '' },
  },
  {
    lugar: 'Calle Belgrano',
    dia: { hacia: '/img/esquina/dia-5-hacia.webp', desde: '/img/esquina/dia-5-desde.webp' },
    noche: { hacia: '', desde: '' },
  },
]

// Vista 360: fotos panorámicas muy apaisadas, desde dos lugares opuestos de la esquina.
export const PANORAMAS = [
  { nombre: 'Mirando a la pantalla', dia: '/img/esquina/360-dia-1.webp', noche: '' },
  { nombre: 'Vista de enfrente', dia: '/img/esquina/360-dia-2.webp', noche: '' },
]

export const ADS = [
  { src: '/img/anuncios/pensamos-como-vos.jpg', alt: 'Anuncio de YaMiPc: Pensamos como vos' },
  { src: '/img/anuncios/pc-ryzen.jpg', alt: 'Anuncio de PC de escritorio AMD Ryzen 3 en 12 cuotas' },
  { src: '/img/anuncios/compra-online.jpg', alt: 'Anuncio: Comprá desde tu casa en www.yamipc.com' },
  { src: '/img/anuncios/press-start.jpg', alt: 'Anuncio gamer: Press Start' },
  { src: '/img/anuncios/saludo-recibida.jpg', alt: 'Saludo en pantalla: ¡Felicitaciones por tu recibida, Valentina!' },
]
