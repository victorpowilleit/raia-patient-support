import styles from './styles.module.css'
import {Dispatch, SetStateAction, useState} from "react";

interface NewWorkerInputProps {
  setData: Dispatch<SetStateAction<{name: string, count: number}[]>>
}

export function NewWorkerInput({setData}:NewWorkerInputProps){
  const [worker, setWorker] = useState("")
  return(
    <div className={styles.newWorker}>
      <input type="text" onChange={(event)=>setWorker(event.target.value)} value={worker}/>
      <button
        onClick={()=>{worker.trim().length>0&&
          setData(prevState => [...prevState, {name: worker, count: 0}])
          setWorker("")
        }}
        className={worker.trim().length===0?styles.inactive:""}
      >Inserir</button>
    </div>
  )
}