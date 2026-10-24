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

// Cada punto de la esquina tiene dos fotos: mirando hacia la pantalla y lo que la pantalla tiene enfrente.
// Las vistas "desde" son capturas de Google Street View.
export const PORTADA = [
  {
    lugar: 'Cruce de La Rioja',
    // Encuadre de la foto principal: dónde queda la pantalla en altura.
    posicion: 'center 26%',
    hacia: '/img/portada/a-hacia.jpg',
    desde: '/img/portada/a-desde.jpg',
    altHacia: 'La pantalla vista desde el cruce de La Rioja, con gente caminando',
    altDesde: 'Frente a la pantalla: el shopping Los Gallegos y el cruce de La Rioja',
  },
  {
    lugar: 'Esquina de Belgrano',
    posicion: 'center 34%',
    hacia: '/img/portada/b-hacia.jpg',
    desde: '/img/portada/b-desde.jpg',
    altHacia: 'Una familia cruza la senda frente a la pantalla',
    altDesde: 'Frente a la pantalla: autos sobre Belgrano y el shopping',
  },
  {
    lugar: 'Senda peatonal',
    posicion: 'center 24%',
    hacia: '/img/portada/c-hacia.jpg',
    desde: '/img/portada/c-desde.jpg',
    altHacia: 'Gente cruzando la senda con la pantalla de fondo',
    altDesde: 'Frente a la pantalla: la entrada del shopping y la esquina de La Rioja',
  },
  {
    lugar: 'Vereda del local',
    posicion: 'center 8%',
    hacia: '/img/portada/d-hacia.jpg',
    desde: '/img/portada/d-desde.jpg',
    altHacia: 'La pantalla y la vidriera del local desde la vereda',
    altDesde: 'Frente a la pantalla: Belgrano con autos esperando el semáforo y el shopping al fondo',
  },
]

export const ADS = [
  { src: '/img/anuncios/pensamos-como-vos.jpg', alt: 'Anuncio de YaMiPc: Pensamos como vos' },
  { src: '/img/anuncios/pc-ryzen.jpg', alt: 'Anuncio de PC de escritorio AMD Ryzen 3 en 12 cuotas' },
  { src: '/img/anuncios/compra-online.jpg', alt: 'Anuncio: Comprá desde tu casa en www.yamipc.com' },
  { src: '/img/anuncios/press-start.jpg', alt: 'Anuncio gamer: Press Start' },
  { src: '/img/anuncios/saludo-recibida.jpg', alt: 'Saludo en pantalla: ¡Felicitaciones por tu recibida, Valentina!' },
]
