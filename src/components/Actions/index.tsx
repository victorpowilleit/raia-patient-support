import styles from './styles.module.css'
import {Dispatch, SetStateAction, useState} from "react";
import {workerIndex} from "../../signals/workers.ts";
import {feedback} from "../../utils/haptic.ts";

interface ActionsProps {
  addToCounter: (index:number, value:number)=>void
  setShowActions: Dispatch<SetStateAction<boolean>>
}

export function Actions({addToCounter, setShowActions}:ActionsProps) {
  const [value, setValue] = useState("")
  function confirm(){
    feedback()
    if(value.trim().length>0){
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      addToCounter(workerIndex, parseInt(value))
      setValue("")
      setShowActions(false)
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.window}>
        <h1>Somar novo valor</h1>
        <input type="number" pattern="[0-9]*" value={value} onChange={(event)=>{setValue(event.target.value)}}/>
        <button onClick={confirm}>CONFIRMAR</button>
        <button onClick={()=>{feedback(); setValue("");setShowActions(false)}}>CANCELAR</button>
      </div>
    </div>
  )
}