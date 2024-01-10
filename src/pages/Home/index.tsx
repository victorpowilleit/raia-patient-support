import styles from './styles.module.css'
import {NewWorkerInput} from "../../components/NewWorkerInput";
import {WorkerList} from "../../components/WorkerList";
import {Dispatch, SetStateAction} from "react";

interface HomeProps{
  data: {name: string, count: number}[]
  setData: Dispatch<SetStateAction<{name: string, count: number}[]>>
}

export function Home({data, setData}:HomeProps) {
  return (
    <>
      <h1 className={styles.title}>Registro de Apoio<span>ao tratamento</span></h1>
      <NewWorkerInput setData={setData}/>
      <WorkerList data={data} setData={setData}/>
    </>
  )
}