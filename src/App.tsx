import {Home} from "./pages/Home";
import {useEffect, useState} from "react";
import {BrowserWindowMessage} from "./pages/BrowserWindowMessage";

type DataType = {name: string, count: number}[]
type LogType = {time: number, record: string}[]

const devMode = false

export function App() {
  const [data, setData] = useState<DataType>([])
  const [isPWA, setIsPWA] = useState("unset");
  const [log, setLog] = useState<LogType>([])

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsPWA("yes");
    } else {
      setIsPWA("no");
    }
    localStorage.getItem("data")!==null&&
    setData(JSON.parse(localStorage.getItem("data")!))
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data))
  }, [data]);

  return (
    <>
      {
        isPWA==="yes"||devMode?<Home data={data} setData={setData} log={log} setLog={setLog}/>:isPWA==="no"&&<BrowserWindowMessage/>
      }
    </>
  )
}