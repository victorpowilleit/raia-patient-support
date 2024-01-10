import {Home} from "./pages/Home";
import {useState} from "react";

type DataType = {name: string, count: number}[]

export function App() {
  const [data, setData] = useState<DataType>([])
  return (
    <>
      <Home data={data} setData={setData}/>
    </>
  )
}