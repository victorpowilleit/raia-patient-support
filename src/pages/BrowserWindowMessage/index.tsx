import styles from './styles.module.css'
import iOS from '../../assets/icons/Icon_iOS.svg'
import android from '../../assets/icons/Icon_Android.svg'
import share from '../../assets/icons/Icon_Share.svg'
import vpdev from '../../assets/logos/VPDevLogo.svg'
import {useState} from "react";

export function BrowserWindowMessage() {
  const [OS, setOS] = useState("")
  return (
    <div className={styles.container}>
      <img className={styles.vplogo} src={vpdev} alt="VPDev Logo"/>
      <h1>APP: RAIA-CUSTOMER-SUPPORT</h1>
      <span className={styles.text_center}>
      PARA INSTALAR ESSE APP ESCOLHA SEU<br/>SISTEMA OPERACIONAL E SIGA OS PASSOS ABAIXO:
      </span>
      <div className={styles.OS}>
      <img onClick={()=>setOS("iOS")} className={`${styles.icon} ${OS==="iOS"&&styles.active}`} src={iOS} alt="iOS Logo"/>
      <img onClick={()=>setOS("Android")} className={`${styles.icon} ${OS==="Android"&&styles.active}`} src={android} alt="Android Logo"/>
      </div>
      {OS==="iOS"&&(<>
        <span>
        1. Abra navegador Safari do seu IPhone.
        </span>
        <span>
        2. Toque no botão "Compartilhar"
          <img className={styles.shareIcon} src={share} alt="share_btn"/>
        </span>
        <span>
        3. Escolha "Adicionar à Tela de Início"
        </span>
      </>)}
      {OS==="Android"&&(<>
        <span>
        1. Abra navegador Chrome do seu Android.
        </span>
        <span>
        2. Toque no botão de Opções: <span className={styles.options}>︙</span>
        </span>
        <span>
        3. Escolha "Adicionar à tela inicial"
        </span>
      </>)}
    </div>
  )
}