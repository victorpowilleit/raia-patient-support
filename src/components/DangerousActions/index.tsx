import styles from './styles.module.css'
import {Dispatch, SetStateAction, useState} from "react";
import {workerIndex} from "../../signals/workers.ts";
import {feedback} from "../../utils/haptic.ts";
import {listItemTitle} from "../../tweaks.ts";

interface DangerousActionsProps {
  data: { name: string, count: number }[]
  changeData: (index:number, value:number, name:string)=>void
  setShowDangerous: Dispatch<SetStateAction<boolean>>

  removeWorker: (index:never)=>void
}

export function DangerousActions({data, changeData, setShowDangerous, removeWorker}:DangerousActionsProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const [value, setValue] = useState(data[workerIndex].count)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const [name, setName] = useState(data[workerIndex].name)
  function confirm(){
    feedback()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      changeData(workerIndex, parseInt(value), name.trim())
      setShowDangerous(false)
  }
  function remove(){
    feedback()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    removeWorker(workerIndex)
    setShowDangerous(false)
  }
  return (
    <div className={styles.container}>
      <div className={styles.window}>
        <h1>Redefinir Nome</h1>
        <input className={styles.nameInput} type="text" value={name} onChange={(event) => {
          setName(event.target.value)
        }}/>
        <h1>Redefinir valor</h1>
        <input type="number" pattern="[0-9]*" value={value} onChange={(event) => {
          setValue(event.target.value)
        }}/>
        <button onClick={confirm}>CONFIRMAR</button>
        <h1 className={styles.danger_text}>Remover {listItemTitle}</h1>
        <button className={styles.danger} onClick={remove}>EXCLUIR</button>
        <button onClick={() => {
          feedback();
          setValue("");
          setShowDangerous(false)
        }}>CANCELAR
        </button>
      </div>
    </div>
  )
}