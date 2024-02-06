import styles from './styles.module.css'
import logo from '../../assets/logos/VPDevLogo.svg'

export function Splash(){
  return(
    <div className={styles.splash}>
      <img src={logo} alt=""/>
    </div>
  )
}