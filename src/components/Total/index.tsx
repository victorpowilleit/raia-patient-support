import styles from './style.module.css'
import {Signal} from "@preact/signals-react";

interface TotalProps {
  children: Signal<number>
}

export function Total({children}:TotalProps){
  return(
    <>
      <div className={styles.total}>
        Total: {children}
      </div>
    </>
  )
}