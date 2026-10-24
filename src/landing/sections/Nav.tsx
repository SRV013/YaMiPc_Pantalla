import Icon from '../Icon.tsx'
import base from '../Landing.module.css'
import { COMPANY } from '../content.ts'
import styles from './Nav.module.css'

const LINKS = [
  { href: '#verano', label: 'PreVenta 2027' },
  { href: '#pantalla', label: 'La pantalla' },
  { href: '#ubicacion', label: 'Ubicación' },
]

/** Barra superior compartida por el home y el panel administrativo (`admin`). */
function Nav({ admin = false }: { admin?: boolean }) {
  return (
    <header className={styles.nav}>
      <div className={`${base.container} ${styles.inner}`}>
        <div className={styles.brand}>
          <a href={admin ? '/panel' : '#inicio'} aria-label={admin ? 'Panel' : 'Inicio'}>
            <img src="/yamipc-dark.svg" alt={COMPANY.name} width={96} />
          </a>
          {admin && <span className={styles.badge}>Admin</span>}
        </div>

        {!admin && (
          <nav aria-label="Secciones" className={styles.links}>
            {LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* El panel administrativo por ahora no tiene restricción: "Ingresar" solo lo abre. */}
        {admin ? (
          <a className={styles.cta} href="/">
            <Icon name="logout" />
            Salir
          </a>
        ) : (
          <a className={styles.cta} href="/panel">
            <Icon name="login" />
            Ingresar
          </a>
        )}
      </div>
    </header>
  )
}

export default Nav
