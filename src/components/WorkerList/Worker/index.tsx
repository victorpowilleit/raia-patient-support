import styles from './styles.module.css'
import {useLongPress} from "use-long-press";
import {feedback} from "../../../utils/haptic.ts";

interface WorkerProps {
  name: string,
  count: number,
  index: number,
  showChangeCounter: (index:number)=>void
  showEditItem: (index:number)=>void
}

export function Worker({name, count, index, showChangeCounter, showEditItem}:WorkerProps) {

  const longPress = useLongPress(()=>{
    feedback()
    showEditItem(index)
  })

  return (
    <div className={styles.worker} {...longPress()} onClick={()=> {
      feedback()
      showChangeCounter(index)
    }}>
      <div className="name">{name}</div>
      <span className="counter">{count}</span>
    </div>
  )
}