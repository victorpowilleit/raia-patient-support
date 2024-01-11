import styles from './styles.module.css'
import {Dispatch, SetStateAction, useState} from "react";
import {workerIndex} from "../../signals/workers.ts";

interface DangerousActionsProps {
  changeCounter: (index:number, value:number)=>void
  setShowDangerous: Dispatch<SetStateAction<boolean>>
  removeWorker: (index:any)=>void
}

export function DangerousActions({changeCounter, setShowDangerous, removeWorker}:DangerousActionsProps) {
  const [value, setValue] = useState("")
  function confirm(){
    if(value.trim().length>0){
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      changeCounter(workerIndex, parseInt(value))
      setValue("")
      setShowDangerous(false)
    }
  }
  function remove(){
    setValue("")
    removeWorker(workerIndex)
    setShowDangerous(false)
  }
  return (
    <div className={styles.container}>
      <div className={styles.window}>
        <h1>Redefinir valor</h1>
        <input type="number" pattern="[0-9]*" value={value} onChange={(event)=>{setValue(event.target.value)}}/>
        <button onClick={confirm}>CONFIRMAR</button>
        <h1 className={styles.danger_text}>Remover colaborador</h1>
        <button className={styles.danger} onClick={remove}>EXCLUIR</button>
        <button onClick={()=>{setValue("");setShowDangerous(false)}}>CANCELAR</button>
      </div>
    </div>
  )
}