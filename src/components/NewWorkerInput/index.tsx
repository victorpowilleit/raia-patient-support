import styles from './styles.module.css'
import {Dispatch, SetStateAction, useState} from "react";
import {feedback} from "../../utils/haptic.ts";

interface handleInsertWorkerProps {
  worker: string
  setData: Dispatch<SetStateAction<{name:string, count:number}[]>>
  setWorker: Dispatch<SetStateAction<string>>
}

interface NewWorkerInputProps {
  setData: Dispatch<SetStateAction<{name: string, count: number}[]>>
}

function handleInsertWorker({worker, setData, setWorker}:handleInsertWorkerProps){
  if(worker.trim().length>0) {
    feedback()
    setData(prevState => [...prevState, {name: worker, count: 0}])
    setWorker("")
  }
}

export function NewWorkerInput({setData}:NewWorkerInputProps){
  const [worker, setWorker] = useState("")
  return(
    <div className={styles.newWorker}>
      <input type="text" onChange={(event)=>setWorker(event.target.value)} value={worker}/>
      <button
        onClick={()=>{
          handleInsertWorker({worker, setData, setWorker})
        }}
        className={worker.trim().length===0?styles.inactive:""}
      >Inserir Colaborador</button>
    </div>
  )
}