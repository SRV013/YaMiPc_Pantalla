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

// Temporada que se ofrece a los anunciantes (Pascua 2027: 28 de marzo).
export const TEMPORADA = 'Propuesta temporada · 15/11/2026 a Pascua 2027'

// Textos del pedido de marketing. Las cifras de alcance las informó el dueño de la pantalla.
// Las fotos son las versiones livianas de public/img/esquina (ver scripts/optimizar-esquina.sh).
const FOTO = (nombre: string) => `/img/esquina/vista/${nombre}.jpg`

export const FOTOS = {
  portada: FOTO('dia-1-hacia'),
  dia: FOTO('dia-4-hacia'),
  noche: FOTO('noche-4-hacia'),
}

export const ATRACCION = [
  {
    titulo: 'Frente al Shopping Los Gallegos',
    texto: 'Capturá la atención de miles de personas con mentalidad de compra activa.',
    foto: FOTO('dia-4-desde'),
  },
  {
    titulo: "A metros de McDonald's",
    texto: 'Tránsito garantizado de público joven y familias durante todo el día.',
    foto: FOTO('dia-2-hacia'),
  },
  {
    titulo: 'Zona de semáforos',
    texto: 'Exposición prolongada frente a las luces de mayor detención de la zona.',
    foto: FOTO('dia-4-hacia'),
  },
]

export const VENTAJAS = [
  { titulo: 'Intersección de 6 esquinas', texto: 'Visibilidad multiangular desde múltiples calles de acceso.', foto: FOTO('dia-3-desde') },
  { titulo: 'Semáforos de mayor tránsito', texto: 'Tiempo de visualización (dwell time) ultra elevado.', foto: FOTO('noche-2-hacia') },
  { titulo: 'Audiencia cualificada', texto: 'Entorno puramente comercial, ideal para posicionamiento.', foto: FOTO('noche-1-desde') },
]

export const METRICAS = [
  { prefijo: '+', numero: 500000, sufijo: '', unidad: 'peatones', detalle: 'por semana' },
  { prefijo: '+', numero: 10000, sufijo: '', unidad: 'vehículos', detalle: 'por día' },
  { prefijo: '', numero: 14, sufijo: ' h', unidad: 'de transmisión continua', detalle: 'de 09:00 a 23:00 hs' },
]

// Pendiente: el pedido decía "hasta un 400% más de atención"; sin una fuente que lo respalde se
// publica sin la cifra. Si se consigue la fuente, se puede volver a poner.
export const POR_QUE = [
  { icono: 'chispa', titulo: 'Impacto emocional', texto: 'El brillo y el dinamismo atraen mucha más atención que la cartelería estática tradicional.' },
  { icono: 'refrescar', titulo: 'Flexibilidad total e inmediata', texto: 'Actualizá tus diseños o videos al instante, sin costos de impresión ni demoras logísticas.' },
  { icono: 'clock', titulo: 'Segmentación horaria inteligente', texto: 'Maximizá tu inversión mostrando anuncios específicos en las horas pico de tu público objetivo.' },
] as const

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
    noche: { hacia: '/img/esquina/noche-2-hacia.jpg', desde: '/img/esquina/noche-2-desde.jpg' },
  },
  {
    lugar: 'Diagonal Pueyrredón',
    dia: { hacia: '/img/esquina/dia-3-hacia.webp', desde: '/img/esquina/dia-3-desde.webp' },
    noche: { hacia: '/img/esquina/noche-3-hacia.jpg', desde: '/img/esquina/noche-3-desde.jpg' },
  },
  {
    lugar: 'Desde el interior del shopping Los Gallegos',
    dia: { hacia: '/img/esquina/dia-4-hacia.webp', desde: '/img/esquina/dia-4-desde.webp' },
    noche: { hacia: '/img/esquina/noche-4-hacia.jpg', desde: '/img/esquina/noche-4-desde.jpg' },
  },
  {
    lugar: 'Calle Belgrano',
    dia: { hacia: '/img/esquina/dia-5-hacia.webp', desde: '/img/esquina/dia-5-desde.webp' },
    noche: { hacia: '/img/esquina/noche-5-hacia.jpg', desde: '/img/esquina/noche-5-desde.jpg' },
  },
]

// Vista 360: una foto de la vuelta completa por momento del día (el borde derecho empalma con el
// izquierdo). `inicio` es hacia dónde mira al abrir, de 0 a 1 a lo ancho de la foto: la pantalla.
export const PANORAMA: Record<Momento, { src: string; inicio: number }> = {
  dia: { src: '/img/esquina/360-dia.jpg', inicio: 0.49 },
  noche: { src: '/img/esquina/360-noche.jpg', inicio: 0.49 },
}

// Street View de Google: la cámara se ubica en la foto más cercana a `camara` y gira hacia `pantalla`.
export const STREET_VIEW = {
  camara: { lat: -37.99905, lng: -57.55245 },
  pantalla: { lat: -37.999178, lng: -57.552167 },
}

export const ADS = [
  { src: '/img/anuncios/pensamos-como-vos.jpg', alt: 'Anuncio de YaMiPc: Pensamos como vos' },
  { src: '/img/anuncios/pc-ryzen.jpg', alt: 'Anuncio de PC de escritorio AMD Ryzen 3 en 12 cuotas' },
  { src: '/img/anuncios/compra-online.jpg', alt: 'Anuncio: Comprá desde tu casa en www.yamipc.com' },
  { src: '/img/anuncios/press-start.jpg', alt: 'Anuncio gamer: Press Start' },
  { src: '/img/anuncios/saludo-recibida.jpg', alt: 'Saludo en pantalla: ¡Felicitaciones por tu recibida, Valentina!' },
]
