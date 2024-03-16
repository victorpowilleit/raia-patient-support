const devMode = true

import {Home} from "./pages/Home";
import {useEffect, useState} from "react";
import {BrowserWindowMessage} from "./pages/BrowserWindowMessage";

type DataType = {name: string, count: number}[]
type LogType = {time: number, record: string}[]

export function App() {
  const [isPWA, setIsPWA] = useState("unset");
  const [data, setData] = useState<DataType>([])
  const [log, setLog] = useState<LogType>([])

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsPWA("yes");
    } else {
      setIsPWA("no");
    }
    localStorage.getItem("data")!==null&&
    setData(JSON.parse(localStorage.getItem("data")!))
    localStorage.getItem("log")!==null&&
    setLog(JSON.parse(localStorage.getItem("log")!))
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data))
    localStorage.setItem("log", JSON.stringify(log))
  }, [data]);

  return (
    <>
      {
        isPWA==="yes"||devMode?<Home data={data} setData={setData} log={log} setLog={setLog} devMode={devMode}/>:isPWA==="no"&&<BrowserWindowMessage/>
      }
    </>
  )
}