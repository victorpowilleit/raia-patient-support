import styles from './styles.module.css'
import {Dispatch, SetStateAction, useState} from "react";
import {feedback} from "../../utils/haptic.ts";
import whatsappIcon from "../../assets/icons/Whatsapp.svg"
import {Signal} from "@preact/signals-react";
import {inputButtonText, shoWhatsappButton, listItemTitle, whatsappTextHeader} from '../../signals/tweaks'

interface handleInsertWorkerProps {
  worker: string
  setData: Dispatch<SetStateAction<{name:string, count:number}[]>>
  setWorker: Dispatch<SetStateAction<string>>
  log: {time: number, record: string}[]
  setLog: Dispatch<SetStateAction<{time: number, record: string}[]>>
}

interface NewWorkerProps{
  total: Signal<number>
  data: {name: string, count: number}[]
  setData: Dispatch<SetStateAction<{name: string, count: number}[]>>
  log: {time: number, record: string}[]
  setLog: Dispatch<SetStateAction<{time: number, record: string}[]>>
}

interface WhatsappSend{
  total: Signal<number>
  data: {name: string, count:number}[]
}

function handleInsertWorker({worker, setData, setWorker, log, setLog}:handleInsertWorkerProps){
  if(worker.trim().length>0) {
    feedback()
    setData(prevState => [...prevState, {name: worker, count: 0}])
    const newEntry = {
      record: `${listItemTitle} [${worker}] adicionado.`,
      time: new Date().getTime()
    }
    setLog([...log, newEntry])
    setWorker("")
  }
}

function handleWhatsappSend({total, data}:WhatsappSend){
  if(data.length===0){return}
  const individualData = ['']
  data.forEach(colab=>{
    individualData.push(`${colab.name}: ${colab.count}`)
  })
  const textValue = `${whatsappTextHeader}%0ATOTAL: ${total}%0A${individualData.join('%0A')}`
  window.open(`https://api.whatsapp.com/send?text=${textValue}`)
}

export function NewWorkerInput({total, data, setData, log, setLog}:NewWorkerProps){
  const [worker, setWorker] = useState("")
  return(
    <div className={styles.newWorker}>
      <input type="text" onChange={(event)=>setWorker(event.target.value)} value={worker}/>
      <div className={shoWhatsappButton?styles.buttons:styles.button}>
        {shoWhatsappButton&&<button
          onClick={() => {
            handleWhatsappSend({total, data})
          }}
          className={data.length === 0 ? styles.inactive : ""}
        >
          <img src={whatsappIcon} alt=""/>
        </button>}
      <button
        onClick={()=>{
          handleInsertWorker({worker, setData, setWorker, log, setLog})
        }}
        className={worker.trim().length===0?styles.inactive:""}
      >{inputButtonText}</button>
      </div>
    </div>
  )
}