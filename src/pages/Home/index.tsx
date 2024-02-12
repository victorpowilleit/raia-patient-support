import styles from './styles.module.css'
import {NewWorkerInput} from "../../components/NewWorkerInput";
import {WorkerList} from "../../components/WorkerList";
import React, {Dispatch, SetStateAction, useEffect} from "react";
import {useSignal} from "@preact/signals-react";
import {Total} from "../../components/Total";
import {Splash} from "../../components/Splash";

export interface HomeProps{
  data: {name: string, count: number}[]
  setData: Dispatch<SetStateAction<{name: string, count: number}[]>>
}

export function Home({data, setData}:HomeProps) {

  const counter = useSignal(0)
  const splash = useSignal<React.ReactNode>(<Splash/>)

  useEffect(() => {
    let value = 0
    data.forEach((worker)=>{
      value += worker.count
    })
    counter.value=value
  }, [data]);

  useEffect(()=>{
    setTimeout(()=>{
      splash.value = false
    }, 3000)
  },[])

  return (
    <div className={styles.container}>
      {splash}
      <h1 className={styles.title}>Registro de Apoio<span>ao tratamento</span></h1>
      <NewWorkerInput total={counter} data={data} setData={setData}/>
      <Total data={data} setData={setData}>{counter}</Total>
      <WorkerList data={data} setData={setData}/>
    </div>
  )
}