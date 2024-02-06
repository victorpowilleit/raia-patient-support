import {Home} from "./pages/Home";
import {useEffect, useState} from "react";
import {BrowserWindowMessage} from "./pages/BrowserWindowMessage";

type DataType = {name: string, count: number}[]

export function App() {
  const [data, setData] = useState<DataType>([])
  const [isPWA, setIsPWA] = useState("unset");
  useEffect(() => {
    // Verificar se o aplicativo está sendo executado em um PWA
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
        isPWA==="yes"?<Home data={data} setData={setData}/>:isPWA==="no"&&<BrowserWindowMessage/>
      }
      {/*{<Home data={data} setData={setData}/>}*/}
      {/*<BrowserWindowMessage/>*/}
    </>
  )
}
/*



 */