import { useEffect } from "react";
import useMapStore from "./useMapStore";

function LayersManager(){
  const layers = useMapStore(state => state.config.layers)
  const setConfig = useMapStore(state => state.setConfig)


  useEffect(() => {
    setTimeout(() => {
      console.log(123);

      setConfig()
    }, 2000)

  }, [])

  console.log(layers);

  return null;
}

export default LayersManager
