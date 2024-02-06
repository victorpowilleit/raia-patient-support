import styles from './styles.module.css'
import {NewWorkerInput} from "../../components/NewWorkerInput";
import {WorkerList} from "../../components/WorkerList";
import {Dispatch, SetStateAction, useEffect} from "react";
import {useSignal} from "@preact/signals-react";
import {Total} from "../../components/Total";

interface HomeProps{
  data: {name: string, count: number}[]
  setData: Dispatch<SetStateAction<{name: string, count: number}[]>>
}

export function Home({data, setData}:HomeProps) {

  const counter = useSignal(0)

  useEffect(() => {
    let value = 0
    data.forEach((worker)=>{
      value += worker.count
    })
    counter.value=value
  }, [data]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registro de Apoio<span>ao tratamento</span></h1>
      <NewWorkerInput setData={setData}/>
      <Total>{counter}</Total>
      <WorkerList data={data} setData={setData}/>
    </div>
  )
}