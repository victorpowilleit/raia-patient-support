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
      const sortedData = newList.sort((a,b)=>a.count>b.count?-1:a.count<b.count?+1:0)
      return sortedData
    })
  }

  function changeData(index: number, value: number, name: string) {
    setData(prevState => {
      const newList = [...prevState]
      newList[index].count = value
      newList[index].name = name
      const sortedData = newList.sort((a,b)=>a.count>b.count?-1:a.count<b.count?+1:0)
      return sortedData
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
      {showDangerous && <DangerousActions data={data} changeData={changeData} setShowDangerous={setShowDangerous}
                                          removeWorker={removeWorker}/>}
    </div>
  )
}