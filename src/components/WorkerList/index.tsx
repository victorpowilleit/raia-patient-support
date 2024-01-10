import styles from './styles.module.css'
import {Worker} from "./Worker";
import {Dispatch, SetStateAction} from "react";

interface WorkerListProps {
  data: {name: string, count: number}[]
  setData: Dispatch<SetStateAction<{name: string, count: number}[]>>
}

export function WorkerList({data, setData}:WorkerListProps){

  function addCounter(index:number, value:number){
    setData(prevState => {
      const newList = [...prevState]
      newList[index].count+=value
      console.log("click")
      return newList
    })
  }

  return(
    <div className={styles.workersList}>
      {data.map((worker, i)=>
        <Worker
          name={worker.name}
          count={worker.count}
          index={i}
          addCounter={addCounter}
        />
      )}
    </div>
  )
}