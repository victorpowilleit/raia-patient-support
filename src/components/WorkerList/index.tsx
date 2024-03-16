import styles from './styles.module.css'
import {Worker} from "./Worker";
import {Dispatch, SetStateAction, useState} from "react";
import {Actions} from "../Actions";
import {workerIndex} from "../../signals/workers.ts";
import {DangerousActions} from "../DangerousActions";

interface WorkerListProps {
  data: { name: string, count: number }[]
  setData: Dispatch<SetStateAction<{ name: string, count: number }[]>>
  log: {time: number, record: string}[]
  setLog: Dispatch<SetStateAction<{time: number, record: string}[]>>
}

export function WorkerList({data, setData, log, setLog}: WorkerListProps) {

  const [showActions, setShowActions] = useState(false)
  const [showDangerous, setShowDangerous] = useState(false)

  function addToCounter(index: number, value: number) {
    let name = ""
    setData(prevState => {
      const newList = [...prevState]
      name = newList[index].name
      newList[index].count += value
      const sortedData = newList.sort((a,b)=>a.count>b.count?-1:a.count<b.count?+1:0)
      return sortedData
    })
    const newLogData = {
      time: new Date().getTime(),
      record: `Valor de [${name}] aumentado em ${value}`
    }
    setLog([...log, newLogData])
  }

  function changeData(index: number, value: number, name: string) {
    let oldName = ""
    let count = 0
    setData(prevState => {
      const newList = [...prevState]
      oldName = newList[index].name
      count = newList[index].count
      newList[index].count = value
      newList[index].name = name
      return newList.sort((a,b)=>a.count>b.count?-1:a.count<b.count?+1:0)
    })
    const newLogData = {
      time: new Date().getTime(),
      record: `[${oldName}: ${count}] alterado para [${name}: ${value}]`
    }
    setLog([...log, newLogData])
  }

  function removeWorker(index: number) {
    let name = ""
    const newData = [...data]
    newData.splice(index, 1)
    setData(newData)
    const newLogData = {
      time: new Date().getTime(),
      record: `Colaborador [${name}] removido`
    }
    setLog([...log, newLogData])
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
      {showDangerous && <DangerousActions data={data}
                                          changeData={changeData}
                                          setShowDangerous={setShowDangerous}
                                          removeWorker={removeWorker}
      />}
    </div>
  )
}