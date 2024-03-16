import styles from './styles.module.css'
import {SwipeableHandlers} from "react-swipeable";

interface LogProps{
  isLogOpened: boolean
  swipeClose: SwipeableHandlers
  log:{time:number, record:string}[]
}

export function Log({isLogOpened, swipeClose, log}:LogProps){

  return (
    <div {...swipeClose} className={isLogOpened?styles.opened:styles.closed}>
      <h1 className={styles.title}>LOG DE EVENTOS</h1>
      <div className={styles.logList}>
        {log.length===0&&<div className={styles.warn}>Não há eventos registrados.</div>}
        <ul>
          {log.map(data=> {
            const date = new Date(data.time)
            return(
            <li>
              <p>{data.record}</p>
              <span>{`${("0"+date.getDate()).slice(-2)}/${("0"+(date.getMonth()+1)).slice(-2)}/${date.getFullYear()} - ${("0"+date.getHours()).slice(-2)}:${("0"+date.getMinutes()).slice(-2)}`}</span>
            </li>)
          })}
        </ul>
      </div>
    </div>
  )
}