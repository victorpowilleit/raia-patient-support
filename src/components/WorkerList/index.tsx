import styles from './styles.module.css'
import {Worker} from "./Worker";
import {Dispatch, SetStateAction, useState} from "react";
import {Actions} from "../Actions";
import {workerIndex} from "../../signals/workers.ts";
import {DangerousActions} from "../DangerousActions";

interface WorkerListProps {
  data: { name: string, count: number }[]
  setData: Dispatch<SetStateAction<{ name: string, count: number }[]>>
}

export function WorkerList({data, setData}: WorkerListProps) {

  const [showActions, setShowActions] = useState(false)
  const [showDangerous, setShowDangerous] = useState(false)

  function addToCounter(index: number, value: number) {
    setData(prevState => {
      const newList = [...prevState]
      newList[index].count += value
      return newList
    })
  }

  function changeCounter(index: number, value: number) {
    setData(prevState => {
      const newList = [...prevState]
      newList[index].count = value
      return newList
    })
  }

  function removeWorker(index: number) {
    const newData = [...data]
    newData.splice(index, 1)
    setData(newData)
  }

  function showChangeCounter(index: number) {
    workerIndex.value = index
    setShowActions(true)
  }

  function showEditItem(index: number) {
    workerIndex.value = index
    setShowDangerous(true)
  }


  return (
    <div className={styles.workersList}>
      {data.map((worker, i) =>
        <Worker
          name={worker.name}
          count={worker.count}
          index={i}
          showChangeCounter={showChangeCounter}
          showEditItem={showEditItem}
        />
      )}
      {showActions && <Actions addToCounter={addToCounter} setShowActions={setShowActions}/>}
      {showDangerous && <DangerousActions changeCounter={changeCounter} setShowDangerous={setShowDangerous}
                                          removeWorker={removeWorker}/>}
    </div>
  )
}