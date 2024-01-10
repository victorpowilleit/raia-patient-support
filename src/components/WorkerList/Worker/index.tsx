import styles from './styles.module.css'

interface WorkerProps {
  name: string,
  count: number,
  index: number,
  addCounter: (index:number, value:number)=>void
}

export function Worker({name, count, index, addCounter}:WorkerProps) {
  return (
    <div className={styles.worker} onClick={()=> {
      addCounter(index, 1)
    }}>
      <div className="name">{name}</div>
      <span className="counter">{count}</span>
    </div>
  )
}