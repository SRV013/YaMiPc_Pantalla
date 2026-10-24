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

// Verano: la sección se muestra hasta `fin` (AAAA-MM-DD) y después desaparece sola.
export const VERANO = {
  año: '2027',
  fin: '2027-03-31',
}

export const PORTADA = [
  { src: '/img/portada/esquina.jpg', alt: 'Una persona cruza la esquina de La Rioja y Belgrano, frente a la pantalla', position: 'center 64%', grow: 1 },
  { src: '/img/portada/frente.jpg', alt: 'La pantalla LED encendida sobre la vereda del local', position: 'center 40%', grow: 1.6 },
  { src: '/img/portada/edificio.jpg', alt: 'El edificio con la pantalla visto desde la vereda de enfrente', position: 'center 55%', grow: 1 },
]

export const ADS = [
  { src: '/img/anuncios/pensamos-como-vos.jpg', alt: 'Anuncio de YaMiPc: Pensamos como vos' },
  { src: '/img/anuncios/pc-ryzen.jpg', alt: 'Anuncio de PC de escritorio AMD Ryzen 3 en 12 cuotas' },
  { src: '/img/anuncios/compra-online.jpg', alt: 'Anuncio: Comprá desde tu casa en www.yamipc.com' },
  { src: '/img/anuncios/press-start.jpg', alt: 'Anuncio gamer: Press Start' },
  { src: '/img/anuncios/saludo-recibida.jpg', alt: 'Saludo en pantalla: ¡Felicitaciones por tu recibida, Valentina!' },
]
