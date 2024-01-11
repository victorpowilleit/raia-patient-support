import {Home} from "./pages/Home";
import {useEffect, useState} from "react";

type DataType = {name: string, count: number}[]

export function App() {
  const [data, setData] = useState<DataType>([])
  useEffect(() => {
    data.length===0&&localStorage.getItem("data")!==null&&
    setData(JSON.parse(localStorage.getItem("data")!))
    console.log("retireve data")
  }, []);
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data))
    console.log("write data")
  }, [data]);
  return (
    <>
      <Home data={data} setData={setData}/>
    </>
  )
}