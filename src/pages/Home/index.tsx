import styles from './styles.module.css'
import {NewWorkerInput} from "../../components/NewWorkerInput";
import {WorkerList} from "../../components/WorkerList";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useSignal} from "@preact/signals-react";
import {Total} from "../../components/Total";
import {Splash} from "../../components/Splash";
import {Log} from "../../components/Log";
import {useSwipeable} from "react-swipeable";

export interface HomeProps {
  data: { name: string, count: number }[]
  setData: Dispatch<SetStateAction<{ name: string, count: number }[]>>
  log: {time: number, record: string}[]
  setLog: Dispatch<SetStateAction<{time: number, record: string}[]>>
}

export function Home({data, setData, log, setLog}: HomeProps) {

  const [isLogOpened, setIsLogOpened] = useState<boolean>(false)
  const counter = useSignal(0)
  const splash = useSignal<React.ReactNode>(<Splash/>)

  const swipeOpen = useSwipeable({
    onSwipedLeft: () => setIsLogOpened(true),
  })
  const swipeClose = useSwipeable({
    onSwipedRight: () => setIsLogOpened(false),
  })

  useEffect(() => {
    let value = 0
    data.forEach((worker) => {
      value += worker.count
    })
    counter.value = value
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      splash.value = false
    }, 3000)
  }, [])

  return (
    <>
      {splash}
      <div {...swipeOpen} className={styles.container}>
        <h1 className={styles.title}>Registro de Apoio<span>ao tratamento</span></h1>
        <NewWorkerInput total={counter} data={data} setData={setData} log={log} setLog={setLog}/>
        <Total data={data} setData={setData} setLog={setLog}>{counter}</Total>
        <WorkerList data={data} setData={setData} log={log} setLog={setLog}/>
      </div>
      <Log isLogOpened={isLogOpened} swipeClose={swipeClose} log={log}/>
    </>
  )
}