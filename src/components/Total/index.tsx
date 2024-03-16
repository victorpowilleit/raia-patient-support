import styles from './style.module.css'
import {Signal} from "@preact/signals-react";
import {useLongPress} from "use-long-press";
import {feedback} from "../../utils/haptic.ts";
import {Dispatch, SetStateAction} from "react";

type workersData = {
  name: string,
  count: number
}

interface TotalProps {
  children: Signal<number>
  data: workersData[]
  setData: Dispatch<SetStateAction<workersData[]>>
  setLog: Dispatch<SetStateAction<{time: number, record: string}[]>>
}

export function Total({children, data, setData, setLog}:TotalProps){

  function resetCounters(){
    const result:workersData[] = []
    data.forEach((worker)=>result.push({name: worker.name, count:0}))
    setData(result)
  }

  const longPress = useLongPress(()=>{
    feedback()
    if(confirm("Zerar registros?")){
      resetCounters()
      setLog([])
    }
  })

  return(
    <>
      <div className={styles.total} {...longPress()}>
        Total: {children}
      </div>
    </>
  )
}